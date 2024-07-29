"use strict";
(() => {
  var Ge = Object.create;
  var B = Object.defineProperty;
  var Be = Object.getOwnPropertyDescriptor;
  var Ke = Object.getOwnPropertyNames;
  var $e = Object.getPrototypeOf,
    Xe = Object.prototype.hasOwnProperty;
  var Qe = (a, e) => () => (
    e || a((e = { exports: {} }).exports, e), e.exports
  );
  var ze = (a, e, r, t) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let o of Ke(e))
        !Xe.call(a, o) &&
          o !== r &&
          B(a, o, {
            get: () => e[o],
            enumerable: !(t = Be(e, o)) || t.enumerable,
          });
    return a;
  };
  var p = (a, e, r) => (
    (r = a != null ? Ge($e(a)) : {}),
    ze(
      e || !a || !a.__esModule
        ? B(r, "default", { value: a, enumerable: !0 })
        : r,
      a,
    )
  );
  var d = Qe((st, x) => {
    "use strict";
    var m = typeof Reflect == "object" ? Reflect : null,
      K =
        m && typeof m.apply == "function"
          ? m.apply
          : function (e, r, t) {
              return Function.prototype.apply.call(e, r, t);
            },
      w;
    m && typeof m.ownKeys == "function"
      ? (w = m.ownKeys)
      : Object.getOwnPropertySymbols
        ? (w = function (e) {
            return Object.getOwnPropertyNames(e).concat(
              Object.getOwnPropertySymbols(e),
            );
          })
        : (w = function (e) {
            return Object.getOwnPropertyNames(e);
          });
    function Je(a) {
      console && console.warn && console.warn(a);
    }
    var X =
      Number.isNaN ||
      function (e) {
        return e !== e;
      };
    function c() {
      c.init.call(this);
    }
    x.exports = c;
    x.exports.once = tt;
    c.EventEmitter = c;
    c.prototype._events = void 0;
    c.prototype._eventsCount = 0;
    c.prototype._maxListeners = void 0;
    var $ = 10;
    function y(a) {
      if (typeof a != "function")
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            typeof a,
        );
    }
    Object.defineProperty(c, "defaultMaxListeners", {
      enumerable: !0,
      get: function () {
        return $;
      },
      set: function (a) {
        if (typeof a != "number" || a < 0 || X(a))
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              a +
              ".",
          );
        $ = a;
      },
    });
    c.init = function () {
      (this._events === void 0 ||
        this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    };
    c.prototype.setMaxListeners = function (e) {
      if (typeof e != "number" || e < 0 || X(e))
        throw new RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
            e +
            ".",
        );
      return (this._maxListeners = e), this;
    };
    function Q(a) {
      return a._maxListeners === void 0
        ? c.defaultMaxListeners
        : a._maxListeners;
    }
    c.prototype.getMaxListeners = function () {
      return Q(this);
    };
    c.prototype.emit = function (e) {
      for (var r = [], t = 1; t < arguments.length; t++) r.push(arguments[t]);
      var o = e === "error",
        i = this._events;
      if (i !== void 0) o = o && i.error === void 0;
      else if (!o) return !1;
      if (o) {
        var n;
        if ((r.length > 0 && (n = r[0]), n instanceof Error)) throw n;
        var l = new Error(
          "Unhandled error." + (n ? " (" + n.message + ")" : ""),
        );
        throw ((l.context = n), l);
      }
      var h = i[e];
      if (h === void 0) return !1;
      if (typeof h == "function") K(h, this, r);
      else
        for (var u = h.length, f = ee(h, u), t = 0; t < u; ++t)
          K(f[t], this, r);
      return !0;
    };
    function z(a, e, r, t) {
      var o, i, n;
      if (
        (y(r),
        (i = a._events),
        i === void 0
          ? ((i = a._events = Object.create(null)), (a._eventsCount = 0))
          : (i.newListener !== void 0 &&
              (a.emit("newListener", e, r.listener ? r.listener : r),
              (i = a._events)),
            (n = i[e])),
        n === void 0)
      )
        (n = i[e] = r), ++a._eventsCount;
      else if (
        (typeof n == "function"
          ? (n = i[e] = t ? [r, n] : [n, r])
          : t
            ? n.unshift(r)
            : n.push(r),
        (o = Q(a)),
        o > 0 && n.length > o && !n.warned)
      ) {
        n.warned = !0;
        var l = new Error(
          "Possible EventEmitter memory leak detected. " +
            n.length +
            " " +
            String(e) +
            " listeners added. Use emitter.setMaxListeners() to increase limit",
        );
        (l.name = "MaxListenersExceededWarning"),
          (l.emitter = a),
          (l.type = e),
          (l.count = n.length),
          Je(l);
      }
      return a;
    }
    c.prototype.addListener = function (e, r) {
      return z(this, e, r, !1);
    };
    c.prototype.on = c.prototype.addListener;
    c.prototype.prependListener = function (e, r) {
      return z(this, e, r, !0);
    };
    function Ye() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          arguments.length === 0
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments)
        );
    }
    function J(a, e, r) {
      var t = { fired: !1, wrapFn: void 0, target: a, type: e, listener: r },
        o = Ye.bind(t);
      return (o.listener = r), (t.wrapFn = o), o;
    }
    c.prototype.once = function (e, r) {
      return y(r), this.on(e, J(this, e, r)), this;
    };
    c.prototype.prependOnceListener = function (e, r) {
      return y(r), this.prependListener(e, J(this, e, r)), this;
    };
    c.prototype.removeListener = function (e, r) {
      var t, o, i, n, l;
      if ((y(r), (o = this._events), o === void 0)) return this;
      if (((t = o[e]), t === void 0)) return this;
      if (t === r || t.listener === r)
        --this._eventsCount === 0
          ? (this._events = Object.create(null))
          : (delete o[e],
            o.removeListener &&
              this.emit("removeListener", e, t.listener || r));
      else if (typeof t != "function") {
        for (i = -1, n = t.length - 1; n >= 0; n--)
          if (t[n] === r || t[n].listener === r) {
            (l = t[n].listener), (i = n);
            break;
          }
        if (i < 0) return this;
        i === 0 ? t.shift() : Ze(t, i),
          t.length === 1 && (o[e] = t[0]),
          o.removeListener !== void 0 && this.emit("removeListener", e, l || r);
      }
      return this;
    };
    c.prototype.off = c.prototype.removeListener;
    c.prototype.removeAllListeners = function (e) {
      var r, t, o;
      if (((t = this._events), t === void 0)) return this;
      if (t.removeListener === void 0)
        return (
          arguments.length === 0
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : t[e] !== void 0 &&
              (--this._eventsCount === 0
                ? (this._events = Object.create(null))
                : delete t[e]),
          this
        );
      if (arguments.length === 0) {
        var i = Object.keys(t),
          n;
        for (o = 0; o < i.length; ++o)
          (n = i[o]), n !== "removeListener" && this.removeAllListeners(n);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = Object.create(null)),
          (this._eventsCount = 0),
          this
        );
      }
      if (((r = t[e]), typeof r == "function")) this.removeListener(e, r);
      else if (r !== void 0)
        for (o = r.length - 1; o >= 0; o--) this.removeListener(e, r[o]);
      return this;
    };
    function Y(a, e, r) {
      var t = a._events;
      if (t === void 0) return [];
      var o = t[e];
      return o === void 0
        ? []
        : typeof o == "function"
          ? r
            ? [o.listener || o]
            : [o]
          : r
            ? et(o)
            : ee(o, o.length);
    }
    c.prototype.listeners = function (e) {
      return Y(this, e, !0);
    };
    c.prototype.rawListeners = function (e) {
      return Y(this, e, !1);
    };
    c.listenerCount = function (a, e) {
      return typeof a.listenerCount == "function"
        ? a.listenerCount(e)
        : Z.call(a, e);
    };
    c.prototype.listenerCount = Z;
    function Z(a) {
      var e = this._events;
      if (e !== void 0) {
        var r = e[a];
        if (typeof r == "function") return 1;
        if (r !== void 0) return r.length;
      }
      return 0;
    }
    c.prototype.eventNames = function () {
      return this._eventsCount > 0 ? w(this._events) : [];
    };
    function ee(a, e) {
      for (var r = new Array(e), t = 0; t < e; ++t) r[t] = a[t];
      return r;
    }
    function Ze(a, e) {
      for (; e + 1 < a.length; e++) a[e] = a[e + 1];
      a.pop();
    }
    function et(a) {
      for (var e = new Array(a.length), r = 0; r < e.length; ++r)
        e[r] = a[r].listener || a[r];
      return e;
    }
    function tt(a, e) {
      return new Promise(function (r, t) {
        function o(n) {
          a.removeListener(e, i), t(n);
        }
        function i() {
          typeof a.removeListener == "function" && a.removeListener("error", o),
            r([].slice.call(arguments));
        }
        te(a, e, i, { once: !0 }), e !== "error" && rt(a, o, { once: !0 });
      });
    }
    function rt(a, e, r) {
      typeof a.on == "function" && te(a, "error", e, r);
    }
    function te(a, e, r, t) {
      if (typeof a.on == "function") t.once ? a.once(e, r) : a.on(e, r);
      else if (typeof a.addEventListener == "function")
        a.addEventListener(e, function o(i) {
          t.once && a.removeEventListener(e, o), r(i);
        });
      else
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            typeof a,
        );
    }
  });
  var re = p(d(), 1);
  var S = class {
      #e;
      #t;
      constructor(e = {}, r = null, t = null) {
        (this.#e = !1),
          (this.#t = null),
          (this.data = e),
          (this.target = r),
          (this.that = t);
      }
      get intercepted() {
        return this.#e;
      }
      get returnValue() {
        return this.#t;
      }
      respondWith(e) {
        (this.#t = e), (this.#e = !0);
      }
    },
    s = S;
  var E = class extends re.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.document = this.window.document),
          (this.Document = this.window.Document || {}),
          (this.DOMParser = this.window.DOMParser || {}),
          (this.docProto = this.Document.prototype || {}),
          (this.domProto = this.DOMParser.prototype || {}),
          (this.title = e.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "title",
          )),
          (this.cookie = e.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "cookie",
          )),
          (this.referrer = e.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "referrer",
          )),
          (this.domain = e.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "domain",
          )),
          (this.documentURI = e.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "documentURI",
          )),
          (this.write = this.docProto.write),
          (this.writeln = this.docProto.writeln),
          (this.querySelector = this.docProto.querySelector),
          (this.querySelectorAll = this.docProto.querySelectorAll),
          (this.parseFromString = this.domProto.parseFromString),
          (this.URL = e.nativeMethods.getOwnPropertyDescriptor(
            this.docProto,
            "URL",
          ));
      }
      overrideParseFromString() {
        this.ctx.override(this.domProto, "parseFromString", (e, r, t) => {
          if (2 > t.length) return e.apply(r, t);
          let [o, i] = t,
            n = new s({ string: o, type: i }, e, r);
          return (
            this.emit("parseFromString", n),
            n.intercepted
              ? n.returnValue
              : n.target.call(n.that, n.data.string, n.data.type)
          );
        });
      }
      overrideQuerySelector() {
        this.ctx.override(this.docProto, "querySelector", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o] = t,
            i = new s({ selectors: o }, e, r);
          return (
            this.emit("querySelector", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.selectors)
          );
        });
      }
      overrideDomain() {
        this.ctx.overrideDescriptor(this.docProto, "domain", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("getDomain", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
          set: (e, r, [t]) => {
            let o = new s({ value: t }, e, r);
            return (
              this.emit("setDomain", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.value)
            );
          },
        });
      }
      overrideReferrer() {
        this.ctx.overrideDescriptor(this.docProto, "referrer", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("referrer", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
        });
      }
      overrideCreateTreeWalker() {
        this.ctx.override(this.docProto, "createTreeWalker", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o, i = 4294967295, n, l] = t,
            h = new s(
              { root: o, show: i, filter: n, expandEntityReferences: l },
              e,
              r,
            );
          return (
            this.emit("createTreeWalker", h),
            h.intercepted
              ? h.returnValue
              : h.target.call(
                  h.that,
                  h.data.root,
                  h.data.show,
                  h.data.filter,
                  h.data.expandEntityReferences,
                )
          );
        });
      }
      overrideWrite() {
        this.ctx.override(this.docProto, "write", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [...o] = t,
            i = new s({ html: o }, e, r);
          return (
            this.emit("write", i),
            i.intercepted ? i.returnValue : i.target.apply(i.that, i.data.html)
          );
        }),
          this.ctx.override(this.docProto, "writeln", (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [...o] = t,
              i = new s({ html: o }, e, r);
            return (
              this.emit("writeln", i),
              i.intercepted
                ? i.returnValue
                : i.target.apply(i.that, i.data.html)
            );
          });
      }
      overrideDocumentURI() {
        this.ctx.overrideDescriptor(this.docProto, "documentURI", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("documentURI", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
        });
      }
      overrideURL() {
        this.ctx.overrideDescriptor(this.docProto, "URL", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("url", t), t.intercepted ? t.returnValue : t.data.value
            );
          },
        });
      }
      overrideCookie() {
        this.ctx.overrideDescriptor(this.docProto, "cookie", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("getCookie", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
          set: (e, r, [t]) => {
            let o = new s({ value: t }, e, r);
            return (
              this.emit("setCookie", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.value)
            );
          },
        });
      }
      overrideTitle() {
        this.ctx.overrideDescriptor(this.docProto, "title", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("getTitle", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
          set: (e, r, [t]) => {
            let o = new s({ value: t }, e, r);
            return (
              this.emit("setTitle", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.value)
            );
          },
        });
      }
    },
    ie = E;
  var oe = p(d(), 1);
  var O = class extends oe.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.Audio = this.window.Audio),
          (this.Element = this.window.Element),
          (this.elemProto = this.Element ? this.Element.prototype : {}),
          (this.innerHTML = e.nativeMethods.getOwnPropertyDescriptor(
            this.elemProto,
            "innerHTML",
          )),
          (this.outerHTML = e.nativeMethods.getOwnPropertyDescriptor(
            this.elemProto,
            "outerHTML",
          )),
          (this.setAttribute = this.elemProto.setAttribute),
          (this.getAttribute = this.elemProto.getAttribute),
          (this.removeAttribute = this.elemProto.removeAttribute),
          (this.hasAttribute = this.elemProto.hasAttribute),
          (this.querySelector = this.elemProto.querySelector),
          (this.querySelectorAll = this.elemProto.querySelectorAll),
          (this.insertAdjacentHTML = this.elemProto.insertAdjacentHTML),
          (this.insertAdjacentText = this.elemProto.insertAdjacentText);
      }
      overrideQuerySelector() {
        this.ctx.override(this.elemProto, "querySelector", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o] = t,
            i = new s({ selectors: o }, e, r);
          return (
            this.emit("querySelector", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.selectors)
          );
        });
      }
      overrideAttribute() {
        this.ctx.override(this.elemProto, "getAttribute", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o] = t,
            i = new s({ name: o }, e, r);
          return (
            this.emit("getAttribute", i),
            i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
          );
        }),
          this.ctx.override(this.elemProto, "setAttribute", (e, r, t) => {
            if (2 > t.length) return e.apply(r, t);
            let [o, i] = t,
              n = new s({ name: o, value: i }, e, r);
            return (
              this.emit("setAttribute", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.name, n.data.value)
            );
          }),
          this.ctx.override(this.elemProto, "hasAttribute", (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ name: o }, e, r);
            return (
              this.emit("hasAttribute", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.elemProto, "removeAttribute", (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ name: o }, e, r);
            return (
              this.emit("removeAttribute", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          });
      }
      overrideAudio() {
        this.ctx.override(
          this.window,
          "Audio",
          (e, r, t) => {
            if (!t.length) return new e(...t);
            let [o] = t,
              i = new s({ url: o }, e, r);
            return (
              this.emit("audio", i),
              i.intercepted ? i.returnValue : new i.target(i.data.url)
            );
          },
          !0,
        );
      }
      overrideHtml() {
        this.hookProperty(this.Element, "innerHTML", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("getInnerHTML", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
          set: (e, r, [t]) => {
            let o = new s({ value: t }, e, r);
            if ((this.emit("setInnerHTML", o), o.intercepted))
              return o.returnValue;
            e.call(r, o.data.value);
          },
        }),
          this.hookProperty(this.Element, "outerHTML", {
            get: (e, r) => {
              let t = new s({ value: e.call(r) }, e, r);
              return (
                this.emit("getOuterHTML", t),
                t.intercepted ? t.returnValue : t.data.value
              );
            },
            set: (e, r, [t]) => {
              let o = new s({ value: t }, e, r);
              if ((this.emit("setOuterHTML", o), o.intercepted))
                return o.returnValue;
              e.call(r, o.data.value);
            },
          });
      }
      overrideInsertAdjacentHTML() {
        this.ctx.override(this.elemProto, "insertAdjacentHTML", (e, r, t) => {
          if (2 > t.length) return e.apply(r, t);
          let [o, i] = t,
            n = new s({ position: o, html: i }, e, r);
          return (
            this.emit("insertAdjacentHTML", n),
            n.intercepted
              ? n.returnValue
              : n.target.call(n.that, n.data.position, n.data.html)
          );
        });
      }
      overrideInsertAdjacentText() {
        this.ctx.override(this.elemProto, "insertAdjacentText", (e, r, t) => {
          if (2 > t.length) return e.apply(r, t);
          let [o, i] = t,
            n = new s({ position: o, text: i }, e, r);
          return (
            this.emit("insertAdjacentText", n),
            n.intercepted
              ? n.returnValue
              : n.target.call(n.that, n.data.position, n.data.text)
          );
        });
      }
      hookProperty(e, r, t) {
        if (!e) return !1;
        if (this.ctx.nativeMethods.isArray(e)) {
          for (let i of e) this.hookProperty(i, r, t);
          return !0;
        }
        let o = e.prototype;
        return this.ctx.overrideDescriptor(o, r, t), !0;
      }
    },
    ne = O;
  var se = p(d(), 1);
  var M = class extends se.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.Node = e.window.Node || {}),
          (this.nodeProto = this.Node.prototype || {}),
          (this.compareDocumentPosition =
            this.nodeProto.compareDocumentPosition),
          (this.contains = this.nodeProto.contains),
          (this.insertBefore = this.nodeProto.insertBefore),
          (this.replaceChild = this.nodeProto.replaceChild),
          (this.append = this.nodeProto.append),
          (this.appendChild = this.nodeProto.appendChild),
          (this.removeChild = this.nodeProto.removeChild),
          (this.textContent = e.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "textContent",
          )),
          (this.parentNode = e.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "parentNode",
          )),
          (this.parentElement = e.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "parentElement",
          )),
          (this.childNodes = e.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "childNodes",
          )),
          (this.baseURI = e.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "baseURI",
          )),
          (this.previousSibling = e.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "previousSibling",
          )),
          (this.ownerDocument = e.nativeMethods.getOwnPropertyDescriptor(
            this.nodeProto,
            "ownerDocument",
          ));
      }
      overrideTextContent() {
        this.ctx.overrideDescriptor(this.nodeProto, "textContent", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("getTextContent", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
          set: (e, r, [t]) => {
            let o = new s({ value: t }, e, r);
            if ((this.emit("setTextContent", o), o.intercepted))
              return o.returnValue;
            e.call(r, o.data.value);
          },
        });
      }
      overrideAppend() {
        this.ctx.override(this.nodeProto, "append", (e, r, [...t]) => {
          let o = new s({ nodes: t }, e, r);
          return (
            this.emit("append", o),
            o.intercepted ? o.returnValue : o.target.call(o.that, o.data.nodes)
          );
        }),
          this.ctx.override(this.nodeProto, "appendChild", (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ node: o }, e, r);
            return (
              this.emit("appendChild", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.node)
            );
          });
      }
      overrideBaseURI() {
        this.ctx.overrideDescriptor(this.nodeProto, "baseURI", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("baseURI", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
        });
      }
      overrideParent() {
        this.ctx.overrideDescriptor(this.nodeProto, "parentNode", {
          get: (e, r) => {
            let t = new s({ node: e.call(r) }, e, r);
            return (
              this.emit("parentNode", t),
              t.intercepted ? t.returnValue : t.data.node
            );
          },
        }),
          this.ctx.overrideDescriptor(this.nodeProto, "parentElement", {
            get: (e, r) => {
              let t = new s({ element: e.call(r) }, e, r);
              return (
                this.emit("parentElement", t),
                t.intercepted ? t.returnValue : t.data.node
              );
            },
          });
      }
      overrideOwnerDocument() {
        this.ctx.overrideDescriptor(this.nodeProto, "ownerDocument", {
          get: (e, r) => {
            let t = new s({ document: e.call(r) }, e, r);
            return (
              this.emit("ownerDocument", t),
              t.intercepted ? t.returnValue : t.data.document
            );
          },
        });
      }
      overrideCompareDocumentPosit1ion() {
        this.ctx.override(
          this.nodeProto,
          "compareDocumentPosition",
          (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ node: o }, e, r);
            return i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.node);
          },
        );
      }
      overrideChildMethods() {
        this.ctx.override(this.nodeProto, "removeChild");
      }
    },
    ae = M;
  var le = p(d(), 1);
  var L = class extends le.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.Attr = this.window.Attr || {}),
          (this.attrProto = this.Attr.prototype || {}),
          (this.value = e.nativeMethods.getOwnPropertyDescriptor(
            this.attrProto,
            "value",
          )),
          (this.name = e.nativeMethods.getOwnPropertyDescriptor(
            this.attrProto,
            "name",
          )),
          (this.getNamedItem = this.attrProto.getNamedItem || null),
          (this.setNamedItem = this.attrProto.setNamedItem || null),
          (this.removeNamedItem = this.attrProto.removeNamedItem || null),
          (this.getNamedItemNS = this.attrProto.getNamedItemNS || null),
          (this.setNamedItemNS = this.attrProto.setNamedItemNS || null),
          (this.removeNamedItemNS = this.attrProto.removeNamedItemNS || null),
          (this.item = this.attrProto.item || null);
      }
      overrideNameValue() {
        this.ctx.overrideDescriptor(this.attrProto, "name", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("name", t), t.intercepted ? t.returnValue : t.data.value
            );
          },
        }),
          this.ctx.overrideDescriptor(this.attrProto, "value", {
            get: (e, r) => {
              let t = new s(
                { name: this.name.get.call(r), value: e.call(r) },
                e,
                r,
              );
              return (
                this.emit("getValue", t),
                t.intercepted ? t.returnValue : t.data.value
              );
            },
            set: (e, r, [t]) => {
              let o = new s({ name: this.name.get.call(r), value: t }, e, r);
              if ((this.emit("setValue", o), o.intercepted))
                return o.returnValue;
              o.target.call(o.that, o.data.value);
            },
          });
      }
      overrideItemMethods() {
        this.ctx.override(this.attrProto, "getNamedItem", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o] = t,
            i = new s({ name: o }, e, r);
          return (
            this.emit("getNamedItem", i),
            i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
          );
        }),
          this.ctx.override(this.attrProto, "setNamedItem", (e, r, t) => {
            if (2 > t.length) return e.apply(r, t);
            let [o, i] = t,
              n = new s({ name: o, value: i }, e, r);
            return (
              this.emit("setNamedItem", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.name, n.data.value)
            );
          }),
          this.ctx.override(this.attrProto, "removeNamedItem", (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ name: o }, e, r);
            return (
              this.emit("removeNamedItem", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "item", (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ index: o }, e, r);
            return (
              this.emit("item", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "getNamedItemNS", (e, r, t) => {
            if (2 > t.length) return e.apply(r, t);
            let [o, i] = t,
              n = new s({ namespace: o, localName: i }, e, r);
            return (
              this.emit("getNamedItemNS", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.namespace, n.data.localName)
            );
          }),
          this.ctx.override(this.attrProto, "setNamedItemNS", (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ attr: o }, e, r);
            return (
              this.emit("setNamedItemNS", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.attrProto, "removeNamedItemNS", (e, r, t) => {
            if (2 > t.length) return e.apply(r, t);
            let [o, i] = t,
              n = new s({ namespace: o, localName: i }, e, r);
            return (
              this.emit("removeNamedItemNS", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.namespace, n.data.localName)
            );
          });
      }
    },
    he = L;
  var ue = p(d(), 1);
  var k = class extends ue.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.Function = this.window.Function),
          (this.fnProto = this.Function.prototype),
          (this.toString = this.fnProto.toString),
          (this.fnStrings = e.fnStrings),
          (this.call = this.fnProto.call),
          (this.apply = this.fnProto.apply),
          (this.bind = this.fnProto.bind);
      }
      overrideFunction() {
        this.ctx.override(
          this.window,
          "Function",
          (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let o = t[t.length - 1],
              i = [];
            for (let l = 0; l < t.length - 1; l++) i.push(t[l]);
            let n = new s({ script: o, args: i }, e, r);
            return (
              this.emit("function", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, ...n.data.args, n.data.script)
            );
          },
          !0,
        );
      }
      overrideToString() {
        this.ctx.override(this.fnProto, "toString", (e, r) => {
          let t = new s({ fn: r }, e, r);
          return (
            this.emit("toString", t),
            t.intercepted ? t.returnValue : t.target.call(t.data.fn)
          );
        });
      }
    },
    ce = k;
  var de = p(d(), 1);
  var D = class extends de.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.Object = this.window.Object),
          (this.getOwnPropertyDescriptors =
            this.Object.getOwnPropertyDescriptors),
          (this.getOwnPropertyDescriptor =
            this.Object.getOwnPropertyDescriptor),
          (this.getOwnPropertyNames = this.Object.getOwnPropertyNames);
      }
      overrideGetPropertyNames() {
        this.ctx.override(this.Object, "getOwnPropertyNames", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o] = t,
            i = new s({ names: e.call(r, o) }, e, r);
          return (
            this.emit("getOwnPropertyNames", i),
            i.intercepted ? i.returnValue : i.data.names
          );
        });
      }
      overrideGetOwnPropertyDescriptors() {
        this.ctx.override(
          this.Object,
          "getOwnPropertyDescriptors",
          (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ descriptors: e.call(r, o) }, e, r);
            return (
              this.emit("getOwnPropertyDescriptors", i),
              i.intercepted ? i.returnValue : i.data.descriptors
            );
          },
        );
      }
    },
    pe = D;
  var fe = p(d(), 1);
  var N = class extends fe.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.fetch = this.window.fetch),
          (this.Request = this.window.Request),
          (this.Response = this.window.Response),
          (this.Headers = this.window.Headers),
          (this.reqProto = this.Request ? this.Request.prototype : {}),
          (this.resProto = this.Response ? this.Response.prototype : {}),
          (this.headersProto = this.Headers ? this.Headers.prototype : {}),
          (this.reqUrl = e.nativeMethods.getOwnPropertyDescriptor(
            this.reqProto,
            "url",
          )),
          (this.resUrl = e.nativeMethods.getOwnPropertyDescriptor(
            this.resProto,
            "url",
          )),
          (this.reqHeaders = e.nativeMethods.getOwnPropertyDescriptor(
            this.reqProto,
            "headers",
          )),
          (this.resHeaders = e.nativeMethods.getOwnPropertyDescriptor(
            this.resProto,
            "headers",
          ));
      }
      override() {
        return (
          this.overrideRequest(), this.overrideUrl(), this.overrideHeaders(), !0
        );
      }
      overrideRequest() {
        return this.fetch
          ? (this.ctx.override(this.window, "fetch", (e, r, t) => {
              if (!t.length || t[0] instanceof this.Request)
                return e.apply(r, t);
              let [o, i = {}] = t,
                n = new s({ input: o, options: i }, e, r);
              return (
                this.emit("request", n),
                n.intercepted
                  ? n.returnValue
                  : n.target.call(n.that, n.data.input, n.data.options)
              );
            }),
            this.ctx.override(
              this.window,
              "Request",
              (e, r, t) => {
                if (!t.length) return new e(...t);
                let [o, i = {}] = t,
                  n = new s({ input: o, options: i }, e);
                return (
                  this.emit("request", n),
                  n.intercepted
                    ? n.returnValue
                    : new n.target(n.data.input, n.data.options)
                );
              },
              !0,
            ),
            !0)
          : !1;
      }
      overrideUrl() {
        return (
          this.ctx.overrideDescriptor(this.reqProto, "url", {
            get: (e, r) => {
              let t = new s({ value: e.call(r) }, e, r);
              return (
                this.emit("requestUrl", t),
                t.intercepted ? t.returnValue : t.data.value
              );
            },
          }),
          this.ctx.overrideDescriptor(this.resProto, "url", {
            get: (e, r) => {
              let t = new s({ value: e.call(r) }, e, r);
              return (
                this.emit("responseUrl", t),
                t.intercepted ? t.returnValue : t.data.value
              );
            },
          }),
          !0
        );
      }
      overrideHeaders() {
        return this.Headers
          ? (this.ctx.overrideDescriptor(this.reqProto, "headers", {
              get: (e, r) => {
                let t = new s({ value: e.call(r) }, e, r);
                return (
                  this.emit("requestHeaders", t),
                  t.intercepted ? t.returnValue : t.data.value
                );
              },
            }),
            this.ctx.overrideDescriptor(this.resProto, "headers", {
              get: (e, r) => {
                let t = new s({ value: e.call(r) }, e, r);
                return (
                  this.emit("responseHeaders", t),
                  t.intercepted ? t.returnValue : t.data.value
                );
              },
            }),
            this.ctx.override(this.headersProto, "get", (e, r, [t]) => {
              if (!t) return e.call(r);
              let o = new s({ name: t, value: e.call(r, t) }, e, r);
              return (
                this.emit("getHeader", o),
                o.intercepted ? o.returnValue : o.data.value
              );
            }),
            this.ctx.override(this.headersProto, "set", (e, r, t) => {
              if (2 > t.length) return e.apply(r, t);
              let [o, i] = t,
                n = new s({ name: o, value: i }, e, r);
              return (
                this.emit("setHeader", n),
                n.intercepted
                  ? n.returnValue
                  : n.target.call(n.that, n.data.name, n.data.value)
              );
            }),
            this.ctx.override(this.headersProto, "has", (e, r, t) => {
              if (!t.length) return e.call(r);
              let [o] = t,
                i = new s({ name: o, value: e.call(r, o) }, e, r);
              return (
                this.emit("hasHeader", i),
                i.intercepted ? i.returnValue : i.data
              );
            }),
            this.ctx.override(this.headersProto, "append", (e, r, t) => {
              if (2 > t.length) return e.apply(r, t);
              let [o, i] = t,
                n = new s({ name: o, value: i }, e, r);
              return (
                this.emit("appendHeader", n),
                n.intercepted
                  ? n.returnValue
                  : n.target.call(n.that, n.data.name, n.data.value)
              );
            }),
            this.ctx.override(this.headersProto, "delete", (e, r, t) => {
              if (!t.length) return e.apply(r, t);
              let [o] = t,
                i = new s({ name: o }, e, r);
              return (
                this.emit("deleteHeader", i),
                i.intercepted
                  ? i.returnValue
                  : i.target.call(i.that, i.data.name)
              );
            }),
            !0)
          : !1;
      }
    },
    me = N;
  var ve = p(d(), 1);
  var R = class extends ve.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.XMLHttpRequest = this.window.XMLHttpRequest),
          (this.xhrProto = this.window.XMLHttpRequest
            ? this.window.XMLHttpRequest.prototype
            : {}),
          (this.open = this.xhrProto.open),
          (this.abort = this.xhrProto.abort),
          (this.send = this.xhrProto.send),
          (this.overrideMimeType = this.xhrProto.overrideMimeType),
          (this.getAllResponseHeaders = this.xhrProto.getAllResponseHeaders),
          (this.getResponseHeader = this.xhrProto.getResponseHeader),
          (this.setRequestHeader = this.xhrProto.setRequestHeader),
          (this.responseURL = e.nativeMethods.getOwnPropertyDescriptor(
            this.xhrProto,
            "responseURL",
          )),
          (this.responseText = e.nativeMethods.getOwnPropertyDescriptor(
            this.xhrProto,
            "responseText",
          ));
      }
      override() {
        this.overrideOpen(),
          this.overrideSend(),
          this.overrideMimeType(),
          this.overrideGetResHeader(),
          this.overrideGetResHeaders(),
          this.overrideSetReqHeader();
      }
      overrideOpen() {
        this.ctx.override(this.xhrProto, "open", (e, r, t) => {
          if (2 > t.length) return e.apply(r, t);
          let [o, i, n = !0, l = null, h = null] = t,
            u = new s(
              { method: o, input: i, async: n, user: l, password: h },
              e,
              r,
            );
          return (
            this.emit("open", u),
            u.intercepted
              ? u.returnValue
              : u.target.call(
                  u.that,
                  u.data.method,
                  u.data.input,
                  u.data.async,
                  u.data.user,
                  u.data.password,
                )
          );
        });
      }
      overrideResponseUrl() {
        this.ctx.overrideDescriptor(this.xhrProto, "responseURL", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("responseUrl", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
        });
      }
      overrideSend() {
        this.ctx.override(this.xhrProto, "send", (e, r, [t = null]) => {
          let o = new s({ body: t }, e, r);
          return (
            this.emit("send", o),
            o.intercepted ? o.returnValue : o.target.call(o.that, o.data.body)
          );
        });
      }
      overrideSetReqHeader() {
        this.ctx.override(this.xhrProto, "setRequestHeader", (e, r, t) => {
          if (2 > t.length) return e.apply(r, t);
          let [o, i] = t,
            n = new s({ name: o, value: i }, e, r);
          return (
            this.emit("setReqHeader", n),
            n.intercepted
              ? n.returnValue
              : n.target.call(n.that, n.data.name, n.data.value)
          );
        });
      }
      overrideGetResHeaders() {
        this.ctx.override(this.xhrProto, "getAllResponseHeaders", (e, r) => {
          let t = new s({ value: e.call(r) }, e, r);
          return (
            this.emit("getAllResponseHeaders", t),
            t.intercepted ? t.returnValue : t.data.value
          );
        });
      }
      overrideGetResHeader() {
        this.ctx.override(this.xhrProto, "getResponseHeader", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o] = t,
            i = new s({ name: o, value: e.call(r, o) }, e, r);
          return i.intercepted ? i.returnValue : i.data.value;
        });
      }
    },
    we = R;
  var ye = p(d(), 1);
  var V = class extends ye.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.EventSource = this.window.EventSource || {}),
          (this.esProto = this.EventSource.prototype || {}),
          (this.url = e.nativeMethods.getOwnPropertyDescriptor(
            this.esProto,
            "url",
          )),
          (this.CONNECTING = 0),
          (this.OPEN = 1),
          (this.CLOSED = 2);
      }
      overrideConstruct() {
        this.ctx.override(
          this.window,
          "EventSource",
          (e, r, t) => {
            if (!t.length) return new e(...t);
            let [o, i = {}] = t,
              n = new s({ url: o, config: i }, e, r);
            return (
              this.emit("construct", n),
              n.intercepted
                ? n.returnValue
                : new n.target(n.data.url, n.data.config)
            );
          },
          !0,
        ),
          "EventSource" in this.window &&
            ((this.window.EventSource.CONNECTING = this.CONNECTING),
            (this.window.EventSource.OPEN = this.OPEN),
            (this.window.EventSource.CLOSED = this.CLOSED));
      }
      overrideUrl() {
        this.ctx.overrideDescriptor(this.esProto, "url", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return this.emit("url", t), t.data.value;
          },
        });
      }
    },
    Pe = V;
  var ge = p(d(), 1);
  var C = class extends ge.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = this.ctx.window),
          (this.History = this.window.History),
          (this.history = this.window.history),
          (this.historyProto = this.History ? this.History.prototype : {}),
          (this.pushState = this.historyProto.pushState),
          (this.replaceState = this.historyProto.replaceState),
          (this.go = this.historyProto.go),
          (this.back = this.historyProto.back),
          (this.forward = this.historyProto.forward);
      }
      override() {
        this.overridePushState(),
          this.overrideReplaceState(),
          this.overrideGo(),
          this.overrideForward(),
          this.overrideBack();
      }
      overridePushState() {
        this.ctx.override(this.historyProto, "pushState", (e, r, t) => {
          if (2 > t.length) return e.apply(r, t);
          let [o, i, n = ""] = t,
            l = new s({ state: o, title: i, url: n }, e, r);
          return (
            this.emit("pushState", l),
            l.intercepted
              ? l.returnValue
              : l.target.call(l.that, l.data.state, l.data.title, l.data.url)
          );
        });
      }
      overrideReplaceState() {
        this.ctx.override(this.historyProto, "replaceState", (e, r, t) => {
          if (2 > t.length) return e.apply(r, t);
          let [o, i, n = ""] = t,
            l = new s({ state: o, title: i, url: n }, e, r);
          return (
            this.emit("replaceState", l),
            l.intercepted
              ? l.returnValue
              : l.target.call(l.that, l.data.state, l.data.title, l.data.url)
          );
        });
      }
      overrideGo() {
        this.ctx.override(this.historyProto, "go", (e, r, [t]) => {
          let o = new s({ delta: t }, e, r);
          return (
            this.emit("go", o),
            o.intercepted ? o.returnValue : o.target.call(o.that, o.data.delta)
          );
        });
      }
      overrideForward() {
        this.ctx.override(this.historyProto, "forward", (e, r) => {
          let t = new s(null, e, r);
          return (
            this.emit("forward", t),
            t.intercepted ? t.returnValue : t.target.call(t.that)
          );
        });
      }
      overrideBack() {
        this.ctx.override(this.historyProto, "back", (e, r) => {
          let t = new s(null, e, r);
          return (
            this.emit("back", t),
            t.intercepted ? t.returnValue : t.target.call(t.that)
          );
        });
      }
    },
    be = C;
  var xe = p(d(), 1),
    I = class extends xe.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.location = this.window.location),
          (this.WorkerLocation = this.ctx.worker
            ? this.window.WorkerLocation
            : null),
          (this.workerLocProto = this.WorkerLocation
            ? this.WorkerLocation.prototype
            : {}),
          (this.keys = [
            "href",
            "protocol",
            "host",
            "hostname",
            "port",
            "pathname",
            "search",
            "hash",
            "origin",
          ]),
          (this.HashChangeEvent = this.window.HashChangeEvent || null),
          (this.href = this.WorkerLocation
            ? e.nativeMethods.getOwnPropertyDescriptor(
                this.workerLocProto,
                "href",
              )
            : e.nativeMethods.getOwnPropertyDescriptor(this.location, "href"));
      }
      overrideWorkerLocation(e) {
        if (!this.WorkerLocation) return !1;
        let r = this;
        for (let t of this.keys)
          this.ctx.overrideDescriptor(this.workerLocProto, t, {
            get: () => e(r.href.get.call(this.location))[t],
          });
        return !0;
      }
      emulate(e, r) {
        let t = {},
          o = this;
        for (let i of o.keys)
          this.ctx.nativeMethods.defineProperty(t, i, {
            get() {
              return e(o.href.get.call(o.location))[i];
            },
            set:
              i !== "origin"
                ? function (n) {
                    switch (i) {
                      case "href":
                        o.location.href = r(n);
                        break;
                      case "hash":
                        o.emit(
                          "hashchange",
                          t.href,
                          n.trim().startsWith("#")
                            ? new URL(n.trim(), t.href).href
                            : new URL("#" + n.trim(), t.href).href,
                          o,
                        );
                        break;
                      default:
                        {
                          let l = new URL(t.href);
                          (l[i] = n), (o.location.href = r(l.href));
                        }
                        break;
                    }
                  }
                : void 0,
            configurable: !1,
            enumerable: !0,
          });
        return (
          "reload" in this.location &&
            this.ctx.nativeMethods.defineProperty(t, "reload", {
              value: this.ctx.wrap(this.location, "reload", (i, n) =>
                i.call(n === t ? this.location : n),
              ),
              writable: !1,
              enumerable: !0,
            }),
          "replace" in this.location &&
            this.ctx.nativeMethods.defineProperty(t, "replace", {
              value: this.ctx.wrap(this.location, "assign", (i, n, l) => {
                (!l.length || n !== t) && i.call(n), (n = this.location);
                let [h] = l,
                  u = new URL(h, t.href);
                return i.call(n === t ? this.location : n, r(u.href));
              }),
              writable: !1,
              enumerable: !0,
            }),
          "assign" in this.location &&
            this.ctx.nativeMethods.defineProperty(t, "assign", {
              value: this.ctx.wrap(this.location, "assign", (i, n, l) => {
                (!l.length || n !== t) && i.call(n), (n = this.location);
                let [h] = l,
                  u = new URL(h, t.href);
                return i.call(n === t ? this.location : n, r(u.href));
              }),
              writable: !1,
              enumerable: !0,
            }),
          "ancestorOrigins" in this.location &&
            this.ctx.nativeMethods.defineProperty(t, "ancestorOrigins", {
              get() {
                let i = [];
                return (
                  o.window.DOMStringList &&
                    o.ctx.nativeMethods.setPrototypeOf(
                      i,
                      o.window.DOMStringList.prototype,
                    ),
                  i
                );
              },
              set: void 0,
              enumerable: !0,
            }),
          this.ctx.nativeMethods.defineProperty(t, "toString", {
            value: this.ctx.wrap(this.location, "toString", () => t.href),
            enumerable: !0,
            writable: !1,
          }),
          this.ctx.nativeMethods.defineProperty(t, Symbol.toPrimitive, {
            value: () => t.href,
            writable: !1,
            enumerable: !1,
          }),
          this.ctx.window.Location &&
            this.ctx.nativeMethods.setPrototypeOf(
              t,
              this.ctx.window.Location.prototype,
            ),
          t
        );
      }
    },
    Se = I;
  var Ee = p(d(), 1);
  var T = class extends Ee.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = this.ctx.window),
          (this.postMessage = this.window.postMessage),
          (this.MessageEvent = this.window.MessageEvent || {}),
          (this.MessagePort = this.window.MessagePort || {}),
          (this.mpProto = this.MessagePort.prototype || {}),
          (this.mpPostMessage = this.mpProto.postMessage),
          (this.messageProto = this.MessageEvent.prototype || {}),
          (this.messageData = e.nativeMethods.getOwnPropertyDescriptor(
            this.messageProto,
            "data",
          )),
          (this.messageOrigin = e.nativeMethods.getOwnPropertyDescriptor(
            this.messageProto,
            "origin",
          ));
      }
      overridePostMessage() {
        this.ctx.override(this.window, "postMessage", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let o, i, n;
          this.ctx.worker ? ([o, n = []] = t) : ([o, i, n = []] = t);
          let l = new s(
            { message: o, origin: i, transfer: n, worker: this.ctx.worker },
            e,
            r,
          );
          return (
            this.emit("postMessage", l),
            l.intercepted
              ? l.returnValue
              : this.ctx.worker
                ? l.target.call(l.that, l.data.message, l.data.transfer)
                : l.target.call(
                    l.that,
                    l.data.message,
                    l.data.origin,
                    l.data.transfer,
                  )
          );
        });
      }
      wrapPostMessage(e, r, t = !1) {
        return this.ctx.wrap(e, r, (o, i, n) => {
          if (this.ctx.worker ? !n.length : 2 > n) return o.apply(i, n);
          let l, h, u;
          t ? (([l, u = []] = n), (h = null)) : ([l, h, u = []] = n);
          let f = new s(
            { message: l, origin: h, transfer: u, worker: this.ctx.worker },
            o,
            e,
          );
          return (
            this.emit("postMessage", f),
            f.intercepted
              ? f.returnValue
              : t
                ? f.target.call(f.that, f.data.message, f.data.transfer)
                : f.target.call(
                    f.that,
                    f.data.message,
                    f.data.origin,
                    f.data.transfer,
                  )
          );
        });
      }
      overrideMessageOrigin() {
        this.ctx.overrideDescriptor(this.messageProto, "origin", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("origin", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
        });
      }
      overrideMessageData() {
        this.ctx.overrideDescriptor(this.messageProto, "data", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("data", t), t.intercepted ? t.returnValue : t.data.value
            );
          },
        });
      }
    },
    Oe = T;
  var Me = p(d(), 1);
  var H = class extends Me.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.navigator = this.window.navigator),
          (this.Navigator = this.window.Navigator || {}),
          (this.navProto = this.Navigator.prototype || {}),
          (this.sendBeacon = this.navProto.sendBeacon);
      }
      overrideSendBeacon() {
        this.ctx.override(this.navProto, "sendBeacon", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o, i = ""] = t,
            n = new s({ url: o, data: i }, e, r);
          return (
            this.emit("sendBeacon", n),
            n.intercepted
              ? n.returnValue
              : n.target.call(n.that, n.data.url, n.data.data)
          );
        });
      }
    },
    Le = H;
  var Re = p(d(), 1);
  var Ct = globalThis.fetch,
    v = globalThis.WebSocket,
    It = globalThis.Request,
    Tt = globalThis.Response,
    P = globalThis.SharedWorker,
    ke = globalThis.localStorage,
    it = globalThis.navigator.serviceWorker,
    Ht = {
      prototype: { send: v.prototype.send },
      CLOSED: v.CLOSED,
      CLOSING: v.CLOSING,
      CONNECTING: v.CONNECTING,
      OPEN: v.OPEN,
    };
  async function A() {
    let e = (
        await self.clients.matchAll({ type: "window", includeUncontrolled: !0 })
      ).map(async (t) => {
        let o = await ot(t);
        return await Ne(o), o;
      }),
      r = Promise.race([
        Promise.any(e),
        new Promise((t, o) => setTimeout(o, 1e3, new TypeError("timeout"))),
      ]);
    try {
      return await r;
    } catch (t) {
      if (t instanceof AggregateError)
        throw (
          (console.error(
            "bare-mux: failed to get a bare-mux SharedWorker MessagePort as all clients returned an invalid MessagePort.",
          ),
          new Error("All clients returned an invalid MessagePort."))
        );
      return (
        console.warn(
          "bare-mux: failed to get a bare-mux SharedWorker MessagePort within 1s, retrying",
        ),
        await A()
      );
    }
  }
  function ot(a) {
    let e = new MessageChannel();
    return new Promise((r) => {
      a.postMessage({ type: "getPort", port: e.port2 }, [e.port2]),
        (e.port1.onmessage = (t) => {
          r(t.data);
        });
    });
  }
  function Ne(a) {
    let e = new MessageChannel(),
      r = new Promise((t, o) => {
        (e.port1.onmessage = (i) => {
          i.data.type === "pong" && t();
        }),
          setTimeout(o, 1500);
      });
    return (
      a.postMessage({ message: { type: "ping" }, port: e.port2 }, [e.port2]), r
    );
  }
  function De(a, e) {
    let r = new P(a, "bare-mux-worker");
    return (
      e &&
        it.addEventListener("message", (t) => {
          if (t.data.type === "getPort" && t.data.port) {
            console.debug("bare-mux: recieved request for port from sw");
            let o = new P(a, "bare-mux-worker");
            t.data.port.postMessage(o.port, [o.port]);
          }
        }),
      r.port
    );
  }
  var U = class {
    constructor(e) {
      (this.channel = new BroadcastChannel("bare-mux")),
        e instanceof MessagePort ? (this.port = e) : this.createChannel(e, !0);
    }
    createChannel(e, r) {
      if (self.clients)
        (this.port = A()),
          (this.channel.onmessage = (t) => {
            t.data.type === "refreshPort" && (this.port = A());
          });
      else if (e && P) {
        if (!e.startsWith("/") && !e.includes("://"))
          throw new Error(
            "Invalid URL. Must be absolute or start at the root.",
          );
        (this.port = De(e, r)),
          console.debug("bare-mux: setting localStorage bare-mux-path to", e),
          (ke["bare-mux-path"] = e);
      } else if (P) {
        let t = ke["bare-mux-path"];
        if ((console.debug("bare-mux: got localStorage bare-mux-path:", t), !t))
          throw new Error(
            "Unable to get bare-mux workerPath from localStorage.",
          );
        this.port = De(t, r);
      } else throw new Error("Unable to get a channel to the SharedWorker.");
    }
    async sendMessage(e, r) {
      this.port instanceof Promise && (this.port = await this.port);
      try {
        await Ne(this.port);
      } catch {
        return (
          console.warn(
            "bare-mux: Failed to get a ping response from the worker within 1.5s. Assuming port is dead.",
          ),
          this.createChannel(),
          await this.sendMessage(e, r)
        );
      }
      let t = new MessageChannel(),
        o = [t.port2, ...(r || [])],
        i = new Promise((n, l) => {
          t.port1.onmessage = (h) => {
            let u = h.data;
            u.type === "error" ? l(u.error) : n(u);
          };
        });
      return this.port.postMessage({ message: e, port: t.port2 }, o), await i;
    }
  };
  var g = class {
    constructor(e) {
      this.worker = new U(e);
    }
    async getTransport() {
      return (await this.worker.sendMessage({ type: "get" })).name;
    }
    async setTransport(e, r, t) {
      await this.setManualTransport(
        `
			const { default: BareTransport } = await import("${e}");
			return [BareTransport, "${e}"];
		`,
        r,
        t,
      );
    }
    async setManualTransport(e, r, t) {
      await this.worker.sendMessage(
        { type: "set", client: { function: e, args: r } },
        t,
      );
    }
    getInnerPort() {
      return this.worker.port;
    }
  };
  var W = class extends Re.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.Worker = this.window.Worker || {}),
          (this.Worklet = this.window.Worklet || {}),
          (this.workletProto = this.Worklet.prototype || {}),
          (this.workerProto = this.Worker.prototype || {}),
          (this.postMessage = this.workerProto.postMessage),
          (this.terminate = this.workerProto.terminate),
          (this.addModule = this.workletProto.addModule);
      }
      overrideWorker() {
        this.ctx.override(
          this.window,
          "Worker",
          (e, r, t) => {
            if (!t.length) return new e(...t);
            let [o, i = {}] = t,
              n = new s({ url: o, options: i }, e, r);
            this.emit("worker", n);
            let l;
            n.intercepted
              ? (l = n.returnValue)
              : (l = new n.target(n.data.url, n.data.options));
            let h = new g();
            return (
              (async () => {
                let u = await h.getInnerPort();
                l.postMessage(u, [u]);
              })(),
              l
            );
          },
          !0,
        );
      }
      overrideAddModule() {
        this.ctx.override(this.workletProto, "addModule", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o, i = {}] = t,
            n = new s({ url: o, options: i }, e, r);
          return (
            this.emit("addModule", n),
            n.intercepted
              ? n.returnValue
              : n.target.call(n.that, n.data.url, n.data.options)
          );
        });
      }
      overridePostMessage() {
        this.ctx.override(this.workerProto, "postMessage", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o, i = []] = t,
            n = new s({ message: o, transfer: i }, e, r);
          return (
            this.emit("postMessage", n),
            n.intercepted
              ? n.returnValue
              : n.target.call(n.that, n.data.message, n.data.transfer)
          );
        });
      }
      overrideImportScripts() {
        this.ctx.override(this.window, "importScripts", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let o = new s({ scripts: t }, e, r);
          return (
            this.emit("importScripts", o),
            o.intercepted
              ? o.returnValue
              : o.target.apply(o.that, o.data.scripts)
          );
        });
      }
    },
    Ve = W;
  var Ce = p(d(), 1);
  var j = class extends Ce.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = this.ctx.window),
          (this.URL = this.window.URL || {}),
          (this.createObjectURL = this.URL.createObjectURL),
          (this.revokeObjectURL = this.URL.revokeObjectURL);
      }
      overrideObjectURL() {
        this.ctx.override(this.URL, "createObjectURL", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o] = t,
            i = new s({ object: o }, e, r);
          return (
            this.emit("createObjectURL", i),
            i.intercepted ? i.returnValue : i.target.call(i.that, i.data.object)
          );
        }),
          this.ctx.override(this.URL, "revokeObjectURL", (e, r, t) => {
            if (!t.length) return e.apply(r, t);
            let [o] = t,
              i = new s({ url: o }, e, r);
            return (
              this.emit("revokeObjectURL", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.url)
            );
          });
      }
    },
    Ie = j;
  var Fe = p(d(), 1);
  var Te = p(d(), 1);
  var q = class extends Te.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.localStorage = this.window.localStorage || null),
          (this.sessionStorage = this.window.sessionStorage || null),
          (this.Storage = this.window.Storage || {}),
          (this.storeProto = this.Storage.prototype || {}),
          (this.getItem = this.storeProto.getItem || null),
          (this.setItem = this.storeProto.setItem || null),
          (this.removeItem = this.storeProto.removeItem || null),
          (this.clear = this.storeProto.clear || null),
          (this.key = this.storeProto.key || null),
          (this.methods = ["key", "getItem", "setItem", "removeItem", "clear"]),
          (this.wrappers = new e.nativeMethods.Map());
      }
      overrideMethods() {
        this.ctx.override(this.storeProto, "getItem", (e, r, t) => {
          if (!t.length) return e.apply(this.wrappers.get(r) || r, t);
          let [o] = t,
            i = new s({ name: o }, e, this.wrappers.get(r) || r);
          return (
            this.emit("getItem", i),
            i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
          );
        }),
          this.ctx.override(this.storeProto, "setItem", (e, r, t) => {
            if (2 > t.length) return e.apply(this.wrappers.get(r) || r, t);
            let [o, i] = t,
              n = new s({ name: o, value: i }, e, this.wrappers.get(r) || r);
            return (
              this.emit("setItem", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.name, n.data.value)
            );
          }),
          this.ctx.override(this.storeProto, "removeItem", (e, r, t) => {
            if (!t.length) return e.apply(this.wrappers.get(r) || r, t);
            let [o] = t,
              i = new s({ name: o }, e, this.wrappers.get(r) || r);
            return (
              this.emit("removeItem", i),
              i.intercepted ? i.returnValue : i.target.call(i.that, i.data.name)
            );
          }),
          this.ctx.override(this.storeProto, "clear", (e, r) => {
            let t = new s(null, e, this.wrappers.get(r) || r);
            return (
              this.emit("clear", t),
              t.intercepted ? t.returnValue : t.target.call(t.that)
            );
          }),
          this.ctx.override(this.storeProto, "key", (e, r, t) => {
            if (!t.length) return e.apply(this.wrappers.get(r) || r, t);
            let [o] = t,
              i = new s({ index: o }, e, this.wrappers.get(r) || r);
            return (
              this.emit("key", i),
              i.intercepted
                ? i.returnValue
                : i.target.call(i.that, i.data.index)
            );
          });
      }
      overrideLength() {
        this.ctx.overrideDescriptor(this.storeProto, "length", {
          get: (e, r) => {
            let t = new s(
              { length: e.call(this.wrappers.get(r) || r) },
              e,
              this.wrappers.get(r) || r,
            );
            return (
              this.emit("length", t),
              t.intercepted ? t.returnValue : t.data.length
            );
          },
        });
      }
      emulate(e, r = {}) {
        this.ctx.nativeMethods.setPrototypeOf(r, this.storeProto);
        let t = new this.ctx.window.Proxy(r, {
          get: (o, i) => {
            if (i in this.storeProto || typeof i == "symbol") return e[i];
            let n = new s({ name: i }, null, e);
            return (
              this.emit("get", n),
              n.intercepted ? n.returnValue : e[n.data.name]
            );
          },
          set: (o, i, n) => {
            if (i in this.storeProto || typeof i == "symbol") return (e[i] = n);
            let l = new s({ name: i, value: n }, null, e);
            return (
              this.emit("set", l),
              l.intercepted ? l.returnValue : (e[l.data.name] = l.data.value)
            );
          },
          deleteProperty: (o, i) => {
            if (typeof i == "symbol") return delete e[i];
            let n = new s({ name: i }, null, e);
            return (
              this.emit("delete", n),
              n.intercepted ? n.returnValue : delete e[n.data.name]
            );
          },
        });
        return (
          this.wrappers.set(t, e),
          this.ctx.nativeMethods.setPrototypeOf(t, this.storeProto),
          t
        );
      }
    },
    He = q;
  var Ae = p(d(), 1);
  var _ = class extends Ae.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.CSSStyleDeclaration = this.window.CSSStyleDeclaration || {}),
          (this.cssStyleProto = this.CSSStyleDeclaration.prototype || {}),
          (this.getPropertyValue = this.cssStyleProto.getPropertyValue || null),
          (this.setProperty = this.cssStyleProto.setProperty || null),
          this.cssText -
            e.nativeMethods.getOwnPropertyDescriptors(
              this.cssStyleProto,
              "cssText",
            ),
          (this.urlProps = [
            "background",
            "backgroundImage",
            "borderImage",
            "borderImageSource",
            "listStyle",
            "listStyleImage",
            "cursor",
          ]),
          (this.dashedUrlProps = [
            "background",
            "background-image",
            "border-image",
            "border-image-source",
            "list-style",
            "list-style-image",
            "cursor",
          ]),
          (this.propToDashed = {
            background: "background",
            backgroundImage: "background-image",
            borderImage: "border-image",
            borderImageSource: "border-image-source",
            listStyle: "list-style",
            listStyleImage: "list-style-image",
            cursor: "cursor",
          });
      }
      overrideSetGetProperty() {
        this.ctx.override(this.cssStyleProto, "getPropertyValue", (e, r, t) => {
          if (!t.length) return e.apply(r, t);
          let [o] = t,
            i = new s({ property: o }, e, r);
          return (
            this.emit("getPropertyValue", i),
            i.intercepted
              ? i.returnValue
              : i.target.call(i.that, i.data.property)
          );
        }),
          this.ctx.override(this.cssStyleProto, "setProperty", (e, r, t) => {
            if (2 > t.length) return e.apply(r, t);
            let [o, i] = t,
              n = new s({ property: o, value: i }, e, r);
            return (
              this.emit("setProperty", n),
              n.intercepted
                ? n.returnValue
                : n.target.call(n.that, n.data.property, n.data.value)
            );
          });
      }
      overrideCssText() {
        this.ctx.overrideDescriptor(this.cssStyleProto, "cssText", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("getCssText", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
          set: (e, r, [t]) => {
            let o = new s({ value: t }, e, r);
            return (
              this.emit("setCssText", o),
              o.intercepted
                ? o.returnValue
                : o.target.call(o.that, o.data.value)
            );
          },
        });
      }
    },
    Ue = _;
  var We = p(d(), 1);
  var F = class extends We.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = this.ctx.window),
          (this.IDBDatabase = this.window.IDBDatabase || {}),
          (this.idbDatabaseProto = this.IDBDatabase.prototype || {}),
          (this.IDBFactory = this.window.IDBFactory || {}),
          (this.idbFactoryProto = this.IDBFactory.prototype || {}),
          (this.open = this.idbFactoryProto.open);
      }
      overrideOpen() {
        this.ctx.override(this.IDBFactory.prototype, "open", (e, r, t) => {
          if (!t.length || !t.length) return e.apply(r, t);
          let [o, i] = t,
            n = new s({ name: o, version: i }, e, r);
          return (
            this.emit("idbFactoryOpen", n),
            n.intercepted
              ? n.returnValue
              : n.target.call(n.that, n.data.name, n.data.version)
          );
        });
      }
      overrideName() {
        this.ctx.overrideDescriptor(this.idbDatabaseProto, "name", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return (
              this.emit("idbFactoryName", t),
              t.intercepted ? t.returnValue : t.data.value
            );
          },
        });
      }
    },
    je = F;
  var qe = p(d(), 1);
  var G = class extends qe.default {
      constructor(e) {
        super(),
          (this.ctx = e),
          (this.window = e.window),
          (this.WebSocket = this.window.WebSocket || {}),
          (this.wsProto = this.WebSocket.prototype || {}),
          (this.url = e.nativeMethods.getOwnPropertyDescriptor(
            this.wsProto,
            "url",
          )),
          (this.protocol = e.nativeMethods.getOwnPropertyDescriptor(
            this.wsProto,
            "protocol",
          )),
          (this.readyState = e.nativeMethods.getOwnPropertyDescriptor(
            this.wsProto,
            "readyState",
          )),
          (this.send = this.wsProto.send),
          (this.CONNECTING = WebSocket.CONNECTING),
          (this.OPEN = WebSocket.OPEN),
          (this.CLOSING = WebSocket.CLOSING),
          (this.CLOSED = WebSocket.CLOSED);
      }
      overrideWebSocket() {
        this.ctx.override(
          this.window,
          "WebSocket",
          (e, r, t) => {
            if (!t.length) return new e(...t);
            let o = new s({ args: t }, e, r);
            return (
              this.emit("websocket", o),
              o.intercepted
                ? o.returnValue
                : new o.target(o.data.url, o.data.protocols)
            );
          },
          !0,
        ),
          (this.window.WebSocket.CONNECTING = this.CONNECTING),
          (this.window.WebSocket.OPEN = this.OPEN),
          (this.window.WebSocket.CLOSING = this.CLOSING),
          (this.window.WebSocket.CLOSED = this.CLOSED);
      }
      overrideURL() {
        this.ctx.overrideDescriptor(this.wsProto, "url", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return this.emit("url", t), t.data.value;
          },
        });
      }
      overrideProtocol() {
        this.ctx.overrideDescriptor(this.wsProto, "protocol", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return this.emit("protocol", t), t.data.value;
          },
        });
      }
      overrideReadyState() {
        this.ctx.overrideDescriptor(this.wsProto, "readyState", {
          get: (e, r) => {
            let t = new s({ value: e.call(r) }, e, r);
            return this.emit("readyState", t), t.data.value;
          },
        });
      }
      overrideSend() {
        this.ctx.override(this.wsProto, "send", (e, r, t) => {
          let o = new s({ args: t }, e, r);
          return (
            this.emit("send", o),
            o.intercepted ? o.returnValue : o.target.call(o.that, o.data.args)
          );
        });
      }
    },
    _e = G;
  var b = class extends Fe.default {
      constructor(e = self, r, t = !e.window) {
        super(),
          (this.window = e),
          (this.nativeMethods = {
            fnToString: this.window.Function.prototype.toString,
            defineProperty: this.window.Object.defineProperty,
            getOwnPropertyDescriptor:
              this.window.Object.getOwnPropertyDescriptor,
            getOwnPropertyDescriptors:
              this.window.Object.getOwnPropertyDescriptors,
            getOwnPropertyNames: this.window.Object.getOwnPropertyNames,
            keys: this.window.Object.keys,
            getOwnPropertySymbols: this.window.Object.getOwnPropertySymbols,
            isArray: this.window.Array.isArray,
            setPrototypeOf: this.window.Object.setPrototypeOf,
            isExtensible: this.window.Object.isExtensible,
            Map: this.window.Map,
            Proxy: this.window.Proxy,
          }),
          (this.worker = t),
          (this.bareClient = r),
          (this.fetch = new me(this)),
          (this.xhr = new we(this)),
          (this.idb = new je(this)),
          (this.history = new be(this)),
          (this.element = new ne(this)),
          (this.node = new ae(this)),
          (this.document = new ie(this)),
          (this.function = new ce(this)),
          (this.object = new pe(this)),
          (this.websocket = new _e(this)),
          (this.message = new Oe(this)),
          (this.navigator = new Le(this)),
          (this.eventSource = new Pe(this)),
          (this.attribute = new he(this)),
          (this.url = new Ie(this)),
          (this.workers = new Ve(this)),
          (this.location = new Se(this)),
          (this.storage = new He(this)),
          (this.style = new Ue(this));
      }
      override(e, r, t, o) {
        let i = this.wrap(e, r, t, o);
        return (e[r] = i), i;
      }
      overrideDescriptor(e, r, t = {}) {
        let o = this.wrapDescriptor(e, r, t);
        return o ? (this.nativeMethods.defineProperty(e, r, o), o) : {};
      }
      wrap(e, r, t, o = !1) {
        let i = e[r];
        if (!i) return i;
        let n =
          "prototype" in i
            ? function () {
                return t(i, this, [...arguments]);
              }
            : {
                attach() {
                  return t(i, this, [...arguments]);
                },
              }.attach;
        return (
          o && ((n.prototype = i.prototype), (n.prototype.constructor = n)),
          this.emit("wrap", i, n, o),
          n
        );
      }
      wrapDescriptor(e, r, t = {}) {
        let o = this.nativeMethods.getOwnPropertyDescriptor(e, r);
        if (!o) return !1;
        for (let i in t)
          i in o &&
            (i === "get" || i === "set"
              ? (o[i] = this.wrap(o, i, t[i]))
              : (o[i] = typeof t[i] == "function" ? t[i](o[i]) : t[i]));
        return o;
      }
    },
    vr = b;
  typeof self == "object" && (self.UVClient = b);
})();
//# sourceMappingURL=uv.client.js.map
