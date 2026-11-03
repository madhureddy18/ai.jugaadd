# AI Jugaad Studio

Your own free website for posting Reels to **@ai.jugaadd**: **https://madhureddy18.github.io/ai.jugaadd/**

- Videos made by Claude land in `queue/` ready to go: title, caption, 5 hashtags (Instagram's limit), first comment, audio name, cover image and a posting tip. Tap one, check it, then **Post now** or **Schedule**.
- You can also add your own video from the site.
- Nothing posts unless you schedule it or press Post now.
- Scheduled Reels are checked every 15 minutes (GitHub can start a few minutes late). Post now takes ~1–4 minutes.
- Posted Reels show up under "Posted" with a link to Instagram.

`tools/make_cover.py` makes a cover (frame + title).

How it works: the site saves videos into `queue/` in this repo; GitHub Actions (`.github/workflows/post.yml`) posts them with the official Instagram API. Free, no servers.

## Secrets (Settings → Secrets and variables → Actions)
- `AIJUGAADIGTOKEN` – the @ai.jugaadd Instagram token.
- `FINEGRAINTOKEN` – a fine-grained GitHub token for this repo with *Secrets: Read and write* (the weekly job uses it to keep the Instagram token alive).

The website asks for a fine-grained GitHub token with **Contents** and **Actions** = *Read and write* (it's stored only in your browser).

Note: the repo is public because Instagram downloads videos from a public link.

## Prompt pages (the link sent in DMs)
Each reel's "comment KEYWORD" freebie lives at `p/<keyword>/` — e.g. **https://madhureddy18.github.io/ai.jugaadd/p/resume/**

## Auto DM (our own comment-to-DM, no branding, never hides comments)
- Settings: `dm/automations.json` (one entry per reel: keywords, messages, link, `active`).
- Runs every 5 min via `.github/workflows/autodm.yml` (Actions → "Auto DM" → Run workflow to run now / dry run).
- Needs the `AIJUGAADIGTOKEN` token to include `instagram_business_manage_comments` and `instagram_business_manage_messages`.
- Turn OFF the same reel in Elev8or before switching an entry to `active: true`, or people get two DMs.
