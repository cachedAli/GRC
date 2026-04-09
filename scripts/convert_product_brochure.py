from __future__ import annotations

from pathlib import Path

import mammoth
from bs4 import BeautifulSoup


def main() -> None:
    workspace = Path(r"d:\Work\complyverse_nextjs (1)")
    source_docx = workspace / "02-Product-Brochure-General.docx"
    output_html = workspace / "02-Product-Brochure-General.html"
    assets_dir = workspace / "02-Product-Brochure-General_assets"
    logo_path = workspace / "liztek-logo.png"

    if not source_docx.exists():
        raise FileNotFoundError(source_docx)
    if not logo_path.exists():
        raise FileNotFoundError(logo_path)

    assets_dir.mkdir(parents=True, exist_ok=True)
    image_counter = {"value": 0}

    def convert_image(image: mammoth.images.Image) -> dict[str, str]:
        image_counter["value"] += 1
        ext = image.content_type.split("/")[-1].lower()
        ext = "jpg" if ext == "jpeg" else ext
        filename = f"image-{image_counter['value']:03d}.{ext}"
        image_path = assets_dir / filename
        with image.open() as image_bytes:
            image_path.write_bytes(image_bytes.read())
        return {"src": f"./{assets_dir.name}/{filename}"}

    with source_docx.open("rb") as docx_file:
        result = mammoth.convert_to_html(
            docx_file,
            convert_image=mammoth.images.img_element(convert_image),
        )

    soup = BeautifulSoup(result.value, "html.parser")

    for table in soup.find_all("table"):
        current = table.get("class", [])
        table["class"] = list(dict.fromkeys([*current, "doc-table"]))

    for heading in soup.find_all(["h1", "h2", "h3", "h4"]):
        current = heading.get("class", [])
        heading["class"] = list(dict.fromkeys([*current, "doc-heading"]))

    for paragraph in soup.find_all("p"):
        current = paragraph.get("class", [])
        paragraph["class"] = list(dict.fromkeys([*current, "doc-paragraph"]))

    title = source_docx.stem.replace("-", " ").strip()
    content_html = str(soup)

    html = f"""<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>{title}</title>
    <link
      href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap\"
      rel=\"stylesheet\"
    />
    <style>
      :root {{
        --color-green-dark: #021a48;
        --color-green: #01457b;
        --line: #9fc6df;
        --surface: #ffffff;
        --text-900: #0d2d52;
        --text-700: #1f4d78;
      }}

      * {{ box-sizing: border-box; }}

      html,
      body {{
        margin: 0;
        padding: 0;
        font-family: Inter, Arial, sans-serif;
        color: var(--text-900);
        background: #ffffff;
        line-height: 1.55;
      }}

      .page {{
        width: 297mm;
        min-height: 210mm;
        margin: 10mm auto;
        background: var(--surface);
        padding: 11mm;
        box-shadow: 0 10px 34px rgba(2, 26, 72, 0.16);
        border: 1px solid #b9d5e8;
        position: relative;
      }}

      .page::after {{
        content: \"CONFIDENTIAL\";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-24deg);
        font-family: Poppins, Inter, Arial, sans-serif;
        font-size: 56px;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(1, 69, 123, 0.12);
        white-space: nowrap;
        pointer-events: none;
        z-index: 0;
      }}

      .page > * {{ position: relative; z-index: 1; }}

      .brand-row {{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12mm;
        border-bottom: 2px solid #d3e7f4;
        padding-bottom: 6mm;
        margin-bottom: 6mm;
      }}

      .brand-row img {{ height: 20mm; width: auto; }}

      .eyebrow {{
        font-size: 10.8px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--color-green);
        font-weight: 700;
      }}

      .title {{
        margin: 0 0 5mm;
        font-family: Poppins, Inter, Arial, sans-serif;
        font-size: 30px;
        line-height: 1.15;
        color: var(--color-green-dark);
      }}

      .doc-content {{ font-size: 14.6px; color: var(--text-700); }}

      .doc-content .doc-heading,
      .doc-content h1,
      .doc-content h2,
      .doc-content h3,
      .doc-content h4 {{
        font-family: Poppins, Inter, Arial, sans-serif;
        color: var(--color-green-dark);
        margin: 6mm 0 2.5mm;
        line-height: 1.25;
      }}

      .doc-content h1 {{ font-size: 23px; }}
      .doc-content h2 {{ font-size: 19px; }}
      .doc-content h3 {{ font-size: 16px; }}

      .doc-content p,
      .doc-content li {{
        font-size: 14.6px;
        line-height: 1.58;
        color: var(--text-700);
      }}

      .doc-content ul,
      .doc-content ol {{ padding-left: 7mm; }}

      .doc-content .doc-table,
      .doc-content table {{
        width: 100%;
        border-collapse: collapse;
        margin: 4mm 0 6mm;
        background: #f8fcff;
      }}

      .doc-content .doc-table th,
      .doc-content .doc-table td,
      .doc-content table th,
      .doc-content table td {{
        border: 1px solid var(--line);
        padding: 2.2mm;
        vertical-align: top;
        font-size: 13.8px;
        color: var(--text-700);
      }}

      .doc-content .doc-table th,
      .doc-content table th {{
        background: #e4f1fa;
        color: var(--color-green-dark);
        font-weight: 700;
      }}

      .doc-content img {{
        max-width: 100%;
        height: auto;
        border: 1px solid #c5dfef;
        margin: 3mm 0;
      }}
    </style>
  </head>
  <body>
    <section class=\"page\">
      <div class=\"brand-row\">
        <img src=\"./liztek-logo.png\" alt=\"LIZTEK\" />
        <div class=\"eyebrow\">Executive Product Brief | 2026</div>
      </div>
      <h1 class=\"title\">{title}</h1>
      <div class=\"doc-content\">{content_html}</div>
    </section>
  </body>
</html>
"""

    output_html.write_text(html, encoding="utf-8")
    print(f"Created HTML: {output_html}")
    print(f"Extracted images: {image_counter['value']}")
    if result.messages:
        print(f"Mammoth notes: {len(result.messages)}")


if __name__ == "__main__":
    main()
