# Visible Content Gold Gate Standard

## Purpose

Visible Content Gold Gate verifies what learners actually see after a language switch. It is stricter than pack-count coverage and prevents a language from being marked FULL when visible fields still show Chinese, Japanese hardcoding, raw keys, `undefined`, `null`, or fallback text.

## Status Definitions

- FULL: local pack exists, lesson count is complete, all must-localize visible fields are localized, allowed Japanese areas are not misclassified, DOM output has no raw keys, and no online translation is used.
- USABLE: main learning content and core visible fields are localized enough for study use; minor tone or review issues may remain, but obvious Chinese or other-language residue is not allowed in must-localize fields.
- NEEDS_REVIEW: pack count may be complete, but visible fields still contain language residue, weak terminology, missing localization, or fallback exposure.
- BROKEN: many fields are missing, raw keys or `undefined/null` appear, or the main visible content is not in the target language.

## Allowed Japanese Areas

These areas may remain Japanese because the product supports study in Japan:

- Course TOC and lesson TOC
- Sidebar lesson titles
- Japanese explanation blocks
- Original Japanese titles and explanations
- Japanese terms, example sentences, and bilingual study support blocks

## Must-Localize Areas

These fields must follow the active language:

- Lesson body, concept, summary, description
- Practice intro and sandbox instruction
- Sandbox initial comments
- stdin placeholders
- Expected output and execution result explanations
- Daily analogy
- Word cards and flashcards
- Quiz explanations
- Run/copy/clear buttons
- Toasts, aria labels, titles, placeholders, empty states

## Fallback Rules

Fallback must be honest. A module may not be marked FULL if its user-visible target-language content depends on Chinese, Japanese, or another language fallback. If fallback is displayed, the UI must label it and the quality result must be USABLE, NEEDS_REVIEW, or BROKEN depending on severity.

## Required Gates Before Release

- Static pack gate: entry count and residue checks
- Visible field gate: `node tools/verify_i18n_visible_content_gold_gate.js --lang <lang>`
- DOM smoke gate when a dev server is available: `node tools/verify_visible_i18n_dom_smoke.js`
- Offline request gate: no `/api/translate`, DeepL, Google Translate, Gemini/OpenAI translation API, LibreTranslate, or translation overlay

## New Language Pack Standard

Future language packs must pass Gold Gate before they are called FULL or included in a release. Course directory Japanese and Japanese explanation blocks are allowed, but all learner-facing target-language fields must be localized before publication.
