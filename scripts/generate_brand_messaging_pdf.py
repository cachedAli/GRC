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
from reportlab.platypus import ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


def to_inline_html(node: Tag) -> str:
    text = str(node)
    return text.replace('<strong>', '<b>').replace('</strong>', '</b>').replace('<em>', '<i>').replace('</em>', '</i>')


def plain_text(node: Tag) -> str:
    return node.get_text(' ', strip=True)


def main() -> None:
    workspace = Path(r'd:\Work\complyverse_nextjs (1)')
    src = workspace / '01-Brand-Messaging-Tagline.html'
    dst = workspace / '01-Brand-Messaging-Tagline.pdf'
    logo = workspace / 'liztek-logo.png'

    html = src.read_text(encoding='utf-8')
    soup = BeautifulSoup(html, 'html.parser')

    title_node = soup.select_one('h1.title')
    title = title_node.get_text(' ', strip=True) if title_node else src.stem
    content = soup.select_one('.doc-content') or soup.body

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='BodyCV', parent=styles['BodyText'], fontName='Helvetica', fontSize=10.2, leading=14, textColor=colors.black))
    styles.add(ParagraphStyle(name='H1CV', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=colors.black, spaceBefore=10, spaceAfter=6))
    styles.add(ParagraphStyle(name='H2CV', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=colors.black, spaceBefore=8, spaceAfter=5))
    styles.add(ParagraphStyle(name='H3CV', parent=styles['Heading3'], fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=colors.black, spaceBefore=6, spaceAfter=4))
    styles.add(ParagraphStyle(name='TaglineCV', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=14, leading=18, alignment=1, textColor=colors.black, spaceBefore=0, spaceAfter=6))

    story = [
        Spacer(1, 6 * mm),
        Paragraph('Brand Messaging & Tagline Foundation', styles['TaglineCV']),
        Spacer(1, 2 * mm),
        Paragraph(title, styles['H1CV']),
        Spacer(1, 4 * mm),
    ]

    for child in content.children:
        if isinstance(child, NavigableString):
            txt = str(child).strip()
            if txt:
                story.append(Paragraph(txt, styles['BodyCV']))
                story.append(Spacer(1, 2.2 * mm))
            continue
        if not isinstance(child, Tag):
            continue

        tag = child.name.lower()
        if tag == 'h1':
            story.append(Paragraph(plain_text(child), styles['H1CV']))
        elif tag == 'h2':
            story.append(Paragraph(plain_text(child), styles['H2CV']))
        elif tag in {'h3', 'h4'}:
            story.append(Paragraph(plain_text(child), styles['H3CV']))
        elif tag == 'p':
            story.append(Paragraph(to_inline_html(child), styles['BodyCV']))
        elif tag == 'ul':
            items = [ListItem(Paragraph(to_inline_html(li), styles['BodyCV'])) for li in child.find_all('li', recursive=False)]
            if items:
                story.append(ListFlowable(items, bulletType='bullet', leftIndent=10, bulletFontName='Helvetica'))
        elif tag == 'ol':
            items = [ListItem(Paragraph(to_inline_html(li), styles['BodyCV']), value=idx) for idx, li in enumerate(child.find_all('li', recursive=False), start=1)]
            if items:
                story.append(ListFlowable(items, bulletType='1', leftIndent=10, bulletFontName='Helvetica'))
        elif tag == 'table':
            rows = []
            for tr in child.find_all('tr'):
                cells = tr.find_all(['th', 'td'])
                if not cells:
                    continue
                rows.append([Paragraph(plain_text(cell) or ' ', styles['BodyCV']) for cell in cells])
            if rows:
                max_cols = max(len(r) for r in rows)
                normalized = [r + [Paragraph(' ', styles['BodyCV'])] * (max_cols - len(r)) for r in rows]
                usable_width = landscape(A4)[0] - 22 * mm
                col_w = usable_width / max_cols
                tbl = Table(normalized, colWidths=[col_w] * max_cols, repeatRows=1, splitByRow=1)
                tbl.setStyle(TableStyle([
                    ('GRID', (0, 0), (-1, -1), 0.6, colors.HexColor('#9fc6df')),
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e4f1fa')),
                    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                    ('LEFTPADDING', (0, 0), (-1, -1), 4),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
                    ('TOPPADDING', (0, 0), (-1, -1), 3),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
                ]))
                story.append(tbl)

        story.append(Spacer(1, 2.2 * mm))

    logo_img = ImageReader(str(logo)) if logo.exists() else None
    logo_w_px, logo_h_px = logo_img.getSize() if logo_img else (480, 134)
    small_logo_h = 6.5 * mm
    small_logo_w = small_logo_h * (logo_w_px / logo_h_px)
    big_logo_h = 14.5 * mm
    big_logo_w = big_logo_h * (logo_w_px / logo_h_px)

    def draw_confidential(canv, w, h):
        canv.saveState()
        if hasattr(canv, 'setFillAlpha'):
            canv.setFillAlpha(0.12)
        canv.setFont('Helvetica-Bold', 52)
        canv.setFillColor(colors.Color(0, 0, 0, alpha=0.12))
        canv.translate(w / 2, h / 2)
        canv.rotate(336)
        canv.drawCentredString(0, 0, 'CONFIDENTIAL')
        canv.restoreState()

    def on_first_page(canv, _doc):
        w, h = landscape(A4)
        draw_confidential(canv, w, h)

        top_gap = 2.5 * mm
        left = 11 * mm
        right = w - (11 * mm)

        canv.saveState()
        if logo_img:
            logo_y = h - top_gap - big_logo_h
            canv.drawImage(logo_img, left, logo_y, width=big_logo_w, height=big_logo_h, preserveAspectRatio=True, mask='auto')

            font_name = 'Helvetica-Bold'
            font_size = 8.5
            right_text = 'EXECUTIVE PRODUCT BRIEF | 2026'
            center_y = logo_y + (big_logo_h / 2.0)
            ascent = pdfmetrics.getAscent(font_name, font_size)
            descent = pdfmetrics.getDescent(font_name, font_size)
            baseline = center_y - ((ascent + descent) / 2.0)

            canv.setFont(font_name, font_size)
            canv.setFillColor(colors.black)
            canv.drawRightString(right, baseline, right_text)

            canv.setFont('Helvetica-Bold', 12)
            canv.setFillColor(colors.black)
            canv.drawCentredString(w / 2.0, baseline, 'CompliVerse AI')

            line_y = logo_y - (1.6 * mm)
        else:
            line_y = h - (11.5 * mm)

        canv.setStrokeColor(HexColor('#d3e7f4'))
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
            canv.drawImage(logo_img, left, h - (2.5 * mm) - small_logo_h, width=small_logo_w, height=small_logo_h, preserveAspectRatio=True, mask='auto')
        canv.setStrokeColor(HexColor('#d3e7f4'))
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

    print(f'Created PDF: {dst}')


if __name__ == '__main__':
    main()
