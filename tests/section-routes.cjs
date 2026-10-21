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
for(const slug of slugs){assert(fs.existsSync(require('node:path').join(__dirname,'..',slug,'index.html')),slug);}
console.log('Passed: routing scripts parse, no duplicate declarations/listeners, twelve unique static section routes.');
