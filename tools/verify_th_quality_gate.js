#!/usr/bin/env node
/**
 * tools/verify_th_quality_gate.js
 * Thai / ภาษาไทย content quality gate.
 * Usage: node tools/verify_th_quality_gate.js
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const THAI = /[\u0E00-\u0E7F]/;
const CHINESE = /[\u4e00-\u9fff]{4,}/;
const JAPANESE = /[\u3040-\u309F\u30A0-\u30FF]{3,}/;
const KOREAN = /[\uac00-\ud7af]{2,}/;
const MYANMAR = /[\u1000-\u109F]{2,}/;
const VIETNAMESE = /[ăâđêôơưáàảãạ]/;
const FORBIDDEN = /TODO|TBD|needsReview|待翻译|未翻译|翻译中|翻訳中|Translating|\[object Object\]/i;
const MIN_EXP = 20;
let pass=0,fail=0,warn=0;
function ok(l,d){pass++;console.log("  \x1b[32mPASS\x1b[0m "+l+(d?" - "+d:""));}
function bad(l,d){fail++;console.log("  \x1b[31mFAIL\x1b[0m "+l+(d?" - "+d:""));}
function wa(l,d){warn++;console.log("  \x1b[33mWARN\x1b[0m "+l+(d?" - "+d:""));}
function read(f){return fs.existsSync(f)?fs.readFileSync(f,"utf8"):"";}

const SUBJECTS=[
  {name:"SQL",pack:"sql_th.js",key:"sql:",expected:36},
  {name:"Java",pack:"java_th.js",key:"java:",expected:115},
  {name:"Python",pack:"python_th.js",key:"python:",expected:255},
  {name:"IT Passport",pack:"itpass_th.js",key:"itpass:",expected:85},
  {name:"SG",pack:"sg_th.js",key:"sg:",expected:44},
];

function loadPack(pf){
  const fp=path.join(ROOT,"data","i18n_content",pf);
  if(!fs.existsSync(fp)) return null;
  const s={window:{CONTENT_I18N:{}},console:{log:()=>{}}};
  s.globalThis=s;
  try{vm.createContext(s);vm.runInContext(read(fp),s);return s.window.CONTENT_I18N;}
  catch(e){return null;}
}

function assess(sbj,pack){
  const name=sbj.name,kp=sbj.key;
  const entries=pack?Object.keys(pack).filter(k=>k.startsWith(kp)):[];
  const cnt=entries.length,exp=sbj.expected;
  const issues=[],chineseRes=[],japaneseRes=[],koreanRes=[],myanmarRes=[],vietRes=[],
        forbiddenFound=[],shortExp=[],noThai=[];
  if(!pack) return {level:"MISSING",count:0,expected:sbj.expected,hasThai:false,
    issues:["No pack file"],chineseResidue:[],japaneseResidue:[],koreanResidue:[],
    myanmarResidue:[],vietResidue:[],forbiddenFound:[],shortExplanations:[],noThai:[]};
  if(cnt===0) return {level:"MISSING",count:0,expected:sbj.expected,hasThai:false,
    issues:["Empty pack"],chineseResidue:[],japaneseResidue:[],koreanResidue:[],
    myanmarResidue:[],vietResidue:[],forbiddenFound:[],shortExplanations:[],noThai:[]};
  for(const e of entries){
    const d=pack[e]&&pack[e].th;
    if(!d){issues.push(e+" missing th data");continue;}
    const ft=JSON.stringify(d);
    const fb=ft.match(FORBIDDEN);
    if(fb) forbiddenFound.push(e+": "+fb[0]);
    if(d.concept){
      if(CHINESE.test(d.concept)&&!THAI.test(d.concept)) chineseRes.push(e);
      if(JAPANESE.test(d.concept)&&!THAI.test(d.concept)) japaneseRes.push(e);
      if(KOREAN.test(d.concept)&&!THAI.test(d.concept)) koreanRes.push(e);
      if(MYANMAR.test(d.concept)&&!THAI.test(d.concept)) myanmarRes.push(e);
      if(VIETNAMESE.test(d.concept)&&!THAI.test(d.concept)) vietRes.push(e);
    }
    if(d.title&&!THAI.test(d.title)&&d.concept&&!THAI.test(d.concept)) noThai.push(e);
    if(d.concept&&d.concept.length<MIN_EXP) shortExp.push(e+" ("+d.concept.length+" chars)");
  }
  const comp=cnt>=exp,hasThai=noThai.length<cnt*0.1,hasChinese=chineseRes.length>cnt*0.1,
        hasJapanese=japaneseRes.length>cnt*0.1,hasKorean=koreanRes.length>cnt*0.1,
        hasMyanmar=myanmarRes.length>cnt*0.1,hasViet=vietRes.length>cnt*0.1,
        hasForbidden=forbiddenFound.length>0,hasShort=shortExp.length>cnt*0.15;
  let level;
  if(!comp) level="BROKEN";
  else if(hasForbidden) level="BROKEN";
  else if(hasChinese||hasJapanese||hasKorean||hasMyanmar||hasViet) level="NEEDS_REVIEW";
  else if(!hasThai) level="STARTER";
  else if(hasShort||noThai.length>0) level="USABLE";
  else level="USABLE";
  return{level,count:cnt,expected:exp,hasThai,
    issues,chineseResidue:chineseRes.slice(0,10),japaneseResidue:japaneseRes.slice(0,10),
    koreanResidue:koreanRes.slice(0,10),myanmarResidue:myanmarRes.slice(0,10),
    vietResidue:vietRes.slice(0,10),forbiddenFound,shortExplanations:shortExp.slice(0,10),noThai:noThai.slice(0,20)};
}

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║     Thai Content Quality Gate v1                           ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");

const results={};
for(const s of SUBJECTS){
  console.log("── "+s.name+" ──");
  const p=loadPack(s.pack),q=assess(s,p);results[s.name]=q;
  const ic=q.level==="FULL"?"\x1b[32m●\x1b[0m":q.level==="USABLE"?"\x1b[34m●\x1b[0m":
           q.level==="STARTER"?"\x1b[36m●\x1b[0m":q.level==="MISSING"?"\x1b[35m●\x1b[0m":
           q.level==="NEEDS_REVIEW"?"\x1b[33m●\x1b[0m":"\x1b[31m●\x1b[0m";
  console.log(`  ${ic} Quality: ${q.level} — ${q.count||0}/${q.expected} entries`);
  if(q.issues.length) wa(s.name+" issues",q.issues.slice(0,3).join("; "));
  if(q.chineseResidue.length) bad(s.name+" Chinese",q.chineseResidue.length+" entries");
  else ok(s.name+" no Chinese");
  if(q.japaneseResidue.length) bad(s.name+" Japanese",q.japaneseResidue.length+" entries");
  else ok(s.name+" no Japanese");
  if(q.koreanResidue.length) bad(s.name+" Korean",q.koreanResidue.length+" entries");
  else ok(s.name+" no Korean");
  if(q.myanmarResidue.length) bad(s.name+" Myanmar",q.myanmarResidue.length+" entries");
  else ok(s.name+" no Myanmar");
  if(q.vietResidue.length) bad(s.name+" Vietnamese",q.vietResidue.length+" entries");
  else ok(s.name+" no Vietnamese");
  if(q.forbiddenFound.length) bad(s.name+" forbidden",q.forbiddenFound.slice(0,3).join("; "));
  else ok(s.name+" no forbidden");
  if(q.noThai.length) wa(s.name+" missing Thai",q.noThai.length+" entries");
  else ok(s.name+" contains Thai");
  if(q.shortExplanations.length) wa(s.name+" short explanations",q.shortExplanations.length+" entries");
  else ok(s.name+" explanation adequate");
  console.log("");
}

console.log("═══ Quality Gate Summary ═══\n");
for(const[n,r]of Object.entries(results)){
  const ic=r.level==="FULL"?"● FULL":r.level==="USABLE"?"● USABLE":
           r.level==="STARTER"?"● STARTER":r.level==="MISSING"?"● MISSING":
           r.level==="FALLBACK"?"● FALLBACK":"● BROKEN";
  console.log(`  ${ic.padEnd(15)} ${n.padEnd(15)} ${r.count||0}/${r.expected}`);
}

console.log("\n── UI & Specialized ──");
const ui=read(path.join(ROOT,"assets","js","i18n-ui-dict.js"));
const thBlocks=(ui.match(/th-TH/g)||[]).length;
if(thBlocks>=3) ok("UI th-TH blocks",thBlocks+" blocks");
else wa("UI th-TH blocks",thBlocks+" blocks");

console.log("\n── Offline i18n ──");
const i18n=read(path.join(ROOT,"assets","js","i18n.js"));
const ci=read(path.join(ROOT,"assets","js","content-i18n.js"));
if(i18n.includes("DISABLE_TRANSLATION_OVERLAY")) ok("i18n.js offline flag");
else wa("missing DISABLE_TRANSLATION_OVERLAY");
if(ci.includes('"th"')) ok("content-i18n.js includes th");
else wa("content-i18n.js missing th");
const sus=["api/translate","deepl","libretranslate","googleapis"];
let sc=0;for(const p of sus){if(i18n.includes(p)||ci.includes(p))sc++;}
if(sc===0) ok("No suspicious translation API");
else wa("Suspicious patterns",sc+" matches");

console.log("\n╔══════════════════════════════════════════════════════════════╗");
console.log("║  Thai Quality Gate Results                                 ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
for(const[n,r]of Object.entries(results)){
  console.log(`  ${n.padEnd(15)} ${r.level.padEnd(15)} ${r.count||0}/${r.expected}  ${r.hasThai?"✅ Thai":r.level==="MISSING"?"❌ Missing":"❌ No Thai"}`);
}
console.log(`\n${pass} PASS / ${fail} FAIL / ${warn} WARN`);
process.exit(fail>0?1:0);
