// Unit test script to verify the Japanese Romaji engine logic in typing_sandbox.js
const fs = require('fs');
const path = require('path');

// Read the typing_sandbox.js file content
const jsContent = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'typing_sandbox.js'), 'utf8');

// Mock browser dependencies
global.window = {};
global.document = {
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelectorAll: () => [],
  getElementById: () => null
};

// Evaluate the javascript file within global context
try {
  eval(jsContent);
  console.log("✓ Syntax Check: typing_sandbox.js loaded successfully with no syntax errors.");
} catch (e) {
  console.error("✗ Syntax Check Failed:", e);
  process.exit(1);
}

// Extract internal helper functions by evaluating specific strings or using simulated parser
// To verify the actual function from file, we can extract and evaluate getBaseRomajiList and parseToSyllables.
// Let's create a sandboxed evaluator for these two functions.
const getBaseRomajiListStr = jsContent.match(/function getBaseRomajiList[\s\S]+?return \[[\s\S]+?\}/)[0];
const parseToSyllablesStr = jsContent.match(/function parseToSyllables[\s\S]+?return output;[\s\S]*?\}/)[0];
const KANA_TO_ROMAJI_MAP_Str = jsContent.match(/const KANA_TO_ROMAJI_MAP = \{[\s\S]+?\};/)[0];

let getBaseRomajiList, parseToSyllables;
try {
  eval(KANA_TO_ROMAJI_MAP_Str);
  eval("var katakanaToHiragana = " + jsContent.match(/function katakanaToHiragana[\s\S]+?\}/)[0]);
  eval("var getBaseRomajiList = " + getBaseRomajiListStr);
  eval("var parseToSyllables = " + parseToSyllablesStr);
  console.log("✓ Evaluated parser functions successfully.");
} catch (e) {
  console.error("✗ Failed to extract parser functions:", e);
  process.exit(1);
}

// Test cases for the parser
const testCases = [
  {
    input: "あいうえお",
    expectedSyllables: ["あ", "い", "う", "え", "お"],
    expectedRomajiPrefixes: ["a", "i", "u", "e", "o"]
  },
  {
    input: "しゅきー", // しゅ + き + ー
    expectedSyllables: ["しゅ", "き", "ー"],
    expectedRomajiPrefixes: ["shu", "ki", "-"]
  },
  {
    input: "がっこう", // が + っこ + う (double consonant combined with next syllable)
    expectedSyllables: ["が", "っこ", "う"],
    expectedRomajiPrefixes: ["ga", "kko", "u"]
  },
  {
    input: "っしゃ", // っ + しゃ -> ssha / ssya
    expectedSyllables: ["っしゃ"],
    expectedRomajiPrefixes: ["ssha"]
  },
  {
    input: "データベース", // Katakana check (normalized to Hiragana)
    expectedSyllables: ["で", "ー", "た", "べ", "ー", "す"],
    expectedRomajiPrefixes: ["de", "-", "ta", "be", "-", "su"]
  },
  {
    input: "SQL", // English words check
    expectedSyllables: ["S", "Q", "L"],
    expectedRomajiPrefixes: ["s", "q", "l"]
  }
];

let failed = false;

testCases.forEach((t, idx) => {
  console.log(`\nTesting Input: "${t.input}"`);
  const result = parseToSyllables(t.input);
  
  // Verify length
  if (result.length !== t.expectedSyllables.length) {
    console.error(`  ✗ Length mismatch: expected ${t.expectedSyllables.length}, got ${result.length}`);
    failed = true;
    return;
  }
  
  result.forEach((syl, sIdx) => {
    const expectedKana = t.expectedSyllables[sIdx];
    const expectedPrefix = t.expectedRomajiPrefixes[sIdx];
    
    if (syl.kana !== expectedKana) {
      console.error(`  ✗ Syllable ${sIdx} kana mismatch: expected "${expectedKana}", got "${syl.kana}"`);
      failed = true;
    } else {
      console.log(`  ✓ Syllable ${sIdx} parsed as "${syl.kana}"`);
    }
    
    // Verify that at least one of the romaji variants matches the expected prefix
    const hasMatch = syl.romajiList.some(r => r.startsWith(expectedPrefix));
    if (!hasMatch) {
      console.error(`  ✗ Syllable ${sIdx} Romaji list mismatch: expected prefix "${expectedPrefix}", got [${syl.romajiList.join(', ')}]`);
      failed = true;
    } else {
      console.log(`    ✓ Romaji variants: [${syl.romajiList.join(', ')}]`);
    }
  });
});

if (failed) {
  console.error("\n✗ Unit Tests Failed!");
  process.exit(1);
} else {
  console.log("\n✓ All Unit Tests Passed Successfully!");
}
