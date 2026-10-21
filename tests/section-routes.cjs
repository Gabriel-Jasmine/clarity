const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const app = fs.readFileSync(require('node:path').join(__dirname,'..','app.js'),'utf8');
const nav = fs.readFileSync(require('node:path').join(__dirname,'..','navigation.js'),'utf8');
new vm.Script(app,{filename:'app.js'});
new vm.Script(nav,{filename:'navigation.js'});
assert.equal((app.match(/const sectionSlugs=/g)||[]).length,1);
assert.equal((nav.match(/const slugToStep=/g)||[]).length,1);
assert.equal((app.match(/addEventListener\('popstate'/g)||[]).length,1);
const routes=app.match(/const sectionSlugs=(\[[^;]+\]);/);
assert(routes);
const slugs=JSON.parse(routes[1]);
assert.equal(slugs.length,12);
assert.equal(new Set(slugs).size,12);
const shell=fs.readFileSync(require('node:path').join(__dirname,'..','decision.html'),'utf8');
for(const slug of slugs){
 const file=require('node:path').join(__dirname,'..',slug,'index.html');assert(fs.existsSync(file),slug);
 const entry=fs.readFileSync(file,'utf8');
 assert.equal(entry,shell.replace('<base href="./">','<base href="../">'),slug+' must match the shared shell');
 assert(entry.indexOf('completion.js?')<entry.indexOf('app.js?'),slug+' loads completion before the app');
}
console.log('Passed: routing scripts parse, no duplicate declarations/listeners, twelve unique static section routes.');
