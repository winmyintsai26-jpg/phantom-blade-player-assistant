import {guides} from './guides.js';
const $=s=>document.querySelector(s);
const app=$('#app');
const cats=['All','Walkthrough','Quests','Endings'];
let filter='All',search='';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sceneArt={
'true-ending':{sky:'#192734',hill:'#364455',accent:'#d6ad76',kind:'gate'},
'missables':{sky:'#1f302d',hill:'#3b5349',accent:'#d8b987',kind:'forest'},
'long-pillars':{sky:'#222b43',hill:'#4a4c67',accent:'#d3a96f',kind:'pillars'},
'healers-legacy':{sky:'#34402f',hill:'#586044',accent:'#d4b882',kind:'herbs'},
'severed-mindseal':{sky:'#322a3b',hill:'#594b60',accent:'#d8b07d',kind:'tower'}
};
const scene=id=>{
 const a=sceneArt[id]||sceneArt['missables'];
 const details={
 gate:'<path d="M310 170V80h180v90M330 82h140M350 100v70m100-70v70"/><path d="M270 175h260M310 75l90-30 90 30"/>',
 forest:'<path d="M145 190 200 60 255 190M185 190 240 40 295 190M470 190 525 55 580 190"/><path d="M195 188v-80M240 188V90M525 188v-95"/>',
 pillars:'<path d="M210 192V62h48v130M290 192V30h54v162M380 192V52h48v140M465 192V78h46v114"/><path d="M190 193h345M204 62h60M284 30h66M374 52h60M459 78h58"/>',
 herbs:'<path d="M390 205V92m0 72c-76-5-93-61-82-85 48 2 82 26 82 85Zm0-20c72-4 92-58 81-85-49 4-81 27-81 85Z"/><path d="M350 208q40-36 80 0M305 210q30-25 60 0M425 210q30-25 60 0"/>',
 tower:'<path d="M360 205V65h85v140M348 65h109l-54-35-55 35M374 91h55M374 117h55M374 143h55"/><path d="M330 206h145M398 205v-44"/>'
 };
 return '<svg class="scene-svg" viewBox="0 0 800 300" role="img" aria-label="Original decorative illustration; not an in-game screenshot" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-'+id+'" x2="0" y2="1"><stop stop-color="'+a.sky+'"/><stop offset="1" stop-color="'+a.hill+'"/></linearGradient></defs><rect width="800" height="300" fill="url(#g-'+id+')"/><circle cx="590" cy="77" r="43" fill="'+a.accent+'" opacity=".55"/><path d="M0 190 135 94 265 185 382 112 510 190 640 115 800 194V300H0Z" fill="#0d1820" opacity=".55"/><path d="M0 235 175 165 335 236 520 164 700 233 800 200V300H0Z" fill="#0d151a" opacity=".6"/><g fill="none" stroke="'+a.accent+'" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" opacity=".88">'+details[a.kind]+'</g><path d="M0 260Q200 230 400 265T800 255" fill="none" stroke="#d5c4a6" stroke-opacity=".15" stroke-width="13"/></svg>';
};
const cardArt=id=>'<div class="guide-cover">'+scene(id)+'<span class="image-credit">Original illustrated artwork</span></div>';
const symbols={
'true-ending':'<path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z"/><path d="m9 12 2 2 4-4"/>',
'missables':'<path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/><path d="m16 16 2 2"/>',
'long-pillars':'<path d="M7 20V6l5-3 5 3v14"/><path d="M5 20h14M9 9h6M9 13h6"/>',
'healers-legacy':'<path d="M12 3v18M3 12h18"/><path d="M6 6 4 4M18 18l2 2"/>',
'severed-mindseal':'<path d="M12 2 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6l-8-4Z"/><path d="m9 9 6 6m0-6-6 6"/>'
};
const guideIcon=id=>'<span class="guide-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+(symbols[id]||symbols.missables)+'</svg></span>';
const key=(id,n)=>'pbz-v2-'+id+'-'+n;
const done=(id,n)=>{try{return localStorage.getItem(key(id,n))==='1'}catch{return false}};
const save=(id,n,v)=>{try{localStorage.setItem(key(id,n),v?'1':'0')}catch{}};
function home(){history.replaceState(null,'','#/');renderHome()}
function renderHome(){
const list=guides.filter(g=>(filter==='All'||g.category===filter)&&[g.title,g.summary,g.category,...g.checklist].join(' ').toLowerCase().includes(search.toLowerCase()));
app.innerHTML='<section class="hero"><div class="hero-visual" aria-hidden="true"></div><div class="hero-copy"><p class="eyebrow">UNOFFICIAL PLAYER GUIDE • ENGLISH</p><h1>Find your way forward.</h1><p>Step-by-step quest routes, missable checkpoints and in-game verification. No empty answers. No invented fixes.</p><label class="sr" for="search">Search guides</label><input id="search" type="search" placeholder="Search quest, ending, region..." value="'+esc(search)+'"></div></section><div class="chips">'+cats.map(c=>'<button class="chip '+(c===filter?'active':'')+'" data-cat="'+esc(c)+'">'+esc(c)+'</button>').join('')+'</div><div class="meta">'+list.length+' guides · last content review Nov 5, 2026</div><div class="cards">'+list.map(g=>'<a class="guide-card" href="#/guide/'+g.id+'">'+cardArt(g.id)+''+guideIcon(g.id)+'<span class="eyebrow">'+esc(g.category)+'</span><h2>'+esc(g.title)+'</h2><p>'+esc(g.summary)+'</p><span class="detail">Read steps & checklist →</span></a>').join('')+'</div>'+(list.length?'':'<p>No matching guide yet. Try another term.</p>')+'<section class="note"><h2>What this site does and does not promise</h2><p>We turn cited guides into original, actionable checklists. Your progress is stored on this device only. We do not claim to have played every route or verified every patch. When sources disagree, we tell you.</p></section>';
$('#search').addEventListener('input',e=>{search=e.target.value;const start=e.target.selectionStart;renderHome();const el=$('#search');el.focus();el.setSelectionRange(start,start)});

document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.cat;renderHome()}));
}
function renderGuide(g){
const count=g.checklist.filter((_,i)=>done(g.id,i)).length;
app.innerHTML='<a href="#/" class="back">← All guides</a><article class="article"><div class="article-cover">'+scene(g.id)+'<span>Original illustration · Not a game screenshot</span></div><p class="eyebrow">'+esc(g.category)+' • '+esc(g.level)+'</p><h1>'+esc(g.title)+'</h1><p class="lead">'+esc(g.intro)+'</p><div class="note"><strong>Before you begin</strong><p>Check your game journal and keep a manual save before irreversible story decisions. These steps summarize sources; they are not an in-game success guarantee.</p></div><h2>Step-by-step walkthrough</h2><ol class="steps">'+g.steps.map(s=>'<li><h3>'+esc(s.title)+'</h3><p>'+esc(s.detail)+'</p><p class="verify"><strong>How to confirm:</strong> '+esc(s.verify)+'</p></li>').join('')+'</ol><section class="check-panel"><div class="between"><h2>Interactive checklist</h2><button id="reset" class="small">Reset</button></div><p id="progress" aria-live="polite">'+count+' / '+g.checklist.length+' checked on this device</p><div class="bar"><div style="width:'+(count/g.checklist.length*100)+'%"></div></div>'+g.checklist.map((item,i)=>'<label class="check"><input type="checkbox" data-check="'+i+'" '+(done(g.id,i)?'checked':'')+'><span>'+esc(item)+'</span></label>').join('')+'<p class="hint">Checking a box does not verify completion in the game. Compare against your journal.</p></section><h2>Still stuck?</h2><div class="troubleshoot">'+g.stuck.map(([q,a],i)=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</div><h2>Sources and editorial status</h2><p class="hint">Source links are evidence, not a substitute for the steps above. Game versions and source interpretations can differ.</p><ul class="sources">'+g.sources.map(([name,url])=>'<li><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(name)+' ↗</a></li>').join('')+'</ul><p class="hint">Reviewed '+esc(g.updated)+'</p><div class="feedback"><h2>Was this guide useful?</h2><button data-feedback="yes">It helped</button><button data-feedback="no" class="secondary">Still stuck</button><p id="feedback-note" aria-live="polite">Your answer stays in this browser. No remote feedback collection is enabled yet.</p></div></article>';

document.querySelectorAll('[data-check]').forEach(el=>el.addEventListener('change',()=>{save(g.id,Number(el.dataset.check),el.checked);renderGuide(g)}));
$('#reset').addEventListener('click',()=>{g.checklist.forEach((_,i)=>save(g.id,i,false));renderGuide(g)});
document.querySelectorAll('[data-feedback]').forEach(b=>b.addEventListener('click',()=>{try{localStorage.setItem('pbz-guide-feedback-'+g.id,b.dataset.feedback)}catch{}$('#feedback-note').textContent=b.dataset.feedback==='yes'?'Saved locally: this guide helped.':'Saved locally: still stuck. This is not sent to the team yet.'}));
}
function route(){const id=location.hash.match(/^#\/guide\/([a-z0-9-]+)$/)?.[1];const g=guides.find(x=>x.id===id);if(g)renderGuide(g);else renderHome();window.scrollTo(0,0)}
window.addEventListener('hashchange',route);route();