const assert=require('assert');
const {boot}=require('./helpers/boot.cjs');
let b=boot();const r=code=>b.run(code),plain=code=>JSON.parse(r('JSON.stringify('+code+')'));
const page=()=>b.doc.querySelector('#screen').innerHTML;
const input=(attr,key,value)=>{const e=b.doc.querySelectorAll('[data-'+attr+']').find(n=>(key===null||n.dataset[attr]===key)&&(value===undefined||n.value===value));assert(e,attr+':'+key+':'+value);return e;};
const choose=(attr,value)=>{const e=input(attr,null,value);e.checked=true;e.onchange();};
const type=(key,value)=>{const e=input('reversetext',key);e.value=value;e.oninput();};
const reload=()=>{b=b.reload();};
const payload=()=>JSON.parse(r('captureContextAppendix()').split('```json\n')[1].split('\n```')[0]);
const raw='  A practical route\nWith <literal> text and "quotes"  ';
// Fresh state has exactly two offered trails and neither is inferred or selected.
r('step=9;render()');assert.equal(b.doc.querySelectorAll('[data-reversetrail]').length,2);
assert(!b.doc.querySelectorAll('[data-reversetrail]').some(e=>e.checked));assert(!r('reverseComplete()'));
assert(!page().includes('data-reversetext'));
choose('reversetrail','reversible');assert(!r('reverseComplete()'));
assert.equal(b.doc.querySelectorAll('[data-reversedemand]').length,6);
const html=page();assert(html.indexOf('Funds to exit')<html.indexOf('<textarea'));
assert(html.indexOf('See an example')<html.indexOf('<textarea'));
assert(html.includes('Could you learn enough before changing course becomes harder?'));
assert(!html.includes('ct-factor-hint'));
const money=input('reversedemand','money');money.checked=true;money.onchange();type('route',raw);
assert(r('reverseComplete()'));assert.equal(r('reverseData().route'),raw);
assert(plain('currentReflectionRows()').some(s=>s.id.endsWith('-reverse-route')&&s.text===raw));
r('data.reviewed.push(9);save()');reload();assert.equal(r('reverseData().route'),raw);assert.deepEqual(plain('reverseData().demands'),['money']);
// A source-linked Driver survives hiding the trail and restores with ratings intact.
r('step=10;render();selectDriverReflection(choiceOption().id+"-reverse-route",true);const f=data.factors[0];f.name="Viable return path";f.importance=3;f.evidence=2;f.strength=2;f.direction="for";save();step=9;render()');
choose('reversetrail','irreversible');assert(!r('reverseComplete()'));assert(!r('data.reviewed.includes(9)'));
assert(!plain('currentReflectionRows()').some(s=>s.id.endsWith('-reverse-route')));
assert.equal(r('activeDrivers().length'),0);type('lasting','Lost setup spending and a previous role');
input('reversestage','1').onclick();choose('reverseadjust','yes');type('adjustment','Build initial demand before leaving employment');
assert(r('reverseComplete()'));assert(page().indexOf('See an example')<page().indexOf('<textarea'));
choose('reverseadjust','unknown');assert(!page().includes('data-reversetext="adjustment"'));
assert(page().includes('Yes, here’s how'));assert(r('reverseComplete()'));
assert(plain('reverseInvestigations()').some(x=>x.includes('approach this decision differently')));
assert(!plain('currentReflectionRows()').some(s=>s.id.endsWith('-reverse-adjustment')));
reload();assert.equal(r('reverseData().adjustment'),'Build initial demand before leaving employment');
choose('reverseadjust','yes');assert(page().includes('Build initial demand before leaving employment'));
choose('reverseadjust','none');assert(r('reverseComplete()'));assert.equal(r('reverseInvestigations().length'),0);
choose('reversetrail','reversible');assert.equal(r('activeDrivers().length'),1);assert.equal(r('data.factors[0].name'),'Viable return path');assert.equal(r('data.factors[0].importance'),3);
choose('reversetrail','irreversible');assert.equal(r('reverseData().route'),raw);
// Source cards use actual current answers, excluding inactive or retained-path answers.
r('choiceOption().name="Open a workshop";data.hasHardBoundaries="yes";data.rules=[{id:"savings",text:"Keep shared savings available",status:{},investigate:{}}];data.stressTest.notesByOption[choiceOption().id]="Savings cover a transition";data.decisionTiming.deadline="yes";data.decisionTiming.deadlineDetails="Six weeks to decide on premises";choiceOption().trade.future="HIDDEN_COST";choiceOption().trade.futureUnknown=true;const old=blankOption("Earlier choice");old.trade.immediate="HISTORICAL_COST";data.options.push(old);choiceOption().consequence.immediate="Teach more classes";choiceOption().consequence.branches.favourable=["Repeat students","Steadier bookings"];reverseStage=2;render()');
let sources=plain('reverseSourceRows()');assert(sources.some(s=>s.text==='Keep shared savings available'));assert(sources.some(s=>s.text==='Savings cover a transition'));assert(!sources.some(s=>s.text.includes('HIDDEN_COST')||s.text.includes('HISTORICAL_COST')));
assert(!page().includes('proposed premises are available for another six weeks'));
const key='boundary:savings';let e=input('reversecheck',key,'check');e.checked=true;e.onchange();assert(plain('allInvestigations()').some(x=>x.includes('Keep shared savings available')));
e=input('reversecheck',key,'checked');e.checked=true;e.onchange();assert(!plain('reverseInvestigations()').some(x=>x.includes('Keep shared savings available')));
r('data.reviewed.push(9);save();data.rules[0].text="Keep essential shared savings available";save();render()');
assert(!r('data.reviewed.includes(9)'));assert(page().includes('earlier answer or what you’re considering has changed'));
assert(!r('reverseCheckCurrent(reverseSourceRows().find(s=>s.id==="boundary:savings"))'));
assert(plain('reverseInvestigations()').some(x=>x.includes('changed')));
e=input('reversecheck',key,'checked');e.checked=true;e.onchange();assert(r('reverseData().checksHistory.length')>=2);
assert(!plain('reverseInvestigations()').some(x=>x.includes('changed')));
type('checksNote','Confirm the transition budget before signing.');
// Full export distinguishes inactive writing, historical ratings and source snapshots.
let p=payload();assert.equal(Object.keys(p.questions).length,77);assert([41,42,43].every(n=>p.questions['Q'+n].retired));
assert.equal(p.questions.Q70.question,'As you see it now, is this decision reversible?');
assert.equal(p.records.find(x=>x.questionId==='Q72'&&x.pathId===r('choiceOption().id')).scope,'inactive');
assert.equal(p.records.find(x=>x.questionId==='Q75'&&x.pathId===r('choiceOption().id')).scope,'inactive');
assert(p.records.some(x=>x.questionId==='Q76'&&x.sourceRecordId==='Q09:rules:savings'&&x.sourceFreshness==='current'));
assert(p.records.filter(x=>x.questionId==='Q41').every(x=>x.scope==='historical'&&!x.required));
assert(p.records.filter(x=>/^Q7[0-7]$/.test(x.questionId)).every(x=>x.section==='Reversibility'));
assert.equal(new Set(p.records.map(x=>x.recordId)).size,p.records.length);
assert(p.records.filter(x=>x.sourceRecordId).every(x=>p.records.some(record=>record.recordId===x.sourceRecordId)));
assert(r('decisionContextText()').includes(raw));assert(r('decisionOverview()').includes('Confirm the transition budget'));
assert(!r('reverseOverview()').includes(raw));
// Live status changes in source context invalidate only affected reviewed sections.
r('data.reviewed=[...Array(11).keys()];save();data.reviewed=[...Array(11).keys()];save();reverseData().checksNote="A changed check";save()');
assert(!r('data.reviewed.includes(9)'));assert(r('data.reviewed.includes(7)'));
// Legacy migration never turns difficulty into the new trail or reuses old writing automatically.
const saved=b.stored();saved.options[0].reverse={difficulty:3,costs:['Money','Reputation'],easier:raw};saved.reviewed=[...Array(11).keys()];
b=boot(saved);assert.equal(r('reverseData().trail'),'');assert(!r('reverseComplete()'));assert(!r('data.reviewed.includes(9)'));
assert.equal(r('reverseData().easier'),raw);assert(r('decisionContextText()').includes(raw));
assert(!plain('currentReflectionRows()').some(s=>s.text===raw));
assert(plain('earlierReflectionRows()').some(s=>s.text===raw));reload();assert.equal(r('reverseData().easier'),raw);
// Footer Continue steps through the irreversible trail without marking early stages reviewed.
r('step=9;reverseStage=0;reverseData().trail="irreversible";render()');b.doc.querySelector('#next').onclick();assert.equal(r('step'),9);assert.equal(r('reverseStage'),1);assert(!r('data.reviewed.includes(9)'));
b.doc.querySelector('#next').onclick();assert.equal(r('reverseStage'),2);b.doc.querySelector('#next').onclick();assert.equal(r('step'),10);
assert(!r('assessmentComplete()'));
console.log('Reversibility: migration, both trails, restoration, live-source checks, Drivers, export and navigation pass.');

