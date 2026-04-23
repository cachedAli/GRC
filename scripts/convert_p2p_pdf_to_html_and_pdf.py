from __future__ import annotations

import html
import re
import shutil
import subprocess
from pathlib import Path

from playwright.sync_api import sync_playwright


WORKSPACE = Path(r"d:\Work\complyverse_nextjs (1)")
DOWNLOADS = Path.home() / "Downloads"
SOURCE_PDF = DOWNLOADS / "p2p-agentic-ai-presentation.pdf"
OUTPUT_HTML = WORKSPACE / "p2p-agentic-ai-presentation-restyled.html"
OUTPUT_PDF = WORKSPACE / "p2p-agentic-ai-presentation-restyled.pdf"
LEFT_LOGO = WORKSPACE / "liztek-logo.png"
RIGHT_LOGO = WORKSPACE / "compliwerseLogo.png"


def find_pdftotext() -> Path:
    resolved = shutil.which("pdftotext")
    if resolved:
        return Path(resolved)

    fallback = Path(r"C:\Program Files\Git\mingw64\bin\pdftotext.exe")
    if fallback.exists():
        return fallback

    raise FileNotFoundError("pdftotext executable not found")


def normalize_brand_spelling(text: str) -> str:
    return re.sub(r"\bcom(?:ply|pli)verse\b", "CompliVerse", text, flags=re.IGNORECASE)


def extract_pages(pdf_path: Path) -> list[str]:
    pdftotext = find_pdftotext()
    temp_text = WORKSPACE / "_p2p_extract_temp.txt"

    cmd = [str(pdftotext), "-layout", "-enc", "UTF-8", str(pdf_path), str(temp_text)]
    subprocess.run(cmd, check=True, capture_output=True, text=True)

    raw = temp_text.read_text(encoding="utf-8", errors="ignore")
    temp_text.unlink(missing_ok=True)

    pages = [p.strip("\n") for p in raw.replace("\r\n", "\n").split("\f")]
    return [normalize_brand_spelling(page) for page in pages if page.strip()]


def build_html(pages: list[str]) -> str:
    page_sections: list[str] = []

    for index, page_text in enumerate(pages, start=1):
        title_html = '<h1 class="title">P2P Agentic AI Presentation</h1>' if index == 1 else ""
        page_sections.append(
            """
        <section class="page">
            <div class="brand-row">
                <img src="./liztek-logo.png" alt="LIZTEK" />
                <div class="eyebrow">Executive Product Brief | 2026</div>
                <img src="./compliwerseLogo.png" alt="CompliVerse" />
            </div>
            {title_html}
            <div class="doc-content">
                <pre class="page-text">{text}</pre>
            </div>
        </section>
            """.format(
                title_html=title_html,
                text=html.escape(page_text),
            ).strip()
        )

    return f"""<!doctype html>
<html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\" />
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
        <title>P2P Agentic AI Presentation - Restyled</title>
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
                font-family: Arial, sans-serif;
                color: var(--text-900);
                background: #ffffff;
                line-height: 1.55;
            }}

            .page {{
                width: 297mm;
                min-height: 210mm;
                margin: 0 auto;
                background: var(--surface);
                padding: 11mm;
                border: 1px solid #b9d5e8;
                position: relative;
                page-break-after: always;
                overflow: hidden;
            }}

            .page::after {{
                content: \"CONFIDENTIAL\";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-24deg);
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

            .brand-row img {{
                height: 13mm;
                width: auto;
                max-width: 42mm;
                object-fit: contain;
            }}

            .eyebrow {{
                font-size: 10.8px;
                letter-spacing: 0.14em;
                text-transform: uppercase;
                color: var(--color-green);
                font-weight: 700;
                text-align: center;
                flex: 1;
            }}

            .title {{
                margin: 0 0 5mm;
                font-size: 28px;
                line-height: 1.15;
                color: var(--color-green-dark);
            }}

            .doc-content {{
                font-size: 14.2px;
                color: var(--text-700);
            }}

            .page-text {{
                margin: 0;
                color: var(--text-700);
                white-space: pre-wrap;
                font-family: Arial, sans-serif;
                line-height: 1.5;
                font-size: 13.2px;
            }}
        </style>
    </head>
    <body>
        {"".join(page_sections)}
    </body>
</html>
"""


def render_pdf_from_html(html_path: Path, pdf_path: Path) -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(html_path.resolve().as_uri(), wait_until="networkidle")
        page.pdf(
            path=str(pdf_path),
            format="A4",
            landscape=True,
            print_background=True,
            margin={"top": "0mm", "right": "0mm", "bottom": "0mm", "left": "0mm"},
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
        raise RuntimeError("No text could be extracted from the source PDF")

    html_output = build_html(pages)
    OUTPUT_HTML.write_text(html_output, encoding="utf-8")
    render_pdf_from_html(OUTPUT_HTML, OUTPUT_PDF)

    print(f"Created HTML: {OUTPUT_HTML}")
    print(f"Created PDF: {OUTPUT_PDF}")
    print(f"Pages extracted: {len(pages)}")


if __name__ == "__main__":
    main()
