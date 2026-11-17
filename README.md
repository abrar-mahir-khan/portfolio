# Abrar Mahir Khan — Portfolio (with built-in Admin Panel)

Static HTML/CSS/JS site for GitHub Pages. **All content is editable from an admin panel** — no code editing needed.
Everything (site logic + admin panel) lives in `assets/js/main.js`.

## How it works
- The site loads its text, images, projects, links and colors from `data/content.json`.
- Open **`https://YOUR-SITE/mahir-khan-admin`**, log in, and an **Open admin** button appears on the site (visitors never see it).
- **Publish** commits the new `data/content.json` (and any uploaded images) to your GitHub repo through the GitHub API.
  GitHub Pages redeploys automatically — changes are live in ~1–2 minutes.
- If `data/content.json` is missing or broken, the site falls back to the defaults inside `main.js`.

## One-time setup
1. Push this folder to a GitHub repository and enable Pages
   (Settings → Pages → Deploy from a branch → `main` → `/ (root)`).
2. Create a **fine-grained token**: <https://github.com/settings/personal-access-tokens/new>
   - Repository access → *Only select repositories* → this repo
   - Permissions → Repository permissions → **Contents: Read and write**
3. Open `https://YOUR-SITE/#admin` → **GitHub & Backup** tab → enter username, repo, branch, token → *Save & test connection*.
   The token is stored only in your browser (localStorage). Never commit it to the repo.

## Admin login (first time)
1. Open `/mahir-khan-admin` — with no `data/auth.json` yet it shows a **setup** form. Choose a password.
2. Download the generated `auth.json`, put it in the repo as `data/auth.json`, commit. After deploy, log in.
3. Login lasts 12 hours on that browser. Note: on static hosting this login is a convenience gate; real protection is that nothing can be published without your GitHub token. For true server-side protection use Cloudflare Access on `/mahir-khan-admin*`.

## Using the admin panel
- Menu links & sections: drag (⠿) or use ↑ ↓ to reorder — the page sections and the menu follow that order.
- Tabs: General · Hero · About · Expertise · Projects · Experience · Contact · GitHub & Backup.
- Changes show **live** on the page behind the panel. Use the `›` button to hide the panel and look at the site.
- Headings: press Enter for a new line, wrap a word in `*stars*` for the italic serif style.
- Projects: add / delete / reorder, show or hide, upload a cover image (or keep the illustrated mock-up).
- Images are resized in the browser before upload (stored in `assets/uploads/`).
- Menu tab lets you hide whole sections (they disappear from the navigation too).
- Backup tab: download / import `content.json`, reset to defaults.

## Contact form
Easiest: paste a free **Web3Forms access key** (web3forms.com, enter your email) in the Contact tab — messages arrive in your inbox.
Alternatively the form posts to the **Other form endpoint URL** (Contact tab) — e.g. a free [Formspree](https://formspree.io) or
[Web3Forms](https://web3forms.com) endpoint. With no endpoint it opens the visitor's email app instead.

## Run locally
Use VS Code Live Server or any static server (opening `index.html` directly via `file://` works, but the site then uses the built-in defaults because browsers block loading `content.json`).

## Security notes
- The admin screen is just a page; **nothing can be saved without your GitHub token**.
- Use the token only on your own devices. If it leaks, delete it in GitHub → Settings → Developer settings.
- Every publish is a normal Git commit, so you can always roll back from GitHub history.
