# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A collection of self-contained, bilingual (Hebrew default + English) kids' games — each game a single `index.html` in its own folder — plus a root `index.html` launcher linking to them. Ships as a static GitHub Pages site and as a Capacitor-wrapped Android app.

## Hard constraints

- **Each game is ONE file.** All CSS in one `<style>`, all JS in one `<script>` (`"use strict"`). No external files, libraries, build step, or network requests — a game must work by opening its `index.html` over `file://`.
- **No asset files.** Sound is synthesized with the Web Audio API; graphics are inline SVG or emoji.
- **Bilingual, RTL-aware.** `DEFAULT_LANG = "he"`; layout flips to RTL. Every user-visible string goes through the `I18N` table — never hard-coded in markup.

## Shared architecture

The games are deliberate siblings — learn one and you know the rest. Common pieces:

- **Screens:** `.screen`/`.screen.active`; `showScreen(name)` swaps the active screen and tears down the play loop when leaving `play`.
- **i18n:** `I18N = { en:{dir:"ltr",…}, he:{dir:"rtl",…} }`; `t(key)` (EN fallback); `applyLanguage()` fills `[data-i18n]`/`[data-i18n-title]` and sets `lang`/`dir`. Add a string to **both** language blocks.
- **Audio:** shared `tone()`/`noise()`/`arp()` through a compressor + delay send on SFX/music buses; a per-game `MUSIC` mood object drives a generative loop. Unlocks on first gesture; respect `save.muted`/`save.music`.
- **Save:** `localStorage` under `SAVE_KEY`, `loadSave()` merged over `DEFAULT_SAVE`, `persist()`. Two shapes exist — per-language (`progress:{he,en}`, use `prog()`) or flat — match whatever the game already uses. Reset keeps language + cosmetics.
- **Navigation/cosmetics:** a title-screen home link (`a.icon-btn.home-link` → `../index.html`) returns to the launcher; a customizer overlay applies player colors via CSS variables.

Some games carry Hebrew nikud (combining marks U+0591–U+05C7); word-splitting and comparison are unaffected since the marks are zero-width.

## Working without a runtime

No Node, test runner, linter, or browser is available here — you can't run the games or `npm`/`cap`. Verify structurally: one `<style>`/`<script>` per file, balanced tags. When checking a pattern applies across games, cross-check with `Bash grep -c` per file (the `Grep` tool has under-reported on these large files). Validate Hebrew/nikud strings with Python, not `grep` (locale issues with Hebrew character classes).

## Deployment

`DEPLOY.md` is authoritative. One source, two targets: the root launcher links to each game's `index.html` (the file, so `file://` works); `scripts/build-www.mjs` copies launcher + games into `www/` for Capacitor (`npm run build` / `sync` / `open`). Build tooling (Node, Android Studio) is not available in this environment.

## Conventions

- **Keep it simple. Don't overexplain.** Comments are for genuinely obscure flows only — never thought process, never restating what the code says. Keep them terse.
- Games are kept in lockstep: a change "for all games" is the *same* edit applied to each, verified per file.
- After finishing a task, update this file **only if cross-game architecture changed** (a new shared pattern, save shape, or convention) — not for routine feature work.
