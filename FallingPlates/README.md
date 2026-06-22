# 🍽️ Falling Plates / צלחות נופלות

A gentle, animated **typing game** for young children. Plates drift down from the
top of the screen, each carrying a letter (or a whole word later on). Type what's on
a plate to **save** it before it reaches the floor!

Built as a **single self-contained HTML file**. No install, no build, no internet.

Lives at `KidsGames/FallingPlates/index.html` (one folder per game).

**Languages:** ships in **Hebrew (עברית)** and **English**. The title screen has a
language button; the choice is saved and the whole UI (including right-to-left layout
for Hebrew) switches instantly. Hebrew is the default. Each language keeps its **own
progress**, since the alphabets and words are completely different.

> **Keyboard:** this game uses your **physical keyboard**. For the Hebrew levels, set
> your operating system's keyboard to **Hebrew** so the Hebrew letters can be typed.

## ▶ How to play

1. **Double-click `index.html`** (or open it in any modern browser — Chrome, Edge, Firefox, Safari).
2. Press **Play**. A short **intro cutscene** plays — the baker wheels in a cart full
   of plates, trips over a banana peel, and the plates go flying sky-high (that's why
   he spends the whole game catching them!). Tap to skip. Then pick a level.
3. Plates fall slowly from the top. A **stressed-out baker** 👨‍🍳 paces the floor.
   **Type the letter** shown on a plate and he dashes underneath it to catch it!
   - The very first level is extra slow — **one plate at a time, one letter each**.
4. As the baker catches plates, the progress bar fills toward the level's goal.
   - ✅ Correct → the baker rushes under the plate and it lands safely in his hands
     (with a happy chime) and joins your saved shelf.
   - ❌ Wrong key → a soft buzz. No penalty — just try again!
   - 🍽️ A plate that reaches the floor before you type it **shatters into pieces**
     (with a little crash). That's okay too — the next plate keeps coming.
     **No lives, no game-over.**
5. Save the goal number of plates to clear the level, earn **1–3 stars**, and unlock
   the next one. Fewer slipped plates → more stars.
6. On the **Level Cleared** screen you can pick **Next**, **♾️ Endless**, Replay, or
   Map. **Endless mode** keeps that level's speed and rhythm going with no goal — the
   score just climbs and there's a little cheer every 10 saved plates. It's gentle as
   ever (no game-over); leave any time with the Back/Map button.

### ♾️ Endless Challenge (on the map)

The map has a big **Endless Challenge** banner — a faster, arcade-style mode. It
**starts easy and keeps speeding up** (plates fall quicker, arrive more often, and
eventually several at once), and after a while short **words** start mixing in with
the letters. You have **3 hearts** ❤️❤️❤️ — every plate that hits the floor costs one,
and at zero the run ends with your **score** and your saved **best**. Unlike the
levels, this mode *does* end — that's the challenge! Your best score is saved per
language.

In **word levels**, type the word's letters **in order** (this works for both
left-to-right English and right-to-left Hebrew). The plate being typed glows, and the
letters you've typed turn green.

Progress (stars, unlocked levels, language, sound setting) is **saved automatically**
in the browser. **Reset progress** is on the title screen.

## 🎓 What it teaches

| Stage | Plates show | Helps with |
|-------|-------------|------------|
| First Plates → Letter Storm | single random letters | letter recognition + finding keys |
| First Words / Picture Words | short words **with an emoji picture** | reading & spelling short words |
| No Peeking / Big Words / Word Master | longer words, picture sometimes hidden | spelling from memory, speed |

Early word levels show an **emoji picture** of the word next to it (e.g. `cat` 🐱 /
`כלב` 🐶) so kids connect the word to its meaning. Later levels hide the picture and
speed things up.

## 🛠 Tweaking the game

Everything lives in `index.html`. To change difficulty or add levels, edit the
**`LEVELS`** array near the top of the `<script>`:

```js
{nameKey:"lvl_first", emoji:"🐣", mode:"letter", target:5,
 fallMs:15000, spawnGapMs:3500, maxConcurrent:1},
```

- `mode` — `"letter"` (one random letter per plate) or `"word"` (a whole word).
- `pool` — for word levels: `"easy"` or `"hard"` (which word list to draw from).
- `showImage:true` — draw the word's emoji picture above the plate (word levels).
- `target` — how many plates you must save to clear the level.
- `fallMs` — how long a plate takes to fall (**smaller = faster**).
- `spawnGapMs` — gap between new plates (**smaller = busier**).
- `maxConcurrent` — how many plates may fall at the same time.
- `nameKey` — a key looked up in the `I18N` table (so the level name is translatable).

The **Endless Challenge** isn't in `LEVELS` — its rising difficulty lives in
`challengeRamp()` (how `fallMs`, `spawnGapMs`, and `maxConcurrent` scale with the
score) and `challengeSpawnSpec()` (when letters give way to words). Tweak those two
functions to retune the challenge.

Letters come from the **`ALPHABETS`** table; words (with their emoji) come from the
**`WORDS`** table — both keyed by language. Add or change words there.

## 🌍 Adding / editing languages

All UI text is in the **`I18N`** table. Each language is a block of `key: "text"`
pairs plus a `dir` (`"ltr"` or `"rtl"`), a `langName`, and a `langPill`:

```js
const I18N = {
  en: { dir:"ltr", langName:"עברית",   title:"Falling Plates", play:"▶ Play", /* … */ },
  he: { dir:"rtl", langName:"English", title:"צלחות נופלות",   play:"▶ שחקו", /* … */ },
};
```

To **add a language**: copy a block, change the key (e.g. `ar`, `fr`), translate the
values; add an entry to `ALPHABETS` and `WORDS` for that language; and extend the
title-screen toggle in `toggleLanguage()`. Static HTML text is marked with
`data-i18n="key"` (and `data-i18n-title` for tooltips). `applyLanguage()` sets the
page direction so RTL languages lay out automatically. The default is `DEFAULT_LANG`.

## 📦 Tech

Vanilla HTML + CSS + JavaScript, all in one file. The plates and word pictures are
emoji; the **baker and the kitchen scenery** (window, shelf, clock, refrigerator,
counter) are inline **SVG**. Animations are CSS keyframes, the falling motion is a
`requestAnimationFrame` loop, sounds are generated with the Web Audio API, and progress
is stored in `localStorage`. No dependencies.

To resize the baker, change `.baker .body { width }` in the CSS — the catch point is
measured from his real size at runtime (`BAKER_HAND_RATIO`), so plates keep landing in
his hands automatically.
