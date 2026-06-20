# 🧁 Math Bakery / מאפיית החשבון

A friendly, animated math game for kids (ages ~6–8). Run a cute bakery and serve
customers by solving math problems — addition, subtraction, and multiplication.

Built as a **single self-contained HTML file**. No install, no build, no internet.

Lives at `KidsGames/MathBakery/index.html` (one folder per game).

**Languages:** ships in **Hebrew (עברית)** and **English**. The title screen has a
language button; the choice is saved and the whole UI (including right-to-left
layout for Hebrew) switches instantly. Hebrew is the default.

## ▶ How to play

1. **Double-click `index.html`** (or open it in any modern browser — Chrome, Edge, Firefox, Safari).
2. Press **Play**, then pick a bakery from the map.
3. A customer asks for a number of treats (e.g. *"Please bake 5 + 3 cookies!"*).
   The tray shows the treats so kids can **count along**.
4. **Tap the cookie** with the correct number.
   - ✅ Right → the treats bake, the customer hops, coins fly in.
   - ❌ Wrong → a gentle wiggle. No penalty — just try another cookie!
5. Answer fast for a **speed bonus** (the timer bar). Running out of time is totally
   fine — it only affects bonus coins, never ends the order.
6. Finish all the orders to earn **1–3 stars** and unlock the next bakery.

Progress (stars, coins, unlocked levels, sound setting) is **saved automatically**
in the browser. **Reset progress** is on the title screen.

## 🎓 What it teaches

| Bakery | Operation | What kids see |
|--------|-----------|---------------|
| Cupcake Corner | Addition (+) | two groups of cupcakes to combine |
| Pretzel Place | Subtraction (−) | pretzels with some "eaten" (crossed out) |
| Donut Diner | Mixed + / − | a bit of both |
| Cookie Kingdom | Multiplication (×) | an **array**: rows × columns of cookies |

The multiplication levels use the **array model** (3 × 4 = 3 rows of 4 cookies),
which makes "times" visual and easy to grasp — not just memorized.

For the **up-to-20** levels (addition & subtraction), treats are gathered into
**boxes of 10** (ten-frames). A number like 14 fills one whole box and a second box
holding 4 (its remaining slots shown empty), so it reads instantly as "one ten and
four" — teaching place value while keeping every treat visible. Counts under 10 stay
loose to keep the early levels simple.

## 🛠 Tweaking the game

Everything lives in `index.html`. To change difficulty or add levels, edit the
**`LEVELS`** array near the top of the `<script>`. Level/world/treat **text is
referenced by key** so it can be translated:

```js
{nameKey:"lvl_sweetStart", worldKey:"world_cupcake", emoji:"🧁", treat:"🧁",
 treatKey:"treat_cupcakes", ops:["+"], maxSum:6, orders:5, choices:3},
```

- `ops` — any of `"+"`, `"-"`, `"×"` (use several for a mixed level).
- `maxSum` — biggest total for addition.
- `maxMinuend` — biggest starting number for subtraction.
- `tables` + `maxFactor` — multiplication facts (e.g. `tables:[2,5], maxFactor:5`).
- `orders` — how many customers per level.
- `choices` — how many answer cookies (3 or 4).
- `showArray:true` — draw the cookie array grid (used for ×).
- `nameKey` / `worldKey` / `treatKey` — keys looked up in the `I18N` table.

Other easy knobs near the top of the script: `BASE_COINS`, `MAX_BONUS`,
`TIMER_MS`, and the `CUSTOMERS` emoji list.

## 🌍 Adding / editing languages

All UI text is in the **`I18N`** table (right after `LEVELS`). Each language is a
block of `key: "text"` pairs plus a `dir` (`"ltr"` or `"rtl"`) and a `langName`:

```js
const I18N = {
  en: { dir:"ltr", langName:"English", title:"Math Bakery", play:"▶ Play", /* … */ },
  he: { dir:"rtl", langName:"עברית",   title:"מאפיית החשבון", play:"▶ שחקו", /* … */ },
};
```

To **add a language**, copy a block, change the key (e.g. `ar`, `fr`), translate the
values, and add it to the title-screen toggle in `toggleLanguage()`. Static text in
the HTML is marked with `data-i18n="key"` (and `data-i18n-title` for tooltips); the
default language is `DEFAULT_LANG`. `applyLanguage()` sets the page direction so RTL
languages lay out automatically. Numbers/operators in a problem (e.g. `5 + 3`) are
isolated left-to-right so they read correctly inside any script.

## 📦 Tech

Vanilla HTML + CSS + JavaScript, all in one file. Characters are emoji,
animations are CSS keyframes, sounds are generated with the Web Audio API,
and progress is stored in `localStorage`. No dependencies.
