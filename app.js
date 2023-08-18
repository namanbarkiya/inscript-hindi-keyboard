document.onkeyup = function (e) {
    if (e.ctrlKey && e.shiftKey && e.which == 90) {
        var redo_btn = document.getElementById("redo");
        redo_btn.click();
    } else if (e.ctrlKey && e.which == 90) {
        var undo_btn = document.getElementById("undo");
        undo_btn.click();
    }
};
function downloadFile(filename, content) {
    const element = document.createElement("a");
    const blob = new Blob([content], { type: "plain/text" });
    const fileUrl = URL.createObjectURL(blob);

    element.setAttribute("href", fileUrl); //file location
    element.setAttribute("download", `${filename}.txt`); // file name
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}

window.onload = () => {
    document.getElementById("download").addEventListener("click", (e) => {
        const filename = document.getElementById("filename").value;
        const content = document.getElementById("editor").value;

        if (filename && content) {
            downloadFile(filename, content);
        }
    });
};
(function () {
    var a = {};
    a.util = {
        mobile: /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        ),
        opera:
            (!!window.opr && !!opr.addons) ||
            !!window.opera ||
            navigator.userAgent.indexOf(" OPR/") >= 0,
        mozilla: typeof InstallTrigger !== "undefined",
        windowWidth: function () {
            var i = window.document.documentElement.clientWidth,
                e = window.document.body;
            return (
                (window.document.compatMode === "CSS1Compat" && i) ||
                (e && e.clientWidth) ||
                i
            );
        },
        code: function (i) {
            if (!i) {
                var i = window.event;
            }
            if (i.code != undefined && i.key != undefined) {
                return i.code;
            }
            return "Unidentified";
        },
        keyCode: function (t) {
            if (!t) {
                var t = window.event;
            }
            var i = t.keyCode;
            if (this.mozilla) {
                switch (i) {
                    case 59:
                        i = 186;
                        break;
                    case 107:
                        i = 187;
                        break;
                    case 109:
                        i = 189;
                        break;
                    case 61:
                        i = 187;
                        break;
                    case 173:
                        i = 189;
                        break;
                }
            }
            if (this.opera) {
                switch (i) {
                    case 59:
                        i = 186;
                        break;
                    case 61:
                        i = 187;
                        break;
                    case 109:
                        i = 189;
                        break;
                }
            }
            if (i == 18 && t.location && t.location == 2) {
                i = 255;
            }
            return i;
        },
        preventDefault: function (i) {
            if (!i) {
                var i = window.event;
            }
            i.preventDefault ? i.preventDefault() : (i.returnValue = false);
        },
        srcId: function (i, t, v) {
            if (!i) {
                var i = window.event;
            }
            var u;
            if (i.target) {
                u = i.target;
            } else {
                if (i.srcElement) {
                    u = i.srcElement;
                }
            }
            if (u.nodeType == 3) {
                u = target.parentNode;
            }
            while (u.tagName.toLowerCase() != v) {
                u = u.parentNode;
                if (u == t || u.tagName.toLowerCase() == "body") {
                    return null;
                }
            }
            return u.id;
        },
        insertAtCaret: function (i, w) {
            var v = this.getSelectionStart(i);
            var t = this.getSelectionEnd(i);
            var u = i.value.length;
            i.value = i.value.substring(0, v) + w + i.value.substring(t, u);
            this.setCaretPosition(i, v + w.length, 0);
        },
        deleteAtCaret: function (u, t, i) {
            var x = this.getSelectionStart(u);
            var v = this.getSelectionEnd(u);
            var w = u.value.length;
            if (t > x) {
                t = x;
            }
            if (v + i > w) {
                i = w - v;
            }
            var y = u.value.substring(x - t, v + i);
            u.value = u.value.substring(0, x - t) + u.value.substring(v + i);
            this.setCaretPosition(u, x - t, 0);
            return y;
        },
        getSelectionStart: function (i) {
            i.focus();
            if (i.selectionStart !== undefined) {
                return i.selectionStart;
            } else {
                if (document.selection) {
                    var t = document.selection.createRange();
                    if (t == null) {
                        return 0;
                    }
                    var v = i.createTextRange();
                    var u = v.duplicate();
                    v.moveToBookmark(t.getBookmark());
                    u.setEndPoint("EndToStart", v);
                    return u.text.length;
                }
            }
            return 0;
        },
        getSelectionEnd: function (i) {
            i.focus();
            if (i.selectionEnd !== undefined) {
                return i.selectionEnd;
            } else {
                if (document.selection) {
                    var t = document.selection.createRange();
                    if (t == null) {
                        return 0;
                    }
                    var v = i.createTextRange();
                    var u = v.duplicate();
                    v.moveToBookmark(t.getBookmark());
                    u.setEndPoint("EndToStart", v);
                    return u.text.length + t.text.length;
                }
            }
            return i.value.length;
        },
        setCaretPosition: function (t, v, i) {
            var u = t.value.length;
            if (v > u) {
                v = u;
            }
            if (v + i > u) {
                i = u - i;
            }
            t.focus();
            if (t.setSelectionRange) {
                t.setSelectionRange(v, v + i);
            } else {
                if (t.createTextRange) {
                    var w = t.createTextRange();
                    w.collapse(true);
                    w.moveEnd("character", v + i);
                    w.moveStart("character", v);
                    w.select();
                }
            }
            t.focus();
        },
        selectAll: function (i) {
            this.setCaretPosition(i, 0, i.value.length);
        },
        fromCharCodeS: function () {
            var v = arguments.length;
            var w = "";
            var e, u, x;
            for (var t = 0; t < v; t++) {
                x = arguments[t];
                if (x < 1114112 && 65535 < x) {
                    e = Math.floor((x - 65536) / 1024) + 55296;
                    u = ((x - 65536) % 1024) + 56320;
                    w = w + String.fromCharCode(e, u);
                } else {
                    if (x < 65536) {
                        w = w + String.fromCharCode(x);
                    }
                }
            }
            return w;
        },
    };
    a.layout = function () {
        this.keys = [];
        this.deadkeys = [];
        this.dir = "ltr";
        this.name = "US";
        this.lang = "en";
    };
    a.layout.prototype.loadDefault = function () {
        this.keys = [
            { i: "k0", c: "0", n: "`", s: "~" },
            { i: "k1", c: "0", n: "1", s: "!" },
            { i: "k2", c: "0", n: "2", s: "@" },
            { i: "k3", c: "0", n: "3", s: "#" },
            { i: "k4", c: "0", n: "4", s: "$" },
            { i: "k5", c: "0", n: "5", s: "%" },
            { i: "k6", c: "0", n: "6", s: "^" },
            { i: "k7", c: "0", n: "7", s: "&" },
            { i: "k8", c: "0", n: "8", s: "*" },
            { i: "k9", c: "0", n: "9", s: "(" },
            { i: "k10", c: "0", n: "0", s: ")" },
            { i: "k11", c: "0", n: "-", s: "_" },
            { i: "k12", c: "0", n: "=", s: "+" },
            { i: "k13", c: "1", n: "q", s: "Q" },
            { i: "k14", c: "1", n: "w", s: "W" },
            { i: "k15", c: "1", n: "e", s: "E" },
            { i: "k16", c: "1", n: "r", s: "R" },
            { i: "k17", c: "1", n: "t", s: "T" },
            { i: "k18", c: "1", n: "y", s: "Y" },
            { i: "k19", c: "1", n: "u", s: "U" },
            { i: "k20", c: "1", n: "i", s: "I" },
            { i: "k21", c: "1", n: "o", s: "O" },
            { i: "k22", c: "1", n: "p", s: "P" },
            { i: "k23", c: "0", n: "[", s: "{" },
            { i: "k24", c: "0", n: "]", s: "}" },
            { i: "k25", c: "0", n: "\\", s: "|" },
            { i: "k26", c: "1", n: "a", s: "A" },
            { i: "k27", c: "1", n: "s", s: "S" },
            { i: "k28", c: "1", n: "d", s: "D" },
            { i: "k29", c: "1", n: "f", s: "F" },
            { i: "k30", c: "1", n: "g", s: "G" },
            { i: "k31", c: "1", n: "h", s: "H" },
            { i: "k32", c: "1", n: "j", s: "J" },
            { i: "k33", c: "1", n: "k", s: "K" },
            { i: "k34", c: "1", n: "l", s: "L" },
            { i: "k35", c: "0", n: ";", s: ":" },
            { i: "k36", c: "0", n: "'", s: '"' },
            { i: "k37", c: "1", n: "z", s: "Z" },
            { i: "k38", c: "1", n: "x", s: "X" },
            { i: "k39", c: "1", n: "c", s: "C" },
            { i: "k40", c: "1", n: "v", s: "V" },
            { i: "k41", c: "1", n: "b", s: "B" },
            { i: "k42", c: "1", n: "n", s: "N" },
            { i: "k43", c: "1", n: "m", s: "M" },
            { i: "k44", c: "0", n: ",", s: "<" },
            { i: "k45", c: "0", n: ".", s: ">" },
            { i: "k46", c: "0", n: "/", s: "?" },
            { i: "k47", c: "0", n: "\\", s: "|" },
        ];
        this.deadkeys = [];
        this.dir = "ltr";
        this.name = "US";
        this.lang = "en";
    };
    a.layout.prototype.load = function (e) {
        this.keys = e.keys;
        this.deadkeys = e.deadkeys;
        this.dir = e.dir;
        this.name = e.name;
        this.lang = e.lang ? e.lang : "en";
    };
    a.layout.parser = {
        keys: {
            192: "Backquote",
            49: "Digit1",
            50: "Digit2",
            51: "Digit3",
            52: "Digit4",
            53: "Digit5",
            54: "Digit6",
            55: "Digit7",
            56: "Digit8",
            57: "Digit9",
            48: "Digit0",
            189: "Minus",
            187: "Equal",
            81: "KeyQ",
            87: "KeyW",
            69: "KeyE",
            82: "KeyR",
            84: "KeyT",
            89: "KeyY",
            85: "KeyU",
            73: "KeyI",
            79: "KeyO",
            80: "KeyP",
            219: "BracketLeft",
            221: "BracketRight",
            220: "Backslash",
            65: "KeyA",
            83: "KeyS",
            68: "KeyD",
            70: "KeyF",
            71: "KeyG",
            72: "KeyH",
            74: "KeyJ",
            75: "KeyK",
            76: "KeyL",
            186: "Semicolon",
            222: "Quote",
            90: "KeyZ",
            88: "KeyX",
            67: "KeyC",
            86: "KeyV",
            66: "KeyB",
            78: "KeyN",
            77: "KeyM",
            188: "Comma",
            190: "Period",
            191: "Slash",
            17: "ControlLeft",
            18: "AltLeft",
            16: "ShiftLeft",
            32: "Space",
            27: "Escape",
            20: "CapsLock",
            13: "Enter",
            255: "AltRight",
        },
        codes: {
            Backquote: 0,
            Digit1: 1,
            Digit2: 2,
            Digit3: 3,
            Digit4: 4,
            Digit5: 5,
            Digit6: 6,
            Digit7: 7,
            Digit8: 8,
            Digit9: 9,
            Digit0: 10,
            Minus: 11,
            Equal: 12,
            KeyQ: 13,
            KeyW: 14,
            KeyE: 15,
            KeyR: 16,
            KeyT: 17,
            KeyY: 18,
            KeyU: 19,
            KeyI: 20,
            KeyO: 21,
            KeyP: 22,
            BracketLeft: 23,
            BracketRight: 24,
            Backslash: 25,
            KeyA: 26,
            KeyS: 27,
            KeyD: 28,
            KeyF: 29,
            KeyG: 30,
            KeyH: 31,
            KeyJ: 32,
            KeyK: 33,
            KeyL: 34,
            Semicolon: 35,
            Quote: 36,
            KeyZ: 37,
            KeyX: 38,
            KeyC: 39,
            KeyV: 40,
            KeyB: 41,
            KeyN: 42,
            KeyM: 43,
            Comma: 44,
            Period: 45,
            Slash: 46,
            IntlBackslash: 47,
        },
        getKeyLegend: function (u, t) {
            var v = u.length;
            for (var e = 0; e < v; e++) {
                if (u[e].i == t) {
                    return u[e].n ? u[e].n : "";
                }
            }
            return 0;
        },
        getKey: function (u, t) {
            var v = u.length;
            for (var e = 0; e < v; e++) {
                if (u[e].i == t) {
                    return u[e];
                }
            }
            return null;
        },
        isDeadkey: function (e, v) {
            if (!e) {
                return false;
            }
            var u = e.length;
            for (var t = 0; t < u; t++) {
                if (e[t].k == v) {
                    return true;
                }
            }
            return false;
        },
        getMappedValue: function (e, w, v) {
            if (!e) {
                return "";
            }
            var u = e.length;
            for (var t = 0; t < u; t++) {
                if (e[t].k == v && e[t].b == w) {
                    return e[t].c;
                }
            }
            return "";
        },
        getState: function (v, e, w, t, u, i) {
            var x = "n";
            if (!e && !w && v) {
                x = "n";
            } else {
                if (!e && w && !v) {
                    x = "s";
                } else {
                    if (!e && w && v) {
                        x = "s";
                    } else {
                        if (e && !w && !v) {
                            x = "n";
                        } else {
                            if (e && !w && v) {
                                x = "t";
                            } else {
                                if (e && w && !v) {
                                    x = "s";
                                } else {
                                    if (e && w && v) {
                                        x = "f";
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (t) {
                if (u == "1") {
                    if (x == "n") {
                        x = "s";
                    } else {
                        if (x == "s") {
                            x = "n";
                        }
                    }
                } else {
                    if (u == "SGCap") {
                        if (x == "n") {
                            x = "y";
                        } else {
                            if (x == "s") {
                                x = "z";
                            }
                        }
                    }
                }
            }
            if (i) {
                if (x == "n") {
                    x = "t";
                } else {
                    if (x == "s") {
                        x = "f";
                    }
                }
            }
            return x;
        },
    };
    a.keyboard = function (e, v) {
        this.defaultLayout = new a.layout();
        this.defaultLayout.loadDefault();
        this.virtualLayout = new a.layout();
        this.virtualLayout.loadDefault();
        this.currentLayout = this.virtualLayout;
        this.shift = false;
        this.shiftOn = false;
        this.caps = false;
        this.capsOn = false;
        this.alt = false;
        this.altGr = false;
        this.altGrOn = false;
        this.ctrl = false;
        this.altCtrlOn = false;
        this.fontSize = 18;
        this.counter = 0;
        this.interval = 0;
        this.prev = "";
        this.emoji = false;
        this.emojiStartingCodePoint = 128512;
        this.emojiCurrentCodePoint = 128512;
        this.cancelkeypress = false;
        this.customOnBackspace = function (i) {};
        this.customOnEnter = function () {};
        this.customOnSpace = function () {
            return false;
        };
        this.customOnKey = function (i) {
            return false;
        };
        this.customOnEsc = function () {};
        this.customDrawKeyboard = function (i) {
            return i;
        };
        this.textbox = document.getElementById(v);
        this.textbox.style.fontSize = "18px";
        if (a.util.mobile) {
            this.textbox.readOnly = true;
        }
        var u = ['<div id="nb-keyboard"  style="display: none;">'];
        u.push('<div id="nb-keyboard-alpha"  style="display: none;">');
        if (a.util.windowWidth() < 640) {
            for (var t = 13; t < 23; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            for (var t = 26; t < 35; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            for (var t = 37; t < 44; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            u.push('<button id="nb-left-shift"><span>Shift</span></button>');
            u.push('<button id="nb-caps-lock"><span>Caps</span></button>');
            u.push(
                '<button id="nb-escape" title="Turn on/off keyboard input conversion"><span>Esc</span></button>'
            );
            u.push('<button id="nb-space"><span>Space</span></button>');
            u.push(
                '<button id="nb-emoji" class="nb-key">\ud83d\ude00</button>'
            );
            u.push(
                '<button id="nb-enter" class="nb-enter"><span>Enter</span></button>'
            );
            u.push(
                '<button id="nb-left-ctrl" style="display:none"><span>Ctrl</span></button>'
            );
            u.push(
                '<button id="nb-left-alt" style="display:none"><span>Alt</span></button>'
            );
            u.push('<button id="nb-right-alt"><span>AltGr</span></button>');
            u.push(
                '<button id="nb-right-ctrl" style="display:none"><span>Ctrl</span></button>'
            );
            u.push(
                '<button id="nb-right-shift" style="display:none"><span>Shift</span></button>'
            );
            u.push('<button id="nb-backspace"><span>Back</span></button>');
            for (var t = 0; t < 13; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            for (var t = 23; t < 26; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            for (var t = 35; t < 37; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            for (var t = 44; t < 48; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            u.push('<div class="nb-clear"></div>');
        } else {
            for (var t = 0; t < 13; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            u.push('<button id="nb-backspace"><span>Backspace</span></button>');
            u.push('<div class="nb-clear"></div>');
            u.push('<button id="nb-tab"><span>Tab</span></button>');
            for (var t = 13; t < 25; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            u.push('<button id="nb-k25"></button>');
            u.push('<div class="nb-clear"></div>');
            u.push('<button id="nb-caps-lock"><span>Caps Lock</span></button>');
            for (var t = 26; t < 37; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            u.push(
                '<button id="nb-enter" class="nb-enter"><span>Enter</span></button>'
            );
            u.push('<div class="nb-clear"></div>');
            u.push('<button id="nb-left-shift"><span>Shift</span></button>');
            u.push('<button id="nb-k47" class="nb-key"></button>');
            for (var t = 37; t < 47; t++) {
                u.push('<button id="nb-k', t, '" class="nb-key"></button>');
            }
            u.push('<button id="nb-right-shift"><span>Shift</span></button>');
            u.push('<div class="nb-clear"></div>');
            u.push('<button id="nb-left-ctrl"><span>Ctrl</span></button>');
            u.push('<button id="nb"><span>Emoji</span></button>');
            u.push('<button id="nb-left-alt"><span>Alt</span></button>');
            u.push('<button id="nb-space"><span>Space</span></button>');
            u.push('<button id="nb-right-alt"><span>AltGr</span></button>');
            u.push(
                '<button id="nb-escape" title="Turn on/off keyboard input conversion"><span>Esc</span></button>'
            );
            u.push('<button id="nb-right-ctrl"><span>Ctrl</span></button>');
            u.push('<div class="nb-clear"></div>');
        }
        u.push("</div>");
        u.push('<div id="nb-keyboard-emoji" style="display:none">');
        u.push("</div>");
        u.push("</div>");
        document.getElementById(e).innerHTML = u.join("");
        this.wireEvents();
        this.drawKeyboard();
    };
    a.keyboard.prototype.loadDefaultLayout = function (e) {
        this.defaultLayout.load(e);
        this.drawKeyboard();
    };
    a.keyboard.prototype.loadVirtualLayout = function (e) {
        this.virtualLayout.load(e);
        this.drawKeyboard();
        this.textbox.style.direction = this.attr("dir");
    };
    a.keyboard.prototype.switchLayout = function () {
        this.currentLayout =
            this.currentLayout === this.defaultLayout
                ? this.virtualLayout
                : this.defaultLayout;
        this.reset();
        this.drawKeyboard();
        this.textbox.style.direction = this.attr("dir");
    };
    a.keyboard.prototype.getFontSize = function () {
        return this.fontSize;
    };
    a.keyboard.prototype.setFontSize = function (e) {
        this.fontSize = e;
        this.textbox.style.fontSize = this.fontSize + "px";
    };
    a.keyboard.prototype.onEsc = function () {
        this.switchLayout();
        this.customOnEsc();
    };
    a.keyboard.prototype.onShift = function () {
        this.shift = !this.shift;
        this.drawKeyboard();
    };
    a.keyboard.prototype.onAlt = function () {
        this.alt = !this.alt;
        this.drawKeyboard();
    };
    a.keyboard.prototype.onAltGr = function () {
        this.altGr = !this.altGr;
        this.drawKeyboard();
    };
    a.keyboard.prototype.onCtrl = function () {
        this.ctrl = !this.ctrl;
        this.drawKeyboard();
    };
    a.keyboard.prototype.onCapsLock = function () {
        this.caps = !this.caps;
        this.drawKeyboard();
    };
    a.keyboard.prototype.onBackspace = function () {
        if (this.prev != "") {
            this.prev = "";
            this.shift = false;
            this.drawKeyboard();
        } else {
            var i = a.util.deleteAtCaret(this.textbox, 1, 0);
            if (i.length > 0) {
                var e = i.charCodeAt(0);
                if (e < 57344 && 56319 < e) {
                    i = a.util.deleteAtCaret(this.textbox, 1, 0) + i;
                }
            }
            this.customOnBackspace(i);
        }
    };
    a.keyboard.prototype.onEnter = function () {
        a.util.insertAtCaret(this.textbox, "\u000A");
        this.customOnEnter();
    };
    a.keyboard.prototype.onSpace = function () {
        if (!this.customOnSpace()) {
            a.util.insertAtCaret(this.textbox, "\u0020");
        }
    };
    a.keyboard.prototype.onEmoji = function () {
        this.emoji = !this.emoji;
        this.emojiCurrentCodePoint = this.emojiStartingCodePoint;
        this.drawKeyboard();
    };
    a.keyboard.prototype.onEmojiScrollUp = function () {
        this.emojiCurrentCodePoint -= 14;
        if (this.emojiCurrentCodePoint < 0) {
            this.emojiCurrentCodePoint = 0;
        }
        this.drawKeyboard();
    };
    a.keyboard.prototype.onEmojiScrollDown = function () {
        this.emojiCurrentCodePoint += 14;
        this.drawKeyboard();
    };
    a.keyboard.prototype.onEmojiKey = function (e) {
        a.util.insertAtCaret(
            this.textbox,
            a.util.fromCharCodeS(this.emojiCurrentCodePoint + parseInt(e) - 100)
        );
    };
    a.keyboard.prototype.attr = function (e) {
        if (e == "dir") {
            return this.currentLayout.dir;
        } else {
            if (e == "lang") {
                return this.currentLayout.lang;
            } else {
                if (e == "name") {
                    return this.currentLayout.name;
                }
            }
        }
        return "";
    };
    a.keyboard.prototype.reset = function () {
        this.shift = false;
        this.caps = false;
        this.alt = false;
        this.altGr = false;
        this.ctrl = false;
        this.counter = 0;
        this.interval = 0;
        this.prev = "";
    };
    a.keyboard.prototype.stopRepeat = function () {
        if (this.interval != 0) {
            clearInterval(this.interval);
            this.counter = 0;
            this.interval = 0;
        }
    };
    a.keyboard.prototype.onKey = function (i) {
        var e = a.layout.parser.getKey(this.currentLayout.keys, i);
        if (e) {
            var u = a.layout.parser.getState(
                this.ctrl,
                this.alt,
                this.shift,
                this.caps,
                e.c ? e.c : "0",
                this.altGr
            );
            var v = e[u] ? e[u] : "";
            if (this.prev != "") {
                var t = a.layout.parser.getMappedValue(
                    this.currentLayout.deadkeys,
                    v,
                    this.prev
                );
                if (t != "") {
                    a.util.insertAtCaret(this.textbox, t);
                }
                this.prev = "";
            } else {
                if (a.layout.parser.isDeadkey(this.currentLayout.deadkeys, v)) {
                    this.prev = v;
                } else {
                    if (v != "") {
                        if (!this.customOnKey(v)) {
                            a.util.insertAtCaret(this.textbox, v);
                        }
                    }
                }
            }
        }
    };
    a.keyboard.prototype.getEmojiHTML = function () {
        var u = 14;
        if (a.util.windowWidth() < 640) {
            u = 6;
        }
        var v = [];
        for (var e = 100; e < 100 + 5 * u; e++) {
            v.push(
                '<button id="nb-k',
                e,
                '" class="nb-key"><div style="font-size:',
                this.fontSize,
                'px;">',
                a.util.fromCharCodeS(this.emojiCurrentCodePoint + e - 100),
                "</div></button>"
            );
            var t = e - 99;
            if (t == u) {
                v.push(
                    '<button id="nb-emoji-scrollup" class="nb-key"><div style="font-size:',
                    this.fontSize,
                    'px;">\u23f6</div></button>'
                );
                v.push('<div class="nb-clear"></div>');
            } else {
                if (t == 2 * u) {
                    v.push(
                        '<button id="nb-emoji" class="nb-key"><span>abc</span></button>'
                    );
                    v.push('<div class="nb-clear"></div>');
                } else {
                    if (t == 3 * u) {
                        v.push(
                            '<button id="nb-emoji-backspace" class="nb-key"><div style="font-size:',
                            this.fontSize,
                            'px;">\u232b</div></button>'
                        );
                        v.push('<div class="nb-clear"></div>');
                    } else {
                        if (t == 4 * u) {
                            v.push(
                                '<button id="nb-emoji-enter" class="nb-key"><div style="font-size:',
                                this.fontSize,
                                'px;">\u21b5</div></button>'
                            );
                            v.push('<div class="nb-clear"></div>');
                        } else {
                            if (t == 5 * u) {
                                v.push(
                                    '<button id="nb-emoji-scrolldown" class="nb-key"><div style="font-size:',
                                    this.fontSize,
                                    'px;">\u23f7</div></button>'
                                );
                                v.push('<div class="nb-clear"></div>');
                            }
                        }
                    }
                }
            }
        }
        v.push('<div class="nb-clear"></div>');
        return v.join("");
    };
    a.keyboard.prototype.drawKeyboard = function () {
        if (this.emoji) {
            document.getElementById("nb-keyboard-emoji").innerHTML =
                this.getEmojiHTML();
            document.getElementById("nb-keyboard-emoji").style.display = "";
            document.getElementById("nb-keyboard-alpha").style.display = "none";
            return;
        } else {
            document.getElementById("nb-keyboard-emoji").style.display = "none";
            document.getElementById("nb-keyboard-alpha").style.display = "";
        }
        if (!this.currentLayout.keys) {
            return;
        }
        var E, G, J, K;
        var H = this.currentLayout.keys.length;
        for (var F = 0; F < H; F++) {
            G = this.currentLayout.keys[F];
            if (!document.getElementById("nb-" + G.i)) {
                continue;
            }
            var D = this.ctrl;
            var e = this.alt;
            var I = this.shift;
            var C = this.caps;
            var t = this.altGr;
            if (this.shiftOn) {
                I = true;
            }
            if (this.capsOn) {
                C = true;
            }
            if (this.altCtrlOn) {
                D = true;
                e = true;
            }
            if (this.altGrOn) {
                t = true;
            }
            J = a.layout.parser.getState(D, e, I, C, G.c ? G.c : "0", t);
            K = G[J] ? G[J] : "";
            if (this.prev != "") {
                K = a.layout.parser.getMappedValue(
                    this.currentLayout.deadkeys,
                    K,
                    this.prev
                );
            }
            E = [];
            E.push(
                '<div class="nb-label-reference">',
                a.layout.parser.getKeyLegend(this.defaultLayout.keys, G.i),
                "</div>"
            );
            if (!I) {
                K = this.customDrawKeyboard(K);
                if (K == "") {
                    K = "&nbsp;";
                }
                E.push(
                    '<div class="nb-label-natural" style="font-size:',
                    this.fontSize,
                    'px;">&nbsp;',
                    K,
                    "</div>"
                );
            } else {
                if (K == "") {
                    K = "&nbsp;";
                }
                E.push(
                    '<div class="nb-label-shift" style="font-size:',
                    this.fontSize,
                    'px;">&nbsp;',
                    K,
                    "</div>"
                );
            }
            document.getElementById("nb-" + G.i).innerHTML = E.join("");
        }
        var x = document.getElementById("nb-left-ctrl");
        var A = document.getElementById("nb-right-ctrl");
        if (x && A) {
            if (D) {
                x.className = "nb-recessed" + (this.ctrl ? "" : "-hover");
                A.className = "nb-recessed" + (this.ctrl ? "" : "-hover");
            } else {
                x.className = "";
                A.className = "";
            }
        }
        var w = document.getElementById("nb-left-alt");
        if (w) {
            if (e) {
                w.className = "nb-recessed" + (this.alt ? "" : "-hover");
            } else {
                w.className = "";
            }
        }
        var z = document.getElementById("nb-right-alt");
        if (z) {
            if (t) {
                z.className = "nb-recessed" + (this.altGr ? "" : "-hover");
            } else {
                z.className = "";
            }
        }
        var y = document.getElementById("nb-left-shift");
        var B = document.getElementById("nb-right-shift");
        if (y && B) {
            if (I) {
                y.className = "nb-recessed" + (this.shift ? "" : "-hover");
                B.className = "nb-recessed" + (this.shift ? "" : "-hover");
            } else {
                y.className = "";
                B.className = "";
            }
        }
        var u = document.getElementById("nb-caps-lock");
        if (u) {
            if (C) {
                u.className = "nb-recessed" + (this.caps ? "" : "-hover");
            } else {
                u.className = "";
            }
        }
        var v = document.getElementById("nb-escape");
        if (v) {
            if (this.currentLayout === this.defaultLayout) {
                v.className = "nb-recessed";
            } else {
                v.className = "";
            }
        }
    };
    a.keyboard.prototype.wireEvents = function () {
        var e = this;
        document.getElementById("nb-keyboard").onmousedown = function (i) {
            var t = a.util.srcId(i, this, "button");
            if (!t) {
                return;
            }
            e.interval = setInterval(function () {
                e.counter++;
                if (e.counter > 5) {
                    switch (t) {
                        case "nb-backspace":
                        case "nb-emoji-backspace":
                            e.onBackspace();
                            break;
                        case "nb-enter":
                        case "nb-emoji-enter":
                            e.onEnter();
                            break;
                        case "nb-emoji-scrollup":
                            e.onEmojiScrollUp();
                            break;
                        case "nb-emoji-scrolldown":
                            e.onEmojiScrollDown();
                            break;
                        default:
                            if (
                                t.search("^nb-k([0-9]|[1-3][0-9]|4[0-7])$") !=
                                -1
                            ) {
                                e.onKey(t.substr(7));
                                e.shift = false;
                                e.alt = false;
                                e.ctrl = false;
                                e.altGr = false;
                                e.drawKeyboard();
                            } else {
                                if (t.search("^nb-k1[0-6][0-9]$") != -1) {
                                    e.onEmojiKey(t.substr(8));
                                }
                            }
                            break;
                    }
                }
            }, 50);
        };
        document.getElementById("nb-keyboard").onmouseup = function (i) {
            e.stopRepeat();
        };
        document.getElementById("nb-keyboard").onmouseout = function (i) {
            e.stopRepeat();
        };
        document.getElementById("nb-keyboard").onclick = function (i) {
            var t = a.util.srcId(i, this, "button");
            if (!t) {
                return;
            }
            switch (t) {
                case "nb-left-shift":
                case "nb-right-shift":
                    e.onShift();
                    break;
                case "nb-left-alt":
                    e.onCtrl();
                    e.onAlt();
                    break;
                case "nb-right-alt":
                    e.onAltGr();
                    break;
                case "nb-left-ctrl":
                case "nb-right-ctrl":
                    e.onAlt();
                    e.onCtrl();
                    break;
                case "nb-escape":
                    e.onEsc();
                    break;
                case "nb-caps-lock":
                    e.onCapsLock();
                    break;
                case "nb-backspace":
                case "nb-emoji-backspace":
                    e.onBackspace();
                    break;
                case "nb-enter":
                case "nb-emoji-enter":
                    e.onEnter();
                    break;
                case "nb-space":
                    e.onSpace();
                    break;
                case "nb":
                case "nb-emoji":
                    e.onEmoji();
                    break;
                case "nb-emoji-scrollup":
                    e.onEmojiScrollUp();
                    break;
                case "nb-emoji-scrolldown":
                    e.onEmojiScrollDown();
                    break;
                default:
                    if (t.search("^nb-k([0-9]|[1-3][0-9]|4[0-7])$") != -1) {
                        e.onKey(t.substr(7));
                        e.shift = false;
                        e.alt = false;
                        e.ctrl = false;
                        e.altGr = false;
                        e.drawKeyboard();
                    } else {
                        if (t.search("^nb-k1[0-6][0-9]$") != -1) {
                            e.onEmojiKey(t.substr(8));
                        }
                    }
                    break;
            }
        };
        if (!("ontouchstart" in document.documentElement) || !a.util.mobile) {
            document.getElementById("nb-left-shift").onmouseover = function (
                i
            ) {
                e.shiftOn = true;
                e.drawKeyboard();
            };
            document.getElementById("nb-right-shift").onmouseover = function (
                i
            ) {
                e.shiftOn = true;
                e.drawKeyboard();
            };
            document.getElementById("nb-left-shift").onmouseout = function (i) {
                e.shiftOn = false;
                e.drawKeyboard();
            };
            document.getElementById("nb-right-shift").onmouseout = function (
                i
            ) {
                e.shiftOn = false;
                e.drawKeyboard();
            };
            document.getElementById("nb-left-ctrl").onmouseover = function (i) {
                e.altCtrlOn = true;
                e.drawKeyboard();
            };
            document.getElementById("nb-right-ctrl").onmouseover = function (
                i
            ) {
                e.altCtrlOn = true;
                e.drawKeyboard();
            };
            document.getElementById("nb-left-ctrl").onmouseout = function (i) {
                e.altCtrlOn = false;
                e.drawKeyboard();
            };
            document.getElementById("nb-right-ctrl").onmouseout = function (i) {
                e.altCtrlOn = false;
                e.drawKeyboard();
            };
            document.getElementById("nb-left-alt").onmouseover = function (i) {
                e.altCtrlOn = true;
                e.drawKeyboard();
            };
            document.getElementById("nb-right-alt").onmouseover = function (i) {
                e.altGrOn = true;
                e.drawKeyboard();
            };
            document.getElementById("nb-left-alt").onmouseout = function (i) {
                e.altCtrlOn = false;
                e.drawKeyboard();
            };
            document.getElementById("nb-right-alt").onmouseout = function (i) {
                e.altGrOn = false;
                e.drawKeyboard();
            };
            document.getElementById("nb-caps-lock").onmouseover = function (i) {
                e.capsOn = true;
                e.drawKeyboard();
            };
            document.getElementById("nb-caps-lock").onmouseout = function (i) {
                e.capsOn = false;
                e.drawKeyboard();
            };
        }
        e.textbox.onkeydown = function (t) {
            var i = a.util.code(t);
            if (i == "Unidentified") {
                var v = a.util.keyCode(t);
                i = a.layout.parser.keys[v + ""];
            }
            if (
                (i == "KeyA" ||
                    i == "KeyY" ||
                    i == "KeyZ" ||
                    i == "KeyC" ||
                    i == "KeyV" ||
                    i == "KeyX") &&
                e.ctrl &&
                !e.alt &&
                !e.shift
            ) {
                return;
            }
            if (e.currentLayout == e.defaultLayout && i != "Escape") {
                return;
            }
            switch (i) {
                case "ControlLeft":
                case "ControlRight":
                    e.ctrl = false;
                    e.onCtrl();
                    break;
                case "AltLeft":
                    e.alt = false;
                    e.onAlt();
                    break;
                case "AltRight":
                    e.altGr = false;
                    e.onAltGr();
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    e.shift = false;
                    e.onShift();
                    break;
                case "Escape":
                    e.onEsc();
                    break;
                case "CapsLock":
                    if (t.getModifierState && t.getModifierState("CapsLock")) {
                        e.caps = false;
                    }
                    e.onCapsLock();
                    break;
                case "Backspace":
                    e.onBackspace();
                    a.util.preventDefault(t);
                    break;
                case "Space":
                    e.onSpace();
                    a.util.preventDefault(t);
                    break;
                case "Enter":
                    e.onEnter();
                    a.util.preventDefault(t);
                    break;
                default:
                    var u = a.layout.parser.codes[i];
                    if (u != undefined) {
                        e.onKey("k" + u);
                        e.drawKeyboard();
                        a.util.preventDefault(t);
                        e.cancelkeypress = true;
                    }
                    break;
            }
        };
        if (a.util.opera) {
            e.textbox.onkeypress = function (i) {
                if (e.cancelkeypress) {
                    a.util.preventDefault(i);
                    e.cancelkeypress = false;
                }
            };
        }
        e.textbox.onkeyup = function (t) {
            var i = a.util.code(t);
            if (i == "Unidentified") {
                var u = a.util.keyCode(t);
                i = a.layout.parser.keys[u + ""];
            }
            switch (i) {
                case "ControlLeft":
                case "ControlRight":
                    e.ctrl = true;
                    e.onCtrl();
                    break;
                case "AltLeft":
                    e.alt = true;
                    e.onAlt();
                    break;
                case "AltRight":
                    e.altGr = true;
                    e.onAltGr();
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    e.shift = true;
                    e.onShift();
                    break;
                default:
            }
        };
    };
    var o = false;
    try {
        var d = "item";
        localStorage.setItem(d, d);
        localStorage.removeItem(d);
        o = true;
    } catch (b) {}
    var f = false;
    try {
        var p = JSON.parse(JSON.stringify({ item: "item" }));
        if (p.item == "item") {
            f = true;
        }
    } catch (b) {}
    if (document.cookie.indexOf("read=true") != -1) {
        document.getElementById("gdpr").style.display = "none";
    }
    document.getElementById("gdpr-btn").onclick = function () {
        document.getElementById("gdpr").style.display = "none";
        document.cookie = "read=true";
    };
    var g = null;
    var n = { undo: [], redo: [], layout: null, fontSize: 22 };
    var s = "hindi";
    g = new a.keyboard("keyboard", "editor");
    var r = g.textbox;
    r.focus();
    if (o && f) {
        var p = JSON.parse(localStorage.getItem(s));
        if (p != null) {
            if (p.layout) {
                n.layout = p.layout;
            }
            if (p.undo) {
                n.undo = p.undo;
            }
            if (p.redo) {
                n.redo = p.redo;
            }
            if (p.fontSize) {
                n.fontSize = p.fontSize;
            }
        }
    }
    if (n.fontSize) {
        g.setFontSize(n.fontSize);
    }
    var k = [
        {
            Id: "inscript",
            Name: "Hindi InScript Keyboard",
            Json: {
                name: "Devanagari InScript",
                dir: "ltr",
                keys: [
                    { i: "k0", c: "0", n: "ॊ", s: "ऒ", t: "ॵ" },
                    { i: "k1", c: "0", n: "1", s: "ऍ", t: "१" },
                    { i: "k2", c: "0", n: "2", s: "ॅ", t: "२" },
                    { i: "k3", c: "0", n: "3", s: "ऄ", t: "३" },
                    { i: "k4", c: "0", n: "4", s: "र्", t: "४" },
                    { i: "k5", c: "0", n: "5", s: "₹", t: "५" },
                    { i: "k6", c: "0", n: "6", s: "‌", t: "६" },
                    { i: "k7", c: "0", n: "7", s: "ऀ", t: "७" },
                    { i: "k8", c: "0", n: "8", s: "‍", t: "८" },
                    { i: "k9", c: "0", n: "9", s: "(", t: "९" },
                    { i: "k10", c: "0", n: "0", s: ")", t: "०" },
                    { i: "k11", c: "0", n: "-", s: "ः", t: "ॄ" },
                    { i: "k12", c: "0", n: "ृ", s: "ऋ", t: "ॠ" },
                    { i: "k13", c: "0", n: "ौ", s: "औ", t: "ॱ" },
                    { i: "k14", c: "0", n: "ै", s: "ऐ", t: "ॕ" },
                    { i: "k15", c: "0", n: "ा", s: "आ", t: "॑" },
                    { i: "k16", c: "0", n: "ी", s: "ई", t: "ॡ" },
                    { i: "k17", c: "0", n: "ू", s: "ऊ", t: "ॣ" },
                    { i: "k18", c: "0", n: "ब", s: "भ", t: "ॳ" },
                    { i: "k19", c: "0", n: "ह", s: "ङ", t: "ॴ" },
                    { i: "k20", c: "0", n: "ग", s: "घ", t: "ग़" },
                    { i: "k21", c: "0", n: "द", s: "ध", t: "ॸ" },
                    { i: "k22", c: "0", n: "ज", s: "झ", t: "ज़" },
                    { i: "k23", c: "0", n: "ड", s: "ढ", t: "ड़" },
                    { i: "k24", c: "0", n: "़", s: "ञ", t: "ढ़" },
                    { i: "k25", c: "0", n: "ॉ", s: "ऑ", t: "ॲ" },
                    { i: "k26", c: "0", n: "ो", s: "ओ", t: "ॖ" },
                    { i: "k27", c: "0", n: "े", s: "ए", t: "ॗ" },
                    { i: "k28", c: "0", n: "्", s: "अ", t: "॒" },
                    { i: "k29", c: "0", n: "ि", s: "इ", t: "ऌ" },
                    { i: "k30", c: "0", n: "ु", s: "उ", t: "ॢ" },
                    { i: "k31", c: "0", n: "प", s: "फ", t: "फ़" },
                    { i: "k32", c: "0", n: "र", s: "ऱ", t: "ॎ" },
                    { i: "k33", c: "0", n: "क", s: "ख", t: "क़" },
                    { i: "k34", c: "0", n: "त", s: "थ", t: "ख़" },
                    { i: "k35", c: "0", n: "च", s: "छ", t: "ॹ" },
                    { i: "k36", c: "0", n: "ट", s: "ठ", t: "ऺ" },
                    { i: "k37", c: "0", n: "ॆ", s: "ऎ", t: "॓" },
                    { i: "k38", c: "0", n: "ं", s: "ँ", t: "ॐ" },
                    { i: "k39", c: "0", n: "म", s: "ण", t: "॔" },
                    { i: "k40", c: "0", n: "न", s: "ऩ", t: "ॏ" },
                    { i: "k41", c: "0", n: "व", s: "ऴ", t: "ॶ" },
                    { i: "k42", c: "0", n: "ल", s: "ळ", t: "ॷ" },
                    { i: "k43", c: "0", n: "स", s: "श", t: "ॽ" },
                    { i: "k44", c: "0", n: ",", s: "ष", t: "॰" },
                    { i: "k45", c: "0", n: ".", s: "।", t: "॥" },
                    { i: "k46", c: "0", n: "य", s: "य़", t: "ॺ" },
                    { i: "k47", c: "0", n: "ॉ", s: "ऑ", t: "ऻ" },
                ],
                deadkeys: [],
            },
        },
    ];
    if (k.length == 1) {
        g.loadVirtualLayout(k[0].Json);
    } else {
        var h = [];
        var l = [];
        if (!n.layout) {
            n.layout = k[0].Id;
        }
        var m = false;
        for (var c = 0; c < k.length; c++) {
            l[c] = new a.layout();
            l[c].load(k[c].Json);
            if (n.layout == k[c].Id) {
                g.loadVirtualLayout(k[c].Json);
                m = true;
            }
        }
        if (m == false) {
            g.loadVirtualLayout(k[0].Json);
        }
        var j = document.createElement("p");
        j.innerHTML = h.join("");
        document.getElementById("keyboard").appendChild(j);
        for (var c = 0; c < k.length; c++) {
            var q = (function (e, i) {
                document.getElementById(e).onclick = function () {
                    if (n.layout != e) {
                        g.virtualLayout = i;
                        g.currentLayout = g.virtualLayout;
                        g.reset();
                        g.drawKeyboard();
                        g.textbox.style.direction = i.dir;
                        n.layout = e;
                        if (o && f) {
                            localStorage.setItem(s, JSON.stringify(n));
                        }
                    }
                    g.textbox.focus();
                };
            })(k[c].Id, l[c]);
        }
    }
    g.customOnKey = function (i) {
        if (this.currentLayout === this.defaultLayout || this.emoji) {
            return false;
        }
        a.util.insertAtCaret(this.textbox, i);
        if (n.layout == "transliterate") {
            var e = a.util.deleteAtCaret(this.textbox, 3, 0);
            a.util.insertAtCaret(this.textbox, transliterate.compose(e));
        }
        return true;
    };
    g.customOnBackspace = function (i) {
        if (this.currentLayout === this.defaultLayout || this.emoji) {
        } else {
            if (n.layout == "transliterate" && i.length == 1) {
                var e = transliterate.decompose(i);
                if (e != i) {
                    e = a.util.deleteAtCaret(this.textbox, 1, 0) + e;
                    a.util.insertAtCaret(
                        this.textbox,
                        transliterate.compose(e.slice(0, -1))
                    );
                }
                if (i == "\u094d") {
                    a.util.deleteAtCaret(this.textbox, 1, 0);
                }
            }
        }
    };
    if (n.fontSize == null) {
        n.fontSize = g.getFontSize();
        if (o && f) {
            localStorage.setItem(s, JSON.stringify(n));
        }
    }
    document.getElementById("shrink").onclick = function () {
        if (n.fontSize < 14) {
            return;
        }
        n.fontSize -= 2;
        g.setFontSize(n.fontSize);
        g.drawKeyboard();
        if (o && f) {
            localStorage.setItem(s, JSON.stringify(n));
        }
        r.focus();
    };
    document.getElementById("enlarge").onclick = function () {
        if (n.fontSize > 36) {
            return;
        }
        n.fontSize += 2;
        g.setFontSize(n.fontSize);
        g.drawKeyboard();
        if (o && f) {
            localStorage.setItem(s, JSON.stringify(n));
        }
        r.focus();
    };
    document.getElementById("email").onclick = function () {
        this.href = "mailto: ?body=" + r.value;
        r.focus();
        return true;
    };
    document.getElementById("selectAll").onclick = function () {
        a.util.setCaretPosition(r, 0, r.value.length);
        ga("send", "event", "Keyboard", "click", "Select");
        r.focus();
        a.util.setCaretPosition(r, 0, r.value.length);
        var e = document.execCommand("copy");
        if (e) {
            a.util.setCaretPosition(r, r.value.length, r.value.length);
            ga("send", "event", "Keyboard", "click", "Copy");
        } else {
            alert(
                "Your browser does not allow automated copy. To copy the text in the text area, you can click Select All button and right click on the selected text. Then click the Copy option."
            );
            ga("send", "event", "Keyboard", "click", "Copy Fail");
        }
        r.focus();
        alert("Copied to clipboard!");
    };
    document.getElementById("saveButton").onclick = function () {
        const content = document.getElementById("editor").value;
        localStorage.setItem("lastSaved", content);
        alert("Saved!");
    };
    document.getElementById("loadButton").onclick = function () {
        const content = document.getElementById("editor");
        content.value = localStorage.getItem("lastSaved");
    };
    document.getElementById("copy").onclick = function () {
        a.util.setCaretPosition(r, 0, r.value.length);
        var e = document.execCommand("copy");
        if (e) {
            a.util.setCaretPosition(r, r.value.length, r.value.length);
            ga("send", "event", "Keyboard", "click", "Copy");
        } else {
            alert(
                "Your browser does not allow automated copy. To copy the text in the text area, you can click Select All button and right click on the selected text. Then click the Copy option."
            );
            ga("send", "event", "Keyboard", "click", "Copy Fail");
        }
        r.focus();
    };
    if (o && f) {
        if (n.undo.length > 0) {
            r.value = n.undo.pop();
        }
        document.getElementById("clearAll").onclick = function () {
            if (
                r.value.length < 10 ||
                confirm("Are you sure you want to clear all the text?")
            ) {
                ga("send", "event", "Keyboard", "click", "Clear");
                n.undo = [];
                n.redo = [];
                localStorage.setItem(s, JSON.stringify(n));
                r.value = "";
            }
            r.focus();
        };
        document.getElementById("undo").onclick = function () {
            if (n.undo.length == 0) {
                return;
            }
            var e = n.undo.pop();
            if (e != r.value) {
                n.redo.push(r.value);
                r.value = e;
            } else {
                r.value = n.undo.length == 0 ? "" : n.undo[n.undo.length - 1];
                n.redo.push(e);
            }
            localStorage.setItem(s, JSON.stringify(n));
            r.focus();
        };
        document.getElementById("redo").onclick = function () {
            if (n.redo.length == 0) {
                return;
            }
            var e = n.redo.pop();
            r.value = e;
            n.undo.push(e);
            localStorage.setItem(s, JSON.stringify(n));
            r.focus();
        };
        setInterval(function () {
            var e = r.value;
            if (n.undo.length == 0 && e.length == 0) {
                return;
            }
            if (n.undo.length == 0 || e != n.undo[n.undo.length - 1]) {
                n.undo.push(e);
                localStorage.setItem(s, JSON.stringify(n));
            }
        }, 3000);
    } else {
        document.getElementById("undo").style.display = "none";
        document.getElementById("redo").style.display = "none";
        document.getElementById("clearAll").style.display = "none";
    }
    document.getElementById("postToTwitter").onclick = function () {
        ga("send", "event", "Keyboard", "click", "Twitter");
        document.getElementById("postToTwitter").href =
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(r.value);
        r.focus();
        return true;
    };
    document.getElementById("searchGoogle").onclick = function () {
        ga("send", "event", "Keyboard", "click", "Google");
        document.getElementById("searchGoogle").href =
            "https://www.google.com/search?ie=UTF-8&q=" +
            encodeURIComponent(r.value);
        r.focus();
        return true;
    };
    document.getElementById("translateGoogle").onclick = function () {
        ga("send", "event", "Keyboard", "click", "Translate");
        document.getElementById("translateGoogle").href =
            "https://translate.google.com/#view=home&op=translate&sl=hi&tl=en&text=" +
            encodeURIComponent(r.value);
        r.focus();
        return true;
    };
    document.getElementById("saveAsTextFile").onsubmit = function () {
        ga(
            "send",
            "Keyboard",
            "Save",
            "send",
            r.value.length > 0 ? "valid" : "invalid"
        );
        document.getElementById("data").value = r.value;
        r.focus();
        return true;
    };
})();
