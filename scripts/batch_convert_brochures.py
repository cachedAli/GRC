from __future__ import annotations

import shutil
from pathlib import Path

import mammoth
from bs4 import BeautifulSoup, NavigableString, Tag
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.platypus import Image, KeepTogether, ListFlowable, ListItem, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


DOWNLOADS = Path(r"c:\Users\Ali\Downloads")
WORKSPACE = Path(r"d:\Work\complyverse_nextjs (1)")
LOGO = WORKSPACE / "liztek-logo.png"
COMPLIVERSE_LOGO = WORKSPACE / "compliwerseLogo.png"

DOC_NAMES = [
    "01-Brand-Messaging-Tagline.docx",
    "02-Product-Brochure-General.docx",
    "02a-Product-Brochure-Banking.docx",
    "02b-Product-Brochure-Healthcare.docx",
    "02b-Product-Brochure-Healthcare (1).docx",
    "02c-Product-Brochure-Technology.docx",
    "11-Industry-Solution-Briefs.docx",
]


def to_inline_html(node: Tag) -> str:
    text = str(node)
    return (
        text.replace("<strong>", "<b>")
        .replace("</strong>", "</b>")
        .replace("<em>", "<i>")
        .replace("</em>", "</i>")
    )


def plain_text(node: Tag) -> str:
    return node.get_text(" ", strip=True)


def fit_image(path: Path, max_width: float, max_height: float) -> Image:
    img_reader = ImageReader(str(path))
    w_px, h_px = img_reader.getSize()
    scale = min(max_width / w_px, max_height / h_px, 1.0)
    return Image(str(path), width=w_px * scale, height=h_px * scale)


def convert_docx_to_html(source_docx: Path, workspace_docx: Path) -> tuple[Path, int]:
    stem = workspace_docx.stem
    is_banking = stem == "02a-Product-Brochure-Banking"
    is_healthcare = stem == "02b-Product-Brochure-Healthcare"
    is_technology = stem == "02c-Product-Brochure-Technology"
    special_brochure = is_banking or is_healthcare or is_technology
    output_html = WORKSPACE / f"{stem}.html"
    assets_dir = WORKSPACE / f"{stem}_assets"

    if assets_dir.exists():
        shutil.rmtree(assets_dir)
    assets_dir.mkdir(parents=True, exist_ok=True)

    image_counter = {"value": 0}

    def convert_image(image: mammoth.images.Image) -> dict[str, str]:
        image_counter["value"] += 1
        ext = image.content_type.split("/")[-1].lower()
        ext = "jpg" if ext == "jpeg" else ext
        filename = f"image-{image_counter['value']:03d}.{ext}"
        img_path = assets_dir / filename
        with image.open() as image_bytes:
            img_path.write_bytes(image_bytes.read())
        return {"src": f"./{assets_dir.name}/{filename}"}

    shutil.copy2(source_docx, workspace_docx)

    with workspace_docx.open("rb") as f:
        result = mammoth.convert_to_html(f, convert_image=mammoth.images.img_element(convert_image))

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

        title = stem.replace("-", " ").strip()
        content_html = str(soup)
        title_markup = f'<h1 class="title">{title}</h1>' if not special_brochure else ""
        if special_brochure:
            content_html = content_html.replace(
                '<h2 class="doc-heading" style="text-align:center;">Banking &amp; Financial Services</h2>',
                '<h2 class="doc-heading" style="text-align:center;">Governance. Risk. Compliance. Unified by Intelligence</h2>',
                1,
            )
            content_html = content_html.replace(
                '<h2 class="doc-heading" style="text-align:center;">Healthcare &amp; Life Sciences</h2>',
                '<h2 class="doc-heading" style="text-align:center;">Governance. Risk. Compliance. Unified by Intelligence</h2>',
                1,
            )
            content_html = content_html.replace(
                '<h1 class="doc-heading">ComplyVerse AI for Technology &amp; SaaS</h1><h3 class="doc-heading">Governance. Risk. Compliance. Unified by Intelligence.</h3><h2 class="doc-heading">The Technology GRC Challenge</h2>',
                '<h2 class="doc-heading" style="text-align:center;">Governance. Risk. Compliance. Unified by Intelligence.</h2><h2 class="doc-heading">The Technology GRC Challenge</h2>',
                1,
            )
            content_html = content_html.replace(
                '<p class="doc-paragraph"><em>CompliVerse AI — Governance. Risk. Compliance. Unified by Intelligence.</em></p>',
                "",
                1,
            )
            content_html = content_html.replace(
                '<p class="doc-paragraph">Typical time to first value: <strong>2–4 weeks</strong></p><p class="doc-paragraph">https://compliverse.ai</p><p class="doc-paragraph">Liztek@liztek.ca</p>',
                '<p class="doc-paragraph">Typical time to first value: <strong>2–4 weeks</strong></p><p class="doc-paragraph"><strong>Schedule Your Demo:</strong> https://compliverse.ai</p><p class="doc-paragraph"><strong>Contact:</strong> Liztek@liztek.ca</p>',
                1,
            )
            content_html = content_html.replace(
                '<p class="doc-paragraph">Typical time to first value: <strong>3–5 weeks</strong></p><p class="doc-paragraph">[demo-link]</p><p class="doc-paragraph">info@[company-domain].com</p>',
                '<p class="doc-paragraph">Typical time to first value: <strong>3–5 weeks</strong></p><p class="doc-paragraph"><strong>Schedule Your Demo:</strong> https://compliverse.ai</p><p class="doc-paragraph"><strong>Contact:</strong> Liztek@liztek.ca</p>',
                1,
            )
            content_html = content_html.replace(
                '<p class="doc-paragraph">Typical time to first value: <strong>1–2 weeks</strong></p><p class="doc-paragraph"><strong>Schedule Your Demo:</strong> [demo-link]</p><p class="doc-paragraph"><strong>Contact:</strong> info@[company-domain].com</p><p class="doc-paragraph"><em>ComplyVerse AI — Governance. Risk. Compliance. Unified by Intelligence.</em></p>',
                '<p class="doc-paragraph">Typical time to first value: <strong>1–2 weeks</strong></p><p class="doc-paragraph"><strong>Schedule Your Demo:</strong> https://compliverse.ai</p><p class="doc-paragraph"><strong>Contact:</strong> Liztek@liztek.ca</p>',
                1,
            )

        if is_banking or is_healthcare:
            brand_html = '''
            <div class="brand-row">
                <img src="./liztek-logo.png" alt="LIZTEK" />
                <div class="eyebrow">Executive Product Brief | 2026</div>
                <img src="./compliwerseLogo.png" alt="CompliVerse AI" />
            </div>
'''
        else:
            brand_html = '''
            <div class="brand-row">
                <img src="./liztek-logo.png" alt="LIZTEK" />
                <div class="eyebrow">Executive Product Brief | 2026</div>
            </div>
'''

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
{brand_html.rstrip()}
            {title_markup}
            <div class=\"doc-content\">{content_html}</div>
        </section>
    </body>
</html>
"""

    output_html.write_text(html, encoding="utf-8")
    return output_html, image_counter["value"]


def generate_pdf(html_path: Path) -> tuple[Path, int]:
    pdf_path = WORKSPACE / f"{html_path.stem}.pdf"
    is_banking = html_path.stem == "02a-Product-Brochure-Banking"
    is_healthcare = html_path.stem == "02b-Product-Brochure-Healthcare"
    is_technology = html_path.stem == "02c-Product-Brochure-Technology"
    is_comparison_matrix = html_path.stem == "10-Competitive-Comparison-Matrix"
    is_solution_briefs = html_path.stem == "11-Industry-Solution-Briefs"
    special_brochure = is_banking or is_healthcare or is_technology or is_comparison_matrix or is_solution_briefs

    html = html_path.read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "html.parser")

    title_node = soup.select_one("h1.title")
    title = title_node.get_text(" ", strip=True) if title_node else ""
    content = soup.select_one(".doc-content") or soup.body

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="BodyCV", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.2, leading=14, textColor=colors.HexColor("#1f4d78")))
    styles.add(ParagraphStyle(name="H1CV", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=colors.HexColor("#021a48"), spaceBefore=10, spaceAfter=6))
    styles.add(ParagraphStyle(name="H2CV", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=colors.HexColor("#021a48"), spaceBefore=8, spaceAfter=5))
    styles.add(ParagraphStyle(name="H2CentredCV", parent=styles["H2CV"], alignment=1))
    styles.add(ParagraphStyle(name="H3CV", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=12, leading=16, textColor=colors.HexColor("#021a48"), spaceBefore=6, spaceAfter=4))
    styles.add(ParagraphStyle(name="TaglineCV", parent=styles["H3CV"], alignment=1))

    story = [Spacer(1, 6 * mm)]
    if title:
        story.extend([Paragraph(title, styles["H1CV"]), Spacer(1, 4 * mm)])

    pending_metrics_heading: Paragraph | None = None

    def flush_pending_metrics_heading() -> None:
        nonlocal pending_metrics_heading
        if pending_metrics_heading is not None:
            story.append(pending_metrics_heading)
            story.append(Spacer(1, 1.5 * mm))
            pending_metrics_heading = None

    for child in content.children:
        if isinstance(child, NavigableString):
            txt = str(child).strip()
            if txt:
                flush_pending_metrics_heading()
                story.append(Paragraph(txt, styles["BodyCV"]))
                story.append(Spacer(1, 2.2 * mm))
            continue

        if not isinstance(child, Tag):
            continue

        tag = child.name.lower()
        if tag == "h1":
            flush_pending_metrics_heading()
            story.append(Paragraph(plain_text(child), styles["H1CV"]))
        elif tag == "h2":
            heading_text = plain_text(child)
            if heading_text in {"Key Metrics for Banking", "Key Metrics for Healthcare"}:
                flush_pending_metrics_heading()
                story.append(PageBreak())
                pending_metrics_heading = Paragraph(heading_text, styles["H2CV"])
            elif heading_text.rstrip(".") == "Governance. Risk. Compliance. Unified by Intelligence":
                flush_pending_metrics_heading()
                story.append(Paragraph(heading_text, styles["H2CentredCV"]))
            else:
                flush_pending_metrics_heading()
                story.append(Paragraph(heading_text, styles["H2CV"]))
        elif tag in {"h3", "h4"}:
            heading_text = plain_text(child)
            flush_pending_metrics_heading()
            if heading_text == "Governance. Risk. Compliance. Unified by Intelligence.":
                story.append(Paragraph(heading_text, styles["TaglineCV"]))
            else:
                story.append(Paragraph(heading_text, styles["H3CV"]))
        elif tag == "p":
            img = child.find("img")
            if img and img.get("src"):
                flush_pending_metrics_heading()
                img_path = (WORKSPACE / img.get("src")).resolve()
                if img_path.exists():
                    story.append(fit_image(img_path, max_width=landscape(A4)[0] - 28 * mm, max_height=78 * mm))
                else:
                    story.append(Paragraph(to_inline_html(child), styles["BodyCV"]))
            else:
                flush_pending_metrics_heading()
                story.append(Paragraph(to_inline_html(child), styles["BodyCV"]))
        elif tag == "img" and child.get("src"):
            flush_pending_metrics_heading()
            img_path = (WORKSPACE / child.get("src")).resolve()
            if img_path.exists():
                story.append(fit_image(img_path, max_width=landscape(A4)[0] - 28 * mm, max_height=78 * mm))
        elif tag == "ul":
            flush_pending_metrics_heading()
            items = [ListItem(Paragraph(to_inline_html(li), styles["BodyCV"])) for li in child.find_all("li", recursive=False)]
            if items:
                story.append(ListFlowable(items, bulletType="bullet", leftIndent=10, bulletFontName="Helvetica"))
        elif tag == "ol":
            flush_pending_metrics_heading()
            items = [ListItem(Paragraph(to_inline_html(li), styles["BodyCV"]), value=idx) for idx, li in enumerate(child.find_all("li", recursive=False), start=1)]
            if items:
                story.append(ListFlowable(items, bulletType="1", leftIndent=10, bulletFontName="Helvetica"))
        elif tag == "table":
            rows = []
            for tr in child.find_all("tr"):
                cells = tr.find_all(["th", "td"])
                if not cells:
                    continue
                rows.append([Paragraph(plain_text(cell) or " ", styles["BodyCV"]) for cell in cells])
            if rows:
                max_cols = max(len(r) for r in rows)
                normalized = [r + [Paragraph(" ", styles["BodyCV"])] * (max_cols - len(r)) for r in rows]
                usable_width = landscape(A4)[0] - 22 * mm
                col_w = usable_width / max_cols
                tbl = Table(normalized, colWidths=[col_w] * max_cols, repeatRows=1, splitByRow=1)
                tbl.setStyle(
                    TableStyle(
                        [
                            ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#9fc6df")),
                            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e4f1fa")),
                            ("VALIGN", (0, 0), (-1, -1), "TOP"),
                            ("LEFTPADDING", (0, 0), (-1, -1), 4),
                            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                            ("TOPPADDING", (0, 0), (-1, -1), 3),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                        ]
                    )
                )
                if pending_metrics_heading is not None:
                    story.append(KeepTogether([pending_metrics_heading, Spacer(1, 1.5 * mm), tbl]))
                    pending_metrics_heading = None
                else:
                    story.append(tbl)

        if pending_metrics_heading is not None and tag != "table":
            flush_pending_metrics_heading()

        story.append(Spacer(1, 2.2 * mm))

    logo_img = ImageReader(str(LOGO)) if LOGO.exists() else None
    logo_w_px, logo_h_px = logo_img.getSize() if logo_img else (480, 134)
    compliverse_logo_img = ImageReader(str(COMPLIVERSE_LOGO)) if COMPLIVERSE_LOGO.exists() else None
    compliverse_logo_w_px, compliverse_logo_h_px = compliverse_logo_img.getSize() if compliverse_logo_img else (480, 134)

    small_logo_h = 6.5 * mm
    small_logo_w = small_logo_h * (logo_w_px / logo_h_px)
    big_logo_h = 14.5 * mm
    big_logo_w = big_logo_h * (logo_w_px / logo_h_px)
    small_compliverse_logo_h = 6.5 * mm
    small_compliverse_logo_w = small_compliverse_logo_h * (compliverse_logo_w_px / compliverse_logo_h_px)
    big_compliverse_logo_h = 13.8 * mm
    big_compliverse_logo_w = big_compliverse_logo_h * (compliverse_logo_w_px / compliverse_logo_h_px)
    healthcare_first_logo_h = 12.0 * mm
    healthcare_first_logo_w = healthcare_first_logo_h * (logo_w_px / logo_h_px)
    healthcare_first_compliverse_h = 18.0 * mm
    healthcare_first_compliverse_w = healthcare_first_compliverse_h * (compliverse_logo_w_px / compliverse_logo_h_px)
    footer_logo_h = 12.0 * mm
    footer_logo_w = footer_logo_h * (logo_w_px / logo_h_px)

    def draw_confidential(canv, w, h):
        canv.saveState()
        if hasattr(canv, "setFillAlpha"):
            canv.setFillAlpha(0.12)
        canv.setFont("Helvetica-Bold", 52)
        canv.setFillColor(colors.Color(1 / 255, 69 / 255, 123 / 255, alpha=0.12))
        canv.translate(w / 2, h / 2)
        canv.rotate(336)
        canv.drawCentredString(0, 0, "CONFIDENTIAL")
        canv.restoreState()

    def on_first_page(canv, _doc):
        w, h = landscape(A4)
        draw_confidential(canv, w, h)

        top_gap = 2.5 * mm
        left = 11 * mm
        right = w - (11 * mm)

        canv.saveState()
        if logo_img:
            if special_brochure and compliverse_logo_img:
                if is_healthcare:
                    logo_y = h - top_gap - healthcare_first_logo_h
                    center_logo_y = h - top_gap - healthcare_first_compliverse_h
                    canv.drawImage(logo_img, left, logo_y, width=healthcare_first_logo_w, height=healthcare_first_logo_h, preserveAspectRatio=True, mask="auto")
                    canv.drawImage(
                        compliverse_logo_img,
                        (w - healthcare_first_compliverse_w) / 2.0,
                        center_logo_y,
                        width=healthcare_first_compliverse_w,
                        height=healthcare_first_compliverse_h,
                        preserveAspectRatio=True,
                        mask="auto",
                    )

                    canv.setFont("Helvetica-Bold", 7.8)
                    canv.setFillColor(HexColor("#01457b"))
                    canv.drawString(right - (56 * mm), center_logo_y + (2.8 * mm), "Executive Product Brief | 2026")
                    line_y = logo_y - (1.6 * mm)
                else:
                    logo_y = h - top_gap - big_logo_h
                    canv.drawImage(logo_img, left, logo_y, width=big_logo_w, height=big_logo_h, preserveAspectRatio=True, mask="auto")

                    font_name = "Helvetica-Bold"
                    font_size = 8.5
                    txt = "EXECUTIVE PRODUCT BRIEF | 2026"
                    center_y = logo_y + (big_logo_h / 2.0)
                    ascent = pdfmetrics.getAscent(font_name, font_size)
                    descent = pdfmetrics.getDescent(font_name, font_size)
                    baseline = center_y - ((ascent + descent) / 2.0)

                    canv.setFont(font_name, font_size)
                    canv.setFillColor(HexColor("#01457b"))
                    canv.drawCentredString(w / 2.0, baseline, txt)
                    canv.drawImage(
                        compliverse_logo_img,
                        right - big_compliverse_logo_w,
                        logo_y,
                        width=big_compliverse_logo_w,
                        height=big_compliverse_logo_h,
                        preserveAspectRatio=True,
                        mask="auto",
                    )
                line_y = logo_y - (1.6 * mm)
            else:
                logo_y = h - top_gap - big_logo_h
                canv.drawImage(logo_img, left, logo_y, width=big_logo_w, height=big_logo_h, preserveAspectRatio=True, mask="auto")

                font_name = "Helvetica-Bold"
                font_size = 8.5
                txt = "EXECUTIVE PRODUCT BRIEF | 2026"
                center_y = logo_y + (big_logo_h / 2.0)
                ascent = pdfmetrics.getAscent(font_name, font_size)
                descent = pdfmetrics.getDescent(font_name, font_size)
                baseline = center_y - ((ascent + descent) / 2.0)

                canv.setFont(font_name, font_size)
                canv.setFillColor(HexColor("#01457b"))
                canv.drawRightString(right, baseline, txt)
                line_y = logo_y - (1.6 * mm)
        else:
            line_y = h - (11.5 * mm)

        canv.setStrokeColor(HexColor("#d3e7f4"))
        canv.setLineWidth(1)
        canv.line(left, line_y, right, line_y)
        canv.restoreState()

    def on_later_page(canv, _doc):
        w, h = landscape(A4)
        draw_confidential(canv, w, h)

        left = 11 * mm
        right = w - (11 * mm)
        canv.saveState()
        if logo_img:
            logo_y = h - (2.5 * mm) - small_logo_h
            canv.drawImage(logo_img, left, logo_y, width=small_logo_w, height=small_logo_h, preserveAspectRatio=True, mask="auto")
            if special_brochure and compliverse_logo_img:
                canv.drawImage(
                    compliverse_logo_img,
                    right - small_compliverse_logo_w,
                    h - (2.5 * mm) - small_compliverse_logo_h,
                    width=small_compliverse_logo_w,
                    height=small_compliverse_logo_h,
                    preserveAspectRatio=True,
                    mask="auto",
                )
                font_name = "Helvetica-Bold"
                font_size = 8.5
                txt = "EXECUTIVE PRODUCT BRIEF | 2026"
                center_y = logo_y + (small_logo_h / 2.0)
                ascent = pdfmetrics.getAscent(font_name, font_size)
                descent = pdfmetrics.getDescent(font_name, font_size)
                baseline = center_y - ((ascent + descent) / 2.0)
                canv.setFont(font_name, font_size)
                canv.setFillColor(HexColor("#01457b"))
                canv.drawCentredString(w / 2.0, baseline, txt)
        canv.setStrokeColor(HexColor("#d3e7f4"))
        canv.setLineWidth(1)
        canv.line(left, h - (10.5 * mm), right, h - (10.5 * mm))
        canv.restoreState()

    def draw_last_page_footer(canv):
        if not is_healthcare or not logo_img:
            return

        w, _h = landscape(A4)
        left = 11 * mm
        right = w - (11 * mm)
        footer_logo_x = (w - footer_logo_w) / 2.0
        footer_logo_y = 3.0 * mm
        footer_line_y = footer_logo_y + footer_logo_h + (4.0 * mm)

        canv.saveState()
        canv.setStrokeColor(HexColor("#d2e6f3"))
        canv.setLineWidth(1)
        canv.line(left, footer_line_y, right, footer_line_y)
        canv.drawImage(logo_img, footer_logo_x, footer_logo_y, width=footer_logo_w, height=footer_logo_h, preserveAspectRatio=True, mask="auto")
        canv.restoreState()

    class LastPageFooterCanvas(rl_canvas.Canvas):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self._saved_page_states: list[dict[str, object]] = []

        def showPage(self):
            self._saved_page_states.append(dict(self.__dict__))
            self._startPage()

        def save(self):
            page_count = len(self._saved_page_states)
            for page_index, state in enumerate(self._saved_page_states, start=1):
                self.__dict__.update(state)
                if page_index == page_count:
                    draw_last_page_footer(self)
                rl_canvas.Canvas.showPage(self)
            rl_canvas.Canvas.save(self)

    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=landscape(A4),
        leftMargin=11 * mm,
        rightMargin=11 * mm,
        topMargin=16 * mm,
        bottomMargin=11 * mm,
    )
    doc.build(story, onFirstPage=on_first_page, onLaterPages=on_later_page, canvasmaker=LastPageFooterCanvas)

    pages = len(PdfReader(str(pdf_path)).pages)
    return pdf_path, pages


def main() -> None:
    if not LOGO.exists():
        raise FileNotFoundError(LOGO)

    summary: list[tuple[str, int, int]] = []

    for name in DOC_NAMES:
        source = DOWNLOADS / name
        if not source.exists():
            print(f"SKIP missing source: {source}")
            continue

        workspace_docx = WORKSPACE / name
        html_path, image_count = convert_docx_to_html(source, workspace_docx)
        pdf_path, pages = generate_pdf(html_path)
        summary.append((name, image_count, pages))
        print(f"DONE {name} | images={image_count} | pages={pages}")
        print(f"  HTML: {html_path}")
        print(f"  PDF : {pdf_path}")

    print("\nSUMMARY")
    for name, images, pages in summary:
        print(f"- {name}: images={images}, pages={pages}")


if __name__ == "__main__":
    main()
