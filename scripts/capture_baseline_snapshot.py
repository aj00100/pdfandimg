#!/usr/bin/env python3
"""
Comprehensive Automated Baseline Capture for pdfandimg.com
Captures 28-day baseline from GSC, Bing, GA4, and Cloudflare.
Saves raw CSV and JSON artifacts to baselines/YYYY-MM-DD/.
"""

import os
import sys
import json
import time
import base64
import tempfile
import subprocess
import urllib.request
import urllib.parse
from datetime import datetime, timedelta, timezone

# Target Directories & Paths
REPO_DIR = "/data/data/com.termux/files/home/pdfandimg"
TODAY_STR = datetime.now(timezone.utc).strftime("%Y-%m-%d")
BASELINE_DIR = os.path.join(REPO_DIR, "baselines", TODAY_STR)
os.makedirs(BASELINE_DIR, exist_ok=True)

# Credentials & Constants
GSC_CREDS_PATH = "/data/data/com.termux/files/home/micro-tools/.gsc_credentials.json"
ALT_CREDS_PATH = "/sdcard/Download/gen-lang-client-0695474766-bd4b18ce3951.json"
CF_CREDS_FILE = "/data/data/com.termux/files/home/micro-tools/.cloudflare_credentials.json"
TARGET_BING_KEY_FILE = "/data/data/com.termux/files/home/micro-tools/.bing_api_key_pdfandimg"
REPO_BING_KEY_FILE = os.path.join(REPO_DIR, ".bing_api_key")
LEGACY_BING_KEY_FILE = "/data/data/com.termux/files/home/micro-tools/.bing_api_key"
TARGET_GA4_PROP_FILE = "/data/data/com.termux/files/home/micro-tools/.ga4_property_id_pdfandimg"

def load_bing_key():
    if os.environ.get("BING_API_KEY"):
        return os.environ.get("BING_API_KEY").strip()
    for candidate in (TARGET_BING_KEY_FILE, REPO_BING_KEY_FILE, LEGACY_BING_KEY_FILE):
        if os.path.exists(candidate):
            try:
                with open(candidate, "r", encoding="utf-8") as f:
                    val = f.read().strip()
                    if val:
                        return val
            except Exception:
                pass
    return ""

def load_cf_creds():
    email = os.environ.get("CLOUDFLARE_EMAIL", "")
    key = os.environ.get("CLOUDFLARE_API_KEY", "")
    if os.path.exists(CF_CREDS_FILE):
        try:
            with open(CF_CREDS_FILE, "r", encoding="utf-8") as f:
                d = json.load(f)
                email = email or d.get("email", "")
                key = key or d.get("api_key", "")
        except Exception:
            pass
    return email, key

def load_ga4_property_id():
    if os.environ.get("GA4_PROPERTY_ID"):
        return os.environ.get("GA4_PROPERTY_ID").strip()
    if os.path.exists(TARGET_GA4_PROP_FILE):
        try:
            with open(TARGET_GA4_PROP_FILE, "r", encoding="utf-8") as f:
                val = f.read().strip()
                if val:
                    return val
        except Exception:
            pass
    return ""

BING_API_KEY = load_bing_key()
BING_SITE_URL = "https://pdfandimg.com"
CF_ZONE_ID = "fc9bf80583f9beeb93f1f7fc9d26776c"
CF_EMAIL, CF_KEY = load_cf_creds()
GA4_PROPERTY_ID = load_ga4_property_id()

TARGET_PAGES = [
    "/exam-photo-resizer/",
    "/convert-heic-to-pdf/",
    "/compress-image-to-20kb/",
    "/jpg-to-pdf/",
    "/resize-image-in-pixels/"
]

def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("utf-8").rstrip("=")

def get_google_token(scope: str):
    path = GSC_CREDS_PATH if os.path.exists(GSC_CREDS_PATH) else ALT_CREDS_PATH
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        creds = json.load(f)
    client_email = creds["client_email"]
    private_key = creds["private_key"]

    now = int(time.time())
    header = {"alg": "RS256", "typ": "JWT"}
    payload = {
        "iss": client_email,
        "scope": scope,
        "aud": "https://oauth2.googleapis.com/token",
        "exp": now + 3600,
        "iat": now
    }
    unsigned_jwt = b64url(json.dumps(header).encode("utf-8")) + "." + b64url(json.dumps(payload).encode("utf-8"))

    with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=True) as kf:
        kf.write(private_key)
        kf.flush()
        p = subprocess.Popen(
            ["openssl", "dgst", "-sha256", "-sign", kf.name],
            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        sig, err = p.communicate(input=unsigned_jwt.encode("utf-8"))

    signed_jwt = unsigned_jwt + "." + b64url(sig)
    token_url = "https://oauth2.googleapis.com/token"
    post_data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": signed_jwt
    }).encode("utf-8")
    req = urllib.request.Request(token_url, data=post_data, headers={"Content-Type": "application/x-www-form-urlencoded"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))["access_token"]

def query_gsc(token, body):
    site_url = "sc-domain:pdfandimg.com"
    encoded_site = urllib.parse.quote(site_url, safe="")
    url = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/searchAnalytics/query"
    req = urllib.request.Request(url, data=json.dumps(body).encode("utf-8"), headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    })
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                return json.loads(resp.read().decode("utf-8")).get("rows", [])
        except Exception as e:
            if attempt == 2:
                print(f"GSC query failed: {e}")
                return []
            time.sleep(1)

def query_ga4(token, body):
    if not GA4_PROPERTY_ID:
        return {"rows": []}
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport"
    req = urllib.request.Request(url, data=json.dumps(body).encode("utf-8"), headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    })
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"GA4 query failed: {e}")
        return {"rows": []}

def query_bing(endpoint, site_url, key):
    enc_site = urllib.parse.quote(site_url)
    url = f"https://ssl.bing.com/webmaster/api.svc/json/{endpoint}?siteUrl={enc_site}&apikey={key}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json"
    }
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                return data.get("d", [])
        except Exception as e:
            if attempt == 2:
                print(f"Bing {endpoint} failed: {e}")
                return []
            time.sleep(1)
    return []

def query_cf(query, variables):
    headers = {
        "X-Auth-Email": CF_EMAIL,
        "X-Auth-Key": CF_KEY,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (CFAnalytics/1.0)"
    }
    payload = json.dumps({"query": query, "variables": variables}).encode("utf-8")
    req = urllib.request.Request("https://api.cloudflare.com/client/v4/graphql", data=payload, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("data", {}).get("viewer", {}).get("zones", [{}])[0]
    except Exception as e:
        print(f"CF query failed: {e}")
        return {}

def save_csv(filename, header, rows):
    path = os.path.join(BASELINE_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(",".join(header) + "\n")
        for r in rows:
            safe_row = [f'"{str(val)}"' if ("," in str(val) or '"' in str(val)) else str(val) for val in r]
            f.write(",".join(safe_row) + "\n")
    print(f"  Saved: {filename} ({len(rows)} rows)")

def main():
    print(f"=========================================================================")
    print(f"📊 CAPTURING AUTOMATED 28-DAY BASELINE FOR PDFANDIMG.COM ({TODAY_STR})")
    print(f"=========================================================================")

    snapshot = {
        "domain": "pdfandimg.com",
        "captured_at": datetime.now(timezone.utc).isoformat(),
        "sources": {}
    }

    # 1. Bing Webmaster
    print("\n▶ 1/4 Fetching Bing Webmaster Data...")
    if BING_API_KEY:
        bing_page_stats = query_bing("GetPageStats", BING_SITE_URL, BING_API_KEY)
        page_rows = []
        for r in bing_page_stats:
            p = r.get("Query", "") or r.get("Page", "") or r.get("Url", "")
            page_rows.append([p, r.get("Impressions", 0), r.get("Clicks", 0), r.get("AvgImpressionPosition", 0)])
        save_csv("bing_page_stats.csv", ["page_url", "impressions", "clicks", "avg_position"], page_rows)

        bing_query_stats = query_bing("GetQueryStats", BING_SITE_URL, BING_API_KEY)
        query_rows = []
        for r in bing_query_stats:
            query_rows.append([r.get("Query", ""), r.get("Impressions", 0), r.get("Clicks", 0), r.get("AvgImpressionPosition", 0)])
        save_csv("bing_query_stats.csv", ["query", "impressions", "clicks", "avg_position"], query_rows)

        snapshot["sources"]["bing"] = {
            "total_pages_monitored": len(page_rows),
            "total_queries": len(query_rows)
        }
    else:
        print("  ⚠️ Skipped Bing (no API key configured)")

    # 2. Google Search Console
    print("\n▶ 2/4 Fetching Google Search Console Data...")
    try:
        gsc_token = get_google_token("https://www.googleapis.com/auth/webmasters.readonly")
        today = datetime.now(timezone.utc).date()
        end_d = (today - timedelta(days=2)).strftime("%Y-%m-%d")
        start_d = (today - timedelta(days=29)).strftime("%Y-%m-%d")

        gsc_pages = query_gsc(gsc_token, {
            "startDate": start_d, "endDate": end_d,
            "dimensions": ["page"], "rowLimit": 100
        })
        gsc_page_rows = []
        for r in (gsc_pages or []):
            gsc_page_rows.append([r["keys"][0], r["impressions"], r["clicks"], round(r["ctr"]*100, 2), round(r["position"], 1)])
        save_csv("gsc_pages_28d.csv", ["page_url", "impressions", "clicks", "ctr_pct", "avg_position"], gsc_page_rows)

        snapshot["sources"]["gsc"] = {
            "date_range": f"{start_d} to {end_d}",
            "pages_count": len(gsc_page_rows)
        }
    except Exception as e:
        print(f"  ⚠️ GSC capture deferred: {e}")

    # 3. Google Analytics 4
    print("\n▶ 3/4 Fetching Google Analytics 4 Data...")
    if GA4_PROPERTY_ID:
        try:
            ga4_token = get_google_token("https://www.googleapis.com/auth/analytics.readonly")
            ga4_res = query_ga4(ga4_token, {
                "dateRanges": [{"startDate": "28daysAgo", "endDate": "today"}],
                "dimensions": [{"name": "pagePath"}],
                "metrics": [{"name": "screenPageViews"}, {"name": "activeUsers"}],
                "limit": 50
            })
            ga4_rows = []
            for r in ga4_res.get("rows", []):
                ga4_rows.append([r["dimensionValues"][0]["value"], r["metricValues"][0]["value"], r["metricValues"][1]["value"]])
            save_csv("ga4_pageviews.csv", ["page_path", "pageviews", "active_users"], ga4_rows)
            snapshot["sources"]["ga4"] = {"pages": len(ga4_rows)}
        except Exception as e:
            print(f"  ⚠️ GA4 capture deferred: {e}")
    else:
        print("  ⚠️ GA4 property ID not yet configured")

    # 4. Cloudflare Analytics
    print("\n▶ 4/4 Fetching Cloudflare Edge Data...")
    cf_end_dt = datetime.now(timezone.utc)
    cf_since_dt = cf_end_dt - timedelta(days=28)
    cf_since = cf_since_dt.strftime("%Y-%m-%dT%H:%M:%SZ")
    cf_until = cf_end_dt.strftime("%Y-%m-%dT%H:%M:%SZ")

    cf_q = """
    query GetCFData($zoneTag: String!, $since: String!, $until: String!) {
      viewer {
        zones(filter: {zoneTag: $zoneTag}) {
          daily: httpRequestsAdaptiveGroups(
            limit: 35
            filter: { datetime_geq: $since, datetime_leq: $until }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { date }
          }
          statusCodes: httpRequestsAdaptiveGroups(
            limit: 20
            filter: { datetime_geq: $since, datetime_leq: $until }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { edgeResponseStatus }
          }
        }
      }
    }
    """
    cf_res = query_cf(cf_q, {"zoneTag": CF_ZONE_ID, "since": cf_since, "until": cf_until})
    cf_daily_rows = []
    if cf_res:
        daily_list = sorted(cf_res.get("daily", []), key=lambda x: x["dimensions"]["date"])
        for d in daily_list:
            cf_daily_rows.append([d["dimensions"]["date"], d["count"]])
    save_csv("cloudflare_daily_requests.csv", ["date", "requests"], cf_daily_rows)

    snapshot["sources"]["cloudflare"] = {
        "date_range": f"{cf_since[:10]} to {cf_until[:10]} (28 days)",
        "total_requests": sum(r[1] for r in cf_daily_rows),
        "daily_requests": cf_daily_rows
    }

    json_path = os.path.join(BASELINE_DIR, "baseline_full_snapshot.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2, ensure_ascii=False)
    print(f"\n✅ Baseline files written to: {BASELINE_DIR}")

if __name__ == "__main__":
    main()
