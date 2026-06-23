# Deploying KidsGames

These five games are self-contained HTML (no build, no network). They ship two ways:

1. **GitHub Pages** — a hosted web playground.
2. **Android app** — a simple WebView wrapper (Capacitor) that bundles the games
   for offline play, with a path to the Play Store.

Both targets share **one source**: the root `index.html` launcher + the five game
folders. A small script copies them into `www/` for the Android build.

```
repo root  ──►  GitHub Pages serves it directly (launcher + game folders)
   │
   └─ scripts/build-www.mjs  ──►  www/  ──►  Capacitor  ──►  android/ app
```

---

## Mode 1 — GitHub Pages

Nothing to build; Pages serves the static files as-is.

1. **Create a GitHub repo and push** (the repo currently has no remote):
   ```sh
   gh repo create KidsGames --public --source=. --remote=origin --push
   # or, manually:
   #   git remote add origin https://github.com/<you>/KidsGames.git
   #   git push -u origin master
   ```
2. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **`master`** (or `main`) **/ root** → Save.
3. Wait ~1 min. The site goes live at:
   ```
   https://<you>.github.io/KidsGames/
   ```

`.nojekyll` (already in the repo) tells Pages to serve the folders verbatim.
The `android/`, `www/`, and `node_modules/` paths are never linked, so they don't
affect the site (and the build artifacts are git-ignored anyway).

---

## Mode 2 — Android app (Capacitor)

### One-time setup (install)
- **Node.js LTS** — https://nodejs.org
- **Android Studio** — https://developer.android.com/studio
  (on first launch, let it install the Android SDK + an emulator; it bundles a JDK).

### Pick your app id
Edit **`capacitor.config.json`** and change `appId` from the placeholder
`com.example.kidsgames` to a unique reverse-DNS id you control, e.g.
`io.github.<username>.kidsgames`. **This is permanent on the Play Store.**

### Build the project (run in the repo root)
```sh
npm install                 # installs Capacitor (uses package.json)
npm run build               # copies launcher + games into www/
npx cap add android         # generates the native android/ project (one time)
npx cap sync android        # copies www/ into the app's assets
npx cap open android        # opens the project in Android Studio
```
In Android Studio, press **Run ▶** to launch on an emulator or a connected device.

### After editing any game
```sh
npm run build && npx cap sync android      # (or: npm run sync)
```
then Run again in Android Studio.

### Why the games "just work" in the app
Capacitor serves `www/` from an internal `https://localhost` origin, so
`localStorage` saves persist and Web Audio (unlocked on first tap) plays normally
— no file:// quirks, fully offline.

---

## Publishing to Google Play (later)

1. In Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle**.
2. **Create a keystore** when prompted. Store the `.jks` file and its passwords
   somewhere safe — **never commit it** (already git-ignored). Losing it means you
   can't update the app.
3. The release **`.aab`** is what you upload to the **Play Console** (one-time $25
   developer account).
4. **Children's-games note:** Google Play's *Families / "Designed for Families"*
   policy applies to kids' apps — you'll need a **privacy policy** and must follow
   the rules on ads/data collection. Review it before submitting.

---

## Verify

- **Launcher / Pages:** open the launcher → each card opens the right game; a game's
  progress survives a reload (localStorage); audio plays after the first tap.
- **`www` build:** `npm run build` → `www/` contains `index.html` + all five game folders.
- **App offline:** run the app, turn on airplane mode → every game still plays;
  saves persist after closing and reopening the app.
