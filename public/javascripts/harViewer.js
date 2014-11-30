require.def("core/lib", ["core/trace"], function(a) {
    var b = {},
        c = navigator.userAgent.toLowerCase();
        b.isFirefox = /firefox/.test(c),
        b.isOpera = /opera/.test(c),
        b.isWebkit = /webkit/.test(c),
        b.isSafari = /webkit/.test(c),
            b.isIE = /msie/.test(c) && !/opera/.test(c),
            b.isIE6 = /msie 6/i.test(navigator.appVersion),
            b.browserVersion = (c.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1], b.isIElt8 = b.isIE && b.browserVersion - 0 < 8, b.extend = function d(a, c) {
        var d = {};
        b.append(d, a), b.append(d, c);
        return d
    }, b.append = function(a, b) {
        for (var c in b) a[c] = b[c];
        return a
    }, b.bind = function() {
        var a = b.cloneArray(arguments),
            c = a.shift(),
            d = a.shift();
        return function() {
            return c.apply(d, b.arrayInsert(b.cloneArray(a), 0, arguments))
        }
    }, b.bindFixed = function() {
        var a = b.cloneArray(arguments),
            c = a.shift(),
            d = a.shift();
        return function() {
            return c.apply(d, a)
        }
    }, b.dispatch = function(b, c, d) {
        for (var e = 0; b && e < b.length; e++) {
            var f = b[e];
            if (f[c]) try {
                f[c].apply(f, d)
            } catch (g) {
                a.exception(g)
            }
        }
    }, b.dispatch2 = function(b, c, d) {
        for (var e = 0; e < b.length; e++) {
            var f = b[e];
            if (f[c]) try {
                var g = f[c].apply(f, d);
                if (g) return g
            } catch (h) {
                a.exception(h)
            }
        }
    };
    var e = Object.prototype.toString,
        f = /^\s*function(\s+[\w_$][\w\d_$]*)?\s*\(/;
    b.isArray = function(a) {
        return jQuery.isArray(a)
    }, b.isFunction = function(a) {
        if (!a) return !1;
        return e.call(a) === "[object Function]" || b.isIE && typeof a != "string" && f.test("" + a)
    }, b.isAncestor = function(a, b) {
        for (var c = a; c; c = c.parentNode) if (c == b) return !0;
        return !1
    }, b.fixEvent = function(a) {
        return jQuery.event.fix(a || window.event)
    }, b.fireEvent = function(a, b) {
        if (document.createEvent) {
            var c = document.createEvent("Events");
            c.initEvent(b, !0, !1);
            return !a.dispatchEvent(c)
        }
    }, b.cancelEvent = function(a) {
        var c = b.fixEvent(a);
        c.stopPropagation(), c.preventDefault()
    }, b.addEventListener = function(a, b, c, d) {
        d = d || !1, a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent("on" + b, c)
    }, b.removeEventListener = function(a, b, c, d) {
        d = d || !1, a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent("on" + b, c)
    }, b.isLeftClick = function(a) {
        return a.button == 0 && b.noKeyModifiers(a)
    }, b.noKeyModifiers = function(a) {
        return !a.ctrlKey && !a.shiftKey && !a.altKey && !a.metaKey
    }, b.isControlClick = function(a) {
        return a.button == 0 && b.isControl(a)
    }, b.isShiftClick = function(a) {
        return a.button == 0 && b.isShift(a)
    }, b.isControl = function(a) {
        return (a.metaKey || a.ctrlKey) && !a.shiftKey && !a.altKey
    }, b.isAlt = function(a) {
        return a.altKey && !a.ctrlKey && !a.shiftKey && !a.metaKey
    }, b.isAltClick = function(a) {
        return a.button == 0 && b.isAlt(a)
    }, b.isControlShift = function(a) {
        return (a.metaKey || a.ctrlKey) && a.shiftKey && !a.altKey
    }, b.isShift = function(a) {
        return a.shiftKey && !a.metaKey && !a.ctrlKey && !a.altKey
    }, b.inflateRect = function(a, b, c) {
        return {
            top: a.top - c,
            left: a.left - b,
            height: a.height + 2 * c,
            width: a.width + 2 * b
        }
    }, b.pointInRect = function(a, b, c) {
        return c >= a.top && c <= a.top + a.height && b >= a.left && b <= a.left + a.width
    }, b.cloneArray = function(a, b) {
        var c = [];
        if (b) for (var d = 0; d < a.length; ++d) c.push(b(a[d]));
        else for (var d = 0; d < a.length; ++d) c.push(a[d]);
        return c
    }, b.arrayInsert = function(a, b, c) {
        for (var d = 0; d < c.length; ++d) a.splice(d + b, 0, c[d]);
        return a
    }, b.remove = function(a, b) {
        for (var c = 0; c < a.length; ++c) if (a[c] == b) {
            a.splice(c, 1);
            return !0
        }
        return !1
    }, b.formatSize = function(a) {
        var b = 1;
        b = b > 2 ? 2 : b, b = b < -1 ? -1 : b;
        if (b == -1) return a + " B";
        var c = Math.pow(10, b);
        return a == -1 || a == undefined ? "?" : a == 0 ? "0" : a < 1024 ? a + " B" : a < 1048576 ? Math.round(a / 1024 * c) / c + " KB" : Math.round(a / 1048576 * c) / c + " MB"
    }, b.formatTime = function(a) {
        return a == -1 ? "-" : a < 1e3 ? a + "ms" : a < 6e4 ? Math.ceil(a / 10) / 100 + "s" : Math.ceil(a / 6e4 * 100) / 100 + "m"
    }, b.formatNumber = function(a) {
        a += "";
        var b = a.split("."),
            c = b[0],
            d = b.length > 1 ? "." + b[1] : "",
            e = /(\d+)(\d{3})/;
        while (e.test(c)) c = c.replace(e, "$1 $2");
        return c + d
    }, b.formatString = function(a) {
        var c = b.cloneArray(arguments),
            a = c.shift();
        for (var d = 0; d < c.length; d++) {
            var e = c[d].toString();
            a = a.replace("%S", e)
        }
        return a
    }, b.parseISO8601 = function(a) {
        var c = b.fromISOString(a);
        return c ? c.getTime() : null
    }, b.fromISOString = function(a) {
        if (!a) return null;
        var b = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/,
            c = new RegExp(b),
            d = a.toString().match(new RegExp(b));
        if (!d) return null;
        var e = new Date;
        e.setUTCDate(1), e.setUTCFullYear(parseInt(d[1], 10)), e.setUTCMonth(parseInt(d[3], 10) - 1), e.setUTCDate(parseInt(d[5], 10)), e.setUTCHours(parseInt(d[7], 10)), e.setUTCMinutes(parseInt(d[9], 10)), e.setUTCSeconds(parseInt(d[11], 10)), d[12] ? e.setUTCMilliseconds(parseFloat(d[12]) * 1e3) : e.setUTCMilliseconds(0);
        if (d[13] != "Z") {
            var f = d[15] * 60 + parseInt(d[17], 10);
            f *= d[14] == "-" ? -1 : 1, e.setTime(e.getTime() - f * 60 * 1e3)
        }
        return e
    }, b.toISOString = function(a) {
        function b(a, b) {
            b || (b = 2);
            var c = new String(a);
            while (c.length < b) c = "0" + c;
            return c
        }
        var c = a.getUTCFullYear() + "-" + b(a.getMonth() + 1) + "-" + b(a.getDate()) + "T" + b(a.getHours()) + ":" + b(a.getMinutes()) + ":" + b(a.getSeconds()) + "." + b(a.getMilliseconds(), 3),
            d = a.getTimezoneOffset(),
            e = Math.floor(d / 60),
            f = Math.floor(d % 60),
            g = (d > 0 ? "-" : "+") + b(Math.abs(e)) + ":" + b(Math.abs(f));
        return c + g
    }, b.getFileName = function(c) {
        try {
            var d = b.splitURLBase(c);
            return d.name
        } catch (e) {
            a.log(unescape(c))
        }
        return c
    }, b.getFileExtension = function(a) {
        if (!a) return null;
        var b = a.indexOf("?");
        b != -1 && (a = a.substr(0, b));
        var c = a.lastIndexOf(".");
        return a.substr(c + 1)
    }, b.splitURLBase = function(a) {
        if (b.isDataURL(a)) return b.splitDataURL(a);
        return b.splitURLTrue(a)
    }, b.isDataURL = function(a) {
        return a && a.substr(0, 5) == "data:"
    }, b.splitDataURL = function(a) {
        var c = a.indexOf(":", 3);
        if (c != 4) return !1;
        var d = a.indexOf(",", c + 1);
        if (d < c) return !1;
        var e = {
                encodedContent: a.substr(d + 1)
            },
            f = a.substr(c + 1, d),
            g = f.split(";");
        for (var h = 0; h < g.length; h++) {
            var i = g[h].split("=");
            i.length == 2 && (e[i[0]] = i[1])
        }
        if (e.hasOwnProperty("fileName")) {
            var j = decodeURIComponent(e.fileName),
                k = b.splitURLTrue(j);
            if (e.hasOwnProperty("baseLineNumber")) {
                e.path = k.path, e.line = e.baseLineNumber;
                var l = decodeURIComponent(e.encodedContent.substr(0, 200)).replace(/\s*$/, "");
                e.name = "eval->" + l
            } else e.name = k.name, e.path = k.path
        } else e.hasOwnProperty("path") || (e.path = "data:"), e.hasOwnProperty("name") || (e.name = decodeURIComponent(e.encodedContent.substr(0, 200)).replace(/\s*$/, ""));
        return e
    }, b.splitURLTrue = function(a) {
        var b = /:\/{1,3}(.*?)\/([^\/]*?)\/?($|\?.*)/,
            c = b.exec(a);
        return c ? c[2] ? {
            path: c[1],
            name: c[2] + c[3]
        } : {
            path: c[1],
            name: c[1]
        } : {
            name: a,
            path: a
        }
    }, b.getURLParameter = function(a) {
        var b = window.location.search.substring(1),
            c = b.split("&");
        for (var d = 0; d < c.length; d++) {
            var e = c[d].split("=");
            if (e[0] == a) return unescape(e[1])
        }
        return null
    }, b.getURLParameters = function(a) {
        var b = [],
            c = window.location.search.substring(1),
            d = c.split("&");
        for (var e = 0; e < d.length; e++) {
            var f = d[e].split("=");
            f[0] == a && b.push(unescape(f[1]))
        }
        return b
    }, b.parseURLParams = function(a) {
        var c = a ? a.indexOf("?") : -1;
        if (c == -1) return [];
        var d = a.substr(c + 1),
            e = d.lastIndexOf("#");
        e != -1 && (d = d.substr(0, e));
        if (!d) return [];
        return b.parseURLEncodedText(d)
    }, b.parseURLEncodedText = function(a, c) {
        function f(a) {
            try {
                return decodeURIComponent(a)
            } catch (b) {
                return decodeURIComponent(unescape(a))
            }
        }
        var d = 25e3,
            e = [];
        if (a == "") return e;
        a = a.replace(/\+/g, " ");
        var g = a.split("&");
        for (var h = 0; h < g.length; ++h) try {
            var i = g[h].indexOf("=");
            if (i != -1) {
                var j = g[h].substring(0, i),
                    k = g[h].substring(i + 1);
                k.length > d && !c && (k = b.$STR("LargeData")), e.push({
                    name: f(j),
                    value: f(k)
                })
            } else {
                var j = g[h];
                e.push({
                    name: f(j),
                    value: ""
                })
            }
        } catch (l) {}
        e.sort(function(a, b) {
            return a.name <= b.name ? -1 : 1
        });
        return e
    }, b.getBody = function(a) {
        if (a.body) return a.body;
        var b = a.getElementsByTagName("body")[0];
        if (b) return b;
        return null
    }, b.getHead = function(a) {
        return a.getElementsByTagName("head")[0]
    }, b.getAncestorByClass = function(a, c) {
        for (var d = a; d; d = d.parentNode) if (b.hasClass(d, c)) return d;
        return null
    }, b.$ = function() {
        return b.getElementByClass.apply(this, arguments)
    }, b.getElementByClass = function(a, c) {
        if (!a) return null;
        var d = b.cloneArray(arguments);
        d.splice(0, 1);
        for (var e = a.firstChild; e; e = e.nextSibling) {
            var f = b.cloneArray(d);
            f.unshift(e);
            if (b.hasClass.apply(this, f)) return e;
            var g = b.getElementByClass.apply(this, f);
            if (g) return g
        }
        return null
    }, b.getElementsByClass = function(a, c) {
        function f(a, c, d) {
            for (var e = a.firstChild; e; e = e.nextSibling) {
                var g = b.cloneArray(c);
                g.unshift(e), b.hasClass.apply(null, g) && d.push(e), f(e, c, d)
            }
        }
        if (a.querySelectorAll) {
            var d = b.cloneArray(arguments);
            d.shift();
            var e = "." + d.join(".");
            return a.querySelectorAll(e)
        }
        var g = [],
            d = b.cloneArray(arguments);
        d.shift(), f(a, d, g);
        return g
    }, b.getChildByClass = function(a) {
        for (var c = 1; c < arguments.length; ++c) {
            var d = arguments[c],
                e = a.firstChild;
            a = null;
            for (; e; e = e.nextSibling) if (b.hasClass(e, d)) {
                a = e;
                break
            }
        }
        return a
    }, b.eraseNode = function(a) {
        while (a.lastChild) a.removeChild(a.lastChild)
    }, b.clearNode = function(a) {
        a.innerHTML = ""
    }, b.hasClass = function(a, b) {
        if (a && a.nodeType == 1) {
            for (var c = 1; c < arguments.length; ++c) {
                var b = arguments[c],
                    d = a.className;
                if (!d || d.indexOf(b + " ") == -1) return !1
            }
            return !0
        }
        return !1
    }, b.setClass = function(a, c) {
        a && !b.hasClass(a, c) && (a.className += " " + c + " ")
    }, b.removeClass = function(a, b) {
        if (a && a.className) {
            var c = a.className.indexOf(b);
            if (c >= 0) {
                var d = b.length;
                a.className = a.className.substr(0, c - 1) + a.className.substr(c + d)
            }
        }
    }, b.toggleClass = function(a, c) {
        if (b.hasClass(a, c)) {
            b.removeClass(a, c);
            return !1
        }
        b.setClass(a, c);
        return !0
    }, b.setClassTimed = function(a, c, d) {
        d || (d = 1300), a.__setClassTimeout ? clearTimeout(a.__setClassTimeout) : b.setClass(a, c), a.__setClassTimeout = setTimeout(function() {
            delete a.__setClassTimeout, b.removeClass(a, c)
        }, d)
    }, b.trim = function(a) {
        return a.replace(/^\s*|\s*$/g, "")
    }, b.wrapText = function(a, c) {
        var d = /[^A-Za-z_$0-9'"-]/,
            e = [],
            f = 100,
            g = b.splitLines(a);
        for (var h = 0; h < g.length; ++h) {
            var i = g[h];
            while (i.length > f) {
                var j = d.exec(i.substr(f, 100)),
                    k = f + (j ? j.index : 0),
                    l = i.substr(0, k);
                i = i.substr(k), c || e.push("<pre>"), e.push(c ? l : b.escapeHTML(l)), c || e.push("</pre>")
            }
            c || e.push("<pre>"), e.push(c ? i : b.escapeHTML(i)), c || e.push("</pre>")
        }
        return e.join(c ? "\n" : "")
    }, b.insertWrappedText = function(a, c, d) {
        c.innerHTML = "<pre>" + b.wrapText(a, d) + "</pre>"
    }, b.splitLines = function(a) {
        var b = /\r\n|\r|\n/;
        if (!a) return [];
        if (a.split) return a.split(b);
        var c = a + "",
            d = c.split(b);
        return d
    }, b.getPrettyDomain = function(a) {
        var b = /[^:]+:\/{1,3}(www\.)?([^\/]+)/.exec(a);
        return b ? b[2] : ""
    }, b.escapeHTML = function(a) {
        function b(a) {
            switch (a) {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case "'":
                    return "&#39;";
                case '"':
                    return "&quot;"
            }
            return "?"
        }
        return String(a).replace(/[<>&"']/g, b)
    }, b.cropString = function(a, c) {
        a = a + "";
        if (c) var d = c / 2;
        else var d = 50;
        return a.length > c ? b.escapeNewLines(a.substr(0, d) + "..." + a.substr(a.length - d)) : b.escapeNewLines(a)
    }, b.escapeNewLines = function(a) {
        return a.replace(/\r/g, "\\r").replace(/\n/g, "\\n")
    }, b.cloneJSON = function(b) {
        if (b == null || typeof b != "object") return b;
        try {
            var c = b.constructor();
            for (var d in b) c[d] = this.cloneJSON(b[d]);
            return c
        } catch (e) {
            a.exception(e)
        }
        return null
    }, b.getOverflowParent = function(a) {
        for (var b = a.parentNode; b; b = b.offsetParent) if (b.scrollHeight > b.offsetHeight) return b
    }, b.getElementBox = function(a) {
        var c = {};
        if (a.getBoundingClientRect) {
            var d = a.getBoundingClientRect(),
                e = b.isIE ? document.body.clientTop || document.documentElement.clientTop : 0,
                f = b.getWindowScrollPosition();
            c.top = Math.round(d.top - e + f.top), c.left = Math.round(d.left - e + f.left), c.height = Math.round(d.bottom - d.top), c.width = Math.round(d.right - d.left)
        } else {
            var g = b.getElementPosition(a);
            c.top = g.top, c.left = g.left, c.height = a.offsetHeight, c.width = a.offsetWidth
        }
        return c
    }, b.getElementPosition = function(a) {
        var b = 0,
            c = 0;
        do b += a.offsetLeft, c += a.offsetTop;
        while (a = a.offsetParent);
        return {
            left: b,
            top: c
        }
    }, b.getWindowSize = function() {
        var a = 0,
            b = 0,
            c;
        typeof window.innerWidth == "number" ? (a = window.innerWidth, b = window.innerHeight) : (c = document.documentElement) && (c.clientHeight || c.clientWidth) ? (a = c.clientWidth, b = c.clientHeight) : (c = document.body) && (c.clientHeight || c.clientWidth) && (a = c.clientWidth, b = c.clientHeight);
        return {
            width: a,
            height: b
        }
    }, b.getWindowScrollSize = function() {
        var a = 0,
            c = 0,
            d;
        !b.isIEQuiksMode && (d = document.documentElement) && (d.scrollHeight || d.scrollWidth) && (a = d.scrollWidth, c = d.scrollHeight), (d = document.body) && (d.scrollHeight || d.scrollWidth) && (d.scrollWidth > a || d.scrollHeight > c) && (a = d.scrollWidth, c = d.scrollHeight);
        return {
            width: a,
            height: c
        }
    }, b.getWindowScrollPosition = function() {
        var a = 0,
            b = 0,
            c;
        typeof window.pageYOffset == "number" ? (a = window.pageYOffset, b = window.pageXOffset) : (c = document.body) && (c.scrollTop || c.scrollLeft) ? (a = c.scrollTop, b = c.scrollLeft) : (c = document.documentElement) && (c.scrollTop || c.scrollLeft) && (a = c.scrollTop, b = c.scrollLeft);
        return {
            top: a,
            left: b
        }
    }, b.scrollIntoCenterView = function(a, c, d, e) {
        if (a) {
            c || (c = b.getOverflowParent(a));
            if (!c) return;
            var f = b.getClientOffset(a);
            if (!e) {
                var g = f.y - c.scrollTop,
                    h = c.scrollTop + c.clientHeight - (f.y + a.offsetHeight);
                if (g < 0 || h < 0) {
                    var i = f.y - c.clientHeight / 2;
                    c.scrollTop = i
                }
            }
            if (!d) {
                var j = f.x - c.scrollLeft,
                    k = c.scrollLeft + c.clientWidth - (f.x + a.clientWidth);
                if (j < 0 || k < 0) {
                    var l = f.x - c.clientWidth / 2;
                    c.scrollLeft = l
                }
            }
        }
    }, b.getClientOffset = function(a) {
        function b(a, c, d) {
            var e = a.offsetParent,
                f = d.getComputedStyle(a, "");
            a.offsetLeft && (c.x += a.offsetLeft + parseInt(f.borderLeftWidth)), a.offsetTop && (c.y += a.offsetTop + parseInt(f.borderTopWidth)), e ? e.nodeType == 1 && b(e, c, d) : a.ownerDocument.defaultView.frameElement && b(a.ownerDocument.defaultView.frameElement, c, a.ownerDocument.defaultView)
        }
        var c = {
            x: 0,
            y: 0
        };
        if (a) {
            var d = a.ownerDocument.defaultView;
            b(a, c, d)
        }
        return c
    }, b.addStyleSheet = function(a, c) {
        if (!a.getElementById(c)) {
            var d = a.createElement("link");
            d.type = "text/css", d.rel = "stylesheet", d.href = c, d.setAttribute("id", c);
            var e = b.getHead(a);
            e.appendChild(d)
        }
    }, b.selectElementText = function(a, b, c) {
        var d = window,
            e = d.document;
        if (d.getSelection && e.createRange) {
            var f = d.getSelection(),
                g = e.createRange();
            g.setStart(a, b), g.setEnd(a, c), f.removeAllRanges(), f.addRange(g)
        } else e.body.createTextRange && (g = e.body.createTextRange(), g.moveToElementText(a), g.select())
    };
    return b
}), require.def("domplate/tabView", ["domplate/domplate", "core/lib", "core/trace"], function(Domplate, Lib, Trace) {
    with(Domplate) {
        var TabViewTempl = domplate({
            tag: TABLE({
                "class": "tabView",
                cellpadding: 0,
                cellspacing: 0,
                _repObject: "$tabView"
            }, TBODY(TR({
                "class": "tabViewRow"
            }, TD({
                "class": "tabViewCol",
                valign: "top"
            }, TAG("$tabList", {
                tabView: "$tabView"
            }))))),
            tabList: DIV({
                "class": "tabViewBody",
                onclick: "$onClickTab"
            }, DIV({
                "class": "$tabView.id\\Bar tabBar"
            }), DIV({
                "class": "$tabView.id\\Bodies tabBodies"
            })),
            tabHeaderTag: A({
                "class": "$tab.id\\Tab tab",
                view: "$tab.id",
                _repObject: "$tab"
            }, "$tab.label"),
            tabBodyTag: DIV({
                "class": "tab$tab.id\\Body tabBody",
                _repObject: "$tab"
            }),
            hideTab: function(a) {
                return !1
            },
            onClickTab: function(a) {
                var b = Lib.fixEvent(a),
                    c = this.getTabView(b.target);
                c.onClickTab(b)
            },
            getTabView: function(a) {
                var b = Lib.getAncestorByClass(a, "tabView");
                return b.repObject
            }
        });

        function TabView(a) {
            this.id = a, this.tabs = [], this.listeners = [], this.tabBarVisibility = !0
        }
        TabView.prototype = {
            appendTab: function(a) {
                this.tabs.push(a), a.tabView = this;
                return a
            },
            removeTab: function(a) {
                for (var b in this.tabs) {
                    var c = this.tabs[b];
                    if (c.id == a) {
                        this.tabs.splice(b, 1);
                        break
                    }
                }
            },
            getTab: function(a) {
                for (var b in this.tabs) {
                    var c = this.tabs[b];
                    if (c.id == a) return c
                }
            },
            selectTabByName: function(a) {
                var b = Lib.getElementByClass(this.element, a + "Tab");
                b && this.selectTab(b)
            },
            showTabBar: function(a) {
                this.element ? a ? this.element.removeAttribute("hideTabBar") : this.element.setAttribute("hideTabBar", "true") : this.tabBarVisibility = a
            },
            addListener: function(a) {
                this.listeners.push(a)
            },
            removeListener: function(a) {
                Lib.remove(this.listeners, a)
            },
            onClickTab: function(a) {
                var b = Lib.getAncestorByClass(a.target, "tab");
                b && this.selectTab(b)
            },
            selectTab: function(a) {
                if (Lib.hasClass(a, "tab")) {
                    if (Lib.hasClass(a, "selected")) return;
                    var b = a.getAttribute("view");
                    if (!b) return;
                    var c = Lib.getAncestorByClass(a, "tabViewBody");
                    c.selectedTab && (c.selectedTab.removeAttribute("selected"), c.selectedBody.removeAttribute("selected"), Lib.removeClass(c.selectedTab, "selected"), Lib.removeClass(c.selectedBody, "selected"));
                    var d = Lib.getElementByClass(c, "tab" + b + "Body");
                    d || Trace.error("TabView.selectTab; Missing tab body", a), c.selectedTab = a, c.selectedBody = d, c.selectedTab.setAttribute("selected", "true"), c.selectedBody.setAttribute("selected", "true"), Lib.setClass(c.selectedBody, "selected"), Lib.setClass(c.selectedTab, "selected"), this.updateTabBody(c, b)
                }
            },
            updateTabBody: function(a, b) {
                var c = a.selectedTab.repObject;
                if (!c._body._updated) {
                    c._body._updated = !0, c.bodyTag && c.bodyTag.replace({
                        tab: c
                    }, c._body), c && c.onUpdateBody && c.onUpdateBody(this, c._body);
                    for (var d = 0; d < this.listeners.length; d++) {
                        var e = this.listeners[d];
                        e.onUpdateBody && e.onUpdateBody(this, c._body)
                    }
                }
            },
            render: function(a) {
                this.element = TabViewTempl.tag.replace({
                    tabView: this
                }, a, TabViewTempl), Lib.setClass(this.element, this.id), this.showTabBar(this.tabBarVisibility);
                for (var b in this.tabs) {
                    var c = this.tabs[b],
                        d = c.tabHeaderTag ? c.tabHeaderTag : TabViewTempl.tabHeaderTag,
                        e = c.tabBodyTag ? c.tabBodyTag : TabViewTempl.tabBodyTag;
                    try {
                        c._header = d.append({
                            tab: c
                        }, Lib.$(a, "tabBar")), c._body = e.append({
                            tab: c
                        }, Lib.$(a, "tabBodies"))
                    } catch (f) {
                        Trace.exception("TabView.appendTab; Exception ", f)
                    }
                }
                return this.element
            }
        }, TabView.Tab = function() {}, TabView.Tab.prototype = {
            invalidate: function() {
                this._updated = !1
            },
            select: function() {
                this.tabView.selectTabByName(this.id)
            }
        };
        return TabView
    }
}), require.def("core/cookies", ["core/lib"], function(a) {
    var b = {
        getCookie: function(b) {
            var c = document.cookie.split(";");
            for (var d = 0; d < c.length; d++) {
                var e = c[d].split("=");
                if (a.trim(e[0]) == b) return e[1].length ? unescape(a.trim(e[1])) : null
            }
        },
        setCookie: function(a, b, c, d, e, f) {
            var g = new Date;
            g.setTime(g.getTime()), c && (c = c * 1e3 * 60 * 60 * 24);
            var h = new Date(g.getTime() + c);
            document.cookie = a + "=" + escape(b) + (c ? ";expires=" + h.toGMTString() : "") + (d ? ";path=" + d : "") + (e ? ";domain=" + e : "") + (f ? ";secure" : "")
        },
        removeCookie: function(a, b, c) {
            this.getCookie(a) && (document.cookie = a + "=" + (b ? ";path=" + b : "") + (c ? ";domain=" + c : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT")
        },
        toggleCookie: function(a) {
            var b = this.getBooleanCookie(a);
            this.setCookie(a, !b)
        },
        getBooleanCookie: function(a) {
            var b = this.getCookie(a);
            return !b || b == "false" ? !1 : !0
        },
        setBooleanCookie: function(a, b) {
            this.setCookie(a, b ? "true" : "false")
        }
    };
    return b
}), function() {
    function c(a, b, c, d, e) {
        var f = d + b + "/" + e;
        require._fileExists(a.nameToUrl(f, null)) && c.push(f)
    }
    function b(a, b, c, d, e, f) {
        b[a] && (c.push(a), (b[a] === !0 || b[a] === 1) && d.push(e + a + "/" + f))
    }
    var a = /(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;
    define("i18n", {
        version: "0.24.0",
        load: function(d, e, f, g) {
            g = g || {};
            var h, i = a.exec(d),
                j = i[1],
                k = i[4],
                l = i[5],
                m = k.split("-"),
                n = [],
                o = {},
                p, q, r = "";
            i[5] ? (j = i[1], h = j + l) : (h = d, l = i[4], k = g.locale || (g.locale = typeof navigator === "undefined" ? "root" : (navigator.language || navigator.userLanguage || "root").toLowerCase()), m = k.split("-"));
            if (g.isBuild) {
                n.push(h), c(e, "root", n, j, l);
                for (p = 0; q = m[p]; p++) r += (r ? "-" : "") + q, c(e, r, n, j, l);
                e(n), f()
            } else e([h], function(a) {
                var c = [];
                b("root", a, c, n, j, l);
                for (p = 0; q = m[p]; p++) r += (r ? "-" : "") + q, b(r, a, c, n, j, l);
                e(n, function() {
                    var b, d;
                    for (b = c.length - 1; b > -1 && (q = c[b]); b--) {
                        d = a[q];
                        if (d === !0 || d === 1) d = e(j + q + "/" + l);
                        require.mixin(o, d)
                    }
                    f(o)
                })
            })
        }
    })
}(), define("nls/homeTab", {
    root: {
        homeTabLabel: "Home",
        loadingHar: "Loading..."
    }
}), function() {
    var a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
        b = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        c = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        d = [];
    define("text", ["require", "exports", "module"], function() {
        var e, f, g;
        typeof window !== "undefined" && window.navigator && window.document ? f = function(a, b) {
            var c = e.createXhr();
            c.open("GET", a, !0), c.onreadystatechange = function(a) {
                c.readyState === 4 && b(c.responseText)
            }, c.send(null)
        } : typeof process !== "undefined" && process.versions && !! process.versions.node ? (g = require.nodeRequire("fs"), f = function(a, b) {
            b(g.readFileSync(a, "utf8"))
        }) : typeof Packages !== "undefined" && (f = function(a, b) {
            var c = "utf-8",
                d = new java.io.File(a),
                e = java.lang.System.getProperty("line.separator"),
                f = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d), c)),
                g, h, i = "";
            try {
                g = new java.lang.StringBuffer, h = f.readLine(), h && h.length() && h.charAt(0) === 65279 && (h = h.substring(1)), g.append(h);
                while ((h = f.readLine()) !== null) g.append(e), g.append(h);
                i = String(g.toString())
            } finally {
                f.close()
            }
            b(i)
        }), e = {
            version: "0.24.0",
            strip: function(a) {
                if (a) {
                    a = a.replace(b, "");
                    var d = a.match(c);
                    d && (a = d[1])
                } else a = "";
                return a
            },
            jsEscape: function(a) {
                return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r")
            },
            createXhr: function() {
                var b, c, d;
                if (typeof XMLHttpRequest !== "undefined") return new XMLHttpRequest;
                for (c = 0; c < 3; c++) {
                    d = a[c];
                    try {
                        b = new ActiveXObject(d)
                    } catch (e) {}
                    if (b) {
                        a = [d];
                        break
                    }
                }
                if (!b) throw new Error("require.getXhr(): XMLHttpRequest not available");
                return b
            },
            get: f,
            load: function(a, b, c, f) {
                var g = !1,
                    h, i = a.indexOf("."),
                    j = a.substring(0, i),
                    k = a.substring(i + 1, a.length);
                i = k.indexOf("!"), i !== -1 && (g = k.substring(i + 1, k.length), g = g === "strip", k = k.substring(0, i)), h = b.nameToUrl(j, "." + k), e.get(h, function(b) {
                    b = g ? e.strip(b) : b, f.isBuild && f.inlineText && (d[a] = b), c(b)
                })
            },
            write: function(a, b, c) {
                if (b in d) {
                    var f = e.jsEscape(d[b]);
                    c("define('" + a + "!" + b + "', function () { return '" + f + "';});\n")
                }
            }
        };
        return e
    })
}(), define("text!tabs/homeTab.html", function() {
    return '<div>\r\n<ul style="padding-left: 20px; line-height: 20px; margin-top: 0px">\r\n<li>Paste <a href="@HAR_SPEC_URL@">HAR</a>\r\nlog into the text box below and\r\npress the <b>Preview</b> button.</li>\r\n<li>Or drop <span class="red">*.har</span> file(s) anywhere on the page (if your browser supports that).</li>\r\n</ul>\r\n<table cellpadding="0" cellspacing="4">\r\n    <tr>\r\n        <td><input type="checkbox" id="validate" checked="true"></input></td>\r\n        <td style="vertical-align:middle;padding-bottom: 1px;">Validate data before processing?</td>\r\n    </tr>\r\n</table>\r\n<textarea id="sourceEditor" class="sourceEditor" cols="80" rows="5"></textarea>\r\n<p><table cellpadding="0" cellspacing="0">\r\n    <tr>\r\n        <td><button id="appendPreview">Preview</button></td>\r\n    </tr>\r\n</table></p>\r\n<br/>\r\n<h3>HAR Log Examples</h3>\r\n<ul style="line-height:20px;">\r\n<li><span id="example1" class="link example" path="examples/inline-scripts-block.har">\r\nInline scripts block</span> - Inline scripts block the page load.</li>\r\n<li><span id="example2" class="link example" path="examples/browser-blocking-time.har">\r\nBlocking time</span> - Impact of a limit of max number of parallel connections.</li>\r\n<li><span id="example3" class="link example" path="examples/softwareishard.com.har">\r\nBrowser cache</span> - Impact of the browser cache on page load (the same page loaded three times).</li>\r\n<li><span id="example4" class="link example" path="examples/google.com.har">\r\nSingle page</span> - Single page load (empty cache).</li>\r\n</ul>\r\n<h3>HAR Logs Online </h3>\r\n<i>You can also preview any HAR file (in JSONP format) that is available online by using\r\n<b>inputUrl</b> parameter<br/>\r\n(see more in the <span class="linkAbout link">About</span> tab):</i><br/>\r\n<p><code><a href="?inputUrl=http://www.janodvarko.cz/har/viewer/examples/inline-scripts-block.harp">\r\n    http://www.softwareishard.com/har/viewer?inputUrl=http://www.janodvarko.cz/har/viewer/examples/inline-scripts-block.harp</a></code></p>\r\n\r\n<br/>\r\n<p><i>This viewer supports HAR 1.2 (see the <span class="linkAbout link">About</span> tab).<br/></i></p>\r\n</div>'
}), require.def("preview/jsonSchema", [], function() {
    var a = {
        validate: function(a, b) {
            return this._validate(a, b, !1)
        },
        checkPropertyChange: function(a, b, c) {
            return this._validate(a, b, c || "property")
        },
        _validate: function(a, b, c) {
            function f(a, b, f, g) {
                if (typeof b == "object") {
                    (typeof a != "object" || a instanceof Array) && d.push({
                        property: f,
                        message: "an object is required"
                    });
                    for (var h in b) if (b.hasOwnProperty(h) && (h.charAt(0) != "_" || h.charAt(1) != "_")) {
                        var i = a[h],
                            j = b[h];
                        e(i, j, f, h)
                    }
                }
                for (h in a) {
                    a.hasOwnProperty(h) && (h.charAt(0) != "_" || h.charAt(1) != "_") && b && !b[h] && g === !1 && d.push({
                        property: f,
                        message: typeof i + "The property " + h + " is not defined in the schema and the schema does not allow additional properties"
                    });
                    var k = b && b[h] && b[h].requires;
                    k && !(k in a) && d.push({
                        property: f,
                        message: "the presence of the property " + h + " requires that " + k + " also be present"
                    }), i = a[h], b && typeof b == "object" && !(h in b) && e(i, g, f, h), !c && i && i.$schema && (d = d.concat(e(i, i.$schema, f, h)))
                }
                return d
            }
            function e(a, b, g, h) {
                function k(a, b) {
                    if (a) {
                        if (typeof a == "string" && a != "any" && (a == "null" ? b !== null : typeof b != a) && !(b instanceof Array && a == "array") && (a != "integer" || b % 1 !== 0)) return [{
                            property: g,
                            message: typeof b + " value found, but a " + a + " is required"
                        }];
                        if (a instanceof Array) {
                            var c = [];
                            for (var f = 0; f < a.length; f++) if (!(c = k(a[f], b)).length) break;
                            if (c.length) return c
                        } else if (typeof a == "object") {
                            var h = d;
                            d = [], e(b, a, g);
                            var i = d;
                            d = h;
                            return i
                        }
                    }
                    return []
                }
                function j(a) {
                    d.push({
                        property: g,
                        message: a
                    })
                }
                var i;
                g += g ? typeof h == "number" ? "[" + h + "]" : typeof h == "undefined" ? "" : "." + h : h;
                if ((typeof b != "object" || b instanceof Array) && (g || typeof b != "function")) {
                    typeof b == "function" ? a instanceof b || j("is not an instance of the class/constructor " + b.name) : b && j("Invalid schema/property definition " + b);
                    return null
                }
                c && b.readonly && j("is a readonly field, it can not be changed"), b["extends"] && e(a, b["extends"], g, h);
                if (a === undefined) b.optional || j("is missing and it is not optional");
                else {
                    d = d.concat(k(b.type, a)), b.disallow && !k(b.disallow, a).length && j(" disallowed value was matched");
                    if (a !== null) {
                        if (a instanceof Array) {
                            if (b.items) if (b.items instanceof Array) for (h = 0, i = a.length; h < i; h++) d.concat(e(a[h], b.items[h], g, h));
                            else for (h = 0, i = a.length; h < i; h++) d.concat(e(a[h], b.items, g, h));
                            b.minItems && a.length < b.minItems && j("There must be a minimum of " + b.minItems + " in the array"), b.maxItems && a.length > b.maxItems && j("There must be a maximum of " + b.maxItems + " in the array")
                        } else b.properties && d.concat(f(a, b.properties, g, b.additionalProperties));
                        b.pattern && typeof a == "string" && !a.match(b.pattern) && j("does not match the regex pattern " + b.pattern), b.maxLength && typeof a == "string" && a.length > b.maxLength && j("may only be " + b.maxLength + " characters long"), b.minLength && typeof a == "string" && a.length < b.minLength && j("must be at least " + b.minLength + " characters long"), typeof b.minimum !== undefined && typeof a == typeof b.minimum && b.minimum > a && j("must have a minimum value of " + b.minimum), typeof b.maximum !== undefined && typeof a == typeof b.maximum && b.maximum < a && j("must have a maximum value of " + b.maximum);
                        if (b["enum"]) {
                            var l = b["enum"];
                            i = l.length;
                            var m;
                            for (var n = 0; n < i; n++) if (l[n] === a) {
                                m = 1;
                                break
                            }
                            m || j("does not have a value in the enumeration " + l.join(", "))
                        }
                        typeof b.maxDecimal == "number" && a.toString().match(new RegExp("\\.[0-9]{" + (b.maxDecimal + 1) + ",}")) && j("may only have " + b.maxDecimal + " digits of decimal places")
                    }
                }
                return null
            }
            var d = [];
            b && e(a, b, "", c || ""), !c && a && a.$schema && e(a, a.$schema, "", "");
            return {
                valid: !d.length,
                errors: d
            }
        }
    };
    return a
}), require.def("preview/ref", ["core/lib"], function(a) {
    var b = {
        resolveJson: function(b, c) {
            function n(o, p, q, r, s) {
                var t, u, v = d in o ? o[d] : q;
                v !== undefined && (v = (e + v).replace(k, "$2$3"));
                var w = s || o;
                if (v !== undefined) {
                    f && (o.__id = v), c.schemas && !(o instanceof Array) && (u = v.match(/^(.+\/)[^\.\[]*$/)) && (r = c.schemas[u[1]]);
                    if (g[v] && o instanceof Array == g[v] instanceof Array) w = g[v], delete w.$ref, t = !0;
                    else {
                        var x = r && r.prototype;
                        x && (m.prototype = x, w = new m)
                    }
                    g[v] = w, h && (h[v] = c.time)
                }
                var y = r && r.properties,
                    z = o.length;
                for (var A in o) {
                    if (A == z) break;
                    if (o.hasOwnProperty(A)) {
                        u = o[A];
                        var B = y && y[A];
                        if (B && B.format == "date-time" && typeof u == "string") u = a.fromISOString(u);
                        else if (typeof u == "object" && u && !(u instanceof Date)) {
                            i = u.$ref;
                            if (i) {
                                delete o[A];
                                var C = i.replace(/(#)([^\.\[])/, "$1.$2").match(/(^([^\[]*\/)?[^#\.\[]*)#?([\.\[].*)?/);
                                if (i = C[1] == "$" || C[1] == "this" || C[1] == "" ? b : g[(e + C[1]).replace(k, "$2$3")]) C[3] && C[3].replace(/(\[([^\]]+)\])|(\.?([^\.\[]+))/g, function(a, b, c, d, e) {
                                    i = i && i[c ? c.replace(/[\"\'\\]/, "") : e]
                                });
                                if (i) u = i;
                                else if (p) u = n(u, !1, u.$ref, B), u._loadObject = c.loader;
                                else {
                                    var D;
                                    D || j.push(w), D = !0
                                }
                            } else p || (u = n(u, j == o, v && l(v, A), B, w != o && typeof w[A] == "object" && w[A]))
                        }
                        o[A] = u;
                        if (w != o && !w.__isDirty) {
                            var E = w[A];
                            w[A] = u, t && u !== E && !w._loadObject && !(u instanceof Date && E instanceof Date && u.getTime() == E.getTime()) && (typeof u != "function" || typeof E != "function" || u.toString() != E.toString()) && g.onUpdate && g.onUpdate(w, A, E, u)
                        }
                    }
                }
                if (t) {
                    for (A in w) if (!w.__isDirty && w.hasOwnProperty(A) && !o.hasOwnProperty(A) && A != "__id" && A != "__clientId" && !(w instanceof Array && isNaN(A))) {
                        g.onUpdate && A != "_loadObject" && A != "_idAttr" && g.onUpdate(w, A, w[A], undefined), delete w[A];
                        while (w instanceof Array && w.length && w[w.length - 1] === undefined) w.length--
                    }
                } else g.onLoad && g.onLoad(w);
                return w
            }
            c = c || {};
            var d = c.idAttribute || "id",
                e = c.idPrefix || "",
                f = c.assignAbsoluteIds,
                g = c.index || {},
                h = c.timeStamps,
                i, j = [],
                k = /^(.*\/)?(\w+:\/\/)|[^\/\.]+\/\.\.\/|^.*\/(\/)/,
                l = this._addProp,
                m = function() {};
            b && typeof b == "object" && (b = n(b, !1, c.defaultId), n(j, !1));
            return b
        },
        _addProp: function(a, b) {
            return a + (a.match(/#/) ? a.length == 1 ? "" : "." : "#") + b
        }
    };
    return b
}), require.def("preview/harSchema", [], function() {
    function r() {}
    var a = /^(\d{4})(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/,
        b = {
            logType: {
                id: "logType",
                description: "HTTP Archive structure.",
                type: "object",
                properties: {
                    log: {
                        type: "object",
                        properties: {
                            version: {
                                type: "string"
                            },
                            creator: {
                                $ref: "creatorType"
                            },
                            browser: {
                                $ref: "browserType"
                            },
                            pages: {
                                type: "array",
                                optional: !0,
                                items: {
                                    $ref: "pageType"
                                }
                            },
                            entries: {
                                type: "array",
                                items: {
                                    $ref: "entryType"
                                }
                            },
                            comment: {
                                type: "string",
                                optional: !0
                            }
                        }
                    }
                }
            }
        },
        c = {
            creatorType: {
                id: "creatorType",
                description: "Name and version info of the log creator app.",
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    version: {
                        type: "string"
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        d = {
            browserType: {
                id: "browserType",
                description: "Name and version info of used browser.",
                type: "object",
                optional: !0,
                properties: {
                    name: {
                        type: "string"
                    },
                    version: {
                        type: "string"
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        e = {
            pageType: {
                id: "pageType",
                description: "Exported web page",
                optional: !0,
                properties: {
                    startedDateTime: {
                        type: "string",
                        format: "date-time",
                        pattern: a
                    },
                    id: {
                        type: "string",
                        unique: !0
                    },
                    title: {
                        type: "string"
                    },
                    pageTimings: {
                        $ref: "pageTimingsType"
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        f = {
            pageTimingsType: {
                id: "pageTimingsType",
                description: "Timing info about page load",
                properties: {
                    onContentLoad: {
                        type: "number",
                        optional: !0,
                        min: -1
                    },
                    onLoad: {
                        type: "number",
                        optional: !0,
                        min: -1
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        g = {
            entryType: {
                id: "entryType",
                description: "Request and Response related info",
                optional: !0,
                properties: {
                    pageref: {
                        type: "string",
                        optional: !0
                    },
                    startedDateTime: {
                        type: "string",
                        format: "date-time",
                        pattern: a
                    },
                    time: {
                        type: "integer",
                        min: 0
                    },
                    request: {
                        $ref: "requestType"
                    },
                    response: {
                        $ref: "responseType"
                    },
                    cache: {
                        $ref: "cacheType"
                    },
                    timings: {
                        $ref: "timingsType"
                    },
                    serverIPAddress: {
                        type: "string",
                        optional: !0
                    },
                    connection: {
                        type: "string",
                        optional: !0
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        h = {
            requestType: {
                id: "requestType",
                description: "Monitored request",
                properties: {
                    method: {
                        type: "string"
                    },
                    url: {
                        type: "string"
                    },
                    httpVersion: {
                        type: "string"
                    },
                    cookies: {
                        type: "array",
                        items: {
                            $ref: "cookieType"
                        }
                    },
                    headers: {
                        type: "array",
                        items: {
                            $ref: "recordType"
                        }
                    },
                    queryString: {
                        type: "array",
                        items: {
                            $ref: "recordType"
                        }
                    },
                    postData: {
                        $ref: "postDataType"
                    },
                    headersSize: {
                        type: "integer"
                    },
                    bodySize: {
                        type: "integer"
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        j = {
            recordType: {
                id: "recordType",
                description: "Helper name-value pair structure.",
                properties: {
                    name: {
                        type: "string"
                    },
                    value: {
                        type: "string"
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        k = {
            responseType: {
                id: "responseType",
                description: "Monitored Response.",
                properties: {
                    status: {
                        type: "integer"
                    },
                    statusText: {
                        type: "string"
                    },
                    httpVersion: {
                        type: "string"
                    },
                    cookies: {
                        type: "array",
                        items: {
                            $ref: "cookieType"
                        }
                    },
                    headers: {
                        type: "array",
                        items: {
                            $ref: "recordType"
                        }
                    },
                    content: {
                        $ref: "contentType"
                    },
                    redirectURL: {
                        type: "string"
                    },
                    headersSize: {
                        type: "integer"
                    },
                    bodySize: {
                        type: "integer"
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        l = {
            cookieType: {
                id: "cookieType",
                description: "Cookie description.",
                properties: {
                    name: {
                        type: "string"
                    },
                    value: {
                        type: "string"
                    },
                    path: {
                        type: "string",
                        optional: !0
                    },
                    domain: {
                        type: "string",
                        optional: !0
                    },
                    expires: {
                        type: "string",
                        optional: !0
                    },
                    httpOnly: {
                        type: "boolean",
                        optional: !0
                    },
                    secure: {
                        type: "boolean",
                        optional: !0
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        m = {
            postDataType: {
                id: "postDataType",
                description: "Posted data info.",
                optional: !0,
                properties: {
                    mimeType: {
                        type: "string"
                    },
                    text: {
                        type: "string",
                        optional: !0
                    },
                    params: {
                        type: "array",
                        optional: !0,
                        properties: {
                            name: {
                                type: "string"
                            },
                            value: {
                                type: "string",
                                optional: !0
                            },
                            fileName: {
                                type: "string",
                                optional: !0
                            },
                            contentType: {
                                type: "string",
                                optional: !0
                            },
                            comment: {
                                type: "string",
                                optional: !0
                            }
                        }
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        n = {
            contentType: {
                id: "contentType",
                description: "Response content",
                properties: {
                    size: {
                        type: "integer"
                    },
                    compression: {
                        type: "integer",
                        optional: !0
                    },
                    mimeType: {
                        type: "string"
                    },
                    text: {
                        type: "string",
                        optional: !0
                    },
                    encoding: {
                        type: "string",
                        optional: !0
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        o = {
            cacheType: {
                id: "cacheType",
                description: "Info about a response coming from the cache.",
                properties: {
                    beforeRequest: {
                        $ref: "cacheEntryType"
                    },
                    afterRequest: {
                        $ref: "cacheEntryType"
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        p = {
            cacheEntryType: {
                id: "cacheEntryType",
                optional: !0,
                description: "Info about cache entry.",
                properties: {
                    expires: {
                        type: "string",
                        optional: "true"
                    },
                    lastAccess: {
                        type: "string"
                    },
                    eTag: {
                        type: "string"
                    },
                    hitCount: {
                        type: "integer"
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        },
        q = {
            timingsType: {
                id: "timingsType",
                description: "Info about request-response timing.",
                properties: {
                    dns: {
                        type: "integer",
                        optional: !0,
                        min: -1
                    },
                    connect: {
                        type: "integer",
                        optional: !0,
                        min: -1
                    },
                    blocked: {
                        type: "integer",
                        optional: !0,
                        min: -1
                    },
                    send: {
                        type: "integer",
                        min: -1
                    },
                    wait: {
                        type: "integer",
                        min: -1
                    },
                    receive: {
                        type: "integer",
                        min: -1
                    },
                    ssl: {
                        type: "integer",
                        optional: !0,
                        min: -1
                    },
                    comment: {
                        type: "string",
                        optional: !0
                    }
                }
            }
        };
    r.prototype = {
        registerType: function() {
            var a = function(a, b) {
                    for (var c in b) b.hasOwnProperty(c) && c != "prototype" && (a[c] = b[c])
                },
                b = this;
            for (i = 0; i < arguments.length; i += 1) a(b, arguments[i])
        }
    };
    var s = new r;
    s.registerType(b, c, d, e, f, g, h, j, k, m, n, o, p, q);
    return s
}), function($) {
    if (!JSON) var JSON = {};
    (function() {
        function str(a, b) {
            var c, d, e, f, g = gap,
                h, i = b[a];
            i && typeof i === "object" && typeof i.toJSON === "function" && (i = i.toJSON(a)), typeof rep === "function" && (i = rep.call(b, a, i));
            switch (typeof i) {
                case "string":
                    return quote(i);
                case "number":
                    return isFinite(i) ? String(i) : "null";
                case "boolean":
                case "null":
                    return String(i);
                case "object":
                    if (!i) return "null";
                    gap += indent, h = [];
                    if (Object.prototype.toString.apply(i) === "[object Array]") {
                        f = i.length;
                        for (c = 0; c < f; c += 1) h[c] = str(c, i) || "null";
                        e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g;
                        return e
                    }
                    if (rep && typeof rep === "object") {
                        f = rep.length;
                        for (c = 0; c < f; c += 1) d = rep[c], typeof d === "string" && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e))
                    } else for (d in i) Object.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                    e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g;
                    return e
            }
        }
        function quote(a) {
            escapable.lastIndex = 0;
            return escapable.test(a) ? '"' + a.replace(escapable, function(a) {
                var b = meta[a];
                return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }
        function f(a) {
            return a < 10 ? "0" + a : a
        }
        typeof Date.prototype.toJSON !== "function" && (Date.prototype.toJSON = function(a) {
            return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        typeof JSON.stringify !== "function" && (JSON.stringify = function(a, b, c) {
            var d;
            gap = "", indent = "";
            if (typeof c === "number") for (d = 0; d < c; d += 1) indent += " ";
            else typeof c === "string" && (indent = c);
            rep = b;
            if (b && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number")) throw new Error("JSON.stringify");
            return str("", {
                "": a
            })
        }), typeof JSON.parse !== "function" && (JSON.parse = function(text, reviver) {
            function walk(a, b) {
                var c, d, e = a[b];
                if (e && typeof e === "object") for (c in e) Object.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
                return reviver.call(a, b, e)
            }
            var j;
            cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        })
    })(), $.toJSON = function(a, b) {
        typeof b == "undefined" && (b = null);
        return JSON.parse(a, b)
    }, $.jSONToString = function(a, b, c) {
        typeof b == "undefined" && (b = null), typeof c == "undefined" && (c = null);
        return JSON.stringify(a, b, c)
    }
}(jQuery), define("jquery-plugins/jquery.json.js", function() {}), define("nls/harModel", {
    root: {
        validationType: "HAR Validation",
        validationSumTimeError: "Sum of request timings doesn't correspond to the total value: %S (request.time: %S vs. sum: %S), request#: %S, parent page: %S",
        validationNegativeTimeError: "Negative time is not allowed: %S, request#: %S, parent page: %S"
    }
}), require.def("preview/harModel", ["core/lib", "preview/jsonSchema", "preview/ref", "preview/harSchema", "core/cookies", "core/trace", "i18n!nls/harModel", "jquery-plugins/jquery.json.js"], function(a, b, c, d, e, f, g) {
    function i() {
        var a = {};
        for (var b in this) b != "toJSON" && (a[b] = this[b]);
        if (!this.text) return a;
        a.text = Array.map(this.text, function(a) {
            var b = a.charCodeAt(0);
            if (b >= 32 && b < 127 || b == 10 || b == 13) return a.charAt(0);
            var c = b.toString(16).toUpperCase();
            while (c.length < 4) c = "0" + c;
            return "\\u" + c
        }).join("");
        return a
    }
    function h() {
        this.input = null
    }
    h.prototype = {
        append: function(b) {
            {
                if (b) {
                    b.log.entries.sort(function(b, c) {
                        var d = a.parseISO8601(b.startedDateTime),
                            e = a.parseISO8601(c.startedDateTime);
                        return d > e
                    });
                    if (this.input) {
                        if (!b.log.pages) {
                            f.error("Import of additional data without a page is not yet supported.");
                            return null
                        }
                        for (var c = 0; c < b.log.pages.length; c++) this.importPage(b.log.pages[c], b.log.entries)
                    } else this.input = a.cloneJSON(b);
                    return this.input
                }
                f.error("HarModel.append; Trying to append null input!")
            }
        },
        getPages: function() {
            if (!this.input) return [];
            return this.input.log.pages ? this.input.log.pages : []
        },
        getFirstPage: function() {
            var a = this.getPages();
            return a.length > 0 ? a[0] : null
        },
        getPageEntries: function(a) {
            return h.getPageEntries(this.input, a)
        },
        getAllEntries: function(a) {
            return this.input ? this.input.log.entries : []
        },
        getParentPage: function(a) {
            return h.getParentPage(this.input, a)
        },
        importPage: function(a, b) {
            var c = this.getUniquePageID(a.id),
                d = a.id;
            a.id = c, this.input.log.pages.push(a);
            for (var e = 0; e < b.length; e++) {
                var f = b[e];
                f.pageref == d && (f.pageref = c, this.input.log.entries.push(f))
            }
        },
        getUniquePageID: function(a) {
            var b = this.input.log.pages,
                c = {};
            for (var d = 0; d < b.length; d++) c[b[d].id] = !0;
            if (!c[a]) return a;
            var e = 1;
            while (!0) {
                var f = a + e;
                if (!c[f]) return f;
                e++
            }
        },
        toJSON: function(a) {
            a || (a = this.input);
            if (!a) return "";
            var b = this.input.log.entries;
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d.response.content.text && (d.response.content.toJSON = i)
            }
            var e = $.jSONToString(this.input, null, "\t"),
                f = e.replace(/\\\\u/g, "\\u");
            return f
        },
        getSize: function(a) {
            a || (a = this.input);
            if (!a) return 0;
            var b = dojo.toJson(a, !0);
            return b.length
        }
    }, h.parse = function(a, e) {
        var f = a;
        try {
            typeof a === "string" && (f = jQuery.parseJSON(a))
        } catch (g) {
            console.exception("HarModel.parse; EXCEPTION", g);
            throw {
                errors: [{
                    message: "Failed to parse JSON",
                    property: "JSON evaluation"
                }]
            }
        }
        if (!e) return f;
        var h = c.resolveJson(d),
            i = b.validate(f, h.logType);
        if (i.valid) {
            this.validateRequestTimings(f);
            return f
        }
        throw i
    }, h.getPageEntries = function(a, b) {
        var c = [],
            d = a.log.entries;
        if (!d) return c;
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            !f.pageref && !b && c.push(f), b && f.pageref == b.id && c.push(f)
        }
        return c
    }, h.getParentPage = function(a, b) {
        var c = a.log.pages;
        if (!c) return null;
        for (var d = 0; d < c.length; d++) if (c[d].id == b.pageref) return c[d];
        return null
    }, h.validateRequestTimings = function(b) {
        var c = [],
            d = b.log.entries;
        for (var e = 0; e < d.length; e++) {
            var f = d[e],
                h = f.timings,
                i = 0;
            for (var j in h) {
                var k = parseInt(h[j], 10);
                j != "ssl" && k > 0 && (i += k)
            }
            if (i != f.time) {
                var l = a.formatString(g.validationSumTimeError, f.request.url, f.time, i, e, f.pageref);
                c.push({
                    input: b,
                    file: f,
                    message: l,
                    property: g.validationType
                })
            }
            if (h.blocked < -1 || h.connect < -1 || h.dns < -1 || h.receive < -1 || h.send < -1 || h.wait < -1) {
                var l = a.formatString(g.validationNegativeTimeError, f.request.url, e, f.pageref);
                c.push({
                    input: b,
                    file: f,
                    message: l,
                    property: g.validationType
                })
            }
        }
        if (c.length) throw {
            errors: c,
            input: b
        }
    }, h.Loader = {
        run: function(b, c) {
            var d = a.getURLParameter("baseUrl");
            d && d[d.length - 1] != "/" && (d += "/");
            var e = a.getURLParameters("path"),
                f = a.getURLParameter("callback"),
                g = a.getURLParameters("inputUrl"),
                h = [];
            for (var i in e) h.push(d ? d + e[i] : e[i]);
            for (var i in g) h.push(g[i]);
            if ((d || g.length > 0) && h.length > 0) return this.loadRemoteArchive(h, f, b, c);
            var j = a.getURLParameter("path");
            if (j) return this.loadLocalArchive(j, b, c)
        },
        loadExample: function(a, b) {
            var c = document.location.href,
                d = c.indexOf("?");
            document.location = c.substr(0, d) + "?path=" + a, e.setCookie("timeline", !0), e.setCookie("stats", !0)
        },
        loadLocalArchive: function(a, b, c) {
            $.ajax({
                url: a,
                context: this,
                success: function(a) {
                    b(a)
                },
                error: function(a, b) {
                    c(a, b)
                }
            });
            return !0
        },
        loadRemoteArchive: function(a, b, c, d) {
            if (!a.length) return !1;
            var e = a.shift();
            b || (b = "onInputData"), $.ajax({
                url: e,
                context: this,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: b,
                success: function(e) {
                    c && c(e);
                    if (a.length) {
                        var f = this;
                        setTimeout(function() {
                            f.loadRemoteArchive(a, b, c, d)
                        }, 300)
                    }
                },
                error: function(a, b) {
                    d && d(a, b)
                }
            });
            return !0
        },
        load: function(a, b, c, d, e, f) {
            function h(b, c) {
                a.onLoadError && a.onLoadError(b, c), f && f.call(a, b, c)
            }
            function g(b) {
                a.appendPreview && a.appendPreview(b), e && e.call(a, b)
            }
            return c ? this.loadRemoteArchive([b], d, g, h) : this.loadLocalArchive(b, g, h)
        }
    };
    return h
}), require.def("tabs/homeTab", ["domplate/domplate", "domplate/tabView", "core/lib", "core/cookies", "core/trace", "i18n!nls/homeTab", "text!tabs/homeTab.html", "preview/harModel"], function(Domplate, TabView, Lib, Cookies, Trace, Strings, HomeTabHtml, HarModel) {
    with(Domplate) {
        function HomeTab() {}
        HomeTab.prototype = Lib.extend(TabView.Tab.prototype, {
            id: "Home",
            label: Strings.homeTabLabel,
            bodyTag: DIV({
                "class": "homeBody"
            }),
            onUpdateBody: function(a, b) {
                b = this.bodyTag.replace({}, b), b.innerHTML = HomeTabHtml.replace("@HAR_SPEC_URL@", a.harSpecURL, "g"), $("#appendPreview").click(Lib.bindFixed(this.onAppendPreview, this)), $(".linkAbout").click(Lib.bind(this.onAbout, this));
                var c = $("#content");
                c.bind("dragenter", Lib.bind(Lib.cancelEvent, Lib)), c.bind("dragover", Lib.bind(Lib.cancelEvent, Lib)), c.bind("drop", Lib.bind(this.onDrop, this)), this.validateNode = $("#validate");
                var d = Cookies.getCookie("validate");
                d && this.validateNode.attr("checked", d == "false" ? !1 : !0), this.validateNode.change(Lib.bind(this.onValidationChange, this)), $(".example").click(Lib.bind(this.onLoadExample, this))
            },
            onAppendPreview: function(a) {
                a || (a = $("#sourceEditor").val()), a && this.tabView.appendPreview(a)
            },
            onAbout: function() {
                this.tabView.selectTabByName("About")
            },
            onValidationChange: function() {
                var a = this.validateNode.attr("checked");
                Cookies.setCookie("validate", a)
            },
            onLoadExample: function(a) {
                var b = Lib.fixEvent(a),
                    c = b.target.getAttribute("path"),
                    d = document.location.href,
                    e = d.indexOf("?");
                document.location = d.substr(0, e) + "?path=" + c, Cookies.setCookie("timeline", !0), Cookies.setCookie("stats", !0)
            },
            onDrop: function(a) {
                var b = Lib.fixEvent(a);
                Lib.cancelEvent(b);
                try {
                    this.handleDrop(a.originalEvent.dataTransfer)
                } catch (c) {
                    Trace.exception("HomeTab.onDrop EXCEPTION", c)
                }
            },
            handleDrop: function(a) {
                if (!a) return !1;
                var b = a.files;
                if (b) for (var c = 0; c < b.length; c++) {
                    var d = b[c],
                        e = Lib.getFileExtension(d.name);
                    if (e.toLowerCase() != "har") continue;
                    var f = this,
                        g = this.getFileReader(d, function(a) {
                            a && f.onAppendPreview(a)
                        });
                    g()
                }
            },
            getFileReader: function(a, b) {
                return function c() {
                    if (typeof a.getAsText != "undefined") b(a.getAsText(""));
                    else if (typeof FileReader != "undefined") {
                        var c = new FileReader;
                        c.onloadend = function() {
                            b(c.result)
                        }, c.readAsText(a)
                    }
                }
            },
            loadInProgress: function(a, b) {
                $("#sourceEditor").val(a ? b ? b : Strings.loadingHar : "")
            }
        });
        return HomeTab
    }
}), define("text!tabs/aboutTab.html", function() {
    return '<div>\r\n<h2>HTTP Archive Viewer @VERSION@</h2>\r\n<i>Author: Jan Odvarko, odvarko@gmail.com</i>\r\n<br/><br/>\r\n<table style="width:600px;">\r\n\r\n<tr><td>\r\n<p>The purpose of this online tool is to visualize\r\n<a href="@HAR_SPEC_URL@">\r\n    HTTP Archive (HAR)</a>\r\nlog files created by HTTP tracking tools. These files contain log of HTTP\r\nclient/server conversation and can be used for an additional analysis of e.g. \r\npage load performance.</p>\r\n\r\n<p>User interface of this tool is composed from the following tabs:</p>\r\n<ul>\r\n<li><b>Home</b> - Paste content of a log file into the text box in this tab.</li>\r\n<li><b>Preview</b> - Switch to this tab if you want to see visualised HTTP traffic.</li>\r\n<li><b>HAR</b> - Use this tab to see structure of the input JSON data as an expandable tree.</li>\r\n<li><b>Schema</b> - Explore format of the input log in this tab.</li>\r\n</ul>\r\n</td></tr>\r\n\r\n<tr><td>\r\n<h3>Links</h3>\r\n<p>Home Page (donate): <a href="http://www.softwareishard.com/blog/har-viewer/">\r\n    http://www.softwareishard.com/blog/har-viewer/</a></p>\r\n<p>Feedback: <a href="http://groups.google.com/group/http-archive-specification">\r\n    http://groups.google.com/group/http-archive-specification</a></p>\r\n<p>Report issue: <a href="http://code.google.com/p/harviewer/issues/list">\r\n    http://code.google.com/p/harviewer/issues/list</a></p>\r\n<p>HAR Viewer Customization: <a href="http://code.google.com/p/harviewer/wiki/Customization">\r\n    http://code.google.com/p/harviewer/wiki/Customization</a></p>\r\n</td></tr>\r\n\r\n<tr><td>\r\n<h3>Create HARs using Firebug</h3>\r\nOne of the tools you can use to log data transfered over HTTP protocol\r\nis <a href="http://getfirebug.com/">Firebug</a>. To do this you have to also install Firebug\r\nextension called <a href="http://www.softwareishard.com/blog/netexport/">NetExport</a>.\r\n</td></tr>\r\n\r\n<tr><td>\r\n<h3>HTTP Archive Specification</h3>\r\n<p>Required\r\n<a href="@HAR_SPEC_URL@">\r\nstructure</a> of the input HTTP Archive file (*.har) is described using\r\n<a href="http://www.json.com/json-schema-proposal/">JSON Schema</a>.\r\nYou can explore the current schema definition within the <span class="linkSchema link">Schema</span>\r\ntab on this page.</p>\r\n</td></tr>\r\n\r\n<tr><td>\r\n<h3>Request Timing Fields</h3>\r\n<p>Part of the HTTP log is also a timing info about network request executions.\r\nHere is a description of individual request/response phases:</p>\r\n<ul>\r\n<li><i>Blocking</i> - Time spent in a queue waiting for a network connection.</li>\r\n<li><i>DNS Lookup</i> - DNS resolution time. The time required to resolve a host name.</li>\r\n<li><i>Connecting</i> - Time required to create TCP connection.</li>\r\n<li><i>Sending</i> - Time required to send HTTP request to the server.</li>\r\n<li><i>Waiting</i> - Waiting for a response from the server.</li>\r\n<li><i>Receiving</i> - Time required to read entire response from the server (or cache).</li>\r\n</ul>\r\n</td></tr>\r\n\r\n<tr><td>\r\n<h3>Online Log Files</h3>\r\n<p>HAR Viewer also supports JSONP and so, it\'s possible to load log files \r\nfrom different domains. This allows linking your online logs and preview them\r\nautomatically within the viewer. See live\r\n<a href="?inputUrl=http://www.janodvarko.cz/har/viewer/examples/inline-scripts-block.harp">example</a>.\r\n</p>\r\n\r\n<p><i>1. The Content of a *.har file must be enclosed within a callback function:</i></p>\r\n<code>onInputData({ "log": { ... } })</code>\r\n\r\n<p><i>2. The link displaying a *.har file (using this viewer) must specify URL of\r\nthe file in <b>inputUrl</b> parameter:</i></p>\r\n<code>http://www.softwareishard.com/har/viewer/?inputUrl=http://www.example.com/netData.har</code>\r\n\r\n<p><i>3. A custom name of the callback function can be specified in a <b>callback</b> parameter\r\n(by default it\'s <b>onInputData</b>):</i></p>\r\n<code>http://www.softwareishard.com/har/viewer/?inputUrl=http://www.example.com/netData.har&amp;callback=onInputData</code>\r\n<br/><br/>\r\n</td></tr>\r\n\r\n</table>\r\n</div>'
}), define("nls/harViewer", {
    root: {
        aboutTabLabel: "About",
        schemaTabLabel: "Schema"
    }
}), require.def("tabs/aboutTab", ["domplate/domplate", "domplate/tabView", "core/lib", "i18n!nls/harViewer"], function(Domplate, TabView, Lib, Strings) {
    with(Domplate) {
        function AboutTab() {}
        AboutTab.prototype = {
            id: "About",
            label: Strings.aboutTabLabel,
            tabHeaderTag: A({
                "class": "$tab.id\\Tab tab",
                view: "$tab.id",
                _repObject: "$tab"
            }, "$tab.label", SPAN("&nbsp;"), SPAN({
                "class": "version"
            }, "$tab.tabView.version")),
            bodyTag: DIV({
                "class": "aboutBody"
            }),
            onUpdateBody: function(a, b) {
                var c = this;
                b = this.bodyTag.replace({}, b), require(["text!tabs/aboutTab.html"], function(d) {
                    d = d.replace("@VERSION@", a.version, "g"), d = d.replace("@HAR_SPEC_URL@", a.harSpecURL, "g"), b.innerHTML = d, $(".linkSchema").click(Lib.bind(c.onSchema, c))
                })
            },
            onSchema: function() {
                this.tabView.selectTabByName("Schema")
            }
        };
        return AboutTab
    }
}), define("nls/previewTab", {
    root: {
        previewTabLabel: "Preview",
        showTimelineButton: "Show Page Timeline",
        hideTimelineButton: "Hide Page Timeline",
        showTimelineTooltip: "Show/hide statistic preview for selected pages in the timeline.",
        showStatsButton: "Show Statistics",
        hideStatsButton: "Hide Statistics",
        showStatsTooltip: "Show/hide page timeline.",
        clearButton: "Clear",
        clearTooltip: "Remove all HAR logs from the viewer",
        downloadTooltip: "Download all current data in one HAR file.",
        downloadError: "Failed to save HAR data",
        menuShowHARSource: "Show HAR Source"
    }
}), require.def("domplate/popupMenu", ["domplate/domplate", "core/lib", "core/trace"], function(Domplate, Lib, Trace) {
    with(Domplate) {
        var Controller = {
                controllers: [],
                controllerContext: {
                    label: "controller context"
                },
                initialize: function(a) {
                    this.controllers = [], this.controllerContext = a || this.controllerContext
                },
                shutdown: function() {
                    this.removeControllers()
                },
                addController: function() {
                    for (var a = 0, b; b = arguments[a]; a++) {
                        typeof b[0] == "string" && (b[0] = $$(b[0], this.controllerContext));
                        var c = b[2];
                        b[2] = Lib.bind(c, this), b[3] = c, this.controllers.push(b), Lib.addEventListener.apply(this, b)
                    }
                },
                removeController: function() {
                    for (var a = 0, b; b = arguments[a]; a++) for (var c = 0, d; d = this.controllers[c]; c++) b[0] == d[0] && b[1] == d[1] && b[2] == d[3] && Lib.removeEventListener.apply(this, d)
                },
                removeControllers: function() {
                    for (var a = 0, b; b = this.controllers[a]; a++) Lib.removeEventListener.apply(this, b)
                }
            },
            menuItemProps = {
                "class": "$item.className",
                type: "$item.type",
                value: "$item.value",
                _command: "$item.command"
            };
        Lib.isIE6 && (menuItemProps.href = "javascript:void(0)");
        var MenuPlate = domplate({
            tag: DIV({
                "class": "popupMenu popupMenuShadow"
            }, DIV({
                "class": "popupMenuContent popupMenuShadowContent"
            }, FOR("item", "$object.items|memberIterator", TAG("$item.tag", {
                item: "$item"
            })))),
            itemTag: A(menuItemProps, "$item.label"),
            checkBoxTag: A(Lib.extend(menuItemProps, {
                checked: "$item.checked"
            }), "$item.label"),
            radioButtonTag: A(Lib.extend(menuItemProps, {
                selected: "$item.selected"
            }), "$item.label"),
            groupTag: A(Lib.extend(menuItemProps, {
                child: "$item.child"
            }), "$item.label"),
            shortcutTag: A(menuItemProps, "$item.label", SPAN({
                "class": "popupMenuShortcutKey"
            }, "$item.key")),
            separatorTag: SPAN({
                "class": "popupMenuSeparator"
            }),
            memberIterator: function(a) {
                var b = [];
                for (var c = 0, d = a.length; c < d; c++) {
                    var e = a[c];
                    if (typeof e == "string" && e.indexOf("-") == 0) {
                        b.push({
                            tag: this.separatorTag
                        });
                        continue
                    }
                    e = Lib.extend(e, {}), e.type = e.type || "", e.value = e.value || "";
                    var f = e.type;
                    e.tag = this.itemTag;
                    var g = e.className || "";
                    g += "popupMenuOption ", f == "checkbox" ? (g += "popupMenuCheckBox ", e.tag = this.checkBoxTag) : f == "radio" ? (g += "popupMenuRadioButton ", e.tag = this.radioButtonTag) : f == "group" ? (g += "popupMenuGroup ", e.tag = this.groupTag) : f == "shortcut" && (g += "popupMenuShortcut ", e.tag = this.shortcutTag), e.checked ? g += "popupMenuChecked " : e.selected && (g += "popupMenuRadioSelected "), e.disabled && (g += "popupMenuDisabled "), e.className = g, e.label = e.label, b.push(e)
                }
                return b
            }
        });

        function Menu(a) {
            if (!a.element) {
                a.getItems && (a.items = a.getItems()), a.items[0] == "-" && a.items.shift(), a.items[a.items.length - 1] == "-" && a.items.pop();
                var b = Lib.getBody(document);
                a.element = MenuPlate.tag.append({
                    object: a
                }, b, MenuPlate)
            }
            Lib.append(this, a), typeof this.element == "string" ? (this.id = this.element, this.element = $(this.id)) : this.id && (this.element.id = this.id), this.elementStyle = this.element.style, this.isVisible = !1, this.handleMouseDown = Lib.bind(this.handleMouseDown, this), this.handleMouseOver = Lib.bind(this.handleMouseOver, this), this.handleMouseOut = Lib.bind(this.handleMouseOut, this), this.handleWindowMouseDown = Lib.bind(this.handleWindowMouseDown, this)
        }
        var menuMap = {};
        Menu.prototype = Lib.extend(Controller, {
            initialize: function() {
                Controller.initialize.call(this), this.addController([this.element, "mousedown", this.handleMouseDown], [this.element, "mouseover", this.handleMouseOver])
            },
            destroy: function() {
                this.hide(), this.parentMenu && (this.parentMenu.childMenu = null), this.element.parentNode.removeChild(this.element), this.element = null, this.elementStyle = null, this.parentMenu = null, this.parentTarget = null
            },
            shutdown: function() {
                Controller.shutdown.call(this)
            },
            showPopup: function(a) {
                var b = Lib.isIE6 ? 1 : -4,
                    c = Lib.getElementBox(a),
                    d = {
                        top: 0,
                        left: 0
                    };
                this.show(c.left + b - d.left, c.top + c.height - 5 - d.top)
            },
            show: function(a, b) {
                this.initialize();
                if (!this.isVisible) {
                    a = a || 0, b = b || 0;
                    if (this.parentMenu) {
                        var c = this.parentMenu.childMenu;
                        c && c != this && c.destroy(), this.parentMenu.childMenu = this
                    } else Lib.addEventListener(document, "mousedown", this.handleWindowMouseDown);
                    this.elementStyle.display = "block", this.elementStyle.visibility = "hidden";
                    var d = Lib.getWindowSize();
                    a = Math.min(a, d.width - this.element.clientWidth - 10), a = Math.max(a, 0), b = Math.min(b, d.height - this.element.clientHeight - 10), b = Math.max(b, 0), this.elementStyle.left = a + "px", this.elementStyle.top = b + "px", this.elementStyle.visibility = "visible", this.isVisible = !0, Lib.isFunction(this.onShow) && this.onShow.apply(this, arguments)
                }
            },
            hide: function() {
                this.clearHideTimeout(), this.clearShowChildTimeout();
                this.isVisible && (this.elementStyle.display = "none", this.childMenu && (this.childMenu.destroy(), this.childMenu = null), this.parentTarget && Lib.removeClass(this.parentTarget, "popupMenuGroupSelected"), this.isVisible = !1, this.shutdown(), Lib.isFunction(this.onHide) && this.onHide.apply(this, arguments))
            },
            showChildMenu: function(a) {
                var b = a.getAttribute("child"),
                    c = this,
                    a = a;
                this.showChildTimeout = window.setTimeout(function() {
                    var d = Lib.getElementBox(a),
                        e = menuMap.hasOwnProperty(b) ? menuMap[b] : {
                            element: $(b)
                        },
                        f = new Menu(Lib.extend(e, {
                            parentMenu: c,
                            parentTarget: a
                        })),
                        g = Lib.isIE6 ? -1 : -6;
                    f.show(d.left + d.width + g, d.top - 6), Lib.setClass(a, "popupMenuGroupSelected")
                }, 350)
            },
            clearHideTimeout: function() {
                this.hideTimeout && (window.clearTimeout(this.hideTimeout), delete this.hideTimeout)
            },
            clearShowChildTimeout: function() {
                this.showChildTimeout && (window.clearTimeout(this.showChildTimeout), this.showChildTimeout = null)
            },
            handleMouseDown: function(a) {
                Lib.cancelEvent(a, !0);
                var b = this;
                while (b.parentMenu) b = b.parentMenu;
                var c = a.target || a.srcElement;
                c = Lib.getAncestorByClass(c, "popupMenuOption");
                if (!c || Lib.hasClass(c, "popupMenuGroup")) return !1;
                if (c && !Lib.hasClass(c, "popupMenuDisabled")) {
                    var d = c.getAttribute("type");
                    if (d == "checkbox") {
                        var e = c.getAttribute("checked"),
                            f = c.getAttribute("value"),
                            g = Lib.hasClass(c, "popupMenuChecked");
                        g ? (Lib.removeClass(c, "popupMenuChecked"), c.setAttribute("checked", "")) : (Lib.setClass(c, "popupMenuChecked"), c.setAttribute("checked", "true")), Lib.isFunction(this.onCheck) && this.onCheck.call(this, c, f, !g)
                    }
                    if (d == "radiobutton") {
                        var h = Lib.getElementsByClass(c.parentNode, "popupMenuRadioSelected"),
                            i = c.getAttribute("group");
                        for (var j = 0, k = h.length; j < k; j++) radio = h[j], radio.getAttribute("group") == i && (Lib.removeClass(radio, "popupMenuRadioSelected"), radio.setAttribute("selected", ""));
                        Lib.setClass(c, "popupMenuRadioSelected"), c.setAttribute("selected", "true")
                    }
                    var l = null,
                        m = c.command;
                    Lib.isFunction(m) ? l = m : typeof m == "string" && (l = this[m]);
                    var n = !0;
                    l && (n = l.call(this, c) !== !1), n && b.hide()
                }
                return !1
            },
            handleWindowMouseDown: function(a) {
                var b = a.target || a.srcElement;
                b = Lib.getAncestorByClass(b, "popupMenu"), b || (Lib.removeEventListener(document, "mousedown", this.handleWindowMouseDown), this.destroy())
            },
            handleMouseOver: function(a) {
                this.clearHideTimeout(), this.clearShowChildTimeout();
                var b = a.target || a.srcElement;
                b = Lib.getAncestorByClass(b, "popupMenuOption");
                if (b) {
                    var c = this.childMenu;
                    c && (Lib.removeClass(c.parentTarget, "popupMenuGroupSelected"), c.parentTarget != b && c.isVisible && (c.clearHideTimeout(), c.hideTimeout = window.setTimeout(function() {
                        c.destroy()
                    }, 300))), Lib.hasClass(b, "popupMenuGroup") && this.showChildMenu(b)
                }
            }
        }), Lib.append(Menu, {
            register: function(a) {
                menuMap[a.id] = a
            },
            check: function(a) {
                Lib.setClass(a, "popupMenuChecked"), a.setAttribute("checked", "true")
            },
            uncheck: function(a) {
                Lib.removeClass(a, "popupMenuChecked"), a.setAttribute("checked", "")
            },
            disable: function(a) {
                Lib.setClass(a, "popupMenuDisabled")
            },
            enable: function(a) {
                Lib.removeClass(a, "popupMenuDisabled")
            }
        });
        return Menu
    }
}), require.def("domplate/toolbar", ["domplate/domplate", "core/lib", "core/trace", "domplate/popupMenu"], function(Domplate, Lib, Trace, Menu) {
    with(Domplate) {
        var ToolbarTempl = domplate({
            tag: DIV({
                "class": "toolbar",
                onclick: "$onClick"
            }),
            buttonTag: SPAN({
                "class": "$button|getClassName toolbarButton",
                title: "$button.tooltiptext",
                $text: "$button|hasLabel",
                onclick: "$button|getCommand"
            }, "$button|getLabel"),
            dropDownTag: SPAN({
                "class": "$button|getClassName toolbarButton dropDown",
                _repObject: "$button",
                title: "$button.tooltiptext",
                $text: "$button|hasLabel",
                onclick: "$onDropDown"
            }, "$button|getLabel", SPAN({
                "class": "arrow"
            })),
            separatorTag: SPAN({
                "class": "toolbarSeparator",
                style: "color: gray;"
            }, "|"),
            hasLabel: function(a) {
                return a.label ? !0 : !1
            },
            getLabel: function(a) {
                return a.label ? a.label : ""
            },
            getClassName: function(a) {
                return a.className ? a.className : ""
            },
            getCommand: function(a) {
                return a.command ? a.command : function() {}
            },
            onClick: function(a) {
                var b = $.event.fix(a || window.event);
                Lib.cancelEvent(b)
            },
            onDropDown: function(a) {
                var b = $.event.fix(a || window.event),
                    c = b.target,
                    d = Lib.getAncestorByClass(c, "toolbarButton"),
                    e = d.repObject.items,
                    f = new Menu({
                        id: "toolbarContextMenu",
                        items: e
                    });
                f.showPopup(d)
            }
        });

        function Toolbar() {
            this.buttons = []
        }
        Toolbar.prototype = {
            addButton: function(a) {
                a.tooltiptext || (tooltiptext = ""), this.buttons.push(a)
            },
            removeButton: function(a) {
                for (var b = 0; b < this.buttons.length; b++) if (this.buttons[b].id == a) {
                    this.buttons.splice(b, 1);
                    break
                }
            },
            addButtons: function(a) {
                for (var b = 0; b < a.length; b++) this.addButton(a[b])
            },
            getButton: function(a) {
                for (var b = 0; b < this.buttons.length; b++) if (this.buttons[b].id == a) return this.buttons[b]
            },
            render: function(a) {
                if (this.buttons.length) {
                    this.element && (a = this.element.parentNode), this.element = ToolbarTempl.tag.replace({}, a);
                    for (var b = 0; b < this.buttons.length; b++) {
                        var c = this.buttons[b],
                            d = c.items ? ToolbarTempl.dropDownTag : ToolbarTempl.buttonTag,
                            e = c.tag ? c.tag : d,
                            f = e.append({
                                button: c
                            }, this.element);
                        c.initialize && c.initialize(f), b < this.buttons.length - 1 && ToolbarTempl.separatorTag.append({}, this.element)
                    }
                    return this.element
                }
            }
        };
        return Toolbar
    }
}), define("nls/pageTimeline", {
    root: {
        pageLoad: "Page Load",
        request: "Request",
        requests: "Requests",
        pageBarTooltip: "Click to select and include in statistics preview."
    }
}), require.def("tabs/pageTimeline", ["domplate/domplate", "core/lib", "core/trace", "i18n!nls/pageTimeline", "preview/harModel"], function(Domplate, Lib, Trace, Strings, HarModel) {
    with(Domplate) {
        function Timeline() {
            this.listeners = [], this.element = null, this.maxElapsedTime = -1, this.lastSelectedBar = null
        }
        Timeline.prototype = domplate({
            graphCols: FOR("page", "$input|getPages", TD({
                "class": "pageTimelineCol"
            }, DIV({
                "class": "pageBar",
                _input: "$input",
                _page: "$page",
                title: Strings.pageBarTooltip,
                style: "height: $page|getHeight\\px",
                onmousemove: "$onMouseMove",
                onclick: "$onClick"
            }))),
            pageGraph: TABLE({
                "class": "pageTimelineTable",
                cellpadding: 0,
                cellspacing: 0
            }, TBODY(TR({
                "class": "pageTimelineRow"
            }, TAG("$graphCols", {
                input: "$input"
            })))),
            tag: DIV({
                "class": "pageTimelineBody",
                style: "height: auto; display: none"
            }, TABLE({
                style: "margin: 7px;",
                cellpadding: 0,
                cellspacing: 0
            }, TBODY(TR(TD(TAG("$pageGraph", {
                input: "$input"
            }))), TR(TD({
                "class": "pageDescContainer",
                colspan: 2
            }))))),
            getHeight: function(a) {
                var b = 1,
                    c = a.pageTimings.onLoad;
                c > 0 && this.maxElapsedTime > 0 && (b = Math.round(c / this.maxElapsedTime * 100));
                return Math.max(1, b)
            },
            onClick: function(a) {
                var b = Lib.fixEvent(a),
                    c = b.target;
                if (Lib.hasClass(c, "pageBar")) {
                    var d = Lib.isControlClick(b),
                        e = Lib.isShiftClick(b),
                        f = Lib.getAncestorByClass(c, "pageTimelineRow");
                    !d && !e && Selection.unselectAll(f, c), Selection.toggle(c), this.selectionChanged()
                }
            },
            onMouseMove: function(a) {
                var b = Lib.fixEvent(a),
                    c = b.target;
                if (Lib.hasClass(c, "pageBar")) {
                    if (this.highlightedPage == c.page) return;
                    this.highlightedPage = c.page;
                    var d = Lib.getElementByClass(this.element, "pageDescContainer");
                    Timeline.Desc.render(d, c)
                }
            },
            getPages: function(a) {
                return a.log.pages ? a.log.pages : []
            },
            getPageBar: function(a) {
                if (this.element) {
                    var b = Lib.getElementByClass(this.element, "pageTimelineTable"),
                        c = b.firstChild.firstChild.firstChild;
                    while (c) {
                        if (c.firstChild.page == a) return c.firstChild;
                        c = c.nextSibling
                    }
                }
            },
            recalcLayout: function() {
                this.maxElapsedTime = 0;
                var a = this.maxElapsedTime,
                    b = Lib.getElementsByClass(this.element, "pageBar");
                for (var c = 0; c < b.length; c++) {
                    var d = b[c].page,
                        e = d.pageTimings.onLoad;
                    e > 0 && this.maxElapsedTime < e && (this.maxElapsedTime = e)
                }
                if (a != this.maxElapsedTime) for (var c = 0; c < b.length; c++) b[c].style.height = this.getHeight(b[c].page) + "px"
            },
            updateDesc: function() {
                if (this.isVisible()) if (!this.highlightedPage) {
                    var a = Lib.getElementByClass(this.element, "pageBar");
                    a && Lib.fireEvent(a, "mousemove")
                }
            },
            addListener: function(a) {
                this.listeners.push(a)
            },
            removeListener: function(a) {
                remove(this.listeners, a)
            },
            selectionChanged: function() {
                var a = this.getSelection();
                Lib.dispatch(this.listeners, "onSelectionChange", [a])
            },
            removeSelection: function() {
                if (this.element) {
                    var a = Lib.getElementByClass(this.element, "pageTimelineRow");
                    Selection.unselectAll(a), this.selectionChanged()
                }
            },
            getSelection: function() {
                if (!this.isVisible()) return [];
                var a = Lib.getElementByClass(this.element, "pageTimelineRow");
                return Selection.getSelection(a)
            },
            show: function(a) {
                this.isVisible() || (!a || $.browser.msie ? this.element.style.display = "block" : $(this.element).slideDown(), Lib.setClass(this.element, "opened"), this.updateDesc())
            },
            hide: function(a) {
                this.isVisible() && (!a || $.browser.msie ? this.element.style.display = "none" : $(this.element).slideUp(), Lib.removeClass(this.element, "opened"), this.removeSelection())
            },
            isVisible: function() {
                return Lib.hasClass(this.element, "opened")
            },
            toggle: function(a) {
                this.isVisible() ? this.hide(a) : this.show(a)
            },
            render: function(a) {
                this.element = this.tag.replace({
                    input: {
                        log: {
                            pages: []
                        }
                    }
                }, a, this), this.recalcLayout();
                return this.element
            },
            append: function(a, b) {
                if (this.element) {
                    var c = Lib.getElementByClass(this.element, "pageTimelineRow");
                    this.graphCols.insertCols({
                        input: a
                    }, c, this), this.recalcLayout(), this.updateDesc()
                }
            }
        }), Timeline.Desc = domplate({
            tag: DIV({
                "class": "pageDescBox"
            }, DIV({
                "class": "connector"
            }), DIV({
                "class": "desc"
            }, SPAN({
                "class": "summary"
            }, "$object|getSummary"), SPAN({
                "class": "time"
            }, "$object.page|getTime"), SPAN({
                "class": "title"
            }, "$object.page|getTitle"), PRE({
                "class": "comment"
            }, "$object.page|getComment"))),
            getSummary: function(a) {
                var b = "",
                    c = a.page.pageTimings.onLoad;
                c > 0 && (b += Strings.pageLoad + ": " + Lib.formatTime(c) + ", ");
                var d = HarModel.getPageEntries(a.input, a.page),
                    e = d.length;
                b += e + " " + (e == 1 ? Strings.request : Strings.requests);
                return b
            },
            getTime: function(a) {
                var b = Lib.parseISO8601(a.startedDateTime),
                    c = new Date(b);
                return c.toLocaleString()
            },
            getTitle: function(a) {
                return a.title
            },
            getComment: function(a) {
                return a.comment ? a.comment : ""
            },
            render: function(a, b) {
                var c = {
                        input: b.input,
                        page: b.page
                    },
                    d = this.tag.replace({
                        object: c
                    }, a),
                    e = Lib.$(d, "connector");
                e.style.marginLeft = b.parentNode.offsetLeft + "px";
                return d
            }
        });
        var Selection = {
            isSelected: function(a) {
                return Lib.hasClass(a, "selected")
            },
            toggle: function(a) {
                Lib.toggleClass(a, "selected")
            },
            select: function(a) {
                this.isSelected(a) || Lib.setClass(a, "selected")
            },
            unselect: function(a) {
                this.isSelected(a) && Lib.removeClass(a, "selected")
            },
            getSelection: function(a) {
                var b = [],
                    c = Lib.getElementsByClass(a, "pageBar");
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    this.isSelected(e) && b.push(e.page)
                }
                return b
            },
            unselectAll: function(a, b) {
                var c = Lib.getElementsByClass(a, "pageBar");
                for (var d = 0; d < c.length; d++) b != c[d] && this.unselect(c[d])
            }
        };
        return Timeline
    }
}), define("nls/pageStats", {
    root: {
        pieLabelDNS: "DNS",
        pieLabelSSL: "SSL/TLS",
        pieLabelConnect: "Connect",
        pieLabelBlocked: "Blocked",
        pieLabelSend: "Send",
        pieLabelWait: "Wait",
        pieLabelReceive: "Receive",
        pieLabelHTMLText: "HTML/Text",
        pieLabelJavaScript: "JavaScript",
        pieLabelCSS: "CSS",
        pieLabelImage: "Image",
        pieLabelFlash: "Flash",
        pieLabelOthers: "Others",
        pieLabelHeadersSent: "Headers Sent",
        pieLabelBodiesSent: "Bodies Sent",
        pieLabelHeadersReceived: "Headers Received",
        pieLabelBodiesReceived: "Bodies Received",
        pieLabelDownloaded: "Downloaded",
        pieLabelPartial: "Partial",
        pieLabelFromCache: "From Cache"
    }
}), require.def("domplate/infoTip", ["domplate/domplate", "core/lib", "core/trace"], function(Domplate, Lib, Trace) {
    with(Domplate) {
        var InfoTip = Lib.extend({
            listeners: [],
            maxWidth: 100,
            maxHeight: 80,
            infoTipMargin: 10,
            infoTipWindowPadding: 25,
            tags: domplate({
                infoTipTag: DIV({
                    "class": "infoTip"
                })
            }),
            initialize: function() {
                if (!$.browser.msie) {
                    var a = $("body");
                    a.bind("mouseover", Lib.bind(this.onMouseMove, this)), a.bind("mouseout", Lib.bind(this.onMouseOut, this)), a.bind("mousemove", Lib.bind(this.onMouseMove, this));
                    return this.infoTip = this.tags.infoTipTag.append({}, Lib.getBody(document))
                }
            },
            showInfoTip: function(a, b, c, d, e, f) {
                var g = Lib.getOverflowParent(b),
                    h = c + (g ? g.scrollLeft : 0),
                    i = Lib.dispatch2(this.listeners, "showInfoTip", [a, b, h, d, e, f]);
                if (i) {
                    var j = a.ownerDocument.documentElement,
                        k = j.clientWidth,
                        l = j.clientHeight;
                    c + a.offsetWidth + this.infoTipMargin > k - this.infoTipWindowPadding ? (a.style.left = "auto", a.style.right = k - c + this.infoTipMargin + "px") : (a.style.left = c + this.infoTipMargin + "px", a.style.right = "auto"), d + a.offsetHeight + this.infoTipMargin > l ? (a.style.top = Math.max(0, l - (a.offsetHeight + this.infoTipMargin)) + "px", a.style.bottom = "auto") : (a.style.top = d + this.infoTipMargin + "px", a.style.bottom = "auto"), a.setAttribute("active", "true")
                } else this.hideInfoTip(a)
            },
            hideInfoTip: function(a) {
                a && a.removeAttribute("active")
            },
            onMouseOut: function(a) {
                a.relatedTarget || this.hideInfoTip(this.infoTip)
            },
            onMouseMove: function(a) {
                this.infoTip.setAttribute("multiline", !1);
                var b = a.clientX,
                    c = a.clientY;
                this.showInfoTip(this.infoTip, a.target, b, c, a.rangeParent, a.rangeOffset)
            },
            populateTimingInfoTip: function(a, b) {
                this.tags.colorTag.replace({
                    rgbValue: b
                }, a);
                return !0
            },
            addListener: function(a) {
                this.listeners.push(a)
            },
            removeListener: function(a) {
                Lib.remove(this.listeners, a)
            }
        });
        InfoTip.initialize();
        return InfoTip
    }
}), require.def("tabs/pageStats", ["domplate/domplate", "core/lib", "i18n!nls/pageStats", "preview/harSchema", "preview/harModel", "core/cookies", "domplate/infoTip", "core/trace"], function(Domplate, Lib, Strings, HarSchema, HarModel, Cookies, InfoTip, Trace) {
    with(Domplate) {
        function Pie() {}
        Pie.prototype = {
            data: [],
            title: "",
            getLabelTooltipText: function(a) {
                return a.label + ": " + Lib.formatSize(a.value)
            },
            cleanUp: function() {
                for (var a = 0; a < this.data.length; a++) this.data[a].value = 0, this.data[a].count = 0
            }
        };

        function TimingPie() {}
        TimingPie.prototype = Lib.extend(Pie.prototype, {
            title: "Summary of request times.",
            data: [{
                value: 0,
                label: Strings.pieLabelBlocked,
                color: "rgb(228, 214, 193)"
            }, {
                value: 0,
                label: Strings.pieLabelDNS,
                color: "rgb(119, 192, 203)"
            }, {
                value: 0,
                label: Strings.pieLabelSSL,
                color: "rgb(168, 196, 173)"
            }, {
                value: 0,
                label: Strings.pieLabelConnect,
                color: "rgb(179, 222, 93)"
            }, {
                value: 0,
                label: Strings.pieLabelSend,
                color: "rgb(224, 171, 157)"
            }, {
                value: 0,
                label: Strings.pieLabelWait,
                color: "rgb(163, 150, 190)"
            }, {
                value: 0,
                label: Strings.pieLabelReceive,
                color: "rgb(194, 194, 194)"
            }],
            getLabelTooltipText: function(a) {
                return a.label + ": " + Lib.formatTime(a.value)
            }
        });

        function ContentPie() {}
        ContentPie.prototype = Lib.extend(Pie.prototype, {
            title: "Summary of content types.",
            data: [{
                value: 0,
                label: Strings.pieLabelHTMLText,
                color: "rgb(174, 234, 218)"
            }, {
                value: 0,
                label: Strings.pieLabelJavaScript,
                color: "rgb(245, 230, 186)"
            }, {
                value: 0,
                label: Strings.pieLabelCSS,
                color: "rgb(212, 204, 219)"
            }, {
                value: 0,
                label: Strings.pieLabelImage,
                color: "rgb(220, 171, 181)"
            }, {
                value: 0,
                label: Strings.pieLabelFlash,
                color: "rgb(166, 156, 222)"
            }, {
                value: 0,
                label: Strings.pieLabelOthers,
                color: "rgb(229, 171, 255)"
            }],
            getLabelTooltipText: function(a) {
                return a.count + "x " + a.label + ": " + Lib.formatSize(a.value)
            }
        });

        function TrafficPie() {}
        TrafficPie.prototype = Lib.extend(Pie.prototype, {
            title: "Summary of sent and received bodies & headers.",
            data: [{
                value: 0,
                label: Strings.pieLabelHeadersSent,
                color: "rgb(247, 179, 227)"
            }, {
                value: 0,
                label: Strings.pieLabelBodiesSent,
                color: "rgb(226, 160, 241)"
            }, {
                value: 0,
                label: Strings.pieLabelHeadersReceived,
                color: "rgb(166, 232, 166)"
            }, {
                value: 0,
                label: Strings.pieLabelBodiesReceived,
                color: "rgb(168, 196, 173)"
            }]
        });

        function CachePie() {}
        CachePie.prototype = Lib.extend(Pie.prototype, {
            title: "Comparison of downloaded data from the server and browser cache.",
            data: [{
                value: 0,
                label: Strings.pieLabelDownloaded,
                color: "rgb(182, 182, 182)"
            }, {
                value: 0,
                label: Strings.pieLabelPartial,
                color: "rgb(218, 218, 218)"
            }, {
                value: 0,
                label: Strings.pieLabelFromCache,
                color: "rgb(239, 239, 239)"
            }],
            getLabelTooltipText: function(a) {
                return a.count + "x " + a.label + ": " + Lib.formatSize(a.value)
            }
        });
        var timingPie = new TimingPie,
            contentPie = new ContentPie,
            trafficPie = new TrafficPie,
            cachePie = new CachePie,
            jsTypes = {
                "text/javascript": 1,
                "text/jscript": 1,
                "application/javascript": 1,
                "application/x-javascript": 1,
                "text/js": 1
            },
            htmlTypes = {
                "text/plain": 1,
                "text/html": 1
            },
            cssTypes = {
                "text/css": 1
            },
            imageTypes = {
                "image/png": 1,
                "image/jpeg": 1,
                "image/gif": 1
            },
            flashTypes = {
                "application/x-shockwave-flash": 1
            },
            jsonTypes = {
                "text/x-json": 1,
                "text/x-js": 1,
                "application/json": 1,
                "application/x-js": 1
            },
            xmlTypes = {
                "application/xml": 1,
                "application/xhtml+xml": 1,
                "application/vnd.mozilla.xul+xml": 1,
                "text/xml": 1,
                "text/xul": 1,
                "application/rdf+xml": 1
            },
            unknownTypes = {
                "text/xsl": 1,
                "text/sgml": 1,
                "text/rtf": 1,
                "text/x-setext": 1,
                "text/richtext": 1,
                "text/tab-separated-values": 1,
                "text/rdf": 1,
                "text/xif": 1,
                "text/ecmascript": 1,
                "text/vnd.curl": 1,
                "text/vbscript": 1,
                "view-source": 1,
                "view-fragment": 1,
                "application/x-httpd-php": 1,
                "application/ecmascript": 1,
                "application/http-index-format": 1
            };

        function Stats(a, b) {
            this.model = a, this.timeline = b, this.timeline.addListener(this)
        }
        Stats.prototype = domplate({
            element: null,
            tag: DIV({
                "class": "pageStatsBody",
                style: "height: auto; display: none"
            }),
            update: function(a) {
                if (this.isVisible()) {
                    this.cleanUp();
                    var b = HarSchema.timingsType.properties;
                    a.length || a.push(null);
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c],
                            e = d ? this.model.getPageEntries(d) : this.model.getAllEntries();
                        for (var f = 0; f < e.length; f++) {
                            var g = e[f];
                            if (!g.timings) continue;
                            timingPie.data[0].value += g.timings.blocked, timingPie.data[1].value += g.timings.dns, timingPie.data[2].value += g.timings.ssl > 0 ? g.timings.ssl : 0, timingPie.data[3].value += g.timings.connect, timingPie.data[4].value += g.timings.send, timingPie.data[5].value += g.timings.wait, timingPie.data[6].value += g.timings.receive, g.timings.ssl > 0 && (timingPie.data[3].value -= g.timings.ssl);
                            var h = g.response,
                                i = h.bodySize > 0 ? h.bodySize : 0,
                                j = h.content.mimeType,
                                k = j ? j.match(/^([^;]+)/)[1] : null,
                                j = k ? k : h.content.mimeType;
                            htmlTypes[j] ? (contentPie.data[0].value += i, contentPie.data[0].count++) : jsTypes[j] ? (contentPie.data[1].value += i, contentPie.data[1].count++) : cssTypes[j] ? (contentPie.data[2].value += i, contentPie.data[2].count++) : imageTypes[j] ? (contentPie.data[3].value += i, contentPie.data[3].count++) : flashTypes[j] ? (contentPie.data[4].value += i, contentPie.data[4].count++) : (contentPie.data[5].value += i, contentPie.data[5].count++), trafficPie.data[0].value += g.request.headersSize > 0 ? g.request.headersSize : 0, trafficPie.data[1].value += g.request.bodySize > 0 ? g.request.bodySize : 0, trafficPie.data[2].value += g.response.headersSize > 0 ? g.response.headersSize : 0, trafficPie.data[3].value += i, g.response.status == 206 ? (cachePie.data[1].value += i, cachePie.data[1].count++) : g.response.status == 304 ? (cachePie.data[2].value += i, cachePie.data[2].count++) : i > 0 && (cachePie.data[0].value += i, cachePie.data[0].count++)
                        }
                    }
                    Pie.draw(Lib.$(this.timingPie, "pieGraph"), timingPie), Pie.draw(Lib.$(this.contentPie, "pieGraph"), contentPie), Pie.draw(Lib.$(this.trafficPie, "pieGraph"), trafficPie), Pie.draw(Lib.$(this.cachePie, "pieGraph"), cachePie)
                }
            },
            cleanUp: function() {
                timingPie.cleanUp(), contentPie.cleanUp(), trafficPie.cleanUp(), cachePie.cleanUp()
            },
            showInfoTip: function(a, b, c, d) {
                return Pie.showInfoTip(a, b, c, d)
            },
            onSelectionChange: function(a) {
                this.update(a)
            },
            show: function(a) {
                if (!this.isVisible()) {
                    InfoTip.addListener(this), Lib.setClass(this.element, "opened"), !a || $.browser.msie ? this.element.style.display = "block" : $(this.element).slideDown();
                    var b = this.timeline.getSelection();
                    this.update(b)
                }
            },
            hide: function(a) {
                this.isVisible() && (InfoTip.removeListener(this), Lib.removeClass(this.element, "opened"), !a || $.browser.msie ? this.element.style.display = "none" : $(this.element).slideUp())
            },
            isVisible: function() {
                return Lib.hasClass(this.element, "opened")
            },
            toggle: function(a) {
                this.isVisible() ? this.hide(a) : this.show(a)
            },
            render: function(a) {
                this.element = this.tag.replace({}, a), this.timingPie = Pie.render(timingPie, this.element), this.contentPie = Pie.render(contentPie, this.element), this.trafficPie = Pie.render(trafficPie, this.element), this.cachePie = Pie.render(cachePie, this.element), this.cachePie.style.borderRight = 0;
                return this.element
            }
        });
        var Pie = domplate({
                tag: TABLE({
                    "class": "pagePieTable",
                    cellpadding: 0,
                    cellspacing: 0,
                    _repObject: "$pie"
                }, TBODY(TR(TD({
                    "class": "pieBox",
                    title: "$pie.title"
                }), TD(FOR("item", "$pie.data", DIV({
                    "class": "pieLabel",
                    _repObject: "$item"
                }, SPAN({
                    "class": "box",
                    style: "background-color: $item.color"
                }, "&nbsp;"), SPAN({
                    "class": "label"
                }, "$item.label"))))))),
                render: function(a, b) {
                    var c = this.tag.append({
                            pie: a
                        }, b),
                        d = Lib.$(c, "pieBox"),
                        e = document.createElement("canvas");
                    e.setAttribute("class", "pieGraph "), e.setAttribute("height", "100"), e.setAttribute("width", "100"), d.appendChild(e), typeof G_vmlCanvasManager != "undefined" && G_vmlCanvasManager.initElement(e);
                    return c
                },
                draw: function(a, b) {
                    if (a && a.getContext) {
                        var c = a.getContext("2d"),
                            d = Math.min(a.width, a.height) / 2,
                            e = [a.width / 2, a.height / 2];
                        c.clearRect(0, 0, a.width, a.height);
                        var f = 0,
                            g = b.data,
                            h = 0;
                        for (var i in g) h += g[i].value;
                        if (!h) {
                            c.beginPath(), c.moveTo(e[0], e[1]), c.arc(e[0], e[1], d, 0, Math.PI * 2, !1), c.closePath(), c.fillStyle = "rgb(229,236,238)", c.lineStyle = "lightgray", c.fill();
                            return
                        }
                        for (var i = 0; i < g.length; i++) {
                            var j = g[i].value / h;
                            c.beginPath(), c.moveTo(e[0], e[1]), c.arc(e[0], e[1], d, Math.PI * (-.5 + 2 * f), Math.PI * (-.5 + 2 * (f + j)), !1), c.lineTo(e[0], e[1]), c.closePath(), c.fillStyle = g[i].color, c.fill(), f += j
                        }
                    }
                },
                showInfoTip: function(a, b, c, d) {
                    var e = Lib.getAncestorByClass(b, "pagePieTable");
                    if (!e) return !1;
                    var f = Lib.getAncestorByClass(b, "pieLabel");
                    if (f) {
                        PieInfoTip.render(e.repObject, f.repObject, a);
                        return !0
                    }
                }
            }),
            PieInfoTip = domplate({
                tag: DIV({
                    "class": "pieLabelInfoTip"
                }, "$text"),
                getText: function(a) {
                    return a.label + ": " + formatTime(a.value)
                },
                render: function(a, b, c) {
                    var d = a.getLabelTooltipText(b);
                    this.tag.replace({
                        text: d
                    }, c)
                }
            });
        return Stats
    }
}), define("nls/requestList", {
    root: {
        fromCache: "From Cache",
        menuBreakLayout: "Break Timeline Layout",
        menuOpenRequestInWindow: "Open Request in New Window",
        menuOpenResponseInWindow: "Open Response in New Window",
        request: "Request",
        requests: "Requests",
        tooltipSize: "%S (%S bytes)",
        tooltipZippedSize: "%S (%S bytes) - compressed",
        tooltipUnzippedSize: "%S (%S bytes) - uncompressed",
        unknownSize: "Unknown size",
        "request.Started": "Request start time since the beginning",
        "request.phases.label": "Request phases start and elapsed time relative to the request start:",
        "request.phase.Resolving": "DNS Lookup",
        "request.phase.Connecting": "Connecting",
        "request.phase.Blocking": "Blocking",
        "request.phase.Sending": "Sending",
        "request.phase.Waiting": "Waiting",
        "request.phase.Receiving": "Receiving",
        "request.timings.label": "Event timing relative to the request start:",
        ContentLoad: "DOM Loaded",
        WindowLoad: "Page Loaded",
        "page.event.Load": "Page Loaded",
        menuBreakTimeline: "Break Timeline Layout",
        menuOpenRequest: "Open Request in New Window",
        menuOpenResponse: "Open Response in New Window"
    }
}), define("nls/requestBody", {
    root: {
        RequestHeaders: "Request Headers",
        ResponseHeaders: "Response Headers",
        RequestCookies: "Request Cookies",
        ResponseCookies: "Response Cookies",
        URLParameters: "Params",
        Headers: "Headers",
        Post: "Post",
        Put: "Put",
        Cookies: "Cookies",
        Response: "Response",
        Cache: "Cache",
        HTML: "HTML",
        DataURL: "Data URL"
    }
}), require.def("core/dragdrop", ["core/lib"], function(a) {
    function d(a) {
        return isNaN(window.scrollX) ? new c(a.clientX + document.documentElement.scrollLeft + document.body.scrollLeft, a.clientY + document.documentElement.scrollTop + document.body.scrollTop) : new c(a.clientX + window.scrollX, a.clientY + window.scrollY)
    }
    function c(a, b) {
        this.x = a, this.y = b, this.Add = function(a) {
            var b = new c(this.x, this.y);
            a != null && (isNaN(a.x) || (b.x += a.x), isNaN(a.y) || (b.y += a.y));
            return b
        }, this.Subtract = function(a) {
            var b = new c(this.x, this.y);
            a != null && (isNaN(a.x) || (b.x -= a.x), isNaN(a.y) || (b.y -= a.y));
            return b
        }, this.Bound = function(a, b) {
            var c = this.Max(a);
            return c.Min(b)
        }, this.Check = function() {
            var a = new c(this.x, this.y);
            isNaN(a.x) && (a.x = 0), isNaN(a.y) && (a.y = 0);
            return a
        }, this.Apply = function(a) {
            typeof a == "string" && (a = document.getElementById(a));
            a && (isNaN(this.x) || (a.style.left = this.x + "px"), isNaN(this.y) || (a.style.top = this.y + "px"))
        }
    }
    function b(b, c) {
        this.element = b, this.handle = b, this.callbacks = c, this.cursorStartPos = null, this.cursorLastPos = null, this.dragging = !1, this.onDragStart = a.bind(this.onDragStart, this), this.onDragOver = a.bind(this.onDragOver, this), this.onDrop = a.bind(this.onDrop, this), a.addEventListener(this.element, "mousedown", this.onDragStart, !1), this.active = !0
    }
    b.prototype = {
        onDragStart: function(b) {
            var c = a.fixEvent(b);
            this.dragging || (this.callbacks.onDragStart && this.callbacks.onDragStart(this), this.dragging = !0, this.cursorStartPos = d(c), this.cursorLastPos = this.cursorStartPos, a.addEventListener(this.element.ownerDocument, "mousemove", this.onDragOver, !1), a.addEventListener(this.element.ownerDocument, "mouseup", this.onDrop, !1), a.cancelEvent(c))
        },
        onDragOver: function(b) {
            if (this.dragging) {
                var c = a.fixEvent(b);
                a.cancelEvent(c);
                var e = d(c),
                    e = e.Subtract(this.cursorStartPos);
                if (this.cursorLastPos.x == e.x && this.cursorLastPos.y == e.y) return;
                if (this.callbacks.onDragOver != null) {
                    var f = this.callbacks.onDragOver(e, this);
                    this.cursorLastPos = e
                }
            }
        },
        onDrop: function(b) {
            if (this.dragging) {
                var c = a.fixEvent(b);
                a.cancelEvent(c), this.dragStop()
            }
        },
        dragStop: function() {
            this.dragging && (a.removeEventListener(this.element.ownerDocument, "mousemove", this.onDragOver, !1), a.removeEventListener(this.element.ownerDocument, "mouseup", this.onDrop, !1), this.cursorStartPos = null, this.cursorLastPos = null, this.callbacks.onDrop != null && this.callbacks.onDrop(this), this.dragging = !1)
        },
        destroy: function() {
            a.removeEventListener(this.element, "mousedown", this.onDragStart, !1), this.active = !1, this.dragging && this.dragStop()
        }
    };
    var e = {};
    e.Tracker = b;
    return e
}), require.def("syntax-highlighter/shCore", [], function() {
    var a = {
        sh: {
            Toolbar: {},
            Utils: {},
            RegexLib: {},
            Brushes: {},
            Strings: {
                AboutDialog: '<html><head><title>About...</title></head><body class="dp-about"><table cellspacing="0"><tr><td class="copy"><p class="title">dp.SyntaxHighlighter</div><div class="para">Version: {V}</p><p><a href="http://www.dreamprojections.com/syntaxhighlighter/?ref=about" target="_blank">http://www.dreamprojections.com/syntaxhighlighter</a></p>&copy;2004-2007 Alex Gorbatchev.</td></tr><tr><td class="footer"><input type="button" class="close" value="OK" onClick="window.close()"/></td></tr></table></body></html>'
            },
            ClipboardSwf: null,
            Version: "1.5.1"
        }
    };
    a.SyntaxHighlighter = a.sh, a.sh.Toolbar.Commands = {
        ExpandSource: {
            label: "+ expand source",
            check: function(a) {
                return a.collapse
            },
            func: function(a, b) {
                a.parentNode.removeChild(a), b.div.className = b.div.className.replace("collapsed", "")
            }
        },
        ViewSource: {
            label: "view plain",
            func: function(b, c) {
                var d = a.sh.Utils.FixForBlogger(c.originalCode).replace(/</g, "&lt;"),
                    e = window.open("", "_blank", "width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=0");
                e.document.write('<textarea style="width:99%;height:99%">' + d + "</textarea>"), e.document.close()
            }
        },
        CopyToClipboard: {
            label: "copy to clipboard",
            check: function() {
                return window.clipboardData != null || a.sh.ClipboardSwf != null
            },
            func: function(b, c) {
                var d = a.sh.Utils.FixForBlogger(c.originalCode).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                if (window.clipboardData) window.clipboardData.setData("text", d);
                else if (a.sh.ClipboardSwf != null) {
                    var e = c.flashCopier;
                    e == null && (e = document.createElement("div"), c.flashCopier = e, c.div.appendChild(e)), e.innerHTML = '<embed src="' + a.sh.ClipboardSwf + '" FlashVars="clipboard=' + encodeURIComponent(d) + '" width="0" height="0" type="application/x-shockwave-flash"></embed>'
                }
                alert("The code is in your clipboard now")
            }
        },
        PrintSource: {
            label: "print",
            func: function(b, c) {
                var d = document.createElement("IFRAME"),
                    e = null;
                d.style.cssText = "position:absolute;width:0px;height:0px;left:-500px;top:-500px;", document.body.appendChild(d), e = d.contentWindow.document, a.sh.Utils.CopyStyles(e, window.document), e.write('<div class="' + c.div.className.replace("collapsed", "") + ' printing">' + c.div.innerHTML + "</div>"), e.close(), d.contentWindow.focus(), d.contentWindow.print(), alert("Printing..."), document.body.removeChild(d)
            }
        },
        About: {
            label: "?",
            func: function(b) {
                var c = window.open("", "_blank", "dialog,width=300,height=150,scrollbars=0"),
                    d = c.document;
                a.sh.Utils.CopyStyles(d, window.document), d.write(a.sh.Strings.AboutDialog.replace("{V}", a.sh.Version)), d.close(), c.focus()
            }
        }
    }, a.sh.Toolbar.Create = function(b) {
        var c = document.createElement("DIV");
        c.className = "tools";
        for (var d in a.sh.Toolbar.Commands) {
            var e = a.sh.Toolbar.Commands[d];
            if (e.check != null && !e.check(b)) continue;
            c.innerHTML += '<a href="#" onclick="dp.sh.Toolbar.Command(\'' + d + "',this);return false;\">" + e.label + "</a>"
        }
        return c
    }, a.sh.Toolbar.Command = function(b, c) {
        var d = c;
        while (d != null && d.className.indexOf("dp-highlighter") == -1) d = d.parentNode;
        d != null && a.sh.Toolbar.Commands[b].func(c, d.highlighter)
    }, a.sh.Utils.CopyStyles = function(a, b) {
        var c = b.getElementsByTagName("link");
        for (var d = 0; d < c.length; d++) c[d].rel.toLowerCase() == "stylesheet" && a.write('<link type="text/css" rel="stylesheet" href="' + c[d].href + '"></link>')
    }, a.sh.Utils.FixForBlogger = function(b) {
        return a.sh.isBloggerMode == !0 ? b.replace(/<br\s*\/?>|&lt;br\s*\/?&gt;/gi, "\n") : b
    }, a.sh.RegexLib = {
        MultiLineCComments: new RegExp("/\\*[\\s\\S]*?\\*/", "gm"),
        SingleLineCComments: new RegExp("//.*$", "gm"),
        SingleLinePerlComments: new RegExp("#.*$", "gm"),
        DoubleQuotedString: new RegExp('"(?:\\.|(\\\\\\")|[^\\""\\n])*"', "g"),
        SingleQuotedString: new RegExp("'(?:\\.|(\\\\\\')|[^\\''\\n])*'", "g")
    }, a.sh.Match = function(a, b, c) {
        this.value = a, this.index = b, this.length = a.length, this.css = c
    }, a.sh.Highlighter = function() {
        this.noGutter = !1, this.addControls = !0, this.collapse = !1, this.tabsToSpaces = !0, this.wrapColumn = 80, this.showColumns = !0
    }, a.sh.Highlighter.SortCallback = function(a, b) {
        if (a.index < b.index) return -1;
        if (a.index > b.index) return 1;
        if (a.length < b.length) return -1;
        if (a.length > b.length) return 1;
        return 0
    }, a.sh.Highlighter.prototype.CreateElement = function(a) {
        var b = document.createElement(a);
        b.highlighter = this;
        return b
    }, a.sh.Highlighter.prototype.GetMatches = function(b, c) {
        var d = 0,
            e = null;
        while ((e = b.exec(this.code)) != null) this.matches[this.matches.length] = new a.sh.Match(e[0], e.index, c)
    }, a.sh.Highlighter.prototype.AddBit = function(a, b) {
        if (a != null && a.length != 0) {
            var c = this.CreateElement("SPAN");
            a = a.replace(/ /g, "&nbsp;"), a = a.replace(/</g, "&lt;"), a = a.replace(/\n/gm, "&nbsp;<br>");
            if (b != null) if (/br/gi.test(a)) {
                var d = a.split("&nbsp;<br>");
                for (var e = 0; e < d.length; e++) c = this.CreateElement("SPAN"), c.className = b, c.innerHTML = d[e], this.div.appendChild(c), e + 1 < d.length && this.div.appendChild(this.CreateElement("BR"))
            } else c.className = b, c.innerHTML = a, this.div.appendChild(c);
            else c.innerHTML = a, this.div.appendChild(c)
        }
    }, a.sh.Highlighter.prototype.IsInside = function(a) {
        if (a == null || a.length == 0) return !1;
        for (var b = 0; b < this.matches.length; b++) {
            var c = this.matches[b];
            if (c == null) continue;
            if (a.index > c.index && a.index < c.index + c.length) return !0
        }
        return !1
    }, a.sh.Highlighter.prototype.ProcessRegexList = function() {
        for (var a = 0; a < this.regexList.length; a++) this.GetMatches(this.regexList[a].regex, this.regexList[a].css)
    }, a.sh.Highlighter.prototype.ProcessSmartTabs = function(a) {
        function g(a, b) {
            if (a.indexOf(e) == -1) return a;
            var c = 0;
            while ((c = a.indexOf(e)) != -1) {
                var d = b - c % b;
                a = f(a, c, d)
            }
            return a
        }
        function f(a, b, c) {
            var d = a.substr(0, b),
                e = a.substr(b + 1, a.length),
                f = "";
            for (var g = 0; g < c; g++) f += " ";
            return d + f + e
        }
        var b = a.split("\n"),
            c = "",
            d = 4,
            e = "\t";
        for (var h = 0; h < b.length; h++) c += g(b[h], d) + "\n";
        return c
    }, a.sh.Highlighter.prototype.SwitchToList = function() {
        var b = this.div.innerHTML.replace(/<(br)\/?>/gi, "\n"),
            c = b.split("\n");
        this.addControls == !0 && this.bar.appendChild(a.sh.Toolbar.Create(this));
        if (this.showColumns) {
            var d = this.CreateElement("div"),
                e = this.CreateElement("div"),
                f = 10,
                g = 1;
            while (g <= 150) g % f == 0 ? (d.innerHTML += g, g += (g + "").length) : (d.innerHTML += "&middot;", g++);
            e.className = "columns", e.appendChild(d), this.bar.appendChild(e)
        }
        for (var g = 0, h = this.firstLine; g < c.length - 1; g++, h++) {
            var i = this.CreateElement("LI"),
                j = this.CreateElement("SPAN");
            i.className = g % 2 == 0 ? "alt" : "", j.innerHTML = c[g] + "&nbsp;", i.appendChild(j), this.ol.appendChild(i)
        }
        this.div.innerHTML = ""
    }, a.sh.Highlighter.prototype.Highlight = function(b) {
        function f(a, b, c) {
            return a.substr(b, c - b)
        }
        function e(b) {
            var d = a.sh.Utils.FixForBlogger(b).split("\n"),
                e = [],
                f = new RegExp("^\\s*", "g"),
                g = 1e3;
            for (var h = 0; h < d.length && g > 0; h++) {
                if (c(d[h]).length == 0) continue;
                var i = f.exec(d[h]);
                i != null && i.length > 0 && (g = Math.min(i[0].length, g))
            }
            if (g > 0) for (var h = 0; h < d.length; h++) d[h] = d[h].substr(g);
            return d.join("\n")
        }
        function d(a) {
            return a.replace(/\n*$/, "").replace(/^\n*/, "")
        }
        function c(a) {
            return a.replace(/^\s*(.*?)[\s\n]*$/g, "$1")
        }
        var g = 0;
        b == null && (b = ""), this.originalCode = b, this.code = d(e(b)), this.div = this.CreateElement("DIV"), this.bar = this.CreateElement("DIV"), this.ol = this.CreateElement("OL"), this.matches = [], this.div.className = "dp-highlighter", this.div.highlighter = this, this.bar.className = "bar", this.ol.start = this.firstLine, this.CssClass != null && (this.ol.className = this.CssClass), this.collapse && (this.div.className += " collapsed"), this.noGutter && (this.div.className += " nogutter"), this.tabsToSpaces == !0 && (this.code = this.ProcessSmartTabs(this.code)), this.ProcessRegexList();
        if (this.matches.length == 0) this.AddBit(this.code, null), this.SwitchToList(), this.div.appendChild(this.bar), this.div.appendChild(this.ol);
        else {
            this.matches = this.matches.sort(a.sh.Highlighter.SortCallback);
            for (var h = 0; h < this.matches.length; h++) this.IsInside(this.matches[h]) && (this.matches[h] = null);
            for (var h = 0; h < this.matches.length; h++) {
                var i = this.matches[h];
                if (i == null || i.length == 0) continue;
                this.AddBit(f(this.code, g, i.index), null), this.AddBit(i.value, i.css), g = i.index + i.length
            }
            this.AddBit(this.code.substr(g), null), this.SwitchToList(), this.div.appendChild(this.bar), this.div.appendChild(this.ol)
        }
    }, a.sh.Highlighter.prototype.GetKeywords = function(a) {
        return "\\b" + a.replace(/ /g, "\\b|\\b") + "\\b"
    }, a.sh.BloggerMode = function() {
        a.sh.isBloggerMode = !0
    }, a.sh.HighlightAll = function(b, c, d, e, f, g) {
        function k(a, b, c) {
            var d = document.getElementsByTagName(c);
            for (var e = 0; e < d.length; e++) d[e].getAttribute("name") == b && a.push(d[e])
        }
        function j(a, b, c) {
            var d = new RegExp("^" + a + "\\[(\\w+)\\]$", "gi"),
                e = null;
            for (var f = 0; f < b.length; f++) if ((e = d.exec(b[f])) != null) return e[1];
            return c
        }
        function i(a, b) {
            for (var c = 0; c < b.length; c++) if (b[c] == a) return !0;
            return !1
        }
        function h() {
            var a = arguments;
            for (var b = 0; b < a.length; b++) {
                if (a[b] == null) continue;
                if (typeof a[b] == "string" && a[b] != "") return a[b] + "";
                if (typeof a[b] == "object" && a[b].value != "") return a[b].value + ""
            }
            return null
        }
        var l = [],
            m = null,
            n = {},
            o = "innerHTML";
        typeof b == "string" ? (k(l, b, "pre"), k(l, b, "textarea")) : l.push(b);
        if (l.length != 0) {
            for (var p in a.sh.Brushes) {
                var q = a.sh.Brushes[p].Aliases;
                if (q == null) continue;
                for (var r = 0; r < q.length; r++) n[q[r]] = p
            }
            for (var r = 0; r < l.length; r++) {
                var s = l[r],
                    t = h(s.attributes["class"], s.className, s.attributes.language, s.language),
                    u = "";
                if (t == null) continue;
                t = t.split(":"), u = t[0].toLowerCase();
                if (n[u] == null) continue;
                m = new a.sh.Brushes[n[u]], s.style.display = "none", m.noGutter = c == null ? i("nogutter", t) : !c, m.addControls = d == null ? !i("nocontrols", t) : d, m.collapse = e == null ? i("collapse", t) : e, m.showColumns = g == null ? i("showcolumns", t) : g;
                var v = document.getElementsByTagName("head")[0];
                if (m.Style && v) {
                    var w = document.createElement("style");
                    w.setAttribute("type", "text/css");
                    if (w.styleSheet) w.styleSheet.cssText = m.Style;
                    else {
                        var x = document.createTextNode(m.Style);
                        w.appendChild(x)
                    }
                    v.appendChild(w)
                }
                m.firstLine = f == null ? parseInt(j("firstline", t, 1)) : f, m.Highlight(s[o]), m.source = s, s.parentNode.insertBefore(m.div, s)
            }
        }
    }, a.sh.Brushes.JScript = function() {
        var b = "abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends false final finally float for function goto if implements import in instanceof int interface long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var void volatile while with";
        this.regexList = [{
            regex: a.sh.RegexLib.SingleLineCComments,
            css: "comment"
        }, {
            regex: a.sh.RegexLib.MultiLineCComments,
            css: "comment"
        }, {
            regex: a.sh.RegexLib.DoubleQuotedString,
            css: "string"
        }, {
            regex: a.sh.RegexLib.SingleQuotedString,
            css: "string"
        }, {
            regex: new RegExp("^\\s*#.*", "gm"),
            css: "preprocessor"
        }, {
            regex: new RegExp(this.GetKeywords(b), "gm"),
            css: "keyword"
        }], this.CssClass = "dp-c"
    }, a.sh.Brushes.JScript.prototype = new a.sh.Highlighter, a.sh.Brushes.JScript.Aliases = ["js", "jscript", "javascript"];
    return a
}), require.def("preview/requestBody", ["domplate/domplate", "i18n!nls/requestBody", "core/lib", "core/cookies", "domplate/tabView", "core/dragdrop", "syntax-highlighter/shCore"], function(Domplate, Strings, Lib, Cookies, TabView, DragDrop, dp) {
    with(Domplate) {
        function RequestBody() {}
        RequestBody.prototype = domplate({
            render: function(a, b) {
                var c = new TabView("requestBody");
                b.response.headers.length > 0 && c.appendTab(new HeadersTab(b)), b.request.queryString && b.request.queryString.length && c.appendTab(new ParamsTab(b)), b.request.postData && c.appendTab(new SentDataTab(b, b.request.method)), b.response.content.text && b.response.content.text.length > 0 && c.appendTab(new ResponseTab(b)), this.showCache(b) && c.appendTab(new CacheTab(b)), this.showHtml(b) && c.appendTab(new HtmlTab(b)), this.showDataURL(b) && c.appendTab(new DataURLTab(b));
                var d = c.render(a);
                c.tabs.length > 0 && c.selectTabByName(c.tabs[0].id);
                return d
            },
            showCache: function(a) {
                if (!a.cache) return !1;
                if (!a.cache.afterRequest) return !1;
                if (a.category == "image") return !1;
                return !0
            },
            showHtml: function(a) {
                return a.response.content.mimeType == "text/html" || a.mimeType == "application/xhtml+xml"
            },
            showDataURL: function(a) {
                return a.request.url.indexOf("data:") == 0
            }
        });

        function HeadersTab(a) {
            this.file = a
        }
        HeadersTab.prototype = domplate(TabView.Tab.prototype, {
            id: "Headers",
            label: Strings.Headers,
            bodyTag: TABLE({
                "class": "netInfoHeadersText netInfoText netInfoHeadersTable",
                cellpadding: 0,
                cellspacing: 0
            }, TBODY(TR({
                "class": "netInfoResponseHeadersTitle"
            }, TD({
                colspan: 2
            }, DIV({
                "class": "netInfoHeadersGroup"
            }, Strings.ResponseHeaders))), TR({
                "class": "netInfoRequestHeadersTitle"
            }, TD({
                colspan: 2
            }, DIV({
                "class": "netInfoHeadersGroup"
            }, Strings.RequestHeaders))))),
            headerDataTag: FOR("param", "$headers", TR(TD({
                "class": "netInfoParamName"
            }, "$param.name"), TD({
                "class": "netInfoParamValue"
            }, PRE("$param|getParamValue")))),
            getParamValue: function(a) {
                return Lib.wrapText(a.value, !0)
            },
            onUpdateBody: function(a, b) {
                this.file.response.headers && this.insertHeaderRows(b, this.file.response.headers, "Headers", "ResponseHeaders"), this.file.request.headers && this.insertHeaderRows(b, this.file.request.headers, "Headers", "RequestHeaders")
            },
            insertHeaderRows: function(a, b, c, d) {
                var e = Lib.getElementByClass(a, "netInfo" + c + "Table"),
                    f = Lib.getElementByClass(e, "netInfo" + d + "Title");
                b.length ? (this.headerDataTag.insertRows({
                    headers: b
                }, f ? f : a), Lib.removeClass(f, "collapsed")) : Lib.setClass(f, "collapsed")
            }
        });

        function ResponseTab(a) {
            this.file = a
        }
        ResponseTab.prototype = domplate(TabView.Tab.prototype, {
            id: "Response",
            label: Strings.Response,
            bodyTag: DIV({
                "class": "netInfoResponseText netInfoText"
            }, PRE({
                "class": "javascript:nocontrols:nogutter:",
                name: "code"
            })),
            onUpdateBody: function(a, b) {
                var c = Lib.getElementByClass(b, "netInfoResponseText");
                if (this.file.category == "image") {
                    Lib.clearNode(c);
                    var d = b.ownerDocument.createElement("img");
                    d.src = this.file.href, c.appendChild(d, c)
                } else {
                    Lib.clearNode(c.firstChild);
                    var e = this.file.response.content.text,
                        f = this.file.response.content.mimeType;
                    f == "application/javascript" || f == "text/javascript" || f == "application/x-javascript" || f == "text/ecmascript" || f == "application/ecmascript" ? (c.firstChild.innerHTML = e, dp.SyntaxHighlighter.HighlightAll(c.firstChild)) : Lib.insertWrappedText(e, c.firstChild)
                }
            }
        });

        function ParamsTab(a) {
            this.file = a
        }
        ParamsTab.prototype = domplate(HeadersTab.prototype, {
            id: "Params",
            label: Strings.URLParameters,
            bodyTag: TABLE({
                "class": "netInfoParamsText netInfoText netInfoParamsTable",
                cellpadding: 0,
                cellspacing: 0
            }, TBODY()),
            onUpdateBody: function(a, b) {
                if (this.file.request.queryString) {
                    var c = Lib.getElementByClass(b, "netInfoParamsText");
                    this.insertHeaderRows(c, this.file.request.queryString, "Params")
                }
            }
        });

        function SentDataTab(a, b) {
            b = b.charAt(0).toUpperCase() + b.slice(1).toLowerCase(), this.file = a, this.id = b, this.label = Strings[b]
        }
        SentDataTab.prototype = domplate(HeadersTab.prototype, {
            bodyTag: DIV({
                "class": "netInfo$tab.id\\Text netInfoText"
            }, TABLE({
                "class": "netInfo$tab.id\\Table",
                cellpadding: 0,
                cellspacing: 0
            }, TBODY())),
            onUpdateBody: function(a, b) {
                var c = this.file.request.postData;
                if (c) {
                    var d = Lib.getElementByClass(b, "netInfo" + this.id + "Text");
                    c.mimeType == "application/x-www-form-urlencoded" ? this.insertHeaderRows(d, c.params, this.id) : Lib.insertWrappedText(c.text, d)
                }
            }
        });

        function CookiesTab(a) {
            this.file = a
        }
        CookiesTab.prototype = domplate(HeadersTab.prototype, {
            id: "Cookies",
            label: Strings.Cookies,
            bodyTag: DIV({
                "class": "netInfoCookiesText netInfoText"
            }, TABLE({
                "class": "netInfoCookiesTable",
                cellpadding: 0,
                cellspacing: 0
            }, TBODY(TR({
                "class": "netInfoResponseCookiesTitle"
            }, TD({
                colspan: 2
            }, DIV({
                "class": "netInfoCookiesGroup"
            }, Strings.ResponseCookies))), TR({
                "class": "netInfoRequestCookiesTitle"
            }, TD({
                colspan: 2
            }, DIV({
                "class": "netInfoCookiesGroup"
            }, Strings.RequestCookies)))))),
            onUpdateBody: function(a, b) {
                if (file.response.cookies) {
                    var c = Lib.getElementByClass(b, "netInfoParamsText");
                    this.insertHeaderRows(c, file.response.cookies, "Cookies", "ResponseCookies")
                }
                if (file.request.cookies) {
                    var c = Lib.getElementByClass(b, "netInfoParamsText");
                    this.insertHeaderRows(c, file.request.cookies, "Cookies", "RequestCookies")
                }
            }
        });

        function CacheTab(a) {
            this.file = a
        }
        CacheTab.prototype = domplate(HeadersTab.prototype, {
            id: "Cache",
            label: Strings.Cache,
            bodyTag: DIV({
                "class": "netInfoCacheText netInfoText"
            }, TABLE({
                "class": "netInfoCacheTable",
                cellpadding: 0,
                cellspacing: 0
            }, TBODY())),
            onUpdateBody: function(a, b) {
                if (this.file.cache && this.file.cache.afterRequest) {
                    var c = this.file.cache.afterRequest,
                        d = [];
                    for (var e in c) d.push({
                        name: e,
                        value: c[e]
                    });
                    this.insertHeaderRows(b, d, "Cache")
                }
            }
        });

        function HtmlTab(a) {
            this.file = a
        }
        HtmlTab.prototype = domplate(HeadersTab.prototype, {
            id: "HTML",
            label: Strings.HTML,
            bodyTag: DIV({
                "class": "netInfoHtmlText netInfoText"
            }, IFRAME({
                "class": "netInfoHtmlPreview",
                onload: "$onLoad"
            }), DIV({
                "class": "htmlPreviewResizer"
            })),
            onUpdateBody: function(a, b) {
                this.preview = Lib.getElementByClass(b, "netInfoHtmlPreview");
                var c = parseInt(Cookies.getCookie("htmlPreviewHeight"));
                isNaN(c) || (this.preview.style.height = c + "px");
                var d = Lib.getElementByClass(b, "htmlPreviewResizer");
                this.resizer = new DragDrop.Tracker(d, {
                    onDragStart: Lib.bind(this.onDragStart, this),
                    onDragOver: Lib.bind(this.onDragOver, this),
                    onDrop: Lib.bind(this.onDrop, this)
                })
            },
            onLoad: function(a) {
                var b = Lib.fixEvent(a),
                    c = Lib.getAncestorByClass(b.target, "tabHTMLBody").repObject;
                c.preview.contentWindow.document.body.innerHTML = c.file.response.content.text
            },
            onDragStart: function(a) {
                var b = Lib.getBody(this.preview.ownerDocument);
                b.setAttribute("hResizing", "true"), this.startHeight = this.preview.clientHeight
            },
            onDragOver: function(a, b) {
                var c = this.startHeight + a.y;
                this.preview.style.height = c + "px", Cookies.setCookie("htmlPreviewHeight", c)
            },
            onDrop: function(a) {
                var b = Lib.getBody(this.preview.ownerDocument);
                b.removeAttribute("hResizing")
            }
        });

        function DataURLTab(a) {
            this.file = a
        }
        DataURLTab.prototype = domplate(HeadersTab.prototype, {
            id: "DataURL",
            label: Strings.DataURL,
            bodyTag: DIV({
                "class": "netInfoDataURLText netInfoText"
            }),
            onUpdateBody: function(a, b) {
                var c = Lib.getElementByClass(b, "netInfoDataURLText"),
                    d = this.file.request.url;
                if (d.indexOf("data:image") == 0) {
                    var e = b.ownerDocument.createElement("img");
                    e.src = d, c.appendChild(e)
                } else Lib.insertWrappedText(unescape(d), c)
            }
        });
        return RequestBody
    }
}), require.def("preview/requestList", ["domplate/domplate", "core/lib", "i18n!nls/requestList", "preview/harModel", "core/cookies", "preview/requestBody", "domplate/infoTip", "domplate/popupMenu"], function(Domplate, Lib, Strings, HarModel, Cookies, RequestBody, InfoTip, Menu) {
    with(Domplate) {
        function RequestList(a) {
            this.input = a, this.pageTimings = [], this.addPageTiming({
                name: "onContentLoad",
                classes: "netContentLoadBar",
                description: Strings.ContentLoad
            }), this.addPageTiming({
                name: "onLoad",
                classes: "netWindowLoadBar",
                description: Strings.WindowLoad
            }), InfoTip.addListener(this)
        }
        RequestList.columns = ["url", "status", "type", "domain", "size", "timeline"], RequestList.defaultColumns = ["url", "status", "size", "timeline"], RequestList.getVisibleColumns = function() {
            var a = Cookies.getCookie("previewCols");
            if (a) {
                a = a.replace(/\+/g, " "), a = unescape(a);
                return a.split(" ")
            }
            if (!a) {
                var b = document.getElementById("content");
                if (b) {
                    a = b.getAttribute("previewCols");
                    if (a) return a.split(" ")
                }
            }
            return Lib.cloneArray(RequestList.defaultColumns)
        }, RequestList.setVisibleColumns = function(a, b) {
            a || (a = RequestList.getVisibleColumns()), a.join && (a = a.join(" "));
            var c = document.getElementById("content");
            c && c.setAttribute("previewCols", a), b || Cookies.setCookie("previewCols", a)
        }, RequestList.setVisibleColumns(), RequestList.prototype = domplate({
            tableTag: TABLE({
                "class": "netTable",
                cellpadding: 0,
                cellspacing: 0,
                onclick: "$onClick",
                _repObject: "$requestList"
            }, TBODY(TR({
                "class": "netSizerRow"
            }, TD({
                "class": "netHrefCol netCol",
                width: "20%"
            }), TD({
                "class": "netStatusCol netCol",
                width: "7%"
            }), TD({
                "class": "netTypeCol netCol",
                width: "7%"
            }), TD({
                "class": "netDomainCol netCol",
                width: "7%"
            }), TD({
                "class": "netSizeCol netCol",
                width: "7%"
            }), TD({
                "class": "netTimeCol netCol",
                width: "100%"
            }), TD({
                "class": "netOptionsCol netCol",
                width: "15px"
            })))),
            fileTag: FOR("file", "$files", TR({
                "class": "netRow loaded",
                $isExpandable: "$file|isExpandable",
                $responseError: "$file|isError",
                $responseRedirect: "$file|isRedirect",
                $fromCache: "$file|isFromCache"
            }, TD({
                "class": "netHrefCol netCol"
            }, DIV({
                "class": "netHrefLabel netLabel",
                style: "margin-left: $file|getIndent\\px"
            }, "$file|getHref"), DIV({
                "class": "netFullHrefLabel netHrefLabel netLabel",
                style: "margin-left: $file|getIndent\\px"
            }, "$file|getFullHref")), TD({
                "class": "netStatusCol netCol"
            }, DIV({
                "class": "netStatusLabel netLabel"
            }, "$file|getStatus")), TD({
                "class": "netTypeCol netCol"
            }, DIV({
                "class": "netTypeLabel netLabel"
            }, "$file|getType")), TD({
                "class": "netDomainCol netCol"
            }, DIV({
                "class": "netDomainLabel netLabel"
            }, "$file|getDomain")), TD({
                "class": "netSizeCol netCol"
            }, DIV({
                "class": "netSizeLabel netLabel"
            }, "$file|getSize")), TD({
                "class": "netTimeCol netCol"
            }, DIV({
                "class": "netTimelineBar"
            }, "&nbsp;", DIV({
                "class": "netBlockingBar netBar"
            }), DIV({
                "class": "netResolvingBar netBar"
            }), DIV({
                "class": "netConnectingBar netBar"
            }), DIV({
                "class": "netSendingBar netBar"
            }), DIV({
                "class": "netWaitingBar netBar"
            }), DIV({
                "class": "netReceivingBar netBar"
            }, SPAN({
                "class": "netTimeLabel"
            }, "$file|getElapsedTime")))), TD({
                "class": "netOptionsCol netCol"
            }, DIV({
                "class": "netOptionsLabel netLabel",
                onclick: "$onOpenOptions"
            })))),
            headTag: TR({
                "class": "netHeadRow"
            }, TD({
                "class": "netHeadCol",
                colspan: 7
            }, DIV({
                "class": "netHeadLabel"
            }, "$doc.rootFile.href"))),
            netInfoTag: TR({
                "class": "netInfoRow"
            }, TD({
                "class": "netInfoCol",
                colspan: 7
            })),
            summaryTag: TR({
                "class": "netRow netSummaryRow"
            }, TD({
                "class": "netHrefCol netCol"
            }, DIV({
                "class": "netCountLabel netSummaryLabel"
            }, "-")), TD({
                "class": "netStatusCol netCol"
            }), TD({
                "class": "netTypeCol netCol"
            }), TD({
                "class": "netDomainCol netCol"
            }), TD({
                "class": "netTotalSizeCol netSizeCol netCol"
            }, DIV({
                "class": "netTotalSizeLabel netSummaryLabel"
            }, "0KB")), TD({
                "class": "netTotalTimeCol netTimeCol netCol"
            }, DIV({
                "class": "",
                style: "width: 100%"
            }, DIV({
                "class": "netCacheSizeLabel netSummaryLabel"
            }, "(", SPAN("0KB"), SPAN(" " + Strings.fromCache), ")"), DIV({
                "class": "netTimeBar"
            }, SPAN({
                "class": "netTotalTimeLabel netSummaryLabel"
            }, "0ms")))), TD({
                "class": "netOptionsCol netCol"
            })),
            getIndent: function(a) {
                return 0
            },
            isError: function(a) {
                var b = Math.floor(a.response.status / 100);
                return b == 4 || b == 5
            },
            isRedirect: function(a) {
                return !1
            },
            isFromCache: function(a) {
                return a.cache && a.cache.afterRequest
            },
            getHref: function(a) {
                var b = Lib.getFileName(this.getFullHref(a));
                return unescape(a.request.method + " " + b)
            },
            getFullHref: function(a) {
                return unescape(a.request.url)
            },
            getStatus: function(a) {
                var b = a.response.status > 0 ? a.response.status + " " : "";
                return b + a.response.statusText
            },
            getType: function(a) {
                return a.response.content.mimeType
            },
            getDomain: function(a) {
                return Lib.getPrettyDomain(a.request.url)
            },
            getSize: function(a) {
                var b = a.response.bodySize,
                    c = b && b != -1 ? b : a.response.content.size;
                return this.formatSize(c)
            },
            isExpandable: function(a) {
                var b = a.response.headers.length > 0,
                    c = a.request.url.indexOf("data:") == 0;
                return b || c
            },
            formatSize: function(a) {
                return Lib.formatSize(a)
            },
            getElapsedTime: function(a) {
                return Lib.formatTime(a.time)
            },
            onClick: function(a) {
                var b = Lib.fixEvent(a);
                if (Lib.isLeftClick(a)) {
                    var c = Lib.getAncestorByClass(b.target, "netRow");
                    c && (this.toggleHeadersRow(c), Lib.cancelEvent(a))
                } else Lib.isControlClick(a) && window.open(a.target.innerText || a.target.textContent)
            },
            toggleHeadersRow: function(a) {
                if (Lib.hasClass(a, "isExpandable")) {
                    var b = a.repObject;
                    Lib.toggleClass(a, "opened");
                    if (Lib.hasClass(a, "opened")) {
                        var c = this.netInfoTag.insertRows({}, a)[0];
                        c.repObject = b;
                        var d = new RequestBody;
                        d.render(c.firstChild, b)
                    } else {
                        var c = a.nextSibling,
                            e = Lib.getElementByClass(c, "netInfoBody");
                        a.parentNode.removeChild(c)
                    }
                }
            },
            onOpenOptions: function(a) {
                var b = Lib.fixEvent(a);
                Lib.cancelEvent(a);
                if (Lib.isLeftClick(a)) {
                    var c = b.target,
                        d = Lib.getAncestorByClass(c, "netRow"),
                        e = this.getMenuItems(d);
                    if (!e.length) return;
                    var f = new Menu({
                        id: "requestContextMenu",
                        items: e
                    });
                    f.showPopup(c)
                }
            },
            getMenuItems: function(a) {
                var b = a.repObject,
                    c = a.phase,
                    d = c.files[0] == b && this.phases[0] == c,
                    e = [{
                        label: Strings.menuBreakTimeline,
                        type: "checkbox",
                        disabled: d,
                        checked: c.files[0] == b && !d,
                        command: Lib.bind(this.breakLayout, this, a)
                    }, "-",
                        {
                            label: Strings.menuOpenRequest,
                            command: Lib.bind(this.openRequest, this, b)
                        }, {
                            label: Strings.menuOpenResponse,
                            disabled: !b.response.content.text,
                            command: Lib.bind(this.openResponse, this, b)
                        }];
                Lib.dispatch(this.listeners, "getMenuItems", [e, this.input, b]);
                return e
            },
            openRequest: function(a, b) {
                window.open(b.request.url)
            },
            openResponse: function(a, b) {
                var c = b.response.content.text,
                    d = b.response.content.mimeType,
                    e = b.response.content.encoding,
                    f = "data:" + (d ? d : "") + ";" + (e ? e : "") + "," + c;
                window.open(f)
            },
            breakLayout: function(a, b) {
                var c = b.repObject,
                    d = b.phase,
                    e = d.files[0] == c;
                b.breakLayout = !e, b.setAttribute("breakLayout", b.breakLayout ? "true" : "false");
                var f = Lib.getAncestorByClass(b, "netTable"),
                    g = HarModel.getParentPage(this.input, c);
                this.updateLayout(f, g)
            },
            updateLayout: function(a, b) {
                var c = HarModel.getPageEntries(this.input, b);
                this.table = a;
                var d = this.table.firstChild,
                    e = this.firstRow = d.firstChild.nextSibling;
                this.phases = [];
                var f = Cookies.getCookie("phaseInterval");
                f || (f = 4e3);
                var g = null,
                    h = b ? Lib.parseISO8601(b.startedDateTime) : null,
                    i = b && b.pageTimings ? b.pageTimings.onLoad : -1;
                i > 0 && (i += h);
                for (var j = 0; j < c.length; j++) {
                    var k = c[j];
                    Lib.hasClass(e, "netInfoRow") && (e = e.nextSibling), e.repObject = k, h || (h = Lib.parseISO8601(k.startedDateTime));
                    var l = Lib.parseISO8601(k.startedDateTime),
                        m = g ? Lib.parseISO8601(g.getLastStartTime()) : 0,
                        n = g ? g.endTime : 0,
                        o = !1;
                    f >= 0 && (o = l > i && l - m >= f && l + k.time >= n + f), typeof e.breakLayout == "boolean" ? !g || e.breakLayout ? g = this.startPhase(k) : g.addFile(k) : !g || o ? g = this.startPhase(k) : g.addFile(k), this.phases[0] != g && e.setAttribute("breakLayout", g.files[0] == k ? "true" : "false");
                    if (g.startTime == undefined || g.startTime > l) g.startTime = l;
                    if (g.endTime == undefined || g.endTime < l + k.time) g.endTime = l + k.time;
                    e = e.nextSibling
                }
                this.updateTimeStamps(b), this.updateTimeline(b), this.updateSummaries(b)
            },
            startPhase: function(a) {
                var b = new Phase(a);
                this.phases.push(b);
                return b
            },
            calculateFileTimes: function(a, b, c) {
                c != b.phase && (c = b.phase, this.phaseStartTime = c.startTime, this.phaseEndTime = c.endTime, this.phaseElapsed = this.phaseEndTime - c.startTime);
                if (!b.timings) return c;
                var d = b.timings.blocked < 0 ? 0 : b.timings.blocked,
                    e = d + (b.timings.dns < 0 ? 0 : b.timings.dns),
                    f = e + (b.timings.connect < 0 ? 0 : b.timings.connect),
                    g = f + (b.timings.send < 0 ? 0 : b.timings.send),
                    h = g + (b.timings.wait < 0 ? 0 : b.timings.wait),
                    i = h + (b.timings.receive < 0 ? 0 : b.timings.receive),
                    j = b.time,
                    k = Lib.parseISO8601(b.startedDateTime);
                this.barOffset = ((k - this.phaseStartTime) / this.phaseElapsed * 100).toFixed(3), this.barBlockingWidth = (d / this.phaseElapsed * 100).toFixed(3), this.barResolvingWidth = (e / this.phaseElapsed * 100).toFixed(3), this.barConnectingWidth = (f / this.phaseElapsed * 100).toFixed(3), this.barSendingWidth = (g / this.phaseElapsed * 100).toFixed(3), this.barWaitingWidth = (h / this.phaseElapsed * 100).toFixed(3), this.barReceivingWidth = (i / this.phaseElapsed * 100).toFixed(3), this.calculatePageTimings(a, b, c);
                return c
            },
            calculatePageTimings: function(a, b, c) {
                if (a) {
                    var d = Lib.parseISO8601(a.startedDateTime);
                    for (var e = 0; e < c.pageTimings.length; e++) {
                        var f = c.pageTimings[e].time;
                        if (f > 0) {
                            var g = d + f - c.startTime,
                                h = (g / this.phaseElapsed * 100).toFixed(3);
                            c.pageTimings[e].offset = h
                        }
                    }
                }
            },
            updateTimeline: function(a) {
                var b = this.table.firstChild,
                    c;
                for (var d = this.firstRow; d; d = d.nextSibling) {
                    var e = d.repObject;
                    if (!e) continue;
                    if (Lib.hasClass(d, "netInfoRow")) continue;
                    c = this.calculateFileTimes(a, e, c), d.phase = e.phase, delete e.phase;
                    var f = Lib.getElementByClass(d, "netTimelineBar"),
                        g = f.children[0],
                        h = g.nextSibling,
                        i = h.nextSibling,
                        j = i.nextSibling,
                        k = j.nextSibling,
                        l = k.nextSibling;
                    g.style.left = i.style.left = h.style.left = j.style.left = k.style.left = l.style.left = this.barOffset + "%", g.style.width = this.barBlockingWidth + "%", h.style.width = this.barResolvingWidth + "%", i.style.width = this.barConnectingWidth + "%", j.style.width = this.barSendingWidth + "%", k.style.width = this.barWaitingWidth + "%", l.style.width = this.barReceivingWidth + "%";
                    var m = Lib.getElementsByClass(f, "netPageTimingBar");
                    for (var n = 0; n < m.length; n++) m[n].parentNode.removeChild(m[n]);
                    for (var n = 0; n < c.pageTimings.length; n++) {
                        var o = c.pageTimings[n];
                        if (!o.offset) continue;
                        var p = f.ownerDocument.createElement("DIV");
                        f.appendChild(p), o.classes && Lib.setClass(p, o.classes), Lib.setClass(p, "netPageTimingBar netBar"), p.style.left = o.offset + "%", p.style.display = "block", o.offset = null
                    }
                }
            },
            updateTimeStamps: function(a) {
                if (a) {
                    var b = [];
                    for (var c = 0; a.pageTimings && c < this.pageTimings.length; c++) {
                        var d = this.pageTimings[c],
                            e = a.pageTimings[d.name];
                        e > 0 && b.push({
                            label: d.name,
                            time: e,
                            classes: d.classes,
                            comment: d.description
                        })
                    }
                    var f = a.pageTimings ? a.pageTimings._timeStamps : [];
                    f && b.push.apply(b, f);
                    var g = this.phases;
                    for (var c = 0; c < g.length; c++) {
                        var h = g[c],
                            i = g[c + 1];
                        for (var j = 0; j < b.length; j++) {
                            var k = b[j],
                                l = k.time;
                            if (!l) continue;
                            var m = Lib.parseISO8601(a.startedDateTime);
                            l += m;
                            if (!i || l < i.startTime) if (c == 0 || l >= h.startTime) h.startTime > l && (h.startTime = l), h.endTime < l && (h.endTime = l), h.pageTimings.push({
                                classes: k.classes ? k.classes : "netTimeStampBar",
                                name: k.label,
                                description: k.comment,
                                time: k.time
                            })
                        }
                    }
                }
            },
            updateSummaries: function(a) {
                var b = this.phases,
                    c = 0,
                    d = 0,
                    e = 0,
                    f = 0;
                for (var g = 0; g < b.length; ++g) {
                    var h = b[g];
                    h.invalidPhase = !1;
                    var i = this.summarizePhase(h);
                    c += i.fileCount, d += i.totalSize, e += i.cachedSize, f += i.totalTime
                }
                var j = this.summaryRow;
                if (j) {
                    var k = Lib.getElementByClass(j, "netCountLabel");
                    k.firstChild.nodeValue = this.formatRequestCount(c);
                    var l = Lib.getElementByClass(j, "netTotalSizeLabel");
                    l.setAttribute("totalSize", d), l.firstChild.nodeValue = Lib.formatSize(d);
                    var m = Lib.getElementByClass(j, "netCacheSizeLabel");
                    m.setAttribute("collapsed", e == 0), m.childNodes[1].firstChild.nodeValue = Lib.formatSize(e);
                    var n = Lib.getElementByClass(j, "netTotalTimeLabel"),
                        o = Lib.formatTime(f);
                    a && a.pageTimings.onLoad > 0 && (o += " (onload: " + Lib.formatTime(a.pageTimings.onLoad) + ")"), n.innerHTML = o
                }
            },
            formatRequestCount: function(a) {
                return a + " " + (a == 1 ? Strings.request : Strings.requests)
            },
            summarizePhase: function(a) {
                var b = 0,
                    c = 0,
                    d = "all";
                d == "all" && (d = null);
                var e = 0,
                    f = 0,
                    g = 0;
                for (var h = 0; h < a.files.length; h++) {
                    var i = a.files[h],
                        j = Lib.parseISO8601(i.startedDateTime);
                    if (!d || i.category == d) {
                        ++e;
                        var k = i.response.bodySize,
                            l = k && k != -1 ? k : i.response.content.size;
                        c += l, i.response.status == 304 && (b += l);
                        if (!f || j < f) f = j;
                        var m = j + i.time;
                        m > g && (g = m)
                    }
                }
                var n = g - f;
                return {
                    cachedSize: b,
                    totalSize: c,
                    totalTime: n,
                    fileCount: e
                }
            },
            showInfoTip: function(a, b, c, d) {
                var e = Lib.getAncestorByClass(b, "netTable");
                if (e && e.repObject == this) {
                    var f = Lib.getAncestorByClass(b, "netRow");
                    if (f) {
                        if (Lib.getAncestorByClass(b, "netBar")) {
                            a.setAttribute("multiline", !0);
                            var g = f.repObject.startedDateTime + "-nettime";
                            this.infoTipURL = g;
                            return this.populateTimeInfoTip(a, f)
                        }
                        if (Lib.hasClass(b, "netSizeLabel")) {
                            var g = f.repObject.startedDateTime + "-netsize";
                            this.infoTipURL = g;
                            return this.populateSizeInfoTip(a, f)
                        }
                    }
                }
            },
            populateTimeInfoTip: function(a, b) {
                EntryTimeInfoTip.render(this, b, a);
                return !0
            },
            populateSizeInfoTip: function(a, b) {
                EntrySizeInfoTip.render(this, b, a);
                return !0
            },
            render: function(a, b) {
                var c = HarModel.getPageEntries(this.input, b);
                if (!c.length) return null;
                return this.append(a, b, c)
            },
            append: function(a, b, c) {
                this.table || (this.table = this.tableTag.replace({
                    requestList: this
                }, a, this)), this.summaryRow || (this.summaryRow = this.summaryTag.insertRows({}, this.table.firstChild)[0]);
                var d = this.table.firstChild,
                    e = d.lastChild.previousSibling,
                    f = this.fileTag.insertRows({
                        files: c
                    }, e, this);
                this.updateLayout(this.table, b);
                return f[0]
            },
            addPageTiming: function(a) {
                this.pageTimings.push(a)
            }
        });

        function Phase(a) {
            this.files = [], this.pageTimings = [], this.addFile(a)
        }
        Phase.prototype = {
            addFile: function(a) {
                this.files.push(a), a.phase = this
            },
            getLastStartTime: function() {
                return this.files[this.files.length - 1].startedDateTime
            }
        };
        var EntryTimeInfoTip = domplate({
                tableTag: TABLE({
                    "class": "timeInfoTip"
                }, TBODY()),
                timingsTag: FOR("time", "$timings", TR({
                    "class": "timeInfoTipRow",
                    $collapsed: "$time|hideBar"
                }, TD({
                    "class": "$time|getBarClass timeInfoTipBar",
                    $loaded: "$time.loaded",
                    $fromCache: "$time.fromCache"
                }), TD({
                    "class": "timeInfoTipCell startTime"
                }, "$time.start|formatStartTime"), TD({
                    "class": "timeInfoTipCell elapsedTime"
                }, "$time.elapsed|formatTime"), TD("$time|getLabel"))),
                startTimeTag: TR(TD(), TD("$startTime.time|formatStartTime"), TD({
                    "class": "timeInfoTipStartLabel",
                    colspan: 2
                }, "$startTime|getLabel")),
                separatorTag: TR({}, TD({
                    "class": "timeInfoTipSeparator",
                    colspan: 4,
                    height: "10px"
                }, SPAN("$label"))),
                eventsTag: FOR("event", "$events", TR({
                    "class": "timeInfoTipEventRow"
                }, TD({
                    "class": "timeInfoTipBar",
                    align: "center"
                }, DIV({
                    "class": "$event|getPageTimingClass timeInfoTipEventBar"
                })), TD("$event.start|formatStartTime"), TD({
                    colspan: 2
                }, "$event|getTimingLabel"))),
                hideBar: function(a) {
                    return !a.elapsed && a.bar == "request.phase.Blocking"
                },
                getBarClass: function(a) {
                    var b = a.bar.substr(a.bar.lastIndexOf(".") + 1);
                    return "net" + b + "Bar"
                },
                getPageTimingClass: function(a) {
                    return a.classes ? a.classes : ""
                },
                formatTime: function(a) {
                    return Lib.formatTime(a)
                },
                formatStartTime: function(a) {
                    var b = a > 0,
                        c = Lib.formatTime(Math.abs(a));
                    if (!a) return c;
                    return (b > 0 ? "+" : "-") + c
                },
                getLabel: function(a) {
                    return Strings[a.bar]
                },
                getTimingLabel: function(a) {
                    return a.bar
                },
                render: function(a, b, c) {
                    var d = a.input,
                        e = b.repObject,
                        f = HarModel.getParentPage(d, e),
                        g = f ? Lib.parseISO8601(f.startedDateTime) : null,
                        h = Lib.parseISO8601(e.startedDateTime),
                        i = EntryTimeInfoTip.tableTag.replace({}, c),
                        j = {};
                    g ? j.time = h - g : j.time = h - b.phase.startTime, j.bar = "request.Started", this.startTimeTag.insertRows({
                        startTime: j
                    }, i.firstChild), this.separatorTag.insertRows({
                        label: Strings["request.phases.label"]
                    }, i.firstChild);
                    var k = 0,
                        l = [],
                        m = e.timings.blocked,
                        n = e.timings.dns,
                        o = e.timings.ssl,
                        p = e.timings.connect,
                        q = e.timings.send,
                        r = e.timings.wait,
                        s = e.timings.receive;
                    m >= 0 && l.push({
                        bar: "request.phase.Blocking",
                        elapsed: m,
                        start: k
                    }), n >= 0 && l.push({
                        bar: "request.phase.Resolving",
                        elapsed: n,
                        start: k += m < 0 ? 0 : m
                    }), p >= 0 && l.push({
                        bar: "request.phase.Connecting",
                        elapsed: p,
                        start: k += n < 0 ? 0 : n
                    }), q >= 0 && l.push({
                        bar: "request.phase.Sending",
                        elapsed: q,
                        start: k += p < 0 ? 0 : p
                    }), r >= 0 && l.push({
                        bar: "request.phase.Waiting",
                        elapsed: r,
                        start: k += q < 0 ? 0 : q
                    }), s >= 0 && l.push({
                        bar: "request.phase.Receiving",
                        elapsed: s,
                        start: k += r < 0 ? 0 : r,
                        loaded: e.loaded,
                        fromCache: e.fromCache
                    }), this.timingsTag.insertRows({
                        timings: l
                    }, i.firstChild);
                    if (!f) return !0;
                    var t = [];
                    for (var u = 0; u < b.phase.pageTimings.length; u++) {
                        var v = b.phase.pageTimings[u];
                        t.push({
                            bar: v.description ? v.description : v.name,
                            start: g + v.time - h,
                            classes: v.classes,
                            time: v.time
                        })
                    }
                    t.length && (t.sort(function(a, b) {
                        return a.time < b.time ? -1 : 1
                    }), this.separatorTag.insertRows({
                        label: Strings["request.timings.label"]
                    }, i.firstChild), this.eventsTag.insertRows({
                        events: t
                    }, i.firstChild));
                    return !0
                }
            }),
            EntrySizeInfoTip = domplate({
                tag: DIV({
                    "class": "sizeInfoTip"
                }, "$file|getSize"),
                zippedTag: DIV(DIV({
                    "class": "sizeInfoTip"
                }, "$file|getBodySize"), DIV({
                    "class": "sizeInfoTip"
                }, "$file|getContentSize")),
                getSize: function(a) {
                    var b = a.response.bodySize;
                    if (b < 0) return Strings.unknownSize;
                    return Lib.formatString(Strings.tooltipSize, Lib.formatSize(b), Lib.formatNumber(b))
                },
                getBodySize: function(a) {
                    var b = a.response.bodySize;
                    if (b < 0) return Strings.unknownSize;
                    return Lib.formatString(Strings.tooltipZippedSize, Lib.formatSize(b), Lib.formatNumber(b))
                },
                getContentSize: function(a) {
                    var b = a.response.content.size;
                    if (b < 0) return Strings.unknownSize;
                    return Lib.formatString(Strings.tooltipUnzippedSize, Lib.formatSize(b), Lib.formatNumber(b))
                },
                render: function(a, b, c) {
                    var d = a.input,
                        e = b.repObject;
                    if (e.response.bodySize == e.response.content.size) return this.tag.replace({
                        file: e
                    }, c);
                    return this.zippedTag.replace({
                        file: e
                    }, c)
                }
            });
        return RequestList
    }
}), define("nls/pageList", {
    root: {
        "column.label.url": "URL",
        "column.label.status": "Status",
        "column.label.type": "Type",
        "column.label.domain": "Domain",
        "column.label.size": "Size",
        "column.label.timeline": "Timeline",
        "action.label.Reset": "Reset"
    }
}), require.def("preview/pageList", ["domplate/domplate", "core/lib", "core/trace", "core/cookies", "preview/requestList", "i18n!nls/pageList", "domplate/popupMenu"], function(Domplate, Lib, Trace, Cookies, RequestList, Strings, Menu) {
    with(Domplate) {
        function PageList(a) {
            this.input = a, this.listeners = []
        }
        PageList.prototype = domplate({
            tableTag: TABLE({
                "class": "pageTable",
                cellpadding: 0,
                cellspacing: 0,
                onclick: "$onClick",
                _repObject: "$input"
            }, TBODY(TAG("$rowTag", {
                groups: "$input.log.pages"
            }))),
            rowTag: FOR("group", "$groups", TR({
                "class": "pageRow",
                _repObject: "$group"
            }, TD({
                "class": "groupName pageCol",
                width: "1%"
            }, SPAN({
                "class": "pageName"
            }, "$group|getPageTitle")), TD({
                "class": "netOptionsCol netCol",
                width: "15px"
            }, DIV({
                "class": "netOptionsLabel netLabel",
                onclick: "$onOpenOptions"
            })))),
            bodyTag: TR({
                "class": "pageInfoRow",
                style: "height:auto;"
            }, TD({
                "class": "pageInfoCol",
                colspan: 2
            })),
            getPageTitle: function(a) {
                return Lib.cropString(a.title, 100)
            },
            getPageID: function(a) {
                return "[" + a.id + "]"
            },
            onClick: function(a) {
                var b = Lib.fixEvent(a);
                if (Lib.isLeftClick(a)) {
                    var c = Lib.getAncestorByClass(b.target, "pageRow");
                    c && (this.toggleRow(c), Lib.cancelEvent(a))
                }
            },
            toggleRow: function(a, b) {
                var c = Lib.hasClass(a, "opened");
                if (!c || !b) {
                    Lib.toggleClass(a, "opened");
                    if (Lib.hasClass(a, "opened")) {
                        var d = this.bodyTag.insertRows({}, a)[0],
                            e = this.createRequestList(),
                            f = PageList.prototype.pageTimings;
                        for (var g = 0; g < f.length; g++) e.addPageTiming(f[g]);
                        e.render(d.firstChild, a.repObject)
                    } else {
                        var d = a.nextSibling;
                        a.parentNode.removeChild(d)
                    }
                }
            },
            expandAll: function(a) {
                var b = a.firstChild.firstChild;
                while (b) Lib.hasClass(b, "pageRow") && this.toggleRow(b, !0), b = b.nextSibling
            },
            getPageRow: function(a) {
                var b = this.element.parentNode,
                    c = Lib.getElementsByClass(b, "pageRow");
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    if (e.repObject == a) return e
                }
            },
            togglePage: function(a) {
                var b = this.getPageRow(a);
                this.toggleRow(b)
            },
            expandPage: function(a) {
                var b = this.getPageRow(a);
                this.toggleRow(b, !0)
            },
            collapsePage: function(a) {
                var b = this.getPageRow(a);
                Lib.hasClass(b, "opened") && this.toggleRow(b)
            },
            onOpenOptions: function(a) {
                var b = Lib.fixEvent(a);
                Lib.cancelEvent(a);
                if (Lib.isLeftClick(a)) {
                    var c = b.target,
                        d = Lib.getAncestorByClass(c, "pageRow"),
                        e = this.getMenuItems(d.repObject),
                        f = new Menu({
                            id: "requestContextMenu",
                            items: e
                        });
                    f.showPopup(c)
                }
            },
            getMenuItems: function(a) {
                var b = RequestList.getVisibleColumns().join(),
                    c, d = 0,
                    e = [];
                for (var f = 0; f < RequestList.columns.length; f++) {
                    var g = RequestList.columns[f],
                        h = b.indexOf(g) > -1;
                    e.push({
                        label: Strings["column.label." + g],
                        type: "checkbox",
                        checked: h,
                        command: Lib.bindFixed(this.onToggleColumn, this, g)
                    }), h && (c = f, d++)
                }
                d == 1 && (e[c].disabled = !0), e.push("-"), e.push({
                    label: Strings["action.label.Reset"],
                    command: Lib.bindFixed(this.updateColumns, this)
                });
                return e
            },
            onToggleColumn: function(a) {
                var b = RequestList.getVisibleColumns();
                Lib.remove(b, a) || b.push(a), this.updateColumns(b)
            },
            updateColumns: function(a) {
                a || (a = RequestList.defaultColumns), RequestList.setVisibleColumns(a)
            },
            createRequestList: function() {
                var a = new RequestList(this.input);
                a.listeners = this.listeners;
                return a
            },
            append: function(a) {
                var b = this.createRequestList();
                b.render(a, null);
                var c = this.input.log.pages;
                if (c && c.length) {
                    var d = this.tableTag.append({
                            input: this.input
                        }, a, this),
                        e = Lib.getElementsByClass(d, "pageRow"),
                        f = Lib.getElementsByClass(a, "pageTable");
                    e.length == 1 && f.length == 1 && this.toggleRow(e[0]);
                    var g = Lib.getURLParameter("expand");
                    g && this.expandAll(d)
                }
            },
            render: function(a) {
                this.append(a)
            },
            addListener: function(a) {
                this.listeners.push(a)
            },
            removeListener: function(a) {
                Lib.remove(this.listeners, a)
            }
        }), PageList.prototype.pageTimings = [];
        return PageList
    }
}), require.def("preview/validationError", ["domplate/domplate", "core/lib", "core/trace", "domplate/popupMenu"], function(Domplate, Lib, Trace, Menu) {
    with(Domplate) {
        var ValidationError = domplate({
            errorTable: TABLE({
                "class": "errorTable",
                cellpadding: 3,
                cellspacing: 0
            }, TBODY(FOR("error", "$errors", TR({
                "class": "errorRow",
                _repObject: "$error"
            }, TD({
                "class": "errorProperty"
            }, SPAN("$error.property")), TD({
                "class": "errorOptions",
                $hasTarget: "$error|hasTarget"
            }, DIV({
                "class": "errorOptionsTarget",
                onclick: "$onOpenOptions"
            }, "&nbsp;")), TD("&nbsp;"), TD({
                "class": "errorMessage"
            }, SPAN("$error.message")))))),
            hasTarget: function(a) {
                return a.input && a.file
            },
            onOpenOptions: function(a) {
                var b = Lib.fixEvent(a);
                Lib.cancelEvent(a);
                if (Lib.isLeftClick(a)) {
                    var c = b.target,
                        d = Lib.getAncestorByClass(c, "errorRow"),
                        e = d.repObject;
                    if (!e || !e.input || !e.file) return;
                    var f = this.getMenuItems(e.input, e.file);
                    if (!f.length) return;
                    var g = new Menu({
                        id: "requestContextMenu",
                        items: f
                    });
                    g.showPopup(c)
                }
            },
            getMenuItems: function(a, b) {
                var c = [];
                Lib.dispatch(this.listeners, "getMenuItems", [c, a, b]);
                return c
            },
            listeners: [],
            addListener: function(a) {
                this.listeners.push(a)
            },
            removeListener: function(a) {
                Lib.remove(this.listeners, a)
            },
            appendError: function(a, b) {
                a.errors && this.errorTable.append(a, b)
            }
        });
        return ValidationError
    }
});
var swfobject = function() {
    function O(a) {
        var b = /[\\\"<>\.;]/,
            c = b.exec(a) != null;
        return c ? encodeURIComponent(a) : a
    }
    function N(a, b) {
        var c = b ? "visible" : "hidden";
        r && I(a) ? I(a).style.visibility = c : M("#" + a, "visibility:" + c)
    }
    function M(c, d) {
        if (!t.ie || !t.mac) {
            var e = h.getElementsByTagName("head")[0],
                f = J("style");
            f.setAttribute("type", "text/css"), f.setAttribute("media", "screen"), (!t.ie || !t.win) && typeof h.createTextNode != a && f.appendChild(h.createTextNode(c + " {" + d + "}")), e.appendChild(f);
            if (t.ie && t.win && typeof h.styleSheets != a && h.styleSheets.length > 0) {
                var g = h.styleSheets[h.styleSheets.length - 1];
                typeof g.addRule == b && g.addRule(c, d)
            }
        }
    }
    function L(a) {
        var b = t.pv,
            c = a.split(".");
        c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0;
        return b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
    }
    function K(a, b, c) {
        a.attachEvent(b, c), m[m.length] = [a, b, c]
    }
    function J(a) {
        return h.createElement(a)
    }
    function I(a) {
        var b = null;
        try {
            b = h.getElementById(a)
        } catch (c) {}
        return b
    }
    function H(a) {
        var b = I(a);
        if (b) {
            for (var c in b) typeof b[c] == "function" && (b[c] = null);
            b.parentNode.removeChild(b)
        }
    }
    function G(a) {
        var b = I(a);
        b && (b.nodeName == "OBJECT" || b.nodeName == "EMBED") && (t.ie && t.win ? b.readyState == 4 ? H(a) : g.attachEvent("onload", function() {
            H(a)
        }) : b.parentNode.removeChild(b))
    }
    function F(a, b, c) {
        var d = J("param");
        d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
    }
    function E(c, d, f) {
        var g, h = I(f);
        if (h) {
            typeof c.id == a && (c.id = f);
            if (t.ie && t.win) {
                var i = "";
                for (var j in c) c[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? d.movie = c[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + c[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + c[j] + '"'));
                var k = "";
                for (var m in d) d[m] != Object.prototype[m] && (k += '<param name="' + m + '" value="' + d[m] + '" />');
                h.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>", l[l.length] = c.id, g = I(c.id)
            } else if (t.webkit && t.webkit < 312) {
                var n = J("embed");
                n.setAttribute("type", e);
                for (var o in c) c[o] != Object.prototype[o] && (o.toLowerCase() == "data" ? n.setAttribute("src", c[o]) : o.toLowerCase() == "styleclass" ? n.setAttribute("class", c[o]) : o.toLowerCase() != "classid" && n.setAttribute(o, c[o]));
                for (var p in d) d[p] != Object.prototype[p] && (p.toLowerCase() != "movie" && n.setAttribute(p, d[p]));
                h.parentNode.replaceChild(n, h), g = n
            } else {
                var q = J(b);
                q.setAttribute("type", e);
                for (var r in c) c[r] != Object.prototype[r] && (r.toLowerCase() == "styleclass" ? q.setAttribute("class", c[r]) : r.toLowerCase() != "classid" && q.setAttribute(r, c[r]));
                for (var s in d) d[s] != Object.prototype[s] && s.toLowerCase() != "movie" && F(q, s, d[s]);
                h.parentNode.replaceChild(q, h), g = q
            }
        }
        return g
    }
    function D(a) {
        var c = J("div");
        if (t.win && t.ie) c.innerHTML = a.innerHTML;
        else {
            var d = a.getElementsByTagName(b)[0];
            if (d) {
                var e = d.childNodes;
                if (e) {
                    var f = e.length;
                    for (var g = 0; g < f; g++)(e[g].nodeType != 1 || e[g].nodeName != "PARAM") && e[g].nodeType != 8 && c.appendChild(e[g].cloneNode(!0))
                }
            }
        }
        return c
    }
    function C(a) {
        if (t.ie && t.win && a.readyState != 4) {
            var b = J("div");
            a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(D(a), b), a.style.display = "none";
            var c = function() {
                a.parentNode.removeChild(a)
            };
            K(g, "onload", c)
        } else a.parentNode.replaceChild(D(a), a)
    }
    function B(a) {
        s = !0;
        var b = I(a.id);
        if (b) {
            if (a.altContentId) {
                var c = I(a.altContentId);
                c && (p = c, q = a.altContentId)
            } else p = D(b);
            !/%$/.test(a.width) && parseInt(a.width, 10) < 310 && (a.width = "310"), !/%$/.test(a.height) && parseInt(a.height, 10) < 137 && (a.height = "137"), h.title = h.title.slice(0, 47) + " - Flash Player Installation";
            var d = t.ie && t.win ? "ActiveX" : "PlugIn",
                e = h.title,
                i = "MMredirectURL=" + g.location + "&MMplayerType=" + d + "&MMdoctitle=" + e,
                j = a.id;
            if (t.ie && t.win && b.readyState != 4) {
                var k = J("div");
                j += "SWFObjectNew", k.setAttribute("id", j), b.parentNode.insertBefore(k, b), b.style.display = "none";
                var l = function() {
                    b.parentNode.removeChild(b)
                };
                K(g, "onload", l)
            }
            E({
                data: a.expressInstall,
                id: f,
                width: a.width,
                height: a.height
            }, {
                flashvars: i
            }, j)
        }
    }
    function A(a) {
        var c = a.getElementsByTagName(b)[0];
        if (c) {
            var d = J("embed"),
                e = c.attributes;
            if (e) {
                var f = e.length;
                for (var g = 0; g < f; g++) e[g].nodeName == "DATA" ? d.setAttribute("src", e[g].nodeValue) : d.setAttribute(e[g].nodeName, e[g].nodeValue)
            }
            var h = c.childNodes;
            if (h) {
                var i = h.length;
                for (var j = 0; j < i; j++) h[j].nodeType == 1 && h[j].nodeName == "PARAM" && d.setAttribute(h[j].getAttribute("name"), h[j].getAttribute("value"))
            }
            a.parentNode.replaceChild(d, a)
        }
    }
    function z() {
        var a = k.length;
        for (var b = 0; b < a; b++) {
            var c = k[b].id;
            if (t.pv[0] > 0) {
                var d = I(c);
                d && (k[b].width = d.getAttribute("width") ? d.getAttribute("width") : "0", k[b].height = d.getAttribute("height") ? d.getAttribute("height") : "0", L(k[b].swfVersion) ? (t.webkit && t.webkit < 312 && A(d), N(c, !0)) : k[b].expressInstall && !s && L("6.0.65") && (t.win || t.mac) ? B(k[b]) : C(d))
            } else N(c, !0)
        }
    }
    function y(b) {
        if (typeof g.addEventListener != a) g.addEventListener("load", b, !1);
        else if (typeof h.addEventListener != a) h.addEventListener("load", b, !1);
        else if (typeof g.attachEvent != a) K(g, "onload", b);
        else if (typeof g.onload == "function") {
            var c = g.onload;
            g.onload = function() {
                c(), b()
            }
        } else g.onload = b
    }
    function x(a) {
        r ? a() : j[j.length] = a
    }
    function w() {
        if (!r) {
            if (t.ie && t.win) {
                var a = J("span");
                try {
                    var b = h.getElementsByTagName("body")[0].appendChild(a);
                    b.parentNode.removeChild(b)
                } catch (c) {
                    return
                }
            }
            r = !0, o && (clearInterval(o), o = null);
            var d = j.length;
            for (var e = 0; e < d; e++) j[e]()
        }
    }
    function v() {
        n.readyState == "complete" && (n.parentNode.removeChild(n), w())
    }
    var a = "undefined",
        b = "object",
        c = "Shockwave Flash",
        d = "ShockwaveFlash.ShockwaveFlash",
        e = "application/x-shockwave-flash",
        f = "SWFObjectExprInst",
        g = window,
        h = document,
        i = navigator,
        j = [],
        k = [],
        l = [],
        m = [],
        n, o = null,
        p = null,
        q = null,
        r = !1,
        s = !1,
        t = function() {
            var f = typeof h.getElementById != a && typeof h.getElementsByTagName != a && typeof h.createElement != a,
                j = [0, 0, 0],
                k = null;
            if (typeof i.plugins != a && typeof i.plugins[c] == b) k = i.plugins[c].description, k && (typeof i.mimeTypes == a || !i.mimeTypes[e] || i.mimeTypes[e].enabledPlugin) && (k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), j[0] = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10), j[1] = parseInt(k.replace(/^.*\.(.*)\s.*$/, "$1"), 10), j[2] = /r/.test(k) ? parseInt(k.replace(/^.*r(.*)$/, "$1"), 10) : 0);
            else if (typeof g.ActiveXObject != a) {
                var l = null,
                    m = !1;
                try {
                    l = new ActiveXObject(d + ".7")
                } catch (n) {
                    try {
                        l = new ActiveXObject(d + ".6"), j = [6, 0, 21], l.AllowScriptAccess = "always"
                    } catch (n) {
                        j[0] == 6 && (m = !0)
                    }
                    if (!m) try {
                        l = new ActiveXObject(d)
                    } catch (n) {}
                }
                if (!m && l) try {
                    k = l.GetVariable("$version"), k && (k = k.split(" ")[1].split(","), j = [parseInt(k[0], 10), parseInt(k[1], 10), parseInt(k[2], 10)])
                } catch (n) {}
            }
            var o = i.userAgent.toLowerCase(),
                p = i.platform.toLowerCase(),
                q = /webkit/.test(o) ? parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                r = !1,
                s = p ? /win/.test(p) : /win/.test(o),
                t = p ? /mac/.test(p) : /mac/.test(o);
            return {
                w3cdom: f,
                pv: j,
                webkit: q,
                ie: r,
                win: s,
                mac: t
            }
        }(),
        u = function() {
            if (t.w3cdom) {
                x(z);
                if (t.ie && t.win) try {
                    h.write("<script id=__ie_ondomload defer=true src=//:></script>"), n = I("__ie_ondomload"), n && K(n, "onreadystatechange", v)
                } catch (b) {}
                t.webkit && typeof h.readyState != a && (o = setInterval(function() {
                    /loaded|complete/.test(h.readyState) && w()
                }, 10)), typeof h.addEventListener != a && h.addEventListener("DOMContentLoaded", w, null), y(w)
            }
        }(),
        P = function() {
            t.ie && t.win && window.attachEvent("onunload", function() {
                var a = m.length;
                for (var b = 0; b < a; b++) m[b][0].detachEvent(m[b][1], m[b][2]);
                var c = l.length;
                for (var d = 0; d < c; d++) G(l[d]);
                for (var e in t) t[e] = null;
                t = null;
                for (var f in swfobject) swfobject[f] = null;
                swfobject = null
            })
        }();
    return {
        registerObject: function(a, b, c) {
            if (t.w3cdom && a && b) {
                var d = {};
                d.id = a, d.swfVersion = b, d.expressInstall = c ? c : !1, k[k.length] = d, N(a, !1)
            }
        },
        getObjectById: function(c) {
            var d = null;
            if (t.w3cdom) {
                var e = I(c);
                if (e) {
                    var f = e.getElementsByTagName(b)[0];
                    !f || f && typeof e.SetVariable != a ? d = e : typeof f.SetVariable != a && (d = f)
                }
            }
            return d
        },
        embedSWF: function(c, d, e, f, g, h, i, j, k) {
            if (t.w3cdom && c && d && e && f && g) {
                e += "", f += "";
                if (L(g)) {
                    N(d, !1);
                    var l = {};
                    if (k && typeof k === b) for (var m in k) k[m] != Object.prototype[m] && (l[m] = k[m]);
                    l.data = c, l.width = e, l.height = f;
                    var n = {};
                    if (j && typeof j === b) for (var o in j) j[o] != Object.prototype[o] && (n[o] = j[o]);
                    if (i && typeof i === b) for (var p in i) i[p] != Object.prototype[p] && (typeof n.flashvars != a ? n.flashvars += "&" + p + "=" + i[p] : n.flashvars = p + "=" + i[p]);
                    x(function() {
                        E(l, n, d), l.id == d && N(d, !0)
                    })
                } else h && !s && L("6.0.65") && (t.win || t.mac) && (s = !0, N(d, !1), x(function() {
                    var a = {};
                    a.id = a.altContentId = d, a.width = e, a.height = f, a.expressInstall = h, B(a)
                }))
            }
        },
        getFlashPlayerVersion: function() {
            return {
                major: t.pv[0],
                minor: t.pv[1],
                release: t.pv[2]
            }
        },
        hasFlashPlayerVersion: L,
        createSWF: function(a, b, c) {
            return t.w3cdom ? E(a, b, c) : undefined
        },
        removeSWF: function(a) {
            t.w3cdom && G(a)
        },
        createCSS: function(a, b) {
            t.w3cdom && M(a, b)
        },
        addDomLoadEvent: x,
        addLoadEvent: y,
        getQueryParamValue: function(a) {
            var b = h.location.search || h.location.hash;
            if (a == null) return O(b);
            if (b) {
                var c = b.substring(1).split("&");
                for (var d = 0; d < c.length; d++) if (c[d].substring(0, c[d].indexOf("=")) == a) return O(c[d].substring(c[d].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function() {
            if (s && p) {
                var a = I(f);
                a && (a.parentNode.replaceChild(p, a), q && (N(q, !0), t.ie && t.win && (p.style.display = "block")), p = null, q = null, s = !1)
            }
        }
    }
}();
define("downloadify/js/swfobject", function() {}), function() {
    Downloadify = window.Downloadify = {
        queue: {},
        uid: (new Date).getTime(),
        getTextForSave: function(a) {
            var b = Downloadify.queue[a];
            if (b) return b.getData();
            return ""
        },
        getFileNameForSave: function(a) {
            var b = Downloadify.queue[a];
            if (b) return b.getFilename();
            return ""
        },
        saveComplete: function(a) {
            var b = Downloadify.queue[a];
            b && b.complete();
            return !0
        },
        saveCancel: function(a) {
            var b = Downloadify.queue[a];
            b && b.cancel();
            return !0
        },
        saveError: function(a) {
            var b = Downloadify.queue[a];
            b && b.error();
            return !0
        },
        addToQueue: function(a) {
            Downloadify.queue[a.queue_name] = a
        },
        getUID: function(a) {
            a.id == "" && (a.id = "downloadify_" + Downloadify.uid++);
            return a.id
        }
    }, Downloadify.create = function(a, b) {
        var c = typeof a == "string" ? document.getElementById(a) : a;
        return new Downloadify.Container(c, b)
    }, Downloadify.Container = function(a, b) {
        var c = this;
        c.el = a, c.enabled = !0, c.dataCallback = null, c.filenameCallback = null, c.data = null, c.filename = null;
        var d = function() {
            c.options = b, c.options.append || (c.el.innerHTML = ""), c.flashContainer = document.createElement("span"), c.el.appendChild(c.flashContainer), c.queue_name = Downloadify.getUID(c.flashContainer), typeof c.options.filename === "function" ? c.filenameCallback = c.options.filename : c.options.filename && (c.filename = c.options.filename), typeof c.options.data === "function" ? c.dataCallback = c.options.data : c.options.data && (c.data = c.options.data);
            var a = {
                    queue_name: c.queue_name,
                    width: c.options.width,
                    height: c.options.height
                },
                d = {
                    allowScriptAccess: "always"
                },
                e = {
                    id: c.flashContainer.id,
                    name: c.flashContainer.id
                };
            c.options.enabled === !1 && (c.enabled = !1), c.options.transparent === !0 && (d.wmode = "transparent"), c.options.downloadImage && (a.downloadImage = c.options.downloadImage), swfobject.embedSWF(c.options.swf, c.flashContainer.id, c.options.width, c.options.height, "10", null, a, d, e), Downloadify.addToQueue(c)
        };
        c.enable = function() {
            var a = document.getElementById(c.flashContainer.id);
            a.setEnabled(!0), c.enabled = !0
        }, c.disable = function() {
            var a = document.getElementById(c.flashContainer.id);
            a.setEnabled(!1), c.enabled = !1
        }, c.getData = function() {
            if (!c.enabled) return "";
            return c.dataCallback ? c.dataCallback() : c.data ? c.data : ""
        }, c.getFilename = function() {
            return c.filenameCallback ? c.filenameCallback() : c.filename ? c.filename : ""
        }, c.complete = function() {
            typeof c.options.onComplete === "function" && c.options.onComplete()
        }, c.cancel = function() {
            typeof c.options.onCancel === "function" && c.options.onCancel()
        }, c.error = function() {
            typeof c.options.onError === "function" && c.options.onError()
        }, d()
    }, Downloadify.defaultOptions = {
        swf: "media/downloadify.swf",
        downloadImage: "images/download.png",
        width: 100,
        height: 30,
        transparent: !0,
        append: !1
    }
}(), typeof jQuery != "undefined" &&
    function(a) {
        a.fn.downloadify = function(b) {
            return this.each(function() {
                b = a.extend({}, Downloadify.defaultOptions, b);
                var c = Downloadify.create(this, b);
                a(this).data("Downloadify", c)
            })
        }
    }(jQuery), define("downloadify/src/downloadify", function() {}), require.def("tabs/previewTab", ["domplate/domplate", "domplate/tabView", "core/lib", "i18n!nls/previewTab", "domplate/toolbar", "tabs/pageTimeline", "tabs/pageStats", "preview/pageList", "core/cookies", "preview/validationError", "downloadify/js/swfobject", "downloadify/src/downloadify"], function(Domplate, TabView, Lib, Strings, Toolbar, Timeline, Stats, PageList, Cookies, ValidationError) {
    with(Domplate) {
        function PreviewTab(a) {
            this.model = a, this.toolbar = new Toolbar, this.timeline = new Timeline, this.stats = new Stats(a, this.timeline), this.toolbar.addButtons(this.getToolbarButtons()), ValidationError.addListener(this)
        }
        PreviewTab.prototype = Lib.extend(TabView.Tab.prototype, {
            id: "Preview",
            label: Strings.previewTabLabel,
            tabBodyTag: DIV({
                "class": "tab$tab.id\\Body tabBody",
                _repObject: "$tab"
            }, DIV({
                "class": "previewToolbar"
            }), DIV({
                "class": "previewTimeline"
            }), DIV({
                "class": "previewStats"
            }), DIV({
                "class": "previewList"
            })),
            onUpdateBody: function(a, b) {
                this.toolbar.render(Lib.$(b, "previewToolbar")), this.stats.render(Lib.$(b, "previewStats")), this.timeline.render(Lib.$(b, "previewTimeline"));
                var c = this.model.input;
                c && Cookies.getCookie("timeline") == "true" && this.onTimeline(!1), c && Cookies.getCookie("stats") == "true" && this.onStats(!1), this.updateDownloadifyButton()
            },
            updateDownloadifyButton: function() {
                var a = this.model;
                $(".harDownloadButton").downloadify({
                    filename: function() {
                        return "netData.har"
                    },
                    data: function() {
                        return a ? a.toJSON() : ""
                    },
                    onComplete: function() {},
                    onCancel: function() {},
                    onError: function() {
                        alert(Strings.downloadError)
                    },
                    swf: "scripts/downloadify/media/downloadify.swf",
                    downloadImage: "css/images/download-sprites.png",
                    width: 16,
                    height: 16,
                    transparent: !0,
                    append: !1
                })
            },
            getToolbarButtons: function() {
                var a = [{
                    id: "showTimeline",
                    label: Strings.showTimelineButton,
                    tooltiptext: Strings.showTimelineTooltip,
                    command: Lib.bindFixed(this.onTimeline, this, !0)
                }, {
                    id: "showStats",
                    label: Strings.showStatsButton,
                    tooltiptext: Strings.showStatsTooltip,
                    command: Lib.bindFixed(this.onStats, this, !0)
                }, {
                    id: "clear",
                    label: Strings.clearButton,
                    tooltiptext: Strings.clearTooltip,
                    command: Lib.bindFixed(this.onClear, this)
                }];
                $.browser.mozilla && a.push({
                    id: "download",
                    tooltiptext: Strings.downloadTooltip,
                    className: "harDownloadButton"
                });
                return a
            },
            onTimeline: function(a) {
                var b = this.toolbar.getButton("showTimeline");
                if (b) {
                    this.timeline.toggle(a);
                    var c = this.timeline.isVisible();
                    b.label = Strings[c ? "hideTimelineButton" : "showTimelineButton"], this.toolbar.render(), this.updateDownloadifyButton(), Cookies.setCookie("timeline", c)
                }
            },
            onStats: function(a) {
                var b = this.toolbar.getButton("showStats");
                if (b) {
                    this.stats.toggle(a);
                    var c = this.stats.isVisible();
                    b.label = Strings[c ? "hideStatsButton" : "showStatsButton"], this.toolbar.render(), this.updateDownloadifyButton(), Cookies.setCookie("stats", c)
                }
            },
            onClear: function() {
                var a = document.location.href,
                    b = a.indexOf("?");
                document.location = a.substr(0, b)
            },
            showStats: function(a) {
                Cookies.setCookie("stats", a)
            },
            showTimeline: function(a) {
                Cookies.setCookie("timeline", a)
            },
            append: function(a) {
                var b = new PageList(a);
                b.append(Lib.$(this._body, "previewList")), this.timeline.append(a), b.addListener(this)
            },
            appendError: function(a) {
                ValidationError.appendError(a, Lib.$(this._body, "previewList"))
            },
            addPageTiming: function(a) {
                PageList.prototype.pageTimings.push(a)
            },
            getMenuItems: function(a, b, c) {
                c && (a.push("-"), a.push({
                    label: Strings.menuShowHARSource,
                    command: Lib.bind(this.showHARSource, this, b, c)
                }))
            },
            showHARSource: function(a, b, c) {
                var d = this.tabView.getTab("DOM");
                d && (d.select("DOM"), d.highlightFile(b, c))
            }
        });
        return PreviewTab
    }
}), require.def("tabs/schemaTab", ["domplate/domplate", "domplate/tabView", "core/lib", "i18n!nls/harViewer", "syntax-highlighter/shCore", "core/trace"], function(Domplate, TabView, Lib, Strings, dp, Trace) {
    with(Domplate) {
        function SchemaTab() {}
        SchemaTab.prototype = {
            id: "Schema",
            label: Strings.schemaTabLabel,
            bodyTag: PRE({
                "class": "javascript:nocontrols:",
                name: "code"
            }),
            onUpdateBody: function(a, b) {
                $.ajax({
                    url: "scripts/preview/harSchema.js",
                    context: this,
                    success: function(a) {
                        var c = b.firstChild;
                        c.innerHTML = a, dp.SyntaxHighlighter.HighlightAll(c)
                    },
                    error: function(a, b) {
                        Trace.error("SchemaTab.onUpdateBody; ERROR ", a)
                    }
                })
            }
        };
        return SchemaTab
    }
}), define("nls/domTab", {
    root: {
        domTabLabel: "HAR",
        searchDisabledForIE: "You need Mozilla or WebKit based browser to search in HAR",
        searchOptionJsonQuery: "JSON Query",
        tableView: "Table View",
        searchResultsDefaultText: "JSON Query Results",
        searchPlaceholder: "Search",
        jsonQueryPlaceholder: "JSON Query",
        queryResultsTableView: "Table View"
    }
}), define("nls/search", {
    root: {
        search: "Search",
        caseSensitive: "Case Sensitive"
    }
}), require.def("tabs/search", ["domplate/domplate", "core/lib", "i18n!nls/search", "domplate/toolbar", "domplate/popupMenu", "core/cookies", "core/dragdrop"], function(Domplate, Lib, Strings, Toolbar, Menu, Cookies, DragDrop) {
    with(Domplate) {
        var Search = {},
            caseSensitiveOption = "searchCaseSensitive";
        Search.Box = domplate({
            tag: SPAN({
                "class": "searchBox"
            }, SPAN({
                "class": "toolbarSeparator resizer"
            }, "&nbsp;"), SPAN({
                "class": "searchTextBox"
            }, INPUT({
                "class": "searchInput",
                type: "text",
                placeholder: Strings.search,
                onkeydown: "$onKeyDown"
            }), SPAN({
                "class": "arrow",
                onclick: "$onOpenOptions"
            }, "&nbsp;"))),
            onKeyDown: function(a) {
                var b = $.event.fix(a || window.event),
                    c = Lib.getAncestorByClass(b.target, "tabBody"),
                    d = Lib.getElementByClass(c, "searchInput");
                setTimeout(Lib.bindFixed(this.search, this, c, b.keyCode, d.value))
            },
            initialize: function(a) {
                var b = Lib.getElementByClass(a, "searchInput"),
                    c = Lib.getElementByClass(a, "resizer");
                Search.Resizer.initialize(b, c)
            },
            search: function(a, b, c) {
                var d = Lib.getElementByClass(a, "searchBox"),
                    e = Lib.getElementByClass(a, "searchInput");
                e.removeAttribute("status");
                var f = e.value;
                if (f != c || b == 13) {
                    if (b != 13 && Lib.isWebkit) return;
                    var g = a.repObject.onSearch(f, b);
                    g || e.setAttribute("status", "notfound")
                }
            },
            onOpenOptions: function(a) {
                var b = Lib.fixEvent(a);
                Lib.cancelEvent(a);
                if (Lib.isLeftClick(a)) {
                    var c = b.target,
                        d = this.getMenuItems(c),
                        e = new Menu({
                            id: "searchOptions",
                            items: d
                        });
                    e.showPopup(c)
                }
            },
            getMenuItems: function(a) {
                var b = Lib.getAncestorByClass(a, "tabBody"),
                    c = b.repObject.getSearchOptions();
                c.push("-"), c.push({
                    label: Strings.caseSensitive,
                    checked: Cookies.getBooleanCookie(caseSensitiveOption),
                    command: Lib.bindFixed(this.onOption, this, caseSensitiveOption)
                });
                return c
            },
            onOption: function(a) {
                Cookies.toggleCookie(a);
                var b = Lib.getElementByClass(document.documentElement, "searchInput");
                b.removeAttribute("status")
            }
        }), Search.ObjectSearch = function(a, b, c, d) {
            this.text = a, this.reverse = c, this.caseSensitive = d, this.stack = [], this.stack.push({
                object: b,
                propIndex: 0,
                startOffset: -1
            }), this.matches = []
        }, Search.ObjectSearch.prototype = {
            findNext: function(a) {
                while (this.stack.length > 0) {
                    var b = this.getCurrentScope(),
                        c = this.find(b);
                    if (c) return c
                }
                return !1
            },
            find: function(a) {
                var b = 0;
                for (var c in a.object) {
                    b++;
                    if (a.propIndex >= b) continue;
                    var d = a.object[c];
                    if (!d) continue;
                    a.propIndex = b;
                    if (typeof d == "object") {
                        this.stack.push({
                            propIndex: 0,
                            object: d,
                            startOffset: -1
                        });
                        return !1
                    }
                    var e = this.text,
                        f = d + "";
                    Cookies.getBooleanCookie(caseSensitiveOption) || (f = f.toLowerCase(), e = e.toLowerCase());
                    var g = a.startOffset < 0 ? 0 : a.startOffset,
                        h = f.indexOf(e, g);
                    if (h >= 0) {
                        a.propIndex += -1, a.startOffset = h + e.length, this.matches.push({
                            value: d,
                            startOffset: h
                        });
                        return !0
                    }
                }
                this.stack.pop();
                return !1
            },
            getCurrentScope: function() {
                return this.stack[this.stack.length - 1]
            },
            getCurrentMatch: function() {
                return this.matches[this.matches.length - 1]
            },
            selectText: function(a) {
                var b = this.getCurrentMatch();
                Lib.selectElementText(a, b.startOffset, b.startOffset + this.text.length)
            }
        }, Search.Resizer = domplate({
            initialize: function(a, b) {
                this.searchInput = a, this.tracker = new DragDrop.Tracker(b, {
                    onDragStart: Lib.bind(this.onDragStart, this),
                    onDragOver: Lib.bind(this.onDragOver, this),
                    onDrop: Lib.bind(this.onDrop, this)
                })
            },
            onDragStart: function(a) {
                var b = Lib.getBody(this.searchInput.ownerDocument);
                b.setAttribute("vResizing", "true"), this.startWidth = this.searchInput.clientWidth - 20
            },
            onDragOver: function(a, b) {
                var c = this.startWidth - a.x,
                    d = Lib.getAncestorByClass(this.searchInput, "toolbar");
                c <= d.clientWidth - 40 && (this.searchInput.style.width = c + "px")
            },
            onDrop: function(a) {
                var b = Lib.getBody(this.searchInput.ownerDocument);
                b.removeAttribute("vResizing")
            }
        });
        return Search
    }
}), require.def("domplate/domTree", ["domplate/domplate", "core/lib", "core/trace"], function(Domplate, Lib, Trace) {
    with(Domplate) {
        function DomTree(a) {
            this.input = a
        }
        DomTree.prototype = domplate({
            tag: TABLE({
                "class": "domTable",
                cellpadding: 0,
                cellspacing: 0,
                onclick: "$onClick"
            }, TBODY(FOR("member", "$object|memberIterator", TAG("$member|getRowTag", {
                member: "$member"
            })))),
            rowTag: TR({
                "class": "memberRow $member.open $member.type\\Row $member|hasChildren",
                $hasChildren: "$member|hasChildren",
                _repObject: "$member",
                level: "$member.level"
            }, TD({
                "class": "memberLabelCell",
                style: "padding-left: $member.indent\\px"
            }, SPAN({
                "class": "memberLabel $member.type\\Label"
            }, "$member.name")), TD({
                "class": "memberValueCell"
            }, TAG("$member.tag", {
                object: "$member|getValue"
            }))),
            loop: FOR("member", "$members", TAG("$member|getRowTag", {
                member: "$member"
            })),
            hasChildren: function(a) {
                return a.hasChildren ? "hasChildren" : ""
            },
            memberIterator: function(a) {
                return this.getMembers(a)
            },
            getValue: function(a) {
                return a.value
            },
            getRowTag: function(a) {
                return this.rowTag
            },
            onClick: function(a) {
                var b = Lib.fixEvent(a);
                if (Lib.isLeftClick(b)) {
                    var c = Lib.getAncestorByClass(b.target, "memberRow"),
                        d = Lib.getAncestorByClass(b.target, "memberLabel");
                    d && Lib.hasClass(c, "hasChildren") && this.toggleRow(c)
                }
            },
            toggleRow: function(a, b) {
                if (a) {
                    var c = parseInt(a.getAttribute("level"));
                    if (b && Lib.hasClass(a, "opened")) return;
                    if (Lib.hasClass(a, "opened")) {
                        Lib.removeClass(a, "opened");
                        var d = a.parentNode;
                        for (var e = a.nextSibling; e; e = a.nextSibling) {
                            if (parseInt(e.getAttribute("level")) <= c) break;
                            d.removeChild(e)
                        }
                    } else {
                        Lib.setClass(a, "opened");
                        var f = a.repObject;
                        if (f) {
                            if (!f.hasChildren) return;
                            var g = this.getMembers(f.value, c + 1);
                            g && this.loop.insertRows({
                                members: g
                            }, a)
                        }
                    }
                }
            },
            getMembers: function(a, b) {
                b || (b = 0);
                var c = [];
                for (var d in a) {
                    var e = a[d];
                    typeof e != "function" && c.push(this.createMember("dom", d, e, b))
                }
                return c
            },
            createMember: function(a, b, c, d) {
                var e = typeof c,
                    f = this.hasProperties(c) && e == "object",
                    g = DomTree.Reps.getRep(c);
                return {
                    name: b,
                    value: c,
                    type: a,
                    rowClass: "memberRow-" + a,
                    open: "",
                    level: d,
                    indent: d * 16,
                    hasChildren: f,
                    tag: g.tag
                }
            },
            hasProperties: function(a) {
                if (typeof a == "string") return !1;
                try {
                    for (var b in a) return !0
                } catch (c) {}
                return !1
            },
            append: function(a) {
                this.element = this.tag.append({
                    object: this.input
                }, a), this.element.repObject = this;
                var b = Lib.isArray(this.input) && this.input.length > 2,
                    c = this.element.firstChild.firstChild;
                c && !b && this.toggleRow(c)
            },
            expandRow: function(a) {
                var b = this.getRow(a);
                this.toggleRow(b, !0);
                return b
            },
            getRow: function(a) {
                if (this.element) {
                    var b = Lib.getElementsByClass(this.element, "memberRow");
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c];
                        if (d.repObject.value == a) return d
                    }
                    return null
                }
            }
        });

        function safeToString(a) {
            try {
                return a.toString()
            } catch (b) {
                return ""
            }
        }
        var OBJECTBOX = DIV({
            "class": "objectBox objectBox-$className"
        });
        DomTree.Reps = {
            reps: [],
            registerRep: function() {
                this.reps.push.apply(this.reps, arguments)
            },
            getRep: function(a) {
                var b = typeof a;
                b == "object" && a instanceof String && (b = "string");
                for (var c = 0; c < this.reps.length; ++c) {
                    var d = this.reps[c];
                    try {
                        if (d.supportsObject(a, b)) return d
                    } catch (e) {
                        Trace.exception("domTree.getRep; ", e)
                    }
                }
                return DomTree.Rep
            }
        }, DomTree.Rep = domplate({
            tag: OBJECTBOX("$object|getTitle"),
            className: "object",
            getTitle: function(a) {
                var b = safeToString(a),
                    c = /\[object (.*?)\]/,
                    d = c.exec(b);
                return d ? d[1] : b
            },
            getTooltip: function(a) {
                return null
            },
            supportsObject: function(a, b) {
                return !1
            }
        }), DomTree.Reps.Null = domplate(DomTree.Rep, {
            tag: OBJECTBOX("null"),
            className: "null",
            supportsObject: function(a, b) {
                return a == null
            }
        }), DomTree.Reps.Number = domplate(DomTree.Rep, {
            tag: OBJECTBOX("$object"),
            className: "number",
            supportsObject: function(a, b) {
                return b == "boolean" || b == "number"
            }
        }), DomTree.Reps.String = domplate(DomTree.Rep, {
            tag: OBJECTBOX("$object"),
            className: "string",
            supportsObject: function(a, b) {
                return b == "string"
            }
        }), DomTree.Reps.Arr = domplate(DomTree.Rep, {
            tag: OBJECTBOX("$object|getTitle"),
            className: "array",
            supportsObject: function(a, b) {
                return Lib.isArray(a)
            },
            getTitle: function(a) {
                return "Array [" + a.length + "]"
            }
        }), DomTree.Reps.Tree = domplate(DomTree.Rep, {
            tag: OBJECTBOX(TAG("$object|getTag", {
                object: "$object|getRoot"
            })),
            className: "tree",
            getTag: function(a) {
                return Tree.tag
            },
            getRoot: function(a) {
                return [a]
            },
            supportsObject: function(a, b) {
                return b == "object"
            }
        });
        var Tree = domplate(DomTree.prototype, {
            createMember: function(a, b, c, d) {
                var e = DomTree.prototype.createMember(a, b, c, d);
                d == 0 && (e.name = "", e.type = "tableCell");
                return e
            }
        });
        DomTree.Reps.registerRep(DomTree.Reps.Null, DomTree.Reps.Number, DomTree.Reps.String, DomTree.Reps.Arr);
        return DomTree
    }
}), define("nls/tableView", {
    root: {
        objectProperties: "Object Properties"
    }
}), require.def("domplate/tableView", ["domplate/domplate", "core/lib", "i18n!nls/tableView", "domplate/domTree", "core/trace"], function(Domplate, Lib, Strings, DomTree, Trace) {
    with(Domplate) {
        var TableView = domplate({
            className: "table",
            tag: DIV({
                "class": "dataTableSizer",
                tabindex: "-1"
            }, TABLE({
                "class": "dataTable",
                cellspacing: 0,
                cellpadding: 0,
                width: "100%",
                role: "grid"
            }, THEAD({
                "class": "dataTableThead",
                role: "presentation"
            }, TR({
                "class": "headerRow focusRow dataTableRow subFocusRow",
                role: "row",
                onclick: "$onClickHeader"
            }, FOR("column", "$object.columns", TH({
                "class": "headerCell a11yFocus",
                role: "columnheader",
                $alphaValue: "$column.alphaValue"
            }, DIV({
                "class": "headerCellBox"
            }, "$column.label"))))), TBODY({
                "class": "dataTableTbody",
                role: "presentation"
            }, FOR("row", "$object.data|getRows", TR({
                "class": "focusRow dataTableRow subFocusRow",
                role: "row"
            }, FOR("column", "$row|getColumns", TD({
                "class": "a11yFocus dataTableCell",
                role: "gridcell"
            }, TAG("$column|getValueTag", {
                object: "$column"
            })))))))),
            getValueTag: function(a) {
                var b = typeof a;
                if (b == "object") return DomTree.Reps.Tree.tag;
                var c = DomTree.Reps.getRep(a);
                return c.shortTag || c.tag
            },
            getRows: function(a) {
                var b = this.getProps(a);
                if (!b.length) return [];
                return b
            },
            getColumns: function(a) {
                if (typeof a != "object") return [a];
                var b = [];
                for (var c = 0; c < this.columns.length; c++) {
                    var d = this.columns[c].property;
                    if (d) if (typeof a[d] === "undefined") {
                        var e = typeof d == "string" ? d.split(".") : [d],
                            f = a;
                        for (var g in e) f = f && f[e[g]] || undefined
                    } else f = a[d];
                    else f = a;
                    b.push(f)
                }
                return b
            },
            getProps: function(a) {
                if (typeof a != "object") return [a];
                if (a.length) return Lib.cloneArray(a);
                var b = [];
                for (var c in a) {
                    var d = a[c];
                    this.domFilter(d, c) && b.push(d)
                }
                return b
            },
            onClickHeader: function(a) {
                var b = Lib.getAncestorByClass(a.target, "dataTable"),
                    c = Lib.getAncestorByClass(a.target, "headerCell");
                if (c) {
                    var d = !Lib.hasClass(c, "alphaValue"),
                        e = 0;
                    for (c = c.previousSibling; c; c = c.previousSibling)++e;
                    this.sort(b, e, d)
                }
            },
            sort: function(a, b, c) {
                var d = Lib.getChildByClass(a, "dataTableTbody"),
                    e = Lib.getChildByClass(a, "dataTableThead"),
                    f = [];
                for (var g = d.childNodes[0]; g; g = g.nextSibling) {
                    var h = g.childNodes[b],
                        i = c ? parseFloat(h.textContent) : h.textContent;
                    f.push({
                        row: g,
                        value: i
                    })
                }
                f.sort(function(a, b) {
                    return a.value < b.value ? -1 : 1
                });
                var j = e.firstChild,
                    k = Lib.getChildByClass(j, "headerSorted");
                Lib.removeClass(k, "headerSorted"), k && k.removeAttribute("aria-sort");
                var l = j.childNodes[b];
                Lib.setClass(l, "headerSorted");
                if (l.sorted && l.sorted != 1) {
                    Lib.removeClass(l, "sortedAscending"), Lib.setClass(l, "sortedDescending"), l.setAttribute("aria-sort", "descending"), l.sorted = 1;
                    for (var m = f.length - 1; m >= 0; --m) d.appendChild(f[m].row)
                } else {
                    Lib.removeClass(l, "sortedDescending"), Lib.setClass(l, "sortedAscending"), l.setAttribute("aria-sort", "ascending"), l.sorted = -1;
                    for (var m = 0; m < f.length; ++m) d.appendChild(f[m].row)
                }
            },
            getHeaderColumns: function(a) {
                var b;
                for (var c in a) {
                    b = a[c];
                    break
                }
                if (typeof b != "object") return [{
                    label: Strings.objectProperties
                }];
                var d = [];
                for (var c in b) {
                    var e = b[c];
                    if (!this.domFilter(e, c)) continue;
                    d.push({
                        property: c,
                        label: c,
                        alphaValue: typeof e != "number"
                    })
                }
                return d
            },
            domFilter: function(a, b) {
                return !0
            },
            render: function(a, b, c) {
                if (b) {
                    var d = [];
                    for (var e = 0; c && e < c.length; e++) {
                        var f = c[e],
                            g = typeof f.property != "undefined" ? f.property : f,
                            h = typeof f.label != "undefined" ? f.label : g;
                        d.push({
                            property: g,
                            label: h,
                            alphaValue: !0
                        })
                    }
                    d.length || (d = this.getHeaderColumns(b));
                    try {
                        this.columns = d;
                        var i = {
                                data: b,
                                columns: d
                            },
                            j = this.tag.append({
                                object: i,
                                columns: d
                            }, a),
                            k = Lib.getElementByClass(j, "dataTableTbody"),
                            l = 200;
                        l > 0 && k.clientHeight > l && (k.style.height = l + "px")
                    } catch (m) {
                        Trace.exception("tableView.render; EXCEPTION " + m, m)
                    } finally {
                        delete this.columns
                    }
                }
            }
        });
        return TableView
    }
}), function() {
    function distinctFilter(a, b) {
        var c = [],
            d = {};
        for (var e = 0, f = a.length; e < f; ++e) {
            var g = a[e];
            b(g, e, a) && (typeof g == "object" && g ? g.__included || (g.__included = !0, c.push(g)) : d[g + typeof g] || (d[g + typeof g] = !0, c.push(g)))
        }
        for (e = 0, f = c.length; e < f; ++e) c[e] && delete c[e].__included;
        return c
    }
    function expand(a, b) {
        function d(a) {
            b && (b !== !0 || a instanceof Array ? a[b] && c.push(a[b]) : c.push(a));
            for (var e in a) {
                var f = a[e];
                b ? f && typeof f == "object" && d(f) : c.push(f)
            }
        }
        var c = [];
        if (b instanceof Array) {
            if (b.length == 1) return a[b[0]];
            for (var e = 0; e < b.length; e++) c.push(a[b[e]])
        } else d(a);
        return c
    }
    function slice(a, b, c, d) {
        var e = a.length,
            f = [];
        c = c || e, b = b < 0 ? Math.max(0, b + e) : Math.min(e, b), c = c < 0 ? Math.max(0, c + e) : Math.min(e, c);
        for (var g = b; g < c; g += d) f.push(a[g]);
        return f
    }
    function filter(a, b) {
        var c = a.length;
        if (typeof b != "function") throw new TypeError;
        var d = [],
            e = arguments[2];
        for (var f = 0; f < c; f++) if (f in a) {
            var g = a[f];
            b.call(e, g, f, a) && d.push(g)
        }
        return d
    }
    function map(a, b) {
        var c = a.length;
        if (typeof b != "function") throw new TypeError;
        var d = Array(c),
            e = arguments[2];
        for (var f = 0; f < c; f++) f in a && (d[f] = b.call(e, a[f], f, a));
        return d
    }
    var JSONQuery = function(query, obj) {
        function makeRegex(a, b, c, d, e) {
            return str[e].match(/[\*\?]/) || d == "~" ? "/^" + str[e].substring(1, str[e].length - 1).replace(/\\([btnfr\\"'])|([^\w\*\?])/g, "\\$1$2").replace(/([\*\?])/g, ".$1") + (d == "~" ? "$/i" : "$/") + ".test(" + b + ")" : a
        }
        function call(a) {
            prefix = a + "(" + prefix
        }
        tokens = [];
        var depth = 0,
            str = [];
        query = query.replace(/"(\\.|[^"\\])*"|'(\\.|[^'\\])*'|[\[\]]/g, function(a) {
            depth += a == "[" ? 1 : a == "]" ? -1 : 0;
            return a == "]" && depth > 0 ? "`]" : a.charAt(0) == '"' || a.charAt(0) == "'" ? "`" + (str.push(a) - 1) : a
        });
        var prefix = "";
        query.replace(/(\]|\)|push|pop|shift|splice|sort|reverse)\s*\(/, function() {
            throw new Error("Unsafe function call")
        }), query = query.replace(/([^=]=)([^=])/g, "$1=$2").replace(/@|(\.\s*)?[a-zA-Z\$_]+(\s*:)?/g, function(a) {
            return a.charAt(0) == "." ? a : a == "@" ? "$obj" : (a.match(/:|^(\$|Math|true|false|null)$/) ? "" : "$obj.") + a
        }).replace(/\.?\.?\[(`\]|[^\]])*\]|\?.*|\.\.([\w\$_]+)|\.\*/g, function(a, b, c) {
                var d = a.match(/^\.?\.?(\[\s*\^?\?|\^?\?|\[\s*==)(.*?)\]?$/);
                if (d) {
                    var e = "";
                    a.match(/^\./) && (call("expand"), e = ",true)"), call(d[1].match(/\=/) ? "map" : d[1].match(/\^/) ? "distinctFilter" : "filter");
                    return e + ",function($obj){return " + d[2] + "})"
                }
                d = a.match(/^\[\s*([\/\\].*)\]/);
                if (d) return ".concat().sort(function(a,b){" + d[1].replace(/\s*,?\s*([\/\\])\s*([^,\\\/]+)/g, function(a, b, c) {
                    return "var av= " + c.replace(/\$obj/, "a") + ",bv= " + c.replace(/\$obj/, "b") + ";if(av>bv||bv==null){return " + (b == "/" ? 1 : -1) + ";}\nif(bv>av||av==null){return " + (b == "/" ? -1 : 1) + ";}\n"
                }) + "})";
                d = a.match(/^\[(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)\]/);
                if (d) {
                    call("slice");
                    return "," + (d[1] || 0) + "," + (d[2] || 0) + "," + (d[3] || 1) + ")"
                }
                if (a.match(/^\.\.|\.\*|\[\s*\*\s*\]|,/)) {
                    call("expand");
                    return (a.charAt(1) == "." ? ",'" + c + "'" : a.match(/,/) ? "," + a : "") + ")"
                }
                return a
            }).replace(/(\$obj\s*(\.\s*[\w_$]+\s*)*)(==|~)\s*`([0-9]+)/g, makeRegex).replace(/`([0-9]+)\s*(==|~)\s*(\$obj(\s*\.\s*[\w_$]+)*)/g, function(a, b, c, d, e) {
                return makeRegex(a, d, e, c, b)
            }), query = prefix + (query.charAt(0) == "$" ? "" : "$") + query.replace(/`([0-9]+|\])/g, function(a, b) {
            return b == "]" ? "]" : str[b]
        });
        var executor = eval("1&&function($,$1,$2,$3,$4,$5,$6,$7,$8,$9){var $obj=$;return " + query + "}");
        for (var i = 0; i < arguments.length - 1; i++) arguments[i] = arguments[i + 1];
        return obj ? executor.apply(this, arguments) : executor
    };
    typeof namespace == "function" ? namespace("json::JSONQuery", JSONQuery) : window.JSONQuery = JSONQuery
}(), define("json-query/JSONQuery", function() {}), require.def("tabs/domTab", ["domplate/domplate", "domplate/tabView", "core/lib", "i18n!nls/domTab", "domplate/toolbar", "tabs/search", "core/dragdrop", "domplate/domTree", "core/cookies", "domplate/tableView", "core/trace", "json-query/JSONQuery"], function(Domplate, TabView, Lib, Strings, Toolbar, Search, DragDrop, DomTree, Cookies, TableView, Trace) {
    with(Domplate) {
        var jsonQueryOption = "searchJsonQuery";

        function DomTab() {
            this.toolbar = new Toolbar, this.toolbar.addButtons(this.getToolbarButtons()), this.tableView = !1
        }
        DomTab.prototype = domplate(TabView.Tab.prototype, {
            id: "DOM",
            label: Strings.domTabLabel,
            separator: DIV({
                "class": "separator"
            }),
            tabBodyTag: DIV({
                "class": "tab$tab.id\\Body tabBody",
                _repObject: "$tab"
            }, DIV({
                "class": "domToolbar"
            }), DIV({
                "class": "domContent"
            })),
            domBox: TABLE({
                "class": "domBox",
                cellpadding: 0,
                cellspacing: 0
            }, TBODY(TR(TD({
                "class": "content"
            }, DIV({
                "class": "title"
            }, "$title")), TD({
                "class": "splitter"
            }), TD({
                "class": "results"
            }, DIV({
                "class": "resultsDefaultContent"
            }, Strings.searchResultsDefaultText))))),
            queryResultsViewType: DIV({
                "class": "queryResultsViewType"
            }, INPUT({
                "class": "type",
                type: "checkbox",
                onclick: "$onTableView"
            }), SPAN({
                "class": "label"
            }, Strings.queryResultsTableView)),
            onUpdateBody: function(a, b) {
                this.toolbar.render(Lib.$(b, "domToolbar"));
                if (Lib.isIE) {
                    var c = Lib.getElementByClass(b, "searchBox"),
                        d = Lib.getElementByClass(c, "searchInput");
                    d.setAttribute("disabled", "true"), d.setAttribute("title", Strings.searchDisabledForIE);
                    var e = Lib.getElementByClass(c, "arrow");
                    e.setAttribute("disabled", "true")
                }
                this.updateSearchResultsUI()
            },
            getToolbarButtons: function() {
                var a = [];
                a.push({
                    id: "search",
                    tag: Search.Box.tag,
                    initialize: Search.Box.initialize
                });
                return a
            },
            createSearchObject: function(a) {
                var b = Lib.getElementsByClass(this._body, "domTable");
                b = Lib.cloneArray(b);
                var c = b.map(function(a) {
                    return a.repObject.input
                });
                return new Search.ObjectSearch(a, c, !1, !1)
            },
            getSearchOptions: function() {
                var a = [];
                a.push({
                    label: Strings.searchOptionJsonQuery,
                    checked: Cookies.getBooleanCookie(jsonQueryOption),
                    command: Lib.bindFixed(this.onOption, this, jsonQueryOption)
                });
                return a
            },
            onOption: function(a) {
                Search.Box.onOption(a), this.updateSearchResultsUI()
            },
            updateSearchResultsUI: function() {
                var a = Cookies.getBooleanCookie(jsonQueryOption),
                    b = Lib.getElementsByClass(this._body, "domBox");
                for (var c = 0; c < b.length; c++) {
                    var d = b[c],
                        e = Lib.getElementByClass(d, "results"),
                        f = Lib.getElementByClass(d, "splitter");
                    a ? (Lib.setClass(e, "visible"), Lib.setClass(f, "visible")) : (Lib.removeClass(e, "visible"), Lib.removeClass(f, "visible"))
                }
                var g = Lib.getElementByClass(this._body, "searchInput");
                if (g) {
                    var h = a ? Strings.jsonQueryPlaceholder : Strings.searchPlaceholder;
                    g.setAttribute("placeholder", h)
                }
                var g = Lib.getElementByClass(this._body, "searchInput")
            },
            onSearch: function(a, b) {
                var c = Cookies.getBooleanCookie(jsonQueryOption);
                if (c) return this.evalJsonQuery(a, b);
                if (a.length < 3) return !0;
                this.currSearch && this.currSearch.text != a && (this.currSearch = null), this.currSearch || (this.currSearch = this.createSearchObject(a));
                if (this.currSearch.findNext(a)) {
                    var d = this.currSearch.stack[1].object,
                        e = this.getDomTree(d);
                    for (var f = 0; f < this.currSearch.stack.length; f++) e.expandRow(this.currSearch.stack[f].object);
                    var g = this.currSearch.getCurrentMatch(),
                        h = e.getRow(g.value);
                    if (h) {
                        var i = h.querySelector(".memberValueCell .objectBox");
                        this.currSearch.selectText(i.firstChild), Lib.scrollIntoCenterView(i)
                    }
                    return !0
                }
                this.currSearch.matches.length > 0 && (this.currSearch = this.createSearchObject(a));
                return !1
            },
            evalJsonQuery: function(a, b) {
                if (b != 13) return !0;
                var c = Lib.getElementsByClass(this._body, "domBox");
                for (var d = 0; d < c.length; d++) {
                    var e = c[d],
                        f = Lib.getElementByClass(e, "domTable"),
                        g = f.repObject.input,
                        h = e.querySelector(".domBox .results");
                    Lib.clearNode(h);
                    try {
                        var i = this.queryResultsViewType.append({}, h);
                        if (this.tableView) {
                            var j = Lib.getElementByClass(i, "type");
                            j.setAttribute("checked", "true")
                        }
                        var k = JSONQuery(a, g);
                        h.repObject = k;
                        if (this.tableView) TableView.render(h, k);
                        else {
                            var l = new DomTree(k);
                            l.append(h)
                        }
                    } catch (m) {
                        Trace.exception(m)
                    }
                }
                return !0
            },
            onTableView: function(a) {
                var b = Lib.fixEvent(a),
                    c = b.target,
                    d = Lib.getAncestorByClass(c, "tabBody"),
                    e = $(c).attr("checked");
                d.repObject.tableView = e;
                var f = Lib.getAncestorByClass(c, "results"),
                    g = f.repObject,
                    h = Lib.getElementByClass(f, "domTable");
                h && h.parentNode.removeChild(h);
                var i = Lib.getElementByClass(f, "dataTableSizer");
                i && i.parentNode.removeChild(i);
                if (e) TableView.render(f, g);
                else {
                    var j = new DomTree(g);
                    j.append(f)
                }
            },
            append: function(a) {
                var b = Lib.$(this._body, "domContent"),
                    c = [];
                for (var d = 0; d < a.log.pages.length; d++) {
                    var e = a.log.pages[d];
                    c.push(e.title)
                }
                var f = this.domBox.append({
                        title: c.join(", ")
                    }, b),
                    g = Lib.getElementByClass(f, "content"),
                    h = Lib.getElementByClass(f, "splitter");
                this.splitter = new DragDrop.Tracker(h, {
                    onDragStart: Lib.bind(this.onDragStart, this),
                    onDragOver: Lib.bind(this.onDragOver, this),
                    onDrop: Lib.bind(this.onDrop, this)
                }), this.updateSearchResultsUI();
                var i = new DomTree(a);
                i.append(g), this.separator.append({}, b)
            },
            getDomTree: function(a) {
                var b = Lib.getElementsByClass(this._body, "domTable");
                for (var c = 0; c < b.length; c++) {
                    var d = b[c].repObject;
                    if (d.input == a) return d
                }
                return null
            },
            highlightFile: function(a, b) {
                var c = this.getDomTree(a);
                if (c) {
                    c.expandRow(a.log), c.expandRow(a.log.entries);
                    var d = c.expandRow(b);
                    d && Lib.setClassTimed(d, "jumpHighlight");
                    var e = Lib.$(this._body, "domContent");
                    e.scrollTop = d.offsetTop
                }
            },
            onDragStart: function(a) {
                var b = Lib.getBody(this._body.ownerDocument);
                b.setAttribute("vResizing", "true");
                var c = Lib.getAncestorByClass(a.element, "domBox"),
                    d = Lib.getElementByClass(c, "content");
                this.startWidth = d.clientWidth
            },
            onDragOver: function(a, b) {
                var c = Lib.getAncestorByClass(b.element, "domBox"),
                    d = Lib.getElementByClass(c, "content"),
                    e = this.startWidth + a.x;
                d.style.width = e + "px"
            },
            onDrop: function(a) {
                var b = Lib.getBody(this._body.ownerDocument);
                b.removeAttribute("vResizing")
            }
        });
        return DomTab
    }
}), require.def("harViewer", ["domplate/tabView", "tabs/homeTab", "tabs/aboutTab", "tabs/previewTab", "tabs/schemaTab", "tabs/domTab", "preview/harModel", "i18n!nls/harViewer", "preview/requestList", "core/lib", "core/trace"], function(a, b, c, d, e, f, g, h, i, j, k) {
    function l() {
        this.id = "harView", this.model = new g, this.appendTab(new b), this.appendTab(new d(this.model)), this.appendTab(new f), this.appendTab(new c), this.appendTab(new e)
    }
    l.prototype = j.extend(new a, {
        initialize: function(a) {
            this.version = a.getAttribute("version"), this.harSpecURL = "http://www.softwareishard.com/blog/har-12-spec/", this.render(a), this.selectTabByName("Home");
            var b = j.bind(this.appendPreview, this),
                c = j.bind(this.onLoadError, this);
            if (g.Loader.run(b, c)) {
                var d = this.getTab("Home");
                d && d.loadInProgress(!0)
            }
        },
        appendPreview: function(a) {
            var b = this.getTab("Home"),
                c = this.getTab("Preview"),
                d = this.getTab("DOM");
            try {
                var e = $("#validate").attr("checked"),
                    f = g.parse(a, e);
                this.model.append(f);
                if (c) try {
                    c.select(), c.append(f)
                } catch (h) {
                    k.exception("HarView.appendPreview; EXCEPTION ", h), h.errors && c && c.appendError(h)
                }
                d && d.append(f)
            } catch (h) {
                k.exception("HarView.appendPreview; EXCEPTION ", h), h.errors && c && c.appendError(h), h.input && d.append(h.input)
            }
            c.select(), b && b.loadInProgress(!1), j.fireEvent(m, "onViewerHARLoaded")
        },
        onLoadError: function(a, b) {
            var c = this.getTab("Home");
            c && c.loadInProgress(!0, a.statusText), k.error("harModule.loadRemoteArchive; ERROR ", a, b)
        },
        loadHar: function(a, b) {
            b = b || {};
            return g.Loader.load(this, a, b.jsonp, b.jsonpCallback, b.success, b.ajaxError)
        },
        setPreviewColumns: function(a, b) {
            i.setVisibleColumns(a, b)
        }
    });
    var m = document.getElementById("content"),
        n = m.repObject = new l;
    j.fireEvent(m, "onViewerPreInit"), n.initialize(m), j.fireEvent(m, "onViewerInit"), k.log("HarViewer; initialized OK")
})