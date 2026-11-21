# ARTHAVAULT Website v2.0

Static website (HTML/CSS/JS). No backend, no paid APIs. Hosted free on GitHub Pages: https://arthavault.github.io/

## Files
- `index.html` – main page (hero, about, features, gallery, why, how it works, FAQ, developer, feedback, reviews, legal, download)
- `download.html` – download center (reads `versions.json`)
- `privacy.html`, `terms.html`, `reviews.html`, `404.html`
- `assets/config.js` – **edit this for site settings** (email, social links, APK link override, official hosts)
- `assets/v2.css`, `assets/style.css` – styles; `assets/v2.js` – behaviour; `assets/i18n.js` – Nepali translations
- `assets/shots/` – app screenshots (450x800 webp); `assets/logo.webp`
- `versions.json` – list of APK versions; `downloads/` – APK files
- `reviews.json` – reviews shown on the site (you add them by hand)
- `sitemap.xml`, `robots.txt`

## Common changes
- **APK link:** by default the latest entry in `versions.json` is used. To point to another official URL, set `apkUrlOverride` in `assets/config.js`.
- **New version:** upload the APK to `downloads/`, then add an entry at the top of `versions.json` with `"status": "Latest"` and change the previous one to `"Old version"`.
- **Screenshots:** replace files in `assets/shots/` (same names) or edit the `GAL` list at the bottom of `index.html`.
- **Language:** English is in the HTML; Nepali text is in `assets/i18n.js` (keys match `data-i18n` attributes).
- **Reviews:** add objects to `reviews.json` after you have checked them.
- **Contact email / social links:** `assets/config.js` and the footer of `index.html`.

## Feedback form (no backend)
GitHub Pages has no server, so the form opens the visitor's email app with a prepared message to your email. Nothing is sent until the visitor presses send. For a real in-page form you would need an outside service (for example a form provider), which this site deliberately does not use.

## Deploy on GitHub Pages
1. Repo `arthavault.github.io` in your organization, branch `main`, root folder.
2. Upload/replace the files through the GitHub web UI (Add file > Upload files; folders can be uploaded by dragging them). Zip files are not extracted by GitHub.
3. Commit changes. Settings > Pages should show source "Deploy from a branch", `main` / root.
4. Wait 1-2 minutes, then hard-refresh the site.
`download/` folder must not exist (so `/download` opens `download.html`).

## Honest notes
- No fake download counters or testimonials. Only real reviews should go in `reviews.json`.
- The Terms and Privacy pages are templates, not legal advice.
- Official-site warning: if the page is opened on a host not listed in `officialHosts`, a red notice appears.
