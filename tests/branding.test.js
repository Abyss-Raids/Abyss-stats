import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const file=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('site source contains permanent Abyss branding and complete guild title card',()=>{
  const html=file('index.html'),js=file('assets/site.js'),css=file('assets/abyss-theme.css');
  assert.match(html,/<title>ABYSS \| Guild Armory & Raid Chronicles<\/title>/);
  assert.match(html,/<span class="brand-name">ABYSS<\/span>/);
  assert.match(html,/assets\/abyss-crest\.svg/);
  assert.match(html,/assets\/abyss-theme\.css/);
  assert.match(html,/ABYSS GUILD ARCHIVES/);
  assert.match(js,/Guild Armory &amp; Raid Chronicles/);
  assert.match(js,/THE GUILD · THE RAID · THE RECORD/);
  assert.match(js,/About the Abyss guild/);
  assert.match(js,/RECORDED ROLLS/);
  assert.doesNotMatch(html,/\bFATE\b/);
  assert.doesNotMatch(js,/\bFATE\b/);
  assert.match(css,/\.guild-brief/);
});
test('build ships Abyss branding without post-build rewriting',()=>{
  const build=file('scripts/build-archive.mjs'),deploy=file('.github/workflows/deploy.yml');
  assert.match(build,/'abyss-crest\.svg'/);
  assert.match(build,/'abyss-theme\.css'/);
  assert.match(build,/404\.html/);
  assert.doesNotMatch(deploy,/abyss-brand\.mjs/);
  assert.match(deploy,/npm run build/);
});