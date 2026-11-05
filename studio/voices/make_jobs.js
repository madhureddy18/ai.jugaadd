// Scene lines -> OmniVoice job config with the fixed cast.   node make_jobs.js ../../path/to/scene.js studio/voices/<scene>.json
// Each scene line may carry `omni` (text with emotion tags, e.g. "[sigh] Ugh.") and `omniSpeed`; otherwise `say`/`text` is used.
const fs = require('fs'), path = require('path');
global.window = {}; require(path.resolve(process.argv[2]));
const cast = JSON.parse(fs.readFileSync(path.join(__dirname, 'cast.json'), 'utf8'));
cast.jobs = window.SCENE.lines.map((l, i) => ({ voice: cast.cast[l.who], text: l.omni || (l.say || l.text).replace(/\*/g, ''), speed: l.omniSpeed || 1.0, file: String(i + 1).padStart(2, '0') + '.wav' }));
delete cast.mixes; fs.writeFileSync(process.argv[3], JSON.stringify(cast, null, 1)); console.log(`${cast.jobs.length} lines -> ${process.argv[3]}`);
