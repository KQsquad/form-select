var be = Object.defineProperty;
var _e = (t, e, r) => e in t ? be(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var c = (t, e, r) => (_e(t, typeof e != "symbol" ? e + "" : e, r), r);
function y(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Bt = typeof global == "object" && global && global.Object === Object && global, Se = typeof self == "object" && self && self.Object === Object && self, w = Bt || Se || Function("return this")(), Y = function() {
  return w.Date.now();
}, xe = /\s/;
function Ee(t) {
  for (var e = t.length; e-- && xe.test(t.charAt(e)); )
    ;
  return e;
}
var Ae = /^\s+/;
function Te(t) {
  return t && t.slice(0, Ee(t) + 1).replace(Ae, "");
}
var I = w.Symbol, qt = Object.prototype, je = qt.hasOwnProperty, we = qt.toString, M = I ? I.toStringTag : void 0;
function Ce(t) {
  var e = je.call(t, M), r = t[M];
  try {
    t[M] = void 0;
    var n = !0;
  } catch {
  }
  var i = we.call(t);
  return n && (e ? t[M] = r : delete t[M]), i;
}
var Ie = Object.prototype, $e = Ie.toString;
function Fe(t) {
  return $e.call(t);
}
var Ne = "[object Null]", Le = "[object Undefined]", Ot = I ? I.toStringTag : void 0;
function H(t) {
  return t == null ? t === void 0 ? Le : Ne : Ot && Ot in Object(t) ? Ce(t) : Fe(t);
}
function N(t) {
  return t != null && typeof t == "object";
}
var Pe = "[object Symbol]";
function K(t) {
  return typeof t == "symbol" || N(t) && H(t) == Pe;
}
var vt = NaN, Me = /^[-+]0x[0-9a-f]+$/i, Re = /^0b[01]+$/i, Ue = /^0o[0-7]+$/i, De = parseInt;
function yt(t) {
  if (typeof t == "number")
    return t;
  if (K(t))
    return vt;
  if (y(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = y(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Te(t);
  var r = Re.test(t);
  return r || Ue.test(t) ? De(t.slice(2), r ? 2 : 8) : Me.test(t) ? vt : +t;
}
var He = "Expected a function", Be = Math.max, qe = Math.min;
function ze(t, e, r) {
  var n, i, s, o, a, l, d = 0, p = !1, g = !1, A = !0;
  if (typeof t != "function")
    throw new TypeError(He);
  e = yt(e) || 0, y(r) && (p = !!r.leading, g = "maxWait" in r, s = g ? Be(yt(r.maxWait) || 0, e) : s, A = "trailing" in r ? !!r.trailing : A);
  function T(h) {
    var S = n, P = i;
    return n = i = void 0, d = h, o = t.apply(P, S), o;
  }
  function B(h) {
    return d = h, a = setTimeout(q, e), p ? T(h) : o;
  }
  function Oe(h) {
    var S = h - l, P = h - d, mt = e - S;
    return g ? qe(mt, s - P) : mt;
  }
  function pt(h) {
    var S = h - l, P = h - d;
    return l === void 0 || S >= e || S < 0 || g && P >= s;
  }
  function q() {
    var h = Y();
    if (pt(h))
      return gt(h);
    a = setTimeout(q, Oe(h));
  }
  function gt(h) {
    return a = void 0, A && n ? T(h) : (n = i = void 0, o);
  }
  function ve() {
    a !== void 0 && clearTimeout(a), d = 0, n = l = i = a = void 0;
  }
  function ye() {
    return a === void 0 ? o : gt(Y());
  }
  function k() {
    var h = Y(), S = pt(h);
    if (n = arguments, i = this, l = h, S) {
      if (a === void 0)
        return B(l);
      if (g)
        return clearTimeout(a), a = setTimeout(q, e), T(l);
    }
    return a === void 0 && (a = setTimeout(q, e)), o;
  }
  return k.cancel = ve, k.flush = ye, k;
}
var $ = Array.isArray, Ve = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ke = /^\w*$/;
function Ge(t, e) {
  if ($(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || K(t) ? !0 : Ke.test(t) || !Ve.test(t) || e != null && t in Object(e);
}
var We = "[object AsyncFunction]", Je = "[object Function]", Xe = "[object GeneratorFunction]", ke = "[object Proxy]";
function at(t) {
  if (!y(t))
    return !1;
  var e = H(t);
  return e == Je || e == Xe || e == We || e == ke;
}
var Z = w["__core-js_shared__"], bt = function() {
  var t = /[^.]+$/.exec(Z && Z.keys && Z.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ye(t) {
  return !!bt && bt in t;
}
var Ze = Function.prototype, Qe = Ze.toString;
function tr(t) {
  if (t != null) {
    try {
      return Qe.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var er = /[\\^$.*+?()[\]{}|]/g, rr = /^\[object .+?Constructor\]$/, nr = Function.prototype, ir = Object.prototype, sr = nr.toString, or = ir.hasOwnProperty, ar = RegExp(
  "^" + sr.call(or).replace(er, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function cr(t) {
  if (!y(t) || Ye(t))
    return !1;
  var e = at(t) ? ar : rr;
  return e.test(tr(t));
}
function lr(t, e) {
  return t == null ? void 0 : t[e];
}
function ct(t, e) {
  var r = lr(t, e);
  return cr(r) ? r : void 0;
}
var U = ct(Object, "create");
function ur() {
  this.__data__ = U ? U(null) : {}, this.size = 0;
}
function fr(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var hr = "__lodash_hash_undefined__", dr = Object.prototype, pr = dr.hasOwnProperty;
function gr(t) {
  var e = this.__data__;
  if (U) {
    var r = e[t];
    return r === hr ? void 0 : r;
  }
  return pr.call(e, t) ? e[t] : void 0;
}
var mr = Object.prototype, Or = mr.hasOwnProperty;
function vr(t) {
  var e = this.__data__;
  return U ? e[t] !== void 0 : Or.call(e, t);
}
var yr = "__lodash_hash_undefined__";
function br(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = U && e === void 0 ? yr : e, this;
}
function j(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
j.prototype.clear = ur;
j.prototype.delete = fr;
j.prototype.get = gr;
j.prototype.has = vr;
j.prototype.set = br;
function _r() {
  this.__data__ = [], this.size = 0;
}
function G(t, e) {
  return t === e || t !== t && e !== e;
}
function W(t, e) {
  for (var r = t.length; r--; )
    if (G(t[r][0], e))
      return r;
  return -1;
}
var Sr = Array.prototype, xr = Sr.splice;
function Er(t) {
  var e = this.__data__, r = W(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : xr.call(e, r, 1), --this.size, !0;
}
function Ar(t) {
  var e = this.__data__, r = W(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function Tr(t) {
  return W(this.__data__, t) > -1;
}
function jr(t, e) {
  var r = this.__data__, n = W(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function _(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
_.prototype.clear = _r;
_.prototype.delete = Er;
_.prototype.get = Ar;
_.prototype.has = Tr;
_.prototype.set = jr;
var zt = ct(w, "Map");
function wr() {
  this.size = 0, this.__data__ = {
    hash: new j(),
    map: new (zt || _)(),
    string: new j()
  };
}
function Cr(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function J(t, e) {
  var r = t.__data__;
  return Cr(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function Ir(t) {
  var e = J(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function $r(t) {
  return J(this, t).get(t);
}
function Fr(t) {
  return J(this, t).has(t);
}
function Nr(t, e) {
  var r = J(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function E(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
E.prototype.clear = wr;
E.prototype.delete = Ir;
E.prototype.get = $r;
E.prototype.has = Fr;
E.prototype.set = Nr;
var Lr = "Expected a function";
function lt(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Lr);
  var r = function() {
    var n = arguments, i = e ? e.apply(this, n) : n[0], s = r.cache;
    if (s.has(i))
      return s.get(i);
    var o = t.apply(this, n);
    return r.cache = s.set(i, o) || s, o;
  };
  return r.cache = new (lt.Cache || E)(), r;
}
lt.Cache = E;
var Pr = 500;
function Mr(t) {
  var e = lt(t, function(n) {
    return r.size === Pr && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Rr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ur = /\\(\\)?/g, Dr = Mr(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Rr, function(r, n, i, s) {
    e.push(i ? s.replace(Ur, "$1") : n || r);
  }), e;
});
function Hr(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n; )
    i[r] = e(t[r], r, t);
  return i;
}
var Br = 1 / 0, _t = I ? I.prototype : void 0, St = _t ? _t.toString : void 0;
function Vt(t) {
  if (typeof t == "string")
    return t;
  if ($(t))
    return Hr(t, Vt) + "";
  if (K(t))
    return St ? St.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Br ? "-0" : e;
}
function qr(t) {
  return t == null ? "" : Vt(t);
}
function zr(t, e) {
  return $(t) ? t : Ge(t, e) ? [t] : Dr(qr(t));
}
var Vr = 1 / 0;
function Kr(t) {
  if (typeof t == "string" || K(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Vr ? "-0" : e;
}
function Gr(t, e) {
  e = zr(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[Kr(e[r++])];
  return r && r == n ? t : void 0;
}
function Q(t, e, r) {
  var n = t == null ? void 0 : Gr(t, e);
  return n === void 0 ? r : n;
}
const Kt = "%[a-f0-9]{2}", xt = new RegExp("(" + Kt + ")|([^%]+?)", "gi"), Et = new RegExp("(" + Kt + ")+", "gi");
function et(t, e) {
  try {
    return [decodeURIComponent(t.join(""))];
  } catch {
  }
  if (t.length === 1)
    return t;
  e = e || 1;
  const r = t.slice(0, e), n = t.slice(e);
  return Array.prototype.concat.call([], et(r), et(n));
}
function Wr(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    let e = t.match(xt) || [];
    for (let r = 1; r < e.length; r++)
      t = et(e, r).join(""), e = t.match(xt) || [];
    return t;
  }
}
function Jr(t) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let r = Et.exec(t);
  for (; r; ) {
    try {
      e[r[0]] = decodeURIComponent(r[0]);
    } catch {
      const i = Wr(r[0]);
      i !== r[0] && (e[r[0]] = i);
    }
    r = Et.exec(t);
  }
  e["%C2"] = "�";
  const n = Object.keys(e);
  for (const i of n)
    t = t.replace(new RegExp(i, "g"), e[i]);
  return t;
}
function Xr(t) {
  if (typeof t != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof t + "`");
  try {
    return decodeURIComponent(t);
  } catch {
    return Jr(t);
  }
}
function Gt(t, e) {
  if (!(typeof t == "string" && typeof e == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (t === "" || e === "")
    return [];
  const r = t.indexOf(e);
  return r === -1 ? [] : [
    t.slice(0, r),
    t.slice(r + e.length)
  ];
}
function kr(t, e) {
  const r = {};
  if (Array.isArray(e))
    for (const n of e) {
      const i = Object.getOwnPropertyDescriptor(t, n);
      i != null && i.enumerable && Object.defineProperty(r, n, i);
    }
  else
    for (const n of Reflect.ownKeys(t)) {
      const i = Object.getOwnPropertyDescriptor(t, n);
      if (i.enumerable) {
        const s = t[n];
        e(n, s, t) && Object.defineProperty(r, n, i);
      }
    }
  return r;
}
const Yr = (t) => t == null, Zr = (t) => encodeURIComponent(t).replaceAll(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), rt = Symbol("encodeFragmentIdentifier");
function Qr(t) {
  switch (t.arrayFormat) {
    case "index":
      return (e) => (r, n) => {
        const i = r.length;
        return n === void 0 || t.skipNull && n === null || t.skipEmptyString && n === "" ? r : n === null ? [
          ...r,
          [f(e, t), "[", i, "]"].join("")
        ] : [
          ...r,
          [f(e, t), "[", f(i, t), "]=", f(n, t)].join("")
        ];
      };
    case "bracket":
      return (e) => (r, n) => n === void 0 || t.skipNull && n === null || t.skipEmptyString && n === "" ? r : n === null ? [
        ...r,
        [f(e, t), "[]"].join("")
      ] : [
        ...r,
        [f(e, t), "[]=", f(n, t)].join("")
      ];
    case "colon-list-separator":
      return (e) => (r, n) => n === void 0 || t.skipNull && n === null || t.skipEmptyString && n === "" ? r : n === null ? [
        ...r,
        [f(e, t), ":list="].join("")
      ] : [
        ...r,
        [f(e, t), ":list=", f(n, t)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = t.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (r) => (n, i) => i === void 0 || t.skipNull && i === null || t.skipEmptyString && i === "" ? n : (i = i === null ? "" : i, n.length === 0 ? [[f(r, t), e, f(i, t)].join("")] : [[n, f(i, t)].join(t.arrayFormatSeparator)]);
    }
    default:
      return (e) => (r, n) => n === void 0 || t.skipNull && n === null || t.skipEmptyString && n === "" ? r : n === null ? [
        ...r,
        f(e, t)
      ] : [
        ...r,
        [f(e, t), "=", f(n, t)].join("")
      ];
  }
}
function tn(t) {
  let e;
  switch (t.arrayFormat) {
    case "index":
      return (r, n, i) => {
        if (e = /\[(\d*)]$/.exec(r), r = r.replace(/\[\d*]$/, ""), !e) {
          i[r] = n;
          return;
        }
        i[r] === void 0 && (i[r] = {}), i[r][e[1]] = n;
      };
    case "bracket":
      return (r, n, i) => {
        if (e = /(\[])$/.exec(r), r = r.replace(/\[]$/, ""), !e) {
          i[r] = n;
          return;
        }
        if (i[r] === void 0) {
          i[r] = [n];
          return;
        }
        i[r] = [...i[r], n];
      };
    case "colon-list-separator":
      return (r, n, i) => {
        if (e = /(:list)$/.exec(r), r = r.replace(/:list$/, ""), !e) {
          i[r] = n;
          return;
        }
        if (i[r] === void 0) {
          i[r] = [n];
          return;
        }
        i[r] = [...i[r], n];
      };
    case "comma":
    case "separator":
      return (r, n, i) => {
        const s = typeof n == "string" && n.includes(t.arrayFormatSeparator), o = typeof n == "string" && !s && b(n, t).includes(t.arrayFormatSeparator);
        n = o ? b(n, t) : n;
        const a = s || o ? n.split(t.arrayFormatSeparator).map((l) => b(l, t)) : n === null ? n : b(n, t);
        i[r] = a;
      };
    case "bracket-separator":
      return (r, n, i) => {
        const s = /(\[])$/.test(r);
        if (r = r.replace(/\[]$/, ""), !s) {
          i[r] = n && b(n, t);
          return;
        }
        const o = n === null ? [] : n.split(t.arrayFormatSeparator).map((a) => b(a, t));
        if (i[r] === void 0) {
          i[r] = o;
          return;
        }
        i[r] = [...i[r], ...o];
      };
    default:
      return (r, n, i) => {
        if (i[r] === void 0) {
          i[r] = n;
          return;
        }
        i[r] = [...[i[r]].flat(), n];
      };
  }
}
function Wt(t) {
  if (typeof t != "string" || t.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function f(t, e) {
  return e.encode ? e.strict ? Zr(t) : encodeURIComponent(t) : t;
}
function b(t, e) {
  return e.decode ? Xr(t) : t;
}
function Jt(t) {
  return Array.isArray(t) ? t.sort() : typeof t == "object" ? Jt(Object.keys(t)).sort((e, r) => Number(e) - Number(r)).map((e) => t[e]) : t;
}
function Xt(t) {
  const e = t.indexOf("#");
  return e !== -1 && (t = t.slice(0, e)), t;
}
function en(t) {
  let e = "";
  const r = t.indexOf("#");
  return r !== -1 && (e = t.slice(r)), e;
}
function At(t, e) {
  return e.parseNumbers && !Number.isNaN(Number(t)) && typeof t == "string" && t.trim() !== "" ? t = Number(t) : e.parseBooleans && t !== null && (t.toLowerCase() === "true" || t.toLowerCase() === "false") && (t = t.toLowerCase() === "true"), t;
}
function ut(t) {
  t = Xt(t);
  const e = t.indexOf("?");
  return e === -1 ? "" : t.slice(e + 1);
}
function ft(t, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, Wt(e.arrayFormatSeparator);
  const r = tn(e), n = /* @__PURE__ */ Object.create(null);
  if (typeof t != "string" || (t = t.trim().replace(/^[?#&]/, ""), !t))
    return n;
  for (const i of t.split("&")) {
    if (i === "")
      continue;
    const s = e.decode ? i.replaceAll("+", " ") : i;
    let [o, a] = Gt(s, "=");
    o === void 0 && (o = s), a = a === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? a : b(a, e), r(b(o, e), a, n);
  }
  for (const [i, s] of Object.entries(n))
    if (typeof s == "object" && s !== null)
      for (const [o, a] of Object.entries(s))
        s[o] = At(a, e);
    else
      n[i] = At(s, e);
  return e.sort === !1 ? n : (e.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(e.sort)).reduce((i, s) => {
    const o = n[s];
    return i[s] = o && typeof o == "object" && !Array.isArray(o) ? Jt(o) : o, i;
  }, /* @__PURE__ */ Object.create(null));
}
function kt(t, e) {
  if (!t)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, Wt(e.arrayFormatSeparator);
  const r = (o) => e.skipNull && Yr(t[o]) || e.skipEmptyString && t[o] === "", n = Qr(e), i = {};
  for (const [o, a] of Object.entries(t))
    r(o) || (i[o] = a);
  const s = Object.keys(i);
  return e.sort !== !1 && s.sort(e.sort), s.map((o) => {
    const a = t[o];
    return a === void 0 ? "" : a === null ? f(o, e) : Array.isArray(a) ? a.length === 0 && e.arrayFormat === "bracket-separator" ? f(o, e) + "[]" : a.reduce(n(o), []).join("&") : f(o, e) + "=" + f(a, e);
  }).filter((o) => o.length > 0).join("&");
}
function Yt(t, e) {
  var i;
  e = {
    decode: !0,
    ...e
  };
  let [r, n] = Gt(t, "#");
  return r === void 0 && (r = t), {
    url: ((i = r == null ? void 0 : r.split("?")) == null ? void 0 : i[0]) ?? "",
    query: ft(ut(t), e),
    ...e && e.parseFragmentIdentifier && n ? { fragmentIdentifier: b(n, e) } : {}
  };
}
function Zt(t, e) {
  e = {
    encode: !0,
    strict: !0,
    [rt]: !0,
    ...e
  };
  const r = Xt(t.url).split("?")[0] || "", n = ut(t.url), i = {
    ...ft(n, { sort: !1 }),
    ...t.query
  };
  let s = kt(i, e);
  s && (s = `?${s}`);
  let o = en(t.url);
  if (typeof t.fragmentIdentifier == "string") {
    const a = new URL(r);
    a.hash = t.fragmentIdentifier, o = e[rt] ? a.hash : `#${t.fragmentIdentifier}`;
  }
  return `${r}${s}${o}`;
}
function Qt(t, e, r) {
  r = {
    parseFragmentIdentifier: !0,
    [rt]: !1,
    ...r
  };
  const { url: n, query: i, fragmentIdentifier: s } = Yt(t, r);
  return Zt({
    url: n,
    query: kr(i, e),
    fragmentIdentifier: s
  }, r);
}
function rn(t, e, r) {
  const n = Array.isArray(e) ? (i) => !e.includes(i) : (i, s) => !e(i, s);
  return Qt(t, n, r);
}
const nn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: rn,
  extract: ut,
  parse: ft,
  parseUrl: Yt,
  pick: Qt,
  stringify: kt,
  stringifyUrl: Zt
}, Symbol.toStringTag, { value: "Module" }));
function sn() {
  this.__data__ = new _(), this.size = 0;
}
function on(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function an(t) {
  return this.__data__.get(t);
}
function cn(t) {
  return this.__data__.has(t);
}
var ln = 200;
function un(t, e) {
  var r = this.__data__;
  if (r instanceof _) {
    var n = r.__data__;
    if (!zt || n.length < ln - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new E(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function L(t) {
  var e = this.__data__ = new _(t);
  this.size = e.size;
}
L.prototype.clear = sn;
L.prototype.delete = on;
L.prototype.get = an;
L.prototype.has = cn;
L.prototype.set = un;
var z = function() {
  try {
    var t = ct(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
function ht(t, e, r) {
  e == "__proto__" && z ? z(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function nt(t, e, r) {
  (r !== void 0 && !G(t[e], r) || r === void 0 && !(e in t)) && ht(t, e, r);
}
function fn(t) {
  return function(e, r, n) {
    for (var i = -1, s = Object(e), o = n(e), a = o.length; a--; ) {
      var l = o[t ? a : ++i];
      if (r(s[l], l, s) === !1)
        break;
    }
    return e;
  };
}
var hn = fn(), te = typeof exports == "object" && exports && !exports.nodeType && exports, Tt = te && typeof module == "object" && module && !module.nodeType && module, dn = Tt && Tt.exports === te, jt = dn ? w.Buffer : void 0, wt = jt ? jt.allocUnsafe : void 0;
function pn(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = wt ? wt(r) : new t.constructor(r);
  return t.copy(n), n;
}
var Ct = w.Uint8Array;
function gn(t) {
  var e = new t.constructor(t.byteLength);
  return new Ct(e).set(new Ct(t)), e;
}
function mn(t, e) {
  var r = e ? gn(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
function On(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var It = Object.create, vn = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!y(e))
      return {};
    if (It)
      return It(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
function yn(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var bn = yn(Object.getPrototypeOf, Object);
const ee = bn;
var _n = Object.prototype;
function re(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || _n;
  return t === r;
}
function Sn(t) {
  return typeof t.constructor == "function" && !re(t) ? vn(ee(t)) : {};
}
var xn = "[object Arguments]";
function $t(t) {
  return N(t) && H(t) == xn;
}
var ne = Object.prototype, En = ne.hasOwnProperty, An = ne.propertyIsEnumerable, Tn = $t(/* @__PURE__ */ function() {
  return arguments;
}()) ? $t : function(t) {
  return N(t) && En.call(t, "callee") && !An.call(t, "callee");
};
const it = Tn;
var jn = 9007199254740991;
function ie(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= jn;
}
function dt(t) {
  return t != null && ie(t.length) && !at(t);
}
function wn(t) {
  return N(t) && dt(t);
}
function Cn() {
  return !1;
}
var se = typeof exports == "object" && exports && !exports.nodeType && exports, Ft = se && typeof module == "object" && module && !module.nodeType && module, In = Ft && Ft.exports === se, Nt = In ? w.Buffer : void 0, $n = Nt ? Nt.isBuffer : void 0, oe = $n || Cn, Fn = "[object Object]", Nn = Function.prototype, Ln = Object.prototype, ae = Nn.toString, Pn = Ln.hasOwnProperty, Mn = ae.call(Object);
function Rn(t) {
  if (!N(t) || H(t) != Fn)
    return !1;
  var e = ee(t);
  if (e === null)
    return !0;
  var r = Pn.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && ae.call(r) == Mn;
}
var Un = "[object Arguments]", Dn = "[object Array]", Hn = "[object Boolean]", Bn = "[object Date]", qn = "[object Error]", zn = "[object Function]", Vn = "[object Map]", Kn = "[object Number]", Gn = "[object Object]", Wn = "[object RegExp]", Jn = "[object Set]", Xn = "[object String]", kn = "[object WeakMap]", Yn = "[object ArrayBuffer]", Zn = "[object DataView]", Qn = "[object Float32Array]", ti = "[object Float64Array]", ei = "[object Int8Array]", ri = "[object Int16Array]", ni = "[object Int32Array]", ii = "[object Uint8Array]", si = "[object Uint8ClampedArray]", oi = "[object Uint16Array]", ai = "[object Uint32Array]", u = {};
u[Qn] = u[ti] = u[ei] = u[ri] = u[ni] = u[ii] = u[si] = u[oi] = u[ai] = !0;
u[Un] = u[Dn] = u[Yn] = u[Hn] = u[Zn] = u[Bn] = u[qn] = u[zn] = u[Vn] = u[Kn] = u[Gn] = u[Wn] = u[Jn] = u[Xn] = u[kn] = !1;
function ci(t) {
  return N(t) && ie(t.length) && !!u[H(t)];
}
function li(t) {
  return function(e) {
    return t(e);
  };
}
var ce = typeof exports == "object" && exports && !exports.nodeType && exports, R = ce && typeof module == "object" && module && !module.nodeType && module, ui = R && R.exports === ce, tt = ui && Bt.process, Lt = function() {
  try {
    var t = R && R.require && R.require("util").types;
    return t || tt && tt.binding && tt.binding("util");
  } catch {
  }
}(), Pt = Lt && Lt.isTypedArray, le = Pt ? li(Pt) : ci;
function st(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var fi = Object.prototype, hi = fi.hasOwnProperty;
function di(t, e, r) {
  var n = t[e];
  (!(hi.call(t, e) && G(n, r)) || r === void 0 && !(e in t)) && ht(t, e, r);
}
function pi(t, e, r, n) {
  var i = !r;
  r || (r = {});
  for (var s = -1, o = e.length; ++s < o; ) {
    var a = e[s], l = n ? n(r[a], t[a], a, r, t) : void 0;
    l === void 0 && (l = t[a]), i ? ht(r, a, l) : di(r, a, l);
  }
  return r;
}
function gi(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var mi = 9007199254740991, Oi = /^(?:0|[1-9]\d*)$/;
function ue(t, e) {
  var r = typeof t;
  return e = e ?? mi, !!e && (r == "number" || r != "symbol" && Oi.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var vi = Object.prototype, yi = vi.hasOwnProperty;
function bi(t, e) {
  var r = $(t), n = !r && it(t), i = !r && !n && oe(t), s = !r && !n && !i && le(t), o = r || n || i || s, a = o ? gi(t.length, String) : [], l = a.length;
  for (var d in t)
    (e || yi.call(t, d)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    ue(d, l))) && a.push(d);
  return a;
}
function _i(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var Si = Object.prototype, xi = Si.hasOwnProperty;
function Ei(t) {
  if (!y(t))
    return _i(t);
  var e = re(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !xi.call(t, n)) || r.push(n);
  return r;
}
function fe(t) {
  return dt(t) ? bi(t, !0) : Ei(t);
}
function Ai(t) {
  return pi(t, fe(t));
}
function Ti(t, e, r, n, i, s, o) {
  var a = st(t, r), l = st(e, r), d = o.get(l);
  if (d) {
    nt(t, r, d);
    return;
  }
  var p = s ? s(a, l, r + "", t, e, o) : void 0, g = p === void 0;
  if (g) {
    var A = $(l), T = !A && oe(l), B = !A && !T && le(l);
    p = l, A || T || B ? $(a) ? p = a : wn(a) ? p = On(a) : T ? (g = !1, p = pn(l, !0)) : B ? (g = !1, p = mn(l, !0)) : p = [] : Rn(l) || it(l) ? (p = a, it(a) ? p = Ai(a) : (!y(a) || at(a)) && (p = Sn(l))) : g = !1;
  }
  g && (o.set(l, p), i(p, l, n, s, o), o.delete(l)), nt(t, r, p);
}
function he(t, e, r, n, i) {
  t !== e && hn(e, function(s, o) {
    if (i || (i = new L()), y(s))
      Ti(t, e, o, r, he, n, i);
    else {
      var a = n ? n(st(t, o), s, o + "", t, e, i) : void 0;
      a === void 0 && (a = s), nt(t, o, a);
    }
  }, fe);
}
function de(t) {
  return t;
}
function ji(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, r[0]);
    case 2:
      return t.call(e, r[0], r[1]);
    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }
  return t.apply(e, r);
}
var Mt = Math.max;
function wi(t, e, r) {
  return e = Mt(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, i = -1, s = Mt(n.length - e, 0), o = Array(s); ++i < s; )
      o[i] = n[e + i];
    i = -1;
    for (var a = Array(e + 1); ++i < e; )
      a[i] = n[i];
    return a[e] = r(o), ji(t, this, a);
  };
}
function Ci(t) {
  return function() {
    return t;
  };
}
var Ii = z ? function(t, e) {
  return z(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ci(e),
    writable: !0
  });
} : de;
const $i = Ii;
var Fi = 800, Ni = 16, Li = Date.now;
function Pi(t) {
  var e = 0, r = 0;
  return function() {
    var n = Li(), i = Ni - (n - r);
    if (r = n, i > 0) {
      if (++e >= Fi)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var Mi = Pi($i);
function Ri(t, e) {
  return Mi(wi(t, e, de), t + "");
}
function Ui(t, e, r) {
  if (!y(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? dt(r) && ue(e, r.length) : n == "string" && e in r) ? G(r[e], t) : !1;
}
function Di(t) {
  return Ri(function(e, r) {
    var n = -1, i = r.length, s = i > 1 ? r[i - 1] : void 0, o = i > 2 ? r[2] : void 0;
    for (s = t.length > 3 && typeof s == "function" ? (i--, s) : void 0, o && Ui(r[0], r[1], o) && (s = i < 3 ? void 0 : s, i = 1), e = Object(e); ++n < i; ) {
      var a = r[n];
      a && t(e, a, n, s);
    }
    return e;
  });
}
var pe = Di(function(t, e, r) {
  he(t, e, r);
});
const V = class V {
  constructor(e, { config: r, params: n } = {}) {
    c(this, "hasAbortControllerApi", !0);
    c(this, "abortController");
    c(this, "abortSignal");
    c(this, "baseUrl");
    c(this, "config");
    c(this, "params");
    this.baseUrl = e, this.config = r, this.params = n;
  }
  async requestAjaxJson(e) {
    this.renewAbortController();
    const r = this.formRequestUrl(e);
    let n;
    try {
      n = await (await fetch(r, this.requestConfig)).json();
    } catch (i) {
      console.error(i);
    }
    return n;
  }
  renewAbortController() {
    var e;
    if (this.hasAbortControllerApi) {
      (e = this.abortController) == null || e.abort("Has newer request");
      try {
        const r = new AbortController();
        this.abortController = r, this.abortSignal = r.signal;
      } catch {
        this.hasAbortControllerApi = !1;
      }
    }
  }
  formRequestUrl(e) {
    const r = this.params || e ? {
      ...this.params,
      ...e
    } : null, n = r ? `?${nn.stringify(r, {
      skipNull: !0,
      skipEmptyString: !0
    })}` : "";
    return this.baseUrl + n;
  }
  get requestConfig() {
    return pe(
      {},
      this.config || {},
      V.defaultRequestConfig,
      {
        signal: this.abortSignal
      }
    );
  }
};
c(V, "defaultRequestConfig", {
  method: "get",
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  }
});
let ot = V;
class ge {
  constructor() {
    c(this, "listeners", {});
  }
  getOrCreateListenerList(e) {
    let r = this.listeners[e];
    if (r)
      return r;
    const n = /* @__PURE__ */ new Set();
    return this.listeners[e] = n, n;
  }
  multiOn(e) {
    for (const r in e)
      this.on(r, e[r]);
  }
  on(e, r) {
    this.getOrCreateListenerList(e).add(r);
  }
  off(e, r) {
    this.getOrCreateListenerList(e).delete(r);
  }
  emit(e, r) {
    this.getOrCreateListenerList(e).forEach((i) => {
      i(r);
    });
  }
}
const Hi = {
  ru: {
    clearButtonText: "Очистить",
    toggleButtonText: "Открыть/Закрыть",
    notFoundHintText: "Ничего не найдено",
    searchHintText: "Начните печатать для поиска вариантов",
    placeholderText: "Выберите..."
  },
  en: {
    clearButtonText: "Clear",
    toggleButtonText: "Toggle Open/Close",
    notFoundHintText: "Not found",
    searchHintText: "Start typing for get options",
    placeholderText: "Choose..."
  }
};
function Bi(t = "en", e) {
  const r = Hi[t];
  return e ? pe({}, r, e) : r;
}
function X(t) {
  const e = document.createElement("div");
  return e.innerHTML = t.trim(), e.firstElementChild;
}
function qi(t) {
  return typeof t == "string" ? t.trim() : t;
}
function Rt(t) {
  if (typeof t != "string")
    return t;
  const e = Number(t);
  return Number.isNaN(e) ? t : e;
}
function zi(t) {
  return Object.entries(t).reduce(
    (e, [r, n]) => ({
      ...e,
      [r]: `.${n}`
    }),
    {}
  );
}
function Vi(t, e) {
  const r = t.getBoundingClientRect(), n = e.getBoundingClientRect();
  return n.top >= r.top && n.bottom <= r.bottom;
}
function Ut(t, e) {
  !t || !e || Vi(t, e) || e.scrollIntoView({
    block: "nearest",
    behavior: "instant"
  });
}
function me(t, e) {
  return t.length === 0 || e >= t.length || e < 0;
}
function Ki(t, e) {
  if (t.length === 0)
    return null;
  let r = e + 1;
  return me(t, r) ? t[0] : t[r];
}
function Gi(t, e) {
  if (t.length === 0)
    return null;
  let r = e - 1;
  return me(t, r) ? t[t.length - 1] : t[r];
}
const C = class C {
  constructor(e, r) {
    c(this, "options", []);
    c(this, "firstFetchedOptions", []);
    c(this, "nativeOptions");
    c(this, "emitter");
    c(this, "ajax");
    c(this, "ajaxSearchId", 0);
    c(this, "ajaxSettings");
    c(this, "translation");
    c(this, "placeholder");
    c(this, "onAjaxSearch", (e) => {
      if (e) {
        this.ajaxSearchDebounced(e).catch(console.error);
        return;
      }
      this.ajaxSearchId += 1, this.ui.isLoading = !1, this.options = this.firstFetchedOptions, this.ui.options = this.firstFetchedOptions;
    });
    c(this, "ajaxSearch", async (e) => {
      this.ajaxSearchId += 1;
      const r = this.ajaxSearchId;
      this.ui.isLoading = !0;
      const n = await this.requestOptions({
        [this.ajaxSearchKey()]: e
      });
      if (r !== this.ajaxSearchId) {
        this.ui.updateHint();
        return;
      }
      this.ui.isLoading = !1, this.ui.options = n, this.options = n;
    });
    c(this, "ajaxSearchDebounced", ze(this.ajaxSearch, 350, {
      leading: !0,
      trailing: !0
    }));
    c(this, "onFilterSearch", (e) => {
      this.ui.options = this.filterOptions(e);
    });
    var n;
    this.translation = Bi(r == null ? void 0 : r.lang, r == null ? void 0 : r.translation), this.placeholder = ((n = r == null ? void 0 : r.translation) == null ? void 0 : n.placeholderText) || e.getAttribute("placeholder") || this.translation.placeholderText, this.nativeOptions = C.parseOptions(e), this.ajaxSettings = r == null ? void 0 : r.ajax, this.emitter = new ge(), r != null && r.ajax && (this.ajax = new ot(r.ajax.url, {
      config: r.ajax.config,
      params: r.ajax.params
    }));
  }
  isAjaxSearch() {
    var e;
    return ((e = this.ajaxSettings) == null ? void 0 : e.mode) === "search";
  }
  ajaxSearchKey() {
    return this.isAjaxSearch() ? this.ajaxSettings.searchKey : "";
  }
  resolveInitOptions(e) {
    var r;
    switch ((r = this.ajaxSettings) == null ? void 0 : r.mode) {
      case "fetch":
      case "search":
        this.options = [], this.requestFetchModeOptions().catch(console.error);
        break;
      case void 0:
        this.options = this.nativeOptions, this.ui.options = this.options;
        break;
    }
  }
  async requestFetchModeOptions() {
    this.ui.isLoading = !0;
    const e = await this.requestOptions();
    this.ui.isLoading = !1, this.firstFetchedOptions = e, this.options = e, this.ui.options = e;
  }
  reFetchOptions() {
    return this.ajax ? this.requestFetchModeOptions() : Promise.resolve();
  }
  initUi() {
    this.ui.options = this.options, this.ui.activeOption = this.activeOption, this.ui.emitter.multiOn({
      clear: this.clear,
      search: this.onFilterSearch,
      ajaxSearch: this.onAjaxSearch,
      "option:click": this.onOptionClick
    });
  }
  filterOptions(e) {
    const r = e.trim(), { options: n } = this;
    if (!r)
      return n;
    const i = new RegExp(r, "i");
    return n.filter((s) => i.test(s.label));
  }
  async requestOptions(e) {
    if (!this.ajax)
      return [];
    const r = await this.ajax.requestAjaxJson(e);
    return this.optionsFromJson(r);
  }
  optionsFromJson(e) {
    if (!this.ajaxSettings)
      return [];
    const {
      dataKey: r = "",
      labelKey: n = "label",
      valueKey: i = "value"
    } = this.ajaxSettings, s = r ? Q(e, r) : e;
    return Array.isArray(s) ? s.map((o) => ({
      label: qi(Q(o, n)),
      value: Rt(Q(o, i))
    })) : [];
  }
  static fromConvertableOptions(e) {
    return e === null ? [] : (Array.isArray(e) ? e.map(this.fromConvertableOption) : [this.fromConvertableOption(e)]).filter(this.isNotEmptyOption);
  }
  static stringOrOptionToOption(e) {
    switch (typeof e) {
      case "string":
      case "number":
        return {
          label: e.toString(),
          value: e
        };
      default:
        return e;
    }
  }
  static isNotEmptyOption(e) {
    return e !== null && !!(e.value.toString() && e.label);
  }
  static parseOptions(e) {
    return Array.from(e.options).map((r) => ({
      selected: r.selected,
      label: r.innerText.trim(),
      value: Rt(r.value)
    })).filter((r) => r.value);
  }
};
// Utils
c(C, "fromConvertableOption", (e) => {
  const r = e !== null ? C.stringOrOptionToOption(e) : null;
  return C.isNotEmptyOption(r) ? r : null;
});
let F = C;
const v = "f-select", m = Object.freeze({
  ROOT: `${v}`,
  INNER: `${v}__inner`,
  SEARCH: `${v}__search`,
  DROPDOWN: `${v}__dropdown`,
  CLEAR: `${v}__clear`,
  TOGGLE: `${v}__toggle`,
  LIST: `${v}__list`,
  OPTIONS: `${v}__option`,
  HINT: `${v}__hint`,
  AREA: `${v}__input-area`
}), x = Object.freeze(zi(m)), Wi = (t) => X(`
    <div class="${m.ROOT}">
        <div class="${m.INNER}">
            <div class="${m.AREA}"> 
                <input type="text" class="${m.SEARCH}" />      
            </div>
            <div class="f-select__actions">
                <button type="button" class="${m.CLEAR}" title="${t.clearButtonText}">
                    ${t.clearButtonText}
                </button>
                <button type="button" class="${m.TOGGLE}" title="${t.toggleButtonText}">
                    ${t.toggleButtonText}
                </button>      
            </div>
        </div>
        <div class="${m.DROPDOWN}">
            <div class="${m.LIST}"></div>
            <div class="${m.HINT}"></div>
        </div>
    </div>
`), Ji = (t) => X(`
    <div class="${m.OPTIONS}">${t.label}</div>
`), Xi = (t) => X(`
    <option value="${t.value}">${t.label}</option>  
`);
class O {
  static createSelectStructure(e) {
    const r = Wi(e), n = (i) => r.querySelector(i);
    return {
      root: r,
      inner: n(x.INNER),
      dropdown: n(x.DROPDOWN),
      search: n(x.SEARCH),
      clear: n(x.CLEAR),
      toggle: n(x.TOGGLE),
      list: n(x.LIST),
      options: [],
      hint: n(x.HINT),
      area: n(x.AREA)
    };
  }
  static createNativeOptionEl(e) {
    return Xi(e);
  }
  static createOptionEl(e) {
    const r = Ji(e);
    return r.dataset.option = JSON.stringify(e), r;
  }
  static getOptionData(e) {
    return JSON.parse(e.dataset.option);
  }
  static isOptionEl(e) {
    return e instanceof HTMLDivElement && !!e.dataset.option;
  }
  static removeElement(e) {
    e.remove();
  }
  static removeHTMLCollection(e) {
    Array.from(e).forEach(this.removeElement);
  }
}
function Dt(t) {
  return t === null || Array.isArray(t) && t.length === 0;
}
class D {
  constructor(e) {
    c(this, "elements");
    c(this, "emitter", new ge());
    c(this, "_options", []);
    c(this, "_renderOutdated", !0);
    c(this, "nativeSelect");
    c(this, "translation");
    c(this, "placeholder");
    c(this, "isAjaxSearch");
    c(this, "_isOpen", !1);
    c(this, "_isLoading", !1);
    c(this, "_selectedOption", null);
    c(this, "onKeydown", (e) => {
      switch (e.key) {
        case "Escape":
          this.close();
          break;
        case "Enter":
        case "NumpadEnter":
          this.makeSelectedOptionActive();
          break;
        case "ArrowUp":
          this.makePrevOptionSelected();
          break;
        case "ArrowDown":
          this.makeNextOptionSelected();
      }
    });
    // IMPORTANT: use only in updateNativeSelectValue
    // for prevent recreate function
    c(this, "addNativeSelectOption", (e) => {
      e.selected = !0, this.nativeSelect.append(e);
    });
    c(this, "createOptionEl", (e) => {
      const r = O.createOptionEl(e);
      return r.addEventListener("mouseover", this.onOptionHover), r.addEventListener("click", this.onOptionClick), r;
    });
    c(this, "onOptionHover", (e) => {
      O.isOptionEl(e.target) && (this.selectedOption = e.target);
    });
    c(this, "toggleOptionElActiveModIfNeeded", (e) => {
      this.toggleOptionElActiveMod(e, this.isOptionElNeedToBeActive(e));
    });
    c(this, "open", () => this.isOpen = !0);
    c(this, "close", () => this.isOpen = !1);
    c(this, "onClearClick", (e) => {
      e.stopPropagation(), this.emitter.emit("clear", void 0), this.close();
    });
    c(this, "onSearchInput", () => {
      this.emitSearch();
    });
    c(this, "onOptionClick", (e) => {
      if (this.selectedOption, O.isOptionEl(e.target)) {
        const r = O.getOptionData(e.target);
        this.emitter.emit("option:click", r);
      }
    });
    var r;
    this.elements = O.createSelectStructure(e.translation), this.nativeSelect = e.nativeSelect, this.translation = e.translation, this.isAjaxSearch = e.isAjaxSearch, this.placeholder = e.placeholder, this.listen(), (r = this.nativeSelect.parentNode) == null || r.insertBefore(this.elements.root, this.nativeSelect), this.elements.root.append(this.nativeSelect), this.toggleMod("_styled", !0);
  }
  set hint(e) {
    this.elements.hint.innerText = e, this.toggleMod("_hint", !!e);
  }
  get selectedOption() {
    return this._selectedOption;
  }
  set selectedOption(e) {
    var r;
    (r = this._selectedOption) == null || r.classList.remove("_selected"), e == null || e.classList.add("_selected"), this._selectedOption = e;
  }
  get selectedIdx() {
    const { selectedOption: e } = this;
    return this.elements.options.findIndex((r) => r === e);
  }
  listen() {
    const {
      inner: e,
      search: r,
      dropdown: n,
      clear: i
    } = this.elements;
    e.addEventListener("mousedown", (s) => {
      s.preventDefault();
    }), e.addEventListener("click", this.open), r.addEventListener("focus", this.open), r.addEventListener("blur", this.close), r.addEventListener("input", this.onSearchInput), i.addEventListener("click", this.onClearClick), n.addEventListener("mousedown", (s) => {
      s.preventDefault();
    });
  }
  toggleWindowListeners(e) {
    e ? window.addEventListener("keydown", this.onKeydown) : window.removeEventListener("keydown", this.onKeydown);
  }
  makeSelectedOptionActive() {
    const { selectedOption: e } = this;
    if (!e)
      return;
    if (!this.elements.options.some((n) => e === n)) {
      this.selectedOption = null;
      return;
    }
    this.emitter.emit("option:click", O.getOptionData(e));
  }
  makeNextOptionSelected() {
    this.selectedOption = Ki(this.elements.options, this.selectedIdx), Ut(this.elements.list, this.selectedOption);
  }
  makePrevOptionSelected() {
    this.selectedOption = Gi(this.elements.options, this.selectedIdx), Ut(this.elements.list, this.selectedOption);
  }
  get isLoading() {
    return this._isLoading;
  }
  updatePlaceholder(e) {
    this.elements.search.placeholder = e;
  }
  onActiveChange() {
    const { _activeOption: e } = this, r = Dt(e);
    this.toggleMod("_filled", !r);
  }
  set isLoading(e) {
    this._isLoading = e, this.toggleMod("_loading", e);
  }
  get searchValue() {
    return this.elements.search.value;
  }
  set searchValue(e) {
    this.elements.search.value = e, this.emitSearch();
  }
  get needRender() {
    return this.isOpen && this._renderOutdated;
  }
  emitSearch() {
    this.isAjaxSearch ? this.emitter.emit("ajaxSearch", this.searchValue) : this.emitter.emit("search", this.searchValue);
  }
  get isOpen() {
    return this._isOpen;
  }
  set isOpen(e) {
    e !== this._isOpen && (this._isOpen = e, this.toggleMod("_opened", e), this.toggleWindowListeners(e), e ? this.onOpened() : this.onClosed());
  }
  set options(e) {
    this._options = e, this._renderOutdated = !0, this.renderOptionEls();
  }
  updateNativeSelectValue(e) {
    if (!this.nativeSelect)
      return;
    const r = e.map(O.createNativeOptionEl);
    O.removeHTMLCollection(this.nativeSelect.options), r.forEach(this.addNativeSelectOption);
  }
  updateHint() {
    this._options.length === 0 ? this.hint = !this.searchValue && this.isAjaxSearch ? this.translation.searchHintText : this.translation.notFoundHintText : this.hint = "";
  }
  renderOptionEls(e) {
    if (!e && !this.needRender)
      return;
    if (this.destroyOptionEls(), this.elements.options = [], this._renderOutdated = !1, this._options.length === 0) {
      this.updateHint();
      return;
    }
    this.hint = "";
    const r = this.createOptionEls(this._options);
    this.elements.list.append(...r), this.elements.options = r, this.updateOptionElsActiveMod();
  }
  createOptionEls(e) {
    return e.map(this.createOptionEl);
  }
  updateOptionElsActiveMod() {
    const e = Dt(this._activeOption) ? this.removeOptionElActiveMod : this.toggleOptionElActiveModIfNeeded;
    this.elements.options.forEach(e);
  }
  removeOptionElActiveMod(e) {
    e.classList.remove(
      "_active"
      /* active */
    );
  }
  toggleOptionElActiveMod(e, r) {
    e.classList.toggle("_active", r);
  }
  destroyOptionEls() {
    this.elements.options.forEach(O.removeElement), this.elements.options = [];
  }
  onOpened() {
    this.elements.search.focus(), this.renderOptionEls();
  }
  onClosed() {
    this.elements.search.blur(), this.searchValue = "";
  }
  toggleMod(e, r) {
    this.elements.root.classList.toggle(e, r);
  }
  static isSameOption(e, r) {
    return e.label === r.label && e.value === r.value;
  }
}
class ki extends D {
  constructor(r) {
    super(r);
    c(this, "_activeOption", null);
  }
  set activeOption(r) {
    var n;
    this._activeOption = r, this.onActiveChange(), this.updateOptionElsActiveMod(), this.updateNativeSelectValue(r ? [r] : []), this.updatePlaceholder(((n = this._activeOption) == null ? void 0 : n.label) || this.placeholder);
  }
  isOptionElNeedToBeActive(r) {
    const n = O.getOptionData(r);
    return D.isSameOption(n, this._activeOption);
  }
}
class Yi extends F {
  constructor(r, n) {
    super(r, n);
    c(this, "activeOption", null);
    c(this, "ui");
    c(this, "onOptionClick", (r) => {
      this.value = r, this.ui.close();
    });
    c(this, "clear", () => {
      this.value = null;
    });
    this.ui = new ki({
      nativeSelect: r,
      translation: this.translation,
      placeholder: this.placeholder,
      isAjaxSearch: this.isAjaxSearch()
    }), this.initUi(), this.initValue(), this.resolveInitOptions(r);
  }
  initValue() {
    this.value = this.nativeOptions.find((r) => r.selected) || null;
  }
  get value() {
    var r;
    return ((r = this.activeOption) == null ? void 0 : r.value) || "";
  }
  set value(r) {
    this.activeOption = F.fromConvertableOption(r), this.ui.activeOption = this.activeOption, this.emitter.emit("change", this.value);
  }
}
const Zi = "_multiple", Qi = (t) => X(`
    <div class="f-select__active-option">
        <div class="f-select__active-option-text">                
            ${t.label}
        </div>
        <button type="button" class="f-select__active-option-close"></button>
    </div>
`);
class ts extends D {
  constructor(r) {
    super(r);
    c(this, "_activeOption", []);
    c(this, "activeOptionsEls", []);
    this.toggleMod(Zi, !0), this.updatePlaceholder(this.placeholder);
  }
  updateActiveOptionsEl() {
    this.activeOptionsEls.forEach((n) => n.remove());
    const r = this._activeOption.map(Qi);
    r.forEach((n, i) => {
      n.querySelector("button").addEventListener("click", (o) => {
        o.preventDefault(), o.stopPropagation(), this.emitter.emit("option:remove", i);
      });
    }), this.elements.area.prepend(...r), this.activeOptionsEls = r;
  }
  set activeOption(r) {
    this._activeOption = r, this.onActiveChange(), this.updateOptionElsActiveMod(), this.updateNativeSelectValue(r), this.updateActiveOptionsEl();
  }
  isOptionElNeedToBeActive(r) {
    const n = O.getOptionData(r);
    return this._activeOption.some((i) => D.isSameOption(i, n));
  }
}
class es extends F {
  constructor(r, n) {
    super(r, n);
    c(this, "activeOption", []);
    c(this, "ui");
    c(this, "onOptionClick", (r) => {
      this.toggleActiveOption(r);
    });
    c(this, "removeActiveOption", (r) => {
      const n = [...this.activeOption];
      n.splice(r, 1), this.value = n;
    });
    c(this, "clear", () => {
      this.value = [];
    });
    this.ui = new ts({
      nativeSelect: r,
      translation: this.translation,
      placeholder: this.placeholder,
      isAjaxSearch: this.isAjaxSearch()
    }), this.initUi(), this.initValue(), this.resolveInitOptions(r);
  }
  initUi() {
    super.initUi(), this.ui.emitter.on("option:remove", this.removeActiveOption);
  }
  initValue() {
    this.value = this.nativeOptions.filter((r) => r.selected);
  }
  get value() {
    return this.activeOption.map((r) => r.value);
  }
  set value(r) {
    this.activeOption = F.fromConvertableOptions(r), this.ui.activeOption = this.activeOption, this.emitter.emit("change", this.value);
  }
  findActiveOptionIdx(r) {
    return this.activeOption.findIndex((n) => D.isSameOption(n, r));
  }
  toggleActiveOption(r) {
    const n = this.findActiveOptionIdx(r);
    n === -1 ? this.addActiveOption(r) : this.removeActiveOption(n);
  }
  addActiveOption(r) {
    this.value = [...this.activeOption, r];
  }
}
const Ht = Symbol("select");
class ns {
  constructor() {
  }
  /**
   * initializes select on this element
   * @returns instance of select
   */
  static init(e, r) {
    let n = e[Ht];
    if (!n) {
      const i = e.multiple ? es : Yi;
      n = new i(e, r), e[Ht] = n;
    }
    return n;
  }
  static initAll(e = document.body, r) {
    const n = e.querySelectorAll("select");
    return Array.from(n).map((i) => this.init(i, r));
  }
}
export {
  ns as default
};
