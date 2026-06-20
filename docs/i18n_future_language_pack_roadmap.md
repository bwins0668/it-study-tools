# Future Language Pack Roadmap

## Gold Gate Standard

Every future language pack must pass:

- Static pack gate
- Visible field gate
- DOM smoke gate when a dev server is available
- Offline request gate

Allowed Japanese areas include course directories, lesson TOC, sidebar titles, Japanese explanation blocks, original Japanese titles, and Japanese study-support examples. Must-localize areas include main lesson body, daily analogy, sandbox comments, stdin placeholders, execution result text, buttons, toasts, aria labels, titles, placeholders, empty states, word cards, flashcards, and quiz explanations.

FULL is reserved for packs that pass visible content checks without fallback. USABLE may have tone-review issues but cannot show obvious Chinese or other-language residue in core visible fields. NEEDS_REVIEW means the learner can still see mixed-language content. BROKEN means major missing fields, raw keys, or wrong-language main content.

## Recommended Order

1. Completed: Thai hotfix repaired Java Thai residue and raised Thai to USABLE through Visible Content Gold Gate.
2. Vietnamese tone review: improve ASCII-only or weak tone sections while preserving current USABLE status.
3. Indonesian id: build from the Gold Gate standard from the start.
4. English IT Passport: starter to USABLE.
5. Later packs: fr, de, es, pt.

## Release Rule

Do not publish a Portable ZIP for a new language milestone until static pack, visible field, DOM smoke, and offline request gates are all accounted for. If DOM smoke is skipped because no dev server is available, the final report must say so clearly and static Gold Gate must pass.
