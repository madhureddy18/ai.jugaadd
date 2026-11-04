# AI Jugaad Studio

Your own free website for posting Reels to **@maddiee.makess**: **https://madhureddy18.github.io/ai.jugaadd/**

- Videos made by Claude land in `queue/` ready to go: title, caption, 5 hashtags (Instagram's limit), first comment, audio name, cover image and a posting tip. Tap one, check it, then **Post now** or **Schedule**.
- You can also add your own video from the site.
- Nothing posts unless you schedule it or press Post now.
- Scheduled Reels are checked every 15 minutes (GitHub can start a few minutes late). Post now takes ~1–4 minutes.
- Posted Reels show up under "Posted" with a link to Instagram.

`tools/make_cover.py` makes a cover (frame + title).

How it works: the site saves videos into `queue/` in this repo; GitHub Actions (`.github/workflows/post.yml`) posts them with the official Instagram API. Free, no servers.

## Secrets (Settings → Secrets and variables → Actions)
- `AIJUGAADIGTOKEN` – the @maddiee.makess Instagram token.
- `FINEGRAINTOKEN` – a fine-grained GitHub token for this repo with *Secrets: Read and write* (the weekly job uses it to keep the Instagram token alive).

The website asks for a fine-grained GitHub token with **Contents** and **Actions** = *Read and write* (it's stored only in your browser).

Note: the repo is public because Instagram downloads videos from a public link.

## Cutting a video
Open a video on the website → **✂️ Cut video**. Drag Start/End (or play it and tap "Set start / Set end = ▶ now", nudge with ±0.1s), tap **Preview cut**, then **Save cut**.
- The cut runs on GitHub Actions (`.github/workflows/cut.yml` → `cut.py`, ffmpeg) and takes about 1–2 minutes; Post/Schedule are paused until it's done.
- The very first original is kept in `originals/` so **Undo cut** can bring it back. It's deleted automatically once the Reel is posted.

## Prompt pages (the link sent in DMs)
Each reel's "comment KEYWORD" freebie lives at `p/<keyword>/` — e.g. **https://madhureddy18.github.io/ai.jugaadd/p/resume/**

## Auto DM (our own instant comment-to-DM; no branding, never hides comments)
- Code: `autodm/api/webhook.js` (a free Vercel function). Settings: `autodm/automations.json` (one entry per reel: keywords, messages, link, `active`).
- Instagram calls it the moment someone comments or taps a button, so replies go out in seconds.
- Vercel env vars: `IG_TOKEN`, `APP_SECRET`, `VERIFY_TOKEN`, `NODEJS_HELPERS=0`. Root directory: `autodm`.
- Changing `automations.json` on GitHub redeploys it automatically.
- Privacy policy for the Meta app: https://madhureddy18.github.io/ai.jugaadd/privacy/
