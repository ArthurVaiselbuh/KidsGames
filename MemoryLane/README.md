# 🧠 Memory Lane / שביל הזיכרון

A friendly, animated **memory-match** game (classic "concentration") for young
children. A grid of face-down cards hides matching pairs of pictures. Flip two cards;
if they show the **same picture**, it's a pair — they stay revealed! Clear the whole
board to finish a level. The boards **grow** as you go.

Built as a **single self-contained HTML file**. No install, no build, no internet.

Lives at `KidsGames/MemoryLane/index.html` (one folder per game).

**Languages:** ships in **Hebrew (עברית)** and **English**. The title screen has a
language button; the choice is saved and the whole UI (including right-to-left layout
for Hebrew) switches instantly. Hebrew is the default. The card pictures are
language-neutral emoji, so **progress is shared** across both languages.

## ▶ How to play

1. **Double-click `index.html`** (or open it in any modern browser — Chrome, Edge, Firefox, Safari).
2. Press **Play**, then pick a level from the map.
3. **Tap a card** to flip it over and reveal its picture. Tap a **second** card.
   - ✅ Same picture → it's a **pair**! Both cards stay up, glow, and gently float.
   - ❌ Different → they flip back over after a moment, so peek and remember where
     things were. No penalty, no game-over — just keep trying!
4. Find **all the pairs** to clear the board, earn **1–3 stars**, and unlock the next
   level. Fewer wrong flips → more stars.
5. The bar at the top fills as you find pairs, and the **🔁 moves** counter ticks up
   each time you turn over a second card.

Progress (stars, unlocked levels, language, sound setting) is **saved automatically**
in the browser. **Reset progress** is on the title screen.

## 🗺 Levels

Six levels across five themed "worlds", with the board growing each time:

| Level | Board | Pairs | World |
|-------|-------|-------|-------|
| First Peek | 2 × 2 | 2 | 🐶 Animal Friends |
| Pet Parade | 2 × 3 | 3 | 🐶 Animal Friends |
| Snack Time | 3 × 4 | 6 | 🍎 Tasty Treats |
| On the Move | 4 × 4 | 8 | 🚗 Things That Go |
| Under the Sea | 4 × 5 | 10 | 🐠 Under the Sea |
| Blast Off! | 4 × 6 | 12 | 🚀 Outer Space |

The first level is tiny (just two pairs) so the youngest players get a quick win; the
4×6 finale has twelve pairs to remember. Each world has its own **accent colour** and
its own pool of pictures.

## 🎓 What it teaches

Visual memory and concentration, picture recognition, and a little patience — kids
build a mental map of where each picture is and recall it a few flips later. Growing
boards stretch their memory span gently, one level at a time.

## 🛠 Tweaking the game

Everything lives in `index.html`. To change difficulty or add levels, edit the
**`LEVELS`** array near the top of the `<script>`:

```js
{rows:3, cols:4, themeKey:"food", nameKey:"lvl_snackTime"},   // 6 pairs
```

- `rows` × `cols` — the board size. **Must be even** (an even number of cards).
- `themeKey` — which themed world to draw pictures from (see the **`THEMES`** table):
  picks the emoji pool, the world name, and the accent colour.
- `nameKey` — a key looked up in the `I18N` table (so the level name is translatable).

The **`THEMES`** table holds each world's `emoji` pool (a string of emoji, split
safely with `Intl.Segmenter`), its `accent`/`soft` colours, and its `worldKey`. Each
pool has at least as many distinct pictures as the largest board needs pairs (12), so
boards never run out of pictures. Add or swap emoji there.

Stars come from **mismatches**: 0 = ⭐⭐⭐ ("Perfect memory!"), a few = ⭐⭐, more = ⭐.
The "few" threshold scales with board size (`tol` in `completeLevel()`), so big boards
stay fair.

## 🌍 Adding / editing languages

All UI text is in the **`I18N`** table. Each language is a block of `key: "text"`
pairs plus a `dir` (`"ltr"` or `"rtl"`) and a `langName`:

```js
const I18N = {
  en: { dir:"ltr", langName:"English", title:"Memory Lane",   play:"▶ Play", /* … */ },
  he: { dir:"rtl", langName:"עברית",   title:"שביל הזיכרון", play:"▶ שחקו", /* … */ },
};
```

To **add a language**, copy a block, change the key (e.g. `ar`, `fr`), translate the
values, and add it to the title-screen toggle in `toggleLanguage()`. Static text in
the HTML is marked with `data-i18n="key"` (and `data-i18n-title` for tooltips); the
default is `DEFAULT_LANG`. `applyLanguage()` sets the page direction so RTL languages
lay out automatically — the card grid itself is symmetric, so only the chrome flips.

## 📦 Tech

Vanilla HTML + CSS + JavaScript, all in one file. Card pictures are emoji; the
face-down **card backs** and the floating **ambient background** (soft bokeh blobs +
drifting doodles) are inline **SVG / CSS**. The flip is a 3D `rotateY` with
`transform-style: preserve-3d` and `backface-visibility: hidden`; the responsive grid
(`aspect-ratio` cards in `repeat(cols, 1fr)`) scales so even the 4×6 board fits a
phone width without horizontal scrolling. Sounds are generated with the Web Audio API,
and progress is stored in `localStorage`. No dependencies.
