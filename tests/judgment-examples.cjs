const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=['capture.js','app.js'].map(file=>fs.readFileSync(require('path').join(__dirname,'..',file),'utf8')).join('\n');
function boot(saved){
 const globals=new Map(),screenNodes=[];let storage=saved?JSON.stringify(saved):null;
 const node=(attrs='')=>{
  const n={style:{},dataset:{},value:'',textContent:'',disabled:false,hidden:false,checked:false,classList:{toggle:()=>false,remove(){}},setAttribute(){},focus(){}};
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
const b=boot(),r=b.run,keys=['wordingContext','exampleContext'];
r('data.judgment.investmentContext.response="none";data.judgment.stateContext.response="none";step=8;render()');
const page=()=>b.doc.querySelector('#screen').innerHTML;
const choose=(key,value)=>{const e=b.doc.querySelectorAll('[data-judgmentcontext]').find(e=>e.dataset.judgmentcontext===key&&e.value===value);assert(e);e.checked=true;e.onchange();return e;};
const write=(key,value)=>{const e=b.doc.querySelectorAll('[data-judgmentcontexttext]').find(e=>e.dataset.judgmentcontexttext===key);assert(e);e.value=value;e.oninput();return e;};
assert.equal(r('judgmentCore.length'),0);assert(!page().includes('judgment-table'));assert(!page().includes('mentally remove'));assert(page().indexOf('Are particular words')<page().indexOf('Is a particular experience'));assert(page().indexOf('Is a particular experience')<page().indexOf('Is your current path'));assert.equal(r('judgmentConditionalRows().length'),0);
assert(page().indexOf('Is your current path')<page().indexOf('Have you come across'));assert(page().indexOf('Are your current feelings')>page().indexOf('Are other people'));
for(const key of keys){
 assert.equal(r('data.judgment.'+key+'.formatVersion'),1);assert.equal(r('data.judgment.'+key+'.response'),'');
 const radios=b.doc.querySelectorAll('[data-judgmentcontext]').filter(e=>e.dataset.judgmentcontext===key);assert.equal(radios.length,3);assert(radios.every(e=>!e.checked));
 assert(b.doc.querySelector('#judgment-'+key+'-followup').hidden);assert(!r('judgmentContextComplete("'+key+'")'));
 assert(page().includes('aria-describedby="judgment-'+key+'-help"'));assert(page().includes('aria-controls="judgment-'+key+'-followup"'));
 r('data.reviewed=[0,7,8,10]');const radio=choose(key,'yes');assert(!b.doc.querySelector('#judgment-'+key+'-followup').hidden);assert(!r('judgmentContextComplete("'+key+'")'));
 assert.strictEqual(b.doc.querySelectorAll('[data-judgmentcontext]').find(e=>e.dataset.judgmentcontext===key&&e.value==='yes'),radio);
 const value=key==='wordingContext'?'Leaving security and starting a business emphasise different parts of the same plan.':'A friend’s closed studio stands out; their rent and business model differ.';
 const input=write(key,value);assert(r('judgmentContextComplete("'+key+'")'));assert(!r('data.reviewed.includes(8)'));assert(r('data.reviewed.includes(0)&&data.reviewed.includes(7)&&data.reviewed.includes(10)'));
 assert(r('judgmentAdditionalOverview("'+key+'")').includes(value));assert(r('judgmentContextText()').includes(value));
 choose(key,'none');assert(b.doc.querySelector('#judgment-'+key+'-followup').hidden);assert.strictEqual(b.doc.querySelector('#judgment-'+key+'-detail'),input);assert(r('judgmentContextComplete("'+key+'")'));
 assert(!r('judgmentAdditionalOverview("'+key+'")').includes(value));assert(!r('decisionOverview().split(\'<section class="ai-export">\')[0]').includes(value));
 assert(r('judgmentAdditionalContextText("'+key+'")').includes('writing (inactive; follow-up hidden)'));assert(r('judgmentAdditionalContextText("'+key+'")').includes(value));
 const reload=b.reload();reload.run('step=8;render()');assert.equal(reload.run('data.judgment.'+key+'.response'),'none');assert.equal(reload.run('data.judgment.'+key+'.detail'),value);assert(reload.doc.querySelector('#judgment-'+key+'-followup').hidden);
 reload.run('data.judgment.'+key+'.response="yes";render()');assert(!reload.doc.querySelector('#judgment-'+key+'-followup').hidden);assert(reload.doc.querySelector('#screen').innerHTML.includes(value));
 choose(key,'unsure');assert(b.doc.querySelector('#judgment-'+key+'-followup').hidden);assert(r('judgmentContextComplete("'+key+'")'));assert.equal(r('judgmentInvestigations().length'),1);assert.equal(r('analyse().readiness'),'Still investigating');assert(r('decisionOverview()').includes('Review Judgment Check uncertainty'));
 choose(key,'yes');assert(!b.doc.querySelector('#judgment-'+key+'-followup').hidden);assert.equal(r('data.judgment.'+key+'.detail'),value);
 write(key,'');assert(!r('judgmentContextComplete("'+key+'")'));choose(key,'none');assert(r('judgmentContextComplete("'+key+'")'));
 write(key,'<script>bad</script>');choose(key,'yes');r('render()');assert(!page().includes('<script>bad'));assert(!r('judgmentAdditionalOverview("'+key+'")').includes('<script>bad'));assert(r('judgmentAdditionalContextText("'+key+'")').includes('<script>bad'));choose(key,'none');
}
assert(r('judgmentAdditionalComplete()'));
r('data.judgment.wordingContext.response="unsure";data.judgment.exampleContext.response="unsure";data.judgment.evidenceEncountered="unsure";data.judgment.socialContext.response="unsure"');assert.equal(r('judgmentInvestigations().length'),4);assert(r('judgmentInvestigations()').some(x=>x.includes('words or descriptions')));assert(r('judgmentInvestigations()').some(x=>x.includes('experience, story or comparison')));
r('data.judgment.wordingContext.response="yes";data.judgment.wordingContext.detail="Independent wording writing";data.judgment.exampleContext.response="yes";data.judgment.exampleContext.detail="Independent example writing";data.judgment.strongestCase="Original contrary case";data.judgment.changeEvidence="Original update criterion";data.judgment.socialContext.detail="Original social context";render()');
choose('exampleContext','none');assert(!b.doc.querySelector('#judgment-wordingContext-followup').hidden);assert.equal(r('data.judgment.wordingContext.detail'),'Independent wording writing');assert.equal(r('data.judgment.strongestCase'),'Original contrary case');assert.equal(r('data.judgment.socialContext.detail'),'Original social context');assert(b.doc.querySelector('#judgmentReasonFollowup').hidden);
r('data.judgment.investmentContext.response="yes";data.judgment.investmentContext.detail="Earlier investment context";data.judgment.stateContext.response="none";data.judgment.stateContext.detail="Earlier state context";save()');const saved=b.stored();delete saved.judgment.wordingContext;delete saved.judgment.exampleContext;saved.reviewed=[0,7,8,10];saved.judgment.answers={fresh:'no',past:'yes',uncertainty:'maybe',seen:'no',social:'yes',framing:'yes',vivid:'no'};saved.options[0].incentives.promises=['security'];saved.options[0].incentives.avoid=['uncertainty'];
const migrated=boot(saved);migrated.run('step=8;render()');
for(const key of keys)assert.equal(migrated.run('data.judgment.'+key+'.response'),'');
assert(!migrated.run('data.reviewed.includes(8)'));assert(migrated.run('data.reviewed.includes(0)&&data.reviewed.includes(7)&&data.reviewed.includes(10)'));assert.equal(migrated.run('data.judgment.strongestCase'),'Original contrary case');assert.equal(migrated.run('data.judgment.changeEvidence'),'Original update criterion');assert.equal(migrated.run('data.judgment.socialContext.detail'),'Original social context');assert.equal(migrated.run('data.judgment.investmentContext.detail'),'Earlier investment context');assert.equal(migrated.run('data.judgment.investmentContext.response'),'yes');assert.equal(migrated.run('data.judgment.stateContext.detail'),'Earlier state context');assert.equal(migrated.run('data.judgment.stateContext.response'),'none');
assert.equal(migrated.run('JSON.stringify(data.judgment.answers)'),JSON.stringify(saved.judgment.answers));assert.equal(migrated.run('judgmentSignals().length'),0);assert.equal(migrated.run('judgmentConditionalRows().length'),0);
const context=migrated.run('judgmentContextText()'),html=migrated.doc.querySelector('#screen').innerHTML;
for(const id of ['framing','vivid','fresh','past','uncertainty']){const stem=migrated.run('[...judgmentOriginalCore,...judgmentConditional].find(x=>x.id==="'+id+'").question');assert(context.includes(stem));assert(!html.includes(stem));}
for(const label of ['No — I would see it the same way','Maybe — I’m not sure','Yes — I would see it differently'])assert(context.includes('Saved response: '+label));
assert(context.includes('Earlier framing check (retained; replaced by G09)'));assert(context.includes('Earlier memorable-example check (retained; replaced by G09)'));assert(context.includes('replaced by G04'));assert(context.includes('replaced by G05'));assert(context.includes('replaced by G03'));assert(context.includes('Not asked; no response selected.'));
for(const [value,label] of [['no','No — I would see it the same way'],['maybe','Maybe — I’m not sure'],['yes','Yes — I would see it differently']]){
 const history=JSON.parse(JSON.stringify(saved));history.judgment.answers.framing=value;history.judgment.answers.vivid=value;
 const old=boot(history);assert.equal(old.run('data.judgment.wordingContext.response'),'');assert.equal(old.run('data.judgment.exampleContext.response'),'');
 for(const key of keys)assert(old.run('judgmentAdditionalContextText("'+key+'")').includes('Saved response: '+label));
 assert.equal(old.run('judgmentSignals().length'),0);
}
assert(!r('decisionOverview().split(\'<section class="ai-export">\')[0]').includes('counterfactual checks answered'));
migrated.run('data.reviewed.push(8);save()');assert(migrated.reload().run('data.reviewed.includes(8)'));
const partial=b.stored();partial.reviewed=[0,7,8,10];delete partial.judgment.exampleContext;const partialBoot=boot(partial);assert.equal(partialBoot.run('data.judgment.wordingContext.detail'),'Independent wording writing');assert.equal(partialBoot.run('data.judgment.wordingContext.response'),'yes');assert(!partialBoot.run('data.reviewed.includes(8)'));
const malformed=b.stored();malformed.judgment.exampleContext={formatVersion:1,response:'invalid',detail:42};const normalized=boot(malformed);assert.equal(normalized.run('data.judgment.exampleContext.response'),'');assert.equal(normalized.run('data.judgment.exampleContext.detail'),'');
r('data.options[0].name="Bakery expansion";data.decisionAim="Increase income";data.hasHardBoundaries="no";data.priorities=[lifeDomains[0].id];data.stakes=[lifeDomains[0].id];data.reviewed=Array.from({length:11},(_,i)=>i);const o=choiceOption();o.trade.alternatives=["Keep one bakery"];o.trade.immediate="Time";o.trade.future="Flexibility";compoundingQuestions.forEach(q=>o.compound[q.key]="Reflection");o.consequence.immediate="More customers";["favourable","unfavourable"].forEach(k=>{o.consequence.branchEnded[k]=true;o.consequence.branches[k]=["Possible effect"]});o.reverse.difficulty=1;data.factors=[{id:"f",name:"Time",importance:3,evidence:2,strength:1,directionAssessed:true,options:[],sources:[]}];stressRows.forEach(row=>data.stressTest.ratings[row.id]={[o.id]:"room"});data.devilsAdvocate.outcomes[0].outcome="Less time to bake";data.devilsAdvocate.outcomes[0].connectionResponse="no";data.driverReview.basis="Relevant experience";data.decisionTiming.deadline="none";data.decisionTiming.waitingResponse="none";data.judgment.evidenceEncountered="none";data.judgment.strongestCase="Repeat demand may be lower";data.judgment.changeEvidence="Paid repeat bookings";data.judgment.socialContext.response="none";data.judgment.wordingContext.response="none";data.judgment.exampleContext.response="none";data.judgment.investmentContext.response="none";data.judgment.stateContext.response="none";');
r('data.horizon="Weeks or months";choiceOption().incentives.gainResponse="none";choiceOption().incentives.reliefResponse="none";choiceOption().incentives.fit="Fits my priorities";data.stressTest.notesByOption[choiceOption().id]="Savings cover the pictured delays";');
assert(r('assessmentComplete()'));
for(const key of keys){
 r('data.judgment.'+key+'.response=""');assert(!r('assessmentComplete()'));
 r('data.judgment.'+key+'.response="yes";data.judgment.'+key+'.detail=""');assert(!r('assessmentComplete()'));
 r('data.judgment.'+key+'.detail="Concrete context"');assert(r('assessmentComplete()'));
 r('data.judgment.'+key+'.response="unsure"');assert(r('assessmentComplete()'));assert.equal(r('analyse().readiness'),'Still investigating');
 r('data.judgment.'+key+'.response="none"');assert.equal(r('judgmentInvestigations().length'),0);
}
for(let i=0;i<12;i++){r('step='+i+';render()');assert(page().length>0);}
r('step=8;render()');b.doc.querySelector('#next').onclick();assert.equal(r('step'),9);b.doc.querySelector('#reset').onclick();for(const key of keys){assert.equal(r('data.judgment.'+key+'.response'),'');assert.equal(r('data.judgment.'+key+'.detail'),'');}
console.log('Passed: G09 universal blank choices, Yes-only follow-ups, input continuity, retention/restoration/reload, independent state, scoped one-time migration, legacy No/Maybe/Yes history without inference/signals, unknown and completeness rules, Overview/export, escaping, navigation/reset. Live-browser checks remain pending.');
