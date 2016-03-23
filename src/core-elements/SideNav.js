var Element = require('./Element').default;
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