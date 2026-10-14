"""离线生成公开入口二维码。仅更新网址时使用，需ReportLab与Pillow。"""
import json
from pathlib import Path
from html import escape
from PIL import Image, ImageDraw
from reportlab.graphics.barcode import qrencoder

root = Path(__file__).resolve().parent.parent
entry = json.loads((root / 'src/content.json').read_text())['shareEntry']
qr = qrencoder.QRCode(None, qrencoder.QRErrorCorrectLevel.M)
qr.addData(entry['url'])
qr.make()
modules, border, scale = qr.getModuleCount(), 4, 24
size = modules + border * 2
image = Image.new('L', (size * scale, size * scale), 255)
draw = ImageDraw.Draw(image)
paths = []
for row in range(modules):
    for col in range(modules):
        if qr.isDark(row, col):
            x, y = col + border, row + border
            draw.rectangle((x * scale, y * scale, (x + 1) * scale - 1,
                            (y + 1) * scale - 1), fill=0)
            paths.append(f'M{x},{y}h1v1h-1z')
png_path = root / 'src' / entry['qrPng'].removeprefix('./')
svg_path = root / 'src' / entry['qrSvg'].removeprefix('./')
png_path.parent.mkdir(parents=True, exist_ok=True)
image.save(png_path, optimize=True, dpi=(300, 300))
svg_path.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="984" height="984" shape-rendering="crispEdges"><title>EOE AI实战工具包 · GitHub版二维码</title><desc>{escape(entry["url"])}</desc><rect width="{size}" height="{size}" fill="#fff"/><path d="{"".join(paths)}" fill="#000"/></svg>\n')
print(f'二维码已离线生成：{entry["url"]} · {image.width}×{image.height}px')
