var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var Toast = function Toast() {
        Toast.constructor ? Toast.constructor.apply(this, arguments) : Toast.$super && Toast.$super.constructor.apply(this, arguments);
    };
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