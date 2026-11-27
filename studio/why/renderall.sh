#!/bin/bash
S=/home/claude/ai.jugaadd/studio/scenes; cd /home/claude/insideyou-shorts/codevid
for k in trainx milk biscuit rupee petrol; do
  cat $S/aij_${k}_lines.js $S/aij_${k}_body.js > scenes/aij_$k.js
  CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome node render.js scenes/aij_$k.js > /tmp/r_$k.log 2>&1 && echo "$k done" >> /tmp/renderall.log || echo "$k FAIL" >> /tmp/renderall.log
done
echo ALL >> /tmp/renderall.log
