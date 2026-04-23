from __future__ import annotations

from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import KeepTogether, Image, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


def to_inline_html(node: Tag) -> str:
    text = str(node)
    return text.replace("<strong>", "<b>").replace("</strong>", "</b>").replace("<em>", "<i>").replace("</em>", "</i>")


def plain_text(node: Tag) -> str:
    return node.get_text(" ", strip=True)


def fit_image(path: Path, max_width: float, max_height: float) -> Image:
    img_reader = ImageReader(str(path))
    width_px, height_px = img_reader.getSize()
    scale = min(max_width / width_px, max_height / height_px, 1.0)
    return Image(str(path), width=width_px * scale, height=height_px * scale)


def main() -> None:
    workspace = Path(r"d:\Work\complyverse_nextjs (1)")
    src = workspace / "09-Whitepaper-AI-Native-GRC.html"
    dst = workspace / "09-Whitepaper-AI-Native-GRC.pdf"
    left_logo = workspace / "liztek-logo.png"
    right_logo = workspace / "compliwerseLogo.png"

    html = src.read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "html.parser")
    content = soup.select_one(".doc-content") or soup.body

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="BodyCV", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.2, leading=14, textColor=colors.black))
    styles.add(ParagraphStyle(name="H1CV", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=colors.black, spaceBefore=10, spaceAfter=6))
    styles.add(ParagraphStyle(name="H2CV", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=colors.black, spaceBefore=8, spaceAfter=5, keepWithNext=1))
    styles.add(ParagraphStyle(name="H2CentredCV", parent=styles["H2CV"], alignment=1, spaceBefore=24 * mm))
    styles.add(ParagraphStyle(name="H3CV", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=12, leading=16, textColor=colors.black, spaceBefore=6, spaceAfter=4, keepWithNext=1))
    styles.add(ParagraphStyle(name="TaglineCV", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, alignment=1, textColor=colors.black, spaceBefore=0, spaceAfter=6))

    story = [Spacer(1, 6 * mm)]
    pending_keep_together_heading: str | None = None

    for child in content.children:
        if isinstance(child, NavigableString):
            txt = str(child).strip()
            if txt:
                story.append(Paragraph(txt, styles["BodyCV"]))
                story.append(Spacer(1, 2.2 * mm))
            continue

        if not isinstance(child, Tag):
            continue

        tag = child.name.lower()
        if tag == "h1":
            heading_text = plain_text(child)
            if heading_text != "Whitepaper AI Native GRC":
                story.append(Paragraph(heading_text, styles["H1CV"]))
        elif tag == "h2":
            heading_text = plain_text(child)
            if heading_text.rstrip(".") in {
                "The Future of AI-Native GRC: From Reactive Compliance to Proactive Governance",
                "Governance. Risk. Compliance. Unified by Intelligence",
            }:
                story.append(Paragraph("Governance. Risk. Compliance. Unified by Intelligence.", styles["H2CentredCV"]))
            else:
                story.append(Paragraph(heading_text, styles["H2CV"]))
        elif tag in {"h3", "h4"}:
            heading_text = plain_text(child)
            if heading_text == "6.1 Continuous Compliance as the Default State":
                pending_keep_together_heading = heading_text
                continue
            if heading_text == "Governance. Risk. Compliance. Unified by Intelligence.":
                story.append(Paragraph(heading_text, styles["TaglineCV"]))
            else:
                story.append(Paragraph(heading_text, styles["H3CV"]))
        elif tag == "p":
            paragraph_text = plain_text(child)
            if paragraph_text in {
                "CompliVerse AI — Governance. Risk. Compliance. Unified by Intelligence",
                "End of Whitepaper",
            }:
                continue

            if pending_keep_together_heading is not None:
                story.append(
                    KeepTogether(
                        [
                            Paragraph(pending_keep_together_heading, styles["H3CV"]),
                            Paragraph(to_inline_html(child), styles["BodyCV"]),
                        ]
                    )
                )
                pending_keep_together_heading = None
                story.append(Spacer(1, 2.2 * mm))
                continue

            img = child.find("img")
            if img and img.get("src"):
                img_path = (workspace / img.get("src")).resolve()
                if img_path.exists():
                    story.append(fit_image(img_path, max_width=landscape(A4)[0] - 28 * mm, max_height=78 * mm))
                else:
                    story.append(Paragraph(to_inline_html(child), styles["BodyCV"]))
            else:
                story.append(Paragraph(to_inline_html(child), styles["BodyCV"]))
        elif tag == "img" and child.get("src"):
            img_path = (workspace / child.get("src")).resolve()
            if img_path.exists():
                story.append(fit_image(img_path, max_width=landscape(A4)[0] - 28 * mm, max_height=78 * mm))
        elif tag == "ul":
            items = [ListItem(Paragraph(to_inline_html(li), styles["BodyCV"])) for li in child.find_all("li", recursive=False)]
            if items:
                story.append(ListFlowable(items, bulletType="bullet", leftIndent=10, bulletFontName="Helvetica"))
        elif tag == "ol":
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
                story.append(tbl)

        story.append(Spacer(1, 2.2 * mm))

    left_logo_img = ImageReader(str(left_logo)) if left_logo.exists() else None
    left_logo_w_px, left_logo_h_px = left_logo_img.getSize() if left_logo_img else (480, 134)
    right_logo_img = ImageReader(str(right_logo)) if right_logo.exists() else None
    right_logo_w_px, right_logo_h_px = right_logo_img.getSize() if right_logo_img else (480, 134)

    small_logo_h = 6.5 * mm
    small_logo_w = small_logo_h * (left_logo_w_px / left_logo_h_px)
    small_right_logo_w = small_logo_h * (right_logo_w_px / right_logo_h_px)
    big_logo_h = 14.5 * mm
    big_logo_w = big_logo_h * (left_logo_w_px / left_logo_h_px)
    big_right_logo_h = 12.25 * mm
    big_right_logo_w = big_right_logo_h * (right_logo_w_px / right_logo_h_px)

    def draw_confidential(canv, w, h):
        canv.saveState()
        if hasattr(canv, "setFillAlpha"):
            canv.setFillAlpha(0.12)
        canv.setFont("Helvetica-Bold", 52)
        canv.setFillColor(colors.Color(0, 0, 0, alpha=0.12))
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
        if left_logo_img:
            logo_y = h - top_gap - big_logo_h
            canv.drawImage(left_logo_img, left, logo_y, width=big_logo_w, height=big_logo_h, preserveAspectRatio=True, mask="auto")

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

            if right_logo_img:
                canv.drawImage(
                    right_logo_img,
                    right - big_right_logo_w,
                    logo_y + ((big_logo_h - big_right_logo_h) / 2.0),
                    width=big_right_logo_w,
                    height=big_right_logo_h,
                    preserveAspectRatio=True,
                    mask="auto",
                )
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
        if left_logo_img:
            header_y = h - (2.5 * mm) - small_logo_h
            canv.drawImage(left_logo_img, left, header_y, width=small_logo_w, height=small_logo_h, preserveAspectRatio=True, mask="auto")
            if right_logo_img:
                canv.drawImage(
                    right_logo_img,
                    right - small_right_logo_w,
                    header_y,
                    width=small_right_logo_w,
                    height=small_logo_h,
                    preserveAspectRatio=True,
                    mask="auto",
                )
        canv.setStrokeColor(HexColor("#d3e7f4"))
        canv.setLineWidth(1)
        canv.line(left, h - (10.5 * mm), right, h - (10.5 * mm))
        canv.restoreState()

    doc = SimpleDocTemplate(
        str(dst),
        pagesize=landscape(A4),
        leftMargin=11 * mm,
        rightMargin=11 * mm,
        topMargin=16 * mm,
        bottomMargin=11 * mm,
    )
    doc.build(story, onFirstPage=on_first_page, onLaterPages=on_later_page)

    print(f"Created PDF: {dst}")


if __name__ == "__main__":
    main()