# 🚗 Park the Car / חנו את המכונית

A gentle, animated **driving puzzle** for young children. Steer a cute little car
into the marked **parking spot** 🅿️ — line it up and stop, without bumping the
parked cars, walls or cones.

Built as a **single self-contained HTML file**. No install, no build, no internet.

Lives at `KidsGames/ParkTheCar/index.html` (one folder per game).

**Languages:** ships in **Hebrew (עברית)** and **English**. The title screen has a
language button; the choice is saved and the whole UI (including right-to-left layout
for Hebrew) switches instantly. Hebrew is the default. Each language keeps its **own
progress** (stars and unlocked levels).

## ▶ How to play

1. **Double-click `index.html`** (or open it in any modern browser — Chrome, Edge, Firefox, Safari).
2. Press **Play**, then pick a spot from the map.
3. Drive the car into the glowing **parking bay**. The bay turns **green** when the car
   is lined up and slow enough — hold it there for a moment and you've **parked!**
4. Crashing into a parked car, a wall, a cone, or the edge of the lot is just a **bump**:
   a little 💥, a shake, and the car pops back to its starting spot. You lose one
   ❤️ heart. Run out of hearts and the level simply restarts with full hearts —
   **no harsh game-over.**
5. Park to earn **1–3 stars** and unlock the next level. Fewer bumps → more stars
   (3 = no bumps, 2 = one or two, 1 otherwise).

## 🎮 Controls

The car drives like a **real car**:

- **▲ Gas** — drive forward.
- **▼ Reverse** — back up (the brake lights glow red).
- **◀ ▶ Steer** — turn the wheel. Steering only works **while the car is moving** —
  just like a real car, you can't turn on the spot. (And the steering flips when you're
  reversing, so backing into a spot feels natural.)

Two ways to drive, both always available:

- **Keyboard:** the **arrow keys** (or **W A S D**). Hold to keep going.
- **Touch / mouse:** the friendly round **pedals** below the lot — press and hold.

Everything is kept **gentle and forgiving**: low speeds, lots of slack on the
"lined-up" check, and a soft engine purr with a little exhaust puff while you roll.

## 🅿️ Levels

Difficulty trends up — the gaps tighten and the car starts more off-line — but the
level **types are interleaved** (straight-in, parallel, turn-in, navigate) so no two
levels in a row feel the same:

| World | Level | What it is |
|-------|-------|------------|
| Learn to Drive | **Open Spot** | empty bay, just drive across (4 ❤️) |
| Learn to Drive | **Pull-In** | come from the left and swing down into a bay, one neighbour (4 ❤️) |
| Learn to Drive | **Wide Bay** | straight in between two cars, very wide gap (4 ❤️) |
| Learn to Drive | **Parallel Park** | roomy curbside parallel park — reverse + steering (3 ❤️) |
| Real Parking | **Corner Lot** | weave from the right around a wall up to a top-left bay (3 ❤️) |
| Real Parking | **Between Cars** | straight in, medium gap, but you start off to the side (3 ❤️) |
| Real Parking | **Parallel Again** | parallel slot, tighter, approached from the right (3 ❤️) |
| Real Parking | **Parking Lot** | drive past a wall and a cone to a far spot (3 ❤️) |
| Lot Master | **Snug Fit** | straight in, snug gap, start off to the right (2 ❤️) |
| Lot Master | **Drive & Park** | drive over the top of a wall, then down into the bay (2 ❤️) |
| Lot Master | **Squeeze In** | a tight parallel slot to back into (2 ❤️) |
| Lot Master | **Garage Maze** | a two-turn slalom through staggered walls (2 ❤️) |
| Lot Master | **Expert Park** | the tightest gap of all, off-centre start, cones flanking (1 ❤️) |

## 🛠 Tweaking the game

Everything lives in `index.html`. To change difficulty or add levels, edit the
**`LEVELS`** array near the top of the `<script>`. The lot is a fixed
**100 × 70 unit** field (resolution-independent); rectangles are `{x, y, w, h}` with
`x,y` at the **center**, and headings in degrees (`0` = pointing right, `90` = down):

```js
{nameKey:"lvl_open", worldKey:"world_basics", emoji:"🅿️", lives:3,
 spawn:{x:18, y:35, heading:0},
 goal:{x:82, y:35, w:18, h:11, heading:0},
 obstacles:[ /* {x,y,w,h,kind:"car"|"wall"|"cone"} */ ]},
```

- `spawn` — where the car starts (must be clear of obstacles).
- `goal` — the bay to rest inside, plus the `heading` you should line up to
  (either orientation, 180° apart, counts as parked).
- `obstacles` — blocking rectangles. `kind` only changes how they're **drawn**
  (parked car, wall/curb, or cone); they all block the car.
- `lives` — starting hearts.
- `nameKey` / `worldKey` — keys looked up in the `I18N` table (so text is translatable).

Other easy knobs near the top of the script tune the **physics**: `ACCEL`, `MAX_FWD`,
`MAX_REV`, `FRICTION`, `TURN` (steering rate), `ALIGN_TOL` (how straight you must be),
and `PARK_HOLD_MS` (how long to rest before it counts).

## 🌍 Adding / editing languages

All UI text is in the **`I18N`** table. Each language is a block of `key: "text"`
pairs plus a `dir` (`"ltr"` or `"rtl"`), a `langName`, and a `langPill`:

```js
const I18N = {
  en: { dir:"ltr", langName:"עברית",   title:"Park the Car",   play:"▶ Play",  /* … */ },
  he: { dir:"rtl", langName:"English", title:"חנו את המכונית", play:"▶ שחקו", /* … */ },
};
```

To **add a language**: copy a block, change the key (e.g. `ar`, `fr`), translate the
values, and extend the title-screen toggle in `toggleLanguage()`. Static HTML text is
marked with `data-i18n="key"` (and `data-i18n-title` for tooltips). `applyLanguage()`
sets the page direction so RTL languages lay out automatically. The lot itself is
symmetric, so switching to Hebrew just flips the surrounding text. The default is
`DEFAULT_LANG`.

## 📦 Tech

Vanilla HTML + CSS + JavaScript, all in one file. The car, parked cars, lane markings,
trees, streetlights and bay paint are inline **SVG**; the driving is a
`requestAnimationFrame` loop with a simple kinematic (bicycle) model, collision uses an
oriented car rectangle vs. axis-aligned obstacles, animations are CSS keyframes, sounds
are generated with the Web Audio API, and progress is stored in `localStorage`. No
dependencies.
