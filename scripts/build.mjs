import {cp, mkdir, rm, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root = new URL('../', import.meta.url);
const content = JSON.parse(await readFile(new URL('src/content.json', root), 'utf8'));
if (content.prompts.length < 8) throw new Error('模板数量不足');
await rm(new URL('dist/', root), {recursive:true, force:true});
await mkdir(new URL('dist/', root), {recursive:true});
await cp(new URL('src/', root), new URL('dist/', root), {recursive:true});
// 内容更新后更换资源地址，避免静态托管与手机浏览器继续使用旧版本。
const version = value => createHash('sha256').update(value).digest('hex').slice(0,12);
const contentText = await readFile(new URL('dist/content.json', root), 'utf8');
let app = await readFile(new URL('dist/app.js', root), 'utf8');
if (!app.includes("'./content.json'")) throw new Error('内容加载地址缺失');
app = app.replace("'./content.json'", `'./content.json?v=${version(contentText)}'`);
await writeFile(new URL('dist/app.js', root), app);
const css = await readFile(new URL('dist/styles.css', root), 'utf8');
let html = await readFile(new URL('dist/index.html', root), 'utf8');
html = html.replace('href="./styles.css"', `href="./styles.css?v=${version(css)}"`)
  .replace('src="./app.js"', `src="./app.js?v=${version(app)}"`);
await writeFile(new URL('dist/index.html', root), html);
console.log(`静态构建成功：dist/ · ${content.tools.length} 个工具 · ${content.prompts.length} 个模板 · ${content.guides.length} 篇指南`);
