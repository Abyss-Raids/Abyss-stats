/**
 * Abyss Guild Armory rebrand adapter, v1.3.0.
 * Operates ONLY on website presentation files. Historical raid-exports and
 * generated JSON catalog records are never read, rewritten or deleted.
 *
 * Usage:
 *  node scripts/abyss-brand.mjs --dist    (after npm run build; GitHub Actions)
 *  node scripts/abyss-brand.mjs --source  (optional: permanently patch source UI)
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2] || '--dist';
if (!['--dist', '--source'].includes(mode)) {
  console.error('Usage: node scripts/abyss-brand.mjs [--dist | --source]');
  process.exit(2);
}
const dir = mode === '--source' ? root : path.join(root, 'dist');
const title='ABYSS | Guild Armory & Raid Archives';

// Legacy CSS custom properties, JS element IDs, and localStorage keys remain
// unchanged intentionally to avoid breaking font scaling and 3D viewer logic.
function rebrandHtml(str) {
  let s = str.replace(/\bFATE\b/g, 'ABYSS').replace(/\bFate\b/g,'Abyss');
  s = s.replace(/fate-crest\.svg/g,'abyss-crest.svg');
  s = s.replace(/<title>[^<]*<\/title>/i,`<title>${title}</title>`);
  s = s.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>?/i,
    '<meta name="description" content="ABYSS Guild Armory: our World of Warcraft Forever raids, raiders, loot, roll history and guild statistics.">');
  s = s.replace(/(<meta\s+name="theme-color"\s+content=")[^"]+(")/i,'$1#0b0e17$2');
  const tag='<link rel="stylesheet" href="assets/abyss-theme.css">';
  if(!s.includes('abyss-theme.css')) {
    if(/<link\s+rel="stylesheet"\s+href="assets\/site\.css"\s*\/?\s*>/i.test(s)) {
      s=s.replace(/(<link\s+rel="stylesheet"\s+href="assets\/site\.css"\s*\/?\s*>)/i,`$1\n${tag}`);
    } else {
      s=s.replace(/<\/head>/i,`${tag}\n</head>`);
    }
  }
  return s;
}
function rebrandJs(str) {
  return str
    .replace(/ROLLS OF FATE/g,'RECORDED ROLLS')
    .replace(/\bFATE\b/g,'ABYSS')
    .replace(/\bFate\b/g,'Abyss')
    .replace(/fate-crest\.svg/g,'abyss-crest.svg');
}
async function patch(relative, fn) {
  const p=path.join(dir,relative);
  const input=await fs.readFile(p,'utf8');
  const result=fn(input);
  if(result!==input) await fs.writeFile(p,result,'utf8');
  console.log(`${result!==input?'UPDATED':'UNCHANGED'}: ${path.relative(root,p)}`);
  return result;
}
async function main() {
  const html=await patch('index.html',rebrandHtml);
  const js=await patch('assets/site.js',rebrandJs);
  if(!html.includes('ABYSS') || !js.includes('ABYSS')) {
    throw new Error('Could not verify Abyss branding in the active original website files. Please confirm this is the existing FATE Guild Armory repository.');
  }
  const target=path.join(dir,'assets');
  await fs.mkdir(target,{recursive:true});
  if(mode==='--dist') {
    for(const filename of ['abyss-crest.svg','abyss-theme.css']) {
      await fs.copyFile(path.join(root,'assets',filename),path.join(target,filename));
      console.log(`COPIED: dist/assets/${filename}`);
    }
  }
  console.log(`PASS: Abyss website UI ready in ${path.relative(root,dir)||'source'}`);
  console.log('UNCHANGED: raid-exports/, data/ historical exports, catalog JSON, parsing and statistics logic.');
}
main().catch(err=>{console.error('ABYSS BRAND FAILED:',err?.message||err);process.exitCode=1;});
