import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist');
for(const file of ['index.html','app.js','guides.js'])fs.copyFileSync(path.join('src',file),path.join('dist',file));
assert.match(fs.readFileSync('dist/index.html','utf8'),/app\.js/);
assert.ok(fs.existsSync('dist/guides.js'));
console.log('PASS: dependency-free production build with guide data');