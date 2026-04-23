from __future__ import annotations

import html
import re
from pathlib import Path

import fitz
from playwright.sync_api import sync_playwright


WORKSPACE = Path(r"d:\Work\complyverse_nextjs (1)")
DOWNLOADS = Path.home() / "Downloads"
SOURCE_PDF = DOWNLOADS / "p2p-agentic-ai-presentation.pdf"
OUTPUT_HTML = WORKSPACE / "p2p-agentic-ai-presentation-pixel-perfect.html"
OUTPUT_PDF = WORKSPACE / "p2p-agentic-ai-presentation-pixel-perfect.pdf"
LEFT_LOGO = WORKSPACE / "liztek-logo.png"
RIGHT_LOGO = WORKSPACE / "compliwerseLogo.png"


def normalize_brand_spelling(text: str) -> str:
    return re.sub(r"\bcom(?:ply|pli)verse\b", "CompliVerse", text, flags=re.IGNORECASE)


def extract_pages(pdf_path: Path) -> list[str]:
    doc = fitz.open(pdf_path)
    try:
        pages: list[str] = []
        for page in doc:
            text = page.get_text("text")
            text = text.replace("\r\n", "\n").replace("\r", "\n")
            text = normalize_brand_spelling(text)
            pages.append(text.strip("\n"))
        return pages
    finally:
        doc.close()


def build_html(pages: list[str]) -> str:
    page_sections: list[str] = []

    for index, page_text in enumerate(pages, start=1):
        page_sections.append(
            f"""
        <section class=\"page\" aria-label=\"P2P presentation page {index}\">
          <div class=\"brand-row\">
            <img src=\"./liztek-logo.png\" alt=\"LIZTEK\" />
            <div class=\"eyebrow\">Executive Product Brief | 2026</div>
            <img src=\"./compliwerseLogo.png\" alt=\"CompliVerse\" />
          </div>
          <div class=\"doc-content\">
            <div class=\"page-text\">{html.escape(page_text)}</div>
          </div>
        </section>
            """.strip()
        )

    return f"""<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>P2P Agentic AI Presentation</title>
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

      @page {{
        size: A4 landscape;
        margin: 0;
      }}

      html,
      body {{
        margin: 0;
        padding: 0;
        font-family: Inter, 'Segoe UI Emoji', 'Apple Color Emoji', Arial, sans-serif;
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
        page-break-after: always;
        break-after: page;
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

      .doc-content {{
        font-size: 13px;
        color: var(--text-700);
      }}

      .page-text {{
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
        font-size: 12.6px;
        line-height: 1.38;
        color: var(--text-700);
        font-family: Inter, 'Segoe UI Emoji', 'Apple Color Emoji', Arial, sans-serif;
      }}

      .page-text strong {{
        color: var(--color-green-dark);
      }}
    </style>
  </head>
  <body>
    {"".join(page_sections)}
  </body>
</html>
"""


def render_pdf_from_html(html_path: Path, pdf_path: Path) -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.goto(html_path.resolve().as_uri(), wait_until="networkidle")
        page.pdf(
            path=str(pdf_path),
            format="A4",
            landscape=True,
            print_background=True,
            prefer_css_page_size=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        )
        browser.close()


def main() -> None:
    if not SOURCE_PDF.exists():
        raise FileNotFoundError(SOURCE_PDF)
    if not LEFT_LOGO.exists():
        raise FileNotFoundError(LEFT_LOGO)
    if not RIGHT_LOGO.exists():
        raise FileNotFoundError(RIGHT_LOGO)

    pages = extract_pages(SOURCE_PDF)
    if not pages:
        raise RuntimeError("No pages could be extracted from the source PDF")

    html_output = build_html(pages)
    OUTPUT_HTML.write_text(html_output, encoding="utf-8")
    render_pdf_from_html(OUTPUT_HTML, OUTPUT_PDF)

    print(f"Created HTML: {OUTPUT_HTML}")
    print(f"Created PDF: {OUTPUT_PDF}")
    print(f"Pages extracted: {len(pages)}")


if __name__ == "__main__":
    main()
