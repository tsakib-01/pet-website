import urllib.request
import re
import json
import sys
from pathlib import Path
from datetime import datetime

# Ensure stdout handles UTF-8 on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

TIMELINE_PATH = Path('src/data/historicalTimeline.ts')
HEADERS = {
    'User-Agent': 'PawTrusty-Consumer-Safety-Sync/1.0 (Mozilla/5.0 Windows NT 10.0; Win64; x64)'
}

def fetch_from_fda_cvm():
    """Scrapes official FDA Center for Veterinary Medicine pet food recall directory."""
    url = 'https://www.fda.gov/animal-veterinary/safety-health/recalls-withdrawals'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as res:
            html = res.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"[FDA CVM] Fetch failed: {e}")
        return []

    table_match = re.search(r'<table[\s\S]*?id="datatable"[\s\S]*?<tbody>([\s\S]*?)</tbody>', html)
    if not table_match:
        return []

    rows = re.findall(r'<tr[\s\S]*?</tr>', table_match.group(1))
    recalls = []

    for r in rows:
        cols = re.findall(r'<td[^>]*>([\s\S]*?)</td>', r)
        cleaned = [re.sub(r'<[^>]+>', '', c).strip() for c in cols]
        if len(cleaned) < 5:
            continue

        raw_date = cleaned[0]
        brand = cleaned[1]
        product = cleaned[2]
        reason = cleaned[3]
        firm = cleaned[4]

        link_m = re.search(r'href="([^"]+)"', r)
        notice_url = ""
        if link_m:
            href = link_m.group(1)
            notice_url = f"https://www.fda.gov{href}" if href.startswith('/') else href

        try:
            dt = datetime.strptime(raw_date, "%m/%d/%Y")
            iso_date = dt.strftime("%Y-%m-%d")
            year = dt.year
        except Exception:
            iso_date = datetime.now().strftime("%Y-%m-%d")
            year = datetime.now().year

        reason_lower = reason.lower()
        if "salmonella" in reason_lower:
            hazard = "Salmonella Contamination"
            classification = "Class I"
        elif "listeria" in reason_lower:
            hazard = "Listeria Monocytogenes"
            classification = "Class I"
        elif "aflatoxin" in reason_lower:
            hazard = "Aflatoxin Mold"
            classification = "Class I"
        elif "metal" in reason_lower or "foreign" in reason_lower:
            hazard = "Foreign Material"
            classification = "Class II"
        elif "potency" in reason_lower or "vitamin" in reason_lower or "mineral" in reason_lower or "potassium" in reason_lower:
            hazard = "Nutritional Variance"
            classification = "Class II"
        else:
            hazard = "Manufacturing Variance"
            classification = "Class II"

        clean_brand = brand if brand.lower() != "no brand name" and brand.strip() else firm.split(',')[0].split(' Inc')[0].split(' LLC')[0].strip()
        brand_slug = re.sub(r'[^a-z0-9]+', '-', clean_brand.lower()).strip('-')

        recalls.append({
            "id": f"fda-{iso_date}-{brand_slug}",
            "year": year,
            "date": iso_date,
            "dateFormatted": raw_date,
            "brandName": clean_brand,
            "brandSlug": brand_slug,
            "domain": "",
            "companyName": firm,
            "productDescription": product,
            "classification": classification,
            "hazardType": hazard,
            "reason": reason,
            "terminated": False,
            "lotCodes": "Refer to official FDA docket notice for specific batch and packaging lot numbers",
            "distributionPattern": "Nationwide & regional pet retail / veterinary channels",
            "fdaNoticeUrl": notice_url
        })

    return recalls

def fetch_from_openfda():
    """Queries openFDA Food Enforcement API for recent animal/pet food dockets."""
    url = 'https://api.fda.gov/food/enforcement.json?search=product_description:("dog"+OR+"cat"+OR+"pet")+AND+status:"Ongoing"&sort=report_date:desc&limit=20'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            data = json.loads(res.read().decode('utf-8'))
            results = data.get('results', [])
    except Exception as e:
        print(f"[openFDA API] Query note: {e}")
        return []

    recalls = []
    for r in results:
        desc = r.get('product_description', '')
        desc_lower = desc.lower()
        # Strictly verify pet food keywords and exclude packaging (e.g. "PET wrap")
        if not any(k in desc_lower for k in ['dog food', 'cat food', 'pet food', 'kibble', 'pet treat', 'dog treat', 'cat treat']):
            continue

        raw_date = r.get('report_date', '')
        try:
            dt = datetime.strptime(raw_date, "%Y%m%d")
            iso_date = dt.strftime("%Y-%m-%d")
            date_formatted = dt.strftime("%m/%d/%Y")
            year = dt.year
        except Exception:
            iso_date = datetime.now().strftime("%Y-%m-%d")
            date_formatted = datetime.now().strftime("%m/%d/%Y")
            year = datetime.now().year

        firm = r.get('recalling_firm', 'Veterinary Manufacturer')
        reason = r.get('reason_for_recall', 'FDA Safety Advisory')
        rec_num = r.get('recall_number', '')

        classification = r.get('classification', 'Class II')
        hazard = "Pathogen Contamination" if "Class I" in classification else "Regulatory Compliance"

        brand_slug = re.sub(r'[^a-z0-9]+', '-', firm.lower()).strip('-')

        recalls.append({
            "id": f"fda-{iso_date}-{rec_num.lower() or brand_slug}",
            "year": year,
            "date": iso_date,
            "dateFormatted": date_formatted,
            "brandName": firm.split(',')[0].strip(),
            "brandSlug": brand_slug,
            "domain": "",
            "companyName": firm,
            "productDescription": desc,
            "classification": classification,
            "hazardType": hazard,
            "reason": reason,
            "terminated": r.get('status', '').lower() == 'terminated',
            "lotCodes": r.get('code_info', 'See official FDA notice for lot numbers'),
            "distributionPattern": r.get('distribution_pattern', 'Nationwide distribution'),
            "fdaNoticeUrl": f"https://www.accessdata.fda.gov/scripts/ires/index.cfm?Event={r.get('event_id', '')}" if r.get('event_id') else ""
        })

    return recalls

def sync_all():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}] Initiating automated FDA Pet Food Recall Sync...")
    
    cvm_recalls = fetch_from_fda_cvm()
    print(f"[FDA CVM] Retrieved {len(cvm_recalls)} dockets from Center for Veterinary Medicine.")

    openfda_recalls = fetch_from_openfda()
    print(f"[openFDA] Retrieved {len(openfda_recalls)} verified pet food records from enforcement API.")

    combined = cvm_recalls + openfda_recalls
    if not combined:
        print("No incoming recall records to process.")
        return False

    content = TIMELINE_PATH.read_text(encoding='utf-8')
    existing_urls = set(re.findall(r'"fdaNoticeUrl":\s*"([^"]+)"', content))
    existing_ids = set(re.findall(r'"id":\s*"([^"]+)"', content))

    new_entries = []
    for entry in combined:
        if entry["fdaNoticeUrl"] and entry["fdaNoticeUrl"] in existing_urls:
            continue
        if entry["id"] in existing_ids:
            continue
        existing_ids.add(entry["id"])
        if entry["fdaNoticeUrl"]:
            existing_urls.add(entry["fdaNoticeUrl"])
        new_entries.append(entry)

    if not new_entries:
        print("[OK] All FDA pet food recall dockets are 100% synchronized and up to date.")
        return False

    print(f"[NEW] Discovered {len(new_entries)} brand-new FDA pet food recall dockets:")
    for e in new_entries:
        print(f"   -> {e['date']} | {e['brandName']} | {e['reason'][:60]}...")

    marker = "export const HISTORICAL_FDA_TIMELINE: HistoricalDocketEntry[] = ["
    idx = content.find(marker)
    if idx == -1:
        print("Error: Could not locate timeline array in source file.")
        return False

    insert_pos = idx + len(marker)
    formatted = []
    for e in new_entries:
        lines = json.dumps(e, indent=2).splitlines()
        formatted.append("\n".join("  " + l for l in lines))

    block = "\n" + ",\n".join(formatted) + ","
    updated = content[:insert_pos] + block + content[insert_pos:]
    TIMELINE_PATH.write_text(updated, encoding='utf-8')
    print(f"[SUCCESS] Wrote {len(new_entries)} new dockets to {TIMELINE_PATH}")
    return True

if __name__ == "__main__":
    sync_all()
