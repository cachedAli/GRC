from __future__ import annotations

import html
import re
import shutil
import subprocess
from pathlib import Path

import fitz
from playwright.sync_api import sync_playwright


WORKSPACE = Path(r"d:\Work\complyverse_nextjs (1)")
DOWNLOADS = Path.home() / "Downloads"
SOURCE_PDF = DOWNLOADS / "p2p-agentic-ai-presentation.pdf"
OUTPUT_STEM = "p2p-agentic-ai-presentation-pixel-perfect"
OUTPUT_HTML = WORKSPACE / f"{OUTPUT_STEM}.html"
OUTPUT_PDF = WORKSPACE / f"{OUTPUT_STEM}.pdf"
ASSETS_DIR = WORKSPACE / f"{OUTPUT_STEM}_assets"
PAGE_RENDER_SCALE = 3.0

PAGE_WIDTH_PT = 960
PAGE_HEIGHT_PT = 540


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


def extract_hidden_text_pages(pdf_path: Path) -> list[str]:
    pdftotext = find_pdftotext()
    temp_text = WORKSPACE / "_p2p_hidden_text_temp.txt"
    cmd = [str(pdftotext), "-layout", "-enc", "UTF-8", str(pdf_path), str(temp_text)]
    subprocess.run(cmd, check=True, capture_output=True, text=True)

    raw_text = temp_text.read_text(encoding="utf-8", errors="ignore")
    temp_text.unlink(missing_ok=True)

    pages = [page.strip("\n") for page in raw_text.replace("\r\n", "\n").split("\f")]
    return [normalize_brand_spelling(page) for page in pages if page.strip()]


def render_pdf_pages(pdf_path: Path, assets_dir: Path, scale: float) -> list[Path]:
    assets_dir.mkdir(parents=True, exist_ok=True)
    rendered_paths: list[Path] = []

    doc = fitz.open(pdf_path)
    try:
        matrix = fitz.Matrix(scale, scale)
        for index, page in enumerate(doc, start=1):
            pixmap = page.get_pixmap(matrix=matrix, alpha=False)
            image_path = assets_dir / f"page-{index:03d}.png"
            pixmap.save(image_path)
            rendered_paths.append(image_path)
    finally:
        doc.close()

    return rendered_paths


def build_html(page_images: list[Path], hidden_pages: list[str]) -> str:
    page_sections: list[str] = []

    for index, image_path in enumerate(page_images, start=1):
        hidden_text = hidden_pages[index - 1] if index - 1 < len(hidden_pages) else ""
        page_sections.append(
            f"""
        <section class=\"page\" aria-label=\"P2P presentation page {index}\">\n            <img class=\"page-image\" src=\"./{ASSETS_DIR.name}/{image_path.name}\" alt=\"\" aria-hidden=\"true\" />\n            <pre class=\"sr-only\">{html.escape(hidden_text)}</pre>\n        </section>
            """.strip()
        )

    return f"""<!doctype html>
<html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\" />
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
        <title>P2P Agentic AI Presentation - Pixel Perfect</title>
        <style>
            :root {{
                --page-width: {PAGE_WIDTH_PT}pt;
                --page-height: {PAGE_HEIGHT_PT}pt;
                --page-bg: #ffffff;
                --app-bg: #eaf1f7;
            }}

            * {{ box-sizing: border-box; }}

            @page {{
                size: {PAGE_WIDTH_PT}pt {PAGE_HEIGHT_PT}pt;
                margin: 0;
            }}

            html,
            body {{
                width: 100%;
                min-height: 100%;
                margin: 0;
                padding: 0;
                background: var(--app-bg);
                overflow-x: hidden;
            }}

            body {{
                font-family: Arial, sans-serif;
            }}

            .page {{
                width: var(--page-width);
                height: var(--page-height);
                margin: 0 auto;
                position: relative;
                overflow: hidden;
                background: var(--page-bg);
                page-break-after: always;
                break-after: page;
            }}

            .page-image {{
                display: block;
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: fill;
            }}

            .sr-only {{
                position: absolute;
                left: -100000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
                white-space: pre-wrap;
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

    hidden_pages = extract_hidden_text_pages(SOURCE_PDF)
    page_images = render_pdf_pages(SOURCE_PDF, ASSETS_DIR, PAGE_RENDER_SCALE)

    if not page_images:
        raise RuntimeError("No pages were rendered from the source PDF")

    html_output = build_html(page_images, hidden_pages)
    OUTPUT_HTML.write_text(html_output, encoding="utf-8")
    render_pdf_from_html(OUTPUT_HTML, OUTPUT_PDF)

    print(f"Created HTML: {OUTPUT_HTML}")
    print(f"Created PDF: {OUTPUT_PDF}")
    print(f"Rendered pages: {len(page_images)}")


if __name__ == "__main__":
    main()
