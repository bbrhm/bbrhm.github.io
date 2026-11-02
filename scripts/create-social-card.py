"""Regenerate the static share image. Requires Pillow; not part of the site build."""
from pathlib import Path
import argparse
from PIL import Image, ImageDraw, ImageFont

parser = argparse.ArgumentParser()
parser.add_argument("--font", default="/System/Library/Fonts/Supplemental/Arial.ttf")
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
image = Image.new("RGB", (1200, 630), "#f6f2eb")
draw = ImageDraw.Draw(image)
ink, muted, line, accent = "#39342e", "#72685d", "#dcd4c8", "#536b54"
font = lambda size: ImageFont.truetype(args.font, size)
draw.text((80, 65), "bbrhm", font=font(32), fill=ink)
draw.text((900, 75), "bbrhm.github.io", font=font(22), fill=muted)
draw.line((80, 145, 1120, 145), fill=line, width=2)
draw.text((78, 214), "Projects & articles.", font=font(64), fill=ink)
draw.text((80, 310), "Personal projects, demos and occasional writing.", font=font(27), fill=muted)
draw.line((80, 424, 1120, 424), fill=line, width=2)
draw.rectangle((80, 474, 83, 507), fill=accent)
draw.text((100, 476), "Arabic Reader Toolkit", font=font(26), fill=ink)
draw.rectangle((670, 474, 673, 507), fill=accent)
draw.text((690, 476), "Open Map Driver", font=font(26), fill=ink)
target = root / "src/assets/social-card.png"
image.save(target, optimize=True)
print(target)
