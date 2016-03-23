(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = core.VW.Web.Elements = core.VW.Web.Elements || {};
	exports.get_Element = function () {
	    return __webpack_require__(1).default;
	};
	exports.get_Card = function () {
	    return __webpack_require__(3).default;
	};
	exports.get_Dropdown = function () {
	    return __webpack_require__(4).default;
	};
	var Input = __webpack_require__(5);
	exports.get_Input = function () {
	    return Input.default;
	};
	exports.get_mask = function () {
	    return Input.mask;
	};
	exports.get_Modal = function () {
	    return __webpack_require__(9).default;
	};
	exports.get_ScrollFire = function () {
	    return __webpack_require__(10).default;
	};
	exports.get_Parallax = function () {
	    return __webpack_require__(11).default;
	};
	exports.get_Pinned = function () {
	    return __webpack_require__(12).default;
	};
	exports.get_SideNav = function () {
	    return __webpack_require__(13).default;
	};
	exports.get_Tab = function () {
	    return __webpack_require__(14).default;
	};
	exports.get_TabGroup = function () {
	    return __webpack_require__(15).default;
	};
	exports.get_Toast = function () {
	    return __webpack_require__(16).default;
	};
	exports.get_Tooltip = function () {
	    return __webpack_require__(17).default;
	};
	exports.get_HasTooltip = function () {
	    return __webpack_require__(18).default;
	};
	core.VW.Util.createProperties(exports);
	exports.register = function () {
	    exports.Card.register();
	    exports.Dropdown.register();
	    exports.Input.register();
	    exports.Modal.register();
	    exports.ScrollFire.register();
	    exports.Parallax.register();
	    exports.Pinned.register();
	    exports.SideNav.register();
	    exports.TabGroup.register();
	    exports.Toast.register();
	    exports.Tooltip.register();
	    exports.HasTooltip.register();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var events = __webpack_require__(2).EventEmitter;
	var vox = core.VW.Web.Vox;
	{
	    function Element() {
	        Element.constructor ? Element.constructor.apply(this, arguments) : Element.$super && Element.$super.constructor.apply(this, arguments);
	    }
	    Element.prototype = Object.create(events.prototype);
	    Element.prototype.constructor = Element;
	    Element.$super = events.prototype;
	    Element.constructor = function () {
	        Element.$super.constructor.call(this);
	    };
	    Element.prototype.createEvent = function (eventName, originalEvent) {
	        var ev = vox.platform.createEvent(eventName);
	        if (originalEvent)
	            ev.originalEvent = originalEvent;
	        return ev;
	    };
	    Element.prototype.emit = function (ev) {
	        var name;
	        if (arguments.length > 1)
	            name = ev.type;
	        else
	            name = arguments[0];
	        Element.$super.emit(name, arguments[1]);
	    };
	}
	exports.default = Element;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	if(global.core && global.core.basic){
		exports= module.exports= global.core.basic.get_events();
	}
	else{
		throw new Error("Debe cargar el archivo core.basic");
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	{
	    function Card() {
	        Card.constructor ? Card.constructor.apply(this, arguments) : Card.$super && Card.$super.constructor.apply(this, arguments);
	    }
	    Card.prototype = Object.create(Element.prototype);
	    Card.prototype.constructor = Card;
	    Card.$super = Element.prototype;
	    Card.register = function () {
	        $.fn.voxcard = function () {
	            var dp = [];
	            this.each(function () {
	                var o = $(this);
	                var t = undefined;
	                if (!(t = o.data('vox-card'))) {
	                    t = new Card(o);
	                    o.data('vox-card', t);
	                }
	                dp.push(t);
	            });
	            return dp;
	        };
	        $(function () {
	            vox.mutation.watchAppend($('body'), function (ev) {
	                ev.jTarget.voxcard();
	            }, '.card');
	            $('.card').voxcard();
	        });
	    };
	    Card.constructor = function (obj) {
	        Card.$super.constructor.call(this);
	        obj = $(obj);
	        var f = this.$ = {};
	        f.obj = obj;
	        this.obtainProps();
	        this.init();
	    };
	    Card.prototype.init = function () {
	        this.events();
	    };
	    Card.prototype.obtainProps = function () {
	        var f = this.$;
	        f.reveal = f.obj.find('.card-reveal');
	        f.revealClose = f.obj.find('.card-reveal .card-title');
	        f.activator = f.obj.find('.activator');
	    };
	    Card.prototype.reveal = function (event) {
	        var f = this.$, ev = this.createEvent('beforereveal', event);
	        ev.card = this;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return;
	        f.reveal.show();
	        f.reveal.css('top', 0);
	        ev = this.createEvent('reveal');
	        ev.card = this;
	        this.emit(ev);
	    };
	    Card.prototype.closeReveal = function (event) {
	        var f = this.$, ev = this.createEvent('beforeclosereveal', event);
	        ev.card = this;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return;
	        f.reveal.css('top', '100%');
	        ev = this.createEvent('closereveal');
	        ev.card = this;
	        this.emit(ev);
	    };
	    Card.prototype.events = function () {
	        var f = this.$;
	        f.activator.click(function (self$0) {
	            return function () {
	                ev.preventDefault();
	                self$0.reveal();
	                return false;
	            };
	        }(this));
	        f.revealClose.click(function (self$0) {
	            return function () {
	                ev.preventDefault();
	                self$0.closeReveal();
	                return false;
	            };
	        }(this));
	    };
	}
	exports.default = Card;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	function init(document) {
	    {
	        function Dropdown() {
	            Dropdown.constructor ? Dropdown.constructor.apply(this, arguments) : Dropdown.$super && Dropdown.$super.constructor.apply(this, arguments);
	        }
	        Dropdown.prototype = Object.create(Element.prototype);
	        Dropdown.prototype.constructor = Dropdown;
	        Dropdown.$super = Element.prototype;
	        Dropdown.register = function () {
	            $.fn.voxdropdown = function () {
	                var dp = [];
	                this.each(function () {
	                    var o = $(this);
	                    var t = undefined;
	                    if (!(t = o.data('vox-dropdown'))) {
	                        t = new Dropdown(o);
	                        o.data('vox-dropdown', t);
	                    }
	                    dp.push(t);
	                });
	                return dp;
	            };
	            $(function () {
	                vox.mutation.watchAppend($('body'), function (ev) {
	                    ev.jTarget.voxdropdown();
	                }, '.dropdown');
	                $('.dropdown').voxdropdown();
	            });
	        };
	        Dropdown.constructor = function (obj) {
	            Dropdown.$super.constructor.call(this);
	            obj = $(obj);
	            var f = this.$ = {};
	            f.obj = obj;
	            this.obtainProps();
	            this.init();
	        };
	        Dropdown.prototype.init = function () {
	            this.events();
	        };
	        Dropdown.prototype.obtainProps = function () {
	            var f = this.$;
	            if (f.obj.data('menu-selector') !== undefined)
	                f.menu = $(f.obj.data('menu-selector'));
	            else
	                f.menu = f.obj.find('.dropdown-menu');
	        };
	        Dropdown.prototype.isOpened = function () {
	            return this.$.menu.hasClass('opened');
	        };
	        Dropdown.prototype.$pEvents = function (a) {
	            var self = this;
	            a.click(function () {
	                var a0 = $(this);
	                var ev = self.createEvent('beforeselect');
	                ev.dropdown = self;
	                ev.jTarget = a0;
	                self.emit(ev);
	                if (ev.defaultPrevented)
	                    return;
	                var ev = vox.platform.createEvent('select');
	                ev.dropdown = self;
	                ev.jTarget = a0;
	                ev.value = a0.data('value');
	                self.trigger('select', ev);
	                if (ev.defaultPrevented) {
	                    return;
	                }
	                self.close();
	            });
	        };
	        Dropdown.prototype.open = function (event) {
	            var ev = this.createEvent('beforeopen', event);
	            ev.dropdown = self;
	            this.emit(ev);
	            if (ev.defaultPrevented)
	                return;
	            var self = this;
	            f.lEvent = event ? event.type : '';
	            f.menu.addClass('opened');
	            f.menu.voxanimate(f.menu.data('ineffect') || 'fadeIn short', null, function () {
	                f.captureKeyboard = true;
	                var ev = self.createEvent('open', event);
	                ev.dropdown = self;
	                this.emit(ev);
	            });
	        };
	        Dropdown.prototype.close = function () {
	            var ev = vox.platform.createEvent('beforeclose');
	            ev.dropdown = self;
	            this.emit(ev);
	            if (ev.defaultPrevented)
	                return;
	            var self = this;
	            f.lEvent = undefined;
	            f.menu.removeClass('opened');
	            f.menu.voxanimate(f.menu.data('outeffect') || 'fadeOut short', null, function () {
	                f.captureKeyboard = false;
	                var ev = vox.platform.createEvent('close');
	                ev.dropdown = self;
	                self.emit(ev);
	            });
	        };
	        Dropdown.prototype.toggle = function () {
	            if (f.menu.hasClass('opened'))
	                this.close();
	            else
	                this.open();
	        };
	        Dropdown.prototype.events = function () {
	            var f = this.$;
	            vox.mutation.watchAppend(f.menu, function (self$0) {
	                return function (ev) {
	                    self$0.$pEvents(ev.jTarget.find('>a'));
	                };
	            }(this), 'li');
	            var self = this;
	            $(document).keyup(function (ev) {
	                if (f.captureKeyboard) {
	                    ev.preventDefault();
	                    ev.dropdown = self;
	                    self.emit('keyup', ev);
	                    if (ev.defaultPrevented) {
	                        return;
	                    }
	                    if (ev.keyCode == 39) {
	                    }
	                    return false;
	                }
	            });
	            $(document).click(function (ev) {
	                if (!self.isOpened()) {
	                    return;
	                }
	                var e = $(ev.target);
	                if (ev.target != f.obj.get(0) && f.obj.find(e).length == 0) {
	                    var ev2 = self.createEvent('outerclick');
	                    ev2.dropdown = self;
	                    ev2.target = ev.target;
	                    ev2.clickEvent = ev;
	                    self.emit(rb);
	                    if (ev.defaultPrevented)
	                        return;
	                    self.close();
	                }
	            });
	            f.btn = f.obj.find('a,.button').eq(0);
	            f.btn.click(function () {
	                if (f.lEvent == 'mouseenter')
	                    return self.open();
	                self.toggle();
	            });
	            var j = function (ev) {
	                if (f.obj.data('hover-activate')) {
	                    if (ev.type == 'mouseenter') {
	                        if (f.closing) {
	                            clearTimeout(f.closing);
	                            f.closing = undefined;
	                            return;
	                        }
	                        if (self.isOpened()) {
	                            return;
	                        }
	                        self.open(ev);
	                    } else if (ev.type == 'mouseleave') {
	                        if (f.lEvent != 'mouseenter')
	                            return;
	                        f.closing = setTimeout(function () {
	                            self.close();
	                            f.closing = undefined;
	                        }, 100);
	                    }
	                }
	            };
	            f.btn.hover(j);
	            f.menu.hover(j);
	        };
	    }
	    return Dropdown;
	}
	var doc = {};
	if (typeof document === 'object')
	    doc = document;
	exports.default = init(doc);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	{
	    var mask = __webpack_require__(6);
	    exports.mask = mask;
	}
	{
	    function Input() {
	        Input.constructor ? Input.constructor.apply(this, arguments) : Input.$super && Input.$super.constructor.apply(this, arguments);
	    }
	    Input.prototype = Object.create(Element.prototype);
	    Input.prototype.constructor = Input;
	    Input.$super = Element.prototype;
	    Input.register = function () {
	        $.fn.voxinput = function () {
	            var dp = [];
	            this.each(function () {
	                var o = $(this);
	                var t = undefined;
	                if (!(t = o.data('vox-input'))) {
	                    t = new Input(o);
	                    o.data('vox-input', t);
	                }
	                dp.push(t);
	            });
	            return dp;
	        };
	        $(function () {
	            vox.mutation.watchAppend($('body'), function (ev) {
	                ev.jTarget.voxinput();
	            }, '.input-field');
	            $('.input-field').voxinput();
	        });
	        var value = $.fn.val;
	        var replaceval = $.fn.val = function () {
	            var er, result = value.apply(this, arguments);
	            $.fn.val = value;
	            try {
	                this.each(function () {
	                    var o = $(this);
	                    if (o.attr('vox-input') !== undefined) {
	                        var p = o.parents('.input-field').eq(0);
	                        var t = p.data('vox-input');
	                        if (t) {
	                            t.adjustValue();
	                        }
	                    }
	                });
	            } catch (e) {
	                er = e;
	            }
	            $.fn.val = replaceval;
	            if (er) {
	                throw er;
	            }
	            return result;
	        };
	    };
	    Input.constructor = function (obj) {
	        Input.$super.constructor.call(this);
	        obj = $(obj);
	        var f = this.$ = {};
	        f.obj = obj;
	        this.obtainProps();
	        this.init();
	    };
	    Input.prototype.init = function () {
	        var f = this.$;
	        if (f.obj.is('.select')) {
	            __webpack_require__(8).default($, f);
	            f.select.attr('vox-input', 'vox-input');
	        }
	        this.events();
	        f.r();
	    };
	    Input.prototype.obtainProps = function () {
	        var f = this.$;
	        f.inp = obj.find('input');
	        f.label = f.obj.find('label');
	        f.label.addClass('normal');
	        f.action = f.obj.find('.action');
	        f.inp.attr('vox-input', 'vox-input');
	        if (!f.obj.data('error-color'))
	            f.obj.data('error-color', 'red');
	        if (!f.obj.data('error-color'))
	            f.obj.data('error-color', 'red');
	        if (!f.obj.data('warning-color'))
	            f.obj.data('warning-color', 'orange');
	        if (!f.obj.data('ok-color'))
	            f.obj.data('ok-color', 'green');
	    };
	    Input.prototype.adjustValue = function () {
	        var f = this.$;
	        var v = f.select.val();
	        f.opw.find('li').removeAttr('selected');
	        f.opw.find('li>a').removeAttr('hover-active');
	        if (!v) {
	            f.inp.val(f.selectDVal);
	            return;
	        }
	        f.opw.find('li').each(function () {
	            var l = $(this);
	            if (l.attr('value') == v) {
	                l.attr('selected', 'selected');
	                l.find('a').attr('hover-active', 'hover-active');
	                f.inp.val(l.text());
	            }
	        });
	    };
	    Input.prototype.events = function () {
	        var f = this.$;
	        f.r = function () {
	            if (f.inp.val() && f.inp.val().length > 0 && f.inp.attr('type') != 'search' || f.inp.attr('type') == 'date')
	                f.label.addClass('active');
	            else
	                f.label.removeClass('active');
	        };
	        f.line = f.obj.find('.line');
	        if (f.line.length == 0) {
	            f.line = $('<div>');
	            f.line.addClass('line');
	            f.obj.append(f.line);
	        }
	        if (f.select) {
	            f.select.focus(function (ev) {
	                f.inp.focus();
	            });
	            f.select.blur(function (ev) {
	                f.inp.blur();
	            });
	            f.select.change(function () {
	                f.refreshValue();
	            });
	            f.dropdown.on('select', function (ev) {
	                f.select.val(ev.value);
	                f.select.change();
	            });
	        }
	        f.addactive = function () {
	            if (f.inp.attr('type') != 'search') {
	                f.label.addClass('active');
	                f.label.removeClass('normal');
	            }
	            f.obj.addClass('active');
	        };
	        var oninput = function (self$0) {
	            return function () {
	                f.obj.removeClass('error warning ok');
	                self$0.emit('focus', ev);
	                if (ev.defaultPrevented)
	                    return;
	                f.addactive();
	                var l;
	                if (f.lineClass) {
	                    l = 'text-' + f.lineClass;
	                    f.line.removeClass(f.lineClass);
	                    f.label.removeClass(l);
	                }
	                f.lineClass = f.obj.data('activecolor');
	                f.line.addClass(f.lineClass);
	                l = 'text-' + f.lineClass;
	                f.label.addClass(l);
	            };
	        }(this);
	        f.on('keyup input', oninput);
	        f.inp.focus(function (ev) {
	            if (f.obj.hasClass('error') || f.obj.hasClass('warning') || f.obj.hasClass('ok'))
	                return;
	            return oninput(ev);
	        });
	        f.inp.blur(function (self$0) {
	            return function (ev) {
	                if (f.obj.hasClass('error') || f.obj.hasClass('warning') || f.obj.hasClass('ok'))
	                    return;
	                self$0.emit('blur', ev);
	                if (ev.defaultPrevented)
	                    return;
	                f.r();
	                f.obj.removeClass('active');
	                f.label.addClass('normal');
	                if (f.lineClass) {
	                    l = 'text-' + f.lineClass;
	                    f.line.removeClass(f.lineClass);
	                    f.label.removeClass(l);
	                }
	                f.lineClass = undefined;
	            };
	        }(this));
	        this.on('change', function () {
	            if (f.select) {
	                f.refreshValue();
	            }
	            return f.r();
	        });
	    };
	}
	exports.default = Input;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * jquery.mask.js
	 * @version: v1.13.8
	 * @author: Igor Escobar
	 *
	 * Created by Igor Escobar on 2012-03-10. Please report any bug at http://blog.igorescobar.com
	 *
	 * Copyright (c) 2012 Igor Escobar http://blog.igorescobar.com
	 *
	 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
	 *
	 * Permission is hereby granted, free of charge, to any person
	 * obtaining a copy of this software and associated documentation
	 * files (the "Software"), to deal in the Software without
	 * restriction, including without limitation the rights to use,
	 * copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following
	 * conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	 * OTHER DEALINGS IN THE SOFTWARE.
	 */

	/* jshint laxbreak: true */
	/* global define, jQuery, Zepto */

	'use strict';

	// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
	// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
	(function (factory) {

	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('jquery'));
	    } else {
	        factory(jQuery || Zepto);
	    }

	}(function ($) {

	    var Mask = function (el, mask, options) {

	        var p = {
	            invalid: [],
	            getCaret: function () {
	                try {
	                    var sel,
	                        pos = 0,
	                        ctrl = el.get(0),
	                        dSel = document.selection,
	                        cSelStart = ctrl.selectionStart;

	                    // IE Support
	                    if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
	                        sel = dSel.createRange();
	                        sel.moveStart('character', -p.val().length);
	                        pos = sel.text.length;
	                    }
	                    // Firefox support
	                    else if (cSelStart || cSelStart === '0') {
	                        pos = cSelStart;
	                    }

	                    return pos;
	                } catch (e) {}
	            },
	            setCaret: function(pos) {
	                try {
	                    if (el.is(':focus')) {
	                        var range, ctrl = el.get(0);

	                        range = ctrl.createTextRange();
	                        range.collapse(true);
	                        range.moveEnd('character', pos);
	                        range.moveStart('character', pos);
	                        range.select();
	                    }
	                } catch (e) {}
	            },
	            events: function() {
	                el
	                .on('keydown.mask', function(e) {
	                    el.data('mask-keycode', e.keyCode || e.which);
	                })
	                .on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
	                .on('paste.mask drop.mask', function() {
	                    setTimeout(function() {
	                        el.keydown().keyup();
	                    }, 100);
	                })
	                .on('change.mask', function(){
	                    el.data('changed', true);
	                })
	                .on('blur.mask', function(){
	                    if (oldValue !== p.val() && !el.data('changed')) {
	                        el.trigger('change');
	                    }
	                    el.data('changed', false);
	                })
	                // it's very important that this callback remains in this position
	                // otherwhise oldValue it's going to work buggy
	                .on('blur.mask', function() {
	                    oldValue = p.val();
	                })
	                // select all text on focus
	                .on('focus.mask', function (e) {
	                    if (options.selectOnFocus === true) {
	                        $(e.target).select();
	                    }
	                })
	                // clear the value if it not complete the mask
	                .on('focusout.mask', function() {
	                    if (options.clearIfNotMatch && !regexMask.test(p.val())) {
	                       p.val('');
	                   }
	                });
	            },
	            getRegexMask: function() {
	                var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

	                for (var i = 0; i < mask.length; i++) {
	                    translation = jMask.translation[mask.charAt(i)];

	                    if (translation) {

	                        pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
	                        optional = translation.optional;
	                        recursive = translation.recursive;

	                        if (recursive) {
	                            maskChunks.push(mask.charAt(i));
	                            oRecursive = {digit: mask.charAt(i), pattern: pattern};
	                        } else {
	                            maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
	                        }

	                    } else {
	                        maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
	                    }
	                }

	                r = maskChunks.join('');

	                if (oRecursive) {
	                    r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
	                         .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
	                }

	                return new RegExp(r);
	            },
	            destroyEvents: function() {
	                el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
	            },
	            val: function(v) {
	                var isInput = el.is('input'),
	                    method = isInput ? 'val' : 'text',
	                    r;

	                if (arguments.length > 0) {
	                    if (el[method]() !== v) {
	                        el[method](v);
	                    }
	                    r = el;
	                } else {
	                    r = el[method]();
	                }

	                return r;
	            },
	            getMCharsBeforeCount: function(index, onCleanVal) {
	                for (var count = 0, i = 0, maskL = mask.length; i < maskL && i < index; i++) {
	                    if (!jMask.translation[mask.charAt(i)]) {
	                        index = onCleanVal ? index + 1 : index;
	                        count++;
	                    }
	                }
	                return count;
	            },
	            caretPos: function (originalCaretPos, oldLength, newLength, maskDif) {
	                var translation = jMask.translation[mask.charAt(Math.min(originalCaretPos - 1, mask.length - 1))];

	                return !translation ? p.caretPos(originalCaretPos + 1, oldLength, newLength, maskDif)
	                                    : Math.min(originalCaretPos + newLength - oldLength - maskDif, newLength);
	            },
	            behaviour: function(e) {
	                e = e || window.event;
	                p.invalid = [];

	                var keyCode = el.data('mask-keycode');

	                if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
	                    var caretPos    = p.getCaret(),
	                        currVal     = p.val(),
	                        currValL    = currVal.length,
	                        newVal      = p.getMasked(),
	                        newValL     = newVal.length,
	                        maskDif     = p.getMCharsBeforeCount(newValL - 1) - p.getMCharsBeforeCount(currValL - 1),
	                        changeCaret = caretPos < currValL;

	                    p.val(newVal);

	                    if (changeCaret) {
	                        // Avoid adjusting caret on backspace or delete
	                        if (!(keyCode === 8 || keyCode === 46)) {
	                            caretPos = p.caretPos(caretPos, currValL, newValL, maskDif);
	                        }
	                        p.setCaret(caretPos);
	                    }

	                    return p.callbacks(e);
	                }
	            },
	            getMasked: function(skipMaskChars) {
	                var buf = [],
	                    value = p.val(),
	                    m = 0, maskLen = mask.length,
	                    v = 0, valLen = value.length,
	                    offset = 1, addMethod = 'push',
	                    resetPos = -1,
	                    lastMaskChar,
	                    check;

	                if (options.reverse) {
	                    addMethod = 'unshift';
	                    offset = -1;
	                    lastMaskChar = 0;
	                    m = maskLen - 1;
	                    v = valLen - 1;
	                    check = function () {
	                        return m > -1 && v > -1;
	                    };
	                } else {
	                    lastMaskChar = maskLen - 1;
	                    check = function () {
	                        return m < maskLen && v < valLen;
	                    };
	                }

	                while (check()) {
	                    var maskDigit = mask.charAt(m),
	                        valDigit = value.charAt(v),
	                        translation = jMask.translation[maskDigit];

	                    if (translation) {
	                        if (valDigit.match(translation.pattern)) {
	                            buf[addMethod](valDigit);
	                             if (translation.recursive) {
	                                if (resetPos === -1) {
	                                    resetPos = m;
	                                } else if (m === lastMaskChar) {
	                                    m = resetPos - offset;
	                                }

	                                if (lastMaskChar === resetPos) {
	                                    m -= offset;
	                                }
	                            }
	                            m += offset;
	                        } else if (translation.optional) {
	                            m += offset;
	                            v -= offset;
	                        } else if (translation.fallback) {
	                            buf[addMethod](translation.fallback);
	                            m += offset;
	                            v -= offset;
	                        } else {
	                          p.invalid.push({p: v, v: valDigit, e: translation.pattern});
	                        }
	                        v += offset;
	                    } else {
	                        if (!skipMaskChars) {
	                            buf[addMethod](maskDigit);
	                        }

	                        if (valDigit === maskDigit) {
	                            v += offset;
	                        }

	                        m += offset;
	                    }
	                }

	                var lastMaskCharDigit = mask.charAt(lastMaskChar);
	                if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
	                    buf.push(lastMaskCharDigit);
	                }

	                return buf.join('');
	            },
	            callbacks: function (e) {
	                var val = p.val(),
	                    changed = val !== oldValue,
	                    defaultArgs = [val, e, el, options],
	                    callback = function(name, criteria, args) {
	                        if (typeof options[name] === 'function' && criteria) {
	                            options[name].apply(this, args);
	                        }
	                    };

	                callback('onChange', changed === true, defaultArgs);
	                callback('onKeyPress', changed === true, defaultArgs);
	                callback('onComplete', val.length === mask.length, defaultArgs);
	                callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
	            }
	        };

	        el = $(el);
	        var jMask = this, oldValue = p.val(), regexMask;

	        mask = typeof mask === 'function' ? mask(p.val(), undefined, el,  options) : mask;


	        // public methods
	        jMask.mask = mask;
	        jMask.options = options;
	        jMask.remove = function() {
	            var caret = p.getCaret();
	            p.destroyEvents();
	            p.val(jMask.getCleanVal());
	            p.setCaret(caret - p.getMCharsBeforeCount(caret));
	            return el;
	        };

	        // get value without mask
	        jMask.getCleanVal = function() {
	           return p.getMasked(true);
	        };

	       jMask.init = function(onlyMask) {
	            onlyMask = onlyMask || false;
	            options = options || {};

	            jMask.clearIfNotMatch  = $.jMaskGlobals.clearIfNotMatch;
	            jMask.byPassKeys       = $.jMaskGlobals.byPassKeys;
	            jMask.translation      = $.extend({}, $.jMaskGlobals.translation, options.translation);

	            jMask = $.extend(true, {}, jMask, options);

	            regexMask = p.getRegexMask();

	            if (onlyMask === false) {

	                if (options.placeholder) {
	                    el.attr('placeholder' , options.placeholder);
	                }

	                // this is necessary, otherwise if the user submit the form
	                // and then press the "back" button, the autocomplete will erase
	                // the data. Works fine on IE9+, FF, Opera, Safari.
	                if (el.data('mask')) {
	                  el.attr('autocomplete', 'off');
	                }

	                p.destroyEvents();
	                p.events();

	                var caret = p.getCaret();
	                p.val(p.getMasked());
	                p.setCaret(caret + p.getMCharsBeforeCount(caret, true));

	            } else {
	                p.events();
	                p.val(p.getMasked());
	            }
	        };

	        jMask.init(!el.is('input'));
	    };

	    $.maskWatchers = {};
	    var HTMLAttributes = function () {
	        var input = $(this),
	            options = {},
	            prefix = 'data-mask-',
	            mask = input.attr('data-mask');

	        if (input.attr(prefix + 'reverse')) {
	            options.reverse = true;
	        }

	        if (input.attr(prefix + 'clearifnotmatch')) {
	            options.clearIfNotMatch = true;
	        }

	        if (input.attr(prefix + 'selectonfocus') === 'true') {
	           options.selectOnFocus = true;
	        }

	        if (notSameMaskObject(input, mask, options)) {
	            return input.data('mask', new Mask(this, mask, options));
	        }
	    },
	    notSameMaskObject = function(field, mask, options) {
	        options = options || {};
	        var maskObject = $(field).data('mask'),
	            stringify = JSON.stringify,
	            value = $(field).val() || $(field).text();
	        try {
	            if (typeof mask === 'function') {
	                mask = mask(value);
	            }
	            return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
	        } catch (e) {}
	    },
	    eventSupported = function(eventName) {
	        var el = document.createElement('div');
	        eventName = 'on' + eventName;

	        var isSupported = (eventName in el);
	        if ( !isSupported ) {
	            el.setAttribute(eventName, 'return;');
	            isSupported = typeof el[eventName] === 'function';
	        }
	        el = null;

	        return isSupported;
	    };

	    $.fn.mask = function(mask, options) {
	        options = options || {};
	        var selector = this.selector,
	            globals = $.jMaskGlobals,
	            interval = $.jMaskGlobals.watchInterval,
	            maskFunction = function() {
	                if (notSameMaskObject(this, mask, options)) {
	                    return $(this).data('mask', new Mask(this, mask, options));
	                }
	            };

	        $(this).each(maskFunction);

	        if (selector && selector !== '' && globals.watchInputs) {
	            clearInterval($.maskWatchers[selector]);
	            $.maskWatchers[selector] = setInterval(function(){
	                $(document).find(selector).each(maskFunction);
	            }, interval);
	        }
	        return this;
	    };

	    $.fn.unmask = function() {
	        clearInterval($.maskWatchers[this.selector]);
	        delete $.maskWatchers[this.selector];
	        return this.each(function() {
	            var dataMask = $(this).data('mask');
	            if (dataMask) {
	                dataMask.remove().removeData('mask');
	            }
	        });
	    };

	    $.fn.cleanVal = function() {
	        return this.data('mask').getCleanVal();
	    };

	    $.applyDataMask = function(selector) {
	        selector = selector || $.jMaskGlobals.maskElements;
	        var $selector = (selector instanceof $) ? selector : $(selector);
	        $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
	    };

	    var globals = {
	        maskElements: 'input,td,span,div',
	        dataMaskAttr: '*[data-mask]',
	        dataMask: true,
	        watchInterval: 300,
	        watchInputs: true,
	        useInput: eventSupported('input'),
	        watchDataMask: false,
	        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
	        translation: {
	            '0': {pattern: /\d/},
	            '9': {pattern: /\d/, optional: true},
	            '#': {pattern: /\d/, recursive: true},
	            'A': {pattern: /[a-zA-Z0-9]/},
	            'S': {pattern: /[a-zA-Z]/}
	        }
	    };

	    $.jMaskGlobals = $.jMaskGlobals || {};
	    globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

	    // looking for inputs with data-mask attribute
	    if (globals.dataMask) { $.applyDataMask(); }

	    setInterval(function(){
	        if ($.jMaskGlobals.watchDataMask) { $.applyDataMask(); }
	    }, globals.watchInterval);
	}));

/***/ },
/* 7 */
/***/ function(module, exports) {

	exports=module.exports=core.VW.Web.JQuery

/***/ },
/* 8 */
/***/ function(module, exports) {

	exports.default= function($, f){

		f.voxStyle= f.obj.find("vox-css[vox-func='input-style']")
	    if(f.voxStyle.length==0)
	        f.voxStyle= $('<vox-css vox-type="class" vox-func="input-style" vox-selector="li>a:not([disabled]>a)">')
	    
	    var cl=[f.obj.data("activecolor")  + "-hover"]
	    if(f.obj.data("activecolortext"))
	        cl.push("text" + f.obj.data("select-activecolortext")  + "-hover")
	    else
	        cl.push("text-white-hover")
	    


	    f.voxStyle.data("value", cl.join(" "))
	    
	    
	    
	    
	    f.select= f.obj.find("select")
	    f.sw= $("<div>")
	    f.sw.addClass("select-wrapper")
	    f.opw= $("<ul>")
	    f.opw.addClass("text-"+f.obj.data("activecolor"))
	    f.opw.addClass("options-wrapper")
	    var i1= $("<input>")
	    i1.attr("type","text")
	    i1.attr("readonly","readonly")
	    f.inp= i1

	    var av= f.select.val()
	    var caret= $("<i class='fa fa-caret-down select-down'></i>")
	    f.select.css("position", "absolute")
	    f.select.css("top", "80px")
	    var val=''
	    f.selectDVal= ' '
	    f.select.find("option").each(function(){
	        var op= $("<li>")
	        var e= $(this)
	        var vv= e.val()||""
	        op.attr("value", vv)
	        
	        var a= $("<a>")
	        a.data("value", vv)
	        
	        a.text(e.text())
	        op.append(a)
	        if(e.attr("disabled")!==undefined){
	            op.attr("disabled", "disabled")
	        }
	        if(vv==""){
	           f.selectDVal= e.text()
	        }
	        
	        if(!av){
	            if(e.attr("selected")!==undefined && e.attr("disabled")===undefined){
	                op.attr("selected", "selected")
	                i1.val(e.text())
	                val=vv
	            }
	        }
	        else{
	            if(vv==av){
	                op.attr("selected", "selected")
	                i1.val(e.text())
	                val=vv
	            }
	        }
	        f.opw.append(op)
	    })
	    
	    
	    if(!val)
	        i1.val(f.selectDVal)
	    
	    
	    f.sw.append(i1)
	    f.sw.append(caret)
	    f.sw.append(f.opw)
	    f.sw.insertBefore(f.select)
	    f.sw.append(f.voxStyle)
	    
	    
	    
	    f.opw.addClass("dropdown-menu")
	    f.dropdown= f.sw.voxdropdown()[0]
	    var h= function(){
	        f.dropdown.toggle()
	    }
	    f.sw.find(".select-down").click(h)
	    f.inp.click(h)
	    f.label.click(h)

	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	var modals = [];
	{
	    function Modal() {
	        Modal.constructor ? Modal.constructor.apply(this, arguments) : Modal.$super && Modal.$super.constructor.apply(this, arguments);
	    }
	    Modal.prototype = Object.create(Element.prototype);
	    Modal.prototype.constructor = Modal;
	    Modal.$super = Element.prototype;
	    Modal.checkOpened = function () {
	        var open;
	        for (var i = 0; i < modals.length; i++) {
	            open = open || modals[i].isOpened();
	            if (open)
	                break;
	        }
	        if (!open) {
	            $('body').removeClass('modal-opened');
	            $('.modal-back').hide();
	        } else {
	            $('body').addClass('modal-opened');
	            $('.modal-back').show();
	        }
	    };
	    Modal.openBack = function () {
	        $('body').addClass('modal-opened');
	        var m = $('.modal-back');
	        if (m.length == 0) {
	            m = $('<div>');
	            m.addClass('modal-back');
	            m.addClass('default');
	            $('body').append(m);
	        }
	        m.show();
	    };
	    Modal.register = function () {
	        $.fn.voxmodal = function () {
	            var dp = [];
	            this.each(function () {
	                var o = $(this);
	                var t = undefined;
	                if (!(t = o.data('vox-modal'))) {
	                    t = new Modal(o);
	                    o.data('vox-modal', t);
	                }
	                dp.push(t);
	            });
	            return dp;
	        };
	        $(function () {
	            vox.mutation.watchAppend($('body'), function (ev) {
	                ev.jTarget.voxmodal();
	            }, '.modal');
	            $('.modal').voxmodal();
	            $('[data-toggle=modal]').click(function () {
	                var e = $(this);
	                var s = e.attr('vox-selector');
	                var g = $(s).eq(0);
	                var h = g.voxmodal()[0];
	                if (h) {
	                    h.open();
	                }
	            });
	        });
	    };
	    Modal.constructor = function (obj) {
	        Modal.$super.constructor.call(this);
	        obj = $(obj);
	        var f = this.$ = {};
	        f.obj = obj;
	        this.obtainProps();
	        this.init();
	    };
	    Modal.prototype.init = function () {
	        this.events();
	    };
	    Modal.prototype.obtainProps = function () {
	        var f = this.$;
	        f.container = f.obj.parent();
	        modals.push(this);
	    };
	    Modal.prototype.isOpened = function () {
	        return this.$.obj.hasClass('opened');
	    };
	    Modal.prototype.open = function (event) {
	        var f = this.$;
	        var ev = this.createEvent('beforeopen', event);
	        ev.modal = this;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return;
	        if (f.delay) {
	            clearTimeout(f.delay);
	            f.delay = undefined;
	        }
	        Modal.openBack();
	        f.lEvent = event ? event.type : '';
	        f.obj.addClass('opened');
	        f.container.show();
	        f.obj.voxanimate(f.obj.data('ineffect') || 'bounceInUp', undefined, function (self$0) {
	            return function () {
	                modal.checkOpened();
	                var ev = self$0.createEvent('open', event);
	                ev.modal = self$0;
	                self$0.emit(ev);
	            };
	        }(this));
	    };
	    Modal.prototype.close = function (event) {
	        var f = this.$;
	        var ev = this.createEvent('beforeclose', event);
	        ev.modal = this;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return;
	        if (f.delay) {
	            clearTimeout(f.delay);
	            f.delay = undefined;
	        }
	        f.lEvent = event ? event.type : '';
	        f.obj.removeClass('opened');
	        f.container.hide();
	        f.obj.voxanimate(f.obj.data('outeffect') || 'bounceOutDown', undefined, function (self$0) {
	            return function () {
	                modal.checkOpened();
	                var ev = self$0.createEvent('close', event);
	                ev.modal = self$0;
	                self$0.emit(ev);
	            };
	        }(this));
	    };
	    Modal.prototype.toggle = function () {
	        if (f.obj.hasClass('opened'))
	            this.close();
	        else
	            this.open();
	    };
	    Modal.prototype.events = function () {
	        var f = this.$;
	        vox.platform.attachEvents('keyup keydown', {
	            active: function (self$0) {
	                return function () {
	                    return self$0.isOpened();
	                };
	            }(this),
	            processEvent: function (self$0) {
	                return function (ev) {
	                    ev.modal = self$0;
	                    return ev;
	                };
	            }(this),
	            self: this,
	            callback: function (self$0) {
	                return function (ev) {
	                    if (ev.keyCode == 27 && ev.type == 'keyup') {
	                        if (!f.obj.data('escape-disabled')) {
	                            self$0.close();
	                        }
	                    }
	                };
	            }(this)
	        });
	        vox.platform.attachOuterClick(f.obj, {
	            active: function (self$0) {
	                return function () {
	                    return self$0.isOpened();
	                };
	            }(this),
	            processEvent: function (self$0) {
	                return function (ev) {
	                    var ev2 = self$0.createEvent('outerclick');
	                    ev2.modal = self$0;
	                    ev2.target = ev.target;
	                    ev2.clickEvent = ev;
	                    return ev2;
	                };
	            }(this),
	            self: self,
	            callback: function (self$0) {
	                return function (ev) {
	                    !f.obj.data('closeonouterclick-disabled') && self$0.close();
	                };
	            }(this)
	        });
	    };
	}
	exports.default = Modal;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	{
	    function ScrollFire() {
	        ScrollFire.constructor ? ScrollFire.constructor.apply(this, arguments) : ScrollFire.$super && ScrollFire.$super.constructor.apply(this, arguments);
	    }
	    ScrollFire.prototype = Object.create(Element.prototype);
	    ScrollFire.prototype.constructor = ScrollFire;
	    ScrollFire.$super = Element.prototype;
	    ScrollFire.register = function () {
	        $.fn.voxscrollfire = function () {
	            var dp = [];
	            this.each(function () {
	                var o = $(this);
	                var t = undefined;
	                if (!(t = o.data('vox-scrollfire'))) {
	                    t = new ScrollFire(o);
	                    o.data('vox-scrollfire', t);
	                }
	                dp.push(t);
	            });
	            return dp;
	        };
	        $(function () {
	            vox.mutation.watchAppend($('body'), function (ev) {
	                ev.jTarget.voxscrollfire();
	            }, '.scroll-fire');
	            $('.scroll-fire').voxscrollfire();
	        });
	    };
	    ScrollFire.constructor = function (obj) {
	        ScrollFire.$super.constructor.call(this);
	        obj = $(obj);
	        var f = this.$ = {};
	        f.obj = obj;
	        this.init();
	    };
	    ScrollFire.prototype.init = function () {
	        this.off = [];
	        this.events();
	    };
	    ScrollFire.prototype.bindOnOffset = function (offset, callback) {
	        var f = this.$;
	        f.off = {
	            offset: offset,
	            callback: callback,
	            scroll: -1
	        };
	    };
	    ScrollFire.prototype.refresh = function () {
	        var f = this.$;
	        var ev = this.createEvent('scroll');
	        ev.scrollfire = this;
	        ev.resize = true;
	        f.h(ev);
	    };
	    ScrollFire.prototype.events = function () {
	        var f = this.$;
	        var w = vox.platform.scrollObject;
	        var wo = w.get(0);
	        var g = function (self$0) {
	            return function (ev) {
	                var he = f.obj.outerHeight();
	                var top = f.obj.offset().top;
	                var sTop = w.scrollTop();
	                var windowScroll = wo.pageYOffset + wo.innerHeight;
	                var elementOffset = f.obj.get(0).getBoundingClientRect().top + document.body.scrollTop;
	                var offset = windowScroll - top;
	                if (ev.resize || windowScroll >= top && sTop <= top + he) {
	                    ev.scrollfire = self;
	                    ev.offset = windowScroll - top;
	                    ev.type = 'scroll';
	                    self$0.emit(ev);
	                }
	                for (var i = 0; i < f.off.length; i++) {
	                    var o = f.off[i];
	                    if (offset >= o.offset) {
	                        if (o.scroll < o.offset && sTop <= top + he) {
	                            o.callback(ev);
	                        }
	                    }
	                    o.scroll = offset;
	                }
	            };
	        }(this);
	        var y;
	        var h = function (ev) {
	            var delay = parseInt(f.obj.data('delay'));
	            if (!delay || isNaN(delay)) {
	                delay = 0;
	            }
	            if (delay == 0) {
	                return g(ev);
	            }
	            if (y) {
	                clearTimeout(y);
	                y = undefined;
	            }
	            y = setTimeout(function () {
	                g(ev);
	            }, delay);
	        };
	        w.bind('scroll', h);
	        f.h = h;
	        w.resize(function () {
	            if (f.r) {
	                clearTimeout(f.r);
	                f.r = undefined;
	            }
	            f.r = setTimeout(function (self$0) {
	                return function () {
	                    return self$0.refresh();
	                };
	            }(this), 100);
	        });
	        setTimeout(function (self$0) {
	            return function () {
	                return self$0.refresh();
	            };
	        }(this), 100);
	    };
	}
	exports.default = ScrollFire;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	var w = {};
	if (typeof window !== 'undefined')
	    w = window;
	function init(window) {
	    procesar = function (Parallax) {
	        Parallax.objects = [];
	    };
	    {
	        function Parallax() {
	            Parallax.constructor ? Parallax.constructor.apply(this, arguments) : Parallax.$super && Parallax.$super.constructor.apply(this, arguments);
	        }
	        Parallax.prototype = Object.create(Element.prototype);
	        Parallax.prototype.constructor = Parallax;
	        Parallax.$super = Element.prototype;
	        Parallax.__defineGetter__('uid', function () {
	            Parallax.id = Parallax.id | 0;
	            return Parallax.id++;
	        });
	        Parallax.register = function () {
	            $.fn.voxparallax = function () {
	                var dp = [];
	                this.each(function () {
	                    var o = $(this);
	                    var t = undefined;
	                    if (!(t = o.data('vox-parallax'))) {
	                        t = new Parallax(o);
	                        o.data('vox-parallax', t);
	                    }
	                    dp.push(t);
	                });
	                return dp;
	            };
	            $(function () {
	                vox.mutation.watchAppend($('body'), function (ev) {
	                    ev.jTarget.voxparallax();
	                }, '.parallax');
	                $('.parallax').voxparallax();
	            });
	        };
	        Parallax.constructor = function (obj) {
	            Parallax.$super.constructor.call(this);
	            Parallax.objects.push(this);
	            obj = $(obj);
	            var f = this.$ = {};
	            f.obj = obj;
	            this.obtainProps();
	            this.init();
	        };
	        Parallax.prototype.obtainProps = function () {
	            var f = this.$;
	            this.id = Parallax.uid;
	            f.img = f.obj.find('.img');
	            f.scrollfire = f.obj.voxscrollfire()[0];
	        };
	        Parallax.prototype.init = function () {
	            this.events();
	        };
	        Parallax.prototype.$scroll = function (ev) {
	            var f = this.$;
	            var h = $(window).height();
	            var hi = f.obj.outerHeight();
	            var maxRange = h + hi;
	            var off = ev.offset;
	            f.img.css('top', -(f.img.height() * 80 / 100) + 'px');
	            var percent = off * 100 / maxRange;
	            var translate = 80 * percent / 100;
	            translate = f.img.height() * translate / 100;
	            var factor = parseFloat(f.obj.data('factor'));
	            if (!factor || isNaN(factor))
	                factor = 1.24;
	            translate *= factor;
	            f.img.css('transform', 'translate3d(0, ' + translate.toString() + 'px, 0)');
	        };
	        Parallax.prototype.events = function () {
	            f.scrollfire.on('scroll', function (self$0) {
	                return function (ev) {
	                    return self$0.$scroll(ev);
	                };
	            }(this));
	            f.scrollfire.refresh();
	            $(window).resize();
	        };
	    }
	    procesar(Parallax);
	    return Parallax;
	}
	exports.default = init(w);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	{
	    function Pinned() {
	        Pinned.constructor ? Pinned.constructor.apply(this, arguments) : Pinned.$super && Pinned.$super.constructor.apply(this, arguments);
	    }
	    Pinned.prototype = Object.create(Element.prototype);
	    Pinned.prototype.constructor = Pinned;
	    Pinned.$super = Element.prototype;
	    Pinned.register = function () {
	        $.fn.voxpinned = function () {
	            var dp = [];
	            this.each(function () {
	                var o = $(this);
	                var t = undefined;
	                if (!(t = o.data('vox-pinned'))) {
	                    t = new Pinned(o);
	                    o.data('vox-pinned', t);
	                }
	                dp.push(t);
	            });
	            return dp;
	        };
	        $(function () {
	            vox.mutation.watchAppend($('body'), function (ev) {
	                ev.jTarget.voxpinned();
	            }, '.pinned');
	            $('.pinned').voxpinned();
	        });
	    };
	    Pinned.constructor = function (obj) {
	        Pinned.$super.constructor.call(this);
	        obj = $(obj);
	        var f = this.$ = {};
	        f.obj = obj;
	        this.obtainProps();
	        this.init();
	    };
	    Pinned.prototype.obtainProps = function () {
	        var f = this.$;
	        f.parent = f.obj.parent();
	        f.scrollfire = f.parent.voxscrollfire()[0];
	    };
	    Pinned.prototype.init = function () {
	        this.events();
	    };
	    Pinned.prototype.$scroll = function (ev) {
	        var f = this.$, j = f.obj, j2 = f.parent, h = j.outerHeight(), h2 = j2.outerHeight();
	        if (h > $(window).height()) {
	            if (ev.offset >= h) {
	                if (ev.offset > h2) {
	                    ev.offset = h2;
	                }
	                var a$1 = ev.offset - h;
	                j.css('margin-top', a$1 + 'px');
	            } else {
	                j.css('margin-top', '0');
	            }
	        } else {
	            if (ev.offset > $(window).height()) {
	                var a$2 = ev.offset - $(window).height();
	                if (a$2 + h >= h2) {
	                    a$2 = h2 - h;
	                }
	                j.css('margin-top', a$2 + 'px');
	            } else {
	                j.css('margin-top', '0');
	            }
	        }
	    };
	    Pinned.prototype.events = function () {
	        var f = this.$;
	        f.scrollfire.on('scroll', function (self$0) {
	            return function (ev) {
	                return self$0.$scroll(ev);
	            };
	        }(this));
	    };
	}
	exports.default = Pinned;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	var w = {};
	if (typeof window !== 'undefined')
	    w = window;
	function init(window) {
	    {
	        function SideNav() {
	            SideNav.constructor ? SideNav.constructor.apply(this, arguments) : SideNav.$super && SideNav.$super.constructor.apply(this, arguments);
	        }
	        SideNav.prototype = Object.create(Element.prototype);
	        SideNav.prototype.constructor = SideNav;
	        SideNav.$super = Element.prototype;
	        SideNav.init = function () {
	            if (!SideNav.overlay) {
	                SideNav.overlay = $('#sidenav-overlay');
	                if (SideNav.overlay.length == 0)
	                    SideNav.overlay = undefined;
	            }
	            if (!SideNav.overlay) {
	                SideNav.overlay = $('<div>');
	                SideNav.overlay.addClass('transitioned');
	                SideNav.overlay.attr('id', 'sidenav-overlay');
	                SideNav.overlay.css('opacity', 0);
	                SideNav.overlay.hide();
	                $('body').append(SideNav.overlay);
	                SideNav.overlay.click(function () {
	                    if (SideNav.current)
	                        SideNav.current.close();
	                });
	            }
	        };
	        SideNav.register = function () {
	            $.fn.voxsidenav = function () {
	                var dp = [];
	                this.each(function () {
	                    var o = $(this);
	                    var t = undefined;
	                    if (!(t = o.data('vox-sidenav'))) {
	                        t = new SideNav(o);
	                        o.data('vox-sidenav', t);
	                    }
	                    dp.push(t);
	                });
	                return dp;
	            };
	            $(function () {
	                vox.mutation.watchAppend($('body'), function (ev) {
	                    ev.jTarget.voxsidenav();
	                }, '.side-nav');
	                $('.side-nav').voxsidenav();
	            });
	        };
	        SideNav.constructor = function (obj) {
	            SideNav.$super.constructor.call(this);
	            obj = $(obj);
	            var f = this.$ = {};
	            f.obj = obj;
	            this.obtainProps();
	            this.init();
	        };
	        SideNav.prototype.obtainProps = function () {
	            var f = this.$;
	            var main = f.obj.data('main');
	            f.main = $(main);
	        };
	        SideNav.prototype.init = function () {
	            this.events();
	            setTimeout(function (self$0) {
	                return function () {
	                    return self$0.$r();
	                };
	            }(this), 300);
	        };
	        SideNav.prototype.isOpened = function () {
	            return this.$.obj.hasClass('opened');
	        };
	        SideNav.prototype.open = function (event) {
	            var f = this.$;
	            SideNav.overlay.show();
	            SideNav.overlay.css('opacity', 1);
	            f.obj.addClass('opened');
	            SideNav.current = this;
	            var ev = this.createEvent('open', event);
	            ev.sidenav = this;
	            this.emit(ev);
	        };
	        SideNav.prototype.close = function (event) {
	            SideNav.overlay.css('opacity', 0);
	            setTimeout(function () {
	                SideNav.overlay.hide();
	            }, 800);
	            f.obj.removeClass('opened');
	            SideNav.current = undefined;
	            var ev = this.createEvent('close', event);
	            ev.sidenav = this;
	            this.emit(ev);
	        };
	        SideNav.prototype.toggle = function () {
	            if (this.isOpened())
	                this.close();
	            else
	                this.open();
	        };
	        SideNav.prototype.$r = function () {
	            var f = this.$;
	            var po = f.obj.position();
	            var v = true;
	            if (po.left <= -f.obj.width() || po.left >= $(window).width())
	                v = false;
	            if (v)
	                f.main.css('padding-left', f.obj.outerWidth());
	            else
	                f.main.css('padding-left', 0);
	        };
	        SideNav.prototype.events = function () {
	            var f = this.$;
	            if (f.button) {
	                f.button.click(function (self$0) {
	                    return function () {
	                        self$0.toggle();
	                    };
	                }(this));
	            }
	            var g = function (self$0) {
	                return function () {
	                    if (f.i) {
	                        clearTimeout(f.i);
	                        f.i = undefined;
	                    }
	                    self$0.$r();
	                    f.i = setTimeout(function () {
	                        return self$0.$r();
	                    }, 600);
	                };
	            }(this);
	            f.g = g;
	            $(window).resize(g);
	        };
	    }
	    SideNav.init();
	    return SideNav;
	}
	exports.default = init(w);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	{
	    function Tab() {
	        Tab.constructor ? Tab.constructor.apply(this, arguments) : Tab.$super && Tab.$super.constructor.apply(this, arguments);
	    }
	    Tab.prototype = Object.create(Element.prototype);
	    Tab.prototype.constructor = Tab;
	    Tab.$super = Element.prototype;
	    Tab.constructor = function (obj) {
	        Tab.$super.constructor.call(this);
	        obj = $(obj);
	        var f = this.$ = {};
	        f.obj = obj;
	        this.obtainProps();
	        this.init();
	    };
	    Tab.prototype.obtainProps = function () {
	        var f = this.$;
	        f.a = f.obj.find('a');
	    };
	    Tab.prototype.init = function () {
	        var h = this.href();
	        h && h.hide();
	        this.events();
	    };
	    Tab.prototype.href = function () {
	        var f = this.$;
	        var href = f.a.attr('href');
	        if (href) {
	            href = $(href);
	            f.href = href;
	        }
	        return f.href;
	    };
	    Tab.prototype.unselect = function () {
	        var f = this.$;
	        var a0 = f.a;
	        var ev = this.createEvent('beforeunselect');
	        ev.tab = this;
	        ev.jTarget = a0;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return false;
	        var ev = this.createEvent('unselect');
	        ev.tab = this;
	        ev.jTarget = a0;
	        this.href().hide();
	        if (f.parent) {
	            f.parent.removeindicator();
	        }
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return;
	    };
	    Tab.prototype.select = function () {
	        var f = this.$;
	        var a0 = f.a;
	        var ev = this.createEvent('beforeselect');
	        ev.tab = this;
	        ev.jTarget = a0;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return false;
	        var ev = this.createEvent('select');
	        ev.tab = this;
	        ev.jTarget = a0;
	        if (f.parent) {
	            if (f.parent.unselect() === false) {
	                return false;
	            }
	        }
	        this.href().show();
	        if (f.parent)
	            f.parent.addindicator(this);
	        this.emit(ev);
	    };
	    Tab.prototype.events = function () {
	        var f = this.$;
	        f.a.click(function (ev) {
	            if (f.obj.attr('disabled') === undefined && f.a.attr('disabled') === undefined) {
	                ev.preventDefault();
	                this.select();
	            }
	        });
	    };
	}
	exports.default = Tab;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	var doc = {};
	if (typeof document !== 'undefined') {
	    doc = document;
	}
	function init(document) {
	    {
	        function Tabs() {
	            Tabs.constructor ? Tabs.constructor.apply(this, arguments) : Tabs.$super && Tabs.$super.constructor.apply(this, arguments);
	        }
	        Tabs.prototype = Object.create(Element.prototype);
	        Tabs.prototype.constructor = Tabs;
	        Tabs.$super = Element.prototype;
	        Tabs.register = function () {
	            $.fn.voxtabgroup = function () {
	                var dp = [];
	                this.each(function () {
	                    var o = $(this);
	                    var t = undefined;
	                    if (!(t = o.data('vox-tabgroup'))) {
	                        t = new Tabs(o);
	                        o.data('vox-tabgroup', t);
	                    }
	                    dp.push(t);
	                });
	                return dp;
	            };
	            $(function () {
	                vox.mutation.watchAppend($('body'), function (ev) {
	                    ev.jTarget.voxtabgroup();
	                }, '.tabs');
	                $('.tabs').voxtabgroup();
	            });
	        };
	        Tabs.constructor = function (obj) {
	            Tabs.$super.constructor.call(this);
	            obj = $(obj);
	            var f = this.$ = {};
	            f.obj = obj;
	            this.obtainProps();
	            this.init();
	        };
	        Tabs.prototype.obtainProps = function () {
	            var f = this.$;
	            f.indicator = f.obj.find('.indicator');
	            if (f.indicator.length == 0) {
	                f.indicator = $('<div>');
	                f.indicator.addClass('indicator');
	                f.indicator.addClass('transitioned');
	            }
	            f.indicator.hide();
	        };
	        Tabs.prototype.init = function () {
	            this.tabs = [];
	            this.events();
	        };
	        Tabs.prototype.removeIndicator = function () {
	            this.$.indicator.hide();
	        };
	        Tabs.prototype.isOpened = function () {
	            return true;
	        };
	        Tabs.prototype.tabs = function () {
	            var f = this.$;
	            var utab = f.obj.find('.tab');
	            var i = 0;
	            var self = this;
	            utab.each(function () {
	                var jtab = $(this);
	                if (i == 0) {
	                    jtab.append(f.indicator);
	                }
	                var otab = new tab(jtab);
	                jtab.attr('vox-index', i);
	                otab.$.index = i;
	                otab.$.parent = self;
	                i++;
	                f.tabs.push(otab);
	            });
	        };
	        Tabs.prototype.addIndicator = function () {
	            var f = this.$;
	            var o = f.lastTab;
	            f.selectedTab = tab;
	            f.lastTab = tab;
	            var obj = tab.$.obj;
	            var left = obj.position().left;
	            f.indicator.show();
	            if (f.tabs[0]) {
	                var nl$3 = 0;
	                if (o)
	                    nl$3 = o.$.obj.position().left;
	                nl$3 = nl$3.toString() + 'px';
	                f.indicator.css('left', nl$3);
	                f.tabs[0].$.obj.append(f.indicator);
	            }
	            f.indicator.css('width', obj.outerWidth());
	            f.indicator.voxtransition({ left: left.toString() + 'px' }, undefined, 1000, function () {
	                f.indicator.css('left', 0);
	                f.indicator.css('width', '100%');
	                obj.append(f.indicator);
	            });
	        };
	        Tabs.prototype.unselect = function () {
	            if (f.selectedTab) {
	                if (f.selectedTab.unselect() !== false) {
	                    f.selectedTab = undefined;
	                }
	            }
	        };
	        Tabs.prototype.events = function () {
	            var f = this.$;
	            vox.platform.attachOuterClick(f.obj, {
	                active: function (self$0) {
	                    return function () {
	                        return self$0.isOpened();
	                    };
	                }(this),
	                processEvent: function (self$0) {
	                    return function (ev) {
	                        var ev2 = self$0.createEvent('outerclick', ev);
	                        ev2.tabs = self$0;
	                        ev2.target = ev.target;
	                        ev2.clickEvent = ev;
	                        return ev2;
	                    };
	                }(this),
	                self: this,
	                callback: function (self$0) {
	                    return function (ev) {
	                        self$0.emit(ev);
	                        if (ev.defaultPrevented)
	                            return;
	                        self$0.close();
	                    };
	                }(this)
	            });
	        };
	    }
	    return Tabs;
	}
	exports.default = init(doc);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	{
	    function Toast() {
	        Toast.constructor ? Toast.constructor.apply(this, arguments) : Toast.$super && Toast.$super.constructor.apply(this, arguments);
	    }
	    Toast.prototype = Object.create(Element.prototype);
	    Toast.prototype.constructor = Toast;
	    Toast.$super = Element.prototype;
	    Toast.init = function () {
	        if (!Toast.container) {
	            Toast.container = $('.toast-container');
	            if (Toast.container.length == 0) {
	                Toast.container = $('<div>');
	                Toast.container.addClass('toast-container');
	                Toast.container.addClass('flow-text');
	                $('body').append(Toast.container);
	            }
	        }
	    };
	    Toast.register = function () {
	        Toast.init();
	        $.fn.voxtoast = function () {
	            var dp = [];
	            this.each(function () {
	                var o = $(this);
	                var t = undefined;
	                if (!(t = o.data('vox-toast'))) {
	                    t = new Toast(o);
	                    o.data('vox-toast', t);
	                }
	                dp.push(t);
	            });
	            return dp;
	        };
	        $(function () {
	            vox.mutation.watchAppend($('body'), function (ev) {
	                if (ev.moved == false) {
	                    ev.jTarget.voxtoast();
	                }
	            }, '.toast');
	            $('.toast').voxtoast();
	            $('[data-toggle=toast]').click(function () {
	                var e = $(this);
	                var s = e.attr('vox-selector');
	                var g = $(s).eq(0);
	                var h = g.voxtoast()[0];
	                if (h) {
	                    h.open();
	                }
	            });
	        });
	    };
	    Toast.constructor = function (obj) {
	        Toast.$super.constructor.call(this);
	        obj = $(obj);
	        var f = this.$ = {};
	        f.obj = obj;
	        this.obtainProps();
	        this.init();
	    };
	    Toast.prototype.obtainProps = function () {
	    };
	    Toast.prototype.init = function () {
	        var f = this.$;
	        f.obj.removeClass('toast');
	        toast.container.append(f.obj);
	        f.obj.addClass('toast');
	        this.events();
	    };
	    Toast.prototype.isOpened = function () {
	        return this.$.obj.hasClass('opened');
	    };
	    Toast.prototype.open = function (event) {
	        var f = this.$;
	        var ev = this.createEvent('beforeopen', event);
	        ev.toast = this;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return;
	        if (f.delay) {
	            clearTimeout(f.delay);
	            f.delay = undefined;
	        }
	        f.lEvent = event ? event.type : '';
	        f.obj.addClass('opened');
	        f.obj.show();
	        var ev = this.createEvent('open', event);
	        ev.toast = this;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return;
	        var time = parseInt(f.obj.data('delay'));
	        if (isNaN(time) || !time) {
	            time = 1000;
	        }
	        f.delay = setTimeout(function (self$0) {
	            return function () {
	                return self$0.close();
	            };
	        }(this), time);
	    };
	    Toast.prototype.close = function () {
	        var f = this.$;
	        var ev = this.createEvent('beforeclose');
	        ev.toast = this;
	        this.emit(ev);
	        if (ev.defaultPrevented)
	            return;
	        f.lEvent = undefined;
	        f.obj.removeClass('opened');
	        f.obj.hide();
	        var ev = vox.platform.createEvent('close');
	        ev.toast = this;
	        this.emit(ev);
	    };
	    Toast.prototype.toggle = function () {
	        this.isOpened() ? this.close() : this.open();
	    };
	    Toast.prototype.events = function () {
	        var f = this.$;
	        vox.platform.attachOuterClick(f.obj, {
	            active: function (self$0) {
	                return function () {
	                    return self$0.isOpened();
	                };
	            }(this),
	            processEvent: function (self$0) {
	                return function (ev) {
	                    var ev2 = self$0.createEvent('outerclick', ev);
	                    ev2.toast = self$0;
	                    ev2.target = ev.target;
	                    ev2.clickEvent = ev;
	                    return ev2;
	                };
	            }(this),
	            self: this,
	            callback: function (self$0) {
	                return function (ev) {
	                    self$0.emit(ev);
	                };
	            }(this)
	        });
	    };
	}
	exports.default = Toast;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	var w = {};
	if (typeof window !== 'undefined')
	    w = window;
	function init(window) {
	    {
	        function Tooltip() {
	            Tooltip.constructor ? Tooltip.constructor.apply(this, arguments) : Tooltip.$super && Tooltip.$super.constructor.apply(this, arguments);
	        }
	        Tooltip.prototype = Object.create(Element.prototype);
	        Tooltip.prototype.constructor = Tooltip;
	        Tooltip.$super = Element.prototype;
	        Tooltip.register = function () {
	            $.fn.voxtooltip = function () {
	                var dp = [];
	                this.each(function () {
	                    var o = $(this);
	                    var t = undefined;
	                    if (!(t = o.data('vox-tooltip'))) {
	                        t = new Tooltip(o);
	                        o.data('vox-tooltip', t);
	                    }
	                    dp.push(t);
	                });
	                return dp;
	            };
	            vox.mutation.watchAppend($('body'), function (ev) {
	                ev.jTarget.voxtooltip();
	            }, '.tooltip');
	            $('.tooltip').voxtooltip();
	        };
	        Tooltip.constructor = function (obj) {
	            Tooltip.$super.constructor.call(this);
	            obj = $(obj);
	            var f = this.$ = {};
	            f.obj = obj;
	            this.obtainProps();
	            this.init();
	        };
	        Tooltip.prototype.__defineGetter__('html', function () {
	            return this.$.obj.html();
	        });
	        Tooltip.prototype.__defineSetter__('html', function (value) {
	            this.$.obj.html(value);
	        });
	        Tooltip.prototype.__defineGetter__('text', function () {
	            return this.$.obj.text();
	        });
	        Tooltip.prototype.__defineSetter__('text', function (value) {
	            this.$.obj.text(value);
	        });
	        Tooltip.prototype.obtainProps = function () {
	        };
	        Tooltip.prototype.init = function () {
	            var f = this.$;
	            f.obj.removeClass('toast');
	            toast.container.append(f.obj);
	            f.obj.addClass('toast');
	            this.events();
	        };
	        Tooltip.prototype.isOpened = function () {
	            return this.$.obj.hasClass('opened');
	        };
	        Tooltip.prototype.activate = function (parent) {
	            var f = this.$;
	            if (f.activating2) {
	                clearTimeout(f.activating2);
	                f.activating2 = undefined;
	            }
	            if (f.activating) {
	                clearTimeout(f.activating);
	                f.activating = undefined;
	            }
	            var time = f.obj.data('delay');
	            if (isNaN(time) || !time)
	                time = 500;
	            if (parent)
	                f.lParent = parent;
	            f.activating = setTimeout(function (self$0) {
	                return function () {
	                    return self$0.open();
	                };
	            }(this), time);
	        };
	        Tooltip.prototype.acomode = function () {
	            var f = this.$;
	            f.obj.addClass('activating');
	            var task = new core.VW.Task();
	            setTimeout(function () {
	                var h = f.obj.outerHeight();
	                var hg = $(window).height();
	                var w = f.obj.outerWidth();
	                var hw = $(window).width();
	                var l = (hw - w) / 2;
	                f.obj.css('top', 0);
	                var f_abs = f.obj.offset().top;
	                var lOff = 0, lFixed = 0, lh = 0, lw = 0, lLeft = 0;
	                var maxHeight, top, bottom;
	                if (f.lParent) {
	                    lw = f.lParent.outerWidth();
	                    lOff = f.lParent.offset().top;
	                    lLeft = f.lParent.offset().left;
	                    lFixed = lOff - f_abs;
	                    lh = f.lParent.outerHeight();
	                }
	                if (lFixed > hg / 2) {
	                    maxHeight = lFixed - 20;
	                    if (maxHeight < 30)
	                        maxHeight = 'auto';
	                    else
	                        maxHeight = maxHeight.toString() + 'px';
	                    top = 'initial';
	                    bottom = hg - lOff + 4 + 'px';
	                } else {
	                    top = lOff + lh + 4;
	                    maxHeight = hg - top;
	                    if (maxHeight < 30)
	                        maxHeight = 'auto';
	                    else
	                        maxHeight = maxHeight.toString() + 'px';
	                    bottom = 'initial';
	                    top = top.toString() + 'px';
	                }
	                l = lLeft + lw / 2 - w / 2;
	                if (l < 0)
	                    l = 0;
	                f.obj.css('left', l + 'px');
	                f.obj.css('max-height', maxHeight);
	                f.obj.css('top', top);
	                f.obj.css('bottom', bottom);
	                f.obj.removeClass('activating');
	                task.finish();
	            }, 0);
	            return task;
	        };
	        Tooltip.prototype.open = function callee$0$0(event) {
	            var f, ev, effect;
	            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
	                while (1)
	                    switch (context$1$0.prev = context$1$0.next) {
	                    case 0:
	                        f = this.$;
	                        if (!this.isOpened()) {
	                            context$1$0.next = 3;
	                            break;
	                        }
	                        return context$1$0.abrupt('return');
	                    case 3:
	                        f.activating = undefined;
	                        ev = this.createEvent('beforeopen', event);
	                        ev.tooltip = this;
	                        this.emit(ev);
	                        if (!ev.defaultPrevented) {
	                            context$1$0.next = 9;
	                            break;
	                        }
	                        return context$1$0.abrupt('return');
	                    case 9:
	                        if (f.delay) {
	                            clearTimeout(f.delay);
	                            f.delay = undefined;
	                        }
	                        context$1$0.next = 12;
	                        return regeneratorRuntime.awrap(f.acomode());
	                    case 12:
	                        f.lEvent = event ? event.type : '';
	                        effect = f.obj.data('ineffect') || 'fadeIn short';
	                        f.obj.addClass('opened');
	                        f.obj.voxanimate(effect, undefined, function () {
	                            var ev = this.createEvent('open', event);
	                            ev.tooltip = this;
	                            this.emit(ev);
	                        });
	                    case 16:
	                    case 'end':
	                        return context$1$0.stop();
	                    }
	            }, null, this);
	        };
	        Tooltip.prototype.close = function () {
	            if (!this.isOpened())
	                return;
	            var f = this.$;
	            var ev = this.createEvent('beforeclose');
	            ev.tooltip = this;
	            this.emit(ev);
	            if (ev.defaultPrevented)
	                return;
	            f.lEvent = undefined;
	            f.obj.removeClass('opened');
	            var effect = f.obj.data('outeffect') || 'fadeOut short';
	            f.obj.voxanimate(effect, undefined, function () {
	                var ev = this.createEvent('close');
	                ev.tooltip = this;
	                this.emit(ev);
	            });
	        };
	        Tooltip.prototype.toggle = function () {
	            this.isOpened() ? this.close() : this.open();
	        };
	        Tooltip.prototype.activateClose = function () {
	            var f = this.$;
	            if (f.activating) {
	                clearTimeout(f.activating);
	                f.activating = undefined;
	            }
	            if (f.activating2) {
	                clearTimeout(f.activating2);
	                f.activating2 = undefined;
	            }
	            var time = f.obj.data('delay');
	            if (isNaN(time) || !time)
	                time = 500;
	            f.activating2 = setTimeout(function (self$0) {
	                return function () {
	                    return self$0.close();
	                };
	            }(this), time);
	        };
	        Tooltip.prototype.events = function () {
	            var f = this.$;
	            f.obj.hover(function (self$0) {
	                return function (ev) {
	                    if (ev.type == 'mouseenter')
	                        self$0.activate();
	                    else if (ev.type = 'mouseleave')
	                        self.activateClose();
	                };
	            }(this));
	            vox.platform.attachOuterClick(f.obj, {
	                active: function (self$0) {
	                    return function () {
	                        return self$0.isOpened();
	                    };
	                }(this),
	                processEvent: function (self$0) {
	                    return function (ev) {
	                        var ev2 = self$0.createEvent('outerclick', ev);
	                        ev2.tooltip = self$0;
	                        ev2.target = ev.target;
	                        ev2.clickEvent = ev;
	                        return ev2;
	                    };
	                }(this),
	                self: this,
	                callback: function (self$0) {
	                    return function (ev) {
	                        self$0.emit(ev);
	                        if (ev.defaultPrevented)
	                            return;
	                        self$0.close();
	                    };
	                }(this)
	            });
	        };
	    }
	    return Tooltip;
	}
	exports.default = init(w);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(1).default;
	var $ = core.VW.Web.JQuery;
	var vox = core.VW.Web.Vox;
	var w = {};
	if (typeof window !== 'undefined')
	    w = window;
	function init(window) {
	    {
	        function Tooltip() {
	            Tooltip.constructor ? Tooltip.constructor.apply(this, arguments) : Tooltip.$super && Tooltip.$super.constructor.apply(this, arguments);
	        }
	        Tooltip.prototype = Object.create(Element.prototype);
	        Tooltip.prototype.constructor = Tooltip;
	        Tooltip.$super = Element.prototype;
	        Tooltip.createTooltip = function (obj) {
	            var s = $('<div class=\'tooltip\'></div>');
	            if (obj.data('class'))
	                s.addClass(obj.data('class'));
	            else
	                s.addClass('default');
	            $('body').append(s);
	            return s;
	        };
	        Tooltip.register = function () {
	            $.fn.voxhastooltip = function () {
	                var dp = [];
	                this.each(function () {
	                    var o = $(this);
	                    var t = undefined;
	                    if (!(t = o.data('vox-hastooltip'))) {
	                        t = new HasTooltip(o);
	                        o.data('vox-hastooltip', t);
	                    }
	                    dp.push(t);
	                });
	                return dp;
	            };
	            vox.mutation.watchAppend($('body'), function (ev) {
	                ev.jTarget.voxhastooltip();
	            }, '[data-hover=tooltip]');
	            $('[data-hover=tooltip]').voxhastooltip();
	        };
	        Tooltip.constructor = function (obj) {
	            Tooltip.$super.constructor.call(this);
	            obj = $(obj);
	            var f = this.$ = {};
	            f.obj = obj;
	            this.obtainProps();
	            this.init();
	        };
	        Tooltip.prototype.obtainProps = function () {
	            var f = this.$;
	            var s = f.obj.attr('vox-selector');
	            if (s)
	                f.tip = $(s);
	            else
	                f.tip = HasTooltip.createTooltip(f.obj);
	            f.tip = f.tip.voxtooltip()[0];
	        };
	        Tooltip.prototype.init = function () {
	            var f = this.$;
	            f.obj.removeClass('toast');
	            toast.container.append(f.obj);
	            f.obj.addClass('toast');
	            this.events();
	        };
	        Tooltip.prototype.__defineGetter__('tooltip', function () {
	            return this.$.tip;
	        });
	        Tooltip.prototype.activate = function () {
	            var f = this.$;
	            if (f.obj.data('html'))
	                f.tip.html = f.obj.data('tooltip');
	            else
	                f.tip.text = f.obj.data('tooltip');
	            f.tip.activate(f.obj);
	        };
	        Tooltip.prototype.events = function () {
	            var f = this.$;
	            f.obj.hover(function (self$0) {
	                return function (ev) {
	                    if (ev.type == 'mouseenter')
	                        self$0.activate();
	                    else if (ev.type = 'mouseleave')
	                        f.tip.activateClose();
	                };
	            }(this));
	        };
	    }
	}

/***/ }
/******/ ])
});
;