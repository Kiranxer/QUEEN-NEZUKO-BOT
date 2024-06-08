const {
  command,
  webp2mp4,
  isPrivate,
  AddMp3Meta,
  getBuffer
} = require("../lib/");
const gis = require("g-i-s");
const googleTTS = require('google-tts-api');
const X = require("../config");
const {
  translate
} = require("@vitalets/google-translate-api");
const TRT = async (_0x1dafa1, _0x58e73c = 'en') => {
  const _0x3ad641 = await translate(_0x1dafa1, {
    'to': _0x58e73c,
    'autoCorrect': true
  })["catch"](_0x3a7882 => "requst faild with status code 303");
  return _0x3ad641;
};
command({
  'pattern': "trt ?(.*)",
  'fromMe': isPrivate,
  'desc': "hehhe",
  'type': "search"
}, async (_0x3c2eb2, _0x5d6db0) => {
  if (!_0x3c2eb2.reply_message.text) {
    return await _0x3c2eb2.reply("*_Reply to a text msg_*\n*_Example : trt ml_*\n*_trt en & ```reply to a text```_*");
  }
  if (!_0x5d6db0) {
    return await _0x3c2eb2.reply("*_give me a language you want to convert_");
  }
  const {
    text: _0xcbe846
  } = await TRT(_0x3c2eb2.reply_message.text, _0x5d6db0);
  return await _0x3c2eb2.sendMessage(_0xcbe846);
});
command({
  'pattern': 'img',
  'fromMe': isPrivate,
  'desc': "Google Image search",
  'type': "downloader"
}, async (_0x49075f, _0x110790) => {
  if (!_0x110790) {
    return await _0x49075f.sendMessage("*_Enter Search Term,number_*");
  }
  let [_0x3983de, _0x326d22] = _0x110790.split(',');
  let _0x5e0cb6 = await gimage(_0x3983de, _0x326d22);
  await _0x49075f.sendMessage("*_Downloading " + (_0x326d22 || 0x5) + " images for " + _0x3983de + '_*');
  for (let _0x14779c of _0x5e0cb6) {
    await _0x49075f.sendFromUrl(_0x14779c);
  }
});
async function gimage(_0xf8119d, _0x35397a = 0x5) {
  let _0x298793 = [];
  return new Promise((_0x50cfca, _0x38f643) => {
    gis(_0xf8119d, async (_0x1e9e1a, _0x557902) => {
      for (var _0x2f9e3b = 0x0; _0x2f9e3b < (_0x557902.length < _0x35397a ? _0x557902.length : _0x35397a); _0x2f9e3b++) {
        _0x298793.push(_0x557902[_0x2f9e3b].url);
        _0x50cfca(_0x298793);
      }
    });
  });
}
command({
  'pattern': "tts",
  'fromMe': isPrivate,
  'desc': "google tts by aswin sparky",
  'type': "converter"
}, async (_0x1a8725, _0x295364, _0x4fc11f) => {
  if (!_0x295364) {
    return await _0x1a8725.reply("*_Need Text!_*\n*_Example: tts Hello_*\n*_tts Hello :en_*");
  }
  let [_0x4a5e74, _0x5e9b4c] = _0x295364.split`:`;
  const _0x4be3df = googleTTS.getAudioUrl('' + _0x4a5e74, {
    'lang': _0x5e9b4c || "en-US",
    'slow': false,
    'host': 'https://translate.google.com'
  });
  _0x1a8725.client.sendMessage(_0x1a8725.jid, {
    'audio': {
      'url': _0x4be3df
    },
    'mimetype': "audio/mpeg",
    'ptt': true
  }, {
    'quoted': _0x1a8725
  });
command({
  'pattern': "photo",
  'fromMe': isPrivate,
  'desc': "Changes sticker to Photo",
  'type': "converter"
}, async (_0x7c51e9, _0x1e156d, _0x5bb4b3) => {
  if (!_0x7c51e9.reply_message) {
    return await _0x7c51e9.reply("*_Reply to a sticker_*");
  }
  if (_0x7c51e9.reply_message.mtype !== 'stickerMessage') {
    return await _0x7c51e9.reply("*_Not a sticker_*");
  }
  let _0x2477be = await _0x5bb4b3.quoted.download();
  return await _0x7c51e9.sendMessage(_0x2477be, {
    'mimetype': "image/jpeg",
    'caption': X.CAPTION,
    'quoted': _0x7c51e9
  }, "image");
});
command({
  'pattern': 'mp4',
  'fromMe': isPrivate,
  'desc': "Changes sticker to Video",
  'type': "converter"
}, async (_0x10549a, _0x1c4e97, _0x538a8d) => {
  if (!_0x10549a.reply_message) {
    return await _0x10549a.reply("*_Reply to a sticker_*");
  }
  if (_0x10549a.reply_message.mtype !== "stickerMessage") {
    return await _0x10549a.reply("*_Not a sticker_*");
  }
  let _0x385f4d = await _0x538a8d.quoted.download();
  let _0xaab205 = await webp2mp4(_0x385f4d);
  return await _0x10549a.sendMessage(_0xaab205, {
    'mimetype': "video/mp4",
    'caption': X.CAPTION,
    'quoted': _0x10549a
  }, 'video');
});
const {
  toAudio
} = require("../lib/media");
command({
  'pattern': "mp3",
  'fromMe': isPrivate,
  'desc': "converts video/audio/voice to mp3",
  'type': "converter"
}, async (_0x1d7802, _0x8bda3a, _0x238119) => {
  if (!_0x1d7802.reply_message || !_0x1d7802.reply_message.video && !_0x1d7802.reply_message.audio) {
    return await _0x1d7802.reply("*_Reply at audio/voice/video!_*");
  }
  let _0x5b8f8e = await toAudio(await _0x238119.quoted.download(), "mp3");
  let _0x293406 = X.AUDIO_DATA.split(/[;]/)[0x2];
  let _0x5e5d33 = await getBuffer(_0x293406.trim());
  let _0x379724 = X.AUDIO_DATA.split(/[|,;]/)[0x0] ? X.AUDIO_DATA.split(/[|,;]/)[0x0] : X.AUDIO_DATA;
  const _0x536007 = await AddMp3Meta(_0x5b8f8e, _0x5e5d33, {
    'title': _0x379724,
    'artist': "zeta"
  });
  return await _0x1d7802.client.sendMessage(_0x1d7802.jid, {
    'audio': _0x536007,
    'mimetype': "audio/mpeg"
  }, {
    'quoted': _0x1d7802
  });
});
command({
  'pattern': "gif",
  'fromMe': isPrivate,
  'desc': "animated sticker/video to gif",
  'type': "converter"
}, async (_0x534d5c, _0x55a7cd, _0x4ba5d7) => {
  if (!_0x534d5c.reply_message) {
    return await _0x534d5c.reply("*_Reply to a animated sticker/video_*");
  }
  if (_0x534d5c.reply_message.mtype == 'stickerMessage') {
    let _0x45ab64 = await _0x4ba5d7.quoted.download();
    let _0x2f4c2c = await webp2mp4(_0x45ab64);
    await _0x534d5c.client.sendMessage(_0x534d5c.jid, {
      'video': {
        'url': _0x2f4c2c
      },
      'gifPlayback': true,
      'caption': X.CAPTION
    }, {
      'quoted': _0x534d5c
    });
  } else {
    if (_0x534d5c.reply_message.video) {
      let _0x33d83e = await _0x4ba5d7.quoted.download();
      await _0x534d5c.client.sendMessage(_0x534d5c.jid, {
        'video': _0x33d83e,
        'gifPlayback': true,
        'caption': X.CAPTION
      }, {
        'quoted': _0x534d5c
      });
    }
  }
});
