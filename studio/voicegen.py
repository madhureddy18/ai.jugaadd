"""Expressive voices for a reel scene: Kokoro TTS per line, then per-line pitch (rubberband), gain,
and silence trimmed to a few ms so the pauses come only from each line's `gap`.

    node -e "global.window={};require('./scenes/aij_claude.js');console.log(JSON.stringify(window.SCENE.lines))" > lines.json
    python voicegen.py lines.json voice/aij_claude        (run from the codevid folder)

Line fields used: who, say|text, speed, pitch (semitones), gain (dB). render.js picks up voice/<scene>/NN.wav automatically.
"""
import json
import os
import subprocess
import sys

sys.path.insert(0, os.getcwd())
import soundfile as sf  # noqa: E402
import tts  # noqa: E402  (codevid/tts.py)


def main(lines_file, out_dir):
    lines = json.load(open(lines_file))
    os.makedirs(out_dir, exist_ok=True)
    raw = os.path.join(out_dir, "_raw")
    os.makedirs(raw, exist_ok=True)
    extra = tts.extra_lexicon([l.get("say") or l["text"] for l in lines], os.path.join(raw, "extra_lexicon.txt"))
    eng = tts.engine(extra)
    for i, l in enumerate(lines, 1):
        sid, speed = tts.VOICES.get(l["who"], tts.VOICES["narrator"])
        audio = eng.generate(l.get("say") or l["text"], sid=l.get("sid", sid), speed=l.get("speed", speed))
        src = os.path.join(raw, f"{i:02d}.wav")
        sf.write(src, audio.samples, audio.sample_rate)
        semis, gain = float(l.get("pitch", 0)), float(l.get("gain", 0))
        trim = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03"
        af = [trim, "areverse", trim, "areverse"]
        if semis:
            af.append(f"rubberband=pitch={2 ** (semis / 12):.5f}:formant=preserved")
        af.append(f"volume={gain}dB")
        af.append("apad=pad_dur=0.04")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-af", ",".join(af), "-ar", "24000", "-ac", "1",
                        os.path.join(out_dir, f"{i:02d}.wav")], check=True)
        print(i, l["who"], l.get("say") or l["text"])


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
