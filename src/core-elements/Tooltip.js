var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
var w = {};
if (typeof window !== 'undefined')
    w = window;
function init(window) {
    {
        var Tooltip = function Tooltip() {
            Tooltip.constructor ? Tooltip.constructor.apply(this, arguments) : Tooltip.$super && Tooltip.$super.constructor.apply(this, arguments);
        };
        Tooltip.prototype = Object.create(Element.prototype);
        Tooltip.prototype.constructor = Tooltip;
        Tooltip.$super = Element.prototype;
        Tooltip.register = function () {
            $.fn.voxtooltip = function () {
                var dp = [];
                this.each(function () {
                    var o = $(this);
                    var t = undefined;
                    if (!(t = o.data('vox-tooltip'))) {
                        t = new Tooltip(o);
                        o.data('vox-tooltip', t);
                    }
                    dp.push(t);
                });
                return dp;
            };
            vox.mutation.watchAppend($('body'), function (ev) {
                ev.jTarget.voxtooltip();
            }, '.tooltip');
            $('.tooltip').voxtooltip();
        };
        Tooltip.constructor = function (obj) {
            Tooltip.$super.constructor.call(this);
            obj = $(obj);
            var f = this.$ = {};
            f.obj = obj;
            this.obtainProps();
            this.init();
        };
        Tooltip.prototype.__defineGetter__('html', function () {
            return this.$.obj.html();
        });
        Tooltip.prototype.__defineSetter__('html', function (value) {
            this.$.obj.html(value);
        });
        Tooltip.prototype.__defineGetter__('text', function () {
            return this.$.obj.text();
        });
        Tooltip.prototype.__defineSetter__('text', function (value) {
            this.$.obj.text(value);
        });
        Tooltip.prototype.obtainProps = function () {
        };
        Tooltip.prototype.init = function () {
            var f = this.$;
            f.obj.removeClass('toast');
            toast.container.append(f.obj);
            f.obj.addClass('toast');
            this.events();
        };
        Tooltip.prototype.isOpened = function () {
            return this.$.obj.hasClass('opened');
        };
        Tooltip.prototype.activate = function (parent) {
            var f = this.$;
            if (f.activating2) {
                clearTimeout(f.activating2);
                f.activating2 = undefined;
            }
            if (f.activating) {
                clearTimeout(f.activating);
                f.activating = undefined;
            }
            var time = f.obj.data('delay');
            if (isNaN(time) || !time)
                time = 500;
            if (parent)
                f.lParent = parent;
            f.activating = setTimeout(function (self$0) {
                return function () {
                    return self$0.open();
                };
            }(this), time);
        };
        Tooltip.prototype.acomode = function () {
            var f = this.$;
            f.obj.addClass('activating');
            var task = new core.VW.Task();
            setTimeout(function () {
                var h = f.obj.outerHeight();
                var hg = $(window).height();
                var w = f.obj.outerWidth();
                var hw = $(window).width();
                var l = (hw - w) / 2;
                f.obj.css('top', 0);
                var f_abs = f.obj.offset().top;
                var lOff = 0, lFixed = 0, lh = 0, lw = 0, lLeft = 0;
                var maxHeight, top, bottom;
                if (f.lParent) {
                    lw = f.lParent.outerWidth();
                    lOff = f.lParent.offset().top;
                    lLeft = f.lParent.offset().left;
                    lFixed = lOff - f_abs;
                    lh = f.lParent.outerHeight();
                }
                if (lFixed > hg / 2) {
                    maxHeight = lFixed - 20;
                    if (maxHeight < 30)
                        maxHeight = 'auto';
                    else
                        maxHeight = maxHeight.toString() + 'px';
                    top = 'initial';
                    bottom = hg - lOff + 4 + 'px';
                } else {
                    top = lOff + lh + 4;
                    maxHeight = hg - top;
                    if (maxHeight < 30)
                        maxHeight = 'auto';
                    else
                        maxHeight = maxHeight.toString() + 'px';
                    bottom = 'initial';
                    top = top.toString() + 'px';
                }
                l = lLeft + lw / 2 - w / 2;
                if (l < 0)
                    l = 0;
                f.obj.css('left', l + 'px');
                f.obj.css('max-height', maxHeight);
                f.obj.css('top', top);
                f.obj.css('bottom', bottom);
                f.obj.removeClass('activating');
                task.finish();
            }, 0);
            return task;
        };
        Tooltip.prototype.open = function callee$0$0(event) {
            var f, ev, effect;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        f = this.$;
                        if (!this.isOpened()) {
                            context$1$0.next = 3;
                            break;
                        }
                        return context$1$0.abrupt('return');
                    case 3:
                        f.activating = undefined;
                        ev = this.createEvent('beforeopen', event);
                        ev.tooltip = this;
                        this.emit(ev);
                        if (!ev.defaultPrevented) {
                            context$1$0.next = 9;
                            break;
                        }
                        return context$1$0.abrupt('return');
                    case 9:
                        if (f.delay) {
                            clearTimeout(f.delay);
                            f.delay = undefined;
                        }
                        context$1$0.next = 12;
                        return regeneratorRuntime.awrap(f.acomode());
                    case 12:
                        f.lEvent = event ? event.type : '';
                        effect = f.obj.data('ineffect') || 'fadeIn short';
                        f.obj.addClass('opened');
                        f.obj.voxanimate(effect, undefined, function () {
                            var ev = this.createEvent('open', event);
                            ev.tooltip = this;
                            this.emit(ev);
                        });
                    case 16:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        };
        Tooltip.prototype.close = function () {
            if (!this.isOpened())
                return;
            var f = this.$;
            var ev = this.createEvent('beforeclose');
            ev.tooltip = this;
            this.emit(ev);
            if (ev.defaultPrevented)
                return;
            f.lEvent = undefined;
            f.obj.removeClass('opened');
            var effect = f.obj.data('outeffect') || 'fadeOut short';
            f.obj.voxanimate(effect, undefined, function () {
                var ev = this.createEvent('close');
                ev.tooltip = this;
                this.emit(ev);
            });
        };
        Tooltip.prototype.toggle = function () {
            this.isOpened() ? this.close() : this.open();
        };
        Tooltip.prototype.activateClose = function () {
            var f = this.$;
            if (f.activating) {
                clearTimeout(f.activating);
                f.activating = undefined;
            }
            if (f.activating2) {
                clearTimeout(f.activating2);
                f.activating2 = undefined;
            }
            var time = f.obj.data('delay');
            if (isNaN(time) || !time)
                time = 500;
            f.activating2 = setTimeout(function (self$0) {
                return function () {
                    return self$0.close();
                };
            }(this), time);
        };
        Tooltip.prototype.events = function () {
            var f = this.$;
            f.obj.hover(function (self$0) {
                return function (ev) {
                    if (ev.type == 'mouseenter')
                        self$0.activate();
                    else if (ev.type = 'mouseleave')
                        self.activateClose();
                };
            }(this));
            vox.platform.attachOuterClick(f.obj, {
                active: function (self$0) {
                    return function () {
                        return self$0.isOpened();
                    };
                }(this),
                processEvent: function (self$0) {
                    return function (ev) {
                        var ev2 = self$0.createEvent('outerclick', ev);
                        ev2.tooltip = self$0;
                        ev2.target = ev.target;
                        ev2.clickEvent = ev;
                        return ev2;
                    };
                }(this),
                self: this,
                callback: function (self$0) {
                    return function (ev) {
                        self$0.emit(ev);
                        if (ev.defaultPrevented)
                            return;
                        self$0.close();
                    };
                }(this)
            });
        };
    }
    return Tooltip;
}
exports.default = init(w);