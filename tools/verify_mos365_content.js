#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const content = require(path.join(__dirname, '..', 'data', 'mos365_content.js'));

function hasFields(item, fields, label) {
  fields.forEach((field) => assert.ok(item[field] !== undefined && item[field] !== '', `${label} missing ${field}`));
}

assert.strictEqual(content.examCode, 'MOS365-EXCEL-GENERAL');
assert.strictEqual(content.domains.length, 5, 'expected five MOS scope domains');
assert.ok(content.skills.length >= 60, 'expected at least 60 skill IDs');
assert.strictEqual(new Set(content.skills.map((item) => item.id)).size, content.skills.length, 'skill IDs must be unique');
['WORKBOOK.CREATE', 'CELL.CONDITIONAL_FORMATTING', 'TABLE.CREATE', 'FUNCTION.IF', 'CHART.CREATE'].forEach((suffix) => {
  assert.ok(content.skills.some((item) => item.id === `MOS365.EXCEL.${suffix}`), `missing stable skill ID ${suffix}`);
});
content.skills.forEach((item) => hasFields(item, ['id', 'domainId', 'titleJa', 'titleZh'], 'skill'));

assert.ok(content.lessons.length >= 80, 'expected at least 80 lessons');
content.lessons.forEach((item) => hasFields(item, [
  'id', 'skillId', 'titleJa', 'titleZh', 'conceptJa', 'conceptZh', 'menuJa', 'stepsJa', 'stepsZh',
  'keyboardJa', 'keyboardZh', 'exampleJa', 'exampleZh', 'mistakeJa', 'mistakeZh', 'checkJa', 'checkZh'
], 'lesson'));

assert.ok(content.dictionary.length >= 20, 'expected at least 20 dictionary entries');
const skillIds = new Set(content.skills.map((item) => item.id));
content.dictionary.forEach((item) => {
  hasFields(item, ['name', 'descriptionJa', 'descriptionZh', 'syntax', 'tier', 'menuJa', 'menuZh', 'errorsJa', 'errorsZh', 'skillIds'], 'dictionary entry');
  item.skillIds.forEach((skillId) => assert.ok(skillIds.has(skillId), `dictionary maps to unknown skill ${skillId}`));
});

assert.ok(content.exercises.length >= 150, 'expected at least 150 exercises');
content.exercises.forEach((item) => hasFields(item, ['id', 'skillId', 'type', 'promptJa', 'promptZh', 'optionsJa', 'answerIndex', 'explanationJa', 'explanationZh'], 'exercise'));
assert.ok(content.guidedPractices.length >= 30, 'expected at least 30 guided practices');
content.guidedPractices.forEach((item) => hasFields(item, ['id', 'skillIds', 'titleJa', 'titleZh', 'taskJa', 'taskZh', 'hintsJa', 'hintsZh'], 'guided practice'));

assert.strictEqual(content.mockBlueprints.length, 3, 'expected three original scenarios');
content.mockBlueprints.forEach((item) => {
  assert.deepStrictEqual(item.variants, [1, 2, 3, 4], `${item.id} must expose four reproducible variants`);
  assert.ok(item.tasks.length >= 45 && item.tasks.length <= 55, `${item.id} must have 45–55 score points`);
  item.tasks.forEach((task) => {
    hasFields(task, ['taskId', 'instructionJa', 'skillIds', 'weight'], 'mock task');
    assert.strictEqual(Object.prototype.hasOwnProperty.call(task, 'instructionZh'), false, 'mock tasks must not expose Chinese instructions');
    assert.ok(!/(中文|ヒント|答え|正解|菜单路径|メニュー経路)/.test(task.instructionJa), 'mock task leaks help content');
  });
});

const ui = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'mos365.js'), 'utf8');
new Function(ui);
const service = fs.readFileSync(path.join(__dirname, '..', 'mos365_service.py'), 'utf8');
const server = fs.readFileSync(path.join(__dirname, '..', 'server.py'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert.ok(index.includes('data/mos365_content.js'), 'index must load MOS content data');
assert.ok(index.includes('assets/js/mos365.js'), 'index must load MOS UI module');
assert.ok(ui.includes('module-switch-panel__body'), 'MOS must integrate with the module switch drawer');
assert.ok(ui.includes('module-switch-option-mos365'), 'MOS module drawer entry must have a stable ID');
assert.ok(!ui.includes('mos365-launcher'), 'MOS must not use a floating launcher');
assert.ok(ui.includes("'/api/mos365/sessions'"), 'UI must use local MOS session API');
assert.ok(ui.includes("'/api/mos365/score'"), 'UI must use local MOS scoring API');
assert.ok(!/https?:\/\//.test(ui), 'MOS UI must not contain network URLs');
assert.ok(!/apiKey|Authorization|Bearer\s+/i.test(ui), 'MOS UI must not embed credentials');
assert.ok(!/shell\s*=\s*True|os\.system|cmd\.exe|powershell/i.test(service), 'MOS service contains prohibited command execution');
assert.ok(server.includes('def is_mos_local_request'), 'MOS routes must enforce local origin checks');
assert.ok(server.includes("path.startswith('/api/mos365/') and not self.is_mos_local_request()"), 'MOS POST routes must reject non-local callers');
assert.ok(service.includes('subprocess.Popen([str(excel), "/x", str(paths.workbook)], shell=False'), 'Excel launch must use only the allowlisted executable, fixed /x isolation flag, and current-session workbook');
// Verify service does not accept arbitrary paths EXCEPT in session_verify (which validates against manifest)
var servicePaths = service.replace(/def session_verify[\s\S]*?def _normal_formula/, '');
assert.ok(!/payload\.get\(["'](?:path|file|workbookPath|exe|executable)["']/.test(servicePaths), 'MOS service must not accept arbitrary executable or workbook paths outside session_verify');

console.log(JSON.stringify({
  status: 'PASS',
  skills: content.skills.length,
  lessons: content.lessons.length,
  dictionary: content.dictionary.length,
  exercises: content.exercises.length,
  guidedPractices: content.guidedPractices.length,
  mockScenarios: content.mockBlueprints.length,
  mockTasksPerScenario: content.mockBlueprints[0].tasks.length
}, null, 2));
