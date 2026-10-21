const assert=require('assert'),fs=require('fs'),path=require('path');
const {boot}=require('./helpers/boot.cjs');
let b=boot(),r=code=>b.run(code);
const plain=code=>JSON.parse(r('JSON.stringify('+code+')'));
const page=()=>b.doc.querySelector('#screen').innerHTML;
const reload=()=>{b=b.reload();};
const choose=(attribute,id,value)=>{const e=b.doc.querySelectorAll('[data-'+attribute+']').find(e=>e.dataset[attribute]===id&&e.value===value);assert(e,attribute+':'+id+':'+value);e.checked=true;e.onchange();};
const tick=(attribute,id,checked,source)=>{const e=b.doc.querySelectorAll('[data-'+attribute+']').find(e=>e.dataset[attribute]===id&&(!source||e.dataset.sourceid===source));assert(e,attribute+':'+id);e.checked=checked;e.onchange();};
const payload=()=>JSON.parse(r('captureContextAppendix()').split('```json\n')[1].split('\n```')[0]);
const raw='  A current reflection\nSecond line — <tag> "quote"  ';

// All nine stakes are available independently of the three priorities.
r('step=1;data.priorities=["work","learning","purpose"];data.stakes=["work","financial"];render()');
assert.equal(b.doc.querySelectorAll('[data-stake]').length,10);
const priority=b.doc.querySelectorAll('[data-priority]').find(e=>e.value==='work');priority.checked=false;priority.onchange();
assert(plain('data.stakes').includes('work'));assert(plain('data.stakes').includes('financial'));
assert.equal(r('data.priorities.length'),2);

// Explicit current source IDs include active Judgment context, excluding hidden context/history.
r('choiceOption().name="Open a pottery studio";choiceOption().incentives.gain='+JSON.stringify(raw)+';choiceOption().compound.build="Returning students may make bookings steadier";data.judgment.socialContext={formatVersion:1,response:"yes",detail:"Other studios make me want to commit sooner"};data.judgment.stateContext.detail="HIDDEN_STATE";data.judgment.stateContext.response="none";data.judgment.strongestCase="Demand may be occasional";data.judgment.evidenceEncountered="unsure";choiceOption().trade.foregone=["EARLIER_FOREGONE"];data.inversion=["EARLIER_INVERSION"];const older=blankOption("");older.trade.futureUnknown=true;older.incentives.gain="EARLIER_PATH_GAIN";data.options.push(older);step=10;render()');
let current=plain('currentReflectionRows()');
assert(current.some(s=>s.id==='judgment-socialContext'));
for(const text of ['HIDDEN_STATE','Demand may be occasional','EARLIER_FOREGONE','EARLIER_INVERSION','EARLIER_PATH_GAIN'])assert(!current.some(s=>s.text===text));
assert(!plain('allInvestigations()').some(s=>s.includes('Untitled option')));
assert(!plain('vulnerabilityItems()').some(s=>s.includes('EARLIER_INVERSION')));
assert(!current.some(s=>s.id==='judgment-change-evidence'));
const focal=r('choiceOption().id'),gain=focal+'-incentive-gain',build=focal+'-compound-build';
tick('reflection',gain,true);const first=r('data.factors[0].id');
assert.equal(r('data.factors[0].name'),raw);assert.equal(r('data.factors[0].sources[0].text'),raw);
tick('reflection',build,true);assert.equal(r('data.factors.length'),1);
r('data.factors[0].name="Teaching and a stable community";data.factors[0].importance=3;data.factors[0].evidence=2;data.factors[0].strength=2;data.factors[0].rationale="KEEP_RATIONALE";render()');
choose('driverdirection',first,'for');assert.equal(r('driverDirection(data.factors[0])'),'Supports it');
assert(page().indexOf('class="factorhead"')<page().indexOf('Review supporting reflections'));
assert(page().indexOf('Review supporting reflections')<page().indexOf('How does this reason affect your view?'));
for(const label of ['Supports it','Against it','Neither','Not sure'])assert(page().includes('>'+label+'</span>'));
choose('driverdirection',first,'neutral');
assert(!b.doc.querySelectorAll('[data-factor]').some(e=>e.dataset.key==='strength'));
assert.equal(r('data.factors[0].strength'),2);
assert.equal(payload().records.find(x=>x.questionId==='Q48').scope,'inactive');
choose('driverdirection',first,'unknown');assert(plain('allInvestigations()').some(s=>s.includes('Teaching and a stable community')));
choose('driverdirection',first,'against');assert.equal(r('data.factors[0].strength'),2);
assert.equal(r('analyse().lean'),'Comparison not assessed');assert.deepEqual(plain('analyse().scores'),{});

// Removing the last link hides the same automatic card; reload and recheck restore it.
tick('reflection',gain,false);tick('reflection',build,false);assert.equal(r('activeDrivers().length'),0);
reload();tick('reflection',gain,true);assert.equal(r('data.factors.length'),1);assert.equal(r('data.factors[0].id'),first);
assert.equal(r('data.factors[0].rationale'),'KEEP_RATIONALE');assert.equal(r('data.factors[0].direction'),'against');
tick('reflection',build,true);

// Adopt, undo and re-adopt current source writing, retaining exact quotes and ratings.
r('choiceOption().incentives.gain="LATEST_GAIN";save();data.reviewed.push(10);save();choiceOption().incentives.gain="LATEST_GAIN_V2";save();render()');
assert(!r('data.reviewed.includes(10)'));assert(page().includes('View current writing'));
tick('currentwriting',first,true,gain);assert.equal(r('data.factors[0].sources[0].text'),'LATEST_GAIN_V2');
assert.equal(r('data.factors[0].sources[0].writingSwitch.before'),raw);
reload();tick('currentwriting',first,false,gain);assert.equal(r('data.factors[0].sources[0].text'),raw);
assert.equal(r('choiceOption().incentives.gain'),'LATEST_GAIN_V2');assert.equal(r('data.factors[0].importance'),3);
reload();tick('currentwriting',first,true,gain);
r('data.reviewed.push(10);save();choiceOption().incentives.gain="LATEST_GAIN_V3";save();render()');
assert(!r('data.reviewed.includes(10)'));assert(page().includes('Your reflection has changed again'));
assert.equal(r('data.factors[0].sources[0].text'),'LATEST_GAIN_V2');
tick('currentwriting',first,false,gain);assert.equal(r('data.factors[0].sources[0].text'),raw);
tick('currentwriting',first,true,gain);assert.equal(r('data.factors[0].sources[0].text'),'LATEST_GAIN_V3');
assert(r('data.factors[0].sourceHistory.some(s=>s.text==="LATEST_GAIN_V2")'));

// A moved link carries its reversible switch, without changing either Driver's ratings.
r('const target=createDriver("manual");target.name="Another reason";target.importance=1;target.evidence=1;target.strength=1;moveDriverReflection('+JSON.stringify(first)+','+JSON.stringify(gain)+',target.id);render()');
const second=r('data.factors[1].id');tick('currentwriting',second,false,gain);
assert.equal(r('data.factors[1].sources[0].text'),raw);assert.equal(r('data.factors[1].importance'),1);
assert.equal(r('data.factors[0].importance'),3);assert.equal(r('choiceOption().incentives.gain'),'LATEST_GAIN_V3');

// Historical reuse is reversible, restores shared relationships, and removes only its own links.
tick('earlierrelevant','inversion-0',true);assert(r('reflections().some(s=>s.id==="inversion-0")'));
assert.equal(r('data.factors.length'),2);assert.equal(r('data.factors[1].sources.length'),2);
reload();tick('earlierrelevant','inversion-0',false);assert(!r('reflections().some(s=>s.id==="inversion-0")'));
assert.equal(r('activeDrivers().length'),2);assert.equal(r('activeDriverSources(data.factors[1]).length'),1);
reload();tick('earlierrelevant','inversion-0',true);assert.equal(r('data.factors.length'),2);
r('moveDriverReflection('+JSON.stringify(second)+',"inversion-0",'+JSON.stringify(first)+');render()');
tick('earlierrelevant','inversion-0',false);
assert(r('data.factors[0].sources.find(s=>s.id==="inversion-0").inactive'));
tick('earlierrelevant','inversion-0',true);assert(r('activeDriverSources(data.factors[0]).some(s=>s.id==="inversion-0")'));
assert.equal(r('data.factors[0].rationale'),'KEEP_RATIONALE');
// A history-only Driver is hidden, and the same card is restored after unchecking/reloading.
r('data.driverReview.activeDriverId=null;render()');tick('earlierrelevant',focal+'-trade-foregone-0',true);
const historyDriver=r('data.factors.at(-1).id');r('data.factors.at(-1).rationale="KEEP_HISTORY_REASON";save()');
tick('earlierrelevant',focal+'-trade-foregone-0',false);assert(!r('activeDrivers().some(f=>f.id==='+JSON.stringify(historyDriver)+')'));
reload();tick('earlierrelevant',focal+'-trade-foregone-0',true);assert.equal(r('data.factors.at(-1).id'),historyDriver);assert.equal(r('data.factors.at(-1).rationale'),'KEEP_HISTORY_REASON');

// Shared legacy links keep each Driver and assessment, rather than inferring fresh direction.
const legacy=b.stored();legacy.reviewPolicyVersion=1;legacy.ui={step:8,active:focal};legacy.reviewed=[...Array(11).keys()];
legacy.factors=[{id:'old-a',name:'A',rationale:'Keep A',importance:3,evidence:2,strength:1,options:[focal],sources:[{id:'old-shared',text:'OLD_SHARED',inactive:false}]},{id:'old-b',name:'B',rationale:'Keep B',importance:2,evidence:1,strength:2,options:[],sources:[{id:'old-shared',text:'OLD_SHARED',inactive:false}]}];
const migrated=boot(legacy);assert.equal(migrated.run('step'),8);assert.equal(migrated.run('data.factors[0].direction'),'');assert.equal(migrated.run('data.factors[0].options[0]'),focal);
for(const index of [1,7,10])assert(!migrated.run('data.reviewed.includes('+index+')'));
for(const index of [0,2,3,4,5,6,8,9])assert(migrated.run('data.reviewed.includes('+index+')'));
migrated.run('toggleEarlierReflection("old-shared",true)');assert.equal(migrated.run('activeDrivers().length'),2);
migrated.run('toggleEarlierReflection("old-shared",false);toggleEarlierReflection("old-shared",true);data.reviewed=[...Array(11).keys()];save()');
assert.equal(migrated.reload().run('data.reviewed.length'),11);assert.equal(migrated.run('data.factors[1].strength'),2);

// Conditional boundary checks retain notes and require a fresh answer after the target changes.
r('data.hasHardBoundaries="yes";data.rules=[{id:"buffer",text:"Protect essential expenses",status:{[choiceOption().id]:"yes"},investigate:{}}];step=7;render()');
assert.equal(r('boundaryAnswer(data.rules[0])'),'');assert(page().includes('Check your hard boundaries'));
assert(page().indexOf('Check your hard boundaries')>page().indexOf('stress-writing'));
const boundary=value=>{const e=b.doc.querySelectorAll('[data-boundarycheck]')[0];assert(e);e.value=value;e.onchange();};
boundary('no');let note=b.doc.querySelectorAll('[data-boundarynote]')[0];note.value=raw;note.oninput();
assert.equal(r('analyse().readiness'),'A hard boundary conflict is recorded');assert(plain('vulnerabilityItems()').some(s=>s.startsWith('Boundary conflict')));
boundary('yes');assert(!b.doc.querySelectorAll('[data-boundarynote]').length);assert.equal(r('data.rules[0].check.note'),raw);
assert(payload().records.some(x=>x.questionId==='Q67'&&x.scope==='inactive'&&x.value===raw));
boundary('unknown');assert.equal(b.doc.querySelectorAll('[data-boundarynote]').length,1);assert.equal(r('data.rules[0].check.note'),raw);
assert(plain('boundaryInvestigations()').some(s=>s.includes('Protect essential expenses')));
r('data.rules[0].text="Revised essential expense buffer";save();render()');assert.equal(r('boundaryAnswer(data.rules[0])'),'');assert(page().includes('Earlier boundary assessment'));
boundary('yes');assert.equal(r('data.rules[0].checkHistory[0].note'),raw);
r('choiceOption().name="A revised pottery plan";save();render()');assert.equal(r('boundaryAnswer(data.rules[0])'),'');
boundary('yes');assert.equal(r('data.rules[0].checkHistory.length'),2);
r('data.hasHardBoundaries="no";save()');assert(payload().records.filter(x=>x.questionId==='Q66').every(x=>x.scope!=='current'));
reload();assert.equal(r('data.rules[0].checkHistory[0].note'),raw);

// Warning priorities never yield the unqualified no-blocker status.
r('data.hasHardBoundaries="yes";data.rules[0].check.value="no";stressRows.forEach(row=>data.stressTest.ratings[row.id]={[choiceOption().id]:"beyond"});save()');
assert.equal(r('analyse().readiness'),'A hard boundary conflict is recorded');
r('data.rules[0].check.value="yes"');assert.equal(r('analyse().readiness'),'A tolerance limit needs review');

// Full records preserve raw text, changed sources, old path scopes and relationships exactly once per ID.
let p=payload();assert.equal(p.version,2);assert.equal(Object.keys(p.questions).length,78);
assert.equal(p.questions.Q45.version,2);assert.equal(p.questions.Q66.retired,false);
assert.equal(new Set(p.records.map(x=>x.recordId)).size,p.records.length);
assert(p.records.filter(x=>x.pathId===r('data.options[1].id')).every(x=>x.scope==='historical'&&!x.required&&!x.visible));
assert(p.records.some(x=>x.questionId==='Q69'&&x.value.before===raw));
assert(p.records.some(x=>x.questionId==='Q68'&&x.value===true));
assert(p.records.some(x=>x.questionId==='Q50'&&x.value.sourceHistory.some(s=>s.text===raw)));
assert.deepEqual(p.navigationOrder,[0,1,2,3,4,5,6,7,9,10,8,11]);assert.equal(p.sectionIds['8'],'Tricks of the Mind');
r('step=11;render()');const overview=page().split('<section class="ai-export">')[0];
assert(overview.includes('Earlier unlinked reflections')||overview.includes('Earlier review material'));
assert(overview.includes('the reflection has since changed'));assert(!overview.includes('<tag>'));
assert(r('decisionContextText()').includes(raw));assert(r('decisionContextText()').includes('Earlier path (historical)'));

// Navigation, saved positions, edit links and re-entry all use stable IDs in the agreed order.
const order=[0,1,2,3,4,5,6,7,9,10,8,11];
r('step=0;render()');for(const next of order.slice(1)){b.doc.querySelector('#next').onclick();assert.equal(r('step'),next);}
for(const back of order.slice(0,-1).reverse()){b.doc.querySelector('#back').onclick();assert.equal(r('step'),back);}
r('step=8;render()');assert(page().includes('Review your decision drivers'));
const revisit=b.doc.querySelectorAll('[data-edit]').find(e=>e.dataset.edit==='10');revisit.onclick();assert.equal(r('step'),10);
reload();assert.equal(r('step'),10);assert.equal(b.doc.querySelector('#stepCount').textContent,'10 of 12');

// Execute actual finish/reopen closures: empty first branch, filled branch, and reopened empty branch.
const source=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const finish=source.match(/const finish=\(\)=>\{([\s\S]*?)\n   \};/)[1];
const reopen=source.match(/reopen.onclick=\(\)=>\{([\s\S]*?)\n   \};/)[1];
assert(source.includes('first?\'<div class="consequence-continuation-head"><button'));
for(const value of ['',raw]){
 const entry={input:{value},editor:{hidden:false},stop:{hidden:false},node:{remove(){}}},entries=[entry],c={branchEnded:{unfavourable:false}},message={textContent:''},finished={hidden:true,querySelector:()=>message};let persisted=0;
 const args=['entries','c','key','finished','persist','compact','status','reopen','open','add'];
 const values=[entries,c,'unfavourable',finished,()=>persisted++,()=>{},{textContent:''},{focus(){}},e=>{e.editor.hidden=false;},()=>entry];
 new Function(...args,finish)(...values);assert(c.branchEnded.unfavourable);assert(!finished.hidden);if(!value){assert(entry.editor.hidden);assert(message.textContent.includes('No further plausible effect'));}
 new Function(...args,reopen)(...values);assert(!c.branchEnded.unfavourable);assert(!entry.stop.hidden);assert(finished.hidden);
 new Function(...args,finish)(...values);assert(c.branchEnded.unfavourable);assert.equal(persisted,3);
}
// A complete focal review stays complete with an unassessed retained path; limitations still surface.
b=boot();r(`data=fresh();const o=choiceOption();o.name="Community pottery studio";data.decisionAim="Teach regular classes";data.horizon="Weeks or months";data.hasHardBoundaries="no";data.priorities=[lifeDomains[0].id];data.stakes=[lifeDomains[0].id];data.decisionTiming.deadline="none";data.decisionTiming.waitingResponse="none";o.trade.alternatives=["Use shared workspace"];o.trade.immediate="Savings";o.trade.future="Flexibility";o.incentives.gainResponse="none";o.incentives.reliefResponse="none";o.incentives.fit="Fits my priorities";compoundingQuestions.forEach(q=>o.compound[q.key]="Concrete reflection");o.consequence.immediate="More classes";["favourable","unfavourable"].forEach(key=>{o.consequence.branchEnded[key]=true;o.consequence.branches[key]=["Possible effect"]});data.devilsAdvocate.outcomes[0].outcome="No time to make pottery";data.devilsAdvocate.outcomes[0].connectionResponse="no";stressRows.forEach(row=>data.stressTest.ratings[row.id]={[o.id]:"room"});data.stressTest.notesByOption[o.id]="Savings cover one additional month";data.judgment.evidenceEncountered="none";data.judgment.strongestCase="Regular demand may be lower";data.judgment.changeEvidence="Repeat bookings";data.judgment.socialContext.response="none";Object.keys(judgmentAdditionalCopy).forEach(key=>data.judgment[key].response="none");o.reverse.difficulty=1;o.reverse.trail="reversible";o.reverse.route="Return to a manageable working arrangement using transition savings";data.driverReview.basis="Comparable trial classes";data.factors=[{id:"reason",origin:"manual",name:"Teaching",rationale:"",importance:2,evidence:2,strength:1,directionAssessed:true,direction:"for",options:[o.id],sources:[],sourceHistory:[]}];save();data.reviewed=Array.from({length:11},(_,i)=>i);save();`);
r('data.options.push(blankOption(""));data.options[1].trade.futureUnknown=true;save();data.reviewed=[...Array(11).keys()];save()');
assert(r('assessmentComplete()'));assert.equal(r('analyse().readiness'),'No unresolved blocker recorded');
r('data.stressTest.ratings[stressRows[0].id][choiceOption().id]="little-room";save();data.reviewed.push(7,9);save()');
assert(r('assessmentComplete()'));assert.equal(r('analyse().readiness'),'Limited room recorded');
r('data.hasHardBoundaries="yes";data.rules=[{id:"new-boundary",text:"Protect savings",status:{},investigate:{}}];setBoundaryAnswer("new-boundary","unknown");save();data.reviewed=[...Array(11).keys()];save()');
assert(r('assessmentComplete()'));assert.equal(r('analyse().readiness'),'Still investigating');
r('data.rules[0].text="Protect essential savings";save()');assert(!r('assessmentComplete()'));assert.equal(r('analyse().readiness'),'Boundary check incomplete');
// Direction remains a user assessment of the exact contemplated action.
r('step=10;render()');choose('driverdirection','reason','for');
r('choiceOption().name="A different contemplated action";save();render()');
assert.equal(r('driverDirection(data.factors[0])'),'Direction not assessed');assert.equal(r('data.factors[0].direction'),'for');
assert.equal(payload().records.find(x=>x.questionId==='Q45').state,'unanswered');
// A later independent selection survives undoing an earlier relevance control.
b=boot();r('choiceOption().incentives.gain="Retained gain";choiceOption().incentives.gainResponse="none";toggleEarlierReflection(choiceOption().id+"-incentive-gain",true);choiceOption().incentives.gainResponse="";selectDriverReflection(choiceOption().id+"-incentive-gain",false);selectDriverReflection(choiceOption().id+"-incentive-gain",true);toggleEarlierReflection(choiceOption().id+"-incentive-gain",false)');
assert.equal(r('activeDrivers().length'),1);assert.equal(r('activeDriverSources(data.factors[0]).length'),1);
// Moving a quote into an existing inactive same-source link preserves both snapshots and its undo state.
r('choiceOption().incentives.gain="New gain";toggleCurrentWriting(data.factors[0].id,choiceOption().id+"-incentive-gain",true);const destination=createDriver("manual");destination.name="Target";destination.sources=[{id:choiceOption().id+"-incentive-gain",text:"Old target quote",inactive:true}];moveDriverReflection(data.factors[0].id,choiceOption().id+"-incentive-gain",destination.id);toggleCurrentWriting(destination.id,choiceOption().id+"-incentive-gain",false)');
assert.equal(r('data.factors[1].sources[0].text'),'Retained gain');assert(r('data.factors[1].sourceHistory.some(s=>s.text==="Old target quote")'));
// Opening source groups is presentation state and does not invalidate a reviewed Driver.
r('step=10;save();data.reviewed.push(10);save();render()');
const group=b.doc.querySelectorAll('[data-sourcegroup]')[0];assert(group);group.open=true;group.ontoggle();assert(r('data.reviewed.includes(10)'));assert(r('data.driverReview.openGroups.length')>0);
console.log('Passed: whole-flow scope, stable navigation/migration, independent stakes, direction and retained strength, source-switch undo/reload/re-edit/move, relevance undo/restoration/shared groups, boundary compatibility/history, warning priorities, raw version-2 capture and empty-branch finish/reopen. Simulated DOM/storage and actual branch closures; browser layout/accessibility remain pending.');

