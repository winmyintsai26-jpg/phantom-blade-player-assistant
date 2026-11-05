const POWER='https://www.powerpyx.com/phantom-blade-zero-true-ending-guide/';
const STEAM='https://store.steampowered.com/app/4115450/Phantom_Blade_Zero/';
const topics=[
{id:'ending',name:'True ending requirements',options:[
['I have not entered Mirage Estate','Compare the required purple quest checklist with your in-game journal before entering Mirage Estate. The linked walkthrough describes this as a cutoff.',POWER,'Published guide; not independently play-tested'],
['I already entered Mirage Estate','Check your completed quest journal and existing saves. Do not assume the true ending is still reachable; this site cannot verify recovery.',POWER,'Outcome unverified'],
['I am near the final sequence','Check whether Bloodline Awakening is completed, and review remaining objectives before continuing.',POWER,'Published guide; not independently play-tested']]},
{id:'quest',name:'Illusory Pipa quest will not progress',options:[
['I cannot find the quest','Check your in-game journal, region and story progression. This site has not verified the unlock condition; consult the walkthrough before moving on.',POWER,'No verified unlock diagnosis'],
['The objective is stuck','Write down the exact objective, region, platform and game version. Check current support or patch notes. No reproducible fix is verified here.',STEAM,'No verified fix'],
['I moved beyond the area','Check the published progression cutoff guidance and available saves before taking irreversible action.',POWER,'Recovery not verified']]},
{id:'missable',name:'Am I about to miss content?',options:[
['Entering Mirage Estate','Stop and compare your in-game quest log with the pre-cutoff checklist in the linked guide. Do not rely on a completion percentage alone.',POWER,'Published guide; not independently play-tested'],
['Advancing in Mount Soulrend','Review Bloodline Awakening and any unfinished side quests before continuing.',POWER,'Published guide; not independently play-tested'],
['I do not know the next region','Check the current objective and map. This site does not have a verified complete region order.',STEAM,'Region order unverified']]},
{id:'combat',name:'I keep losing a fight',options:[
['I cannot recognize openings','Spend one attempt observing a repeated enemy attack sequence. Test one safe response at a time. This is general practice advice, not a verified boss strategy.',STEAM,'General advice only'],
['I keep taking damage while defending','Compare blocking, evasion and parry against one repeated move. Do not assume one defense works against every attack.',STEAM,'General advice only'],
['I need a specific boss solution','No boss-specific solution has passed verification. Use a recorded fight walkthrough; do not trust invented attack timings.',STEAM,'No verified boss-specific fix']]},
{id:'pc',name:'My PC stutters or crashes',options:[
['It happens at launch','Compare your hardware with the official Steam requirements; record the error, game version and GPU driver.',STEAM,'Official requirements; diagnosis unverified'],
['It happens during combat','Repeat the same scene while changing one reversible graphics setting at a time, and compare results.',STEAM,'General troubleshooting only'],
['It crashes repeatedly','Record crash details and consult current official support and patch notes. There is no verified universal fix.',STEAM,'No verified universal fix']]}
];
const topic=document.querySelector('#topic'),symptom=document.querySelector('#symptom'),result=document.querySelector('#result');
const escapeHTML=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
topics.forEach(t=>topic.add(new Option(t.name,t.id)));
function renderOptions(){const t=topics.find(x=>x.id===topic.value);symptom.replaceChildren(...t.options.map((x,i)=>new Option(x[0],String(i))));renderResult()}
function renderResult(){const t=topics.find(x=>x.id===topic.value),x=t.options[Number(symptom.value)];result.innerHTML='<h2>3. Recommended next steps</h2><p>'+escapeHTML(x[1])+'</p><p class="warning"><strong>Evidence status:</strong> '+escapeHTML(x[3])+'</p><p><a target="_blank" rel="noopener noreferrer" href="'+x[2]+'">Open source / support page</a></p>';document.querySelector('#feedback').textContent='Feedback stays on this device. It is not submitted to us.'}
topic.addEventListener('change',renderOptions);symptom.addEventListener('change',renderResult);
for(const [id,value] of [['yes','solved'],['no','not-solved']])document.querySelector('#'+id).addEventListener('click',()=>{try{localStorage.setItem('pbz-feedback-'+topic.value+'-'+symptom.value,value)}catch{}document.querySelector('#feedback').textContent=value==='solved'?'Marked solved on this device.':'Marked still stuck on this device. This guide does not claim a confirmed fix.'});
renderOptions();