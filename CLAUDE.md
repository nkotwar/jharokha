# Jharokha — notes for Claude

Buc's personal all-in-one Google TV app. Everything is remote-first (D-pad + OK + Back), themeable, and grows by adding modules.

## Layout
- `web/` — the actual app, published to https://nkotwar.github.io/jharokha/ by `.github/workflows/pages.yml`.
  - `core/jharokha.css` — fonts + theme tokens (`--j-*`). New themes: add a `[data-theme]` block AND an entry in `THEMES` in `core/jharokha.js`.
  - `core/jharokha.js` — shared runtime: themes, spatial remote navigation, Back handling, recents, voice, prefs, native bridge.
  - `index.html` — the hub (home screen): greeting, search + voice, Continue row, app tiles, theme/settings sheet.
  - `modules/registry.json` — list of apps shown on the hub; `sections` feed search/voice deep links.
  - `modules/<id>/index.html` — each app. First: `bglc` (BG & LC Masterclass).
  - `version.json` — `web` build label, `minApk` / `latestApk` (APK versionCodes) for update notices.
  - `sw.js` — network-first service worker (fresh content online, last copy offline).
- `android/` — Android TV shell (Java WebView). Built and released by `.github/workflows/apk.yml`
  to `releases/latest/download/jharokha.apk` (short link: nkotwar.github.io/jharokha/get).

## Adding a module
1. Create `web/modules/<id>/index.html`. In `<head>`: `<link rel="stylesheet" href="../../core/jharokha.css">` and `<script src="../../core/jharokha.js"></script>` (no defer).
2. Use only `--j-*` colour tokens (no hard-coded colours) so every theme works.
3. Every clickable thing must be a real `a`/`button`/`input`/`summary`, or listed in `<html data-nav-extra="...">` so the remote can reach it.
4. Give a visible "← Jharokha" link to `../../`. Call `Jharokha.remember({title, sub, url})` when the user opens something worth resuming.
5. Add an entry (with `sections` keywords) to `web/modules/registry.json`.
Pushing `web/**` updates the TV on next launch. No APK needed.

## When does Buc need a new APK?
Only when `android/**` changes (new native capability, manifest, icon, bridge method). Then:
- bump `versionCode` and `versionName` in `android/app/build.gradle`,
- set `latestApk` in `web/version.json` (and `minApk` only if the web now REQUIRES the new bridge),
- TELL BUC a fresh install is needed (Downloader → nkotwar.github.io/jharokha/get).

## Compatibility rules (older APK + newer web is normal)
- Native bridge `window.JharokhaNative`: add methods only, never rename/remove. Web must feature-check (`Jharokha.nativeHas('x')`).
- Prefs live in localStorage under `j_*` keys; when changing a pref's shape, read old shapes too.

## Preferences
- Don't run tests unless Buc asks.
