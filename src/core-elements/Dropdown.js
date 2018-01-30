var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var Dropdown = function Dropdown() {
        Dropdown.$constructor ? Dropdown.$constructor.apply(this, arguments) : Dropdown.$superClass && Dropdown.$superClass.apply(this, arguments);
    };
    Dropdown.prototype = Object.create(Element.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(Dropdown, Element) : Dropdown.__proto__ = Element;
    Dropdown.prototype.constructor = Dropdown;
    Dropdown.$super = Element.prototype;
    Dropdown.$superClass = Element;
    Dropdown.register = function () {
        if (this.registered)
            return;
        $.fn.voxdropdown = function () {
            var dp = [];
            this.each(function () {
                var o = $(this);
                var t = undefined;
                this.voxcss_element = this.voxcss_element || {};
                t = this.voxcss_element['vox-dropdown'];
                if (!t) {
                    t = new Dropdown(o);
                    this.voxcss_element['vox-dropdown'] = t;
                }
                dp.push(t);
            });
            return dp;
        };
        Dropdown.registerWatch();
        this.registered = true;
    };
    Dropdown.registerWatch = function () {
        $(function () {
            vox.mutation.watchAppend($('body'), function (ev) {
                ev.jTarget.voxdropdown();
            }, '.dropdown');
            $('.dropdown').voxdropdown();
        });
    };
    Dropdown.$constructor = function (obj) {
        Dropdown.$superClass.call(this);
        this.func = [];
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
        var y = function () {
            var a0 = $(this);
            var ev = self.createEvent('beforeselect');
            ev.dropdown = self;
            ev.jTarget = a0;
            self.emit(ev);
            if (ev.defaultPrevented)
                return;
            var ev = self.createEvent('select');
            ev.dropdown = self;
            ev.jTarget = a0;
            ev.value = a0.data('value');
            self.emit(ev);
            if (ev.defaultPrevented) {
                return;
            }
            self.close();
        };
        this.attachEvent(a, 'click', y);
    };
    Dropdown.prototype.open = function (event) {
        var f = this.$;
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
            self.emit(ev);
        });
    };
    Dropdown.prototype.close = function () {
        var f = this.$;
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
        var f = this.$;
        if (f.menu.hasClass('opened'))
            this.close();
        else
            this.open();
    };
    Dropdown.prototype.dynamicDispose = function () {
        if (this.watchRemoveListener) {
            this.watchRemoveListener();
        }
        this.watchRemoveListener = null;
        Element.prototype.dynamicDispose.call(this);
    };
    Dropdown.prototype.events = function () {
        var f = this.$, ab;
        this.watchRemoveListener = vox.mutation.watchAppend(f.menu, function (self$0) {
            return function (ev) {
                self$0.$pEvents(ev.jTarget.find('>a'));
            };
        }(this), 'li');
        this.$pEvents(f.menu.find('li>a'));
        var self = this;
        this.attachEvent($(document), 'keyup', function (ev) {
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
        this.attachEvent($(document), 'click', function (ev) {
            if (!self.isOpened()) {
                return;
            }
            var e = $(ev.target);
            if (ev.target != f.obj.get(0) && f.obj.find(e).length == 0) {
                var ev2 = self.createEvent('outerclick');
                ev2.dropdown = self;
                ev2.target = ev.target;
                ev2.clickEvent = ev;
                self.emit(ev);
                if (ev.defaultPrevented)
                    return;
                self.close();
            }
        });
        f.btn = f.obj.find('a,.button').eq(0);
        this.attachEvent(f.btn, 'click', function () {
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
        this.attachEvent(f.btn, 'hover', j);
        this.attachEvent(f.menu, 'hover', j);
    };
}
var doc = {};
if (typeof document === 'object')
    doc = document;
exports.default = Dropdown;