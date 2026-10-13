const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(require('path').join(__dirname,'../app.js'),'utf8');
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
const choose=value=>{const e=b.doc.querySelectorAll('[data-judgmentsocial]').find(e=>e.value===value);assert(e,value);e.checked=true;e.onchange();return e;};
const write=text=>{const e=b.doc.querySelectorAll('[data-judgmentsocialtext]')[0];assert(e);e.value=text;e.oninput();return e;};
assert.equal(r('data.judgment.socialContext.formatVersion'),1);assert.equal(r('data.judgment.socialContext.response'),'');
assert.equal(b.doc.querySelectorAll('[data-judgmentsocial]').length,3);assert(b.doc.querySelectorAll('[data-judgmentsocial]').every(e=>!e.checked));
assert(b.doc.querySelector('#judgmentSocialFollowup').hidden);assert(!r('judgmentSocialComplete()'));assert(page().includes('aria-describedby="judgmentSocialHelp"'));
const oldPeople=r('judgmentConditional.filter(x=>["seen","social"].includes(x.id)).map(x=>x.question)');
oldPeople.forEach(question=>assert(!page().includes(question)));assert(page().includes('Are other people’s views, expectations or progress'));
r('data.reviewed=[0,7,8,10]');const yes=choose('yes');
assert(!b.doc.querySelector('#judgmentSocialFollowup').hidden);assert.strictEqual(b.doc.querySelectorAll('[data-judgmentsocial]').find(e=>e.value==='yes'),yes);assert(!r('judgmentSocialComplete()'));
const detail=write('My partner shares the savings; peers’ progress is making this feel urgent.');
assert(r('judgmentSocialComplete()'));assert(!r('data.reviewed.includes(8)'));assert(r('data.reviewed.includes(0)&&data.reviewed.includes(7)&&data.reviewed.includes(10)'));
assert(r('judgmentSocialOverview()').includes('My partner shares the savings'));assert(r('judgmentContextText()').includes('My partner shares the savings'));
choose('none');assert(b.doc.querySelector('#judgmentSocialFollowup').hidden);assert.strictEqual(b.doc.querySelector('#judgmentSocialDetail'),detail);assert(r('judgmentSocialComplete()'));assert.equal(r('judgmentInvestigations().length'),0);
assert(!r('judgmentSocialOverview()').includes('My partner shares the savings'));assert(!r('decisionOverview().split(\'<section class="ai-export">\')[0]').includes('My partner shares the savings'));
assert(r('judgmentContextText()').includes('Earlier people-influence writing (inactive; follow-up hidden)'));assert(r('judgmentContextText()').includes('Nothing comes to mind does not prove'));
const reload=b.reload();reload.run('step=8;render()');assert.equal(reload.run('data.judgment.socialContext.response'),'none');assert.equal(reload.run('data.judgment.socialContext.detail'),'My partner shares the savings; peers’ progress is making this feel urgent.');assert(reload.doc.querySelector('#judgmentSocialFollowup').hidden);
choose('unsure');assert(b.doc.querySelector('#judgmentSocialFollowup').hidden);assert(r('judgmentSocialComplete()'));assert.equal(r('judgmentInvestigations().length'),1);assert.equal(r('analyse().readiness'),'Still investigating');assert(r('decisionOverview()').includes('Review Judgment Check uncertainty'));
r('data.judgment.evidenceEncountered="unsure"');assert.equal(r('judgmentInvestigations().length'),2);r('data.judgment.evidenceEncountered="none"');
choose('yes');assert(!b.doc.querySelector('#judgmentSocialFollowup').hidden);assert.equal(r('data.judgment.socialContext.detail'),'My partner shares the savings; peers’ progress is making this feel urgent.');
write('');assert(!r('judgmentSocialComplete()'));choose('none');assert(r('judgmentSocialComplete()'));
const old=b.stored();delete old.judgment.socialContext;old.judgment.evidenceEncountered='yes';old.judgment.strongestCase='Preserve contrary information';old.judgment.changeEvidence='Preserve change criterion';old.judgment.answers={seen:'no',social:'yes',uncertainty:'maybe',fresh:'no'};old.reviewed=[0,7,8,10];old.options[0].incentives.promises=['recognition','belonging','security'];old.options[0].incentives.avoid=['rejection'];
const legacy=boot(old);legacy.run('step=8;render()');
assert.equal(legacy.run('data.judgment.socialContext.response'),'');assert.equal(legacy.run('data.judgment.evidenceEncountered'),'yes');assert.equal(legacy.run('data.judgment.strongestCase'),'Preserve contrary information');assert.equal(legacy.run('data.judgment.changeEvidence'),'Preserve change criterion');
assert.equal(legacy.run('data.judgment.answers.seen'),'no');assert.equal(legacy.run('data.judgment.answers.social'),'yes');assert(!legacy.run('data.reviewed.includes(8)'));assert(legacy.run('data.reviewed.includes(0)&&data.reviewed.includes(7)&&data.reviewed.includes(10)'));
assert.equal(legacy.run('judgmentConditionalRows().map(x=>x.id).join(",")'),'');assert(!legacy.run('judgmentSignals().some(x=>["seen","social"].includes(x.id))'));
const context=legacy.run('judgmentContextText()');assert(context.includes('Earlier people-influence checks (retained; replaced by G03)'));assert(context.includes('Saved response: No — I would see it the same way'));assert(context.includes('Saved response: Yes — I would see it differently'));
oldPeople.forEach(question=>assert(!legacy.doc.querySelector('#screen').innerHTML.includes(question)));assert(!legacy.doc.querySelector('#screen').innerHTML.includes('immediate relief from uncertainty'));assert(context.includes('Earlier uncertainty-relief check (retained; replaced by G05)'));
legacy.run('data.reviewed.push(8);save()');assert(legacy.reload().run('data.reviewed.includes(8)'));
r('data.judgment.socialContext.response="yes";data.judgment.socialContext.detail="<script>bad</script>";render()');assert(!page().includes('<script>bad'));assert(!r('judgmentSocialOverview()').includes('<script>bad'));assert(r('judgmentSocialContextText()').includes('<script>bad'));
r('data.judgment.evidenceEncountered="unsure";render()');assert(b.doc.querySelector('#judgmentReasonFollowup').hidden);assert(!b.doc.querySelector('#judgmentSocialFollowup').hidden);
for(let i=0;i<12;i++){r('step='+i+';render()');assert(page().length>0);}
r('step=8;render()');b.doc.querySelector('#next').onclick();assert.equal(r('step'),9);b.doc.querySelector('#reset').onclick();assert.equal(r('data.judgment.socialContext.response'),'');assert.equal(r('data.judgment.socialContext.detail'),'');
console.log('Passed: universal G03 gate, three blank choices, Yes-only writing, retained/restored/reloaded detail, input-node continuity, blank/unknown treatment, active/inactive reporting, exact legacy No/Yes preservation without inference or active signals, scoped review reset, superseded uncertainty history and unchanged G02, escaping and all-section navigation/reset. Browser visual/accessibility checks remain separate.');
