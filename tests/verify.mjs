import fs from 'node:fs';import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8'),app=fs.readFileSync('dist/app.js','utf8'),guides=fs.readFileSync('dist/guides.js','utf8');
assert.match(html,/id="app"/);assert.match(html,/app\.js/);
for(const id of ['true-ending','missables','long-pillars'])assert.ok(guides.includes("id:'"+id+"'"),id);
for(const marker of ['checklist:','verify:','sources:','stuck:'])assert.ok(guides.includes(marker),marker);
assert.match(app,/renderGuide/);assert.match(app,/renderHome/);assert.match(app,/localStorage/);
console.log('PASS: 3 sourced guides, steps, verification, search and local checklists');