"""Create the printable seminar take-home worksheet."""

from pathlib import Path
import sys

from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1]).resolve()
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

NAVY = colors.HexColor("#243e35")
GOLD = colors.HexColor("#a58a54")
INK = colors.HexColor("#28362f")
MUTED = colors.HexColor("#5c655f")
LINE = colors.HexColor("#c8d2c8")
PALE = colors.HexColor("#f0f5ef")

WIDTH, HEIGHT = 612, 792  # U.S. Letter
LEFT, RIGHT = 45, 567


def text(c, x, y, value, size=10, color=INK, font="Helvetica"):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def line(c, x1, y1, x2, y2, color=LINE, width=0.8):
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)


def section(c, y, number, heading, note):
    c.setFillColor(PALE)
    c.roundRect(LEFT, y - 28, RIGHT - LEFT, 32, 5, fill=1, stroke=0)
    text(c, LEFT + 11, y - 17, number, 10, GOLD, "Helvetica-Bold")
    text(c, LEFT + 38, y - 17, heading, 13, NAVY, "Helvetica-Bold")
    text(c, LEFT, y - 45, note, 9, MUTED)


def write_row(c, y, label, hint=""):
    text(c, LEFT + 8, y, label, 10)
    if hint:
        text(c, LEFT + 8, y - 11, hint, 8, MUTED)
    text(c, 388, y, "$", 10, MUTED)
    line(c, 402, y - 2, RIGHT - 8, y - 2)


c = canvas.Canvas(str(OUTPUT), pagesize=(WIDTH, HEIGHT))
c.setTitle("Retirement Paycheck Worksheet | Broussard Financial Services")
c.setAuthor("Broussard Financial Services")

# Header
logo = ImageReader(str(ROOT / "public/images/bfs-logo-clean.png"))
c.drawImage(logo, LEFT, 728, width=122, height=41, preserveAspectRatio=True, mask="auto")
text(c, RIGHT - 183, 751, "FREE SEMINAR TAKE-HOME", 8, GOLD, "Helvetica-Bold")
text(c, RIGHT - 183, 737, "Keep this worksheet for yourself", 8, MUTED)
line(c, LEFT, 716, RIGHT, 716, GOLD, 1.5)
text(c, LEFT, 683, "Your retirement paycheck", 24, NAVY, "Helvetica-Bold")
text(c, LEFT, 664, "A simple starting point for income, expenses, and questions to explore.", 10, MUTED)
text(c, LEFT, 644, "Use approximate monthly amounts. Do not write account numbers or Social Security numbers.", 9, MUTED)

section(c, 617, "01", "Income you can count on", "Write estimated monthly amounts before tax. Use $0 if a source does not apply.")
write_row(c, 550, "Social Security")
write_row(c, 520, "Pension / other guaranteed income")
write_row(c, 490, "Annuity income already in place")
line(c, LEFT + 8, 475, RIGHT - 8, 475)
write_row(c, 459, "Total dependable monthly income")

section(c, 423, "02", "Essential monthly expenses", "Estimate the amount needed for housing, food, health care, utilities, and other basics.")
write_row(c, 356, "Essential spending each month")
write_row(c, 326, "Income gap: expenses minus dependable income", "If income exceeds expenses, write $0 and note the surplus below.")
text(c, LEFT + 8, 290, "Notes about a surplus or irregular costs:", 9, MUTED)
line(c, LEFT + 8, 274, RIGHT - 8, 274)

section(c, 247, "03", "Savings and decisions to review", "List account types and questions; leave balances off this shared seminar copy if preferred.")
text(c, LEFT + 8, 180, "Accounts I want to review:", 10)
for x, label in [(188, "401(k) / 403(b) / TSP"), (328, "IRA"), (410, "Bank savings / CDs")]:
    c.setStrokeColor(LINE)
    c.rect(x, 169, 10, 10, fill=0, stroke=1)
    text(c, x + 15, 171, label, 8.5)
text(c, LEFT + 8, 146, "Questions to ask before changing an account:", 10)
text(c, LEFT + 8, 127, "When do I need income?  How much cash must remain accessible?", 9, MUTED)
text(c, LEFT + 8, 112, "What are the costs, taxes, guarantees, and beneficiary choices?", 9, MUTED)
line(c, LEFT + 8, 92, RIGHT - 8, 92)

line(c, LEFT, 69, RIGHT, 69, GOLD, 0.8)
text(c, LEFT, 55, "Broussard Financial Services", 8, NAVY, "Helvetica-Bold")
text(c, LEFT, 42, "broussardfinancialservices.com  |  info@broussardfinancialservices.com", 8, MUTED)
text(c, LEFT, 26, "Educational worksheet only. Figures are estimates; this is not a recommendation or product quote.", 7.5, MUTED)

c.showPage()
c.save()
print(OUTPUT)
