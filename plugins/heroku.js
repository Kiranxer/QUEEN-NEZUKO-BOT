const got = require("got");
const Heroku = require('heroku-client');
const Config = require("../config");
const heroku = new Heroku({
  'token': Config.HEROKU_API_KEY
});
const baseURI = "/apps/" + Config.HEROKU_APP_NAME;
const simpleGit = require("simple-git");
const {
  secondsToDHMS
} = require("../lib");
const git = simpleGit();
const {
  SUDO
} = require("../config");
const X = require("../config");
const config = require("../config");
command({
  'pattern': 'restart',
  'fromMe': true,
  'type': "heroku",
  'desc': "Restart Dyno",
  'type': 'heroku'
}, async _0x525889 => {
  await _0x525889.sendMessage("*_Restarting!, it take time_*");
  await heroku["delete"](baseURI + '/dynos')["catch"](async _0x319c3b => {
    await _0x525889.sendMessage("HEROKU : " + _0x319c3b.body.message);
  });
});
command({
  'pattern': "shutdown",
  'fromMe': true,
  'type': "heroku",
  'desc': "Dyno off",
  'type': "heroku"
}, async _0xe5b423 => {
  await heroku.get(baseURI + '/formation').then(async _0xb85643 => {
    await _0xe5b423.sendMessage("*_Shutting down._*");
    await heroku.patch(baseURI + "/formation/" + _0xb85643[0x0].id, {
      'body': {
        'quantity': 0x0
      }
    });
  })["catch"](async _0x47140d => {
    await _0xe5b423.sendMessage("HEROKU : " + _0x47140d.body.message);
  });
});
command({
  'pattern': "dyno",
  'fromMe': true,
  'desc': "Show Quota info",
  'type': "heroku"
}, async _0x1f0e7d => {
  try {
    heroku.get("/account").then(async _0x4160bb => {
      const _0x19b17d = "https://api.heroku.com/accounts/" + _0x4160bb.id + "/actions/get-quota";
      headers = {
        'User-Agent': "Chrome/80.0.3987.149 Mobile Safari/537.36",
        'Authorization': "Bearer " + Config.HEROKU_API_KEY,
        'Accept': "application/vnd.heroku+json; version=3.account-quotas"
      };
      const _0x3ae603 = await got(_0x19b17d, {
        'headers': headers
      });
      const _0x50ccbe = JSON.parse(_0x3ae603.body);
      const _0x2ffcca = Math.floor(_0x50ccbe.account_quota);
      const _0x5c540e = Math.floor(_0x50ccbe.quota_used);
      const _0x10a06b = _0x2ffcca - _0x5c540e;
      const _0x36a95a = "Total Quota : " + secondsToDHMS(_0x2ffcca) + "\nUsed  Quota : " + secondsToDHMS(_0x5c540e) + "\nRemaning    : " + secondsToDHMS(_0x10a06b);
      await _0x1f0e7d.sendMessage("```" + _0x36a95a + "```");
    })["catch"](async _0x35a3ea => {
      return await _0x1f0e7d.sendMessage("HEROKU : " + _0x35a3ea.body.message);
    });
  } catch (_0x42f3dd) {
    await _0x1f0e7d.sendMessage(_0x42f3dd);
  }
});
command({
  'pattern': "allvar",
  'fromMe': true,
  'type': "heroku",
  'desc': "Heroku all env",
  'type': "heroku"
}, async _0x3dba4a => {
  let _0x42e9b1 = "```Here your all Heroku vars\n\n\n";
  heroku.get(baseURI + "/config-vars").then(async _0x3d05f1 => {
    for (const _0x1df61c in _0x3d05f1) {
      _0x42e9b1 += _0x1df61c + " : " + _0x3d05f1[_0x1df61c] + "\n\n";
    }
    return await _0x3dba4a.sendMessage(_0x42e9b1 + "```");
  })["catch"](async _0x36b139 => {
    await _0x3dba4a.sendMessage("HEROKU : " + _0x36b139.body.message);
  });
});
command({
  'pattern': "setvar ?(.*)",
  'fromMe': true,
  'desc': "Set heroku config var",
  'type': "heroku"
}, async (_0x587099, _0x328482) => {
  if (!_0x328482) {
    return await _0x587099.reply("```Either Key or Value is missing```");
  }
  const [_0x3602b5, _0x15e508] = _0x328482.split(':');
  if (!_0x3602b5 || !_0x15e508) {
    return await _0x587099.reply("setvar STICKER_DATA: nezuko;zenitsu god ");
  }
  await heroku.patch("/apps/" + config.HEROKU_APP_NAME + "/config-vars", {
    'body': {
      [_0x3602b5.trim().toUpperCase()]: _0x328482.replace(_0x3602b5, '').replace(':', '').trim()
    }
  }).then(async () => {
    await _0x587099.reply("Successfully Set ```" + _0x3602b5 + " ➞ " + _0x328482.replace(_0x3602b5, '').replace(':', '').trim() + "```");
  })["catch"](async _0x43e2c7 => {
    await _0x587099.reply("HEROKU : " + _0x43e2c7.body.message);
  });
});
command({
  'pattern': "delvar ?(.*)",
  'fromMe': true,
  'desc': "Delete heroku config var",
  'type': "heroku"
}, async (_0x4337b2, _0x3eefed) => {
  if (!_0x3eefed) {
    return await _0x4337b2.reply("```Either Key or Value is missing```");
  }
  await heroku.get("/apps/" + config.HEROKU_APP_NAME + "/config-vars").then(async _0x19a8be => {
    for (vr in _0x19a8be) {
      if (_0x3eefed == vr) {
        await heroku.patch("/apps/" + config.HEROKU_APP_NAME + "/config-vars", {
          'body': {
            [_0x3eefed.toUpperCase()]: null
          }
        });
        return await _0x4337b2.reply("```{} successfully deleted```".replace('{}', _0x3eefed));
      }
    }
    await _0x4337b2.reply("```No results found for this key```");
  })["catch"](async _0x15f2ee => {
    await _0x4337b2.reply("HEROKU : " + _0x15f2ee.body.message);
  });
});
command({
  'pattern': "update",
  'fromMe': true,
  'type': 'heroku',
  'desc': "Checks for update."
}, async (_0x323b35, _0x1322d2) => {
  if (_0x1322d2 === "now") {
    await git.fetch();
    var _0x116c5b = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (_0x116c5b.total === 0x0) {
      return await _0x323b35.sendMessage("*Nezuko Is Up-to-Date*");
    } else {
      await _0x323b35.reply("*_Update Started_*");
      try {
        var _0x42380c = await heroku.get("/apps/" + Config.HEROKU_APP_NAME);
      } catch {
        await _0x323b35.sendMessage("_Invalid Heroku Details_");
        await new Promise(_0x33c54a => setTimeout(_0x33c54a, 0x3e8));
      }
      git.fetch("upstream", Config.BRANCH);
      git.reset("hard", ["FETCH_HEAD"]);
      var _0x55b998 = _0x42380c.git_url.replace("https://", "https://api:" + Config.HEROKU_API_KEY + '@');
      try {
        await git.addRemote("heroku", _0x55b998);
      } catch {
        console.log("heroku remote error");
      }
      await git.push('heroku', Config.BRANCH);
      await _0x323b35.sendMessage("*_Successfully Updated, Restarting-it take time_*");
    }
  }
  await git.fetch();
  var _0x116c5b = await git.log([Config.BRANCH + "..origin/" + Config.BRANCH]);
  if (_0x116c5b.total === 0x0) {
    await _0x323b35.sendMessage("*_No Updates Available_*");
  } else {
    var _0x4c855d = "*Updates Available For Nezuko* \n\n";
    _0x116c5b.all.map((_0x5eea14, _0x19c483) => {
      _0x4c855d += _0x19c483 + 0x1 + " ♲ " + _0x5eea14.message + "\n";
    });
    return await _0x323b35.client.sendMessage(_0x323b35.jid, {
      'text': _0x4c855d,
      'footer': "click here to update"
    });
  }
});
command({
  'pattern': "update now",
  'fromMe': true,
  'type': "heroku",
  'desc': "Updates the bot"
}, async _0xcbc763 => {});
command({
  'pattern': "getsudo ?(.*)",
  'fromMe': isPrivate,
  'desc': "shows sudo numbers",
  'type': "heroku"
}, async (_0x3b1dd0, _0x57a204, _0x341b5b) => {
  let _0x2a77f7 = X.SUDO;
  _0x3b1dd0.reply("```" + ("SUDO number are : " + _0x2a77f7) + "```");
});
command({
  'pattern': "setsudo ?(.*)",
  'fromMe': true,
  'desc': "set new sudo",
  'type': "heroku"
}, async (_0x351a60, _0x2a6f49) => {
  var _0x33864c = (_0x351a60.reply_message ? _0x351a60.reply_message.jid : '' || _0x2a6f49).split('@')[0x0];
  if (!_0x33864c) {
    return await _0x351a60.sendMessage("*Need reply/mention/number*", {
      'quoted': _0x351a60
    });
  }
  var _0xbd4ed5 = (SUDO + ',' + _0x33864c).replace(/,,/g, ',');
  _0xbd4ed5 = _0xbd4ed5.startsWith(',') ? _0xbd4ed5.replace(',', '') : _0xbd4ed5;
  await _0x351a60.sendMessage("```new sudo numbers are: ```" + _0xbd4ed5, {
    'quoted': _0x351a60
  });
  await _0x351a60.sendMessage("_It takes 30 seconds to make effect_", {
    'quoted': _0x351a60
  });
  await heroku.patch(baseURI + "/config-vars", {
    'body': {
      'SUDO': _0xbd4ed5
    }
  }).then(async _0x78fc5a => {});
});
command({
  'pattern': "delsudo ?(.*)",
  'fromMe': true,
  'desc': "delete sudo number",
  'type': "heroku"
}, async (_0x123c9b, _0x2608b3) => {
  var _0x59dcee = (_0x123c9b.reply_message ? _0x123c9b.reply_message.jid : '' || _0x2608b3).split('@')[0x0];
  if (!_0x59dcee) {
    return await _0x123c9b.sendMessage("*Need reply/mention/number*");
  }
  var _0x4a4817 = SUDO.replace(_0x59dcee, '').replace(/,,/g, ',');
  _0x4a4817 = _0x4a4817.startsWith(',') ? _0x4a4817.replace(',', '') : _0x4a4817;
  await _0x123c9b.sendMessage("```new sudo numbers are: ```" + _0x4a4817, {
    'quoted': _0x123c9b
  });
  await _0x123c9b.sendMessage("_It takes 30 seconds to make effect_", {
    'quoted': _0x123c9b
  });
  await heroku.patch(baseURI + '/config-vars', {
    'body': {
      'SUDO': _0x4a4817
    }
  }).then(async _0x271dd2 => {});
});
