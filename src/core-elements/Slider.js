var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
var w = {};
if (typeof window !== 'undefined')
    w = window;
function init(window) {
    {
        var Slider = function Slider() {
            Slider.$constructor ? Slider.$constructor.apply(this, arguments) : Slider.$superClass && Slider.$superClass.apply(this, arguments);
        };
        Slider.prototype = Object.create(Element.prototype);
        Object.setPrototypeOf ? Object.setPrototypeOf(Slider, Element) : Slider.__proto__ = Element;
        Slider.prototype.constructor = Slider;
        Slider.$super = Element.prototype;
        Slider.$superClass = Element;
        Slider.init = function () {
        };
        Slider.register = function () {
            $.fn.voxslider = function () {
                var dp = [];
                this.each(function () {
                    var o = $(this);
                    var t = undefined;
                    if (!(t = o.data('vox-slider'))) {
                        t = new Slider(o);
                        o.data('vox-slider', t);
                    }
                    dp.push(t);
                });
                return dp;
            };
            $(function () {
                vox.mutation.watchAppend($('body'), function (ev) {
                    ev.jTarget.voxslider();
                }, '.slider');
                $('.slider').voxslider();
            });
        };
        Slider.$constructor = function (obj) {
            Slider.$superClass.call(this);
            obj = $(obj);
            var f = this.$ = {};
            f.obj = obj;
            this.obtainProps();
            this.init();
        };
        Slider.prototype.init = function () {
            var f = this.$;
            this.events();
            if (f.obj.hasClass('discrete'))
                this.createSteps();
        };
        Slider.prototype.__defineGetter__('maxValue', function () {
            var v = this.$.obj.data('maxvalue');
            return v === undefined ? 100 : v;
        });
        Slider.prototype.__defineGetter__('minValue', function () {
            var v = this.$.obj.data('minvalue');
            return v === undefined ? 0 : v;
        });
        Slider.prototype.__defineGetter__('step', function () {
            var v = this.$.obj.data('step');
            return v === undefined ? 1 : v;
        });
        Slider.prototype.createSteps = function () {
            var f = this.$, s;
            var minValue = parseFloat(f.obj.data('minvalue'));
            var maxValue = parseFloat(f.obj.data('maxvalue'));
            var step = parseFloat(f.obj.data('step'));
            var dif = maxValue - minValue;
            var percent = 0;
            var stepPercent = step * 100 / dif;
            while (percent <= 100) {
                s = $('<div>');
                s.addClass('step');
                s.insertAfter(f.progress);
                if (f.obj.hasClass('vertical')) {
                    if (f.obj.hasClass('inverted'))
                        s.css('top', percent + '%');
                    else
                        s.css('bottom', percent + '%');
                } else {
                    s.css('left', percent + '%');
                }
                percent += stepPercent;
            }
        };
        Slider.prototype.obtainProps = function () {
            var f = this.$;
            f.line = f.obj.find('.line');
            f.progress = f.obj.find('.progress');
            f.ball = f.obj.find('.ball');
            f.ball.addClass('first');
            f.line.addClass('transitioned');
            f.progress.addClass('transitioned');
            f.ball.addClass('transitioned');
            if (f.obj.data('color')) {
                f.ball.addClass(f.obj.data('color'));
                f.progress.addClass(f.obj.data('color'));
                f.ball.addClass('text-' + f.obj.data('color'));
            }
            f.span = f.ball.find('span');
            if (!f.span.length) {
                f.span = $('<span>');
                f.span.addClass('text-' + f.obj.data('text-color'));
                f.ball.append(f.span);
            }
            var observable = f.obj.data('bind');
            if (observable) {
                var scope = f.obj.voxscope();
                f.observable = observable;
                f.scope = scope;
                f.scope.observer.onValueChanged(observable, this._changeValue.bind(this));
            }
            if (f.obj.data('value'))
                this.set(f.obj.data('value'));
        };
        Slider.prototype.get = function () {
            return this.$value;
        };
        Slider.prototype.set = function (value) {
            var f = this.$;
            if (f.scope) {
                f.scope.observer.assignValue({
                    name: f.observable,
                    value: value
                });
            } else {
                this._changeValue({ value: value });
            }
        };
        Slider.prototype._changeValue = function (ev) {
            var f = this.$;
            var discrete = f.obj.hasClass('discrete'), v1 = ev.value;
            var percent = ev.value, v = 0;
            if (ev.value === undefined || ev.value === null)
                ev.value = 0;
            v = Math.max(Math.min(ev.value, this.maxValue), this.minValue);
            if (isNaN(v))
                v = this.minValue;
            if (v == ev.value && discrete) {
                v1 = v;
                v = Math.round((v - this.minValue) / this.step) * this.step;
                v += this.minValue;
                v = Math.max(Math.min(v, this.maxValue), this.minValue);
            }
            if (v != ev.value && f.scope) {
                return f.scope.observer.assignValue({
                    name: f.observable,
                    value: v
                });
            }
            ev.value = v;
            if (this.usermode) {
                v1 = Math.max(Math.min(v1, this.maxValue), this.minValue);
                percent = (v1 - this.minValue) * 100 / (this.maxValue - this.minValue);
                this.uservalue = v1;
            } else {
                percent = (ev.value - this.minValue) * 100 / (this.maxValue - this.minValue);
            }
            this.$value = ev.value;
            f.span.text(ev.value);
            var inverted = f.obj.hasClass('inverted');
            if (f.obj.hasClass('vertical')) {
                f.progress.css('top', !inverted ? 100 - percent + '%' : 0);
                f.progress.css('height', percent + '%');
                f.ball.css(inverted ? 'top' : 'bottom', percent + '%');
            } else {
                f.progress.css('left', inverted ? 100 - percent + '%' : 0);
                f.progress.css('width', percent + '%');
                f.ball.css(inverted ? 'right' : 'left', percent + '%');
            }
        };
        Slider.prototype.next = function () {
            this.set(this.get() + (this.step || 1));
        };
        Slider.prototype.prev = function () {
            this.set(this.get() - (this.step || 1));
        };
        Slider.prototype._keyNext = function () {
            this.clearTimeout();
            this.next();
            this.timeout = setTimeout(function (self$0) {
                return function () {
                    self$0.next();
                    self$0.interval = setInterval(self$0.next.bind(self$0), 100);
                };
            }(this), 1000);
        };
        Slider.prototype._keyPrev = function () {
            this.clearTimeout();
            this.prev();
            this.timeout = setTimeout(function (self$0) {
                return function () {
                    self$0.prev();
                    self$0.interval = setInterval(self$0.prev.bind(self$0), 10);
                };
            }(this), 1000);
        };
        Slider.prototype.clearTimeout = function () {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = undefined;
            }
            if (this.interval) {
                clearTimeout(this.interval);
                this.interval = undefined;
            }
        };
        Slider.prototype.mouseEvent = function (ev) {
            var f = this.$;
            var inverted = f.obj.hasClass('inverted');
            var off = 0, w, pos = f.obj.offset();
            if (f.obj.hasClass('vertical')) {
                off = ev.pageY - pos.top;
                if (!inverted)
                    off = f.obj.outerHeight() - off;
                w = f.obj.outerHeight();
            } else {
                off = ev.pageX - pos.left;
                if (inverted)
                    off = f.obj.outerWidth() - off;
                w = f.obj.outerWidth();
            }
            var dif = this.maxValue - this.minValue;
            var value = dif * off / w;
            value += this.minValue;
            if (f.obj.data('decimals') !== undefined)
                value = parseFloat(value.toFixed(f.obj.data('decimals') || 2));
            else {
                value = parseInt(value);
            }
            this.set(value);
        };
        Slider.prototype.createStyle = function () {
            var f = this.$;
            var transparent;
            if (!(transparent = Slider.transparent)) {
                var $temp = $('<div style="background:none;display:none;"/>').appendTo('body');
                transparent = Slider.transparent = $temp.css('backgroundColor');
                $temp.remove();
            }
            var inherited = function () {
                var bc;
                $(this).parents().each(function () {
                    bc = $(this).css('background-color');
                    if (bc == transparent) {
                        return inherited.call(this);
                    } else {
                        return bc;
                    }
                });
                return bc;
            };
            var bc = f.obj.css('background-color');
            if (bc == transparent)
                bc = inherited.call(f.obj.get(0));
            if (this.style)
                this.style.remove();
            if (!bc)
                return;
            this.style = this.style || $('<div>');
            var content = ['<style>'];
            content.push('.d-' + this.id + '[disabled] .ball.first{');
            content.push('border-color:' + bc.toString() + ';');
            content.push('border-width:0.2em;');
            content.push('margin:-0.6em;');
            content.push('border-style:solid;');
            content.push('}');
            this.style.html(content.join('\n'));
            $('body').append(this.style);
        };
        Slider.prototype.events = function () {
            var f = this.$;
            Slider.count = Slider.count || 0;
            this.id = (Date.now() + Slider.count++).toString(32);
            f.obj.addClass('d-' + this.id);
            this.createStyle();
            f.ball.on('focus', function () {
                if (f.obj.attr('disabled') !== undefined || f.obj.attr('readonly') !== undefined)
                    return;
                f.obj.addClass('focus');
                if (f.obj.hasClass('discrete')) {
                }
            });
            f.ball.on('blur', function () {
                f.obj.removeClass('focus');
            });
            f.obj.click(function () {
                if (f.obj.attr('disabled') !== undefined || f.obj.attr('readonly') !== undefined)
                    return;
                f.ball.focus();
            });
            f.ball.on('keydown', function (self$0) {
                return function (ev) {
                    if (f.obj.attr('disabled') !== undefined || f.obj.attr('readonly') !== undefined)
                        return;
                    var vertical = f.obj.hasClass('vertical');
                    var inverted = f.obj.hasClass('inverted');
                    if (!vertical && ev.keyCode == 39 || vertical && ev.keyCode == 38) {
                        ev.preventDefault();
                        inverted ? self$0._keyPrev() : self$0._keyNext();
                    } else if (!vertical && ev.keyCode == 37 || vertical && ev.keyCode == 40) {
                        ev.preventDefault();
                        !inverted ? self$0._keyPrev() : self$0._keyNext();
                    }
                };
            }(this));
            f.obj.on('mousedown', function (self$0) {
                return function (ev) {
                    if (f.obj.attr('disabled') !== undefined || f.obj.attr('readonly') !== undefined)
                        return;
                    ev.preventDefault();
                    self$0.usermode = true;
                    f.obj.addClass('clic');
                    f.ball.focus();
                    self$0.mouseEvent(ev);
                };
            }(this));
            $(document).on('mouseup', function (self$0) {
                return function (ev) {
                    if (f.obj.attr('disabled') !== undefined || f.obj.attr('readonly') !== undefined)
                        return;
                    if (self$0.usermode) {
                        f.obj.removeClass('clic');
                        self$0.usermode = false;
                        self$0.set(self$0.get());
                    }
                };
            }(this));
            $(document).on('mousemove', function (self$0) {
                return function (ev) {
                    if (f.obj.attr('disabled') !== undefined || f.obj.attr('readonly') !== undefined)
                        return;
                    if (self$0.usermode)
                        self$0.mouseEvent(ev);
                };
            }(this));
            f.ball.on('keyup', this.clearTimeout.bind(this));
        };
    }
    Slider.init();
    return Slider;
}
exports.default = init(w);