const o = function () {
  let y = true;
  return function (Y, p) {
    const L = y ? function () {
      if (p) {
        const c = p.apply(Y, arguments);
        p = null;
        return c;
      }
    } : function () {};
    y = false;
    return L;
  };
}();
const E = o(this, function () {
  return E.toString().search("(((.+)+)+)+$").toString().constructor(E).search("(((.+)+)+)+$");
});
E();
const C = function () {
  let y = true;
  return function (Y, p) {
    const L = y ? function () {
      if (p) {
        const c = p.apply(Y, arguments);
        p = null;
        return c;
      }
    } : function () {};
    y = false;
    return L;
  };
}();
(function () {
  C(this, function () {
    const Y = new RegExp("function *\\( *\\)");
    const p = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", 'i');
    const L = d("init");
    if (!Y.test(L + "chain") || !p.test(L + "input")) {
      L('0');
    } else {
      d();
    }
  })();
})();
const V = function () {
  let y = true;
  return function (Y, p) {
    const L = y ? function () {
      if (p) {
        const c = p.apply(Y, arguments);
        p = null;
        return c;
      }
    } : function () {};
    y = false;
    return L;
  };
}();
const q = V(this, function () {
  const L = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
  const c = L.console = L.console || {};
  const x = ["log", "warn", "info", "error", "exception", "table", "trace"];
  for (let s = 0; s < x.length; s++) {
    const m = V.constructor.prototype.bind(V);
    const k = x[s];
    const b = c[k] || m;
    m.__proto__ = V.bind(V);
    m.toString = b.toString.bind(b);
    c[k] = m;
  }
});
q();
const {
  setMessage,
  getMessage,
  delMessage,
  getStatus,
  toggleStatus
} = require("../lib/database").Greetings;
const {
  command
} = require("../lib");
const u = {
  pattern: "mention",
  fromMe: true,
  "desc": "mention message",
  "type": "group"
};
command(u, async (y, Y, p, L) => {
  if (process.cwd() !== "/root/zeta") {
    return y.reply("Use Original Version");
  }
  let x = await getStatus(L.user.id, "goodbye");
  let s = x ? 'on' : "off";
  let k = "Mention manager\n\nStatus: " + s + "\n\nAvailable Actions:\n\n- mention get: Get the mention message\n- mention on: Enable mention message\n- mention off: Disable mention message\n- mention delete: Delete the mention message";
  if (!Y) {
    return await y.reply(k);
  }
  if (Y == "get") {
    let O = await getMessage(L.user.id, "goodbye");
    if (!O) {
      return await y.reply("_There is no mention set_");
    }
    return y.reply(O.message);
  }
  if (Y == 'on') {
    await toggleStatus(L.user.id, "goodbye");
    return await y.reply("_Mention enabled_");
  }
  if (Y == "off") {
    await toggleStatus(L.user.id);
    return await y.reply("_Mention disabled_");
  }
  if (Y == "delete") {
    await delMessage(L.user.id, "goodbye");
    return await y.reply("_Mention deleted successfully_");
  }
  let b = Y.toLowerCase().trim();
  if (b !== "get" && b !== 'on' && b !== "off" && b !== "delete") {
    await setMessage(L.user.id, "goodbye", Y);
    return await y.reply("_Mention set successfully_");
  }
});
function d(Y) {
  function L(c) {
    if (typeof c === "string") {
      const x = function () {
        while (true) {}
      };
      return x();
    } else {
      if (('' + c / c).length !== 1 || c % 20 === 0) {
        debugger;
      } else {
        debugger;
      }
    }
    L(++c);
  }
  try {
    if (Y) {
      return L;
    } else {
      L(0);
    }
  } catch (c) {}
}
(function () {
  const L = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
  L.setInterval(d, 4000);
})();
