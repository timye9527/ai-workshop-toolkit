import {cp, mkdir, rm, readFile} from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const content = JSON.parse(await readFile(new URL('src/content.json', root), 'utf8'));
if (content.prompts.length < 8) throw new Error('模板数量不足');
await rm(new URL('dist/', root), {recursive:true, force:true});
await mkdir(new URL('dist/', root), {recursive:true});
await cp(new URL('src/', root), new URL('dist/', root), {recursive:true});
console.log(`静态构建成功：dist/ · ${content.tools.length} 个工具 · ${content.prompts.length} 个模板 · ${content.guides.length} 篇指南`);
