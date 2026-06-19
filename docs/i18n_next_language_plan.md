# Next Offline Language Pack Plan

## Current Coverage Status

| Language | Code | UI Dict | SQL | Java | Python | ITPass | SG | Glossary | Coding Typing |
|----------|------|---------|-----|------|--------|-------|----|----------|---------------|
| Korean (한국어) | ko | ✅ FULL | ✅ FULL | ✅ USABLE | ✅ USABLE | ✅ USABLE | ✅ USABLE | ✅ FULL | ✅ FULL |
| Vietnamese (Tiếng Việt) | vi | ⚠️ PARTIAL | ⚠️ STARTER | ⚠️ STARTER | ⚠️ PARTIAL | ⚠️ STARTER | ⚠️ STARTER | ⚠️ PARTIAL | ❌ MISSING |
| Burmese (မြန်မာ) | my | ⚠️ PARTIAL | ⚠️ STARTER | ⚠️ STARTER | ⚠️ STARTER | ⚠️ STARTER | ⚠️ STARTER | ⚠️ PARTIAL | ❌ MISSING |
| Thai (ไทย) | th | ⚠️ PARTIAL | ✅ FULL | ❌ FALLBACK | ❌ FALLBACK | ❌ FALLBACK | ❌ FALLBACK | ❌ MISSING | ❌ MISSING |
| Indonesian (Bahasa) | id | ⚠️ PARTIAL | ✅ FULL | ❌ FALLBACK | ❌ FALLBACK | ❌ FALLBACK | ❌ FALLBACK | ❌ MISSING | ❌ MISSING |

### Legend
- FULL = Complete local content
- USABLE = Complete but quality under review
- STARTER = Has content but marked needsReview
- PARTIAL = Partial coverage
- FALLBACK = No local content, falls back to ja/zh
- MISSING = No data

## Recommended Order

### 1. Vietnamese (vi / vi-VN) — First Priority
- **Rationale**: Largest existing content pack base after Korean. All 5 subjects already have starter packs. UI dict is near-complete (20 blocks).
- **First round scope**: SQL → Java → Python → ITPass → SG
- **Reusable tools**: `verify_all_language_content_switch.js`, `verify_i18n_coverage_matrix.js`, `verify_offline_i18n_switch.js`

### 2. Thai (th / th-TH) — Second Priority
- **Rationale**: SQL lessons already FULL. UI dict has 7 blocks. Fallback-heavy but SQL baseline solid.
- **First round scope**: SQL (already FULL) → Java and Python content packs → UI dict expansion
- **Note**: Thai script detection and fallback logic already implemented in `normalizeLang`

### 3. Indonesian (id / id-ID) — Third Priority
- **Rationale**: Same pattern as Thai — SQL FULL, UI dict 7 blocks, others fallback.
- **First round scope**: SQL (already FULL) → Java and Python content packs
- **Terminology**: Need to establish Indonesian IT education conventions

### 4. Burmese (my / my-MM) — Fourth Priority
- **Rationale**: Already has starter packs in all 5 subjects. UI dict 20 blocks. But quality is low (AI-assisted with needsReview).
- **First round scope**: Quality review of existing packs → SQL → Java/Python cleanup
- **Note**: Myanmar script detection already supported in `normalizeLang`

## Per-Language First Round Modules

| Language | Round 1 Modules | Verification Tools to Reuse |
|----------|----------------|---------------------------|
| Vietnamese | SQL → Java → UI Dict Completion | `verify_vi_quality_gate.js` (adapt from ko) |
| Thai | Java pack → Python pack → UI Dict | `verify_th_quality_gate.js` |
| Indonesian | Java pack → Python pack → UI Dict | `verify_id_quality_gate.js` |
| Burmese | Quality review → SQL fix | `verify_my_quality_gate.js` |

## Quality Rules Adaptation

For each new language, adapt the Korean quality gate:

### Vietnamese
- Detect Vietnamese diacritics: `/[\u00C0-\u1EF9]/`
- Check for Chinese residue (same as Korean gate)
- Vietnamese IT terminology (use local education ministry standard)

### Thai
- Detect Thai script: `/[\u0E00-\u0E7F]/`
- Check for English/Chinese residual
- No spaces between words — use ICU/segmenter for word count

### Indonesian
- Latin script — use stopword/function word analysis
- Check for proper Indonesian passive voice patterns
- Avoid mixing English and Indonesian within sentences

### Burmese
- Detect Myanmar script: `/[\u1000-\u109F]/`
- Check for residual English/CJK
- Word segmentation needed (Burmese has no spaces)

## Verification Strategy

### Phase 1 — Script & Structure
```js
// Detect if content is in the expected language
function detectScript(text, lang) {
  switch (lang) {
    case 'vi': return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/;
    case 'th': return /[\u0E00-\u0E7F]/;
    case 'id': return /(?:dan|yang|di|ke|dari|dengan|untuk|pada|adalah|ini|itu)/i;
    case 'my': return /[\u1000-\u109F]/;
  }
}
```

### Phase 2 — Terminology Consistency
Define language-specific IT terminology maps (like Korean gate):
- Vietnamese: `Cơ sở dữ liệu (Database)`, `Lớp (Class)`, `Đối tượng (Object)`
- Thai: `ฐานข้อมูล (Database)`, `คลาส (Class)`, `ออบเจ็กต์ (Object)`
- Indonesian: `Basis data (Database)`, `Kelas (Class)`, `Objek (Object)`
- Burmese: `ဒေတာဘေ့စ် (Database)`, `အတန်း (Class)`, `အရာဝတ္ထု (Object)`

## Timeline Suggestion

1. **Week 1**: Vietnamese SQL + UI dict completion + verify tools adaptation
2. **Week 2**: Vietnamese Java + Python packs
3. **Week 3**: Thai content packs
4. **Week 4**: Indonesian content packs
5. **Week 5**: Burmese quality review + remaining languages final pass

Each language goes through: Packs → Quality Gate → Regression → Git Push
