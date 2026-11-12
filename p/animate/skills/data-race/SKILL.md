---
name: data-race
description: Make a 30–45 second vertical animated video in a animated bar-chart races and number comparisons over time. Use when the user types /data-race followed by a topic.
---

# /data-race: bar-chart race

Turn one line into a finished vertical (9:16) animated video, made entirely in code.

## How to make it

1. **Pin down the topic.** Take the user's line as the topic (e.g. `/data-race most populated countries from 1950 to today`). If it is a fact, check it with a web search and note the 2–3 numbers you will show. Never invent numbers.
2. **Write a 30–45 s script**: a hook question in the first 2 seconds, 4–7 short beats, one surprising number, and a 1-line ending. Save it as `script.md`.
3. **Set up the project** in a new folder (skip anything already installed):
   ```bash
   npx create-video@latest --yes --blank data-race-video && cd data-race-video && npm i
   ```
   (This is Remotion, which turns React code into video. If `npx` is missing, install Node.js 18+ first.)
4. **Build it** in `src/`: in `src/Composition.tsx` set the `MyComp` composition to width 1080, height 1920, fps 30, durationInFrames = seconds × 30, and put one `<Sequence>` per beat inside `MyComponent`. Animate with `interpolate` / `spring`, and draw every shape yourself (SVG/CSS, or `@remotion/three` for 3D). No stock images, logos or real characters.
5. **Look before you render.** Run `npx remotion still` on 3–4 key frames, check them, fix anything that is cramped, cut off or hard to read.
6. **Render**:
   ```bash
   npx remotion render MyComp out/data-race.mp4
   ```
7. Reply with the file path, the script, and one idea for a follow-up episode.

## Style rules: bar-chart race
- Bars re-rank smoothly over time; a big year counter in the corner.
- Use real data (search for it, cite the source on screen in small text).
- Each bar has its own colour and a label + value that ticks.
- Highlight one overtaking moment with a flash and a caption.

## Always
- Big, readable captions (bottom third, max ~6 words on screen).
- Something moves in every second; cut or change angle every 2–4 s.
- Keep facts exact and say "about" when a number is rounded.
- This is a style *inspired by* data-race videos. Don't use their name, logo, characters or music in the video.
