var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var Pinned = function Pinned() {
        Pinned.$constructor ? Pinned.$constructor.apply(this, arguments) : Pinned.$super && Pinned.$super.constructor.apply(this, arguments);
    };
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
    Pinned.$constructor = function (obj) {
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