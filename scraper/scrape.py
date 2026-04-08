#!/usr/bin/env python3
"""
Daily Caller Article Scraper for Thomas English
================================================
Scrapes all articles by Thomas English from The Daily Caller
and saves them to data/articles.json.

Usage:
    pip install requests beautifulsoup4
    python scrape.py

Output:
    ../data/articles.json
"""

import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Missing dependencies. Install them with:")
    print("  pip install requests beautifulsoup4")
    sys.exit(1)


# ── Config ──────────────────────────────────────────────────────────────────

AUTHOR_URL = "https://dailycaller.com/author/TEnglish/"
AUTHOR_NAME = "Thomas English"
OUTPUT_DIR = Path(__file__).parent.parent / "data"
OUTPUT_FILE = OUTPUT_DIR / "articles.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

# Polite delay between requests (seconds)
REQUEST_DELAY = 1.5

# Max pages to scrape (safety limit)
MAX_PAGES = 20


# ── Scraping Functions ──────────────────────────────────────────────────────

def fetch_page(url: str) -> BeautifulSoup | None:
    """Fetch a URL and return parsed BeautifulSoup, or None on failure."""
    try:
        print(f"  Fetching: {url}")
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "html.parser")
    except requests.RequestException as e:
        print(f"  ⚠ Failed to fetch {url}: {e}")
        return None


def extract_articles_from_page(soup: BeautifulSoup) -> list[dict]:
    """
    Extract article data from an author archive page.

    The Daily Caller author pages typically use article/post cards.
    This function tries multiple selectors to be resilient to layout changes.
    """
    articles = []

    # Try common selectors for Daily Caller article cards
    selectors = [
        "article",
        ".post-card",
        ".archive-article",
        '[class*="article"]',
        '[class*="post"]',
        ".stream-item",
    ]

    items = []
    for selector in selectors:
        items = soup.select(selector)
        if items:
            break

    if not items:
        # Fallback: find all links that look like article URLs
        links = soup.find_all("a", href=re.compile(r"dailycaller\.com/\d{4}/\d{2}/\d{2}/"))
        seen = set()
        for link in links:
            href = link.get("href", "")
            if href not in seen and link.get_text(strip=True):
                seen.add(href)
                articles.append({
                    "title": link.get_text(strip=True),
                    "url": href,
                    "date": extract_date_from_url(href),
                    "excerpt": "",
                    "image": "",
                })
        return articles

    for item in items:
        article = {}

        # Title + URL
        title_link = item.find("a", href=re.compile(r"dailycaller\.com/\d{4}/"))
        if not title_link:
            title_link = item.find("a", href=True)

        if title_link:
            article["title"] = title_link.get_text(strip=True)
            article["url"] = title_link["href"]
            if not article["url"].startswith("http"):
                article["url"] = "https://dailycaller.com" + article["url"]
        else:
            continue  # Skip items without a link

        # Skip if title is empty or looks like nav
        if not article["title"] or len(article["title"]) < 10:
            continue

        # Date
        time_tag = item.find("time")
        if time_tag:
            article["date"] = time_tag.get("datetime", time_tag.get_text(strip=True))
        else:
            article["date"] = extract_date_from_url(article.get("url", ""))

        # Excerpt / description
        desc_el = item.find(class_=re.compile(r"(excerpt|desc|summary|teaser)"))
        if desc_el:
            article["excerpt"] = desc_el.get_text(strip=True)[:200]
        else:
            # Try the first <p> that isn't the title
            p_tags = item.find_all("p")
            for p in p_tags:
                text = p.get_text(strip=True)
                if text and text != article["title"] and len(text) > 20:
                    article["excerpt"] = text[:200]
                    break
            else:
                article["excerpt"] = ""

        # Image
        img = item.find("img")
        if img:
            article["image"] = img.get("src", "") or img.get("data-src", "")

        articles.append(article)

    return articles


def extract_date_from_url(url: str) -> str:
    """Try to extract a date from a Daily Caller URL like /2025/06/15/..."""
    match = re.search(r"/(\d{4})/(\d{2})/(\d{2})/", url)
    if match:
        return f"{match.group(1)}-{match.group(2)}-{match.group(3)}"
    return ""


def find_next_page(soup: BeautifulSoup, current_url: str) -> str | None:
    """Find the 'next page' link on an author archive page."""
    # Look for pagination links
    next_selectors = [
        'a.next',
        'a[rel="next"]',
        '.pagination a.next',
        '.nav-links a.next',
        'a:contains("Next")',
        'a:contains("Older")',
    ]

    for selector in next_selectors:
        try:
            link = soup.select_one(selector)
            if link and link.get("href"):
                href = link["href"]
                if not href.startswith("http"):
                    href = "https://dailycaller.com" + href
                return href
        except Exception:
            continue

    # Fallback: try incrementing page number in URL
    page_match = re.search(r"/page/(\d+)", current_url)
    if page_match:
        next_num = int(page_match.group(1)) + 1
        return re.sub(r"/page/\d+", f"/page/{next_num}", current_url)
    else:
        # Try adding /page/2/ to the base author URL
        base = current_url.rstrip("/")
        return f"{base}/page/2/"


def guess_category(title: str, excerpt: str) -> str:
    """Simple keyword-based category assignment."""
    text = (title + " " + excerpt).lower()

    category_keywords = {
        "politics": [
            "trump", "biden", "congress", "senate", "house", "republican",
            "democrat", "gop", "election", "vote", "legislation", "bill",
            "government", "president", "political", "policy", "white house",
            "supreme court", "justice", "governor", "mayor",
        ],
        "culture": [
            "culture", "media", "hollywood", "movie", "film", "music",
            "celebrity", "social media", "entertainment", "book", "art",
            "society", "tradition", "religion", "church",
        ],
        "tech": [
            "tech", "technology", "ai", "artificial intelligence", "google",
            "apple", "meta", "microsoft", "software", "app", "cyber",
            "internet", "data", "algorithm", "robot",
        ],
        "opinion": [
            "opinion", "commentary", "column", "editorial", "analysis",
            "exclusive", "perspective",
        ],
    }

    scores = {cat: 0 for cat in category_keywords}
    for cat, keywords in category_keywords.items():
        for kw in keywords:
            if kw in text:
                scores[cat] += 1

    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "general"


# ── Main ────────────────────────────────────────────────────────────────────

def main():
    print(f"🔍 Scraping articles by {AUTHOR_NAME} from Daily Caller...")
    print(f"   Author page: {AUTHOR_URL}")
    print()

    all_articles = []
    current_url = AUTHOR_URL
    page = 1

    while current_url and page <= MAX_PAGES:
        print(f"📄 Page {page}:")
        soup = fetch_page(current_url)

        if not soup:
            print("  Stopping — could not fetch page.")
            break

        articles = extract_articles_from_page(soup)
        print(f"  Found {len(articles)} articles")

        if not articles:
            print("  No articles found — reached end of archive.")
            break

        all_articles.extend(articles)

        # Check for next page
        next_url = find_next_page(soup, current_url)

        # Verify we're not looping
        if next_url == current_url:
            break

        current_url = next_url
        page += 1

        time.sleep(REQUEST_DELAY)

    # Deduplicate by URL
    seen_urls = set()
    unique_articles = []
    for art in all_articles:
        if art["url"] not in seen_urls:
            seen_urls.add(art["url"])
            unique_articles.append(art)

    # Sort by date (newest first)
    unique_articles.sort(key=lambda a: a.get("date", ""), reverse=True)

    # Assign IDs, categories, cell sizes
    for i, art in enumerate(unique_articles):
        art["id"] = i + 1
        art["category"] = guess_category(art.get("title", ""), art.get("excerpt", ""))
        art["featured"] = i == 0  # Mark the newest article as featured
        art["cellSize"] = "2x2" if art["featured"] else "1x1"

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Write JSON
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(unique_articles, f, indent=2, ensure_ascii=False)

    print()
    print(f"✅ Done! Scraped {len(unique_articles)} unique articles.")
    print(f"📁 Saved to: {OUTPUT_FILE}")
    print()
    print("Next steps:")
    print("  1. Review articles.json and adjust categories if needed")
    print("  2. Mark your favorite 1-2 articles as \"featured\": true")
    print("  3. Set featured articles' cellSize to \"2x2\"")


if __name__ == "__main__":
    main()
