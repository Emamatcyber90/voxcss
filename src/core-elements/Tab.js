var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var Tab = function Tab() {
        Tab.$constructor ? Tab.$constructor.apply(this, arguments) : Tab.$superClass && Tab.$superClass.apply(this, arguments);
    };
    Tab.prototype = Object.create(Element.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(Tab, Element) : Tab.__proto__ = Element;
    Tab.prototype.constructor = Tab;
    Tab.$super = Element.prototype;
    Tab.$superClass = Element;
    Tab.$constructor = function (obj) {
        Tab.$superClass.call(this);
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
            f.parent.removeIndicator();
        }
        this.emit(ev);
        if (ev.defaultPrevented)
            return;
    };
    Tab.prototype.select = function () {
        console.info('TAB HERE -----');
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
            f.parent.addIndicator(this);
        this.emit(ev);
    };
    Tab.prototype.events = function () {
        var f = this.$;
        console.info('AQUI BABE...');
        f.a.click(function (self$0) {
            return function (ev) {
                if (f.obj.attr('disabled') === undefined && f.a.attr('disabled') === undefined) {
                    ev.preventDefault();
                    self$0.select();
                }
            };
        }(this));
    };
}
exports.default = Tab;