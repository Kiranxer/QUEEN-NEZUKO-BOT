const axios = require("axios");
const {
  jidDecode,
  delay
} = require('@whiskeysockets/baileys');
const acrcloud = require("./acr");
const {
  command
} = require("./event");
const config = require("../config");
const {
  fromBuffer
} = require("file-type");
const scrape = require("scraper-x0");
const scraper = new scrape("nxrj@123456");
const {
  ytIdRegex,
  yt,
  ytv,
  yta
} = require('./yotube');
const id3 = require("browser-id3-writer");
const {
  listall,
  strikeThrough,
  wingdings,
  vaporwave,
  typewriter,
  analucia,
  tildeStrikeThrough,
  underline,
  doubleUnderline,
  slashThrough,
  sparrow,
  heartsBetween,
  arrowBelow,
  crossAboveBelow,
  creepify,
  bubbles,
  mirror,
  squares,
  roundsquares,
  flip,
  tiny,
  createMap,
  serif_I,
  manga,
  ladybug,
  runes,
  serif_B,
  serif_BI
} = require("./fancy_font/fancy");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
  writeExifWebp
} = require('./sticker');
const {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
  webp2mp4,
  webp2png
} = require("./media");
const fs = require("node-webpmux/io");
const {
  readFile,
  unlink
} = require("fs/promises");
async function getBuffer(_0x5d42ff, _0x2396d3) {
  try {
    if (_0x2396d3) {
      _0x2396d3;
    } else {
      ({});
    }
    const _0xf64d50 = await require("axios")({
      'method': "get",
      'url': _0x5d42ff,
      'headers': {
        'DNT': 0x1,
        'Upgrade-Insecure-Request': 0x1
      },
      ..._0x2396d3,
      'responseType': 'arraybuffer'
    });
    return _0xf64d50.data;
  } catch (_0x1965f5) {
    console.log("Error : " + _0x1965f5);
  }
}
async function fetchJson(_0x289afa, _0xa6c8c3) {
  try {
    if (_0xa6c8c3) {
      _0xa6c8c3;
    } else {
      ({});
    }
    const _0x1ac964 = await axios({
      'method': "GET",
      'url': _0x289afa,
      'headers': {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      },
      ..._0xa6c8c3
    });
    return _0x1ac964.data;
  } catch (_0x31e36d) {
    return _0x31e36d;
  }
}
async function FiletypeFromUrl(_0x4fb305) {
  const _0x32ce75 = await getBuffer(_0x4fb305);
  const _0x2ab586 = await fromBuffer(_0x32ce75);
  let _0x4b3935;
  if (_0x2ab586) {
    _0x4b3935 = _0x2ab586.mime.split('/')[0x0];
  }
  return {
    'type': _0x4b3935,
    'buffer': _0x32ce75
  };
}
function extractUrlFromMessage(_0x464935) {
  const _0x34aad3 = /(https?:\/\/[^\s]+)/gi.exec(_0x464935);
  return _0x34aad3 ? _0x34aad3[0x0] : null;
}
module.exports = {
  'command': command,
  'addCommand': command,
  'Module': command,
  'Function': command,
  'isPrivate': config.WORK_TYPE.toLowerCase() === 'private',
  'store': require("./store"),
  'decodeJid': _0x10c238 => {
    if (/:\d+@/gi.test(_0x10c238)) {
      const _0xb725cc = jidDecode(_0x10c238) || {};
      return (_0xb725cc.user && _0xb725cc.server && _0xb725cc.user + '@' + _0xb725cc.server || _0x10c238).trim();
    } else {
      return _0x10c238;
    }
  },
  'parseJid'(_0xcac8a9 = '') {
    return [..._0xcac8a9.matchAll(/@([0-9]{5,16}|0)/g)].map(_0xa8da83 => _0xa8da83[0x1] + "@s.whatsapp.net");
  },
  'parsedJid'(_0xddb076 = '') {
    return [..._0xddb076.matchAll(/([0-9]{5,16}|0)/g)].map(_0x6835ea => _0x6835ea[0x1] + "@s.whatsapp.net");
  },
  'getJson': async function getJson(_0x61419, _0x4c887d) {
    try {
      if (_0x4c887d) {
        _0x4c887d;
      } else {
        ({});
      }
      const _0x4facf9 = await axios({
        'method': "GET",
        'url': _0x61419,
        'headers': {
          'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        },
        ..._0x4c887d
      });
      return _0x4facf9.data;
    } catch (_0x51ecb4) {
      return _0x51ecb4;
    }
  },
  'isUrl': isUrl = _0x201e1b => {
    return new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi').test(_0x201e1b);
  },
  'getUrl': getUrl = _0x1ca92b => {
    return _0x1ca92b.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
  },
  'getBuffer': getBuffer,
  'isAdmin': async (_0x6c6c4f, _0x12984c, _0x3de2d1) => {
    const _0xb314e = _0x3554e4 => {
      if (!_0x3554e4) {
        return _0x3554e4;
      }
      if (/:\d+@/gi.test(_0x3554e4)) {
        let _0x1cfc07 = jidDecode(_0x3554e4) || {};
        return _0x1cfc07.user && _0x1cfc07.server && _0x1cfc07.user + '@' + _0x1cfc07.server || _0x3554e4;
      } else {
        return _0x3554e4;
      }
    };
    let _0x3097ec = await _0x3de2d1.groupMetadata(_0x6c6c4f);
    const _0x47afe8 = _0x3097ec.participants.filter(_0x17ccfd => _0x17ccfd.admin !== null).map(_0x5dc90d => _0x5dc90d.id);
    return _0x47afe8.includes(_0xb314e(_0x12984c));
  },
  'qrcode': async _0x1c1123 => {
    const {
      toBuffer: _0xc06110
    } = require("qrcode");
    let _0x4152aa = await _0xc06110(_0x1c1123);
    return _0x4152aa;
  },
  'secondsToDHMS': async _0x13b9ec => {
    _0x13b9ec = Number(_0x13b9ec);
    var _0x169ea8 = Math.floor(_0x13b9ec / 86400);
    var _0x25b729 = Math.floor(_0x13b9ec % 86400 / 0xe10);
    var _0x10a13c = Math.floor(_0x13b9ec % 0xe10 / 0x3c);
    var _0x5d11b0 = Math.floor(_0x13b9ec % 0x3c);
    var _0x2e37a4 = _0x169ea8 > 0x0 ? _0x169ea8 + (_0x169ea8 == 0x1 ? " D, " : " D, ") : '';
    var _0x557bea = _0x25b729 > 0x0 ? _0x25b729 + (_0x25b729 == 0x1 ? " H, " : " H, ") : '';
    var _0x4179c1 = _0x10a13c > 0x0 ? _0x10a13c + (_0x10a13c == 0x1 ? " M, " : " M, ") : '';
    var _0x5c0ef5 = _0x5d11b0 > 0x0 ? _0x5d11b0 + (_0x5d11b0 == 0x1 ? " S" : " S") : '';
    return _0x2e37a4 + _0x557bea + _0x4179c1 + _0x5c0ef5;
  },
  'fromBuffer': fromBuffer,
  'formatBytes': (_0x206e6a, _0x1d56f7 = 0x2) => {
    if (!+_0x206e6a) {
      return "0 Bytes";
    }
    const _0x2492da = _0x1d56f7 < 0x0 ? 0x0 : _0x1d56f7;
    const _0x2b80d4 = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const _0x58e9c3 = Math.floor(Math.log(_0x206e6a) / Math.log(0x400));
    return parseFloat((_0x206e6a / Math.pow(0x400, _0x58e9c3)).toFixed(_0x2492da)) + " " + _0x2b80d4[_0x58e9c3];
  },
  'sleep': delay,
  'clockString': _0x310d10 => {
    seconds = Math.floor(_0x310d10 / 0x3e8 % 0x3c);
    minutes = Math.floor(_0x310d10 / 60000 % 0x3c);
    hours = Math.floor(_0x310d10 / 3600000 % 0x18);
    hours = hours < 0xa ? '0' + hours : hours;
    minutes = minutes < 0xa ? '0' + minutes : minutes;
    seconds = seconds < 0xa ? '0' + seconds : seconds;
    return hours + ':' + minutes + ':' + seconds;
  },
  'runtime': () => {
    var _0x4ad40a = Number('' + process.uptime());
    var _0x1e9997 = Math.floor(_0x4ad40a / 86400);
    var _0x5683df = Math.floor(_0x4ad40a % 86400 / 0xe10);
    var _0x3a7b46 = Math.floor(_0x4ad40a % 0xe10 / 0x3c);
    var _0x4d0a26 = Math.floor(_0x4ad40a % 0x3c);
    var _0x57969d = _0x1e9997 > 0x0 ? _0x1e9997 + (_0x1e9997 == 0x1 ? " day, " : " days, ") : '';
    var _0x11c615 = _0x5683df > 0x0 ? _0x5683df + (_0x5683df == 0x1 ? " hour, " : " hours, ") : '';
    var _0x46bd26 = _0x3a7b46 > 0x0 ? _0x3a7b46 + (_0x3a7b46 == 0x1 ? " minute, " : " minutes, ") : '';
    var _0x413f67 = _0x4d0a26 > 0x0 ? _0x4d0a26 + (_0x4d0a26 == 0x1 ? " second" : " seconds") : '';
    return _0x57969d + _0x11c615 + _0x46bd26 + _0x413f67;
  },
  'AddMp3Meta': async (_0x1f6612, _0x2d36cf, _0x26dde0 = {
    'title': "X-Asena Whatsapp bot",
    'artist': ["Xasena"]
  }) => {
    if (!Buffer.isBuffer(_0x1f6612)) {
      _0x1f6612 = await getBuffer(_0x1f6612);
    }
    if (!Buffer.isBuffer(_0x2d36cf)) {
      _0x2d36cf = await getBuffer(_0x2d36cf);
    }
    const _0x3a21f8 = new id3(_0x1f6612);
    _0x3a21f8.setFrame("TIT2", _0x26dde0.title).setFrame("TPE1", ["𝐍𝐄𝐙𝐔𝐊𝐎 𝐌𝐃"]).setFrame("APIC", {
      'type': 0x3,
      'data': _0x2d36cf,
      'description': "Xasena Public Bot"
    });
    _0x3a21f8.addTag();
    return Buffer.from(_0x3a21f8.arrayBuffer);
  },
  'styletext': (_0x23548c, _0xff13ab) => {
    _0xff13ab = _0xff13ab - 0x1;
    return listall(_0x23548c)[_0xff13ab];
  },
  'isIgUrl': _0x3a551b => {
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim.test(_0x3a551b);
  },
  'Mp3Cutter': async (_0xa60d74, _0x1aaabe, _0x1434a4) => {
    return new Promise(async (_0x2eb89, _0x1cc584) => {
      const _0x41de92 = require("./Media/cutter");
      fs.writeFileSync("mp3cut", _0xa60d74);
      var _0x52bcad = parseInt(_0x1aaabe);
      if (_0x52bcad === 0x0) {
        _0x52bcad = 0x1;
      }
      _0x41de92.cut({
        'src': "mp3cut",
        'target': 'mp3cutf',
        'start': _0x52bcad,
        'end': _0x1434a4
      });
      let _0x16db15 = await readFile('mp3cutf');
      _0x2eb89(_0x16db15);
      await unlink('mp3cutf');
      return await unlink("mp3cut");
    });
  },
  'Bitly': async _0x52d01c => {
    return new Promise((_0x4bdf4b, _0x2a4f51) => {
      const _0x57a29a = require("bitly").BitlyClient;
      const _0x2c800f = new _0x57a29a("6e7f70590d87253af9359ed38ef81b1e26af70fd");
      _0x2c800f.shorten(_0x52d01c).then(_0x476d80 => {
        _0x4bdf4b(_0x476d80);
      })["catch"](_0x1e3287 => _0x2a4f51(_0x1e3287));
      return;
    });
  },
  'isNumber': function isNumber() {
    const _0x3da923 = parseInt(this);
    return typeof _0x3da923 === 'number' && !isNaN(_0x3da923);
  },
  'getRandom': function getRandom() {
    if (Array.isArray(this) || this instanceof String) {
      return this[Math.floor(Math.random() * this.length)];
    }
    return Math.floor(Math.random() * this);
  },
  'findMusic': async function findMusic(_0x284b36) {
    let _0x530167 = new acrcloud({
      'host': 'identify-eu-west-1.acrcloud.com',
      'access_key': "4dcedd3dc6d911b38c988b872afa7e0d",
      'access_secret': 'U0PEUg2y6yGVh6NwJra2fJkiE1R5sCfiT6COLXuk'
    });
    let _0x23929d = await _0x530167.identify(_0x284b36);
    let {
      code: _0x76583a,
      msg: _0x310ecc
    } = _0x23929d.status;
    if (_0x76583a !== 0x0) {
      return _0x310ecc;
    }
    let {
      title: _0xefd7ca,
      artists: _0x31007f,
      album: _0x939ec1,
      genres: _0x3d26fd,
      release_date: _0x5265ef,
      external_metadata: _0x2a5ea3
    } = _0x23929d.metadata.music[0x0];
    let {
      youtube: _0x284b93,
      spotify: _0x48df58
    } = _0x2a5ea3;
    return {
      'status': 0xc8,
      'title': _0xefd7ca,
      'artists': _0x31007f !== undefined ? _0x31007f.map(_0x44a227 => _0x44a227.name).join(", ") : '',
      'album': _0x939ec1.name || '',
      'genres': _0x3d26fd !== undefined ? _0x3d26fd.map(_0x3fad1e => _0x3fad1e.name).join(", ") : '',
      'release_date': _0x5265ef,
      'youtube': "https://www.youtube.com/watch?v=" + _0x284b93?.["vid"],
      'spotify': 'https://open.spotify.com/track/' + _0x48df58?.["track"]?.['id']
    };
  },
  'scraper': scraper,
  'ytv': ytv,
  'yta': yta,
  'ytIdRegex': ytIdRegex,
  'yt': yt,
  'imageToWebp': imageToWebp,
  'videoToWebp': videoToWebp,
  'writeExifImg': writeExifImg,
  'writeExifVid': writeExifVid,
  'writeExifWebp': writeExifWebp,
  'toAudio': toAudio,
  'toPTT': toPTT,
  'toVideo': toVideo,
  'ffmpeg': ffmpeg,
  'webp2mp4': webp2mp4,
  'webp2png': webp2png,
  'listall': listall,
  'strikeThrough': strikeThrough,
  'wingdings': wingdings,
  'vaporwave': vaporwave,
  'typewriter': typewriter,
  'analucia': analucia,
  'tildeStrikeThrough': tildeStrikeThrough,
  'underline': underline,
  'doubleUnderline': doubleUnderline,
  'slashThrough': slashThrough,
  'sparrow': sparrow,
  'heartsBetween': heartsBetween,
  'arrowBelow': arrowBelow,
  'crossAboveBelow': crossAboveBelow,
  'creepify': creepify,
  'bubbles': bubbles,
  'mirror': mirror,
  'squares': squares,
  'roundsquares': roundsquares,
  'flip': flip,
  'tiny': tiny,
  'createMap': createMap,
  'serif_I': serif_I,
  'manga': manga,
  'ladybug': ladybug,
  'runes': runes,
  'serif_B': serif_B,
  'serif_BI': serif_BI,
  'serif_I': serif_I,
  'FiletypeFromUrl': FiletypeFromUrl,
  'extractUrlFromMessage': extractUrlFromMessage
};
