#!/usr/bin/env python3
"""
Google Search Console Analytics Monitor for pdfandimg.com
Features:
  - 100% Zero-dependency Service Account JWT authentication using OpenSSL CLI
  - Pre-flight credentials verification & property permission checking
  - Aggregated Page-level Performance (Impressions, Clicks, CTR, Average Position)
  - Aggregated Query-level Performance (Top search keywords and rank)
  - Page-specific Query Deep-dive (e.g. --page-queries /exam-photo-resizer/)
  - Device Segmentation (Mobile vs. Desktop vs. Tablet)
  - [Nov 2026 API] Batch Country/Device Filtering via filterLists (--countries ind,usa,gbr)
  - [Nov 2026 API] Multimodal Search Data (--multimodal: Google Lens / Circle to Search)
  - [Nov 2026 API] Branded Query Classification (--branded: BRANDED vs NON_BRANDED)
Usage:
  python3 scripts/check-gsc-analytics.py [--verify-only]
  python3 scripts/check-gsc-analytics.py [--pages] [--queries] [--days 7]
  python3 scripts/check-gsc-analytics.py --countries ind,usa,gbr
  python3 scripts/check-gsc-analytics.py --multimodal
  python3 scripts/check-gsc-analytics.py --branded
  python3 scripts/check-gsc-analytics.py --page-queries /exam-photo-resizer/
"""

import os
import sys
import time
import json
import base64
import tempfile
import argparse
import subprocess
import urllib.request
import urllib.parse
from datetime import datetime, timedelta, timezone

DEFAULT_SITE_URL = "sc-domain:pdfandimg.com"
FALLBACK_SITE_URL = "https://pdfandimg.com/"
DEFAULT_CREDS_PATH = "/data/data/com.termux/files/home/micro-tools/.gsc_credentials.json"
ALT_CREDS_PATH = "/sdcard/Download/gen-lang-client-0695474766-bd4b18ce3951.json"


def b64url(data: bytes) -> str:
    """Encodes bytes into URL-safe base64 string without trailing '='."""
    return base64.urlsafe_b64encode(data).decode("utf-8").rstrip("=")


def get_gsc_access_token(creds_path: str) -> tuple[str, str]:
    """
    Acquires a Google OAuth2 Bearer Access Token using Service Account credentials.
    Uses openssl CLI to sign RSA-SHA256 JWT assertion with zero pip dependencies.
    """
    if not os.path.exists(creds_path):
        if os.path.exists(ALT_CREDS_PATH):
            creds_path = ALT_CREDS_PATH
        else:
            return "", f"Credentials file not found at: {creds_path}"

    try:
        with open(creds_path, "r", encoding="utf-8") as f:
            creds = json.load(f)
    except Exception as e:
        return "", f"Failed to parse credentials JSON: {e}"

    client_email = creds.get("client_email", "")
    private_key = creds.get("private_key", "")

    if not client_email or not private_key:
        return "", "Invalid credentials JSON: missing 'client_email' or 'private_key'"

    header = {"alg": "RS256", "typ": "JWT"}
    now = int(time.time())
    payload = {
        "iss": client_email,
        "scope": "https://www.googleapis.com/auth/webmasters.readonly",
        "aud": "https://oauth2.googleapis.com/token",
        "exp": now + 3600,
        "iat": now
    }

    unsigned_jwt = b64url(json.dumps(header).encode("utf-8")) + "." + b64url(json.dumps(payload).encode("utf-8"))

    try:
        with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=True) as key_file:
            key_file.write(private_key)
            key_file.flush()
            p = subprocess.Popen(
                ["openssl", "dgst", "-sha256", "-sign", key_file.name],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            sig, err = p.communicate(input=unsigned_jwt.encode("utf-8"))
            if p.returncode != 0:
                return "", f"OpenSSL signature failed: {err.decode('utf-8')}"
    except Exception as e:
        return "", f"Error during JWT signing: {e}"

    signed_jwt = unsigned_jwt + "." + b64url(sig)

    token_url = "https://oauth2.googleapis.com/token"
    post_data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": signed_jwt
    }).encode("utf-8")

    req = urllib.request.Request(
        token_url,
        data=post_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("access_token", ""), client_email
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        return "", f"OAuth2 token exchange failed (HTTP {e.code}): {err_body}"
    except Exception as e:
        return "", f"OAuth2 request failed: {e}"


def list_verified_sites(token: str) -> list[dict]:
    """Retrieves all verified properties accessible to the service account."""
    req = urllib.request.Request(
        "https://www.googleapis.com/webmasters/v3/sites",
        headers={"Authorization": f"Bearer {token}"}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("siteEntry", [])
    except Exception:
        return []


def query_search_analytics(token: str, site_url: str, body: dict) -> tuple[list[dict], int]:
    """Executes a searchAnalytics.query POST request against the GSC API."""
    encoded_site = urllib.parse.quote(site_url, safe="")
    url = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/searchAnalytics/query"

    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("rows", []), 200
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        try:
            return json.loads(err_msg), e.code
        except Exception:
            return [{"error": err_msg}], e.code
    except Exception as e:
        return [{"error": str(e)}], 0


def format_date_range(days: int) -> tuple[str, str]:
    """Computes GSC start and end dates accounting for standard 2-3 day reporting lag."""
    today = datetime.now(timezone.utc).date()
    end_date = today - timedelta(days=2)
    start_date = end_date - timedelta(days=days - 1)
    return start_date.strftime("%Y-%m-%d"), end_date.strftime("%Y-%m-%d")


def verify_gsc_setup(token: str, client_email: str, target_site: str) -> tuple[bool, str]:
    """Verifies that the service account has access to the target Search Console site."""
    print("🔍 [Pre-Flight] Verifying Google Search Console API access...")
    print(f"   Service Account: {client_email}")

    sites = list_verified_sites(token)
    matched_site = ""
    for s in sites:
        s_url = s.get("siteUrl", "")
        if "pdfandimg" in s_url:
            matched_site = s_url
            print(f"✅ GSC Access Confirmed for Property: {s_url}")
            print(f"   Permission Level: {s.get('permissionLevel')}\n")
            return True, matched_site

    print(f"\n❌ Service account does not have access to 'pdfandimg.com' yet!")
    print(f"   Currently accessible properties: {[s.get('siteUrl') for s in sites]}")
    print("\n💡 ACTION REQUIRED IN GOOGLE SEARCH CONSOLE:")
    print("   1. Open: https://search.google.com/search-console")
    print("   2. Select property: pdfandimg.com")
    print("   3. Go to: Settings > Users and permissions > Add user")
    print(f"   4. Paste email: {client_email}")
    print("   5. Set Permission: 'Full' (or 'Owner') > Click Add\n")
    return False, ""


def display_pages_table(rows: list[dict], start_d: str, end_d: str):
    """Renders page-level performance table."""
    print("=========================================================================================")
    print(f"📄 GOOGLE SEARCH CONSOLE — PAGE-LEVEL PERFORMANCE ({start_d} to {end_d})")
    print("=========================================================================================")
    print(f"{'Impressions':>11} | {'Clicks':>6} | {'CTR':>7} | {'Avg Pos':>7} | Page URL")
    print("-" * 89)

    total_impr = sum(r.get("impressions", 0) for r in rows)
    total_clicks = sum(r.get("clicks", 0) for r in rows)

    for r in rows:
        page_url = r.get("keys", [""])[0]
        impr = r.get("impressions", 0)
        clicks = r.get("clicks", 0)
        ctr = (r.get("ctr", 0) * 100)
        pos = r.get("position", 0.0)

        display_url = page_url.replace("https://pdfandimg.com", "")
        if not display_url:
            display_url = "/ (Homepage)"

        print(f"{impr:11,d} | {clicks:6,d} | {ctr:6.2f}% | {pos:7.1f} | {display_url}")

    print("-" * 89)
    overall_ctr = (total_clicks / max(1, total_impr)) * 100
    print(f"{total_impr:11,d} | {total_clicks:6,d} | {overall_ctr:6.2f}% |      -- | TOTALS ({len(rows)} Pages)")
    print("=========================================================================================\n")


def display_queries_table(rows: list[dict], start_d: str, end_d: str, limit: int = 25):
    """Renders query-level performance table."""
    print("=========================================================================================")
    print(f"🔍 GOOGLE SEARCH CONSOLE — QUERY-LEVEL PERFORMANCE (Top {min(limit, len(rows))} of {len(rows)})")
    print("=========================================================================================")
    print(f"{'Impressions':>11} | {'Clicks':>6} | {'CTR':>7} | {'Avg Pos':>7} | Search Query")
    print("-" * 89)

    for r in rows[:limit]:
        query = r.get("keys", [""])[0]
        impr = r.get("impressions", 0)
        clicks = r.get("clicks", 0)
        ctr = (r.get("ctr", 0) * 100)
        pos = r.get("position", 0.0)
        print(f"{impr:11,d} | {clicks:6,d} | {ctr:6.2f}% | {pos:7.1f} | {query}")
    print("=========================================================================================\n")


def display_devices(token: str, site_url: str, start_d: str, end_d: str):
    """Fetches and displays device breakdown."""
    body = {
        "startDate": start_d,
        "endDate": end_d,
        "dimensions": ["device"],
        "rowLimit": 10
    }
    rows, status = query_search_analytics(token, site_url, body)
    if status != 200 or not isinstance(rows, list):
        return

    print("=========================================================================================")
    print(f"📱 DEVICE BREAKDOWN ({start_d} to {end_d})")
    print("=========================================================================================")
    print(f"{'Device':12} | {'Impressions':>12} | {'Clicks':>8} | {'CTR':>8} | {'Avg Pos':>8}")
    print("-" * 60)
    for r in rows:
        dev = r.get("keys", [""])[0]
        impr = r.get("impressions", 0)
        clicks = r.get("clicks", 0)
        ctr = (r.get("ctr", 0) * 100)
        pos = r.get("position", 0.0)
        print(f"{dev:12} | {impr:12,d} | {clicks:8,d} | {ctr:7.2f}% | {pos:8.1f}")
    print("=========================================================================================\n")


def display_countries_table(rows: list[dict], start_d: str, end_d: str, filter_codes: list[str] = None):
    """Renders geographical performance table."""
    print("=========================================================================================")
    title_suffix = f" (Filtered: {', '.join(filter_codes)})" if filter_codes else ""
    print(f"🌍 GEOGRAPHICAL PERFORMANCE ({start_d} to {end_d}){title_suffix}")
    print("=========================================================================================")
    print(f"{'Country':10} | {'Impressions':>12} | {'Clicks':>8} | {'CTR':>8} | {'Avg Pos':>8}")
    print("-" * 55)

    for r in rows:
        country = r.get("keys", [""])[0].upper()
        impr = r.get("impressions", 0)
        clicks = r.get("clicks", 0)
        ctr = (r.get("ctr", 0) * 100)
        pos = r.get("position", 0.0)
        print(f"{country:10} | {impr:12,d} | {clicks:8,d} | {ctr:7.2f}% | {pos:8.1f}")
    print("=========================================================================================\n")


def display_multimodal(token: str, site_url: str, start_d: str, end_d: str, dimension_filter_groups=None):
    """Queries and renders visual search data (Google Lens & Circle to Search)."""
    body = {
        "startDate": start_d,
        "endDate": end_d,
        "dimensions": ["searchAppearance"],
        "rowLimit": 10
    }
    if dimension_filter_groups:
        body["dimensionFilterGroups"] = dimension_filter_groups

    rows, status = query_search_analytics(token, site_url, body)
    print("=========================================================================================")
    print(f"📸 MULTIMODAL SEARCH APPEARANCE ({start_d} to {end_d})")
    print("=========================================================================================")
    if status != 200 or not isinstance(rows, list) or not rows:
        print("No multimodal (Google Lens / Visual Search) data recorded for this period.")
        print("=========================================================================================\n")
        return

    print(f"{'Search Appearance':28} | {'Impressions':>12} | {'Clicks':>8} | {'CTR':>8}")
    print("-" * 65)
    for r in rows:
        app = r.get("keys", [""])[0]
        impr = r.get("impressions", 0)
        clicks = r.get("clicks", 0)
        ctr = (r.get("ctr", 0) * 100)
        print(f"{app:28} | {impr:12,d} | {clicks:8,d} | {ctr:7.2f}%")
    print("=========================================================================================\n")


def display_branded(token: str, site_url: str, start_d: str, end_d: str, dimension_filter_groups=None):
    """Classifies search queries into BRANDED ('pdfandimg') vs NON_BRANDED."""
    body = {
        "startDate": start_d,
        "endDate": end_d,
        "dimensions": ["query"],
        "rowLimit": 250
    }
    if dimension_filter_groups:
        body["dimensionFilterGroups"] = dimension_filter_groups

    rows, status = query_search_analytics(token, site_url, body)
    print("=========================================================================================")
    print(f"🏷️  BRANDED vs. NON-BRANDED QUERY CLASSIFICATION ({start_d} to {end_d})")
    print("=========================================================================================")
    if status != 200 or not isinstance(rows, list) or not rows:
        print("No search query data found for classification.")
        print("=========================================================================================\n")
        return

    branded_impr = 0
    branded_clicks = 0
    non_branded_impr = 0
    non_branded_clicks = 0

    brand_terms = ("pdfandimg", "pdf and img", "pdf&img")

    for r in rows:
        q = r.get("keys", [""])[0].lower()
        impr = r.get("impressions", 0)
        clicks = r.get("clicks", 0)
        if any(b in q for b in brand_terms):
            branded_impr += impr
            branded_clicks += clicks
        else:
            non_branded_impr += impr
            non_branded_clicks += clicks

    total_impr = max(1, branded_impr + non_branded_impr)
    total_clicks = max(1, branded_clicks + non_branded_clicks)

    print(f"{'Category':15} | {'Impressions':>12} (% Total) | {'Clicks':>8} (% Total) | {'CTR':>8}")
    print("-" * 65)
    b_ctr = (branded_clicks / max(1, branded_impr)) * 100
    nb_ctr = (non_branded_clicks / max(1, non_branded_impr)) * 100
    print(f"{'BRANDED':15} | {branded_impr:12,d} ({branded_impr/total_impr*100:5.1f}%) | {branded_clicks:8,d} ({branded_clicks/total_clicks*100:5.1f}%) | {b_ctr:7.2f}%")
    print(f"{'NON_BRANDED':15} | {non_branded_impr:12,d} ({non_branded_impr/total_impr*100:5.1f}%) | {non_branded_clicks:8,d} ({non_branded_clicks/total_clicks*100:5.1f}%) | {nb_ctr:7.2f}%")
    print("=========================================================================================\n")


def display_page_queries(token: str, site_url: str, page_path: str, start_d: str, end_d: str, limit: int = 25):
    """Performs deep-dive query inspection for a specific target URL/slug."""
    full_target_url = f"https://pdfandimg.com{page_path}" if page_path.startswith("/") else page_path

    body = {
        "startDate": start_d,
        "endDate": end_d,
        "dimensions": ["query"],
        "dimensionFilterGroups": [{
            "filters": [{
                "dimension": "page",
                "operator": "equals",
                "expression": full_target_url
            }]
        }],
        "rowLimit": limit
    }

    rows, status = query_search_analytics(token, site_url, body)
    print("=========================================================================================")
    print(f"🎯 PAGE QUERY DEEP-DIVE: {page_path}")
    print(f"   Period: {start_d} to {end_d} | Target: {full_target_url}")
    print("=========================================================================================")
    if status != 200 or not isinstance(rows, list) or not rows:
        print(f"No active queries ranking for {page_path} in this date range.")
        print("💡 The page may be newly submitted or in the GSC 3-day data pipeline lag.")
        print("=========================================================================================\n")
        return

    print(f"{'Impressions':>11} | {'Clicks':>6} | {'CTR':>7} | {'Avg Pos':>7} | Search Query")
    print("-" * 89)
    for r in rows:
        q = r.get("keys", [""])[0]
        impr = r.get("impressions", 0)
        clicks = r.get("clicks", 0)
        ctr = (r.get("ctr", 0) * 100)
        pos = r.get("position", 0.0)
        print(f"{impr:11,d} | {clicks:6,d} | {ctr:6.2f}% | {pos:7.1f} | {q}")
    print("=========================================================================================\n")


def main():
    parser = argparse.ArgumentParser(description="Google Search Console Analytics Monitor for pdfandimg.com")
    parser.add_argument("--creds", type=str, default=DEFAULT_CREDS_PATH, help="Path to Service Account JSON key")
    parser.add_argument("--site", type=str, default=DEFAULT_SITE_URL, help="Target GSC Site Property URL")
    parser.add_argument("--days", type=int, default=7, help="Date range duration in days (default: 7)")
    parser.add_argument("--pages", action="store_true", help="Display page-level metrics")
    parser.add_argument("--queries", action="store_true", help="Display top search queries")
    parser.add_argument("--page-queries", type=str, default=None, help="Display top queries for a specific URL/path")
    parser.add_argument("--devices", action="store_true", help="Display device segmentation")
    parser.add_argument("--limit", type=int, default=25, help="Number of queries to display")
    parser.add_argument("--verify-only", action="store_true", help="Verify credentials and property access only")

    # Nov 2026 API Flags
    parser.add_argument("--countries", type=str, default=None, help="Filter by comma-separated country codes e.g. ind,usa,gbr")
    parser.add_argument("--multimodal", action="store_true", help="Display visual search metrics (Google Lens & Circle to Search)")
    parser.add_argument("--branded", action="store_true", help="Display Branded vs. Non-Branded search classification")
    parser.add_argument("--filter-devices", type=str, default=None, help="Filter by comma-separated device types e.g. DESKTOP,MOBILE")

    args = parser.parse_args()

    # 1. Acquire Access Token
    token, err_or_email = get_gsc_access_token(args.creds)
    if not token:
        print(f"❌ Authentication Failed: {err_or_email}")
        sys.exit(1)

    client_email = err_or_email

    # 2. Pre-flight site verification
    ok, verified_site = verify_gsc_setup(token, client_email, args.site)
    if not ok:
        sys.exit(1)

    site_url = verified_site or args.site

    if args.verify_only:
        sys.exit(0)

    start_d, end_d = format_date_range(args.days)

    filter_lists = []
    c_list = None
    if args.countries:
        c_list = [c.strip().lower() for c in args.countries.split(",") if c.strip()]
        if c_list:
            filter_lists.append({
                "dimension": "country",
                "operator": "including",
                "expressions": c_list
            })
    if args.filter_devices:
        d_list = [d.strip().upper() for d in args.filter_devices.split(",") if d.strip()]
        if d_list:
            filter_lists.append({
                "dimension": "device",
                "operator": "including",
                "expressions": d_list
            })

    dimension_filter_groups = [{"filterLists": filter_lists}] if filter_lists else None

    if args.multimodal:
        display_multimodal(token, site_url, start_d, end_d, dimension_filter_groups)

    if args.branded:
        display_branded(token, site_url, start_d, end_d, dimension_filter_groups)

    if args.page_queries:
        display_page_queries(token, site_url, args.page_queries, start_d, end_d, limit=args.limit)
        return

    is_targeted_view = args.pages or args.queries or args.devices or args.multimodal or args.branded
    show_all = not is_targeted_view and not args.countries

    if args.countries and not (args.pages or args.queries):
        body = {
            "startDate": start_d,
            "endDate": end_d,
            "dimensions": ["country"],
            "dimensionFilterGroups": dimension_filter_groups,
            "rowLimit": 50
        }
        rows, status = query_search_analytics(token, site_url, body)
        if status == 200 and isinstance(rows, list):
            display_countries_table(rows, start_d, end_d, filter_codes=c_list)

    if show_all or args.pages:
        body = {
            "startDate": start_d,
            "endDate": end_d,
            "dimensions": ["page"],
            "rowLimit": 100
        }
        if dimension_filter_groups:
            body["dimensionFilterGroups"] = dimension_filter_groups
        rows, status = query_search_analytics(token, site_url, body)
        if status == 200 and isinstance(rows, list):
            display_pages_table(rows, start_d, end_d)

    if show_all or args.queries:
        body = {
            "startDate": start_d,
            "endDate": end_d,
            "dimensions": ["query"],
            "rowLimit": args.limit
        }
        if dimension_filter_groups:
            body["dimensionFilterGroups"] = dimension_filter_groups
        rows, status = query_search_analytics(token, site_url, body)
        if status == 200 and isinstance(rows, list):
            display_queries_table(rows, start_d, end_d, limit=args.limit)

    if show_all or args.devices:
        display_devices(token, site_url, start_d, end_d)


if __name__ == "__main__":
    main()
