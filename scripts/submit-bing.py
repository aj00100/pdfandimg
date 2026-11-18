#!/usr/bin/env python3
"""
Automated Bing Webmaster URL & Sitemap Submission Script for pdfandimg.com
Usage: python3 scripts/submit-bing.py [API_KEY]
"""
import os
import re
import sys
import json
import urllib.request
import urllib.error

TARGET_BING_KEY_FILE = "/data/data/com.termux/files/home/micro-tools/.bing_api_key_pdfandimg"
REPO_BING_KEY_FILE = os.path.join(os.path.dirname(__file__), "..", ".bing_api_key")
LEGACY_BING_KEY_FILE = "/data/data/com.termux/files/home/micro-tools/.bing_api_key"

def load_bing_key():
    if len(sys.argv) > 1 and not sys.argv[1].startswith("-"):
        return sys.argv[1]
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
    return "33443d288f284c20ab5fbcd0b4e65677"

API_KEY = load_bing_key()
SITE_URL = 'https://pdfandimg.com'
SITEMAP_FILE = os.path.join(os.path.dirname(__file__), '..', 'dist', 'sitemap-0.xml')

def submit_sitemaps():
    feeds = [
        f'{SITE_URL}/sitemap-index.xml',
        f'{SITE_URL}/sitemap-0.xml'
    ]
    print("=== Submitting Sitemaps to Bing (pdfandimg.com) ===")
    for feed in feeds:
        payload = json.dumps({'siteUrl': SITE_URL, 'feedUrl': feed}).encode('utf-8')
        req = urllib.request.Request(
            f'https://ssl.bing.com/webmaster/api.svc/json/SubmitFeed?apikey={API_KEY}',
            data=payload,
            headers={'Content-Type': 'application/json; charset=utf-8'}
        )
        try:
            with urllib.request.urlopen(req) as resp:
                print(f"[OK] SubmitFeed: {feed} (HTTP {resp.status})")
        except urllib.error.HTTPError as e:
            print(f"[FAIL] SubmitFeed {feed}: HTTP {e.code} - {e.read().decode()}")
        except Exception as e:
            print(f"[ERROR] SubmitFeed {feed}: {e}")

def submit_urls():
    print("\n=== Submitting URLs to Bing (pdfandimg.com) ===")
    if not os.path.exists(SITEMAP_FILE):
        print(f"[ERROR] Sitemap file not found at {SITEMAP_FILE}. Run 'npm run build' first.")
        return

    with open(SITEMAP_FILE, 'r') as f:
        content = f.read()

    urls = re.findall(r'<loc>([^<]+)</loc>', content)
    print(f"Discovered {len(urls)} URLs in {SITEMAP_FILE}")

    payload = json.dumps({
        'siteUrl': SITE_URL,
        'urlList': urls
    }).encode('utf-8')

    req = urllib.request.Request(
        f'https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey={API_KEY}',
        data=payload,
        headers={'Content-Type': 'application/json; charset=utf-8'}
    )

    try:
        with urllib.request.urlopen(req) as resp:
            print(f"[OK] SubmitUrlbatch successful (HTTP {resp.status})")
    except urllib.error.HTTPError as e:
        print(f"[FAIL] SubmitUrlbatch: HTTP {e.code} - {e.read().decode()}")
    except Exception as e:
        print(f"[ERROR] SubmitUrlbatch: {e}")

def check_quota():
    print("\n=== Checking Bing Submission Quota (pdfandimg.com) ===")
    req = urllib.request.Request(
        f'https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl={SITE_URL}&apikey={API_KEY}'
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            quota = data.get('d', {})
            print(f"Daily Quota Remaining:   {quota.get('DailyQuota')}")
            print(f"Monthly Quota Remaining: {quota.get('MonthlyQuota')}")
    except Exception as e:
        print(f"[ERROR] Quota check failed: {e}")

if __name__ == '__main__':
    submit_sitemaps()
    submit_urls()
    check_quota()
