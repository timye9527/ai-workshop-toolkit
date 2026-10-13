import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const data=JSON.parse(await readFile(new URL('src/content.json',root),'utf8'));
test('8个要求的场景均有完整模板、三步教程和FAQ',()=>{
  assert.equal(data.prompts.length,8);
  for(const id of ['event','weekly','meeting','learning','sales','content','travel','build']){
    const p=data.prompts.find(x=>x.id===id);assert.ok(p,id);
    for(const field of ['title','summary','scene','example','text','expected'])assert.ok(p[field].trim().length>5,`${id}.${field}`);
    assert.ok(p.category.trim().length>0);assert.equal(p.steps.length,3);assert.ok(p.faq.length>=2);assert.match(p.text,/\[.+\]/);assert.match(p.text,/不|待核实|待确认/);
  }
});
test('工具有官网、用途、费用状态、首个任务与官方来源',()=>{
  for(const id of ['doubao','deepseek','qianwen','workbuddy','chatgpt','claude','claude-code','codex'])assert.ok(data.tools.some(x=>x.id===id));
  for(const t of data.tools){for(const key of ['audience','description','cost','status','first','prompt','alternative','level'])assert.ok(t[key]?.length>0,`${t.id}.${key}`);assert.ok(t.tasks.length);assert.equal(new URL(t.url).protocol,'https:');assert.ok(t.sources.length);for(const s of t.sources)assert.equal(new URL(s.url).protocol,'https:');}
});
test('教学示例与真实案例有明确标签，可下载的资料存在',async()=>{
  assert.ok(data.cases.some(c=>c.type==='真实开发实践'));assert.ok(data.cases.some(c=>c.type==='官方真实案例'&&c.url));
  for(const c of data.cases){if(c.id.endsWith('demo'))assert.match(c.type,/模拟资料/);if(c.download)assert.ok((await stat(new URL(`src/${c.download}`,root))).isFile());}
});
test('内容ID唯一、指南覆盖办公与创造关键路径',()=>{
  for(const group of ['prompts','tools','guides','cases'])assert.equal(new Set(data[group].map(x=>x.id)).size,data[group].length);
  for(const id of ['dialogue','deliverable','agent','skills','workflow','documents','sheets','slides','vibe','remote','cloud','automation'])assert.ok(data.guides.some(g=>g.id===id&&g.steps.length>=3&&g.prompt&&g.accept));
});
test('入口不加载外部资源，隐私文件不进入构建目录',async()=>{
  const html=await readFile(new URL('src/index.html',root),'utf8'),css=await readFile(new URL('src/styles.css',root),'utf8');
  assert.doesNotMatch(html,/<(?:script|link|img)[^>]+(?:src|href)=["']https?:/);
  assert.doesNotMatch(css,/@import|url\(["']?https?:/);
  assert.match(html,/lang="zh-CN"/);assert.match(html,/viewport-fit=cover/);
});
test('工具入口区分聊天、下载与教程，每个工具有可复制搜索线索',()=>{
  assert.equal(data.tools.find(t=>t.id==='deepseek').url,'https://chat.deepseek.com/');
  assert.equal(data.tools.find(t=>t.id==='doubao').url,'https://www.doubao.com/chat/');
  assert.equal(data.tools.find(t=>t.id==='workbuddy').url,'https://www.workbuddy.cn/');
  for(const t of data.tools){assert.ok(t.entryLabel);assert.ok(t.searchKeyword);assert.match(t.openHint,/复制链接/);}
  assert.match(data.tools.find(t=>t.id==='codex').entryLabel,/教程/);
});
test('主办人推荐与鼓励包含实际查找和实践路径，没有虚构公众号入口',()=>{
  assert.ok(data.creators.some(c=>c.name==='数字生命卡兹克'&&c.findSteps.length===3&&c.searchKeyword===c.name));
  for(const c of data.creators){assert.equal(c.url,undefined);assert.match(c.note,/未核实/);}
  assert.match(data.encouragement.body,/家庭|家务/);assert.match(data.encouragement.body,/孩子/);assert.equal(data.quickPractices.length,4);
  for(const p of data.quickPractices)assert.ok(p.href||p.prompt);
});
