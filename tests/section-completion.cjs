const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {boot}=require('./helpers/boot.cjs');
let b=boot();const r=code=>b.run(code),plain=code=>JSON.parse(JSON.stringify(r(code)));
// Visiting, opening Menu, or skipping every empty page must never complete it.
for(let index=0;index<11;index++)b.doc.querySelector('#next').onclick();
assert.equal(r('step'),11);assert.deepEqual(plain('data.reviewed'),[]);
assert(plain('sectionCompletionFlags()').every(value=>value===false));
assert(!b.doc.querySelector('#nav').innerHTML.includes('cl-completion'));
const legacy=b.stored();legacy.reviewed=Array.from({length:12},(_,i)=>i);delete legacy.completionStatus;
b=boot(legacy);assert(plain('sectionCompletionFlags()').every(value=>value===false));
assert(!b.doc.querySelector('#nav').innerHTML.includes('cl-completion'));

const fill=`data=fresh();const o=choiceOption();o.name="Open a community studio";data.decisionAim="Teach classes";data.horizon="Weeks or months";data.priorities=["work"];data.stakes=["work"];data.hasHardBoundaries="no";data.decisionTiming.deadline="none";data.decisionTiming.waitingResponse="none";o.trade.alternatives=["Use shared premises"];o.trade.immediate="Savings";o.trade.future="Flexibility";o.incentives.gainResponse="none";o.incentives.reliefResponse="none";o.incentives.fit="Fits my priorities";compoundingQuestions.forEach(q=>o.compound[q.key]="A reflection");o.consequence.immediate="Regular classes";["favourable","unfavourable"].forEach(key=>{o.consequence.branchEnded[key]=true;o.consequence.branches[key]=["A possible effect"]});data.devilsAdvocate.outcomes[0].outcome="Less time to make art";data.devilsAdvocate.outcomes[0].connectionResponse="no";stressRows.forEach(row=>data.stressTest.ratings[row.id]={[o.id]:"no-effect"});data.judgment.evidenceEncountered="none";data.judgment.strongestCase="Demand may be lower";data.judgment.changeEvidence="Repeat bookings";data.judgment.socialContext.response="none";Object.keys(judgmentAdditionalCopy).forEach(key=>data.judgment[key].response="none");o.reverse.trail="reversible";o.reverse.route="Return to shared premises";data.driverReview.basis="Trial classes";data.factors=[{id:"reason",origin:"manual",name:"Teaching",rationale:"",importance:2,evidence:2,strength:1,directionAssessed:true,direction:"for",options:[o.id],sources:[],sourceHistory:[]}];save();data.reviewed=Array.from({length:11},(_,i)=>i);save();`;
r(fill);assert(plain('sectionCompletionFlags()').every(Boolean));
const complete=b.stored();
const missing=[
 'choiceOption().name=""',
 'data.stakes=[]',
 'choiceOption().trade.future=""',
 'choiceOption().incentives.fit=""',
 'choiceOption().compound.build=""',
 'choiceOption().consequence.branchEnded.favourable=false',
 'data.devilsAdvocate.outcomes[0].outcome=""',
 'data.stressTest.ratings[stressRows[0].id][choiceOption().id]=""',
 'data.judgment.changeEvidence=""',
 'choiceOption().reverse.route=""',
 'data.factors[0].importance=0'
];
missing.forEach((remove,index)=>{
 b=boot(complete);r(remove);
 // Even a stale reviewed flag cannot show a check on an incomplete section.
 const flags=plain('sectionCompletionFlags()');assert.equal(flags[index],false,'Incomplete section '+index);assert.equal(flags[11],false);
 r('step='+index+';render()');b.doc.querySelector('#next').onclick();
 assert(!r('data.reviewed.includes('+index+')'),'Continue cannot review an unfinished section '+index);
});
b=boot(complete);
r('data.stakes=["other"];data.stakesOtherText=""');assert(!r('sectionCompletionFlags()[1]'));
r('data.stakesOtherText="Another area"');assert(r('sectionCompletionFlags()[1]'));
r('data.stakes=["work"];choiceOption().trade.futureUnknown=true;choiceOption().trade.future=""');assert(r('sectionCompletionFlags()[2]'));
r('choiceOption().compound.buildUnknown=true;choiceOption().compound.build=""');assert(r('sectionCompletionFlags()[4]'));
r('data.devilsAdvocate.outcomes[0].connectionResponse="unknown"');assert(r('sectionCompletionFlags()[6]'));
r('choiceOption().reverse.trail="irreversible";choiceOption().reverse.lasting="The original commitment";choiceOption().reverse.adjustmentResponse="yes";choiceOption().reverse.adjustment=""');assert(!r('sectionCompletionFlags()[9]'));
r('choiceOption().reverse.adjustmentResponse="unknown"');assert(r('sectionCompletionFlags()[9]'));
r('data.hasHardBoundaries="yes";data.rules=[{id:"r",text:"Preserve time",status:{},investigate:{}}]');assert(!r('sectionCompletionFlags()[7]'));
r('setBoundaryAnswer("r","unknown")');assert(r('sectionAnswerChecks()[7]'));

// Save refreshes existing indicators without replacing the active answer node.
b=boot(complete);const nodes=Array.from({length:12},(_,i)=>({dataset:{step:String(i)},label:'',status:{innerHTML:''},setAttribute(k,v){this.label=v;},querySelector(){return this.status;}}));
const query=b.doc.querySelectorAll;b.doc.querySelectorAll=s=>s==='#nav [data-step]'?nodes:query(s);
r('save()');assert(nodes.every(node=>node.status.innerHTML.includes('cl-completion')));
r('choiceOption().trade.future="";save()');assert.equal(nodes[2].status.innerHTML,'');assert.equal(nodes[11].status.innerHTML,'');assert(nodes[2].label.endsWith(', incomplete'));

function guide(saved){
 const links=Array.from({length:12},(_,i)=>({href:'https://example.test/'+["the-decision", "things-dear-to-you", "the-trade-offs", "carrot-on-the-stick", "what-compounds", "the-domino-effect", "the-devils-advocate", "wiggle-room", "tricks-of-the-mind", "reversibility", "decision-drivers", "decision-overview"][i]+'/',label:'',status:{innerHTML:''},querySelector(s){return s==='.nav-label'?{textContent:'Section '+i}:this.status;},setAttribute(k,v){this.label=v;}}));
 let writes=0;const ctx={URL,document:{body:{classList:{contains:()=>true}},getElementById:id=>id==='nav'?{querySelectorAll:()=>links}:{addEventListener(){}}},localStorage:{getItem:()=>JSON.stringify(saved),setItem:()=>writes++}};
 vm.createContext(ctx);vm.runInContext(['completion.js','navigation.js'].map(file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8')).join('\n'),ctx);
 assert.equal(writes,0);return links;
}
assert(guide(complete).every(link=>link.status.innerHTML.includes('cl-completion')));
assert(guide(legacy).every(link=>link.status.innerHTML===''));
const stale=JSON.parse(JSON.stringify(complete));stale.options[0].trade.future='';assert(guide(stale).every(link=>link.status.innerHTML===''));
assert(guide(null).every(link=>link.status.innerHTML===''));
console.log('Passed: all 12 section indicators, empty Continue, stale reviewed flags, conditional answers, live indicator updates, versioned guide freshness and read-only guide behavior. Device-independent logic; browser layout not claimed.');
