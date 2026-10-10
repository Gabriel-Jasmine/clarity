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
assert.equal(r('data.stressTest.formatVersion'),2);
assert.equal(r('stressComplete()'),false);
r('choiceOption().name="Open a bakery";data.decisionAim="Build an income";data.objective="Time with family";step=7;render()');
let html=b.doc.querySelector('#screen').innerHTML;
for(const text of ['Open a bakery','Build an income','Time with family','Available Time','Support and Cooperation','Your assessment','How much could you manage before this becomes unworkable?'])assert(html.includes(text));
assert.equal((html.match(/<select /g)||[]).length,6);
assert.equal((html.match(/<textarea /g)||[]).length,1);
assert.equal((html.match(/<details /g)||[]).length,1);
assert(!html.includes('<details open'));assert(!html.includes('stress-legend'));assert(!html.includes('direction-reference'));
assert.equal(b.doc.querySelectorAll('[data-stressrow]').length,6);
const id=r('choiceOption().id');
for(const field of b.doc.querySelectorAll('[data-stressrow]')){field.value='room';field.onchange();}
assert(r('stressComplete()'));assert.equal(r('stressStatus()'),'Room remains in the setbacks considered');
const notes=b.doc.querySelectorAll('[data-stresssummary]')[0];notes.value='I can fund 3 months. A fourth month would use rent money. A delay plus replacing equipment could exceed this.';notes.oninput();
assert.equal(b.stored().stressTest.notesByOption[id],notes.value);
assert.equal(b.reload().run('stressNotes()'),notes.value);
assert(r('reflections().find(x=>x.id==="stress-margin-"+choiceOption().id)'));
assert(r('decisionContextText()').includes(notes.value));assert(r('decisionOverview()').includes(notes.value));
assert.equal(r('vulnerabilityItems().length'),0); // Writing is not automatically classified as a vulnerability.
let select=b.doc.querySelectorAll('[data-stressrow]')[0];select.value='unknown';select.onchange();
assert(r('stressComplete()'));assert.equal(r('stressStatus()'),'Some limits are unknown');
assert.equal(r('stressInvestigations().length'),1);assert(r('allInvestigations().join(" ")').includes('money'));
assert(r('decisionOverview()').includes('Review Stress Test unknowns'));assert(r('decisionContextText()').includes('I don’t know yet'));
select.value='beyond';select.onchange();assert.equal(r('stressStatus()'),'A tolerance limit is flagged');assert(r('vulnerabilityItems()[0]').includes('Beyond tolerance'));
select.value='little-room';select.onchange();assert.equal(r('stressStatus()'),'Little room remains in some conditions');
select.value='';select.onchange();assert(!r('stressComplete()'));assert.equal(r('stressStatus()'),'Partly assessed');
// Legacy pressure judgments, original scenario meanings and all path associations remain historical.
let saved=b.stored();saved.reviewed=[6,7,8];saved.options.push({...saved.options[0],id:'earlier-path',name:'Earlier alternative'});
saved.stressTest={ratings:{money:{[id]:'manageable','earlier-path':'too-much'},time:{[id]:'limit'},benefit:{'earlier-path':'manageable'}},leastRoom:'Earlier deadline note',custom:'Retained custom data'};
let migrated=boot(saved);assert.equal(migrated.run('data.stressTest.earlier.custom'),'Retained custom data');
assert(!migrated.run('data.reviewed.includes(7)'));assert(migrated.run('data.reviewed.includes(6)&&data.reviewed.includes(8)'));
assert(!migrated.run('stressComplete()'));assert.equal(migrated.run('stressValue(stressRows[0])'),'');
assert.equal(migrated.run('stressInvestigations().length'),0);assert.equal(migrated.run('stressStatus()'),'Not assessed');
let exported=migrated.run('decisionContextText()');assert(exported.includes('original conditions and pressure scale'));assert(exported.includes('The path takes longer than expected'));assert(exported.includes('Earlier alternative: Too much'));assert(exported.includes('Earlier deadline note'));
assert(migrated.run('reflections().some(x=>x.text==="Earlier deadline note")'));
migrated.run('data.reviewed.push(7);step=7;render()');assert.equal(migrated.doc.querySelectorAll('[data-stressrow]').length,6);
assert(migrated.reload().run('data.reviewed.includes(7)')); // Once reviewed again, migration does not clear it repeatedly.
// New assessments also stay associated with the focal path if a different saved path is selected later.
r('data.options.push(blankOption("Another action"));const nextId=data.options[1].id;data.choiceOptionId=nextId;render()');
assert.equal(r('stressNotes()'),'');assert.equal(r('stressStatus()'),'Not assessed');assert(r('decisionContextText()').includes('Earlier margin assessments for retained paths'));
r('choiceOption().name="<script>alert(1)</script>";data.decisionAim="<img src=x>";data.objective="<b>life</b>";data.stressTest.notesByOption[choiceOption().id]="</textarea><script>bad</script>";render()');
html=b.doc.querySelector('#screen').innerHTML;assert(!html.includes('<script>'));assert(html.includes('&lt;script&gt;'));assert(html.includes('&lt;/textarea&gt;'));
r('step=7;render()');b.doc.querySelector('#back').onclick();assert.equal(r('step'),6);b.doc.querySelector('#next').onclick();assert.equal(r('step'),7);b.doc.querySelector('#next').onclick();assert.equal(r('step'),8);
b.doc.querySelector('#reset').onclick();assert.equal(r('data.stressTest.formatVersion'),2);assert.equal(r('stressNotes()'),'');assert(!r('stressComplete()'));
console.log('Passed: six-condition focal-choice UI, guide/example structure, real context and escaping, response and writing persistence, unknowns/completion/status, Drivers/Overview/export, non-destructive historical migration and one-time review reset, retained-path association, navigation and reset.');
