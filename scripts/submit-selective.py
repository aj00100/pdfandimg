#!/usr/bin/env python3
"""
Selective URL Submission Script for modified pages on pdfandimg.com
Submits strictly the modified URLs to Bing Webmaster API with retry logic.
"""
import os
import sys
import time
import json
import urllib.request
import urllib.error

API_KEY = os.environ.get('BING_API_KEY', '5975fcff074646aab15936d745241603')
SITE_URL = 'https://pdfandimg.com'

MODIFIED_URLS = [
    'https://pdfandimg.com/',
    'https://pdfandimg.com/redact-pdf-online/',
    'https://pdfandimg.com/de/pdf-schwaerzen/',
    'https://pdfandimg.com/convert-heic-to-pdf/',
    'https://pdfandimg.com/convert-jpg-to-pdf-100kb/',
    'https://pdfandimg.com/reduce-image-size-in-kb/',
    'https://pdfandimg.com/australian-passport-photo-size/',
    'https://pdfandimg.com/passport-photo-2x2/',
    'https://pdfandimg.com/neet-photo-resizer/',
    'https://pdfandimg.com/ibps-photo-resizer/',
    'https://pdfandimg.com/compress-pdf-to-200kb/',
    'https://pdfandimg.com/blog/gate-2026-goaps-photo-signature-upload-rectification-defect-fix/'
]

def submit_selective_urls():
    print(f"=== Submitting {len(MODIFIED_URLS)} Modified URLs to Bing (pdfandimg.com) ===")
    for u in MODIFIED_URLS:
        print(f" -> {u}")

    payload = json.dumps({
        'siteUrl': SITE_URL,
        'urlList': MODIFIED_URLS
    }).encode('utf-8')

    req = urllib.request.Request(
        f'https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey={API_KEY}',
        data=payload,
        headers={
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    )

    for attempt in range(1, 4):
        try:
            print(f"Attempt {attempt} sending batch...")
            with urllib.request.urlopen(req, timeout=30) as resp:
                print(f"[OK] SubmitUrlbatch successful (HTTP {resp.status})")
                return True
        except urllib.error.HTTPError as e:
            print(f"[FAIL] SubmitUrlbatch: HTTP {e.code} - {e.read().decode()}")
            break
        except Exception as e:
            print(f"[RETRY] Attempt {attempt} failed: {e}")
            time.sleep(2)
    return False

def check_quota():
    print("\n=== Bing Submission Quota Status ===")
    req = urllib.request.Request(
        f'https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl={SITE_URL}&apikey={API_KEY}',
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            quota = data.get('d', {})
            print(f"Daily Quota Remaining:   {quota.get('DailyQuota')}")
            print(f"Monthly Quota Remaining: {quota.get('MonthlyQuota')}")
    except Exception as e:
        print(f"[ERROR] Quota check failed: {e}")

if __name__ == '__main__':
    submit_selective_urls()
    check_quota()
