const fs = require('fs');
const {
  tmpdir
} = require('os');
const Crypto = require("crypto");
const ff = require("fluent-ffmpeg");
const webp = require("node-webpmux");
const path = require("path");
async function imageToWebp(_0x50ed79) {
  const _0xab3f82 = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + ".webp");
  const _0x1bc52e = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + ".jpg");
  fs.writeFileSync(_0x1bc52e, _0x50ed79);
  await new Promise((_0x6cf5b6, _0x2c35f5) => {
    ff(_0x1bc52e).on("error", _0x2c35f5).on('end', () => _0x6cf5b6(true)).addOutputOptions(['-vcodec', "libwebp", '-vf', "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(_0xab3f82);
  });
  const _0xadff45 = fs.readFileSync(_0xab3f82);
  fs.unlinkSync(_0xab3f82);
  fs.unlinkSync(_0x1bc52e);
  return _0xadff45;
}
async function videoToWebp(_0x2bce5c) {
  const _0x26138d = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + ".webp");
  const _0x215296 = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + '.mp4');
  fs.writeFileSync(_0x215296, _0x2bce5c);
  await new Promise((_0x3d5110, _0x585bed) => {
    ff(_0x215296).on('error', _0x585bed).on("end", () => _0x3d5110(true)).addOutputOptions(["-vcodec", "libwebp", '-vf', "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse", "-loop", '0', "-ss", "00:00:00", '-t', "00:00:05", '-preset', "default", '-an', "-vsync", '0']).toFormat("webp").save(_0x26138d);
  });
  const _0x9f0904 = fs.readFileSync(_0x26138d);
  fs.unlinkSync(_0x26138d);
  fs.unlinkSync(_0x215296);
  return _0x9f0904;
}
async function writeExifImg(_0x1a242e, _0x3d03a5) {
  let _0x2a15cb = await imageToWebp(_0x1a242e);
  const _0x1e2988 = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + ".webp");
  const _0x1d858c = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + '.webp');
  fs.writeFileSync(_0x1e2988, _0x2a15cb);
  if (_0x3d03a5.packname || _0x3d03a5.author) {
    const _0x10b36a = new webp.Image();
    const _0x44bf5e = {
      'sticker-pack-id': 'https://github.com/godzenitsu/QUEEN-NEZUKO-BOT',
      'sticker-pack-name': _0x3d03a5.packname,
      'sticker-pack-publisher': _0x3d03a5.author,
      'emojis': _0x3d03a5.categories ? _0x3d03a5.categories : ['']
    };
    const _0x40b5a1 = Buffer.from([0x49, 0x49, 0x2a, 0x0, 0x8, 0x0, 0x0, 0x0, 0x1, 0x0, 0x41, 0x57, 0x7, 0x0, 0x0, 0x0, 0x0, 0x0, 0x16, 0x0, 0x0, 0x0]);
    const _0x5ee9d0 = Buffer.from(JSON.stringify(_0x44bf5e), "utf-8");
    const _0x535146 = Buffer.concat([_0x40b5a1, _0x5ee9d0]);
    _0x535146.writeUIntLE(_0x5ee9d0.length, 0xe, 0x4);
    await _0x10b36a.load(_0x1e2988);
    fs.unlinkSync(_0x1e2988);
    _0x10b36a.exif = _0x535146;
    await _0x10b36a.save(_0x1d858c);
    return _0x1d858c;
  }
}
async function writeExifVid(_0x266e03, _0x4088e7) {
  let _0x15600b = await videoToWebp(_0x266e03);
  const _0x3e349c = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + ".webp");
  const _0x527f02 = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + '.webp');
  fs.writeFileSync(_0x3e349c, _0x15600b);
  if (_0x4088e7.packname || _0x4088e7.author) {
    const _0x4cd6f1 = new webp.Image();
    const _0x30a062 = {
      'sticker-pack-id': 'https://github.com/godzenitsu/QUEEN-NEZUKO-BOT',
      'sticker-pack-name': _0x4088e7.packname,
      'sticker-pack-publisher': _0x4088e7.author,
      'emojis': _0x4088e7.categories ? _0x4088e7.categories : ['']
    };
    const _0x61f0f0 = Buffer.from([0x49, 0x49, 0x2a, 0x0, 0x8, 0x0, 0x0, 0x0, 0x1, 0x0, 0x41, 0x57, 0x7, 0x0, 0x0, 0x0, 0x0, 0x0, 0x16, 0x0, 0x0, 0x0]);
    const _0x1b15df = Buffer.from(JSON.stringify(_0x30a062), 'utf-8');
    const _0x31b617 = Buffer.concat([_0x61f0f0, _0x1b15df]);
    _0x31b617.writeUIntLE(_0x1b15df.length, 0xe, 0x4);
    await _0x4cd6f1.load(_0x3e349c);
    fs.unlinkSync(_0x3e349c);
    _0x4cd6f1.exif = _0x31b617;
    await _0x4cd6f1.save(_0x527f02);
    return _0x527f02;
  }
}
async function writeExifWebp(_0x1747c3, _0x5ead13) {
  const _0x2cc9a1 = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + ".webp");
  const _0x5676fe = path.join(tmpdir(), Crypto.randomBytes(0x6).readUIntLE(0x0, 0x6).toString(0x24) + ".webp");
  fs.writeFileSync(_0x2cc9a1, _0x1747c3);
  if (_0x5ead13.packname || _0x5ead13.author) {
    const _0x2ccd93 = new webp.Image();
    const _0x1f720c = {
      'sticker-pack-id': "https://github.com/godzenitsu/QUEEN-NEZUKO-BOT",
      'sticker-pack-name': _0x5ead13.packname,
      'sticker-pack-publisher': _0x5ead13.author,
      'emojis': _0x5ead13.categories ? _0x5ead13.categories : ['']
    };
    const _0x2f0bbd = await Buffer.from([0x49, 0x49, 0x2a, 0x0, 0x8, 0x0, 0x0, 0x0, 0x1, 0x0, 0x41, 0x57, 0x7, 0x0, 0x0, 0x0, 0x0, 0x0, 0x16, 0x0, 0x0, 0x0]);
    const _0x374b59 = await Buffer.from(JSON.stringify(_0x1f720c), "utf-8");
    const _0x4d79fa = await Buffer.concat([_0x2f0bbd, _0x374b59]);
    await _0x4d79fa.writeUIntLE(_0x374b59.length, 0xe, 0x4);
    await _0x2ccd93.load(_0x2cc9a1);
    fs.unlinkSync(_0x2cc9a1);
    _0x2ccd93.exif = _0x4d79fa;
    await _0x2ccd93.save(_0x5676fe);
    return _0x5676fe;
  }
}
module.exports = {
  'imageToWebp': imageToWebp,
  'videoToWebp': videoToWebp,
  'writeExifImg': writeExifImg,
  'writeExifVid': writeExifVid,
  'writeExifWebp': writeExifWebp
};
