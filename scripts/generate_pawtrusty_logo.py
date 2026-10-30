import os
import subprocess
import tempfile
from PIL import Image

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
art_dir = r"C:\Users\user\.gemini\antigravity\brain\c40b928e-1ae6-4a82-a64e-2792bb08bc07"

def generate_logo():
    html_template = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background: transparent;
    display: inline-flex;
    align-items: center;
    padding: 30px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .logo-container {
    display: inline-flex;
    align-items: center;
    gap: 23px;
  }
  /* Icon Circle Badge */
  .icon-badge {
    width: 154px;
    height: 154px;
    border-radius: 50%;
    background-color: #C9C986;
    border: 7.2px solid #583D32;
    box-shadow: 8.5px 8.5px 0px #583D32;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .icon-badge svg {
    width: 82px;
    height: 82px;
    stroke: #583D32;
    stroke-width: 2.3;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  /* Text Lockup */
  .text-lockup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 11px;
  }
  .brand-title {
    font-size: 82px;
    font-weight: 900;
    letter-spacing: -0.035em;
    line-height: 0.9;
    color: #583D32;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
  }
  .brand-title .highlight {
    color: #D57746;
  }
  .brand-tagline {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 34px;
    font-weight: 800;
    letter-spacing: 0.145em;
    color: #797172;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
    line-height: 1;
  }
</style>
</head>
<body>
  <div class="logo-container" id="logo">
    <div class="icon-badge">
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="4" r="2"/>
        <circle cx="18" cy="8" r="2"/>
        <circle cx="20" cy="16" r="2"/>
        <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
      </svg>
    </div>
    <div class="text-lockup">
      <div class="brand-title">PAW<span class="highlight">TRUSTY</span></div>
      <div class="brand-tagline">PET HEALTH &amp; SAFETY</div>
    </div>
  </div>
</body>
</html>"""

    html_cream = html_template.replace(
        "body {\n    background: transparent;",
        "body {\n    background: #FAF4EE;"
    )

    tmp_dir = tempfile.mkdtemp()
    
    # 1. Render transparent version
    html_file_trans = os.path.join(tmp_dir, "logo_trans.html")
    with open(html_file_trans, "w", encoding="utf-8") as f:
        f.write(html_template)
        
    raw_trans_png = os.path.join(tmp_dir, "raw_trans.png")
    cmd_trans = [
        edge_path,
        "--headless",
        "--disable-gpu",
        f"--user-data-dir={tmp_dir}",
        "--window-size=1200,350",
        "--default-background-color=00000000",
        f"--screenshot={raw_trans_png}",
        f"file:///{html_file_trans.replace(os.sep, '/')}"
    ]
    subprocess.run(cmd_trans, capture_output=True, timeout=20)
    
    # 2. Render cream background version
    html_file_cream = os.path.join(tmp_dir, "logo_cream.html")
    with open(html_file_cream, "w", encoding="utf-8") as f:
        f.write(html_cream)
        
    raw_cream_png = os.path.join(tmp_dir, "raw_cream.png")
    cmd_cream = [
        edge_path,
        "--headless",
        "--disable-gpu",
        f"--user-data-dir={tmp_dir}",
        "--window-size=1200,350",
        f"--screenshot={raw_cream_png}",
        f"file:///{html_file_cream.replace(os.sep, '/')}"
    ]
    subprocess.run(cmd_cream, capture_output=True, timeout=20)

    # 3. Autotrim transparent logo
    os.makedirs("public/images", exist_ok=True)
    if os.path.exists(raw_trans_png):
        im = Image.open(raw_trans_png)
        bbox = im.getbbox()
        if bbox:
            pad = 8
            crop_box = (
                max(0, bbox[0] - pad),
                max(0, bbox[1] - pad),
                min(im.width, bbox[2] + pad),
                min(im.height, bbox[3] + pad)
            )
            trimmed = im.crop(crop_box)
            trimmed.save("public/images/logo-pawtrusty.png", "PNG")
            trimmed.save(os.path.join(art_dir, "logo-pawtrusty.png"), "PNG")
            print("Saved logo-pawtrusty.png", trimmed.size)

    # 4. Autotrim cream logo
    if os.path.exists(raw_cream_png) and bbox:
        im_cream = Image.open(raw_cream_png)
        trimmed_cream = im_cream.crop(crop_box)
        trimmed_cream.save("public/images/logo-pawtrusty-cream.png", "PNG")
        trimmed_cream.save(os.path.join(art_dir, "logo-pawtrusty-cream.png"), "PNG")
        print("Saved logo-pawtrusty-cream.png", trimmed_cream.size)

    # 5. Standalone 512x512 icon
    html_icon = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: transparent; display: flex; align-items: center; justify-content: center; width: 512px; height: 512px; }
  .icon-badge {
    width: 440px;
    height: 440px;
    border-radius: 50%;
    background-color: #C9C986;
    border: 20px solid #583D32;
    box-shadow: 28px 28px 0px #583D32;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-badge svg {
    width: 240px;
    height: 240px;
    stroke: #583D32;
    stroke-width: 2.2;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
</head>
<body>
  <div class="icon-badge">
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="4" r="2"/>
      <circle cx="18" cy="8" r="2"/>
      <circle cx="20" cy="16" r="2"/>
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
    </svg>
  </div>
</body>
</html>"""
    html_file_icon = os.path.join(tmp_dir, "icon.html")
    with open(html_file_icon, "w", encoding="utf-8") as f:
        f.write(html_icon)
    raw_icon_png = os.path.join(tmp_dir, "raw_icon.png")
    cmd_icon = [
        edge_path,
        "--headless",
        "--disable-gpu",
        f"--user-data-dir={tmp_dir}",
        "--window-size=512,512",
        "--default-background-color=00000000",
        f"--screenshot={raw_icon_png}",
        f"file:///{html_file_icon.replace(os.sep, '/')}"
    ]
    subprocess.run(cmd_icon, capture_output=True, timeout=20)
    if os.path.exists(raw_icon_png):
        im_icon = Image.open(raw_icon_png)
        im_icon.save("public/images/logo-pawtrusty-icon.png", "PNG")
        im_icon.save(os.path.join(art_dir, "logo-pawtrusty-icon.png"), "PNG")
        print("Saved logo-pawtrusty-icon.png", im_icon.size)

generate_logo()
