import {guides} from './guides.js';
const $=s=>document.querySelector(s);
const app=$('#app');
const cats=['All','Walkthrough','Quests','Endings'];
let filter='All',search='';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const steamArt={
'true-ending':'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4115450/extras/ed6bfb7501a2eae4d346cd1c2d40040e.avif?t=1793261976',
'missables':'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4115450/extras/5ad11bac314430fa82234256e24d3092.avif?t=1793261976',
'long-pillars':'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4115450/extras/1f47cb4923e1bd2aa341d088a309a9e8.avif?t=1793261976',
'healers-legacy':'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4115450/extras/6286834726c17d549b014c1c9ec40b67.avif?t=1793261976',
'severed-mindseal':'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4115450/extras/ed6bfb7501a2eae4d346cd1c2d40040e.avif?t=1793261976'
};
const fallbackArt='<div class="art-fallback" aria-hidden="true"><span>PHANTOM BLADE ZERO</span><small>GUIDE</small></div>';
const imgFallback=()=>{document.querySelectorAll('img[data-guide-art]').forEach(img=>{img.addEventListener('error',()=>{img.style.display='none';img.parentElement.classList.add('failed-image')},{once:true})})};
const cardArt=id=>'<div class="guide-cover"><img data-guide-art src="'+steamArt[id]+'" alt="Official Phantom Blade Zero promotional artwork, not a quest location screenshot" loading="lazy" decoding="async"><span class="image-credit">Official game art · S-GAME / Steam</span></div>';
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
imgFallback();
document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.cat;renderHome()}));
}
function renderGuide(g){
const count=g.checklist.filter((_,i)=>done(g.id,i)).length;
app.innerHTML='<a href="#/" class="back">← All guides</a><article class="article"><div class="article-cover"><img data-guide-art src="'+steamArt[g.id]+'" alt="Official Phantom Blade Zero promotional art; illustrative, not an exact in-game location" loading="eager"><span>Official promotional art · S-GAME / Steam</span></div><p class="eyebrow">'+esc(g.category)+' • '+esc(g.level)+'</p><h1>'+esc(g.title)+'</h1><p class="lead">'+esc(g.intro)+'</p><div class="note"><strong>Before you begin</strong><p>Check your game journal and keep a manual save before irreversible story decisions. These steps summarize sources; they are not an in-game success guarantee.</p></div><h2>Step-by-step walkthrough</h2><ol class="steps">'+g.steps.map(s=>'<li><h3>'+esc(s.title)+'</h3><p>'+esc(s.detail)+'</p><p class="verify"><strong>How to confirm:</strong> '+esc(s.verify)+'</p></li>').join('')+'</ol><section class="check-panel"><div class="between"><h2>Interactive checklist</h2><button id="reset" class="small">Reset</button></div><p id="progress" aria-live="polite">'+count+' / '+g.checklist.length+' checked on this device</p><div class="bar"><div style="width:'+(count/g.checklist.length*100)+'%"></div></div>'+g.checklist.map((item,i)=>'<label class="check"><input type="checkbox" data-check="'+i+'" '+(done(g.id,i)?'checked':'')+'><span>'+esc(item)+'</span></label>').join('')+'<p class="hint">Checking a box does not verify completion in the game. Compare against your journal.</p></section><h2>Still stuck?</h2><div class="troubleshoot">'+g.stuck.map(([q,a],i)=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</div><h2>Sources and editorial status</h2><p class="hint">Source links are evidence, not a substitute for the steps above. Game versions and source interpretations can differ.</p><ul class="sources">'+g.sources.map(([name,url])=>'<li><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(name)+' ↗</a></li>').join('')+'</ul><p class="hint">Reviewed '+esc(g.updated)+'</p><div class="feedback"><h2>Was this guide useful?</h2><button data-feedback="yes">It helped</button><button data-feedback="no" class="secondary">Still stuck</button><p id="feedback-note" aria-live="polite">Your answer stays in this browser. No remote feedback collection is enabled yet.</p></div></article>';
imgFallback();
document.querySelectorAll('[data-check]').forEach(el=>el.addEventListener('change',()=>{save(g.id,Number(el.dataset.check),el.checked);renderGuide(g)}));
$('#reset').addEventListener('click',()=>{g.checklist.forEach((_,i)=>save(g.id,i,false));renderGuide(g)});
document.querySelectorAll('[data-feedback]').forEach(b=>b.addEventListener('click',()=>{try{localStorage.setItem('pbz-guide-feedback-'+g.id,b.dataset.feedback)}catch{}$('#feedback-note').textContent=b.dataset.feedback==='yes'?'Saved locally: this guide helped.':'Saved locally: still stuck. This is not sent to the team yet.'}));
}
function route(){const id=location.hash.match(/^#\/guide\/([a-z0-9-]+)$/)?.[1];const g=guides.find(x=>x.id===id);if(g)renderGuide(g);else renderHome();window.scrollTo(0,0)}
window.addEventListener('hashchange',route);route();