// Practical reversibility for consequential life decisions. These prompts guide reflection;
// they do not verify an exit, diagnose risk, or require delaying a decision.
const reverseQuestions={
 trail:'As you see it now, is this decision reversible?',
 demands:'Select what changing course would require you to manage.',
 route:'How could you change course, and what would it take?',
 lasting:'What could you not undo once you went ahead?',
 adjustmentResponse:'Could you change how you approach the decision to limit those lasting consequences?',
 adjustment:'Describe how you could approach the decision differently.',
 checks:'Which unanswered questions could change whether or how you proceed?',
 checksNote:'Describe the checks that matter for your decision.'
};
const reverseDemands=[
 ['money','Money','Funds to exit, cover a transition or rebuild stability'],
 ['time','Time','Time to change course and manage the transition'],
 ['capacity','Effort and capacity','Practical, physical or emotional effort involved'],
 ['people','Other people’s agreement or support','Permission, cooperation or assistance you would need'],
 ['obligations','Ongoing obligations','Responsibilities that would continue after changing course'],
 ['other','Other','Anything else that affects your ability to change course']
];
const reverseAdjustmentChoices=[['yes','Yes, here’s how'],['none','No workable adjustment identified'],['unknown','I don’t know yet']];
const reverseCheckChoices=[['checked','Already checked'],['check','Need to check'],['irrelevant','Not relevant']];
function blankReverse(){return {formatVersion:2,trail:'',demands:[],route:'',lasting:'',adjustmentResponse:'',adjustment:'',checks:{},checksHistory:[],checksNote:'',dependencies:{},adoptedAdjustment:null,difficulty:0,costs:[],easier:''};}
function normalizeReverse(value){
 const r={...blankReverse(),...(value&&typeof value==='object'?value:{})};
 r.formatVersion=2;
 if(!['reversible','irreversible'].includes(r.trail))r.trail='';
 if(!Array.isArray(r.demands))r.demands=[];
 r.demands=[...new Set(r.demands.filter(id=>reverseDemands.some(([key])=>key===id)))];
 for(const key of ['route','lasting','adjustment','checksNote','easier'])if(typeof r[key]!=='string')r[key]='';
 if(!reverseAdjustmentChoices.some(([id])=>id===r.adjustmentResponse))r.adjustmentResponse='';
 if(!r.checks||typeof r.checks!=='object'||Array.isArray(r.checks))r.checks={};
 if(!Array.isArray(r.checksHistory))r.checksHistory=[];
 if(!Array.isArray(r.costs))r.costs=[];
 if(!r.dependencies||typeof r.dependencies!=='object'||Array.isArray(r.dependencies))r.dependencies={};
 for(const key of Object.keys(r.dependencies)){if(!['route','lasting','adjustment','checks'].includes(key)||!r.dependencies[key]||typeof r.dependencies[key]!=='object'||Array.isArray(r.dependencies[key]))delete r.dependencies[key];}
 return r;
}
let reverseStage=0;
function reverseData(o=choiceOption()){return o.reverse;}
function reverseTrailLabel(o=choiceOption()){return {reversible:'Reversible',irreversible:'Irreversible'}[o.reverse.trail]||'Not assessed yet';}
function reverseComplete(){const r=reverseData();return r.trail==='reversible'?!!r.route.trim():r.trail==='irreversible'&&!!r.lasting.trim()&&reverseAdjustmentChoices.some(([v])=>v===r.adjustmentResponse)&&(r.adjustmentResponse!=='yes'||!!r.adjustment.trim());}
function reverseLegacyText(o=choiceOption()){
 const r=o.reverse;if(!r.difficulty&&!r.costs.length&&!r.easier.length)return '';
 return 'Earlier Reversibility answers (historical; not the new trail assessment)\nDifficulty: '+(['Not assessed','Easy','Moderate','Difficult'][r.difficulty]||String(r.difficulty))+'\nCosts: '+(r.costs.join(', ')||'[None selected]')+'\nEarlier flexibility writing:\n'+(r.easier||'[Not answered]');
}
function reverseSourceRows(){
 const o=choiceOption(),rows=[];
 const add=(id,section,text,prompt,step,questionId,field)=>{if(text?.trim())rows.push({id,section,text,prompt,step,questionId,field,pathId:o.id});};
 if(data.hasHardBoundaries==='yes')data.rules.forEach(r=>add('boundary:'+r.id,'Hard boundary',r.text,'Would changing course leave what you need to protect intact?',1,'Q09','rules:'+r.id));
 if(!stressSummaryUnknown())add('stress-margin-'+o.id,'Stress Test',stressNotes(),'Would the transition involved in changing course be manageable too?',7,'Q31',o.id+':stress.summary');
 stressRows.forEach((row,i)=>{const v=stressValue(row);if(['beyond','little-room','unknown'].includes(v))add('stress-rating:'+row.id,'Stress Test',row.label+' — '+stressChoices.find(c=>c.value===v).label,'Would this condition also limit your ability to change course?',7,'Q'+(25+i),o.id+':stress.'+row.id);});
 if(data.decisionTiming.deadline==='yes')add('decision-timing-deadline','Decision timing',data.decisionTiming.deadlineDetails,'Which checks could you complete before this deadline or a deeper commitment?',0,'Q52','decisionTiming.deadlineDetails');
 if(!data.decisionTiming.waitingResponse)add('decision-timing-waiting','Decision timing',data.decisionTiming.waiting,'What would waiting to learn more change for this decision?',0,'Q53','decisionTiming.waiting');
 ['immediate','future'].forEach((key,i)=>{if(!o.trade[key+'Unknown'])add(o.id+'-trade-'+key,'Trade-Offs',o.trade[key],'Which demands or consequences would remain if you changed course?',2,'Q'+(11+i),o.id+':trade.'+key);});
 compoundingQuestions.forEach(({key},i)=>{if(!o.compound[key+'Unknown'])add(o.id+'-compound-'+key,'Compounding',o.compound[key],'Could what develops over time change your room to act later?',4,'Q'+(16+i),o.id+':compound.'+key);});
 ['favourable','unfavourable'].forEach((key,i)=>{if(o.consequence.branches[key].some(t=>t.trim()))add(o.id+'-consequences-'+key,'Further Consequences',[o.consequence.immediate,consequenceSequenceText(o,key)].filter(Boolean).join(' → '),'Is there a point in this possible chain where you could still change course?',5,'Q'+(20+i),o.id+':consequence.'+key+':0');});
 advocateEntries().filter(e=>e.connectionResponse!=='no').forEach(e=>add('devils-advocate-'+e.id,'The Devil’s Advocate',advocateReflectionText(e),'What would you need to establish before committing to a path that could lead here?',6,'Q24','connection:'+e.id));
 return rows;
}
function reverseCheckCurrent(source,o=choiceOption()){
 const c=o.reverse.checks[source.id];return c&&reverseCheckChoices.some(([v])=>v===c.value)&&c.text===source.text&&c.focalText===o.name?c:null;
}
function setReverseCheck(id,value){
 const source=reverseSourceRows().find(s=>s.id===id),o=choiceOption();if(!source||!reverseCheckChoices.some(([v])=>v===value))return;
 const previous=o.reverse.checks[id];if(previous)o.reverse.checksHistory.push({...previous,sourceId:id});
 o.reverse.checks[id]={...source,value,focalText:o.name};
}
function reverseInvestigations(){
 const r=reverseData();if(r.trail!=='irreversible')return [];
 const out=[];if(r.adjustmentResponse==='unknown')out.push('Explore whether you could approach this decision differently to limit lasting consequences.');
 const rows=reverseSourceRows();rows.forEach(s=>{const c=reverseCheckCurrent(s);if(c?.value==='check')out.push('Reversibility — '+sectionDisplayName(s.section)+': '+s.prompt+'\n'+s.text);else if(r.checks[s.id]&&!c)out.push('Revisit your Reversibility check: the earlier '+sectionDisplayName(s.section)+' answer or what you’re considering has changed.');});
 return out;
}
function reverseRetainedText(o=choiceOption()){
 const r=o.reverse,out=[];
 if(r.trail!=='reversible'&&(r.route.length||r.demands.length))out.push('Earlier reversible-trail writing — inactive\n'+(r.route||'[No writing]')+'\nDemands: '+r.demands.map(id=>reverseDemands.find(([key])=>key===id)?.[1]||id).join(', '));
 if(r.trail!=='irreversible'){
  if(r.lasting.length)out.push('Earlier irreversible-trail writing — inactive\n'+r.lasting);
  if(r.adjustmentResponse||r.adjustment.length)out.push('Earlier adjustment response — inactive\n'+(reverseAdjustmentChoices.find(([v])=>v===r.adjustmentResponse)?.[1]||'[Not answered]')+'\n'+r.adjustment);
  if(r.checksNote.length)out.push('Earlier checks writing — inactive\n'+r.checksNote);
 }else if(r.adjustmentResponse!=='yes'&&r.adjustment.length)out.push('Earlier adjustment writing — inactive\n'+r.adjustment);
 const checks=Object.entries(r.checks);if(checks.length)out.push('Recorded source checks (each applies to its saved quotation; not independent evidence)\n'+checks.map(([id,c])=>id+'\n'+(c.text||'')+'\n'+(reverseCheckChoices.find(([v])=>v===c.value)?.[1]||c.value)).join('\n\n'));
 if(r.checksHistory.length)out.push('Earlier source-check snapshots — historical\n'+r.checksHistory.map(c=>(c.text||'')+'\n'+(reverseCheckChoices.find(([v])=>v===c.value)?.[1]||c.value)).join('\n\n'));
 const legacy=reverseLegacyText(o);if(legacy)out.push(legacy);
 return out.join('\n\n');
}
function reverseCurrentText(o=choiceOption()){
 const r=o.reverse,out=['Current view: '+reverseTrailLabel(o)];
 if(r.trail==='reversible')out.push('Demands selected (optional): '+(r.demands.map(id=>reverseDemands.find(([key])=>key===id)?.[1]).join(', ')||'[None selected]'),'Changing course:\n'+(r.route||'[Not answered]'));
 if(r.trail==='irreversible'){
  out.push('What stays changed:\n'+(r.lasting||'[Not answered]'),'Room to adjust: '+(reverseAdjustmentChoices.find(([v])=>v===r.adjustmentResponse)?.[1]||'[Not answered]'));
  if(r.adjustmentResponse==='yes')out.push(reverseAdjustmentAdopted(o)?'Adjustment used in the current approach:':'Possible adjustment — not adopted:',r.adjustment||'[Not answered]');
  if(o.id===choiceOption().id)out.push('Earlier reflections to consider:\n'+(reverseSourceRows().map(s=>sectionDisplayName(s.section)+'\n'+s.text+'\nPrompt: '+s.prompt+'\n'+(reverseCheckCurrent(s)?reverseCheckChoices.find(([v])=>v===reverseCheckCurrent(s).value)[1]:r.checks[s.id]?'Earlier answer or decision changed; check needs review':'Not yet reviewed')).join('\n\n')||'[No earlier reflections available]'));
  out.push('Checks writing (optional):\n'+(r.checksNote||'[Not provided]'));
 }
 return out.join('\n\n');
}
function reverseContextText(o=choiceOption()){const retained=reverseRetainedText(o);return reverseCurrentText(o)+(retained?'\n\n'+retained:'');}
function reverseOverview(){
 const r=reverseData(),out=['<p class="field-note">As you currently see it · '+esc(reverseTrailLabel())+'</p>'];
 if(r.trail==='reversible')out.push('<h4>How you could change course</h4><p class="reverse-raw">'+esc(r.route||'Not answered yet.')+'</p>',r.demands.length?'<p class="field-note">What it would require: '+esc(r.demands.map(id=>reverseDemands.find(([key])=>key===id)?.[1]).join(', '))+'</p>':'');
 if(r.trail==='irreversible'){
  out.push('<h4>What you could not undo</h4><p class="reverse-raw">'+esc(r.lasting||'Not answered yet.')+'</p><h4>Room to adjust</h4><p>'+esc(reverseAdjustmentChoices.find(([id])=>id===r.adjustmentResponse)?.[1]||'Not answered yet.')+'</p>');
  if(r.adjustmentResponse==='yes')out.push('<small>'+(reverseAdjustmentAdopted()?'Used in your current approach':'A possibility you are considering')+'</small><p class="reverse-raw">'+esc(r.adjustment)+'</p>');
  const checks=reverseSourceRows().filter(row=>reverseCheckCurrent(row));
  if(checks.length)out.push('<details><summary>Your source checks</summary>'+checks.map(row=>'<h4>'+esc(sectionDisplayName(row.section))+'</h4><p class="reverse-raw">'+esc(row.text)+'</p><small>'+esc(reverseCheckChoices.find(([id])=>id===reverseCheckCurrent(row).value)?.[1])+'</small>').join('')+'</details>');
 }
 const context=reverseSourceRows().filter(row=>(r.trail==='reversible'?['route']:r.trail==='irreversible'?['lasting',...(r.adjustmentResponse==='yes'?['adjustment']:[]),'checks']:[]).some(key=>r.dependencies[key]?.[row.id]));
 if(context.length)out.push('<details><summary>Supporting context</summary>'+context.map(row=>'<h4>'+esc(sectionDisplayName(row.section))+'</h4><p class="reverse-raw">'+esc(row.text)+'</p>').join('')+'</details>');
 return out.join('');
}
function reverseReflectionRows(o=choiceOption(),includeInactive=false){
 const r=o.reverse,rows=[];const add=(key,text,live)=>{if(text?.trim()&&(live||includeInactive))rows.push({id:o.id+'-reverse-'+key,text,section:live?'Reversibility':'Earlier Reversibility',optionId:o.id});};
 add('route',r.route,r.trail==='reversible');add('lasting',r.lasting,r.trail==='irreversible');add('adjustment',r.adjustment,r.trail==='irreversible'&&r.adjustmentResponse==='yes');add('checks',r.checksNote,r.trail==='irreversible');
 if(includeInactive&&r.easier.trim())rows.push({id:o.id+'-reverse-legacy-easier',text:r.easier,section:'Earlier Reversibility',optionId:o.id});
 return rows;
}
function reverseExample(text){return exampleDisclosure('<p>'+esc(text)+'</p>');}
function reverseWriting(key,question,help,placeholder,example){return '<div class="reverse-writing"><label class="reverse-writing-label" for="reverse-writing-'+key+'">'+esc(question)+'</label>'+(help?'<p class="field-note" id="reverse-help-'+key+'">'+esc(help)+'</p>':'')+(example?reverseExample(example):'')+'<textarea id="reverse-writing-'+key+'" data-reversetext="'+key+'" '+(help?'aria-describedby="reverse-help-'+key+'"':'')+' placeholder="'+esc(placeholder)+'">'+esc(reverseData()[key])+'</textarea></div>';}
function reverseSourcePanel(assess=false,dependencyField=''){
 const rows=reverseSourceRows();if(!rows.length)return '<p class="field-note">Earlier relevant writing will appear here when available. You can still describe your own concerns.</p>';
 const cards=rows.map(s=>{const check=reverseCheckCurrent(s),stale=reverseData().checks[s.id]&&!check;return '<div class="reverse-source"><div class="section-heading"><strong>'+esc(sectionDisplayName(s.section))+'</strong><button class="edit-link" data-edit="'+s.step+'">Revisit</button></div><blockquote>'+esc(s.text)+'</blockquote><p>'+esc(s.prompt)+'</p>'+(dependencyField?'<label class="reverse-dependency"><input type="checkbox" data-reversedependency="'+esc(s.id)+'" data-dependencyfield="'+esc(dependencyField)+'" '+(reverseData().dependencies[dependencyField]?.[s.id]?'checked':'')+'><span>My explanation relies on this answer</span></label>':'')+(assess?'<fieldset class="reverse-check"><legend class="field-note">Does this raise anything you still need to establish? <small>(optional)</small></legend>'+reverseCheckChoices.map(([v,l])=>'<label><input type="radio" name="reverse-check-'+esc(s.id)+'" data-reversecheck="'+esc(s.id)+'" value="'+v+'" '+(check?.value===v?'checked':'')+'><span>'+l+'</span></label>').join('')+'</fieldset>'+(stale?'<p class="field-note">The earlier answer or what you’re considering has changed. Your earlier check is retained; consider it again.</p>':''):'')+'</div>';});
 return '<p class="field-note">These earlier reflections may be relevant. They are your recorded answers, not verified facts.</p>'+cards.slice(0,3).join('')+(cards.length>3?'<details class="reverse-guide"><summary>More earlier reflections ('+(cards.length-3)+')</summary>'+cards.slice(3).join('')+'</details>':'');
}
function reversibilityScreen(){
 const r=reverseData(),trail='<fieldset class="reverse-trails"><legend>'+esc(reverseQuestions.trail)+'</legend>'+[['reversible','Reversible','I could change course and return to a situation I can manage.'],['irreversible','Irreversible','I could not undo the main commitment or restore what matters to me.']].map(([v,l,h])=>'<label class="reverse-trail"><input type="radio" name="reverse-trail" data-reversetrail value="'+v+'" '+(r.trail===v?'checked':'')+'><span><strong>'+l+'</strong><small>'+h+'</small></span></label>').join('')+'</fieldset><p class="field-note">You can change your view as you think it through.</p>';
 let body='';
 if(r.trail==='reversible')body='<section class="reverse-section"><h3>'+esc(reverseQuestions.route)+'</h3><p class="field-note">Describe the practical route, what you would need to manage, and whether there is a point beyond which changing course becomes harder.</p><fieldset class="reverse-demands"><legend>'+esc(reverseQuestions.demands)+' <small>(optional)</small></legend>'+reverseDemands.map(([id,label,hint])=>'<label><input type="checkbox" data-reversedemand="'+id+'" '+(r.demands.includes(id)?'checked':'')+' aria-labelledby="reverse-demand-label-'+id+'" aria-describedby="reverse-demand-help-'+id+'"><span><span id="reverse-demand-label-'+id+'">'+esc(label)+'</span><small id="reverse-demand-help-'+id+'">'+esc(hint)+'</small></span></label>').join('')+'</fieldset><details class="reverse-guide"><summary>Could you learn enough before changing course becomes harder?</summary><p>Consider what you would need to learn to reconsider, and whether you could learn it while changing course is still practical. A smaller step or staged commitment may help where relevant. You can include this in your explanation below.</p></details><details class="reverse-guide"><summary>From your earlier thinking</summary>'+reverseSourcePanel(false,'route')+'</details>'+reverseWriting('route','Describe how you would change course.','Include how you would manage the demands you selected and anything important you could not restore.','I could change course by… This would require… I would still be left with… My room to change course becomes narrower when…','I could close the business and seek employment again, using savings during the transition. Finding a suitable role could take several months; returning to my previous employer has not been agreed. Setup spending would remain lost. Taking on permanent premises would add obligations. I could use shared space first to learn about repeat demand before deciding on a lease, although this would not establish long-term viability.')+'</section>';
 if(r.trail==='irreversible'){
  const titles=['What stays changed','Room to adjust','What needs checking'];
  body='<p class="field-note reverse-intent">Important parts of this decision may be difficult to undo. Before committing, consider which unanswered questions could change your decision and what you can establish in the time available.</p><nav class="reverse-stages" aria-label="Explore the commitment">'+titles.map((t,i)=>'<button class="reverse-stage" data-reversestage="'+i+'" '+(reverseStage===i?'aria-current="step"':'')+'>'+t+'</button>').join('')+'</nav><section class="reverse-section">';
  if(reverseStage===0)body+='<h3>'+esc(reverseQuestions.lasting)+'</h3><p class="field-note">Describe the main commitment or consequences you could not reverse. Include when they become difficult or impossible to undo, if that matters.</p><details class="reverse-guide"><summary>A few things to consider</summary><p>Money or time you could not recover. Opportunities or arrangements you could not restore. Responsibilities or obligations that would continue even if you stopped.</p></details>'+reverseDependencyPanel('lasting')+reverseWriting('lasting','Describe what would stay changed.','','Once I… I could not recover or restore… This becomes a lasting commitment when…','Once I leave employment, I cannot assume I can return to the same role or income. Savings spent setting up the business would not be fully recoverable. If I sign a long lease, some payment obligations could continue even if the business closes.')+'<div class="reverse-actions"><button data-reversestage="1">Continue →</button></div>';
  if(reverseStage===1)body+='<h3>'+esc(reverseQuestions.adjustmentResponse)+'</h3><p class="field-note">Consider the sequence, timing or terms of commitment. Include what an adjustment would let you learn or protect, and what it would cost or compromise.</p><fieldset class="reverse-adjustment"><legend>Your response</legend>'+reverseAdjustmentChoices.map(([v,l])=>'<label><input type="radio" name="reverse-adjustment" data-reverseadjust value="'+v+'" '+(r.adjustmentResponse===v?'checked':'')+'><span>'+esc(l)+'</span></label>').join('')+'</fieldset>'+(r.adjustmentResponse==='yes'?reverseDependencyPanel('adjustment')+reverseWriting('adjustment',reverseQuestions.adjustment,'','I could approach it differently by… This would preserve… It would also mean…','I could build initial demand before leaving employment and delay committing to permanent premises. That would limit the savings committed upfront. Growth would be slower, and working on both would take more energy. Initial demand would not yet show whether the business could support me over time.')+'<p class="field-note" data-adjustmentstatus>'+(reverseAdjustmentAdopted()?'This adjustment was used to update your current approach.':'You are considering this possibility. Your decision stays as written until you choose to update it.')+'</p>'+'<button class="secondary" data-adoptadjustment '+(reverseAdjustmentAdopted()?'hidden ':'')+(!r.adjustment.trim()?'disabled':'')+'>Use this approach</button>'+reverseAdoptionPanel():'<p class="field-note">'+(r.adjustmentResponse==='none'?'No workable adjustment identified.':r.adjustmentResponse==='unknown'?'You haven’t established whether an adjustment is possible.':'Select a response to continue your reflection.')+(r.adjustment.length?' Your earlier writing is kept. Choose “Yes, here’s how” to return to it.':'')+'</p>')+'<div class="reverse-actions"><button class="secondary" data-reversestage="0">← Back</button><button data-reversestage="2">Continue →</button></div>';
  if(reverseStage===2)body+='<h3>'+esc(reverseQuestions.checks)+'</h3>'+reverseSourcePanel(true,'checks')+'<details class="reverse-guide"><summary>Anything else worth checking?</summary><p>Does changing course depend on someone else’s agreement? Would obligations continue after stopping? Could an opportunity close before you learn enough? These prompts are a starting point for your own concerns.</p></details>'+reverseWriting('checksNote',reverseQuestions.checksNote+' (optional)','Build on the reflections above and add anything missing. Consider what you could establish in the time available and what may remain uncertain.','I need to establish… An answer could change whether or how I proceed because… I could find out by… I would need to know before…','Before leaving employment, I need to check the financial room needed for a return to work. I could review actual household costs and speak with people hiring for relevant roles. If the transition would exceed the savings I can use, I would change the timing or scale of the commitment.')+'<div class="reverse-actions"><button class="secondary" data-reversestage="1">← Back</button></div>';
  body+='</section>';
 }
 const retained=reverseRetainedText();
 return '<div class="reversibility-page">'+card('Your room to change course','',trail+body+(retained?'<details class="reverse-history"><summary>Earlier writing and saved source checks</summary><p class="reverse-raw">'+esc(retained)+'</p></details>':''))+'</div>';
}
function bindReversibility(){
 document.querySelectorAll('[data-reversetrail]').forEach(e=>e.onchange=()=>{reverseData().trail=e.value;render();});
 document.querySelectorAll('[data-reversedemand]').forEach(e=>e.onchange=()=>{const r=reverseData();r.demands=e.checked?[...new Set([...r.demands,e.dataset.reversedemand])]:r.demands.filter(id=>id!==e.dataset.reversedemand);save();});
 document.querySelectorAll('[data-reversetext]').forEach(e=>e.oninput=()=>{
  reverseData()[e.dataset.reversetext]=e.value;save();
  if(e.dataset.reversetext==='adjustment'){
   const button=document.querySelector('[data-adoptadjustment]'),status=document.querySelector('[data-adjustmentstatus]');
   if(button){button.disabled=!e.value.trim();button.hidden=reverseAdjustmentAdopted();}
   if(status)status.textContent=reverseAdjustmentAdopted()?'This adjustment was used to update your current approach.':'You are considering this possibility. Your decision stays as written until you choose to update it.';
  }
 });
 document.querySelectorAll('[data-reverseadjust]').forEach(e=>e.onchange=()=>{reverseData().adjustmentResponse=e.value;render();});
 document.querySelectorAll('[data-reversestage]').forEach(e=>e.onclick=()=>{reverseStage=+e.dataset.reversestage;render();});
 document.querySelectorAll('[data-reversecheck]').forEach(e=>e.onchange=()=>{const id=e.dataset.reversecheck,value=e.value;setReverseCheck(id,value);render();Array.from(document.querySelectorAll('[data-reversecheck]')).find(n=>n.dataset.reversecheck===id&&n.value===value)?.focus();});
}

function captureReverseRecords(o,path,add,writing){
 const r=o.reverse,live=path.scope==='current',component={...path,componentFormatVersion:r.formatVersion};
 const ctx=(active,required=false)=>({...component,scope:live?(active?'current':'inactive'):'historical',visible:live&&active,required:live&&active&&required});
 add(70,o.id+':reverse.trail',r.trail,{...component,state:r.trail?'selected':'unanswered',required:live,choices:['reversible','irreversible'],interpretation:'Provisional user judgment, not a verified classification'});
 add(71,o.id+':reverse.demands',r.demands,{...ctx(r.trail==='reversible'),choices:reverseDemands,interpretation:'Optional practical prompts; unchecked items are not verified absent'});
 writing(72,o.id+':reverse.route',r.route,ctx(r.trail==='reversible',true));
 writing(73,o.id+':reverse.lasting',r.lasting,ctx(r.trail==='irreversible',true));
 add(74,o.id+':reverse.adjustmentResponse',r.adjustmentResponse,{...ctx(r.trail==='irreversible',true),state:r.adjustmentResponse==='unknown'?'unknown':r.adjustmentResponse==='none'?'none':r.adjustmentResponse?'selected':'unanswered',choices:reverseAdjustmentChoices});
 writing(75,o.id+':reverse.adjustment',r.adjustment,ctx(r.trail==='irreversible'&&r.adjustmentResponse==='yes',true));
 writing(77,o.id+':reverse.checksNote',r.checksNote,ctx(r.trail==='irreversible'));
 const rows=live?reverseSourceRows():[],ids=new Set(rows.map(s=>s.id));
 rows.forEach(s=>{const c=reverseCheckCurrent(s,o);add(76,o.id+':reverse.check:'+s.id,c?.value||'',{...ctx(r.trail==='irreversible'),kind:'response',state:c?.value==='check'?'unknown':c?.value?'selected':'unanswered',sourceId:s.id,sourceRecordId:s.questionId+':'+s.field,sourceQuestionId:s.questionId,sourceText:s.text,promptContext:s.prompt,sourceFreshness:c?'current':r.checks[s.id]?'changed':'not_assessed',interpretation:'User status for an earlier reflection; no verified factual conclusion'});});
 Object.entries(r.checks).forEach(([id,c])=>{if(!live||!ids.has(id)||!reverseCheckCurrent(rows.find(s=>s.id===id),o)||r.trail!=='irreversible')add(76,o.id+':reverse.check:retained:'+id,c,{...ctx(false),sourceId:id,kind:'snapshot',state:'selected'});});
 r.checksHistory.forEach((c,i)=>add(76,o.id+':reverse.check:history:'+i,c,{...component,scope:'historical',visible:false,required:false,sourceId:c.sourceId,kind:'snapshot'}));
 add(41,o.id+':reverse.difficulty',r.difficulty,{...component,scope:'historical',visible:false,required:false,state:[1,2,3].includes(r.difficulty)?'selected':'unanswered'});
 add(42,o.id+':reverse.costs',r.costs,{...component,scope:'historical',visible:false,required:false});
 writing(43,o.id+':reverse.easier',r.easier,{...component,scope:'historical',visible:false,required:false});
}

// A review cue belongs to an already assessed driver. Earlier-answer dependencies
// are explicitly selected by the user; text similarity is never treated as a link.
function reverseDependencyRows(reflectionId){
 const o=choiceOption(),field=['route','lasting','adjustment','checks'].find(key=>reflectionId===o.id+'-reverse-'+key);
 if(!field)return [];
 const rows=reverseSourceRows(),saved=o.reverse.dependencies[field]||{};
 return Object.values(saved).map(source=>{const current=rows.find(row=>row.id===source.id);return {id:reflectionId+':'+source.id,sourceId:source.id,reflectionId,section:source.section,text:current?.text??null,field:source.field,questionId:source.questionId};});
}
function reverseDependencyPanel(field){return '<details class="reverse-guide"><summary>Earlier answers used in this explanation</summary>'+reverseSourcePanel(false,field)+'</details>';}
function setReverseDependency(field,id,checked){
 if(!['route','lasting','adjustment','checks'].includes(field))return;
 const source=reverseSourceRows().find(row=>row.id===id);if(!source)return;
 const dependencies=reverseData().dependencies;
 if(!dependencies[field])dependencies[field]={};
 if(checked)dependencies[field][id]={...source};else delete dependencies[field][id];
}
function driverAssessmentComplete(f){return !!(f.name.trim()&&driverDirectionChoices.some(([id])=>id===f.direction)&&[1,2,3].includes(f.importance)&&[1,2,3].includes(f.evidence)&&(!['for','against'].includes(f.direction)||[1,2].includes(f.strength)));}
function driverAssessmentValues(f){return {name:f.name,rationale:f.rationale,direction:f.direction,importance:f.importance,evidence:f.evidence,strength:f.strength};}
function driverAssessmentSnapshot(f){
 const o=choiceOption(),sources=activeDriverSources(f).map(source=>{const current=reflections().find(row=>row.id===source.id);return {id:source.id,text:current?.text??null,section:current?.section||'Earlier writing'};});
 return {assessment:driverAssessmentValues(f),action:{id:o.id,text:o.name},sources,dependencies:activeDriverSources(f).flatMap(source=>reverseDependencyRows(source.id))};
}
function syncDriverAssessmentSnapshots(){
 activeDrivers().forEach(f=>{if(!f.assessmentReview&&driverAssessmentComplete(f))f.assessmentReview={snapshot:driverAssessmentSnapshot(f),history:[]};else if(f.assessmentReview&&!driverAssessmentChanges(f).length)f.assessmentReview.snapshot.assessment=driverAssessmentValues(f);});
}
function driverAssessmentChanges(f){
 if(!f.assessmentReview)return [];
 const before=f.assessmentReview.snapshot,now=driverAssessmentSnapshot(f),changes=[];
 if(before.action.id!==now.action.id||before.action.text!==now.action.text)changes.push({kind:'action',section:'Decision',before:before.action.text,current:now.action.text});
 for(const key of ['sources','dependencies']){
  const old=new Map((before[key]||[]).map(row=>[row.id,row])),latest=new Map(now[key].map(row=>[row.id,row]));
  for(const id of new Set([...old.keys(),...latest.keys()])){const a=old.get(id),b=latest.get(id);if(!sameReflectionText(b?.sourceId||a?.sourceId||id,a?.text??null,b?.text??null))changes.push({kind:key,section:b?.section||a?.section||'Earlier writing',sourceId:b?.sourceId||a?.sourceId||id,before:a?.text??null,current:b?.text??null});}
 }
 return [...new Map(changes.map(change=>[JSON.stringify([change.kind==='action'?'action':change.sourceId,change.before,change.current]),change])).values()];
}
function driverAssessmentReviewCue(f,editable=false){
 const changes=driverAssessmentChanges(f);if(!changes.length)return '';
 const action=changes.some(change=>change.kind==='action'),sections=[...new Set(changes.filter(c=>c.kind!=='action').map(c=>sectionDisplayName(c.section)))];
 const description=action?'You assessed this driver for your previous approach.':'You changed '+(sections.length===1?'an answer in '+sections[0]:'earlier answers in '+sections.join(', '))+' after assessing this driver.';
 return '<section class="driver-review-cue"><h3>Does your assessment still fit?</h3><p class="field-note">'+esc(description)+'</p><details><summary>See what changed</summary>'+changes.map(c=>'<h4>'+esc(sectionDisplayName(c.section))+'</h4><small>When you assessed this driver</small><blockquote>'+esc(c.before??'Not linked then.')+'</blockquote><small>Now</small><blockquote>'+esc(c.current??'No longer active or linked.')+'</blockquote>').join('')+'</details>'+(editable?'<div class="review-actions"><button data-keepassessment="'+esc(f.id)+'">Keep my assessment</button><button class="secondary" data-changeassessment="'+esc(f.id)+'">Change my assessment</button></div>':'<button class="edit-link" data-edit="10">Reconsider this assessment</button>')+'</section>';
}
function acknowledgeDriverAssessment(id,method='keep'){
 const f=activeDrivers().find(row=>row.id===id);if(!f||!driverAssessmentComplete(f))return false;
 if(!f.assessmentReview)f.assessmentReview={snapshot:driverAssessmentSnapshot(f),history:[]};
 const review=f.assessmentReview;
 review.history.push({snapshot:review.snapshot,assessment:review.snapshot.assessment||driverAssessmentValues(f),method});
 f.directionChoice={id:choiceOption().id,name:choiceOption().name};
 review.snapshot=driverAssessmentSnapshot(f);f.reviewEditing=false;driverReviewChanged();save();return true;
}
let approachDraft=null;
function approachAnswerSnapshot(){const {approachHistory,approachReview,pendingApproachEdit,ui,...answers}=data;return JSON.parse(JSON.stringify(answers));}
function approachAnsweredSections(){
 const o=choiceOption(),present=[true,!!(data.objective||data.priorities.length||data.stakes.length||data.hasHardBoundaries),!!(o.trade.alternatives.some(t=>t.trim())||o.trade.immediate||o.trade.future),!!(o.incentives.gain||o.incentives.relief||o.incentives.fit||o.incentives.gainResponse||o.incentives.reliefResponse),compoundingQuestions.some(q=>o.compound[q.key]||o.compound[q.key+'Unknown']),!!(o.consequence.immediate||o.consequence.branches.favourable.some(Boolean)||o.consequence.branches.unfavourable.some(Boolean)),!!data.devilsAdvocate.outcomes[0].outcome,!!(stressNotes()||stressRows.some(row=>stressValue(row))),!!(data.judgment.evidenceEncountered||data.judgment.changeEvidence||Object.keys(judgmentAdditionalCopy).some(key=>data.judgment[key]?.response)||data.judgment.socialContext.response),!!o.reverse.trail,!!data.factors.length];
 return stepOrder.filter(i=>i!==11&&(present[i]||data.reviewed.includes(i)));
}
function recordApproachRevision(from,to,answers,sections,source){
 if(!from.trim()||from===to)return;
 data.approachHistory.push({id:uid(),pathId:choiceOption().id,from,to,source,answers});
 data.approachReview={action:to,sections:[...sections]};
 data.reviewed=[];
}
function finishApproachDraft(){
 if(!approachDraft)return;
 const draft=approachDraft;approachDraft=null;delete data.pendingApproachEdit;
 recordApproachRevision(draft.from,choiceOption().name,draft.answers,draft.sections,'decision-edit');
}
function editCurrentApproach(text){
 if(!approachDraft&&choiceOption().name.trim()&&approachAnsweredSections().some(i=>i!==0))approachDraft={from:choiceOption().name,answers:approachAnswerSnapshot(),sections:approachAnsweredSections()};
 choiceOption().name=text;data.pendingApproachEdit=approachDraft;save();
}
function adoptAdjustedApproach(text){
 if(typeof text!=='string'||!text.trim()||text.trim()===choiceOption().name)return false;
 finishApproachDraft();
 const from=choiceOption().name,answers=approachAnswerSnapshot(),sections=approachAnsweredSections();
 choiceOption().name=text.trim();
 recordApproachRevision(from,choiceOption().name,answers,sections,'reversibility-adjustment');
 reverseData().adoptedAdjustment={text:reverseData().adjustment,action:choiceOption().name};
 reverseAdoptionOpen=false;step=0;render();return true;
}
function approachReviewPending(){return data.approachReview?.action===choiceOption().name?data.approachReview.sections:[];}
function approachReviewPanel(){
 if(!data.approachHistory.length)return '';
 const pending=approachReviewPending();
 return '<section class="approach-review"><h3>'+(pending.length?'Do your earlier answers still fit?':'Your approach history')+'</h3>'+(pending.length?'<p class="field-note">These answers were written for your previous approach. Keep what still fits and revise what changes.</p><div class="approach-review-links">'+pending.map(i=>'<button class="secondary" data-edit="'+i+'">'+esc(i===0?'Decision timing':steps[i])+'</button>').join('')+'</div>':'')+'<details><summary>Previous approaches</summary>'+data.approachHistory.map(entry=>'<p class="reverse-raw">'+esc(entry.from)+'</p>').join('')+'</details></section>';
}
function approachSectionNote(){return approachReviewPending().includes(step)?'<p class="field-note approach-section-note">Some answers on this page were written for your previous approach. Consider whether they still fit.</p>':'';}
let reverseAdoptionOpen=false,reverseAdoptionDraft='';
function reverseAdjustmentAdopted(o=choiceOption()){const adopted=o.reverse.adoptedAdjustment;return adopted?.text===o.reverse.adjustment&&adopted.action===o.name;}
function reverseAdoptionPanel(){
 if(!reverseAdoptionOpen)return '';
 return '<section class="approach-confirm"><h3>Make this your current approach?</h3><small>Current approach</small><blockquote>'+esc(choiceOption().name)+'</blockquote><p class="field-note" id="approach-wording-help">Check the wording before updating your decision.</p><label class="field"><span>New approach</span><textarea data-approachdraft aria-describedby="approach-wording-help">'+esc(reverseAdoptionDraft)+'</textarea></label><p class="field-note">Your earlier answers and assessments will be kept. You can revisit them to consider whether they still fit this approach.</p><div class="review-actions"><button data-confirmapproach>Update my decision</button><button class="secondary" data-cancelapproach>Keep considering it</button></div><p id="approach-error" role="alert" hidden>Write a different approach to update your decision.</p></section>';
}
function reverseChecksNotesOverview(){const r=reverseData();return r.trail==='irreversible'&&r.checksNote.trim()?'<div class="reverse-checks-notes"><h4>Your Reversibility notes</h4><p class="reverse-raw">'+esc(r.checksNote)+'</p><small>Shown as you wrote it; not counted as a separate checklist item.</small></div>':'';}
function reverseChecksOverviewLink(){const r=reverseData();return r.trail==='irreversible'?'<button class="edit-link" data-reviewreversechecks>Review Reversibility checks</button>':'';}
function bindReviewConnections(){
 document.querySelectorAll('[data-reversedependency]').forEach(e=>e.onchange=()=>{setReverseDependency(e.dataset.dependencyfield,e.dataset.reversedependency,e.checked);save();});
 document.querySelectorAll('[data-keepassessment]').forEach(e=>e.onclick=()=>{acknowledgeDriverAssessment(e.dataset.keepassessment,'keep');render();});
 document.querySelectorAll('[data-changeassessment]').forEach(e=>e.onclick=()=>{const f=data.factors.find(f=>f.id===e.dataset.changeassessment);if(!f)return;f.reviewEditing=true;render();Array.from(document.querySelectorAll('[data-driverdirection]')).find(n=>n.dataset.driverdirection===f.id)?.focus();});
 document.querySelectorAll('[data-saveassessment]').forEach(e=>e.onclick=()=>{if(acknowledgeDriverAssessment(e.dataset.saveassessment,'revise'))render();else{const error=document.getElementById('assessment-error-'+e.dataset.saveassessment);if(error)error.hidden=false;}});
 document.querySelectorAll('[data-adoptadjustment]').forEach(e=>e.onclick=()=>{reverseAdoptionDraft=reverseData().adjustment;reverseAdoptionOpen=true;render();document.querySelector('[data-approachdraft]')?.focus();});
 document.querySelectorAll('[data-approachdraft]').forEach(e=>e.oninput=()=>{reverseAdoptionDraft=e.value;});
 document.querySelectorAll('[data-cancelapproach]').forEach(e=>e.onclick=()=>{reverseAdoptionOpen=false;render();});
 document.querySelectorAll('[data-confirmapproach]').forEach(e=>e.onclick=()=>{if(!adoptAdjustedApproach(reverseAdoptionDraft)){const error=document.getElementById('approach-error');if(error)error.hidden=false;}});
 document.querySelectorAll('[data-reviewreversechecks]').forEach(e=>e.onclick=()=>{step=9;reverseStage=2;render();window.scrollTo(0,0);});
}
function approachContextText(){
 const history=data.approachHistory;if(!history.length)return '';
 return '\n## Approach revisions\nEarlier answers below are retained snapshots for previous approaches, not current evidence.\n'+history.map(entry=>'Revision ID: '+entry.id+'\nPrevious approach:\n'+entry.from+'\nUpdated approach:\n'+entry.to+'\nChosen through: '+entry.source+'\nEarlier answers are preserved in the structured action record.').join('\n\n')+(approachReviewPending().length?'\nEarlier sections not yet reconsidered for the current approach: '+approachReviewPending().map(i=>steps[i]).join(', '):'');
}

