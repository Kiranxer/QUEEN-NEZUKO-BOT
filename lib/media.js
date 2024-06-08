const fs = require('fs');
const path = require("path");
const FormData = require("form-data");
const {
  spawn
} = require("child_process");
const {
  default: fetch
} = require("node-fetch");
let {
  JSDOM
} = require("jsdom");
function ffmpeg(_0x1213e9, _0x2f2196 = [], _0x3c1211 = '', _0x2930fc = '') {
  return new Promise(async (_0x527aa8, _0x837840) => {
    try {
      let _0x666134 = path.join(__dirname, "../media", +new Date() + '.' + _0x3c1211);
      let _0x4db5e7 = _0x666134 + '.' + _0x2930fc;
      await fs.promises.writeFile(_0x666134, _0x1213e9);
      spawn('ffmpeg', ['-y', '-i', _0x666134, ..._0x2f2196, _0x4db5e7]).on("error", _0x837840).on("close", async _0x554ab3 => {
        try {
          await fs.promises.unlink(_0x666134);
          if (_0x554ab3 !== 0x0) {
            return _0x837840(_0x554ab3);
          }
          _0x527aa8(await fs.promises.readFile(_0x4db5e7));
          await fs.promises.unlink(_0x4db5e7);
        } catch (_0x309e15) {
          _0x837840(_0x309e15);
        }
      });
    } catch (_0x40e28a) {
      _0x837840(_0x40e28a);
    }
  });
}
function toAudio(_0x431287, _0x4d9dfa) {
  return ffmpeg(_0x431287, ["-vn", "-ac", '2', '-b:a', "128k", "-ar", "44100", '-f', "mp3"], _0x4d9dfa, "mp3");
}
function toPTT(_0x3e7ff4, _0x5beee1) {
  return ffmpeg(_0x3e7ff4, ["-vn", "-c:a", "libopus", "-b:a", "128k", '-vbr', 'on', "-compression_level", '10'], _0x5beee1, "opus");
}
function toVideo(_0x555576, _0x5c4c9b) {
  return ffmpeg(_0x555576, ["-c:v", "libx264", "-c:a", "aac", "-ab", "128k", "-ar", '44100', "-crf", '32', "-preset", "slow"], _0x5c4c9b, 'mp4');
}
module.exports = {
  'webp2mp4': async _0x2947c7 => {
    let _0x2c9410 = new FormData();
    let _0x4209a8 = typeof _0x2947c7 === "string" && /https?:\/\//.test(_0x2947c7);
    _0x2c9410.append('new-image-url', _0x4209a8 ? _0x2947c7 : '');
    _0x2c9410.append("new-image", _0x4209a8 ? '' : _0x2947c7, "image.webp");
    let _0x7343e7 = await fetch("https://ezgif.com/webp-to-mp4", {
      'method': "POST",
      'body': _0x2c9410
    });
    let _0x4c7218 = await _0x7343e7.text();
    let {
      document: _0x5914a2
    } = new JSDOM(_0x4c7218).window;
    let _0x4d5d30 = new FormData();
    let _0x1f7488 = {};
    for (let _0x1be508 of _0x5914a2.querySelectorAll("form input[name]")) {
      _0x1f7488[_0x1be508.name] = _0x1be508.value;
      _0x4d5d30.append(_0x1be508.name, _0x1be508.value);
    }
    let _0x256ec2 = await fetch("https://ezgif.com/webp-to-mp4/" + _0x1f7488.file, {
      'method': "POST",
      'body': _0x4d5d30
    });
    let _0x1e3c67 = await _0x256ec2.text();
    let {
      document: _0x268dad
    } = new JSDOM(_0x1e3c67).window;
    return new URL(_0x268dad.querySelector("div#output > p.outfile > video > source").src, _0x256ec2.url).toString();
  },
  'webp2png': async _0x1cacce => {
    let _0x5c1565 = new FormData();
    let _0x21007f = typeof _0x1cacce === "string" && /https?:\/\//.test(_0x1cacce);
    _0x5c1565.append("new-image-url", _0x21007f ? _0x1cacce : '');
    _0x5c1565.append("new-image", _0x21007f ? '' : _0x1cacce, "image.webp");
    let _0x43b37a = await fetch("https://s6.ezgif.com/webp-to-png", {
      'method': "POST",
      'body': _0x5c1565
    });
    let _0x5ab2eb = await _0x43b37a.text();
    let {
      document: _0x961673
    } = new JSDOM(_0x5ab2eb).window;
    let _0x32abfe = new FormData();
    let _0x1e09b5 = {};
    for (let _0x512cf9 of _0x961673.querySelectorAll("form input[name]")) {
      _0x1e09b5[_0x512cf9.name] = _0x512cf9.value;
      _0x32abfe.append(_0x512cf9.name, _0x512cf9.value);
    }
    let _0x4cd73 = await fetch("https://ezgif.com/webp-to-png/" + _0x1e09b5.file, {
      'method': 'POST',
      'body': _0x32abfe
    });
    let _0x6d524c = await _0x4cd73.text();
    console.log(_0x6d524c);
    let {
      document: _0x3fa9e1
    } = new JSDOM(_0x6d524c).window;
    return new URL(_0x3fa9e1.querySelector("div#output > p.outfile > img").src, _0x4cd73.url).toString();
  },
  'toAudio': toAudio,
  'toPTT': toPTT,
  'toVideo': toVideo,
  'ffmpeg': ffmpeg
};
