from __future__ import annotations

from pathlib import Path

import fitz
from PIL import Image, ImageOps
from playwright.sync_api import sync_playwright


WORKSPACE = Path(r"d:\Work\complyverse_nextjs (1)")
DOWNLOADS = Path.home() / "Downloads"
SOURCE_PDF = DOWNLOADS / "p2p-agentic-ai-presentation.pdf"
OUTPUT_STEM = "p2p-agentic-ai-presentation-pixel-perfect"
OUTPUT_HTML = WORKSPACE / f"{OUTPUT_STEM}.html"
OUTPUT_PDF = WORKSPACE / f"{OUTPUT_STEM}.pdf"
ASSETS_DIR = WORKSPACE / f"{OUTPUT_STEM}_assets"
PAGE_WIDTH_PT = 960
PAGE_HEIGHT_PT = 540
RENDER_SCALE = 2.0

BG_COLOR = "#ffffff"
DARK_BLUE = "#021a48"
MID_BLUE = "#01457b"
BORDER_LIGHT = "#d3e7f4"
CARD_BLUE = "#e8f0fb"
BORDER = "#b9d5e8"
SHADOW = "rgba(2, 26, 72, 0.16)"


def render_and_recolor_pages(pdf_path: Path, assets_dir: Path) -> list[Path]:
    assets_dir.mkdir(parents=True, exist_ok=True)
    for existing in assets_dir.glob("page-*.png"):
        existing.unlink(missing_ok=True)

    doc = fitz.open(pdf_path)
    rendered_paths: list[Path] = []
    try:
        matrix = fitz.Matrix(RENDER_SCALE, RENDER_SCALE)
        for index, page in enumerate(doc, start=1):
            pixmap = page.get_pixmap(matrix=matrix, alpha=False)
            temp_path = assets_dir / f"page-{index:03d}-raw.png"
            final_path = assets_dir / f"page-{index:03d}.png"
            pixmap.save(temp_path)

            image = Image.open(temp_path).convert("RGB")
            gray = ImageOps.grayscale(image)
            inverted = ImageOps.invert(gray)

            white_bg = Image.new("RGB", image.size, BG_COLOR)
            card_layer = Image.new("RGB", image.size, CARD_BLUE)
            text_layer = Image.new("RGB", image.size, DARK_BLUE)

            card_mask = inverted.point(lambda value: 255 if 140 <= value < 228 else 0)
            text_mask = inverted.point(lambda value: 255 if value < 140 else 0)

            recolored = white_bg
            recolored.paste(card_layer, mask=card_mask)
            recolored.paste(text_layer, mask=text_mask)
            recolored.save(final_path)
            temp_path.unlink(missing_ok=True)
            rendered_paths.append(final_path)
    finally:
        doc.close()

    return rendered_paths


def build_html(page_images: list[Path]) -> str:
    page_markup = []
    for index, image_path in enumerate(page_images, start=1):
        page_markup.append(
            f"""
        <section class="page" aria-label="P2P presentation page {index}">
          <div class="page-header">
            <img class="brand-logo" src="./liztek-logo.png" alt="LIZTEK" />
            <div class="eyebrow">Executive Product Brief | 2026</div>
            <img class="brand-logo brand-logo-right" src="./compliwerseLogo.png" alt="CompliVerse AI" />
          </div>
          <div class="page-body">
            <img class="page-image" src="./{ASSETS_DIR.name}/{image_path.name}" alt="P2P presentation page {index}" />
          </div>
        </section>
            """.strip()
        )

    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>P2P Agentic AI Presentation</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {{
        --color-green-dark: {DARK_BLUE};
        --color-green: {MID_BLUE};
        --line: #d3e7f4;
        --surface: #ffffff;
      }}

      * {{ box-sizing: border-box; }}

      @page {{
        size: {PAGE_WIDTH_PT}pt {PAGE_HEIGHT_PT}pt;
        margin: 0;
      }}

      html,
      body {{
        margin: 0;
        padding: 0;
        background: #ffffff;
        font-family: Inter, Arial, sans-serif;
      }}

      body {{
        padding: 10mm 0;
      }}

      .page {{
        width: {PAGE_WIDTH_PT}pt;
        height: {PAGE_HEIGHT_PT}pt;
        margin: 0 auto 10mm;
        position: relative;
        overflow: hidden;
        background: var(--surface);
        box-shadow: 0 10px 34px rgba(2, 26, 72, 0.16);
        border: 1px solid #b9d5e8;
        padding: 14px 18px 16px;
        display: flex;
        flex-direction: column;
      }}

      .page-header {{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 2px solid {BORDER_LIGHT};
        flex: 0 0 auto;
      }}

      .brand-logo {{
        height: 16mm;
        width: auto;
        object-fit: contain;
      }}

      .brand-logo-right {{
        height: 15mm;
      }}

      .eyebrow {{
        flex: 1;
        text-align: center;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: {MID_BLUE};
      }}

      .page-body {{
        position: relative;
        flex: 1 1 auto;
        min-height: 0;
      }}

      .page-image {{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: top center;
      }}
    </style>
  </head>
  <body>
    {''.join(page_markup)}
  </body>
</html>
"""


def render_pdf_from_html(html_path: Path, pdf_path: Path) -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": PAGE_WIDTH_PT, "height": PAGE_HEIGHT_PT})
        page.goto(html_path.resolve().as_uri(), wait_until="networkidle")
        page.pdf(
            path=str(pdf_path),
            print_background=True,
            prefer_css_page_size=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        )
        browser.close()


def main() -> None:
    if not SOURCE_PDF.exists():
        raise FileNotFoundError(SOURCE_PDF)

    page_images = render_and_recolor_pages(SOURCE_PDF, ASSETS_DIR)
    if not page_images:
        raise RuntimeError("No pages were rendered from the source PDF")

    html_output = build_html(page_images)
    OUTPUT_HTML.write_text(html_output, encoding="utf-8")
    render_pdf_from_html(OUTPUT_HTML, OUTPUT_PDF)

    print(f"Created HTML: {OUTPUT_HTML}")
    print(f"Created PDF: {OUTPUT_PDF}")
    print(f"Rendered pages: {len(page_images)}")


if __name__ == "__main__":
    main()
