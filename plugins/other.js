const {
  IMGBB_KEY
} = require("../config");
const ffmpeg = require("fluent-ffmpeg");
const {
  upload
} = require('../lib/imgur');
const {
  command,
  isPrivate,
  getBuffer,
  getJson
} = require("../lib/");
const config = require("../config");
const fs = require('fs');
const axios = require("axios");
async function webpUpload(_0x1cee4b) {
  return new Promise(async _0x79ae40 => {
    const _0x41fdd5 = require('imgbb-uploader');
    for (let _0x2da1a8 of IMGBB_KEY) {
      const _0x47a1c8 = {
        'apiKey': _0x2da1a8,
        'imagePath': _0x1cee4b
      };
      var _0x4b4aa3 = await _0x41fdd5(_0x47a1c8);
      if (_0x4b4aa3.url) {
        return _0x79ae40(_0x4b4aa3.url);
      }
    }
  });
}
command({
  'pattern': 'url',
  'fromMe': isPrivate,
  'desc': "url maker",
  'type': "misc"
}, async (_0x2c5d2c, _0x15cb58, _0x499053) => {
  if (_0x2c5d2c.reply_message.sticker) {
    return await _0x2c5d2c.client.sendMessage(_0x2c5d2c.jid, {
      'text': '_' + (await webpUpload(await _0x499053.quoted.download())) + '_'
    }, {
      'quoted': _0x2c5d2c
    });
  } else {
    if (_0x2c5d2c.reply_message.audio) {
      if (_0x2c5d2c.reply_message.duration > 0x5a) {
        return await _0x2c5d2c.client.sendMessage(_0x2c5d2c.jid, {
          'text': "*_Audio too large. Try below 90 seconds!_*"
        }, {
          'quoted': _0x2c5d2c
        });
      }
      fs.writeFileSync("./fileUrl.mp3", await _0x499053.quoted.download());
      await _0x2c5d2c.reply("*_Uploading Url…_*");
      ffmpeg("./fileUrl.mp3").outputOptions(['-y', '-filter_complex', '[0:a]showvolume=f=1:b=4:w=720:h=68,format=yuv420p[vid]', '-map', '[vid]', "-map 0:a"]).save('output.mp4').on("end", async () => {
        try {
          var _0xdff8e6 = await upload("output.mp4");
        } catch {
          return await _0x2c5d2c.client.sendMessage(_0x2c5d2c.jid, {
            'text': "*_Failed to upload file!_*"
          }, {
            'quoted': _0x2c5d2c
          });
        }
        return await _0x2c5d2c.client.sendMessage(_0x2c5d2c.jid, {
          'text': '_' + _0xdff8e6.link + '_'
        }, {
          'quoted': _0x2c5d2c
        });
      });
    } else {
      if (_0x2c5d2c.reply_message.image) {
        fs.writeFileSync('./dldImg.jpg', await _0x499053.quoted.download());
        let {
          link: _0x4af878
        } = await upload('./dldImg.jpg');
        if (typeof _0x4af878 == "function") {
          return await _0x2c5d2c.reply("*_There are issues with Bot's IP & imgur, so uploading can't be done_*");
        }
        try {
          await _0x2c5d2c.client.sendMessage(_0x2c5d2c.jid, {
            'text': '_' + _0x4af878 + '_'
          }, {
            'quoted': _0x2c5d2c
          });
        } catch {
          return await _0x2c5d2c.client.sendMessage(_0x2c5d2c.jid, {
            'text': "*_Failed to upload file!_*"
          }, {
            'quoted': _0x2c5d2c
          });
        }
      } else {
        if (_0x2c5d2c.reply_message.video) {
          fs.writeFileSync("./dldVideo.mp4", await _0x499053.quoted.download());
          let {
            link: _0x5ab7c9
          } = await upload("./dldVideo.mp4");
          if (typeof _0x5ab7c9 == "function") {
            return await _0x2c5d2c.reply("*_There are issues with Bot's IP & imgur, so uploading can't be done_*");
          }
          try {
            await _0x2c5d2c.client.sendMessage(_0x2c5d2c.jid, {
              'text': '_' + _0x5ab7c9 + '_'
            }, {
              'quoted': _0x2c5d2c
            });
          } catch {
            return await _0x2c5d2c.client.sendMessage(_0x2c5d2c.jid, {
              'text': "*_Failed to upload file!_*"
            }, {
              'quoted': _0x2c5d2c
            });
          }
        } else {
          return await _0x2c5d2c.reply("*_Reply to image/video/audio_*");
        }
      }
    }
  }
});
const {
  toPTT
} = require("../lib/media");
command({
  'pattern': 'wave',
  'fromMe': isPrivate,
  'desc': "converts video/audio/voice to voice",
  'type': "converter"
}, async (_0x31f3fb, _0x4df25b, _0x26b806) => {
  if (!_0x31f3fb.reply_message || !_0x31f3fb.reply_message.video && !_0x31f3fb.reply_message.audio) {
    return await _0x31f3fb.reply("*_Reply at audio/voice/video!_*");
  }
  let _0x2a50c4 = await _0x26b806.quoted.download();
  let _0x5a8979 = await toPTT(_0x2a50c4);
  return await _0x31f3fb.sendMessage(_0x5a8979, {
    'mimetype': 'audio/mpeg',
    'ptt': true,
    'quoted': _0x31f3fb
  }, "audio");
});
let labsVoiceID = {
  'rachel': {
    'voice_id': "21m00Tcm4TlvDq8ikWAM"
  },
  'clyde': {
    'voice_id': "2EiwWnXFnvU5JabPnv8n"
  },
  'domi': {
    'voice_id': "AZnzlk1XvdvUeBnXmlld"
  },
  'dave': {
    'voice_id': 'CYw3kZ02Hs0563khs1Fj'
  },
  'fin': {
    'voice_id': "D38z5RcWu1voky8WS1ja"
  },
  'bella': {
    'voice_id': 'EXAVITQu4vr4xnSDxMaL'
  },
  'antoni': {
    'voice_id': 'ErXwobaYiN019PkySvjV'
  },
  'thomas': {
    'voice_id': "GBv7mTt0atIp3Br8iCZE"
  },
  'charlie': {
    'voice_id': "IKne3meq5aSn9XLyUdCD"
  },
  'emily': {
    'voice_id': "LcfcDJNUP1GQjkzn1xUU"
  },
  'elli': {
    'voice_id': 'MF3mGyEYCl7XYWbV9V6O'
  },
  'callum': {
    'voice_id': 'N2lVS1w4EtoT3dr4eOWO'
  },
  'patrick': {
    'voice_id': "ODq5zmih8GrVes37Dizd"
  },
  'harry': {
    'voice_id': "SOYHLrjzK2X1ezoPC6cr"
  },
  'liam': {
    'voice_id': "TX3LPaxmHKxFdv7VOQHJ"
  },
  'dorothy': {
    'voice_id': "ThT5KcBeYPX3keUQqHPh"
  },
  'josh': {
    'voice_id': 'TxGEqnHWrfWFTfGW9XjX'
  },
  'arnold': {
    'voice_id': "VR6AewLTigWG4xSOukaG"
  },
  'charlotte': {
    'voice_id': 'XB0fDUnXU5powFXDhCwa'
  },
  'matilda': {
    'voice_id': "XrExE9yKIg1WjnnlVkGX"
  },
  'matthew': {
    'voice_id': 'Yko7PKHZNXotIFUBG7I9'
  },
  'james': {
    'voice_id': "ZQe5CZNOzWyzPSCn5a3c"
  },
  'joseph': {
    'voice_id': "Zlb1dXrM653N07WRdFW3"
  },
  'jeremy': {
    'voice_id': "bVMeCyTHy58xNoL34h3p"
  },
  'michael': {
    'voice_id': "flq6f7yk4E4fJM5XTYuZ"
  },
  'ethan': {
    'voice_id': 'g5CIjZEefAph4nQFvHAz'
  },
  'gigi': {
    'voice_id': 'jBpfuIE2acCO8z3wKNLl'
  },
  'freya': {
    'voice_id': "jsCqWAovK2LkecY7zXl4"
  },
  'grace': {
    'voice_id': "oWAxZDx7w5VEj9dCyTzz"
  },
  'daniel': {
    'voice_id': "onwK4e9ZLuTAKqWW03F9"
  },
  'serena': {
    'voice_id': "pMsXgVXv3BLzUgSXRplE"
  },
  'adam': {
    'voice_id': 'pNInz6obpgDQGcFmaJgB'
  },
  'nicole': {
    'voice_id': 'piTKgcLEGmPE4e6mEKli'
  },
  'jessie': {
    'voice_id': "t0jbNlBVZ17f02VDIeMI"
  },
  'ryan': {
    'voice_id': "wViXBPUzp2ZZixB1xQuM"
  },
  'sam': {
    'voice_id': "yoZ06aMxZJJ28mfd3POQ"
  },
  'glinda': {
    'voice_id': 'z9fAnlkpzviPz146aGWa'
  },
  'giovanni': {
    'voice_id': 'zcAOhNBS3c14rBihAFp1'
  },
  'mimi': {
    'voice_id': "zrHiDhphv9ZnVXBqCLjz"
  }
};
async function elevenlabs(_0x24d37f) {
  let _0x170cde = {};
  for (key in labsVoiceID) {
    if (_0x24d37f.split(/[|,;]/)[0x1].toLowerCase().trim() == key) {
      let _0x4ab7d6 = labsVoiceID[key].voice_id;
      const _0x4f52c2 = "https://api.elevenlabs.io/v1/text-to-speech/" + _0x4ab7d6 + "/stream";
      _0x170cde = await axios({
        'method': 'POST',
        'url': _0x4f52c2,
        'data': {
          'text': _0x24d37f.split(/[|.;]/)[0x0].trim(),
          'voice_settings': {
            'stability': 0.5,
            'similarity_boost': 0.5
          },
          'model_id': "eleven_monolingual_v1"
        },
        'headers': {
          'Accept': "audio/mpeg",
          'xi-api-key': "2a0050b5932ff8d79f54418fa370d1c1",
          'Content-Type': "application/json"
        },
        'responseType': "stream"
      });
      break;
    }
  }
  return _0x170cde.data;
}
command({
  'pattern': "aitts",
  'fromMe': isPrivate,
  'desc': "converts video/audio/voice to voice",
  'type': "converter"
}, async (_0x5a7bf2, _0x552669, _0x3b8d4a, _0x1f140b) => {
  try {
    if (!_0x47210a) {
      return await _0x5a7bf2.reply("*_need voice id and text_*\n_example_\n\n_*aitts* hey vroh its a test,adam_\n");
    }
    let _0x338ab1 = await elevenlabs(_0x552669);
    return await _0x5a7bf2.client.sendMessage(_0x5a7bf2.jid, {
      'audio': {
        'stream': _0x338ab1
      },
      'mimetype': "audio/mpeg"
    }, "audio");
  } catch (_0x1bbad5) {
    return _0x5a7bf2.reply(_0x1bbad5);
  }
});
command({
  'pattern': "emix",
  'fromMe': isPrivate,
  'desc': "mix emojis",
  'type': "converter"
}, async (_0x3950f2, _0x428feb) => {
  if (!_0x428feb) {
    return await _0x3950f2.sendMessage("*_Need emojis_*\n*_eg:- emix 🙂😌_*");
  }
  try {
    var {
      result: _0x15d8b3
    } = await getJson("https://levanter.onrender.com/emix?q=" + _0x428feb);
    let _0x43be4a = await getBuffer(_0x15d8b3);
    await _0x3950f2.sendMessage(_0x43be4a, {
      'packname': config.STICKER_DATA.split(';')[0x0],
      'author': config.STICKER_DATA.split(';')[0x1]
    }, "sticker");
  } catch (_0x68841a) {
    return _0x68841a;
  }
});
