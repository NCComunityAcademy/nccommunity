/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 * var Webflow = Webflow || [];
 * Webflow.push(readyFunction);
 */
(() => {
    var u = (e, t) => () => (t || e((t = {
        exports: {}
    }).exports, t), t.exports);
    var Ts = u(() => {
        (function() {
            if (typeof window > "u") return;
            let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
                t = e ? parseInt(e[1], 10) >= 16 : !1;
            if ("objectFit" in document.documentElement.style && !t) {
                window.objectFitPolyfill = function() {
                    return !1
                };
                return
            }
            let n = function(s) {
                    let c = window.getComputedStyle(s, null),
                        p = c.getPropertyValue("position"),
                        y = c.getPropertyValue("overflow"),
                        g = c.getPropertyValue("display");
                    (!p || p === "static") && (s.style.position = "relative"), y !== "hidden" && (s.style.overflow = "hidden"), (!g || g === "inline") && (s.style.display = "block"), s.clientHeight === 0 && (s.style.height = "100%"), s.className.indexOf("object-fit-polyfill") === -1 && (s.className += " object-fit-polyfill")
                },
                i = function(s) {
                    let c = window.getComputedStyle(s, null),
                        p = {
                            "max-width": "none",
                            "max-height": "none",
                            "min-width": "0px",
                            "min-height": "0px",
                            top: "auto",
                            right: "auto",
                            bottom: "auto",
                            left: "auto",
                            "margin-top": "0px",
                            "margin-right": "0px",
                            "margin-bottom": "0px",
                            "margin-left": "0px"
                        };
                    for (let y in p) c.getPropertyValue(y) !== p[y] && (s.style[y] = p[y])
                },
                o = function(s) {
                    let c = s.parentNode;
                    n(c), i(s), s.style.position = "absolute", s.style.height = "100%", s.style.width = "auto", s.clientWidth > c.clientWidth ? (s.style.top = "0", s.style.marginTop = "0", s.style.left = "50%", s.style.marginLeft = s.clientWidth / -2 + "px") : (s.style.width = "100%", s.style.height = "auto", s.style.left = "0", s.style.marginLeft = "0", s.style.top = "50%", s.style.marginTop = s.clientHeight / -2 + "px")
                },
                a = function(s) {
                    if (typeof s > "u" || s instanceof Event) s = document.querySelectorAll("[data-object-fit]");
                    else if (s && s.nodeName) s = [s];
                    else if (typeof s == "object" && s.length && s[0].nodeName) s = s;
                    else return !1;
                    for (let c = 0; c < s.length; c++) {
                        if (!s[c].nodeName) continue;
                        let p = s[c].nodeName.toLowerCase();
                        if (p === "img") {
                            if (t) continue;
                            s[c].complete ? o(s[c]) : s[c].addEventListener("load", function() {
                                o(this)
                            })
                        } else p === "video" ? s[c].readyState > 0 ? o(s[c]) : s[c].addEventListener("loadedmetadata", function() {
                            o(this)
                        }) : o(s[c])
                    }
                    return !0
                };
            document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", a) : a(), window.addEventListener("resize", a), window.objectFitPolyfill = a
        })()
    });
    var Os = u(() => {
        (function() {
            if (typeof window > "u") return;

            function e(n) {
                Webflow.env("design") || ($("video").each(function() {
                    n && $(this).prop("autoplay") ? this.play() : this.pause()
                }), $(".w-background-video--control").each(function() {
                    n ? r($(this)) : t($(this))
                }))
            }

            function t(n) {
                n.find("> span").each(function(i) {
                    $(this).prop("hidden", () => i === 0)
                })
            }

            function r(n) {
                n.find("> span").each(function(i) {
                    $(this).prop("hidden", () => i === 1)
                })
            }
            $(document).ready(() => {
                let n = window.matchMedia("(prefers-reduced-motion: reduce)");
                n.addEventListener("change", i => {
                    e(!i.matches)
                }), n.matches && e(!1), $("video:not([autoplay])").each(function() {
                    $(this).parent().find(".w-background-video--control").each(function() {
                        t($(this))
                    })
                }), $(document).on("click", ".w-background-video--control", function(i) {
                    if (Webflow.env("design")) return;
                    let o = $(i.currentTarget),
                        a = $(`video#${o.attr("aria-controls")}`).get(0);
                    if (a)
                        if (a.paused) {
                            let s = a.play();
                            r(o), s && typeof s.catch == "function" && s.catch(() => {
                                t(o)
                            })
                        } else a.pause(), t(o)
                })
            })
        })()
    });
    var Ui = u(() => {
        window.tram = function(e) {
            function t(f, m) {
                var b = new E.Bare;
                return b.init(f, m)
            }

            function r(f) {
                return f.replace(/[A-Z]/g, function(m) {
                    return "-" + m.toLowerCase()
                })
            }

            function n(f) {
                var m = parseInt(f.slice(1), 16),
                    b = m >> 16 & 255,
                    C = m >> 8 & 255,
                    O = 255 & m;
                return [b, C, O]
            }

            function i(f, m, b) {
                return "#" + (1 << 24 | f << 16 | m << 8 | b).toString(16).slice(1)
            }

            function o() {}

            function a(f, m) {
                p("Type warning: Expected: [" + f + "] Got: [" + typeof m + "] " + m)
            }

            function s(f, m, b) {
                p("Units do not match [" + f + "]: " + m + ", " + b)
            }

            function c(f, m, b) {
                if (m !== void 0 && (b = m), f === void 0) return b;
                var C = b;
                return We.test(f) || !Ye.test(f) ? C = parseInt(f, 10) : Ye.test(f) && (C = 1e3 * parseFloat(f)), 0 > C && (C = 0), C === C ? C : b
            }

            function p(f) {
                se.debug && window && window.console.warn(f)
            }

            function y(f) {
                for (var m = -1, b = f ? f.length : 0, C = []; ++m < b;) {
                    var O = f[m];
                    O && C.push(O)
                }
                return C
            }
            var g = function(f, m, b) {
                    function C(ue) {
                        return typeof ue == "object"
                    }

                    function O(ue) {
                        return typeof ue == "function"
                    }

                    function L() {}

                    function re(ue, ye) {
                        function Q() {
                            var Me = new de;
                            return O(Me.init) && Me.init.apply(Me, arguments), Me
                        }

                        function de() {}
                        ye === b && (ye = ue, ue = Object), Q.Bare = de;
                        var pe, Se = L[f] = ue[f],
                            st = de[f] = Q[f] = new L;
                        return st.constructor = Q, Q.mixin = function(Me) {
                            return de[f] = Q[f] = re(Q, Me)[f], Q
                        }, Q.open = function(Me) {
                            if (pe = {}, O(Me) ? pe = Me.call(Q, st, Se, Q, ue) : C(Me) && (pe = Me), C(pe))
                                for (var Cr in pe) m.call(pe, Cr) && (st[Cr] = pe[Cr]);
                            return O(st.init) || (st.init = ue), Q
                        }, Q.open(ye)
                    }
                    return re
                }("prototype", {}.hasOwnProperty),
                I = {
                    ease: ["ease", function(f, m, b, C) {
                        var O = (f /= C) * f,
                            L = O * f;
                        return m + b * (-2.75 * L * O + 11 * O * O + -15.5 * L + 8 * O + .25 * f)
                    }],
                    "ease-in": ["ease-in", function(f, m, b, C) {
                        var O = (f /= C) * f,
                            L = O * f;
                        return m + b * (-1 * L * O + 3 * O * O + -3 * L + 2 * O)
                    }],
                    "ease-out": ["ease-out", function(f, m, b, C) {
                        var O = (f /= C) * f,
                            L = O * f;
                        return m + b * (.3 * L * O + -1.6 * O * O + 2.2 * L + -1.8 * O + 1.9 * f)
                    }],
                    "ease-in-out": ["ease-in-out", function(f, m, b, C) {
                        var O = (f /= C) * f,
                            L = O * f;
                        return m + b * (2 * L * O + -5 * O * O + 2 * L + 2 * O)
                    }],
                    linear: ["linear", function(f, m, b, C) {
                        return b * f / C + m
                    }],
                    "ease-in-quad": ["cubic-bezier(0.550, 0.085, 0.680, 0.530)", function(f, m, b, C) {
                        return b * (f /= C) * f + m
                    }],
                    "ease-out-quad": ["cubic-bezier(0.250, 0.460, 0.450, 0.940)", function(f, m, b, C) {
                        return -b * (f /= C) * (f - 2) + m
                    }],
                    "ease-in-out-quad": ["cubic-bezier(0.455, 0.030, 0.515, 0.955)", function(f, m, b, C) {
                        return (f /= C / 2) < 1 ? b / 2 * f * f + m : -b / 2 * (--f * (f - 2) - 1) + m
                    }],
                    "ease-in-cubic": ["cubic-bezier(0.550, 0.055, 0.675, 0.190)", function(f, m, b, C) {
                        return b * (f /= C) * f * f + m
                    }],
                    "ease-out-cubic": ["cubic-bezier(0.215, 0.610, 0.355, 1)", function(f, m, b, C) {
                        return b * ((f = f / C - 1) * f * f + 1) + m
                    }],
                    "ease-in-out-cubic": ["cubic-bezier(0.645, 0.045, 0.355, 1)", function(f, m, b, C) {
                        return (f /= C / 2) < 1 ? b / 2 * f * f * f + m : b / 2 * ((f -= 2) * f * f + 2) + m
                    }],
                    "ease-in-quart": ["cubic-bezier(0.895, 0.030, 0.685, 0.220)", function(f, m, b, C) {
                        return b * (f /= C) * f * f * f + m
                    }],
                    "ease-out-quart": ["cubic-bezier(0.165, 0.840, 0.440, 1)", function(f, m, b, C) {
                        return -b * ((f = f / C - 1) * f * f * f - 1) + m
                    }],
                    "ease-in-out-quart": ["cubic-bezier(0.770, 0, 0.175, 1)", function(f, m, b, C) {
                        return (f /= C / 2) < 1 ? b / 2 * f * f * f * f + m : -b / 2 * ((f -= 2) * f * f * f - 2) + m
                    }],
                    "ease-in-quint": ["cubic-bezier(0.755, 0.050, 0.855, 0.060)", function(f, m, b, C) {
                        return b * (f /= C) * f * f * f * f + m
                    }],
                    "ease-out-quint": ["cubic-bezier(0.230, 1, 0.320, 1)", function(f, m, b, C) {
                        return b * ((f = f / C - 1) * f * f * f * f + 1) + m
                    }],
                    "ease-in-out-quint": ["cubic-bezier(0.860, 0, 0.070, 1)", function(f, m, b, C) {
                        return (f /= C / 2) < 1 ? b / 2 * f * f * f * f * f + m : b / 2 * ((f -= 2) * f * f * f * f + 2) + m
                    }],
                    "ease-in-sine": ["cubic-bezier(0.470, 0, 0.745, 0.715)", function(f, m, b, C) {
                        return -b * Math.cos(f / C * (Math.PI / 2)) + b + m
                    }],
                    "ease-out-sine": ["cubic-bezier(0.390, 0.575, 0.565, 1)", function(f, m, b, C) {
                        return b * Math.sin(f / C * (Math.PI / 2)) + m
                    }],
                    "ease-in-out-sine": ["cubic-bezier(0.445, 0.050, 0.550, 0.950)", function(f, m, b, C) {
                        return -b / 2 * (Math.cos(Math.PI * f / C) - 1) + m
                    }],
                    "ease-in-expo": ["cubic-bezier(0.950, 0.050, 0.795, 0.035)", function(f, m, b, C) {
                        return f === 0 ? m : b * Math.pow(2, 10 * (f / C - 1)) + m
                    }],
                    "ease-out-expo": ["cubic-bezier(0.190, 1, 0.220, 1)", function(f, m, b, C) {
                        return f === C ? m + b : b * (-Math.pow(2, -10 * f / C) + 1) + m
                    }],
                    "ease-in-out-expo": ["cubic-bezier(1, 0, 0, 1)", function(f, m, b, C) {
                        return f === 0 ? m : f === C ? m + b : (f /= C / 2) < 1 ? b / 2 * Math.pow(2, 10 * (f - 1)) + m : b / 2 * (-Math.pow(2, -10 * --f) + 2) + m
                    }],
                    "ease-in-circ": ["cubic-bezier(0.600, 0.040, 0.980, 0.335)", function(f, m, b, C) {
                        return -b * (Math.sqrt(1 - (f /= C) * f) - 1) + m
                    }],
                    "ease-out-circ": ["cubic-bezier(0.075, 0.820, 0.165, 1)", function(f, m, b, C) {
                        return b * Math.sqrt(1 - (f = f / C - 1) * f) + m
                    }],
                    "ease-in-out-circ": ["cubic-bezier(0.785, 0.135, 0.150, 0.860)", function(f, m, b, C) {
                        return (f /= C / 2) < 1 ? -b / 2 * (Math.sqrt(1 - f * f) - 1) + m : b / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + m
                    }],
                    "ease-in-back": ["cubic-bezier(0.600, -0.280, 0.735, 0.045)", function(f, m, b, C, O) {
                        return O === void 0 && (O = 1.70158), b * (f /= C) * f * ((O + 1) * f - O) + m
                    }],
                    "ease-out-back": ["cubic-bezier(0.175, 0.885, 0.320, 1.275)", function(f, m, b, C, O) {
                        return O === void 0 && (O = 1.70158), b * ((f = f / C - 1) * f * ((O + 1) * f + O) + 1) + m
                    }],
                    "ease-in-out-back": ["cubic-bezier(0.680, -0.550, 0.265, 1.550)", function(f, m, b, C, O) {
                        return O === void 0 && (O = 1.70158), (f /= C / 2) < 1 ? b / 2 * f * f * (((O *= 1.525) + 1) * f - O) + m : b / 2 * ((f -= 2) * f * (((O *= 1.525) + 1) * f + O) + 2) + m
                    }]
                },
                T = {
                    "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
                    "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
                    "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)"
                },
                N = document,
                R = window,
                X = "bkwld-tram",
                q = /[\-\.0-9]/g,
                P = /[A-Z]/,
                A = "number",
                W = /^(rgb|#)/,
                V = /(em|cm|mm|in|pt|pc|px)$/,
                G = /(em|cm|mm|in|pt|pc|px|%)$/,
                K = /(deg|rad|turn)$/,
                J = "unitless",
                Z = /(all|none) 0s ease 0s/,
                oe = /^(width|height)$/,
                H = " ",
                S = N.createElement("a"),
                v = ["Webkit", "Moz", "O", "ms"],
                M = ["-webkit-", "-moz-", "-o-", "-ms-"],
                x = function(f) {
                    if (f in S.style) return {
                        dom: f,
                        css: f
                    };
                    var m, b, C = "",
                        O = f.split("-");
                    for (m = 0; m < O.length; m++) C += O[m].charAt(0).toUpperCase() + O[m].slice(1);
                    for (m = 0; m < v.length; m++)
                        if (b = v[m] + C, b in S.style) return {
                            dom: b,
                            css: M[m] + f
                        }
                },
                B = t.support = {
                    bind: Function.prototype.bind,
                    transform: x("transform"),
                    transition: x("transition"),
                    backface: x("backface-visibility"),
                    timing: x("transition-timing-function")
                };
            if (B.transition) {
                var ee = B.timing.dom;
                if (S.style[ee] = I["ease-in-back"][0], !S.style[ee])
                    for (var ne in T) I[ne][0] = T[ne]
            }
            var U = t.frame = function() {
                    var f = R.requestAnimationFrame || R.webkitRequestAnimationFrame || R.mozRequestAnimationFrame || R.oRequestAnimationFrame || R.msRequestAnimationFrame;
                    return f && B.bind ? f.bind(R) : function(m) {
                        R.setTimeout(m, 16)
                    }
                }(),
                z = t.now = function() {
                    var f = R.performance,
                        m = f && (f.now || f.webkitNow || f.msNow || f.mozNow);
                    return m && B.bind ? m.bind(f) : Date.now || function() {
                        return +new Date
                    }
                }(),
                d = g(function(f) {
                    function m(ie, ve) {
                        var Oe = y(("" + ie).split(H)),
                            Ee = Oe[0];
                        ve = ve || {};
                        var Fe = Y[Ee];
                        if (!Fe) return p("Unsupported property: " + Ee);
                        if (!ve.weak || !this.props[Ee]) {
                            var $e = Fe[0],
                                Ve = this.props[Ee];
                            return Ve || (Ve = this.props[Ee] = new $e.Bare), Ve.init(this.$el, Oe, Fe, ve), Ve
                        }
                    }

                    function b(ie, ve, Oe) {
                        if (ie) {
                            var Ee = typeof ie;
                            if (ve || (this.timer && this.timer.destroy(), this.queue = [], this.active = !1), Ee == "number" && ve) return this.timer = new ae({
                                duration: ie,
                                context: this,
                                complete: L
                            }), void(this.active = !0);
                            if (Ee == "string" && ve) {
                                switch (ie) {
                                    case "hide":
                                        Q.call(this);
                                        break;
                                    case "stop":
                                        re.call(this);
                                        break;
                                    case "redraw":
                                        de.call(this);
                                        break;
                                    default:
                                        m.call(this, ie, Oe && Oe[1])
                                }
                                return L.call(this)
                            }
                            if (Ee == "function") return void ie.call(this, this);
                            if (Ee == "object") {
                                var Fe = 0;
                                st.call(this, ie, function(we, _m) {
                                    we.span > Fe && (Fe = we.span), we.stop(), we.animate(_m)
                                }, function(we) {
                                    "wait" in we && (Fe = c(we.wait, 0))
                                }), Se.call(this), Fe > 0 && (this.timer = new ae({
                                    duration: Fe,
                                    context: this
                                }), this.active = !0, ve && (this.timer.complete = L));
                                var $e = this,
                                    Ve = !1,
                                    pn = {};
                                U(function() {
                                    st.call($e, ie, function(we) {
                                        we.active && (Ve = !0, pn[we.name] = we.nextStyle)
                                    }), Ve && $e.$el.css(pn)
                                })
                            }
                        }
                    }

                    function C(ie) {
                        ie = c(ie, 0), this.active ? this.queue.push({
                            options: ie
                        }) : (this.timer = new ae({
                            duration: ie,
                            context: this,
                            complete: L
                        }), this.active = !0)
                    }

                    function O(ie) {
                        return this.active ? (this.queue.push({
                            options: ie,
                            args: arguments
                        }), void(this.timer.complete = L)) : p("No active transition timer. Use start() or wait() before then().")
                    }

                    function L() {
                        if (this.timer && this.timer.destroy(), this.active = !1, this.queue.length) {
                            var ie = this.queue.shift();
                            b.call(this, ie.options, !0, ie.args)
                        }
                    }

                    function re(ie) {
                        this.timer && this.timer.destroy(), this.queue = [], this.active = !1;
                        var ve;
                        typeof ie == "string" ? (ve = {}, ve[ie] = 1) : ve = typeof ie == "object" && ie != null ? ie : this.props, st.call(this, ve, Me), Se.call(this)
                    }

                    function ue(ie) {
                        re.call(this, ie), st.call(this, ie, Cr, gm)
                    }

                    function ye(ie) {
                        typeof ie != "string" && (ie = "block"), this.el.style.display = ie
                    }

                    function Q() {
                        re.call(this), this.el.style.display = "none"
                    }

                    function de() {
                        this.el.offsetHeight
                    }

                    function pe() {
                        re.call(this), e.removeData(this.el, X), this.$el = this.el = null
                    }

                    function Se() {
                        var ie, ve, Oe = [];
                        this.upstream && Oe.push(this.upstream);
                        for (ie in this.props) ve = this.props[ie], ve.active && Oe.push(ve.string);
                        Oe = Oe.join(","), this.style !== Oe && (this.style = Oe, this.el.style[B.transition.dom] = Oe)
                    }

                    function st(ie, ve, Oe) {
                        var Ee, Fe, $e, Ve, pn = ve !== Me,
                            we = {};
                        for (Ee in ie) $e = ie[Ee], Ee in ge ? (we.transform || (we.transform = {}), we.transform[Ee] = $e) : (P.test(Ee) && (Ee = r(Ee)), Ee in Y ? we[Ee] = $e : (Ve || (Ve = {}), Ve[Ee] = $e));
                        for (Ee in we) {
                            if ($e = we[Ee], Fe = this.props[Ee], !Fe) {
                                if (!pn) continue;
                                Fe = m.call(this, Ee)
                            }
                            ve.call(this, Fe, $e)
                        }
                        Oe && Ve && Oe.call(this, Ve)
                    }

                    function Me(ie) {
                        ie.stop()
                    }

                    function Cr(ie, ve) {
                        ie.set(ve)
                    }

                    function gm(ie) {
                        this.$el.css(ie)
                    }

                    function Qe(ie, ve) {
                        f[ie] = function() {
                            return this.children ? Em.call(this, ve, arguments) : (this.el && ve.apply(this, arguments), this)
                        }
                    }

                    function Em(ie, ve) {
                        var Oe, Ee = this.children.length;
                        for (Oe = 0; Ee > Oe; Oe++) ie.apply(this.children[Oe], ve);
                        return this
                    }
                    f.init = function(ie) {
                        if (this.$el = e(ie), this.el = this.$el[0], this.props = {}, this.queue = [], this.style = "", this.active = !1, se.keepInherited && !se.fallback) {
                            var ve = j(this.el, "transition");
                            ve && !Z.test(ve) && (this.upstream = ve)
                        }
                        B.backface && se.hideBackface && h(this.el, B.backface.css, "hidden")
                    }, Qe("add", m), Qe("start", b), Qe("wait", C), Qe("then", O), Qe("next", L), Qe("stop", re), Qe("set", ue), Qe("show", ye), Qe("hide", Q), Qe("redraw", de), Qe("destroy", pe)
                }),
                E = g(d, function(f) {
                    function m(b, C) {
                        var O = e.data(b, X) || e.data(b, X, new d.Bare);
                        return O.el || O.init(b), C ? O.start(C) : O
                    }
                    f.init = function(b, C) {
                        var O = e(b);
                        if (!O.length) return this;
                        if (O.length === 1) return m(O[0], C);
                        var L = [];
                        return O.each(function(re, ue) {
                            L.push(m(ue, C))
                        }), this.children = L, this
                    }
                }),
                _ = g(function(f) {
                    function m() {
                        var L = this.get();
                        this.update("auto");
                        var re = this.get();
                        return this.update(L), re
                    }

                    function b(L, re, ue) {
                        return re !== void 0 && (ue = re), L in I ? L : ue
                    }

                    function C(L) {
                        var re = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(L);
                        return (re ? i(re[1], re[2], re[3]) : L).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3")
                    }
                    var O = {
                        duration: 500,
                        ease: "ease",
                        delay: 0
                    };
                    f.init = function(L, re, ue, ye) {
                        this.$el = L, this.el = L[0];
                        var Q = re[0];
                        ue[2] && (Q = ue[2]), te[Q] && (Q = te[Q]), this.name = Q, this.type = ue[1], this.duration = c(re[1], this.duration, O.duration), this.ease = b(re[2], this.ease, O.ease), this.delay = c(re[3], this.delay, O.delay), this.span = this.duration + this.delay, this.active = !1, this.nextStyle = null, this.auto = oe.test(this.name), this.unit = ye.unit || this.unit || se.defaultUnit, this.angle = ye.angle || this.angle || se.defaultAngle, se.fallback || ye.fallback ? this.animate = this.fallback : (this.animate = this.transition, this.string = this.name + H + this.duration + "ms" + (this.ease != "ease" ? H + I[this.ease][0] : "") + (this.delay ? H + this.delay + "ms" : ""))
                    }, f.set = function(L) {
                        L = this.convert(L, this.type), this.update(L), this.redraw()
                    }, f.transition = function(L) {
                        this.active = !0, L = this.convert(L, this.type), this.auto && (this.el.style[this.name] == "auto" && (this.update(this.get()), this.redraw()), L == "auto" && (L = m.call(this))), this.nextStyle = L
                    }, f.fallback = function(L) {
                        var re = this.el.style[this.name] || this.convert(this.get(), this.type);
                        L = this.convert(L, this.type), this.auto && (re == "auto" && (re = this.convert(this.get(), this.type)), L == "auto" && (L = m.call(this))), this.tween = new w({
                            from: re,
                            to: L,
                            duration: this.duration,
                            delay: this.delay,
                            ease: this.ease,
                            update: this.update,
                            context: this
                        })
                    }, f.get = function() {
                        return j(this.el, this.name)
                    }, f.update = function(L) {
                        h(this.el, this.name, L)
                    }, f.stop = function() {
                        (this.active || this.nextStyle) && (this.active = !1, this.nextStyle = null, h(this.el, this.name, this.get()));
                        var L = this.tween;
                        L && L.context && L.destroy()
                    }, f.convert = function(L, re) {
                        if (L == "auto" && this.auto) return L;
                        var ue, ye = typeof L == "number",
                            Q = typeof L == "string";
                        switch (re) {
                            case A:
                                if (ye) return L;
                                if (Q && L.replace(q, "") === "") return +L;
                                ue = "number(unitless)";
                                break;
                            case W:
                                if (Q) {
                                    if (L === "" && this.original) return this.original;
                                    if (re.test(L)) return L.charAt(0) == "#" && L.length == 7 ? L : C(L)
                                }
                                ue = "hex or rgb string";
                                break;
                            case V:
                                if (ye) return L + this.unit;
                                if (Q && re.test(L)) return L;
                                ue = "number(px) or string(unit)";
                                break;
                            case G:
                                if (ye) return L + this.unit;
                                if (Q && re.test(L)) return L;
                                ue = "number(px) or string(unit or %)";
                                break;
                            case K:
                                if (ye) return L + this.angle;
                                if (Q && re.test(L)) return L;
                                ue = "number(deg) or string(angle)";
                                break;
                            case J:
                                if (ye || Q && G.test(L)) return L;
                                ue = "number(unitless) or string(unit or %)"
                        }
                        return a(ue, L), L
                    }, f.redraw = function() {
                        this.el.offsetHeight
                    }
                }),
                l = g(_, function(f, m) {
                    f.init = function() {
                        m.init.apply(this, arguments), this.original || (this.original = this.convert(this.get(), W))
                    }
                }),
                F = g(_, function(f, m) {
                    f.init = function() {
                        m.init.apply(this, arguments), this.animate = this.fallback
                    }, f.get = function() {
                        return this.$el[this.name]()
                    }, f.update = function(b) {
                        this.$el[this.name](b)
                    }
                }),
                k = g(_, function(f, m) {
                    function b(C, O) {
                        var L, re, ue, ye, Q;
                        for (L in C) ye = ge[L], ue = ye[0], re = ye[1] || L, Q = this.convert(C[L], ue), O.call(this, re, Q, ue)
                    }
                    f.init = function() {
                        m.init.apply(this, arguments), this.current || (this.current = {}, ge.perspective && se.perspective && (this.current.perspective = se.perspective, h(this.el, this.name, this.style(this.current)), this.redraw()))
                    }, f.set = function(C) {
                        b.call(this, C, function(O, L) {
                            this.current[O] = L
                        }), h(this.el, this.name, this.style(this.current)), this.redraw()
                    }, f.transition = function(C) {
                        var O = this.values(C);
                        this.tween = new he({
                            current: this.current,
                            values: O,
                            duration: this.duration,
                            delay: this.delay,
                            ease: this.ease
                        });
                        var L, re = {};
                        for (L in this.current) re[L] = L in O ? O[L] : this.current[L];
                        this.active = !0, this.nextStyle = this.style(re)
                    }, f.fallback = function(C) {
                        var O = this.values(C);
                        this.tween = new he({
                            current: this.current,
                            values: O,
                            duration: this.duration,
                            delay: this.delay,
                            ease: this.ease,
                            update: this.update,
                            context: this
                        })
                    }, f.update = function() {
                        h(this.el, this.name, this.style(this.current))
                    }, f.style = function(C) {
                        var O, L = "";
                        for (O in C) L += O + "(" + C[O] + ") ";
                        return L
                    }, f.values = function(C) {
                        var O, L = {};
                        return b.call(this, C, function(re, ue, ye) {
                            L[re] = ue, this.current[re] === void 0 && (O = 0, ~re.indexOf("scale") && (O = 1), this.current[re] = this.convert(O, ye))
                        }), L
                    }
                }),
                w = g(function(f) {
                    function m(Q) {
                        ue.push(Q) === 1 && U(b)
                    }

                    function b() {
                        var Q, de, pe, Se = ue.length;
                        if (Se)
                            for (U(b), de = z(), Q = Se; Q--;) pe = ue[Q], pe && pe.render(de)
                    }

                    function C(Q) {
                        var de, pe = e.inArray(Q, ue);
                        pe >= 0 && (de = ue.slice(pe + 1), ue.length = pe, de.length && (ue = ue.concat(de)))
                    }

                    function O(Q) {
                        return Math.round(Q * ye) / ye
                    }

                    function L(Q, de, pe) {
                        return i(Q[0] + pe * (de[0] - Q[0]), Q[1] + pe * (de[1] - Q[1]), Q[2] + pe * (de[2] - Q[2]))
                    }
                    var re = {
                        ease: I.ease[1],
                        from: 0,
                        to: 1
                    };
                    f.init = function(Q) {
                        this.duration = Q.duration || 0, this.delay = Q.delay || 0;
                        var de = Q.ease || re.ease;
                        I[de] && (de = I[de][1]), typeof de != "function" && (de = re.ease), this.ease = de, this.update = Q.update || o, this.complete = Q.complete || o, this.context = Q.context || this, this.name = Q.name;
                        var pe = Q.from,
                            Se = Q.to;
                        pe === void 0 && (pe = re.from), Se === void 0 && (Se = re.to), this.unit = Q.unit || "", typeof pe == "number" && typeof Se == "number" ? (this.begin = pe, this.change = Se - pe) : this.format(Se, pe), this.value = this.begin + this.unit, this.start = z(), Q.autoplay !== !1 && this.play()
                    }, f.play = function() {
                        this.active || (this.start || (this.start = z()), this.active = !0, m(this))
                    }, f.stop = function() {
                        this.active && (this.active = !1, C(this))
                    }, f.render = function(Q) {
                        var de, pe = Q - this.start;
                        if (this.delay) {
                            if (pe <= this.delay) return;
                            pe -= this.delay
                        }
                        if (pe < this.duration) {
                            var Se = this.ease(pe, 0, 1, this.duration);
                            return de = this.startRGB ? L(this.startRGB, this.endRGB, Se) : O(this.begin + Se * this.change), this.value = de + this.unit, void this.update.call(this.context, this.value)
                        }
                        de = this.endHex || this.begin + this.change, this.value = de + this.unit, this.update.call(this.context, this.value), this.complete.call(this.context), this.destroy()
                    }, f.format = function(Q, de) {
                        if (de += "", Q += "", Q.charAt(0) == "#") return this.startRGB = n(de), this.endRGB = n(Q), this.endHex = Q, this.begin = 0, void(this.change = 1);
                        if (!this.unit) {
                            var pe = de.replace(q, ""),
                                Se = Q.replace(q, "");
                            pe !== Se && s("tween", de, Q), this.unit = pe
                        }
                        de = parseFloat(de), Q = parseFloat(Q), this.begin = this.value = de, this.change = Q - de
                    }, f.destroy = function() {
                        this.stop(), this.context = null, this.ease = this.update = this.complete = o
                    };
                    var ue = [],
                        ye = 1e3
                }),
                ae = g(w, function(f) {
                    f.init = function(m) {
                        this.duration = m.duration || 0, this.complete = m.complete || o, this.context = m.context, this.play()
                    }, f.render = function(m) {
                        var b = m - this.start;
                        b < this.duration || (this.complete.call(this.context), this.destroy())
                    }
                }),
                he = g(w, function(f, m) {
                    f.init = function(b) {
                        this.context = b.context, this.update = b.update, this.tweens = [], this.current = b.current;
                        var C, O;
                        for (C in b.values) O = b.values[C], this.current[C] !== O && this.tweens.push(new w({
                            name: C,
                            from: this.current[C],
                            to: O,
                            duration: b.duration,
                            delay: b.delay,
                            ease: b.ease,
                            autoplay: !1
                        }));
                        this.play()
                    }, f.render = function(b) {
                        var C, O, L = this.tweens.length,
                            re = !1;
                        for (C = L; C--;) O = this.tweens[C], O.context && (O.render(b), this.current[O.name] = O.value, re = !0);
                        return re ? void(this.update && this.update.call(this.context)) : this.destroy()
                    }, f.destroy = function() {
                        if (m.destroy.call(this), this.tweens) {
                            var b, C = this.tweens.length;
                            for (b = C; b--;) this.tweens[b].destroy();
                            this.tweens = null, this.current = null
                        }
                    }
                }),
                se = t.config = {
                    debug: !1,
                    defaultUnit: "px",
                    defaultAngle: "deg",
                    keepInherited: !1,
                    hideBackface: !1,
                    perspective: "",
                    fallback: !B.transition,
                    agentTests: []
                };
            t.fallback = function(f) {
                if (!B.transition) return se.fallback = !0;
                se.agentTests.push("(" + f + ")");
                var m = new RegExp(se.agentTests.join("|"), "i");
                se.fallback = m.test(navigator.userAgent)
            }, t.fallback("6.0.[2-5] Safari"), t.tween = function(f) {
                return new w(f)
            }, t.delay = function(f, m, b) {
                return new ae({
                    complete: m,
                    duration: f,
                    context: b
                })
            }, e.fn.tram = function(f) {
                return t.call(null, this, f)
            };
            var h = e.style,
                j = e.css,
                te = {
                    transform: B.transform && B.transform.css
                },
                Y = {
                    color: [l, W],
                    background: [l, W, "background-color"],
                    "outline-color": [l, W],
                    "border-color": [l, W],
                    "border-top-color": [l, W],
                    "border-right-color": [l, W],
                    "border-bottom-color": [l, W],
                    "border-left-color": [l, W],
                    "border-width": [_, V],
                    "border-top-width": [_, V],
                    "border-right-width": [_, V],
                    "border-bottom-width": [_, V],
                    "border-left-width": [_, V],
                    "border-spacing": [_, V],
                    "letter-spacing": [_, V],
                    margin: [_, V],
                    "margin-top": [_, V],
                    "margin-right": [_, V],
                    "margin-bottom": [_, V],
                    "margin-left": [_, V],
                    padding: [_, V],
                    "padding-top": [_, V],
                    "padding-right": [_, V],
                    "padding-bottom": [_, V],
                    "padding-left": [_, V],
                    "outline-width": [_, V],
                    opacity: [_, A],
                    top: [_, G],
                    right: [_, G],
                    bottom: [_, G],
                    left: [_, G],
                    "font-size": [_, G],
                    "text-indent": [_, G],
                    "word-spacing": [_, G],
                    width: [_, G],
                    "min-width": [_, G],
                    "max-width": [_, G],
                    height: [_, G],
                    "min-height": [_, G],
                    "max-height": [_, G],
                    "line-height": [_, J],
                    "scroll-top": [F, A, "scrollTop"],
                    "scroll-left": [F, A, "scrollLeft"]
                },
                ge = {};
            B.transform && (Y.transform = [k], ge = {
                x: [G, "translateX"],
                y: [G, "translateY"],
                rotate: [K],
                rotateX: [K],
                rotateY: [K],
                scale: [A],
                scaleX: [A],
                scaleY: [A],
                skew: [K],
                skewX: [K],
                skewY: [K]
            }), B.transform && B.backface && (ge.z = [G, "translateZ"], ge.rotateZ = [K], ge.scaleZ = [A], ge.perspective = [V]);
            var We = /ms/,
                Ye = /s|\./;
            return e.tram = t
        }(window.jQuery)
    });
    var As = u((yV, bs) => {
        var ym = window.$,
            mm = Ui() && ym.tram;
        bs.exports = function() {
            var e = {};
            e.VERSION = "1.6.0-Webflow";
            var t = {},
                r = Array.prototype,
                n = Object.prototype,
                i = Function.prototype,
                o = r.push,
                a = r.slice,
                s = r.concat,
                c = n.toString,
                p = n.hasOwnProperty,
                y = r.forEach,
                g = r.map,
                I = r.reduce,
                T = r.reduceRight,
                N = r.filter,
                R = r.every,
                X = r.some,
                q = r.indexOf,
                P = r.lastIndexOf,
                A = Array.isArray,
                W = Object.keys,
                V = i.bind,
                G = e.each = e.forEach = function(v, M, x) {
                    if (v == null) return v;
                    if (y && v.forEach === y) v.forEach(M, x);
                    else if (v.length === +v.length) {
                        for (var B = 0, ee = v.length; B < ee; B++)
                            if (M.call(x, v[B], B, v) === t) return
                    } else
                        for (var ne = e.keys(v), B = 0, ee = ne.length; B < ee; B++)
                            if (M.call(x, v[ne[B]], ne[B], v) === t) return;
                    return v
                };
            e.map = e.collect = function(v, M, x) {
                var B = [];
                return v == null ? B : g && v.map === g ? v.map(M, x) : (G(v, function(ee, ne, U) {
                    B.push(M.call(x, ee, ne, U))
                }), B)
            }, e.find = e.detect = function(v, M, x) {
                var B;
                return K(v, function(ee, ne, U) {
                    if (M.call(x, ee, ne, U)) return B = ee, !0
                }), B
            }, e.filter = e.select = function(v, M, x) {
                var B = [];
                return v == null ? B : N && v.filter === N ? v.filter(M, x) : (G(v, function(ee, ne, U) {
                    M.call(x, ee, ne, U) && B.push(ee)
                }), B)
            };
            var K = e.some = e.any = function(v, M, x) {
                M || (M = e.identity);
                var B = !1;
                return v == null ? B : X && v.some === X ? v.some(M, x) : (G(v, function(ee, ne, U) {
                    if (B || (B = M.call(x, ee, ne, U))) return t
                }), !!B)
            };
            e.contains = e.include = function(v, M) {
                return v == null ? !1 : q && v.indexOf === q ? v.indexOf(M) != -1 : K(v, function(x) {
                    return x === M
                })
            }, e.delay = function(v, M) {
                var x = a.call(arguments, 2);
                return setTimeout(function() {
                    return v.apply(null, x)
                }, M)
            }, e.defer = function(v) {
                return e.delay.apply(e, [v, 1].concat(a.call(arguments, 1)))
            }, e.throttle = function(v) {
                var M, x, B;
                return function() {
                    M || (M = !0, x = arguments, B = this, mm.frame(function() {
                        M = !1, v.apply(B, x)
                    }))
                }
            }, e.debounce = function(v, M, x) {
                var B, ee, ne, U, z, d = function() {
                    var E = e.now() - U;
                    E < M ? B = setTimeout(d, M - E) : (B = null, x || (z = v.apply(ne, ee), ne = ee = null))
                };
                return function() {
                    ne = this, ee = arguments, U = e.now();
                    var E = x && !B;
                    return B || (B = setTimeout(d, M)), E && (z = v.apply(ne, ee), ne = ee = null), z
                }
            }, e.defaults = function(v) {
                if (!e.isObject(v)) return v;
                for (var M = 1, x = arguments.length; M < x; M++) {
                    var B = arguments[M];
                    for (var ee in B) v[ee] === void 0 && (v[ee] = B[ee])
                }
                return v
            }, e.keys = function(v) {
                if (!e.isObject(v)) return [];
                if (W) return W(v);
                var M = [];
                for (var x in v) e.has(v, x) && M.push(x);
                return M
            }, e.has = function(v, M) {
                return p.call(v, M)
            }, e.isObject = function(v) {
                return v === Object(v)
            }, e.now = Date.now || function() {
                return new Date().getTime()
            }, e.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var J = /(.)^/,
                Z = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                oe = /\\|'|\r|\n|\u2028|\u2029/g,
                H = function(v) {
                    return "\\" + Z[v]
                },
                S = /^\s*(\w|\$)+\s*$/;
            return e.template = function(v, M, x) {
                !M && x && (M = x), M = e.defaults({}, M, e.templateSettings);
                var B = RegExp([(M.escape || J).source, (M.interpolate || J).source, (M.evaluate || J).source].join("|") + "|$", "g"),
                    ee = 0,
                    ne = "__p+='";
                v.replace(B, function(E, _, l, F, k) {
                    return ne += v.slice(ee, k).replace(oe, H), ee = k + E.length, _ ? ne += `'+
((__t=(` + _ + `))==null?'':_.escape(__t))+
'` : l ? ne += `'+
((__t=(` + l + `))==null?'':__t)+
'` : F && (ne += `';
` + F + `
__p+='`), E
                }), ne += `';
`;
                var U = M.variable;
                if (U) {
                    if (!S.test(U)) throw new Error("variable is not a bare identifier: " + U)
                } else ne = `with(obj||{}){
` + ne + `}
`, U = "obj";
                ne = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` + ne + `return __p;
`;
                var z;
                try {
                    z = new Function(M.variable || "obj", "_", ne)
                } catch (E) {
                    throw E.source = ne, E
                }
                var d = function(E) {
                    return z.call(this, E, e)
                };
                return d.source = "function(" + U + `){
` + ne + "}", d
            }, e
        }()
    });
    var ke = u((mV, Ls) => {
        var _e = {},
            $t = {},
            Zt = [],
            Vi = window.Webflow || [],
            bt = window.jQuery,
            Je = bt(window),
            Im = bt(document),
            ut = bt.isFunction,
            Ze = _e._ = As(),
            ws = _e.tram = Ui() && bt.tram,
            hn = !1,
            ki = !1;
        ws.config.hideBackface = !1;
        ws.config.keepInherited = !0;
        _e.define = function(e, t, r) {
            $t[e] && Cs($t[e]);
            var n = $t[e] = t(bt, Ze, r) || {};
            return Rs(n), n
        };
        _e.require = function(e) {
            return $t[e]
        };

        function Rs(e) {
            _e.env() && (ut(e.design) && Je.on("__wf_design", e.design), ut(e.preview) && Je.on("__wf_preview", e.preview)), ut(e.destroy) && Je.on("__wf_destroy", e.destroy), e.ready && ut(e.ready) && Tm(e)
        }

        function Tm(e) {
            if (hn) {
                e.ready();
                return
            }
            Ze.contains(Zt, e.ready) || Zt.push(e.ready)
        }

        function Cs(e) {
            ut(e.design) && Je.off("__wf_design", e.design), ut(e.preview) && Je.off("__wf_preview", e.preview), ut(e.destroy) && Je.off("__wf_destroy", e.destroy), e.ready && ut(e.ready) && Om(e)
        }

        function Om(e) {
            Zt = Ze.filter(Zt, function(t) {
                return t !== e.ready
            })
        }
        _e.push = function(e) {
            if (hn) {
                ut(e) && e();
                return
            }
            Vi.push(e)
        };
        _e.env = function(e) {
            var t = window.__wf_design,
                r = typeof t < "u";
            if (!e) return r;
            if (e === "design") return r && t;
            if (e === "preview") return r && !t;
            if (e === "slug") return r && window.__wf_slug;
            if (e === "editor") return window.WebflowEditor;
            if (e === "test") return window.__wf_test;
            if (e === "frame") return window !== window.top
        };
        var vn = navigator.userAgent.toLowerCase(),
            Ns = _e.env.touch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            bm = _e.env.chrome = /chrome/.test(vn) && /Google/.test(navigator.vendor) && parseInt(vn.match(/chrome\/(\d+)\./)[1], 10),
            Am = _e.env.ios = /(ipod|iphone|ipad)/.test(vn);
        _e.env.safari = /safari/.test(vn) && !bm && !Am;
        var Wi;
        Ns && Im.on("touchstart mousedown", function(e) {
            Wi = e.target
        });
        _e.validClick = Ns ? function(e) {
            return e === Wi || bt.contains(e, Wi)
        } : function() {
            return !0
        };
        var xs = "resize.webflow orientationchange.webflow load.webflow",
            Sm = "scroll.webflow " + xs;
        _e.resize = Bi(Je, xs);
        _e.scroll = Bi(Je, Sm);
        _e.redraw = Bi();

        function Bi(e, t) {
            var r = [],
                n = {};
            return n.up = Ze.throttle(function(i) {
                Ze.each(r, function(o) {
                    o(i)
                })
            }), e && t && e.on(t, n.up), n.on = function(i) {
                typeof i == "function" && (Ze.contains(r, i) || r.push(i))
            }, n.off = function(i) {
                if (!arguments.length) {
                    r = [];
                    return
                }
                r = Ze.filter(r, function(o) {
                    return o !== i
                })
            }, n
        }
        _e.location = function(e) {
            window.location = e
        };
        _e.env() && (_e.location = function() {});
        _e.ready = function() {
            hn = !0, ki ? wm() : Ze.each(Zt, Ss), Ze.each(Vi, Ss), _e.resize.up()
        };

        function Ss(e) {
            ut(e) && e()
        }

        function wm() {
            ki = !1, Ze.each($t, Rs)
        }
        var Ft;
        _e.load = function(e) {
            Ft.then(e)
        };

        function qs() {
            Ft && (Ft.reject(), Je.off("load", Ft.resolve)), Ft = new bt.Deferred, Je.on("load", Ft.resolve)
        }
        _e.destroy = function(e) {
            e = e || {}, ki = !0, Je.triggerHandler("__wf_destroy"), e.domready != null && (hn = e.domready), Ze.each($t, Cs), _e.resize.off(), _e.scroll.off(), _e.redraw.off(), Zt = [], Vi = [], Ft.state() === "pending" && qs()
        };
        bt(_e.ready);
        qs();
        Ls.exports = window.Webflow = _e
    });
    var Ms = u((IV, Ds) => {
        var Ps = ke();
        Ps.define("brand", Ds.exports = function(e) {
            var t = {},
                r = document,
                n = e("html"),
                i = e("body"),
                o = ".w-webflow-badge",
                a = window.location,
                s = /PhantomJS/i.test(navigator.userAgent),
                c = "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
                p;
            t.ready = function() {
                var T = n.attr("data-wf-status"),
                    N = n.attr("data-wf-domain") || "";
                /\.webflow\.io$/i.test(N) && a.hostname !== N && (T = !0), T && !s && (p = p || g(), I(), setTimeout(I, 500), e(r).off(c, y).on(c, y))
            };

            function y() {
                var T = r.fullScreen || r.mozFullScreen || r.webkitIsFullScreen || r.msFullscreenElement || !!r.webkitFullscreenElement;
                e(p).attr("style", T ? "display: none !important;" : "")
            }

            function g() {
                var T = e('<a class="w-webflow-badge"></a>').attr("href", "https://webflow.com?utm_campaign=brandjs"),
                    N = e("<img>").attr("src", "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon.f67cd735e3.svg").attr("alt", "").css({
                        marginRight: "8px",
                        width: "16px"
                    }),
                    R = e("<img>").attr("src", "https://d1otoma47x30pg.cloudfront.net/img/webflow-badge-text.6faa6a38cd.svg").attr("alt", "Made in Webflow");
                return T.append(N, R), T[0]
            }

            function I() {
                var T = i.children(o),
                    N = T.length && T.get(0) === p,
                    R = Ps.env("editor");
                if (N) {
                    R && T.remove();
                    return
                }
                T.length && T.remove(), R || i.append(p)
            }
            return t
        })
    });
    var Gs = u((TV, Fs) => {
        var Rm = ke();
        Rm.define("focus-visible", Fs.exports = function() {
            function e(r) {
                var n = !0,
                    i = !1,
                    o = null,
                    a = {
                        text: !0,
                        search: !0,
                        url: !0,
                        tel: !0,
                        email: !0,
                        password: !0,
                        number: !0,
                        date: !0,
                        month: !0,
                        week: !0,
                        time: !0,
                        datetime: !0,
                        "datetime-local": !0
                    };

                function s(A) {
                    return !!(A && A !== document && A.nodeName !== "HTML" && A.nodeName !== "BODY" && "classList" in A && "contains" in A.classList)
                }

                function c(A) {
                    var W = A.type,
                        V = A.tagName;
                    return !!(V === "INPUT" && a[W] && !A.readOnly || V === "TEXTAREA" && !A.readOnly || A.isContentEditable)
                }

                function p(A) {
                    A.getAttribute("data-wf-focus-visible") || A.setAttribute("data-wf-focus-visible", "true")
                }

                function y(A) {
                    A.getAttribute("data-wf-focus-visible") && A.removeAttribute("data-wf-focus-visible")
                }

                function g(A) {
                    A.metaKey || A.altKey || A.ctrlKey || (s(r.activeElement) && p(r.activeElement), n = !0)
                }

                function I() {
                    n = !1
                }

                function T(A) {
                    s(A.target) && (n || c(A.target)) && p(A.target)
                }

                function N(A) {
                    s(A.target) && A.target.hasAttribute("data-wf-focus-visible") && (i = !0, window.clearTimeout(o), o = window.setTimeout(function() {
                        i = !1
                    }, 100), y(A.target))
                }

                function R() {
                    document.visibilityState === "hidden" && (i && (n = !0), X())
                }

                function X() {
                    document.addEventListener("mousemove", P), document.addEventListener("mousedown", P), document.addEventListener("mouseup", P), document.addEventListener("pointermove", P), document.addEventListener("pointerdown", P), document.addEventListener("pointerup", P), document.addEventListener("touchmove", P), document.addEventListener("touchstart", P), document.addEventListener("touchend", P)
                }

                function q() {
                    document.removeEventListener("mousemove", P), document.removeEventListener("mousedown", P), document.removeEventListener("mouseup", P), document.removeEventListener("pointermove", P), document.removeEventListener("pointerdown", P), document.removeEventListener("pointerup", P), document.removeEventListener("touchmove", P), document.removeEventListener("touchstart", P), document.removeEventListener("touchend", P)
                }

                function P(A) {
                    A.target.nodeName && A.target.nodeName.toLowerCase() === "html" || (n = !1, q())
                }
                document.addEventListener("keydown", g, !0), document.addEventListener("mousedown", I, !0), document.addEventListener("pointerdown", I, !0), document.addEventListener("touchstart", I, !0), document.addEventListener("visibilitychange", R, !0), X(), r.addEventListener("focus", T, !0), r.addEventListener("blur", N, !0)
            }

            function t() {
                if (typeof document < "u") try {
                    document.querySelector(":focus-visible")
                } catch {
                    e(document)
                }
            }
            return {
                ready: t
            }
        })
    });
    var Ws = u((OV, Us) => {
        var Xs = ke();
        Xs.define("focus", Us.exports = function() {
            var e = [],
                t = !1;

            function r(a) {
                t && (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), e.unshift(a))
            }

            function n(a) {
                var s = a.target,
                    c = s.tagName;
                return /^a$/i.test(c) && s.href != null || /^(button|textarea)$/i.test(c) && s.disabled !== !0 || /^input$/i.test(c) && /^(button|reset|submit|radio|checkbox)$/i.test(s.type) && !s.disabled || !/^(button|input|textarea|select|a)$/i.test(c) && !Number.isNaN(Number.parseFloat(s.tabIndex)) || /^audio$/i.test(c) || /^video$/i.test(c) && s.controls === !0
            }

            function i(a) {
                n(a) && (t = !0, setTimeout(() => {
                    for (t = !1, a.target.focus(); e.length > 0;) {
                        var s = e.pop();
                        s.target.dispatchEvent(new MouseEvent(s.type, s))
                    }
                }, 0))
            }

            function o() {
                typeof document < "u" && document.body.hasAttribute("data-wf-focus-within") && Xs.env.safari && (document.addEventListener("mousedown", i, !0), document.addEventListener("mouseup", r, !0), document.addEventListener("click", r, !0))
            }
            return {
                ready: o
            }
        })
    });
    var Bs = u((bV, ks) => {
        "use strict";
        var Hi = window.jQuery,
            ct = {},
            gn = [],
            Vs = ".w-ix",
            En = {
                reset: function(e, t) {
                    t.__wf_intro = null
                },
                intro: function(e, t) {
                    t.__wf_intro || (t.__wf_intro = !0, Hi(t).triggerHandler(ct.types.INTRO))
                },
                outro: function(e, t) {
                    t.__wf_intro && (t.__wf_intro = null, Hi(t).triggerHandler(ct.types.OUTRO))
                }
            };
        ct.triggers = {};
        ct.types = {
            INTRO: "w-ix-intro" + Vs,
            OUTRO: "w-ix-outro" + Vs
        };
        ct.init = function() {
            for (var e = gn.length, t = 0; t < e; t++) {
                var r = gn[t];
                r[0](0, r[1])
            }
            gn = [], Hi.extend(ct.triggers, En)
        };
        ct.async = function() {
            for (var e in En) {
                var t = En[e];
                En.hasOwnProperty(e) && (ct.triggers[e] = function(r, n) {
                    gn.push([t, n])
                })
            }
        };
        ct.async();
        ks.exports = ct
    });
    var Jt = u((AV, Ks) => {
        "use strict";
        var ji = Bs();

        function Hs(e, t) {
            var r = document.createEvent("CustomEvent");
            r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r)
        }
        var Cm = window.jQuery,
            _n = {},
            js = ".w-ix",
            Nm = {
                reset: function(e, t) {
                    ji.triggers.reset(e, t)
                },
                intro: function(e, t) {
                    ji.triggers.intro(e, t), Hs(t, "COMPONENT_ACTIVE")
                },
                outro: function(e, t) {
                    ji.triggers.outro(e, t), Hs(t, "COMPONENT_INACTIVE")
                }
            };
        _n.triggers = {};
        _n.types = {
            INTRO: "w-ix-intro" + js,
            OUTRO: "w-ix-outro" + js
        };
        Cm.extend(_n.triggers, Nm);
        Ks.exports = _n
    });
    var zs = u((SV, yt) => {
        function Ki(e) {
            return yt.exports = Ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
                return typeof t
            } : function(t) {
                return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, yt.exports.__esModule = !0, yt.exports.default = yt.exports, Ki(e)
        }
        yt.exports = Ki, yt.exports.__esModule = !0, yt.exports.default = yt.exports
    });
    var er = u((wV, Nr) => {
        var xm = zs().default;

        function Ys(e) {
            if (typeof WeakMap != "function") return null;
            var t = new WeakMap,
                r = new WeakMap;
            return (Ys = function(i) {
                return i ? r : t
            })(e)
        }

        function qm(e, t) {
            if (!t && e && e.__esModule) return e;
            if (e === null || xm(e) !== "object" && typeof e != "function") return {
                default: e
            };
            var r = Ys(t);
            if (r && r.has(e)) return r.get(e);
            var n = {},
                i = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
                if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
                    var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
                    a && (a.get || a.set) ? Object.defineProperty(n, o, a) : n[o] = e[o]
                }
            return n.default = e, r && r.set(e, n), n
        }
        Nr.exports = qm, Nr.exports.__esModule = !0, Nr.exports.default = Nr.exports
    });
    var lt = u((RV, xr) => {
        function Lm(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        xr.exports = Lm, xr.exports.__esModule = !0, xr.exports.default = xr.exports
    });
    var Te = u((CV, Qs) => {
        var yn = function(e) {
            return e && e.Math == Math && e
        };
        Qs.exports = yn(typeof globalThis == "object" && globalThis) || yn(typeof window == "object" && window) || yn(typeof self == "object" && self) || yn(typeof global == "object" && global) || function() {
            return this
        }() || Function("return this")()
    });
    var tr = u((NV, $s) => {
        $s.exports = function(e) {
            try {
                return !!e()
            } catch {
                return !0
            }
        }
    });
    var Gt = u((xV, Zs) => {
        var Pm = tr();
        Zs.exports = !Pm(function() {
            return Object.defineProperty({}, 1, {
                get: function() {
                    return 7
                }
            })[1] != 7
        })
    });
    var mn = u((qV, Js) => {
        var qr = Function.prototype.call;
        Js.exports = qr.bind ? qr.bind(qr) : function() {
            return qr.apply(qr, arguments)
        }
    });
    var nu = u(ru => {
        "use strict";
        var eu = {}.propertyIsEnumerable,
            tu = Object.getOwnPropertyDescriptor,
            Dm = tu && !eu.call({
                1: 2
            }, 1);
        ru.f = Dm ? function(t) {
            var r = tu(this, t);
            return !!r && r.enumerable
        } : eu
    });
    var zi = u((PV, iu) => {
        iu.exports = function(e, t) {
            return {
                enumerable: !(e & 1),
                configurable: !(e & 2),
                writable: !(e & 4),
                value: t
            }
        }
    });
    var et = u((DV, au) => {
        var ou = Function.prototype,
            Yi = ou.bind,
            Qi = ou.call,
            Mm = Yi && Yi.bind(Qi);
        au.exports = Yi ? function(e) {
            return e && Mm(Qi, e)
        } : function(e) {
            return e && function() {
                return Qi.apply(e, arguments)
            }
        }
    });
    var cu = u((MV, uu) => {
        var su = et(),
            Fm = su({}.toString),
            Gm = su("".slice);
        uu.exports = function(e) {
            return Gm(Fm(e), 8, -1)
        }
    });
    var fu = u((FV, lu) => {
        var Xm = Te(),
            Um = et(),
            Wm = tr(),
            Vm = cu(),
            $i = Xm.Object,
            km = Um("".split);
        lu.exports = Wm(function() {
            return !$i("z").propertyIsEnumerable(0)
        }) ? function(e) {
            return Vm(e) == "String" ? km(e, "") : $i(e)
        } : $i
    });
    var Zi = u((GV, du) => {
        var Bm = Te(),
            Hm = Bm.TypeError;
        du.exports = function(e) {
            if (e == null) throw Hm("Can't call method on " + e);
            return e
        }
    });
    var Lr = u((XV, pu) => {
        var jm = fu(),
            Km = Zi();
        pu.exports = function(e) {
            return jm(Km(e))
        }
    });
    var ft = u((UV, vu) => {
        vu.exports = function(e) {
            return typeof e == "function"
        }
    });
    var rr = u((WV, hu) => {
        var zm = ft();
        hu.exports = function(e) {
            return typeof e == "object" ? e !== null : zm(e)
        }
    });
    var Pr = u((VV, gu) => {
        var Ji = Te(),
            Ym = ft(),
            Qm = function(e) {
                return Ym(e) ? e : void 0
            };
        gu.exports = function(e, t) {
            return arguments.length < 2 ? Qm(Ji[e]) : Ji[e] && Ji[e][t]
        }
    });
    var _u = u((kV, Eu) => {
        var $m = et();
        Eu.exports = $m({}.isPrototypeOf)
    });
    var mu = u((BV, yu) => {
        var Zm = Pr();
        yu.exports = Zm("navigator", "userAgent") || ""
    });
    var wu = u((HV, Su) => {
        var Au = Te(),
            eo = mu(),
            Iu = Au.process,
            Tu = Au.Deno,
            Ou = Iu && Iu.versions || Tu && Tu.version,
            bu = Ou && Ou.v8,
            tt, In;
        bu && (tt = bu.split("."), In = tt[0] > 0 && tt[0] < 4 ? 1 : +(tt[0] + tt[1]));
        !In && eo && (tt = eo.match(/Edge\/(\d+)/), (!tt || tt[1] >= 74) && (tt = eo.match(/Chrome\/(\d+)/), tt && (In = +tt[1])));
        Su.exports = In
    });
    var to = u((jV, Cu) => {
        var Ru = wu(),
            Jm = tr();
        Cu.exports = !!Object.getOwnPropertySymbols && !Jm(function() {
            var e = Symbol();
            return !String(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && Ru && Ru < 41
        })
    });
    var ro = u((KV, Nu) => {
        var eI = to();
        Nu.exports = eI && !Symbol.sham && typeof Symbol.iterator == "symbol"
    });
    var no = u((zV, xu) => {
        var tI = Te(),
            rI = Pr(),
            nI = ft(),
            iI = _u(),
            oI = ro(),
            aI = tI.Object;
        xu.exports = oI ? function(e) {
            return typeof e == "symbol"
        } : function(e) {
            var t = rI("Symbol");
            return nI(t) && iI(t.prototype, aI(e))
        }
    });
    var Lu = u((YV, qu) => {
        var sI = Te(),
            uI = sI.String;
        qu.exports = function(e) {
            try {
                return uI(e)
            } catch {
                return "Object"
            }
        }
    });
    var Du = u((QV, Pu) => {
        var cI = Te(),
            lI = ft(),
            fI = Lu(),
            dI = cI.TypeError;
        Pu.exports = function(e) {
            if (lI(e)) return e;
            throw dI(fI(e) + " is not a function")
        }
    });
    var Fu = u(($V, Mu) => {
        var pI = Du();
        Mu.exports = function(e, t) {
            var r = e[t];
            return r == null ? void 0 : pI(r)
        }
    });
    var Xu = u((ZV, Gu) => {
        var vI = Te(),
            io = mn(),
            oo = ft(),
            ao = rr(),
            hI = vI.TypeError;
        Gu.exports = function(e, t) {
            var r, n;
            if (t === "string" && oo(r = e.toString) && !ao(n = io(r, e)) || oo(r = e.valueOf) && !ao(n = io(r, e)) || t !== "string" && oo(r = e.toString) && !ao(n = io(r, e))) return n;
            throw hI("Can't convert object to primitive value")
        }
    });
    var Wu = u((JV, Uu) => {
        Uu.exports = !1
    });
    var Tn = u((ek, ku) => {
        var Vu = Te(),
            gI = Object.defineProperty;
        ku.exports = function(e, t) {
            try {
                gI(Vu, e, {
                    value: t,
                    configurable: !0,
                    writable: !0
                })
            } catch {
                Vu[e] = t
            }
            return t
        }
    });
    var On = u((tk, Hu) => {
        var EI = Te(),
            _I = Tn(),
            Bu = "__core-js_shared__",
            yI = EI[Bu] || _I(Bu, {});
        Hu.exports = yI
    });
    var so = u((rk, Ku) => {
        var mI = Wu(),
            ju = On();
        (Ku.exports = function(e, t) {
            return ju[e] || (ju[e] = t !== void 0 ? t : {})
        })("versions", []).push({
            version: "3.19.0",
            mode: mI ? "pure" : "global",
            copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)"
        })
    });
    var Yu = u((nk, zu) => {
        var II = Te(),
            TI = Zi(),
            OI = II.Object;
        zu.exports = function(e) {
            return OI(TI(e))
        }
    });
    var At = u((ik, Qu) => {
        var bI = et(),
            AI = Yu(),
            SI = bI({}.hasOwnProperty);
        Qu.exports = Object.hasOwn || function(t, r) {
            return SI(AI(t), r)
        }
    });
    var uo = u((ok, $u) => {
        var wI = et(),
            RI = 0,
            CI = Math.random(),
            NI = wI(1.0.toString);
        $u.exports = function(e) {
            return "Symbol(" + (e === void 0 ? "" : e) + ")_" + NI(++RI + CI, 36)
        }
    });
    var co = u((ak, rc) => {
        var xI = Te(),
            qI = so(),
            Zu = At(),
            LI = uo(),
            Ju = to(),
            tc = ro(),
            nr = qI("wks"),
            Xt = xI.Symbol,
            ec = Xt && Xt.for,
            PI = tc ? Xt : Xt && Xt.withoutSetter || LI;
        rc.exports = function(e) {
            if (!Zu(nr, e) || !(Ju || typeof nr[e] == "string")) {
                var t = "Symbol." + e;
                Ju && Zu(Xt, e) ? nr[e] = Xt[e] : tc && ec ? nr[e] = ec(t) : nr[e] = PI(t)
            }
            return nr[e]
        }
    });
    var ac = u((sk, oc) => {
        var DI = Te(),
            MI = mn(),
            nc = rr(),
            ic = no(),
            FI = Fu(),
            GI = Xu(),
            XI = co(),
            UI = DI.TypeError,
            WI = XI("toPrimitive");
        oc.exports = function(e, t) {
            if (!nc(e) || ic(e)) return e;
            var r = FI(e, WI),
                n;
            if (r) {
                if (t === void 0 && (t = "default"), n = MI(r, e, t), !nc(n) || ic(n)) return n;
                throw UI("Can't convert object to primitive value")
            }
            return t === void 0 && (t = "number"), GI(e, t)
        }
    });
    var lo = u((uk, sc) => {
        var VI = ac(),
            kI = no();
        sc.exports = function(e) {
            var t = VI(e, "string");
            return kI(t) ? t : t + ""
        }
    });
    var po = u((ck, cc) => {
        var BI = Te(),
            uc = rr(),
            fo = BI.document,
            HI = uc(fo) && uc(fo.createElement);
        cc.exports = function(e) {
            return HI ? fo.createElement(e) : {}
        }
    });
    var vo = u((lk, lc) => {
        var jI = Gt(),
            KI = tr(),
            zI = po();
        lc.exports = !jI && !KI(function() {
            return Object.defineProperty(zI("div"), "a", {
                get: function() {
                    return 7
                }
            }).a != 7
        })
    });
    var ho = u(dc => {
        var YI = Gt(),
            QI = mn(),
            $I = nu(),
            ZI = zi(),
            JI = Lr(),
            eT = lo(),
            tT = At(),
            rT = vo(),
            fc = Object.getOwnPropertyDescriptor;
        dc.f = YI ? fc : function(t, r) {
            if (t = JI(t), r = eT(r), rT) try {
                return fc(t, r)
            } catch {}
            if (tT(t, r)) return ZI(!QI($I.f, t, r), t[r])
        }
    });
    var Dr = u((dk, vc) => {
        var pc = Te(),
            nT = rr(),
            iT = pc.String,
            oT = pc.TypeError;
        vc.exports = function(e) {
            if (nT(e)) return e;
            throw oT(iT(e) + " is not an object")
        }
    });
    var Mr = u(Ec => {
        var aT = Te(),
            sT = Gt(),
            uT = vo(),
            hc = Dr(),
            cT = lo(),
            lT = aT.TypeError,
            gc = Object.defineProperty;
        Ec.f = sT ? gc : function(t, r, n) {
            if (hc(t), r = cT(r), hc(n), uT) try {
                return gc(t, r, n)
            } catch {}
            if ("get" in n || "set" in n) throw lT("Accessors not supported");
            return "value" in n && (t[r] = n.value), t
        }
    });
    var bn = u((vk, _c) => {
        var fT = Gt(),
            dT = Mr(),
            pT = zi();
        _c.exports = fT ? function(e, t, r) {
            return dT.f(e, t, pT(1, r))
        } : function(e, t, r) {
            return e[t] = r, e
        }
    });
    var Eo = u((hk, yc) => {
        var vT = et(),
            hT = ft(),
            go = On(),
            gT = vT(Function.toString);
        hT(go.inspectSource) || (go.inspectSource = function(e) {
            return gT(e)
        });
        yc.exports = go.inspectSource
    });
    var Tc = u((gk, Ic) => {
        var ET = Te(),
            _T = ft(),
            yT = Eo(),
            mc = ET.WeakMap;
        Ic.exports = _T(mc) && /native code/.test(yT(mc))
    });
    var _o = u((Ek, bc) => {
        var mT = so(),
            IT = uo(),
            Oc = mT("keys");
        bc.exports = function(e) {
            return Oc[e] || (Oc[e] = IT(e))
        }
    });
    var An = u((_k, Ac) => {
        Ac.exports = {}
    });
    var xc = u((yk, Nc) => {
        var TT = Tc(),
            Cc = Te(),
            yo = et(),
            OT = rr(),
            bT = bn(),
            mo = At(),
            Io = On(),
            AT = _o(),
            ST = An(),
            Sc = "Object already initialized",
            Oo = Cc.TypeError,
            wT = Cc.WeakMap,
            Sn, Fr, wn, RT = function(e) {
                return wn(e) ? Fr(e) : Sn(e, {})
            },
            CT = function(e) {
                return function(t) {
                    var r;
                    if (!OT(t) || (r = Fr(t)).type !== e) throw Oo("Incompatible receiver, " + e + " required");
                    return r
                }
            };
        TT || Io.state ? (St = Io.state || (Io.state = new wT), wc = yo(St.get), To = yo(St.has), Rc = yo(St.set), Sn = function(e, t) {
            if (To(St, e)) throw new Oo(Sc);
            return t.facade = e, Rc(St, e, t), t
        }, Fr = function(e) {
            return wc(St, e) || {}
        }, wn = function(e) {
            return To(St, e)
        }) : (Ut = AT("state"), ST[Ut] = !0, Sn = function(e, t) {
            if (mo(e, Ut)) throw new Oo(Sc);
            return t.facade = e, bT(e, Ut, t), t
        }, Fr = function(e) {
            return mo(e, Ut) ? e[Ut] : {}
        }, wn = function(e) {
            return mo(e, Ut)
        });
        var St, wc, To, Rc, Ut;
        Nc.exports = {
            set: Sn,
            get: Fr,
            has: wn,
            enforce: RT,
            getterFor: CT
        }
    });
    var Pc = u((mk, Lc) => {
        var bo = Gt(),
            NT = At(),
            qc = Function.prototype,
            xT = bo && Object.getOwnPropertyDescriptor,
            Ao = NT(qc, "name"),
            qT = Ao && function() {}.name === "something",
            LT = Ao && (!bo || bo && xT(qc, "name").configurable);
        Lc.exports = {
            EXISTS: Ao,
            PROPER: qT,
            CONFIGURABLE: LT
        }
    });
    var Xc = u((Ik, Gc) => {
        var PT = Te(),
            Dc = ft(),
            DT = At(),
            Mc = bn(),
            MT = Tn(),
            FT = Eo(),
            Fc = xc(),
            GT = Pc().CONFIGURABLE,
            XT = Fc.get,
            UT = Fc.enforce,
            WT = String(String).split("String");
        (Gc.exports = function(e, t, r, n) {
            var i = n ? !!n.unsafe : !1,
                o = n ? !!n.enumerable : !1,
                a = n ? !!n.noTargetGet : !1,
                s = n && n.name !== void 0 ? n.name : t,
                c;
            if (Dc(r) && (String(s).slice(0, 7) === "Symbol(" && (s = "[" + String(s).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), (!DT(r, "name") || GT && r.name !== s) && Mc(r, "name", s), c = UT(r), c.source || (c.source = WT.join(typeof s == "string" ? s : ""))), e === PT) {
                o ? e[t] = r : MT(t, r);
                return
            } else i ? !a && e[t] && (o = !0) : delete e[t];
            o ? e[t] = r : Mc(e, t, r)
        })(Function.prototype, "toString", function() {
            return Dc(this) && XT(this).source || FT(this)
        })
    });
    var So = u((Tk, Uc) => {
        var VT = Math.ceil,
            kT = Math.floor;
        Uc.exports = function(e) {
            var t = +e;
            return t !== t || t === 0 ? 0 : (t > 0 ? kT : VT)(t)
        }
    });
    var Vc = u((Ok, Wc) => {
        var BT = So(),
            HT = Math.max,
            jT = Math.min;
        Wc.exports = function(e, t) {
            var r = BT(e);
            return r < 0 ? HT(r + t, 0) : jT(r, t)
        }
    });
    var Bc = u((bk, kc) => {
        var KT = So(),
            zT = Math.min;
        kc.exports = function(e) {
            return e > 0 ? zT(KT(e), 9007199254740991) : 0
        }
    });
    var jc = u((Ak, Hc) => {
        var YT = Bc();
        Hc.exports = function(e) {
            return YT(e.length)
        }
    });
    var wo = u((Sk, zc) => {
        var QT = Lr(),
            $T = Vc(),
            ZT = jc(),
            Kc = function(e) {
                return function(t, r, n) {
                    var i = QT(t),
                        o = ZT(i),
                        a = $T(n, o),
                        s;
                    if (e && r != r) {
                        for (; o > a;)
                            if (s = i[a++], s != s) return !0
                    } else
                        for (; o > a; a++)
                            if ((e || a in i) && i[a] === r) return e || a || 0;
                    return !e && -1
                }
            };
        zc.exports = {
            includes: Kc(!0),
            indexOf: Kc(!1)
        }
    });
    var Co = u((wk, Qc) => {
        var JT = et(),
            Ro = At(),
            eO = Lr(),
            tO = wo().indexOf,
            rO = An(),
            Yc = JT([].push);
        Qc.exports = function(e, t) {
            var r = eO(e),
                n = 0,
                i = [],
                o;
            for (o in r) !Ro(rO, o) && Ro(r, o) && Yc(i, o);
            for (; t.length > n;) Ro(r, o = t[n++]) && (~tO(i, o) || Yc(i, o));
            return i
        }
    });
    var Rn = u((Rk, $c) => {
        $c.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
    });
    var Jc = u(Zc => {
        var nO = Co(),
            iO = Rn(),
            oO = iO.concat("length", "prototype");
        Zc.f = Object.getOwnPropertyNames || function(t) {
            return nO(t, oO)
        }
    });
    var tl = u(el => {
        el.f = Object.getOwnPropertySymbols
    });
    var nl = u((xk, rl) => {
        var aO = Pr(),
            sO = et(),
            uO = Jc(),
            cO = tl(),
            lO = Dr(),
            fO = sO([].concat);
        rl.exports = aO("Reflect", "ownKeys") || function(t) {
            var r = uO.f(lO(t)),
                n = cO.f;
            return n ? fO(r, n(t)) : r
        }
    });
    var ol = u((qk, il) => {
        var dO = At(),
            pO = nl(),
            vO = ho(),
            hO = Mr();
        il.exports = function(e, t) {
            for (var r = pO(t), n = hO.f, i = vO.f, o = 0; o < r.length; o++) {
                var a = r[o];
                dO(e, a) || n(e, a, i(t, a))
            }
        }
    });
    var sl = u((Lk, al) => {
        var gO = tr(),
            EO = ft(),
            _O = /#|\.prototype\./,
            Gr = function(e, t) {
                var r = mO[yO(e)];
                return r == TO ? !0 : r == IO ? !1 : EO(t) ? gO(t) : !!t
            },
            yO = Gr.normalize = function(e) {
                return String(e).replace(_O, ".").toLowerCase()
            },
            mO = Gr.data = {},
            IO = Gr.NATIVE = "N",
            TO = Gr.POLYFILL = "P";
        al.exports = Gr
    });
    var cl = u((Pk, ul) => {
        var No = Te(),
            OO = ho().f,
            bO = bn(),
            AO = Xc(),
            SO = Tn(),
            wO = ol(),
            RO = sl();
        ul.exports = function(e, t) {
            var r = e.target,
                n = e.global,
                i = e.stat,
                o, a, s, c, p, y;
            if (n ? a = No : i ? a = No[r] || SO(r, {}) : a = (No[r] || {}).prototype, a)
                for (s in t) {
                    if (p = t[s], e.noTargetGet ? (y = OO(a, s), c = y && y.value) : c = a[s], o = RO(n ? s : r + (i ? "." : "#") + s, e.forced), !o && c !== void 0) {
                        if (typeof p == typeof c) continue;
                        wO(p, c)
                    }(e.sham || c && c.sham) && bO(p, "sham", !0), AO(a, s, p, e)
                }
        }
    });
    var fl = u((Dk, ll) => {
        var CO = Co(),
            NO = Rn();
        ll.exports = Object.keys || function(t) {
            return CO(t, NO)
        }
    });
    var pl = u((Mk, dl) => {
        var xO = Gt(),
            qO = Mr(),
            LO = Dr(),
            PO = Lr(),
            DO = fl();
        dl.exports = xO ? Object.defineProperties : function(t, r) {
            LO(t);
            for (var n = PO(r), i = DO(r), o = i.length, a = 0, s; o > a;) qO.f(t, s = i[a++], n[s]);
            return t
        }
    });
    var hl = u((Fk, vl) => {
        var MO = Pr();
        vl.exports = MO("document", "documentElement")
    });
    var Ol = u((Gk, Tl) => {
        var FO = Dr(),
            GO = pl(),
            gl = Rn(),
            XO = An(),
            UO = hl(),
            WO = po(),
            VO = _o(),
            El = ">",
            _l = "<",
            qo = "prototype",
            Lo = "script",
            ml = VO("IE_PROTO"),
            xo = function() {},
            Il = function(e) {
                return _l + Lo + El + e + _l + "/" + Lo + El
            },
            yl = function(e) {
                e.write(Il("")), e.close();
                var t = e.parentWindow.Object;
                return e = null, t
            },
            kO = function() {
                var e = WO("iframe"),
                    t = "java" + Lo + ":",
                    r;
                return e.style.display = "none", UO.appendChild(e), e.src = String(t), r = e.contentWindow.document, r.open(), r.write(Il("document.F=Object")), r.close(), r.F
            },
            Cn, Nn = function() {
                try {
                    Cn = new ActiveXObject("htmlfile")
                } catch {}
                Nn = typeof document < "u" ? document.domain && Cn ? yl(Cn) : kO() : yl(Cn);
                for (var e = gl.length; e--;) delete Nn[qo][gl[e]];
                return Nn()
            };
        XO[ml] = !0;
        Tl.exports = Object.create || function(t, r) {
            var n;
            return t !== null ? (xo[qo] = FO(t), n = new xo, xo[qo] = null, n[ml] = t) : n = Nn(), r === void 0 ? n : GO(n, r)
        }
    });
    var Al = u((Xk, bl) => {
        var BO = co(),
            HO = Ol(),
            jO = Mr(),
            Po = BO("unscopables"),
            Do = Array.prototype;
        Do[Po] == null && jO.f(Do, Po, {
            configurable: !0,
            value: HO(null)
        });
        bl.exports = function(e) {
            Do[Po][e] = !0
        }
    });
    var Sl = u(() => {
        "use strict";
        var KO = cl(),
            zO = wo().includes,
            YO = Al();
        KO({
            target: "Array",
            proto: !0
        }, {
            includes: function(t) {
                return zO(this, t, arguments.length > 1 ? arguments[1] : void 0)
            }
        });
        YO("includes")
    });
    var Rl = u((Vk, wl) => {
        var QO = Te(),
            $O = et();
        wl.exports = function(e, t) {
            return $O(QO[e].prototype[t])
        }
    });
    var Nl = u((kk, Cl) => {
        Sl();
        var ZO = Rl();
        Cl.exports = ZO("Array", "includes")
    });
    var ql = u((Bk, xl) => {
        var JO = Nl();
        xl.exports = JO
    });
    var Pl = u((Hk, Ll) => {
        var eb = ql();
        Ll.exports = eb
    });
    var Mo = u((jk, Dl) => {
        var tb = typeof global == "object" && global && global.Object === Object && global;
        Dl.exports = tb
    });
    var rt = u((Kk, Ml) => {
        var rb = Mo(),
            nb = typeof self == "object" && self && self.Object === Object && self,
            ib = rb || nb || Function("return this")();
        Ml.exports = ib
    });
    var ir = u((zk, Fl) => {
        var ob = rt(),
            ab = ob.Symbol;
        Fl.exports = ab
    });
    var Wl = u((Yk, Ul) => {
        var Gl = ir(),
            Xl = Object.prototype,
            sb = Xl.hasOwnProperty,
            ub = Xl.toString,
            Xr = Gl ? Gl.toStringTag : void 0;

        function cb(e) {
            var t = sb.call(e, Xr),
                r = e[Xr];
            try {
                e[Xr] = void 0;
                var n = !0
            } catch {}
            var i = ub.call(e);
            return n && (t ? e[Xr] = r : delete e[Xr]), i
        }
        Ul.exports = cb
    });
    var kl = u((Qk, Vl) => {
        var lb = Object.prototype,
            fb = lb.toString;

        function db(e) {
            return fb.call(e)
        }
        Vl.exports = db
    });
    var wt = u(($k, jl) => {
        var Bl = ir(),
            pb = Wl(),
            vb = kl(),
            hb = "[object Null]",
            gb = "[object Undefined]",
            Hl = Bl ? Bl.toStringTag : void 0;

        function Eb(e) {
            return e == null ? e === void 0 ? gb : hb : Hl && Hl in Object(e) ? pb(e) : vb(e)
        }
        jl.exports = Eb
    });
    var Fo = u((Zk, Kl) => {
        function _b(e, t) {
            return function(r) {
                return e(t(r))
            }
        }
        Kl.exports = _b
    });
    var Go = u((Jk, zl) => {
        var yb = Fo(),
            mb = yb(Object.getPrototypeOf, Object);
        zl.exports = mb
    });
    var mt = u((eB, Yl) => {
        function Ib(e) {
            return e != null && typeof e == "object"
        }
        Yl.exports = Ib
    });
    var Xo = u((tB, $l) => {
        var Tb = wt(),
            Ob = Go(),
            bb = mt(),
            Ab = "[object Object]",
            Sb = Function.prototype,
            wb = Object.prototype,
            Ql = Sb.toString,
            Rb = wb.hasOwnProperty,
            Cb = Ql.call(Object);

        function Nb(e) {
            if (!bb(e) || Tb(e) != Ab) return !1;
            var t = Ob(e);
            if (t === null) return !0;
            var r = Rb.call(t, "constructor") && t.constructor;
            return typeof r == "function" && r instanceof r && Ql.call(r) == Cb
        }
        $l.exports = Nb
    });
    var Zl = u(Uo => {
        "use strict";
        Object.defineProperty(Uo, "__esModule", {
            value: !0
        });
        Uo.default = xb;

        function xb(e) {
            var t, r = e.Symbol;
            return typeof r == "function" ? r.observable ? t = r.observable : (t = r("observable"), r.observable = t) : t = "@@observable", t
        }
    });
    var Jl = u((Vo, Wo) => {
        "use strict";
        Object.defineProperty(Vo, "__esModule", {
            value: !0
        });
        var qb = Zl(),
            Lb = Pb(qb);

        function Pb(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var or;
        typeof self < "u" ? or = self : typeof window < "u" ? or = window : typeof global < "u" ? or = global : typeof Wo < "u" ? or = Wo : or = Function("return this")();
        var Db = (0, Lb.default)(or);
        Vo.default = Db
    });
    var ko = u(Ur => {
        "use strict";
        Ur.__esModule = !0;
        Ur.ActionTypes = void 0;
        Ur.default = nf;
        var Mb = Xo(),
            Fb = rf(Mb),
            Gb = Jl(),
            ef = rf(Gb);

        function rf(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var tf = Ur.ActionTypes = {
            INIT: "@@redux/INIT"
        };

        function nf(e, t, r) {
            var n;
            if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
                if (typeof r != "function") throw new Error("Expected the enhancer to be a function.");
                return r(nf)(e, t)
            }
            if (typeof e != "function") throw new Error("Expected the reducer to be a function.");
            var i = e,
                o = t,
                a = [],
                s = a,
                c = !1;

            function p() {
                s === a && (s = a.slice())
            }

            function y() {
                return o
            }

            function g(R) {
                if (typeof R != "function") throw new Error("Expected listener to be a function.");
                var X = !0;
                return p(), s.push(R),
                    function() {
                        if (X) {
                            X = !1, p();
                            var P = s.indexOf(R);
                            s.splice(P, 1)
                        }
                    }
            }

            function I(R) {
                if (!(0, Fb.default)(R)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
                if (typeof R.type > "u") throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
                if (c) throw new Error("Reducers may not dispatch actions.");
                try {
                    c = !0, o = i(o, R)
                } finally {
                    c = !1
                }
                for (var X = a = s, q = 0; q < X.length; q++) X[q]();
                return R
            }

            function T(R) {
                if (typeof R != "function") throw new Error("Expected the nextReducer to be a function.");
                i = R, I({
                    type: tf.INIT
                })
            }

            function N() {
                var R, X = g;
                return R = {
                    subscribe: function(P) {
                        if (typeof P != "object") throw new TypeError("Expected the observer to be an object.");

                        function A() {
                            P.next && P.next(y())
                        }
                        A();
                        var W = X(A);
                        return {
                            unsubscribe: W
                        }
                    }
                }, R[ef.default] = function() {
                    return this
                }, R
            }
            return I({
                type: tf.INIT
            }), n = {
                dispatch: I,
                subscribe: g,
                getState: y,
                replaceReducer: T
            }, n[ef.default] = N, n
        }
    });
    var Ho = u(Bo => {
        "use strict";
        Bo.__esModule = !0;
        Bo.default = Xb;

        function Xb(e) {
            typeof console < "u" && typeof console.error == "function" && console.error(e);
            try {
                throw new Error(e)
            } catch {}
        }
    });
    var sf = u(jo => {
        "use strict";
        jo.__esModule = !0;
        jo.default = Bb;
        var of = ko(), Ub = Xo(), oB = af(Ub), Wb = Ho(), aB = af(Wb);

        function af(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function Vb(e, t) {
            var r = t && t.type,
                n = r && '"' + r.toString() + '"' || "an action";
            return "Given action " + n + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state.'
        }

        function kb(e) {
            Object.keys(e).forEach(function(t) {
                var r = e[t],
                    n = r(void 0, {
                        type: of .ActionTypes.INIT
                    });
                if (typeof n > "u") throw new Error('Reducer "' + t + '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');
                var i = "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".");
                if (typeof r(void 0, {
                        type: i
                    }) > "u") throw new Error('Reducer "' + t + '" returned undefined when probed with a random type. ' + ("Don't try to handle " + of .ActionTypes.INIT + ' or other actions in "redux/*" ') + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.")
            })
        }

        function Bb(e) {
            for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
                var i = t[n];
                typeof e[i] == "function" && (r[i] = e[i])
            }
            var o = Object.keys(r);
            if (!1) var a;
            var s;
            try {
                kb(r)
            } catch (c) {
                s = c
            }
            return function() {
                var p = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0],
                    y = arguments[1];
                if (s) throw s;
                if (!1) var g;
                for (var I = !1, T = {}, N = 0; N < o.length; N++) {
                    var R = o[N],
                        X = r[R],
                        q = p[R],
                        P = X(q, y);
                    if (typeof P > "u") {
                        var A = Vb(R, y);
                        throw new Error(A)
                    }
                    T[R] = P, I = I || P !== q
                }
                return I ? T : p
            }
        }
    });
    var cf = u(Ko => {
        "use strict";
        Ko.__esModule = !0;
        Ko.default = Hb;

        function uf(e, t) {
            return function() {
                return t(e.apply(void 0, arguments))
            }
        }

        function Hb(e, t) {
            if (typeof e == "function") return uf(e, t);
            if (typeof e != "object" || e === null) throw new Error("bindActionCreators expected an object or a function, instead received " + (e === null ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
            for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
                var o = r[i],
                    a = e[o];
                typeof a == "function" && (n[o] = uf(a, t))
            }
            return n
        }
    });
    var Yo = u(zo => {
        "use strict";
        zo.__esModule = !0;
        zo.default = jb;

        function jb() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            if (t.length === 0) return function(o) {
                return o
            };
            if (t.length === 1) return t[0];
            var n = t[t.length - 1],
                i = t.slice(0, -1);
            return function() {
                return i.reduceRight(function(o, a) {
                    return a(o)
                }, n.apply(void 0, arguments))
            }
        }
    });
    var lf = u(Qo => {
        "use strict";
        Qo.__esModule = !0;
        var Kb = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        };
        Qo.default = $b;
        var zb = Yo(),
            Yb = Qb(zb);

        function Qb(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function $b() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            return function(n) {
                return function(i, o, a) {
                    var s = n(i, o, a),
                        c = s.dispatch,
                        p = [],
                        y = {
                            getState: s.getState,
                            dispatch: function(I) {
                                return c(I)
                            }
                        };
                    return p = t.map(function(g) {
                        return g(y)
                    }), c = Yb.default.apply(void 0, p)(s.dispatch), Kb({}, s, {
                        dispatch: c
                    })
                }
            }
        }
    });
    var $o = u(Ke => {
        "use strict";
        Ke.__esModule = !0;
        Ke.compose = Ke.applyMiddleware = Ke.bindActionCreators = Ke.combineReducers = Ke.createStore = void 0;
        var Zb = ko(),
            Jb = ar(Zb),
            eA = sf(),
            tA = ar(eA),
            rA = cf(),
            nA = ar(rA),
            iA = lf(),
            oA = ar(iA),
            aA = Yo(),
            sA = ar(aA),
            uA = Ho(),
            fB = ar(uA);

        function ar(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Ke.createStore = Jb.default;
        Ke.combineReducers = tA.default;
        Ke.bindActionCreators = nA.default;
        Ke.applyMiddleware = oA.default;
        Ke.compose = sA.default
    });
    var ff = u(xe => {
        "use strict";
        Object.defineProperty(xe, "__esModule", {
            value: !0
        });
        xe.QuickEffectIds = xe.QuickEffectDirectionConsts = xe.EventTypeConsts = xe.EventLimitAffectedElements = xe.EventContinuousMouseAxes = xe.EventBasedOn = xe.EventAppliesTo = void 0;
        var cA = {
            NAVBAR_OPEN: "NAVBAR_OPEN",
            NAVBAR_CLOSE: "NAVBAR_CLOSE",
            TAB_ACTIVE: "TAB_ACTIVE",
            TAB_INACTIVE: "TAB_INACTIVE",
            SLIDER_ACTIVE: "SLIDER_ACTIVE",
            SLIDER_INACTIVE: "SLIDER_INACTIVE",
            DROPDOWN_OPEN: "DROPDOWN_OPEN",
            DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
            MOUSE_CLICK: "MOUSE_CLICK",
            MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
            MOUSE_DOWN: "MOUSE_DOWN",
            MOUSE_UP: "MOUSE_UP",
            MOUSE_OVER: "MOUSE_OVER",
            MOUSE_OUT: "MOUSE_OUT",
            MOUSE_MOVE: "MOUSE_MOVE",
            MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
            SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
            SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
            SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
            ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
            ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
            PAGE_START: "PAGE_START",
            PAGE_FINISH: "PAGE_FINISH",
            PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
            PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
            PAGE_SCROLL: "PAGE_SCROLL"
        };
        xe.EventTypeConsts = cA;
        var lA = {
            ELEMENT: "ELEMENT",
            CLASS: "CLASS",
            PAGE: "PAGE"
        };
        xe.EventAppliesTo = lA;
        var fA = {
            ELEMENT: "ELEMENT",
            VIEWPORT: "VIEWPORT"
        };
        xe.EventBasedOn = fA;
        var dA = {
            X_AXIS: "X_AXIS",
            Y_AXIS: "Y_AXIS"
        };
        xe.EventContinuousMouseAxes = dA;
        var pA = {
            CHILDREN: "CHILDREN",
            SIBLINGS: "SIBLINGS",
            IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN"
        };
        xe.EventLimitAffectedElements = pA;
        var vA = {
            FADE_EFFECT: "FADE_EFFECT",
            SLIDE_EFFECT: "SLIDE_EFFECT",
            GROW_EFFECT: "GROW_EFFECT",
            SHRINK_EFFECT: "SHRINK_EFFECT",
            SPIN_EFFECT: "SPIN_EFFECT",
            FLY_EFFECT: "FLY_EFFECT",
            POP_EFFECT: "POP_EFFECT",
            FLIP_EFFECT: "FLIP_EFFECT",
            JIGGLE_EFFECT: "JIGGLE_EFFECT",
            PULSE_EFFECT: "PULSE_EFFECT",
            DROP_EFFECT: "DROP_EFFECT",
            BLINK_EFFECT: "BLINK_EFFECT",
            BOUNCE_EFFECT: "BOUNCE_EFFECT",
            FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
            FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
            RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
            JELLO_EFFECT: "JELLO_EFFECT",
            GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
            SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
            PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT"
        };
        xe.QuickEffectIds = vA;
        var hA = {
            LEFT: "LEFT",
            RIGHT: "RIGHT",
            BOTTOM: "BOTTOM",
            TOP: "TOP",
            BOTTOM_LEFT: "BOTTOM_LEFT",
            BOTTOM_RIGHT: "BOTTOM_RIGHT",
            TOP_RIGHT: "TOP_RIGHT",
            TOP_LEFT: "TOP_LEFT",
            CLOCKWISE: "CLOCKWISE",
            COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE"
        };
        xe.QuickEffectDirectionConsts = hA
    });
    var Zo = u(sr => {
        "use strict";
        Object.defineProperty(sr, "__esModule", {
            value: !0
        });
        sr.ActionTypeConsts = sr.ActionAppliesTo = void 0;
        var gA = {
            TRANSFORM_MOVE: "TRANSFORM_MOVE",
            TRANSFORM_SCALE: "TRANSFORM_SCALE",
            TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
            TRANSFORM_SKEW: "TRANSFORM_SKEW",
            STYLE_OPACITY: "STYLE_OPACITY",
            STYLE_SIZE: "STYLE_SIZE",
            STYLE_FILTER: "STYLE_FILTER",
            STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
            STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
            STYLE_BORDER: "STYLE_BORDER",
            STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
            PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
            GENERAL_DISPLAY: "GENERAL_DISPLAY",
            GENERAL_START_ACTION: "GENERAL_START_ACTION",
            GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
            GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
            GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
            GENERAL_LOOP: "GENERAL_LOOP",
            STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW"
        };
        sr.ActionTypeConsts = gA;
        var EA = {
            ELEMENT: "ELEMENT",
            ELEMENT_CLASS: "ELEMENT_CLASS",
            TRIGGER_ELEMENT: "TRIGGER_ELEMENT"
        };
        sr.ActionAppliesTo = EA
    });
    var df = u(xn => {
        "use strict";
        Object.defineProperty(xn, "__esModule", {
            value: !0
        });
        xn.InteractionTypeConsts = void 0;
        var _A = {
            MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
            MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
            MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
            SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
            SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
            MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
            PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
            PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
            PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
            NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
            DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
            ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
            TAB_INTERACTION: "TAB_INTERACTION",
            SLIDER_INTERACTION: "SLIDER_INTERACTION"
        };
        xn.InteractionTypeConsts = _A
    });
    var pf = u(qn => {
        "use strict";
        Object.defineProperty(qn, "__esModule", {
            value: !0
        });
        qn.ReducedMotionTypes = void 0;
        var yA = Zo(),
            {
                TRANSFORM_MOVE: mA,
                TRANSFORM_SCALE: IA,
                TRANSFORM_ROTATE: TA,
                TRANSFORM_SKEW: OA,
                STYLE_SIZE: bA,
                STYLE_FILTER: AA,
                STYLE_FONT_VARIATION: SA
            } = yA.ActionTypeConsts,
            wA = {
                [mA]: !0,
                [IA]: !0,
                [TA]: !0,
                [OA]: !0,
                [bA]: !0,
                [AA]: !0,
                [SA]: !0
            };
        qn.ReducedMotionTypes = wA
    });
    var vf = u(le => {
        "use strict";
        Object.defineProperty(le, "__esModule", {
            value: !0
        });
        le.IX2_VIEWPORT_WIDTH_CHANGED = le.IX2_TEST_FRAME_RENDERED = le.IX2_STOP_REQUESTED = le.IX2_SESSION_STOPPED = le.IX2_SESSION_STARTED = le.IX2_SESSION_INITIALIZED = le.IX2_RAW_DATA_IMPORTED = le.IX2_PREVIEW_REQUESTED = le.IX2_PLAYBACK_REQUESTED = le.IX2_PARAMETER_CHANGED = le.IX2_MEDIA_QUERIES_DEFINED = le.IX2_INSTANCE_STARTED = le.IX2_INSTANCE_REMOVED = le.IX2_INSTANCE_ADDED = le.IX2_EVENT_STATE_CHANGED = le.IX2_EVENT_LISTENER_ADDED = le.IX2_ELEMENT_STATE_CHANGED = le.IX2_CLEAR_REQUESTED = le.IX2_ANIMATION_FRAME_CHANGED = le.IX2_ACTION_LIST_PLAYBACK_CHANGED = void 0;
        var RA = "IX2_RAW_DATA_IMPORTED";
        le.IX2_RAW_DATA_IMPORTED = RA;
        var CA = "IX2_SESSION_INITIALIZED";
        le.IX2_SESSION_INITIALIZED = CA;
        var NA = "IX2_SESSION_STARTED";
        le.IX2_SESSION_STARTED = NA;
        var xA = "IX2_SESSION_STOPPED";
        le.IX2_SESSION_STOPPED = xA;
        var qA = "IX2_PREVIEW_REQUESTED";
        le.IX2_PREVIEW_REQUESTED = qA;
        var LA = "IX2_PLAYBACK_REQUESTED";
        le.IX2_PLAYBACK_REQUESTED = LA;
        var PA = "IX2_STOP_REQUESTED";
        le.IX2_STOP_REQUESTED = PA;
        var DA = "IX2_CLEAR_REQUESTED";
        le.IX2_CLEAR_REQUESTED = DA;
        var MA = "IX2_EVENT_LISTENER_ADDED";
        le.IX2_EVENT_LISTENER_ADDED = MA;
        var FA = "IX2_EVENT_STATE_CHANGED";
        le.IX2_EVENT_STATE_CHANGED = FA;
        var GA = "IX2_ANIMATION_FRAME_CHANGED";
        le.IX2_ANIMATION_FRAME_CHANGED = GA;
        var XA = "IX2_PARAMETER_CHANGED";
        le.IX2_PARAMETER_CHANGED = XA;
        var UA = "IX2_INSTANCE_ADDED";
        le.IX2_INSTANCE_ADDED = UA;
        var WA = "IX2_INSTANCE_STARTED";
        le.IX2_INSTANCE_STARTED = WA;
        var VA = "IX2_INSTANCE_REMOVED";
        le.IX2_INSTANCE_REMOVED = VA;
        var kA = "IX2_ELEMENT_STATE_CHANGED";
        le.IX2_ELEMENT_STATE_CHANGED = kA;
        var BA = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
        le.IX2_ACTION_LIST_PLAYBACK_CHANGED = BA;
        var HA = "IX2_VIEWPORT_WIDTH_CHANGED";
        le.IX2_VIEWPORT_WIDTH_CHANGED = HA;
        var jA = "IX2_MEDIA_QUERIES_DEFINED";
        le.IX2_MEDIA_QUERIES_DEFINED = jA;
        var KA = "IX2_TEST_FRAME_RENDERED";
        le.IX2_TEST_FRAME_RENDERED = KA
    });
    var hf = u(D => {
        "use strict";
        Object.defineProperty(D, "__esModule", {
            value: !0
        });
        D.W_MOD_JS = D.W_MOD_IX = D.WILL_CHANGE = D.WIDTH = D.WF_PAGE = D.TRANSLATE_Z = D.TRANSLATE_Y = D.TRANSLATE_X = D.TRANSLATE_3D = D.TRANSFORM = D.SKEW_Y = D.SKEW_X = D.SKEW = D.SIBLINGS = D.SCALE_Z = D.SCALE_Y = D.SCALE_X = D.SCALE_3D = D.ROTATE_Z = D.ROTATE_Y = D.ROTATE_X = D.RENDER_TRANSFORM = D.RENDER_STYLE = D.RENDER_PLUGIN = D.RENDER_GENERAL = D.PRESERVE_3D = D.PLAIN_OBJECT = D.PARENT = D.OPACITY = D.IX2_ID_DELIMITER = D.IMMEDIATE_CHILDREN = D.HTML_ELEMENT = D.HEIGHT = D.FONT_VARIATION_SETTINGS = D.FLEX = D.FILTER = D.DISPLAY = D.CONFIG_Z_VALUE = D.CONFIG_Z_UNIT = D.CONFIG_Y_VALUE = D.CONFIG_Y_UNIT = D.CONFIG_X_VALUE = D.CONFIG_X_UNIT = D.CONFIG_VALUE = D.CONFIG_UNIT = D.COMMA_DELIMITER = D.COLOR = D.COLON_DELIMITER = D.CHILDREN = D.BOUNDARY_SELECTOR = D.BORDER_COLOR = D.BAR_DELIMITER = D.BACKGROUND_COLOR = D.BACKGROUND = D.AUTO = D.ABSTRACT_NODE = void 0;
        var zA = "|";
        D.IX2_ID_DELIMITER = zA;
        var YA = "data-wf-page";
        D.WF_PAGE = YA;
        var QA = "w-mod-js";
        D.W_MOD_JS = QA;
        var $A = "w-mod-ix";
        D.W_MOD_IX = $A;
        var ZA = ".w-dyn-item";
        D.BOUNDARY_SELECTOR = ZA;
        var JA = "xValue";
        D.CONFIG_X_VALUE = JA;
        var eS = "yValue";
        D.CONFIG_Y_VALUE = eS;
        var tS = "zValue";
        D.CONFIG_Z_VALUE = tS;
        var rS = "value";
        D.CONFIG_VALUE = rS;
        var nS = "xUnit";
        D.CONFIG_X_UNIT = nS;
        var iS = "yUnit";
        D.CONFIG_Y_UNIT = iS;
        var oS = "zUnit";
        D.CONFIG_Z_UNIT = oS;
        var aS = "unit";
        D.CONFIG_UNIT = aS;
        var sS = "transform";
        D.TRANSFORM = sS;
        var uS = "translateX";
        D.TRANSLATE_X = uS;
        var cS = "translateY";
        D.TRANSLATE_Y = cS;
        var lS = "translateZ";
        D.TRANSLATE_Z = lS;
        var fS = "translate3d";
        D.TRANSLATE_3D = fS;
        var dS = "scaleX";
        D.SCALE_X = dS;
        var pS = "scaleY";
        D.SCALE_Y = pS;
        var vS = "scaleZ";
        D.SCALE_Z = vS;
        var hS = "scale3d";
        D.SCALE_3D = hS;
        var gS = "rotateX";
        D.ROTATE_X = gS;
        var ES = "rotateY";
        D.ROTATE_Y = ES;
        var _S = "rotateZ";
        D.ROTATE_Z = _S;
        var yS = "skew";
        D.SKEW = yS;
        var mS = "skewX";
        D.SKEW_X = mS;
        var IS = "skewY";
        D.SKEW_Y = IS;
        var TS = "opacity";
        D.OPACITY = TS;
        var OS = "filter";
        D.FILTER = OS;
        var bS = "font-variation-settings";
        D.FONT_VARIATION_SETTINGS = bS;
        var AS = "width";
        D.WIDTH = AS;
        var SS = "height";
        D.HEIGHT = SS;
        var wS = "backgroundColor";
        D.BACKGROUND_COLOR = wS;
        var RS = "background";
        D.BACKGROUND = RS;
        var CS = "borderColor";
        D.BORDER_COLOR = CS;
        var NS = "color";
        D.COLOR = NS;
        var xS = "display";
        D.DISPLAY = xS;
        var qS = "flex";
        D.FLEX = qS;
        var LS = "willChange";
        D.WILL_CHANGE = LS;
        var PS = "AUTO";
        D.AUTO = PS;
        var DS = ",";
        D.COMMA_DELIMITER = DS;
        var MS = ":";
        D.COLON_DELIMITER = MS;
        var FS = "|";
        D.BAR_DELIMITER = FS;
        var GS = "CHILDREN";
        D.CHILDREN = GS;
        var XS = "IMMEDIATE_CHILDREN";
        D.IMMEDIATE_CHILDREN = XS;
        var US = "SIBLINGS";
        D.SIBLINGS = US;
        var WS = "PARENT";
        D.PARENT = WS;
        var VS = "preserve-3d";
        D.PRESERVE_3D = VS;
        var kS = "HTML_ELEMENT";
        D.HTML_ELEMENT = kS;
        var BS = "PLAIN_OBJECT";
        D.PLAIN_OBJECT = BS;
        var HS = "ABSTRACT_NODE";
        D.ABSTRACT_NODE = HS;
        var jS = "RENDER_TRANSFORM";
        D.RENDER_TRANSFORM = jS;
        var KS = "RENDER_GENERAL";
        D.RENDER_GENERAL = KS;
        var zS = "RENDER_STYLE";
        D.RENDER_STYLE = zS;
        var YS = "RENDER_PLUGIN";
        D.RENDER_PLUGIN = YS
    });
    var Be = u(Re => {
        "use strict";
        var gf = er().default;
        Object.defineProperty(Re, "__esModule", {
            value: !0
        });
        var Ln = {
            IX2EngineActionTypes: !0,
            IX2EngineConstants: !0
        };
        Re.IX2EngineConstants = Re.IX2EngineActionTypes = void 0;
        var Jo = ff();
        Object.keys(Jo).forEach(function(e) {
            e === "default" || e === "__esModule" || Object.prototype.hasOwnProperty.call(Ln, e) || e in Re && Re[e] === Jo[e] || Object.defineProperty(Re, e, {
                enumerable: !0,
                get: function() {
                    return Jo[e]
                }
            })
        });
        var ea = Zo();
        Object.keys(ea).forEach(function(e) {
            e === "default" || e === "__esModule" || Object.prototype.hasOwnProperty.call(Ln, e) || e in Re && Re[e] === ea[e] || Object.defineProperty(Re, e, {
                enumerable: !0,
                get: function() {
                    return ea[e]
                }
            })
        });
        var ta = df();
        Object.keys(ta).forEach(function(e) {
            e === "default" || e === "__esModule" || Object.prototype.hasOwnProperty.call(Ln, e) || e in Re && Re[e] === ta[e] || Object.defineProperty(Re, e, {
                enumerable: !0,
                get: function() {
                    return ta[e]
                }
            })
        });
        var ra = pf();
        Object.keys(ra).forEach(function(e) {
            e === "default" || e === "__esModule" || Object.prototype.hasOwnProperty.call(Ln, e) || e in Re && Re[e] === ra[e] || Object.defineProperty(Re, e, {
                enumerable: !0,
                get: function() {
                    return ra[e]
                }
            })
        });
        var QS = gf(vf());
        Re.IX2EngineActionTypes = QS;
        var $S = gf(hf());
        Re.IX2EngineConstants = $S
    });
    var Ef = u(Pn => {
        "use strict";
        Object.defineProperty(Pn, "__esModule", {
            value: !0
        });
        Pn.ixData = void 0;
        var ZS = Be(),
            {
                IX2_RAW_DATA_IMPORTED: JS
            } = ZS.IX2EngineActionTypes,
            ew = (e = Object.freeze({}), t) => {
                switch (t.type) {
                    case JS:
                        return t.payload.ixData || Object.freeze({});
                    default:
                        return e
                }
            };
        Pn.ixData = ew
    });
    var Wr = u((IB, It) => {
        function na() {
            return It.exports = na = Object.assign ? Object.assign.bind() : function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            }, It.exports.__esModule = !0, It.exports.default = It.exports, na.apply(this, arguments)
        }
        It.exports = na, It.exports.__esModule = !0, It.exports.default = It.exports
    });
    var ur = u(be => {
        "use strict";
        Object.defineProperty(be, "__esModule", {
            value: !0
        });
        var tw = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
            return typeof e
        } : function(e) {
            return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        be.clone = Mn;
        be.addLast = mf;
        be.addFirst = If;
        be.removeLast = Tf;
        be.removeFirst = Of;
        be.insert = bf;
        be.removeAt = Af;
        be.replaceAt = Sf;
        be.getIn = Fn;
        be.set = Gn;
        be.setIn = Xn;
        be.update = Rf;
        be.updateIn = Cf;
        be.merge = Nf;
        be.mergeDeep = xf;
        be.mergeIn = qf;
        be.omit = Lf;
        be.addDefaults = Pf;
        var _f = "INVALID_ARGS";

        function yf(e) {
            throw new Error(e)
        }

        function ia(e) {
            var t = Object.keys(e);
            return Object.getOwnPropertySymbols ? t.concat(Object.getOwnPropertySymbols(e)) : t
        }
        var rw = {}.hasOwnProperty;

        function Mn(e) {
            if (Array.isArray(e)) return e.slice();
            for (var t = ia(e), r = {}, n = 0; n < t.length; n++) {
                var i = t[n];
                r[i] = e[i]
            }
            return r
        }

        function He(e, t, r) {
            var n = r;
            n == null && yf(_f);
            for (var i = !1, o = arguments.length, a = Array(o > 3 ? o - 3 : 0), s = 3; s < o; s++) a[s - 3] = arguments[s];
            for (var c = 0; c < a.length; c++) {
                var p = a[c];
                if (p != null) {
                    var y = ia(p);
                    if (y.length)
                        for (var g = 0; g <= y.length; g++) {
                            var I = y[g];
                            if (!(e && n[I] !== void 0)) {
                                var T = p[I];
                                t && Dn(n[I]) && Dn(T) && (T = He(e, t, n[I], T)), !(T === void 0 || T === n[I]) && (i || (i = !0, n = Mn(n)), n[I] = T)
                            }
                        }
                }
            }
            return n
        }

        function Dn(e) {
            var t = typeof e > "u" ? "undefined" : tw(e);
            return e != null && (t === "object" || t === "function")
        }

        function mf(e, t) {
            return Array.isArray(t) ? e.concat(t) : e.concat([t])
        }

        function If(e, t) {
            return Array.isArray(t) ? t.concat(e) : [t].concat(e)
        }

        function Tf(e) {
            return e.length ? e.slice(0, e.length - 1) : e
        }

        function Of(e) {
            return e.length ? e.slice(1) : e
        }

        function bf(e, t, r) {
            return e.slice(0, t).concat(Array.isArray(r) ? r : [r]).concat(e.slice(t))
        }

        function Af(e, t) {
            return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1))
        }

        function Sf(e, t, r) {
            if (e[t] === r) return e;
            for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
            return i[t] = r, i
        }

        function Fn(e, t) {
            if (!Array.isArray(t) && yf(_f), e != null) {
                for (var r = e, n = 0; n < t.length; n++) {
                    var i = t[n];
                    if (r = r ? .[i], r === void 0) return r
                }
                return r
            }
        }

        function Gn(e, t, r) {
            var n = typeof t == "number" ? [] : {},
                i = e ? ? n;
            if (i[t] === r) return i;
            var o = Mn(i);
            return o[t] = r, o
        }

        function wf(e, t, r, n) {
            var i = void 0,
                o = t[n];
            if (n === t.length - 1) i = r;
            else {
                var a = Dn(e) && Dn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
                i = wf(a, t, r, n + 1)
            }
            return Gn(e, o, i)
        }

        function Xn(e, t, r) {
            return t.length ? wf(e, t, r, 0) : r
        }

        function Rf(e, t, r) {
            var n = e ? .[t],
                i = r(n);
            return Gn(e, t, i)
        }

        function Cf(e, t, r) {
            var n = Fn(e, t),
                i = r(n);
            return Xn(e, t, i)
        }

        function Nf(e, t, r, n, i, o) {
            for (var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6; c < a; c++) s[c - 6] = arguments[c];
            return s.length ? He.call.apply(He, [null, !1, !1, e, t, r, n, i, o].concat(s)) : He(!1, !1, e, t, r, n, i, o)
        }

        function xf(e, t, r, n, i, o) {
            for (var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6; c < a; c++) s[c - 6] = arguments[c];
            return s.length ? He.call.apply(He, [null, !1, !0, e, t, r, n, i, o].concat(s)) : He(!1, !0, e, t, r, n, i, o)
        }

        function qf(e, t, r, n, i, o, a) {
            var s = Fn(e, t);
            s == null && (s = {});
            for (var c = void 0, p = arguments.length, y = Array(p > 7 ? p - 7 : 0), g = 7; g < p; g++) y[g - 7] = arguments[g];
            return y.length ? c = He.call.apply(He, [null, !1, !1, s, r, n, i, o, a].concat(y)) : c = He(!1, !1, s, r, n, i, o, a), Xn(e, t, c)
        }

        function Lf(e, t) {
            for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
                if (rw.call(e, r[i])) {
                    n = !0;
                    break
                }
            if (!n) return e;
            for (var o = {}, a = ia(e), s = 0; s < a.length; s++) {
                var c = a[s];
                r.indexOf(c) >= 0 || (o[c] = e[c])
            }
            return o
        }

        function Pf(e, t, r, n, i, o) {
            for (var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6; c < a; c++) s[c - 6] = arguments[c];
            return s.length ? He.call.apply(He, [null, !0, !1, e, t, r, n, i, o].concat(s)) : He(!0, !1, e, t, r, n, i, o)
        }
        var nw = {
            clone: Mn,
            addLast: mf,
            addFirst: If,
            removeLast: Tf,
            removeFirst: Of,
            insert: bf,
            removeAt: Af,
            replaceAt: Sf,
            getIn: Fn,
            set: Gn,
            setIn: Xn,
            update: Rf,
            updateIn: Cf,
            merge: Nf,
            mergeDeep: xf,
            mergeIn: qf,
            omit: Lf,
            addDefaults: Pf
        };
        be.default = nw
    });
    var Mf = u(Un => {
        "use strict";
        var iw = lt().default;
        Object.defineProperty(Un, "__esModule", {
            value: !0
        });
        Un.ixRequest = void 0;
        var ow = iw(Wr()),
            aw = Be(),
            sw = ur(),
            {
                IX2_PREVIEW_REQUESTED: uw,
                IX2_PLAYBACK_REQUESTED: cw,
                IX2_STOP_REQUESTED: lw,
                IX2_CLEAR_REQUESTED: fw
            } = aw.IX2EngineActionTypes,
            dw = {
                preview: {},
                playback: {},
                stop: {},
                clear: {}
            },
            Df = Object.create(null, {
                [uw]: {
                    value: "preview"
                },
                [cw]: {
                    value: "playback"
                },
                [lw]: {
                    value: "stop"
                },
                [fw]: {
                    value: "clear"
                }
            }),
            pw = (e = dw, t) => {
                if (t.type in Df) {
                    let r = [Df[t.type]];
                    return (0, sw.setIn)(e, [r], (0, ow.default)({}, t.payload))
                }
                return e
            };
        Un.ixRequest = pw
    });
    var Gf = u(Wn => {
        "use strict";
        Object.defineProperty(Wn, "__esModule", {
            value: !0
        });
        Wn.ixSession = void 0;
        var vw = Be(),
            dt = ur(),
            {
                IX2_SESSION_INITIALIZED: hw,
                IX2_SESSION_STARTED: gw,
                IX2_TEST_FRAME_RENDERED: Ew,
                IX2_SESSION_STOPPED: _w,
                IX2_EVENT_LISTENER_ADDED: yw,
                IX2_EVENT_STATE_CHANGED: mw,
                IX2_ANIMATION_FRAME_CHANGED: Iw,
                IX2_ACTION_LIST_PLAYBACK_CHANGED: Tw,
                IX2_VIEWPORT_WIDTH_CHANGED: Ow,
                IX2_MEDIA_QUERIES_DEFINED: bw
            } = vw.IX2EngineActionTypes,
            Ff = {
                active: !1,
                tick: 0,
                eventListeners: [],
                eventState: {},
                playbackState: {},
                viewportWidth: 0,
                mediaQueryKey: null,
                hasBoundaryNodes: !1,
                hasDefinedMediaQueries: !1,
                reducedMotion: !1
            },
            Aw = 20,
            Sw = (e = Ff, t) => {
                switch (t.type) {
                    case hw:
                        {
                            let {
                                hasBoundaryNodes: r,
                                reducedMotion: n
                            } = t.payload;
                            return (0, dt.merge)(e, {
                                hasBoundaryNodes: r,
                                reducedMotion: n
                            })
                        }
                    case gw:
                        return (0, dt.set)(e, "active", !0);
                    case Ew:
                        {
                            let {
                                payload: {
                                    step: r = Aw
                                }
                            } = t;
                            return (0, dt.set)(e, "tick", e.tick + r)
                        }
                    case _w:
                        return Ff;
                    case Iw:
                        {
                            let {
                                payload: {
                                    now: r
                                }
                            } = t;
                            return (0, dt.set)(e, "tick", r)
                        }
                    case yw:
                        {
                            let r = (0, dt.addLast)(e.eventListeners, t.payload);
                            return (0, dt.set)(e, "eventListeners", r)
                        }
                    case mw:
                        {
                            let {
                                stateKey: r,
                                newState: n
                            } = t.payload;
                            return (0, dt.setIn)(e, ["eventState", r], n)
                        }
                    case Tw:
                        {
                            let {
                                actionListId: r,
                                isPlaying: n
                            } = t.payload;
                            return (0, dt.setIn)(e, ["playbackState", r], n)
                        }
                    case Ow:
                        {
                            let {
                                width: r,
                                mediaQueries: n
                            } = t.payload,
                            i = n.length,
                            o = null;
                            for (let a = 0; a < i; a++) {
                                let {
                                    key: s,
                                    min: c,
                                    max: p
                                } = n[a];
                                if (r >= c && r <= p) {
                                    o = s;
                                    break
                                }
                            }
                            return (0, dt.merge)(e, {
                                viewportWidth: r,
                                mediaQueryKey: o
                            })
                        }
                    case bw:
                        return (0, dt.set)(e, "hasDefinedMediaQueries", !0);
                    default:
                        return e
                }
            };
        Wn.ixSession = Sw
    });
    var Uf = u((AB, Xf) => {
        function ww() {
            this.__data__ = [], this.size = 0
        }
        Xf.exports = ww
    });
    var Vn = u((SB, Wf) => {
        function Rw(e, t) {
            return e === t || e !== e && t !== t
        }
        Wf.exports = Rw
    });
    var Vr = u((wB, Vf) => {
        var Cw = Vn();

        function Nw(e, t) {
            for (var r = e.length; r--;)
                if (Cw(e[r][0], t)) return r;
            return -1
        }
        Vf.exports = Nw
    });
    var Bf = u((RB, kf) => {
        var xw = Vr(),
            qw = Array.prototype,
            Lw = qw.splice;

        function Pw(e) {
            var t = this.__data__,
                r = xw(t, e);
            if (r < 0) return !1;
            var n = t.length - 1;
            return r == n ? t.pop() : Lw.call(t, r, 1), --this.size, !0
        }
        kf.exports = Pw
    });
    var jf = u((CB, Hf) => {
        var Dw = Vr();

        function Mw(e) {
            var t = this.__data__,
                r = Dw(t, e);
            return r < 0 ? void 0 : t[r][1]
        }
        Hf.exports = Mw
    });
    var zf = u((NB, Kf) => {
        var Fw = Vr();

        function Gw(e) {
            return Fw(this.__data__, e) > -1
        }
        Kf.exports = Gw
    });
    var Qf = u((xB, Yf) => {
        var Xw = Vr();

        function Uw(e, t) {
            var r = this.__data__,
                n = Xw(r, e);
            return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this
        }
        Yf.exports = Uw
    });
    var kr = u((qB, $f) => {
        var Ww = Uf(),
            Vw = Bf(),
            kw = jf(),
            Bw = zf(),
            Hw = Qf();

        function cr(e) {
            var t = -1,
                r = e == null ? 0 : e.length;
            for (this.clear(); ++t < r;) {
                var n = e[t];
                this.set(n[0], n[1])
            }
        }
        cr.prototype.clear = Ww;
        cr.prototype.delete = Vw;
        cr.prototype.get = kw;
        cr.prototype.has = Bw;
        cr.prototype.set = Hw;
        $f.exports = cr
    });
    var Jf = u((LB, Zf) => {
        var jw = kr();

        function Kw() {
            this.__data__ = new jw, this.size = 0
        }
        Zf.exports = Kw
    });
    var td = u((PB, ed) => {
        function zw(e) {
            var t = this.__data__,
                r = t.delete(e);
            return this.size = t.size, r
        }
        ed.exports = zw
    });
    var nd = u((DB, rd) => {
        function Yw(e) {
            return this.__data__.get(e)
        }
        rd.exports = Yw
    });
    var od = u((MB, id) => {
        function Qw(e) {
            return this.__data__.has(e)
        }
        id.exports = Qw
    });
    var pt = u((FB, ad) => {
        function $w(e) {
            var t = typeof e;
            return e != null && (t == "object" || t == "function")
        }
        ad.exports = $w
    });
    var oa = u((GB, sd) => {
        var Zw = wt(),
            Jw = pt(),
            e0 = "[object AsyncFunction]",
            t0 = "[object Function]",
            r0 = "[object GeneratorFunction]",
            n0 = "[object Proxy]";

        function i0(e) {
            if (!Jw(e)) return !1;
            var t = Zw(e);
            return t == t0 || t == r0 || t == e0 || t == n0
        }
        sd.exports = i0
    });
    var cd = u((XB, ud) => {
        var o0 = rt(),
            a0 = o0["__core-js_shared__"];
        ud.exports = a0
    });
    var dd = u((UB, fd) => {
        var aa = cd(),
            ld = function() {
                var e = /[^.]+$/.exec(aa && aa.keys && aa.keys.IE_PROTO || "");
                return e ? "Symbol(src)_1." + e : ""
            }();

        function s0(e) {
            return !!ld && ld in e
        }
        fd.exports = s0
    });
    var sa = u((WB, pd) => {
        var u0 = Function.prototype,
            c0 = u0.toString;

        function l0(e) {
            if (e != null) {
                try {
                    return c0.call(e)
                } catch {}
                try {
                    return e + ""
                } catch {}
            }
            return ""
        }
        pd.exports = l0
    });
    var hd = u((VB, vd) => {
        var f0 = oa(),
            d0 = dd(),
            p0 = pt(),
            v0 = sa(),
            h0 = /[\\^$.*+?()[\]{}|]/g,
            g0 = /^\[object .+?Constructor\]$/,
            E0 = Function.prototype,
            _0 = Object.prototype,
            y0 = E0.toString,
            m0 = _0.hasOwnProperty,
            I0 = RegExp("^" + y0.call(m0).replace(h0, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

        function T0(e) {
            if (!p0(e) || d0(e)) return !1;
            var t = f0(e) ? I0 : g0;
            return t.test(v0(e))
        }
        vd.exports = T0
    });
    var Ed = u((kB, gd) => {
        function O0(e, t) {
            return e ? .[t]
        }
        gd.exports = O0
    });
    var Rt = u((BB, _d) => {
        var b0 = hd(),
            A0 = Ed();

        function S0(e, t) {
            var r = A0(e, t);
            return b0(r) ? r : void 0
        }
        _d.exports = S0
    });
    var kn = u((HB, yd) => {
        var w0 = Rt(),
            R0 = rt(),
            C0 = w0(R0, "Map");
        yd.exports = C0
    });
    var Br = u((jB, md) => {
        var N0 = Rt(),
            x0 = N0(Object, "create");
        md.exports = x0
    });
    var Od = u((KB, Td) => {
        var Id = Br();

        function q0() {
            this.__data__ = Id ? Id(null) : {}, this.size = 0
        }
        Td.exports = q0
    });
    var Ad = u((zB, bd) => {
        function L0(e) {
            var t = this.has(e) && delete this.__data__[e];
            return this.size -= t ? 1 : 0, t
        }
        bd.exports = L0
    });
    var wd = u((YB, Sd) => {
        var P0 = Br(),
            D0 = "__lodash_hash_undefined__",
            M0 = Object.prototype,
            F0 = M0.hasOwnProperty;

        function G0(e) {
            var t = this.__data__;
            if (P0) {
                var r = t[e];
                return r === D0 ? void 0 : r
            }
            return F0.call(t, e) ? t[e] : void 0
        }
        Sd.exports = G0
    });
    var Cd = u((QB, Rd) => {
        var X0 = Br(),
            U0 = Object.prototype,
            W0 = U0.hasOwnProperty;

        function V0(e) {
            var t = this.__data__;
            return X0 ? t[e] !== void 0 : W0.call(t, e)
        }
        Rd.exports = V0
    });
    var xd = u(($B, Nd) => {
        var k0 = Br(),
            B0 = "__lodash_hash_undefined__";

        function H0(e, t) {
            var r = this.__data__;
            return this.size += this.has(e) ? 0 : 1, r[e] = k0 && t === void 0 ? B0 : t, this
        }
        Nd.exports = H0
    });
    var Ld = u((ZB, qd) => {
        var j0 = Od(),
            K0 = Ad(),
            z0 = wd(),
            Y0 = Cd(),
            Q0 = xd();

        function lr(e) {
            var t = -1,
                r = e == null ? 0 : e.length;
            for (this.clear(); ++t < r;) {
                var n = e[t];
                this.set(n[0], n[1])
            }
        }
        lr.prototype.clear = j0;
        lr.prototype.delete = K0;
        lr.prototype.get = z0;
        lr.prototype.has = Y0;
        lr.prototype.set = Q0;
        qd.exports = lr
    });
    var Md = u((JB, Dd) => {
        var Pd = Ld(),
            $0 = kr(),
            Z0 = kn();

        function J0() {
            this.size = 0, this.__data__ = {
                hash: new Pd,
                map: new(Z0 || $0),
                string: new Pd
            }
        }
        Dd.exports = J0
    });
    var Gd = u((eH, Fd) => {
        function eR(e) {
            var t = typeof e;
            return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
        }
        Fd.exports = eR
    });
    var Hr = u((tH, Xd) => {
        var tR = Gd();

        function rR(e, t) {
            var r = e.__data__;
            return tR(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map
        }
        Xd.exports = rR
    });
    var Wd = u((rH, Ud) => {
        var nR = Hr();

        function iR(e) {
            var t = nR(this, e).delete(e);
            return this.size -= t ? 1 : 0, t
        }
        Ud.exports = iR
    });
    var kd = u((nH, Vd) => {
        var oR = Hr();

        function aR(e) {
            return oR(this, e).get(e)
        }
        Vd.exports = aR
    });
    var Hd = u((iH, Bd) => {
        var sR = Hr();

        function uR(e) {
            return sR(this, e).has(e)
        }
        Bd.exports = uR
    });
    var Kd = u((oH, jd) => {
        var cR = Hr();

        function lR(e, t) {
            var r = cR(this, e),
                n = r.size;
            return r.set(e, t), this.size += r.size == n ? 0 : 1, this
        }
        jd.exports = lR
    });
    var Bn = u((aH, zd) => {
        var fR = Md(),
            dR = Wd(),
            pR = kd(),
            vR = Hd(),
            hR = Kd();

        function fr(e) {
            var t = -1,
                r = e == null ? 0 : e.length;
            for (this.clear(); ++t < r;) {
                var n = e[t];
                this.set(n[0], n[1])
            }
        }
        fr.prototype.clear = fR;
        fr.prototype.delete = dR;
        fr.prototype.get = pR;
        fr.prototype.has = vR;
        fr.prototype.set = hR;
        zd.exports = fr
    });
    var Qd = u((sH, Yd) => {
        var gR = kr(),
            ER = kn(),
            _R = Bn(),
            yR = 200;

        function mR(e, t) {
            var r = this.__data__;
            if (r instanceof gR) {
                var n = r.__data__;
                if (!ER || n.length < yR - 1) return n.push([e, t]), this.size = ++r.size, this;
                r = this.__data__ = new _R(n)
            }
            return r.set(e, t), this.size = r.size, this
        }
        Yd.exports = mR
    });
    var ua = u((uH, $d) => {
        var IR = kr(),
            TR = Jf(),
            OR = td(),
            bR = nd(),
            AR = od(),
            SR = Qd();

        function dr(e) {
            var t = this.__data__ = new IR(e);
            this.size = t.size
        }
        dr.prototype.clear = TR;
        dr.prototype.delete = OR;
        dr.prototype.get = bR;
        dr.prototype.has = AR;
        dr.prototype.set = SR;
        $d.exports = dr
    });
    var Jd = u((cH, Zd) => {
        var wR = "__lodash_hash_undefined__";

        function RR(e) {
            return this.__data__.set(e, wR), this
        }
        Zd.exports = RR
    });
    var tp = u((lH, ep) => {
        function CR(e) {
            return this.__data__.has(e)
        }
        ep.exports = CR
    });
    var np = u((fH, rp) => {
        var NR = Bn(),
            xR = Jd(),
            qR = tp();

        function Hn(e) {
            var t = -1,
                r = e == null ? 0 : e.length;
            for (this.__data__ = new NR; ++t < r;) this.add(e[t])
        }
        Hn.prototype.add = Hn.prototype.push = xR;
        Hn.prototype.has = qR;
        rp.exports = Hn
    });
    var op = u((dH, ip) => {
        function LR(e, t) {
            for (var r = -1, n = e == null ? 0 : e.length; ++r < n;)
                if (t(e[r], r, e)) return !0;
            return !1
        }
        ip.exports = LR
    });
    var sp = u((pH, ap) => {
        function PR(e, t) {
            return e.has(t)
        }
        ap.exports = PR
    });
    var ca = u((vH, up) => {
        var DR = np(),
            MR = op(),
            FR = sp(),
            GR = 1,
            XR = 2;

        function UR(e, t, r, n, i, o) {
            var a = r & GR,
                s = e.length,
                c = t.length;
            if (s != c && !(a && c > s)) return !1;
            var p = o.get(e),
                y = o.get(t);
            if (p && y) return p == t && y == e;
            var g = -1,
                I = !0,
                T = r & XR ? new DR : void 0;
            for (o.set(e, t), o.set(t, e); ++g < s;) {
                var N = e[g],
                    R = t[g];
                if (n) var X = a ? n(R, N, g, t, e, o) : n(N, R, g, e, t, o);
                if (X !== void 0) {
                    if (X) continue;
                    I = !1;
                    break
                }
                if (T) {
                    if (!MR(t, function(q, P) {
                            if (!FR(T, P) && (N === q || i(N, q, r, n, o))) return T.push(P)
                        })) {
                        I = !1;
                        break
                    }
                } else if (!(N === R || i(N, R, r, n, o))) {
                    I = !1;
                    break
                }
            }
            return o.delete(e), o.delete(t), I
        }
        up.exports = UR
    });
    var lp = u((hH, cp) => {
        var WR = rt(),
            VR = WR.Uint8Array;
        cp.exports = VR
    });
    var dp = u((gH, fp) => {
        function kR(e) {
            var t = -1,
                r = Array(e.size);
            return e.forEach(function(n, i) {
                r[++t] = [i, n]
            }), r
        }
        fp.exports = kR
    });
    var vp = u((EH, pp) => {
        function BR(e) {
            var t = -1,
                r = Array(e.size);
            return e.forEach(function(n) {
                r[++t] = n
            }), r
        }
        pp.exports = BR
    });
    var yp = u((_H, _p) => {
        var hp = ir(),
            gp = lp(),
            HR = Vn(),
            jR = ca(),
            KR = dp(),
            zR = vp(),
            YR = 1,
            QR = 2,
            $R = "[object Boolean]",
            ZR = "[object Date]",
            JR = "[object Error]",
            eC = "[object Map]",
            tC = "[object Number]",
            rC = "[object RegExp]",
            nC = "[object Set]",
            iC = "[object String]",
            oC = "[object Symbol]",
            aC = "[object ArrayBuffer]",
            sC = "[object DataView]",
            Ep = hp ? hp.prototype : void 0,
            la = Ep ? Ep.valueOf : void 0;

        function uC(e, t, r, n, i, o, a) {
            switch (r) {
                case sC:
                    if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                    e = e.buffer, t = t.buffer;
                case aC:
                    return !(e.byteLength != t.byteLength || !o(new gp(e), new gp(t)));
                case $R:
                case ZR:
                case tC:
                    return HR(+e, +t);
                case JR:
                    return e.name == t.name && e.message == t.message;
                case rC:
                case iC:
                    return e == t + "";
                case eC:
                    var s = KR;
                case nC:
                    var c = n & YR;
                    if (s || (s = zR), e.size != t.size && !c) return !1;
                    var p = a.get(e);
                    if (p) return p == t;
                    n |= QR, a.set(e, t);
                    var y = jR(s(e), s(t), n, i, o, a);
                    return a.delete(e), y;
                case oC:
                    if (la) return la.call(e) == la.call(t)
            }
            return !1
        }
        _p.exports = uC
    });
    var jn = u((yH, mp) => {
        function cC(e, t) {
            for (var r = -1, n = t.length, i = e.length; ++r < n;) e[i + r] = t[r];
            return e
        }
        mp.exports = cC
    });
    var qe = u((mH, Ip) => {
        var lC = Array.isArray;
        Ip.exports = lC
    });
    var fa = u((IH, Tp) => {
        var fC = jn(),
            dC = qe();

        function pC(e, t, r) {
            var n = t(e);
            return dC(e) ? n : fC(n, r(e))
        }
        Tp.exports = pC
    });
    var bp = u((TH, Op) => {
        function vC(e, t) {
            for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n;) {
                var a = e[r];
                t(a, r, e) && (o[i++] = a)
            }
            return o
        }
        Op.exports = vC
    });
    var da = u((OH, Ap) => {
        function hC() {
            return []
        }
        Ap.exports = hC
    });
    var pa = u((bH, wp) => {
        var gC = bp(),
            EC = da(),
            _C = Object.prototype,
            yC = _C.propertyIsEnumerable,
            Sp = Object.getOwnPropertySymbols,
            mC = Sp ? function(e) {
                return e == null ? [] : (e = Object(e), gC(Sp(e), function(t) {
                    return yC.call(e, t)
                }))
            } : EC;
        wp.exports = mC
    });
    var Cp = u((AH, Rp) => {
        function IC(e, t) {
            for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
            return n
        }
        Rp.exports = IC
    });
    var xp = u((SH, Np) => {
        var TC = wt(),
            OC = mt(),
            bC = "[object Arguments]";

        function AC(e) {
            return OC(e) && TC(e) == bC
        }
        Np.exports = AC
    });
    var jr = u((wH, Pp) => {
        var qp = xp(),
            SC = mt(),
            Lp = Object.prototype,
            wC = Lp.hasOwnProperty,
            RC = Lp.propertyIsEnumerable,
            CC = qp(function() {
                return arguments
            }()) ? qp : function(e) {
                return SC(e) && wC.call(e, "callee") && !RC.call(e, "callee")
            };
        Pp.exports = CC
    });
    var Mp = u((RH, Dp) => {
        function NC() {
            return !1
        }
        Dp.exports = NC
    });
    var Kn = u((Kr, pr) => {
        var xC = rt(),
            qC = Mp(),
            Xp = typeof Kr == "object" && Kr && !Kr.nodeType && Kr,
            Fp = Xp && typeof pr == "object" && pr && !pr.nodeType && pr,
            LC = Fp && Fp.exports === Xp,
            Gp = LC ? xC.Buffer : void 0,
            PC = Gp ? Gp.isBuffer : void 0,
            DC = PC || qC;
        pr.exports = DC
    });
    var zn = u((CH, Up) => {
        var MC = 9007199254740991,
            FC = /^(?:0|[1-9]\d*)$/;

        function GC(e, t) {
            var r = typeof e;
            return t = t ? ? MC, !!t && (r == "number" || r != "symbol" && FC.test(e)) && e > -1 && e % 1 == 0 && e < t
        }
        Up.exports = GC
    });
    var Yn = u((NH, Wp) => {
        var XC = 9007199254740991;

        function UC(e) {
            return typeof e == "number" && e > -1 && e % 1 == 0 && e <= XC
        }
        Wp.exports = UC
    });
    var kp = u((xH, Vp) => {
        var WC = wt(),
            VC = Yn(),
            kC = mt(),
            BC = "[object Arguments]",
            HC = "[object Array]",
            jC = "[object Boolean]",
            KC = "[object Date]",
            zC = "[object Error]",
            YC = "[object Function]",
            QC = "[object Map]",
            $C = "[object Number]",
            ZC = "[object Object]",
            JC = "[object RegExp]",
            eN = "[object Set]",
            tN = "[object String]",
            rN = "[object WeakMap]",
            nN = "[object ArrayBuffer]",
            iN = "[object DataView]",
            oN = "[object Float32Array]",
            aN = "[object Float64Array]",
            sN = "[object Int8Array]",
            uN = "[object Int16Array]",
            cN = "[object Int32Array]",
            lN = "[object Uint8Array]",
            fN = "[object Uint8ClampedArray]",
            dN = "[object Uint16Array]",
            pN = "[object Uint32Array]",
            Ie = {};
        Ie[oN] = Ie[aN] = Ie[sN] = Ie[uN] = Ie[cN] = Ie[lN] = Ie[fN] = Ie[dN] = Ie[pN] = !0;
        Ie[BC] = Ie[HC] = Ie[nN] = Ie[jC] = Ie[iN] = Ie[KC] = Ie[zC] = Ie[YC] = Ie[QC] = Ie[$C] = Ie[ZC] = Ie[JC] = Ie[eN] = Ie[tN] = Ie[rN] = !1;

        function vN(e) {
            return kC(e) && VC(e.length) && !!Ie[WC(e)]
        }
        Vp.exports = vN
    });
    var Hp = u((qH, Bp) => {
        function hN(e) {
            return function(t) {
                return e(t)
            }
        }
        Bp.exports = hN
    });
    var Kp = u((zr, vr) => {
        var gN = Mo(),
            jp = typeof zr == "object" && zr && !zr.nodeType && zr,
            Yr = jp && typeof vr == "object" && vr && !vr.nodeType && vr,
            EN = Yr && Yr.exports === jp,
            va = EN && gN.process,
            _N = function() {
                try {
                    var e = Yr && Yr.require && Yr.require("util").types;
                    return e || va && va.binding && va.binding("util")
                } catch {}
            }();
        vr.exports = _N
    });
    var Qn = u((LH, Qp) => {
        var yN = kp(),
            mN = Hp(),
            zp = Kp(),
            Yp = zp && zp.isTypedArray,
            IN = Yp ? mN(Yp) : yN;
        Qp.exports = IN
    });
    var ha = u((PH, $p) => {
        var TN = Cp(),
            ON = jr(),
            bN = qe(),
            AN = Kn(),
            SN = zn(),
            wN = Qn(),
            RN = Object.prototype,
            CN = RN.hasOwnProperty;

        function NN(e, t) {
            var r = bN(e),
                n = !r && ON(e),
                i = !r && !n && AN(e),
                o = !r && !n && !i && wN(e),
                a = r || n || i || o,
                s = a ? TN(e.length, String) : [],
                c = s.length;
            for (var p in e)(t || CN.call(e, p)) && !(a && (p == "length" || i && (p == "offset" || p == "parent") || o && (p == "buffer" || p == "byteLength" || p == "byteOffset") || SN(p, c))) && s.push(p);
            return s
        }
        $p.exports = NN
    });
    var $n = u((DH, Zp) => {
        var xN = Object.prototype;

        function qN(e) {
            var t = e && e.constructor,
                r = typeof t == "function" && t.prototype || xN;
            return e === r
        }
        Zp.exports = qN
    });
    var ev = u((MH, Jp) => {
        var LN = Fo(),
            PN = LN(Object.keys, Object);
        Jp.exports = PN
    });
    var Zn = u((FH, tv) => {
        var DN = $n(),
            MN = ev(),
            FN = Object.prototype,
            GN = FN.hasOwnProperty;

        function XN(e) {
            if (!DN(e)) return MN(e);
            var t = [];
            for (var r in Object(e)) GN.call(e, r) && r != "constructor" && t.push(r);
            return t
        }
        tv.exports = XN
    });
    var Wt = u((GH, rv) => {
        var UN = oa(),
            WN = Yn();

        function VN(e) {
            return e != null && WN(e.length) && !UN(e)
        }
        rv.exports = VN
    });
    var Qr = u((XH, nv) => {
        var kN = ha(),
            BN = Zn(),
            HN = Wt();

        function jN(e) {
            return HN(e) ? kN(e) : BN(e)
        }
        nv.exports = jN
    });
    var ov = u((UH, iv) => {
        var KN = fa(),
            zN = pa(),
            YN = Qr();

        function QN(e) {
            return KN(e, YN, zN)
        }
        iv.exports = QN
    });
    var uv = u((WH, sv) => {
        var av = ov(),
            $N = 1,
            ZN = Object.prototype,
            JN = ZN.hasOwnProperty;

        function ex(e, t, r, n, i, o) {
            var a = r & $N,
                s = av(e),
                c = s.length,
                p = av(t),
                y = p.length;
            if (c != y && !a) return !1;
            for (var g = c; g--;) {
                var I = s[g];
                if (!(a ? I in t : JN.call(t, I))) return !1
            }
            var T = o.get(e),
                N = o.get(t);
            if (T && N) return T == t && N == e;
            var R = !0;
            o.set(e, t), o.set(t, e);
            for (var X = a; ++g < c;) {
                I = s[g];
                var q = e[I],
                    P = t[I];
                if (n) var A = a ? n(P, q, I, t, e, o) : n(q, P, I, e, t, o);
                if (!(A === void 0 ? q === P || i(q, P, r, n, o) : A)) {
                    R = !1;
                    break
                }
                X || (X = I == "constructor")
            }
            if (R && !X) {
                var W = e.constructor,
                    V = t.constructor;
                W != V && "constructor" in e && "constructor" in t && !(typeof W == "function" && W instanceof W && typeof V == "function" && V instanceof V) && (R = !1)
            }
            return o.delete(e), o.delete(t), R
        }
        sv.exports = ex
    });
    var lv = u((VH, cv) => {
        var tx = Rt(),
            rx = rt(),
            nx = tx(rx, "DataView");
        cv.exports = nx
    });
    var dv = u((kH, fv) => {
        var ix = Rt(),
            ox = rt(),
            ax = ix(ox, "Promise");
        fv.exports = ax
    });
    var vv = u((BH, pv) => {
        var sx = Rt(),
            ux = rt(),
            cx = sx(ux, "Set");
        pv.exports = cx
    });
    var ga = u((HH, hv) => {
        var lx = Rt(),
            fx = rt(),
            dx = lx(fx, "WeakMap");
        hv.exports = dx
    });
    var Jn = u((jH, Tv) => {
        var Ea = lv(),
            _a = kn(),
            ya = dv(),
            ma = vv(),
            Ia = ga(),
            Iv = wt(),
            hr = sa(),
            gv = "[object Map]",
            px = "[object Object]",
            Ev = "[object Promise]",
            _v = "[object Set]",
            yv = "[object WeakMap]",
            mv = "[object DataView]",
            vx = hr(Ea),
            hx = hr(_a),
            gx = hr(ya),
            Ex = hr(ma),
            _x = hr(Ia),
            Vt = Iv;
        (Ea && Vt(new Ea(new ArrayBuffer(1))) != mv || _a && Vt(new _a) != gv || ya && Vt(ya.resolve()) != Ev || ma && Vt(new ma) != _v || Ia && Vt(new Ia) != yv) && (Vt = function(e) {
            var t = Iv(e),
                r = t == px ? e.constructor : void 0,
                n = r ? hr(r) : "";
            if (n) switch (n) {
                case vx:
                    return mv;
                case hx:
                    return gv;
                case gx:
                    return Ev;
                case Ex:
                    return _v;
                case _x:
                    return yv
            }
            return t
        });
        Tv.exports = Vt
    });
    var Nv = u((KH, Cv) => {
        var Ta = ua(),
            yx = ca(),
            mx = yp(),
            Ix = uv(),
            Ov = Jn(),
            bv = qe(),
            Av = Kn(),
            Tx = Qn(),
            Ox = 1,
            Sv = "[object Arguments]",
            wv = "[object Array]",
            ei = "[object Object]",
            bx = Object.prototype,
            Rv = bx.hasOwnProperty;

        function Ax(e, t, r, n, i, o) {
            var a = bv(e),
                s = bv(t),
                c = a ? wv : Ov(e),
                p = s ? wv : Ov(t);
            c = c == Sv ? ei : c, p = p == Sv ? ei : p;
            var y = c == ei,
                g = p == ei,
                I = c == p;
            if (I && Av(e)) {
                if (!Av(t)) return !1;
                a = !0, y = !1
            }
            if (I && !y) return o || (o = new Ta), a || Tx(e) ? yx(e, t, r, n, i, o) : mx(e, t, c, r, n, i, o);
            if (!(r & Ox)) {
                var T = y && Rv.call(e, "__wrapped__"),
                    N = g && Rv.call(t, "__wrapped__");
                if (T || N) {
                    var R = T ? e.value() : e,
                        X = N ? t.value() : t;
                    return o || (o = new Ta), i(R, X, r, n, o)
                }
            }
            return I ? (o || (o = new Ta), Ix(e, t, r, n, i, o)) : !1
        }
        Cv.exports = Ax
    });
    var Oa = u((zH, Lv) => {
        var Sx = Nv(),
            xv = mt();

        function qv(e, t, r, n, i) {
            return e === t ? !0 : e == null || t == null || !xv(e) && !xv(t) ? e !== e && t !== t : Sx(e, t, r, n, qv, i)
        }
        Lv.exports = qv
    });
    var Dv = u((YH, Pv) => {
        var wx = ua(),
            Rx = Oa(),
            Cx = 1,
            Nx = 2;

        function xx(e, t, r, n) {
            var i = r.length,
                o = i,
                a = !n;
            if (e == null) return !o;
            for (e = Object(e); i--;) {
                var s = r[i];
                if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1
            }
            for (; ++i < o;) {
                s = r[i];
                var c = s[0],
                    p = e[c],
                    y = s[1];
                if (a && s[2]) {
                    if (p === void 0 && !(c in e)) return !1
                } else {
                    var g = new wx;
                    if (n) var I = n(p, y, c, e, t, g);
                    if (!(I === void 0 ? Rx(y, p, Cx | Nx, n, g) : I)) return !1
                }
            }
            return !0
        }
        Pv.exports = xx
    });
    var ba = u((QH, Mv) => {
        var qx = pt();

        function Lx(e) {
            return e === e && !qx(e)
        }
        Mv.exports = Lx
    });
    var Gv = u(($H, Fv) => {
        var Px = ba(),
            Dx = Qr();

        function Mx(e) {
            for (var t = Dx(e), r = t.length; r--;) {
                var n = t[r],
                    i = e[n];
                t[r] = [n, i, Px(i)]
            }
            return t
        }
        Fv.exports = Mx
    });
    var Aa = u((ZH, Xv) => {
        function Fx(e, t) {
            return function(r) {
                return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r))
            }
        }
        Xv.exports = Fx
    });
    var Wv = u((JH, Uv) => {
        var Gx = Dv(),
            Xx = Gv(),
            Ux = Aa();

        function Wx(e) {
            var t = Xx(e);
            return t.length == 1 && t[0][2] ? Ux(t[0][0], t[0][1]) : function(r) {
                return r === e || Gx(r, e, t)
            }
        }
        Uv.exports = Wx
    });
    var $r = u((e5, Vv) => {
        var Vx = wt(),
            kx = mt(),
            Bx = "[object Symbol]";

        function Hx(e) {
            return typeof e == "symbol" || kx(e) && Vx(e) == Bx
        }
        Vv.exports = Hx
    });
    var ti = u((t5, kv) => {
        var jx = qe(),
            Kx = $r(),
            zx = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            Yx = /^\w*$/;

        function Qx(e, t) {
            if (jx(e)) return !1;
            var r = typeof e;
            return r == "number" || r == "symbol" || r == "boolean" || e == null || Kx(e) ? !0 : Yx.test(e) || !zx.test(e) || t != null && e in Object(t)
        }
        kv.exports = Qx
    });
    var jv = u((r5, Hv) => {
        var Bv = Bn(),
            $x = "Expected a function";

        function Sa(e, t) {
            if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError($x);
            var r = function() {
                var n = arguments,
                    i = t ? t.apply(this, n) : n[0],
                    o = r.cache;
                if (o.has(i)) return o.get(i);
                var a = e.apply(this, n);
                return r.cache = o.set(i, a) || o, a
            };
            return r.cache = new(Sa.Cache || Bv), r
        }
        Sa.Cache = Bv;
        Hv.exports = Sa
    });
    var zv = u((n5, Kv) => {
        var Zx = jv(),
            Jx = 500;

        function eq(e) {
            var t = Zx(e, function(n) {
                    return r.size === Jx && r.clear(), n
                }),
                r = t.cache;
            return t
        }
        Kv.exports = eq
    });
    var Qv = u((i5, Yv) => {
        var tq = zv(),
            rq = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            nq = /\\(\\)?/g,
            iq = tq(function(e) {
                var t = [];
                return e.charCodeAt(0) === 46 && t.push(""), e.replace(rq, function(r, n, i, o) {
                    t.push(i ? o.replace(nq, "$1") : n || r)
                }), t
            });
        Yv.exports = iq
    });
    var wa = u((o5, $v) => {
        function oq(e, t) {
            for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
            return i
        }
        $v.exports = oq
    });
    var nh = u((a5, rh) => {
        var Zv = ir(),
            aq = wa(),
            sq = qe(),
            uq = $r(),
            cq = 1 / 0,
            Jv = Zv ? Zv.prototype : void 0,
            eh = Jv ? Jv.toString : void 0;

        function th(e) {
            if (typeof e == "string") return e;
            if (sq(e)) return aq(e, th) + "";
            if (uq(e)) return eh ? eh.call(e) : "";
            var t = e + "";
            return t == "0" && 1 / e == -cq ? "-0" : t
        }
        rh.exports = th
    });
    var oh = u((s5, ih) => {
        var lq = nh();

        function fq(e) {
            return e == null ? "" : lq(e)
        }
        ih.exports = fq
    });
    var Zr = u((u5, ah) => {
        var dq = qe(),
            pq = ti(),
            vq = Qv(),
            hq = oh();

        function gq(e, t) {
            return dq(e) ? e : pq(e, t) ? [e] : vq(hq(e))
        }
        ah.exports = gq
    });
    var gr = u((c5, sh) => {
        var Eq = $r(),
            _q = 1 / 0;

        function yq(e) {
            if (typeof e == "string" || Eq(e)) return e;
            var t = e + "";
            return t == "0" && 1 / e == -_q ? "-0" : t
        }
        sh.exports = yq
    });
    var ri = u((l5, uh) => {
        var mq = Zr(),
            Iq = gr();

        function Tq(e, t) {
            t = mq(t, e);
            for (var r = 0, n = t.length; e != null && r < n;) e = e[Iq(t[r++])];
            return r && r == n ? e : void 0
        }
        uh.exports = Tq
    });
    var ni = u((f5, ch) => {
        var Oq = ri();

        function bq(e, t, r) {
            var n = e == null ? void 0 : Oq(e, t);
            return n === void 0 ? r : n
        }
        ch.exports = bq
    });
    var fh = u((d5, lh) => {
        function Aq(e, t) {
            return e != null && t in Object(e)
        }
        lh.exports = Aq
    });
    var ph = u((p5, dh) => {
        var Sq = Zr(),
            wq = jr(),
            Rq = qe(),
            Cq = zn(),
            Nq = Yn(),
            xq = gr();

        function qq(e, t, r) {
            t = Sq(t, e);
            for (var n = -1, i = t.length, o = !1; ++n < i;) {
                var a = xq(t[n]);
                if (!(o = e != null && r(e, a))) break;
                e = e[a]
            }
            return o || ++n != i ? o : (i = e == null ? 0 : e.length, !!i && Nq(i) && Cq(a, i) && (Rq(e) || wq(e)))
        }
        dh.exports = qq
    });
    var hh = u((v5, vh) => {
        var Lq = fh(),
            Pq = ph();

        function Dq(e, t) {
            return e != null && Pq(e, t, Lq)
        }
        vh.exports = Dq
    });
    var Eh = u((h5, gh) => {
        var Mq = Oa(),
            Fq = ni(),
            Gq = hh(),
            Xq = ti(),
            Uq = ba(),
            Wq = Aa(),
            Vq = gr(),
            kq = 1,
            Bq = 2;

        function Hq(e, t) {
            return Xq(e) && Uq(t) ? Wq(Vq(e), t) : function(r) {
                var n = Fq(r, e);
                return n === void 0 && n === t ? Gq(r, e) : Mq(t, n, kq | Bq)
            }
        }
        gh.exports = Hq
    });
    var ii = u((g5, _h) => {
        function jq(e) {
            return e
        }
        _h.exports = jq
    });
    var Ra = u((E5, yh) => {
        function Kq(e) {
            return function(t) {
                return t ? .[e]
            }
        }
        yh.exports = Kq
    });
    var Ih = u((_5, mh) => {
        var zq = ri();

        function Yq(e) {
            return function(t) {
                return zq(t, e)
            }
        }
        mh.exports = Yq
    });
    var Oh = u((y5, Th) => {
        var Qq = Ra(),
            $q = Ih(),
            Zq = ti(),
            Jq = gr();

        function eL(e) {
            return Zq(e) ? Qq(Jq(e)) : $q(e)
        }
        Th.exports = eL
    });
    var Ct = u((m5, bh) => {
        var tL = Wv(),
            rL = Eh(),
            nL = ii(),
            iL = qe(),
            oL = Oh();

        function aL(e) {
            return typeof e == "function" ? e : e == null ? nL : typeof e == "object" ? iL(e) ? rL(e[0], e[1]) : tL(e) : oL(e)
        }
        bh.exports = aL
    });
    var Ca = u((I5, Ah) => {
        var sL = Ct(),
            uL = Wt(),
            cL = Qr();

        function lL(e) {
            return function(t, r, n) {
                var i = Object(t);
                if (!uL(t)) {
                    var o = sL(r, 3);
                    t = cL(t), r = function(s) {
                        return o(i[s], s, i)
                    }
                }
                var a = e(t, r, n);
                return a > -1 ? i[o ? t[a] : a] : void 0
            }
        }
        Ah.exports = lL
    });
    var Na = u((T5, Sh) => {
        function fL(e, t, r, n) {
            for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
                if (t(e[o], o, e)) return o;
            return -1
        }
        Sh.exports = fL
    });
    var Rh = u((O5, wh) => {
        var dL = /\s/;

        function pL(e) {
            for (var t = e.length; t-- && dL.test(e.charAt(t)););
            return t
        }
        wh.exports = pL
    });
    var Nh = u((b5, Ch) => {
        var vL = Rh(),
            hL = /^\s+/;

        function gL(e) {
            return e && e.slice(0, vL(e) + 1).replace(hL, "")
        }
        Ch.exports = gL
    });
    var oi = u((A5, Lh) => {
        var EL = Nh(),
            xh = pt(),
            _L = $r(),
            qh = 0 / 0,
            yL = /^[-+]0x[0-9a-f]+$/i,
            mL = /^0b[01]+$/i,
            IL = /^0o[0-7]+$/i,
            TL = parseInt;

        function OL(e) {
            if (typeof e == "number") return e;
            if (_L(e)) return qh;
            if (xh(e)) {
                var t = typeof e.valueOf == "function" ? e.valueOf() : e;
                e = xh(t) ? t + "" : t
            }
            if (typeof e != "string") return e === 0 ? e : +e;
            e = EL(e);
            var r = mL.test(e);
            return r || IL.test(e) ? TL(e.slice(2), r ? 2 : 8) : yL.test(e) ? qh : +e
        }
        Lh.exports = OL
    });
    var Mh = u((S5, Dh) => {
        var bL = oi(),
            Ph = 1 / 0,
            AL = 17976931348623157e292;

        function SL(e) {
            if (!e) return e === 0 ? e : 0;
            if (e = bL(e), e === Ph || e === -Ph) {
                var t = e < 0 ? -1 : 1;
                return t * AL
            }
            return e === e ? e : 0
        }
        Dh.exports = SL
    });
    var xa = u((w5, Fh) => {
        var wL = Mh();

        function RL(e) {
            var t = wL(e),
                r = t % 1;
            return t === t ? r ? t - r : t : 0
        }
        Fh.exports = RL
    });
    var Xh = u((R5, Gh) => {
        var CL = Na(),
            NL = Ct(),
            xL = xa(),
            qL = Math.max;

        function LL(e, t, r) {
            var n = e == null ? 0 : e.length;
            if (!n) return -1;
            var i = r == null ? 0 : xL(r);
            return i < 0 && (i = qL(n + i, 0)), CL(e, NL(t, 3), i)
        }
        Gh.exports = LL
    });
    var qa = u((C5, Uh) => {
        var PL = Ca(),
            DL = Xh(),
            ML = PL(DL);
        Uh.exports = ML
    });
    var si = u(Ge => {
        "use strict";
        var FL = lt().default;
        Object.defineProperty(Ge, "__esModule", {
            value: !0
        });
        Ge.withBrowser = Ge.TRANSFORM_STYLE_PREFIXED = Ge.TRANSFORM_PREFIXED = Ge.IS_BROWSER_ENV = Ge.FLEX_PREFIXED = Ge.ELEMENT_MATCHES = void 0;
        var GL = FL(qa()),
            Vh = typeof window < "u";
        Ge.IS_BROWSER_ENV = Vh;
        var ai = (e, t) => Vh ? e() : t;
        Ge.withBrowser = ai;
        var XL = ai(() => (0, GL.default)(["matches", "matchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector", "webkitMatchesSelector"], e => e in Element.prototype));
        Ge.ELEMENT_MATCHES = XL;
        var UL = ai(() => {
            let e = document.createElement("i"),
                t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
                r = "";
            try {
                let {
                    length: n
                } = t;
                for (let i = 0; i < n; i++) {
                    let o = t[i];
                    if (e.style.display = o, e.style.display === o) return o
                }
                return r
            } catch {
                return r
            }
        }, "flex");
        Ge.FLEX_PREFIXED = UL;
        var kh = ai(() => {
            let e = document.createElement("i");
            if (e.style.transform == null) {
                let t = ["Webkit", "Moz", "ms"],
                    r = "Transform",
                    {
                        length: n
                    } = t;
                for (let i = 0; i < n; i++) {
                    let o = t[i] + r;
                    if (e.style[o] !== void 0) return o
                }
            }
            return "transform"
        }, "transform");
        Ge.TRANSFORM_PREFIXED = kh;
        var Wh = kh.split("transform")[0],
            WL = Wh ? Wh + "TransformStyle" : "transformStyle";
        Ge.TRANSFORM_STYLE_PREFIXED = WL
    });
    var La = u((x5, zh) => {
        var VL = 4,
            kL = .001,
            BL = 1e-7,
            HL = 10,
            Jr = 11,
            ui = 1 / (Jr - 1),
            jL = typeof Float32Array == "function";

        function Bh(e, t) {
            return 1 - 3 * t + 3 * e
        }

        function Hh(e, t) {
            return 3 * t - 6 * e
        }

        function jh(e) {
            return 3 * e
        }

        function ci(e, t, r) {
            return ((Bh(t, r) * e + Hh(t, r)) * e + jh(t)) * e
        }

        function Kh(e, t, r) {
            return 3 * Bh(t, r) * e * e + 2 * Hh(t, r) * e + jh(t)
        }

        function KL(e, t, r, n, i) {
            var o, a, s = 0;
            do a = t + (r - t) / 2, o = ci(a, n, i) - e, o > 0 ? r = a : t = a; while (Math.abs(o) > BL && ++s < HL);
            return a
        }

        function zL(e, t, r, n) {
            for (var i = 0; i < VL; ++i) {
                var o = Kh(t, r, n);
                if (o === 0) return t;
                var a = ci(t, r, n) - e;
                t -= a / o
            }
            return t
        }
        zh.exports = function(t, r, n, i) {
            if (!(0 <= t && t <= 1 && 0 <= n && n <= 1)) throw new Error("bezier x values must be in [0, 1] range");
            var o = jL ? new Float32Array(Jr) : new Array(Jr);
            if (t !== r || n !== i)
                for (var a = 0; a < Jr; ++a) o[a] = ci(a * ui, t, n);

            function s(c) {
                for (var p = 0, y = 1, g = Jr - 1; y !== g && o[y] <= c; ++y) p += ui;
                --y;
                var I = (c - o[y]) / (o[y + 1] - o[y]),
                    T = p + I * ui,
                    N = Kh(T, t, n);
                return N >= kL ? zL(c, T, t, n) : N === 0 ? T : KL(c, p, p + ui, t, n)
            }
            return function(p) {
                return t === r && n === i ? p : p === 0 ? 0 : p === 1 ? 1 : ci(s(p), r, i)
            }
        }
    });
    var Pa = u(ce => {
        "use strict";
        var YL = lt().default;
        Object.defineProperty(ce, "__esModule", {
            value: !0
        });
        ce.bounce = xP;
        ce.bouncePast = qP;
        ce.easeOut = ce.easeInOut = ce.easeIn = ce.ease = void 0;
        ce.inBack = TP;
        ce.inCirc = _P;
        ce.inCubic = nP;
        ce.inElastic = AP;
        ce.inExpo = hP;
        ce.inOutBack = bP;
        ce.inOutCirc = mP;
        ce.inOutCubic = oP;
        ce.inOutElastic = wP;
        ce.inOutExpo = EP;
        ce.inOutQuad = rP;
        ce.inOutQuart = uP;
        ce.inOutQuint = fP;
        ce.inOutSine = vP;
        ce.inQuad = eP;
        ce.inQuart = aP;
        ce.inQuint = cP;
        ce.inSine = dP;
        ce.outBack = OP;
        ce.outBounce = IP;
        ce.outCirc = yP;
        ce.outCubic = iP;
        ce.outElastic = SP;
        ce.outExpo = gP;
        ce.outQuad = tP;
        ce.outQuart = sP;
        ce.outQuint = lP;
        ce.outSine = pP;
        ce.swingFrom = CP;
        ce.swingFromTo = RP;
        ce.swingTo = NP;
        var li = YL(La()),
            Tt = 1.70158,
            QL = (0, li.default)(.25, .1, .25, 1);
        ce.ease = QL;
        var $L = (0, li.default)(.42, 0, 1, 1);
        ce.easeIn = $L;
        var ZL = (0, li.default)(0, 0, .58, 1);
        ce.easeOut = ZL;
        var JL = (0, li.default)(.42, 0, .58, 1);
        ce.easeInOut = JL;

        function eP(e) {
            return Math.pow(e, 2)
        }

        function tP(e) {
            return -(Math.pow(e - 1, 2) - 1)
        }

        function rP(e) {
            return (e /= .5) < 1 ? .5 * Math.pow(e, 2) : -.5 * ((e -= 2) * e - 2)
        }

        function nP(e) {
            return Math.pow(e, 3)
        }

        function iP(e) {
            return Math.pow(e - 1, 3) + 1
        }

        function oP(e) {
            return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2)
        }

        function aP(e) {
            return Math.pow(e, 4)
        }

        function sP(e) {
            return -(Math.pow(e - 1, 4) - 1)
        }

        function uP(e) {
            return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
        }

        function cP(e) {
            return Math.pow(e, 5)
        }

        function lP(e) {
            return Math.pow(e - 1, 5) + 1
        }

        function fP(e) {
            return (e /= .5) < 1 ? .5 * Math.pow(e, 5) : .5 * (Math.pow(e - 2, 5) + 2)
        }

        function dP(e) {
            return -Math.cos(e * (Math.PI / 2)) + 1
        }

        function pP(e) {
            return Math.sin(e * (Math.PI / 2))
        }

        function vP(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        }

        function hP(e) {
            return e === 0 ? 0 : Math.pow(2, 10 * (e - 1))
        }

        function gP(e) {
            return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1
        }

        function EP(e) {
            return e === 0 ? 0 : e === 1 ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (-Math.pow(2, -10 * --e) + 2)
        }

        function _P(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }

        function yP(e) {
            return Math.sqrt(1 - Math.pow(e - 1, 2))
        }

        function mP(e) {
            return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }

        function IP(e) {
            return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }

        function TP(e) {
            let t = Tt;
            return e * e * ((t + 1) * e - t)
        }

        function OP(e) {
            let t = Tt;
            return (e -= 1) * e * ((t + 1) * e + t) + 1
        }

        function bP(e) {
            let t = Tt;
            return (e /= .5) < 1 ? .5 * (e * e * (((t *= 1.525) + 1) * e - t)) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
        }

        function AP(e) {
            let t = Tt,
                r = 0,
                n = 1;
            return e === 0 ? 0 : e === 1 ? 1 : (r || (r = .3), n < 1 ? (n = 1, t = r / 4) : t = r / (2 * Math.PI) * Math.asin(1 / n), -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r)))
        }

        function SP(e) {
            let t = Tt,
                r = 0,
                n = 1;
            return e === 0 ? 0 : e === 1 ? 1 : (r || (r = .3), n < 1 ? (n = 1, t = r / 4) : t = r / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / r) + 1)
        }

        function wP(e) {
            let t = Tt,
                r = 0,
                n = 1;
            return e === 0 ? 0 : (e /= 1 / 2) === 2 ? 1 : (r || (r = .3 * 1.5), n < 1 ? (n = 1, t = r / 4) : t = r / (2 * Math.PI) * Math.asin(1 / n), e < 1 ? -.5 * (n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r)) : n * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r) * .5 + 1)
        }

        function RP(e) {
            let t = Tt;
            return (e /= .5) < 1 ? .5 * (e * e * (((t *= 1.525) + 1) * e - t)) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
        }

        function CP(e) {
            let t = Tt;
            return e * e * ((t + 1) * e - t)
        }

        function NP(e) {
            let t = Tt;
            return (e -= 1) * e * ((t + 1) * e + t) + 1
        }

        function xP(e) {
            return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }

        function qP(e) {
            return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : e < 2.5 / 2.75 ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }
    });
    var Ma = u(en => {
        "use strict";
        var LP = lt().default,
            PP = er().default;
        Object.defineProperty(en, "__esModule", {
            value: !0
        });
        en.applyEasing = FP;
        en.createBezierEasing = MP;
        en.optimizeFloat = Da;
        var Yh = PP(Pa()),
            DP = LP(La());

        function Da(e, t = 5, r = 10) {
            let n = Math.pow(r, t),
                i = Number(Math.round(e * n) / n);
            return Math.abs(i) > 1e-4 ? i : 0
        }

        function MP(e) {
            return (0, DP.default)(...e)
        }

        function FP(e, t, r) {
            return t === 0 ? 0 : t === 1 ? 1 : Da(r ? t > 0 ? r(t) : t : t > 0 && e && Yh[e] ? Yh[e](t) : t)
        }
    });
    var Jh = u(Er => {
        "use strict";
        Object.defineProperty(Er, "__esModule", {
            value: !0
        });
        Er.createElementState = Zh;
        Er.ixElements = void 0;
        Er.mergeActionState = Fa;
        var fi = ur(),
            $h = Be(),
            {
                HTML_ELEMENT: P5,
                PLAIN_OBJECT: GP,
                ABSTRACT_NODE: D5,
                CONFIG_X_VALUE: XP,
                CONFIG_Y_VALUE: UP,
                CONFIG_Z_VALUE: WP,
                CONFIG_VALUE: VP,
                CONFIG_X_UNIT: kP,
                CONFIG_Y_UNIT: BP,
                CONFIG_Z_UNIT: HP,
                CONFIG_UNIT: jP
            } = $h.IX2EngineConstants,
            {
                IX2_SESSION_STOPPED: KP,
                IX2_INSTANCE_ADDED: zP,
                IX2_ELEMENT_STATE_CHANGED: YP
            } = $h.IX2EngineActionTypes,
            Qh = {},
            QP = "refState",
            $P = (e = Qh, t = {}) => {
                switch (t.type) {
                    case KP:
                        return Qh;
                    case zP:
                        {
                            let {
                                elementId: r,
                                element: n,
                                origin: i,
                                actionItem: o,
                                refType: a
                            } = t.payload,
                            {
                                actionTypeId: s
                            } = o,
                            c = e;
                            return (0, fi.getIn)(c, [r, n]) !== n && (c = Zh(c, n, a, r, o)),
                            Fa(c, r, s, i, o)
                        }
                    case YP:
                        {
                            let {
                                elementId: r,
                                actionTypeId: n,
                                current: i,
                                actionItem: o
                            } = t.payload;
                            return Fa(e, r, n, i, o)
                        }
                    default:
                        return e
                }
            };
        Er.ixElements = $P;

        function Zh(e, t, r, n, i) {
            let o = r === GP ? (0, fi.getIn)(i, ["config", "target", "objectId"]) : null;
            return (0, fi.mergeIn)(e, [n], {
                id: n,
                ref: t,
                refId: o,
                refType: r
            })
        }

        function Fa(e, t, r, n, i) {
            let o = JP(i),
                a = [t, QP, r];
            return (0, fi.mergeIn)(e, a, n, o)
        }
        var ZP = [
            [XP, kP],
            [UP, BP],
            [WP, HP],
            [VP, jP]
        ];

        function JP(e) {
            let {
                config: t
            } = e;
            return ZP.reduce((r, n) => {
                let i = n[0],
                    o = n[1],
                    a = t[i],
                    s = t[o];
                return a != null && s != null && (r[o] = s), r
            }, {})
        }
    });
    var eg = u(Le => {
        "use strict";
        Object.defineProperty(Le, "__esModule", {
            value: !0
        });
        Le.renderPlugin = Le.getPluginOrigin = Le.getPluginDuration = Le.getPluginDestination = Le.getPluginConfig = Le.createPluginInstance = Le.clearPlugin = void 0;
        var eD = e => e.value;
        Le.getPluginConfig = eD;
        var tD = (e, t) => {
            if (t.config.duration !== "auto") return null;
            let r = parseFloat(e.getAttribute("data-duration"));
            return r > 0 ? r * 1e3 : parseFloat(e.getAttribute("data-default-duration")) * 1e3
        };
        Le.getPluginDuration = tD;
        var rD = e => e || {
            value: 0
        };
        Le.getPluginOrigin = rD;
        var nD = e => ({
            value: e.value
        });
        Le.getPluginDestination = nD;
        var iD = e => {
            let t = window.Webflow.require("lottie").createInstance(e);
            return t.stop(), t.setSubframe(!0), t
        };
        Le.createPluginInstance = iD;
        var oD = (e, t, r) => {
            if (!e) return;
            let n = t[r.actionTypeId].value / 100;
            e.goToFrame(e.frames * n)
        };
        Le.renderPlugin = oD;
        var aD = e => {
            window.Webflow.require("lottie").createInstance(e).stop()
        };
        Le.clearPlugin = aD
    });
    var Ga = u(Ne => {
        "use strict";
        Object.defineProperty(Ne, "__esModule", {
            value: !0
        });
        Ne.getPluginOrigin = Ne.getPluginDuration = Ne.getPluginDestination = Ne.getPluginConfig = Ne.createPluginInstance = Ne.clearPlugin = void 0;
        Ne.isPluginType = cD;
        Ne.renderPlugin = void 0;
        var kt = eg(),
            tg = Be(),
            sD = si(),
            uD = {
                [tg.ActionTypeConsts.PLUGIN_LOTTIE]: {
                    getConfig: kt.getPluginConfig,
                    getOrigin: kt.getPluginOrigin,
                    getDuration: kt.getPluginDuration,
                    getDestination: kt.getPluginDestination,
                    createInstance: kt.createPluginInstance,
                    render: kt.renderPlugin,
                    clear: kt.clearPlugin
                }
            };

        function cD(e) {
            return e === tg.ActionTypeConsts.PLUGIN_LOTTIE
        }
        var Bt = e => t => {
                if (!sD.IS_BROWSER_ENV) return () => null;
                let r = uD[t];
                if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
                let n = r[e];
                if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
                return n
            },
            lD = Bt("getConfig");
        Ne.getPluginConfig = lD;
        var fD = Bt("getOrigin");
        Ne.getPluginOrigin = fD;
        var dD = Bt("getDuration");
        Ne.getPluginDuration = dD;
        var pD = Bt("getDestination");
        Ne.getPluginDestination = pD;
        var vD = Bt("createInstance");
        Ne.createPluginInstance = vD;
        var hD = Bt("render");
        Ne.renderPlugin = hD;
        var gD = Bt("clear");
        Ne.clearPlugin = gD
    });
    var ng = u((X5, rg) => {
        function ED(e, t) {
            return e == null || e !== e ? t : e
        }
        rg.exports = ED
    });
    var og = u((U5, ig) => {
        function _D(e, t, r, n) {
            var i = -1,
                o = e == null ? 0 : e.length;
            for (n && o && (r = e[++i]); ++i < o;) r = t(r, e[i], i, e);
            return r
        }
        ig.exports = _D
    });
    var sg = u((W5, ag) => {
        function yD(e) {
            return function(t, r, n) {
                for (var i = -1, o = Object(t), a = n(t), s = a.length; s--;) {
                    var c = a[e ? s : ++i];
                    if (r(o[c], c, o) === !1) break
                }
                return t
            }
        }
        ag.exports = yD
    });
    var cg = u((V5, ug) => {
        var mD = sg(),
            ID = mD();
        ug.exports = ID
    });
    var Xa = u((k5, lg) => {
        var TD = cg(),
            OD = Qr();

        function bD(e, t) {
            return e && TD(e, t, OD)
        }
        lg.exports = bD
    });
    var dg = u((B5, fg) => {
        var AD = Wt();

        function SD(e, t) {
            return function(r, n) {
                if (r == null) return r;
                if (!AD(r)) return e(r, n);
                for (var i = r.length, o = t ? i : -1, a = Object(r);
                    (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;);
                return r
            }
        }
        fg.exports = SD
    });
    var Ua = u((H5, pg) => {
        var wD = Xa(),
            RD = dg(),
            CD = RD(wD);
        pg.exports = CD
    });
    var hg = u((j5, vg) => {
        function ND(e, t, r, n, i) {
            return i(e, function(o, a, s) {
                r = n ? (n = !1, o) : t(r, o, a, s)
            }), r
        }
        vg.exports = ND
    });
    var Eg = u((K5, gg) => {
        var xD = og(),
            qD = Ua(),
            LD = Ct(),
            PD = hg(),
            DD = qe();

        function MD(e, t, r) {
            var n = DD(e) ? xD : PD,
                i = arguments.length < 3;
            return n(e, LD(t, 4), r, i, qD)
        }
        gg.exports = MD
    });
    var yg = u((z5, _g) => {
        var FD = Na(),
            GD = Ct(),
            XD = xa(),
            UD = Math.max,
            WD = Math.min;

        function VD(e, t, r) {
            var n = e == null ? 0 : e.length;
            if (!n) return -1;
            var i = n - 1;
            return r !== void 0 && (i = XD(r), i = r < 0 ? UD(n + i, 0) : WD(i, n - 1)), FD(e, GD(t, 3), i, !0)
        }
        _g.exports = VD
    });
    var Ig = u((Y5, mg) => {
        var kD = Ca(),
            BD = yg(),
            HD = kD(BD);
        mg.exports = HD
    });
    var Og = u(di => {
        "use strict";
        Object.defineProperty(di, "__esModule", {
            value: !0
        });
        di.default = void 0;
        var jD = Object.prototype.hasOwnProperty;

        function Tg(e, t) {
            return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t
        }

        function KD(e, t) {
            if (Tg(e, t)) return !0;
            if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
            let r = Object.keys(e),
                n = Object.keys(t);
            if (r.length !== n.length) return !1;
            for (let i = 0; i < r.length; i++)
                if (!jD.call(t, r[i]) || !Tg(e[r[i]], t[r[i]])) return !1;
            return !0
        }
        var zD = KD;
        di.default = zD
    });
    var Bg = u(me => {
        "use strict";
        var hi = lt().default;
        Object.defineProperty(me, "__esModule", {
            value: !0
        });
        me.cleanupHTMLElement = HM;
        me.clearAllStyles = BM;
        me.getActionListProgress = KM;
        me.getAffectedElements = ja;
        me.getComputedStyle = yM;
        me.getDestinationValues = SM;
        me.getElementId = hM;
        me.getInstanceId = pM;
        me.getInstanceOrigin = TM;
        me.getItemConfigByKey = void 0;
        me.getMaxDurationItemIndex = kg;
        me.getNamespacedParameterId = QM;
        me.getRenderType = Ug;
        me.getStyleProp = wM;
        me.mediaQueriesEqual = ZM;
        me.observeStore = _M;
        me.reduceListToGroup = zM;
        me.reifyState = gM;
        me.renderHTMLElement = RM;
        Object.defineProperty(me, "shallowEqual", {
            enumerable: !0,
            get: function() {
                return Lg.default
            }
        });
        me.shouldAllowMediaQuery = $M;
        me.shouldNamespaceEventParameter = YM;
        me.stringifyTarget = JM;
        var Nt = hi(ng()),
            Va = hi(Eg()),
            Wa = hi(Ig()),
            bg = ur(),
            Ht = Be(),
            Lg = hi(Og()),
            YD = Ma(),
            gt = Ga(),
            Xe = si(),
            {
                BACKGROUND: QD,
                TRANSFORM: $D,
                TRANSLATE_3D: ZD,
                SCALE_3D: JD,
                ROTATE_X: eM,
                ROTATE_Y: tM,
                ROTATE_Z: rM,
                SKEW: nM,
                PRESERVE_3D: iM,
                FLEX: oM,
                OPACITY: pi,
                FILTER: tn,
                FONT_VARIATION_SETTINGS: rn,
                WIDTH: vt,
                HEIGHT: ht,
                BACKGROUND_COLOR: Pg,
                BORDER_COLOR: aM,
                COLOR: sM,
                CHILDREN: Ag,
                IMMEDIATE_CHILDREN: uM,
                SIBLINGS: Sg,
                PARENT: cM,
                DISPLAY: vi,
                WILL_CHANGE: _r,
                AUTO: xt,
                COMMA_DELIMITER: nn,
                COLON_DELIMITER: lM,
                BAR_DELIMITER: wg,
                RENDER_TRANSFORM: Dg,
                RENDER_GENERAL: ka,
                RENDER_STYLE: Ba,
                RENDER_PLUGIN: Mg
            } = Ht.IX2EngineConstants,
            {
                TRANSFORM_MOVE: yr,
                TRANSFORM_SCALE: mr,
                TRANSFORM_ROTATE: Ir,
                TRANSFORM_SKEW: on,
                STYLE_OPACITY: Fg,
                STYLE_FILTER: an,
                STYLE_FONT_VARIATION: sn,
                STYLE_SIZE: Tr,
                STYLE_BACKGROUND_COLOR: Or,
                STYLE_BORDER: br,
                STYLE_TEXT_COLOR: Ar,
                GENERAL_DISPLAY: gi
            } = Ht.ActionTypeConsts,
            fM = "OBJECT_VALUE",
            Gg = e => e.trim(),
            Ha = Object.freeze({
                [Or]: Pg,
                [br]: aM,
                [Ar]: sM
            }),
            Xg = Object.freeze({
                [Xe.TRANSFORM_PREFIXED]: $D,
                [Pg]: QD,
                [pi]: pi,
                [tn]: tn,
                [vt]: vt,
                [ht]: ht,
                [rn]: rn
            }),
            Rg = {},
            dM = 1;

        function pM() {
            return "i" + dM++
        }
        var vM = 1;

        function hM(e, t) {
            for (let r in e) {
                let n = e[r];
                if (n && n.ref === t) return n.id
            }
            return "e" + vM++
        }

        function gM({
            events: e,
            actionLists: t,
            site: r
        } = {}) {
            let n = (0, Va.default)(e, (a, s) => {
                    let {
                        eventTypeId: c
                    } = s;
                    return a[c] || (a[c] = {}), a[c][s.id] = s, a
                }, {}),
                i = r && r.mediaQueries,
                o = [];
            return i ? o = i.map(a => a.key) : (i = [], console.warn("IX2 missing mediaQueries in site data")), {
                ixData: {
                    events: e,
                    actionLists: t,
                    eventTypeMap: n,
                    mediaQueries: i,
                    mediaQueryKeys: o
                }
            }
        }
        var EM = (e, t) => e === t;

        function _M({
            store: e,
            select: t,
            onChange: r,
            comparator: n = EM
        }) {
            let {
                getState: i,
                subscribe: o
            } = e, a = o(c), s = t(i());

            function c() {
                let p = t(i());
                if (p == null) {
                    a();
                    return
                }
                n(p, s) || (s = p, r(s, e))
            }
            return a
        }

        function Cg(e) {
            let t = typeof e;
            if (t === "string") return {
                id: e
            };
            if (e != null && t === "object") {
                let {
                    id: r,
                    objectId: n,
                    selector: i,
                    selectorGuids: o,
                    appliesTo: a,
                    useEventTarget: s
                } = e;
                return {
                    id: r,
                    objectId: n,
                    selector: i,
                    selectorGuids: o,
                    appliesTo: a,
                    useEventTarget: s
                }
            }
            return {}
        }

        function ja({
            config: e,
            event: t,
            eventTarget: r,
            elementRoot: n,
            elementApi: i
        }) {
            var o, a, s;
            if (!i) throw new Error("IX2 missing elementApi");
            let {
                targets: c
            } = e;
            if (Array.isArray(c) && c.length > 0) return c.reduce((x, B) => x.concat(ja({
                config: {
                    target: B
                },
                event: t,
                eventTarget: r,
                elementRoot: n,
                elementApi: i
            })), []);
            let {
                getValidDocument: p,
                getQuerySelector: y,
                queryDocument: g,
                getChildElements: I,
                getSiblingElements: T,
                matchSelector: N,
                elementContains: R,
                isSiblingNode: X
            } = i, {
                target: q
            } = e;
            if (!q) return [];
            let {
                id: P,
                objectId: A,
                selector: W,
                selectorGuids: V,
                appliesTo: G,
                useEventTarget: K
            } = Cg(q);
            if (A) return [Rg[A] || (Rg[A] = {})];
            if (G === Ht.EventAppliesTo.PAGE) {
                let x = p(P);
                return x ? [x] : []
            }
            let Z = ((o = t == null || (a = t.action) === null || a === void 0 || (s = a.config) === null || s === void 0 ? void 0 : s.affectedElements) !== null && o !== void 0 ? o : {})[P || W] || {},
                oe = !!(Z.id || Z.selector),
                H, S, v, M = t && y(Cg(t.target));
            if (oe ? (H = Z.limitAffectedElements, S = M, v = y(Z)) : S = v = y({
                    id: P,
                    selector: W,
                    selectorGuids: V
                }), t && K) {
                let x = r && (v || K === !0) ? [r] : g(M);
                if (v) {
                    if (K === cM) return g(v).filter(B => x.some(ee => R(B, ee)));
                    if (K === Ag) return g(v).filter(B => x.some(ee => R(ee, B)));
                    if (K === Sg) return g(v).filter(B => x.some(ee => X(ee, B)))
                }
                return x
            }
            return S == null || v == null ? [] : Xe.IS_BROWSER_ENV && n ? g(v).filter(x => n.contains(x)) : H === Ag ? g(S, v) : H === uM ? I(g(S)).filter(N(v)) : H === Sg ? T(g(S)).filter(N(v)) : g(v)
        }

        function yM({
            element: e,
            actionItem: t
        }) {
            if (!Xe.IS_BROWSER_ENV) return {};
            let {
                actionTypeId: r
            } = t;
            switch (r) {
                case Tr:
                case Or:
                case br:
                case Ar:
                case gi:
                    return window.getComputedStyle(e);
                default:
                    return {}
            }
        }
        var Ng = /px/,
            mM = (e, t) => t.reduce((r, n) => (r[n.type] == null && (r[n.type] = CM[n.type]), r), e || {}),
            IM = (e, t) => t.reduce((r, n) => (r[n.type] == null && (r[n.type] = NM[n.type] || n.defaultValue || 0), r), e || {});

        function TM(e, t = {}, r = {}, n, i) {
            let {
                getStyle: o
            } = i, {
                actionTypeId: a
            } = n;
            if ((0, gt.isPluginType)(a)) return (0, gt.getPluginOrigin)(a)(t[a]);
            switch (n.actionTypeId) {
                case yr:
                case mr:
                case Ir:
                case on:
                    return t[n.actionTypeId] || Ka[n.actionTypeId];
                case an:
                    return mM(t[n.actionTypeId], n.config.filters);
                case sn:
                    return IM(t[n.actionTypeId], n.config.fontVariations);
                case Fg:
                    return {
                        value: (0, Nt.default)(parseFloat(o(e, pi)), 1)
                    };
                case Tr:
                    {
                        let s = o(e, vt),
                            c = o(e, ht),
                            p, y;
                        return n.config.widthUnit === xt ? p = Ng.test(s) ? parseFloat(s) : parseFloat(r.width) : p = (0, Nt.default)(parseFloat(s), parseFloat(r.width)),
                        n.config.heightUnit === xt ? y = Ng.test(c) ? parseFloat(c) : parseFloat(r.height) : y = (0, Nt.default)(parseFloat(c), parseFloat(r.height)),
                        {
                            widthValue: p,
                            heightValue: y
                        }
                    }
                case Or:
                case br:
                case Ar:
                    return WM({
                        element: e,
                        actionTypeId: n.actionTypeId,
                        computedStyle: r,
                        getStyle: o
                    });
                case gi:
                    return {
                        value: (0, Nt.default)(o(e, vi), r.display)
                    };
                case fM:
                    return t[n.actionTypeId] || {
                        value: 0
                    };
                default:
                    return
            }
        }
        var OM = (e, t) => (t && (e[t.type] = t.value || 0), e),
            bM = (e, t) => (t && (e[t.type] = t.value || 0), e),
            AM = (e, t, r) => {
                if ((0, gt.isPluginType)(e)) return (0, gt.getPluginConfig)(e)(r, t);
                switch (e) {
                    case an:
                        {
                            let n = (0, Wa.default)(r.filters, ({
                                type: i
                            }) => i === t);
                            return n ? n.value : 0
                        }
                    case sn:
                        {
                            let n = (0, Wa.default)(r.fontVariations, ({
                                type: i
                            }) => i === t);
                            return n ? n.value : 0
                        }
                    default:
                        return r[t]
                }
            };
        me.getItemConfigByKey = AM;

        function SM({
            element: e,
            actionItem: t,
            elementApi: r
        }) {
            if ((0, gt.isPluginType)(t.actionTypeId)) return (0, gt.getPluginDestination)(t.actionTypeId)(t.config);
            switch (t.actionTypeId) {
                case yr:
                case mr:
                case Ir:
                case on:
                    {
                        let {
                            xValue: n,
                            yValue: i,
                            zValue: o
                        } = t.config;
                        return {
                            xValue: n,
                            yValue: i,
                            zValue: o
                        }
                    }
                case Tr:
                    {
                        let {
                            getStyle: n,
                            setStyle: i,
                            getProperty: o
                        } = r,
                        {
                            widthUnit: a,
                            heightUnit: s
                        } = t.config,
                        {
                            widthValue: c,
                            heightValue: p
                        } = t.config;
                        if (!Xe.IS_BROWSER_ENV) return {
                            widthValue: c,
                            heightValue: p
                        };
                        if (a === xt) {
                            let y = n(e, vt);
                            i(e, vt, ""), c = o(e, "offsetWidth"), i(e, vt, y)
                        }
                        if (s === xt) {
                            let y = n(e, ht);
                            i(e, ht, ""), p = o(e, "offsetHeight"), i(e, ht, y)
                        }
                        return {
                            widthValue: c,
                            heightValue: p
                        }
                    }
                case Or:
                case br:
                case Ar:
                    {
                        let {
                            rValue: n,
                            gValue: i,
                            bValue: o,
                            aValue: a
                        } = t.config;
                        return {
                            rValue: n,
                            gValue: i,
                            bValue: o,
                            aValue: a
                        }
                    }
                case an:
                    return t.config.filters.reduce(OM, {});
                case sn:
                    return t.config.fontVariations.reduce(bM, {});
                default:
                    {
                        let {
                            value: n
                        } = t.config;
                        return {
                            value: n
                        }
                    }
            }
        }

        function Ug(e) {
            if (/^TRANSFORM_/.test(e)) return Dg;
            if (/^STYLE_/.test(e)) return Ba;
            if (/^GENERAL_/.test(e)) return ka;
            if (/^PLUGIN_/.test(e)) return Mg
        }

        function wM(e, t) {
            return e === Ba ? t.replace("STYLE_", "").toLowerCase() : null
        }

        function RM(e, t, r, n, i, o, a, s, c) {
            switch (s) {
                case Dg:
                    return LM(e, t, r, i, a);
                case Ba:
                    return VM(e, t, r, i, o, a);
                case ka:
                    return kM(e, i, a);
                case Mg:
                    {
                        let {
                            actionTypeId: p
                        } = i;
                        if ((0, gt.isPluginType)(p)) return (0, gt.renderPlugin)(p)(c, t, i)
                    }
            }
        }
        var Ka = {
                [yr]: Object.freeze({
                    xValue: 0,
                    yValue: 0,
                    zValue: 0
                }),
                [mr]: Object.freeze({
                    xValue: 1,
                    yValue: 1,
                    zValue: 1
                }),
                [Ir]: Object.freeze({
                    xValue: 0,
                    yValue: 0,
                    zValue: 0
                }),
                [on]: Object.freeze({
                    xValue: 0,
                    yValue: 0
                })
            },
            CM = Object.freeze({
                blur: 0,
                "hue-rotate": 0,
                invert: 0,
                grayscale: 0,
                saturate: 100,
                sepia: 0,
                contrast: 100,
                brightness: 100
            }),
            NM = Object.freeze({
                wght: 0,
                opsz: 0,
                wdth: 0,
                slnt: 0
            }),
            xM = (e, t) => {
                let r = (0, Wa.default)(t.filters, ({
                    type: n
                }) => n === e);
                if (r && r.unit) return r.unit;
                switch (e) {
                    case "blur":
                        return "px";
                    case "hue-rotate":
                        return "deg";
                    default:
                        return "%"
                }
            },
            qM = Object.keys(Ka);

        function LM(e, t, r, n, i) {
            let o = qM.map(s => {
                    let c = Ka[s],
                        {
                            xValue: p = c.xValue,
                            yValue: y = c.yValue,
                            zValue: g = c.zValue,
                            xUnit: I = "",
                            yUnit: T = "",
                            zUnit: N = ""
                        } = t[s] || {};
                    switch (s) {
                        case yr:
                            return `${ZD}(${p}${I}, ${y}${T}, ${g}${N})`;
                        case mr:
                            return `${JD}(${p}${I}, ${y}${T}, ${g}${N})`;
                        case Ir:
                            return `${eM}(${p}${I}) ${tM}(${y}${T}) ${rM}(${g}${N})`;
                        case on:
                            return `${nM}(${p}${I}, ${y}${T})`;
                        default:
                            return ""
                    }
                }).join(" "),
                {
                    setStyle: a
                } = i;
            jt(e, Xe.TRANSFORM_PREFIXED, i), a(e, Xe.TRANSFORM_PREFIXED, o), MM(n, r) && a(e, Xe.TRANSFORM_STYLE_PREFIXED, iM)
        }

        function PM(e, t, r, n) {
            let i = (0, Va.default)(t, (a, s, c) => `${a} ${c}(${s}${xM(c,r)})`, ""),
                {
                    setStyle: o
                } = n;
            jt(e, tn, n), o(e, tn, i)
        }

        function DM(e, t, r, n) {
            let i = (0, Va.default)(t, (a, s, c) => (a.push(`"${c}" ${s}`), a), []).join(", "),
                {
                    setStyle: o
                } = n;
            jt(e, rn, n), o(e, rn, i)
        }

        function MM({
            actionTypeId: e
        }, {
            xValue: t,
            yValue: r,
            zValue: n
        }) {
            return e === yr && n !== void 0 || e === mr && n !== void 0 || e === Ir && (t !== void 0 || r !== void 0)
        }
        var FM = "\\(([^)]+)\\)",
            GM = /^rgb/,
            XM = RegExp(`rgba?${FM}`);

        function UM(e, t) {
            let r = e.exec(t);
            return r ? r[1] : ""
        }

        function WM({
            element: e,
            actionTypeId: t,
            computedStyle: r,
            getStyle: n
        }) {
            let i = Ha[t],
                o = n(e, i),
                a = GM.test(o) ? o : r[i],
                s = UM(XM, a).split(nn);
            return {
                rValue: (0, Nt.default)(parseInt(s[0], 10), 255),
                gValue: (0, Nt.default)(parseInt(s[1], 10), 255),
                bValue: (0, Nt.default)(parseInt(s[2], 10), 255),
                aValue: (0, Nt.default)(parseFloat(s[3]), 1)
            }
        }

        function VM(e, t, r, n, i, o) {
            let {
                setStyle: a
            } = o;
            switch (n.actionTypeId) {
                case Tr:
                    {
                        let {
                            widthUnit: s = "",
                            heightUnit: c = ""
                        } = n.config,
                        {
                            widthValue: p,
                            heightValue: y
                        } = r;p !== void 0 && (s === xt && (s = "px"), jt(e, vt, o), a(e, vt, p + s)),
                        y !== void 0 && (c === xt && (c = "px"), jt(e, ht, o), a(e, ht, y + c));
                        break
                    }
                case an:
                    {
                        PM(e, r, n.config, o);
                        break
                    }
                case sn:
                    {
                        DM(e, r, n.config, o);
                        break
                    }
                case Or:
                case br:
                case Ar:
                    {
                        let s = Ha[n.actionTypeId],
                            c = Math.round(r.rValue),
                            p = Math.round(r.gValue),
                            y = Math.round(r.bValue),
                            g = r.aValue;jt(e, s, o),
                        a(e, s, g >= 1 ? `rgb(${c},${p},${y})` : `rgba(${c},${p},${y},${g})`);
                        break
                    }
                default:
                    {
                        let {
                            unit: s = ""
                        } = n.config;jt(e, i, o),
                        a(e, i, r.value + s);
                        break
                    }
            }
        }

        function kM(e, t, r) {
            let {
                setStyle: n
            } = r;
            switch (t.actionTypeId) {
                case gi:
                    {
                        let {
                            value: i
                        } = t.config;i === oM && Xe.IS_BROWSER_ENV ? n(e, vi, Xe.FLEX_PREFIXED) : n(e, vi, i);
                        return
                    }
            }
        }

        function jt(e, t, r) {
            if (!Xe.IS_BROWSER_ENV) return;
            let n = Xg[t];
            if (!n) return;
            let {
                getStyle: i,
                setStyle: o
            } = r, a = i(e, _r);
            if (!a) {
                o(e, _r, n);
                return
            }
            let s = a.split(nn).map(Gg);
            s.indexOf(n) === -1 && o(e, _r, s.concat(n).join(nn))
        }

        function Wg(e, t, r) {
            if (!Xe.IS_BROWSER_ENV) return;
            let n = Xg[t];
            if (!n) return;
            let {
                getStyle: i,
                setStyle: o
            } = r, a = i(e, _r);
            !a || a.indexOf(n) === -1 || o(e, _r, a.split(nn).map(Gg).filter(s => s !== n).join(nn))
        }

        function BM({
            store: e,
            elementApi: t
        }) {
            let {
                ixData: r
            } = e.getState(), {
                events: n = {},
                actionLists: i = {}
            } = r;
            Object.keys(n).forEach(o => {
                let a = n[o],
                    {
                        config: s
                    } = a.action,
                    {
                        actionListId: c
                    } = s,
                    p = i[c];
                p && xg({
                    actionList: p,
                    event: a,
                    elementApi: t
                })
            }), Object.keys(i).forEach(o => {
                xg({
                    actionList: i[o],
                    elementApi: t
                })
            })
        }

        function xg({
            actionList: e = {},
            event: t,
            elementApi: r
        }) {
            let {
                actionItemGroups: n,
                continuousParameterGroups: i
            } = e;
            n && n.forEach(o => {
                qg({
                    actionGroup: o,
                    event: t,
                    elementApi: r
                })
            }), i && i.forEach(o => {
                let {
                    continuousActionGroups: a
                } = o;
                a.forEach(s => {
                    qg({
                        actionGroup: s,
                        event: t,
                        elementApi: r
                    })
                })
            })
        }

        function qg({
            actionGroup: e,
            event: t,
            elementApi: r
        }) {
            let {
                actionItems: n
            } = e;
            n.forEach(({
                actionTypeId: i,
                config: o
            }) => {
                let a;
                (0, gt.isPluginType)(i) ? a = (0, gt.clearPlugin)(i): a = Vg({
                    effect: jM,
                    actionTypeId: i,
                    elementApi: r
                }), ja({
                    config: o,
                    event: t,
                    elementApi: r
                }).forEach(a)
            })
        }

        function HM(e, t, r) {
            let {
                setStyle: n,
                getStyle: i
            } = r, {
                actionTypeId: o
            } = t;
            if (o === Tr) {
                let {
                    config: a
                } = t;
                a.widthUnit === xt && n(e, vt, ""), a.heightUnit === xt && n(e, ht, "")
            }
            i(e, _r) && Vg({
                effect: Wg,
                actionTypeId: o,
                elementApi: r
            })(e)
        }
        var Vg = ({
            effect: e,
            actionTypeId: t,
            elementApi: r
        }) => n => {
            switch (t) {
                case yr:
                case mr:
                case Ir:
                case on:
                    e(n, Xe.TRANSFORM_PREFIXED, r);
                    break;
                case an:
                    e(n, tn, r);
                    break;
                case sn:
                    e(n, rn, r);
                    break;
                case Fg:
                    e(n, pi, r);
                    break;
                case Tr:
                    e(n, vt, r), e(n, ht, r);
                    break;
                case Or:
                case br:
                case Ar:
                    e(n, Ha[t], r);
                    break;
                case gi:
                    e(n, vi, r);
                    break
            }
        };

        function jM(e, t, r) {
            let {
                setStyle: n
            } = r;
            Wg(e, t, r), n(e, t, ""), t === Xe.TRANSFORM_PREFIXED && n(e, Xe.TRANSFORM_STYLE_PREFIXED, "")
        }

        function kg(e) {
            let t = 0,
                r = 0;
            return e.forEach((n, i) => {
                let {
                    config: o
                } = n, a = o.delay + o.duration;
                a >= t && (t = a, r = i)
            }), r
        }

        function KM(e, t) {
            let {
                actionItemGroups: r,
                useFirstGroupAsInitialState: n
            } = e, {
                actionItem: i,
                verboseTimeElapsed: o = 0
            } = t, a = 0, s = 0;
            return r.forEach((c, p) => {
                if (n && p === 0) return;
                let {
                    actionItems: y
                } = c, g = y[kg(y)], {
                    config: I,
                    actionTypeId: T
                } = g;
                i.id === g.id && (s = a + o);
                let N = Ug(T) === ka ? 0 : I.duration;
                a += I.delay + N
            }), a > 0 ? (0, YD.optimizeFloat)(s / a) : 0
        }

        function zM({
            actionList: e,
            actionItemId: t,
            rawData: r
        }) {
            let {
                actionItemGroups: n,
                continuousParameterGroups: i
            } = e, o = [], a = s => (o.push((0, bg.mergeIn)(s, ["config"], {
                delay: 0,
                duration: 0
            })), s.id === t);
            return n && n.some(({
                actionItems: s
            }) => s.some(a)), i && i.some(s => {
                let {
                    continuousActionGroups: c
                } = s;
                return c.some(({
                    actionItems: p
                }) => p.some(a))
            }), (0, bg.setIn)(r, ["actionLists"], {
                [e.id]: {
                    id: e.id,
                    actionItemGroups: [{
                        actionItems: o
                    }]
                }
            })
        }

        function YM(e, {
            basedOn: t
        }) {
            return e === Ht.EventTypeConsts.SCROLLING_IN_VIEW && (t === Ht.EventBasedOn.ELEMENT || t == null) || e === Ht.EventTypeConsts.MOUSE_MOVE && t === Ht.EventBasedOn.ELEMENT
        }

        function QM(e, t) {
            return e + lM + t
        }

        function $M(e, t) {
            return t == null ? !0 : e.indexOf(t) !== -1
        }

        function ZM(e, t) {
            return (0, Lg.default)(e && e.sort(), t && t.sort())
        }

        function JM(e) {
            if (typeof e == "string") return e;
            let {
                id: t = "",
                selector: r = "",
                useEventTarget: n = ""
            } = e;
            return t + wg + r + wg + n
        }
    });
    var Kt = u(Ue => {
        "use strict";
        var Sr = er().default;
        Object.defineProperty(Ue, "__esModule", {
            value: !0
        });
        Ue.IX2VanillaUtils = Ue.IX2VanillaPlugins = Ue.IX2ElementsReducer = Ue.IX2Easings = Ue.IX2EasingUtils = Ue.IX2BrowserSupport = void 0;
        var e1 = Sr(si());
        Ue.IX2BrowserSupport = e1;
        var t1 = Sr(Pa());
        Ue.IX2Easings = t1;
        var r1 = Sr(Ma());
        Ue.IX2EasingUtils = r1;
        var n1 = Sr(Jh());
        Ue.IX2ElementsReducer = n1;
        var i1 = Sr(Ga());
        Ue.IX2VanillaPlugins = i1;
        var o1 = Sr(Bg());
        Ue.IX2VanillaUtils = o1
    });
    var zg = u(_i => {
        "use strict";
        Object.defineProperty(_i, "__esModule", {
            value: !0
        });
        _i.ixInstances = void 0;
        var Hg = Be(),
            jg = Kt(),
            wr = ur(),
            {
                IX2_RAW_DATA_IMPORTED: a1,
                IX2_SESSION_STOPPED: s1,
                IX2_INSTANCE_ADDED: u1,
                IX2_INSTANCE_STARTED: c1,
                IX2_INSTANCE_REMOVED: l1,
                IX2_ANIMATION_FRAME_CHANGED: f1
            } = Hg.IX2EngineActionTypes,
            {
                optimizeFloat: Ei,
                applyEasing: Kg,
                createBezierEasing: d1
            } = jg.IX2EasingUtils,
            {
                RENDER_GENERAL: p1
            } = Hg.IX2EngineConstants,
            {
                getItemConfigByKey: za,
                getRenderType: v1,
                getStyleProp: h1
            } = jg.IX2VanillaUtils,
            g1 = (e, t) => {
                let {
                    position: r,
                    parameterId: n,
                    actionGroups: i,
                    destinationKeys: o,
                    smoothing: a,
                    restingValue: s,
                    actionTypeId: c,
                    customEasingFn: p,
                    skipMotion: y,
                    skipToValue: g
                } = e, {
                    parameters: I
                } = t.payload, T = Math.max(1 - a, .01), N = I[n];
                N == null && (T = 1, N = s);
                let R = Math.max(N, 0) || 0,
                    X = Ei(R - r),
                    q = y ? g : Ei(r + X * T),
                    P = q * 100;
                if (q === r && e.current) return e;
                let A, W, V, G;
                for (let J = 0, {
                        length: Z
                    } = i; J < Z; J++) {
                    let {
                        keyframe: oe,
                        actionItems: H
                    } = i[J];
                    if (J === 0 && (A = H[0]), P >= oe) {
                        A = H[0];
                        let S = i[J + 1],
                            v = S && P !== oe;
                        W = v ? S.actionItems[0] : null, v && (V = oe / 100, G = (S.keyframe - oe) / 100)
                    }
                }
                let K = {};
                if (A && !W)
                    for (let J = 0, {
                            length: Z
                        } = o; J < Z; J++) {
                        let oe = o[J];
                        K[oe] = za(c, oe, A.config)
                    } else if (A && W && V !== void 0 && G !== void 0) {
                        let J = (q - V) / G,
                            Z = A.config.easing,
                            oe = Kg(Z, J, p);
                        for (let H = 0, {
                                length: S
                            } = o; H < S; H++) {
                            let v = o[H],
                                M = za(c, v, A.config),
                                ee = (za(c, v, W.config) - M) * oe + M;
                            K[v] = ee
                        }
                    }
                return (0, wr.merge)(e, {
                    position: q,
                    current: K
                })
            },
            E1 = (e, t) => {
                let {
                    active: r,
                    origin: n,
                    start: i,
                    immediate: o,
                    renderType: a,
                    verbose: s,
                    actionItem: c,
                    destination: p,
                    destinationKeys: y,
                    pluginDuration: g,
                    instanceDelay: I,
                    customEasingFn: T,
                    skipMotion: N
                } = e, R = c.config.easing, {
                    duration: X,
                    delay: q
                } = c.config;
                g != null && (X = g), q = I ? ? q, a === p1 ? X = 0 : (o || N) && (X = q = 0);
                let {
                    now: P
                } = t.payload;
                if (r && n) {
                    let A = P - (i + q);
                    if (s) {
                        let J = P - i,
                            Z = X + q,
                            oe = Ei(Math.min(Math.max(0, J / Z), 1));
                        e = (0, wr.set)(e, "verboseTimeElapsed", Z * oe)
                    }
                    if (A < 0) return e;
                    let W = Ei(Math.min(Math.max(0, A / X), 1)),
                        V = Kg(R, W, T),
                        G = {},
                        K = null;
                    return y.length && (K = y.reduce((J, Z) => {
                        let oe = p[Z],
                            H = parseFloat(n[Z]) || 0,
                            v = (parseFloat(oe) - H) * V + H;
                        return J[Z] = v, J
                    }, {})), G.current = K, G.position = W, W === 1 && (G.active = !1, G.complete = !0), (0, wr.merge)(e, G)
                }
                return e
            },
            _1 = (e = Object.freeze({}), t) => {
                switch (t.type) {
                    case a1:
                        return t.payload.ixInstances || Object.freeze({});
                    case s1:
                        return Object.freeze({});
                    case u1:
                        {
                            let {
                                instanceId: r,
                                elementId: n,
                                actionItem: i,
                                eventId: o,
                                eventTarget: a,
                                eventStateKey: s,
                                actionListId: c,
                                groupIndex: p,
                                isCarrier: y,
                                origin: g,
                                destination: I,
                                immediate: T,
                                verbose: N,
                                continuous: R,
                                parameterId: X,
                                actionGroups: q,
                                smoothing: P,
                                restingValue: A,
                                pluginInstance: W,
                                pluginDuration: V,
                                instanceDelay: G,
                                skipMotion: K,
                                skipToValue: J
                            } = t.payload,
                            {
                                actionTypeId: Z
                            } = i,
                            oe = v1(Z),
                            H = h1(oe, Z),
                            S = Object.keys(I).filter(M => I[M] != null),
                            {
                                easing: v
                            } = i.config;
                            return (0, wr.set)(e, r, {
                                id: r,
                                elementId: n,
                                active: !1,
                                position: 0,
                                start: 0,
                                origin: g,
                                destination: I,
                                destinationKeys: S,
                                immediate: T,
                                verbose: N,
                                current: null,
                                actionItem: i,
                                actionTypeId: Z,
                                eventId: o,
                                eventTarget: a,
                                eventStateKey: s,
                                actionListId: c,
                                groupIndex: p,
                                renderType: oe,
                                isCarrier: y,
                                styleProp: H,
                                continuous: R,
                                parameterId: X,
                                actionGroups: q,
                                smoothing: P,
                                restingValue: A,
                                pluginInstance: W,
                                pluginDuration: V,
                                instanceDelay: G,
                                skipMotion: K,
                                skipToValue: J,
                                customEasingFn: Array.isArray(v) && v.length === 4 ? d1(v) : void 0
                            })
                        }
                    case c1:
                        {
                            let {
                                instanceId: r,
                                time: n
                            } = t.payload;
                            return (0, wr.mergeIn)(e, [r], {
                                active: !0,
                                complete: !1,
                                start: n
                            })
                        }
                    case l1:
                        {
                            let {
                                instanceId: r
                            } = t.payload;
                            if (!e[r]) return e;
                            let n = {},
                                i = Object.keys(e),
                                {
                                    length: o
                                } = i;
                            for (let a = 0; a < o; a++) {
                                let s = i[a];
                                s !== r && (n[s] = e[s])
                            }
                            return n
                        }
                    case f1:
                        {
                            let r = e,
                                n = Object.keys(e),
                                {
                                    length: i
                                } = n;
                            for (let o = 0; o < i; o++) {
                                let a = n[o],
                                    s = e[a],
                                    c = s.continuous ? g1 : E1;
                                r = (0, wr.set)(r, a, c(s, t))
                            }
                            return r
                        }
                    default:
                        return e
                }
            };
        _i.ixInstances = _1
    });
    var Yg = u(yi => {
        "use strict";
        Object.defineProperty(yi, "__esModule", {
            value: !0
        });
        yi.ixParameters = void 0;
        var y1 = Be(),
            {
                IX2_RAW_DATA_IMPORTED: m1,
                IX2_SESSION_STOPPED: I1,
                IX2_PARAMETER_CHANGED: T1
            } = y1.IX2EngineActionTypes,
            O1 = (e = {}, t) => {
                switch (t.type) {
                    case m1:
                        return t.payload.ixParameters || {};
                    case I1:
                        return {};
                    case T1:
                        {
                            let {
                                key: r,
                                value: n
                            } = t.payload;
                            return e[r] = n,
                            e
                        }
                    default:
                        return e
                }
            };
        yi.ixParameters = O1
    });
    var Qg = u(mi => {
        "use strict";
        Object.defineProperty(mi, "__esModule", {
            value: !0
        });
        mi.default = void 0;
        var b1 = $o(),
            A1 = Ef(),
            S1 = Mf(),
            w1 = Gf(),
            R1 = Kt(),
            C1 = zg(),
            N1 = Yg(),
            {
                ixElements: x1
            } = R1.IX2ElementsReducer,
            q1 = (0, b1.combineReducers)({
                ixData: A1.ixData,
                ixRequest: S1.ixRequest,
                ixSession: w1.ixSession,
                ixElements: x1,
                ixInstances: C1.ixInstances,
                ixParameters: N1.ixParameters
            });
        mi.default = q1
    });
    var $g = u((rj, un) => {
        function L1(e, t) {
            if (e == null) return {};
            var r = {},
                n = Object.keys(e),
                i, o;
            for (o = 0; o < n.length; o++) i = n[o], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
            return r
        }
        un.exports = L1, un.exports.__esModule = !0, un.exports.default = un.exports
    });
    var Jg = u((nj, Zg) => {
        var P1 = wt(),
            D1 = qe(),
            M1 = mt(),
            F1 = "[object String]";

        function G1(e) {
            return typeof e == "string" || !D1(e) && M1(e) && P1(e) == F1
        }
        Zg.exports = G1
    });
    var tE = u((ij, eE) => {
        var X1 = Ra(),
            U1 = X1("length");
        eE.exports = U1
    });
    var nE = u((oj, rE) => {
        var W1 = "\\ud800-\\udfff",
            V1 = "\\u0300-\\u036f",
            k1 = "\\ufe20-\\ufe2f",
            B1 = "\\u20d0-\\u20ff",
            H1 = V1 + k1 + B1,
            j1 = "\\ufe0e\\ufe0f",
            K1 = "\\u200d",
            z1 = RegExp("[" + K1 + W1 + H1 + j1 + "]");

        function Y1(e) {
            return z1.test(e)
        }
        rE.exports = Y1
    });
    var dE = u((aj, fE) => {
        var oE = "\\ud800-\\udfff",
            Q1 = "\\u0300-\\u036f",
            $1 = "\\ufe20-\\ufe2f",
            Z1 = "\\u20d0-\\u20ff",
            J1 = Q1 + $1 + Z1,
            eF = "\\ufe0e\\ufe0f",
            tF = "[" + oE + "]",
            Ya = "[" + J1 + "]",
            Qa = "\\ud83c[\\udffb-\\udfff]",
            rF = "(?:" + Ya + "|" + Qa + ")",
            aE = "[^" + oE + "]",
            sE = "(?:\\ud83c[\\udde6-\\uddff]){2}",
            uE = "[\\ud800-\\udbff][\\udc00-\\udfff]",
            nF = "\\u200d",
            cE = rF + "?",
            lE = "[" + eF + "]?",
            iF = "(?:" + nF + "(?:" + [aE, sE, uE].join("|") + ")" + lE + cE + ")*",
            oF = lE + cE + iF,
            aF = "(?:" + [aE + Ya + "?", Ya, sE, uE, tF].join("|") + ")",
            iE = RegExp(Qa + "(?=" + Qa + ")|" + aF + oF, "g");

        function sF(e) {
            for (var t = iE.lastIndex = 0; iE.test(e);) ++t;
            return t
        }
        fE.exports = sF
    });
    var vE = u((sj, pE) => {
        var uF = tE(),
            cF = nE(),
            lF = dE();

        function fF(e) {
            return cF(e) ? lF(e) : uF(e)
        }
        pE.exports = fF
    });
    var gE = u((uj, hE) => {
        var dF = Zn(),
            pF = Jn(),
            vF = Wt(),
            hF = Jg(),
            gF = vE(),
            EF = "[object Map]",
            _F = "[object Set]";

        function yF(e) {
            if (e == null) return 0;
            if (vF(e)) return hF(e) ? gF(e) : e.length;
            var t = pF(e);
            return t == EF || t == _F ? e.size : dF(e).length
        }
        hE.exports = yF
    });
    var _E = u((cj, EE) => {
        var mF = "Expected a function";

        function IF(e) {
            if (typeof e != "function") throw new TypeError(mF);
            return function() {
                var t = arguments;
                switch (t.length) {
                    case 0:
                        return !e.call(this);
                    case 1:
                        return !e.call(this, t[0]);
                    case 2:
                        return !e.call(this, t[0], t[1]);
                    case 3:
                        return !e.call(this, t[0], t[1], t[2])
                }
                return !e.apply(this, t)
            }
        }
        EE.exports = IF
    });
    var $a = u((lj, yE) => {
        var TF = Rt(),
            OF = function() {
                try {
                    var e = TF(Object, "defineProperty");
                    return e({}, "", {}), e
                } catch {}
            }();
        yE.exports = OF
    });
    var Za = u((fj, IE) => {
        var mE = $a();

        function bF(e, t, r) {
            t == "__proto__" && mE ? mE(e, t, {
                configurable: !0,
                enumerable: !0,
                value: r,
                writable: !0
            }) : e[t] = r
        }
        IE.exports = bF
    });
    var OE = u((dj, TE) => {
        var AF = Za(),
            SF = Vn(),
            wF = Object.prototype,
            RF = wF.hasOwnProperty;

        function CF(e, t, r) {
            var n = e[t];
            (!(RF.call(e, t) && SF(n, r)) || r === void 0 && !(t in e)) && AF(e, t, r)
        }
        TE.exports = CF
    });
    var SE = u((pj, AE) => {
        var NF = OE(),
            xF = Zr(),
            qF = zn(),
            bE = pt(),
            LF = gr();

        function PF(e, t, r, n) {
            if (!bE(e)) return e;
            t = xF(t, e);
            for (var i = -1, o = t.length, a = o - 1, s = e; s != null && ++i < o;) {
                var c = LF(t[i]),
                    p = r;
                if (c === "__proto__" || c === "constructor" || c === "prototype") return e;
                if (i != a) {
                    var y = s[c];
                    p = n ? n(y, c, s) : void 0, p === void 0 && (p = bE(y) ? y : qF(t[i + 1]) ? [] : {})
                }
                NF(s, c, p), s = s[c]
            }
            return e
        }
        AE.exports = PF
    });
    var RE = u((vj, wE) => {
        var DF = ri(),
            MF = SE(),
            FF = Zr();

        function GF(e, t, r) {
            for (var n = -1, i = t.length, o = {}; ++n < i;) {
                var a = t[n],
                    s = DF(e, a);
                r(s, a) && MF(o, FF(a, e), s)
            }
            return o
        }
        wE.exports = GF
    });
    var NE = u((hj, CE) => {
        var XF = jn(),
            UF = Go(),
            WF = pa(),
            VF = da(),
            kF = Object.getOwnPropertySymbols,
            BF = kF ? function(e) {
                for (var t = []; e;) XF(t, WF(e)), e = UF(e);
                return t
            } : VF;
        CE.exports = BF
    });
    var qE = u((gj, xE) => {
        function HF(e) {
            var t = [];
            if (e != null)
                for (var r in Object(e)) t.push(r);
            return t
        }
        xE.exports = HF
    });
    var PE = u((Ej, LE) => {
        var jF = pt(),
            KF = $n(),
            zF = qE(),
            YF = Object.prototype,
            QF = YF.hasOwnProperty;

        function $F(e) {
            if (!jF(e)) return zF(e);
            var t = KF(e),
                r = [];
            for (var n in e) n == "constructor" && (t || !QF.call(e, n)) || r.push(n);
            return r
        }
        LE.exports = $F
    });
    var ME = u((_j, DE) => {
        var ZF = ha(),
            JF = PE(),
            e2 = Wt();

        function t2(e) {
            return e2(e) ? ZF(e, !0) : JF(e)
        }
        DE.exports = t2
    });
    var GE = u((yj, FE) => {
        var r2 = fa(),
            n2 = NE(),
            i2 = ME();

        function o2(e) {
            return r2(e, i2, n2)
        }
        FE.exports = o2
    });
    var UE = u((mj, XE) => {
        var a2 = wa(),
            s2 = Ct(),
            u2 = RE(),
            c2 = GE();

        function l2(e, t) {
            if (e == null) return {};
            var r = a2(c2(e), function(n) {
                return [n]
            });
            return t = s2(t), u2(e, r, function(n, i) {
                return t(n, i[0])
            })
        }
        XE.exports = l2
    });
    var VE = u((Ij, WE) => {
        var f2 = Ct(),
            d2 = _E(),
            p2 = UE();

        function v2(e, t) {
            return p2(e, d2(f2(t)))
        }
        WE.exports = v2
    });
    var BE = u((Tj, kE) => {
        var h2 = Zn(),
            g2 = Jn(),
            E2 = jr(),
            _2 = qe(),
            y2 = Wt(),
            m2 = Kn(),
            I2 = $n(),
            T2 = Qn(),
            O2 = "[object Map]",
            b2 = "[object Set]",
            A2 = Object.prototype,
            S2 = A2.hasOwnProperty;

        function w2(e) {
            if (e == null) return !0;
            if (y2(e) && (_2(e) || typeof e == "string" || typeof e.splice == "function" || m2(e) || T2(e) || E2(e))) return !e.length;
            var t = g2(e);
            if (t == O2 || t == b2) return !e.size;
            if (I2(e)) return !h2(e).length;
            for (var r in e)
                if (S2.call(e, r)) return !1;
            return !0
        }
        kE.exports = w2
    });
    var jE = u((Oj, HE) => {
        var R2 = Za(),
            C2 = Xa(),
            N2 = Ct();

        function x2(e, t) {
            var r = {};
            return t = N2(t, 3), C2(e, function(n, i, o) {
                R2(r, i, t(n, i, o))
            }), r
        }
        HE.exports = x2
    });
    var zE = u((bj, KE) => {
        function q2(e, t) {
            for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1;);
            return e
        }
        KE.exports = q2
    });
    var QE = u((Aj, YE) => {
        var L2 = ii();

        function P2(e) {
            return typeof e == "function" ? e : L2
        }
        YE.exports = P2
    });
    var ZE = u((Sj, $E) => {
        var D2 = zE(),
            M2 = Ua(),
            F2 = QE(),
            G2 = qe();

        function X2(e, t) {
            var r = G2(e) ? D2 : M2;
            return r(e, F2(t))
        }
        $E.exports = X2
    });
    var e_ = u((wj, JE) => {
        var U2 = rt(),
            W2 = function() {
                return U2.Date.now()
            };
        JE.exports = W2
    });
    var n_ = u((Rj, r_) => {
        var V2 = pt(),
            Ja = e_(),
            t_ = oi(),
            k2 = "Expected a function",
            B2 = Math.max,
            H2 = Math.min;

        function j2(e, t, r) {
            var n, i, o, a, s, c, p = 0,
                y = !1,
                g = !1,
                I = !0;
            if (typeof e != "function") throw new TypeError(k2);
            t = t_(t) || 0, V2(r) && (y = !!r.leading, g = "maxWait" in r, o = g ? B2(t_(r.maxWait) || 0, t) : o, I = "trailing" in r ? !!r.trailing : I);

            function T(G) {
                var K = n,
                    J = i;
                return n = i = void 0, p = G, a = e.apply(J, K), a
            }

            function N(G) {
                return p = G, s = setTimeout(q, t), y ? T(G) : a
            }

            function R(G) {
                var K = G - c,
                    J = G - p,
                    Z = t - K;
                return g ? H2(Z, o - J) : Z
            }

            function X(G) {
                var K = G - c,
                    J = G - p;
                return c === void 0 || K >= t || K < 0 || g && J >= o
            }

            function q() {
                var G = Ja();
                if (X(G)) return P(G);
                s = setTimeout(q, R(G))
            }

            function P(G) {
                return s = void 0, I && n ? T(G) : (n = i = void 0, a)
            }

            function A() {
                s !== void 0 && clearTimeout(s), p = 0, n = c = i = s = void 0
            }

            function W() {
                return s === void 0 ? a : P(Ja())
            }

            function V() {
                var G = Ja(),
                    K = X(G);
                if (n = arguments, i = this, c = G, K) {
                    if (s === void 0) return N(c);
                    if (g) return clearTimeout(s), s = setTimeout(q, t), T(c)
                }
                return s === void 0 && (s = setTimeout(q, t)), a
            }
            return V.cancel = A, V.flush = W, V
        }
        r_.exports = j2
    });
    var o_ = u((Cj, i_) => {
        var K2 = n_(),
            z2 = pt(),
            Y2 = "Expected a function";

        function Q2(e, t, r) {
            var n = !0,
                i = !0;
            if (typeof e != "function") throw new TypeError(Y2);
            return z2(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), K2(e, t, {
                leading: n,
                maxWait: t,
                trailing: i
            })
        }
        i_.exports = Q2
    });
    var Ii = u(fe => {
        "use strict";
        var $2 = lt().default;
        Object.defineProperty(fe, "__esModule", {
            value: !0
        });
        fe.viewportWidthChanged = fe.testFrameRendered = fe.stopRequested = fe.sessionStopped = fe.sessionStarted = fe.sessionInitialized = fe.rawDataImported = fe.previewRequested = fe.playbackRequested = fe.parameterChanged = fe.mediaQueriesDefined = fe.instanceStarted = fe.instanceRemoved = fe.instanceAdded = fe.eventStateChanged = fe.eventListenerAdded = fe.elementStateChanged = fe.clearRequested = fe.animationFrameChanged = fe.actionListPlaybackChanged = void 0;
        var a_ = $2(Wr()),
            s_ = Be(),
            Z2 = Kt(),
            {
                IX2_RAW_DATA_IMPORTED: J2,
                IX2_SESSION_INITIALIZED: eG,
                IX2_SESSION_STARTED: tG,
                IX2_SESSION_STOPPED: rG,
                IX2_PREVIEW_REQUESTED: nG,
                IX2_PLAYBACK_REQUESTED: iG,
                IX2_STOP_REQUESTED: oG,
                IX2_CLEAR_REQUESTED: aG,
                IX2_EVENT_LISTENER_ADDED: sG,
                IX2_TEST_FRAME_RENDERED: uG,
                IX2_EVENT_STATE_CHANGED: cG,
                IX2_ANIMATION_FRAME_CHANGED: lG,
                IX2_PARAMETER_CHANGED: fG,
                IX2_INSTANCE_ADDED: dG,
                IX2_INSTANCE_STARTED: pG,
                IX2_INSTANCE_REMOVED: vG,
                IX2_ELEMENT_STATE_CHANGED: hG,
                IX2_ACTION_LIST_PLAYBACK_CHANGED: gG,
                IX2_VIEWPORT_WIDTH_CHANGED: EG,
                IX2_MEDIA_QUERIES_DEFINED: _G
            } = s_.IX2EngineActionTypes,
            {
                reifyState: yG
            } = Z2.IX2VanillaUtils,
            mG = e => ({
                type: J2,
                payload: (0, a_.default)({}, yG(e))
            });
        fe.rawDataImported = mG;
        var IG = ({
            hasBoundaryNodes: e,
            reducedMotion: t
        }) => ({
            type: eG,
            payload: {
                hasBoundaryNodes: e,
                reducedMotion: t
            }
        });
        fe.sessionInitialized = IG;
        var TG = () => ({
            type: tG
        });
        fe.sessionStarted = TG;
        var OG = () => ({
            type: rG
        });
        fe.sessionStopped = OG;
        var bG = ({
            rawData: e,
            defer: t
        }) => ({
            type: nG,
            payload: {
                defer: t,
                rawData: e
            }
        });
        fe.previewRequested = bG;
        var AG = ({
            actionTypeId: e = s_.ActionTypeConsts.GENERAL_START_ACTION,
            actionListId: t,
            actionItemId: r,
            eventId: n,
            allowEvents: i,
            immediate: o,
            testManual: a,
            verbose: s,
            rawData: c
        }) => ({
            type: iG,
            payload: {
                actionTypeId: e,
                actionListId: t,
                actionItemId: r,
                testManual: a,
                eventId: n,
                allowEvents: i,
                immediate: o,
                verbose: s,
                rawData: c
            }
        });
        fe.playbackRequested = AG;
        var SG = e => ({
            type: oG,
            payload: {
                actionListId: e
            }
        });
        fe.stopRequested = SG;
        var wG = () => ({
            type: aG
        });
        fe.clearRequested = wG;
        var RG = (e, t) => ({
            type: sG,
            payload: {
                target: e,
                listenerParams: t
            }
        });
        fe.eventListenerAdded = RG;
        var CG = (e = 1) => ({
            type: uG,
            payload: {
                step: e
            }
        });
        fe.testFrameRendered = CG;
        var NG = (e, t) => ({
            type: cG,
            payload: {
                stateKey: e,
                newState: t
            }
        });
        fe.eventStateChanged = NG;
        var xG = (e, t) => ({
            type: lG,
            payload: {
                now: e,
                parameters: t
            }
        });
        fe.animationFrameChanged = xG;
        var qG = (e, t) => ({
            type: fG,
            payload: {
                key: e,
                value: t
            }
        });
        fe.parameterChanged = qG;
        var LG = e => ({
            type: dG,
            payload: (0, a_.default)({}, e)
        });
        fe.instanceAdded = LG;
        var PG = (e, t) => ({
            type: pG,
            payload: {
                instanceId: e,
                time: t
            }
        });
        fe.instanceStarted = PG;
        var DG = e => ({
            type: vG,
            payload: {
                instanceId: e
            }
        });
        fe.instanceRemoved = DG;
        var MG = (e, t, r, n) => ({
            type: hG,
            payload: {
                elementId: e,
                actionTypeId: t,
                current: r,
                actionItem: n
            }
        });
        fe.elementStateChanged = MG;
        var FG = ({
            actionListId: e,
            isPlaying: t
        }) => ({
            type: gG,
            payload: {
                actionListId: e,
                isPlaying: t
            }
        });
        fe.actionListPlaybackChanged = FG;
        var GG = ({
            width: e,
            mediaQueries: t
        }) => ({
            type: EG,
            payload: {
                width: e,
                mediaQueries: t
            }
        });
        fe.viewportWidthChanged = GG;
        var XG = () => ({
            type: _G
        });
        fe.mediaQueriesDefined = XG
    });
    var l_ = u(Pe => {
        "use strict";
        Object.defineProperty(Pe, "__esModule", {
            value: !0
        });
        Pe.elementContains = $G;
        Pe.getChildElements = JG;
        Pe.getClosestElement = void 0;
        Pe.getProperty = jG;
        Pe.getQuerySelector = zG;
        Pe.getRefType = rX;
        Pe.getSiblingElements = eX;
        Pe.getStyle = HG;
        Pe.getValidDocument = YG;
        Pe.isSiblingNode = ZG;
        Pe.matchSelector = KG;
        Pe.queryDocument = QG;
        Pe.setStyle = BG;
        var UG = Kt(),
            WG = Be(),
            {
                ELEMENT_MATCHES: es
            } = UG.IX2BrowserSupport,
            {
                IX2_ID_DELIMITER: u_,
                HTML_ELEMENT: VG,
                PLAIN_OBJECT: kG,
                WF_PAGE: c_
            } = WG.IX2EngineConstants;

        function BG(e, t, r) {
            e.style[t] = r
        }

        function HG(e, t) {
            return e.style[t]
        }

        function jG(e, t) {
            return e[t]
        }

        function KG(e) {
            return t => t[es](e)
        }

        function zG({
            id: e,
            selector: t
        }) {
            if (e) {
                let r = e;
                if (e.indexOf(u_) !== -1) {
                    let n = e.split(u_),
                        i = n[0];
                    if (r = n[1], i !== document.documentElement.getAttribute(c_)) return null
                }
                return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`
            }
            return t
        }

        function YG(e) {
            return e == null || e === document.documentElement.getAttribute(c_) ? document : null
        }

        function QG(e, t) {
            return Array.prototype.slice.call(document.querySelectorAll(t ? e + " " + t : e))
        }

        function $G(e, t) {
            return e.contains(t)
        }

        function ZG(e, t) {
            return e !== t && e.parentNode === t.parentNode
        }

        function JG(e) {
            let t = [];
            for (let r = 0, {
                    length: n
                } = e || []; r < n; r++) {
                let {
                    children: i
                } = e[r], {
                    length: o
                } = i;
                if (o)
                    for (let a = 0; a < o; a++) t.push(i[a])
            }
            return t
        }

        function eX(e = []) {
            let t = [],
                r = [];
            for (let n = 0, {
                    length: i
                } = e; n < i; n++) {
                let {
                    parentNode: o
                } = e[n];
                if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1) continue;
                r.push(o);
                let a = o.firstElementChild;
                for (; a != null;) e.indexOf(a) === -1 && t.push(a), a = a.nextElementSibling
            }
            return t
        }
        var tX = Element.prototype.closest ? (e, t) => document.documentElement.contains(e) ? e.closest(t) : null : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
                if (r[es] && r[es](t)) return r;
                r = r.parentNode
            } while (r != null);
            return null
        };
        Pe.getClosestElement = tX;

        function rX(e) {
            return e != null && typeof e == "object" ? e instanceof Element ? VG : kG : null
        }
    });
    var ts = u((qj, d_) => {
        var nX = pt(),
            f_ = Object.create,
            iX = function() {
                function e() {}
                return function(t) {
                    if (!nX(t)) return {};
                    if (f_) return f_(t);
                    e.prototype = t;
                    var r = new e;
                    return e.prototype = void 0, r
                }
            }();
        d_.exports = iX
    });
    var Ti = u((Lj, p_) => {
        function oX() {}
        p_.exports = oX
    });
    var bi = u((Pj, v_) => {
        var aX = ts(),
            sX = Ti();

        function Oi(e, t) {
            this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = void 0
        }
        Oi.prototype = aX(sX.prototype);
        Oi.prototype.constructor = Oi;
        v_.exports = Oi
    });
    var __ = u((Dj, E_) => {
        var h_ = ir(),
            uX = jr(),
            cX = qe(),
            g_ = h_ ? h_.isConcatSpreadable : void 0;

        function lX(e) {
            return cX(e) || uX(e) || !!(g_ && e && e[g_])
        }
        E_.exports = lX
    });
    var I_ = u((Mj, m_) => {
        var fX = jn(),
            dX = __();

        function y_(e, t, r, n, i) {
            var o = -1,
                a = e.length;
            for (r || (r = dX), i || (i = []); ++o < a;) {
                var s = e[o];
                t > 0 && r(s) ? t > 1 ? y_(s, t - 1, r, n, i) : fX(i, s) : n || (i[i.length] = s)
            }
            return i
        }
        m_.exports = y_
    });
    var O_ = u((Fj, T_) => {
        var pX = I_();

        function vX(e) {
            var t = e == null ? 0 : e.length;
            return t ? pX(e, 1) : []
        }
        T_.exports = vX
    });
    var A_ = u((Gj, b_) => {
        function hX(e, t, r) {
            switch (r.length) {
                case 0:
                    return e.call(t);
                case 1:
                    return e.call(t, r[0]);
                case 2:
                    return e.call(t, r[0], r[1]);
                case 3:
                    return e.call(t, r[0], r[1], r[2])
            }
            return e.apply(t, r)
        }
        b_.exports = hX
    });
    var R_ = u((Xj, w_) => {
        var gX = A_(),
            S_ = Math.max;

        function EX(e, t, r) {
            return t = S_(t === void 0 ? e.length - 1 : t, 0),
                function() {
                    for (var n = arguments, i = -1, o = S_(n.length - t, 0), a = Array(o); ++i < o;) a[i] = n[t + i];
                    i = -1;
                    for (var s = Array(t + 1); ++i < t;) s[i] = n[i];
                    return s[t] = r(a), gX(e, this, s)
                }
        }
        w_.exports = EX
    });
    var N_ = u((Uj, C_) => {
        function _X(e) {
            return function() {
                return e
            }
        }
        C_.exports = _X
    });
    var L_ = u((Wj, q_) => {
        var yX = N_(),
            x_ = $a(),
            mX = ii(),
            IX = x_ ? function(e, t) {
                return x_(e, "toString", {
                    configurable: !0,
                    enumerable: !1,
                    value: yX(t),
                    writable: !0
                })
            } : mX;
        q_.exports = IX
    });
    var D_ = u((Vj, P_) => {
        var TX = 800,
            OX = 16,
            bX = Date.now;

        function AX(e) {
            var t = 0,
                r = 0;
            return function() {
                var n = bX(),
                    i = OX - (n - r);
                if (r = n, i > 0) {
                    if (++t >= TX) return arguments[0]
                } else t = 0;
                return e.apply(void 0, arguments)
            }
        }
        P_.exports = AX
    });
    var F_ = u((kj, M_) => {
        var SX = L_(),
            wX = D_(),
            RX = wX(SX);
        M_.exports = RX
    });
    var X_ = u((Bj, G_) => {
        var CX = O_(),
            NX = R_(),
            xX = F_();

        function qX(e) {
            return xX(NX(e, void 0, CX), e + "")
        }
        G_.exports = qX
    });
    var V_ = u((Hj, W_) => {
        var U_ = ga(),
            LX = U_ && new U_;
        W_.exports = LX
    });
    var B_ = u((jj, k_) => {
        function PX() {}
        k_.exports = PX
    });
    var rs = u((Kj, j_) => {
        var H_ = V_(),
            DX = B_(),
            MX = H_ ? function(e) {
                return H_.get(e)
            } : DX;
        j_.exports = MX
    });
    var z_ = u((zj, K_) => {
        var FX = {};
        K_.exports = FX
    });
    var ns = u((Yj, Q_) => {
        var Y_ = z_(),
            GX = Object.prototype,
            XX = GX.hasOwnProperty;

        function UX(e) {
            for (var t = e.name + "", r = Y_[t], n = XX.call(Y_, t) ? r.length : 0; n--;) {
                var i = r[n],
                    o = i.func;
                if (o == null || o == e) return i.name
            }
            return t
        }
        Q_.exports = UX
    });
    var Si = u((Qj, $_) => {
        var WX = ts(),
            VX = Ti(),
            kX = 4294967295;

        function Ai(e) {
            this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = kX, this.__views__ = []
        }
        Ai.prototype = WX(VX.prototype);
        Ai.prototype.constructor = Ai;
        $_.exports = Ai
    });
    var J_ = u(($j, Z_) => {
        function BX(e, t) {
            var r = -1,
                n = e.length;
            for (t || (t = Array(n)); ++r < n;) t[r] = e[r];
            return t
        }
        Z_.exports = BX
    });
    var ty = u((Zj, ey) => {
        var HX = Si(),
            jX = bi(),
            KX = J_();

        function zX(e) {
            if (e instanceof HX) return e.clone();
            var t = new jX(e.__wrapped__, e.__chain__);
            return t.__actions__ = KX(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t
        }
        ey.exports = zX
    });
    var iy = u((Jj, ny) => {
        var YX = Si(),
            ry = bi(),
            QX = Ti(),
            $X = qe(),
            ZX = mt(),
            JX = ty(),
            eU = Object.prototype,
            tU = eU.hasOwnProperty;

        function wi(e) {
            if (ZX(e) && !$X(e) && !(e instanceof YX)) {
                if (e instanceof ry) return e;
                if (tU.call(e, "__wrapped__")) return JX(e)
            }
            return new ry(e)
        }
        wi.prototype = QX.prototype;
        wi.prototype.constructor = wi;
        ny.exports = wi
    });
    var ay = u((eK, oy) => {
        var rU = Si(),
            nU = rs(),
            iU = ns(),
            oU = iy();

        function aU(e) {
            var t = iU(e),
                r = oU[t];
            if (typeof r != "function" || !(t in rU.prototype)) return !1;
            if (e === r) return !0;
            var n = nU(r);
            return !!n && e === n[0]
        }
        oy.exports = aU
    });
    var ly = u((tK, cy) => {
        var sy = bi(),
            sU = X_(),
            uU = rs(),
            is = ns(),
            cU = qe(),
            uy = ay(),
            lU = "Expected a function",
            fU = 8,
            dU = 32,
            pU = 128,
            vU = 256;

        function hU(e) {
            return sU(function(t) {
                var r = t.length,
                    n = r,
                    i = sy.prototype.thru;
                for (e && t.reverse(); n--;) {
                    var o = t[n];
                    if (typeof o != "function") throw new TypeError(lU);
                    if (i && !a && is(o) == "wrapper") var a = new sy([], !0)
                }
                for (n = a ? n : r; ++n < r;) {
                    o = t[n];
                    var s = is(o),
                        c = s == "wrapper" ? uU(o) : void 0;
                    c && uy(c[0]) && c[1] == (pU | fU | dU | vU) && !c[4].length && c[9] == 1 ? a = a[is(c[0])].apply(a, c[3]) : a = o.length == 1 && uy(o) ? a[s]() : a.thru(o)
                }
                return function() {
                    var p = arguments,
                        y = p[0];
                    if (a && p.length == 1 && cU(y)) return a.plant(y).value();
                    for (var g = 0, I = r ? t[g].apply(this, p) : y; ++g < r;) I = t[g].call(this, I);
                    return I
                }
            })
        }
        cy.exports = hU
    });
    var dy = u((rK, fy) => {
        var gU = ly(),
            EU = gU();
        fy.exports = EU
    });
    var vy = u((nK, py) => {
        function _U(e, t, r) {
            return e === e && (r !== void 0 && (e = e <= r ? e : r), t !== void 0 && (e = e >= t ? e : t)), e
        }
        py.exports = _U
    });
    var gy = u((iK, hy) => {
        var yU = vy(),
            os = oi();

        function mU(e, t, r) {
            return r === void 0 && (r = t, t = void 0), r !== void 0 && (r = os(r), r = r === r ? r : 0), t !== void 0 && (t = os(t), t = t === t ? t : 0), yU(os(e), t, r)
        }
        hy.exports = mU
    });
    var Py = u(qi => {
        "use strict";
        var xi = lt().default;
        Object.defineProperty(qi, "__esModule", {
            value: !0
        });
        qi.default = void 0;
        var ze = xi(Wr()),
            IU = xi(dy()),
            TU = xi(ni()),
            OU = xi(gy()),
            zt = Be(),
            as = ls(),
            Ri = Ii(),
            bU = Kt(),
            {
                MOUSE_CLICK: AU,
                MOUSE_SECOND_CLICK: SU,
                MOUSE_DOWN: wU,
                MOUSE_UP: RU,
                MOUSE_OVER: CU,
                MOUSE_OUT: NU,
                DROPDOWN_CLOSE: xU,
                DROPDOWN_OPEN: qU,
                SLIDER_ACTIVE: LU,
                SLIDER_INACTIVE: PU,
                TAB_ACTIVE: DU,
                TAB_INACTIVE: MU,
                NAVBAR_CLOSE: FU,
                NAVBAR_OPEN: GU,
                MOUSE_MOVE: XU,
                PAGE_SCROLL_DOWN: Ay,
                SCROLL_INTO_VIEW: Sy,
                SCROLL_OUT_OF_VIEW: UU,
                PAGE_SCROLL_UP: WU,
                SCROLLING_IN_VIEW: VU,
                PAGE_FINISH: wy,
                ECOMMERCE_CART_CLOSE: kU,
                ECOMMERCE_CART_OPEN: BU,
                PAGE_START: Ry,
                PAGE_SCROLL: HU
            } = zt.EventTypeConsts,
            ss = "COMPONENT_ACTIVE",
            Cy = "COMPONENT_INACTIVE",
            {
                COLON_DELIMITER: Ey
            } = zt.IX2EngineConstants,
            {
                getNamespacedParameterId: _y
            } = bU.IX2VanillaUtils,
            Ny = e => t => typeof t == "object" && e(t) ? !0 : t,
            ln = Ny(({
                element: e,
                nativeEvent: t
            }) => e === t.target),
            jU = Ny(({
                element: e,
                nativeEvent: t
            }) => e.contains(t.target)),
            Et = (0, IU.default)([ln, jU]),
            xy = (e, t) => {
                if (t) {
                    let {
                        ixData: r
                    } = e.getState(), {
                        events: n
                    } = r, i = n[t];
                    if (i && !zU[i.eventTypeId]) return i
                }
                return null
            },
            KU = ({
                store: e,
                event: t
            }) => {
                let {
                    action: r
                } = t, {
                    autoStopEventId: n
                } = r.config;
                return !!xy(e, n)
            },
            je = ({
                store: e,
                event: t,
                element: r,
                eventStateKey: n
            }, i) => {
                let {
                    action: o,
                    id: a
                } = t, {
                    actionListId: s,
                    autoStopEventId: c
                } = o.config, p = xy(e, c);
                return p && (0, as.stopActionGroup)({
                    store: e,
                    eventId: c,
                    eventTarget: r,
                    eventStateKey: c + Ey + n.split(Ey)[1],
                    actionListId: (0, TU.default)(p, "action.config.actionListId")
                }), (0, as.stopActionGroup)({
                    store: e,
                    eventId: a,
                    eventTarget: r,
                    eventStateKey: n,
                    actionListId: s
                }), (0, as.startActionGroup)({
                    store: e,
                    eventId: a,
                    eventTarget: r,
                    eventStateKey: n,
                    actionListId: s
                }), i
            },
            nt = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n,
            fn = {
                handler: nt(Et, je)
            },
            qy = (0, ze.default)({}, fn, {
                types: [ss, Cy].join(" ")
            }),
            us = [{
                target: window,
                types: "resize orientationchange",
                throttle: !0
            }, {
                target: document,
                types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
                throttle: !0
            }],
            yy = "mouseover mouseout",
            cs = {
                types: us
            },
            zU = {
                PAGE_START: Ry,
                PAGE_FINISH: wy
            },
            cn = (() => {
                let e = window.pageXOffset !== void 0,
                    r = document.compatMode === "CSS1Compat" ? document.documentElement : document.body;
                return () => ({
                    scrollLeft: e ? window.pageXOffset : r.scrollLeft,
                    scrollTop: e ? window.pageYOffset : r.scrollTop,
                    stiffScrollTop: (0, OU.default)(e ? window.pageYOffset : r.scrollTop, 0, r.scrollHeight - window.innerHeight),
                    scrollWidth: r.scrollWidth,
                    scrollHeight: r.scrollHeight,
                    clientWidth: r.clientWidth,
                    clientHeight: r.clientHeight,
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight
                })
            })(),
            YU = (e, t) => !(e.left > t.right || e.right < t.left || e.top > t.bottom || e.bottom < t.top),
            QU = ({
                element: e,
                nativeEvent: t
            }) => {
                let {
                    type: r,
                    target: n,
                    relatedTarget: i
                } = t, o = e.contains(n);
                if (r === "mouseover" && o) return !0;
                let a = e.contains(i);
                return !!(r === "mouseout" && o && a)
            },
            $U = e => {
                let {
                    element: t,
                    event: {
                        config: r
                    }
                } = e, {
                    clientWidth: n,
                    clientHeight: i
                } = cn(), o = r.scrollOffsetValue, c = r.scrollOffsetUnit === "PX" ? o : i * (o || 0) / 100;
                return YU(t.getBoundingClientRect(), {
                    left: 0,
                    top: c,
                    right: n,
                    bottom: i - c
                })
            },
            Ly = e => (t, r) => {
                let {
                    type: n
                } = t.nativeEvent, i = [ss, Cy].indexOf(n) !== -1 ? n === ss : r.isActive, o = (0, ze.default)({}, r, {
                    isActive: i
                });
                return (!r || o.isActive !== r.isActive) && e(t, o) || o
            },
            my = e => (t, r) => {
                let n = {
                    elementHovered: QU(t)
                };
                return (r ? n.elementHovered !== r.elementHovered : n.elementHovered) && e(t, n) || n
            },
            ZU = e => (t, r) => {
                let n = (0, ze.default)({}, r, {
                    elementVisible: $U(t)
                });
                return (r ? n.elementVisible !== r.elementVisible : n.elementVisible) && e(t, n) || n
            },
            Iy = e => (t, r = {}) => {
                let {
                    stiffScrollTop: n,
                    scrollHeight: i,
                    innerHeight: o
                } = cn(), {
                    event: {
                        config: a,
                        eventTypeId: s
                    }
                } = t, {
                    scrollOffsetValue: c,
                    scrollOffsetUnit: p
                } = a, y = p === "PX", g = i - o, I = Number((n / g).toFixed(2));
                if (r && r.percentTop === I) return r;
                let T = (y ? c : o * (c || 0) / 100) / g,
                    N, R, X = 0;
                r && (N = I > r.percentTop, R = r.scrollingDown !== N, X = R ? I : r.anchorTop);
                let q = s === Ay ? I >= X + T : I <= X - T,
                    P = (0, ze.default)({}, r, {
                        percentTop: I,
                        inBounds: q,
                        anchorTop: X,
                        scrollingDown: N
                    });
                return r && q && (R || P.inBounds !== r.inBounds) && e(t, P) || P
            },
            JU = (e, t) => e.left > t.left && e.left < t.right && e.top > t.top && e.top < t.bottom,
            eW = e => (t, r) => {
                let n = {
                    finished: document.readyState === "complete"
                };
                return n.finished && !(r && r.finshed) && e(t), n
            },
            tW = e => (t, r) => {
                let n = {
                    started: !0
                };
                return r || e(t), n
            },
            Ty = e => (t, r = {
                clickCount: 0
            }) => {
                let n = {
                    clickCount: r.clickCount % 2 + 1
                };
                return n.clickCount !== r.clickCount && e(t, n) || n
            },
            Ci = (e = !0) => (0, ze.default)({}, qy, {
                handler: nt(e ? Et : ln, Ly((t, r) => r.isActive ? fn.handler(t, r) : r))
            }),
            Ni = (e = !0) => (0, ze.default)({}, qy, {
                handler: nt(e ? Et : ln, Ly((t, r) => r.isActive ? r : fn.handler(t, r)))
            }),
            Oy = (0, ze.default)({}, cs, {
                handler: ZU((e, t) => {
                    let {
                        elementVisible: r
                    } = t, {
                        event: n,
                        store: i
                    } = e, {
                        ixData: o
                    } = i.getState(), {
                        events: a
                    } = o;
                    return !a[n.action.config.autoStopEventId] && t.triggered ? t : n.eventTypeId === Sy === r ? (je(e), (0, ze.default)({}, t, {
                        triggered: !0
                    })) : t
                })
            }),
            by = .05,
            rW = {
                [LU]: Ci(),
                [PU]: Ni(),
                [qU]: Ci(),
                [xU]: Ni(),
                [GU]: Ci(!1),
                [FU]: Ni(!1),
                [DU]: Ci(),
                [MU]: Ni(),
                [BU]: {
                    types: "ecommerce-cart-open",
                    handler: nt(Et, je)
                },
                [kU]: {
                    types: "ecommerce-cart-close",
                    handler: nt(Et, je)
                },
                [AU]: {
                    types: "click",
                    handler: nt(Et, Ty((e, {
                        clickCount: t
                    }) => {
                        KU(e) ? t === 1 && je(e) : je(e)
                    }))
                },
                [SU]: {
                    types: "click",
                    handler: nt(Et, Ty((e, {
                        clickCount: t
                    }) => {
                        t === 2 && je(e)
                    }))
                },
                [wU]: (0, ze.default)({}, fn, {
                    types: "mousedown"
                }),
                [RU]: (0, ze.default)({}, fn, {
                    types: "mouseup"
                }),
                [CU]: {
                    types: yy,
                    handler: nt(Et, my((e, t) => {
                        t.elementHovered && je(e)
                    }))
                },
                [NU]: {
                    types: yy,
                    handler: nt(Et, my((e, t) => {
                        t.elementHovered || je(e)
                    }))
                },
                [XU]: {
                    types: "mousemove mouseout scroll",
                    handler: ({
                        store: e,
                        element: t,
                        eventConfig: r,
                        nativeEvent: n,
                        eventStateKey: i
                    }, o = {
                        clientX: 0,
                        clientY: 0,
                        pageX: 0,
                        pageY: 0
                    }) => {
                        let {
                            basedOn: a,
                            selectedAxis: s,
                            continuousParameterGroupId: c,
                            reverse: p,
                            restingState: y = 0
                        } = r, {
                            clientX: g = o.clientX,
                            clientY: I = o.clientY,
                            pageX: T = o.pageX,
                            pageY: N = o.pageY
                        } = n, R = s === "X_AXIS", X = n.type === "mouseout", q = y / 100, P = c, A = !1;
                        switch (a) {
                            case zt.EventBasedOn.VIEWPORT:
                                {
                                    q = R ? Math.min(g, window.innerWidth) / window.innerWidth : Math.min(I, window.innerHeight) / window.innerHeight;
                                    break
                                }
                            case zt.EventBasedOn.PAGE:
                                {
                                    let {
                                        scrollLeft: W,
                                        scrollTop: V,
                                        scrollWidth: G,
                                        scrollHeight: K
                                    } = cn();q = R ? Math.min(W + T, G) / G : Math.min(V + N, K) / K;
                                    break
                                }
                            case zt.EventBasedOn.ELEMENT:
                            default:
                                {
                                    P = _y(i, c);
                                    let W = n.type.indexOf("mouse") === 0;
                                    if (W && Et({
                                            element: t,
                                            nativeEvent: n
                                        }) !== !0) break;
                                    let V = t.getBoundingClientRect(),
                                        {
                                            left: G,
                                            top: K,
                                            width: J,
                                            height: Z
                                        } = V;
                                    if (!W && !JU({
                                            left: g,
                                            top: I
                                        }, V)) break;A = !0,
                                    q = R ? (g - G) / J : (I - K) / Z;
                                    break
                                }
                        }
                        return X && (q > 1 - by || q < by) && (q = Math.round(q)), (a !== zt.EventBasedOn.ELEMENT || A || A !== o.elementHovered) && (q = p ? 1 - q : q, e.dispatch((0, Ri.parameterChanged)(P, q))), {
                            elementHovered: A,
                            clientX: g,
                            clientY: I,
                            pageX: T,
                            pageY: N
                        }
                    }
                },
                [HU]: {
                    types: us,
                    handler: ({
                        store: e,
                        eventConfig: t
                    }) => {
                        let {
                            continuousParameterGroupId: r,
                            reverse: n
                        } = t, {
                            scrollTop: i,
                            scrollHeight: o,
                            clientHeight: a
                        } = cn(), s = i / (o - a);
                        s = n ? 1 - s : s, e.dispatch((0, Ri.parameterChanged)(r, s))
                    }
                },
                [VU]: {
                    types: us,
                    handler: ({
                        element: e,
                        store: t,
                        eventConfig: r,
                        eventStateKey: n
                    }, i = {
                        scrollPercent: 0
                    }) => {
                        let {
                            scrollLeft: o,
                            scrollTop: a,
                            scrollWidth: s,
                            scrollHeight: c,
                            clientHeight: p
                        } = cn(), {
                            basedOn: y,
                            selectedAxis: g,
                            continuousParameterGroupId: I,
                            startsEntering: T,
                            startsExiting: N,
                            addEndOffset: R,
                            addStartOffset: X,
                            addOffsetValue: q = 0,
                            endOffsetValue: P = 0
                        } = r, A = g === "X_AXIS";
                        if (y === zt.EventBasedOn.VIEWPORT) {
                            let W = A ? o / s : a / c;
                            return W !== i.scrollPercent && t.dispatch((0, Ri.parameterChanged)(I, W)), {
                                scrollPercent: W
                            }
                        } else {
                            let W = _y(n, I),
                                V = e.getBoundingClientRect(),
                                G = (X ? q : 0) / 100,
                                K = (R ? P : 0) / 100;
                            G = T ? G : 1 - G, K = N ? K : 1 - K;
                            let J = V.top + Math.min(V.height * G, p),
                                oe = V.top + V.height * K - J,
                                H = Math.min(p + oe, c),
                                v = Math.min(Math.max(0, p - J), H) / H;
                            return v !== i.scrollPercent && t.dispatch((0, Ri.parameterChanged)(W, v)), {
                                scrollPercent: v
                            }
                        }
                    }
                },
                [Sy]: Oy,
                [UU]: Oy,
                [Ay]: (0, ze.default)({}, cs, {
                    handler: Iy((e, t) => {
                        t.scrollingDown && je(e)
                    })
                }),
                [WU]: (0, ze.default)({}, cs, {
                    handler: Iy((e, t) => {
                        t.scrollingDown || je(e)
                    })
                }),
                [wy]: {
                    types: "readystatechange IX2_PAGE_UPDATE",
                    handler: nt(ln, eW(je))
                },
                [Ry]: {
                    types: "readystatechange IX2_PAGE_UPDATE",
                    handler: nt(ln, tW(je))
                }
            };
        qi.default = rW
    });
    var ls = u(Lt => {
        "use strict";
        var ot = lt().default,
            nW = er().default;
        Object.defineProperty(Lt, "__esModule", {
            value: !0
        });
        Lt.observeRequests = qW;
        Lt.startActionGroup = Es;
        Lt.startEngine = Mi;
        Lt.stopActionGroup = gs;
        Lt.stopAllActionGroups = ky;
        Lt.stopEngine = Fi;
        var iW = ot(Wr()),
            oW = ot($g()),
            aW = ot(qa()),
            qt = ot(ni()),
            sW = ot(gE()),
            uW = ot(VE()),
            cW = ot(BE()),
            lW = ot(jE()),
            dn = ot(ZE()),
            fW = ot(o_()),
            it = Be(),
            Fy = Kt(),
            Ae = Ii(),
            Ce = nW(l_()),
            dW = ot(Py()),
            pW = ["store", "computedStyle"],
            vW = Object.keys(it.QuickEffectIds),
            fs = e => vW.includes(e),
            {
                COLON_DELIMITER: ds,
                BOUNDARY_SELECTOR: Li,
                HTML_ELEMENT: Gy,
                RENDER_GENERAL: hW,
                W_MOD_IX: Dy
            } = it.IX2EngineConstants,
            {
                getAffectedElements: Pi,
                getElementId: gW,
                getDestinationValues: ps,
                observeStore: Yt,
                getInstanceId: EW,
                renderHTMLElement: _W,
                clearAllStyles: Xy,
                getMaxDurationItemIndex: yW,
                getComputedStyle: mW,
                getInstanceOrigin: IW,
                reduceListToGroup: TW,
                shouldNamespaceEventParameter: OW,
                getNamespacedParameterId: bW,
                shouldAllowMediaQuery: Di,
                cleanupHTMLElement: AW,
                stringifyTarget: SW,
                mediaQueriesEqual: wW,
                shallowEqual: RW
            } = Fy.IX2VanillaUtils,
            {
                isPluginType: vs,
                createPluginInstance: hs,
                getPluginDuration: CW
            } = Fy.IX2VanillaPlugins,
            My = navigator.userAgent,
            NW = My.match(/iPad/i) || My.match(/iPhone/),
            xW = 12;

        function qW(e) {
            Yt({
                store: e,
                select: ({
                    ixRequest: t
                }) => t.preview,
                onChange: DW
            }), Yt({
                store: e,
                select: ({
                    ixRequest: t
                }) => t.playback,
                onChange: MW
            }), Yt({
                store: e,
                select: ({
                    ixRequest: t
                }) => t.stop,
                onChange: FW
            }), Yt({
                store: e,
                select: ({
                    ixRequest: t
                }) => t.clear,
                onChange: GW
            })
        }

        function LW(e) {
            Yt({
                store: e,
                select: ({
                    ixSession: t
                }) => t.mediaQueryKey,
                onChange: () => {
                    Fi(e), Xy({
                        store: e,
                        elementApi: Ce
                    }), Mi({
                        store: e,
                        allowEvents: !0
                    }), Uy()
                }
            })
        }

        function PW(e, t) {
            let r = Yt({
                store: e,
                select: ({
                    ixSession: n
                }) => n.tick,
                onChange: n => {
                    t(n), r()
                }
            })
        }

        function DW({
            rawData: e,
            defer: t
        }, r) {
            let n = () => {
                Mi({
                    store: r,
                    rawData: e,
                    allowEvents: !0
                }), Uy()
            };
            t ? setTimeout(n, 0) : n()
        }

        function Uy() {
            document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"))
        }

        function MW(e, t) {
            let {
                actionTypeId: r,
                actionListId: n,
                actionItemId: i,
                eventId: o,
                allowEvents: a,
                immediate: s,
                testManual: c,
                verbose: p = !0
            } = e, {
                rawData: y
            } = e;
            if (n && i && y && s) {
                let g = y.actionLists[n];
                g && (y = TW({
                    actionList: g,
                    actionItemId: i,
                    rawData: y
                }))
            }
            if (Mi({
                    store: t,
                    rawData: y,
                    allowEvents: a,
                    testManual: c
                }), n && r === it.ActionTypeConsts.GENERAL_START_ACTION || fs(r)) {
                gs({
                    store: t,
                    actionListId: n
                }), Vy({
                    store: t,
                    actionListId: n,
                    eventId: o
                });
                let g = Es({
                    store: t,
                    eventId: o,
                    actionListId: n,
                    immediate: s,
                    verbose: p
                });
                p && g && t.dispatch((0, Ae.actionListPlaybackChanged)({
                    actionListId: n,
                    isPlaying: !s
                }))
            }
        }

        function FW({
            actionListId: e
        }, t) {
            e ? gs({
                store: t,
                actionListId: e
            }) : ky({
                store: t
            }), Fi(t)
        }

        function GW(e, t) {
            Fi(t), Xy({
                store: t,
                elementApi: Ce
            })
        }

        function Mi({
            store: e,
            rawData: t,
            allowEvents: r,
            testManual: n
        }) {
            let {
                ixSession: i
            } = e.getState();
            t && e.dispatch((0, Ae.rawDataImported)(t)), i.active || (e.dispatch((0, Ae.sessionInitialized)({
                hasBoundaryNodes: !!document.querySelector(Li),
                reducedMotion: document.body.hasAttribute("data-wf-ix-vacation") && window.matchMedia("(prefers-reduced-motion)").matches
            })), r && (BW(e), XW(), e.getState().ixSession.hasDefinedMediaQueries && LW(e)), e.dispatch((0, Ae.sessionStarted)()), UW(e, n))
        }

        function XW() {
            let {
                documentElement: e
            } = document;
            e.className.indexOf(Dy) === -1 && (e.className += ` ${Dy}`)
        }

        function UW(e, t) {
            let r = n => {
                let {
                    ixSession: i,
                    ixParameters: o
                } = e.getState();
                i.active && (e.dispatch((0, Ae.animationFrameChanged)(n, o)), t ? PW(e, r) : requestAnimationFrame(r))
            };
            r(window.performance.now())
        }

        function Fi(e) {
            let {
                ixSession: t
            } = e.getState();
            if (t.active) {
                let {
                    eventListeners: r
                } = t;
                r.forEach(WW), e.dispatch((0, Ae.sessionStopped)())
            }
        }

        function WW({
            target: e,
            listenerParams: t
        }) {
            e.removeEventListener.apply(e, t)
        }

        function VW({
            store: e,
            eventStateKey: t,
            eventTarget: r,
            eventId: n,
            eventConfig: i,
            actionListId: o,
            parameterGroup: a,
            smoothing: s,
            restingValue: c
        }) {
            let {
                ixData: p,
                ixSession: y
            } = e.getState(), {
                events: g
            } = p, I = g[n], {
                eventTypeId: T
            } = I, N = {}, R = {}, X = [], {
                continuousActionGroups: q
            } = a, {
                id: P
            } = a;
            OW(T, i) && (P = bW(t, P));
            let A = y.hasBoundaryNodes && r ? Ce.getClosestElement(r, Li) : null;
            q.forEach(W => {
                let {
                    keyframe: V,
                    actionItems: G
                } = W;
                G.forEach(K => {
                    let {
                        actionTypeId: J
                    } = K, {
                        target: Z
                    } = K.config;
                    if (!Z) return;
                    let oe = Z.boundaryMode ? A : null,
                        H = SW(Z) + ds + J;
                    if (R[H] = kW(R[H], V, K), !N[H]) {
                        N[H] = !0;
                        let {
                            config: S
                        } = K;
                        Pi({
                            config: S,
                            event: I,
                            eventTarget: r,
                            elementRoot: oe,
                            elementApi: Ce
                        }).forEach(v => {
                            X.push({
                                element: v,
                                key: H
                            })
                        })
                    }
                })
            }), X.forEach(({
                element: W,
                key: V
            }) => {
                let G = R[V],
                    K = (0, qt.default)(G, "[0].actionItems[0]", {}),
                    {
                        actionTypeId: J
                    } = K,
                    Z = vs(J) ? hs(J)(W, K) : null,
                    oe = ps({
                        element: W,
                        actionItem: K,
                        elementApi: Ce
                    }, Z);
                _s({
                    store: e,
                    element: W,
                    eventId: n,
                    actionListId: o,
                    actionItem: K,
                    destination: oe,
                    continuous: !0,
                    parameterId: P,
                    actionGroups: G,
                    smoothing: s,
                    restingValue: c,
                    pluginInstance: Z
                })
            })
        }

        function kW(e = [], t, r) {
            let n = [...e],
                i;
            return n.some((o, a) => o.keyframe === t ? (i = a, !0) : !1), i == null && (i = n.length, n.push({
                keyframe: t,
                actionItems: []
            })), n[i].actionItems.push(r), n
        }

        function BW(e) {
            let {
                ixData: t
            } = e.getState(), {
                eventTypeMap: r
            } = t;
            Wy(e), (0, dn.default)(r, (i, o) => {
                let a = dW.default[o];
                if (!a) {
                    console.warn(`IX2 event type not configured: ${o}`);
                    return
                }
                QW({
                    logic: a,
                    store: e,
                    events: i
                })
            });
            let {
                ixSession: n
            } = e.getState();
            n.eventListeners.length && jW(e)
        }
        var HW = ["resize", "orientationchange"];

        function jW(e) {
            let t = () => {
                Wy(e)
            };
            HW.forEach(r => {
                window.addEventListener(r, t), e.dispatch((0, Ae.eventListenerAdded)(window, [r, t]))
            }), t()
        }

        function Wy(e) {
            let {
                ixSession: t,
                ixData: r
            } = e.getState(), n = window.innerWidth;
            if (n !== t.viewportWidth) {
                let {
                    mediaQueries: i
                } = r;
                e.dispatch((0, Ae.viewportWidthChanged)({
                    width: n,
                    mediaQueries: i
                }))
            }
        }
        var KW = (e, t) => (0, uW.default)((0, lW.default)(e, t), cW.default),
            zW = (e, t) => {
                (0, dn.default)(e, (r, n) => {
                    r.forEach((i, o) => {
                        let a = n + ds + o;
                        t(i, n, a)
                    })
                })
            },
            YW = e => {
                let t = {
                    target: e.target,
                    targets: e.targets
                };
                return Pi({
                    config: t,
                    elementApi: Ce
                })
            };

        function QW({
            logic: e,
            store: t,
            events: r
        }) {
            $W(r);
            let {
                types: n,
                handler: i
            } = e, {
                ixData: o
            } = t.getState(), {
                actionLists: a
            } = o, s = KW(r, YW);
            if (!(0, sW.default)(s)) return;
            (0, dn.default)(s, (g, I) => {
                let T = r[I],
                    {
                        action: N,
                        id: R,
                        mediaQueries: X = o.mediaQueryKeys
                    } = T,
                    {
                        actionListId: q
                    } = N.config;
                wW(X, o.mediaQueryKeys) || t.dispatch((0, Ae.mediaQueriesDefined)()), N.actionTypeId === it.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION && (Array.isArray(T.config) ? T.config : [T.config]).forEach(A => {
                    let {
                        continuousParameterGroupId: W
                    } = A, V = (0, qt.default)(a, `${q}.continuousParameterGroups`, []), G = (0, aW.default)(V, ({
                        id: Z
                    }) => Z === W), K = (A.smoothing || 0) / 100, J = (A.restingState || 0) / 100;
                    G && g.forEach((Z, oe) => {
                        let H = R + ds + oe;
                        VW({
                            store: t,
                            eventStateKey: H,
                            eventTarget: Z,
                            eventId: R,
                            eventConfig: A,
                            actionListId: q,
                            parameterGroup: G,
                            smoothing: K,
                            restingValue: J
                        })
                    })
                }), (N.actionTypeId === it.ActionTypeConsts.GENERAL_START_ACTION || fs(N.actionTypeId)) && Vy({
                    store: t,
                    actionListId: q,
                    eventId: R
                })
            });
            let c = g => {
                    let {
                        ixSession: I
                    } = t.getState();
                    zW(s, (T, N, R) => {
                        let X = r[N],
                            q = I.eventState[R],
                            {
                                action: P,
                                mediaQueries: A = o.mediaQueryKeys
                            } = X;
                        if (!Di(A, I.mediaQueryKey)) return;
                        let W = (V = {}) => {
                            let G = i({
                                store: t,
                                element: T,
                                event: X,
                                eventConfig: V,
                                nativeEvent: g,
                                eventStateKey: R
                            }, q);
                            RW(G, q) || t.dispatch((0, Ae.eventStateChanged)(R, G))
                        };
                        P.actionTypeId === it.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION ? (Array.isArray(X.config) ? X.config : [X.config]).forEach(W) : W()
                    })
                },
                p = (0, fW.default)(c, xW),
                y = ({
                    target: g = document,
                    types: I,
                    throttle: T
                }) => {
                    I.split(" ").filter(Boolean).forEach(N => {
                        let R = T ? p : c;
                        g.addEventListener(N, R), t.dispatch((0, Ae.eventListenerAdded)(g, [N, R]))
                    })
                };
            Array.isArray(n) ? n.forEach(y) : typeof n == "string" && y(e)
        }

        function $W(e) {
            if (!NW) return;
            let t = {},
                r = "";
            for (let n in e) {
                let {
                    eventTypeId: i,
                    target: o
                } = e[n], a = Ce.getQuerySelector(o);
                t[a] || (i === it.EventTypeConsts.MOUSE_CLICK || i === it.EventTypeConsts.MOUSE_SECOND_CLICK) && (t[a] = !0, r += a + "{cursor: pointer;touch-action: manipulation;}")
            }
            if (r) {
                let n = document.createElement("style");
                n.textContent = r, document.body.appendChild(n)
            }
        }

        function Vy({
            store: e,
            actionListId: t,
            eventId: r
        }) {
            let {
                ixData: n,
                ixSession: i
            } = e.getState(), {
                actionLists: o,
                events: a
            } = n, s = a[r], c = o[t];
            if (c && c.useFirstGroupAsInitialState) {
                let p = (0, qt.default)(c, "actionItemGroups[0].actionItems", []),
                    y = (0, qt.default)(s, "mediaQueries", n.mediaQueryKeys);
                if (!Di(y, i.mediaQueryKey)) return;
                p.forEach(g => {
                    var I;
                    let {
                        config: T,
                        actionTypeId: N
                    } = g, R = (T == null || (I = T.target) === null || I === void 0 ? void 0 : I.useEventTarget) === !0 ? {
                        target: s.target,
                        targets: s.targets
                    } : T, X = Pi({
                        config: R,
                        event: s,
                        elementApi: Ce
                    }), q = vs(N);
                    X.forEach(P => {
                        let A = q ? hs(N)(P, g) : null;
                        _s({
                            destination: ps({
                                element: P,
                                actionItem: g,
                                elementApi: Ce
                            }, A),
                            immediate: !0,
                            store: e,
                            element: P,
                            eventId: r,
                            actionItem: g,
                            actionListId: t,
                            pluginInstance: A
                        })
                    })
                })
            }
        }

        function ky({
            store: e
        }) {
            let {
                ixInstances: t
            } = e.getState();
            (0, dn.default)(t, r => {
                if (!r.continuous) {
                    let {
                        actionListId: n,
                        verbose: i
                    } = r;
                    ys(r, e), i && e.dispatch((0, Ae.actionListPlaybackChanged)({
                        actionListId: n,
                        isPlaying: !1
                    }))
                }
            })
        }

        function gs({
            store: e,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i
        }) {
            let {
                ixInstances: o,
                ixSession: a
            } = e.getState(), s = a.hasBoundaryNodes && r ? Ce.getClosestElement(r, Li) : null;
            (0, dn.default)(o, c => {
                let p = (0, qt.default)(c, "actionItem.config.target.boundaryMode"),
                    y = n ? c.eventStateKey === n : !0;
                if (c.actionListId === i && c.eventId === t && y) {
                    if (s && p && !Ce.elementContains(s, c.element)) return;
                    ys(c, e), c.verbose && e.dispatch((0, Ae.actionListPlaybackChanged)({
                        actionListId: i,
                        isPlaying: !1
                    }))
                }
            })
        }

        function Es({
            store: e,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o = 0,
            immediate: a,
            verbose: s
        }) {
            var c;
            let {
                ixData: p,
                ixSession: y
            } = e.getState(), {
                events: g
            } = p, I = g[t] || {}, {
                mediaQueries: T = p.mediaQueryKeys
            } = I, N = (0, qt.default)(p, `actionLists.${i}`, {}), {
                actionItemGroups: R,
                useFirstGroupAsInitialState: X
            } = N;
            if (!R || !R.length) return !1;
            o >= R.length && (0, qt.default)(I, "config.loop") && (o = 0), o === 0 && X && o++;
            let P = (o === 0 || o === 1 && X) && fs((c = I.action) === null || c === void 0 ? void 0 : c.actionTypeId) ? I.config.delay : void 0,
                A = (0, qt.default)(R, [o, "actionItems"], []);
            if (!A.length || !Di(T, y.mediaQueryKey)) return !1;
            let W = y.hasBoundaryNodes && r ? Ce.getClosestElement(r, Li) : null,
                V = yW(A),
                G = !1;
            return A.forEach((K, J) => {
                let {
                    config: Z,
                    actionTypeId: oe
                } = K, H = vs(oe), {
                    target: S
                } = Z;
                if (!S) return;
                let v = S.boundaryMode ? W : null;
                Pi({
                    config: Z,
                    event: I,
                    eventTarget: r,
                    elementRoot: v,
                    elementApi: Ce
                }).forEach((x, B) => {
                    let ee = H ? hs(oe)(x, K) : null,
                        ne = H ? CW(oe)(x, K) : null;
                    G = !0;
                    let U = V === J && B === 0,
                        z = mW({
                            element: x,
                            actionItem: K
                        }),
                        d = ps({
                            element: x,
                            actionItem: K,
                            elementApi: Ce
                        }, ee);
                    _s({
                        store: e,
                        element: x,
                        actionItem: K,
                        eventId: t,
                        eventTarget: r,
                        eventStateKey: n,
                        actionListId: i,
                        groupIndex: o,
                        isCarrier: U,
                        computedStyle: z,
                        destination: d,
                        immediate: a,
                        verbose: s,
                        pluginInstance: ee,
                        pluginDuration: ne,
                        instanceDelay: P
                    })
                })
            }), G
        }

        function _s(e) {
            var t;
            let {
                store: r,
                computedStyle: n
            } = e, i = (0, oW.default)(e, pW), {
                element: o,
                actionItem: a,
                immediate: s,
                pluginInstance: c,
                continuous: p,
                restingValue: y,
                eventId: g
            } = i, I = !p, T = EW(), {
                ixElements: N,
                ixSession: R,
                ixData: X
            } = r.getState(), q = gW(N, o), {
                refState: P
            } = N[q] || {}, A = Ce.getRefType(o), W = R.reducedMotion && it.ReducedMotionTypes[a.actionTypeId], V;
            if (W && p) switch ((t = X.events[g]) === null || t === void 0 ? void 0 : t.eventTypeId) {
                case it.EventTypeConsts.MOUSE_MOVE:
                case it.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
                    V = y;
                    break;
                default:
                    V = .5;
                    break
            }
            let G = IW(o, P, n, a, Ce, c);
            if (r.dispatch((0, Ae.instanceAdded)((0, iW.default)({
                    instanceId: T,
                    elementId: q,
                    origin: G,
                    refType: A,
                    skipMotion: W,
                    skipToValue: V
                }, i))), By(document.body, "ix2-animation-started", T), s) {
                ZW(r, T);
                return
            }
            Yt({
                store: r,
                select: ({
                    ixInstances: K
                }) => K[T],
                onChange: Hy
            }), I && r.dispatch((0, Ae.instanceStarted)(T, R.tick))
        }

        function ys(e, t) {
            By(document.body, "ix2-animation-stopping", {
                instanceId: e.id,
                state: t.getState()
            });
            let {
                elementId: r,
                actionItem: n
            } = e, {
                ixElements: i
            } = t.getState(), {
                ref: o,
                refType: a
            } = i[r] || {};
            a === Gy && AW(o, n, Ce), t.dispatch((0, Ae.instanceRemoved)(e.id))
        }

        function By(e, t, r) {
            let n = document.createEvent("CustomEvent");
            n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n)
        }

        function ZW(e, t) {
            let {
                ixParameters: r
            } = e.getState();
            e.dispatch((0, Ae.instanceStarted)(t, 0)), e.dispatch((0, Ae.animationFrameChanged)(performance.now(), r));
            let {
                ixInstances: n
            } = e.getState();
            Hy(n[t], e)
        }

        function Hy(e, t) {
            let {
                active: r,
                continuous: n,
                complete: i,
                elementId: o,
                actionItem: a,
                actionTypeId: s,
                renderType: c,
                current: p,
                groupIndex: y,
                eventId: g,
                eventTarget: I,
                eventStateKey: T,
                actionListId: N,
                isCarrier: R,
                styleProp: X,
                verbose: q,
                pluginInstance: P
            } = e, {
                ixData: A,
                ixSession: W
            } = t.getState(), {
                events: V
            } = A, G = V[g] || {}, {
                mediaQueries: K = A.mediaQueryKeys
            } = G;
            if (Di(K, W.mediaQueryKey) && (n || r || i)) {
                if (p || c === hW && i) {
                    t.dispatch((0, Ae.elementStateChanged)(o, s, p, a));
                    let {
                        ixElements: J
                    } = t.getState(), {
                        ref: Z,
                        refType: oe,
                        refState: H
                    } = J[o] || {}, S = H && H[s];
                    switch (oe) {
                        case Gy:
                            {
                                _W(Z, H, S, g, a, X, Ce, c, P);
                                break
                            }
                    }
                }
                if (i) {
                    if (R) {
                        let J = Es({
                            store: t,
                            eventId: g,
                            eventTarget: I,
                            eventStateKey: T,
                            actionListId: N,
                            groupIndex: y + 1,
                            verbose: q
                        });
                        q && !J && t.dispatch((0, Ae.actionListPlaybackChanged)({
                            actionListId: N,
                            isPlaying: !1
                        }))
                    }
                    ys(e, t)
                }
            }
        }
    });
    var Ky = u(Ot => {
        "use strict";
        var JW = er().default,
            eV = lt().default;
        Object.defineProperty(Ot, "__esModule", {
            value: !0
        });
        Ot.actions = void 0;
        Ot.destroy = jy;
        Ot.init = oV;
        Ot.setEnv = iV;
        Ot.store = void 0;
        Pl();
        var tV = $o(),
            rV = eV(Qg()),
            ms = ls(),
            nV = JW(Ii());
        Ot.actions = nV;
        var Gi = (0, tV.createStore)(rV.default);
        Ot.store = Gi;

        function iV(e) {
            e() && (0, ms.observeRequests)(Gi)
        }

        function oV(e) {
            jy(), (0, ms.startEngine)({
                store: Gi,
                rawData: e,
                allowEvents: !0
            })
        }

        function jy() {
            (0, ms.stopEngine)(Gi)
        }
    });
    var $y = u((uK, Qy) => {
        var zy = ke(),
            Yy = Ky();
        Yy.setEnv(zy.env);
        zy.define("ix2", Qy.exports = function() {
            return Yy
        })
    });
    var Jy = u((cK, Zy) => {
        var Rr = ke();
        Rr.define("links", Zy.exports = function(e, t) {
            var r = {},
                n = e(window),
                i, o = Rr.env(),
                a = window.location,
                s = document.createElement("a"),
                c = "w--current",
                p = /index\.(html|php)$/,
                y = /\/$/,
                g, I;
            r.ready = r.design = r.preview = T;

            function T() {
                i = o && Rr.env("design"), I = Rr.env("slug") || a.pathname || "", Rr.scroll.off(R), g = [];
                for (var q = document.links, P = 0; P < q.length; ++P) N(q[P]);
                g.length && (Rr.scroll.on(R), R())
            }

            function N(q) {
                var P = i && q.getAttribute("href-disabled") || q.getAttribute("href");
                if (s.href = P, !(P.indexOf(":") >= 0)) {
                    var A = e(q);
                    if (s.hash.length > 1 && s.host + s.pathname === a.host + a.pathname) {
                        if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
                        var W = e(s.hash);
                        W.length && g.push({
                            link: A,
                            sec: W,
                            active: !1
                        });
                        return
                    }
                    if (!(P === "#" || P === "")) {
                        var V = s.href === a.href || P === I || p.test(P) && y.test(I);
                        X(A, c, V)
                    }
                }
            }

            function R() {
                var q = n.scrollTop(),
                    P = n.height();
                t.each(g, function(A) {
                    var W = A.link,
                        V = A.sec,
                        G = V.offset().top,
                        K = V.outerHeight(),
                        J = P * .5,
                        Z = V.is(":visible") && G + K - J >= q && G + J <= q + P;
                    A.active !== Z && (A.active = Z, X(W, c, Z))
                })
            }

            function X(q, P, A) {
                var W = q.hasClass(P);
                A && W || !A && !W || (A ? q.addClass(P) : q.removeClass(P))
            }
            return r
        })
    });
    var tm = u((lK, em) => {
        var Xi = ke();
        Xi.define("scroll", em.exports = function(e) {
            var t = {
                    WF_CLICK_EMPTY: "click.wf-empty-link",
                    WF_CLICK_SCROLL: "click.wf-scroll"
                },
                r = window.location,
                n = N() ? null : window.history,
                i = e(window),
                o = e(document),
                a = e(document.body),
                s = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(S) {
                    window.setTimeout(S, 15)
                },
                c = Xi.env("editor") ? ".w-editor-body" : "body",
                p = "header, " + c + " > .header, " + c + " > .w-nav:not([data-no-scroll])",
                y = 'a[href="#"]',
                g = 'a[href*="#"]:not(.w-tab-link):not(' + y + ")",
                I = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
                T = document.createElement("style");
            T.appendChild(document.createTextNode(I));

            function N() {
                try {
                    return !!window.frameElement
                } catch {
                    return !0
                }
            }
            var R = /^#[a-zA-Z0-9][\w:.-]*$/;

            function X(S) {
                return R.test(S.hash) && S.host + S.pathname === r.host + r.pathname
            }
            let q = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)");

            function P() {
                return document.body.getAttribute("data-wf-scroll-motion") === "none" || q.matches
            }

            function A(S, v) {
                var M;
                switch (v) {
                    case "add":
                        M = S.attr("tabindex"), M ? S.attr("data-wf-tabindex-swap", M) : S.attr("tabindex", "-1");
                        break;
                    case "remove":
                        M = S.attr("data-wf-tabindex-swap"), M ? (S.attr("tabindex", M), S.removeAttr("data-wf-tabindex-swap")) : S.removeAttr("tabindex");
                        break
                }
                S.toggleClass("wf-force-outline-none", v === "add")
            }

            function W(S) {
                var v = S.currentTarget;
                if (!(Xi.env("design") || window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(v.className))) {
                    var M = X(v) ? v.hash : "";
                    if (M !== "") {
                        var x = e(M);
                        x.length && (S && (S.preventDefault(), S.stopPropagation()), V(M, S), window.setTimeout(function() {
                            G(x, function() {
                                A(x, "add"), x.get(0).focus({
                                    preventScroll: !0
                                }), A(x, "remove")
                            })
                        }, S ? 0 : 300))
                    }
                }
            }

            function V(S) {
                if (r.hash !== S && n && n.pushState && !(Xi.env.chrome && r.protocol === "file:")) {
                    var v = n.state && n.state.hash;
                    v !== S && n.pushState({
                        hash: S
                    }, "", S)
                }
            }

            function G(S, v) {
                var M = i.scrollTop(),
                    x = K(S);
                if (M !== x) {
                    var B = J(S, M, x),
                        ee = Date.now(),
                        ne = function() {
                            var U = Date.now() - ee;
                            window.scroll(0, Z(M, x, U, B)), U <= B ? s(ne) : typeof v == "function" && v()
                        };
                    s(ne)
                }
            }

            function K(S) {
                var v = e(p),
                    M = v.css("position") === "fixed" ? v.outerHeight() : 0,
                    x = S.offset().top - M;
                if (S.data("scroll") === "mid") {
                    var B = i.height() - M,
                        ee = S.outerHeight();
                    ee < B && (x -= Math.round((B - ee) / 2))
                }
                return x
            }

            function J(S, v, M) {
                if (P()) return 0;
                var x = 1;
                return a.add(S).each(function(B, ee) {
                    var ne = parseFloat(ee.getAttribute("data-scroll-time"));
                    !isNaN(ne) && ne >= 0 && (x = ne)
                }), (472.143 * Math.log(Math.abs(v - M) + 125) - 2e3) * x
            }

            function Z(S, v, M, x) {
                return M > x ? v : S + (v - S) * oe(M / x)
            }

            function oe(S) {
                return S < .5 ? 4 * S * S * S : (S - 1) * (2 * S - 2) * (2 * S - 2) + 1
            }

            function H() {
                var {
                    WF_CLICK_EMPTY: S,
                    WF_CLICK_SCROLL: v
                } = t;
                o.on(v, g, W), o.on(S, y, function(M) {
                    M.preventDefault()
                }), document.head.insertBefore(T, document.head.firstChild)
            }
            return {
                ready: H
            }
        })
    });
    var nm = u((fK, rm) => {
        var aV = ke();
        aV.define("touch", rm.exports = function(e) {
            var t = {},
                r = window.getSelection;
            e.event.special.tap = {
                bindType: "click",
                delegateType: "click"
            }, t.init = function(o) {
                return o = typeof o == "string" ? e(o).get(0) : o, o ? new n(o) : null
            };

            function n(o) {
                var a = !1,
                    s = !1,
                    c = Math.min(Math.round(window.innerWidth * .04), 40),
                    p, y;
                o.addEventListener("touchstart", g, !1), o.addEventListener("touchmove", I, !1), o.addEventListener("touchend", T, !1), o.addEventListener("touchcancel", N, !1), o.addEventListener("mousedown", g, !1), o.addEventListener("mousemove", I, !1), o.addEventListener("mouseup", T, !1), o.addEventListener("mouseout", N, !1);

                function g(X) {
                    var q = X.touches;
                    q && q.length > 1 || (a = !0, q ? (s = !0, p = q[0].clientX) : p = X.clientX, y = p)
                }

                function I(X) {
                    if (a) {
                        if (s && X.type === "mousemove") {
                            X.preventDefault(), X.stopPropagation();
                            return
                        }
                        var q = X.touches,
                            P = q ? q[0].clientX : X.clientX,
                            A = P - y;
                        y = P, Math.abs(A) > c && r && String(r()) === "" && (i("swipe", X, {
                            direction: A > 0 ? "right" : "left"
                        }), N())
                    }
                }

                function T(X) {
                    if (a && (a = !1, s && X.type === "mouseup")) {
                        X.preventDefault(), X.stopPropagation(), s = !1;
                        return
                    }
                }

                function N() {
                    a = !1
                }

                function R() {
                    o.removeEventListener("touchstart", g, !1), o.removeEventListener("touchmove", I, !1), o.removeEventListener("touchend", T, !1), o.removeEventListener("touchcancel", N, !1), o.removeEventListener("mousedown", g, !1), o.removeEventListener("mousemove", I, !1), o.removeEventListener("mouseup", T, !1), o.removeEventListener("mouseout", N, !1), o = null
                }
                this.destroy = R
            }

            function i(o, a, s) {
                var c = e.Event(o, {
                    originalEvent: a
                });
                e(a.target).trigger(c, s)
            }
            return t.instance = t.init(document), t
        })
    });
    var am = u((dK, om) => {
        var Qt = ke(),
            sV = Jt(),
            at = {
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_RIGHT: 39,
                ARROW_DOWN: 40,
                ESCAPE: 27,
                SPACE: 32,
                ENTER: 13,
                HOME: 36,
                END: 35
            },
            im = !0,
            uV = /^#[a-zA-Z0-9\-_]+$/;
        Qt.define("dropdown", om.exports = function(e, t) {
            var r = t.debounce,
                n = {},
                i = Qt.env(),
                o = !1,
                a, s = Qt.env.touch,
                c = ".w-dropdown",
                p = "w--open",
                y = sV.triggers,
                g = 900,
                I = "focusout" + c,
                T = "keydown" + c,
                N = "mouseenter" + c,
                R = "mousemove" + c,
                X = "mouseleave" + c,
                q = (s ? "click" : "mouseup") + c,
                P = "w-close" + c,
                A = "setting" + c,
                W = e(document),
                V;
            n.ready = G, n.design = function() {
                o && v(), o = !1, G()
            }, n.preview = function() {
                o = !0, G()
            };

            function G() {
                a = i && Qt.env("design"), V = W.find(c), V.each(K)
            }

            function K(l, F) {
                var k = e(F),
                    w = e.data(F, c);
                w || (w = e.data(F, c, {
                    open: !1,
                    el: k,
                    config: {},
                    selectedIdx: -1
                })), w.toggle = w.el.children(".w-dropdown-toggle"), w.list = w.el.children(".w-dropdown-list"), w.links = w.list.find("a:not(.w-dropdown .w-dropdown a)"), w.complete = B(w), w.mouseLeave = ne(w), w.mouseUpOutside = x(w), w.mouseMoveOutside = U(w), J(w);
                var ae = w.toggle.attr("id"),
                    he = w.list.attr("id");
                ae || (ae = "w-dropdown-toggle-" + l), he || (he = "w-dropdown-list-" + l), w.toggle.attr("id", ae), w.toggle.attr("aria-controls", he), w.toggle.attr("aria-haspopup", "menu"), w.toggle.attr("aria-expanded", "false"), w.toggle.find(".w-icon-dropdown-toggle").attr("aria-hidden", "true"), w.toggle.prop("tagName") !== "BUTTON" && (w.toggle.attr("role", "button"), w.toggle.attr("tabindex") || w.toggle.attr("tabindex", "0")), w.list.attr("id", he), w.list.attr("aria-labelledby", ae), w.links.each(function(h, j) {
                    j.hasAttribute("tabindex") || j.setAttribute("tabindex", "0"), uV.test(j.hash) && j.addEventListener("click", S.bind(null, w))
                }), w.el.off(c), w.toggle.off(c), w.nav && w.nav.off(c);
                var se = oe(w, im);
                a && w.el.on(A, Z(w)), a || (i && (w.hovering = !1, S(w)), w.config.hover && w.toggle.on(N, ee(w)), w.el.on(P, se), w.el.on(T, z(w)), w.el.on(I, _(w)), w.toggle.on(q, se), w.toggle.on(T, E(w)), w.nav = w.el.closest(".w-nav"), w.nav.on(P, se))
            }

            function J(l) {
                var F = Number(l.el.css("z-index"));
                l.manageZ = F === g || F === g + 1, l.config = {
                    hover: l.el.attr("data-hover") === "true" && !s,
                    delay: l.el.attr("data-delay")
                }
            }

            function Z(l) {
                return function(F, k) {
                    k = k || {}, J(l), k.open === !0 && H(l, !0), k.open === !1 && S(l, {
                        immediate: !0
                    })
                }
            }

            function oe(l, F) {
                return r(function(k) {
                    if (l.open || k && k.type === "w-close") return S(l, {
                        forceClose: F
                    });
                    H(l)
                })
            }

            function H(l) {
                if (!l.open) {
                    M(l), l.open = !0, l.list.addClass(p), l.toggle.addClass(p), l.toggle.attr("aria-expanded", "true"), y.intro(0, l.el[0]), Qt.redraw.up(), l.manageZ && l.el.css("z-index", g + 1);
                    var F = Qt.env("editor");
                    a || W.on(q, l.mouseUpOutside), l.hovering && !F && l.el.on(X, l.mouseLeave), l.hovering && F && W.on(R, l.mouseMoveOutside), window.clearTimeout(l.delayId)
                }
            }

            function S(l, {
                immediate: F,
                forceClose: k
            } = {}) {
                if (l.open && !(l.config.hover && l.hovering && !k)) {
                    l.toggle.attr("aria-expanded", "false"), l.open = !1;
                    var w = l.config;
                    if (y.outro(0, l.el[0]), W.off(q, l.mouseUpOutside), W.off(R, l.mouseMoveOutside), l.el.off(X, l.mouseLeave), window.clearTimeout(l.delayId), !w.delay || F) return l.complete();
                    l.delayId = window.setTimeout(l.complete, w.delay)
                }
            }

            function v() {
                W.find(c).each(function(l, F) {
                    e(F).triggerHandler(P)
                })
            }

            function M(l) {
                var F = l.el[0];
                V.each(function(k, w) {
                    var ae = e(w);
                    ae.is(F) || ae.has(F).length || ae.triggerHandler(P)
                })
            }

            function x(l) {
                return l.mouseUpOutside && W.off(q, l.mouseUpOutside), r(function(F) {
                    if (l.open) {
                        var k = e(F.target);
                        if (!k.closest(".w-dropdown-toggle").length) {
                            var w = e.inArray(l.el[0], k.parents(c)) === -1,
                                ae = Qt.env("editor");
                            if (w) {
                                if (ae) {
                                    var he = k.parents().length === 1 && k.parents("svg").length === 1,
                                        se = k.parents(".w-editor-bem-EditorHoverControls").length;
                                    if (he || se) return
                                }
                                S(l)
                            }
                        }
                    }
                })
            }

            function B(l) {
                return function() {
                    l.list.removeClass(p), l.toggle.removeClass(p), l.manageZ && l.el.css("z-index", "")
                }
            }

            function ee(l) {
                return function() {
                    l.hovering = !0, H(l)
                }
            }

            function ne(l) {
                return function() {
                    l.hovering = !1, l.links.is(":focus") || S(l)
                }
            }

            function U(l) {
                return r(function(F) {
                    if (l.open) {
                        var k = e(F.target),
                            w = e.inArray(l.el[0], k.parents(c)) === -1;
                        if (w) {
                            var ae = k.parents(".w-editor-bem-EditorHoverControls").length,
                                he = k.parents(".w-editor-bem-RTToolbar").length,
                                se = e(".w-editor-bem-EditorOverlay"),
                                h = se.find(".w-editor-edit-outline").length || se.find(".w-editor-bem-RTToolbar").length;
                            if (ae || he || h) return;
                            l.hovering = !1, S(l)
                        }
                    }
                })
            }

            function z(l) {
                return function(F) {
                    if (!(a || !l.open)) switch (l.selectedIdx = l.links.index(document.activeElement), F.keyCode) {
                        case at.HOME:
                            return l.open ? (l.selectedIdx = 0, d(l), F.preventDefault()) : void 0;
                        case at.END:
                            return l.open ? (l.selectedIdx = l.links.length - 1, d(l), F.preventDefault()) : void 0;
                        case at.ESCAPE:
                            return S(l), l.toggle.focus(), F.stopPropagation();
                        case at.ARROW_RIGHT:
                        case at.ARROW_DOWN:
                            return l.selectedIdx = Math.min(l.links.length - 1, l.selectedIdx + 1), d(l), F.preventDefault();
                        case at.ARROW_LEFT:
                        case at.ARROW_UP:
                            return l.selectedIdx = Math.max(-1, l.selectedIdx - 1), d(l), F.preventDefault()
                    }
                }
            }

            function d(l) {
                l.links[l.selectedIdx] && l.links[l.selectedIdx].focus()
            }

            function E(l) {
                var F = oe(l, im);
                return function(k) {
                    if (!a) {
                        if (!l.open) switch (k.keyCode) {
                            case at.ARROW_UP:
                            case at.ARROW_DOWN:
                                return k.stopPropagation()
                        }
                        switch (k.keyCode) {
                            case at.SPACE:
                            case at.ENTER:
                                return F(), k.stopPropagation(), k.preventDefault()
                        }
                    }
                }
            }

            function _(l) {
                return r(function(F) {
                    var {
                        relatedTarget: k,
                        target: w
                    } = F, ae = l.el[0], he = ae.contains(k) || ae.contains(w);
                    return he || S(l), F.stopPropagation()
                })
            }
            return n
        })
    });
    var um = u((pK, sm) => {
        var Is = ke();
        Is.define("forms", sm.exports = function(e, t) {
            var r = {},
                n = e(document),
                i, o = window.location,
                a = window.XDomainRequest && !window.atob,
                s = ".w-form",
                c, p = /e(-)?mail/i,
                y = /^\S+@\S+$/,
                g = window.alert,
                I = Is.env(),
                T, N, R, X = /list-manage[1-9]?.com/i,
                q = t.debounce(function() {
                    g("Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.")
                }, 100);
            r.ready = r.design = r.preview = function() {
                P(), !I && !T && W()
            };

            function P() {
                c = e("html").attr("data-wf-site"), N = "https://webflow.com/api/v1/form/" + c, a && N.indexOf("https://webflow.com") >= 0 && (N = N.replace("https://webflow.com", "https://formdata.webflow.com")), R = `${N}/signFile`, i = e(s + " form"), i.length && i.each(A)
            }

            function A(U, z) {
                var d = e(z),
                    E = e.data(z, s);
                E || (E = e.data(z, s, {
                    form: d
                })), V(E);
                var _ = d.closest("div.w-form");
                E.done = _.find("> .w-form-done"), E.fail = _.find("> .w-form-fail"), E.fileUploads = _.find(".w-file-upload"), E.fileUploads.each(function(k) {
                    B(k, E)
                });
                var l = E.form.attr("aria-label") || E.form.attr("data-name") || "Form";
                E.done.attr("aria-label") || E.form.attr("aria-label", l), E.done.attr("tabindex", "-1"), E.done.attr("role", "region"), E.done.attr("aria-label") || E.done.attr("aria-label", l + " success"), E.fail.attr("tabindex", "-1"), E.fail.attr("role", "region"), E.fail.attr("aria-label") || E.fail.attr("aria-label", l + " failure");
                var F = E.action = d.attr("action");
                if (E.handler = null, E.redirect = d.attr("data-redirect"), X.test(F)) {
                    E.handler = v;
                    return
                }
                if (!F) {
                    if (c) {
                        E.handler = S;
                        return
                    }
                    q()
                }
            }

            function W() {
                T = !0, n.on("submit", s + " form", function(k) {
                    var w = e.data(this, s);
                    w.handler && (w.evt = k, w.handler(w))
                });
                let U = ".w-checkbox-input",
                    z = ".w-radio-input",
                    d = "w--redirected-checked",
                    E = "w--redirected-focus",
                    _ = "w--redirected-focus-visible",
                    l = ":focus-visible, [data-wf-focus-visible]",
                    F = [
                        ["checkbox", U],
                        ["radio", z]
                    ];
                n.on("change", s + ' form input[type="checkbox"]:not(' + U + ")", k => {
                    e(k.target).siblings(U).toggleClass(d)
                }), n.on("change", s + ' form input[type="radio"]', k => {
                    e(`input[name="${k.target.name}"]:not(${U})`).map((ae, he) => e(he).siblings(z).removeClass(d));
                    let w = e(k.target);
                    w.hasClass("w-radio-input") || w.siblings(z).addClass(d)
                }), F.forEach(([k, w]) => {
                    n.on("focus", s + ` form input[type="${k}"]:not(` + w + ")", ae => {
                        e(ae.target).siblings(w).addClass(E), e(ae.target).filter(l).siblings(w).addClass(_)
                    }), n.on("blur", s + ` form input[type="${k}"]:not(` + w + ")", ae => {
                        e(ae.target).siblings(w).removeClass(`${E} ${_}`)
                    })
                })
            }

            function V(U) {
                var z = U.btn = U.form.find(':input[type="submit"]');
                U.wait = U.btn.attr("data-wait") || null, U.success = !1, z.prop("disabled", !1), U.label && z.val(U.label)
            }

            function G(U) {
                var z = U.btn,
                    d = U.wait;
                z.prop("disabled", !0), d && (U.label = z.val(), z.val(d))
            }

            function K(U, z) {
                var d = null;
                return z = z || {}, U.find(':input:not([type="submit"]):not([type="file"])').each(function(E, _) {
                    var l = e(_),
                        F = l.attr("type"),
                        k = l.attr("data-name") || l.attr("name") || "Field " + (E + 1),
                        w = l.val();
                    if (F === "checkbox") w = l.is(":checked");
                    else if (F === "radio") {
                        if (z[k] === null || typeof z[k] == "string") return;
                        w = U.find('input[name="' + l.attr("name") + '"]:checked').val() || null
                    }
                    typeof w == "string" && (w = e.trim(w)), z[k] = w, d = d || H(l, F, k, w)
                }), d
            }

            function J(U) {
                var z = {};
                return U.find(':input[type="file"]').each(function(d, E) {
                    var _ = e(E),
                        l = _.attr("data-name") || _.attr("name") || "File " + (d + 1),
                        F = _.attr("data-value");
                    typeof F == "string" && (F = e.trim(F)), z[l] = F
                }), z
            }
            let Z = {
                _mkto_trk: "marketo"
            };

            function oe() {
                return document.cookie.split("; ").reduce(function(z, d) {
                    let E = d.split("="),
                        _ = E[0];
                    if (_ in Z) {
                        let l = Z[_],
                            F = E.slice(1).join("=");
                        z[l] = F
                    }
                    return z
                }, {})
            }

            function H(U, z, d, E) {
                var _ = null;
                return z === "password" ? _ = "Passwords cannot be submitted." : U.attr("required") ? E ? p.test(U.attr("type")) && (y.test(E) || (_ = "Please enter a valid email address for: " + d)) : _ = "Please fill out the required field: " + d : d === "g-recaptcha-response" && !E && (_ = "Please confirm you\u2019re not a robot."), _
            }

            function S(U) {
                x(U), M(U)
            }

            function v(U) {
                V(U);
                var z = U.form,
                    d = {};
                if (/^https/.test(o.href) && !/^https/.test(U.action)) {
                    z.attr("method", "post");
                    return
                }
                x(U);
                var E = K(z, d);
                if (E) return g(E);
                G(U);
                var _;
                t.each(d, function(w, ae) {
                    p.test(ae) && (d.EMAIL = w), /^((full[ _-]?)?name)$/i.test(ae) && (_ = w), /^(first[ _-]?name)$/i.test(ae) && (d.FNAME = w), /^(last[ _-]?name)$/i.test(ae) && (d.LNAME = w)
                }), _ && !d.FNAME && (_ = _.split(" "), d.FNAME = _[0], d.LNAME = d.LNAME || _[1]);
                var l = U.action.replace("/post?", "/post-json?") + "&c=?",
                    F = l.indexOf("u=") + 2;
                F = l.substring(F, l.indexOf("&", F));
                var k = l.indexOf("id=") + 3;
                k = l.substring(k, l.indexOf("&", k)), d["b_" + F + "_" + k] = "", e.ajax({
                    url: l,
                    data: d,
                    dataType: "jsonp"
                }).done(function(w) {
                    U.success = w.result === "success" || /already/.test(w.msg), U.success || console.info("MailChimp error: " + w.msg), M(U)
                }).fail(function() {
                    M(U)
                })
            }

            function M(U) {
                var z = U.form,
                    d = U.redirect,
                    E = U.success;
                if (E && d) {
                    Is.location(d);
                    return
                }
                U.done.toggle(E), U.fail.toggle(!E), E ? U.done.focus() : U.fail.focus(), z.toggle(!E), V(U)
            }

            function x(U) {
                U.evt && U.evt.preventDefault(), U.evt = null
            }

            function B(U, z) {
                if (!z.fileUploads || !z.fileUploads[U]) return;
                var d, E = e(z.fileUploads[U]),
                    _ = E.find("> .w-file-upload-default"),
                    l = E.find("> .w-file-upload-uploading"),
                    F = E.find("> .w-file-upload-success"),
                    k = E.find("> .w-file-upload-error"),
                    w = _.find(".w-file-upload-input"),
                    ae = _.find(".w-file-upload-label"),
                    he = ae.children(),
                    se = k.find(".w-file-upload-error-msg"),
                    h = F.find(".w-file-upload-file"),
                    j = F.find(".w-file-remove-link"),
                    te = h.find(".w-file-upload-file-name"),
                    Y = se.attr("data-w-size-error"),
                    ge = se.attr("data-w-type-error"),
                    We = se.attr("data-w-generic-error");
                if (I || ae.on("click keydown", function(O) {
                        O.type === "keydown" && O.which !== 13 && O.which !== 32 || (O.preventDefault(), w.click())
                    }), ae.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"), j.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"), I) w.on("click", function(O) {
                    O.preventDefault()
                }), ae.on("click", function(O) {
                    O.preventDefault()
                }), he.on("click", function(O) {
                    O.preventDefault()
                });
                else {
                    j.on("click keydown", function(O) {
                        if (O.type === "keydown") {
                            if (O.which !== 13 && O.which !== 32) return;
                            O.preventDefault()
                        }
                        w.removeAttr("data-value"), w.val(""), te.html(""), _.toggle(!0), F.toggle(!1), ae.focus()
                    }), w.on("change", function(O) {
                        d = O.target && O.target.files && O.target.files[0], d && (_.toggle(!1), k.toggle(!1), l.toggle(!0), l.focus(), te.text(d.name), C() || G(z), z.fileUploads[U].uploading = !0, ee(d, m))
                    });
                    var Ye = ae.outerHeight();
                    w.height(Ye), w.width(1)
                }

                function f(O) {
                    var L = O.responseJSON && O.responseJSON.msg,
                        re = We;
                    typeof L == "string" && L.indexOf("InvalidFileTypeError") === 0 ? re = ge : typeof L == "string" && L.indexOf("MaxFileSizeError") === 0 && (re = Y), se.text(re), w.removeAttr("data-value"), w.val(""), l.toggle(!1), _.toggle(!0), k.toggle(!0), k.focus(), z.fileUploads[U].uploading = !1, C() || V(z)
                }

                function m(O, L) {
                    if (O) return f(O);
                    var re = L.fileName,
                        ue = L.postData,
                        ye = L.fileId,
                        Q = L.s3Url;
                    w.attr("data-value", ye), ne(Q, ue, d, re, b)
                }

                function b(O) {
                    if (O) return f(O);
                    l.toggle(!1), F.css("display", "inline-block"), F.focus(), z.fileUploads[U].uploading = !1, C() || V(z)
                }

                function C() {
                    var O = z.fileUploads && z.fileUploads.toArray() || [];
                    return O.some(function(L) {
                        return L.uploading
                    })
                }
            }

            function ee(U, z) {
                var d = new URLSearchParams({
                    name: U.name,
                    size: U.size
                });
                e.ajax({
                    type: "GET",
                    url: `${R}?${d}`,
                    crossDomain: !0
                }).done(function(E) {
                    z(null, E)
                }).fail(function(E) {
                    z(E)
                })
            }

            function ne(U, z, d, E, _) {
                var l = new FormData;
                for (var F in z) l.append(F, z[F]);
                l.append("file", d, E), e.ajax({
                    type: "POST",
                    url: U,
                    data: l,
                    processData: !1,
                    contentType: !1
                }).done(function() {
                    _(null)
                }).fail(function(k) {
                    _(k)
                })
            }
            return r
        })
    });
    var lm = u((vK, cm) => {
        var Pt = ke(),
            cV = Jt(),
            De = {
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_RIGHT: 39,
                ARROW_DOWN: 40,
                ESCAPE: 27,
                SPACE: 32,
                ENTER: 13,
                HOME: 36,
                END: 35
            };
        Pt.define("navbar", cm.exports = function(e, t) {
            var r = {},
                n = e.tram,
                i = e(window),
                o = e(document),
                a = t.debounce,
                s, c, p, y, g = Pt.env(),
                I = '<div class="w-nav-overlay" data-wf-ignore />',
                T = ".w-nav",
                N = "w--open",
                R = "w--nav-dropdown-open",
                X = "w--nav-dropdown-toggle-open",
                q = "w--nav-dropdown-list-open",
                P = "w--nav-link-open",
                A = cV.triggers,
                W = e();
            r.ready = r.design = r.preview = V, r.destroy = function() {
                W = e(), G(), c && c.length && c.each(oe)
            };

            function V() {
                p = g && Pt.env("design"), y = Pt.env("editor"), s = e(document.body), c = o.find(T), c.length && (c.each(Z), G(), K())
            }

            function G() {
                Pt.resize.off(J)
            }

            function K() {
                Pt.resize.on(J)
            }

            function J() {
                c.each(_)
            }

            function Z(h, j) {
                var te = e(j),
                    Y = e.data(j, T);
                Y || (Y = e.data(j, T, {
                    open: !1,
                    el: te,
                    config: {},
                    selectedIdx: -1
                })), Y.menu = te.find(".w-nav-menu"), Y.links = Y.menu.find(".w-nav-link"), Y.dropdowns = Y.menu.find(".w-dropdown"), Y.dropdownToggle = Y.menu.find(".w-dropdown-toggle"), Y.dropdownList = Y.menu.find(".w-dropdown-list"), Y.button = te.find(".w-nav-button"), Y.container = te.find(".w-container"), Y.overlayContainerId = "w-nav-overlay-" + h, Y.outside = d(Y);
                var ge = te.find(".w-nav-brand");
                ge && ge.attr("href") === "/" && ge.attr("aria-label") == null && ge.attr("aria-label", "home"), Y.button.attr("style", "-webkit-user-select: text;"), Y.button.attr("aria-label") == null && Y.button.attr("aria-label", "menu"), Y.button.attr("role", "button"), Y.button.attr("tabindex", "0"), Y.button.attr("aria-controls", Y.overlayContainerId), Y.button.attr("aria-haspopup", "menu"), Y.button.attr("aria-expanded", "false"), Y.el.off(T), Y.button.off(T), Y.menu.off(T), v(Y), p ? (H(Y), Y.el.on("setting" + T, M(Y))) : (S(Y), Y.button.on("click" + T, U(Y)), Y.menu.on("click" + T, "a", z(Y)), Y.button.on("keydown" + T, x(Y)), Y.el.on("keydown" + T, B(Y))), _(h, j)
            }

            function oe(h, j) {
                var te = e.data(j, T);
                te && (H(te), e.removeData(j, T))
            }

            function H(h) {
                h.overlay && (se(h, !0), h.overlay.remove(), h.overlay = null)
            }

            function S(h) {
                h.overlay || (h.overlay = e(I).appendTo(h.el), h.overlay.attr("id", h.overlayContainerId), h.parent = h.menu.parent(), se(h, !0))
            }

            function v(h) {
                var j = {},
                    te = h.config || {},
                    Y = j.animation = h.el.attr("data-animation") || "default";
                j.animOver = /^over/.test(Y), j.animDirect = /left$/.test(Y) ? -1 : 1, te.animation !== Y && h.open && t.defer(ne, h), j.easing = h.el.attr("data-easing") || "ease", j.easing2 = h.el.attr("data-easing2") || "ease";
                var ge = h.el.attr("data-duration");
                j.duration = ge != null ? Number(ge) : 400, j.docHeight = h.el.attr("data-doc-height"), h.config = j
            }

            function M(h) {
                return function(j, te) {
                    te = te || {};
                    var Y = i.width();
                    v(h), te.open === !0 && ae(h, !0), te.open === !1 && se(h, !0), h.open && t.defer(function() {
                        Y !== i.width() && ne(h)
                    })
                }
            }

            function x(h) {
                return function(j) {
                    switch (j.keyCode) {
                        case De.SPACE:
                        case De.ENTER:
                            return U(h)(), j.preventDefault(), j.stopPropagation();
                        case De.ESCAPE:
                            return se(h), j.preventDefault(), j.stopPropagation();
                        case De.ARROW_RIGHT:
                        case De.ARROW_DOWN:
                        case De.HOME:
                        case De.END:
                            return h.open ? (j.keyCode === De.END ? h.selectedIdx = h.links.length - 1 : h.selectedIdx = 0, ee(h), j.preventDefault(), j.stopPropagation()) : (j.preventDefault(), j.stopPropagation())
                    }
                }
            }

            function B(h) {
                return function(j) {
                    if (h.open) switch (h.selectedIdx = h.links.index(document.activeElement), j.keyCode) {
                        case De.HOME:
                        case De.END:
                            return j.keyCode === De.END ? h.selectedIdx = h.links.length - 1 : h.selectedIdx = 0, ee(h), j.preventDefault(), j.stopPropagation();
                        case De.ESCAPE:
                            return se(h), h.button.focus(), j.preventDefault(), j.stopPropagation();
                        case De.ARROW_LEFT:
                        case De.ARROW_UP:
                            return h.selectedIdx = Math.max(-1, h.selectedIdx - 1), ee(h), j.preventDefault(), j.stopPropagation();
                        case De.ARROW_RIGHT:
                        case De.ARROW_DOWN:
                            return h.selectedIdx = Math.min(h.links.length - 1, h.selectedIdx + 1), ee(h), j.preventDefault(), j.stopPropagation()
                    }
                }
            }

            function ee(h) {
                if (h.links[h.selectedIdx]) {
                    var j = h.links[h.selectedIdx];
                    j.focus(), z(j)
                }
            }

            function ne(h) {
                h.open && (se(h, !0), ae(h, !0))
            }

            function U(h) {
                return a(function() {
                    h.open ? se(h) : ae(h)
                })
            }

            function z(h) {
                return function(j) {
                    var te = e(this),
                        Y = te.attr("href");
                    if (!Pt.validClick(j.currentTarget)) {
                        j.preventDefault();
                        return
                    }
                    Y && Y.indexOf("#") === 0 && h.open && se(h)
                }
            }

            function d(h) {
                return h.outside && o.off("click" + T, h.outside),
                    function(j) {
                        var te = e(j.target);
                        y && te.closest(".w-editor-bem-EditorOverlay").length || E(h, te)
                    }
            }
            var E = a(function(h, j) {
                if (h.open) {
                    var te = j.closest(".w-nav-menu");
                    h.menu.is(te) || se(h)
                }
            });

            function _(h, j) {
                var te = e.data(j, T),
                    Y = te.collapsed = te.button.css("display") !== "none";
                if (te.open && !Y && !p && se(te, !0), te.container.length) {
                    var ge = F(te);
                    te.links.each(ge), te.dropdowns.each(ge)
                }
                te.open && he(te)
            }
            var l = "max-width";

            function F(h) {
                var j = h.container.css(l);
                return j === "none" && (j = ""),
                    function(te, Y) {
                        Y = e(Y), Y.css(l, ""), Y.css(l) === "none" && Y.css(l, j)
                    }
            }

            function k(h, j) {
                j.setAttribute("data-nav-menu-open", "")
            }

            function w(h, j) {
                j.removeAttribute("data-nav-menu-open")
            }

            function ae(h, j) {
                if (h.open) return;
                h.open = !0, h.menu.each(k), h.links.addClass(P), h.dropdowns.addClass(R), h.dropdownToggle.addClass(X), h.dropdownList.addClass(q), h.button.addClass(N);
                var te = h.config,
                    Y = te.animation;
                (Y === "none" || !n.support.transform || te.duration <= 0) && (j = !0);
                var ge = he(h),
                    We = h.menu.outerHeight(!0),
                    Ye = h.menu.outerWidth(!0),
                    f = h.el.height(),
                    m = h.el[0];
                if (_(0, m), A.intro(0, m), Pt.redraw.up(), p || o.on("click" + T, h.outside), j) {
                    O();
                    return
                }
                var b = "transform " + te.duration + "ms " + te.easing;
                if (h.overlay && (W = h.menu.prev(), h.overlay.show().append(h.menu)), te.animOver) {
                    n(h.menu).add(b).set({
                        x: te.animDirect * Ye,
                        height: ge
                    }).start({
                        x: 0
                    }).then(O), h.overlay && h.overlay.width(Ye);
                    return
                }
                var C = f + We;
                n(h.menu).add(b).set({
                    y: -C
                }).start({
                    y: 0
                }).then(O);

                function O() {
                    h.button.attr("aria-expanded", "true")
                }
            }

            function he(h) {
                var j = h.config,
                    te = j.docHeight ? o.height() : s.height();
                return j.animOver ? h.menu.height(te) : h.el.css("position") !== "fixed" && (te -= h.el.outerHeight(!0)), h.overlay && h.overlay.height(te), te
            }

            function se(h, j) {
                if (!h.open) return;
                h.open = !1, h.button.removeClass(N);
                var te = h.config;
                if ((te.animation === "none" || !n.support.transform || te.duration <= 0) && (j = !0), A.outro(0, h.el[0]), o.off("click" + T, h.outside), j) {
                    n(h.menu).stop(), m();
                    return
                }
                var Y = "transform " + te.duration + "ms " + te.easing2,
                    ge = h.menu.outerHeight(!0),
                    We = h.menu.outerWidth(!0),
                    Ye = h.el.height();
                if (te.animOver) {
                    n(h.menu).add(Y).start({
                        x: We * te.animDirect
                    }).then(m);
                    return
                }
                var f = Ye + ge;
                n(h.menu).add(Y).start({
                    y: -f
                }).then(m);

                function m() {
                    h.menu.height(""), n(h.menu).set({
                        x: 0,
                        y: 0
                    }), h.menu.each(w), h.links.removeClass(P), h.dropdowns.removeClass(R), h.dropdownToggle.removeClass(X), h.dropdownList.removeClass(q), h.overlay && h.overlay.children().length && (W.length ? h.menu.insertAfter(W) : h.menu.prependTo(h.parent), h.overlay.attr("style", "").hide()), h.el.triggerHandler("w-close"), h.button.attr("aria-expanded", "false")
                }
            }
            return r
        })
    });
    var pm = u((hK, dm) => {
        var Dt = ke(),
            lV = Jt(),
            _t = {
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_RIGHT: 39,
                ARROW_DOWN: 40,
                SPACE: 32,
                ENTER: 13,
                HOME: 36,
                END: 35
            },
            fm = 'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
        Dt.define("slider", dm.exports = function(e, t) {
            var r = {},
                n = e.tram,
                i = e(document),
                o, a, s = Dt.env(),
                c = ".w-slider",
                p = '<div class="w-slider-dot" data-wf-ignore />',
                y = '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
                g = "w-slider-force-show",
                I = lV.triggers,
                T, N = !1;
            r.ready = function() {
                a = Dt.env("design"), R()
            }, r.design = function() {
                a = !0, setTimeout(R, 1e3)
            }, r.preview = function() {
                a = !1, R()
            }, r.redraw = function() {
                N = !0, R(), N = !1
            }, r.destroy = X;

            function R() {
                o = i.find(c), o.length && (o.each(A), !T && (X(), q()))
            }

            function X() {
                Dt.resize.off(P), Dt.redraw.off(r.redraw)
            }

            function q() {
                Dt.resize.on(P), Dt.redraw.on(r.redraw)
            }

            function P() {
                o.filter(":visible").each(B)
            }

            function A(d, E) {
                var _ = e(E),
                    l = e.data(E, c);
                l || (l = e.data(E, c, {
                    index: 0,
                    depth: 1,
                    hasFocus: {
                        keyboard: !1,
                        mouse: !1
                    },
                    el: _,
                    config: {}
                })), l.mask = _.children(".w-slider-mask"), l.left = _.children(".w-slider-arrow-left"), l.right = _.children(".w-slider-arrow-right"), l.nav = _.children(".w-slider-nav"), l.slides = l.mask.children(".w-slide"), l.slides.each(I.reset), N && (l.maskWidth = 0), _.attr("role") === void 0 && _.attr("role", "region"), _.attr("aria-label") === void 0 && _.attr("aria-label", "carousel");
                var F = l.mask.attr("id");
                if (F || (F = "w-slider-mask-" + d, l.mask.attr("id", F)), !a && !l.ariaLiveLabel && (l.ariaLiveLabel = e(y).appendTo(l.mask)), l.left.attr("role", "button"), l.left.attr("tabindex", "0"), l.left.attr("aria-controls", F), l.left.attr("aria-label") === void 0 && l.left.attr("aria-label", "previous slide"), l.right.attr("role", "button"), l.right.attr("tabindex", "0"), l.right.attr("aria-controls", F), l.right.attr("aria-label") === void 0 && l.right.attr("aria-label", "next slide"), !n.support.transform) {
                    l.left.hide(), l.right.hide(), l.nav.hide(), T = !0;
                    return
                }
                l.el.off(c), l.left.off(c), l.right.off(c), l.nav.off(c), W(l), a ? (l.el.on("setting" + c, v(l)), S(l), l.hasTimer = !1) : (l.el.on("swipe" + c, v(l)), l.left.on("click" + c, J(l)), l.right.on("click" + c, Z(l)), l.left.on("keydown" + c, K(l, J)), l.right.on("keydown" + c, K(l, Z)), l.nav.on("keydown" + c, "> div", v(l)), l.config.autoplay && !l.hasTimer && (l.hasTimer = !0, l.timerCount = 1, H(l)), l.el.on("mouseenter" + c, G(l, !0, "mouse")), l.el.on("focusin" + c, G(l, !0, "keyboard")), l.el.on("mouseleave" + c, G(l, !1, "mouse")), l.el.on("focusout" + c, G(l, !1, "keyboard"))), l.nav.on("click" + c, "> div", v(l)), s || l.mask.contents().filter(function() {
                    return this.nodeType === 3
                }).remove();
                var k = _.filter(":hidden");
                k.addClass(g);
                var w = _.parents(":hidden");
                w.addClass(g), N || B(d, E), k.removeClass(g), w.removeClass(g)
            }

            function W(d) {
                var E = {};
                E.crossOver = 0, E.animation = d.el.attr("data-animation") || "slide", E.animation === "outin" && (E.animation = "cross", E.crossOver = .5), E.easing = d.el.attr("data-easing") || "ease";
                var _ = d.el.attr("data-duration");
                if (E.duration = _ != null ? parseInt(_, 10) : 500, V(d.el.attr("data-infinite")) && (E.infinite = !0), V(d.el.attr("data-disable-swipe")) && (E.disableSwipe = !0), V(d.el.attr("data-hide-arrows")) ? E.hideArrows = !0 : d.config.hideArrows && (d.left.show(), d.right.show()), V(d.el.attr("data-autoplay"))) {
                    E.autoplay = !0, E.delay = parseInt(d.el.attr("data-delay"), 10) || 2e3, E.timerMax = parseInt(d.el.attr("data-autoplay-limit"), 10);
                    var l = "mousedown" + c + " touchstart" + c;
                    a || d.el.off(l).one(l, function() {
                        S(d)
                    })
                }
                var F = d.right.width();
                E.edge = F ? F + 40 : 100, d.config = E
            }

            function V(d) {
                return d === "1" || d === "true"
            }

            function G(d, E, _) {
                return function(l) {
                    if (E) d.hasFocus[_] = E;
                    else if (e.contains(d.el.get(0), l.relatedTarget) || (d.hasFocus[_] = E, d.hasFocus.mouse && _ === "keyboard" || d.hasFocus.keyboard && _ === "mouse")) return;
                    E ? (d.ariaLiveLabel.attr("aria-live", "polite"), d.hasTimer && S(d)) : (d.ariaLiveLabel.attr("aria-live", "off"), d.hasTimer && H(d))
                }
            }

            function K(d, E) {
                return function(_) {
                    switch (_.keyCode) {
                        case _t.SPACE:
                        case _t.ENTER:
                            return E(d)(), _.preventDefault(), _.stopPropagation()
                    }
                }
            }

            function J(d) {
                return function() {
                    x(d, {
                        index: d.index - 1,
                        vector: -1
                    })
                }
            }

            function Z(d) {
                return function() {
                    x(d, {
                        index: d.index + 1,
                        vector: 1
                    })
                }
            }

            function oe(d, E) {
                var _ = null;
                E === d.slides.length && (R(), ee(d)), t.each(d.anchors, function(l, F) {
                    e(l.els).each(function(k, w) {
                        e(w).index() === E && (_ = F)
                    })
                }), _ != null && x(d, {
                    index: _,
                    immediate: !0
                })
            }

            function H(d) {
                S(d);
                var E = d.config,
                    _ = E.timerMax;
                _ && d.timerCount++ > _ || (d.timerId = window.setTimeout(function() {
                    d.timerId == null || a || (Z(d)(), H(d))
                }, E.delay))
            }

            function S(d) {
                window.clearTimeout(d.timerId), d.timerId = null
            }

            function v(d) {
                return function(E, _) {
                    _ = _ || {};
                    var l = d.config;
                    if (a && E.type === "setting") {
                        if (_.select === "prev") return J(d)();
                        if (_.select === "next") return Z(d)();
                        if (W(d), ee(d), _.select == null) return;
                        oe(d, _.select);
                        return
                    }
                    if (E.type === "swipe") return l.disableSwipe || Dt.env("editor") ? void 0 : _.direction === "left" ? Z(d)() : _.direction === "right" ? J(d)() : void 0;
                    if (d.nav.has(E.target).length) {
                        var F = e(E.target).index();
                        if (E.type === "click" && x(d, {
                                index: F
                            }), E.type === "keydown") switch (E.keyCode) {
                            case _t.ENTER:
                            case _t.SPACE:
                                {
                                    x(d, {
                                        index: F
                                    }),
                                    E.preventDefault();
                                    break
                                }
                            case _t.ARROW_LEFT:
                            case _t.ARROW_UP:
                                {
                                    M(d.nav, Math.max(F - 1, 0)),
                                    E.preventDefault();
                                    break
                                }
                            case _t.ARROW_RIGHT:
                            case _t.ARROW_DOWN:
                                {
                                    M(d.nav, Math.min(F + 1, d.pages)),
                                    E.preventDefault();
                                    break
                                }
                            case _t.HOME:
                                {
                                    M(d.nav, 0),
                                    E.preventDefault();
                                    break
                                }
                            case _t.END:
                                {
                                    M(d.nav, d.pages),
                                    E.preventDefault();
                                    break
                                }
                            default:
                                return
                        }
                    }
                }
            }

            function M(d, E) {
                var _ = d.children().eq(E).focus();
                d.children().not(_)
            }

            function x(d, E) {
                E = E || {};
                var _ = d.config,
                    l = d.anchors;
                d.previous = d.index;
                var F = E.index,
                    k = {};
                F < 0 ? (F = l.length - 1, _.infinite && (k.x = -d.endX, k.from = 0, k.to = l[0].width)) : F >= l.length && (F = 0, _.infinite && (k.x = l[l.length - 1].width, k.from = -l[l.length - 1].x, k.to = k.from - k.x)), d.index = F;
                var w = d.nav.children().eq(F).addClass("w-active").attr("aria-pressed", "true").attr("tabindex", "0");
                d.nav.children().not(w).removeClass("w-active").attr("aria-pressed", "false").attr("tabindex", "-1"), _.hideArrows && (d.index === l.length - 1 ? d.right.hide() : d.right.show(), d.index === 0 ? d.left.hide() : d.left.show());
                var ae = d.offsetX || 0,
                    he = d.offsetX = -l[d.index].x,
                    se = {
                        x: he,
                        opacity: 1,
                        visibility: ""
                    },
                    h = e(l[d.index].els),
                    j = e(l[d.previous] && l[d.previous].els),
                    te = d.slides.not(h),
                    Y = _.animation,
                    ge = _.easing,
                    We = Math.round(_.duration),
                    Ye = E.vector || (d.index > d.previous ? 1 : -1),
                    f = "opacity " + We + "ms " + ge,
                    m = "transform " + We + "ms " + ge;
                if (h.find(fm).removeAttr("tabindex"), h.removeAttr("aria-hidden"), h.find("*").removeAttr("aria-hidden"), te.find(fm).attr("tabindex", "-1"), te.attr("aria-hidden", "true"), te.find("*").attr("aria-hidden", "true"), a || (h.each(I.intro), te.each(I.outro)), E.immediate && !N) {
                    n(h).set(se), O();
                    return
                }
                if (d.index === d.previous) return;
                if (a || d.ariaLiveLabel.text(`Slide ${F+1} of ${l.length}.`), Y === "cross") {
                    var b = Math.round(We - We * _.crossOver),
                        C = Math.round(We - b);
                    f = "opacity " + b + "ms " + ge, n(j).set({
                        visibility: ""
                    }).add(f).start({
                        opacity: 0
                    }), n(h).set({
                        visibility: "",
                        x: he,
                        opacity: 0,
                        zIndex: d.depth++
                    }).add(f).wait(C).then({
                        opacity: 1
                    }).then(O);
                    return
                }
                if (Y === "fade") {
                    n(j).set({
                        visibility: ""
                    }).stop(), n(h).set({
                        visibility: "",
                        x: he,
                        opacity: 0,
                        zIndex: d.depth++
                    }).add(f).start({
                        opacity: 1
                    }).then(O);
                    return
                }
                if (Y === "over") {
                    se = {
                        x: d.endX
                    }, n(j).set({
                        visibility: ""
                    }).stop(), n(h).set({
                        visibility: "",
                        zIndex: d.depth++,
                        x: he + l[d.index].width * Ye
                    }).add(m).start({
                        x: he
                    }).then(O);
                    return
                }
                _.infinite && k.x ? (n(d.slides.not(j)).set({
                    visibility: "",
                    x: k.x
                }).add(m).start({
                    x: he
                }), n(j).set({
                    visibility: "",
                    x: k.from
                }).add(m).start({
                    x: k.to
                }), d.shifted = j) : (_.infinite && d.shifted && (n(d.shifted).set({
                    visibility: "",
                    x: ae
                }), d.shifted = null), n(d.slides).set({
                    visibility: ""
                }).add(m).start({
                    x: he
                }));

                function O() {
                    h = e(l[d.index].els), te = d.slides.not(h), Y !== "slide" && (se.visibility = "hidden"), n(te).set(se)
                }
            }

            function B(d, E) {
                var _ = e.data(E, c);
                if (_) {
                    if (U(_)) return ee(_);
                    a && z(_) && ee(_)
                }
            }

            function ee(d) {
                var E = 1,
                    _ = 0,
                    l = 0,
                    F = 0,
                    k = d.maskWidth,
                    w = k - d.config.edge;
                w < 0 && (w = 0), d.anchors = [{
                    els: [],
                    x: 0,
                    width: 0
                }], d.slides.each(function(he, se) {
                    l - _ > w && (E++, _ += k, d.anchors[E - 1] = {
                        els: [],
                        x: l,
                        width: 0
                    }), F = e(se).outerWidth(!0), l += F, d.anchors[E - 1].width += F, d.anchors[E - 1].els.push(se);
                    var h = he + 1 + " of " + d.slides.length;
                    e(se).attr("aria-label", h), e(se).attr("role", "group")
                }), d.endX = l, a && (d.pages = null), d.nav.length && d.pages !== E && (d.pages = E, ne(d));
                var ae = d.index;
                ae >= E && (ae = E - 1), x(d, {
                    immediate: !0,
                    index: ae
                })
            }

            function ne(d) {
                var E = [],
                    _, l = d.el.attr("data-nav-spacing");
                l && (l = parseFloat(l) + "px");
                for (var F = 0, k = d.pages; F < k; F++) _ = e(p), _.attr("aria-label", "Show slide " + (F + 1) + " of " + k).attr("aria-pressed", "false").attr("role", "button").attr("tabindex", "-1"), d.nav.hasClass("w-num") && _.text(F + 1), l != null && _.css({
                    "margin-left": l,
                    "margin-right": l
                }), E.push(_);
                d.nav.empty().append(E)
            }

            function U(d) {
                var E = d.mask.width();
                return d.maskWidth !== E ? (d.maskWidth = E, !0) : !1
            }

            function z(d) {
                var E = 0;
                return d.slides.each(function(_, l) {
                    E += e(l).outerWidth(!0)
                }), d.slidesWidth !== E ? (d.slidesWidth = E, !0) : !1
            }
            return r
        })
    });
    var hm = u((gK, vm) => {
        var Mt = ke(),
            fV = Jt();
        Mt.define("tabs", vm.exports = function(e) {
            var t = {},
                r = e.tram,
                n = e(document),
                i, o, a = Mt.env,
                s = a.safari,
                c = a(),
                p = "data-w-tab",
                y = "data-w-pane",
                g = ".w-tabs",
                I = "w--current",
                T = "w--tab-active",
                N = fV.triggers,
                R = !1;
            t.ready = t.design = t.preview = X, t.redraw = function() {
                R = !0, X(), R = !1
            }, t.destroy = function() {
                i = n.find(g), i.length && (i.each(A), q())
            };

            function X() {
                o = c && Mt.env("design"), i = n.find(g), i.length && (i.each(W), Mt.env("preview") && !R && i.each(A), q(), P())
            }

            function q() {
                Mt.redraw.off(t.redraw)
            }

            function P() {
                Mt.redraw.on(t.redraw)
            }

            function A(H, S) {
                var v = e.data(S, g);
                v && (v.links && v.links.each(N.reset), v.panes && v.panes.each(N.reset))
            }

            function W(H, S) {
                var v = g.substr(1) + "-" + H,
                    M = e(S),
                    x = e.data(S, g);
                if (x || (x = e.data(S, g, {
                        el: M,
                        config: {}
                    })), x.current = null, x.tabIdentifier = v + "-" + p, x.paneIdentifier = v + "-" + y, x.menu = M.children(".w-tab-menu"), x.links = x.menu.children(".w-tab-link"), x.content = M.children(".w-tab-content"), x.panes = x.content.children(".w-tab-pane"), x.el.off(g), x.links.off(g), x.menu.attr("role", "tablist"), x.links.attr("tabindex", "-1"), V(x), !o) {
                    x.links.on("click" + g, K(x)), x.links.on("keydown" + g, J(x));
                    var B = x.links.filter("." + I),
                        ee = B.attr(p);
                    ee && Z(x, {
                        tab: ee,
                        immediate: !0
                    })
                }
            }

            function V(H) {
                var S = {};
                S.easing = H.el.attr("data-easing") || "ease";
                var v = parseInt(H.el.attr("data-duration-in"), 10);
                v = S.intro = v === v ? v : 0;
                var M = parseInt(H.el.attr("data-duration-out"), 10);
                M = S.outro = M === M ? M : 0, S.immediate = !v && !M, H.config = S
            }

            function G(H) {
                var S = H.current;
                return Array.prototype.findIndex.call(H.links, v => v.getAttribute(p) === S, null)
            }

            function K(H) {
                return function(S) {
                    S.preventDefault();
                    var v = S.currentTarget.getAttribute(p);
                    v && Z(H, {
                        tab: v
                    })
                }
            }

            function J(H) {
                return function(S) {
                    var v = G(H),
                        M = S.key,
                        x = {
                            ArrowLeft: v - 1,
                            ArrowUp: v - 1,
                            ArrowRight: v + 1,
                            ArrowDown: v + 1,
                            End: H.links.length - 1,
                            Home: 0
                        };
                    if (M in x) {
                        S.preventDefault();
                        var B = x[M];
                        B === -1 && (B = H.links.length - 1), B === H.links.length && (B = 0);
                        var ee = H.links[B],
                            ne = ee.getAttribute(p);
                        ne && Z(H, {
                            tab: ne
                        })
                    }
                }
            }

            function Z(H, S) {
                S = S || {};
                var v = H.config,
                    M = v.easing,
                    x = S.tab;
                if (x !== H.current) {
                    H.current = x;
                    var B;
                    H.links.each(function(_, l) {
                        var F = e(l);
                        if (S.immediate || v.immediate) {
                            var k = H.panes[_];
                            l.id || (l.id = H.tabIdentifier + "-" + _), k.id || (k.id = H.paneIdentifier + "-" + _), l.href = "#" + k.id, l.setAttribute("role", "tab"), l.setAttribute("aria-controls", k.id), l.setAttribute("aria-selected", "false"), k.setAttribute("role", "tabpanel"), k.setAttribute("aria-labelledby", l.id)
                        }
                        l.getAttribute(p) === x ? (B = l, F.addClass(I).removeAttr("tabindex").attr({
                            "aria-selected": "true"
                        }).each(N.intro)) : F.hasClass(I) && F.removeClass(I).attr({
                            tabindex: "-1",
                            "aria-selected": "false"
                        }).each(N.outro)
                    });
                    var ee = [],
                        ne = [];
                    H.panes.each(function(_, l) {
                        var F = e(l);
                        l.getAttribute(p) === x ? ee.push(l) : F.hasClass(T) && ne.push(l)
                    });
                    var U = e(ee),
                        z = e(ne);
                    if (S.immediate || v.immediate) {
                        U.addClass(T).each(N.intro), z.removeClass(T), R || Mt.redraw.up();
                        return
                    } else {
                        var d = window.scrollX,
                            E = window.scrollY;
                        B.focus(), window.scrollTo(d, E)
                    }
                    z.length && v.outro ? (z.each(N.outro), r(z).add("opacity " + v.outro + "ms " + M, {
                        fallback: s
                    }).start({
                        opacity: 0
                    }).then(() => oe(v, z, U))) : oe(v, z, U)
                }
            }

            function oe(H, S, v) {
                if (S.removeClass(T).css({
                        opacity: "",
                        transition: "",
                        transform: "",
                        width: "",
                        height: ""
                    }), v.addClass(T).each(N.intro), Mt.redraw.up(), !H.intro) return r(v).set({
                    opacity: 1
                });
                r(v).set({
                    opacity: 0
                }).redraw().add("opacity " + H.intro + "ms " + H.easing, {
                    fallback: s
                }).start({
                    opacity: 1
                })
            }
            return t
        })
    });
    Ts();
    Os();
    Ms();
    Gs();
    Ws();
    Jt();
    $y();
    Jy();
    tm();
    nm();
    am();
    um();
    lm();
    pm();
    hm();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:
timm/lib/timm.js:
(*!
* Timm
*
* Immutability helpers with fast reads and acceptable writes.
*
* @copyright Guillermo Grau Panea 2016
* @license MIT
*)
*/
Webflow.require('ix2').init({
    "events": {
        "e-5": {
            "id": "e-5",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_OVER",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-3",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-6"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86a9|3391f36f-2234-6115-0593-048fff78d3c3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86a9|3391f36f-2234-6115-0593-048fff78d3c3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1577940239131
        },
        "e-6": {
            "id": "e-6",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_OUT",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-4",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-5"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86a9|3391f36f-2234-6115-0593-048fff78d3c3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86a9|3391f36f-2234-6115-0593-048fff78d3c3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1577940239131
        },
        "e-7": {
            "id": "e-7",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_CLICK",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-5",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-8"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86a9|3391f36f-2234-6115-0593-048fff78d3c3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86a9|3391f36f-2234-6115-0593-048fff78d3c3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1577945716413
        },
        "e-8": {
            "id": "e-8",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_SECOND_CLICK",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-5",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-7"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86a9|3391f36f-2234-6115-0593-048fff78d3c3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86a9|3391f36f-2234-6115-0593-048fff78d3c3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1577945716414
        },
        "e-9": {
            "id": "e-9",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_CLICK",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-6",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-10"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86a9|a3bdb31d-663f-aecb-36e5-b179ab45258a",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86a9|a3bdb31d-663f-aecb-36e5-b179ab45258a",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1577946074342
        },
        "e-10": {
            "id": "e-10",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_SECOND_CLICK",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-6",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-9"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86a9|a3bdb31d-663f-aecb-36e5-b179ab45258a",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86a9|a3bdb31d-663f-aecb-36e5-b179ab45258a",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1577946074343
        },
        "e-11": {
            "id": "e-11",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_CLICK",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-7",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-12"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "9a3831a2-5342-ca22-2dd0-5deb57c0ff53",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "9a3831a2-5342-ca22-2dd0-5deb57c0ff53",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1585493689827
        },
        "e-87": {
            "id": "e-87",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-33",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|94488ee5-17d8-cb52-58fa-b73f0c637d1b",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|94488ee5-17d8-cb52-58fa-b73f0c637d1b",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-33-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636454076437
        },
        "e-97": {
            "id": "e-97",
            "name": "",
            "animationType": "preset",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-14",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|fde35517-3a34-b69b-13db-45f7fa53c279",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|fde35517-3a34-b69b-13db-45f7fa53c279",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-14-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636543559801
        },
        "e-99": {
            "id": "e-99",
            "name": "",
            "animationType": "preset",
            "eventTypeId": "SCROLL_INTO_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-19",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-100"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e37",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e37",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": 30,
                "scrollOffsetUnit": "%",
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1636543604878
        },
        "e-103": {
            "id": "e-103",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-38",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|8022f0a9-e67f-58f4-b715-413ea5223eef",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|8022f0a9-e67f-58f4-b715-413ea5223eef",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-38-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636556604154
        },
        "e-104": {
            "id": "e-104",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "PAGE_START",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-39",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-105"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf",
                "appliesTo": "PAGE",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf",
                "appliesTo": "PAGE",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1636557623223
        },
        "e-112": {
            "id": "e-112",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-36",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|764397fc-077e-dc33-178d-b89626664afe",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|764397fc-077e-dc33-178d-b89626664afe",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-36-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636639811455
        },
        "e-113": {
            "id": "e-113",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-40",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|450f9fa4-6508-6db4-e2f5-0674d0d92f30",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|450f9fa4-6508-6db4-e2f5-0674d0d92f30",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-40-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636640810983
        },
        "e-114": {
            "id": "e-114",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-34",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca83829",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca83829",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-34-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636641504110
        },
        "e-115": {
            "id": "e-115",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-41",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca83830",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca83830",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-41-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636641763241
        },
        "e-116": {
            "id": "e-116",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-42",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382e",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382e",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-42-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636641866436
        },
        "e-117": {
            "id": "e-117",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-43",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bd3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bd3",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-43-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636642988181
        },
        "e-118": {
            "id": "e-118",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-44",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bd8",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bd8",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-44-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636643121867
        },
        "e-119": {
            "id": "e-119",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-45",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bda",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bda",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-45-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636643313456
        },
        "e-120": {
            "id": "e-120",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-46",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1eb",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1eb",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-46-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636645766402
        },
        "e-121": {
            "id": "e-121",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-47",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f0",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f0",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-47-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636645874812
        },
        "e-122": {
            "id": "e-122",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-48",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f2",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f2",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-48-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636645932734
        },
        "e-125": {
            "id": "e-125",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-51",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|7d3ca63e-2f26-7495-e2de-4a8128205f64",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|7d3ca63e-2f26-7495-e2de-4a8128205f64",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-51-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636736088199
        },
        "e-126": {
            "id": "e-126",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-52",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|23956967-8283-c956-6091-8d11e1d0aec6",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|23956967-8283-c956-6091-8d11e1d0aec6",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-52-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636738860929
        },
        "e-127": {
            "id": "e-127",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-54",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|7d3ca63e-2f26-7495-e2de-4a8128205f64",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|7d3ca63e-2f26-7495-e2de-4a8128205f64",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-54-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1636739852485
        },
        "e-128": {
            "id": "e-128",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-55",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|7d3ca63e-2f26-7495-e2de-4a8128205f64",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|7d3ca63e-2f26-7495-e2de-4a8128205f64",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-55-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637693548597
        },
        "e-129": {
            "id": "e-129",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-56",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e3d",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e3d",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-56-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637695110766
        },
        "e-130": {
            "id": "e-130",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-56",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e4a",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e4a",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-56-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637695233446
        },
        "e-131": {
            "id": "e-131",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-56",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e56",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e56",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-56-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637695254509
        },
        "e-132": {
            "id": "e-132",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-56",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e62",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|ddabbd99-29b1-9bed-1e3d-5029e1bb3e62",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-56-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637695264207
        },
        "e-133": {
            "id": "e-133",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-56",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|ddef7996-dd02-cde6-ab37-f811dba56f13",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|ddef7996-dd02-cde6-ab37-f811dba56f13",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-56-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637695272299
        },
        "e-135": {
            "id": "e-135",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-52",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|46666047-a1b8-e34b-1172-d6709c2f5b2e",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|46666047-a1b8-e34b-1172-d6709c2f5b2e",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-52-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637696001334
        },
        "e-136": {
            "id": "e-136",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-52",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|e1ef4e95-49d1-35a2-a722-462acc70aacd",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|e1ef4e95-49d1-35a2-a722-462acc70aacd",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-52-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637696034054
        },
        "e-137": {
            "id": "e-137",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-52",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|6c943e2c-d43f-84b6-8ff9-b15198cf07ea",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|6c943e2c-d43f-84b6-8ff9-b15198cf07ea",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-52-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1637696047214
        },
        "e-138": {
            "id": "e-138",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "PAGE_SCROLL_UP",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-57",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-139"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf",
                "appliesTo": "PAGE",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf",
                "appliesTo": "PAGE",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": 0,
                "scrollOffsetUnit": "%",
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1642429689803
        },
        "e-139": {
            "id": "e-139",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "PAGE_SCROLL_DOWN",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-58",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-138"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf",
                "appliesTo": "PAGE",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf",
                "appliesTo": "PAGE",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": 0,
                "scrollOffsetUnit": "%",
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1642429689804
        },
        "e-140": {
            "id": "e-140",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-61",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|64d80558-264b-bf15-5267-17bfeb962ba4",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|64d80558-264b-bf15-5267-17bfeb962ba4",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-61-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1642520029823
        },
        "e-141": {
            "id": "e-141",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-62",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|2a9efd43-51fe-ada2-7eaf-3690473b4731",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|2a9efd43-51fe-ada2-7eaf-3690473b4731",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-62-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1642520771529
        },
        "e-142": {
            "id": "e-142",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLL_INTO_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-65",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-143"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|64d80558-264b-bf15-5267-17bfeb962ba4",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|64d80558-264b-bf15-5267-17bfeb962ba4",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": 0,
                "scrollOffsetUnit": "%",
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1642576507998
        },
        "e-144": {
            "id": "e-144",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLL_INTO_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-66",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-145"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|8022f0a9-e67f-58f4-b715-413ea5223eef",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|8022f0a9-e67f-58f4-b715-413ea5223eef",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": true,
                "playInReverse": false,
                "scrollOffsetValue": 0,
                "scrollOffsetUnit": "%",
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1642576608252
        },
        "e-145": {
            "id": "e-145",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLL_OUT_OF_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-65",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-144"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|8022f0a9-e67f-58f4-b715-413ea5223eef",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|8022f0a9-e67f-58f4-b715-413ea5223eef",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": true,
                "playInReverse": false,
                "scrollOffsetValue": 0,
                "scrollOffsetUnit": "%",
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1642576608253
        },
        "e-146": {
            "id": "e-146",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-67",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|b4f76296-4e01-e958-8e17-3e9103fb03ac",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|b4f76296-4e01-e958-8e17-3e9103fb03ac",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-67-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1643190447908
        },
        "e-147": {
            "id": "e-147",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "PAGE_START",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-68",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-148"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf",
                "appliesTo": "PAGE",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf",
                "appliesTo": "PAGE",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1643619618450
        },
        "e-149": {
            "id": "e-149",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-69",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|46617c52-5505-7070-a894-4a8c1119d305",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|46617c52-5505-7070-a894-4a8c1119d305",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-69-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1643725308850
        },
        "e-150": {
            "id": "e-150",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_CLICK",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-70",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-151"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|28b33da2-f8e4-c164-7e70-2dbe55f14358",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|28b33da2-f8e4-c164-7e70-2dbe55f14358",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1644848218172
        },
        "e-152": {
            "id": "e-152",
            "name": "",
            "animationType": "custom",
            "eventTypeId": "MOUSE_CLICK",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_START_ACTION",
                "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "actionListId": "a-71",
                    "affectedElements": {},
                    "playInReverse": false,
                    "autoStopEventId": "e-153"
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|a5babce7-dc3c-8cb5-a6c7-c1b78c01c42a",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|a5babce7-dc3c-8cb5-a6c7-c1b78c01c42a",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": {
                "loop": false,
                "playInReverse": false,
                "scrollOffsetValue": null,
                "scrollOffsetUnit": null,
                "delay": null,
                "direction": null,
                "effectIn": null
            },
            "createdOn": 1644848568206
        },
        "e-154": {
            "id": "e-154",
            "name": "",
            "animationType": "preset",
            "eventTypeId": "SCROLLING_IN_VIEW",
            "action": {
                "id": "",
                "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
                "config": {
                    "actionListId": "a-52",
                    "affectedElements": {},
                    "duration": 0
                }
            },
            "mediaQueries": ["main", "medium", "small", "tiny"],
            "target": {
                "id": "6474e0adebc6cee8132b86bf|5fa5f260-e7c5-2cc9-3f0b-9fa2653abb19",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            },
            "targets": [{
                "id": "6474e0adebc6cee8132b86bf|5fa5f260-e7c5-2cc9-3f0b-9fa2653abb19",
                "appliesTo": "ELEMENT",
                "styleBlockIds": []
            }],
            "config": [{
                "continuousParameterGroupId": "a-52-p",
                "smoothing": 50,
                "startsEntering": true,
                "addStartOffset": false,
                "addOffsetValue": 50,
                "startsExiting": false,
                "addEndOffset": false,
                "endOffsetValue": 50
            }],
            "createdOn": 1646112949259
        }
    },
    "actionLists": {
        "a-3": {
            "id": "a-3",
            "title": "video button scales up",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-3-n-2",
                    "actionTypeId": "TRANSFORM_SCALE",
                    "config": {
                        "delay": 0,
                        "easing": "easeIn",
                        "duration": 150,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "selector": ".div-block-20",
                            "selectorGuids": ["76c05719-a1ca-d105-875a-e44948a44477"]
                        },
                        "xValue": 1.2,
                        "yValue": 1.2,
                        "locked": true
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1577940245623
        },
        "a-4": {
            "id": "a-4",
            "title": "video button scales down",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-4-n",
                    "actionTypeId": "TRANSFORM_SCALE",
                    "config": {
                        "delay": 0,
                        "easing": "easeIn",
                        "duration": 150,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "selector": ".div-block-20",
                            "selectorGuids": ["76c05719-a1ca-d105-875a-e44948a44477"]
                        },
                        "xValue": 1,
                        "yValue": 1,
                        "locked": true
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1577940321876
        },
        "a-5": {
            "id": "a-5",
            "title": "launch video appear",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-5-n",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {},
                        "value": "block"
                    }
                }, {
                    "id": "a-5-n-6",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {},
                        "value": "block"
                    }
                }, {
                    "id": "a-5-n-3",
                    "actionTypeId": "TRANSFORM_SCALE",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {},
                        "xValue": 0.9,
                        "yValue": 0.9,
                        "locked": true
                    }
                }, {
                    "id": "a-5-n-2",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {},
                        "value": 0,
                        "unit": ""
                    }
                }]
            }, {
                "actionItems": [{
                    "id": "a-5-n-4",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 100,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {},
                        "value": 1,
                        "unit": ""
                    }
                }, {
                    "id": "a-5-n-5",
                    "actionTypeId": "TRANSFORM_SCALE",
                    "config": {
                        "delay": 100,
                        "easing": "easeIn",
                        "duration": 500,
                        "target": {},
                        "xValue": 1,
                        "yValue": 1,
                        "locked": true
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1577945723844
        },
        "a-6": {
            "id": "a-6",
            "title": "video launch disappears",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-6-n-2",
                    "actionTypeId": "TRANSFORM_SCALE",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 200,
                        "target": {
                            "useEventTarget": true,
                            "id": "6474e0adebc6cee8132b86a9|a3bdb31d-663f-aecb-36e5-b179ab45258a"
                        },
                        "xValue": 0.9,
                        "yValue": 0.9,
                        "locked": true
                    }
                }, {
                    "id": "a-6-n-3",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 200,
                        "target": {
                            "useEventTarget": true,
                            "id": "6474e0adebc6cee8132b86a9|a3bdb31d-663f-aecb-36e5-b179ab45258a"
                        },
                        "value": 0.05,
                        "unit": ""
                    }
                }, {
                    "id": "a-6-n",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 200,
                        "easing": "",
                        "duration": 0,
                        "target": {
                            "useEventTarget": true,
                            "id": "6474e0adebc6cee8132b86a9|a3bdb31d-663f-aecb-36e5-b179ab45258a"
                        },
                        "value": "none"
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1577946081634
        },
        "a-7": {
            "id": "a-7",
            "title": "covid-banner-off",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-7-n-2",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {
                            "useEventTarget": "PARENT",
                            "selector": ".covid-banner",
                            "selectorGuids": ["0fe671d0-7d89-bafd-8902-b239d5eae353"]
                        },
                        "value": 0,
                        "unit": ""
                    }
                }]
            }, {
                "actionItems": [{
                    "id": "a-7-n-3",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {
                            "useEventTarget": "PARENT",
                            "selector": ".covid-banner",
                            "selectorGuids": ["0fe671d0-7d89-bafd-8902-b239d5eae353"]
                        },
                        "value": "none"
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1585493697088
        },
        "a-33": {
            "id": "a-33",
            "title": "Algeria parallax",
            "continuousParameterGroups": [{
                "id": "a-33-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-33-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".algeria-2",
                                "selectorGuids": ["4abc223d-8092-2dee-4441-aae384cf5387"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-33-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".algeria-3",
                                "selectorGuids": ["31decd1f-378d-e307-0484-bb2535369029"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-33-n-8",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".algeria-1",
                                "selectorGuids": ["9ca78945-369c-2808-526a-17ed8093e9b1"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-33-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".algeria-2",
                                "selectorGuids": ["4abc223d-8092-2dee-4441-aae384cf5387"]
                            },
                            "yValue": -100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-33-n-6",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".algeria-3",
                                "selectorGuids": ["31decd1f-378d-e307-0484-bb2535369029"]
                            },
                            "yValue": -300,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-33-n-7",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".algeria-1",
                                "selectorGuids": ["9ca78945-369c-2808-526a-17ed8093e9b1"]
                            },
                            "yValue": -250,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636454082319
        },
        "a-14": {
            "id": "a-14",
            "title": "random parallax",
            "continuousParameterGroups": [{
                "id": "a-14-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-14-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".gallery-element._1",
                                "selectorGuids": ["9965b21a-12f9-b516-7ca4-1de0c0dc4420", "9a46b7ac-e66d-d1f2-59c3-6b0b55562426"]
                            },
                            "xValue": -100,
                            "xUnit": "px",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-14-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".gallery-element._2",
                                "selectorGuids": ["9965b21a-12f9-b516-7ca4-1de0c0dc4420", "c8f1bc3b-69dd-4836-1806-3663b6930f83"]
                            },
                            "xValue": 70,
                            "xUnit": "px",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-14-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".gallery-element._1",
                                "selectorGuids": ["9965b21a-12f9-b516-7ca4-1de0c0dc4420", "9a46b7ac-e66d-d1f2-59c3-6b0b55562426"]
                            },
                            "xValue": -60,
                            "xUnit": "px",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-14-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "easeIn",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".gallery-element._1",
                                "selectorGuids": ["9965b21a-12f9-b516-7ca4-1de0c0dc4420", "9a46b7ac-e66d-d1f2-59c3-6b0b55562426"]
                            },
                            "xValue": 100,
                            "xUnit": "px",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-14-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "easeIn",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".gallery-element._2",
                                "selectorGuids": ["9965b21a-12f9-b516-7ca4-1de0c0dc4420", "c8f1bc3b-69dd-4836-1806-3663b6930f83"]
                            },
                            "xValue": -130,
                            "xUnit": "px",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-14-n-6",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "easeIn",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".gallery-element._1",
                                "selectorGuids": ["9965b21a-12f9-b516-7ca4-1de0c0dc4420", "9a46b7ac-e66d-d1f2-59c3-6b0b55562426"]
                            },
                            "xValue": 140,
                            "xUnit": "px",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1626539062080
        },
        "a-19": {
            "id": "a-19",
            "title": "double appear in",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-19-n",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {},
                        "value": 0,
                        "unit": ""
                    }
                }, {
                    "id": "a-19-n-8",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "selector": ".paragraph-big.top-margin.white.pro.small",
                            "selectorGuids": ["b38ab9a7-a761-0a4f-ae77-64968d938189", "8dffe952-631e-8360-ffd5-e6b15c147146", "ced4acf2-0231-b96a-b0fd-86efac47038c", "739a4c72-07fe-e9bc-d9d7-c1762790436e", "e4544355-fd89-d96f-bc7e-1309111657a3"]
                        },
                        "value": 0,
                        "unit": ""
                    }
                }, {
                    "id": "a-19-n-7",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "selector": ".h2-cta.proj-head.white.pro.left",
                            "selectorGuids": ["b632eed0-885c-cd93-3ff5-46ce7a410f20", "2251966e-39a4-e9d8-e56a-43e2dd9b3acf", "594dc8da-1788-1466-b388-57156185fc33", "a2910cdf-9b97-0e59-07c4-72ea570ee982", "4a9614e9-bd3a-a881-525f-a16bea5c7439"]
                        },
                        "value": 0,
                        "unit": ""
                    }
                }, {
                    "id": "a-19-n-2",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {},
                        "value": 0,
                        "unit": ""
                    }
                }]
            }, {
                "actionItems": [{
                    "id": "a-19-n-6",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 200,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {},
                        "yValue": -20,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }, {
                    "id": "a-19-n-10",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 200,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "selector": ".h2-cta.proj-head.white.pro.left",
                            "selectorGuids": ["b632eed0-885c-cd93-3ff5-46ce7a410f20", "2251966e-39a4-e9d8-e56a-43e2dd9b3acf", "594dc8da-1788-1466-b388-57156185fc33", "a2910cdf-9b97-0e59-07c4-72ea570ee982", "4a9614e9-bd3a-a881-525f-a16bea5c7439"]
                        },
                        "value": 1,
                        "unit": ""
                    }
                }, {
                    "id": "a-19-n-9",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 200,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "selector": ".h2-cta.proj-head.white.pro.left",
                            "selectorGuids": ["b632eed0-885c-cd93-3ff5-46ce7a410f20", "2251966e-39a4-e9d8-e56a-43e2dd9b3acf", "594dc8da-1788-1466-b388-57156185fc33", "a2910cdf-9b97-0e59-07c4-72ea570ee982", "4a9614e9-bd3a-a881-525f-a16bea5c7439"]
                        },
                        "yValue": -20,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }, {
                    "id": "a-19-n-4",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 200,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {},
                        "value": 1,
                        "unit": ""
                    }
                }, {
                    "id": "a-19-n-5",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 300,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {},
                        "yValue": -20,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }, {
                    "id": "a-19-n-12",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 300,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "selector": ".paragraph-big.top-margin.white.pro.small",
                            "selectorGuids": ["b38ab9a7-a761-0a4f-ae77-64968d938189", "8dffe952-631e-8360-ffd5-e6b15c147146", "ced4acf2-0231-b96a-b0fd-86efac47038c", "739a4c72-07fe-e9bc-d9d7-c1762790436e", "e4544355-fd89-d96f-bc7e-1309111657a3"]
                        },
                        "value": 1,
                        "unit": ""
                    }
                }, {
                    "id": "a-19-n-11",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 300,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "selector": ".paragraph-big.top-margin.white.pro.small",
                            "selectorGuids": ["b38ab9a7-a761-0a4f-ae77-64968d938189", "8dffe952-631e-8360-ffd5-e6b15c147146", "ced4acf2-0231-b96a-b0fd-86efac47038c", "739a4c72-07fe-e9bc-d9d7-c1762790436e", "e4544355-fd89-d96f-bc7e-1309111657a3"]
                        },
                        "yValue": -20,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }, {
                    "id": "a-19-n-3",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 300,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {},
                        "value": 1,
                        "unit": ""
                    }
                }]
            }],
            "useFirstGroupAsInitialState": true,
            "createdOn": 1627040800671
        },
        "a-38": {
            "id": "a-38",
            "title": "Collabs Hero Pics Parallax",
            "continuousParameterGroups": [{
                "id": "a-38-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 38,
                    "actionItems": [{
                        "id": "a-38-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|a4c7567b-b0af-39a2-46dc-a941d6054b5a"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 39,
                    "actionItems": [{
                        "id": "a-38-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|a876d9fd-b500-b5cf-db60-24790907f7a9"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 40,
                    "actionItems": [{
                        "id": "a-38-n-6",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|fd704f7e-9ce4-9e44-1399-9a5382d4ef6e"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 43,
                    "actionItems": [{
                        "id": "a-38-n-7",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|4f062b83-6155-b2e1-63cf-626cdb61e648"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-38-n-9",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|3f2c5782-bbb2-d179-9114-865ca8454ed3"
                            },
                            "yValue": 100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 44,
                    "actionItems": [{
                        "id": "a-38-n-11",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|185fee05-6c61-2dd2-7b22-e1a7ed9fcbf4"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-38-n-13",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|473f3d91-ce9a-1285-fbdb-1858f374b1ad"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 47,
                    "actionItems": [{
                        "id": "a-38-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|a876d9fd-b500-b5cf-db60-24790907f7a9"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 52,
                    "actionItems": [{
                        "id": "a-38-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|a4c7567b-b0af-39a2-46dc-a941d6054b5a"
                            },
                            "yValue": -500,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 54,
                    "actionItems": [{
                        "id": "a-38-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|fd704f7e-9ce4-9e44-1399-9a5382d4ef6e"
                            },
                            "yValue": -300,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 55,
                    "actionItems": [{
                        "id": "a-38-n-8",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|4f062b83-6155-b2e1-63cf-626cdb61e648"
                            },
                            "yValue": -100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 80,
                    "actionItems": [{
                        "id": "a-38-n-10",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|3f2c5782-bbb2-d179-9114-865ca8454ed3"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-38-n-12",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|185fee05-6c61-2dd2-7b22-e1a7ed9fcbf4"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-38-n-14",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|473f3d91-ce9a-1285-fbdb-1858f374b1ad"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636556613612
        },
        "a-39": {
            "id": "a-39",
            "title": "Collab Hero Text Appear On Load",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-39-n",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|af3ef10f-b9d4-fd1b-59ba-962ca2eafca6"
                        },
                        "value": "flex"
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1636557634607
        },
        "a-36": {
            "id": "a-36",
            "title": "Algeria Title Appears",
            "continuousParameterGroups": [{
                "id": "a-36-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-36-n",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|764397fc-077e-dc33-178d-b89626664afe"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 35,
                    "actionItems": [{
                        "id": "a-36-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "inQuad",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|764397fc-077e-dc33-178d-b89626664afe"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-36-n-2",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|764397fc-077e-dc33-178d-b89626664afe"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1636539921254
        },
        "a-40": {
            "id": "a-40",
            "title": "Algeria vid + text",
            "continuousParameterGroups": [{
                "id": "a-40-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-40-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|450f9fa4-6508-6db4-e2f5-0674d0d92f30"
                            },
                            "yValue": 100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 50,
                    "actionItems": [{
                        "id": "a-40-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|450f9fa4-6508-6db4-e2f5-0674d0d92f30"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-40-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|450f9fa4-6508-6db4-e2f5-0674d0d92f30"
                            },
                            "yValue": -300,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636640834865
        },
        "a-34": {
            "id": "a-34",
            "title": "Nigeria parallax",
            "continuousParameterGroups": [{
                "id": "a-34-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-34-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382b"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-34-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382c"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-34-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382d"
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-34-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382b"
                            },
                            "yValue": -400,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-34-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382c"
                            },
                            "yValue": -100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-34-n-6",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382d"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636454634681
        },
        "a-41": {
            "id": "a-41",
            "title": "Nigeria vid + text",
            "continuousParameterGroups": [{
                "id": "a-41-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-41-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca83830"
                            },
                            "yValue": 100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 50,
                    "actionItems": [{
                        "id": "a-41-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca83830"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-41-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca83830"
                            },
                            "yValue": -300,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636641766547
        },
        "a-42": {
            "id": "a-42",
            "title": "Nigeria Title appears",
            "continuousParameterGroups": [{
                "id": "a-42-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-42-n",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382e"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 35,
                    "actionItems": [{
                        "id": "a-42-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382e"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-42-n-2",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|1d08c81f-2452-8b6a-2972-2aa88ca8382e"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1636641933658
        },
        "a-43": {
            "id": "a-43",
            "title": "Jordan parallax",
            "continuousParameterGroups": [{
                "id": "a-43-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-43-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".jord-1",
                                "selectorGuids": ["ad553f5f-3fb5-e837-e894-cf96060e7a77"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-43-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".jord-2",
                                "selectorGuids": ["f13b3db2-a837-3d0a-45da-239adf3b2984"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-43-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".jord-3",
                                "selectorGuids": ["e01d6170-13bb-6db9-8845-fb63f04b2485"]
                            },
                            "yValue": 200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-43-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".jord-1",
                                "selectorGuids": ["ad553f5f-3fb5-e837-e894-cf96060e7a77"]
                            },
                            "yValue": -150,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-43-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".jord-2",
                                "selectorGuids": ["f13b3db2-a837-3d0a-45da-239adf3b2984"]
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-43-n-6",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".jord-3",
                                "selectorGuids": ["e01d6170-13bb-6db9-8845-fb63f04b2485"]
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636643030254
        },
        "a-44": {
            "id": "a-44",
            "title": "Jordan Title appears",
            "continuousParameterGroups": [{
                "id": "a-44-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-44-n",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bd8"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 35,
                    "actionItems": [{
                        "id": "a-44-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bd8"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-44-n-2",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bd8"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1636643266373
        },
        "a-45": {
            "id": "a-45",
            "title": "Jordan vid + text",
            "continuousParameterGroups": [{
                "id": "a-45-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-45-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bda"
                            },
                            "yValue": 100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 50,
                    "actionItems": [{
                        "id": "a-45-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bda"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-45-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|7350d9fe-8938-51d6-42ef-003dc5bc9bda"
                            },
                            "yValue": -300,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636643323636
        },
        "a-46": {
            "id": "a-46",
            "title": "Mald Parallax",
            "continuousParameterGroups": [{
                "id": "a-46-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-46-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".mal-1",
                                "selectorGuids": ["560bd56a-5b44-6a13-2ab1-619c5c08f9ec"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-46-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".mald-2",
                                "selectorGuids": ["b850d5e4-a4b5-3521-67ba-ca9bb66f5cf2"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-46-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".mald3",
                                "selectorGuids": ["5467ba7a-20e8-bc8f-629b-9de3449ff85b"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-46-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".mal-1",
                                "selectorGuids": ["560bd56a-5b44-6a13-2ab1-619c5c08f9ec"]
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-46-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".mald3",
                                "selectorGuids": ["5467ba7a-20e8-bc8f-629b-9de3449ff85b"]
                            },
                            "yValue": -400,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-46-n-6",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".mald-2",
                                "selectorGuids": ["b850d5e4-a4b5-3521-67ba-ca9bb66f5cf2"]
                            },
                            "yValue": -100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636645774158
        },
        "a-47": {
            "id": "a-47",
            "title": "Mald title appear",
            "continuousParameterGroups": [{
                "id": "a-47-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-47-n",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f0"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 35,
                    "actionItems": [{
                        "id": "a-47-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f0"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-47-n-2",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f0"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1636645883754
        },
        "a-48": {
            "id": "a-48",
            "title": "Mald vid + text",
            "continuousParameterGroups": [{
                "id": "a-48-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-48-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f2"
                            },
                            "yValue": 100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 50,
                    "actionItems": [{
                        "id": "a-48-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f2"
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-48-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|29029145-5207-3efe-a098-722287bfe1f2"
                            },
                            "yValue": -300,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1636645942313
        },
        "a-51": {
            "id": "a-51",
            "title": "Progress bar",
            "continuousParameterGroups": [{
                "id": "a-51-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-51-n-6",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|ab89f5a5-3689-e27f-d904-96033590405f"
                            },
                            "xValue": -50,
                            "xUnit": "%",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-51-n-8",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|ab89f5a5-3689-e27f-d904-96033590405f"
                            },
                            "xValue": 0,
                            "yValue": 0,
                            "locked": true
                        }
                    }]
                }, {
                    "keyframe": 20,
                    "actionItems": [{
                        "id": "a-51-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9edf249b-2e99-c406-f709-268e53c96af4"
                            },
                            "xValue": -50,
                            "xUnit": "%",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-51-n-3",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9edf249b-2e99-c406-f709-268e53c96af4"
                            },
                            "xValue": 0,
                            "yValue": 0,
                            "locked": true
                        }
                    }, {
                        "id": "a-51-n-7",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|ab89f5a5-3689-e27f-d904-96033590405f"
                            },
                            "xValue": 0,
                            "xUnit": "%",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-51-n-9",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|ab89f5a5-3689-e27f-d904-96033590405f"
                            },
                            "xValue": 1,
                            "yValue": 1,
                            "locked": true
                        }
                    }]
                }, {
                    "keyframe": 40,
                    "actionItems": [{
                        "id": "a-51-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9edf249b-2e99-c406-f709-268e53c96af4"
                            },
                            "xValue": 0,
                            "xUnit": "%",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-51-n-5",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9edf249b-2e99-c406-f709-268e53c96af4"
                            },
                            "xValue": 1,
                            "yValue": 1,
                            "locked": true
                        }
                    }, {
                        "id": "a-51-n-10",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|daba82c7-0b04-8421-177e-74be58470c36"
                            },
                            "xValue": -50,
                            "xUnit": "%",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-51-n-11",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|daba82c7-0b04-8421-177e-74be58470c36"
                            },
                            "xValue": 0,
                            "yValue": 0,
                            "locked": true
                        }
                    }]
                }, {
                    "keyframe": 60,
                    "actionItems": [{
                        "id": "a-51-n-12",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|daba82c7-0b04-8421-177e-74be58470c36"
                            },
                            "xValue": 0,
                            "xUnit": "%",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-51-n-13",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|daba82c7-0b04-8421-177e-74be58470c36"
                            },
                            "xValue": 1,
                            "yValue": 1,
                            "locked": true
                        }
                    }, {
                        "id": "a-51-n-14",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|f07d02e2-e728-81c9-4698-4611b7195187"
                            },
                            "xValue": -50,
                            "xUnit": "%",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-51-n-15",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|f07d02e2-e728-81c9-4698-4611b7195187"
                            },
                            "xValue": 0,
                            "yValue": 0,
                            "locked": true
                        }
                    }]
                }, {
                    "keyframe": 80,
                    "actionItems": [{
                        "id": "a-51-n-16",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|f07d02e2-e728-81c9-4698-4611b7195187"
                            },
                            "xValue": 0,
                            "xUnit": "%",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-51-n-17",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|f07d02e2-e728-81c9-4698-4611b7195187"
                            },
                            "xValue": 1,
                            "yValue": 1,
                            "locked": true
                        }
                    }]
                }]
            }],
            "createdOn": 1636735884571
        },
        "a-52": {
            "id": "a-52",
            "title": "Services Parallax",
            "continuousParameterGroups": [{
                "id": "a-52-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 20,
                    "actionItems": [{
                        "id": "a-52-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".roadmap-step-image",
                                "selectorGuids": ["6abfbab1-6342-66fc-09b3-9ccedc1718b7"]
                            },
                            "yValue": 400,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-52-n-6",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".roadmap-step-image",
                                "selectorGuids": ["6abfbab1-6342-66fc-09b3-9ccedc1718b7"]
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 30,
                    "actionItems": [{
                        "id": "a-52-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collab-roadmap-step-text-div",
                                "selectorGuids": ["18b672a5-9051-abbc-c667-c36c72ae08ea"]
                            },
                            "yValue": 600,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-52-n-8",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collab-roadmap-step-text-div",
                                "selectorGuids": ["18b672a5-9051-abbc-c667-c36c72ae08ea"]
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 40,
                    "actionItems": [{
                        "id": "a-52-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "inQuad",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".roadmap-step-image",
                                "selectorGuids": ["6abfbab1-6342-66fc-09b3-9ccedc1718b7"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-52-n-7",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "inQuad",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".roadmap-step-image",
                                "selectorGuids": ["6abfbab1-6342-66fc-09b3-9ccedc1718b7"]
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 50,
                    "actionItems": [{
                        "id": "a-52-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "inQuad",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collab-roadmap-step-text-div",
                                "selectorGuids": ["18b672a5-9051-abbc-c667-c36c72ae08ea"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-52-n-9",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "inQuad",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collab-roadmap-step-text-div",
                                "selectorGuids": ["18b672a5-9051-abbc-c667-c36c72ae08ea"]
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1636738866772
        },
        "a-54": {
            "id": "a-54",
            "title": "Progress bar appears",
            "continuousParameterGroups": [{
                "id": "a-54-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-54-n",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9797721c-3b6c-a310-b9ff-ae83333da70b"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|921420c6-17c6-c95f-922e-eae421bcf129"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-4",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9edf249b-2e99-c406-f709-268e53c96af1"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-5",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9edf249b-2e99-c406-f709-268e53c96af3"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-6",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|daba82c7-0b04-8421-177e-74be58470c33"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-7",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|daba82c7-0b04-8421-177e-74be58470c35"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-8",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|f07d02e2-e728-81c9-4698-4611b7195184"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-9",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|f07d02e2-e728-81c9-4698-4611b7195186"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-10",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|cd3ac5d9-f63e-c2d6-e2e5-1743981cd5b2"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 3,
                    "actionItems": [{
                        "id": "a-54-n-11",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9797721c-3b6c-a310-b9ff-ae83333da70b"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 5,
                    "actionItems": [{
                        "id": "a-54-n-12",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|921420c6-17c6-c95f-922e-eae421bcf129"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 6,
                    "actionItems": [{
                        "id": "a-54-n-13",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9edf249b-2e99-c406-f709-268e53c96af1"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 7,
                    "actionItems": [{
                        "id": "a-54-n-16",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|daba82c7-0b04-8421-177e-74be58470c35"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 8,
                    "actionItems": [{
                        "id": "a-54-n-17",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|f07d02e2-e728-81c9-4698-4611b7195184"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-15",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|daba82c7-0b04-8421-177e-74be58470c33"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 9,
                    "actionItems": [{
                        "id": "a-54-n-19",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|f07d02e2-e728-81c9-4698-4611b7195186"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }, {
                        "id": "a-54-n-14",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|9edf249b-2e99-c406-f709-268e53c96af3"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 10,
                    "actionItems": [{
                        "id": "a-54-n-20",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "id": "6474e0adebc6cee8132b86bf|cd3ac5d9-f63e-c2d6-e2e5-1743981cd5b2"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1636739874685
        },
        "a-55": {
            "id": "a-55",
            "title": "Progress bar disappear",
            "continuousParameterGroups": [{
                "id": "a-55-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-55-n",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "SIBLINGS",
                                "selector": ".timeline-project",
                                "selectorGuids": ["a3ee64de-c087-ab76-b583-4f95ebbf3e42"]
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 1,
                    "actionItems": [{
                        "id": "a-55-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "SIBLINGS",
                                "selector": ".timeline-project",
                                "selectorGuids": ["a3ee64de-c087-ab76-b583-4f95ebbf3e42"]
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 83,
                    "actionItems": [{
                        "id": "a-55-n-4",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "SIBLINGS",
                                "selector": ".timeline-project",
                                "selectorGuids": ["a3ee64de-c087-ab76-b583-4f95ebbf3e42"]
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 86,
                    "actionItems": [{
                        "id": "a-55-n-5",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "SIBLINGS",
                                "selector": ".timeline-project",
                                "selectorGuids": ["a3ee64de-c087-ab76-b583-4f95ebbf3e42"]
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1637693571415
        },
        "a-56": {
            "id": "a-56",
            "title": "Services appear",
            "continuousParameterGroups": [{
                "id": "a-56-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 35,
                    "actionItems": [{
                        "id": "a-56-n",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "inCubic",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".h2-cta.proj-head.white.pro.left.small.sevr",
                                "selectorGuids": ["b632eed0-885c-cd93-3ff5-46ce7a410f20", "2251966e-39a4-e9d8-e56a-43e2dd9b3acf", "594dc8da-1788-1466-b388-57156185fc33", "a2910cdf-9b97-0e59-07c4-72ea570ee982", "4a9614e9-bd3a-a881-525f-a16bea5c7439", "61911f4d-8dec-2a8d-27e3-1ac2c04caca6", "4b17e74b-e8ec-f662-911a-30dd8022b67e"]
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 40,
                    "actionItems": [{
                        "id": "a-56-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "inCubic",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".h2-cta.proj-head.white.pro.left.small.sevr",
                                "selectorGuids": ["b632eed0-885c-cd93-3ff5-46ce7a410f20", "2251966e-39a4-e9d8-e56a-43e2dd9b3acf", "594dc8da-1788-1466-b388-57156185fc33", "a2910cdf-9b97-0e59-07c4-72ea570ee982", "4a9614e9-bd3a-a881-525f-a16bea5c7439", "61911f4d-8dec-2a8d-27e3-1ac2c04caca6", "4b17e74b-e8ec-f662-911a-30dd8022b67e"]
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 90,
                    "actionItems": [{
                        "id": "a-56-n-4",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".h2-cta.proj-head.white.pro.left.small.sevr",
                                "selectorGuids": ["b632eed0-885c-cd93-3ff5-46ce7a410f20", "2251966e-39a4-e9d8-e56a-43e2dd9b3acf", "594dc8da-1788-1466-b388-57156185fc33", "a2910cdf-9b97-0e59-07c4-72ea570ee982", "4a9614e9-bd3a-a881-525f-a16bea5c7439", "61911f4d-8dec-2a8d-27e3-1ac2c04caca6", "4b17e74b-e8ec-f662-911a-30dd8022b67e"]
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 95,
                    "actionItems": [{
                        "id": "a-56-n-2",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "inCubic",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".h2-cta.proj-head.white.pro.left.small.sevr",
                                "selectorGuids": ["b632eed0-885c-cd93-3ff5-46ce7a410f20", "2251966e-39a4-e9d8-e56a-43e2dd9b3acf", "594dc8da-1788-1466-b388-57156185fc33", "a2910cdf-9b97-0e59-07c4-72ea570ee982", "4a9614e9-bd3a-a881-525f-a16bea5c7439", "61911f4d-8dec-2a8d-27e3-1ac2c04caca6", "4b17e74b-e8ec-f662-911a-30dd8022b67e"]
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1637695117395
        },
        "a-57": {
            "id": "a-57",
            "title": "Collab navbar appears",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-57-n",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 0,
                        "easing": "easeIn",
                        "duration": 300,
                        "target": {
                            "id": "c3da0e1f-f7e2-ff47-f6b1-defb5235f9bc"
                        },
                        "yValue": 0,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1642428794050
        },
        "a-58": {
            "id": "a-58",
            "title": "Collabs nav disappears",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-58-n",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 0,
                        "easing": "easeIn",
                        "duration": 300,
                        "target": {
                            "id": "c3da0e1f-f7e2-ff47-f6b1-defb5235f9bc"
                        },
                        "yValue": -100,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1642428898965
        },
        "a-61": {
            "id": "a-61",
            "title": "Collabs Text Slide In Out",
            "continuousParameterGroups": [{
                "id": "a-61-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 30,
                    "actionItems": [{
                        "id": "a-61-n-4",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-h2",
                                "selectorGuids": ["4c396647-f745-4482-61d6-2d7fb2e7c300"]
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }, {
                        "id": "a-61-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-h2",
                                "selectorGuids": ["4c396647-f745-4482-61d6-2d7fb2e7c300"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 50,
                    "actionItems": [{
                        "id": "a-61-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-h2",
                                "selectorGuids": ["4c396647-f745-4482-61d6-2d7fb2e7c300"]
                            },
                            "yValue": -100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-61-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-h2",
                                "selectorGuids": ["4c396647-f745-4482-61d6-2d7fb2e7c300"]
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 85,
                    "actionItems": [{
                        "id": "a-61-n-6",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-h2",
                                "selectorGuids": ["4c396647-f745-4482-61d6-2d7fb2e7c300"]
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }, {
                        "id": "a-61-n-8",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-h2",
                                "selectorGuids": ["4c396647-f745-4482-61d6-2d7fb2e7c300"]
                            },
                            "yValue": -100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 95,
                    "actionItems": [{
                        "id": "a-61-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-h2",
                                "selectorGuids": ["4c396647-f745-4482-61d6-2d7fb2e7c300"]
                            },
                            "yValue": -100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-61-n-7",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-h2",
                                "selectorGuids": ["4c396647-f745-4482-61d6-2d7fb2e7c300"]
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1642520033511
        },
        "a-62": {
            "id": "a-62",
            "title": "Collab Promo BG video appears",
            "continuousParameterGroups": [{
                "id": "a-62-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 10,
                    "actionItems": [{
                        "id": "a-62-n",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|2a9efd43-51fe-ada2-7eaf-3690473b4731"
                            },
                            "xValue": 1,
                            "yValue": 1,
                            "locked": true
                        }
                    }]
                }, {
                    "keyframe": 20,
                    "actionItems": [{
                        "id": "a-62-n-3",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|2a9efd43-51fe-ada2-7eaf-3690473b4731"
                            },
                            "xValue": 1.12,
                            "yValue": 1.12,
                            "locked": true
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-62-n-2",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|2a9efd43-51fe-ada2-7eaf-3690473b4731"
                            },
                            "locked": true
                        }
                    }]
                }]
            }],
            "createdOn": 1642520777354
        },
        "a-65": {
            "id": "a-65",
            "title": "Collab Hero Text Display None",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-65-n",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "id": "6474e0adebc6cee8132b86bf|af3ef10f-b9d4-fd1b-59ba-962ca2eafca6"
                        },
                        "value": "none"
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1636557634607
        },
        "a-66": {
            "id": "a-66",
            "title": "Collab Hero Text Float",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-66-n",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {
                            "useEventTarget": "CHILDREN",
                            "id": "6474e0adebc6cee8132b86bf|af3ef10f-b9d4-fd1b-59ba-962ca2eafca6"
                        },
                        "value": "flex"
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1636557634607
        },
        "a-67": {
            "id": "a-67",
            "title": "Latest Collabs Text Animation",
            "continuousParameterGroups": [{
                "id": "a-67-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 0,
                    "actionItems": [{
                        "id": "a-67-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|b4f76296-4e01-e958-8e17-3e9103fb03ac"
                            },
                            "xUnit": "PX",
                            "yUnit": "PX",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-67-n-3",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|b4f76296-4e01-e958-8e17-3e9103fb03ac"
                            },
                            "value": 0,
                            "unit": ""
                        }
                    }]
                }, {
                    "keyframe": 30,
                    "actionItems": [{
                        "id": "a-67-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|b4f76296-4e01-e958-8e17-3e9103fb03ac"
                            },
                            "yValue": -100,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-67-n-4",
                        "actionTypeId": "STYLE_OPACITY",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": true,
                                "id": "6474e0adebc6cee8132b86bf|b4f76296-4e01-e958-8e17-3e9103fb03ac"
                            },
                            "value": 1,
                            "unit": ""
                        }
                    }]
                }]
            }],
            "createdOn": 1643190489922
        },
        "a-68": {
            "id": "a-68",
            "title": "collab hero appears mobile",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-68-n",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "easeIn",
                        "duration": 700,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|74f8d2a0-d57b-b10c-5231-dcd94721e91f"
                        },
                        "value": 1,
                        "unit": ""
                    }
                }, {
                    "id": "a-68-n-9",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 0,
                        "easing": "outQuad",
                        "duration": 500,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|74f8d2a0-d57b-b10c-5231-dcd94721e91f"
                        },
                        "yValue": -10,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }, {
                    "id": "a-68-n-2",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 100,
                        "easing": "easeIn",
                        "duration": 700,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|e5f1ae70-bf72-eba5-98e6-427c11d26009"
                        },
                        "value": 1,
                        "unit": ""
                    }
                }, {
                    "id": "a-68-n-8",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 100,
                        "easing": "outQuad",
                        "duration": 500,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|e5f1ae70-bf72-eba5-98e6-427c11d26009"
                        },
                        "yValue": -10,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }, {
                    "id": "a-68-n-3",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 200,
                        "easing": "easeIn",
                        "duration": 200,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|636b176b-ec56-37bf-ca69-9c5b97ea67aa"
                        },
                        "value": 1,
                        "unit": ""
                    }
                }, {
                    "id": "a-68-n-6",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 200,
                        "easing": "inOutQuad",
                        "duration": 400,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|636b176b-ec56-37bf-ca69-9c5b97ea67aa"
                        },
                        "yValue": -10,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }, {
                    "id": "a-68-n-10",
                    "actionTypeId": "TRANSFORM_MOVE",
                    "config": {
                        "delay": 300,
                        "easing": "outQuad",
                        "duration": 500,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|2ef15282-c732-22be-dd43-90605442e82e"
                        },
                        "yValue": -10,
                        "xUnit": "PX",
                        "yUnit": "px",
                        "zUnit": "PX"
                    }
                }, {
                    "id": "a-68-n-5",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 300,
                        "easing": "easeIn",
                        "duration": 700,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|2ef15282-c732-22be-dd43-90605442e82e"
                        },
                        "value": 1,
                        "unit": ""
                    }
                }]
            }, {
                "actionItems": [{
                    "id": "a-68-n-4",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 200,
                        "easing": "inQuad",
                        "duration": 500,
                        "target": {
                            "id": "6474e0adebc6cee8132b86bf|ece655a0-d755-5c6c-fe25-08e68f6196e1"
                        },
                        "value": 1,
                        "unit": ""
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1643619626731
        },
        "a-69": {
            "id": "a-69",
            "title": "Collab mobile hero pics",
            "continuousParameterGroups": [{
                "id": "a-69-p",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [{
                    "keyframe": 45,
                    "actionItems": [{
                        "id": "a-69-n",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-top-left",
                                "selectorGuids": ["ad041d98-4b15-1269-7a0d-a316ba4bc85a"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 47,
                    "actionItems": [{
                        "id": "a-69-n-3",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-top-right",
                                "selectorGuids": ["05f1d870-b8a5-5293-4e51-87f53f457284"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 55,
                    "actionItems": [{
                        "id": "a-69-n-5",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".h1-collabs",
                                "selectorGuids": ["8314dc8a-53ba-1167-b987-4cf88fdb97fd"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 58,
                    "actionItems": [{
                        "id": "a-69-n-7",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".div-block-144",
                                "selectorGuids": ["4a45d23e-a722-b96c-4888-16bc1fa56ee3"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }, {
                    "keyframe": 65,
                    "actionItems": [{
                        "id": "a-69-n-9",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-bottom",
                                "selectorGuids": ["255df334-7b93-6c3a-0411-97d9f7db12c3"]
                            },
                            "yValue": 0,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "px"
                        }
                    }]
                }, {
                    "keyframe": 100,
                    "actionItems": [{
                        "id": "a-69-n-2",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "easeIn",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-top-left",
                                "selectorGuids": ["ad041d98-4b15-1269-7a0d-a316ba4bc85a"]
                            },
                            "yValue": -80,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-69-n-4",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "easeIn",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-top-right",
                                "selectorGuids": ["05f1d870-b8a5-5293-4e51-87f53f457284"]
                            },
                            "yValue": -200,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-69-n-6",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "easeIn",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".h1-collabs",
                                "selectorGuids": ["8314dc8a-53ba-1167-b987-4cf88fdb97fd"]
                            },
                            "yValue": -150,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-69-n-8",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "easeIn",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".div-block-144",
                                "selectorGuids": ["4a45d23e-a722-b96c-4888-16bc1fa56ee3"]
                            },
                            "yValue": -150,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }, {
                        "id": "a-69-n-10",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config": {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target": {
                                "useEventTarget": "CHILDREN",
                                "selector": ".collabs-bottom",
                                "selectorGuids": ["255df334-7b93-6c3a-0411-97d9f7db12c3"]
                            },
                            "yValue": -40,
                            "xUnit": "PX",
                            "yUnit": "px",
                            "zUnit": "PX"
                        }
                    }]
                }]
            }],
            "createdOn": 1643725312388
        },
        "a-70": {
            "id": "a-70",
            "title": "Video playback appears",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-70-n",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {
                            "selector": ".collab-video-playback-wrap",
                            "selectorGuids": ["f6274273-288f-f79d-4eee-e12c06c8cf3b"]
                        },
                        "value": "flex"
                    }
                }]
            }, {
                "actionItems": [{
                    "id": "a-70-n-2",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "easeIn",
                        "duration": 500,
                        "target": {
                            "selector": ".collab-video-playback-wrap",
                            "selectorGuids": ["f6274273-288f-f79d-4eee-e12c06c8cf3b"]
                        },
                        "value": 1,
                        "unit": ""
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1644848222703
        },
        "a-71": {
            "id": "a-71",
            "title": "Video playback disappears",
            "actionItemGroups": [{
                "actionItems": [{
                    "id": "a-71-n",
                    "actionTypeId": "STYLE_OPACITY",
                    "config": {
                        "delay": 0,
                        "easing": "easeOut",
                        "duration": 100,
                        "target": {
                            "useEventTarget": "PARENT",
                            "selector": ".collab-video-playback-wrap",
                            "selectorGuids": ["f6274273-288f-f79d-4eee-e12c06c8cf3b"]
                        },
                        "value": 0,
                        "unit": ""
                    }
                }]
            }, {
                "actionItems": [{
                    "id": "a-71-n-2",
                    "actionTypeId": "GENERAL_DISPLAY",
                    "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 0,
                        "target": {
                            "useEventTarget": "PARENT",
                            "selector": ".collab-video-playback-wrap",
                            "selectorGuids": ["f6274273-288f-f79d-4eee-e12c06c8cf3b"]
                        },
                        "value": "none"
                    }
                }]
            }],
            "useFirstGroupAsInitialState": false,
            "createdOn": 1644848575848
        }
    },
    "site": {
        "mediaQueries": [{
            "key": "main",
            "min": 992,
            "max": 10000
        }, {
            "key": "medium",
            "min": 768,
            "max": 991
        }, {
            "key": "small",
            "min": 480,
            "max": 767
        }, {
            "key": "tiny",
            "min": 0,
            "max": 479
        }]
    }
});