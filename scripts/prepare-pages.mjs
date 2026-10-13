import {cp,rm,mkdir,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
await rm(new URL('docs/',root),{recursive:true,force:true});
await mkdir(new URL('docs/',root),{recursive:true});
await cp(new URL('dist/',root),new URL('docs/',root),{recursive:true});
await writeFile(new URL('docs/.nojekyll',root),'');
console.log('GitHub Pages静态目录准备完成：docs/');
