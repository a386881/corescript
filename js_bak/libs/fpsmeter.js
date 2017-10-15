/* ! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
(function(m, j) {
    function s(a, e) {
        for (var g in e) try {
            a.style[g] = e[g]
        } catch (j) {

        }
        return a
    }

    function H(a) {
        return null == a ? String(a) : "object" === typeof a || "function" === typeof a ? Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase() || "object" : typeof a
    }

    function R(a, e) {
        if ("array" !== H(e)) return -1;
        if (e.indexOf) return e.indexOf(a);
        for (var g = 0, j = e.length; g < j; g++)
            if (e[g] === a) return g;
        return -1
    }

    function I() {
        var a = arguments,
            e;
        for (e in a[1])
            if (a[1].hasOwnProperty(e)) switch (H(a[1][e])) {
                case "object":
                    a[0][e] =
                        I({}, a[0][e], a[1][e]);
                    break;
                case "array":
                    a[0][e] = a[1][e].slice(0);
                    break;
                default:
                    a[0][e] = a[1][e]
            }
        return 2 < a.length ? I.apply(null, [a[0]].concat(Array.prototype.slice.call(a, 2))) : a[0]
    }

    function N(a) {
        a = Math.round(255 * a).toString(16);
        return 1 === a.length ? "0" + a : a
    }

    function S(a, e, g, j) {
        if (a.addEventListener) a[j ? "removeEventListener" : "addEventListener"](e, g, !1);
        else if (a.attachEvent) a[j ? "detachEvent" : "attachEvent"]("on" + e, g)
    }

    function D(a, e) {
        function g(a, b, d, c) {
            return y[0 | a][Math.round(Math.min((b - d) / (c - d) * J, J))]
        }

        function r() {
            f.legend.fps !== q && (f.legend.fps = q, f.legend[T] = q ? "FPS" : "ms");
            K = q ? b.fps : b.duration;
            f.count[T] = 999 < K ? "999+" : K.toFixed(99 < K ? 0 : d.decimals)
        }

        function m() {
            z = A();
            L < z - d.threshold && (b.fps -= b.fps / Math.max(1, 60 * d.smoothing / d.interval), b.duration = 1E3 / b.fps);
            for (c = d.history; c--;) E[c] = 0 === c ? b.fps : E[c - 1], F[c] = 0 === c ? b.duration : F[c - 1];
            r();
            if (d.heat) {
                if (w.length)
                    for (c = w.length; c--;) w[c].el.style[h[w[c].name].heatOn] = q ? g(h[w[c].name].heatmap, b.fps, 0, d.maxFps) : g(h[w[c].name].heatmap, b.duration, d.threshold,
                        0);
                if (f.graph && h.column.heatOn)
                    for (c = u.length; c--;) u[c].style[h.column.heatOn] = q ? g(h.column.heatmap, E[c], 0, d.maxFps) : g(h.column.heatmap, F[c], d.threshold, 0)
            }
            if (f.graph)
                for (p = 0; p < d.history; p++) u[p].style.height = (q ? E[p] ? Math.round(O / d.maxFps * Math.min(E[p], d.maxFps)) : 0 : F[p] ? Math.round(O / d.threshold * Math.min(F[p], d.threshold)) : 0) + "px"
        }

        function k() {
            20 > d.interval ? (x = M(k), m()) : (x = setTimeout(k, d.interval), P = M(m))
        }

        function G(a) {
            a = a || window.event;
            a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0);
            b.toggle()
        }

        function U() {
            d.toggleOn && S(f.container, d.toggleOn, G, 1);
            a.removeChild(f.container)
        }

        function V() {
            f.container && U();
            h = D.theme[d.theme];
            y = h.compiledHeatmaps || [];
            if (!y.length && h.heatmaps.length) {
                for (p = 0; p < h.heatmaps.length; p++) {
                    y[p] = [];
                    for (c = 0; c <= J; c++) {
                        var b = y[p],
                            e = c,
                            g;
                        g = 0.33 / J * c;
                        var j = h.heatmaps[p].saturation,
                            m = h.heatmaps[p].lightness,
                            n = void 0,
                            k = void 0,
                            l = void 0,
                            t = l = void 0,
                            v = n = k = void 0,
                            v = void 0,
                            l = 0.5 >= m ? m * (1 + j) : m + j - m * j;
                        0 === l ? g = "#000" : (t = 2 * m - l, k = (l - t) / l, g *= 6, n = Math.floor(g),
                            v = g - n, v *= l * k, 0 === n || 6 === n ? (n = l, k = t + v, l = t) : 1 === n ? (n = l - v, k = l, l = t) : 2 === n ? (n = t, k = l, l = t + v) : 3 === n ? (n = t, k = l - v) : 4 === n ? (n = t + v, k = t) : (n = l, k = t, l -= v), g = "#" + N(n) + N(k) + N(l));
                        b[e] = g
                    }
                }
                h.compiledHeatmaps = y
            }
            f.container = s(document.createElement("div"), h.container);
            f.count = f.container.appendChild(s(document.createElement("div"), h.count));
            f.legend = f.container.appendChild(s(document.createElement("div"), h.legend));
            f.graph = d.graph ? f.container.appendChild(s(document.createElement("div"), h.graph)) : 0;
            w.length = 0;
            for (var q in f) f[q] &&
                h[q].heatOn && w.push({
                    name: q,
                    el: f[q]
                });
            u.length = 0;
            if (f.graph) {
                f.graph.style.width = d.history * h.column.width + (d.history - 1) * h.column.spacing + "px";
                for (c = 0; c < d.history; c++) u[c] = f.graph.appendChild(s(document.createElement("div"), h.column)), u[c].style.position = "absolute", u[c].style.bottom = 0, u[c].style.right = c * h.column.width + c * h.column.spacing + "px", u[c].style.width = h.column.width + "px", u[c].style.height = "0px"
            }
            s(f.container, d);
            r();
            a.appendChild(f.container);
            f.graph && (O = f.graph.clientHeight);
            d.toggleOn && ("click" ===
                d.toggleOn && (f.container.style.cursor = "pointer"), S(f.container, d.toggleOn, G))
        }

        "object" === H(a) && a.nodeType === j && (e = a, a = document.body);
        a || (a = document.body);
        var b = this,
            d = I({}, D.defaults, e || {}),
            f = {},
            u = [],
            h, y, J = 100,
            w = [],
            W = 0,
            B = d.threshold,
            Q = 0,
            L = A() - B,
            z, E = [],
            F = [],
            x, P, q = "fps" === d.show,
            O, K, c, p;
        b.options = d;
        b.fps = 0;
        b.duration = 0;
        b.isPaused = 0;
        b.tickStart = function() {
            Q = A()
        };
        b.tick = function() {
            z = A();
            W = z - L;
            B += (W - B) / d.smoothing;
            b.fps = 1E3 / B;
            b.duration = Q < L ? B : z - Q;
            L = z
        };
        b.pause = function() {
            x && (b.isPaused = 1, clearTimeout(x),
                C(x), C(P), x = P = 0);
            return b
        };
        b.resume = function() {
            x || (b.isPaused = 0, k());
            return b
        };
        b.set = function(a, c) {
            d[a] = c;
            q = "fps" === d.show; -
            1 !== R(a, X) && V(); -
            1 !== R(a, Y) && s(f.container, d);
            return b
        };
        b.showDuration = function() {
            b.set("show", "ms");
            return b
        };
        b.showFps = function() {
            b.set("show", "fps");
            return b
        };
        b.toggle = function() {
            b.set("show", q ? "ms" : "fps");
            return b
        };
        b.hide = function() {
            b.pause();
            f.container.style.display = "none";
            return b
        };
        b.show = function() {
            b.resume();
            f.container.style.display = "block";
            return b
        };
        b.destroy = function() {
            b.pause();
            U();
            b.tick = b.tickStart = function() {}
        };
        V();
        k()
    }

    var A, r = m.performance;
    A = r && (r.now || r.webkitNow) ? r[r.now ? "now" : "webkitNow"].bind(r) : function() {
        return +new Date
    };
    for (var C = m.cancelAnimationFrame || m.cancelRequestAnimationFrame, M = m.requestAnimationFrame, r = ["moz", "webkit", "o"], G = 0, k = 0, Z = r.length; k < Z && !C; ++k) M = (C = m[r[k] + "CancelAnimationFrame"] || m[r[k] + "CancelRequestAnimationFrame"]) && m[r[k] + "RequestAnimationFrame"];
    C || (M = function(a) {
        var e = A(),
            g = Math.max(0, 16 - (e - G));
        G = e + g;
        return m.setTimeout(function() {
            a(e +
                g)
        }, g)
    }, C = function(a) {
        clearTimeout(a)
    });
    var T = "string" === H(document.createElement("div").textContent) ? "textContent" : "innerText";
    D.extend = I;
    window.FPSMeter = D;
    D.defaults = {
        interval: 100,
        smoothing: 10,
        show: "fps",
        toggleOn: "click",
        decimals: 1,
        maxFps: 60,
        threshold: 100,
        position: "absolute",
        zIndex: 10,
        left: "5px",
        top: "5px",
        right: "auto",
        bottom: "auto",
        margin: "0 0 0 0",
        theme: "dark",
        heat: 0,
        graph: 0,
        history: 20
    };
    var X = ["toggleOn", "theme", "heat", "graph", "history"],
        Y = "position zIndex left top right bottom margin".split(" ")
})(window);
(function(m, j) {
    j.theme = {};
    var s = j.theme.base = {
        heatmaps: [],
        container: {
            heatOn: null,
            heatmap: null,
            padding: "5px",
            minWidth: "95px",
            height: "30px",
            lineHeight: "30px",
            textAlign: "right",
            textShadow: "none"
        },
        count: {
            heatOn: null,
            heatmap: null,
            position: "absolute",
            top: 0,
            right: 0,
            padding: "5px 10px",
            height: "30px",
            fontSize: "24px",
            fontFamily: "Consolas, Andale Mono, monospace",
            zIndex: 2
        },
        legend: {
            heatOn: null,
            heatmap: null,
            position: "absolute",
            top: 0,
            left: 0,
            padding: "5px 10px",
            height: "30px",
            fontSize: "12px",
            lineHeight: "32px",
            fontFamily: "sans-serif",
            textAlign: "left",
            zIndex: 2
        },
        graph: {
            heatOn: null,
            heatmap: null,
            position: "relative",
            boxSizing: "padding-box",
            MozBoxSizing: "padding-box",
            height: "100%",
            zIndex: 1
        },
        column: {
            width: 4,
            spacing: 1,
            heatOn: null,
            heatmap: null
        }
    };
    j.theme.dark = j.extend({}, s, {
        heatmaps: [{
            saturation: 0.8,
            lightness: 0.8
        }],
        container: {
            background: "#222",
            color: "#fff",
            border: "1px solid #1a1a1a",
            textShadow: "1px 1px 0 #222"
        },
        count: {
            heatOn: "color"
        },
        column: {
            background: "#3f3f3f"
        }
    });
    j.theme.light = j.extend({}, s, {
        heatmaps: [{
            saturation: 0.5,
            lightness: 0.5
        }],
        container: {
            color: "#666",
            background: "#fff",
            textShadow: "1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)"
        },
        count: {
            heatOn: "color"
        },
        column: {
            background: "#eaeaea"
        }
    });
    j.theme.colorful = j.extend({}, s, {
        heatmaps: [{
            saturation: 0.5,
            lightness: 0.6
        }],
        container: {
            heatOn: "backgroundColor",
            background: "#888",
            color: "#fff",
            textShadow: "1px 1px 0 rgba(0,0,0,.2)",
            boxShadow: "0 0 0 1px rgba(0,0,0,.1)"
        },
        column: {
            background: "#777",
            backgroundColor: "rgba(0,0,0,.2)"
        }
    });
    j.theme.transparent =
        j.extend({}, s, {
            heatmaps: [{
                saturation: 0.8,
                lightness: 0.5
            }],
            container: {
                padding: 0,
                color: "#fff",
                textShadow: "1px 1px 0 rgba(0,0,0,.5)"
            },
            count: {
                padding: "0 5px",
                height: "40px",
                lineHeight: "40px"
            },
            legend: {
                padding: "0 5px",
                height: "40px",
                lineHeight: "42px"
            },
            graph: {
                height: "40px"
            },
            column: {
                width: 5,
                background: "#999",
                heatOn: "backgroundColor",
                opacity: 0.5
            }
        })
})(window, FPSMeter);