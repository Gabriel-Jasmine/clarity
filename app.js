const steps=["Decision","What Matters","Trade-Offs","Incentives","Compounding","Further Consequences","The Devil's Advocate","Stress Test","Judgment Check","Reversibility","Decision Drivers","Decision Overview"];
// Section IDs stay stable in saved data; navigation order is independent.
const stepOrder=[0,1,2,3,4,5,6,7,9,10,8,11];
// Presentation-only icons; section IDs and reviewed-state rules stay unchanged.
const sectionIcons=['file-pen-line','compass','scale','magnet','sprout','git-branch','messages-square','shield','eye','undo-2','layers','map'];
function uiIcon(name){return '<svg class="cl-icon" aria-hidden="true" focusable="false"><use href="assets/icons.svg#'+name+'"></use></svg>';}
const driverDirectionChoices=[["for","Supports it"],["against","Against it"],["neutral","Neither"],["unknown","Not sure"]];
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const uid=()=>Math.random().toString(36).slice(2,9);
const judgmentOriginalCore=[
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
// G04/G09 replace all original core counterfactuals; exact stems remain historical.
const judgmentCore=[];
const judgmentChallengeCopy={
 encountered:"Have you come across any information or experience that challenges your current view?",
 strongest:"What is the strongest reason your current view could be wrong?",
 defaultHelp:"Consider the strongest case against your current view. Include any information or experience that challenges it, and explain how you have weighed it.",
 defaultExample:"My trial workshops may have attracted people looking for an occasional activity. I could be wrong to expect them to become regular customers.",
 yesHelp:"Include what you found, where it came from and how you weighed it.",
 yesExample:"Several trial attendees said they would attend occasionally, rather than weekly. That weakens my expectation of regular bookings. They may not represent all customers, so I would check wider demand before relying on that income.",
 noneHelp:"Consider the strongest reason to question your view, even without information against it.",
 change:"What evidence would most seriously change your view?",
 changeHelp:"Be specific about what the evidence would need to show and why it would change your assessment.",
 changeExample:"If repeat bookings brought in less than the rent for three months, I would reconsider depending on classes to keep the studio running."
};
const judgmentEvidenceChoices=[["yes","Yes"],["none","Haven’t found any"],["unsure","Not sure"]];
const judgmentSocialCopy={
 question:"Are other people’s views, expectations or progress affecting how you see this decision?",
 followup:"Who are you thinking of, and how are they influencing your view?",
 help:"Think about advice, approval, comparisons, pressure or responsibilities. Describe what has been said or done, or the reaction you expect, and how it affects your view. Explain why this matters alongside your own reasons for the decision. You can describe roles or groups without naming anyone.",
 example:"Friends who have opened studios make me feel I’m falling behind. My partner is also concerned about using our shared savings, which gives me a real reason to be cautious. I still want a place to teach and make pottery, but other people’s progress is making me feel I should start sooner."
};
const judgmentSocialChoices=[["yes","Yes"],["none","Nothing comes to mind"],["unsure","Not sure"]];
const blankJudgmentContext=()=>({formatVersion:1,response:"",detail:""});
const judgmentAdditionalCopy={
 wordingContext:{
  question:"Are particular words or descriptions affecting how you see this decision?",
  followup:"How are you describing this decision, and what does that description bring into focus?",
  help:"Write the words or description you keep returning to. Consider another way to describe the same facts. Explain whether this changes your view, and why.",
  example:"I describe opening the studio as ‘leaving a secure job’. I could also describe it as ‘starting my own business’. The savings needed, rent and income uncertainty are the same either way. The first description makes security stand out; the second makes independence stand out. Both matter to me.",
  placeholder:"Describe the wording and what it draws your attention to…",
  title:"Words and descriptions",
  investigation:"Clarify whether particular words or descriptions are affecting how you see this decision.",
  historyTitle:"Earlier framing check (retained; replaced by G09)",
  legacyIds:["framing"],
  boundary:"The user's descriptions and perceived changes are context, not an equivalent-frame experiment or proof of framing error. Wording may reveal relevant considerations. If the facts differ, a changed view may reflect different information."
 },
 exampleContext:{
  question:"Is a particular experience, story or comparison affecting how you see this decision?",
  followup:"What keeps coming to mind, and what does it lead you to expect?",
  help:"Describe the example and why it stands out. Explain how well it fits your situation, including important differences. You can refer to an earlier answer.",
  example:"A friend’s pottery studio closed after a year, and I keep picturing the same thing happening to mine. It makes me expect weak demand. But their rent was higher and they relied on selling finished pieces, while I plan to run classes. Their experience highlights a risk; it does not yet tell me how likely that outcome is for my plan.",
  placeholder:"Describe what comes to mind and what you expect because of it…",
  title:"Experiences, stories and comparisons",
  investigation:"Clarify whether a particular experience, story or comparison is affecting how you see this decision.",
  historyTitle:"Earlier memorable-example check (retained; replaced by G09)",
  legacyIds:["vivid"],
  boundary:"A memorable example may be useful evidence. Its salience does not establish error, representative outcomes or a probability. Similarity and differences are user assessments, not independent verification; anchoring or an availability effect is not diagnosed."
 },
 investmentContext:{
  question:"Is your current path, past investment or an existing commitment affecting how you see this decision?",
  followup:"What from your current path, past investment or commitments is affecting your view?",
  help:"Describe what is already familiar, invested or promised, and how it affects your view. Separate what you cannot recover whatever you decide from benefits you could still gain or real costs of changing course. Include anything that would feel difficult to admit or step back from.",
  example:"I’ve paid for pottery training and told people I plan to open a studio, so stepping back would feel like wasting that effort and letting people down. The training fees cannot be recovered either way, and I could still use the skills without opening a studio. I’ve also signed a lease, so cancelling would bring an additional cost.",
  placeholder:"Describe what is already familiar, invested or promised, and why it matters now…",
  title:"Current path, investment and commitments",
  investigation:"Clarify whether your current path, past investment or an existing commitment is affecting how you see this decision.",
  historyTitle:"Earlier current-path and investment checks (retained; replaced by G04)",
  legacyIds:["fresh","past"],
  boundary:"Past spending alone does not establish an error. Future benefits, usable skills or assets, promises and real costs of changing course may remain relevant. No sunk-cost effect or psychological cause is diagnosed."
 },
 stateContext:{
  question:"Are your current feelings, energy levels or pressures affecting how you see this decision?",
  followup:"What is happening for you right now, and how is it affecting your view?",
  help:"Think about tiredness, excitement, stress or wanting the uncertainty to end, including things unrelated to this decision. Describe how they affect what you notice or expect. Include any real constraints you need to account for.",
  example:"I’m exhausted after a difficult month at work, so the studio feels like an escape. The successful trial workshops are encouraging, but I may be expecting ordinary weeks to feel the same. I want the uncertainty to end, which makes me less willing to check the costs. My income is limited, so waiting also has a real cost.",
  placeholder:"Describe what you’re experiencing now and how it affects your view…",
  title:"Current feelings, energy and pressures",
  investigation:"Clarify whether your current feelings, energy levels or pressures are affecting how you see this decision.",
  historyTitle:"Earlier uncertainty-relief check (retained; replaced by G05)",
  legacyIds:["uncertainty"],
  boundary:"Feelings may convey relevant information, and current pressures may be real constraints. This is present evaluation context, not a mood scale, diagnosis, proof of error or instruction to delay. Timing and future capacity remain separate assessments."
 }
};
const blankJudgment=()=>({formatVersion:1,answers:{},evidenceEncountered:"",strongestCase:"",changeEvidence:"",socialContext:blankJudgmentContext(),...Object.fromEntries(Object.keys(judgmentAdditionalCopy).map(key=>[key,blankJudgmentContext()]))});
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
const earlierStressRows=[
{id:"money",label:"Money becomes tighter than expected"},
{id:"time",label:"The path takes longer than expected"},
{id:"capacity",label:"Your available energy or mental capacity is lower than expected"},
{id:"benefit",label:"The expected benefit is smaller or arrives later than expected"},
{id:"dependency",label:"Something important the path depends on does not materialise"},
{id:"external",label:"External circumstances turn against the plan"}
];
const earlierStressChoices=[
{value:"manageable",label:"Manageable"},
{value:"limit",label:"At the limit"},
{value:"too-much",label:"Too much"}
];
// Version 2 answers concern room left after a plausible setback, not the old pressure scale.
const stressRows=[
{id:"money",label:"Money",description:"Costs are higher, or income or available funds are lower than expected."},
{id:"available-time",label:"Available Time",description:"It takes more time than expected, leaving less room for other things that matter to you."},
{id:"duration",label:"Time to reach the outcome",description:"It takes longer to reach the intended outcome."},
{id:"capacity",label:"Health and energy",description:"You have less physical or mental capacity available."},
{id:"support",label:"Support and Cooperation",description:"People you depend on provide less support, cooperation or follow-through than expected."},
{id:"access",label:"Access to what you need",description:"A place, service, equipment or permission you need changes or becomes unavailable."}
];
const stressChoices=[
{value:"no-effect",label:"No meaningful effect",description:"The setback would not materially affect whether doing this is workable."},
{value:"room",label:"Enough room remains",description:"You could manage the setback and retain room for further setbacks."},
{value:"little-room",label:"Little or no room left",description:"You could continue, but have little or no room for further setbacks."},
{value:"beyond",label:"Beyond tolerance",description:"It could become unworkable or cross an important boundary."},
{value:"unknown",label:"I don’t know yet",description:"You need more information before you can judge."}
];
const blankStressTest=()=>({formatVersion:2,summaryFormatVersion:1,ratings:{},notesByOption:{},summaryUnknownByOption:{},earlier:{ratings:{},leastRoom:""}});
const stressWritingTitle="How much could you manage before this becomes unworkable?";
const stressWritingHelp="Focus on the conditions that could make or break what you’re considering. In your own words, describe the setback you pictured, what you could still manage, and where continuing would become unworkable or cross an important boundary. Be detailed and concrete about amounts, timeframes or circumstances. Note any limits you cannot yet judge.";
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
    "question": "If you do this, what could you build on over time?",
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
    "question": "What could doing this make harder to sustain or keep pursuing over time?",
    "help": "Explain how doing this could gradually reduce your ability or willingness to continue something important, including a direction you hope to pursue.",
    "example": "More management work could leave less time to practise design and build a portfolio. Slower progress and less recognition in design could discourage me, leading me to practise less and have fewer chances to experience progress.",
    "placeholder": "Describe what could become harder to sustain or pursue, and how."
  }
];

const decisionTimingQuestions={
 deadline:"Does this decision have a deadline?",
 details:"When do you need to decide, and what sets that deadline?",
 detailsHelp:"Include the date or timeframe and where it comes from, including a deadline you have set yourself.",
 waiting:"What would change if you waited before deciding?",
 waitingHelp:"Consider what waiting could let you learn or do, what it could cost, and whether it is possible. Specify the period of time you have in mind."
};
const blankDecisionTiming=()=>({formatVersion:1,deadline:"",deadlineDetails:"",waiting:"",waitingResponse:""});
const driverBasisCopy={
 question:"What are the expectations you’re relying on most, and what are they based on?",
 helper:"Focus on what you believe will happen or be possible, rather than why it matters to you. Draw on relevant experience, information or comparable situations. Explain where those comparisons may not fit, and what you are still assuming.",
 dependencyHelp:"If this relies on other people or circumstances, what needs to happen, and what can you influence?",
 example:"I expect weekend classes to cover most of the studio’s rent. My trial workshops usually filled, but I don’t yet know whether people would attend regularly. I can organise the classes, but they depend on the landlord allowing weekend access. The landlord is open to this; permission is still unconfirmed."
};
const blankDriverReview=()=>({formatVersion:1,basis:"",basisUnknown:false,activeDriverId:null,reuseIds:[],openGroups:[]});

const blankCompounding=()=>({formatVersion:2,stronger:[],weaker:[],horizon:"",build:"",reinforce:"",sustain:"",buildUnknown:false,reinforceUnknown:false,sustainUnknown:false});
const blankConsequence=()=>({formatVersion:3,immediate:"",branches:{favourable:[""],unfavourable:[""]},branchEnded:{favourable:false,unfavourable:false},positive:[""],negative:[""],ended:{positive:false,negative:false}});
const blankAdvocateOutcome=()=>({id:uid(),outcome:"",connection:"",connectionResponse:""});
const blankDevilsAdvocate=()=>({formatVersion:2,outcomes:[blankAdvocateOutcome()],earlierOutcomes:[]});
const blankOption=name=>({id:uid(),name,trade:{alternatives:["",""],immediate:"",future:"",immediateUnknown:false,futureUnknown:false,foregone:[""],commitments:[""],foregoneState:"",foregoneUnknown:"",commitmentState:"",commitmentUnknown:""},incentives:{formatVersion:2,promises:[],avoid:[],gain:"",relief:"",fit:"",fitUnknown:false,responseFormatVersion:1,gainResponse:"",reliefResponse:""},compound:blankCompounding(),consequence:blankConsequence(),resilience:{conditions:[],financial:"maybe",time:"maybe",emotional:"maybe",strategic:"maybe"},reverse:blankReverse()});
function fresh(){const proposed=blankOption("");return{reviewPolicyVersion:2,decisionMode:"choice",choiceOptionId:proposed.id,choiceInclination:"",decision:"",decisionAim:"",objective:"",lifeDirectionUnknown:false,inclination:"",horizon:"",decisionTiming:blankDecisionTiming(),driverReview:blankDriverReview(),approachHistory:[],approachReview:null,options:[proposed],priorities:[],stakes:[],hasHardBoundaries:"",rules:[],incentiveConcerns:[],incentiveConcernNone:false,compounding:{grow:[],avoid:[],growDetails:{},growOptions:{},avoidDetails:{},avoidOptions:{}},inversion:[""],devilsAdvocate:blankDevilsAdvocate(),stressTest:blankStressTest(),knowledge:[],judgment:blankJudgment(),psych:[],factors:[],investigate:[],reviewed:[]}}
let data=(()=>{try{return JSON.parse(localStorage.getItem("clarity-v1"))||fresh()}catch{return fresh()}})();
// New timing answers are not inferred from consequence horizon or legacy reflections.
const reviewPolicyChanged=!data.reviewPolicyVersion;
const wholeFlowChanged=data.reviewPolicyVersion!==2;
data.reviewPolicyVersion=2;
const timingFormatChanged=!data.decisionTiming||data.decisionTiming.formatVersion!==1;
data.decisionTiming={...blankDecisionTiming(),...(data.decisionTiming&&typeof data.decisionTiming==='object'?data.decisionTiming:{})};
data.decisionTiming.formatVersion=1;
if(!['yes','none','unknown'].includes(data.decisionTiming.deadline))data.decisionTiming.deadline="";
if(!['none','unknown'].includes(data.decisionTiming.waitingResponse))data.decisionTiming.waitingResponse="";
for(const key of ['deadlineDetails','waiting'])if(typeof data.decisionTiming[key]!=='string')data.decisionTiming[key]="";
const driversFormatChanged=!data.driverReview||data.driverReview.formatVersion!==1;
data.driverReview={...blankDriverReview(),...(data.driverReview&&typeof data.driverReview==='object'?data.driverReview:{})};
data.driverReview.formatVersion=1;
if(!Array.isArray(data.driverReview.reuseIds))data.driverReview.reuseIds=[];
if(!Array.isArray(data.driverReview.openGroups))data.driverReview.openGroups=[];
if(typeof data.driverReview.basis!=="string")data.driverReview.basis="";
if(typeof data.driverReview.basisUnknown!=="boolean")data.driverReview.basisUnknown=false;
if(!Array.isArray(data.factors))data.factors=[];
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
// Earlier failure-condition notes are not answers to the new outcome/connection questions.
const advocateFormatChanged=!data.devilsAdvocate||data.devilsAdvocate.formatVersion!==2;
if(!data.devilsAdvocate)data.devilsAdvocate=blankDevilsAdvocate();
if(!Array.isArray(data.devilsAdvocate.outcomes))data.devilsAdvocate.outcomes=[blankAdvocateOutcome()];
if(!data.devilsAdvocate.outcomes.length)data.devilsAdvocate.outcomes.push(blankAdvocateOutcome());
data.devilsAdvocate.outcomes=data.devilsAdvocate.outcomes.map(entry=>({
 ...entry,id:entry.id||uid(),outcome:typeof entry.outcome==="string"?entry.outcome:"",connection:typeof entry.connection==="string"?entry.connection:"",connectionResponse:['unknown','no'].includes(entry.connectionResponse)?entry.connectionResponse:""
}));
// Keep any previously added pairs and source IDs, while presenting one fixed pair.
if(!Array.isArray(data.devilsAdvocate.earlierOutcomes))data.devilsAdvocate.earlierOutcomes=[];
data.devilsAdvocate.earlierOutcomes.push(...data.devilsAdvocate.outcomes.slice(1));
data.devilsAdvocate.outcomes=data.devilsAdvocate.outcomes.slice(0,1);
data.devilsAdvocate.formatVersion=2;
const stressFormatChanged=!data.stressTest||data.stressTest.formatVersion!==2;
if(stressFormatChanged){
 const previous=data.stressTest;
 data.stressTest={...blankStressTest(),earlier:previous||{ratings:{},leastRoom:""}};
}
if(!data.stressTest.ratings)data.stressTest.ratings={};
if(!data.stressTest.notesByOption)data.stressTest.notesByOption={};
data.stressTest.summaryFormatVersion=1;
if(!data.stressTest.summaryUnknownByOption||typeof data.stressTest.summaryUnknownByOption!=="object")data.stressTest.summaryUnknownByOption={};
if(!data.stressTest.earlier)data.stressTest.earlier={ratings:{},leastRoom:""};
// Earlier challenge writing is retained; no encountered-evidence response is inferred.
const judgmentFormatChanged=!data.judgment||data.judgment.formatVersion!==1;
const socialFormatChanged=!data.judgment?.socialContext||data.judgment.socialContext.formatVersion!==1;
const additionalJudgmentFormatChanged=Object.keys(judgmentAdditionalCopy).some(key=>!data.judgment?.[key]||data.judgment[key].formatVersion!==1);
data.judgment={...blankJudgment(),...(data.judgment&&typeof data.judgment==="object"?data.judgment:{})};
data.judgment.formatVersion=1;
if(!data.judgment.answers||typeof data.judgment.answers!=="object")data.judgment.answers={};
if(!judgmentEvidenceChoices.some(([value])=>value===data.judgment.evidenceEncountered))data.judgment.evidenceEncountered="";
for(const key of ["strongestCase","changeEvidence"])if(typeof data.judgment[key]!=="string")data.judgment[key]="";
// Preserve old seen/social answers independently; neither determines the new response.
data.judgment.socialContext={...blankJudgmentContext(),...(data.judgment.socialContext&&typeof data.judgment.socialContext==="object"?data.judgment.socialContext:{})};
data.judgment.socialContext.formatVersion=1;
if(!judgmentSocialChoices.some(([value])=>value===data.judgment.socialContext.response))data.judgment.socialContext.response="";
if(typeof data.judgment.socialContext.detail!=="string")data.judgment.socialContext.detail="";
// New context responses are never inferred from old fresh/past/uncertainty ratings or other sections.
Object.keys(judgmentAdditionalCopy).forEach(key=>{
 data.judgment[key]={...blankJudgmentContext(),...(data.judgment[key]&&typeof data.judgment[key]==="object"?data.judgment[key]:{})};
 data.judgment[key].formatVersion=1;
 if(!judgmentSocialChoices.some(([value])=>value===data.judgment[key].response))data.judgment[key].response="";
 if(typeof data.judgment[key].detail!=="string")data.judgment[key].detail="";
});
let incentiveFormatChanged=false,compoundingFormatChanged=false,consequenceFormatChanged=false,reverseFormatChanged=false;
data.options.forEach(o=>{
  if(o.reverse?.formatVersion!==2&&o.id===data.choiceOptionId)reverseFormatChanged=true;
  o.reverse=normalizeReverse(o.reverse);
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
  o.incentives.responseFormatVersion=1;
  for(const key of ["gain","relief"])if(!["none","unknown"].includes(o.incentives[key+"Response"]))o.incentives[key+"Response"]="";
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
  if(!o.consequence)o.consequence=blankConsequence();
  // Preserve all earlier separate-origin benefit/difficulty chains exactly as legacy data.
  if(!o.consequence.ended)o.consequence.ended={positive:false,negative:false};
  ["positive","negative"].forEach(k=>{
    if(!Array.isArray(o.consequence[k]))o.consequence[k]=[""];
    while(o.consequence[k].length>1&&!o.consequence[k].at(-1).trim())o.consequence[k].pop();
    if(!o.consequence[k].length)o.consequence[k].push("");
    if(typeof o.consequence.ended[k]!=="boolean")o.consequence.ended[k]=false;
  });
  if(typeof o.consequence.immediate!=="string")o.consequence.immediate="";
  if(!o.consequence.branches)o.consequence.branches={};
  if(!o.consequence.branchEnded)o.consequence.branchEnded={};
  ["favourable","unfavourable"].forEach(k=>{
    if(!Array.isArray(o.consequence.branches[k]))o.consequence.branches[k]=[""];
    while(o.consequence.branches[k].length>1&&!o.consequence.branches[k].at(-1).trim())o.consequence.branches[k].pop();
    if(!o.consequence.branches[k].length)o.consequence.branches[k].push("");
    if(typeof o.consequence.branchEnded[k]!=="boolean")o.consequence.branchEnded[k]=false;
  });
  if(o.consequence.formatVersion!==3){
    if(o.id===data.choiceOptionId)consequenceFormatChanged=true;
    // Do not assume two older, independently entered immediate effects share one origin.
    o.consequence.formatVersion=3;
  }
});
let step=Math.max(0,Math.min(11,data.ui?.step||0)),active=data.options.some(o=>o.id===data.ui?.active)?data.ui.active:data.options[0].id,incentiveReview=false;
if(!data.reviewed)data.reviewed=[];
if(timingFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==0);
if(incentiveFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==3);
if(compoundingFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==4);
if(consequenceFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==5);
if(reverseFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==9);
if(advocateFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==6);
if(stressFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==7);
if(judgmentFormatChanged||socialFormatChanged||additionalJudgmentFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==8);
data.factors.forEach(f=>{
 if(!f.id)f.id=uid();
 if(!driverDirectionChoices.some(([id])=>id===f.direction))f.direction="";
 if(typeof f.name!=="string")f.name="";
 if(typeof f.rationale!=="string")f.rationale="";
 if(!Array.isArray(f.options))f.options=f.option?[f.option]:[];
 if(!Array.isArray(f.sources))f.sources=[];
 if(!Array.isArray(f.sourceHistory))f.sourceHistory=[];
 if(!["manual","reflection","legacy"].includes(f.origin))f.origin=f.sources.length?"legacy":"manual";
 if(typeof f.inactive!=="boolean")f.inactive=false;
 f.sources.forEach(r=>{if(typeof r.inactive!=="boolean")r.inactive=false;});
});
if(wholeFlowChanged)data.reviewed=data.reviewed.filter(i=>![1,7,10].includes(i));
if(driversFormatChanged)data.reviewed=data.reviewed.filter(i=>i!==10);
if(reviewPolicyChanged)data.reviewed=data.reviewed.filter(i=>![0,1,3,5,7].includes(i));
if(!data.factors.some(f=>f.id===data.driverReview.activeDriverId&&!f.inactive))data.driverReview.activeDriverId=null;
approachDraft=data.pendingApproachEdit||null;
if(!Array.isArray(data.approachHistory))data.approachHistory=[];
if(!data.approachReview||!Array.isArray(data.approachReview.sections))data.approachReview=null;
function reviewStateSnapshot(){
 const o=choiceOption();
 return [
  [o.id,o.name,data.choiceInclination,data.decisionAim,data.horizon,data.decisionTiming],
  [data.objective,data.lifeDirectionUnknown,data.priorities,data.stakes,data.hasHardBoundaries,data.rules.map(r=>[r.id,r.text])],
  [o.trade.alternatives,o.trade.immediate,o.trade.future,o.trade.immediateUnknown,o.trade.futureUnknown],
  [o.incentives.gain,o.incentives.relief,o.incentives.fit,o.incentives.gainResponse,o.incentives.reliefResponse,o.incentives.fitUnknown],
  compoundingQuestions.map(q=>[o.compound[q.key],o.compound[q.key+"Unknown"]]),
  [o.consequence.immediate,o.consequence.branches,o.consequence.branchEnded],
  data.devilsAdvocate.outcomes[0],
  [stressRows.map(r=>stressValue(r)),stressNotes(),stressSummaryUnknown(),data.hasHardBoundaries,data.rules.map(r=>[r.id,r.text,r.check,r.checkHistory]),o.id,o.name],
  data.judgment,
  [o.id,o.name,o.reverse,reverseSourceRows().map(r=>[r.id,r.text])],
  [o.id,o.name,data.factors,data.driverReview.basis,data.driverReview.basisUnknown,data.driverReview.reuseIds,activeDrivers().flatMap(f=>activeDriverSources(f).map(r=>[r.id,driverSourceFreshness(r).state,driverSourceFreshness(r).current?.text])),activeDrivers().map(f=>driverAssessmentSnapshot(f))]
 ].map(value=>JSON.stringify([o.id,o.name,value]));
}
reverseStage=[0,1,2].includes(data.ui?.reverseStage)?data.ui.reverseStage:0;
syncDriverAssessmentSnapshots();
let lastReviewState=reviewStateSnapshot();
function save(){
 syncDriverAssessmentSnapshots();
 const state=reviewStateSnapshot();
 data.reviewed=data.reviewed.filter(index=>state[index]===lastReviewState[index]);lastReviewState=state;
 data.decision=choiceOption().name.trim();data.ui={step,active,incentiveReview,reverseStage};localStorage.setItem("clarity-v1",JSON.stringify(data));
}
function choiceOption(){return data.options.find(o=>o.id===data.choiceOptionId)||data.options[0]}
function startingInclinationText(){return data.choiceInclination==="make"?"Leaning towards doing this":data.choiceInclination==="not"?"Leaning towards not doing this":data.choiceInclination==="none"?"No clear inclination yet":"[Not answered]"}
function option(){return data.options.find(o=>o.id===active)||data.options[0]}
function setOptName(id,v){data.options.find(o=>o.id===id).name=v;save()}
function list(items,path,placeholder){return '<div class="list">'+items.map((x,i)=>'<div class="item"><input data-list="'+path+'" data-i="'+i+'" value="'+esc(x)+'" placeholder="'+esc(placeholder)+'"><button class="x" data-del="'+path+'" data-i="'+i+'">×</button></div>').join("")+'<button class="add" data-add="'+path+'">+ Add</button></div>'}
function getPath(path){return path.split(".").reduce((o,k)=>o[k],data)}
function setPath(path,val){const p=path.split(".");let o=data;for(let i=0;i<p.length-1;i++)o=o[p[i]];o[p.at(-1)]=val}
function tabs(){return '<div class="tabs">'+data.options.map(o=>'<button data-tab="'+o.id+'" class="'+(o.id===active?"active":"")+'">'+esc(o.name)+'</button>').join("")+'</div>'}
function card(title,sub,body){return '<div class="card"><h2>'+title+'</h2>'+(sub?'<p class="muted">'+sub+'</p>':'')+body+'</div>'}
// One page-level introduction, always before personal decision references.
const pageIntroductions={
 "0": [
  "State the decision you’re trying to make and what you hope to achieve."
 ],
 "1": [
  "Step back from this decision to consider the life you want to build, what matters most, and what you need to protect whatever you decide."
 ],
 "11": [
  "Review your recorded thinking, the reasons shaping your view, and what remains to finish, review or find out."
 ],
 "2": [
  "Every decision comes with gains and sacrifices. Consider what doing this would require you to give up, postpone or make harder to sustain in your life."
 ],
 "3": [
  "What you could gain or leave behind can influence your decision. These rewards can also draw you towards a particular way of living or working. Identify what makes doing this attractive, then consider how it fits the direction you want for your life."
 ],
 "4": [
  "Some effects build over time. Earlier progress can support further progress, while repeated demands or rewards can make a pattern stronger. This can change both your circumstances and how you think, feel and act. Consider what doing this could keep developing, reinforce or gradually weaken, in relation to the life you want to build."
 ],
 "7": [
  "What you’re considering may look workable when things go as expected. Consider how much room you would have if some conditions became less favourable."
 ],
 "8": [
  "Some influences can quietly change how you see a decision."
 ],
 "5": [
  "Doing this could set off a chain of effects in your life. What looks good at first may eventually undermine the direction you want to take, while what seems inconvenient may lead to a sweeter future. To understand where it could lead, look beyond its first result. Consider how that result could change how you feel, what becomes possible or impossible, and your surroundings or relationships. Those changes can create further consequences of their own.",
  "Use the Areas of Life below to consider different ways an immediate change could affect your life. One change may lead to favourable and unfavourable possibilities. Follow each possibility to see what it could set in motion, including consequences that take an unexpected turn. Keep the connections plausible, and consider how they relate to your goals and the life you want to build."
 ],
 "6": [
  "Work backwards from the life you want to build.",
  "Picture an outcome that would take you away from your life direction. Then consider whether doing this could lead you there, even if it achieves your immediate aim."
 ],
 "10": [
  "Bring related reasons together. Assess each once."
 ],
 "9": [
  "This decision matters. Consider what you could change after acting, what would stay with you, and what you could learn before committing further."
 ]
};
function pageIntroduction(){return '<div class="page-introduction" data-page-introduction="'+step+'">'+pageIntroductions[step].map(text=>'<p>'+esc(text)+'</p>').join('')+'</div>';}
function render(){
 finishApproachDraft();
 if(step===2||step===3||step===4||step===5||step===7||step===9)active=choiceOption().id;
 save();$("#title").textContent=steps[step];$("#stepCount").textContent=(stepOrder.indexOf(step)+1)+" of "+steps.length;
 $("#bar").style.width=((stepOrder.indexOf(step)+1)/steps.length*100)+"%";
 $("#nav").innerHTML='<a class="sidebar-guide" href="before-you-begin.html">'+uiIcon('book-open')+'<span>How Clarity works</span></a><hr class="sidebar-nav-divider">'+stepOrder.map(i=>{
  const completed=data.reviewed.includes(i);
  return '<button data-step="'+i+'" class="'+(i===step?'active':'')+'" '+(i===step?'aria-current="page"':'')+' aria-label="'+esc(steps[i]+(completed?', reviewed':', not reviewed'))+'">'+uiIcon(sectionIcons[i])+'<span class="nav-label">'+steps[i]+'</span><span class="nav-status" aria-hidden="true">'+(completed?'<span class="cl-completion">'+uiIcon('check')+'</span>':'')+'</span></button>';
 }).join('');
 $("#back").disabled=step===0;$("#next").style.display=step===11?'none':'block';
 $('#next').textContent=step===10?'Continue to Judgment Check →':step===8?'Continue to Decision Overview →':'Continue →';
 $("#screen").innerHTML=pageIntroduction()+approachSectionNote()+(step>2&&step!==7?directionReference():"")+screen();
 document.querySelectorAll('.card > h2,.decision-overview > h2').forEach(h=>{if(h.textContent===steps[step])h.remove();});
 document.querySelectorAll('.trade-option-nav').forEach(n=>n.remove());
 document.querySelectorAll('.x').forEach(b=>b.setAttribute('aria-label','Remove item'));
 bind();
}
function screen(){if(step===0)return frame();if(step===1)return boundaries();if(step===2)return tradeoffs();if(step===3)return incentives();if(step===4)return compounding();if(step===5)return consequences();if(step===6)return inversion();if(step===7)return stressTest();if(step===8)return judgmentCheck();if(step===9)return reversibility();if(step===10)return factors();return decisionOverview()}
function frame(){
 const horizons=["Weeks or months","1–2 years","3–5 years","More than 5 years","Potentially permanent","Not sure"];
 return '<div class="card decision-card"><label class="field"><span class="type-question">What decision are you trying to make?</span><small id="choice-help">Focus on one action you’re considering. You’ll explore other ways forward as you work through it.</small><span class="writing-example" id="choice-example"><span class="example-label">Example</span><span>I’m deciding whether to open a community pottery studio.</span></span><span class="decision-answer-starter" id="decision-answer-starter">I’m deciding whether to…</span><textarea data-choice aria-describedby="choice-help choice-example decision-answer-starter" aria-label="What decision are you trying to make?" placeholder="Describe what you’re considering doing…">'+esc(choiceOption().name)+'</textarea></label><div class="divider"></div><div class="decision-block"><div class="question" id="choice-lean-title">Which way are you leaning right now?</div><p class="field-note">Choose the closer one, even if your leaning is slight.</p><div class="choice-grid" role="group" aria-labelledby="choice-lean-title">'+[['make','Do this'],['not','Not do this']].map(([value,label])=>'<label class="choice-card"><input type="radio" name="choice-inclination" data-choiceinclination value="'+value+'" '+(data.choiceInclination===value?'checked':'')+'><span>'+label+'</span></label>').join('')+'</div></div><div class="divider"></div><label class="field"><span class="type-question">What are you hoping to achieve?</span><textarea data-root="decisionAim" placeholder="I’m hoping this would help me...">'+esc(data.decisionAim)+'</textarea></label><div class="divider"></div><div class="decision-block"><div class="question">If you do this, how long could the consequences affect your life?</div><div class="choice-grid compact">'+horizons.map(x=>'<label class="choice-card"><input type="radio" name="horizon" data-horizon value="'+x+'" '+(data.horizon===x?'checked':'')+'><span>'+x+'</span></label>').join('')+'</div></div>'+decisionTimingForm()+approachReviewPanel()+'</div>';
}

function decisionTimingForm(){
 const t=data.decisionTiming;
 const deadlines=[["yes","Yes"],["none","No fixed deadline"],["unknown","I don’t know yet"]];
 return '<div class="divider"></div><fieldset class="decision-timing-field"><legend class="question">'+decisionTimingQuestions.deadline+'</legend><div class="choice-grid decision-deadline-choices">'+deadlines.map(([value,label])=>'<label class="choice-card"><input type="radio" name="decision-deadline" data-timingdeadline value="'+value+'" '+(t.deadline===value?'checked':'')+'><span>'+label+'</span></label>').join('')+'</div>'+(t.deadline==='yes'?'<div class="decision-deadline-details"><label class="question" for="decision-deadline-details">'+decisionTimingQuestions.details+'</label><p class="field-note" id="decision-deadline-help">'+decisionTimingQuestions.detailsHelp+'</p><div class="decision-timing-example"><span>Example</span><p>The landlord needs an answer by the end of the month before offering the premises to someone else.</p></div><textarea id="decision-deadline-details" data-timingtext="deadlineDetails" aria-describedby="decision-deadline-help" placeholder="Write the date or timeframe and what sets it…">'+esc(t.deadlineDetails)+'</textarea></div>':'')+'</fieldset><div class="divider"></div><div class="decision-timing-field"><label class="question" for="decision-waiting">'+decisionTimingQuestions.waiting+'</label><p class="field-note" id="decision-waiting-help">'+decisionTimingQuestions.waitingHelp+'</p><div class="decision-timing-example"><span>Example</span><p>Waiting another week would let me obtain renovation quotes before committing. Waiting beyond the end of the month could mean losing these premises.</p></div><textarea id="decision-waiting" data-timingtext="waiting" aria-describedby="decision-waiting-help" placeholder="If I waited…" '+(t.waitingResponse?'disabled':'')+'>'+esc(t.waiting)+'</textarea><div class="decision-waiting-responses">'+[['none','Nothing significant comes to mind'],['unknown','I don’t know yet']].map(([value,label])=>'<label><input type="checkbox" data-timingresponse value="'+value+'" '+(t.waitingResponse===value?'checked':'')+'><span>'+label+'</span></label>').join('')+'</div></div>';
}
function timingComplete(){
 const t=data.decisionTiming;
 return Boolean(t.deadline&&(t.deadline!=='yes'||t.deadlineDetails.trim())&&(t.waitingResponse||t.waiting.trim()));
}
function timingDeadlineText(){
 return {yes:'Yes',none:'No fixed deadline',unknown:'I don’t know yet'}[data.decisionTiming.deadline]||'[Not answered]';
}
function timingWaitingText(){
 const t=data.decisionTiming;
 return {none:'Nothing significant comes to mind',unknown:'I don’t know yet'}[t.waitingResponse]||t.waiting.trim()||'[Not answered]';
}
function timingInvestigations(){
 const t=data.decisionTiming,out=[];
 if(t.deadline==='unknown')out.push('Find out whether this decision has a deadline and what sets it.');
 if(t.waitingResponse==='unknown')out.push('Find out what waiting before deciding would change and whether waiting is feasible.');
 return out;
}
function timingContextText(){
 const t=data.decisionTiming;
 const out=['\n## Timing of this decision','Timing capture version: 1','\n### '+decisionTimingQuestions.deadline+'\n'+timingDeadlineText()];
 if(t.deadline==='yes')out.push('\n### '+decisionTimingQuestions.details+'\n'+(t.deadlineDetails.trim()||'[Not answered]'));
 else if(t.deadlineDetails.trim())out.push('\n### Earlier deadline details (inactive; not the current response)\n'+t.deadlineDetails);
 out.push('\n### '+decisionTimingQuestions.waiting+'\n'+timingWaitingText());
 if(t.waitingResponse&&t.waiting.trim())out.push('\n### Earlier waiting reflection (inactive; not the current response)\n'+t.waiting);
 out.push('\nThese are the user’s reported circumstances and assessment. No fixed deadline does not establish that waiting has no cost; nothing significant coming to mind does not establish that no consequence exists. Unknown and unanswered responses differ.');
 return out.join('\n');
}
function timingOverview(){
 const t=data.decisionTiming;
 return '<p><strong>Deadline:</strong> '+esc(timingDeadlineText())+'</p>'+(t.deadline==='yes'?'<p>'+esc(t.deadlineDetails.trim()||'Deadline details not answered yet.')+'</p>':'')+'<h4>What waiting could change</h4><p>'+esc(timingWaitingText())+'</p>';
}
function bindDecisionTiming(){
 document.querySelectorAll('[data-timingdeadline]').forEach(e=>e.onchange=()=>{
  data.decisionTiming.deadline=e.value;data.reviewed=data.reviewed.filter(i=>i!==0);render();
 });
 document.querySelectorAll('[data-timingtext]').forEach(e=>e.oninput=()=>{
  data.decisionTiming[e.dataset.timingtext]=e.value;data.reviewed=data.reviewed.filter(i=>i!==0);save();
 });
 document.querySelectorAll('[data-timingresponse]').forEach(e=>e.onchange=()=>{
  data.decisionTiming.waitingResponse=e.checked?e.value:"";data.reviewed=data.reviewed.filter(i=>i!==0);render();
 });
}

function lifeDirectionText(){return data.lifeDirectionUnknown?"I don’t know yet":data.objective.trim()||"Not answered yet.";}
function lifeDirectionContextText(){return "\n## Direction in life\n"+lifeDirectionText()+(data.lifeDirectionUnknown&&data.objective.trim()?"\n### Earlier life-direction writing (inactive; not the current response)\n"+data.objective:"");}
function boundariesContextText(){
 const active=data.hasHardBoundaries==="yes",out=["\n## Hard boundaries\n"+(active?"Yes":data.hasHardBoundaries==="no"?"Nothing comes to mind":"[Not answered]")];
 if(active)out.push(data.rules.length?data.rules.map(r=>"- "+(r.text.trim()?r.text:"[Not answered]")).join("\n"):"[Boundary explanation not answered]");
 else if(data.rules.some(r=>r.text.trim()))out.push("\n### Earlier hard-boundary writing (inactive; not the current response)\n"+data.rules.map(r=>"- "+(r.text.trim()?r.text:"[Not answered]")).join("\n"));
 return out.join("\n");
}
function directionReference(aimOnly=false){return '<section class="direction-reference" aria-label="Your direction"><div><div class="direction-label">Aim for this decision <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(data.decisionAim||'Not answered yet.')+'</p></div>'+(aimOnly?'':'<div><div class="direction-label">Direction in life <button class="reference-edit" data-edit="1">Edit</button></div><p>'+esc(lifeDirectionText())+'</p></div>')+'</section>';}
function boundaries(){
const selected=data.priorities.length,locked=selected>=3;
const domains=lifeDomains.map(d=>'<label class="domain-card '+(data.priorities.includes(d.id)?"selected":"")+'"><input type="checkbox" data-priority value="'+d.id+'" '+(data.priorities.includes(d.id)?"checked":"")+' '+(locked&&!data.priorities.includes(d.id)?"disabled":"")+'><div><strong>'+esc(d.title)+'</strong><p>'+esc(d.desc)+'</p></div></label>').join("");
const stakeDomains=lifeDomains;
const stakes=stakeDomains.length?'<div class="stake-grid">'+stakeDomains.map(d=>'<label class="stake-card '+(data.stakes.includes(d.id)?"selected":"")+'"><input type="checkbox" data-stake value="'+d.id+'" '+(data.stakes.includes(d.id)?"checked":"")+'><span>'+esc(d.title)+'</span></label>').join("")+'</div>':'<p class="muted">Choose what matters most above first.</p>';
const domainPrompt='values & identity · health & capacity · partner & family · friends & belonging · work · learning · money · time & freedom · place & stability';
const hardChoice='<div class="choice-grid hard-choice"><label class="choice-card"><input type="radio" name="hardboundaries" data-hardboundaries value="no" '+(data.hasHardBoundaries==="no"?"checked":"")+'><span>Nothing comes to mind</span></label><label class="choice-card"><input type="radio" name="hardboundaries" data-hardboundaries value="yes" '+(data.hasHardBoundaries==="yes"?"checked":"")+'><span>Yes</span></label></div>';
const boundaryList=data.hasHardBoundaries==="yes"?'<div class="boundary-writing"><div class="question">What must remain true, or what must not happen?</div><p class="field-note thinking-prompts"><strong>Think across:</strong> '+domainPrompt+'</p><div class="boundary-starters"><span>Try starting with:</span><em>I need to remain able to…</em><em>I cannot accept an outcome that…</em><em>Whatever I choose, I need to protect…</em></div>'+data.rules.map((r,ri)=>'<div class="boundary-card"><div class="boundary-head"><span>BOUNDARY '+String(ri+1).padStart(2,"0")+'</span><button class="x" data-delrule="'+r.id+'">×</button></div><textarea data-rule="'+r.id+'" placeholder="I need to remain able to...">'+esc(r.text)+'</textarea></div>').join("")+'<button id="addRule" class="secondary">+ Add another boundary</button></div>':"";
return '<div class="card what-matters-card">'+directionReference(true)+
'<div class="what-matters-stage"><div class="what-matters-kicker">STEP BACK</div><p class="muted intro"><strong>Put this decision aside for a moment.</strong></p><label class="field"><span class="type-question">What are you ultimately trying to build, protect, or become in your life?</span><small>Think beyond this decision. Consider how you want to live, who you want to become, what you want to build, and what you want to preserve.</small><textarea data-root="objective" '+(data.lifeDirectionUnknown?'disabled':'')+' placeholder="The life I’m trying to build looks like...">'+esc(data.objective)+'</textarea></label><label class="life-unknown"><input type="checkbox" data-lifeunknown '+(data.lifeDirectionUnknown?'checked':'')+'>I don’t know yet</label><p class="field-note thinking-prompts"><strong>Think across:</strong> '+domainPrompt+'</p></div>'+
'<div class="divider"></div>'+
'<div class="what-matters-stage"><div class="what-matters-kicker">WHAT MATTERS MOST WITHIN THAT LIFE</div><div class="question">What matters most to keep building or protecting in your life?</div><p class="field-note">Choose up to three.</p><div class="domain-grid">'+domains+'</div><div class="selection-count">'+selected+' of 3 selected</div></div>'+
'<div class="what-matters-transition"><span>NOW BRING THE DECISION BACK IN</span></div>'+
'<div class="what-matters-stage"><div class="question">Which of these could be meaningfully affected if you do this?</div><p class="field-note">Select the areas this decision could meaningfully affect. You do not need to decide yet whether the effect would be good or bad.</p>'+stakes+'</div>'+
'<div class="divider"></div>'+
'<div class="what-matters-stage"><div class="what-matters-kicker">HARD BOUNDARIES</div><div class="question">Is there anything that must remain true, whatever you choose?</div><p class="field-note boundary-definition">A hard boundary is a condition that must be respected, whatever you decide. Write what you need to preserve or what cannot happen.</p>'+hardChoice+boundaryList+'</div>'+
'</div>'
}

const costAreas=[
  ["Income and ability to earn","How doing this could affect your current income or your ability to earn a living."],
  ["Savings and financial security","Money set aside for future plans, other commitments and unexpected needs."],
  ["Living conditions and stability","Your home, everyday living conditions and access to what you need to live securely."],
  ["Sustained pursuit of mastery","Your time, focus and mental capacity to keep progressing in a pursuit you are deeply dedicated to, whether it is your work or something you pursue alongside it."],
  ["Physical and mental health","Your health and your ability to sustain the routines, care and recovery it needs."],
  ["Family, friends and community","Your time, closeness, mutual support and sense of belonging with family, friends and the communities that matter to you."],
  ["Connection with your partner","Your time and capacity to be present, maintain closeness and respond to each other’s needs."]
];
const costUnknownText="I don’t know yet but I will find out later";
function costAnswer(o,k){return o.trade[k+"Unknown"]?costUnknownText:o.trade[k].trim()||"Not answered yet.";}
function costContextText(o,k){return (k==="immediate"?"Immediate cost":"Future cost")+":\n"+costAnswer(o,k)+(o.trade[k+"Unknown"]&&o.trade[k].trim()?"\nEarlier "+k+"-cost writing (inactive; not the current response):\n"+o.trade[k]:"");}
function legacyTradePresent(o){return ['foregone','commitments'].some(k=>(o.trade[k]||[]).some(t=>t.trim()))||Boolean(o.trade.foregoneState||o.trade.commitmentState);}
function legacyTradeText(o){
 const t=o.trade;
 return [["foregone","foregoneState","foregoneUnknown","What this path closes off","No meaningful sacrifice identified yet"],["commitments","commitmentState","commitmentUnknown","What this path requires or ties up","No meaningful cost identified yet"]].map(([key,stateKey,unknownKey,label,noneLabel])=>{
  const state=t[stateKey],out=[label+":\n"+(state==="none"?"["+noneLabel+"]":state==="unknown"?"[Not enough information yet]":fmt(t[key]))];
  if(state&&(t[key]||[]).some(text=>text.trim()))out.push("Earlier writing (inactive within this historical response):\n"+fmt(t[key]));
  if(t[unknownKey]?.trim())out.push((state==="unknown"?"Recorded information need":"Earlier information-need note (inactive)")+":\n"+t[unknownKey]);
  return out.join("\n");
 }).join("\n\n");
}
function tradeoffs(){
 const o=choiceOption(),oi=data.options.indexOf(o),t=o.trade;
 const context='<section class="direction-reference trade-context" aria-label="Your decision context"><div class="trade-context-action"><div class="direction-label">You’re considering <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(o.name||'Your decision is not defined yet.')+'</p></div><div><div class="direction-label">Decision aim <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(data.decisionAim||'Not answered yet.')+'</p></div><div><div class="direction-label">Life direction <button class="reference-edit" data-edit="1">Edit</button></div><p>'+esc(lifeDirectionText())+'</p></div></section>';
 const alternativeInputs=t.alternatives.map((text,i)=>'<div class="trade-alternative-row"><span>'+(i+1)+'</span><input aria-label="Alternative '+(i+1)+'" data-list="options.'+oi+'.trade.alternatives" data-i="'+i+'" value="'+esc(text)+'" placeholder="Describe a realistic alternative"><button class="secondary" data-del="options.'+oi+'.trade.alternatives" data-i="'+i+'" aria-label="Remove alternative '+(i+1)+'">Remove</button></div>').join('');
 const part=(k,title,question,help,example)=>'<section class="trade-cost-part" aria-labelledby="trade-'+k+'-title"><div class="what-matters-kicker">'+title+'</div><h3 class="question" id="trade-'+k+'-title">'+question+'</h3><p class="field-note" id="trade-'+k+'-help">'+help+'</p><div class="writing-example" id="trade-'+k+'-example"><span class="example-label">Example</span><p>'+esc(example.replace(/^Example: /,''))+'</p></div><textarea id="trade-'+k+'-answer" data-cost="'+k+'" aria-labelledby="trade-'+k+'-title" aria-describedby="trade-'+k+'-help trade-'+k+'-example" placeholder="Write the '+k+' costs here…" '+(t[k+'Unknown']?'disabled':'')+'>'+esc(t[k])+'</textarea><label class="trade-cost-unknown"><input type="checkbox" data-costunknown="'+k+'" aria-controls="trade-'+k+'-answer" '+(t[k+'Unknown']?'checked':'')+'><span>'+costUnknownText+'</span></label></section>';
 const legacy=legacyTradePresent(o)?'<details class="trade-legacy"><summary>Earlier Trade-Offs notes</summary><p class="field-note">These notes are saved in their original categories. Use them when describing the immediate and future costs above.</p><h3>What this path closes off</h3>'+list(t.foregone,'options.'+oi+'.trade.foregone','Earlier reflection')+'<h3>What this path requires or ties up</h3>'+list(t.commitments,'options.'+oi+'.trade.commitments','Earlier reflection')+'<pre class="brief">'+esc(legacyTradeText(o))+'</pre>'+((t.foregoneState==='unknown'||t.commitmentState==='unknown')?'<button class="secondary" data-resolvelegacy>Mark earlier unknowns as resolved</button>':'')+'</details>':'';
 return '<div class="card trade-cost-card">'+context+'<section class="trade-cost-section" aria-labelledby="trade-alternatives-title"><div class="what-matters-kicker">Alternatives</div><h2 class="question" id="trade-alternatives-title">If you don’t do this, what other ways could you move forward?</h2><p class="field-note">Consider what is realistically possible in your circumstances, including other plans, responsibilities and parts of life you want to build or protect. You might take a different direction, continue your current life, or leave room for a possibility you have not explored yet.</p>'+alternativeInputs+'<button class="add" data-add="options.'+oi+'.trade.alternatives">+ Add another alternative</button></section><section class="trade-cost-section" aria-labelledby="trade-cost-title"><h2 id="trade-cost-title">Cost of the Decision</h2><p class="field-note">Costs go beyond what you pay. Consider what doing this could leave you unable to do, keep or pursue now, and how those sacrifices could affect your future. Use these seven areas of life to think through the effects on your wellbeing and progress towards your ultimate goal in life.</p><table class="trade-cost-table" aria-label="Seven areas of life to consider when examining the cost of this decision"><thead><tr><th scope="col">Area of life</th><th scope="col">What to consider</th></tr></thead><tbody>'+costAreas.map(([name,desc])=>'<tr><th scope="row">'+esc(name)+'</th><td>'+esc(desc)+'</td></tr>').join('')+'</tbody></table>'+part('immediate','Immediate cost','If you do this, what would you have to give up or delay immediately?','Consider the costs in these areas of life. What would doing this require you to give up, delay or make harder to sustain? Be as concrete and realistic as possible about what would change.','Example: Doing this would mean leaving the home I own, using part of my savings to fund the move, having less time with my family and friends, and maintaining a long-distance relationship with my partner.')+part('future','Future cost','What would you be giving up in the future if you did this?','Consider plans you may need to postpone, relationships or pursuits that could become harder to sustain, and directions that may become less available. Explain how doing this could create that limitation.','Example: If the move uses savings I had set aside for further study, I may need to postpone studying until I rebuild them. Living apart from my partner could also delay our plans to build a home together.')+'</section>'+legacy+'<p class="field-note trade-cost-footer">Your answers describe your current understanding. You can revise them as you learn more.</p></div>';
}
const incentiveRewardGroups=[
{title:"External rewards",description:"What doing this could give you access to or change in your circumstances.",areas:[
["Money and financial benefits","Income, savings, funding, benefits or reduced financial pressure."],
["Assets and living conditions","Ownership, housing, possessions or improved everyday conditions."],
["Position and authority","A title, formal responsibility or greater decision-making power."],
["Networks and connections","Access to people, professional relationships, introductions or opportunities."],
["Time and flexibility","More available time, flexible arrangements or fewer demands on your schedule."],
["Support and resources","Help, services, facilities or resources you could receive."]
]},
{title:"Psychological rewards",description:"How you expect to feel or experience yourself if you do this.",areas:[
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
function incentiveResponse(o,key){return key==="fit"?(o.incentives.fitUnknown?"unknown":""):o.incentives[key+"Response"]||"";}
function incentiveWritingActive(o,key){return !incentiveResponse(o,key);}
function incentivesComplete(){const o=choiceOption();return ["gain","relief","fit"].every(key=>incentiveResponse(o,key)||o.incentives[key].trim());}
function incentiveInvestigations(){const o=choiceOption(),labels={gain:"Clarify what you expect to gain if you do this.",relief:"Clarify what you hope to reduce, leave behind or avoid by doing this.",fit:"Explore how these rewards fit with the direction you want for your life."};return ["gain","relief","fit"].filter(key=>incentiveResponse(o,key)==="unknown").map(key=>labels[key]);}
function incentiveReflectionText(o){
const i=o.incentives;
const answer=key=>{const response=incentiveResponse(o,key);return (response==="none"?"[Nothing comes to mind]":response==="unknown"?(key==="fit"?"[I’m not sure yet]":"[I don’t know yet]"):i[key].trim()||"[Not answered]")+(response&&i[key].trim()?"\nEarlier "+(key==="fit"?"alignment":key)+" writing (inactive; not the current response):\n"+i[key]:"");};
return "Expected gains:\n"+answer("gain")+"\nWhat doing this could help reduce, leave behind or avoid:\n"+answer("relief")+"\nHow these rewards fit with my direction in life:\n"+answer("fit");
}
function earlierIncentives(){
const retained=data.options.filter(o=>(o.incentives.promises||[]).length||(o.incentives.avoid||[]).length||(o.id!==choiceOption().id&&(o.incentives.gain.trim()||o.incentives.relief.trim()||o.incentives.fit.trim()||o.incentives.fitUnknown)));
if(!retained.length&&!data.incentiveConcerns.length&&!data.incentiveConcernNone)return "";
return '<details class="incentive-earlier"><summary>Earlier Incentives notes</summary>'+retained.map(o=>'<section><h3>'+esc(o.name||'Untitled path')+'</h3>'+((o.incentives.promises||[]).length?'<strong>Earlier gain selections</strong>'+overviewList(legacyIncentiveLabels(o,'promises')):'')+((o.incentives.avoid||[]).length?'<strong>Earlier avoidance selections</strong>'+overviewList(legacyIncentiveLabels(o,'avoid')):'')+(o.id!==choiceOption().id&&(o.incentives.gain.trim()||o.incentives.relief.trim()||o.incentives.fit.trim()||o.incentives.fitUnknown)?'<pre class="brief">'+esc(incentiveReflectionText(o))+'</pre>':'')+'</section>').join('')+(data.incentiveConcerns.length||data.incentiveConcernNone?'<strong>Earlier incentives you did not want to keep reinforcing</strong>'+(data.incentiveConcernNone?'<p>None selected.</p>':overviewList(data.incentiveConcerns.map(id=>[...incentivePromises,...incentiveAvoid].find(x=>x.id===id)?.title||id))):'')+'</details>';
}
function incentives(){
const o=choiceOption(),i=o.incentives;
const guide='<details class="incentive-reward-guide" open><summary>Rewards to think about</summary><p class="field-note">Consider both external and psychological rewards, including what you could gain and what you could reduce or leave behind by doing this. These are starting points, not a complete list. Write whatever matters to you, in your own words.</p><table class="incentive-reward-table" aria-label="External and psychological reward guide"><thead><tr><th scope="col">Area</th><th scope="col">What to consider</th></tr></thead>'+incentiveRewardGroups.map(g=>'<tbody><tr class="incentive-reward-group"><th colspan="2" scope="rowgroup"><span>'+esc(g.title)+'</span><small>'+esc(g.description)+'</small></th></tr>'+g.areas.map(([area,meaning])=>'<tr><th scope="row">'+esc(area)+'</th><td>'+esc(meaning)+'</td></tr>').join('')+'</tbody>').join('')+'</table></details>';
const part=(key,question,help,placeholder,example,extra='')=>'<section class="incentive-writing-part"><h2 class="question"><label for="incentive-'+key+'">'+question+'</label></h2><p class="field-note" id="incentive-'+key+'-help">'+help+'</p>'+extra+'<p class="incentive-writing-example"><span>Example</span>'+example+'</p><textarea id="incentive-'+key+'" data-incentivetext="'+key+'" aria-describedby="incentive-'+key+'-help" placeholder="'+esc(placeholder)+'" '+(!incentiveWritingActive(o,key)?'disabled':'')+'>'+esc(i[key])+'</textarea>'+(key==='fit'?'<label class="incentive-fit-unknown"><input type="checkbox" data-incentivefitunknown aria-controls="incentive-fit" '+(i.fitUnknown?'checked':'')+'><span>I’m not sure yet</span></label>':'<div class="incentive-response-choices">'+[['none','Nothing comes to mind'],['unknown','I don’t know yet']].map(([value,label])=>'<label><input type="checkbox" data-incentiveresponse="'+key+'" value="'+value+'" aria-controls="incentive-'+key+'" '+(incentiveResponse(o,key)===value?'checked':'')+'><span>'+label+'</span></label>').join('')+'</div>')+'</section>';
return '<div class="card incentive-writing-card"><section class="incentive-choice-context"><div class="direction-label">You’re considering <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(o.name||'Your decision is not defined yet.')+'</p></section>'+guide+part('gain','What do you expect to gain if you do this?','Consider what you would receive or have access to, and how you expect that to make you feel.','Write what you expect to gain…','Higher pay, a senior title and useful professional connections. I would also feel recognised and more confident about my progress.')+part('relief','What are you hoping to reduce, leave behind or avoid by doing this?','Consider practical burdens and uncomfortable feelings that are influencing you.','Write what you want less of, or want to move away from…','Financial pressure and the feeling that I am falling behind.')+part('fit','How do these rewards fit with the direction you want for your life?','Consider whether what attracts you to doing this supports that direction, keeps you on a path you want to leave, or does both.','How do these rewards and relief fit with your direction?','The extra income could fund my move into independent design. But recognition for becoming a manager may make me more attached to that career path, even though I want my work to centre on designing.','<section class="incentive-direction-reference"><div class="direction-label">Your direction in life <button class="reference-edit" data-edit="1">Edit</button></div><p>'+esc(lifeDirectionText())+'</p></section>')+earlierIncentives()+'</div>';
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
 const guide='<details class="compounding-life-guide" open><summary>Areas of life to keep in view</summary><p class="field-note">Use the table to look for effects you might otherwise overlook. In each area, consider how continued attention, repeated experiences or neglect could build on what came before. The practical and psychological effects may influence one another.</p><p class="field-note">These are starting points, not a complete list or predictions about what will happen. Use whatever is relevant, and include anything else that matters to you.</p><table class="compounding-life-table" aria-label="Guide to reflection across areas of life"><thead><tr><th scope="col">Area of life</th><th scope="col">What to consider over time</th></tr></thead><tbody>'+compoundingAreas.map(([area,practical,psych])=>'<tr><th scope="row">'+esc(area)+'</th><td><p><strong>Practical effects</strong>'+esc(practical)+'</p><p><strong>Psychological effects</strong>'+esc(psych)+'</p></td></tr>').join('')+'</tbody></table></details>';
 const parts=compoundingQuestions.map(({key,question,help,example,placeholder})=>'<section class="compounding-writing-part"><h2 class="question"><label for="compounding-'+key+'">'+esc(question)+'</label></h2><p class="field-note" id="compounding-'+key+'-help">'+esc(help)+'</p><p class="compounding-writing-example" id="compounding-'+key+'-example"><span>Example</span>'+esc(example)+'</p><label class="compounding-write-label" for="compounding-'+key+'">Your reflection</label><textarea id="compounding-'+key+'" data-compoundingtext="'+key+'" aria-describedby="compounding-'+key+'-help compounding-'+key+'-example" placeholder="'+esc(placeholder)+'" '+(c[key+'Unknown']?'disabled':'')+'>'+esc(c[key])+'</textarea><label class="compounding-unknown"><input type="checkbox" data-compoundingunknown="'+key+'" aria-controls="compounding-'+key+'" '+(c[key+'Unknown']?'checked':'')+'><span>I don’t know yet</span></label></section>').join('');
 return '<div class="card compounding-writing-card"><section class="compounding-choice-context"><div class="direction-label">You’re considering <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(o.name||'Your decision is not defined yet.')+'</p></section>'+guide+parts+'</div>';
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
 const values=(key==="favourable"||key==="unfavourable")?o.consequence.branches?.[key]||[]:o.consequence[key]||[];
 if(!values.some(t=>t.trim()))return '[Not answered]';
 const end=values.findLastIndex(t=>t.trim());
 return values.slice(0,end+1).map(t=>t.trim()||'[Connection not yet explained]').join(' → ');
}
function consequenceReflectionText(o){
 const c=o.consequence;
 const first='Immediate change:\n'+(c.immediate?.trim()||'[Not answered]');
 const branches=['favourable','unfavourable'].map(k=>{
   const heading=k==='favourable'?'Favourable possibility':'Unfavourable possibility';
   const effects=consequenceSequenceText(o,k);
   return heading+'\n'+effects+'\nExploration: '+(c.branchEnded?.[k]?(c.branches[k].some(t=>t.trim())?'Finished by the user':'Finished; no further plausible effect identified, not proof of no effects'):'Still open');
 }).join('\n\n');
 const earlier=['positive','negative'].filter(k=>(c[k]||[]).some(t=>t.trim()));
 const historical=earlier.length?'\n\n### Earlier consequences (retained from the previous design; separate original starting changes)\n'+earlier.map(k=>(k==='positive'?'Earlier possible benefit':'Earlier possible difficulty')+'\n'+consequenceSequenceText(o,k)+'\nExploration: '+(c.ended?.[k]?'Finished by the user':'Still open')).join('\n\n'):'';
 return first+'\n\n'+branches+historical;
}
function consequences(){
 const o=choiceOption(),c=o.consequence;
 const guide='<section class="consequence-guide"><h2>Areas of life</h2><p class="field-note">These areas serve as a starting point for seeing how doing this could influence your life. Let them guide your thinking without limiting what you consider.</p><table class="compounding-life-table consequence-life-table" aria-label="Areas of life and guidance for further consequences"><thead><tr><th scope="col">Area of life</th><th scope="col">What to consider</th></tr></thead><tbody>'+compoundingAreas.map(([area],i)=>'<tr><th scope="row">'+esc(area)+'</th><td>'+esc(consequenceGuidance[i])+'</td></tr>').join('')+'</tbody></table></section>';
 const example=text=>'<div class="consequence-example"><span>EXAMPLE OF WHAT COULD FOLLOW</span><p>'+esc(text)+'</p></div>';
 const directions=['favourable','unfavourable'].map((key,i)=>'<section class="consequence-exploration" data-consequence-exploration="'+key+'" aria-labelledby="consequence-'+key+'-title"><div class="consequence-direction">'+String(i+1).padStart(2,'0')+' / '+(key==='favourable'?'FAVOURABLE POSSIBILITY':'UNFAVOURABLE POSSIBILITY')+'</div><h3 id="consequence-'+key+'-title">'+(key==='favourable'?'What favourable change could this lead to?':'What unfavourable change could this lead to?')+'</h3>'+example(key==='favourable'?'Higher salary → More money saved → Greater financial security':'Higher salary → Higher lifestyle spending → Greater dependence on maintaining that income')+'<div class="consequence-entries"></div><div class="consequence-finished" hidden><span>That’s it. You can still edit your answers.</span><button type="button" class="secondary" data-consequence-reopen>Explore further</button></div></section>').join('');
 const oldNotes=(c.positive||[]).some(t=>t.trim())||(c.negative||[]).some(t=>t.trim())?'<p class="consequence-legacy-hint">Your earlier consequence notes are preserved in your decision context. They have not been assigned to these new paths.</p>':'';
 return '<div class="card consequence-card"><h2>What could this lead to?</h2><section class="compounding-choice-context"><div class="direction-label">You’re considering <button class="reference-edit" data-edit="0">Edit</button></div><p>'+esc(o.name||'Your decision is not defined yet.')+'</p></section>'+guide+'<section class="consequence-instructions"><h2>Lay out what follows</h2><p>Write down the first change this could bring. Then consider what it might set in motion across different Areas of Life, one step at a time.</p><p class="field-note">Continue while you can reasonably explain how one change could lead to another. Select ‘That’s it’ when you can no longer make that connection.</p></section><section class="consequence-immediate"><h2>Immediate change</h2><label class="type-question" for="consequence-immediate-input">What is one immediate change this could bring?</label><div class="consequence-example"><span>EXAMPLE</span><p>My monthly salary could increase.</p></div><textarea id="consequence-immediate-input" rows="2" placeholder="Write your immediate change here…">'+esc(c.immediate)+'</textarea></section><section class="consequence-next"><h2>Then what?</h2><p class="muted">The same change can lead to different consequences, some favourable and others unfavourable.</p><div class="consequence-origin" '+(!c.immediate.trim()?'hidden':'')+'><span>YOUR IMMEDIATE CHANGE</span><p data-consequence-origin>'+esc(c.immediate)+'</p></div></section>'+directions+oldNotes+'<div class="consequence-status" role="status" aria-live="polite"></div></div>';
}
let consequenceResizeObserver;
function bindConsequences(){
 consequenceResizeObserver?.disconnect();
 const root=document.querySelector('.consequence-card');
 if(!root)return;
 const c=choiceOption().consequence,status=root.querySelector('[role="status"]');
 const initial=root.querySelector('#consequence-immediate-input'),origin=root.querySelector('.consequence-origin');
 initial.oninput=()=>{
   c.immediate=initial.value;
   origin.hidden=!c.immediate.trim();
   origin.querySelector('[data-consequence-origin]').textContent=c.immediate;
   save();
 };
 const updateMore=entry=>{
   if(entry.summary.hidden||entry.more.getAttribute('aria-expanded')==='true')return;
   entry.more.hidden=entry.answer.scrollHeight<=entry.answer.clientHeight+1;
 };
 root.querySelectorAll('[data-consequence-exploration]').forEach(section=>{
   const key=section.dataset.consequenceExploration,list=section.querySelector('.consequence-entries');
   const finished=section.querySelector('.consequence-finished'),reopen=section.querySelector('[data-consequence-reopen]');
   const entries=[];
   let serial=0;
   const persist=()=>{c.branches[key]=entries.map(entry=>entry.input.value);save();};
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
     while(entries.length>1&&!entries.at(-1).input.value.trim())entries.pop().node.remove();
     c.branchEnded[key]=true;
     entries.forEach(entry=>{compact(entry);if(!entry.input.value.trim())entry.editor.hidden=true;entry.stop.hidden=true;});
     finished.querySelector("span").textContent=entries.some(entry=>entry.input.value.trim())?"That’s it. You can still edit your answers.":"No further plausible effect identified. This does not mean there are no effects.";
     finished.hidden=false;persist();
     status.textContent='The '+key+' exploration is finished. Your answers remain editable.';
     reopen.focus();
   };
   const add=(value='',collapsed=false)=>{
     const position=entries.length,id='consequence-'+key+'-'+(++serial),first=position===0;
     const question=first?'': 'Because of that change, what else could happen?';
     const helper=first?'':'Describe the next change, whether it comes from what you do, how others respond, or what changes around you.';
     const placeholder=first?'Write what could follow…':'Continue here…';
     const node=document.createElement('div');node.className='consequence-entry'+(first?' consequence-first-entry':'');
     node.innerHTML='<div class="consequence-summary" hidden><div class="consequence-summary-head"><span>'+(first?'First possibility':'Because of that change')+'</span><button type="button" class="consequence-text-action" data-consequence-edit aria-label="Edit '+key+' possibility '+(position+1)+'">Edit</button></div><p class="consequence-answer clamped" id="'+id+'-answer"></p><button type="button" class="consequence-text-action" data-consequence-more aria-expanded="false" aria-controls="'+id+'-answer" hidden>Show more</button></div><div class="consequence-editor">'+(first?'<div class="consequence-continuation-head"><button type="button" class="secondary" data-consequence-finish '+(c.branchEnded[key]?'hidden':'')+'>That’s it</button></div>':'<div class="consequence-continuation-head"><span>Then what?</span><button type="button" class="secondary" data-consequence-finish '+(c.branchEnded[key]?'hidden':'')+'>That’s it</button></div><label for="'+id+'">'+question+'</label><p class="field-note" id="'+id+'-help">'+helper+'</p>')+'<textarea id="'+id+'" rows="2" placeholder="'+placeholder+'" '+(first?'aria-label="'+(key==='favourable'?'Favourable':'Unfavourable')+' possibility"':'aria-describedby="'+id+'-help"')+'></textarea></div>';
     list.append(node);
     const entry={node,summary:node.querySelector('.consequence-summary'),editor:node.querySelector('.consequence-editor'),input:node.querySelector('textarea'),answer:node.querySelector('.consequence-answer'),more:node.querySelector('[data-consequence-more]'),stop:node.querySelector('[data-consequence-finish]')};
     entry.input.value=value;entries.push(entry);
     entry.input.onfocus=()=>{
       open(entry);
       if(!c.branchEnded[key]&&entry.input.value.trim()&&entry===entries.at(-1)){add();persist();}
     };
     entry.input.oninput=()=>{
       resize(entry);entry.answer.textContent=entry.input.value;
       if(!c.branchEnded[key]){
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
     if(entry.stop)entry.stop.onclick=finish;
     entry.more.onclick=()=>{
       const expanded=entry.more.getAttribute('aria-expanded')!=='true';
       entry.more.setAttribute('aria-expanded',String(expanded));entry.more.textContent=expanded?'Show less':'Show more';entry.answer.classList.toggle('clamped',!expanded);
     };
     if(collapsed)compact(entry);else resize(entry);
     return entry;
   };
   c.branches[key].forEach(value=>add(value,Boolean(value.trim())));
   if(!c.branchEnded[key]&&entries.at(-1).input.value.trim())add();
   finished.hidden=!c.branchEnded[key];
   if(c.branchEnded[key]){entries.forEach(entry=>{if(!entry.input.value.trim())entry.editor.hidden=true;});finished.querySelector("span").textContent=entries.some(entry=>entry.input.value.trim())?"That’s it. You can still edit your answers.":"No further plausible effect identified. This does not mean there are no effects.";}
   reopen.onclick=()=>{
     c.branchEnded[key]=false;finished.hidden=true;entries.forEach(entry=>entry.stop.hidden=false);
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
 const rows=data.devilsAdvocate.outcomes.map(entry=>{
   const id='advocate-'+entry.id;
   return '<article class="advocate-outcome" aria-label="Outcome reflection">'+'<section class="advocate-writing-part"><div class="advocate-part-label">The outcome</div><label class="advocate-question" for="'+id+'-outcome">Looking at your life direction, what would failure in this decision look like?</label><p class="field-note" id="'+id+'-outcome-help">Describe a situation you could end up in that would take you further from what you want to build or protect.</p><details class="advocate-example" open><summary>Example of an outcome</summary><p>The business is bigger, but I spend most of my time managing staffing problems. I rarely bake anymore and keep missing time with my family.</p></details><textarea id="'+id+'-outcome" data-advocatetext="outcome" data-advocateid="'+esc(entry.id)+'" aria-describedby="'+id+'-outcome-help" placeholder="I could end up…">'+esc(entry.outcome)+'</textarea></section><section class="advocate-writing-part advocate-connection"><div class="advocate-part-label">The connection</div><label class="advocate-question" for="'+id+'-connection">Could doing this lead you towards that outcome? If so, how?</label><p class="field-note" id="'+id+'-connection-help">Explain which parts of the outcome doing this could contribute to, and how.</p><details class="advocate-example" open><summary>Example of a possible connection</summary><p>A second bakery would need more staff and coordination. If I struggle to find reliable managers, I could end up covering absences and handling problems across both locations, leaving less time for baking and family.</p></details><textarea id="'+id+'-connection" data-advocatetext="connection" data-advocateid="'+esc(entry.id)+'" aria-describedby="'+id+'-connection-help" placeholder="Write how it could happen, if you see a connection…" '+(entry.connectionResponse?'disabled':'')+'>'+esc(entry.connection)+'</textarea><div class="advocate-responses" role="group" aria-label="Other responses to the connection question">'+['unknown','no'].map(response=>'<button class="secondary" type="button" id="'+id+'-'+response+'" data-advocateresponse="'+response+'" aria-controls="'+id+'-connection" aria-pressed="'+(entry.connectionResponse===response)+'">'+esc(advocateResponseLabel(response))+'</button>').join('')+'</div>'+(entry.connectionResponse?'<button class="edit-link advocate-return" type="button" data-advocatewrite aria-controls="'+id+'-connection">Return to writing</button>':'')+'</section></article>';
 }).join('');
 return '<div class="card advocate-card"><div class="advocate-choice"><span>You’re considering</span><p>'+esc(choiceOption().name||'Your decision is not defined yet.')+'</p></div><h2>The Devil\'s Advocate</h2><p class="advocate-example-context">The examples below consider someone opening a second neighbourhood bakery, hoping to grow the business while keeping time for hands-on craft, their community and family.</p><div class="divider"></div>'+rows+'</div>';
}
function advocateResponseLabel(response){return response==='unknown'?'I do not know yet':response==='no'?'No, I don’t see this leading towards that outcome':'';}
function advocateEntries(){return data.devilsAdvocate.outcomes.filter(entry=>entry.outcome.trim()||entry.connection.trim()||entry.connectionResponse);}
function earlierAdvocateEntries(){return data.devilsAdvocate.earlierOutcomes.filter(entry=>entry.outcome.trim()||entry.connection.trim());}
function advocateConnectionText(entry){return entry.connectionResponse?'Connection assessment (your view): '+advocateResponseLabel(entry.connectionResponse):'Possible connection: '+(entry.connection.trim()||'[Not answered]');}
function advocateReflectionText(entry){return 'Outcome: '+(entry.outcome.trim()||'[Not answered]')+'\n'+advocateConnectionText(entry);}
// A system-label revision is not an edit to the user's answer. Compare only the
// two complete known formats for this exact current structured response. Never
// normalize arbitrary writing or change stored source/history quotations.
function sameReflectionText(id,left,right){
 if(left===right)return true;
 const entry=[...advocateEntries(),...earlierAdvocateEntries()].find(e=>'devils-advocate-'+e.id===id);
 if(!entry||entry.connectionResponse!=='no')return false;
 const current=advocateReflectionText(entry);
 const previous='Outcome: '+(entry.outcome.trim()||'[Not answered]')+'\nConnection assessment (your view): No, I don’t see this choice leading towards that outcome';
 return [current,previous].includes(left)&&[current,previous].includes(right);
}
function advocateContextText(){
 const entry=advocateEntries()[0],earlier=earlierAdvocateEntries();
 let text=entry?advocateReflectionText(entry):'[Not answered]';
 if(entry?.connectionResponse&&entry.connection.trim())text+='\nEarlier connection writing (retained; not the current response):\n'+entry.connection.trim();
 if(earlier.length)text+='\n\n### Earlier additional outcome reflections (retained)\n'+earlier.map(advocateReflectionText).join('\n\n');
 return text;
}
function advocateComplete(){const entry=data.devilsAdvocate.outcomes[0];return Boolean(entry.outcome.trim()&&(entry.connectionResponse||entry.connection.trim()));}
function advocateInvestigations(){const entry=data.devilsAdvocate.outcomes[0];return entry.connectionResponse==='unknown'?[(choiceOption().name||'Your decision')+': Explore whether doing this could lead towards the outcome pictured in The Devil’s Advocate.'+(entry.outcome.trim()?' Outcome: '+entry.outcome.trim():'')]:[];}
function bindAdvocate(){
 document.querySelectorAll('[data-advocatetext]').forEach(e=>e.oninput=()=>{
   const entry=data.devilsAdvocate.outcomes[0];
   if(e.disabled)return;
   entry[e.dataset.advocatetext]=e.value;save();
 });
 document.querySelectorAll('[data-advocateresponse]').forEach(b=>b.onclick=()=>{
   const entry=data.devilsAdvocate.outcomes[0],response=b.dataset.advocateresponse;
   entry.connectionResponse=entry.connectionResponse===response?'':response;
   render();document.getElementById(b.id)?.focus();
 });
 document.querySelectorAll('[data-advocatewrite]').forEach(b=>b.onclick=()=>{
   const entry=data.devilsAdvocate.outcomes[0];entry.connectionResponse='';
   render();document.getElementById('advocate-'+entry.id+'-connection')?.focus();
 });
}
function stressValue(row,optionId=choiceOption().id){
 const value=data.stressTest.ratings[row.id]?.[optionId];
 return stressChoices.some(c=>c.value===value)?value:"";
}
function stressSummaryUnknown(optionId=choiceOption().id){return data.stressTest.summaryUnknownByOption[optionId]===true;}
function stressSummaryNeeded(optionId=choiceOption().id){return stressRows.some(r=>stressValue(r,optionId)!=="no-effect");}
function stressComplete(){return stressRows.every(r=>stressValue(r))&&(!stressSummaryNeeded()||stressSummaryUnknown()||Boolean(stressNotes().trim()));}
function stressNotes(optionId=choiceOption().id){return data.stressTest.notesByOption[optionId]||"";}
function stressInvestigations(){return [...stressRows.filter(r=>stressValue(r)==="unknown").map(r=>(choiceOption().name||"Your decision")+": Find out what setback in "+r.label.toLowerCase()+" you could manage before continuing becomes unworkable or crosses an important boundary."),...(stressSummaryUnknown()?["Clarify the make-or-break conditions and limits you could manage if you did this."]:[])];}
function stressStatus(){
 const values=stressRows.map(r=>stressValue(r));
 if(values.includes("beyond"))return "A tolerance limit is flagged";
 if(values.includes("little-room"))return "Little room remains in some conditions";
 if(values.includes("unknown")||stressSummaryUnknown())return "Some limits are unknown";
 return stressComplete()?"Room remains in the setbacks considered":values.some(Boolean)?"Partly assessed":"Not assessed";
}
function earlierStressText(){
 const earlier=data.stressTest.earlier,lines=[];
 earlierStressRows.forEach(r=>Object.entries(earlier.ratings?.[r.id]||{}).forEach(([id,value])=>{
  if(value)lines.push("- "+r.label+" — "+(data.options.find(o=>o.id===id)?.name||"Earlier path "+id)+": "+(earlierStressChoices.find(c=>c.value===value)?.label||value));
 }));
 if(earlier.leastRoom?.trim())lines.push("Least room for things going wrong (original question):\n"+earlier.leastRoom);
 return lines.join("\n");
}
function stressContextText(){
 const record=o=>"### "+(o.name||"Your decision")+"\n"+stressRows.map(r=>"- "+r.label+" — "+r.description+" Assessment: "+(stressChoices.find(c=>c.value===stressValue(r,o.id))?.label||"[Not answered]")).join("\n")+"\n"+stressWritingTitle+"\n"+(stressSummaryUnknown(o.id)?"[I don’t know yet]"+(stressNotes(o.id).trim()?"\nEarlier margin writing (inactive; not the current response):\n"+stressNotes(o.id):""):stressNotes(o.id)||(!stressSummaryNeeded(o.id)?"[No meaningful effect reported for all listed conditions; no make-or-break note provided]":"[Not answered]"));
 const earlierPaths=data.options.filter(o=>o.id!==choiceOption().id&&(stressNotes(o.id)||stressSummaryUnknown(o.id)||stressRows.some(r=>stressValue(r,o.id))));
 return "\n## Stress Test\nRoom left after plausible setbacks, based on the user's current understanding. Ratings are not scores or proof of safety. Larger buffers do not establish that you should do this. Separate assessments can miss setbacks occurring together; unknown limits remain unresolved.\n"+record(choiceOption())+(earlierPaths.length?"\n### Earlier margin assessments for retained paths\n"+earlierPaths.map(record).join("\n"):"")+"\nResponse guide:\n"+stressChoices.map(c=>"- "+c.label+": "+c.description).join("\n")+(earlierStressText()?"\n### Earlier Stress Test (retained; original conditions and pressure scale)\n"+earlierStressText():"");
}
function boundaryAnswer(r){const c=r.check,o=choiceOption();return c&&c.boundaryText===r.text&&c.focalId===o.id&&c.focalText===o.name?c.value:'';}
function boundaryLabel(r){return {yes:'Respected',no:'Conflict recorded',unknown:'Not sure yet'}[boundaryAnswer(r)]||'Not assessed';}
function setBoundaryAnswer(id,value){
 const r=data.rules.find(r=>r.id===id);if(!r)return;const o=choiceOption();
 if(r.check&&!boundaryAnswer(r)){r.checkHistory=[...(r.checkHistory||[]),r.check];r.check=null;}
 r.check={...(r.check||{note:''}),value,boundaryText:r.text,focalId:o.id,focalText:o.name};save();
}
function boundaryCheckForm(){
 if(data.hasHardBoundaries!=='yes'||!data.rules.some(r=>r.text.trim()))return '';
 return '<section class="boundary-check"><h2>Check your hard boundaries</h2><p class="field-note">Would doing this respect what you need to protect?</p>'+data.rules.filter(r=>r.text.trim()).map(r=>'<div class="boundary-check-row"><p>'+esc(r.text)+'</p><label class="field"><span>Your assessment</span><select data-boundarycheck="'+esc(r.id)+'"><option value="">Choose…</option>'+[['yes','Respects this boundary'],['no','Conflicts with this boundary'],['unknown','I’m not sure yet']].map(([value,label])=>'<option value="'+value+'" '+(boundaryAnswer(r)===value?'selected':'')+'>'+label+'</option>').join('')+'</select></label>'+(['no','unknown'].includes(boundaryAnswer(r))?'<label class="field"><span>'+esc(boundaryAnswer(r)==='no'?'What is in conflict?':'What do you still need to check?')+' <small>(optional)</small></span><textarea data-boundarynote="'+esc(r.id)+'">'+esc(r.check.note||'')+'</textarea></label>':'')+(r.check&&!boundaryAnswer(r)?'<details><summary>Earlier boundary assessment</summary><p>'+esc(r.check.boundaryText)+' — '+esc(r.check.value)+'</p><p>'+esc(r.check.note||'')+'</p></details>':'')+'</div>').join('')+'</section>';
}
function stressTest(){
 const o=choiceOption();
 const context='<section class="stress-context" aria-label="Decision context"><div class="stress-context-choice"><span>What you’re considering</span><p>'+esc(o.name||'Not answered yet.')+'</p></div><div><span>Decision aim</span><p>'+esc(data.decisionAim||'Not answered yet.')+'</p></div><div><span>Life direction</span><p>'+esc(lifeDirectionText())+'</p></div></section>';
 const body=stressRows.map(r=>'<tr><th scope="row"><label for="stress-'+r.id+'">'+r.label+'</label><p id="stress-'+r.id+'-description">'+r.description+'</p></th><td><select id="stress-'+r.id+'" aria-describedby="stress-'+r.id+'-description" data-stressrow="'+r.id+'" data-stressoption="'+esc(o.id)+'"><option value="">Select a response</option>'+stressChoices.map(c=>'<option value="'+c.value+'" '+(stressValue(r)===c.value?'selected':'')+'>'+c.label+'</option>').join('')+'</select></td></tr>').join('');
 const guide='<section class="stress-response-guide" aria-label="Response guide"><h3>Response guide</h3><dl>'+stressChoices.map(c=>'<div><dt>'+c.label+'</dt><dd>'+c.description+'</dd></div>').join('')+'</dl></section>';
 return '<div class="card stress-card"><h2>Stress Test</h2>'+context+'<h3 class="stress-question">If these conditions became less favourable, how much room would you have left?</h3><p class="muted stress-helper">Picture a plausible setback for each condition. Consider whether you could continue with what you’re considering without crossing an important boundary.</p><div class="stress-assessment"><table class="stress-table"><thead><tr><th scope="col">If conditions change</th><th scope="col">Your assessment</th></tr></thead><tbody>'+body+'</tbody></table>'+guide+'</div><section class="stress-writing"><label for="stress-notes" class="stress-question">'+stressWritingTitle+'</label><p id="stress-writing-help" class="muted">'+stressWritingHelp+'</p><details class="advocate-example stress-example"><summary>See an example</summary><p>If opening were delayed by two months, I could cover one more month of rent after that. A longer delay would use savings I need for essential expenses. I don’t yet know whether replacing equipment would exhaust that remaining buffer.</p></details><textarea id="stress-notes" data-stresssummary aria-describedby="stress-writing-help" placeholder="Write your thoughts here…" '+(stressSummaryUnknown()?'disabled':'')+'>'+esc(stressNotes())+'</textarea><label class="stress-summary-unknown"><input type="checkbox" data-stresssummaryunknown aria-controls="stress-notes" '+(stressSummaryUnknown()?'checked':'')+'><span>I don’t know yet</span></label></section>'+boundaryCheckForm()+'<p class="stress-footnote">Based on the setbacks you pictured and your current understanding.</p></div>';
}

function judgmentConditionalRows(){
// G03/G05 replace every legacy-category gate; the original rows are historical only.
return [];
}
function judgmentTable(rows){
const answer=id=>data.judgment.answers[id]||"";
return '<div class="judgment-table-wrap"><table class="judgment-table"><thead><tr><th></th><th>No</th><th>Maybe</th><th>Yes</th></tr></thead><tbody>'+rows.map(r=>'<tr><td>'+esc(r.question)+'</td>'+["no","maybe","yes"].map(v=>'<td><label class="judgment-radio"><input type="radio" name="judgment-'+r.id+'" data-judgment="'+r.id+'" aria-label="'+esc(r.question+' — '+v)+'" value="'+v+'" '+(answer(r.id)===v?"checked":"")+'><span></span></label></td>').join("")+'</tr>').join("")+'</tbody></table></div>'
}
function judgmentSocialActive(){return data.judgment.socialContext.response==="yes";}
function judgmentSocialText(){return judgmentSocialChoices.find(([value])=>value===data.judgment.socialContext.response)?.[1]||"[Not answered]";}
function judgmentSocialComplete(){const context=data.judgment.socialContext;return Boolean(context.response&&(!judgmentSocialActive()||context.detail.trim()));}
function judgmentSocialForm(){
 const context=data.judgment.socialContext;
 return '<div class="judgment-social"><fieldset class="judgment-evidence"><legend>'+esc(judgmentSocialCopy.question)+'</legend><div class="judgment-evidence-choices">'+judgmentSocialChoices.map(([value,label])=>'<label><input type="radio" name="judgment-social" data-judgmentsocial id="judgment-social-'+value+'" aria-controls="judgmentSocialFollowup" value="'+value+'" '+(context.response===value?'checked':'')+'><span>'+esc(label)+'</span></label>').join('')+'</div></fieldset><div class="judgment-challenge-field" id="judgmentSocialFollowup" '+(judgmentSocialActive()?'':'hidden')+'><label for="judgmentSocialDetail">'+esc(judgmentSocialCopy.followup)+'</label><p class="field-note" id="judgmentSocialHelp">'+esc(judgmentSocialCopy.help)+'</p><div class="judgment-example"><small>Example</small><p>'+esc(judgmentSocialCopy.example)+'</p></div><textarea id="judgmentSocialDetail" data-judgmentsocialtext aria-describedby="judgmentSocialHelp" placeholder="Describe whose influence matters and how it affects your view…">'+esc(context.detail)+'</textarea></div><span class="judgment-live" id="judgmentSocialStatus" role="status" aria-live="polite"></span></div>';
}
function bindJudgmentSocial(){
 document.querySelectorAll('[data-judgmentsocial]').forEach(e=>e.onchange=()=>{
  if(!judgmentSocialChoices.some(([value])=>value===e.value))return;
  data.judgment.socialContext.response=e.value;judgmentReviewChanged();save();
  const followup=$("#judgmentSocialFollowup"),status=$("#judgmentSocialStatus");
  if(followup)followup.hidden=!judgmentSocialActive();
  if(status)status.textContent=judgmentSocialActive()?"Yes selected. The people-influence writing follow-up is available.":judgmentSocialText()+" selected. The people-influence follow-up is hidden; earlier writing is retained.";
 });
 document.querySelectorAll('[data-judgmentsocialtext]').forEach(e=>e.oninput=()=>{data.judgment.socialContext.detail=e.value;judgmentReviewChanged();save();});
}
function judgmentSocialOverview(){return '<h4>Other people’s influence</h4><p><strong>Reported relevance:</strong> '+esc(judgmentSocialText())+'</p>'+(judgmentSocialActive()?'<p>'+esc(data.judgment.socialContext.detail.trim()||'Not answered yet.')+'</p>':'');}
function judgmentSocialContextText(){
 const context=data.judgment.socialContext,out=["\n### "+judgmentSocialCopy.question+"\n"+judgmentSocialText(),"Social-context capture version: 1"];
 if(judgmentSocialActive())out.push("\n### "+judgmentSocialCopy.followup+"\n"+(context.detail.trim()||"[Not answered]"));
 else{
  out.push("\n### People-influence follow-up\n"+(context.response?"Not asked for the current "+judgmentSocialText()+" response.":"Not asked; no response selected."));
  if(context.detail.trim())out.push("\n### Earlier people-influence writing (inactive; follow-up hidden)\n"+context.detail);
 }
 out.push("\nThese are the user's reports. Nothing comes to mind does not prove there is no influence. Not sure is unresolved. Advice, relationships and responsibilities may deserve weight; no bias or psychological cause is established.");
 const earlier=judgmentConditional.filter(row=>["seen","social"].includes(row.id)&&data.judgment.answers[row.id]);
 if(earlier.length)out.push("\n### Earlier people-influence checks (retained; replaced by G03)\n"+earlier.map(row=>"- "+row.question+"\nSaved response: "+({no:"No — I would see it the same way",maybe:"Maybe — I’m not sure",yes:"Yes — I would see it differently"}[data.judgment.answers[row.id]]||String(data.judgment.answers[row.id]))).join("\n")+"\nThese historical answers are not responses to the new social-context question or active influence signals.");
 return out.join("\n");
}
function judgmentContextActive(key){return data.judgment[key].response==="yes";}
function judgmentContextLabel(key){return judgmentSocialChoices.find(([value])=>value===data.judgment[key].response)?.[1]||"[Not answered]";}
function judgmentContextComplete(key){const context=data.judgment[key];return Boolean(context.response&&(!judgmentContextActive(key)||context.detail.trim()));}
function judgmentAdditionalComplete(){return Object.keys(judgmentAdditionalCopy).every(judgmentContextComplete);}
function judgmentAdditionalForm(key){
 const context=data.judgment[key],copy=judgmentAdditionalCopy[key],id="judgment-"+key;
 return '<div class="judgment-social"><fieldset class="judgment-evidence"><legend>'+esc(copy.question)+'</legend><div class="judgment-evidence-choices">'+judgmentSocialChoices.map(([value,label])=>'<label><input type="radio" name="'+id+'" data-judgmentcontext="'+key+'" id="'+id+'-'+value+'" aria-controls="'+id+'-followup" value="'+value+'" '+(context.response===value?'checked':'')+'><span>'+esc(label)+'</span></label>').join('')+'</div></fieldset><div class="judgment-challenge-field" id="'+id+'-followup" '+(judgmentContextActive(key)?'':'hidden')+'><label for="'+id+'-detail">'+esc(copy.followup)+'</label><p class="field-note" id="'+id+'-help">'+esc(copy.help)+'</p><div class="judgment-example"><small>Example</small><p>'+esc(copy.example)+'</p></div><textarea id="'+id+'-detail" data-judgmentcontexttext="'+key+'" aria-describedby="'+id+'-help" placeholder="'+esc(copy.placeholder)+'">'+esc(context.detail)+'</textarea></div><span class="judgment-live" id="'+id+'-status" role="status" aria-live="polite"></span></div>';
}
function bindJudgmentContexts(){
 document.querySelectorAll('[data-judgmentcontext]').forEach(e=>e.onchange=()=>{
  const key=e.dataset.judgmentcontext;
  if(!judgmentAdditionalCopy[key]||!judgmentSocialChoices.some(([value])=>value===e.value))return;
  data.judgment[key].response=e.value;judgmentReviewChanged();save();
  const followup=$("#judgment-"+key+"-followup"),status=$("#judgment-"+key+"-status");
  if(followup)followup.hidden=!judgmentContextActive(key);
  if(status)status.textContent=judgmentContextLabel(key)+" selected. "+(judgmentContextActive(key)?judgmentAdditionalCopy[key].title+" writing is available.":"The follow-up is hidden; earlier writing is retained.");
 });
 document.querySelectorAll('[data-judgmentcontexttext]').forEach(e=>e.oninput=()=>{const key=e.dataset.judgmentcontexttext;if(!judgmentAdditionalCopy[key])return;data.judgment[key].detail=e.value;judgmentReviewChanged();save();});
}
function judgmentAdditionalOverview(key){return '<h4>'+esc(judgmentAdditionalCopy[key].title)+'</h4><p><strong>Reported relevance:</strong> '+esc(judgmentContextLabel(key))+'</p>'+(judgmentContextActive(key)?'<p>'+esc(data.judgment[key].detail.trim()||'Not answered yet.')+'</p>':'');}
function judgmentAdditionalContextText(key){
 const context=data.judgment[key],copy=judgmentAdditionalCopy[key],out=["\n### "+copy.question+"\n"+judgmentContextLabel(key),copy.title+" capture version: 1"];
 if(judgmentContextActive(key))out.push("\n### "+copy.followup+"\n"+(context.detail.trim()||"[Not answered]"));
 else{
  out.push("\n### "+copy.title+" follow-up\n"+(context.response?"Not asked for the current "+judgmentContextLabel(key)+" response.":"Not asked; no response selected."));
  if(context.detail.trim())out.push("\n### Earlier "+copy.title+" writing (inactive; follow-up hidden)\n"+context.detail);
 }
 out.push("\nThese are the user's reports. Nothing comes to mind does not establish absence. Not sure is unresolved. "+copy.boundary);
 const earlier=[...judgmentOriginalCore,...judgmentConditional].filter(row=>copy.legacyIds.includes(row.id)&&data.judgment.answers[row.id]);
 if(earlier.length)out.push("\n### "+copy.historyTitle+"\n"+earlier.map(row=>"- "+row.question+"\nSaved response: "+({no:"No — I would see it the same way",maybe:"Maybe — I’m not sure",yes:"Yes — I would see it differently"}[data.judgment.answers[row.id]]||String(data.judgment.answers[row.id]))).join("\n")+"\nThese historical answers are not responses to the new context question or active influence signals.");
 return out.join("\n");
}
function judgmentReasonActive(){return data.judgment.evidenceEncountered!=="unsure";}
function judgmentEvidenceText(){return judgmentEvidenceChoices.find(([value])=>value===data.judgment.evidenceEncountered)?.[1]||"[Not answered]";}
function judgmentReasonHelp(){return data.judgment.evidenceEncountered==="yes"?judgmentChallengeCopy.yesHelp:data.judgment.evidenceEncountered==="none"?judgmentChallengeCopy.noneHelp:judgmentChallengeCopy.defaultHelp;}
function judgmentReasonExample(){return data.judgment.evidenceEncountered==="yes"?judgmentChallengeCopy.yesExample:judgmentChallengeCopy.defaultExample;}
function judgmentChallengeComplete(){return Boolean(data.judgment.evidenceEncountered&&(!judgmentReasonActive()||data.judgment.strongestCase.trim())&&data.judgment.changeEvidence.trim());}
function judgmentInvestigations(){return [...(data.judgment.evidenceEncountered==="unsure"?["Clarify whether information or experience you have encountered challenges your current view."]:[]),...(data.judgment.socialContext.response==="unsure"?["Clarify whether other people’s views, expectations or progress are affecting how you see this decision."]:[]),...Object.keys(judgmentAdditionalCopy).filter(key=>data.judgment[key].response==="unsure").map(key=>judgmentAdditionalCopy[key].investigation)];}
function judgmentReviewChanged(){data.reviewed=data.reviewed.filter(i=>i!==8);}
function judgmentChallengeForm(){
 const example=text=>'<div class="judgment-example"><small>Example</small><p>'+esc(text)+'</p></div>';
 return '<div class="judgment-challenge"><fieldset class="judgment-evidence"><legend>'+esc(judgmentChallengeCopy.encountered)+'</legend><div class="judgment-evidence-choices">'+judgmentEvidenceChoices.map(([value,label])=>'<label><input type="radio" name="judgment-evidence" data-judgmentevidence id="judgment-evidence-'+value+'" value="'+value+'" '+(data.judgment.evidenceEncountered===value?'checked':'')+'><span>'+esc(label)+'</span></label>').join('')+'</div></fieldset><div class="judgment-challenge-field" id="judgmentReasonFollowup" '+(judgmentReasonActive()?'':'hidden')+'><label for="judgmentStrongest">'+esc(judgmentChallengeCopy.strongest)+'</label><p class="field-note" id="judgmentReasonHelp">'+esc(judgmentReasonHelp())+'</p><div class="judgment-example"><small>Example</small><p id="judgmentReasonExample">'+esc(judgmentReasonExample())+'</p></div><textarea id="judgmentStrongest" data-judgmenttext="strongestCase" aria-describedby="judgmentReasonHelp" placeholder="Write your reasoning here…">'+esc(data.judgment.strongestCase)+'</textarea></div><div class="judgment-challenge-field"><label for="judgmentChange">'+esc(judgmentChallengeCopy.change)+'</label><p class="field-note" id="judgmentChangeHelp">'+esc(judgmentChallengeCopy.changeHelp)+'</p>'+example(judgmentChallengeCopy.changeExample)+'<textarea id="judgmentChange" data-judgmenttext="changeEvidence" aria-describedby="judgmentChangeHelp" placeholder="Describe the evidence and what it would change…">'+esc(data.judgment.changeEvidence)+'</textarea></div><span class="judgment-live" id="judgmentChallengeStatus" role="status" aria-live="polite"></span></div>';
}
function bindJudgmentChallenge(){
 document.querySelectorAll('[data-judgmentevidence]').forEach(e=>e.onchange=()=>{
  if(!judgmentEvidenceChoices.some(([value])=>value===e.value))return;
  data.judgment.evidenceEncountered=e.value;judgmentReviewChanged();save();
  const followup=$("#judgmentReasonFollowup");if(followup)followup.hidden=!judgmentReasonActive();
  const help=$("#judgmentReasonHelp"),example=$("#judgmentReasonExample"),status=$("#judgmentChallengeStatus");
  if(help)help.textContent=judgmentReasonHelp();if(example)example.textContent=judgmentReasonExample();
  if(status)status.textContent=judgmentReasonActive()?judgmentEvidenceText()+" selected. "+judgmentReasonHelp():"Not sure selected. The strongest-reason follow-up is hidden; earlier writing is retained. The change-evidence question remains available.";
 });
}
function judgmentChallengeOverview(){
 return '<p><strong>Contrary information encountered:</strong> '+esc(judgmentEvidenceText())+'</p>'+(judgmentReasonActive()?'<h4>Strongest reason your current view could be wrong</h4><p>'+esc(data.judgment.strongestCase.trim()||'Not answered yet.')+'</p>':'')+'<h4>Evidence that would most seriously change your view</h4><p>'+esc(data.judgment.changeEvidence.trim()||'Not answered yet.')+'</p>';
}
function judgmentContextText(){
 const j=data.judgment,out=["\n## Judgment Check","Challenge capture version: 1",judgmentAdditionalContextText("wordingContext"),judgmentAdditionalContextText("exampleContext"),judgmentAdditionalContextText("investmentContext"),"\n### "+judgmentChallengeCopy.encountered+"\n"+judgmentEvidenceText()];
 if(judgmentReasonActive())out.push("\n### "+judgmentChallengeCopy.strongest+"\n"+(j.strongestCase.trim()||"[Not answered]"));
 else{
  out.push("\n### Strongest-reason follow-up\nNot asked for the current Not sure response.");
  if(j.strongestCase.trim())out.push("\n### Earlier strongest-reason writing (inactive; follow-up hidden for Not sure)\n"+j.strongestCase);
 }
 out.push("\n### "+judgmentChallengeCopy.change+"\n"+(j.changeEvidence.trim()||"[Not answered]"),"\nThese are the user's reports and assessments. Haven’t found any does not establish that a search was completed or that no contrary information exists. Not sure is unresolved, not a no-evidence response. A serious opposing case may be hypothetical; it is not encountered evidence unless the user identifies it as such. No bias or cause is diagnosed.");
 out.push(judgmentSocialContextText(),judgmentAdditionalContextText("stateContext"));
 return out.join("\n");
}
function judgmentCheck(){
 return '<div class="card judgment-card"><h2>Judgment Check</h2>'+judgmentAdditionalForm("wordingContext")+'<div class="divider"></div>'+judgmentAdditionalForm("exampleContext")+'<div class="divider"></div>'+judgmentAdditionalForm("investmentContext")+'<div class="divider"></div>'+judgmentChallengeForm()+'<div class="divider"></div>'+judgmentSocialForm()+'<div class="divider"></div>'+judgmentAdditionalForm("stateContext")+'<section class="judgment-revisit"><h2>Has this changed a reason?</h2><p class="field-note">You can link these reflections to a driver or revise its assessment. Your earlier writing is retained.</p><button class="secondary" data-edit="10">Review your decision drivers</button></section></div>';
}
function reversibility(){return reversibilityScreen();}
function driverOptions(f){return (f.options||[]).filter(id=>data.options.some(o=>o.id===id));}
function driverDirectionValue(f){return f.directionChoice&&(f.directionChoice.id!==choiceOption().id||f.directionChoice.name!==choiceOption().name)?'':f.direction||'';}
function driverDirection(f){return driverDirectionChoices.find(([id])=>id===driverDirectionValue(f))?.[1]||'Direction not assessed';}

function retainedReflectionCandidates(){
 const rows=[];const add=(id,text,optionId)=>{if(text?.trim())rows.push({id,text,optionId});};
 data.options.forEach(o=>{['immediate','future'].forEach(k=>{if(!o.trade[k+'Unknown'])add(o.id+'-trade-'+k,o.trade[k],o.id);});['foregone','commitments'].forEach(k=>(o.trade[k]||[]).forEach((t,i)=>add(o.id+'-trade-'+k+'-'+i,t,o.id)));['favourable','unfavourable'].forEach(k=>{if(o.consequence.branches[k].some(t=>t.trim()))add(o.id+'-consequences-'+k,[o.consequence.immediate.trim(),consequenceSequenceText(o,k)].filter(Boolean).join(' → '),o.id);});['positive','negative'].forEach(k=>{if(o.consequence[k].some(t=>t.trim()))add(o.id+'-consequences-'+k,consequenceSequenceText(o,k),o.id);});[...(o.incentives.promises||[]),...(o.incentives.avoid||[])].forEach(id=>add(o.id+'-motive-'+id,[...incentivePromises,...incentiveAvoid].find(x=>x.id===id)?.title,o.id));['gain','relief','fit'].forEach(k=>{if(incentiveWritingActive(o,k))add(o.id+'-incentive-'+k,o.incentives[k],o.id);});compoundingQuestions.forEach(({key})=>{if(!o.compound[key+'Unknown'])add(o.id+'-compound-'+key,o.compound[key],o.id);});});
 ['grow','avoid'].forEach(k=>data.compounding[k].forEach(id=>add('compound-'+k+'-'+id,data.compounding[k+'Details'][id],null)));
 data.inversion.forEach((text,i)=>add('inversion-'+i,text,null));
 [...advocateEntries(),...earlierAdvocateEntries()].forEach(entry=>add('devils-advocate-'+entry.id,advocateReflectionText(entry),null));
 if(!stressSummaryUnknown())add('stress-margin-'+choiceOption().id,stressNotes(),choiceOption().id);
 data.options.filter(o=>o.id!==choiceOption().id&&!stressSummaryUnknown(o.id)).forEach(o=>add('stress-margin-'+o.id,stressNotes(o.id),o.id));
 add('stress-earlier-notes',data.stressTest.earlier.leastRoom,null);
 if(data.decisionTiming.deadline==='yes'&&data.decisionTiming.deadlineDetails.trim())add('decision-timing-deadline',decisionTimingQuestions.details+'\n'+data.decisionTiming.deadlineDetails,null);
 if(!data.decisionTiming.waitingResponse&&data.decisionTiming.waiting.trim())add('decision-timing-waiting',decisionTimingQuestions.waiting+'\n'+data.decisionTiming.waiting,null);
 return rows;
}
function currentReflectionRows(){
 const o=choiceOption(),rows=[],add=(id,text,section,optionId=o.id)=>{if(text?.trim())rows.push({id,text,section,optionId});};
 ['immediate','future'].forEach(k=>{if(!o.trade[k+'Unknown'])add(o.id+'-trade-'+k,o.trade[k],'Trade-Offs');});
 ['gain','relief','fit'].forEach(k=>{if(incentiveWritingActive(o,k))add(o.id+'-incentive-'+k,o.incentives[k],'Incentives');});
 compoundingQuestions.forEach(({key})=>{if(!o.compound[key+'Unknown'])add(o.id+'-compound-'+key,o.compound[key],'Compounding');});
 ['favourable','unfavourable'].forEach(k=>{if(o.consequence.branches[k].some(t=>t.trim()))add(o.id+'-consequences-'+k,[o.consequence.immediate.trim(),consequenceSequenceText(o,k)].filter(Boolean).join(' → '),'Further Consequences');});
 advocateEntries().forEach(e=>add('devils-advocate-'+e.id,advocateReflectionText(e),"The Devil’s Advocate",null));
 if(!stressSummaryUnknown())add('stress-margin-'+o.id,stressNotes(),'Stress Test');
 if(data.decisionTiming.deadline==='yes'&&data.decisionTiming.deadlineDetails.trim())add('decision-timing-deadline',decisionTimingQuestions.details+'\n'+data.decisionTiming.deadlineDetails,'Decision timing',null);
 if(!data.decisionTiming.waitingResponse&&data.decisionTiming.waiting.trim())add('decision-timing-waiting',decisionTimingQuestions.waiting+'\n'+data.decisionTiming.waiting,'Decision timing',null);
 reverseReflectionRows().forEach(row=>rows.push(row));
 if(data.judgment.evidenceEncountered!=='unsure')add('judgment-strongest-case',data.judgment.strongestCase,'Judgment Check',null);
 ['wordingContext','exampleContext','investmentContext','socialContext','stateContext'].forEach(key=>{if(data.judgment[key].response==='yes')add('judgment-'+key,data.judgment[key].detail,'Judgment Check',null);});
 return rows;
}
function earlierReflectionRows(){
 const currentIds=new Set(currentReflectionRows().map(r=>r.id)),rows=new Map();
 const add=r=>{if(r.text?.trim()&&!currentIds.has(r.id))rows.set(r.id,{...r,section:r.section||'Earlier reflection'});};
 retainedReflectionCandidates().forEach(add);
 // Include writing hidden by a none/unknown response, and all retained path writing.
 data.options.forEach(o=>{
  ['immediate','future'].forEach(k=>add({id:o.id+'-trade-'+k,text:o.trade[k],optionId:o.id,section:'Earlier Trade-Offs'}));
  ['gain','relief','fit'].forEach(k=>add({id:o.id+'-incentive-'+k,text:o.incentives[k],optionId:o.id,section:'Earlier Incentives'}));
  compoundingQuestions.forEach(({key})=>add({id:o.id+'-compound-'+key,text:o.compound[key],optionId:o.id,section:'Earlier Compounding'}));
  add({id:'stress-margin-'+o.id,text:stressNotes(o.id),optionId:o.id,section:'Earlier Stress Test'});
 });
 add({id:'decision-timing-deadline',text:decisionTimingQuestions.details+'\n'+data.decisionTiming.deadlineDetails,section:'Earlier decision timing',empty:!data.decisionTiming.deadlineDetails.trim()});
 if(!data.decisionTiming.deadlineDetails.trim())rows.delete('decision-timing-deadline');
 add({id:'decision-timing-waiting',text:decisionTimingQuestions.waiting+'\n'+data.decisionTiming.waiting,section:'Earlier decision timing'});
 if(!data.decisionTiming.waiting.trim())rows.delete('decision-timing-waiting');
 add({id:'judgment-strongest-case',text:data.judgment.strongestCase,section:'Earlier Judgment Check'});
 ['wordingContext','exampleContext','investmentContext','socialContext','stateContext'].forEach(key=>add({id:'judgment-'+key,text:data.judgment[key].detail,section:'Earlier Judgment Check'}));
 data.options.forEach(o=>reverseReflectionRows(o,true).forEach(add));
 data.factors.forEach(f=>(f.sources||[]).forEach(r=>{if(!rows.has(r.id))add({...r,section:'Earlier linked reflection'});}));
 return [...rows.values()];
}
function reflections(){const current=currentReflectionRows();return data.driverReview.reuseIds.length?[...current,...earlierReflectionRows().filter(r=>data.driverReview.reuseIds.includes(r.id)).map(r=>({...r,explicitlyReused:true}))]:current;}
function reuseReflectionRows(){const rows=earlierReflectionRows(),ids=new Set(rows.map(r=>r.id));return [...rows,...currentReflectionRows().filter(r=>data.driverReview.reuseIds.includes(r.id)&&!ids.has(r.id)).map(r=>({...r,section:'Previously included; now a current reflection'}))];}
function reflectionAvailable(id){return currentReflectionRows().some(r=>r.id===id)||data.driverReview.reuseIds.includes(id);}
function activeDrivers(){return data.factors.filter(f=>!f.inactive&&(f.origin==='manual'||!f.sources.length||activeDriverSources(f).length));}

function activeDriverSources(f){const ids=new Set([...currentReflectionRows().map(r=>r.id),...data.driverReview.reuseIds]);return (f.sources||[]).filter(r=>!r.inactive&&ids.has(r.id));}

function driverTitle(f){return f.name.trim()||"Untitled driver";}
function driverLinks(id){return data.factors.flatMap(f=>(f.sources||[]).filter(r=>r.id===id).map(source=>({driver:f,source})));}
function driverRows(){return currentReflectionRows().map(r=>({...r,current:true}));}

function driverLinkLabel(id){
 const links=driverLinks(id),activeLinks=links.filter(({driver,source})=>!driver.inactive&&activeDriverSources(driver).includes(source));
 const names=activeLinks.length?activeLinks.map(({driver})=>driverTitle(driver)):links.map(({driver})=>driverTitle(driver));
 return names.length?(activeLinks.length?"Linked to: ":"Previously linked to: ")+[...new Set(names)].join(" / "):"";
}
function driverReviewChanged(){data.reviewed=data.reviewed.filter(i=>i!==10);}
function setActiveDriver(id){
 const f=activeDrivers().find(f=>f.id===id);
 data.driverReview.activeDriverId=f?f.id:null;
 const target=$("#driverLinkTarget");if(target)target.textContent=f?"Adding reflections to: "+driverTitle(f):"Select a reflection to start a driver.";
 document.querySelectorAll("[data-drivercard]").forEach(e=>e.setAttribute("data-active",String(e.dataset.drivercard===data.driverReview.activeDriverId)));
 document.querySelectorAll("[data-activatedriver]").forEach(e=>{
  const current=e.dataset.activatedriver===data.driverReview.activeDriverId;e.setAttribute("aria-pressed",String(current));e.textContent=current?"Adding reflections here":"Add reflections here";
 });
 document.querySelectorAll("[data-linklabel]").forEach(e=>e.textContent=driverLinkLabel(e.dataset.linklabel));
 save();
}
function createDriver(origin="manual"){
 const f={id:uid(),name:"",options:[],directionAssessed:false,direction:"",strength:0,importance:0,evidence:0,rationale:"",sources:[],sourceHistory:[],origin,inactive:false};
 data.factors.push(f);data.driverReview.activeDriverId=f.id;return f;
}
function hideIfUnlinked(f){
 if(f.origin!=="manual"&&!activeDriverSources(f).length)f.inactive=true;
 if(f.inactive&&data.driverReview.activeDriverId===f.id)data.driverReview.activeDriverId=null;
}
function selectDriverReflection(id,checked,viaReuse=false){
 const row=[...driverRows(),...earlierReflectionRows()].find(r=>r.id===id);if(!row)return;
 const links=driverLinks(id);
 if(checked){
  if(links.length){
   // Preserve previously shared legacy groups rather than silently consolidating them.
   links.forEach(({driver,source})=>{driver.inactive=false;source.inactive=false;if(!viaReuse)delete source.reuseOwned;});
   data.driverReview.activeDriverId=links[0].driver.id;
  }else{
   let f=activeDrivers().find(f=>f.id===data.driverReview.activeDriverId);
   if(!f)f=createDriver("reflection");
   f.sources.push({id:row.id,text:row.text,optionId:row.optionId??null,inactive:false});
   if(!f.name.trim())f.name=row.text;
   f.inactive=false;data.driverReview.activeDriverId=f.id;
  }
 }else{
  links.forEach(({driver,source})=>{source.inactive=true;hideIfUnlinked(driver);});
 }
 driverReviewChanged();save();
}
function moveDriverReflection(fromId,sourceId,targetId){
 const from=data.factors.find(f=>f.id===fromId);
 const source=from?.sources.find(r=>r.id===sourceId&&!r.inactive);
 if(!source||fromId===targetId)return;
 let target=targetId==="__new__"?createDriver("reflection"):data.factors.find(f=>f.id===targetId);
 if(!target)return;
 from.sourceHistory.push({...source,inactive:true,movedTo:target.id,reason:"Moved to another driver"});
 from.sources=from.sources.filter(r=>r!==source);
 const existing=target.sources.find(r=>r.id===sourceId);
 if(existing){
  target.sourceHistory.push({...existing,inactive:true,reason:'Earlier target quote retained when a link was moved here'});
  target.sources[target.sources.indexOf(existing)]={...source,inactive:false};
 }
 else target.sources.push({...source,inactive:false});
 if(!target.name.trim())target.name=source.text;
 target.inactive=false;hideIfUnlinked(from);data.driverReview.activeDriverId=target.id;
 driverReviewChanged();save();
}
function removeDriver(id){
 const f=data.factors.find(f=>f.id===id);if(!f)return;
 if(f.sources.length||f.sourceHistory.length){
  f.sources.forEach(r=>r.inactive=true);f.inactive=true;
 }else data.factors=data.factors.filter(f=>f.id!==id);
 if(data.driverReview.activeDriverId===id)data.driverReview.activeDriverId=null;
 driverReviewChanged();render();
}
function driverBasisComplete(){return data.driverReview.basisUnknown||Boolean(data.driverReview.basis.trim());}
function driverBasisText(){return data.driverReview.basisUnknown?"I don’t know yet":data.driverReview.basis.trim()||"[Not answered]";}
function driverBasisInvestigations(){return data.driverReview.basisUnknown?["Find out what the expectations you are relying on are based on."]:[];}
function driverBasisForm(){
 return '<section class="driver-basis"><label class="driver-basis-question" for="driverBasis">'+esc(driverBasisCopy.question)+'</label><p class="field-note" id="driverBasisHelp">'+esc(driverBasisCopy.helper)+'</p><p class="field-note" id="driverDependencyHelp">'+esc(driverBasisCopy.dependencyHelp)+'</p><div class="driver-basis-example"><small>Example</small><p>'+esc(driverBasisCopy.example)+'</p></div><textarea id="driverBasis" data-driverbasis aria-describedby="driverBasisHelp driverDependencyHelp" placeholder="I expect… This is based on…" '+(data.driverReview.basisUnknown?'disabled':'')+'>'+esc(data.driverReview.basis)+'</textarea><label class="driver-basis-unknown"><input type="checkbox" data-driverbasisunknown '+(data.driverReview.basisUnknown?'checked':'')+'><span>I don’t know yet</span></label></section>';
}
function sourceStatusText(r){return {current:'Matches current writing',changed:'Earlier linked writing; the reflection has since changed',not_current:'Earlier linked writing; not currently active'}[driverSourceFreshness(r).state];}
function driverSourceList(f,editable=false){
 const sources=activeDriverSources(f);
 return sources.length?'<ul class="driver-source-list">'+sources.map(r=>{
  const fresh=driverSourceFreshness(r),toggle=editable&&(fresh.state==='changed'||r.writingSwitch)?'<label class="reflection-control"><input type="checkbox" data-currentwriting="'+esc(f.id)+'" data-sourceid="'+esc(r.id)+'" '+(r.writingSwitch?.checked?'checked':'')+'><span>This is my thinking now</span></label>':'';
  const latest=fresh.state==='changed'?'<details><summary>View current writing</summary><p>'+esc(fresh.current.text)+'</p></details>':'';
  const targets=data.factors.filter(other=>other.id!==f.id);
  return '<li><div class="source-writing">'+reflectionReportText(r)+'</div><small>'+esc(sourceStatusText(r))+'</small>'+latest+toggle+(r.writingSwitch?.checked&&fresh.state==='changed'?'<p class="field-note">Your reflection has changed again. Clear this selection, then select it to use the latest writing.</p>':'')+(editable?'<label class="driver-move"><span>Move to another driver</span><select data-movesource="'+esc(f.id)+'" data-sourceid="'+esc(r.id)+'"><option value="">Choose a driver…</option>'+targets.map(t=>'<option value="'+esc(t.id)+'">'+esc(driverTitle(t))+(t.inactive?' (restore)':'')+'</option>').join('')+'<option value="__new__">New driver</option></select></label>':'')+'</li>';
 }).join('')+'</ul>':'<p class="field-note">Added directly; no current reflections linked.</p>';
}
function driverSourceDetails(f){return activeDriverSources(f).length?'<details class="driver-sources"><summary>Review supporting reflections ('+activeDriverSources(f).length+')</summary>'+driverSourceList(f,true)+'</details>':'';}
function toggleCurrentWriting(driverId,sourceId,checked){
 const f=data.factors.find(f=>f.id===driverId),r=f?.sources.find(r=>r.id===sourceId);if(!r)return;
 const latest=reflections().find(row=>row.id===sourceId);
 if(checked){
  if(!latest||r.writingSwitch?.checked)return;
  f.sourceHistory.push({id:r.id,text:r.text,optionId:r.optionId,inactive:true,reason:'Quote before explicit writing switch'});
  r.writingSwitch={checked:true,before:r.text,adopted:latest.text};r.text=latest.text;
 }else if(r.writingSwitch?.checked){
  f.sourceHistory.push({id:r.id,text:r.text,optionId:r.optionId,inactive:true,reason:'Quote retained after undoing writing switch'});
  r.text=r.writingSwitch.before;r.writingSwitch.checked=false;
 }else return;
 driverReviewChanged();save();
}
function toggleEarlierReflection(id,checked){
 if(checked){
  const previous=new Set(driverLinks(id).filter(({driver,source})=>!driver.inactive&&activeDriverSources(driver).includes(source)).map(({driver})=>driver.id));
  data.driverReview.reuseIds=[...new Set([...data.driverReview.reuseIds,id])];selectDriverReflection(id,true,true);
  driverLinks(id).forEach(({driver,source})=>{if(!previous.has(driver.id))source.reuseOwned=true;});
 }else{
  data.driverReview.reuseIds=data.driverReview.reuseIds.filter(value=>value!==id);
  driverLinks(id).forEach(({driver,source})=>{if(source.reuseOwned){source.inactive=true;delete source.reuseOwned;}hideIfUnlinked(driver);});
 }
 driverReviewChanged();save();
}
function earlierReflectionPanel(){
 const rows=reuseReflectionRows();
 return rows.length?'<details class="earlier-reflections"><summary>Earlier reflections ('+rows.length+')</summary><p class="field-note">These notes are retained. Include one if it still belongs in your thinking about this decision.</p>'+rows.map(r=>'<div class="earlier-reflection"><small>'+esc(r.section)+(r.optionId&&r.optionId!==choiceOption().id?' · '+esc(data.options.find(o=>o.id===r.optionId)?.name||'Earlier path'):'')+'</small><p>'+esc(r.text)+'</p><label class="reflection-control"><input type="checkbox" data-earlierrelevant="'+esc(r.id)+'" '+(data.driverReview.reuseIds.includes(r.id)?'checked':'')+'><span>This is still relevant</span></label><small>'+esc(driverLinkLabel(r.id))+'</small></div>').join('')+'</details>':'';
}

function driverSourceFreshness(source){const current=reflections().find(row=>row.id===source.id);return {state:!current?"not_current":sameReflectionText(source.id,current.text,source.text)?"current":"changed",current};}
function driverExportRecord(f,inactive=false){
 const out=["- "+driverTitle(f)+" | ID "+f.id+" | "+(inactive?"Inactive; excluded from current assessment":driverDirection(f))+" | importance "+["Not assessed","low","medium","high"][f.importance||0]+" | user-assessed evidence "+["Not assessed","assumption","reasonable estimate","verified fact"][f.evidence||0]+" | directional strength "+(["for","against"].includes(driverDirectionValue(f))?"":"[Inactive retained value] ")+["Not assessed","somewhat","strongly"][f.strength||0], "  Why this matters: "+(f.rationale||"[Not answered]")];
 if(driverAssessmentChanges(f).length)out.push("  Assessment needs reconsideration: "+driverAssessmentChanges(f).map(change=>change.section+" changed from "+(change.before??"[Not linked]")+" to "+(change.current??"[No longer active]")).join("; ")+". These are versions of the same sources, not additional evidence.");
 (f.sources||[]).forEach(r=>{const freshness=driverSourceFreshness(r);out.push("  "+(inactive||!activeDriverSources(f).includes(r)?"Retained inactive supporting reflection":"Active supporting reflection")+" | Source ID "+r.id+" | Path ID "+(r.optionId??"decision-level")+" | Snapshot status: "+({current:"Matches current reflection",changed:"Earlier linked writing; the reflection has since changed",not_current:"Earlier linked writing; not currently in the reflection list"}[freshness.state])+"\n  "+r.text);if(freshness.state==="changed")out.push("  Current reflection (same source; not additional evidence):\n  "+freshness.current.text);});
 (f.sourceHistory||[]).forEach(r=>out.push("  Earlier supporting reflection (inactive) | Source ID "+r.id+" | Path ID "+(r.optionId??"decision-level")+" | "+(r.reason||"Retained history")+(r.movedTo?" | Moved to driver "+r.movedTo:"")+"\n  "+r.text));
 return out.join("\n");
}
function driverContextText(){
 const active=activeDrivers(),inactive=data.factors.filter(f=>!active.includes(f));
 const out=["\n## Decision drivers\n"+(active.length?active.map(f=>driverExportRecord(f)).join("\n\n"):"[None active]")];
 if(inactive.length)out.push("\n### Retained inactive drivers (excluded from current assessment)\n"+inactive.map(f=>driverExportRecord(f,true)).join("\n\n"));
 out.push("\n## Basis of your expectations\nCapture version: 1\n"+driverBasisCopy.question+"\n"+driverBasisText());
 if(data.driverReview.basisUnknown&&data.driverReview.basis.trim())out.push("\n### Earlier expectation-basis writing (inactive; not the current response)\n"+data.driverReview.basis);
 out.push("\nEvidence selections and expectation support are user assessments, not external verification. Directional strength is not confidence or probability. Supporting snapshots and repeated source IDs are not independent evidence; inspect possible double-counting.");
 return out.join("\n");
}
function bindDrivers(){
 document.querySelectorAll('[data-driverdirection]').forEach(e=>e.onchange=()=>{const f=data.factors.find(f=>f.id===e.dataset.driverdirection);f.direction=e.value;f.directionChoice={id:choiceOption().id,name:choiceOption().name};driverReviewChanged();render();});
 document.querySelectorAll('[data-sourcegroup]').forEach(e=>e.ontoggle=()=>{if(e.isConnected===false)return;const set=new Set(data.driverReview.openGroups);if(e.open)set.add(e.dataset.sourcegroup);else set.delete(e.dataset.sourcegroup);data.driverReview.openGroups=[...set];save();});
 document.querySelectorAll('[data-earlierrelevant]').forEach(e=>e.onchange=()=>{toggleEarlierReflection(e.dataset.earlierrelevant,e.checked);render();});
 document.querySelectorAll('[data-currentwriting]').forEach(e=>e.onchange=()=>{toggleCurrentWriting(e.dataset.currentwriting,e.dataset.sourceid,e.checked);render();});
 document.querySelectorAll('[data-boundarycheck]').forEach(e=>e.onchange=()=>{setBoundaryAnswer(e.dataset.boundarycheck,e.value);render();});
 document.querySelectorAll('[data-boundarynote]').forEach(e=>e.oninput=()=>{const r=data.rules.find(r=>r.id===e.dataset.boundarynote);if(r?.check)r.check.note=e.value;save();});
 if($("#addFactor"))$("#addFactor").onclick=()=>{const f=createDriver("manual");driverReviewChanged();render();const name=Array.from(document.querySelectorAll("[data-factor]")).find(e=>e.dataset.factor===f.id&&e.dataset.key==="name");name?.focus();};
 document.querySelectorAll("[data-reflection]").forEach(e=>e.onchange=()=>{const id=e.dataset.reflection;selectDriverReflection(id,e.checked);render();Array.from(document.querySelectorAll("[data-reflection]")).find(n=>n.dataset.reflection===id)?.focus();});
 document.querySelectorAll("[data-activatedriver]").forEach(e=>e.onclick=()=>setActiveDriver(e.dataset.activatedriver));
 document.querySelectorAll("[data-factor]").forEach(e=>{
  e.onfocus=()=>setActiveDriver(e.dataset.factor);
  const update=()=>{const f=data.factors.find(f=>f.id===e.dataset.factor);if(!f)return;const key=e.dataset.key;f[key]=["strength","importance","evidence"].includes(key)?+e.value:e.value;driverReviewChanged();setActiveDriver(f.id);};
  e.oninput=update;e.onchange=update;
 });
 document.querySelectorAll("[data-delfactor]").forEach(e=>e.onclick=()=>removeDriver(e.dataset.delfactor));
 document.querySelectorAll("[data-movesource]").forEach(e=>e.onchange=()=>{if(!e.value)return;moveDriverReflection(e.dataset.movesource,e.dataset.sourceid,e.value);render();Array.from(document.querySelectorAll("[data-factor]")).find(n=>n.dataset.factor===data.driverReview.activeDriverId&&n.dataset.key==="name")?.focus();});
 document.querySelectorAll("[data-driveroption]").forEach(e=>e.onchange=()=>{const f=data.factors.find(f=>f.id===e.dataset.driveroption);f.options=e.checked?[...new Set([...driverOptions(f),e.value])]:driverOptions(f).filter(id=>id!==e.value);f.directionAssessed=true;driverReviewChanged();setActiveDriver(f.id);const none=Array.from(document.querySelectorAll("[data-drivernone]")).find(n=>n.dataset.drivernone===f.id);if(none)none.checked=!f.options.length;});
 document.querySelectorAll("[data-drivernone]").forEach(e=>e.onchange=()=>{const f=data.factors.find(f=>f.id===e.dataset.drivernone);f.directionAssessed=e.checked;if(e.checked){f.options=[];document.querySelectorAll("[data-driveroption]").forEach(n=>{if(n.dataset.driveroption===f.id)n.checked=false;});}driverReviewChanged();setActiveDriver(f.id);});
 document.querySelectorAll("[data-driverbasis]").forEach(e=>e.oninput=()=>{data.driverReview.basis=e.value;driverReviewChanged();save();});
 document.querySelectorAll("[data-driverbasisunknown]").forEach(e=>e.onchange=()=>{data.driverReview.basisUnknown=e.checked;driverReviewChanged();save();const writing=$("#driverBasis");if(writing)writing.disabled=e.checked;});
}
function factors(){
 const current=activeDrivers().find(f=>f.id===data.driverReview.activeDriverId),rows=driverRows();
 const sections=[...new Set(rows.map(r=>r.section==='Strongest opposing reason'?'Judgment Check':r.section||'Current reflections'))];
 const reference=sections.map(section=>{const group=rows.filter(r=>(r.section==='Strongest opposing reason'?'Judgment Check':r.section||'Current reflections')===section),linked=group.filter(r=>driverLinks(r.id).some(({driver,source})=>!driver.inactive&&activeDriverSources(driver).includes(source))).length;return '<details class="reflection-group" data-sourcegroup="'+esc(section)+'" '+((data.driverReview.openGroups||[]).includes(section)?'open':'')+'><summary>'+esc(section)+' <small>('+group.length+(linked?' · '+linked+' linked':'')+')</small></summary>'+group.map(r=>'<label class="reflection-row"><input type="checkbox" data-reflection="'+esc(r.id)+'" '+(driverLinks(r.id).some(({driver,source})=>!driver.inactive&&activeDriverSources(driver).includes(source))?'checked':'')+'><span class="reflection-text">'+reflectionReportText(r)+(r.section==='Strongest opposing reason'?'<small>Strongest opposing reason</small>':'')+(!r.current?'<small>Earlier linked writing; retained source</small>':'')+'<small data-linklabel="'+esc(r.id)+'">'+esc(driverLinkLabel(r.id))+'</small></span></label>').join('')+'</details>';}).join('');
 const controls=(f,key,label,choices)=>'<label class="field"><span>'+label+'</span><select data-factor="'+esc(f.id)+'" data-key="'+key+'"><option value="0">Choose…</option>'+choices.map(([v,l])=>'<option value="'+v+'" '+(f[key]===v?'selected':'')+'>'+l+'</option>').join('')+'</select></label>';
 const editors=activeDrivers().map(f=>'<article class="factor" data-drivercard="'+esc(f.id)+'" data-active="'+String(f.id===data.driverReview.activeDriverId)+'"><button class="driver-activate" data-activatedriver="'+esc(f.id)+'" aria-pressed="'+String(f.id===data.driverReview.activeDriverId)+'">'+(f.id===data.driverReview.activeDriverId?'Adding reflections here':'Add reflections here')+'</button><div class="factorhead"><input aria-label="Driver name" data-factor="'+esc(f.id)+'" data-key="name" value="'+esc(f.name)+'" placeholder="Name this decision driver"><button class="x" data-delfactor="'+esc(f.id)+'" aria-label="Remove driver">×</button></div>'+driverAssessmentReviewCue(f,true)+driverSourceDetails(f)+'<fieldset class="driver-direction"><legend>How does this reason affect your view?</legend>'+driverDirectionChoices.map(([value,label])=>'<label><input type="radio" name="direction-'+esc(f.id)+'" data-driverdirection="'+esc(f.id)+'" value="'+value+'" '+(driverDirectionValue(f)===value?'checked':'')+'><span>'+label+'</span></label>').join('')+'</fieldset><div class="metricgrid">'+controls(f,'importance','Importance',[[1,'Low'],[2,'Medium'],[3,'High']])+controls(f,'evidence','Evidence',[[1,'Assumption'],[2,'Reasonable estimate'],[3,'Verified fact']])+(['for','against'].includes(driverDirectionValue(f))?controls(f,'strength','How strongly?',[[1,'Somewhat'],[2,'Strongly']]):'')+'</div><label class="field"><span>Why this matters <small>(optional)</small></span><textarea data-factor="'+esc(f.id)+'" data-key="rationale">'+esc(f.rationale)+'</textarea></label>'+(f.reviewEditing?'<div class="review-actions"><button data-saveassessment="'+esc(f.id)+'">Save assessment</button></div><p id="assessment-error-'+esc(f.id)+'" role="alert" hidden>Complete the driver assessment before saving.</p>':'')+'</article>').join('');
 return '<div class="drivers-page">'+decisionAnchor()+'<div class="drivers-workspace"><section class="reflection-panel"><h2>Your reflections</h2><p class="field-note">Select reflections that express the same reason. Add another driver when you move to a different reason.</p><p class="driver-link-target" id="driverLinkTarget" role="status" aria-live="polite">'+esc(current?'Adding reflections to: '+driverTitle(current):'Select a reflection to start a driver.')+'</p>'+reference+earlierReflectionPanel()+'</section><section class="driver-editors">'+(editors||'<div class="empty-state"><h2>What are the real reasons?</h2><p>Select a reflection to open its driver here, or add a driver directly.</p></div>')+'<button id="addFactor" class="secondary">+ Add a decision driver</button></section></div>'+driverBasisForm()+'<p class="field-note">Your evidence selections describe your own assessment.</p></div>';
}

function decisionAnchor(){return '<div class="decision-anchor"><small>DECISION</small><p>'+esc(data.decision||'Your decision is not defined yet.')+'</p></div>';}
function consequenceBranchComplete(key){const c=choiceOption().consequence,values=c.branches[key],last=values.findLastIndex(text=>text.trim());return c.branchEnded[key]&&values.slice(0,last+1).every(text=>text.trim());}
function assessmentMissing(){
 const o=choiceOption(),checks=[
  o.name.trim()&&data.decisionAim.trim()&&data.horizon&&timingComplete(),
  data.priorities.length&&data.stakes.length&&["yes","no"].includes(data.hasHardBoundaries)&&(data.hasHardBoundaries!=="yes"||(data.rules.length&&data.rules.every(r=>r.text.trim()))),
  o.trade.alternatives.some(text=>text.trim())&&["immediate","future"].every(key=>o.trade[key+"Unknown"]||o.trade[key].trim()),
  incentivesComplete(),
  compoundingQuestions.every(({key})=>o.compound[key+"Unknown"]||o.compound[key].trim()),
  o.consequence.immediate.trim()&&["favourable","unfavourable"].every(consequenceBranchComplete),
  advocateComplete(),stressComplete()&&(data.hasHardBoundaries!=="yes"||data.rules.length&&data.rules.every(r=>boundaryAnswer(r))),judgmentChallengeComplete()&&judgmentSocialComplete()&&judgmentAdditionalComplete(),
  reverseComplete(),
  driverBasisComplete()&&activeDrivers().length&&activeDrivers().every(f=>f.name.trim()&&[1,2,3].includes(f.importance)&&[1,2,3].includes(f.evidence)&&driverDirectionChoices.some(([id])=>id===driverDirectionValue(f))&&(!["for","against"].includes(driverDirectionValue(f))||[1,2].includes(f.strength)))
 ];
 return stepOrder.filter(index=>index!==11).flatMap(index=>{const answered=checks[index];return !answered?[{step:index,label:steps[index],reason:"Some required answers are missing"}]:index===10&&activeDrivers().some(f=>driverAssessmentChanges(f).length)?[{step:index,label:steps[index],reason:"An earlier answer or your approach has changed. Reconsider the affected assessments."}]:!data.reviewed.includes(index)?[{step:index,label:steps[index],reason:"Not reviewed since the last change"}]:[];});
}
function assessmentComplete(){return assessmentMissing().length===0;}

function analyse(){
 const assessed=activeDrivers().filter(f=>f.name.trim()&&f.importance&&f.evidence&&driverDirectionChoices.some(([id])=>id===driverDirectionValue(f)));
 const complete=assessmentComplete(),unresolved=allInvestigations().length,rules=data.hasHardBoundaries==='yes'?data.rules:[];
 const conflict=rules.some(r=>boundaryAnswer(r)==='no'),beyond=stressRows.some(r=>stressValue(r)==='beyond'),limited=stressRows.some(r=>stressValue(r)==='little-room');
 const readiness=conflict?'A hard boundary conflict is recorded':beyond?'A tolerance limit needs review':rules.some(r=>!boundaryAnswer(r))?'Boundary check incomplete':unresolved||assessed.some(f=>f.importance===3&&f.evidence===1)?'Still investigating':!complete?'Incomplete assessment':limited?'Limited room recorded':'No unresolved blocker recorded';
 const evidence=assessed.length?(assessed.every(f=>f.evidence===3)?'User-labelled verified facts':assessed.every(f=>f.evidence===1)?'User-labelled assumptions':'User-labelled facts, estimates and assumptions'):'Not assessed';
 return {scores:{},lean:'Comparison not assessed',readiness,evidence,robust:stressStatus(),top:choiceOption(),gap:0,complete,unresolved};
}

function boundaryInvestigations(){return data.hasHardBoundaries==='yes'?data.rules.filter(r=>boundaryAnswer(r)==='unknown').map(r=>'Check whether doing this would respect: '+r.text+(r.check.note?' — '+r.check.note:'')):[];}

function tradeoffInvestigations(){const o=choiceOption();return ['immediate','future'].filter(k=>o.trade[k+'Unknown']).map(k=>(o.name||'Your decision')+': Find out the '+k+' costs of doing this.');}

function compoundingInvestigations(){const o=choiceOption(),tasks={build:'Explore what doing this could help build on over time.',reinforce:'Investigate which unwanted patterns or pressures could strengthen over time.',sustain:'Explore what doing this could make harder to sustain or pursue over time.'};return compoundingQuestions.filter(({key})=>o.compound[key+'Unknown']).map(({key})=>(o.name||'Your decision')+': '+tasks[key]);}
function allInvestigations(){return [...new Set([...boundaryInvestigations(),...activeDrivers().filter(f=>driverDirectionValue(f)==="unknown").map(f=>"Clarify whether “"+driverTitle(f)+"” supports or weighs against doing this."),...timingInvestigations(),...reverseInvestigations(),...driverBasisInvestigations(),...incentiveInvestigations(),...(data.horizon==="Not sure"?["Clarify how long the consequences of doing this could affect your life."]:[]),...tradeoffInvestigations(),...compoundingInvestigations(),...advocateInvestigations(),...stressInvestigations(),...judgmentInvestigations(),...(data.investigate||[]).filter(Boolean)].map(x=>x.trim()).filter(Boolean))]}
function judgmentSignals(){const rows=[...judgmentCore,...judgmentConditionalRows()];return rows.filter(r=>["maybe","yes"].includes(data.judgment.answers[r.id]))}
function vulnerabilityItems(){const out=[];advocateEntries().filter(e=>e.connectionResponse!=='no').forEach(e=>out.push(advocateReflectionText(e)));stressRows.forEach(r=>{const value=stressValue(r);if(['beyond','little-room'].includes(value))out.push(r.label+': '+stressChoices.find(c=>c.value===value).label+' — '+r.description);});if(data.hasHardBoundaries==='yes')data.rules.filter(r=>boundaryAnswer(r)==='no').forEach(r=>out.push('Boundary conflict: '+r.text+(r.check?.note?' — '+r.check.note:'')));return [...new Set(out)];}

// Presentation only: labels and exact writing stay distinct without changing capture/export strings.
function reportValue(text){return '<span class="report-value">'+esc(text)+'</span>';}
function reportField(label,text){return '<span class="report-field"><span class="report-label">'+esc(label)+'</span>'+reportValue(text)+'</span>';}
function advocateReportFields(entry){
 return reportField('Outcome',entry.outcome.trim()||'[Not answered]')+reportField(entry.connectionResponse?'Connection assessment (your view)':'Possible connection',entry.connectionResponse?advocateResponseLabel(entry.connectionResponse):entry.connection.trim()||'[Not answered]');
}
function reflectionReportText(row){
 // Only use known structured fields when they match this exact saved quote.
 // An older or arbitrary quote stays verbatim; never split user writing at colons.
 const entry=[...advocateEntries(),...earlierAdvocateEntries()].find(e=>'devils-advocate-'+e.id===row.id&&advocateReflectionText(e)===row.text);
 return entry?advocateReportFields(entry):reportValue(row.text);
}
function overviewInvestigationText(text){
 if(data.hasHardBoundaries==='yes'){
  const rule=data.rules.find(r=>boundaryAnswer(r)==='unknown'&&('Check whether doing this would respect: '+r.text+(r.check.note?' — '+r.check.note:'')).trim()===text);
  if(rule)return reportField('Check whether doing this would respect',rule.text)+(rule.check.note?reportField('What you still need to check',rule.check.note):'');
 }
 return reportValue(text);
}
function overviewVulnerabilityText(text){
 const outcome=advocateEntries().find(e=>e.connectionResponse!=='no'&&advocateReflectionText(e)===text);
 if(outcome)return advocateReportFields(outcome);
 const condition=stressRows.find(r=>['beyond','little-room'].includes(stressValue(r))&&r.label+': '+stressChoices.find(c=>c.value===stressValue(r)).label+' — '+r.description===text);
 if(condition)return reportField(condition.label,stressChoices.find(c=>c.value===stressValue(condition)).label)+'<span class="report-explanation">'+esc(condition.description)+'</span>';
 if(data.hasHardBoundaries==='yes'){
  const rule=data.rules.find(r=>boundaryAnswer(r)==='no'&&'Boundary conflict: '+r.text+(r.check?.note?' — '+r.check.note:'')===text);
  if(rule)return reportField('Boundary conflict',rule.text)+(rule.check?.note?reportField('What is in conflict',rule.check.note):'');
 }
 return reportValue(text);
}
function overviewPendingSections(){
 return assessmentMissing().map(item=>{
  const description=item.reason==='Some required answers are missing'?'Some questions haven’t been answered yet.':item.reason==='Not reviewed since the last change'?'Review your answers in this section.':item.reason;
  return '<div class="pending-section"><div><span class="pending-section-name">'+esc(item.label)+'</span><p class="field-note">'+esc(description)+'</p></div><button class="edit-link" data-edit="'+item.step+'">Review</button></div>';
 }).join('');
}

function overviewList(items,empty="Nothing added yet.",renderItem=esc){return items.length?'<ul class="overview-list">'+items.map(x=>'<li>'+renderItem(x)+'</li>').join("")+'</ul>':'<p class="muted">'+esc(empty)+'</p>'}
function decisionOverview(){
 const a=analyse();const edit=i=>'<button class="edit-link" data-edit="'+i+'">Edit</button>';
 const section=(title,body,i)=>'<section class="overview-section'+(title==='What you still need to find out'?' overview-information-needs':'')+'"><div class="section-heading"><h3>'+title+'</h3>'+(i===null?'':edit(i))+'</div>'+body+'</section>';
 const priorities=data.stakes.map(id=>lifeDomains.find(d=>d.id===id)?.title).filter(Boolean);
 const drivers=[...activeDrivers()].sort((x,y)=>(y.importance||0)-(x.importance||0));
 const renderDriver=f=>'<details class="overview-driver"><summary><span><strong>'+esc(f.name||'Untitled driver')+'</strong><small>'+(['Not assessed','Low','Medium','High'][f.importance||0])+' importance · '+(['Not assessed','Assumption','Reasonable estimate','Verified fact'][f.evidence||0])+'</small></span><span class="badge">'+esc(driverDirection(f))+'</span></summary>'+driverAssessmentReviewCue(f)+'<p>'+esc(f.rationale||'No reasoning added yet.')+'</p>'+((f.sources||[]).length?driverSourceList(f)+((f.sources||[]).some(r=>!activeDriverSources(f).includes(r))?'<details><summary>Earlier unlinked reflections</summary>'+f.sources.filter(r=>!activeDriverSources(f).includes(r)).map(r=>'<p>'+esc(r.text)+'</p><small>Inactive; excluded from current support</small>').join('')+'</details>':''):'')+((f.sourceHistory||[]).length?'<details><summary>Earlier supporting writing</summary>'+f.sourceHistory.map(r=>'<p>'+esc(r.text)+'</p><small>'+esc(r.reason||'Retained quote')+' · Inactive; not additional evidence</small>').join('')+'</details>':'')+'</details>';
 const driverRows=drivers.length?[["for","Reasons for doing this"],["against","Reasons against doing this"],["unknown","Reasons that need clarification"],["neutral","Other considerations"],["","Reasons not yet assessed"]].map(([direction,title])=>{const group=drivers.filter(f=>driverDirectionValue(f)===direction);return group.length?'<h4>'+title+'</h4>'+group.map(renderDriver).join(''):'';}).join(''):'<p class="muted">Decision drivers have not been assessed yet.</p>';
 const rules=data.hasHardBoundaries==='yes'?data.rules:[];
 const boundaryList=rules.length?'<h4>Hard boundaries</h4>'+rules.map(r=>'<div class="boundary-summary">'+reportValue(r.text||'Boundary not defined')+'<span class="badge">'+esc(boundaryLabel(r))+'</span>'+(['no','unknown'].includes(boundaryAnswer(r))&&r.check?.note?'<p>'+esc(r.check.note)+'</p>':'')+'</div>').join(''):'';
 const signals=judgmentSignals();const judgmentAnswered=[...judgmentCore,...judgmentConditionalRows()].every(r=>data.judgment.answers[r.id])&&judgmentChallengeComplete()&&judgmentSocialComplete()&&judgmentAdditionalComplete();
 const reverse=reverseOverview();
 return '<div class="decision-overview">'+decisionAnchor()+(approachReviewPending().length?'<div class="approach-review"><h3>Do your earlier answers still fit this approach?</h3><p class="field-note">Your earlier thinking is kept for you to reconsider.</p><button class="secondary" data-edit="0">Revisit earlier thinking</button></div>':'')+'<div class="overview-hero"><span class="assessment-label">'+(a.complete?'Reviewed assessment':'Partial assessment')+'</span><h2>'+esc('Here is where your thinking stands')+'</h2><p>'+esc(a.unresolved?a.unresolved+' question'+(a.unresolved===1?' remains':'s remain')+' unresolved.':a.complete?'No unresolved information gaps have been recorded.':'Complete the relevant checks before interpreting this as a full assessment.')+'</p><div class="overview-state"><div><span>Evidence</span><strong>'+esc(a.evidence)+'</strong></div><div><span>Readiness</span><strong>'+esc(a.readiness)+'</strong></div><div><span>Stability</span><strong>'+esc(a.robust)+'</strong></div></div><small>Based on your entries. This is an orientation, not a recommendation.</small>'+(true?'<p class="field-note">You have explored whether to do this. The alternatives have not been comparatively assessed.</p>':'')+'</div>'+section('Timing of this decision',timingOverview(),0)+section('What this decision needs to protect',overviewList(priorities,'Not assessed yet.')+boundaryList+(rules.length?'<button class="edit-link" data-edit="7">Review boundary compatibility</button>':''),1)+section('Costs and other possibilities',[choiceOption()].map(o=>'<div class="overview-trade"><h4>'+esc(o.name||'Untitled option')+'</h4><strong>Other possibilities</strong>'+overviewList(o.trade.alternatives.filter(t=>t.trim()),'Not answered yet.')+'<strong>Immediate cost</strong><p>'+esc(costAnswer(o,'immediate'))+'</p><strong>Future cost</strong><p>'+esc(costAnswer(o,'future'))+'</p></div>').join(''),2)+section('What is driving your view',driverRows,10)+section('Basis of your expectations','<p>'+esc(driverBasisText())+'</p>',10)+'<div class="overview-pair">'+section('What you still need to find out',overviewList(allInvestigations(),'No information gaps recorded yet.',overviewInvestigationText)+reverseChecksNotesOverview()+reverseChecksOverviewLink()+(driverBasisInvestigations().length?'<button class="edit-link" data-edit="10">Review expectation basis</button>':'')+(timingInvestigations().length?'<button class="edit-link" data-edit="0">Review Decision timing unknowns</button>':'')+(compoundingInvestigations().length?'<button class="edit-link" data-edit="4">Review Compounding unknowns</button>':'')+(advocateInvestigations().length?'<button class="edit-link" data-edit="6">Review The Devil&#39;s Advocate unknown</button>':'')+(stressInvestigations().length?'<button class="edit-link" data-edit="7">Review Stress Test unknowns</button>':'')+(judgmentInvestigations().length?'<button class="edit-link" data-edit="8">Review Judgment Check uncertainty</button>':''),2)+section('Where the decision is vulnerable',overviewList(vulnerabilityItems(),'No pressure points recorded yet.',overviewVulnerabilityText)+(!stressSummaryUnknown()&&stressNotes()?'<h4>Your Stress Test notes</h4><p>'+esc(stressNotes())+'</p>':'')+(data.devilsAdvocate.outcomes[0].connectionResponse==='no'?'<h4>Your connection assessment</h4><p>'+esc(advocateReflectionText(data.devilsAdvocate.outcomes[0]))+'</p>':'')+(advocateEntries().length?'<button class="edit-link" data-edit="6">Review The Devil&#39;s Advocate</button>':''),7)+section('Worth noticing',(signals.length?overviewList(signals.map(r=>r.summary+(data.judgment.answers[r.id]==='yes'?' — your view changes.':' — you are unsure whether this affects your view.')),''):'<p class="muted">'+(judgmentAnswered?'Judgment Check responses are recorded below.':'Judgment Check is not fully assessed yet.')+'</p>')+judgmentAdditionalOverview("wordingContext")+judgmentAdditionalOverview("exampleContext")+judgmentAdditionalOverview("investmentContext")+judgmentChallengeOverview()+judgmentSocialOverview()+judgmentAdditionalOverview("stateContext"),8)+section('Room to change course',reverse,9)+(!a.complete?section('Things to finish or review',overviewPendingSections(),null):'')+'</div><details class="earlier-review"><summary>Earlier review material</summary>'+earlierReflectionRows().map(r=>'<p><small>'+esc(r.section)+' · '+(data.driverReview.reuseIds.includes(r.id)?'Explicitly included in your thinking':'Historical; excluded from current evidence')+'</small><br>'+esc(r.text)+'</p>').join('')+'</details><section class="ai-export"><h3>Use this decision with AI</h3><p>Here’s your decision in structured context, ready to paste into ChatGPT or any other GenAI model for deeper analysis.</p><div class="chips"><button id="copyContext">Copy decision context</button><button id="downloadContext" class="secondary">Download .md</button><span id="copyFeedback" role="status" aria-live="polite"></span></div><details><summary>Preview structured context</summary><pre class="brief">'+esc(decisionContextText())+'</pre></details></section></div>';
}
function decisionContextText(){const a=analyse(),out=[];const add=x=>out.push(x);add("# Clarity Decision Context");add("\nAssessment: "+(a.complete?"Reviewed":"Partial / incomplete"));add(approachContextText());add("\n## Decision\n"+(data.decision||"[Not answered]"));add("\n## Action under consideration\n"+(choiceOption().name||"[Not answered]"));if(data.options.length>1)add("\n## Previously entered paths (retained)\n"+data.options.map((o,i)=>String.fromCharCode(65+i)+". "+o.name).join("\n"));add("\n## Aim for this decision\n"+(data.decisionAim||"[Not answered]"));add(lifeDirectionContextText());const initialInclination=startingInclinationText();add("\n## Starting inclination\n"+initialInclination);if(data.options.length>1&&data.inclination)add("\n## Earlier starting inclination (retained)\n"+(data.inclination==="none"?"No clear inclination yet":data.options.find(o=>o.id===data.inclination)?.name||"[Not answered]"));add("\n## Time horizon\n"+(data.horizon||"[Not answered]"));add(timingContextText());add("\n## What matters most within the life I want\n"+fmt(data.priorities.map(id=>lifeDomains.find(d=>d.id===id)?.title).filter(Boolean)));add("\n## What is at stake in this decision\n"+fmt(data.stakes.map(id=>lifeDomains.find(d=>d.id===id)?.title).filter(Boolean)));add(boundariesContextText());add("\n## Boundary compatibility\n"+(data.hasHardBoundaries==="yes"?data.rules.map(r=>r.text+" — "+boundaryLabel(r)+(["no","unknown"].includes(boundaryAnswer(r))&&r.check?.note?"\n"+r.check.note:"")).join("\n"):"[No hard boundaries currently reported]"));add("\n## Compounding — "+choiceOption().name+"\n"+compoundingReflectionText(choiceOption()));if(earlierCompoundingText())add("\n### Earlier Compounding notes (retained)\n"+earlierCompoundingText());data.options.forEach(o=>{const pathTitle=(o.id===choiceOption().id?"":"Earlier path (historical) — ")+o.name;add("\n## "+pathTitle+" — Trade-Offs\nOther realistic possibilities (not ranked or selected as the best alternative):\n"+fmt(o.trade.alternatives.filter(t=>t.trim()))+"\n"+costContextText(o,"immediate")+"\n"+costContextText(o,"future"));if(legacyTradePresent(o))add("\n### Earlier Trade-Offs notes (original categories)\n"+legacyTradeText(o));add("\n## "+pathTitle+" — Incentives\n"+incentiveReflectionText(o));if((o.incentives.promises||[]).length||(o.incentives.avoid||[]).length)add("\n### Earlier Incentives selections (retained)\nGains:\n"+fmt(legacyIncentiveLabels(o,'promises'))+"\nAvoidance:\n"+fmt(legacyIncentiveLabels(o,'avoid')));add("\n## "+pathTitle+" — "+(o.id===choiceOption().id?"Further Consequences":"Earlier consequences (retained)")+"\n"+consequenceReflectionText(o));add("\n## "+pathTitle+" — Reversibility\n"+reverseContextText(o))});add("\n## The Devil's Advocate\nWorking backwards from life direction, within this decision. These are the user's reflections, not established predictions. An unknown connection remains unresolved. A no-connection response is the user's current assessment, not proof that doing this is safe.\n"+advocateContextText());if(data.inversion.some(text=>text.trim()))add("\n### Earlier Inversion notes (retained; original failure-condition question)\n"+fmt(data.inversion));add(stressContextText());if(data.incentiveConcerns.length||data.incentiveConcernNone)add("\n## Earlier incentives I did not want to keep reinforcing (retained)\n"+(data.incentiveConcernNone?"[None selected]":fmt(data.incentiveConcerns.map(id=>[...incentivePromises,...incentiveAvoid].find(x=>x.id===id)?.title||id))));add(judgmentContextText());add(driverContextText());add("\n## Current decision state\nStarting leaning: "+startingInclinationText()+"\nComparison: "+a.lean+"\nReadiness: "+a.readiness+"\nEvidence quality: "+a.evidence+"\nStability: "+a.robust);add("\n## What I still need to find out\n"+fmt(allInvestigations()));add(captureContextAppendix());add("\n---\n# INSTRUCTION FOR FURTHER ANALYSIS\nAnalyze this decision critically without making the decision for me. The readable review and capture records describe the same entries; do not count their repetition as independent evidence. Use capture records for exact text, response states, IDs and provenance. Earlier or inactive writing is not the current answer. Question versions identify exported prompt definitions; do not assume an unrecorded capture date or original wording.  Do not simply reinforce my current preference. Identify missing considerations and blind spots; challenge weak assumptions; separate facts, estimates and assumptions; identify double-counting; examine psychological pressures; trace second- and third-order consequences; identify the unknowns with the highest value of information; tell me what evidence I should gather next; argue the strongest serious case for each major option; and point out what evidence would rationally change the current lean. The action under consideration is provisional. Do not assume I have decided to do it. Do not treat not doing it as a fully defined alternative, or interpret this reflection as proof that it is the best available course of action. Explore realistic alternatives without inventing my preferences. Examine how each path relates to both my aim for this decision and my direction in life. If my life direction is unknown, help me explore it without inventing one or treating it as a barrier to deciding. Do not reduce the decision to one score or tell me what to choose.");return out.join("\n")}
const fmt=a=>(a||[]).filter(Boolean).length?(a||[]).filter(Boolean).map(x=>"- "+x).join("\n"):"[None added]";

function bind(){document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{const nextStep=+b.dataset.step;if((nextStep===2||nextStep===3||nextStep===5)&&step!==nextStep)active=data.options[0].id;if(nextStep===3&&step!==3)incentiveReview=false;step=nextStep;render()});document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{active=b.dataset.tab;render()});document.querySelectorAll("[data-root]").forEach(e=>e.oninput=()=>{data[e.dataset.root]=e.value;save()});document.querySelectorAll("[data-optname]").forEach(e=>e.oninput=()=>setOptName(e.dataset.optname,e.value));document.querySelectorAll("[data-inclination]").forEach(e=>e.onchange=()=>{data.inclination=e.value;save()});document.querySelectorAll("[data-horizon]").forEach(e=>e.onchange=()=>{data.horizon=e.value;save()});document.querySelectorAll("[data-removeopt]").forEach(b=>b.onclick=()=>{if(data.options.length<=2)return;data.options=data.options.filter(o=>o.id!==b.dataset.removeopt);if(active===b.dataset.removeopt)active=data.options[0].id;if(data.inclination===b.dataset.removeopt)data.inclination="";render()});if($("#addOpt"))$("#addOpt").onclick=()=>{if(data.options.length<5){const o=blankOption("Option "+String.fromCharCode(65+data.options.length));data.options.push(o);active=o.id;render()}};document.querySelectorAll("[data-priority]").forEach(e=>e.onchange=()=>{if(e.checked&&data.priorities.length<3)data.priorities.push(e.value);if(!e.checked){data.priorities=data.priorities.filter(x=>x!==e.value)}render()});document.querySelectorAll("[data-stake]").forEach(e=>e.onchange=()=>{data.stakes=e.checked?[...new Set([...data.stakes,e.value])]:data.stakes.filter(x=>x!==e.value);render()});document.querySelectorAll("[data-hardboundaries]").forEach(e=>e.onchange=()=>{data.hasHardBoundaries=e.value;if(e.value==="yes"&&!data.rules.length)data.rules.push({id:uid(),text:"",status:{},investigate:{}});render()});if($("#addRule"))$("#addRule").onclick=()=>{data.rules.push({id:uid(),text:"",status:{},investigate:{}});render()};document.querySelectorAll("[data-rule]").forEach(e=>e.oninput=()=>{data.rules.find(r=>r.id===e.dataset.rule).text=e.value;save()});document.querySelectorAll("[data-delrule]").forEach(b=>b.onclick=()=>{data.rules=data.rules.filter(r=>r.id!==b.dataset.delrule);render()});document.querySelectorAll("[data-list]").forEach(e=>e.oninput=()=>{const a=[...getPath(e.dataset.list)];a[+e.dataset.i]=e.value;setPath(e.dataset.list,a);if(e.dataset.list.includes(".trade.foregone")&&e.value.trim())option().trade.foregoneState="";if(e.dataset.list.includes(".trade.commitments")&&e.value.trim())option().trade.commitmentState="";save()});document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{const a=[...getPath(b.dataset.del)];a.splice(+b.dataset.i,1);setPath(b.dataset.del,a);render()});document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{setPath(b.dataset.add,[...getPath(b.dataset.add),""]);render()});document.querySelectorAll("[data-tradestate]").forEach(e=>e.onchange=()=>{const t=option().trade,k=e.dataset.tradestate;t[k+"State"]=e.value;if(e.value!=="unknown")t[k+"Unknown"]="";render()});document.querySelectorAll("[data-tradeunknown]").forEach(e=>e.oninput=()=>{option().trade[e.dataset.tradeunknown+"Unknown"]=e.value;save()});document.querySelectorAll("[data-tradeprev]").forEach(b=>b.onclick=()=>{const i=Math.max(0,data.options.indexOf(option())-1);active=data.options[i].id;render()});document.querySelectorAll("[data-tradenext]").forEach(b=>b.onclick=()=>{const i=Math.min(data.options.length-1,data.options.indexOf(option())+1);active=data.options[i].id;render()});document.querySelectorAll("[data-compoundselect]").forEach(e=>e.onchange=()=>{const k=e.dataset.compoundselect,a=data.compounding[k];if(e.checked&&a.length<3)a.push(e.value);if(!e.checked){data.compounding[k]=a.filter(x=>x!==e.value);delete data.compounding[k+"Details"][e.value];delete data.compounding[k+"Options"][e.value]}render()});document.querySelectorAll("[data-compounddetail]").forEach(e=>e.oninput=()=>{data.compounding[e.dataset.compounddetail+"Details"][e.dataset.compoundid]=e.value;save()});document.querySelectorAll("[data-compoundoption]").forEach(e=>e.onchange=()=>{const k=e.dataset.compoundoption+"Options",id=e.dataset.compoundid,a=data.compounding[k][id]||[];data.compounding[k][id]=e.checked?[...new Set([...a,e.value])]:a.filter(x=>x!==e.value);save()});document.querySelectorAll("[data-optfield]").forEach(e=>e.oninput=()=>{const [a,b]=e.dataset.optfield.split(".");option()[a][b]=e.value;save()});document.querySelectorAll("[data-stressrow]").forEach(e=>e.onchange=()=>{const r=e.dataset.stressrow,o=e.dataset.stressoption;if(!data.stressTest.ratings[r])data.stressTest.ratings[r]={};data.stressTest.ratings[r][o]=e.value;save()});document.querySelectorAll("[data-stresssummary]").forEach(e=>e.oninput=()=>{data.stressTest.notesByOption[choiceOption().id]=e.value;save()});document.querySelectorAll("[data-judgment]").forEach(e=>e.onchange=()=>{data.judgment.answers[e.dataset.judgment]=e.value;judgmentReviewChanged();save()});document.querySelectorAll("[data-judgmenttext]").forEach(e=>e.oninput=()=>{data.judgment[e.dataset.judgmenttext]=e.value;judgmentReviewChanged();save()});bindJudgmentChallenge();bindJudgmentSocial();bindJudgmentContexts();document.querySelectorAll("[data-difficulty]").forEach(e=>e.onchange=()=>{option().reverse.difficulty=+e.value;save()});document.querySelectorAll("[data-revcost]").forEach(b=>b.onclick=()=>toggle(option().reverse.costs,b.dataset.revcost));if($("#copyContext"))$("#copyContext").onclick=()=>navigator.clipboard.writeText(decisionContextText());if($("#downloadContext"))$("#downloadContext").onclick=()=>{const blob=new Blob([decisionContextText()],{type:"text/markdown"}),u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="clarity-decision-context.md";a.click();URL.revokeObjectURL(u)}}
function toggle(arr,x){const i=arr.indexOf(x);i>=0?arr.splice(i,1):arr.push(x);render()}
$('#back').onclick=()=>{step=stepOrder[Math.max(0,stepOrder.indexOf(step)-1)];active=choiceOption().id;render();};
$('#next').onclick=()=>{step=stepOrder[Math.min(stepOrder.length-1,stepOrder.indexOf(step)+1)];active=choiceOption().id;incentiveReview=false;render();};
$("#reset").onclick=()=>{if(confirm("Start a new decision?")){approachDraft=null;reverseAdoptionOpen=false;data=fresh();active=data.options[0].id;incentiveReview=false;step=0;reverseStage=0;render()}};
const originalBind=bind;
bind=function(){
 originalBind();
 bindDecisionTiming();
 bindReversibility();
 bindConsequences();
 bindAdvocate();
 document.querySelectorAll('[data-compoundingtext]').forEach(e=>e.oninput=()=>{choiceOption().compound[e.dataset.compoundingtext]=e.value;save();});
 document.querySelectorAll('[data-compoundingunknown]').forEach(e=>e.onchange=()=>{const key=e.dataset.compoundingunknown;choiceOption().compound[key+'Unknown']=e.checked;save();document.querySelector('[data-compoundingtext="'+key+'"]').disabled=e.checked;});
 document.querySelectorAll('[data-incentivetext]').forEach(e=>e.oninput=()=>{choiceOption().incentives[e.dataset.incentivetext]=e.value;save();});
 document.querySelectorAll('[data-incentivefitunknown]').forEach(e=>e.onchange=()=>{choiceOption().incentives.fitUnknown=e.checked;save();document.querySelector('[data-incentivetext="fit"]').disabled=e.checked;});
 document.querySelectorAll('[data-incentiveresponse]').forEach(e=>e.onchange=()=>{const key=e.dataset.incentiveresponse;if(!['gain','relief'].includes(key))return;const response=e.checked?e.value:'';choiceOption().incentives[key+'Response']=response;document.querySelectorAll('[data-incentiveresponse]').forEach(other=>{if(other.dataset.incentiveresponse===key)other.checked=other.value===response;});const writing=$('#incentive-'+key);if(writing)writing.disabled=Boolean(response);save();});
 document.querySelectorAll('[data-stresssummaryunknown]').forEach(e=>e.onchange=()=>{data.stressTest.summaryUnknownByOption[choiceOption().id]=e.checked;const writing=$('#stress-notes');if(writing)writing.disabled=e.checked;save();});
 document.querySelectorAll('[data-choice]').forEach(e=>{e.oninput=()=>editCurrentApproach(e.value);e.onchange=()=>{finishApproachDraft();save();};});
 document.querySelectorAll('[data-choiceinclination]').forEach(e=>e.onchange=()=>{data.choiceInclination=e.value;save();});
 document.querySelectorAll('[data-resolvelegacy]').forEach(e=>e.onclick=()=>{const t=option().trade;if(t.foregoneState==='unknown')t.foregoneState='';if(t.commitmentState==='unknown')t.commitmentState='';render();});
 document.querySelectorAll('[data-cost]').forEach(e=>e.oninput=()=>{option().trade[e.dataset.cost]=e.value;save();});
 document.querySelectorAll('[data-costunknown]').forEach(e=>e.onchange=()=>{const k=e.dataset.costunknown;option().trade[k+'Unknown']=e.checked;save();document.querySelector('[data-cost="'+k+'"]').disabled=e.checked;});
 document.querySelectorAll('[data-lifeunknown]').forEach(e=>e.onchange=()=>{data.lifeDirectionUnknown=e.checked;render();});
 document.querySelectorAll('[data-optname]').forEach(e=>e.oninput=()=>{setOptName(e.dataset.optname,e.value);const label=document.querySelector('[data-option-label="'+e.dataset.optname+'"]');if(label)label.textContent=e.value||'Untitled option';});
 document.querySelectorAll("[data-step]").forEach(b=>{const go=b.onclick;b.onclick=()=>{go();$("#nav").classList.remove("mobile-open");$("#mobileNavToggle").setAttribute("aria-expanded","false");$("#title").focus();window.scrollTo(0,0);};});
 document.querySelectorAll('[data-driveroption]').forEach(e=>e.onchange=()=>{const f=data.factors.find(f=>f.id===e.dataset.driveroption);f.options=e.checked?[...new Set([...driverOptions(f),e.value])]:driverOptions(f).filter(id=>id!==e.value);f.directionAssessed=true;save();const none=document.querySelector('[data-drivernone="'+f.id+'"]');if(none)none.checked=!f.options.length;});
 document.querySelectorAll('[data-drivernone]').forEach(e=>e.onchange=()=>{const f=data.factors.find(f=>f.id===e.dataset.drivernone);f.directionAssessed=e.checked;if(e.checked){f.options=[];document.querySelectorAll('[data-driveroption="'+f.id+'"]').forEach(c=>c.checked=false);}save();});
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{step=+b.dataset.edit;active=data.options[0].id;incentiveReview=false;render();window.scrollTo(0,0);});
 bindDrivers();
 bindReviewConnections();
 if($('#copyContext'))$('#copyContext').onclick=async()=>{try{await navigator.clipboard.writeText(decisionContextText());$('#copyFeedback').textContent='Copied';}catch{$('#copyFeedback').textContent='Could not copy. Use Preview context to copy the text.';}};
};
const originalNext=$('#next').onclick;
$('#next').onclick=()=>{if(step===9&&reverseData().trail==='irreversible'&&reverseStage<2){reverseStage++;render();window.scrollTo(0,0);return;}if(data.approachReview)data.approachReview.sections=data.approachReview.sections.filter(i=>i!==step);if(!data.reviewed)data.reviewed=[];if(!data.reviewed.includes(step))data.reviewed.push(step);originalNext();$("#title").focus();window.scrollTo(0,0);};
$('#mobileNavToggle').onclick=()=>{const open=$('#nav').classList.toggle('mobile-open');$('#mobileNavToggle').setAttribute('aria-expanded',String(open));};

render();
