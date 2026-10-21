const assert=require('assert');
const {boot}=require('./helpers/boot.cjs');
let b=boot(),r=code=>b.run(code);
let page=()=>b.doc.querySelector('#screen').innerHTML;
const plain=code=>JSON.parse(r('JSON.stringify('+code+')'));
assert(page().includes('What decision are you trying to make?'));
assert(page().includes('id="decision-answer-starter">I’m deciding whether to…</span>'));
assert(page().includes('aria-describedby="choice-help decision-answer-starter"'));
assert.equal(r('choiceOption().name'),'');
const input=b.doc.querySelectorAll('[data-choice]')[0];
input.value='Accept a new job in another city';input.oninput();input.onchange();
assert.equal(r('choiceOption().name'),input.value);
assert(!r('choiceOption().name').startsWith('I’m deciding whether to'));
assert(page().includes('>Do this</span>'));assert(page().includes('>Not do this</span>'));
r('data.choiceInclination="not";save()');
assert.equal(r('startingInclinationText()'),'Leaning towards not doing this');
assert.equal(b.reload().run('data.choiceInclination'),'not');

// All current definitions are updated; original and retired definitions remain inspectable.
const definitions=plain('captureQuestionDefinitions()');
assert.equal(Object.keys(definitions).length,78);
const revised=Object.entries(definitions).filter(([,d])=>d.previousDefinitions);
assert.equal(revised.length,20);
for(const [,d] of revised){assert.equal(d.version,2);assert.equal(d.previousDefinitions[0].version,1);}
for(const [,d] of Object.entries(definitions).filter(([,d])=>!d.retired))assert(!/\bchoice\b/i.test(d.question),d.question);
assert.equal(definitions.Q01.previousDefinitions[0].question,'What choice are you considering?');
assert.equal(definitions.Q38.question,'If nobody could know, judge, praise or be impressed by your choice, would the way you see this decision change?');
assert(definitions.Q38.retired);assert(definitions.Q43.retired);
assert.equal(definitions.Q02.responseLabels.make,'Do this');
assert.equal(definitions.Q02.previousResponseLabels.make,'Make this choice');
assert.equal(definitions.Q66.responseLabels.yes,'Respects this boundary');

// A pre-existing complete sentence, including whitespace and “choice”, is never rewritten.
const raw='  I’m deciding whether to make this choice.\nKeep my original wording <literal>.  ';
let saved=b.stored();saved.options[0].name=raw;saved.decision=raw;saved.choiceInclination='make';
saved.reviewed=[0,1,2,3,4,5,6,7,8,9,10];
b=boot(saved);r=code=>b.run(code);page=()=>b.doc.querySelector('#screen').innerHTML;
assert.equal(r('choiceOption().name'),raw);assert.equal(r('data.decision'),raw.trim()); // Existing summary mirror behavior.
assert.equal(r('data.choiceInclination'),'make');assert.equal(r('data.reviewed.length'),11);
assert.equal(r('data.approachHistory.length'),0);
const payload=JSON.parse(r('captureContextAppendix()').split('```json\n')[1].split('\n```')[0]);
assert.equal(payload.version,2);assert.equal(payload.records.find(x=>x.questionId==='Q01').value,raw);
assert.equal(payload.records.find(x=>x.questionId==='Q01').questionVersion,2);
assert(r('decisionContextText()').includes('## Action under consideration'));

// Exact old no-connection source quotations are not user edits or extra evidence.
r(`const entry=data.devilsAdvocate.outcomes[0];entry.outcome='Keep choice in my own outcome wording';entry.connectionResponse='no';entry.connection='RETAINED_HIDDEN_CONNECTION';
const sid='devils-advocate-'+entry.id;
const oldQuote='Outcome: '+entry.outcome+'\\nConnection assessment (your view): No, I don’t see this choice leading towards that outcome';
data.factors=[{id:'legacy-source-driver',origin:'manual',name:'A reason',rationale:'KEEP_RATIONALE',importance:2,evidence:2,strength:1,direction:'for',options:[],directionChoice:{id:choiceOption().id,name:choiceOption().name},sources:[{id:sid,text:oldQuote,optionId:null,inactive:false}],sourceHistory:[{id:'history',text:'Keep this choice in my old quotation',inactive:true}],inactive:false}];
const f=data.factors[0];f.assessmentReview={snapshot:driverAssessmentSnapshot(f),history:[]};f.assessmentReview.snapshot.sources[0].text=oldQuote;
save();data.reviewed=[0,1,2,3,4,5,6,7,8,9,10];save();`);
assert.equal(r('driverSourceFreshness(data.factors[0].sources[0]).state'),'current');
assert.equal(r('driverAssessmentChanges(data.factors[0]).length'),0);
const sourceBefore=r('JSON.stringify(data.factors[0])');
b=b.reload();r=code=>b.run(code);page=()=>b.doc.querySelector('#screen').innerHTML;
assert.equal(r('JSON.stringify(data.factors[0])'),sourceBefore);
assert.equal(r('data.reviewed.length'),11);
assert.equal(r('driverAssessmentChanges(data.factors[0]).length'),0);
assert.equal(r('data.devilsAdvocate.outcomes[0].connection'),'RETAINED_HIDDEN_CONNECTION');
assert.equal(r('data.factors[0].sourceHistory[0].text'),'Keep this choice in my old quotation');
assert(r('decisionContextText()').includes('No, I don’t see this choice leading towards that outcome'));
// A genuine outcome edit still changes freshness and invalidates the linked assessment.
r('data.devilsAdvocate.outcomes[0].outcome="Actually changed outcome";save()');
assert.equal(r('driverSourceFreshness(data.factors[0].sources[0]).state'),'changed');
assert(r('driverAssessmentChanges(data.factors[0]).length'));
assert(!r('data.reviewed.includes(10)'));
assert(!r('sameReflectionText("unrelated", "my choice", "my decision")'));
console.log('Decision language: current/previous questions, action-only storage, exact existing writing/history, stable review state and quotations, genuine-edit detection and unchanged schema pass.');
