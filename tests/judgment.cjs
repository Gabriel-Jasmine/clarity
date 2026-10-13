const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=['capture.js','app.js'].map(file=>fs.readFileSync(require('path').join(__dirname,'..',file),'utf8')).join('\n');
function boot(saved){
 const globals=new Map(),screenNodes=[];let storage=saved?JSON.stringify(saved):null;
 const node=(attrs='')=>{
  const n={style:{},dataset:{},value:'',textContent:'',disabled:false,hidden:false,checked:false,focused:false,classList:{toggle:()=>false,remove(){}},setAttribute(){},focus(){this.focused=true;}};
  for(const m of attrs.matchAll(/data-([a-z]+)(?:="([^"]*)")?/g))n.dataset[m[1]]=m[2]||'';
  n.id=attrs.match(/\bid="([^"]*)"/)?.[1];n.hidden=/\bhidden\b/.test(attrs);n.checked=/\bchecked\b/.test(attrs);n.value=attrs.match(/\bvalue="([^"]*)"/)?.[1]||'';
  let html='';Object.defineProperty(n,'innerHTML',{get:()=>html,set:value=>{
   html=value;if(n===globals.get('#screen')){screenNodes.length=0;for(const m of value.matchAll(/<(?:textarea|button|input|select|div|p|span|fieldset|legend|label)\b([^>]*)>/g))screenNodes.push(node(m[1]));}
  }});return n;
 };
 for(const id of ['title','stepCount','bar','nav','back','next','screen','reset','mobileNavToggle'])globals.set('#'+id,node());
 const doc={querySelector:s=>globals.get(s)||screenNodes.find(n=>s==='#'+n.id)||null,querySelectorAll:s=>{const key=s.match(/^\[data-([a-z]+)\]$/)?.[1];return key?screenNodes.filter(n=>key in n.dataset):[];},getElementById:id=>globals.get('#'+id)||screenNodes.find(n=>n.id===id)||null};
 const ctx={document:doc,localStorage:{getItem:()=>storage,setItem:(k,v)=>storage=v},window:{scrollTo(){}},navigator:{clipboard:{writeText:async()=>{}}},confirm:()=>true,console,Blob,URL};
 vm.createContext(ctx);vm.runInContext(source,ctx);return{run:code=>vm.runInContext(code,ctx),doc,reload:()=>boot(JSON.parse(storage)),stored:()=>JSON.parse(storage)};
}
const b=boot(),r=b.run;
r('step=8;render()');
const page=()=>b.doc.querySelector('#screen').innerHTML;
const choose=value=>{const e=b.doc.querySelectorAll('[data-judgmentevidence]').find(e=>e.value===value);assert(e,value);e.checked=true;e.onchange();return e;};
const write=(key,value)=>{const e=b.doc.querySelectorAll('[data-judgmenttext]').find(e=>e.dataset.judgmenttext===key);assert(e);e.value=value;e.oninput();return e;};
assert.equal(r('data.judgment.formatVersion'),1);assert.equal(r('data.judgment.evidenceEncountered'),'');assert(!r('judgmentChallengeComplete()'));
const choices=b.doc.querySelectorAll('[data-judgmentevidence]');assert.equal(choices.length,3);assert(choices.every(e=>!e.checked));
assert(page().includes('Haven’t found any'));assert(page().includes('Not sure'));assert(!page().includes('I haven’t looked yet'));
assert(!b.doc.querySelector('#judgmentReasonFollowup').hidden);assert(page().includes('aria-describedby="judgmentReasonHelp"'));assert(page().includes('aria-describedby="judgmentChangeHelp"'));
r('data.reviewed=[0,7,8,10]');
const reason=write('strongestCase','Attendance may not become repeat demand.');const future=write('changeEvidence','Paid repeat bookings fall below the costs.');
assert(!r('data.reviewed.includes(8)'));assert(r('data.reviewed.includes(0)&&data.reviewed.includes(7)&&data.reviewed.includes(10)'));
const yes=choose('yes');assert.equal(b.doc.querySelector('#judgmentReasonHelp').textContent,r('judgmentChallengeCopy.yesHelp'));assert(!b.doc.querySelector('#judgmentReasonFollowup').hidden);assert(r('judgmentChallengeComplete()'));assert.strictEqual(b.doc.querySelectorAll('[data-judgmentevidence]').find(e=>e.value==='yes'),yes);
assert.equal(r('judgmentInvestigations().length'),0);assert(r('judgmentContextText()').includes('Attendance may not become repeat demand.'));
choose('unsure');assert(b.doc.querySelector('#judgmentReasonFollowup').hidden);assert.strictEqual(b.doc.querySelector('#judgmentStrongest'),reason);assert.strictEqual(b.doc.querySelector('#judgmentChange'),future);
assert.equal(r('data.judgment.strongestCase'),'Attendance may not become repeat demand.');assert(r('judgmentChallengeComplete()'));assert.equal(r('judgmentInvestigations().length'),1);assert.equal(r('analyse().readiness'),'Still investigating');
assert(!r('judgmentChallengeOverview()').includes('Attendance may not become repeat demand.'));assert(r('judgmentChallengeOverview()').includes('Paid repeat bookings fall below the costs.'));
const exported=r('decisionContextText()');assert(exported.includes('Not asked for the current Not sure response.'));assert(exported.includes('Earlier strongest-reason writing (inactive; follow-up hidden for Not sure)'));assert(exported.includes('Attendance may not become repeat demand.'));assert(exported.includes('does not establish that a search was completed'));
assert(r('decisionOverview()').includes('Review Judgment Check uncertainty'));assert(!r('decisionOverview().split(\'<section class="ai-export">\')[0]').includes('Attendance may not become repeat demand.'));
const reload=b.reload();reload.run('step=8;render()');assert.equal(reload.run('data.judgment.evidenceEncountered'),'unsure');assert(reload.doc.querySelector('#judgmentReasonFollowup').hidden);assert.equal(reload.run('data.judgment.strongestCase'),'Attendance may not become repeat demand.');
choose('none');assert(!b.doc.querySelector('#judgmentReasonFollowup').hidden);assert.equal(b.doc.querySelector('#judgmentReasonHelp').textContent,r('judgmentChallengeCopy.noneHelp'));assert.equal(r('judgmentInvestigations().length'),0);assert(r('judgmentChallengeOverview()').includes('Attendance may not become repeat demand.'));
write('strongestCase','');assert(!r('judgmentChallengeComplete()'));choose('unsure');assert(r('judgmentChallengeComplete()'));write('changeEvidence','');assert(!r('judgmentChallengeComplete()'));write('changeEvidence','More reliable repeat-demand information.');
choose('yes');assert(!r('judgmentChallengeComplete()'));write('strongestCase','There is less repeat demand than I expected.');assert(r('judgmentChallengeComplete()'));
const legacy=b.stored();delete legacy.judgment.formatVersion;delete legacy.judgment.evidenceEncountered;legacy.judgment.answers={fresh:'maybe',seen:'yes'};legacy.judgment.strongestCase='Keep original serious case';legacy.judgment.changeEvidence='Keep original update criterion';legacy.reviewed=[0,7,8,10];
const old=boot(legacy);assert.equal(old.run('data.judgment.evidenceEncountered'),'');assert.equal(old.run('data.judgment.strongestCase'),'Keep original serious case');assert.equal(old.run('data.judgment.changeEvidence'),'Keep original update criterion');assert.equal(old.run('data.judgment.answers.seen'),'yes');assert(!old.run('data.reviewed.includes(8)'));assert(old.run('data.reviewed.includes(0)&&data.reviewed.includes(7)&&data.reviewed.includes(10)'));old.run('data.reviewed.push(8);save()');assert(old.reload().run('data.reviewed.includes(8)'));
r('data.judgment.strongestCase="<img src=x onerror=bad>";data.judgment.changeEvidence="<script>bad</script>";render()');assert(!page().includes('<img src=x'));assert(!r('judgmentChallengeOverview()').includes('<script>bad'));assert(r('judgmentContextText()').includes('<img src=x'));
r('data.judgment.answers.fresh="yes";data.judgment.answers.framing="yes";render()');assert(!r('judgmentSignals().some(x=>x.id==="fresh")'));assert(!r('judgmentSignals().some(x=>x.id==="framing")'));assert.equal(r('judgmentCore.length'),0);assert(r('judgmentContextText()').includes('Earlier framing check (retained; replaced by G09)'));assert.equal(r('judgmentConditionalRows().length'),0);
for(let i=0;i<12;i++){r('step='+i+';render()');assert(page().length>0);}
r('step=8;render()');b.doc.querySelector('#next').onclick();assert.equal(r('step'),9);b.doc.querySelector('#reset').onclick();assert.equal(r('data.judgment.evidenceEncountered'),'');assert.equal(r('data.judgment.strongestCase'),'');assert.equal(r('data.judgment.changeEvidence'),'');
console.log('Passed: G02 three blank choices, tailored helpers/examples, conditional hiding/restoration/reload, unchanged input nodes, unknown/incomplete states, active/inactive Overview/export, old answers and one-time scoped review reset, escaping, existing checks, navigation/reset. Browser layout/accessibility are not exercised by this harness.');
