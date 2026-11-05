import fs from 'node:fs';
import assert from 'node:assert/strict';
const js=fs.readFileSync('dist/app.js','utf8');
const html=fs.readFileSync('dist/index.html','utf8');
for(const name of ['True ending requirements','Illusory Pipa','Am I about to miss content?','I keep losing a fight','My PC stutters'])assert.ok(js.includes(name),name);
assert.match(js,/No reproducible fix is verified/);
assert.match(js,/No boss-specific solution has passed verification/);
assert.match(html,/aria-live="polite"/);
console.log('PASS: content categories, uncertainty labels, accessibility marker');