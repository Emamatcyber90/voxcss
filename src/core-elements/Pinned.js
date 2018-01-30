var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var Pinned = function Pinned() {
        Pinned.$constructor ? Pinned.$constructor.apply(this, arguments) : Pinned.$superClass && Pinned.$superClass.apply(this, arguments);
    };
    Pinned.prototype = Object.create(Element.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(Pinned, Element) : Pinned.__proto__ = Element;
    Pinned.prototype.constructor = Pinned;
    Pinned.$super = Element.prototype;
    Pinned.$superClass = Element;
    Pinned.register = function () {
        if (this.registered)
            return;
        $.fn.voxpinned = function () {
            var dp = [];
            this.each(function () {
                var o = $(this);
                var t = undefined;
                this.voxcss_element = this.voxcss_element || {};
                t = this.voxcss_element['vox-pinned'];
                if (!t) {
                    t = new Pinned(o);
                    this.voxcss_element['vox-pinned'] = t;
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
        this.registered = true;
    };
    Pinned.$constructor = function (obj) {
        Pinned.$superClass.call(this);
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
        var wh = $(window).outerHeight();
        var pt = j2.attr('pinned-top') | 0;
        wh -= pt;
        var applyPinned = true, pos, lastpos = undefined;
        var pinnedItems = j2.find('.pinned');
        for (var i = 0; i < pinnedItems.length; i++) {
            pos = pinnedItems.eq(i).position().top;
            if (lastpos !== undefined && lastpos != pos) {
                applyPinned = false;
                break;
            }
            lastpos = pos;
        }
        if (!applyPinned) {
            pinnedItems.css('margin-top', 0);
            return;
        }
        if (h > wh) {
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
            if (ev.offset > wh) {
                var a$2 = ev.offset - wh;
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