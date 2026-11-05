import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const port=Number(process.env.PORT||4173);
http.createServer((req,res)=>{
  const file=req.url==='/'?'index.html':req.url==='/app.js'?'app.js':null;
  if(!file){res.writeHead(404);return res.end('Not found');}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':'text/html; charset=utf-8');
  fs.createReadStream(path.join('dist',file)).pipe(res);
}).listen(port,()=>console.log('http://localhost:'+port));