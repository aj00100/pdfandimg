#!/usr/bin/env python3
"""
Cloudflare Edge & Traffic Analytics Monitor for pdfandimg.com
Features:
  - Pre-flight credential verification (verifies rotated keys/tokens before running GraphQL)
  - Daily request volume time-series (real-time edge traffic)
  - HTTP status code distribution (200, 301, 308, 403, 404, 504)
  - Clean Top Content URLs (filters out CSS/JS/images)
  - Top 404 bot scanner probe targets
  - AI crawler tracking (GPTBot, bingbot, Googlebot, ClaudeBot, PerplexityBot)
  - Geographic traffic distribution (Top countries + India/US resident activity)
Usage:
  python3 scripts/check-cf-analytics.py [--days 7] [--verify-only]
  CLOUDFLARE_API_KEY="xxx" python3 scripts/check-cf-analytics.py
"""

import os
import sys
import json
import argparse
import urllib.request
import urllib.error
from datetime import datetime, timedelta, timezone

DEFAULT_ZONE_ID = "fc9bf80583f9beeb93f1f7fc9d26776c"  # pdfandimg.com
CF_CREDS_FILE = "/data/data/com.termux/files/home/micro-tools/.cloudflare_credentials.json"

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

DEFAULT_EMAIL, DEFAULT_KEY = load_cf_creds()
USER_AGENT = "Mozilla/5.0 (CFAnalytics/1.0)"


def make_request(url, headers, payload=None, timeout=20):
    """Executes an HTTP request using urllib with custom User-Agent to avoid Cloudflare WAF drops."""
    data = json.dumps(payload).encode("utf-8") if payload else None
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = resp.read().decode("utf-8")
            return json.loads(data), resp.status
    except urllib.error.HTTPError as e:
        try:
            err_json = json.loads(e.read().decode("utf-8"))
            return err_json, e.code
        except Exception:
            return {"error": str(e)}, e.code
    except Exception as e:
        return {"error": str(e)}, 0


def verify_cf_credentials(email, key):
    """
    Pre-flight verification function:
    Checks if Cloudflare API credentials are active and have zone permissions.
    """
    print("🔍 [Pre-Flight] Verifying Cloudflare credentials...")
    headers = {"User-Agent": USER_AGENT}
    if key.startswith("cfk_") or len(key) == 37:
        headers["X-Auth-Email"] = email
        headers["X-Auth-Key"] = key
    else:
        headers["Authorization"] = f"Bearer {key}"

    if "Authorization" in headers:
        res, status = make_request("https://api.cloudflare.com/client/v4/user/tokens/verify", headers)
    else:
        res, status = make_request("https://api.cloudflare.com/client/v4/user", headers)

    if status == 200 and res.get("success"):
        user_info = res.get("result", {})
        user_id = user_info.get("id", "Unknown")[:8] + "..." if isinstance(user_info, dict) else "Token Active"
        print(f"✅ Cloudflare API Key verified! Authenticated as: {email or 'API Token'} (User ID: {user_id})")
        return True
    else:
        print(f"\n❌ Cloudflare Credential Verification FAILED (HTTP {status})!")
        print(f"   Response: {res}")
        print("\n💡 To supply rotated credentials, run:")
        print("   export CLOUDFLARE_EMAIL='your_email'")
        print("   export CLOUDFLARE_API_KEY='your_api_key'")
        print("   python3 scripts/check-cf-analytics.py\n")
        return False


def fetch_cf_analytics(zone_id, email, key, days=7):
    """Fetches high-level traffic and status code distributions via GraphQL API."""
    end_dt = datetime.now(timezone.utc)
    since_dt = end_dt - timedelta(days=days)
    since = since_dt.strftime("%Y-%m-%dT%H:%M:%SZ")
    until = end_dt.strftime("%Y-%m-%dT%H:%M:%SZ")

    headers = {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT
    }
    if key.startswith("cfk_") or len(key) == 37:
        headers["X-Auth-Email"] = email
        headers["X-Auth-Key"] = key
    else:
        headers["Authorization"] = f"Bearer {key}"

    graphql_query = """
    query GetZoneEdgeAnalytics($zoneTag: String!, $since: String!, $until: String!) {
      viewer {
        zones(filter: {zoneTag: $zoneTag}) {
          daily: httpRequestsAdaptiveGroups(
            limit: 30
            filter: { datetime_geq: $since, datetime_leq: $until }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { date }
          }
          statusCodes: httpRequestsAdaptiveGroups(
            limit: 8
            filter: { datetime_geq: $since, datetime_leq: $until }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { edgeResponseStatus }
          }
          top200Paths: httpRequestsAdaptiveGroups(
            limit: 30
            filter: { datetime_geq: $since, datetime_leq: $until, edgeResponseStatus: 200 }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { clientRequestPath }
          }
          top404Paths: httpRequestsAdaptiveGroups(
            limit: 10
            filter: { datetime_geq: $since, datetime_leq: $until, edgeResponseStatus: 404 }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { clientRequestPath }
          }
          topUserAgents: httpRequestsAdaptiveGroups(
            limit: 12
            filter: { datetime_geq: $since, datetime_leq: $until, edgeResponseStatus: 200 }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { userAgent }
          }
          topCountries: httpRequestsAdaptiveGroups(
            limit: 15
            filter: { datetime_geq: $since, datetime_leq: $until }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { clientCountryName }
          }
          indiaPaths: httpRequestsAdaptiveGroups(
            limit: 10
            filter: { datetime_geq: $since, datetime_leq: $until, clientCountryName: "IN", edgeResponseStatus: 200 }
            orderBy: [count_DESC]
          ) {
            count
            dimensions { clientRequestPath }
          }
        }
      }
    }
    """

    payload = {
        "query": graphql_query,
        "variables": {
            "zoneTag": zone_id,
            "since": since,
            "until": until
        }
    }

    res, status = make_request("https://api.cloudflare.com/client/v4/graphql", headers, payload, timeout=25)

    if status != 200 or not res.get("data"):
        print(f"❌ Failed to fetch GraphQL Analytics (HTTP {status}): {res}")
        return

    zones = res.get("data", {}).get("viewer", {}).get("zones", [])
    if not zones:
        print("❌ No zone data returned. Check your ZONE_ID.")
        return

    zone_data = zones[0]

    # 1. Total Requests & Status Codes
    status_list = zone_data.get("statusCodes", [])
    total_reqs = sum(s["count"] for s in status_list)
    print("\n========================================================")
    print(f"📊 CLOUDFLARE EDGE ANALYTICS — PAST {days} DAYS (pdfandimg.com)")
    print("========================================================")
    print(f"Total Edge Requests: {total_reqs:,}\n")

    print("--- HTTP Status Code Breakdown ---")
    for s in status_list:
        code = s["dimensions"]["edgeResponseStatus"]
        cnt = s["count"]
        pct = (cnt / max(1, total_reqs)) * 100
        desc = "Clean Hits" if code == 200 else ("Redirects" if code in (301, 308) else ("Bot Scanners" if code == 404 else "Other"))
        print(f"  HTTP {code}: {cnt:6,d} ({pct:5.1f}%) [{desc}]")

    # 2. Daily Timeline
    daily_list = sorted(zone_data.get("daily", []), key=lambda x: x["dimensions"]["date"])
    print(f"\n--- Daily Edge Traffic Timeline ---")
    max_d = max((d["count"] for d in daily_list), default=1)
    for d in daily_list:
        dt = d["dimensions"]["date"]
        cnt = d["count"]
        bar = "█" * max(1, int((cnt / max_d) * 25))
        print(f"  {dt}: {cnt:5,d} reqs {bar}")

    # 3. Clean Top Content Pages (Filtering out static asset extensions)
    paths_list = zone_data.get("top200Paths", [])
    static_exts = (".css", ".js", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".woff", ".woff2", ".map", ".txt", ".xml")
    content_paths = [p for p in paths_list if not any(p["dimensions"]["clientRequestPath"].lower().endswith(ext) for ext in static_exts)]

    print(f"\n--- Top Content Pages (HTTP 200 OK) ---")
    for idx, p in enumerate(content_paths[:12], 1):
        print(f"  #{idx:02d}: {p['count']:5,d} reqs -> {p['dimensions']['clientRequestPath']}")

    # 4. Top 404 Probes
    probes_list = zone_data.get("top404Paths", [])
    if probes_list:
        print(f"\n--- Top 404 Probe Targets (Automated Scanners) ---")
        for p in probes_list[:6]:
            print(f"  {p['count']:4,d} hits -> {p['dimensions']['clientRequestPath']}")

    # 5. User Agents
    ua_list = zone_data.get("topUserAgents", [])
    print(f"\n--- Top User-Agents (AI Crawlers & Browsers) ---")
    for u in ua_list[:8]:
        ua = u["dimensions"]["userAgent"]
        tag = "🤖 [AI Crawler]" if any(bot in ua for bot in ("GPTBot", "bingbot", "Googlebot", "ClaudeBot", "PerplexityBot")) else "👤 [Browser]"
        print(f"  {u['count']:4,} reqs {tag} -> {ua[:75]}")

    # 6. Top Countries & India (IN) Activity
    countries_list = zone_data.get("topCountries", [])
    print(f"\n--- Top Countries by Traffic ---")
    in_count = 0
    for c in countries_list[:8]:
        cname = c["dimensions"]["clientCountryName"] or "Unknown"
        cnt = c["count"]
        if cname == "IN":
            in_count = cnt
        print(f"  {cname:10s}: {cnt:5,} requests")
    if in_count == 0:
        in_entry = next((c for c in countries_list if c["dimensions"]["clientCountryName"] == "IN"), None)
        if in_entry:
            in_count = in_entry["count"]

    print(f"\n--- 🇮🇳 India (IN) Resident Activity ---")
    print(f"Total Requests from India: {in_count:,}")
    in_paths = zone_data.get("indiaPaths", [])
    if in_paths:
        print("Top Visited Pages from India:")
        for ip in in_paths[:6]:
            print(f"  {ip['count']:4,d} reqs -> {ip['dimensions']['clientRequestPath']}")
    print("========================================================\n")


def main():
    parser = argparse.ArgumentParser(description="Cloudflare Edge Analytics Monitor for pdfandimg.com")
    parser.add_argument("--zone", type=str, default=DEFAULT_ZONE_ID, help="Cloudflare Zone Tag")
    parser.add_argument("--days", type=int, default=7, help="Past N days of data to fetch (default: 7)")
    parser.add_argument("--verify-only", action="store_true", help="Verify credentials and exit")

    args = parser.parse_args()

    email = os.environ.get("CLOUDFLARE_EMAIL") or DEFAULT_EMAIL
    key = os.environ.get("CLOUDFLARE_API_KEY") or DEFAULT_KEY

    if not key:
        print("❌ Cloudflare API key not found. Please set CLOUDFLARE_API_KEY or configure .cloudflare_credentials.json")
        sys.exit(1)

    if not verify_cf_credentials(email, key):
        sys.exit(1)

    if args.verify_only:
        print("Pre-flight verification passed. Exiting.")
        return

    fetch_cf_analytics(args.zone, email, key, days=args.days)


if __name__ == "__main__":
    main()
