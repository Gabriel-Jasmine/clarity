const assert=require('assert');
const {boot}=require('./helpers/boot.cjs');
const b=boot(),r=b.run;
const cases=[
 ['The Decision','step=0;data.decisionTiming.deadline="yes"'],
 ['The Trade-Offs','step=2'],['Carrot on the Stick','step=3'],
 ['What Compounds','step=4'],['The Domino Effect','step=5'],
 ['The Devil\'s Advocate','step=6'],['Wiggle Room','step=7'],
 ['Reversibility: reversible','step=9;reverseData().trail="reversible"'],
 ['Reversibility: lasting','step=9;reverseData().trail="irreversible";reverseStage=0'],
 ['Reversibility: adjustment','step=9;reverseData().trail="irreversible";reverseStage=1;reverseData().adjustmentResponse="yes"'],
 ['Reversibility: checks','step=9;reverseData().trail="irreversible";reverseStage=2'],
 ['Decision Drivers','step=10'],
 ['Tricks of the Mind','step=8;data.judgment.evidenceEncountered="yes";["socialContext","investmentContext","stateContext","wordingContext","exampleContext"].forEach(k=>data.judgment[k].response="yes")']
];
for(const [name,setup] of cases){
 r(setup+';render()');
 const html=b.doc.querySelector('#screen').innerHTML;
 const examples=[...html.matchAll(/<details class="example-disclosure"([^>]*)>([\s\S]*?)<\/details>/g)];
 assert(examples.length,name+' has worked examples');
 for(const [,attributes,body] of examples){
  assert(!/\b(?:open|name)\s*(?:=|$)/.test(attributes.trim()),name+' starts closed and is independent');
  assert(body.startsWith('<summary><span>Example</span>'),name+' uses the common title');
  assert(body.includes('#chevron-down'),name+' has the shared chevron');
  assert(body.includes('<div class="example-content">'),name+' has an inset body');
 }
 assert(!/See an example|EXAMPLE OF WHAT COULD FOLLOW|Example of an outcome|Example of a possible connection/.test(html),name+' has no old headers');
}
r('step=0;render()');
const html=b.doc.querySelector('#screen').innerHTML;
assert(html.includes('for="decision-action"'));
assert(!html.includes('aria-describedby="choice-help choice-example'));
// Typing uses the existing node: it must not rerender (and close) an open example.
const input=b.doc.querySelectorAll('[data-choice]')[0];
input.value='My own action';input.oninput();
assert.strictEqual(b.doc.querySelectorAll('[data-choice]')[0],input);
assert.equal(r('choiceOption().name'),'My own action');
assert(!JSON.stringify(b.stored()).includes('example-disclosure'));
console.log('Examples: common closed native disclosures across all ten sections and Reversibility stages; independent toggles, exact label, local chevron, answer association and typing/storage continuity pass. Real browser interaction/layout remain separate.');
