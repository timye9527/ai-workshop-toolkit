// 只请求content.json中的公开链接，不使用登录会话或API密钥。
import {readFile,mkdir,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const data=JSON.parse(await readFile(new URL('src/content.json',root),'utf8'));
const urls=[...new Set([...data.tools.flatMap(t=>[t.url,...t.sources.map(s=>s.url)]),...data.networkServices.flatMap(n=>[n.url,...n.sources.map(s=>s.url)]),...data.resources.map(r=>r.url),...data.cases.filter(c=>c.url).map(c=>c.url)])];
const results=[];
for(let i=0;i<urls.length;i+=4){
  await Promise.all(urls.slice(i,i+4).map(async url=>{
    try{const r=await fetch(url,{signal:AbortSignal.timeout(12000),redirect:'follow',headers:{'User-Agent':'EOE-Toolkit-Link-Check/1.0'}});results.push({url,status:r.status,finalUrl:r.url,ok:r.ok});await r.body?.cancel();}
    catch(e){results.push({url,ok:false,error:e.name});}
  }));
}
await mkdir(new URL('test-results/',root),{recursive:true});
await writeFile(new URL('test-results/link-results.json',root),JSON.stringify({checked:new Date().toISOString().slice(0,10),note:'This host only; HTTP result is not a mainland or account-eligibility test.',results},null,2));
for(const r of results)console.log(`${r.status||r.error} ${r.url}`);
console.log(`完成${results.length}个官方入口与资料链接的HTTP检查；失败或拦截需人工检查。`);
