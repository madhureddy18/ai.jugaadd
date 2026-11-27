#!/bin/bash
# prev.sh <key> <times> [real]  — placeholder voices unless real voices exist, then preview grid → /tmp/<key>.jpg
k=$1; T=$2; S=/home/claude/ai.jugaadd/studio/scenes; cd /home/claude/insideyou-shorts/codevid
cat $S/aij_${k}_lines.js $S/aij_${k}_body.js > scenes/aij_$k.js
mkdir -p voice/aij_$k out/aij_${k}_work/voice
if [ ! -f voice/aij_$k/.real ]; then node -e "
global.window={}; require('$S/aij_${k}_lines.js'); const L=window.JR_LINES; const {execFileSync}=require('child_process');
L.forEach((l,i)=>{ const d=(l.say.split(/\s+/).length*0.36+0.3); const f=String(i+1).padStart(2,'0')+'.wav';
 for (const dir of ['voice/aij_$k','out/aij_${k}_work/voice']) execFileSync('ffmpeg',['-y','-v','error','-f','lavfi','-i','sine=f=180:d='+d.toFixed(2),'-af','volume=0.3','-ar','24000','-ac','1',dir+'/'+f]); });
require('fs').writeFileSync('out/aij_${k}_work/voice/key.json', JSON.stringify(L.map(l=>[l.who,l.say||l.text,l.speed||0])));"; fi
rm -rf out/aij_${k}_preview; CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome timeout 500 node render.js scenes/aij_$k.js --preview $T 2>&1 | grep -E "preview|Error|error" | grep -v "Failed to load" | head -5
python3 -c "
from PIL import Image; import glob
fs=sorted(glob.glob('out/aij_${k}_preview/*.jpg')); ims=[Image.open(f).convert('RGB').resize((270,480)) for f in fs]
n=len(ims); c=min(n,6); r=(n+5)//6
o=Image.new('RGB',(270*c,480*r)); [o.paste(im,((i%6)*270,(i//6)*480)) for i,im in enumerate(ims)]; o.save('/tmp/$k.jpg',quality=85)"
