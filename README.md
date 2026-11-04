# The Silent Storm — Frontend Prototype

A responsive HTML/CSS/JavaScript blog prototype for **"The Silent Storm: The story we tell about Africa" — by Michael Asubiojo**.

## Included
- Home page with featured article carousel and a live feed preview
- Articles archive and article detail pages (`article.html?id=...`), with reactions and comments
- Short posts feed (`posts.html`), with reactions and comments
- About page with mission, vision, motto and team
- Contact page and footer
- Light/dark theme toggle
- Responsive mobile navigation
- **A real author dashboard**: publish, edit and delete both articles and short posts
- **A dedicated login and sign-up page** (`login.html`)

## How content works now
Articles and posts are no longer hardcoded into the HTML. They live in the browser's
`localStorage` (`js/store.js`) and every page — home, articles, article, posts — reads
from that same store. That means publishing, editing or deleting something in the
dashboard actually changes what visitors see on the rest of the site (in that browser).

Three sample articles and three sample posts are seeded automatically the first time
the site loads, so it isn't empty on first visit.

## Author login
- Go to `login.html`.
- **Log in** with the demo account: `michael@silentstorm.com` / `silentstorm123`
- Or **Sign up** to create a fresh author account. This site supports exactly one
  author, so signing up replaces the current account's name/email/password —
  it does not touch anything already published.
- Visiting `author.html` while signed out redirects to `login.html`.

## The dashboard (`author.html`)
- **Create**: choose Article or Short post, fill in the fields, optionally attach an
  image, and publish.
- **Edit**: click "Edit" next to any article or post in the "Your articles" / "Your
  posts" lists. The form pre-fills with its current content; "Save changes" updates
  it in place. "Cancel edit" discards the changes and returns to create mode.
- **Delete**: click "Delete" next to any item (asks for confirmation first).
- **Log out**: clears the session and returns to `login.html`.

## Important — this is still a frontend prototype
There is no server and no real database. Everything (articles, posts, reactions,
comments, and the author account) lives in `localStorage`/`sessionStorage` in one
browser:
- Content is **per-browser** — what's published on one device won't appear on another.
- Clearing site data erases everything, including the author account (it will
  reseed the demo account and sample content on next load).
- The "password" is stored in plain text, visible to anyone with dev tools on
  that machine. This simulates the login/dashboard flow — it is not real security.
- Uploaded images are stored as base64 data URLs, which has a practical size limit
  (typically 5–10MB per site depending on the browser).

**To make this a real, multi-visitor site**, `js/store.js` and `js/auth.js` are
written as small, swappable layers — every read/write goes through them, so they
can be pointed at a real backend (Firebase, Supabase, or a custom API with hashed
passwords) without rewriting the pages themselves.

## Customizing
- **Nav, footer, theme, contact form**: `js/app.js`
- **Seed articles/posts**: `seedIfEmpty()` in `js/store.js` (only runs once, the
  first time the site loads with empty storage)
- **Demo author account**: `seedIfEmpty()` in `js/auth.js`
- **Team members**: edit the markup in `about.html`

## Run it
```bash
cd the_silent_storm
python3 -m http.server 8000
```
Then visit `http://localhost:8000`. (Serving locally, rather than opening the file
directly, avoids some browsers' restrictions on `localStorage` under `file://`.)

---

## Update: carousel, reactions, team, dashboard

**Home hero carousel** (`js/hero.js`): full-bleed background that cross-fades every 20 seconds, starting
with the giraffe. Edit the `HERO_SLIDES` list at the top of the file to change pictures or captions.
Pictures that fail to load are skipped. Honours "reduce motion".

**One reaction button** (`js/reactions.js`): tap = Like (tap again to remove). Press and hold to open
the tray (Like, Love, Applaud, Insightful, Wow, Sad); slide to one and release, or release and tap.
Keyboard: Enter/Space = tap, ArrowUp = open tray, arrows to move, Esc to close. One reaction per visitor
per item (per browser).

**About page**: the team is a list (`TEAM`) in `about.html`: name, role, photo, one-paragraph bio and
social links. The social links are **placeholders pointing at each platform's home page**; replace them with
real profile URLs. The bios are drafts based on each person's role; edit them freely.

**Author dashboard** (`author.html`, `css/author.css`, `js/dashboard.js`), four tabs:
- Overview: page views, visits, reactions, comments, traffic chart (7/30/90 days), top content,
  reaction breakdown, 12-week publishing rhythm, recent activity.
- Write: formatting toolbar, preview, focus mode, read-aloud, live word count / reading time /
  readability / writing tips, headline and summary length checks, daily word goal, sprint timer,
  find & replace, story prompts, autosaved drafts.
- Content: edit/delete with views, reactions and comments per item.
- Comments: all comments in one place, with delete.

Article text supports light formatting: `## heading`, `### subheading`, `> quote`, `- list`,
`1. list`, `---`, `**bold**`, `*italic*`, `[text](https://link)`.

**About the statistics**: views and visits are counted in `localStorage` (one view per item per browser
session; your own views while logged in are ignored). A fresh install shows *sample traffic* so the
charts aren't empty; use "Clear sample data" to remove it. Real cross-device stats need a backend.
