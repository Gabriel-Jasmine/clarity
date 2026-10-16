const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=['capture.js','reversibility.js','app.js'].map(file=>fs.readFileSync(require('path').join(__dirname,'..',file),'utf8')).join('\n');
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
const select=(id,checked=true)=>{const e=b.doc.querySelectorAll('[data-reflection]').find(e=>e.dataset.reflection===id);assert(e,id);e.checked=checked;e.onchange();};
const field=(id,key,value)=>{const e=b.doc.querySelectorAll('[data-factor]').find(e=>e.dataset.factor===id&&e.dataset.key===key);assert(e);e.value=value;e.oninput();};
const activate=id=>{const e=b.doc.querySelectorAll('[data-activatedriver]').find(e=>e.dataset.activatedriver===id);assert(e);e.onclick();};
assert.equal(r('data.driverReview.formatVersion'),1);
assert.equal(r('driverBasisComplete()'),false);
r('step=10;render()');
assert(screen().includes('What are the expectations you’re relying on most'));
assert(screen().includes('I expect… This is based on…'));
assert(!screen().includes('id="groupReflections"'));
assert.equal(r('data.factors.length'),0);
r('choiceOption().trade.immediate="Give up evenings to run classes";choiceOption().compound.build="Regular bookings could reduce reliance on savings";choiceOption().compound.sustain="Less time for my own pottery";data.decisionTiming.deadline="yes";data.decisionTiming.deadlineDetails="Lease reply due Friday";render()');
const ids=JSON.parse(r('JSON.stringify(reflections().map(x=>x.id))'));
const immediate=ids.find(x=>x.endsWith('-trade-immediate')),build=ids.find(x=>x.endsWith('-compound-build')),sustain=ids.find(x=>x.endsWith('-compound-sustain'));
select(immediate);assert.equal(r('data.factors.length'),1);
const first=r('data.factors[0].id');
assert.equal(r('data.factors[0].name'),'Give up evenings to run classes');
assert.equal(r('data.factors[0].importance'),0);assert.equal(r('data.factors[0].evidence'),0);assert.equal(r('data.factors[0].strength'),0);assert(!r('data.factors[0].directionAssessed'));
select(build);assert.equal(r('data.factors.length'),1);assert.equal(r('activeDriverSources(data.factors[0]).length'),2);
assert(screen().indexOf('class="factorhead"')<screen().indexOf('Review supporting reflections'));
assert(screen().indexOf('Review supporting reflections')<screen().indexOf('How does this reason affect your view?'));
assert(screen().includes('Move to another driver'));assert(screen().includes('New driver'));
field(first,'name','Time and financial commitment');field(first,'rationale','The commitment needs a buffer.');field(first,'importance','3');field(first,'evidence','2');r('data.factors[0].direction="for";render()');field(first,'strength','2');
r('data.factors[0].options=[choiceOption().id];data.factors[0].directionAssessed=true;data.factors[0].direction="for";save()');
assert.equal(r('driverDirection(data.factors[0])'),'Supports it');assert.equal(r('analyse().lean'),'Comparison not assessed');
select(immediate,false);assert.equal(r('activeDrivers().length'),1);
select(build,false);assert.equal(r('activeDrivers().length'),0);assert.equal(r('Object.keys(analyse().scores).length'),0);
assert(!r('decisionOverview().split(\'<details class="earlier-review">\')[0]').includes('Time and financial commitment'));
assert(r('driverContextText()').includes('Retained inactive drivers'));
assert(r('driverContextText()').includes('The commitment needs a buffer.'));
assert.equal(b.reload().run('activeDrivers().length'),0);
select(build);assert.equal(r('data.factors.length'),1);assert.equal(r('activeDrivers().length'),1);assert.equal(r('data.factors[0].name'),'Time and financial commitment');assert.equal(r('data.factors[0].rationale'),'The commitment needs a buffer.');assert.equal(r('data.factors[0].strength'),2);
b.doc.querySelector('#addFactor').onclick();const manual=r('data.factors.at(-1).id');
assert.equal(r('data.factors.at(-1).origin'),'manual');assert.equal(r('data.factors.at(-1).evidence'),0);
field(manual,'name','Protecting my own practice');field(manual,'rationale','A reason I thought of here.');
select(sustain);assert.equal(r('activeDriverSources(data.factors.at(-1)).length'),1);
select(sustain,false);assert.equal(r('activeDrivers().length'),2); // Independent manual reason remains.
activate(first);select('decision-timing-deadline');assert.equal(r('activeDriverSources(data.factors[0]).length'),2);
const mover=b.doc.querySelectorAll('[data-movesource]').find(e=>e.dataset.movesource===first&&e.dataset.sourceid===build);assert(mover);mover.value=manual;mover.onchange();
assert.equal(r('data.factors[0].sources.some(x=>x.id==='+JSON.stringify(build)+')'),false);
assert.equal(r('data.factors[0].sourceHistory.length'),1);assert.equal(r('data.factors[0].sourceHistory[0].movedTo'),manual);
assert.equal(r('data.factors.at(-1).sources.some(x=>x.id==='+JSON.stringify(build)+'&&!x.inactive)'),true);
assert.equal(r('data.factors[0].rationale'),'The commitment needs a buffer.');assert.equal(r('data.factors.at(-1).rationale'),'A reason I thought of here.');
select(build,false);select(build);assert.equal(r('data.driverReview.activeDriverId'),manual);assert.equal(r('data.factors.length'),2);
r('moveDriverReflection('+JSON.stringify(manual)+','+JSON.stringify(build)+',"__new__");render()');
const third=r('data.factors.at(-1).id');assert.equal(r('data.factors.length'),3);assert.equal(r('data.factors.at(-1).importance'),0);
assert.equal(r('driverLinks('+JSON.stringify(build)+').length'),1);assert.equal(r('data.factors.at(-1).sources[0].text'),'Regular bookings could reduce reliance on savings');
const persisted=b.reload();assert.equal(persisted.run('data.factors.length'),3);assert.equal(persisted.run('data.driverReview.activeDriverId'),third);assert.equal(persisted.run('data.factors[0].sourceHistory.length'),1);
const beforeInvalid=r('JSON.stringify(data.factors)');r('moveDriverReflection("missing","missing","__new__")');assert.equal(r('JSON.stringify(data.factors)'),beforeInvalid);
// Editing the earlier answer keeps the linked snapshot and marks the difference.
r('choiceOption().compound.build="The revised current reflection";render()');assert(screen().includes('Earlier linked writing; the reflection has since changed'));assert(screen().includes('View current writing'));assert.equal(r('data.factors.at(-1).sources[0].text'),'Regular bookings could reduce reliance on savings');
r('data.reviewed=[0,3,10];render()');
const basis=b.doc.querySelectorAll('[data-driverbasis]')[0];basis.value='Trial workshops and two comparable studios; repeat demand remains uncertain.';basis.oninput();
assert(r('driverBasisComplete()'));assert(!r('data.reviewed.includes(10)'));assert(r('data.reviewed.includes(0)'));assert(r('data.reviewed.includes(3)'));
const unknown=b.doc.querySelectorAll('[data-driverbasisunknown]')[0];unknown.checked=true;unknown.onchange();assert.strictEqual(b.doc.querySelectorAll('[data-driverbasisunknown]')[0],unknown);
assert(b.doc.querySelectorAll('[data-driverbasis]')[0].disabled);assert.equal(r('driverBasisText()'),'I don’t know yet');assert.equal(r('driverBasisInvestigations().length'),1);assert(r('driverBasisComplete()'));assert.equal(r('analyse().readiness'),'Still investigating');
assert(r('decisionOverview()').includes('Review expectation basis'));assert(!r('decisionOverview().split(\'<details class="earlier-review">\')[0]').includes('Trial workshops and two comparable studios'));
assert(r('driverContextText()').includes('Earlier expectation-basis writing (inactive; not the current response)'));
assert.equal(b.reload().run('data.driverReview.basisUnknown'),true);
const resume=b.doc.querySelectorAll('[data-driverbasisunknown]')[0];resume.checked=false;resume.onchange();assert.equal(r('data.driverReview.basis'),'Trial workshops and two comparable studios; repeat demand remains uncertain.');
assert(!b.doc.querySelectorAll('[data-driverbasis]')[0].disabled);assert.equal(r('driverBasisInvestigations().length'),0);
const context=r('decisionContextText()');for(const text of ['Basis of your expectations','Active supporting reflection','Source ID','directional strength','user-assessed evidence','Earlier supporting reflection','not independent evidence'])assert(context.includes(text),text);
// Earlier groups, duplicate links, IDs, ratings, notes and snapshots stay intact.
const legacy=JSON.parse(r('JSON.stringify(data)'));delete legacy.driverReview;legacy.reviewed=[0,1,7,10];legacy.factors=[{id:'old-a',name:'First old group',rationale:'Keep A',importance:3,evidence:2,strength:1,options:[],sources:[{id:'shared',text:'Original shared reflection',optionId:null}]},{id:'old-b',name:'Second old group',rationale:'Keep B',importance:2,evidence:1,strength:2,sources:[{id:'shared',text:'Original shared reflection',optionId:null},{id:'lost-source',text:'Historical source not in current answers',optionId:'retained-path'}]}];
const old=boot(legacy);assert.equal(old.run('data.factors.length'),2);assert.equal(old.run('data.factors[0].id'),'old-a');assert.equal(old.run('data.factors[0].importance'),3);assert.equal(old.run('data.factors[1].sources[1].optionId'),'retained-path');assert.equal(old.run('data.factors[1].rationale'),'Keep B');
assert(!old.run('data.reviewed.includes(10)'));for(const i of [0,1,7])assert(old.run('data.reviewed.includes('+i+')'));
old.run('step=10;render()');assert(old.doc.querySelector('#screen').innerHTML.includes('Historical source not in current answers'));
old.run('data.reviewed.push(10);save()');assert(old.reload().run('data.reviewed.includes(10)'));
old.run('selectDriverReflection("shared",false);selectDriverReflection("shared",true);');assert.equal(old.run('data.factors.length'),2);assert.equal(old.run('driverLinks("shared").length'),2);assert.equal(old.run('data.factors[0].rationale'),'Keep A');
r('data.factors[0].name="<script>bad</script>";data.factors[0].sources[0].text="<img src=x onerror=bad>";data.driverReview.basis="<img src=x onerror=bad>"');
assert(!r('factors()').includes('<script>bad'));assert(!r('factors()').includes('<img src=x'));assert(!r('decisionOverview()').includes('<img src=x'));assert(r('decisionContextText()').includes('<img src=x'));
for(let i=0;i<12;i++){r('step='+i+';render()');assert(screen().length>0);}
r('step=10;render()');b.doc.querySelector('#back').onclick();assert.equal(r('step'),9);r('step=10;render()');b.doc.querySelector('#next').onclick();assert.equal(r('step'),8);
b.doc.querySelector('#reset').onclick();assert.equal(r('data.factors.length'),0);assert.equal(r('data.driverReview.basis'),'');assert.equal(r('data.driverReview.activeDriverId'),null);
console.log('Passed: automatic shared Drivers; blank initial ratings; title/source placement; hiding/restoration/reload; active targeting; manual reasons; move correction and provenance; active-only synthesis; expectation blank/unknown/persistence; old groups and shared IDs; source changes; escaping; all sections/navigation/reset.');


