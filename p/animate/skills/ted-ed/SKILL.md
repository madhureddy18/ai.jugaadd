---
name: ted-ed
description: Make a 30–45 second vertical animated video in a storybook, hand-drawn style explainers for history and science (TED-Ed-style). Use when the user types /ted-ed followed by a topic.
---

# /ted-ed: storybook explainer

Turn one line into a finished vertical (9:16) animated video, made entirely in code.

## How to make it

1. **Pin down the topic.** Take the user's line as the topic (e.g. `/ted-ed the deepest point in the ocean`). If it is a fact, check it with a web search and note the 2–3 numbers you will show. Never invent numbers.
2. **Write a 30–45 s script**: a hook question in the first 2 seconds, 4–7 short beats, one surprising number, and a 1-line ending. Save it as `script.md`.
3. **Set up the project** in a new folder (skip anything already installed):
   ```bash
   npx create-video@latest --yes --blank ted-ed-video && cd ted-ed-video && npm i
   ```
   (This is Remotion, which turns React code into video. If `npx` is missing, install Node.js 18+ first.)
4. **Build it** in `src/`: in `src/Composition.tsx` set the `MyComp` composition to width 1080, height 1920, fps 30, durationInFrames = seconds × 30, and put one `<Sequence>` per beat inside `MyComponent`. Animate with `interpolate` / `spring`, and draw every shape yourself (SVG/CSS, or `@remotion/three` for 3D). No stock images, logos or real characters.
5. **Look before you render.** Run `npx remotion still` on 3–4 key frames, check them, fix anything that is cramped, cut off or hard to read.
6. **Render**:
   ```bash
   npx remotion render MyComp out/ted-ed.mp4
   ```
7. Reply with the file path, the script, and one idea for a follow-up episode.

## Style rules: storybook explainer
- Paper texture background (cream), ink outlines in dark brown, flat watercolour fills, slight line "boil" (redraw lines with tiny random jitter at 12 fps).
- Warm, muted palette (ochre, teal, brick red). Serif or hand-lettered labels with arrows.
- Cross-sections and diagrams that build up piece by piece.
- Gentle camera pans across one big illustrated scene.

## Always
- Big, readable captions (bottom third, max ~6 words on screen).
- Something moves in every second; cut or change angle every 2–4 s.
- Keep facts exact and say "about" when a number is rounded.
- This is a style *inspired by* TED-Ed. Don't use their name, logo, characters or music in the video.
