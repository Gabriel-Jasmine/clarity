const assert=require('node:assert/strict');
const {boot}=require('./helpers/boot.cjs');
let b=boot();const r=code=>b.run(code),plain=code=>JSON.parse(r('JSON.stringify('+code+')'));
const page=()=>b.doc.querySelector('#screen').innerHTML;
const button=(attr,value)=>{const n=b.doc.querySelectorAll('[data-'+attr+']').find(n=>value===undefined||n.dataset[attr]===value);assert.ok(n,attr);return n;};
const seed=`data=fresh();choiceOption().name="Leave employment to run a pottery studio full time.";reverseData().trail="reversible";reverseData().route="Return to employment using savings during the transition.";data.stressTest.notesByOption[choiceOption().id]="Savings cover six months.";data.stressTest.summaryUnknownByOption[choiceOption().id]=false;`;
const assess=`const f=data.factors[0];f.direction="for";f.directionChoice={id:choiceOption().id,name:choiceOption().name};f.importance=3;f.evidence=2;f.strength=2;save();`;
const create=`selectDriverReflection(choiceOption().id+"-reverse-route",true);`;
// First pass: edits before an assessment do not produce a reconsideration prompt.
r(seed+'step=9;render()');
let dep=button('reversedependency','stress-margin-'+r('choiceOption().id'));dep.checked=true;dep.onchange();
r(create+'save();step=10;render()');assert.ok(!page().includes('Does your assessment still fit?'));
r('data.stressTest.notesByOption[choiceOption().id]="Savings cover five months.";save();render()');assert.ok(!page().includes('Does your assessment still fit?'));
r(assess+'render()');assert.equal(r('driverAssessmentChanges(data.factors[0]).length'),0);
const id=r('data.factors[0].id');
// An unrelated assessed driver is unaffected by the savings edit.
r('createDriver("manual");Object.assign(data.factors[1],{name:"Teaching",direction:"for",importance:3,evidence:2,strength:1});save();');
const values=plain('data.factors.map(f=>({id:f.id,name:f.name,direction:f.direction,importance:f.importance,evidence:f.evidence,strength:f.strength}))');
r('data.reviewed=[7,9,10];save();data.reviewed=[7,9,10];save();data.stressTest.notesByOption[choiceOption().id]="Savings cover one month.";save();render()');
assert.equal(r('driverAssessmentChanges(data.factors[0]).length'),1);assert.equal(r('driverAssessmentChanges(data.factors[1]).length'),0);
assert.equal(r('driverSourceFreshness(data.factors[0].sources[0]).state'),'current'); // Quote unchanged; deliberately linked earlier answer changed.
assert.ok(!r('data.reviewed.includes(10)'));assert.ok(page().includes('Does your assessment still fit?'));assert.ok(page().includes('an answer in Wiggle Room'));assert.ok(page().includes('Savings cover five months.'));assert.ok(page().includes('Savings cover one month.'));
assert.deepEqual(plain('data.factors.map(f=>({id:f.id,name:f.name,direction:f.direction,importance:f.importance,evidence:f.evidence,strength:f.strength}))'),values);
assert.ok(!button('keepassessment',id).disabled); // No prerequisite visit or separate Reversibility acknowledgement.
button('keepassessment',id).onclick();assert.equal(r('driverAssessmentChanges(data.factors[0]).length'),0);assert.ok(!page().includes('Does your assessment still fit?'));assert.equal(r('data.factors[0].direction'),'for');
b=b.reload();assert.equal(r('driverAssessmentChanges(data.factors[0]).length'),0);
r('data.stressTest.notesByOption[choiceOption().id]="Savings cover two weeks.";save();step=10;render()');
button('changeassessment',id).onclick();assert.ok(button('saveassessment',id));
let direction=b.doc.querySelectorAll('[data-driverdirection]').find(n=>n.dataset.driverdirection===id&&n.value==='against');direction.checked=true;direction.onchange();
button('saveassessment',id).onclick();assert.equal(r('data.factors[0].direction'),'against');assert.equal(r('driverAssessmentChanges(data.factors[0]).length'),0);assert.equal(r('data.factors[0].importance'),3);assert.equal(r('data.factors[0].assessmentReview.history.at(-1).assessment.direction'),'for');
// Removing or changing a relevant source is visible, but an unselected source is not a dependency.
r('choiceOption().trade.immediate="An unrelated expense";save()');assert.equal(r('driverAssessmentChanges(data.factors[0]).length'),0);
r('data.stressTest.summaryUnknownByOption[choiceOption().id]=true;save();render()');assert.ok(page().includes('No longer active or linked.'));
// Overview separates written questions from counted source checks, and links to the exact local stage.
r('reverseData().trail="irreversible";reverseData().lasting="Cannot recover setup spending.";reverseData().adjustmentResponse="unknown";reverseData().checksNote="Ask about shared access.\\nConfirm weekend demand.";step=11;render()');
const before=plain('allInvestigations()');assert.ok(page().includes('Your Reversibility notes'));assert.ok(page().includes('not counted as a separate checklist item'));r('reverseData().checksNote+="\\nAn additional written question";save()');assert.deepEqual(plain('allInvestigations()'),before);
button('reviewreversechecks').onclick();assert.equal(r('step'),9);assert.equal(r('reverseStage'),2);assert.ok(page().includes('Which unanswered questions'));
// Adopt an adjustment deliberately. Cancel and invalid drafts leave the decision untouched.
r('reverseStage=1;reverseData().adjustmentResponse="yes";reverseData().adjustment="Keep employment and teach weekend classes.";choiceOption().trade.immediate="Original cost answer";choiceOption().incentives.gain="Original incentive answer";choiceOption().compound.build="Original compounding answer";choiceOption().consequence.immediate="Original consequence answer";data.reviewed=[0,1,2,3,4,5,6,7,8,9,10];save();render()');
const action=r('choiceOption().name');button('adoptadjustment').onclick();assert.ok(page().includes('Make this your current approach?'));button('cancelapproach').onclick();assert.equal(r('choiceOption().name'),action);assert.equal(r('data.approachHistory.length'),0);
button('adoptadjustment').onclick();r('reverseAdoptionDraft=""');button('confirmapproach').onclick();assert.equal(b.doc.getElementById('approach-error').hidden,false);assert.equal(r('choiceOption().name'),action);
r('reverseAdoptionDraft="Keep employment and teach weekend classes."');button('confirmapproach').onclick();assert.equal(r('step'),0);assert.equal(r('choiceOption().name'),'Keep employment and teach weekend classes.');assert.equal(r('data.approachHistory[0].from'),action);assert.equal(r('data.approachHistory[0].answers.options[0].trade.immediate'),'Original cost answer');assert.equal(r('choiceOption().trade.immediate'),'Original cost answer');assert.equal(r('data.factors[0].importance'),3);assert.equal(r('data.reviewed.length'),0);assert.ok(page().includes('You&#39;ve updated your decision')||page().includes('You’ve updated your decision'));assert.ok(!page().includes('Return to'));
for(const i of [2,3,4,5])assert.ok(r('approachReviewPending().includes('+i+')'));
r('step=10;render()');assert.ok(page().includes('You assessed this driver for your previous approach.'));button('keepassessment',r('data.factors[1].id')).onclick();assert.equal(r('driverDirectionValue(data.factors[1])'),'for');
r('step=3;render()');b.doc.querySelector('#next').onclick();assert.ok(r('approachReviewPending().includes(3)')); // Navigation alone is not acknowledgement.
r('step=3;render()');button('keepapproachsection','3').onclick();assert.ok(!r('approachReviewPending().includes(3)'));
b=b.reload();assert.equal(r('data.approachHistory.length'),1);assert.equal(r('data.approachHistory[0].answers.options[0].incentives.gain'),'Original incentive answer');
// Later writing does not rewrite the original answers or the previous action in history.
r('choiceOption().trade.immediate="Revised weekend cost";save();step=11;render()');assert.equal(r('data.approachHistory[0].answers.options[0].trade.immediate'),'Original cost answer');assert.ok(page().includes('Used in your current approach'));
const payload=JSON.parse(r('captureContextAppendix()').split('```json\n')[1].split('\n```')[0]);
assert.equal(Object.keys(payload.questions).length,78);assert.equal(new Set(payload.records.map(row=>row.recordId)).size,payload.records.length);
assert.ok(payload.records.some(row=>row.questionId==='action.approachRevision'&&row.scope==='historical'&&row.value.answers.options[0].trade.immediate==='Original cost answer'));
assert.ok(payload.records.some(row=>row.questionId==='action.reverseDependencies'));
assert.ok(payload.records.some(row=>row.questionId==='action.driverAssessmentReview'));
assert.ok(r('decisionContextText()').includes('Approach revisions'));
// Direct edits preserve one prior approach rather than one history item per keystroke, including reload mid-edit.
r('step=0;render()');let input=button('choice');input.value='Run weekend classes';input.oninput();input.value='Run weekend classes in shared premises.';input.oninput();assert.equal(r('data.approachHistory.length'),1);
b=b.reload();assert.equal(r('data.approachHistory.length'),1);assert.ok(page().includes('Did your approach change?'));button('approachwording').onclick();assert.equal(r('data.approachHistory.length'),1);assert.equal(r('choiceOption().name'),'Run weekend classes in shared premises.');
r('step=0;render()');input=button('choice');input.value='Launch a completely different venture';input.oninput();input.onchange();assert.ok(page().includes('Did your approach change?'));button('approachdifferent').onclick();assert.equal(r('data.approachHistory.length'),2);assert.equal(r('data.approachHistory.at(-1).from'),'Run weekend classes in shared premises.');
// Adding the current baseline to older assessed saves does not fabricate an edit or reset their review.
const old=b.stored();delete old.factors[1].assessmentReview;old.reviewed=[10];const migrated=boot(old);assert.ok(migrated.run('data.reviewed.includes(10)'));assert.equal(migrated.run('driverAssessmentChanges(data.factors[1]).length'),0);
// Escaping and reset.
r('data.approachHistory[0].from="<script>bad</script>";step=0;render()');assert.ok(!page().includes('<script>bad'));
b.doc.querySelector('#reset').onclick();assert.equal(r('data.approachHistory.length'),0);assert.equal(r('data.factors.length'),0);assert.equal(r('approachDraft'),null);
console.log('Passed: first pass, explicit dependency scope, post-assessment cues, keep/change without prerequisites, unchanged ratings, reload/re-edit/removal, notes versus unresolved checks, direct checks navigation, deliberate adoption/cancel/validation, complete earlier snapshots, review scope, action history, export provenance, escaping and reset.');

