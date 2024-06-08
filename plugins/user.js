const {
  typewriter
} = require("../lib/fancy_font/fancy");
const plugins = require('../lib/event');
const {
  BOT_INFO
} = require("../config");
const config = require('../config');
const {
  tiny
} = require("../lib/fancy_font/fancy");
const Jimp = require("jimp");
const got = require("got");
const fs = require('fs');
const {
  PluginDB,
  installPlugin
} = require('../lib/database/plugins');
const {
  downloadMediaMessage
} = require("@whiskeysockets/baileys");
command({
  'pattern': "runtime",
  'fromMe': true,
  'desc': "Bot Runtime",
  'type': "user"
}, async (_0x3f4b4f, _0x4ba25e) => {
  let _0x591301 = runtime(process.uptime());
  await _0x3f4b4f.reply("*_Runtime: " + _0x591301 + '_*');
});
command({
  'pattern': "ping",
  'fromMe': isPrivate,
  'desc': "To check ping",
  'type': "user"
}, async (_0x43538f, _0x17f7e0, _0x29b81b) => {
  const _0x4eb4a0 = new Date().getTime();
  let {
    key: _0x2d5809
  } = await _0x43538f.sendMessage("*❮ ᴛᴇꜱᴛɪɴɢ ᴩɪɴɢ ❯*");
  const _0x209632 = new Date().getTime();
  var _0x58fd81 = _0x209632 - _0x4eb4a0;
  await new Promise(_0x7d8d63 => setTimeout(_0x7d8d63, 0x0));
  await _0x43538f.client.sendMessage(_0x43538f.jid, {
    'text': "*ʟᴀᴛᴇɴᴄʏ:* \n" + _0x58fd81 + " *ᴍꜱ*",
    'edit': _0x2d5809
  });
});
command({
  'pattern': "pp$",
  'fromMe': true,
  'desc': "Set full screen profile picture",
  'type': 'user'
}, async (_0x2e5607, _0x12f483, _0x27786d) => {
  if (!_0x2e5607.reply_message.image) {
    return await _0x2e5607.reply("*_Reply to a photo_*");
  }
  let _0x591883 = await _0x27786d.quoted.download();
  await updateProfilePicture(_0x2e5607.user, _0x591883, _0x2e5607);
  return await _0x2e5607.reply("*_Profile Picture Updated_*");
});
async function updateProfilePicture(_0x33e12e, _0x535f03, _0x191301) {
  const {
    query: _0x14ffb1
  } = _0x191301.client;
  const {
    img: _0x338e74
  } = await generateProfilePicture(_0x535f03);
  await _0x14ffb1({
    'tag': 'iq',
    'attrs': {
      'to': _0x33e12e,
      'type': 'set',
      'xmlns': "w:profile:picture"
    },
    'content': [{
      'tag': 'picture',
      'attrs': {
        'type': "image"
      },
      'content': _0x338e74
    }]
  });
}
async function generateProfilePicture(_0x174db0) {
  const _0x473a = await Jimp.read(_0x174db0);
  const _0x13ef26 = _0x473a.getWidth();
  const _0xdd104b = _0x473a.getHeight();
  const _0x25da8d = _0x473a.crop(0x0, 0x0, _0x13ef26, _0xdd104b);
  return {
    'img': await _0x25da8d.scaleToFit(0x144, 0x2d0).getBufferAsync(Jimp.MIME_JPEG),
    'preview': await _0x25da8d.normalize().getBufferAsync(Jimp.MIME_JPEG)
  };
}
command({
  'pattern': 'block',
  'fromMe': true,
  'desc': "Block a person",
  'type': 'user'
}, async (_0xfa718a, _0x24c9d9) => {
  if (_0xfa718a.isGroup) {
    let _0x35fca9 = _0xfa718a.mention[0x0] || _0xfa718a.reply_message.jid;
    if (!_0x35fca9) {
      return await _0xfa718a.reply("*_Need a number/reply/mention!_*");
    }
    await _0xfa718a.block(_0x35fca9);
    return await _0xfa718a.sendMessageMessage('_@' + _0x35fca9.split('@')[0x0] + " Blocked_", {
      'mentions': [_0x35fca9]
    });
  } else {
    await _0xfa718a.block(_0xfa718a.jid);
    return await _0xfa718a.reply("_User blocked_");
  }
});
command({
  'pattern': "unblock",
  'fromMe': true,
  'desc': "Unblock a person",
  'type': "user"
}, async (_0x390248, _0x5b6ee2) => {
  if (_0x390248.isGroup) {
    let _0x60eb2c = _0x390248.mention[0x0] || _0x390248.reply_message.jid;
    if (!_0x60eb2c) {
      return await _0x390248.reply("*_Need a number/reply/mention!_*");
    }
    await _0x390248.block(_0x60eb2c);
    return await _0x390248.sendMessage("*_@" + _0x60eb2c.split('@')[0x0] + " unblocked_*", {
      'mentions': [_0x60eb2c]
    });
  } else {
    await _0x390248.unblock(_0x390248.jid);
    return await _0x390248.reply("*_User unblocked_*");
  }
});
command({
  'pattern': "jid",
  'fromMe': true,
  'desc': "Give jid of chat/user",
  'type': "user"
}, async (_0x4cc23f, _0x9116e1) => {
  return await _0x4cc23f.sendMessage(_0x4cc23f.mention[0x0] || _0x4cc23f.reply_message.jid || _0x4cc23f.jid);
});
command({
  'pattern': 'dlt',
  'fromMe': true,
  'desc': "deletes a message",
  'type': 'user'
}, async (_0x200595, _0x39ce79, _0x3b443c, _0x2e2345) => {
  if (!_0x200595.reply_message) {
    return await _0x200595.reply("*_Reply to a message_*");
  }
  {
    await _0x2e2345.sendMessage(_0x200595.jid, {
      'delete': _0x200595.reply_message.key
    });
  }
});
command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match, m, client) => {
try{
    if (match) {
      for (let i of plugins.commands) {
        if (
          i.pattern instanceof RegExp &&
          i.pattern.test(message.prefix + match)
        ) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
        }
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
        let usern = message.pushName
        const readMore = String.fromCharCode(8206).repeat(4001);
      let menu = `\n╭━━━〔 ${BOT_INFO.split(";")[0]} 〕━━┈⊷
  ╭────────────────⊷   
  ┃✯│ Owner: ${BOT_INFO.split(";")[1]}
  ┃✯│ User: ${usern}
  ┃✯│ Date: ${date}
  ┃✯│ Time: ${time}
  ┃✯│ Plugins: ${plugins.commands.length}
  ┃✯│ Mode: ${config.WORK_TYPE}
  ┃✯│ Prefix: ${config.HANDLERS}
  ┃✯│ Version: ${require("../package.json").version}
  ╰─────────────────⊷  
‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ `;
      let cmnd = [];
      let cmd;
      let category = [];
      plugins.commands.map((command, num) => {
        if (command.pattern instanceof RegExp) {
          cmd = command.pattern.toString().split(/\W+/)[1];
        }

        if (!command.dontAddCommandList  && cmd !== undefined) {
          let type = command.type ? command.type.toLowerCase() : "misc";

          cmnd.push({ cmd, type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `\n   ╭─────────────┈⊷`;
        menu += `\n   │  *${cmmd.toUpperCase()}* ⏎`;
        menu += `\n   ╰─────────────┈⊷`
        menu += `\n  ╭─────────────┈⊷`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n  ││◦➛   ${cmd.trim()}`;
        });
        menu += `\n  ╰─────────────┈⊷`;
      });
menu += `\n╰─────────────┈⊷`;
      let penu = tiny(menu)
      let vd = BOT_INFO.split(";")[2];
      return await message.sendFromUrl(vd, {fileLength: "500000000", gifPlayback: true, contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: false,
      forwardedNewsletterMessageInfo: {
      newsletterJid: '120363239634100086@newsletter',
      newsletterName: "",
      serverMessageId: -1
            }}, caption: (penu)}, {quoted: message })
    }
}catch(e){
message.reply(e)
}
  }
);
command({
  'pattern': "list",
  'fromMe': isPrivate,
  'desc': "Show All Commands",
  'type': "user",
  'dontAddCommandList': true
}, async (_0x5aaecf, _0x4922d0, {
  prefix: _0x43d4bf
}) => {
  let _0x3f14 = "╭───────┈┫「 *𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐋𝐢𝐬𝐭 ⎙* 」┣┈────♡";
  _0x3f14 += "\n│\n";
  let _0x4bf217 = [];
  let _0x110bea;
  let _0xa71b66;
  plugins.commands.map(_0x586b3d => {
    if (_0x586b3d.pattern) {
      _0x110bea = _0x586b3d.pattern.toString().split(/\W+/)[0x1];
    }
    _0xa71b66 = _0x586b3d.desc || false;
    if (!_0x586b3d.dontAddCommandList && _0x110bea !== undefined) {
      _0x4bf217.push({
        'cmd': _0x110bea,
        'desc': _0xa71b66
      });
    }
  });
  _0x4bf217.sort();
  _0x4bf217.forEach(({
    cmd: _0xf219c2,
    desc: _0x3232ac
  }, _0x250e51) => {
    _0x3f14 += "│  " + (_0x250e51 += 0x1) + ". *" + _0xf219c2.trim() + '*';
    if (_0x3232ac) {
      _0x3f14 += "\n│  Use: ```" + _0x3232ac + '```';
    }
    _0x3f14 += "\n│\n";
  });
  _0x3f14 += "╰═══════════┫「 𝐍𝐄𝐙𝐔𝐊𝐎 𝐌𝐃-𝐁𝐎𝐓 」┣════════┈⊷ ";
  return await _0x5aaecf.reply(_0x5aaecf.jid, {
    'text': tiny(_0x3f14)
  });
});
command({
  'pattern': "plugin ?(.*)",
  'fromMe': true,
  'desc': "Install External plugins",
  'type': "user"
}, async (_0x7bbb3d, _0x508885) => {
  if (!_0x508885) {
    return await _0x7bbb3d.sendMessage("*_Send a plugin url_*");
  }
  for (let _0x273f1b of getUrl(_0x508885)) {
    try {
      var _0x3f4bd2 = new URL(_0x273f1b);
    } catch {
      return await _0x7bbb3d.sendMessage("*_Invalid Url_*");
    }
    if (_0x3f4bd2.host === "gist.github.com") {
      _0x3f4bd2.host = "gist.githubusercontent.com";
      _0x3f4bd2 = _0x3f4bd2.toString() + "/raw";
    } else {
      _0x3f4bd2 = _0x3f4bd2.toString();
    }
    var _0x4f52cc;
    var _0x38f76a = await got(_0x3f4bd2);
    if (_0x38f76a.statusCode == 0xc8) {
      var _0x40075d = _0x38f76a.body.match(/(?<=pattern:)(.*)(?=\?(.*))/g).map(_0x468752 => _0x468752.trim().replace(/"|'|`/, ''));
      _0x4f52cc = _0x40075d[0x0] || _0x4f52cc[0x1] || '__' + Math.random().toString(0x24).substring(0x8);
      fs.writeFileSync('./plugins/' + _0x4f52cc + ".js", _0x38f76a.body);
      try {
        require('./' + _0x4f52cc);
      } catch (_0x2b9e47) {
        fs.unlinkSync("/xasena/plugins/" + _0x4f52cc + ".js");
        return await _0x7bbb3d.sendMessage("*_Invalid Plugin_*\n ```" + _0x2b9e47 + "```");
      }
      await installPlugin(_0x3f4bd2, _0x4f52cc);
      await _0x7bbb3d.sendMessage("*_New plugin installed : " + _0x40075d.join(',') + '_*');
    }
  }
});
command({
  'pattern': "pluginlist",
  'fromMe': true,
  'desc': "plugin list",
  'type': owner"
}, async (_0x37ad67, _0x7f201) => {
  var _0x58902e = '';
  var _0x2c0b8c = await PluginDB.findAll();
  return _0x2c0b8c.length < 0x1 ? await _0x37ad67.sendMessage("*_No external plugins installed_*") : (_0x2c0b8c.map(_0x538b17 => {
    _0x58902e += "```" + _0x538b17.dataValues.name + "```: " + _0x538b17.dataValues.url + "\n";
  }), await _0x37ad67.sendMessage(_0x58902e));
});
command({
  'pattern': "remove(?: |$)(.*)",
  'fromMe': true,
  'desc': "Remove external plugins",
  'type': "owner"
}, async (_0x29b46e, _0x46b9ba) => {
  if (!_0x46b9ba) {
    return await _0x29b46e.sendMessage("*_Need a plugin name_*");
  }
  var _0x338a7b = await PluginDB.findAll({
    'where': {
      'name': _0x46b9ba
    }
  });
  if (_0x338a7b.length < 0x1) {
    return await _0x29b46e.sendMessage("*_Plugin not found_*");
  } else {
    await _0x338a7b[0x0].destroy();
    delete require.cache[require.resolve('./' + _0x46b9ba + '.js')];
    fs.unlinkSync("./plugins/" + _0x46b9ba + '.js');
    await _0x29b46e.sendMessage("*_Plugin " + _0x46b9ba + " deleted, restart_*");
  }
});
command({
  'pattern': "setbio(.*)",
  'fromMe': true,
  'desc': "to change your profile status",
  'type': "owner"
}, async (_0x58cf5f, _0x29341c) => {
  _0x29341c = _0x29341c || _0x58cf5f.reply_message.text;
  if (!_0x29341c) {
    return await _0x58cf5f.reply("*_Need Text_!*\n *Example: setbio _Ezra-XD_*.");
  }
  await _0x58cf5f.client.updateProfileStatus(_0x29341c);
  await _0x58cf5f.reply("*_Successfully bio updated_*");
});
command({
  'pattern': 'vv',
  'fromMe': isPrivate,
  'desc': "anti viewOnce",
  'type': 'user'
}, async (_0x4e9505, _0x3d2829, _0x228321) => {
  if (!_0x4e9505.reply_message || !_0x228321.quoted.message.viewOnceMessageV2 && !_0x228321.quoted.message.viewOnceMessageV2Extension) {
    return await _0x4e9505.reply("*_Reply at viewOnce message!_*");
  }
  if (_0x228321.quoted.message.viewOnceMessageV2Extension) {
    const _0x764dbf = await downloadMediaMessage(_0x228321.quoted.message.viewOnceMessageV2Extension, "buffer", {}, {
      'reuploadRequest': _0x4e9505.client.updateMediaMessage
    });
    await _0x4e9505.client.sendMessage(_0x4e9505.jid, {
      'audio': _0x764dbf,
      'mimetype': "audio/mpeg",
      'ptt': true
    }, {
      'quoted': _0x4e9505
    });
  } else {
    if (_0x228321.quoted.message.viewOnceMessageV2) {
      const _0x9e332d = await downloadMediaMessage(_0x228321.quoted.message.viewOnceMessageV2, 'buffer', {}, {
        'reuploadRequest': _0x4e9505.client.updateMediaMessage
      });
      await _0x4e9505.sendFile(_0x9e332d);
    }
  }
});
