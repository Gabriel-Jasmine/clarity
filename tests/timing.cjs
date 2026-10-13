const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(require('path').join(__dirname,'../app.js'),'utf8');
function boot(saved){
 const globals=new Map(),screenNodes=[];let storage=saved?JSON.stringify(saved):null;
 const node=(attrs='')=>{
  const n={style:{},dataset:{},value:'',textContent:'',disabled:false,checked:false,focused:false,classList:{toggle:()=>false,remove(){}},setAttribute(){},focus(){this.focused=true;}};
  for(const m of attrs.matchAll(/data-([a-z]+)(?:="([^"]*)")?/g))n.dataset[m[1]]=m[2]||"";
  n.id=attrs.match(/\bid="([^"]*)"/)?.[1];n.disabled=/\bdisabled\b/.test(attrs);
  let html='';Object.defineProperty(n,'innerHTML',{get:()=>html,set:value=>{
   html=value;if(n===globals.get('#screen')){
    screenNodes.length=0;
    for(const m of value.matchAll(/<(?:textarea|button|input|select)\b([^>]*)>/g))screenNodes.push(node(m[1]));
   }
  }});
  return n;
 };
 for(const id of ['title','stepCount','bar','nav','back','next','screen','reset','mobileNavToggle'])globals.set('#'+id,node());
 const doc={
  querySelector:s=>globals.get(s)||screenNodes.find(n=>s==='#'+n.id)||null,
  querySelectorAll:s=>{const key=s.match(/^\[data-([a-z]+)\]$/)?.[1];return key?screenNodes.filter(n=>key in n.dataset):[];},
  getElementById:id=>globals.get('#'+id)||screenNodes.find(n=>n.id===id)||null
 };
 const ctx={document:doc,localStorage:{getItem:()=>storage,setItem:(k,v)=>storage=v},window:{scrollTo(){}},navigator:{clipboard:{writeText:async()=>{}}},confirm:()=>true,console,Blob,URL};
 vm.createContext(ctx);vm.runInContext(source,ctx);
 return {run:code=>vm.runInContext(code,ctx),doc,reload:()=>boot(JSON.parse(storage)),stored:()=>JSON.parse(storage)};
}


let b=boot(),r=b.run;
const screen=()=>b.doc.querySelector('#screen').innerHTML;
const deadline=value=>{const field=b.doc.querySelectorAll('[data-timingdeadline]')[0];field.value=value;field.onchange();};
const write=(key,value)=>{const field=b.doc.querySelectorAll('[data-timingtext]').find(e=>e.dataset.timingtext===key);assert(field&&!field.disabled);field.value=value;field.oninput();};
const waiting=(value,checked=true)=>{const fields=b.doc.querySelectorAll('[data-timingresponse]');const field=fields[value==='none'?0:1];field.value=value;field.checked=checked;field.onchange();};
assert.equal(r('data.decisionTiming.formatVersion'),1);
assert.equal(r('data.decisionTiming.deadline'),'');
assert.equal(r('data.decisionTiming.waitingResponse'),'');
assert.equal(r('timingComplete()'),false);
assert.equal(r('timingInvestigations().length'),0);
assert.equal(r('reflections().filter(x=>x.id.startsWith("decision-timing-")).length'),0);
for(const text of ['Does this decision have a deadline?','No fixed deadline','What would change if you waited before deciding?','If I waited…'])assert(screen().includes(text));
assert(!screen().includes('When do you need to decide, and what sets that deadline?'));
assert.equal(b.doc.querySelectorAll('[data-timingdeadline]').length,3);
assert.equal(b.doc.querySelectorAll('[data-timingtext]').length,1);
assert(screen().indexOf('How long could the consequences')<screen().indexOf('Does this decision have a deadline?'));
assert(!screen().includes('regional content marketing'));
assert(!screen().includes('type="date"'));
deadline('yes');
assert(screen().includes('When do you need to decide, and what sets that deadline?'));
assert.equal(b.doc.querySelectorAll('[data-timingtext]').length,2);
assert.equal(r('timingComplete()'),false);
write('deadlineDetails','The landlord confirmed an end-of-month reply deadline.');
write('waiting','A week would allow quotes; longer could lose the premises.');
assert(r('timingComplete()'));
assert.equal(b.stored().decisionTiming.waiting,'A week would allow quotes; longer could lose the premises.');
assert.equal(b.reload().run('data.decisionTiming.deadlineDetails'),'The landlord confirmed an end-of-month reply deadline.');
assert.equal(r('reflections().filter(x=>x.id.startsWith("decision-timing-")).length'),2);
assert(r('decisionContextText()').includes('Timing capture version: 1'));
assert(r('decisionContextText()').includes('The landlord confirmed'));
assert(r('decisionOverview()').includes('Timing of this decision'));
assert(r('decisionOverview()').includes('A week would allow quotes'));
assert(r('decisionOverview()').includes('data-edit="0"'));
r('data.reviewed=[0,1,7]');
deadline('none');
assert(!r('data.reviewed.includes(0)'));assert(r('data.reviewed.includes(1)'));assert(r('data.reviewed.includes(7)'));
assert(!screen().includes('When do you need to decide, and what sets that deadline?'));
assert(screen().includes('What would change if you waited before deciding?'));
assert.equal(r('reflections().filter(x=>x.id==="decision-timing-deadline").length'),0);
assert(r('timingContextText()').includes('Earlier deadline details (inactive; not the current response)'));
assert(!r('timingOverview()').includes('The landlord confirmed'));
deadline('unknown');
assert.equal(r('timingInvestigations().length'),1);assert(r('timingComplete()'));
assert(r('allInvestigations().join(" ")').includes('whether this decision has a deadline'));
assert(r('decisionOverview()').includes('Review Decision timing unknowns'));
deadline('yes');assert.equal(r('data.decisionTiming.deadlineDetails'),'The landlord confirmed an end-of-month reply deadline.');
waiting('none');
assert.equal(r('data.decisionTiming.waitingResponse'),'none');
assert(b.doc.querySelectorAll('[data-timingtext]').find(e=>e.dataset.timingtext==='waiting').disabled);
assert.equal(r('reflections().filter(x=>x.id==="decision-timing-waiting").length'),0);
assert(r('timingContextText()').includes('Nothing significant comes to mind'));
assert(r('timingContextText()').includes('Earlier waiting reflection (inactive; not the current response)'));
assert(!r('timingOverview()').includes('A week would allow quotes'));
waiting('unknown');
assert.equal(r('data.decisionTiming.waitingResponse'),'unknown');
assert.equal((screen().match(/data-timingresponse[^>]*checked/g)||[]).length,1);
assert.equal(r('timingInvestigations().length'),1);
waiting('unknown',false);
assert.equal(r('data.decisionTiming.waitingResponse'),'');
assert(!b.doc.querySelectorAll('[data-timingtext]').find(e=>e.dataset.timingtext==='waiting').disabled);
assert.equal(r('data.decisionTiming.waiting'),'A week would allow quotes; longer could lose the premises.');
write('waiting','<img src=x onerror=alert(1)>');
write('deadlineDetails','<script>alert(1)</script>');
assert(!r('frame()').includes('<img src=x'));assert(!r('frame()').includes('<script>alert'));
assert(!r('decisionOverview()').includes('<img src=x'));assert(!r('decisionOverview()').includes('<script>alert'));
assert(r('decisionContextText()').includes('<script>alert(1)</script>')); // Raw export preserves the user's words.
r('data.reviewed.push(0);save()');assert(b.reload().run('data.reviewed.includes(0)'));
write('waiting','A week allows supplier quotes.');
r('step=10;render()');
const timingReflection=b.doc.querySelectorAll('[data-reflection]').find(e=>e.dataset.reflection==='decision-timing-waiting');
timingReflection.checked=true;timingReflection.onchange();
assert.equal(r('data.factors.at(-1).sources[0].id'),'decision-timing-waiting');
assert.equal(r('data.factors.at(-1).sources[0].optionId'),null);
assert(r('data.factors.at(-1).sources[0].text').includes('A week allows supplier quotes.'));
const old=JSON.parse(r('JSON.stringify(data)'));delete old.decisionTiming;old.reviewed=[0,1,4,7,9];old.horizon='3–5 years';old.decisionAim='Build a stable business';old.options.push(JSON.parse(r('JSON.stringify(blankOption("Retained alternative"))')));old.ui={step:0,active:old.options[0].id};
const migrated=boot(old);
assert.equal(migrated.run('data.decisionTiming.deadline'),'');
assert.equal(migrated.run('data.decisionTiming.deadlineDetails'),'');
assert.equal(migrated.run('data.horizon'),'3–5 years');
assert.equal(migrated.run('data.decisionAim'),'Build a stable business');
assert.equal(migrated.run('data.options.length'),2);
assert(!migrated.run('data.reviewed.includes(0)'));
for(const index of [1,4,7,9])assert(migrated.run('data.reviewed.includes('+index+')'));
assert.equal(migrated.run('data.factors.at(-1).sources[0].id'),'decision-timing-waiting');
migrated.run('data.reviewed.push(0);save()');assert(migrated.reload().run('data.reviewed.includes(0)'));
const malformed=JSON.parse(r('JSON.stringify(data)'));malformed.decisionTiming={formatVersion:1,deadline:'invented',deadlineDetails:42,waiting:null,waitingResponse:'invented'};
const normalised=boot(malformed);assert.equal(normalised.run('data.decisionTiming.deadline'),'');assert.equal(normalised.run('data.decisionTiming.waiting'),'');
r('data.options[0].name="Bakery expansion";data.decisionAim="Increase income";data.hasHardBoundaries="no";data.priorities=[lifeDomains[0].id];data.stakes=[lifeDomains[0].id];data.reviewed=Array.from({length:11},(_,i)=>i);const o=choiceOption();o.trade.alternatives=["Keep one bakery"];o.trade.immediate="Time";o.trade.future="Flexibility";compoundingQuestions.forEach(q=>o.compound[q.key]="Reflection");o.consequence.immediate="More customers";["favourable","unfavourable"].forEach(k=>{o.consequence.branchEnded[k]=true;o.consequence.branches[k]=["Possible effect"]});o.reverse.difficulty=1;data.factors=[{id:"f",name:"Time",importance:3,evidence:2,strength:1,directionAssessed:true,options:[],sources:[]}];stressRows.forEach(row=>data.stressTest.ratings[row.id]={[o.id]:"room"});data.devilsAdvocate.outcomes[0].outcome="Less time to bake";data.devilsAdvocate.outcomes[0].connectionResponse="no";data.decisionTiming=blankDecisionTiming();');
assert(!r('assessmentComplete()'));
r('data.driverReview.basis="Based on documented practical constraints";data.judgment.evidenceEncountered="none";data.judgment.strongestCase="Demand may not repeat";data.judgment.changeEvidence="Paid repeat bookings below costs"');r('data.decisionTiming.deadline="none";data.decisionTiming.waitingResponse="none"');assert(r('assessmentComplete()'));assert.equal(r('timingInvestigations().length'),0);
r('data.decisionTiming.deadline="yes"');assert(!r('assessmentComplete()'));
r('data.decisionTiming.deadline="unknown";data.decisionTiming.waitingResponse="unknown"');assert(r('assessmentComplete()'));assert.equal(r('timingInvestigations().length'),2);assert.equal(r('analyse().readiness'),'Still investigating');
for(let i=0;i<12;i++){r('step='+i+';render()');assert(b.doc.querySelector('#screen').innerHTML.length>0);}
r('step=0;render()');b.doc.querySelector('#next').onclick();assert.equal(r('step'),1);assert(r('data.reviewed.includes(0)'));
b.doc.querySelector('#back').onclick();assert.equal(r('step'),0);
b.doc.querySelector('#reset').onclick();assert.equal(r('data.decisionTiming.deadline'),'');assert.equal(r('data.decisionTiming.waiting'),'');assert.equal(r('data.options.length'),1);assert.equal(r('step'),0);
console.log('Passed: timing UI/order, conditional details, exclusive presets and restored text, persistence/reload/reset, non-destructive one-time migration, active/historical export and Overview, Driver links, unresolved unknowns, completeness, escaping and all-screen navigation. Browser layout is not exercised by this stub harness.');

