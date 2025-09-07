#!/usr/bin/env node
const fs = require('fs'), path = require('path');

function filesInDir(dir){
  if(!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f=>f.endsWith('.json')).map(f=>path.join(dir,f));
}
function lint(file){
  const raw = fs.readFileSync(file,'utf8');
  let data; try{ data = JSON.parse(raw);}catch(e){return [`${file}: invalid JSON (${e.message})`];}
  const errs = [];
  for(const [tactic, arr] of Object.entries(data||{})){
    if(!Array.isArray(arr)) continue;
    for(const t of arr){
      const subs = new Set(t.subtechniques||[]);
      for(const v of (t.vulnerabilities||[])){
        if(!Array.isArray(v.standards_ref) || v.standards_ref.length===0){
          errs.push(`${file}: Vulnerability "${v.name||'unnamed'}" missing standards_ref`);
        }
        if(v.linked_subtechnique && !subs.has(v.linked_subtechnique)){
          errs.push(`${file}: Vulnerability "${v.name||'unnamed'}" linked_subtechnique "${v.linked_subtechnique}" not in subtechniques of "${t.technique}"`);
        }
      }
      for(const x of (t.exploits||[])){
        if(!Array.isArray(x.standards_ref) || x.standards_ref.length===0){
          errs.push(`${file}: Exploit "${x.name||'unnamed'}" missing standards_ref`);
        }
      }
    }
  }
  return errs;
}

let errors = [];
for(const d of ['data','datasets']){
  for(const f of filesInDir(d)){
    errors = errors.concat(lint(f));
  }
}
if(errors.length){
  console.error('Lint errors found:');
  for(const e of errors) console.error(' -', e);
  process.exit(1);
}else{
  console.log('Lint passed: no issues found.');
}
