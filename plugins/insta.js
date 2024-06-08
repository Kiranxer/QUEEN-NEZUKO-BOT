const {
  command,
  isPrivate,
  getJson,
  extractUrlFromMessage
} = require("../lib/");
const config = require("../config");
function isInstaUrl(_0x4a706e) {
  return /^https?:\/\/(www\.)?instagram\.com\//.test(_0x4a706e);
}
command({
  'pattern': "insta",
  'fromMe': isPrivate,
  'desc': "Download Instagram Videos",
  'type': "user"
}, async (_0x53a182, _0x2400dd, _0x2f4c21, _0x423c8f) => {
  try {
    if (process.cwd() !== "/root/zeta") {
      return _0x53a182.reply("use og version");
    }
    if (!_0x2400dd) {
      return await _0x53a182.reply("*_Need instagram Link_*");
    }
    let _0xc6b584 = await extractUrlFromMessage(_0x2400dd);
    if (_0x2400dd.startsWith("dl-url")) {
      await _0x53a182.sendFromUrl(_0xc6b584);
    }
    if (!/^https?:\/\/(www\.)?instagram\.com\//.test(_0xc6b584)) {
      return;
    }
    if (!_0xc6b584) {
      return _0x53a182.reply("_*Provide a valid Instagram story URL*_");
    }
    const {
      result: _0x2372b3
    } = await getJson("https://api.lokiser.xyz/download/insta?url=" + _0xc6b584);
    if (_0x2372b3.length === 0x1) {
      return await _0x53a182.sendFromUrl(_0x2372b3[0x0].download_link);
    }
    let _0x36e2f7 = [];
    let _0x75754a = 0x1;
    if (!_0x2372b3) {
      return await _0x53a182.reply("not found");
    }
    if (config.HANDLERS == '^') {
      _0x2372b3.map(async _0x36d3ca => {
        _0x36e2f7.push({
          'name': "quick_reply",
          'buttonParamsJson': "{\"display_text\":\"" + _0x75754a++ + '/' + _0x2372b3.length + "\",\"id\":\"insta dl-url:" + _0x36d3ca.download_link + "\"}"
        });
      });
    } else {
      if (config.HANDLERS == "^[.,]") {
        _0x2372b3.map(async _0x3d8790 => {
          _0x36e2f7.push({
            'name': "quick_reply",
            'buttonParamsJson': "{\"display_text\":\"" + _0x75754a++ + '/' + _0x2372b3.length + "\",\"id\":\".insta dl-url:" + _0x3d8790.download_link + "\"}"
          });
        });
      } else {
        let _0x532edd = config.HANDLERS;
        _0x2372b3.map(async _0x315684 => {
          _0x36e2f7.push({
            'name': "quick_reply",
            'buttonParamsJson': "{\"display_text\":\"" + _0x75754a++ + '/' + _0x2372b3.length + "\",\"id\":\"" + _0x532edd + "insta dl-url:" + _0x315684.download_link + "\"}"
          });
        });
      }
    }
    if (_0x36e2f7.length == 0x1) {
      return await _0x53a182.sendFromUrl(_0x2372b3[0x0].download_link);
    }
    let _0x38fb88 = _0x36e2f7.splice(0x0, 0xa);
    var _0x249fa6 = await prepareWAMessageMedia({
      'image': {
        'url': "https://i.imgur.com/imOAWEN.jpeg"
      }
    }, {
      'upload': _0x423c8f.waUploadToServer
    });
    const _0x121572 = {
      'body': {
        'text': "*Instagram Downloader*"
      },
      'footer': {
        'text': "ⓘ Created By Zenitsu"
      },
      'header': {
        'title': "𝐍𝐄𝐙𝐔𝐊𝐎 𝐌𝐃",
        'subtitle': "Queen-Nezuko",
        'hasMediaAttachment': true,
        'imageMessage': _0x249fa6.imageMessage
      },
      'nativeFlowMessage': {
        'buttons': _0x38fb88
      }
    };
    const _0x172d10 = {
      'messageContextInfo': {
        'deviceListMetadata': {},
        'deviceListMetadataVersion': 0x2
      },
      'interactiveMessage': _0x121572
    };
    return await _0x423c8f.relayMessage(_0x2f4c21.from, {
      'viewOnceMessage': {
        'message': _0x172d10
      }
    }, {});
  } catch (_0x1e331c) {
    return _0x53a182.reply(_0x1e331c);
  }
});
