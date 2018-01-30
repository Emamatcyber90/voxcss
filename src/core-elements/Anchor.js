var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var Anchor = function Anchor() {
        Anchor.$constructor ? Anchor.$constructor.apply(this, arguments) : Anchor.$superClass && Anchor.$superClass.apply(this, arguments);
    };
    Anchor.prototype = Object.create(Element.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(Anchor, Element) : Anchor.__proto__ = Element;
    Anchor.prototype.constructor = Anchor;
    Anchor.$super = Element.prototype;
    Anchor.$superClass = Element;
    Anchor.register = function () {
        if (this.registered)
            return;
        $.fn.voxanchor = function () {
            var dp = [];
            this.each(function () {
                var o = $(this);
                var t = undefined;
                this.voxcss_element = this.voxcss_element || {};
                t = this.voxcss_element['anchor'];
                if (!t) {
                    t = new Anchor(o);
                    this.voxcss_element['anchor'] = t;
                }
                dp.push(t);
            });
            return dp;
        };
        $(function () {
            vox.mutation.watchAppend($('body'), function (ev) {
                ev.jTarget.voxanchor();
            }, '[hash-effect]');
            $('[hash-effect]').voxanchor();
        });
        this.registered = true;
    };
    Anchor.$constructor = function (obj) {
        Anchor.$superClass.call(this);
        obj = $(obj);
        var f = this.$ = {};
        f.obj = obj;
        this.obtainProps();
        this.init();
    };
    Anchor.prototype.init = function () {
        this.events();
    };
    Anchor.prototype.obtainProps = function () {
        var f = this.$;
        f.isHash = f.obj.attr('hash-effect') !== undefined;
    };
    Anchor.prototype.hashEffect = function callee$0$0() {
        var f, hash, obj, pad, offset, top, w, current, dif, time, intervals, dif1, i;
        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
            while (1)
                switch (context$1$0.prev = context$1$0.next) {
                case 0:
                    if (this.it1)
                        clearTimeout(this.it1);
                    f = this.$;
                    hash = f.obj.attr('href');
                    if (!hash)
                        hash = f.obj.data('href');
                    else
                        f.obj.data('href', hash);
                    f.obj.removeAttr('href');
                    obj = $(hash);
                    pad = f.obj.attr('hash-padding');
                    pad = pad | 0;
                    offset = obj.offset();
                    top = offset.top - pad;
                    w = $(window);
                    current = w.scrollTop();
                    dif = top - current;
                    time = f.obj.attr('hash-time');
                    time = parseInt(time);
                    if (isNaN(time))
                        time = 500;
                    intervals = time / 10;
                    dif1 = dif / intervals;
                    i = 0;
                case 19:
                    if (!(i < intervals)) {
                        context$1$0.next = 27;
                        break;
                    }
                    current += dif1;
                    w.scrollTop(current);
                    context$1$0.next = 24;
                    return regeneratorRuntime.awrap(core.VW.Task.sleep(10));
                case 24:
                    i++;
                    context$1$0.next = 19;
                    break;
                case 27:
                    w.scrollTop(top);
                    this.it1 = setTimeout(function (self$0) {
                        return function () {
                            f.obj.attr('href', hash);
                            self$0.it1 = undefined;
                        };
                    }(this), 100);
                case 29:
                case 'end':
                    return context$1$0.stop();
                }
        }, null, this);
    };
    Anchor.prototype.events = function () {
        var f = this.$;
        f.obj.click(function (self$0) {
            return function (ev) {
                self$0.hashEffect();
            };
        }(this));
    };
}
exports.default = Anchor;