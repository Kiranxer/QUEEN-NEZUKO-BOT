const {
  setMessage,
  getMessage,
  delMessage,
  getStatus,
  toggleStatus
} = require("../lib/database").Greetings;
const Jimp = require("jimp");
command({
  'pattern': "add ?(.*)",
  'fromMe': true,
  'desc': "Adds a person to the group",
  'type': "group"
}, async (_0x134b6e, _0x352a2f) => {
  if (!_0x134b6e.isGroup) {
    return await _0x134b6e.reply("*_This command only works in group chats_*");
  }
  let _0x2a0cbd = _0x352a2f || _0x134b6e.reply_message.jid;
  if (!_0x2a0cbd) {
    return await _0x134b6e.reply("*_Need a number/reply/mention!_*");
  }
  let _0x144a3 = _0x2a0cbd.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let _0x23c3ef = await isAdmin(_0x134b6e.jid, _0x134b6e.user, _0x134b6e.client);
  if (!_0x23c3ef) {
    return await _0x134b6e.reply("*_I'm not admin_*");
  }
  await _0x134b6e.client.groupParticipantsUpdate(_0x134b6e.jid, [_0x144a3], "add");
  return await _0x134b6e.client.sendMessage(_0x134b6e.jid, {
    'text': "*_@" + _0x144a3.split('@')[0x0] + ", A Demon Arrived!_*",
    'mentions': [_0x144a3]
  });
});
command({
  'pattern': "kick ?(.*)",
  'fromMe': true,
  'desc': "kick a person from the group",
  'type': "group"
}, async (_0x3820bb, _0xbc5ec7) => {
  if (!_0x3820bb.isGroup) {
    return await _0x3820bb.reply("*_This command only works in group chats_*");
  }
  let _0x39a221 = _0xbc5ec7 || _0x3820bb.reply_message.jid;
  if (!_0x39a221) {
    return await _0x3820bb.reply("*_Need a number/reply/mention!_*");
  }
  let _0xcc174f = _0x39a221.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  let _0x38cbac = await isAdmin(_0x3820bb.jid, _0x3820bb.user, _0x3820bb.client);
  if (!_0x38cbac) {
    return await _0x3820bb.reply("*_I'm not admin_*");
  }
  await _0x3820bb.client.groupParticipantsUpdate(_0x3820bb.jid, [_0xcc174f], "remove");
  return await _0x3820bb.client.sendMessage(_0x3820bb.jid, {
    'text': "*_@" + _0xcc174f.split('@')[0x0] + ", A Demon Killed!_*",
    'mentions': [_0xcc174f]
  });
});
command({
  'pattern': "promote ?(.*)",
  'fromMe': true,
  'desc': "promote a member",
  'type': "group"
}, async (_0xe407f6, _0x2746ea) => {
  if (!_0xe407f6.isGroup) {
    return await _0xe407f6.reply("*_This command only works in group chats_*");
  }
  let _0x36bdd9 = _0xe407f6.mention[0x0] || _0xe407f6.reply_message.jid;
  if (!_0x36bdd9) {
    return await _0xe407f6.reply("*_Need a number/reply/mention!_*");
  }
  var _0x1b61e3 = await isAdmin(_0xe407f6.jid, _0xe407f6.user, _0xe407f6.client);
  if (!_0x1b61e3) {
    return await _0xe407f6.reply("*_I'm not admin_*");
  }
  await _0xe407f6.client.groupParticipantsUpdate(_0xe407f6.jid, [_0x36bdd9], "promote");
  return await _0xe407f6.client.sendMessage(_0xe407f6.jid, {
    'text': "*_@" + _0x36bdd9.split('@')[0x0] + ", Is Promoted as Admin !_*",
    'mentions': [_0x36bdd9]
  });
});
command({
  'pattern': "demote ?(.*)",
  'fromMe': true,
  'desc': "demote a member",
  'type': "group"
}, async (_0x573675, _0x3291e4) => {
  if (!_0x573675.isGroup) {
    return await _0x573675.reply("*_This command only works in group chats_*");
  }
  let _0x47b5e3 = _0x573675.mention[0x0] || _0x573675.reply_message.jid;
  if (!_0x47b5e3) {
    return await _0x573675.reply("*_Need a number/reply/mention!_*");
  }
  var _0x71f19d = await isAdmin(_0x573675.jid, _0x573675.user, _0x573675.client);
  if (!_0x71f19d) {
    return await _0x573675.reply("*_I'm not admin_*");
  }
  await _0x573675.client.groupParticipantsUpdate(_0x573675.jid, [_0x47b5e3], "demote");
  return await _0x573675.client.sendMessage(_0x573675.jid, {
    'text': "*_@" + _0x47b5e3.split('@')[0x0] + ", Now You Are Useless!_*",
    'mentions': [_0x47b5e3]
  });
});
command({
  'pattern': "mute",
  'fromMe': true,
  'desc': "nute group",
  'type': "group"
}, async (_0x4e4dbf, _0x54f37e, _0x1fed36, _0xb7f9af) => {
  if (!_0x4e4dbf.isGroup) {
    return await _0x4e4dbf.reply("*_This command work only in group chats_*");
  }
  if (!isAdmin(_0x4e4dbf.jid, _0x4e4dbf.user, _0x4e4dbf.client)) {
    return await _0x4e4dbf.reply("*_I'm not admin_*");
  }
  await _0x4e4dbf.reply("*_Shh...Muted!_*");
  return await _0xb7f9af.groupSettingUpdate(_0x4e4dbf.jid, "announcement");
});
command({
  'pattern': "unmute",
  'fromMe': true,
  'desc': "unmute group",
  'type': "group"
}, async (_0x3375fa, _0x14e803, _0x3b9a26, _0x5396cb) => {
  if (!_0x3375fa.isGroup) {
    return await _0x3375fa.reply("*_This command work only in groups_*");
  }
  if (!isAdmin(_0x3375fa.jid, _0x3375fa.user, _0x3375fa.client)) {
    return await _0x3375fa.reply("*_I'm not admin_*");
  }
  await _0x3375fa.reply("*_Unmuted!_*");
  return await _0x5396cb.groupSettingUpdate(_0x3375fa.jid, 'not_announcement');
});
command({
  'pattern': "gjid",
  'fromMe': true,
  'desc': "gets jid of all group members",
  'type': "group"
}, async (_0x393838, _0x33f2fe, _0x17fe5e, _0x1ce91c) => {
  if (!_0x393838.isGroup) {
    return await _0x393838.reply("_This command work only in  group chats_");
  }
  let {
    participants: _0x1f0a1a
  } = await _0x1ce91c.groupMetadata(_0x393838.jid);
  let _0x6c64bb = _0x1f0a1a.map(_0x2519b7 => _0x2519b7.id);
  let _0x2e3f10 = "╭──〔 *Group Jids* 〕\n";
  _0x6c64bb.forEach(_0x20e054 => {
    _0x2e3f10 += "├ *" + _0x20e054 + "*\n";
  });
  _0x2e3f10 += "╰──────────────⊷";
  _0x393838.reply(_0x2e3f10);
});
command({
  'pattern': "tag",
  'fromMe': true,
  'desc': "mention all users in group",
  'type': "group"
}, async (_0x56b116, _0x2a0ec2, _0x58951b, _0x4ff21f) => {
  if (process.cwd() !== "/root/zeta") {
    return _0x56b116.reply("use og version myra https://github.com/Kingbadan321/Zeta-XD");
  }
  _0x2a0ec2 = _0x2a0ec2 || _0x56b116.reply_message;
  if (!_0x2a0ec2) {
    return await _0x56b116.reply("*_need a text or reply to something_*");
  }
  const _0x7e2d37 = await _0x56b116.client.groupMetadata(_0x58951b.from)["catch"](_0x4c9aee => {});
  const _0xf9639c = await _0x7e2d37.participants;
  let _0x4ad264 = await _0xf9639c.filter(_0x4bc876 => _0x4bc876.admin !== null).map(_0x5e2f28 => _0x5e2f28.id);
  if (_0x2a0ec2 == "all") {
    let _0x26000d = '';
    let _0x96ac4 = 0x0;
    for (let _0x3b439f of _0xf9639c) {
      _0x96ac4++;
      _0x26000d += _0x96ac4 + " @" + _0x3b439f.id.split('@')[0x0] + "\n";
    }
    return await _0x56b116.reply("```" + _0x26000d + "```", {
      'mentions': _0xf9639c.map(_0xf1ee5e => _0xf1ee5e.id)
    });
  } else {
    if (_0x2a0ec2 == "admin" || _0x2a0ec2 == "admins") {
      let _0x49860a = '';
      let _0x28d01e = 0x0;
      for (let _0x2b2f69 of _0x4ad264) {
        _0x28d01e++;
        _0x49860a += _0x28d01e + " @" + _0x2b2f69.split('@')[0x0] + "\n";
      }
      return await _0x56b116.reply("```" + _0x49860a + "```", {
        'mentions': _0xf9639c.map(_0x471d38 => _0x471d38.id)
      });
    } else {
      if (_0x2a0ec2 == 'me' || _0x2a0ec2 == "mee") {
        return await _0x56b116.sendMessage('@' + _0x4ff21f.user.id.split(':')[0x0], {
          'mentions': [_0x4ff21f.user.id.split(':')[0x0] + "@s.whatsapp.net"]
        });
      } else {
        if (_0x56b116.reply_message) {
          await _0x4ff21f.sendMessage(_0x58951b.from, {
            'forward': _0x56b116.reply_message,
            'mentions': _0xf9639c.map(_0x4a1163 => _0x4a1163.id)
          });
        } else if (_0x2a0ec2) {
          await _0x56b116.sendMessage(_0x2a0ec2, {
            'mentions': _0xf9639c.map(_0x2cc296 => _0x2cc296.id)
          });
        }
      }
    }
  }
});
command({
  'on': "text",
  'fromMe': false
}, async (_0x3ce439, _0x477e33) => {
  if (!_0x3ce439.isGroup) {
    return;
  }
  if (config.ANTILINK) {
    if (isUrl(_0x477e33)) {
      await _0x3ce439.reply("*_Link detected_*");
      let _0x375273 = await isAdmin(_0x3ce439.jid, _0x3ce439.user, _0x3ce439.client);
      let _0x1e0b1f = await isAdmin(_0x3ce439.jid, _0x3ce439.participant, _0x3ce439.client);
      if (_0x375273) {
        if (!_0x1e0b1f) {
          await _0x3ce439.reply("_Commencing Specified Action :" + config.ANTILINK_ACTION + '_');
          return await _0x3ce439[config.ANTILINK_ACTION]([_0x3ce439.participant]);
        }
      } else {
        return await _0x3ce439.reply("*_I'm not admin_*");
      }
    }
  }
});
command({
  'pattern': "invite ?(.*)",
  'fromMe': true,
  'desc': "Provides the group's invitation link.",
  'type': "group"
}, async (_0x3aa398, _0x3c073d) => {
  if (!_0x3aa398.isGroup) {
    return await _0x3aa398.reply("*_This command only works in group chats_*");
  }
  var _0x244d92 = await isAdmin(_0x3aa398.jid, _0x3aa398.user, _0x3aa398.client);
  if (!_0x244d92) {
    return await _0x3aa398.reply("*_I'm not admin_*");
  }
  const _0x46fe1c = await _0x3aa398.client.groupInviteCode(_0x3aa398.jid);
  await _0x3aa398.reply("_https://chat.whatsapp.com/" + _0x46fe1c + '_');
});
command({
  'pattern': "revoke ?(.*)",
  'fromMe': true,
  'desc': "Revoke Group invite link.",
  'type': "group"
}, async (_0x435256, _0x1f9e9b) => {
  if (!_0x435256.isGroup) {
    return await _0x435256.reply("*_This command only works in group chats_*");
  }
  var _0x1e9565 = await isAdmin(_0x435256.jid, _0x435256.user, _0x435256.client);
  if (!_0x1e9565) {
    return await _0x435256.reply("*_I'm not admin_*");
  }
  await _0x435256.client.groupRevokeInvite(_0x435256.jid);
  await _0x435256.reply("*_Revoked!_*");
});
command({
  'pattern': "join ?(.*)",
  'fromMe': true,
  'desc': "Join in the group",
  'type': "group"
}, async (_0x39c3f8, _0x4b00a5) => {
  if (!_0x4b00a5 || !/^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})$/.test(_0x4b00a5)) {
    return await _0x39c3f8.reply("*_Need group link_*");
  }
  var _0x58a6ee = await _0x39c3f8.client.groupAcceptInvite(_0x4b00a5.split('/')[0x3]);
  if (!_0x58a6ee) {
    return await _0x39c3f8.reply("*_Invalid Group Link!_*");
  }
  if (_0x58a6ee) {
    return await _0x39c3f8.reply("*_Joined!_*");
  }
});
command({
  'pattern': "left ?(.*)",
  'fromMe': true,
  'desc': "Left from the group",
  'type': "group"
}, async (_0x39828d, _0x2570f1) => {
  if (!_0x39828d.isGroup) {
    return await _0x39828d.reply("*_This command only works in group chats_*");
  }
  await _0x39828d.client.groupLeave(_0x39828d.jid);
});
command({
  'pattern': "lock ?(.*)",
  'fromMe': true,
  'desc': "only allow admins to modify the group's settings.",
  'type': "group"
}, async (_0x2b6ba6, _0x18bac4) => {
  if (!_0x2b6ba6.isGroup) {
    return await _0x2b6ba6.reply("*_This command only works in group chats_*");
  }
  var _0x2b3444 = await isAdmin(_0x2b6ba6.jid, _0x2b6ba6.user, _0x2b6ba6.client);
  if (!_0x2b3444) {
    return await _0x2b6ba6.reply("*_I'm not admin_*");
  }
  await _0x2b6ba6.client.groupSettingUpdate(_0x2b6ba6.jid, "locked");
  return await _0x2b6ba6.sendMessage("*_Group Successfully Locked_*");
});
command({
  'pattern': "unlock ?(.*)",
  'fromMe': true,
  'desc': "allow everyone to modify the group's settings.",
  'type': "group"
}, async (_0x4c6d56, _0x29620c) => {
  if (!_0x4c6d56.isGroup) {
    return await _0x4c6d56.reply("*_This command only works in group chats_*");
  }
  var _0x3a9806 = await isAdmin(_0x4c6d56.jid, _0x4c6d56.user, _0x4c6d56.client);
  if (!_0x3a9806) {
    return await _0x4c6d56.reply("*_I'm not admin_*");
  }
  await _0x4c6d56.client.groupSettingUpdate(_0x4c6d56.jid, "unlocked");
  return await _0x4c6d56.sendMessage("*_Group Successfully Unlocked_*");
});
command({
  'pattern': "gname ?(.*)",
  'fromMe': true,
  'desc': "Change group subject",
  'type': "group"
}, async (_0x4a8dbb, _0x3c7475) => {
  if (!_0x4a8dbb.isGroup) {
    return await _0x4a8dbb.reply("*_This command only works in group chats_*");
  }
  _0x3c7475 = _0x3c7475 || _0x4a8dbb.reply_message.text;
  if (!_0x3c7475) {
    return await _0x4a8dbb.reply("*_Need Subject!_*\n*_Example: gname Ezra-MD Support!_.*");
  }
  var {
    restrict: _0x31d18f
  } = _0x4a8dbb.client.groupMetadata(_0x4a8dbb.jid);
  ;
  if (_0x31d18f && !(await isAdmin(_0x4a8dbb))) {
    return await _0x4a8dbb.reply("*_I'm not admin_*");
  }
  await _0x4a8dbb.client.groupUpdateSubject(_0x4a8dbb.jid, _0x3c7475);
  return await _0x4a8dbb.reply("*_Subject updated_*");
});
command({
  'pattern': "gdesc ?(.*)",
  'fromMe': true,
  'desc': "Change group description",
  'type': "group"
}, async (_0x432bb9, _0x5691e6) => {
  if (!_0x432bb9.isGroup) {
    return await _0x432bb9.reply("*_This command only works in group chats_*");
  }
  _0x5691e6 = _0x5691e6 || _0x432bb9.reply_message.text;
  if (!_0x5691e6) {
    return await _0x432bb9.reply("*_Need Description!_*\n*_Example: gdesc Ezra-XD Wa BOT!_*");
  }
  const _0x482965 = await _0x432bb9.client.groupMetadata(_0x432bb9.jid);
  if (_0x482965 && !(await isAdmin(_0x432bb9.jid, _0x432bb9.user, _0x432bb9.client))) {
    return await _0x432bb9.reply("_I'm not admin_");
  }
  await _0x432bb9.client.groupUpdateDescription(_0x432bb9.jid, _0x5691e6);
  return await _0x432bb9.reply("*_Description updated_*");
});
command({
  'pattern': "gpp$",
  'fromMe': true,
  'desc': "Change Group Icon",
  'type': "group"
}, async (_0x4a7768, _0x579f6c, _0xf21a76) => {
  if (!_0x4a7768.isGroup) {
    return await _0x4a7768.reply("*_This command only works in group chats_*");
  }
  var _0x3905af = await isAdmin(_0x4a7768.jid, _0x4a7768.user, _0x4a7768.client);
  if (!_0x3905af) {
    return await _0x4a7768.reply("*_I'm not admin_*");
  }
  if (!_0x4a7768.reply_message.image) {
    return await _0x4a7768.reply("*_Reply to a photo_*");
  }
  let _0x4ed96b = await _0xf21a76.quoted.download();
  await _0x4a7768.client.updateProfilePicture(_0x4a7768.jid, _0x4ed96b);
  return await _0x4a7768.reply("*_Successfully Group Icon Updated_*");
});
async function updateProfilePicture(_0x18260c, _0x2964a6, _0x48b2e1) {
  const {
    query: _0x10e72
  } = _0x48b2e1.client;
  const {
    img: _0x1f71f3
  } = await generateProfilePicture(_0x2964a6);
  await _0x10e72({
    'tag': 'iq',
    'attrs': {
      'to': _0x18260c,
      'type': "set",
      'xmlns': "w:profile:picture"
    },
    'content': [{
      'tag': "picture",
      'attrs': {
        'type': "image"
      },
      'content': _0x1f71f3
    }]
  });
}
async function generateProfilePicture(_0x200a4a) {
  const _0xa3e094 = await Jimp.read(_0x200a4a);
  const _0x5ea6f7 = _0xa3e094.getWidth();
  const _0x56e735 = _0xa3e094.getHeight();
  const _0xa090c3 = _0xa3e094.crop(0x0, 0x0, _0x5ea6f7, _0x56e735);
  return {
    'img': await _0xa090c3.scaleToFit(0x144, 0x2d0).getBufferAsync(Jimp.MIME_JPEG),
    'preview': await _0xa090c3.normalize().getBufferAsync(Jimp.MIME_JPEG)
  };
}
command({
  'pattern': "fullgpp$",
  'fromMe': true,
  'desc': "Change Group Icon",
  'type': "group"
}, async (_0x3d1eb0, _0x22ffe8, _0x56542e) => {
  if (!_0x3d1eb0.isGroup) {
    return await _0x3d1eb0.reply("*_This command only works in group chats_*");
  }
  var _0x5149d4 = await isAdmin(_0x3d1eb0.jid, _0x3d1eb0.user, _0x3d1eb0.client);
  if (!_0x5149d4) {
    return await _0x3d1eb0.reply("*_I'm not admin_*");
  }
  if (!_0x3d1eb0.reply_message.image) {
    return await _0x3d1eb0.reply("*_Reply to a photo_*");
  }
  let _0x1b7ecf = await _0x56542e.quoted.download();
  await updateProfilePicture(_0x3d1eb0.jid, _0x1b7ecf, _0x3d1eb0);
  return await _0x3d1eb0.reply("*_Profile Picture Updated_*");
});
async function updateProfilePicture(_0x3a13c6, _0x5d0ab4, _0x416552) {
  const {
    query: _0x44c237
  } = _0x416552.client;
  const {
    img: _0x127268
  } = await generateProfilePicture(_0x5d0ab4);
  await _0x44c237({
    'tag': 'iq',
    'attrs': {
      'to': _0x3a13c6,
      'type': "set",
      'xmlns': "w:profile:picture"
    },
    'content': [{
      'tag': "picture",
      'attrs': {
        'type': "image"
      },
      'content': _0x127268
    }]
  });
}
async function generateProfilePicture(_0x360bfb) {
  const _0x1dea90 = await Jimp.read(_0x360bfb);
  const _0xadfd99 = _0x1dea90.getWidth();
  const _0x407718 = _0x1dea90.getHeight();
  const _0x47254c = _0x1dea90.crop(0x0, 0x0, _0xadfd99, _0x407718);
  return {
    'img': await _0x47254c.scaleToFit(0x144, 0x2d0).getBufferAsync(Jimp.MIME_JPEG),
    'preview': await _0x47254c.normalize().getBufferAsync(Jimp.MIME_JPEG)
  };
}
command({
  'pattern': "welcome",
  'fromMe': true,
  'desc': "group welcome message",
  'type': "group"
}, async (_0x1cd116, _0x2262f4) => {
  if (!_0x1cd116.isGroup) {
    return await _0x1cd116.reply("*_This command only works in group chats_*");
  }
  let {
    prefix: _0x580561
  } = _0x1cd116;
  let _0x22701d = await getStatus(_0x1cd116.jid, "welcome");
  let _0x1e37c3 = _0x22701d ? 'on' : "off";
  if (!_0x2262f4) {
    let _0x2c2b45 = "Welcome manager\n\nGroup: " + (await _0x1cd116.client.groupMetadata(_0x1cd116.jid)).subject + "\nStatus: " + _0x1e37c3 + "\n\nAvailable Actions:\n\n- " + _0x580561 + "welcome get: Get the welcome message\n- " + _0x580561 + "welcome on: Enable welcome message\n- " + _0x580561 + "welcome off: Disable welcome message\n- " + _0x580561 + "welcome delete: Delete the welcome message";
    return await _0x1cd116.reply(_0x2c2b45);
  }
  if (_0x2262f4 === "get") {
    let _0x284d90 = await getMessage(_0x1cd116.jid, "welcome");
    if (!_0x284d90) {
      return await _0x1cd116.reply("_There is no welcome set_");
    }
    return _0x1cd116.reply(_0x284d90.message);
  }
  if (_0x2262f4 === 'on') {
    let _0x548ee0 = await getMessage(_0x1cd116.jid, "welcome");
    if (!_0x548ee0) {
      return await _0x1cd116.reply("_There is no welcome message to enable_");
    }
    if (_0x22701d) {
      return await _0x1cd116.reply("_Welcome already enabled_");
    }
    await toggleStatus(_0x1cd116.jid);
    return await _0x1cd116.reply("_Welcome enabled_");
  }
  if (_0x2262f4 === "off") {
    if (!_0x22701d) {
      return await _0x1cd116.reply("_Welcome already disabled_");
    }
    await toggleStatus(_0x1cd116.jid, "welcome");
    return await _0x1cd116.reply("_Welcome disabled_");
  }
  if (_0x2262f4 == "delete") {
    await delMessage(_0x1cd116.jid, "welcome");
    return await _0x1cd116.reply("_Welcome deleted successfully_");
  }
  await setMessage(_0x1cd116.jid, "welcome", _0x2262f4);
  return await _0x1cd116.reply("_Welcome set successfully_");
});
command({
  'pattern': "goodbye",
  'fromMe': true,
  'desc': "group goodbye message",
  'type': "group"
}, async (_0x3f91ba, _0x24edc4) => {
  if (!_0x3f91ba.isGroup) {
    return await _0x3f91ba.reply("*_This command only works in group chats_*");
  }
  let _0x29d754 = await getStatus(_0x3f91ba.jid, "goodbye");
  let _0x46f065 = _0x29d754 ? 'on' : "off";
  let _0x1054bb = "Goodbye manager\n\nGroup: " + (await _0x3f91ba.client.groupMetadata(_0x3f91ba.jid)).subject + "\nStatus: " + _0x46f065 + "\n\nAvailable Actions:\n\n- goodbye get: Get the goodbye message\n- goodbye on: Enable goodbye message\n- goodbye off: Disable goodbye message\n- goodbye delete: Delete the goodbye message";
  if (!_0x24edc4) {
    return await _0x3f91ba.reply(_0x1054bb);
  }
  if (_0x24edc4 === "get") {
    let _0x20692a = await getMessage(_0x3f91ba.jid, "goodbye");
    if (!_0x20692a) {
      return await _0x3f91ba.reply("_There is no goodbye set_");
    }
    return _0x3f91ba.reply(_0x20692a.message);
  }
  if (_0x24edc4 === 'on') {
    await toggleStatus(_0x3f91ba.jid, "goodbye");
    return await _0x3f91ba.reply("_Goodbye enabled_");
  }
  if (_0x24edc4 === "off") {
    await toggleStatus(_0x3f91ba.jid);
    return await _0x3f91ba.reply("_Goodbye disabled_");
  }
  if (_0x24edc4 === "delete") {
    await delMessage(_0x3f91ba.jid, "goodbye");
    return await _0x3f91ba.reply("_Goodbye deleted successfully_");
  }
  await setMessage(_0x3f91ba.jid, "goodbye", _0x24edc4);
  return await _0x3f91ba.reply("_Goodbye set successfully_");
});
command({
  'pattern': "ginfo",
  'fromMe': isPrivate,
  'desc': "group infp",
  'type': "group"
}, async (_0x361189, _0x521853, _0x321b10, _0x3b5627) => {
  if (!_0x521853 || !_0x521853.match(/^https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]/)) {
    return await _0x361189.reply("*_Need A WhatsApp Group Link_*");
  }
  let _0x3350d2 = _0x521853.trim().split('/')[0x3];
  const _0xf77717 = await _0x361189.client.groupGetInviteInfo(_0x3350d2);
  const _0x4ec600 = "\n*GROUP INFO*\n\n*id* : " + _0xf77717.id + "\n*title* : " + _0xf77717.subject + "\n*description* : " + _0xf77717.desc + "\n*size* : " + _0xf77717.size + "\n*creator* : " + (_0xf77717.owner ? _0xf77717.owner.split('@')[0x0] : "unknown") + "\n*restrict* : " + _0xf77717.restrict + "\n*announce* : " + _0xf77717.announce + "\n*created on* : " + require("moment-timezone")(_0xf77717.creation * 0x3e8).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss") + "\n\n𝐍𝐄𝐙𝐔𝐊𝐎 𝐌𝐃";
  return await _0x361189.client.sendMessage(_0x361189.jid, {
     {
    'quoted': _0x361189
  });
});
