var Element = require('./Element').default;
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
        var Parallax = function Parallax() {
            Parallax.constructor ? Parallax.constructor.apply(this, arguments) : Parallax.$super && Parallax.$super.constructor.apply(this, arguments);
        };
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