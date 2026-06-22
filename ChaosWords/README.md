# 🔤 Chaos Words / מילים מבולגנות

A cheerful, animated **sentence-building game** for kids. Each round deals a sentence
whose words have been **scrambled** into a jumble tray. **Drag the colourful word
tiles into the slots** to rebuild the sentence in the right order — get it right and
the tiles do a happy wave, a matching picture pops up, and confetti flies!

Built as a **single self-contained HTML file**. No install, no build, no internet.

Lives at `KidsGames/ChaosWords/index.html` (one folder per game).

**Languages:** ships in **Hebrew (עברית)** and **English**. The title screen has a
language button; the choice is saved and the whole UI **and the sentence pool** switch
instantly, including **right-to-left layout** for Hebrew (the sentence reads RTL). Hebrew
is the default. Each language keeps its **own progress**, since the sentences differ.

## ▶ How to play

1. **Double-click `index.html`** (or open it in any modern browser — Chrome, Edge, Firefox, Safari).
2. Press **Play**, then pick a level from the map.
3. The scrambled words appear as **colourful tiles** in the "Mixed-up words" tray, with
   a row of empty dashed **landing pads** above them.
4. **Drag a word tile** (mouse *or* finger) onto a slot. The pad **glows** as you hover,
   and the tile **snaps** into place with a pop. You can move tiles slot→slot,
   slot→tray, or tray→slot — drop a tile on an occupied slot to **swap** them.
5. When **every slot is filled**, the game checks the order automatically:
   - ✅ Correct → the tiles do a celebratory wave, a picture of the sentence pops up,
     confetti falls, and the next sentence is dealt.
   - ❌ Not quite → a gentle wiggle and "try again". No penalty — just keep rearranging.
6. Stuck? Tap **💡 Hint** to drop the correct word into the first wrong slot, or
   **🔀 Shuffle** to re-jumble the loose tiles.
7. Solve all the sentences in a level to earn **1–3 stars** and unlock the next one.
   Fewer mistakes (and fewer hints) → more stars.

Progress (stars, unlocked levels, language, sound setting) is **saved automatically**
in the browser. **Reset progress** is on the title screen. The 🔊 button mutes/unmutes.

## 🎓 Levels overview

Levels are grouped into three difficulty **worlds**, graded by sentence length:

| World | Sentences | Example |
|-------|-----------|---------|
| **Short Sentences** (easy) | 3–4 words | *the cat is happy* 🐱 |
| **Longer Sentences** (medium) | 5–6 words | *we like to read good books* 📚 |
| **Tricky Sentences** (hard) | 7–9 words | *the clever fox jumps over the lazy brown dog* 🦊 |

There are **6 levels** (2 per world), each serving **5 sentences** drawn — with no
repeats — from a large pool (**~30–36 sentences per tier, per language**; ~99 each in
Hebrew and English). The Hebrew sentences are natural Hebrew, not translated word salad,
and each carries its own emoji picture that pops up when solved.

## 🌍 How RTL & duplicates work

- **Right-to-left:** the slot row is a flex container that follows the document
  direction, so Hebrew lays out right-to-left automatically. Validation is by **logical
  word index** (slot 0 = the first word), never by pixel position, so RTL "just works".
- **Repeated words** (e.g. *the cat saw the dog*) are handled by tracking each tile as a
  positioned token (its own id + word) and checking each slot's **word string** against
  the target word at that index — not by identity — so duplicates validate correctly.
- The initial scramble is guaranteed **never to start already solved** (it reshuffles
  if it happens to match).

## 🛠 Tweaking the game

Everything lives in `index.html`. To change difficulty or add levels, edit the
**`LEVELS`** array near the top of the `<script>`:

```js
{nameKey:"lvl_firstWords", worldKey:"world_short", emoji:"🐣",
 tier:"easy", rounds:5, accent:"#ff8fab", accentDeep:"#f4628a"},
```

- `tier` — which sentence pool to draw from: `"easy"`, `"medium"` or `"hard"`.
- `rounds` — how many sentences to solve to clear the level.
- `accent` / `accentDeep` — the tile + glow colours for that tier.
- `nameKey` / `worldKey` — keys looked up in the `I18N` table (so the text is translatable).

Sentences live in the **`SENTENCES`** table, keyed by language then tier. Each entry is
a clean, **space-separated** sentence with an optional reward emoji after a `|`:

```js
"the little cat plays with a ball|🐱"
```

Keep sentences as plain space-separated words (no punctuation to tokenize). Word count
sets the difficulty: easy 3–4, medium 5–6, hard 7–9.

## 🌍 Adding / editing languages

All UI text is in the **`I18N`** table. Each language is a block of `key: "text"` pairs
plus a `dir` (`"ltr"` or `"rtl"`), a `langName`, and a `langPill`:

```js
const I18N = {
  en: { dir:"ltr", langName:"עברית",   title:"Chaos Words",    play:"▶ Play", /* … */ },
  he: { dir:"rtl", langName:"English", title:"מילים מבולגנות", play:"▶ שחקו", /* … */ },
};
```

To **add a language**: copy a block, change the key (e.g. `ar`, `fr`), translate the
values; add a matching block to `SENTENCES`; and extend the title-screen toggle in
`toggleLanguage()`. Static HTML text is marked with `data-i18n="key"` (and
`data-i18n-title` for tooltips). `applyLanguage()` sets the page direction so RTL
languages lay out automatically. The default is `DEFAULT_LANG`.

## 📦 Tech

Vanilla HTML + CSS + JavaScript, all in one file. The word tiles are styled CSS blocks;
dragging uses **pointer events** (`pointerdown`/`move`/`up`) with a floating ghost tile,
so it works the same with a **mouse or a touchscreen**. The drifting-letters background
is CSS keyframes, sounds are generated with the Web Audio API, and progress is stored in
`localStorage`. No dependencies.
