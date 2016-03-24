var Element = require('./Element').default;
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
    return Tooltip;
}
exports.default = init(w);