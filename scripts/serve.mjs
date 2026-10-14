import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.TOOLKIT_PORT || 4178);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.md':'text/markdown; charset=utf-8','.csv':'text/csv; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  try {
    if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405);res.end();return;}
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const filename=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
    if (!filename.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
    if (!(await stat(filename)).isFile()) throw new Error('not file');
    const body=await readFile(filename);
    res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Length':body.length});
    res.end(req.method==='HEAD'?undefined:body);
  }catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('页面不存在');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
server.on('error',e=>{console.error(e.message);process.exit(1);});
