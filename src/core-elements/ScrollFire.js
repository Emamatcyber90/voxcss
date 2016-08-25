var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var ScrollFire = function ScrollFire() {
        ScrollFire.$constructor ? ScrollFire.$constructor.apply(this, arguments) : ScrollFire.$superClass && ScrollFire.$superClass.apply(this, arguments);
    };
    ScrollFire.prototype = Object.create(Element.prototype);
    ScrollFire.prototype.constructor = ScrollFire;
    ScrollFire.$super = Element.prototype;
    ScrollFire.$superClass = Element;
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
    ScrollFire.$constructor = function (obj) {
        ScrollFire.$superClass.call(this);
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