"""只打包dist内的可发布静态文件，无购买、上传或发布行为。"""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib
import json

project = Path(__file__).resolve().parent.parent
source = project / 'dist'
files = sorted(p for p in source.rglob('*') if p.is_file())
if not files or not (source / 'index.html').is_file():
    raise SystemExit('请先执行 npm run build')
allowed = {'.html', '.css', '.js', '.json', '.svg', '.md', '.csv', '.png'}
if any(p.suffix not in allowed or p.name.startswith('.') for p in files):
    raise SystemExit('发现非静态发布文件，已停止打包')
release = project / 'release'
release.mkdir(exist_ok=True)
archive = release / 'ai-workshop-toolkit-static.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED) as z:
    for p in files:
        z.write(p, p.relative_to(source).as_posix())
manifest = {
    'files': [{'path': p.relative_to(source).as_posix(), 'bytes': p.stat().st_size,
               'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in files],
    'totalBytes': sum(p.stat().st_size for p in files),
    'zipBytes': archive.stat().st_size,
    'zipSha256': hashlib.sha256(archive.read_bytes()).hexdigest(),
    'published': False
}
(release / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(f'静态准备包：{len(files)}个文件，{manifest["totalBytes"]}字节；ZIP {manifest["zipBytes"]}字节，未发布。')
