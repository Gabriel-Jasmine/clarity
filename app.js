const steps=["Decision","What Matters","Trade-Offs","Incentives","Compounding","Further Consequences","Inversion","Stress Test","Judgment Check","Reversibility","Decision Drivers","Decision Overview"];
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const uid=()=>Math.random().toString(36).slice(2,9);
const judgmentCore=[
{id:"fresh",question:"If none of these options were your current or default path, and you were choosing fresh today, would the way you see this decision change?",summary:"Choosing fresh, with no current or default path"},
{id:"past",question:"If the time, money, effort or reputation you have already invested could not be recovered regardless of what you choose, would the way you see this decision change?",summary:"Removing past investment"},
{id:"framing",question:"If you described the options only by where each path could leave you, rather than as staying, leaving, gaining, losing, keeping or giving something up, would the way you see this decision change?",summary:"Describing the paths only by where they lead"},
{id:"vivid",question:"If the most recent, vivid or emotionally memorable example disappeared from your mind, would the way you see this decision change?",summary:"Removing the most recent, vivid or memorable example"}
];
const judgmentConditional=[
{id:"seen",question:"If nobody could know, judge, praise or be impressed by your choice, would the way you see this decision change?",summary:"Removing other people's awareness, judgment or praise"},
{id:"social",question:"If you did not know what the people around you or people you respect preferred, would the way you see this decision change?",summary:"Removing other people's stated preferences"},
{id:"uncertainty",question:"If making a choice today gave you no immediate relief from uncertainty, would the way you see this decision change?",summary:"Removing the immediate relief of ending uncertainty"}
];
const lifeDomains=[
{id:"purpose",title:"Values, identity & purpose",desc:"Your beliefs, principles, sense of meaning, spirituality, and who you want to be."},
{id:"health",title:"Health & personal capacity",desc:"Your physical health, mental health, energy, rest, and ability to function well."},
{id:"family",title:"Partner, family & caregiving",desc:"Your intimate relationships, family ties, children, dependants, and caregiving responsibilities."},
{id:"community",title:"Friends, community & belonging",desc:"Your friendships, social support, community, and sense of belonging."},
{id:"work",title:"Work & contribution",desc:"Your work, career direction, achievement, and contribution through what you do."},
{id:"learning",title:"Learning & mastery",desc:"Your education, knowledge, skills, intellectual growth, and expertise."},
{id:"financial",title:"Money & material security",desc:"Your income, savings, debt, financial stability, housing, and material needs."},
{id:"lifestyle",title:"Time, freedom & way of life",desc:"Your autonomy, flexibility, pace of life, leisure, and how you spend your time."},
{id:"place",title:"Place, safety & stability",desc:"Where you live, your safety, home environment, mobility, and continuity."}
];
const incentivePromises=[
{id:"financial",title:"Financial or material gain",desc:"More income, assets, resources or material benefit."},
{id:"security",title:"Security & stability",desc:"More predictability, safety or certainty."},
{id:"freedom",title:"Freedom & control",desc:"More autonomy over what you do or how you live."},
{id:"growth",title:"Growth & mastery",desc:"Becoming more capable, skilled or accomplished."},
{id:"belonging",title:"Belonging & connection",desc:"Feeling connected, included or closer to others."},
{id:"recognition",title:"Recognition & status",desc:"Respect, approval, prestige or being seen positively."},
{id:"meaning",title:"Meaning & contribution",desc:"Feeling that what you do matters or serves something important."},
{id:"enjoyment",title:"Enjoyment & excitement",desc:"Interest, pleasure, novelty or stimulation."}
];
const incentiveAvoid=[
{id:"loss",title:"Loss or insecurity",desc:"Losing money, stability, something you have, or something you depend on."},
{id:"uncertainty",title:"Uncertainty & instability",desc:"Not knowing what will happen or where you stand."},
{id:"stagnation",title:"Failure or stagnation",desc:"Falling behind, not progressing or feeling stuck."},
{id:"rejection",title:"Rejection or disapproval",desc:"Disappointing others, being excluded or judged negatively."},
{id:"control-loss",title:"Loss of freedom or control",desc:"Feeling trapped, dependent or unable to choose."},
{id:"regret",title:"Regret or missing out",desc:"Feeling that an opportunity passed you by."},
{id:"conflict",title:"Conflict or discomfort",desc:"Difficult conversations, tension, effort, disruption or emotional discomfort."}
];
const compoundGrow=[
{id:"knowledge",title:"Knowledge & expertise"},
{id:"skills",title:"Skills & capability"},
{id:"experience",title:"Experience & track record"},
{id:"reputation",title:"Reputation & credibility"},
{id:"relationships",title:"Relationships & network"},
{id:"financial",title:"Financial resources"},
{id:"health",title:"Health & personal capacity"},
{id:"optionality",title:"Freedom & optionality"}
];
const compoundAvoid=[
{id:"financial-pressure",title:"Financial pressure or obligations"},
{id:"dependence",title:"Dependence on one path, person, or condition"},
{id:"mental-load",title:"Ongoing stress or mental load"},
{id:"reduced-freedom",title:"Commitments that reduce your freedom"},
{id:"skill-neglect",title:"Neglect of important skills or capabilities"},
{id:"relationship-neglect",title:"Neglect of important relationships"},
{id:"health-damage",title:"Damage to health or personal capacity"},
{id:"hard-to-leave",title:"A path that becomes increasingly difficult to leave"}
];
const stressRows=[
{id:"money",label:"Money becomes tighter than expected"},
{id:"time",label:"The path takes longer than expected"},
{id:"capacity",label:"Your available energy or mental capacity is lower than expected"},
{id:"benefit",label:"The expected benefit is smaller or arrives later than expected"},
{id:"dependency",label:"Something important the path depends on does not materialise"},
{id:"external",label:"External circumstances turn against the plan"}
];
const stressChoices=[
{value:"manageable",label:"Manageable"},
{value:"limit",label:"At the limit"},
{value:"too-much",label:"Too much"}
];
const compoundingAreas=[
  [
    "Values, identity & purpose",
    "Repeated activities and commitments that put your principles into practice; recurring compromises.",
    "A stronger sense of meaning or identity; becoming increasingly comfortable with compromises."
  ],
  [
    "Health & personal capacity",
    "Routines that support recovery and capacity; accumulating strain or neglect.",
    "Growing confidence in managing your needs; becoming accustomed to ignoring them."
  ],
  [
    "Partner, family & caregiving",
    "Shared routines, coordination and care; responsibilities or distance that accumulate.",
    "Trust, closeness and feeling supported; resentment, guilt or emotional withdrawal."
  ],
  [
    "Friends, community & belonging",
    "Continued participation, mutual support and stronger connections; gradual loss of contact.",
    "Belonging and social confidence; increasing isolation or reluctance to reconnect."
  ],
  [
    "Work & contribution",
    "Experience, credibility, opportunities and responsibilities that build on one another.",
    "Confidence and satisfaction; attachment to recognition or pressure to maintain an established image."
  ],
  [
    "Learning & mastery",
    "Knowledge and practice that support further learning; abilities that receive less use.",
    "Curiosity and confidence to attempt more; discouragement or avoidance when progress feels slow."
  ],
  [
    "Money & material security",
    "Savings, assets and earning capacity; growing debt or obligations.",
    "Greater security and freedom to act; attachment to an income level or fear of losing it."
  ],
  [
    "Time, freedom & way of life",
    "Routines that preserve room to choose; commitments that progressively narrow it.",
    "A stronger sense of control; becoming used to overcommitment or reluctant to change familiar routines."
  ],
  [
    "Place, safety & stability",
    "A stable home, local ties and continuity; repeated disruption.",
    "Security and feeling settled; uncertainty or attachment to familiar surroundings."
  ]
];
const compoundingQuestions=[
  {
    "key": "build",
    "question": "If you make this choice, what could you build on over time?",
    "help": "Explain how progress in your circumstances and changes in your confidence or motivation could support further progress. What would keep that development going?",
    "example": "Repeatedly leading projects could improve my judgment and credibility. Successful projects could build my confidence, encouraging me to attempt more complex work and gain further experience.",
    "placeholder": "Describe what could develop and how."
  },
  {
    "key": "reinforce",
    "question": "What unwanted patterns or pressures could grow stronger over time?",
    "help": "Explain what could keep the pattern going, including how its rewards or pressures might make you increasingly likely to continue.",
    "example": "Management success could bring more responsibilities and praise. Becoming attached to that recognition could encourage me to accept still more responsibility, making it harder to move towards independent design.",
    "placeholder": "Describe the pattern and what could keep reinforcing it."
  },
  {
    "key": "sustain",
    "question": "What could this choice make harder to sustain or keep pursuing over time?",
    "help": "Explain how this choice could gradually reduce your ability or willingness to continue something important, including a direction you hope to pursue.",
    "example": "More management work could leave less time to practise design and build a portfolio. Slower progress and less recognition in design could discourage me, leading me to practise less and have fewer chances to experience progress.",
    "placeholder": "Describe what could become harder to sustain or pursue, and how."
  }
];
const blankCompounding=()=>({formatVersion:2,stronger:[],weaker:[],horizon:"",build:"",reinforce:"",sustain:"",buildUnknown:false,reinforceUnknown:false,sustainUnknown:false});
const blankOption=name=>({id:uid(),name,trade:{alternatives:["",""],immediate:"",future:"",immediateUnknown:false,futureUnknown:false,foregone:[""],commitments:[""],foregoneState:"",foregoneUnknown:"",commitmentState:"",commitmentUnknown:""},incentives:{formatVersion:2,promises:[],avoid:[],gain:"",relief:"",fit:"",fitUnknown:false},compound:blankCompounding(),consequence:{formatVersion:2,positive:[""],negative:[""],ended:{positive:false,negative:false}},resilience:{conditions:[],financial:"maybe",time:"maybe",emotional:"maybe",strategic:"maybe"},reverse:{difficulty:0,costs:[],easier:""}});
function fresh(){const proposed=blankOption("");return{decisionMode:"choice",choiceOptionId:proposed.id,choiceInclination:"",decision:"",decisionAim:"",objective:"",lifeDirectionUnknown:false,inclination:"",horizon:"",options:[proposed],priorities:[],stakes:[],hasHardBoundaries:"",rules:[],incentiveConcerns:[],incentiveConcernNone:false,compounding:{grow:[],avoid:[],growDetails:{},growOptions:{},avoidDetails:{},avoidOptions:{}},inversion:[""],stressTest:{ratings:{},leastRoom:""},knowledge:[],judgment:{answers:{},strongestCase:"",changeEvidence:""},psych:[],factors:[],investigate:[],reviewed:[]}}
let data=(()=>{try{return JSON.parse(localStorage.getItem("clarity-v1"))||fresh()}catch{return fresh()}})();
if(!("inclination" in data))data.inclination="";
if(!("decisionMode" in data))data.decisionMode="legacy";
if(!("decisionAim" in data))data.decisionAim="";
if(!("lifeDirectionUnknown" in data))data.lifeDirectionUnknown=false;
// Anchor the opening to one existing path without deleting other saved paths.
if(!data.options.some(o=>o.id===data.choiceOptionId))data.choiceOptionId=data.options[0].id;
if(!("choiceInclination" in data))data.choiceInclination=data.inclination==="none"?"none":data.inclination===data.choiceOptionId?"make":data.options.some(o=>o.id===data.inclination)?"not":"";
data.decisionMode="choice";
if(data.horizon==="Weeks"||data.horizon==="Months")data.horizon="Weeks or months";
if(data.horizon==="1–3 years")data.horizon="1–2 years";
if(data.horizon==="Longer")data.horizon="More than 5 years";
if(!Array.isArray(data.priorities))data.priorities=[];
data.priorities=[...new Set(data.priorities.map(id=>id==="partner"?"family":id).filter(id=>lifeDomains.some(d=>d.id===id)))];
if(!Array.isArray(data.stakes))data.stakes=[...data.priorities];
data.stakes=[...new Set(data.stakes.map(id=>id==="partner"?"family":id).filter(id=>data.priorities.includes(id)))];
if(!("hasHardBoundaries" in data))data.hasHardBoundaries=(data.rules&&data.rules.length)?"yes":"";
if(!Array.isArray(data.rules))data.rules=[];
data.rules.forEach(r=>{if(!r.status)r.status={};if(!r.investigate)r.investigate={};Object.keys(r.status).forEach(id=>{if(r.status[id]==="pass")r.status[id]="yes";if(r.status[id]==="fail")r.status[id]="no"})});
if(!Array.isArray(data.incentiveConcerns))data.incentiveConcerns=[];
if(!("incentiveConcernNone" in data))data.incentiveConcernNone=false;
if(!data.compounding)data.compounding={grow:[],avoid:[],growDetails:{},growOptions:{},avoidDetails:{},avoidOptions:{}};
if(!Array.isArray(data.compounding.grow))data.compounding.grow=[];
if(!Array.isArray(data.compounding.avoid))data.compounding.avoid=[];
if(!data.compounding.growDetails)data.compounding.growDetails={};
if(!data.compounding.growOptions)data.compounding.growOptions={};
if(!data.compounding.avoidDetails)data.compounding.avoidDetails={};
if(!data.compounding.avoidOptions)data.compounding.avoidOptions={};
if(!Array.isArray(data.inversion))data.inversion=[""];
if(!data.stressTest)data.stressTest={ratings:{},leastRoom:""};
if(!data.stressTest.ratings)data.stressTest.ratings={};
if(!("leastRoom" in data.stressTest))data.stressTest.leastRoom="";
if(!data.judgment)data.judgment={answers:{},strongestCase:"",changeEvidence:""};
if(!data.judgment.answers)data.judgment.answers={};
if(!("strongestCase" in data.judgment))data.judgment.strongestCase="";
if(!("changeEvidence" in data.judgment))data.judgment.changeEvidence="";
let incentiveFormatChanged=false,compoundingFormatChanged=false,consequenceFormatChanged=false;
data.options.forEach(o=>{
  if(!o.compound)o.compound={};
  // Preserve earlier categories and path associations; do not infer the new answers.
  compoundingQuestions.forEach(({key})=>{
    if(typeof o.compound[key]!=="string")o.compound[key]="";
    if(typeof o.compound[key+"Unknown"]!=="boolean")o.compound[key+"Unknown"]=false;
  });
  if(o.compound.formatVersion!==2){if(o.id===data.choiceOptionId)compoundingFormatChanged=true;o.compound.formatVersion=2;}
  if(!o.incentives)o.incentives={};
  if(!Array.isArray(o.incentives.promises)){
    const old=Array.isArray(o.incentives.internal)?o.incentives.internal:[];
    const map={Money:"financial",Security:"security",Status:"recognition",Approval:"recognition",Belonging:"belonging",Autonomy:"freedom",Excitement:"enjoyment"};
    o.incentives.promises=[...new Set(old.map(x=>map[x]).filter(Boolean))];
  }
  if(!Array.isArray(o.incentives.avoid)){
    const old=Array.isArray(o.incentives.internal)?o.incentives.internal:[];
    const map={"Fear of loss":"loss","Fear of regret":"regret"};
    o.incentives.avoid=[...new Set(old.map(x=>map[x]).filter(Boolean))];
  }
  // Keep earlier selections in their original form; new reflections are not inferred from them.
  ["gain","relief","fit"].forEach(k=>{if(typeof o.incentives[k]!=="string")o.incentives[k]="";});
  if(typeof o.incentives.fitUnknown!=="boolean")o.incentives.fitUnknown=false;
  if(o.incentives.formatVersion!==2){if(o.id===data.choiceOptionId)incentiveFormatChanged=true;o.incentives.formatVersion=2;}
  if(!o.trade)o.trade={};
  if(!Array.isArray(o.trade.foregone)){
    const old=Array.isArray(o.trade.reject)?o.trade.reject.filter(Boolean):[];
    o.trade.foregone=old.length?old:[""];
  }
  if(!Array.isArray(o.trade.commitments)){
    const old=Array.isArray(o.trade.costs)?o.trade.costs.filter(Boolean):[];
    o.trade.commitments=old.length?old:[""];
  }
  // Older answers have no reliable immediate/future split. Retain them separately.
  if(!Array.isArray(o.trade.alternatives))o.trade.alternatives=["",""];
  ["immediate","future"].forEach(k=>{
    if(typeof o.trade[k]!=="string")o.trade[k]="";
    if(typeof o.trade[k+"Unknown"]!=="boolean")o.trade[k+"Unknown"]=false;
  });
  if(!("foregoneState" in o.trade))o.trade.foregoneState="";
  if(!("foregoneUnknown" in o.trade))o.trade.foregoneUnknown="";
  if(!("commitmentState" in o.trade))o.trade.commitmentState="";
  if(!("commitmentUnknown" in o.trade))o.trade.commitmentUnknown="";
  if(!o.consequence)o.consequence={positive:[""],negative:[""]};
  if(o.consequence.formatVersion!==2){if(o.id===data.choiceOptionId)consequenceFormatChanged=true;o.consequence.formatVersion=2;}
  if(!o.consequence.ended)o.consequence.ended={positive:false,negative:false};
  ["positive","negative"].forEach(k=>{
    if(!Array.isArray(o.consequence[k]))o.consequence[k]=[""];
    // Remove unused trailing slots, retaining written answers and any internal gaps in place.
    while(o.consequence[k].length>1&&!o.consequence[k].at(-1).trim())o.consequence[k].pop();
    if(!o.consequence[k].length)o.consequence[k].push("");
    if(typeof o.consequence.ended[k]!=="boolean")o.consequence.ended[k]=false;
  });
  if(!o.consequence.expanded)o.consequence.expanded={
    positive:Boolean(o.consequence.positive[2]),
    negative:Boolean(o.consequence.negative[2])
  };
});
let step=Math.max(0,Math.min(11,data.ui?.step||0)),active=data.options.some(o=>o.id===data.ui?.active)?data.ui.active:data.options[0].id,incentiveReview=false,selectedReflections=[];
if(!data.reviewed)data.reviewed=[];
if(incentiveFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==3);
if(compoundingFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==4);
if(consequenceFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==5);
data.factors.forEach(f=>{if(!Array.isArray(f.options))f.options=f.option?[f.option]:[];if(!Array.isArray(f.sources))f.sources=[];});
function save(){data.decision=choiceOption().name.trim();data.ui={step,active,incentiveReview};localStorage.setItem("clarity-v1",JSON.stringify(data))}
function choiceOption(){return data.options.find(o=>o.id===data.choiceOptionId)||data.options[0]}
function startingInclinationText(){return data.choiceInclination==="make"?"Leaning towards making this choice":data.choiceInclination==="not"?"Leaning towards not making this choice":data.choiceInclination==="none"?"No clear inclination yet":"[Not answered]"}
function option(){return data.options.find(o=>o.id===active)||data.options[0]}
function setOptName(id,v){data.options.find(o=>o.id===id).name=v;save()}
function list(items,path,placeholder){return '<div class="list">'+items.map((x,i)=>'<div class="item"><input data-list="'+path+'" data-i="'+i+'" value="'+esc(x)+'" placeholder="'+esc(placeholder)+'"><button class="x" data-del="'+path+'" data-i="'+i+'">×</button></div>').join("")+'<button class="add" data-add="'+path+'">+ Add</button></div>'}
function getPath(path){return path.split(".").reduce((o,k)=>o[k],data)}
function setPath(path,val){const p=path.split(".");let o=data;for(let i=0;i<p.length-1;i++)o=o[p[i]];o[p.at(-1)]=val}
function tabs(){return '<div class="tabs">'+data.options.map(o=>'<button data-tab="'+o.id+'" class="'+(o.id===active?"active":"")+'">'+esc(o.name)+'</button>').join("")+'</div>'}
function card(title,sub,body){return '<div class="card"><h2>'+title+'</h2><p class="muted">'+sub+'</p>'+body+'</div>'}
function render(){
 if(step===2||step===3||step===4||step===5)active=choiceOption().id;
 save();$("#title").textContent=steps[step];$("#stepCount").textContent=(step+1)+" of "+steps.length;
 $("#bar").style.width=((step+1)/steps.length*100)+"%";
 $("#nav").innerHTML=steps.map((name,i)=>'<button data-step="'+i+'" class="'+(i===step?'active':'')+'" '+(i===step?'aria-current="step"':'')+'><span>'+name+'</span><small aria-label="'+(data.reviewed.includes(i)?'Reviewed':'Not reviewed')+'">'+(data.reviewed.includes(i)?'✓':'')+'</small></button>').join('');
 $("#back").disabled=step===0;$("#next").style.display=step===11?'none':'block';
 const oi=data.options.findIndex(o=>o.id===active);
 $("#next").textContent=step===9&&oi<data.options.length-1?'Continue to '+data.options[oi+1].name+' →':step===10?'Continue to Decision Overview →':'Continue →';
 $("#screen").innerHTML=(step>2?directionReference():"")+screen();
 document.querySelectorAll('.card > h2,.decision-overview > h2').forEach(h=>{if(h.textContent===steps[step])h.remove();});
 document.querySelectorAll('.trade-option-nav').forEach(n=>n.remove());
 document.querySelectorAll('.x').forEach(b=>b.setAttribute('aria-label','Remove item'));
 bind();
}
function screen(){if(step===0)return frame();if(step===1)return boundaries();if(step===2)return tradeoffs();if(step===3)return incentives();if(step===4)return compounding();if(step===5)return consequences();if(step===6)return inversion();if(step===7)return stressTest();if(step===8)return judgmentCheck();if(step===9)return reversibility();if(step===10)return factors();return decisionOverview()}
function frame(){
 const horizons=["Weeks or months","1–2 years","3–5 years","More than 5 years","Potentially permanent","Not sure"];
 return '<div class="card decision-card"><label class="field"><span>What choice are you considering?</span><small id="choice-help">Write it as something you could choose to do.</small><textarea data-choice aria-describedby="choice-help" aria-label="What choice are you considering?" placeholder="Example: Accept the regional content marketing role in Singapore.">'+esc(choiceOption().name)+'</textarea></label><div class="divider"></div><div class="decision-block"><div class="question" id="choice-lean-title">Which way are you leaning right now?</div><p class="field-note">Choose the closer one, even if your leaning is slight.</p><div class="choice-grid" role="group" aria-labelledby="choice-lean-title">'+[['make','Make this choice'],['not','Not make this choice']].map(([value,label])=>'<label class="choice-card"><input type="radio" name="choice-inclination" data-choiceinclination value="'+value+'" '+(data.choiceInclination===value?'checked':'')+'><span>'+label+'</span></label>').join('')+'</div></div><div class="divider"></div><label class="field"><span>What do you want this choice to help you achieve?</span><textarea data-root="decisionAim" placeholder="I’m hoping this would help me...">'+esc(data.decisionAim)+'</textarea></label><div class="divider"></div><div class="decision-block"><div class="question">How long could the consequences of this choice affect your life?</div><div class="choice-grid compact">'+horizons.map(x=>'<label class="choice-card"><input type="radio" name="horizon" data-horizon value="'+x+'" '+(data.horizon===x?'checked':'')+'><span>'+x+'</span></label>').join('')+'</div></div></div>';
}
function lifeDirectionText(){return data.lifeDirectionUnknown?"I don’t know yet":data.objective.trim()||"Not answered yet.";}
function directionReference(aimOnly=false){return '<section class="direction-reference" aria-label="Your direction"><div><div class="direction-label">Aim for this decision <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(data.decisionAim||'Not answered yet.')+'</p></div>'+(aimOnly?'':'<div><div class="direction-label">Direction in life <button class="reference-edit" data-edit="1">Edit</button></div><p>'+esc(lifeDirectionText())+'</p></div>')+'</section>';}
function boundaries(){
const selected=data.priorities.length,locked=selected>=3;
const domains=lifeDomains.map(d=>'<label class="domain-card '+(data.priorities.includes(d.id)?"selected":"")+'"><input type="checkbox" data-priority value="'+d.id+'" '+(data.priorities.includes(d.id)?"checked":"")+' '+(locked&&!data.priorities.includes(d.id)?"disabled":"")+'><div><strong>'+esc(d.title)+'</strong><p>'+esc(d.desc)+'</p></div></label>').join("");
const stakeDomains=data.priorities.map(id=>lifeDomains.find(d=>d.id===id)).filter(Boolean);
const stakes=stakeDomains.length?'<div class="stake-grid">'+stakeDomains.map(d=>'<label class="stake-card '+(data.stakes.includes(d.id)?"selected":"")+'"><input type="checkbox" data-stake value="'+d.id+'" '+(data.stakes.includes(d.id)?"checked":"")+'><span>'+esc(d.title)+'</span></label>').join("")+'</div>':'<p class="muted">Choose what matters most above first.</p>';
const domainPrompt='values & identity · health & capacity · partner & family · friends & belonging · work · learning · money · time & freedom · place & stability';
const hardChoice='<div class="choice-grid hard-choice"><label class="choice-card"><input type="radio" name="hardboundaries" data-hardboundaries value="no" '+(data.hasHardBoundaries==="no"?"checked":"")+'><span>Nothing comes to mind</span></label><label class="choice-card"><input type="radio" name="hardboundaries" data-hardboundaries value="yes" '+(data.hasHardBoundaries==="yes"?"checked":"")+'><span>Yes</span></label></div>';
const boundaryList=data.hasHardBoundaries==="yes"?'<div class="boundary-writing"><div class="question">What must remain true, or what must not happen?</div><p class="field-note thinking-prompts"><strong>Think across:</strong> '+domainPrompt+'</p><div class="boundary-starters"><span>Try starting with:</span><em>I need to remain able to…</em><em>I cannot accept a choice that…</em><em>Whatever I choose, I need to protect…</em></div>'+data.rules.map((r,ri)=>'<div class="boundary-card"><div class="boundary-head"><span>BOUNDARY '+String(ri+1).padStart(2,"0")+'</span><button class="x" data-delrule="'+r.id+'">×</button></div><textarea data-rule="'+r.id+'" placeholder="I need to remain able to...">'+esc(r.text)+'</textarea></div>').join("")+'<button id="addRule" class="secondary">+ Add another boundary</button></div>':"";
return '<div class="card what-matters-card">'+directionReference(true)+
'<div class="what-matters-stage"><div class="what-matters-kicker">STEP BACK</div><p class="muted intro"><strong>Put this decision aside for a moment.</strong></p><label class="field"><span>What are you ultimately trying to build, protect, or become in your life?</span><small>Think beyond this decision. Consider how you want to live, who you want to become, what you want to build, and what you want to preserve.</small><textarea data-root="objective" '+(data.lifeDirectionUnknown?'disabled':'')+' placeholder="The life I’m trying to build looks like...">'+esc(data.objective)+'</textarea></label><label class="life-unknown"><input type="checkbox" data-lifeunknown '+(data.lifeDirectionUnknown?'checked':'')+'>I don’t know yet</label><p class="field-note thinking-prompts"><strong>Think across:</strong> '+domainPrompt+'</p></div>'+
'<div class="divider"></div>'+
'<div class="what-matters-stage"><div class="what-matters-kicker">WHAT MATTERS MOST WITHIN THAT LIFE</div><div class="question">What matters most to keep building or protecting in your life?</div><p class="field-note">Choose up to three.</p><div class="domain-grid">'+domains+'</div><div class="selection-count">'+selected+' of 3 selected</div></div>'+
'<div class="what-matters-transition"><span>NOW BRING THE DECISION BACK IN</span></div>'+
'<div class="what-matters-stage"><div class="question">Which of these could be meaningfully affected by this choice?</div><p class="field-note">Select the areas this decision could meaningfully affect. You do not need to decide yet whether the effect would be good or bad.</p>'+stakes+'</div>'+
'<div class="divider"></div>'+
'<div class="what-matters-stage"><div class="what-matters-kicker">HARD BOUNDARIES</div><div class="question">Is there anything that must remain true, whatever you choose?</div><p class="field-note boundary-definition">A hard boundary is a condition any acceptable choice must respect. Write what you need to preserve or what cannot happen.</p>'+hardChoice+boundaryList+'</div>'+
'</div>'
}

const costAreas=[
  ["Income and ability to earn","How this choice could affect your current income or your ability to earn a living."],
  ["Savings and financial security","Money set aside for future plans, other commitments and unexpected needs."],
  ["Living conditions and stability","Your home, everyday living conditions and access to what you need to live securely."],
  ["Sustained pursuit of mastery","Your time, focus and mental capacity to keep progressing in a pursuit you are deeply dedicated to, whether it is your work or something you pursue alongside it."],
  ["Physical and mental health","Your health and your ability to sustain the routines, care and recovery it needs."],
  ["Family, friends and community","Your time, closeness, mutual support and sense of belonging with family, friends and the communities that matter to you."],
  ["Connection with your partner","Your time and capacity to be present, maintain closeness and respond to each other’s needs."]
];
const costUnknownText="I don’t know yet but I will find out later";
function costAnswer(o,k){return o.trade[k+"Unknown"]?costUnknownText:o.trade[k].trim()||"Not answered yet.";}
function legacyTradePresent(o){return ['foregone','commitments'].some(k=>(o.trade[k]||[]).some(t=>t.trim()))||Boolean(o.trade.foregoneState||o.trade.commitmentState);}
function legacyTradeText(o){return "What this path closes off:\n"+(o.trade.foregoneState==="none"?"[No meaningful sacrifice identified yet]":o.trade.foregoneState==="unknown"?"[Not enough information yet]"+(o.trade.foregoneUnknown?" — Need to find out: "+o.trade.foregoneUnknown:""):fmt(o.trade.foregone))+"\nWhat this path requires or ties up:\n"+(o.trade.commitmentState==="none"?"[No meaningful cost identified yet]":o.trade.commitmentState==="unknown"?"[Not enough information yet]"+(o.trade.commitmentUnknown?" — Need to find out: "+o.trade.commitmentUnknown:""):fmt(o.trade.commitments));}
function tradeoffs(){
 const o=choiceOption(),oi=data.options.indexOf(o),t=o.trade;
 const context='<section class="direction-reference trade-context" aria-label="Your decision context"><div class="trade-context-action"><div class="direction-label">You’re considering <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(o.name||'Your choice is not defined yet.')+'</p></div><div><div class="direction-label">Decision aim <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(data.decisionAim||'Not answered yet.')+'</p></div><div><div class="direction-label">Life direction <button class="reference-edit" data-edit="1">Edit</button></div><p>'+esc(lifeDirectionText())+'</p></div></section>';
 const alternativeInputs=t.alternatives.map((text,i)=>'<div class="trade-alternative-row"><span>'+(i+1)+'</span><input aria-label="Alternative '+(i+1)+'" data-list="options.'+oi+'.trade.alternatives" data-i="'+i+'" value="'+esc(text)+'" placeholder="Describe a realistic alternative"><button class="secondary" data-del="options.'+oi+'.trade.alternatives" data-i="'+i+'" aria-label="Remove alternative '+(i+1)+'">Remove</button></div>').join('');
 const part=(k,title,question,help,example)=>'<section class="trade-cost-part" aria-labelledby="trade-'+k+'-title"><div class="what-matters-kicker">'+title+'</div><h3 class="question" id="trade-'+k+'-title">'+question+'</h3><p class="field-note" id="trade-'+k+'-help">'+help+'</p><textarea id="trade-'+k+'-answer" data-cost="'+k+'" aria-labelledby="trade-'+k+'-title" aria-describedby="trade-'+k+'-help" placeholder="'+esc(example)+'" '+(t[k+'Unknown']?'disabled':'')+'>'+esc(t[k])+'</textarea><label class="trade-cost-unknown"><input type="checkbox" data-costunknown="'+k+'" aria-controls="trade-'+k+'-answer" '+(t[k+'Unknown']?'checked':'')+'><span>'+costUnknownText+'</span></label></section>';
 const legacy=legacyTradePresent(o)?'<details class="trade-legacy"><summary>Earlier Trade-Offs notes</summary><p class="field-note">These notes are saved in their original categories. Use them when describing the immediate and future costs above.</p><h3>What this path closes off</h3>'+list(t.foregone,'options.'+oi+'.trade.foregone','Earlier reflection')+'<h3>What this path requires or ties up</h3>'+list(t.commitments,'options.'+oi+'.trade.commitments','Earlier reflection')+'<pre class="brief">'+esc(legacyTradeText(o))+'</pre>'+((t.foregoneState==='unknown'||t.commitmentState==='unknown')?'<button class="secondary" data-resolvelegacy>Mark earlier unknowns as resolved</button>':'')+'</details>':'';
 return '<p class="muted trade-page-intro">Every choice comes with gains and sacrifices. Consider what making this choice would require you to give up, postpone or make harder to sustain in your life.</p><div class="card trade-cost-card">'+context+'<section class="trade-cost-section" aria-labelledby="trade-alternatives-title"><div class="what-matters-kicker">Alternatives</div><h2 class="question" id="trade-alternatives-title">If you don’t make this choice, what other ways could you move forward?</h2><p class="field-note">Consider what is realistically possible in your circumstances, including other plans, responsibilities and parts of life you want to build or protect. You might take a different direction, continue your current life, or leave room for a possibility you have not explored yet.</p>'+alternativeInputs+'<button class="add" data-add="options.'+oi+'.trade.alternatives">+ Add another alternative</button></section><section class="trade-cost-section" aria-labelledby="trade-cost-title"><h2 id="trade-cost-title">Cost of the Decision</h2><p class="field-note">Costs go beyond what you pay. Consider what this choice could leave you unable to do, keep or pursue now, and how those sacrifices could affect your future. Use these seven areas of life to think through the effects on your wellbeing and progress towards your ultimate goal in life.</p><table class="trade-cost-table" aria-label="Seven areas of life to consider when examining the cost of this decision"><thead><tr><th scope="col">Area of life</th><th scope="col">What to consider</th></tr></thead><tbody>'+costAreas.map(([name,desc])=>'<tr><th scope="row">'+esc(name)+'</th><td>'+esc(desc)+'</td></tr>').join('')+'</tbody></table>'+part('immediate','Immediate cost','If you make this choice, what would you have to give up or delay immediately?','Consider the costs in these areas of life. What would making this choice require you to give up, delay or make harder to sustain? Be as concrete and realistic as possible about what would change.','Example: Making this choice would mean leaving the home I own, using part of my savings to fund the move, having less time with my family and friends, and maintaining a long-distance relationship with my partner.')+part('future','Future cost','What would you be giving up in the future if you make this choice?','Consider plans you may need to postpone, relationships or pursuits that could become harder to sustain, and directions that may become less available. Explain how this choice could create that limitation.','Example: If the move uses savings I had set aside for further study, I may need to postpone studying until I rebuild them. Living apart from my partner could also delay our plans to build a home together.')+'</section>'+legacy+'<p class="field-note trade-cost-footer">Your answers describe your current understanding. You can revise them as you learn more.</p></div>';
}
const incentiveRewardGroups=[
{title:"External rewards",description:"What this choice could give you access to or change in your circumstances.",areas:[
["Money and financial benefits","Income, savings, funding, benefits or reduced financial pressure."],
["Assets and living conditions","Ownership, housing, possessions or improved everyday conditions."],
["Position and authority","A title, formal responsibility or greater decision-making power."],
["Networks and connections","Access to people, professional relationships, introductions or opportunities."],
["Time and flexibility","More available time, flexible arrangements or fewer demands on your schedule."],
["Support and resources","Help, services, facilities or resources you could receive."]
]},
{title:"Psychological rewards",description:"How you expect this choice to help you feel or experience yourself.",areas:[
["Recognition and status","Feeling valued, respected or acknowledged; less feeling overlooked or behind others."],
["Accomplishment and capability","Feeling capable or progressing; less inadequacy or stagnation."],
["Autonomy and freedom","Feeling able to direct your life; less pressure or feeling controlled."],
["Connection and belonging","Feeling close, accepted or supported; less loneliness or exclusion."],
["Security and reassurance","Feeling safe or settled; less fear and uncertainty."],
["Meaning and contribution","Feeling aligned with your values or useful to others; less emptiness or inner conflict."],
["Enjoyment and interest","Pleasure, curiosity or excitement; less boredom or monotony."]
]}
];
function legacyIncentiveLabels(o,key){return (o.incentives[key]||[]).map(id=>[...incentivePromises,...incentiveAvoid].find(x=>x.id===id)?.title||id);}
function incentiveReflectionText(o){
const i=o.incentives;
return "Expected gains:\n"+(i.gain.trim()||"[Not answered]")+"\nWhat this choice could help reduce, leave behind or avoid:\n"+(i.relief.trim()||"[Not answered]")+"\nHow these rewards fit with my direction in life:\n"+(i.fitUnknown?"[I’m not sure yet]"+(i.fit.trim()?"\nEarlier alignment note (retained):\n"+i.fit:""):i.fit.trim()||"[Not answered]");
}
function earlierIncentives(){
const retained=data.options.filter(o=>(o.incentives.promises||[]).length||(o.incentives.avoid||[]).length||(o.id!==choiceOption().id&&(o.incentives.gain.trim()||o.incentives.relief.trim()||o.incentives.fit.trim()||o.incentives.fitUnknown)));
if(!retained.length&&!data.incentiveConcerns.length&&!data.incentiveConcernNone)return "";
return '<details class="incentive-earlier"><summary>Earlier Incentives notes</summary>'+retained.map(o=>'<section><h3>'+esc(o.name||'Untitled path')+'</h3>'+((o.incentives.promises||[]).length?'<strong>Earlier gain selections</strong>'+overviewList(legacyIncentiveLabels(o,'promises')):'')+((o.incentives.avoid||[]).length?'<strong>Earlier avoidance selections</strong>'+overviewList(legacyIncentiveLabels(o,'avoid')):'')+(o.id!==choiceOption().id&&(o.incentives.gain.trim()||o.incentives.relief.trim()||o.incentives.fit.trim()||o.incentives.fitUnknown)?'<pre class="brief">'+esc(incentiveReflectionText(o))+'</pre>':'')+'</section>').join('')+(data.incentiveConcerns.length||data.incentiveConcernNone?'<strong>Earlier incentives you did not want to keep reinforcing</strong>'+(data.incentiveConcernNone?'<p>None selected.</p>':overviewList(data.incentiveConcerns.map(id=>[...incentivePromises,...incentiveAvoid].find(x=>x.id===id)?.title||id))):'')+'</details>';
}
function incentives(){
const o=choiceOption(),i=o.incentives;
const guide='<details class="incentive-reward-guide" open><summary>Rewards to think about</summary><p class="field-note">Consider both external and psychological rewards, including what this choice could give you and what it could help you reduce or leave behind. These are starting points, not a complete list. Write whatever matters to you, in your own words.</p><table class="incentive-reward-table" aria-label="External and psychological reward guide"><thead><tr><th scope="col">Area</th><th scope="col">What to consider</th></tr></thead>'+incentiveRewardGroups.map(g=>'<tbody><tr class="incentive-reward-group"><th colspan="2" scope="rowgroup"><span>'+esc(g.title)+'</span><small>'+esc(g.description)+'</small></th></tr>'+g.areas.map(([area,meaning])=>'<tr><th scope="row">'+esc(area)+'</th><td>'+esc(meaning)+'</td></tr>').join('')+'</tbody>').join('')+'</table></details>';
const part=(key,question,help,placeholder,example,extra='')=>'<section class="incentive-writing-part"><h2 class="question"><label for="incentive-'+key+'">'+question+'</label></h2><p class="field-note" id="incentive-'+key+'-help">'+help+'</p>'+extra+'<textarea id="incentive-'+key+'" data-incentivetext="'+key+'" aria-describedby="incentive-'+key+'-help" placeholder="'+esc(placeholder)+'" '+(key==='fit'&&i.fitUnknown?'disabled':'')+'>'+esc(i[key])+'</textarea>'+(key==='fit'?'<label class="incentive-fit-unknown"><input type="checkbox" data-incentivefitunknown aria-controls="incentive-fit" '+(i.fitUnknown?'checked':'')+'><span>I’m not sure yet</span></label>':'')+'<p class="incentive-writing-example"><span>Example</span>'+example+'</p></section>';
return '<p class="muted incentive-page-intro">What a choice offers you, or helps you get away from, can influence your decision. These rewards can also draw you towards a particular way of living or working. Identify what makes this choice attractive, then consider how it fits the direction you want for your life.</p><div class="card incentive-writing-card"><section class="incentive-choice-context"><div class="direction-label">You’re considering <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(o.name||'Your choice is not defined yet.')+'</p></section>'+guide+part('gain','What do you expect to gain from making this choice?','Consider what you would receive or have access to, and how you expect that to make you feel.','Write what you expect this choice to give you…','Higher pay, a senior title and useful professional connections. I would also feel recognised and more confident about my progress.')+part('relief','What do you want this choice to help you reduce, leave behind or avoid?','Consider practical burdens and uncomfortable feelings that are influencing you.','Write what you want less of, or want to move away from…','Financial pressure and the feeling that I am falling behind.')+part('fit','How do these rewards fit with the direction you want for your life?','Consider whether what attracts you to this choice supports that direction, keeps you on a path you want to leave, or does both.','How do the rewards and relief drawing you towards this choice fit with your direction?','The extra income could fund my move into independent design. But recognition for becoming a manager may make me more attached to that career path, even though I want my work to centre on designing.','<section class="incentive-direction-reference"><div class="direction-label">Your direction in life <button class="reference-edit" data-edit="1">Edit</button></div><p>'+esc(lifeDirectionText())+'</p></section>')+earlierIncentives()+'</div>';
}
function compoundingReflectionText(o){
 const c=o.compound;
 return compoundingQuestions.map(({key,question})=>question+'\n'+(c[key+'Unknown']?'[I don’t know yet]'+(c[key].trim()?'\nEarlier writing (retained):\n'+c[key]:''):c[key].trim()||'[Not answered]')).join('\n\n');
}
function earlierCompoundKeys(kind){
 const c=data.compounding;
 return [...new Set([...c[kind],...Object.keys(c[kind+'Details']),...Object.keys(c[kind+'Options'])])];
}
function legacyOptionCompoundingText(o){
 const c=o.compound;
 return [(c.stronger||[]).length?'Earlier stronger selections:\n'+fmt(c.stronger):'',(c.weaker||[]).length?'Earlier weaker selections:\n'+fmt(c.weaker):'',c.horizon?'Earlier horizon:\n'+c.horizon:''].filter(Boolean).join('\n');
}
function earlierCompoundingText(){
 const c=data.compounding,out=[];
 ['grow','avoid'].forEach(kind=>earlierCompoundKeys(kind).forEach(id=>{
   const item=(kind==='grow'?compoundGrow:compoundAvoid).find(x=>x.id===id);
   const paths=(c[kind+'Options'][id]||[]).map(oid=>data.options.find(o=>o.id===oid)?.name||'Unknown retained path');
   out.push((kind==='grow'?'Earlier desired growth':'Earlier unwanted accumulation')+' — '+(item?.title||id)+'\n'+(c[kind+'Details'][id]||'[Not specified]')+'\nEarlier associated paths: '+(paths.join(', ')||'[None selected]'));
 }));
 data.options.forEach(o=>{
   const old=legacyOptionCompoundingText(o);
   if(old)out.push((o.name||'Untitled path')+'\n'+old);
   if(o.id!==choiceOption().id&&compoundingQuestions.some(({key})=>o.compound[key].trim()||o.compound[key+'Unknown']))out.push((o.name||'Untitled path')+' — retained reflection\n'+compoundingReflectionText(o));
 });
 return out.join('\n\n');
}
function compounding(){
 const o=choiceOption(),c=o.compound;
 const guide='<details class="compounding-life-guide" open><summary>Areas of life to keep in view</summary><p class="field-note">Use the table to look for effects you might otherwise overlook. In each area, consider how continued attention, repeated experiences or neglect could build on what came before. The practical and psychological effects may influence one another.</p><p class="field-note">These are starting points, not a complete list or predictions about your choice. Use whatever is relevant, and include anything else that matters to you.</p><table class="compounding-life-table" aria-label="Guide to reflection across areas of life"><thead><tr><th scope="col">Area of life</th><th scope="col">What to consider over time</th></tr></thead><tbody>'+compoundingAreas.map(([area,practical,psych])=>'<tr><th scope="row">'+esc(area)+'</th><td><p><strong>Practical effects</strong>'+esc(practical)+'</p><p><strong>Psychological effects</strong>'+esc(psych)+'</p></td></tr>').join('')+'</tbody></table></details>';
 const parts=compoundingQuestions.map(({key,question,help,example,placeholder})=>'<section class="compounding-writing-part"><h2 class="question"><label for="compounding-'+key+'">'+esc(question)+'</label></h2><p class="field-note" id="compounding-'+key+'-help">'+esc(help)+'</p><p class="compounding-writing-example" id="compounding-'+key+'-example"><span>Example</span>'+esc(example)+'</p><label class="compounding-write-label" for="compounding-'+key+'">Your reflection</label><textarea id="compounding-'+key+'" data-compoundingtext="'+key+'" aria-describedby="compounding-'+key+'-help compounding-'+key+'-example" placeholder="'+esc(placeholder)+'" '+(c[key+'Unknown']?'disabled':'')+'>'+esc(c[key])+'</textarea><label class="compounding-unknown"><input type="checkbox" data-compoundingunknown="'+key+'" aria-controls="compounding-'+key+'" '+(c[key+'Unknown']?'checked':'')+'><span>I don’t know yet</span></label></section>').join('');
 return '<p class="muted compounding-page-intro">Some effects of a choice build over time. Earlier progress can support further progress, while repeated demands or rewards can make a pattern stronger. This can change both your circumstances and how you think, feel and act. Consider what making this choice could keep developing, reinforce or gradually weaken, in relation to the life you want to build.</p><div class="card compounding-writing-card"><section class="compounding-choice-context"><div class="direction-label">You’re considering <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(o.name||'Your choice is not defined yet.')+'</p></section>'+guide+parts+'</div>';
}
const consequenceGuidance=[
 'How could changes in your commitments or responsibilities affect how you see yourself, what feels meaningful, and what you become willing to do or accept?',
 'How could changes in demands, rest or support affect your energy and mood, and in turn your judgment, habits or responses to others?',
 'How could changes in your availability or responsibilities affect how care and duties are shared, how others respond, and the trust or closeness between you?',
 'How could changes in contact or participation affect your access to support and sense of belonging, and in turn whom you rely on or how you behave?',
 'How could changes in your role or workload affect your confidence, what others expect from you, and the opportunities or responsibilities you take on next?',
 'How could changes in opportunities to learn, practise or receive feedback affect your ability and confidence, and in turn what you attempt, avoid or pursue next?',
 'How could changes in income, expenses or obligations affect your sense of security and freedom to act, and in turn what you spend, commit to or feel able to leave?',
 'How could changes in your schedule or flexibility affect your sense of control, and in turn your routines, attention or availability for other parts of life?',
 'How could changes in your surroundings or access to services affect how secure and settled you feel, and in turn your daily activities, connections or reliance on others?'
];
function consequenceSequenceText(o,key){
 const values=o.consequence[key]||[];
 if(!values.some(t=>t.trim()))return '[Not answered]';
 const end=values.findLastIndex(t=>t.trim());
 return values.slice(0,end+1).map(t=>t.trim()||'[Connection not yet explained]').join(' → ');
}
function consequenceReflectionText(o){
 return ['positive','negative'].map(key=>(key==='positive'?'Starting with a possible benefit':'Starting with a possible difficulty')+'\n'+consequenceSequenceText(o,key)+'\nExploration: '+(o.consequence.ended[key]?'Finished by the user':'Still open')).join('\n\n');
}
function consequences(){
 const o=choiceOption();
 const guide='<section class="consequence-guide"><h2>Areas of life</h2><p class="field-note">Use these areas to notice where a consequence could lead next. A change in one area may affect another through what becomes possible, how you feel or how people respond. These are starting points for your thinking. You do not need to cover every area.</p><table class="compounding-life-table consequence-life-table" aria-label="Areas of life and guidance for further consequences"><thead><tr><th scope="col">Area of life</th><th scope="col">What to consider</th></tr></thead><tbody>'+compoundingAreas.map(([area],i)=>'<tr><th scope="row">'+esc(area)+'</th><td>'+esc(consequenceGuidance[i])+'</td></tr>').join('')+'</tbody></table></section>';
 const explorations=['positive','negative'].map(key=>'<section class="consequence-exploration" data-consequence-exploration="'+key+'" aria-labelledby="consequence-'+key+'-title"><h2 id="consequence-'+key+'-title">Start with a possible '+(key==='positive'?'benefit':'difficulty')+'</h2><div class="consequence-entries"></div><div class="consequence-finished" hidden><span>That’s it. You can still edit your answers.</span><button type="button" class="secondary" data-consequence-reopen>Explore further</button></div></section>').join('');
 return '<div class="card consequence-card"><h2>What could this choice lead to?</h2><p class="muted">A choice can set off a chain of effects in your life. What looks good at first may eventually undermine the direction you want to take, while what seems inconvenient may lead to a sweeter future. To understand where a choice could lead, look beyond its first result. Consider how that result could change how you feel, what becomes possible or impossible, and your surroundings or relationships. Those changes can create further consequences of their own.</p><p class="field-note">Use the Areas of Life below to map out a good case and a bad case. In each case, start with a possible first result of your choice. Then ask what that result could cause, and what could follow from that change. Keep the connections plausible, and consider how these consequences could support or interfere with the goal you want to achieve and the life you want to build.</p><section class="compounding-choice-context"><div class="direction-label">Your choice <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(o.name||'Your choice is not defined yet.')+'</p></section>'+guide+'<section class="consequence-instructions"><h2>Follow the connection</h2><p>Start with a direct change. Then consider what could happen <strong>because of it</strong>, including how you or someone else might respond. Make important assumptions clear.</p><p class="field-note">Continue while you can explain a plausible connection. Stop when you would have to invent one.</p></section>'+explorations+'<div class="consequence-status" role="status" aria-live="polite"></div></div>';
}
let consequenceResizeObserver;
function bindConsequences(){
 consequenceResizeObserver?.disconnect();
 const root=document.querySelector('.consequence-card');
 if(!root)return;
 const c=choiceOption().consequence,status=root.querySelector('[role="status"]');
 const updateMore=entry=>{
   if(entry.summary.hidden||entry.more.getAttribute('aria-expanded')==='true')return;
   entry.more.hidden=entry.answer.scrollHeight<=entry.answer.clientHeight+1;
 };
 root.querySelectorAll('[data-consequence-exploration]').forEach(section=>{
   const key=section.dataset.consequenceExploration,list=section.querySelector('.consequence-entries');
   const finished=section.querySelector('.consequence-finished'),reopen=section.querySelector('[data-consequence-reopen]');
   const entries=[];
   let serial=0;
   const persist=()=>{c[key]=entries.map(entry=>entry.input.value);save();};
   const resize=entry=>{entry.input.style.height='auto';entry.input.style.height=Math.max(72,entry.input.scrollHeight+2)+'px';};
   const compact=entry=>{
     if(!entry.input.value.trim())return;
     entry.editor.hidden=true;entry.summary.hidden=false;entry.answer.textContent=entry.input.value;
     requestAnimationFrame(()=>updateMore(entry));
   };
   const open=(entry,focus=false)=>{
     const previousTop=entry.input.getBoundingClientRect().top;
     entries.forEach(other=>{if(other!==entry)compact(other);});
     entry.editor.hidden=false;entry.summary.hidden=true;resize(entry);
     if(!focus&&window.scrollY>0)window.scrollBy(0,entry.input.getBoundingClientRect().top-previousTop);
     if(focus)entry.input.focus();
   };
   const finish=()=>{
     if(!entries.some(entry=>entry.input.value.trim()))return;
     while(entries.length>1&&!entries.at(-1).input.value.trim())entries.pop().node.remove();
     c.ended[key]=true;
     entries.forEach(entry=>{compact(entry);entry.stop.hidden=true;});
     finished.hidden=false;persist();
     status.textContent='The '+(key==='positive'?'benefit':'difficulty')+' exploration is finished. Your answers remain editable.';
     reopen.focus();
   };
   const add=(value='',collapsed=false)=>{
     const position=entries.length,id='consequence-'+key+'-'+(++serial);
     const first=position===0;
     const question=first?(key==='positive'?'What is one possible benefit of this choice?':'What is one possible difficulty this choice could create?'):'Because of that change, what else could happen?';
     const helper=first?(key==='positive'?'For example, a higher income could ease the pressure of covering my expenses.':'For example, greater responsibility could leave me mentally tired after work.'):'Explain the connection, including how you or someone else might respond.';
     const node=document.createElement('div');node.className='consequence-entry';
     node.innerHTML='<div class="consequence-summary" hidden><div class="consequence-summary-head"><span>'+(first?'Initial change':'Because of that change')+'</span><button type="button" class="consequence-text-action" data-consequence-edit aria-label="Edit '+(key==='positive'?'benefit':'difficulty')+' consequence '+(position+1)+'">Edit</button></div><p class="consequence-answer clamped" id="'+id+'-answer"></p><button type="button" class="consequence-text-action" data-consequence-more aria-expanded="false" aria-controls="'+id+'-answer" hidden>Show more</button></div><div class="consequence-editor"><div class="consequence-continuation-head"><span>'+(first?'Initial change':'Then what?')+'</span><button type="button" class="secondary" data-consequence-finish '+(first||c.ended[key]?'hidden':'')+'>That’s it</button></div><label for="'+id+'">'+question+'</label><p class="field-note" id="'+id+'-help">'+helper+'</p><textarea id="'+id+'" rows="2" aria-describedby="'+id+'-help"></textarea></div>';
     list.append(node);
     const entry={node,summary:node.querySelector('.consequence-summary'),editor:node.querySelector('.consequence-editor'),input:node.querySelector('textarea'),answer:node.querySelector('.consequence-answer'),more:node.querySelector('[data-consequence-more]'),stop:node.querySelector('[data-consequence-finish]')};
     entry.input.value=value;entries.push(entry);
     entry.input.onfocus=()=>{
       open(entry);
       if(!c.ended[key]&&entry.input.value.trim()&&entry===entries.at(-1)){add();persist();}
     };
     entry.input.oninput=()=>{
       resize(entry);entry.answer.textContent=entry.input.value;
       if(!c.ended[key]){
         if(entry.input.value.trim()&&entry===entries.at(-1)){
           add();status.textContent='The next question is available below. You can keep writing your current answer.';
         }
         if(!entry.input.value.trim()){
           const index=entries.indexOf(entry);
           while(entries.length>index+1&&!entries.at(-1).input.value.trim())entries.pop().node.remove();
         }
       }
       persist();
     };
     node.querySelector('[data-consequence-edit]').onclick=()=>open(entry,true);
     entry.stop.onclick=finish;
     entry.more.onclick=()=>{
       const expanded=entry.more.getAttribute('aria-expanded')!=='true';
       entry.more.setAttribute('aria-expanded',String(expanded));entry.more.textContent=expanded?'Show less':'Show more';entry.answer.classList.toggle('clamped',!expanded);
     };
     if(collapsed)compact(entry);else resize(entry);
     return entry;
   };
   // Written answers are shown as compact entries on return; new decisions start blank.
   c[key].forEach(value=>add(value,Boolean(value.trim())));
   if(!c.ended[key]&&entries.at(-1).input.value.trim())add();
   finished.hidden=!c.ended[key];
   reopen.onclick=()=>{
     c.ended[key]=false;finished.hidden=true;
     const last=entries.at(-1);
     if(last.input.value.trim()){compact(last);open(add(),true);}else open(last,true);
     persist();status.textContent='The exploration is open again.';
   };
   persist();
 });
 if(typeof ResizeObserver!=='undefined'){
   consequenceResizeObserver=new ResizeObserver(()=>root.querySelectorAll('.consequence-summary').forEach(summary=>updateMore({summary,answer:summary.querySelector('.consequence-answer'),more:summary.querySelector('[data-consequence-more]')})));
   consequenceResizeObserver.observe(root);
 }
}

function inversion(){
const rows=(data.inversion||[""]).map((x,i)=>'<div class="inversion-item"><input data-list="inversion" data-i="'+i+'" value="'+esc(x)+'"><button class="x" data-del="inversion" data-i="'+i+'">×</button></div>').join("");
return '<div class="card inversion-card"><h2>Inversion</h2><p class="muted intro">Instead of asking only how this decision could work,<br>look at what could make it fail.</p><div class="divider"></div><div class="question">What could stop this choice from achieving your aim?</div><div class="inversion-list">'+rows+'<button class="add" data-add="inversion">+ Add another</button></div></div>'
}
function stressTest(){
const ratings=data.stressTest.ratings||{};
const choiceOptions=value=>'<option value="">Select ▾</option>'+stressChoices.map(c=>'<option value="'+c.value+'" '+(value===c.value?"selected":"")+'>'+c.label+'</option>').join("");
const head='<tr><th class="stress-scenario"></th>'+data.options.map(o=>'<th>'+esc(o.name||"Untitled option")+'</th>').join("")+'</tr>';
const body=stressRows.map(r=>'<tr><th class="stress-scenario">'+esc(r.label)+'</th>'+data.options.map(o=>{const v=(ratings[r.id]&&ratings[r.id][o.id])||"";return '<td><select data-stressrow="'+r.id+'" data-stressoption="'+o.id+'">'+choiceOptions(v)+'</select></td>'}).join("")+'</tr>').join("");
return '<div class="card stress-card"><h2>Stress Test</h2><p class="muted intro">A decision can look strong when things go roughly as expected.</p><p class="muted stress-lead">Now make some important conditions less favourable and see<br>how much pressure each option could absorb.</p><div class="stress-legend"><div><strong>Can absorb</strong><span>The option should remain workable.</span></div><div><strong>Strained</strong><span>It may still work, but with little room for further problems.</span></div><div><strong>Beyond tolerance</strong><span>The option could become unworkable or unacceptable.</span></div></div><div class="divider"></div><div class="stress-table-wrap"><table class="stress-table"><thead>'+head+'</thead><tbody>'+body+'</tbody></table></div><div class="divider"></div><label class="field stress-summary"><span>Where does this decision seem to have the least room for things going wrong?</span><textarea data-stresssummary>'+esc(data.stressTest.leastRoom||"")+'</textarea></label></div>'
}
function judgmentConditionalRows(){
const promises=new Set(data.options.flatMap(o=>o.incentives?.promises||[]));
const avoid=new Set(data.options.flatMap(o=>o.incentives?.avoid||[]));
const ids=[];
if(promises.has("recognition"))ids.push("seen");
if(promises.has("belonging")||avoid.has("rejection"))ids.push("social");
if(promises.has("security")||avoid.has("uncertainty"))ids.push("uncertainty");
return judgmentConditional.filter(x=>ids.includes(x.id))
}
function judgmentTable(rows){
const answer=id=>data.judgment.answers[id]||"";
return '<div class="judgment-table-wrap"><table class="judgment-table"><thead><tr><th></th><th>No</th><th>Maybe</th><th>Yes</th></tr></thead><tbody>'+rows.map(r=>'<tr><td>'+esc(r.question)+'</td>'+["no","maybe","yes"].map(v=>'<td><label class="judgment-radio"><input type="radio" name="judgment-'+r.id+'" data-judgment="'+r.id+'" aria-label="'+esc(r.question+' — '+v)+'" value="'+v+'" '+(answer(r.id)===v?"checked":"")+'><span></span></label></td>').join("")+'</tr>').join("")+'</tbody></table></div>'
}
function judgmentCheck(){
const conditional=judgmentConditionalRows();
return '<div class="card judgment-card"><h2>Judgment Check</h2><p class="muted intro">Some influences can quietly change how you see a decision.</p><p class="muted judgment-lead">Mentally remove each one and notice whether your judgment changes.</p><div class="judgment-key"><span><strong>NO</strong>I’d see it the same way</span><span><strong>MAYBE</strong>I’m not sure</span><span><strong>YES</strong>I’d see it differently</span></div><div class="divider"></div>'+judgmentTable(judgmentCore)+'<div class="divider"></div><div class="judgment-challenge"><div class="judgment-challenge-row"><label>What is the strongest serious case that the way you currently see this decision could be wrong?</label><textarea data-judgmenttext="strongestCase">'+esc(data.judgment.strongestCase||"")+'</textarea></div><div class="judgment-challenge-row"><label>What evidence would most seriously change your view?</label><textarea data-judgmenttext="changeEvidence">'+esc(data.judgment.changeEvidence||"")+'</textarea></div></div>'+(conditional.length?'<div class="divider"></div><p class="muted conditional-intro">A few additional things are worth checking based on what came up earlier in your decision.</p>'+judgmentTable(conditional):"")+'</div>'
}
function reversibility(){const o=option();return card("If you are wrong, how hard is it to change course?","The harder a choice is to undo, the more evidence and margin of safety it deserves.",tabs()+'<label class="field"><span>How difficult would this option be to reverse?</span><select data-difficulty><option value="0">Not assessed</option>'+[[1,"Easy"],[2,"Moderate"],[3,"Difficult"]].map(([v,l])=>'<option value="'+v+'" '+(o.reverse.difficulty===v?"selected":"")+'>'+l+'</option>').join("")+'</select></label><div class="section">What would reversing it cost?</div><div class="chips">'+["Time","Money","Relationships","Reputation","Legal / contractual cost","Lost opportunity","Emotional cost"].map(x=>'<button class="chip '+(o.reverse.costs.includes(x)?"active":"")+'" data-revcost="'+x+'">'+x+'</button>').join("")+'</div><label class="field"><span>Could you structure the choice to make it easier to reverse?</span><textarea data-optfield="reverse.easier">'+esc(o.reverse.easier)+'</textarea></label>')}
function driverOptions(f){return (f.options||[]).filter(id=>data.options.some(o=>o.id===id));}
function driverDirection(f){const ids=driverOptions(f);return ids.length?'Supports '+ids.map(id=>data.options.find(o=>o.id===id).name).join(' and '):f.directionAssessed?'No clear difference':'Direction not assessed';}
function reflections(){
 const rows=[];const add=(id,text,optionId)=>{if(text?.trim())rows.push({id,text:text.trim(),optionId});};
 data.options.forEach(o=>{['immediate','future'].forEach(k=>{if(!o.trade[k+'Unknown'])add(o.id+'-trade-'+k,o.trade[k],o.id);});['foregone','commitments'].forEach(k=>(o.trade[k]||[]).forEach((t,i)=>add(o.id+'-trade-'+k+'-'+i,t,o.id)));['positive','negative'].forEach(k=>{if(o.consequence[k].some(t=>t.trim()))add(o.id+'-consequences-'+k,consequenceSequenceText(o,k),o.id);});[...(o.incentives.promises||[]),...(o.incentives.avoid||[])].forEach(id=>add(o.id+'-motive-'+id,[...incentivePromises,...incentiveAvoid].find(x=>x.id===id)?.title,o.id));['gain','relief','fit'].forEach(k=>{if(k!=='fit'||!o.incentives.fitUnknown)add(o.id+'-incentive-'+k,o.incentives[k],o.id);});compoundingQuestions.forEach(({key})=>{if(!o.compound[key+'Unknown'])add(o.id+'-compound-'+key,o.compound[key],o.id);});});
 ['grow','avoid'].forEach(k=>data.compounding[k].forEach(id=>add('compound-'+k+'-'+id,data.compounding[k+'Details'][id],null)));
 data.inversion.forEach((text,i)=>add('inversion-'+i,text,null));
 return rows;
}
function factors(){
 const rows=reflections();const used=new Set(data.factors.flatMap(f=>(f.sources||[]).map(x=>x.id)));
 const reference=rows.length?rows.map(r=>'<label class="reflection-row"><input type="checkbox" data-reflection="'+esc(r.id)+'" '+(selectedReflections.includes(r.id)?'checked':'')+'><span>'+esc(r.text)+'<small>'+esc(data.options.find(o=>o.id===r.optionId)?.name||'Across the decision')+(used.has(r.id)||(r.id.includes('-consequences-')&&[...used].some(id=>id.startsWith(r.id.replace('-consequences-','-chain-')+'-')))?' · Already linked':'')+'</small></span></label>').join(''):'<p class="muted">Your earlier answers will appear here. You can also add a driver directly.</p>';
 const controls=(f,key,label,choices)=>'<label class="field"><span>'+label+'</span><select data-factor="'+f.id+'" data-key="'+key+'"><option value="0">Choose…</option>'+choices.map(([v,l])=>'<option value="'+v+'" '+(f[key]===v?'selected':'')+'>'+l+'</option>').join('')+'</select></label>';
 const editors=data.factors.map(f=>'<article class="factor"><div class="factorhead"><input aria-label="Driver name" data-factor="'+f.id+'" data-key="name" value="'+esc(f.name)+'" placeholder="Name this decision driver"><button class="x" data-delfactor="'+f.id+'" aria-label="Remove driver">×</button></div><p class="field-note">'+(f.sources||[]).length+' linked reflection'+((f.sources||[]).length===1?'':'s')+'</p><fieldset class="driver-direction"><legend>Which paths does this support?</legend><div class="compound-options">'+data.options.map(o=>'<label><input type="checkbox" data-driveroption="'+f.id+'" value="'+o.id+'" '+(driverOptions(f).includes(o.id)?'checked':'')+'><span>'+esc(o.name)+'</span></label>').join('')+'<label><input type="checkbox" data-drivernone="'+f.id+'" '+(f.directionAssessed&&!driverOptions(f).length?'checked':'')+'><span>No clear difference</span></label></div></fieldset><div class="metricgrid">'+controls(f,'importance','Importance',[[1,'Low'],[2,'Medium'],[3,'High']])+controls(f,'evidence','Evidence',[[1,'Assumption'],[2,'Reasonable estimate'],[3,'Verified fact']])+controls(f,'strength','How strongly?',[[1,'Somewhat'],[2,'Strongly']])+'</div><label class="field"><span>Why this matters</span><textarea data-factor="'+f.id+'" data-key="rationale">'+esc(f.rationale)+'</textarea></label>'+((f.sources||[]).length?'<details><summary>Review supporting reflections</summary><ul>'+f.sources.map(r=>'<li>'+esc(r.text)+'</li>').join('')+'</ul></details>':'')+'</article>').join('');
 return '<div class="drivers-page"><p class="muted">Bring related reasons together. Assess each once.</p>'+decisionAnchor()+'<div class="drivers-workspace"><section class="reflection-panel"><h2>Your earlier reflections</h2><p class="field-note">Select related reflections to group into one driver.</p>'+reference+'<button id="groupReflections" '+(!selectedReflections.length?'disabled':'')+'>Create driver from '+selectedReflections.length+' reflection'+(selectedReflections.length===1?'':'s')+'</button></section><section class="driver-editors">'+(editors||'<div class="empty-state"><h2>What are the real reasons?</h2><p>Select related reflections, or add a driver directly. Aim for a few distinct reasons rather than repeating the same one.</p></div>')+'<button id="addFactor" class="secondary">+ Add a decision driver</button></section></div></div>';
}
function decisionAnchor(){return '<div class="decision-anchor"><small>DECISION</small><p>'+esc(data.decision||'Your decision is not defined yet.')+'</p></div>';}
function assessmentComplete(){return Boolean(data.options.every(o=>o.name.trim())&&data.decisionAim.trim()&&data.hasHardBoundaries&&data.priorities.length&&data.stakes.length&&data.reviewed.filter(i=>i<11).length===11&&choiceOption().trade.alternatives.some(t=>t.trim())&&["immediate","future"].every(k=>choiceOption().trade[k+"Unknown"]||choiceOption().trade[k].trim())&&compoundingQuestions.every(({key})=>choiceOption().compound[key+"Unknown"]||choiceOption().compound[key].trim())&&["positive","negative"].every(k=>choiceOption().consequence.ended[k]&&choiceOption().consequence[k].some(t=>t.trim()))&&data.options.every(o=>o.reverse.difficulty>0)&&data.factors.length&&data.factors.every(f=>f.name.trim()&&f.importance&&f.evidence&&f.strength&&(f.directionAssessed||driverOptions(f).length))&&stressRows.every(r=>data.options.every(o=>data.stressTest.ratings[r.id]?.[o.id])));}

function analyse(){
 const scores=Object.fromEntries(data.options.map(o=>[o.id,0]));
 const assessed=data.factors.filter(f=>f.name.trim()&&f.importance&&f.evidence&&f.strength&&(driverOptions(f).length||f.directionAssessed));
 assessed.forEach(f=>driverOptions(f).forEach(id=>scores[id]+=f.strength*f.importance*f.evidence));
 const sorted=[...data.options].sort((a,b)=>scores[b.id]-scores[a.id]);const top=sorted[0],second=sorted[1];const total=Object.values(scores).reduce((a,b)=>a+b,0)||1;const gap=second?(scores[top.id]-scores[second.id])/total:0;
 const lean=!second?'Comparison not assessed':!assessed.length?'Not assessed':gap<.08?'No clear lean':gap<.22?'Slight lean toward '+top.name:'Moderate lean toward '+top.name;
 const rules=data.hasHardBoundaries==='yes'?data.rules:[];
 const unresolvedBoundary=rules.some(r=>!r.text.trim());
 const assumptions=assessed.filter(f=>f.importance===3&&f.evidence===1).length;
 const complete=assessmentComplete();const unresolved=allInvestigations().length;
 const readiness=unresolvedBoundary||assumptions||unresolved?'Still investigating':!complete?'Incomplete assessment':'No unresolved blocker recorded';
 const evidence=assessed.length?(assessed.every(f=>f.evidence===3)?'Verified facts':assessed.every(f=>f.evidence===1)?'Assumptions':'Mixed facts, estimates and assumptions'):'Not assessed';
 const stressComplete=stressRows.every(r=>data.options.every(o=>data.stressTest.ratings[r.id]?.[o.id]));
 const stressValues=stressRows.flatMap(r=>data.options.map(o=>data.stressTest.ratings[r.id]?.[o.id]));
 const robust=!stressComplete?'Not assessed':stressValues.includes('too-much')?'Important pressure points':stressValues.includes('limit')||assumptions?'Limited room for setbacks':'Manageable in tested conditions';
 return {scores,lean,readiness,evidence,robust,top,gap,complete,unresolved};
}
function boundaryInvestigations(){if(data.hasHardBoundaries!=="yes")return[];const out=[];data.rules.forEach(r=>data.options.forEach(o=>{if(r.status&&r.status[o.id]==="unknown"){const q=(r.investigate&&r.investigate[o.id])||"";if(q)out.push(q)}}));return out}
function tradeoffInvestigations(){const out=[];data.options.forEach(o=>{['immediate','future'].forEach(k=>{if(o.trade[k+'Unknown'])out.push((o.name||'Untitled option')+': Find out the '+k+' costs of making this choice.');});if(o.trade?.foregoneState==="unknown")out.push(o.trade.foregoneUnknown||(o.name||'Untitled option')+': Resolve the unknown in earlier notes about what this path closes off.');if(o.trade?.commitmentState==="unknown")out.push(o.trade.commitmentUnknown||(o.name||'Untitled option')+': Resolve the unknown in earlier notes about what this path requires.');});return out;}
function compoundingInvestigations(){const o=choiceOption(),tasks={build:'Explore what this choice could help build on over time.',reinforce:'Investigate which unwanted patterns or pressures could strengthen over time.',sustain:'Explore what this choice could make harder to sustain or pursue over time.'};return compoundingQuestions.filter(({key})=>o.compound[key+'Unknown']).map(({key})=>(o.name||'Your choice')+': '+tasks[key]);}
function allInvestigations(){return [...new Set([...tradeoffInvestigations(),...compoundingInvestigations(),...(data.investigate||[]).filter(Boolean)].map(x=>x.trim()).filter(Boolean))]}
function judgmentSignals(){const rows=[...judgmentCore,...judgmentConditionalRows()];return rows.filter(r=>["maybe","yes"].includes(data.judgment.answers[r.id]))}
function vulnerabilityItems(){
const out=(data.inversion||[]).filter(Boolean).map(x=>x.trim()).filter(Boolean);
if(data.stressTest.leastRoom)out.push(data.stressTest.leastRoom.trim());
stressRows.forEach(r=>{
  const too=data.options.filter(o=>data.stressTest.ratings?.[r.id]?.[o.id]==="too-much").map(o=>o.name);
  const limit=data.options.filter(o=>data.stressTest.ratings?.[r.id]?.[o.id]==="limit").map(o=>o.name);
  if(too.length)out.push(r.label+": "+too.join(", ")+" could become unworkable or unacceptable.");
  else if(limit.length)out.push(r.label+": "+limit.join(", ")+" would be at the limit.");
});
return [...new Set(out.filter(Boolean))]
}
function overviewList(items,empty="Nothing added yet."){return items.length?'<ul class="overview-list">'+items.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>':'<p class="muted">'+esc(empty)+'</p>'}
function decisionOverview(){
 const a=analyse();const edit=i=>'<button class="edit-link" data-edit="'+i+'">Edit</button>';
 const section=(title,body,i)=>'<section class="overview-section"><div class="section-heading"><h3>'+title+'</h3>'+edit(i)+'</div>'+body+'</section>';
 const priorities=data.stakes.map(id=>lifeDomains.find(d=>d.id===id)?.title).filter(Boolean);
 const drivers=[...data.factors].sort((x,y)=>(y.importance||0)-(x.importance||0));
 const driverRows=drivers.length?drivers.map(f=>'<details class="overview-driver"><summary><span><strong>'+esc(f.name||'Untitled driver')+'</strong><small>'+(['Not assessed','Low','Medium','High'][f.importance||0])+' importance · '+(['Not assessed','Assumption','Reasonable estimate','Verified fact'][f.evidence||0])+'</small></span><span class="badge">'+esc(driverDirection(f))+'</span></summary><p>'+esc(f.rationale||'No reasoning added yet.')+'</p>'+((f.sources||[]).length?'<ul>'+f.sources.map(r=>'<li>'+esc(r.text)+'</li>').join('')+'</ul>':'')+'</details>').join(''):'<p class="muted">Decision drivers have not been assessed yet.</p>';
 const rules=data.hasHardBoundaries==='yes'?data.rules:[];
 const boundaryList=rules.length?'<h4>Hard boundaries</h4>'+rules.map(r=>'<div class="boundary-summary"><strong>'+esc(r.text||'Boundary not defined')+'</strong></div>').join(''):'';
 const signals=judgmentSignals();const judgmentAnswered=[...judgmentCore,...judgmentConditionalRows()].every(r=>data.judgment.answers[r.id]);
 const reverse=data.options.map(o=>'<div class="overview-reverse"><strong>'+esc(o.name)+'</strong><p>'+(['Not assessed','Easy to change course','Moderately difficult to change course','Difficult to change course'][o.reverse.difficulty||0])+'</p>'+((o.reverse.costs||[]).length?'<small>Potential costs: '+esc(o.reverse.costs.join(', '))+'</small>':'')+(o.reverse.easier?'<p>'+esc(o.reverse.easier)+'</p>':'')+'</div>').join('');
 return '<div class="decision-overview">'+decisionAnchor()+'<div class="overview-hero"><span class="assessment-label">'+(a.complete?'Reviewed assessment':'Partial assessment')+'</span><h2>'+esc(a.lean==='Comparison not assessed'?'Your choice is still being explored':a.lean==='Not assessed'?'Your decision is still taking shape':a.lean==='No clear lean'?'Your reasons do not point clearly to one path':'Your reasons currently show a '+a.lean.toLowerCase())+'</h2><p>'+esc(a.unresolved?a.unresolved+' question'+(a.unresolved===1?' remains':'s remain')+' unresolved.':a.complete?'No unresolved information gaps have been recorded.':'Complete the relevant checks before interpreting this as a full assessment.')+'</p><div class="overview-state"><div><span>Evidence</span><strong>'+esc(a.evidence)+'</strong></div><div><span>Readiness</span><strong>'+esc(a.readiness)+'</strong></div><div><span>Stability</span><strong>'+esc(a.robust)+'</strong></div></div><small>Based on your entries. This is an orientation, not a recommendation.</small>'+(!data.options[1]?'<p class="field-note">You have reflected on one choice. Its alternatives have not been comparatively assessed.</p>':'')+'</div>'+section('What this decision needs to protect',overviewList(priorities,'Not assessed yet.')+boundaryList,1)+section('Costs and other possibilities',data.options.map(o=>'<div class="overview-trade"><h4>'+esc(o.name||'Untitled option')+'</h4><strong>Other possibilities</strong>'+overviewList(o.trade.alternatives.filter(t=>t.trim()),'Not answered yet.')+'<strong>Immediate cost</strong><p>'+esc(costAnswer(o,'immediate'))+'</p><strong>Future cost</strong><p>'+esc(costAnswer(o,'future'))+'</p></div>').join(''),2)+section('What is driving your view',driverRows,10)+'<div class="overview-pair">'+section('What you still need to find out',overviewList(allInvestigations(),'No information gaps recorded yet.')+(compoundingInvestigations().length?'<button class="edit-link" data-edit="4">Review Compounding unknowns</button>':''),2)+section('Where the decision is vulnerable',overviewList(vulnerabilityItems(),'No pressure points recorded yet.'),7)+section('Worth noticing',signals.length?overviewList(signals.map(r=>r.summary+(data.judgment.answers[r.id]==='yes'?' — your view changes.':' — you are unsure whether this affects your view.')),''):'<p class="muted">'+(judgmentAnswered?'No influences flagged in the checks answered.':'Judgment Check is not fully assessed yet.')+'</p>',8)+section('Room to change course',reverse,9)+'</div><section class="ai-export"><h3>Use this decision with AI</h3><p>Here’s your decision in structured context, ready to paste into ChatGPT or any other GenAI model for deeper analysis.</p><div class="chips"><button id="copyContext">Copy decision context</button><button id="downloadContext" class="secondary">Download .md</button><span id="copyFeedback" role="status" aria-live="polite"></span></div><details><summary>Preview structured context</summary><pre class="brief">'+esc(decisionContextText())+'</pre></details></section></div>';
}
function decisionContextText(){const a=analyse(),out=[];const add=x=>out.push(x);add("# Clarity Decision Context");add("\nAssessment: "+(a.complete?"Reviewed":"Partial / incomplete"));add("\n## Decision\n"+(data.decision||"[Not answered]"));add("\n## Choice under consideration\n"+(choiceOption().name||"[Not answered]"));if(data.options.length>1)add("\n## Previously entered paths (retained)\n"+data.options.map((o,i)=>String.fromCharCode(65+i)+". "+o.name).join("\n"));add("\n## Aim for this decision\n"+(data.decisionAim||"[Not answered]"));add("\n## Direction in life\n"+lifeDirectionText());const initialInclination=startingInclinationText();add("\n## Starting inclination\n"+initialInclination);if(data.options.length>1&&data.inclination)add("\n## Earlier starting inclination (retained)\n"+(data.inclination==="none"?"No clear inclination yet":data.options.find(o=>o.id===data.inclination)?.name||"[Not answered]"));add("\n## Time horizon\n"+(data.horizon||"[Not answered]"));add("\n## What matters most within the life I want\n"+fmt(data.priorities.map(id=>lifeDomains.find(d=>d.id===id)?.title).filter(Boolean)));add("\n## What is at stake in this decision\n"+fmt(data.stakes.map(id=>lifeDomains.find(d=>d.id===id)?.title).filter(Boolean)));add("\n## Hard boundaries");if(data.hasHardBoundaries!=="yes"){add("\n"+(data.hasHardBoundaries==="no"?"No hard boundaries stated.":"[Not assessed]"))}else{add("\n"+fmt(data.rules.map(r=>r.text).filter(Boolean)))}add("\n## Compounding — "+choiceOption().name+"\n"+compoundingReflectionText(choiceOption()));if(earlierCompoundingText())add("\n### Earlier Compounding notes (retained)\n"+earlierCompoundingText());data.options.forEach(o=>{add("\n## "+o.name+" — Trade-Offs\nOther realistic possibilities (not ranked or selected as the best alternative):\n"+fmt(o.trade.alternatives.filter(t=>t.trim()))+"\nImmediate cost:\n"+costAnswer(o,'immediate')+"\nFuture cost:\n"+costAnswer(o,'future'));if(legacyTradePresent(o))add("\n### Earlier Trade-Offs notes (original categories)\n"+legacyTradeText(o));add("\n## "+o.name+" — Incentives\n"+incentiveReflectionText(o));if((o.incentives.promises||[]).length||(o.incentives.avoid||[]).length)add("\n### Earlier Incentives selections (retained)\nGains:\n"+fmt(legacyIncentiveLabels(o,'promises'))+"\nAvoidance:\n"+fmt(legacyIncentiveLabels(o,'avoid')));add("\n## "+o.name+" — "+(o.id===choiceOption().id?"Further Consequences":"Earlier consequences (retained)")+"\n"+consequenceReflectionText(o));add("\n## "+o.name+" — Reversibility\nDifficulty: "+["Not assessed","Easy","Moderate","Difficult"][o.reverse.difficulty||0]+"\nCosts:\n"+fmt(o.reverse.costs)+"\nMake it easier to reverse:\n"+(o.reverse.easier||"[Not answered]"))});add("\n## Inversion\nWhat would make this decision fail to achieve the intended outcome?\n"+fmt(data.inversion));add("\n## Stress Test\n"+stressRows.map(r=>{const cells=data.options.map(o=>{const v=(data.stressTest.ratings[r.id]&&data.stressTest.ratings[r.id][o.id])||"";const label=stressChoices.find(c=>c.value===v)?.label||"[Not answered]";return o.name+": "+label}).join(" | ");return "- "+r.label+" — "+cells}).join("\n")+"\nLeast room for things going wrong:\n"+(data.stressTest.leastRoom||"[Not answered]"));if(data.incentiveConcerns.length||data.incentiveConcernNone)add("\n## Earlier incentives I did not want to keep reinforcing (retained)\n"+(data.incentiveConcernNone?"[None selected]":fmt(data.incentiveConcerns.map(id=>[...incentivePromises,...incentiveAvoid].find(x=>x.id===id)?.title||id))));add("\n## Judgment Check\n"+[...judgmentCore,...judgmentConditionalRows()].map(r=>"- "+r.question+" — "+({no:"No — I would see it the same way",maybe:"Maybe — I’m not sure",yes:"Yes — I would see it differently"}[data.judgment.answers[r.id]]||"[Not answered]")).join("\n")+"\nStrongest serious case that my current view could be wrong:\n"+(data.judgment.strongestCase||"[Not answered]")+"\nEvidence that would most seriously change my view:\n"+(data.judgment.changeEvidence||"[Not answered]"));add("\n## Decision drivers\n"+(data.factors.length?data.factors.map(f=>"- "+(f.name||"[Untitled]")+" | "+driverDirection(f)+" | importance "+["","low","medium","high"][f.importance]+" | evidence "+["","assumption","reasonable estimate","verified fact"][f.evidence]+"\n  "+(f.rationale||"")).join("\n"):"[None added]"));add("\n## Current decision state\nStarting leaning: "+startingInclinationText()+"\nComparison: "+a.lean+"\nReadiness: "+a.readiness+"\nEvidence quality: "+a.evidence+"\nStability: "+a.robust);add("\n## What I still need to find out\n"+fmt(allInvestigations()));add("\n---\n# INSTRUCTION FOR FURTHER ANALYSIS\nAnalyze this decision critically without making the decision for me. Do not simply reinforce my current preference. Identify missing considerations and blind spots; challenge weak assumptions; separate facts, estimates and assumptions; identify double-counting; examine psychological pressures; trace second- and third-order consequences; identify the unknowns with the highest value of information; tell me what evidence I should gather next; argue the strongest serious case for each major option; and point out what evidence would rationally change the current lean. The choice under consideration is provisional. Do not treat not making it as a defined alternative or interpret a single-path reflection as proof this is the best available choice. Explore realistic alternatives without inventing my preferences. Examine how each path relates to both my aim for this decision and my direction in life. If my life direction is unknown, help me explore it without inventing one or treating it as a barrier to deciding. Do not reduce the decision to one score or tell me what to choose.");return out.join("\n")}
const fmt=a=>(a||[]).filter(Boolean).length?(a||[]).filter(Boolean).map(x=>"- "+x).join("\n"):"[None added]";

function bind(){document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{const nextStep=+b.dataset.step;if((nextStep===2||nextStep===3||nextStep===5)&&step!==nextStep)active=data.options[0].id;if(nextStep===3&&step!==3)incentiveReview=false;step=nextStep;render()});document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{active=b.dataset.tab;render()});document.querySelectorAll("[data-root]").forEach(e=>e.oninput=()=>{data[e.dataset.root]=e.value;save()});document.querySelectorAll("[data-optname]").forEach(e=>e.oninput=()=>setOptName(e.dataset.optname,e.value));document.querySelectorAll("[data-inclination]").forEach(e=>e.onchange=()=>{data.inclination=e.value;save()});document.querySelectorAll("[data-horizon]").forEach(e=>e.onchange=()=>{data.horizon=e.value;save()});document.querySelectorAll("[data-removeopt]").forEach(b=>b.onclick=()=>{if(data.options.length<=2)return;data.options=data.options.filter(o=>o.id!==b.dataset.removeopt);if(active===b.dataset.removeopt)active=data.options[0].id;if(data.inclination===b.dataset.removeopt)data.inclination="";render()});if($("#addOpt"))$("#addOpt").onclick=()=>{if(data.options.length<5){const o=blankOption("Option "+String.fromCharCode(65+data.options.length));data.options.push(o);active=o.id;render()}};document.querySelectorAll("[data-priority]").forEach(e=>e.onchange=()=>{if(e.checked&&data.priorities.length<3)data.priorities.push(e.value);if(!e.checked){data.priorities=data.priorities.filter(x=>x!==e.value);data.stakes=data.stakes.filter(x=>x!==e.value)}render()});document.querySelectorAll("[data-stake]").forEach(e=>e.onchange=()=>{data.stakes=e.checked?[...new Set([...data.stakes,e.value])]:data.stakes.filter(x=>x!==e.value);render()});document.querySelectorAll("[data-hardboundaries]").forEach(e=>e.onchange=()=>{data.hasHardBoundaries=e.value;if(e.value==="yes"&&!data.rules.length)data.rules.push({id:uid(),text:"",status:{},investigate:{}});render()});if($("#addRule"))$("#addRule").onclick=()=>{data.rules.push({id:uid(),text:"",status:{},investigate:{}});render()};document.querySelectorAll("[data-rule]").forEach(e=>e.oninput=()=>{data.rules.find(r=>r.id===e.dataset.rule).text=e.value;save()});document.querySelectorAll("[data-delrule]").forEach(b=>b.onclick=()=>{data.rules=data.rules.filter(r=>r.id!==b.dataset.delrule);render()});document.querySelectorAll("[data-list]").forEach(e=>e.oninput=()=>{const a=[...getPath(e.dataset.list)];a[+e.dataset.i]=e.value;setPath(e.dataset.list,a);if(e.dataset.list.includes(".trade.foregone")&&e.value.trim())option().trade.foregoneState="";if(e.dataset.list.includes(".trade.commitments")&&e.value.trim())option().trade.commitmentState="";save()});document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{const a=[...getPath(b.dataset.del)];a.splice(+b.dataset.i,1);setPath(b.dataset.del,a);render()});document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{setPath(b.dataset.add,[...getPath(b.dataset.add),""]);render()});document.querySelectorAll("[data-tradestate]").forEach(e=>e.onchange=()=>{const t=option().trade,k=e.dataset.tradestate;t[k+"State"]=e.value;if(e.value!=="unknown")t[k+"Unknown"]="";render()});document.querySelectorAll("[data-tradeunknown]").forEach(e=>e.oninput=()=>{option().trade[e.dataset.tradeunknown+"Unknown"]=e.value;save()});document.querySelectorAll("[data-tradeprev]").forEach(b=>b.onclick=()=>{const i=Math.max(0,data.options.indexOf(option())-1);active=data.options[i].id;render()});document.querySelectorAll("[data-tradenext]").forEach(b=>b.onclick=()=>{const i=Math.min(data.options.length-1,data.options.indexOf(option())+1);active=data.options[i].id;render()});document.querySelectorAll("[data-compoundselect]").forEach(e=>e.onchange=()=>{const k=e.dataset.compoundselect,a=data.compounding[k];if(e.checked&&a.length<3)a.push(e.value);if(!e.checked){data.compounding[k]=a.filter(x=>x!==e.value);delete data.compounding[k+"Details"][e.value];delete data.compounding[k+"Options"][e.value]}render()});document.querySelectorAll("[data-compounddetail]").forEach(e=>e.oninput=()=>{data.compounding[e.dataset.compounddetail+"Details"][e.dataset.compoundid]=e.value;save()});document.querySelectorAll("[data-compoundoption]").forEach(e=>e.onchange=()=>{const k=e.dataset.compoundoption+"Options",id=e.dataset.compoundid,a=data.compounding[k][id]||[];data.compounding[k][id]=e.checked?[...new Set([...a,e.value])]:a.filter(x=>x!==e.value);save()});document.querySelectorAll("[data-optfield]").forEach(e=>e.oninput=()=>{const [a,b]=e.dataset.optfield.split(".");option()[a][b]=e.value;save()});document.querySelectorAll("[data-stressrow]").forEach(e=>e.onchange=()=>{const r=e.dataset.stressrow,o=e.dataset.stressoption;if(!data.stressTest.ratings[r])data.stressTest.ratings[r]={};data.stressTest.ratings[r][o]=e.value;save()});document.querySelectorAll("[data-stresssummary]").forEach(e=>e.oninput=()=>{data.stressTest.leastRoom=e.value;save()});document.querySelectorAll("[data-judgment]").forEach(e=>e.onchange=()=>{data.judgment.answers[e.dataset.judgment]=e.value;save()});document.querySelectorAll("[data-judgmenttext]").forEach(e=>e.oninput=()=>{data.judgment[e.dataset.judgmenttext]=e.value;save()});document.querySelectorAll("[data-difficulty]").forEach(e=>e.onchange=()=>{option().reverse.difficulty=+e.value;save()});document.querySelectorAll("[data-revcost]").forEach(b=>b.onclick=()=>toggle(option().reverse.costs,b.dataset.revcost));if($("#addFactor"))$("#addFactor").onclick=()=>{data.factors.push({id:uid(),name:"",option:data.options[0].id,strength:1,importance:2,evidence:2,rationale:""});render()};document.querySelectorAll("[data-factor]").forEach(e=>{const h=()=>{const f=data.factors.find(x=>x.id===e.dataset.factor),k=e.dataset.key;f[k]=["strength","importance","evidence"].includes(k)?+e.value:e.value;save()};e.oninput=h;e.onchange=h});document.querySelectorAll("[data-delfactor]").forEach(b=>b.onclick=()=>{data.factors=data.factors.filter(x=>x.id!==b.dataset.delfactor);render()});if($("#copyContext"))$("#copyContext").onclick=()=>navigator.clipboard.writeText(decisionContextText());if($("#downloadContext"))$("#downloadContext").onclick=()=>{const blob=new Blob([decisionContextText()],{type:"text/markdown"}),u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="clarity-decision-context.md";a.click();URL.revokeObjectURL(u)}}
function toggle(arr,x){const i=arr.indexOf(x);i>=0?arr.splice(i,1):arr.push(x);render()}
$("#back").onclick=()=>{if(step===9){const i=data.options.indexOf(option());if(i>0){active=data.options[i-1].id;render();return}}if(step===4){step=3;active=choiceOption().id;render();return}if(step===6){step=5;active=choiceOption().id;render();return}if(step===7){step=6;render();return}step=Math.max(0,step-1);render()};$("#next").onclick=()=>{if(step===2){active=data.options[0].id;incentiveReview=false}if(step===1||step===8)active=data.options[0].id;if(step===9){const i=data.options.indexOf(option());if(i<data.options.length-1){active=data.options[i+1].id;render();return}active=data.options[0].id;incentiveReview=false}if(step===3){active=data.options[0].id}if(step===4)active=data.options[0].id;if(step===5)active=choiceOption().id;step=Math.min(steps.length-1,step+1);render()};$("#reset").onclick=()=>{if(confirm("Start a new decision?")){data=fresh();active=data.options[0].id;incentiveReview=false;step=0;render()}};
const originalBind=bind;
bind=function(){
 originalBind();
 bindConsequences();
 document.querySelectorAll('[data-compoundingtext]').forEach(e=>e.oninput=()=>{choiceOption().compound[e.dataset.compoundingtext]=e.value;save();});
 document.querySelectorAll('[data-compoundingunknown]').forEach(e=>e.onchange=()=>{const key=e.dataset.compoundingunknown;choiceOption().compound[key+'Unknown']=e.checked;save();document.querySelector('[data-compoundingtext="'+key+'"]').disabled=e.checked;});
 document.querySelectorAll('[data-incentivetext]').forEach(e=>e.oninput=()=>{choiceOption().incentives[e.dataset.incentivetext]=e.value;save();});
 document.querySelectorAll('[data-incentivefitunknown]').forEach(e=>e.onchange=()=>{choiceOption().incentives.fitUnknown=e.checked;save();document.querySelector('[data-incentivetext="fit"]').disabled=e.checked;});
 document.querySelectorAll('[data-choice]').forEach(e=>e.oninput=()=>{choiceOption().name=e.value;save();});
 document.querySelectorAll('[data-choiceinclination]').forEach(e=>e.onchange=()=>{data.choiceInclination=e.value;save();});
 document.querySelectorAll('[data-resolvelegacy]').forEach(e=>e.onclick=()=>{const t=option().trade;if(t.foregoneState==='unknown')t.foregoneState='';if(t.commitmentState==='unknown')t.commitmentState='';render();});
 document.querySelectorAll('[data-cost]').forEach(e=>e.oninput=()=>{option().trade[e.dataset.cost]=e.value;save();});
 document.querySelectorAll('[data-costunknown]').forEach(e=>e.onchange=()=>{const k=e.dataset.costunknown;option().trade[k+'Unknown']=e.checked;save();document.querySelector('[data-cost="'+k+'"]').disabled=e.checked;});
 document.querySelectorAll('[data-lifeunknown]').forEach(e=>e.onchange=()=>{data.lifeDirectionUnknown=e.checked;render();});
 document.querySelectorAll('[data-optname]').forEach(e=>e.oninput=()=>{setOptName(e.dataset.optname,e.value);const label=document.querySelector('[data-option-label="'+e.dataset.optname+'"]');if(label)label.textContent=e.value||'Untitled option';});
 document.querySelectorAll("[data-step]").forEach(b=>{const go=b.onclick;b.onclick=()=>{go();$("#nav").classList.remove("mobile-open");$("#mobileNavToggle").setAttribute("aria-expanded","false");window.scrollTo(0,0);};});
 const addDriver=sources=>{data.factors.push({id:uid(),name:'',options:[],directionAssessed:false,strength:0,importance:0,evidence:0,rationale:'',sources});selectedReflections=[];render();};
 if($('#addFactor'))$('#addFactor').onclick=()=>addDriver([]);
 document.querySelectorAll('[data-reflection]').forEach(e=>e.onchange=()=>{selectedReflections=e.checked?[...selectedReflections,e.dataset.reflection]:selectedReflections.filter(id=>id!==e.dataset.reflection);const b=$('#groupReflections');b.disabled=!selectedReflections.length;b.textContent='Create driver from '+selectedReflections.length+' reflection'+(selectedReflections.length===1?'':'s');});
 if($('#groupReflections'))$('#groupReflections').onclick=()=>addDriver(reflections().filter(r=>selectedReflections.includes(r.id)));
 document.querySelectorAll('[data-driveroption]').forEach(e=>e.onchange=()=>{const f=data.factors.find(f=>f.id===e.dataset.driveroption);f.options=e.checked?[...new Set([...driverOptions(f),e.value])]:driverOptions(f).filter(id=>id!==e.value);f.directionAssessed=true;save();const none=document.querySelector('[data-drivernone="'+f.id+'"]');if(none)none.checked=!f.options.length;});
 document.querySelectorAll('[data-drivernone]').forEach(e=>e.onchange=()=>{const f=data.factors.find(f=>f.id===e.dataset.drivernone);f.directionAssessed=e.checked;if(e.checked){f.options=[];document.querySelectorAll('[data-driveroption="'+f.id+'"]').forEach(c=>c.checked=false);}save();});
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{step=+b.dataset.edit;active=data.options[0].id;incentiveReview=false;render();window.scrollTo(0,0);});
 if($('#copyContext'))$('#copyContext').onclick=async()=>{try{await navigator.clipboard.writeText(decisionContextText());$('#copyFeedback').textContent='Copied';}catch{$('#copyFeedback').textContent='Could not copy. Use Preview context to copy the text.';}};
};
const originalNext=$('#next').onclick;
$('#next').onclick=()=>{if(!data.reviewed)data.reviewed=[];if(!data.reviewed.includes(step))data.reviewed.push(step);originalNext();window.scrollTo(0,0);};
const originalReset=$('#reset').onclick;
$('#reset').onclick=()=>{originalReset();selectedReflections=[];};
$('#mobileNavToggle').onclick=()=>{const open=$('#nav').classList.toggle('mobile-open');$('#mobileNavToggle').setAttribute('aria-expanded',String(open));};

render();



