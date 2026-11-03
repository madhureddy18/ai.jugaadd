"""Comment-to-DM for @ai.jugaadd: our own free version (no branding, never hides comments).

Runs on GitHub Actions every few minutes (.github/workflows/autodm.yml). Each run:
  1. For every active entry in dm/automations.json, reads new comments on that reel.
     A comment that contains one of the keywords gets
       - a short public reply under the comment (comments are NEVER hidden), and
       - one private reply DM ("Hey <name>, tap below / reply YES and I'll send it").
  2. Reads recent DM conversations. When someone we're waiting on writes back (taps the quick reply
     or types anything):
       - follow gate on and they don't follow yet  -> "follow first, then tap I followed"
         (after 3 tries they get the link anyway, same as Elev8or)
       - otherwise                                 -> the final message with the link
  Progress lives in dm/state.json (committed back by the workflow), so nobody is messaged twice.

Instagram rules this follows: a private reply is one message within 7 days of the comment; more messages are
only allowed after the person replies, within 24 hours. Follow status can only be read after they reply.

Env: IG_TOKEN (Instagram user token with instagram_business_basic, _manage_comments, _manage_messages),
     DRY_RUN=1 to only print what would happen.
"""
import datetime as dt
import json
import os
import re
import sys
import time
from pathlib import Path

import requests

GRAPH, VER = "https://graph.instagram.com", "v26.0"
HERE = Path(__file__).parent
CONFIG, STATE = HERE / "automations.json", HERE / "state.json"
DRY = os.environ.get("DRY_RUN") == "1"
UTC = dt.timezone.utc
MAX_FOLLOW_TRIES = 3


def log(*a):
    print(*a, flush=True)


def load(p, default):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return default


def save(p, obj):
    p.write_text(json.dumps(obj, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")


def ts(s):
    """Instagram timestamps look like 2026-11-03T08:14:05+0000."""
    s = s.replace("Z", "+0000")
    if re.search(r"[+-]\d{4}$", s):
        s = s[:-2] + ":" + s[-2:]
    return dt.datetime.fromisoformat(s)


class IG:
    def __init__(self, token, session=None):
        self.token, self.s = token, session or requests.Session()

    def _call(self, method, path, **kw):
        url = path if path.startswith("http") else f"{GRAPH}/{VER}/{path.lstrip('/')}"
        params = kw.pop("params", {}) or {}
        if method == "GET":
            params["access_token"] = self.token
        headers = {"Authorization": f"Bearer {self.token}"}
        for attempt in range(3):
            r = self.s.request(method, url, params=params, headers=headers, timeout=30, **kw)
            if r.status_code >= 500 and attempt < 2:
                time.sleep(2 + attempt * 3)
                continue
            try:
                data = r.json()
            except Exception:
                data = {"error": {"message": r.text[:300]}}
            if r.status_code >= 400 or "error" in data:
                raise RuntimeError(f"{method} {path}: {(data.get('error') or {}).get('message', r.status_code)}")
            return data

    def get(self, path, **params):
        return self._call("GET", path, params=params)

    def post(self, path, body):
        if DRY:
            log("   [dry run] POST", path, json.dumps(body, ensure_ascii=False)[:300])
            return {"id": "dry", "recipient_id": "dry"}
        return self._call("POST", path, json=body)

    def pages(self, path, **params):
        data = self.get(path, **params)
        while True:
            for x in data.get("data", []):
                yield x
            nxt = (data.get("paging") or {}).get("next")
            if not nxt:
                return
            data = self.get(nxt)


def fill(text, name):
    return (text or "").replace("{{name}}", name or "").replace("  ", " ").strip()


def main():
    token = os.environ.get("IG_TOKEN", "").strip()
    if not token:
        sys.exit("IG_TOKEN is missing")
    cfg = load(CONFIG, {})
    autos = [a for a in cfg.get("automations", []) if a.get("active")]
    if not autos:
        log("No active automations.")
        return
    state = load(STATE, {})
    state.setdefault("done_comments", [])
    state.setdefault("people", {})
    state.setdefault("last_dm_check", "1970-01-01T00:00:00+00:00")
    ig = IG(token)

    me = ig.get("me", fields="user_id,username")
    my_id, my_name = str(me.get("user_id") or me.get("id")), me.get("username", "")
    log(f"Running as @{my_name}{' (dry run)' if DRY else ''}")

    # map reel links -> media ids (cached in state)
    media_ids = state.setdefault("media_ids", {})
    if any(a["reel"] not in media_ids for a in autos):
        for m in ig.pages("me/media", fields="id,permalink", limit=50):
            for a in autos:
                code = a["reel"].rstrip("/").split("/")[-1]
                if code and code in (m.get("permalink") or ""):
                    media_ids[a["reel"]] = m["id"]
    done = set(state["done_comments"])
    by_id = {a["id"]: a for a in autos}

    # ---------- 1. new comments -> public reply + private reply
    for a in autos:
        mid = media_ids.get(a["reel"])
        if not mid:
            log(f"! {a['id']}: reel not found on the account: {a['reel']}")
            continue
        since = ts(a["since"]) if a.get("since") else None
        kws = [k.lower() for k in a.get("keywords", []) if k.strip()]
        n_new = 0
        for c in ig.pages(f"{mid}/comments", fields="id,text,timestamp,username,from", limit=50):
            cid = c["id"]
            if cid in done:
                continue
            when = ts(c["timestamp"])
            who = (c.get("from") or {}).get("username") or c.get("username") or ""
            text = (c.get("text") or "").lower()
            if (since and when < since) or who.lower() == my_name.lower() or not any(k in text for k in kws):
                done.add(cid)
                continue
            if dt.datetime.now(UTC) - when > dt.timedelta(days=7):
                done.add(cid)          # Instagram only allows a private reply within 7 days
                continue
            n_new += 1
            log(f"- {a['id']}: @{who} commented {c.get('text')!r}")
            replies = a.get("comment_replies") or []
            if replies:
                msg = fill(replies[len(done) % len(replies)], "@" + who if who else "")
                try:
                    ig.post(f"{cid}/replies", {"message": msg})
                except Exception as e:
                    log("   public reply failed:", e)
            body = {"recipient": {"comment_id": cid}, "message": {"text": fill(a["opening"], who)}}
            if a.get("opening_button"):
                body["message"]["quick_replies"] = [{"content_type": "text", "title": a["opening_button"][:20], "payload": f"SEND:{a['id']}"}]
            try:
                try:
                    res = ig.post(f"{my_id}/messages", body)
                except RuntimeError as e:
                    if "quick_replies" not in body["message"]:
                        raise
                    log("   quick reply not accepted, sending plain text:", e)
                    body["message"].pop("quick_replies")
                    body["message"]["text"] += "\n\nReply YES and I'll send it 👇"
                    res = ig.post(f"{my_id}/messages", body)
                uid = str(res.get("recipient_id") or (c.get("from") or {}).get("id") or "")
                if uid and not DRY:
                    state["people"][uid] = {"auto": a["id"], "username": who, "step": "opened", "tries": 0,
                                            "since": dt.datetime.now(UTC).isoformat()}
                log("   DM sent")
            except Exception as e:
                log("   private reply failed:", e)
            done.add(cid)
        log(f"{a['id']}: {n_new} new keyword comment(s)")

    # ---------- 2. replies in DMs -> follow gate -> link
    waiting = {u: p for u, p in state["people"].items() if p.get("step") in ("opened", "follow")}
    last = ts(state["last_dm_check"])
    newest = last
    if waiting:
        for conv in ig.pages("me/conversations", platform="instagram", fields="id,updated_time,participants", limit=25):
            upd = ts(conv["updated_time"])
            if upd <= last:
                break
            newest = max(newest, upd)
            ids = {str(p.get("id")) for p in (conv.get("participants") or {}).get("data", [])}
            uid = next((i for i in ids if i in waiting), None)
            if not uid:
                continue
            p = waiting[uid]
            msgs = ig.get(conv["id"], fields="messages.limit(10){id,created_time,from,message}").get("messages", {}).get("data", [])
            replied = any(str((m.get("from") or {}).get("id")) == uid and ts(m["created_time"]) > ts(p["since"]) for m in msgs)
            if not replied:
                continue
            a = by_id.get(p["auto"])
            if not a:
                continue
            follows = True
            if a.get("follow_gate"):
                try:
                    prof = ig.get(uid, fields="username,is_user_follow_business")
                    follows = bool(prof.get("is_user_follow_business"))
                except Exception as e:
                    log(f"   follow check failed for @{p['username']}: {e}")
                    follows = True        # never leave someone stuck because of an API hiccup
            now_iso = dt.datetime.now(UTC).isoformat()
            if follows or p["tries"] >= MAX_FOLLOW_TRIES:
                send_final(ig, my_id, uid, a, p["username"])
                p.update(step="sent", since=now_iso)
                log(f"- @{p['username']}: link sent")
            else:
                body = {"recipient": {"id": uid}, "message": {"text": fill(a["follow_text"], p["username"]),
                        "quick_replies": [{"content_type": "text", "title": (a.get("follow_button") or "I followed ✅")[:20], "payload": f"FOLLOWED:{a['id']}"}]}}
                try:
                    ig.post(f"{my_id}/messages", body)
                except RuntimeError:
                    body["message"].pop("quick_replies")
                    body["message"]["text"] += "\n\nReply DONE after following 👇"
                    ig.post(f"{my_id}/messages", body)
                p.update(step="follow", tries=p["tries"] + 1, since=now_iso)
                log(f"- @{p['username']}: asked to follow (try {p['tries']})")
    if not DRY:
        state["last_dm_check"] = newest.isoformat()
        state["done_comments"] = sorted(done)[-5000:]
        save(STATE, state)


def send_final(ig, my_id, uid, a, name):
    text, link, label = fill(a["final_text"], name), a["link"], (a.get("link_label") or "Open")[:20]
    tpl = {"recipient": {"id": uid}, "message": {"attachment": {"type": "template", "payload": {
        "template_type": "button", "text": text[:640], "buttons": [{"type": "web_url", "url": link, "title": label}]}}}}
    try:
        ig.post(f"{my_id}/messages", tpl)
    except RuntimeError as e:
        log("   button template not accepted, sending text + link:", e)
        ig.post(f"{my_id}/messages", {"recipient": {"id": uid}, "message": {"text": f"{text}\n\n👉 {link}"}})


if __name__ == "__main__":
    main()
