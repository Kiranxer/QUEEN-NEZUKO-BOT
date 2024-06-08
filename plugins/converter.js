const config = require('../config');
const {
  command,
  isPrivate,
  getJson,
  sleep,
  tiny,
  AddMp3Meta,
  getBuffer,
  toAudio,
  styletext,
  listall
} = require('../lib/');
const {
  Image
} = require('node-webpmux');
command({
  'pattern': "fancy",
  'fromMe': isPrivate,
  'desc': "converts text to fancy text",
  'type': "converter"
}, async (_0x6797bf, _0x2e51b3) => {
  if (!_0x6797bf.reply_message || !_0x6797bf.reply_message.text || !_0x2e51b3 || isNaN(_0x2e51b3)) {
    let _0x27e59f = tiny("\n𝐅𝐀𝐍𝐂𝐘 𝐓𝐄𝐗𝐓 𝐌𝐄𝐍𝐔\n\nReply to a message\nExample: .fancy 38\n\n");
    listall("Zeta").forEach((_0x24dae4, _0x54572d) => {
      _0x27e59f += (_0x54572d += 0x1) + " " + _0x24dae4 + "\n";
    });
    _0x27e59f += "\n\n𝐍𝐄𝐙𝐔𝐊𝐎 𝐌𝐃";
    return await _0x6797bf.client.sendMessage(_0x6797bf.jid, {
       {
      'quoted': _0x6797bf
    });
  } else {
    _0x6797bf.reply(styletext(_0x6797bf.reply_message.text, parseInt(_0x2e51b3)));
  }
});
command({
  'pattern': 'sticker',
  'fromMe': isPrivate,
  'desc': "Converts Photo or video to sticker",
  'type': 'converter'
}, async (_0x1dfdee, _0x335e77, _0xaa5568) => {
  if (!(_0x1dfdee.reply_message.video || _0x1dfdee.reply_message.image)) {
    return await _0x1dfdee.reply("*_Reply to photo or video!_*");
  }
  let _0xdc19d5 = await _0xaa5568.quoted.download();
  _0x1dfdee.sendMessage(_0xdc19d5, {
    'packname': config.STICKER_DATA.split(';')[0x0],
    'author': config.STICKER_DATA.split(';')[0x1]
  }, 'sticker');
});
command({
  'pattern': "tgs",
  'fromMe': isPrivate,
  'desc': "Download Sticker From Telegram",
  'type': 'download'
}, async (_0x305747, _0x13dc49) => {
  if (!_0x13dc49) {
    return _0x305747.reply("*_Enter a tg sticker url_*\n*_Eg: https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently_*");
  }
  let _0xe55014 = _0x13dc49.split("/addstickers/")[0x1];
  let {
    result: _0x14dfc0
  } = await getJson('https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=' + encodeURIComponent(_0xe55014));
  if (_0x14dfc0.is_animated) {
    return _0x305747.reply("*_Animated stickers are not supported_*");
  }
  _0x305747.reply(("*_Total stickers :_* " + _0x14dfc0.stickers.length + "\n*_Estimated complete in:_* " + _0x14dfc0.stickers.length * 1.5 + " seconds").trim());
  for (let _0x42feff of _0x14dfc0.stickers) {
    let _0x56cf19 = await getJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x42feff.file_id);
    await _0x305747.sendMessage('https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/' + _0x56cf19.result.file_path, {
      'packname': config.STICKER_DATA.split(';')[0x0],
      'author': config.STICKER_DATA.split(';')[0x1]
    }, "sticker");
    sleep(0x5dc);
  }
});
command({
  'pattern': "take",
  'fromMe': isPrivate,
  'desc': "change audio title,album/sticker author,packname",
  'type': "converter"
}, async (_0x5629a3, _0x32b5ee, _0x5df73f) => {
  if (!_0x5629a3.reply_message || !_0x5629a3.reply_message.video && !_0x5629a3.reply_message.audio && !_0x5629a3.reply_message.sticker) {
    return await _0x5629a3.reply("*_Reply at sticker/audio/voice/video!_*");
  }
  if (_0x5629a3.reply_message.audio || _0x5629a3.reply_message.video) {
    let _0x240619 = await toAudio(await _0x5df73f.quoted.download());
    let _0x1bfe91 = _0x32b5ee && _0x32b5ee.split(/[,;]/)[0x2] ? _0x32b5ee.split(/[,;]/)[0x2] : config.AUDIO_DATA.split(/[;]/)[0x2];
    let _0x1e4bb2 = await getBuffer(_0x1bfe91.trim());
    let _0x4eb11a = _0x32b5ee ? _0x32b5ee.split(/[|,;]/) ? _0x32b5ee.split(/[|,;]/)[0x0] : _0x32b5ee : config.AUDIO_DATA.split(/[|,;]/)[0x0] ? config.AUDIO_DATA.split(/[|,;]/)[0x0] : config.AUDIO_DATA;
    const _0x2ea562 = await AddMp3Meta(_0x240619, _0x1e4bb2, {
      'title': _0x4eb11a,
      'artist': 'hi'
    });
    return await _0x5629a3.client.sendMessage(_0x5629a3.jid, {
      'audio': _0x2ea562,
      'mimetype': "audio/mpeg"
    }, {
      'quoted': _0x5629a3
    });
  } else {
    if (_0x5629a3.reply_message.sticker) {
      let _0x3399f6 = await _0x5df73f.quoted.download();
      let [_0x522f5a, _0xd960d0] = _0x32b5ee.split(';');
      await _0x5629a3.sendMessage(_0x3399f6, {
        'packname': _0x522f5a || config.STICKER_DATA.split(';')[0x0],
        'author': _0xd960d0 || config.STICKER_DATA.split(';')[0x1]
      }, "sticker");
    }
  }
});
command({
  'pattern': "exif",
  'fromMe': true,
  'desc': 'description',
  'type': "converter"
}, async (_0x124e1b, _0x121a9d, _0x179341) => {
  if (!_0x124e1b.reply_message || !_0x124e1b.reply_message.sticker) {
    return await _0x124e1b.reply("*_Reply to sticker_*");
  }
  let _0x3569c2 = new Image();
  await _0x3569c2.load(await _0x179341.quoted.download());
  const _0x4087ca = JSON.parse(_0x3569c2.exif.slice(0x16).toString());
  await _0x124e1b.reply(_0x4087ca);
});
