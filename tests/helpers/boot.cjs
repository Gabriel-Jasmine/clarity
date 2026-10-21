const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=['completion.js','capture.js','reversibility.js','app.js'].map(file=>fs.readFileSync(require('path').join(__dirname,'..','..',file),'utf8')).join('\n');
function boot(saved){
 const globals=new Map(),screenNodes=[];let storage=saved?JSON.stringify(saved):null;
 const node=(attrs='')=>{
  const n={style:{},dataset:{},value:'',textContent:'',disabled:false,hidden:false,checked:false,classList:{toggle:()=>false,remove(){}},setAttribute(){},focus(){}};
  for(const m of attrs.matchAll(/data-([a-z]+)(?:="([^"]*)")?/g))n.dataset[m[1]]=m[2]||'';
  n.id=attrs.match(/\bid="([^"]*)"/)?.[1];n.hidden=/\bhidden\b/.test(attrs);n.checked=/\bchecked\b/.test(attrs);n.value=attrs.match(/\bvalue="([^"]*)"/)?.[1]||'';
  let html='';Object.defineProperty(n,'innerHTML',{get:()=>html,set:value=>{
   html=value;if(n===globals.get('#screen')){screenNodes.length=0;for(const m of value.matchAll(/<(?:textarea|button|input|select|div|p|span|fieldset|legend|label|details)\b([^>]*)>/g))screenNodes.push(node(m[1]));}
  }});return n;
 };
 for(const id of ['title','stepCount','bar','nav','back','next','screen','reset','mobileNavToggle'])globals.set('#'+id,node());
 const doc={querySelector:s=>globals.get(s)||screenNodes.find(n=>s==='#'+n.id)||null,querySelectorAll:s=>{const key=s.match(/^\[data-([a-z]+)\]$/)?.[1];return key?screenNodes.filter(n=>key in n.dataset):[];},getElementById:id=>globals.get('#'+id)||screenNodes.find(n=>n.id===id)||null};
 const ctx={document:doc,localStorage:{getItem:()=>storage,setItem:(k,v)=>storage=v},window:{scrollTo(){},addEventListener(){}},navigator:{clipboard:{writeText:async()=>{}}},confirm:()=>true,console,Blob,URL};
 vm.createContext(ctx);vm.runInContext(source,ctx);return{run:code=>vm.runInContext(code,ctx),doc,reload:()=>boot(JSON.parse(storage)),stored:()=>JSON.parse(storage)};
}
module.exports={boot};
