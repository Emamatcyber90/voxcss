var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var mask = require('./jquery-mask');
    exports.mask = mask;
}
{
    function Input() {
        Input.constructor ? Input.constructor.apply(this, arguments) : Input.$super && Input.$super.constructor.apply(this, arguments);
    }
    Input.prototype = Object.create(Element.prototype);
    Input.prototype.constructor = Input;
    Input.$super = Element.prototype;
    Input.register = function () {
        $.fn.voxinput = function () {
            var dp = [];
            this.each(function () {
                var o = $(this);
                var t = undefined;
                if (!(t = o.data('vox-input'))) {
                    t = new Input(o);
                    o.data('vox-input', t);
                }
                dp.push(t);
            });
            return dp;
        };
        $(function () {
            vox.mutation.watchAppend($('body'), function (ev) {
                ev.jTarget.voxinput();
            }, '.input-field');
            $('.input-field').voxinput();
        });
        var value = $.fn.val;
        var replaceval = $.fn.val = function () {
            var er, result = value.apply(this, arguments);
            $.fn.val = value;
            try {
                this.each(function () {
                    var o = $(this);
                    if (o.attr('vox-input') !== undefined) {
                        var p = o.parents('.input-field').eq(0);
                        var t = p.data('vox-input');
                        if (t) {
                            t.adjustValue();
                        }
                    }
                });
            } catch (e) {
                er = e;
            }
            $.fn.val = replaceval;
            if (er) {
                throw er;
            }
            return result;
        };
    };
    Input.constructor = function (obj) {
        Input.$super.constructor.call(this);
        obj = $(obj);
        var f = this.$ = {};
        f.obj = obj;
        this.obtainProps();
        this.init();
    };
    Input.prototype.init = function () {
        var f = this.$;
        if (f.obj.is('.select')) {
            require('./Input-createSelect').default($, f);
            f.select.attr('vox-input', 'vox-input');
        }
        this.events();
        f.r();
    };
    Input.prototype.obtainProps = function () {
        var f = this.$;
        f.inp = obj.find('input');
        f.label = f.obj.find('label');
        f.label.addClass('normal');
        f.action = f.obj.find('.action');
        f.inp.attr('vox-input', 'vox-input');
        if (!f.obj.data('error-color'))
            f.obj.data('error-color', 'red');
        if (!f.obj.data('error-color'))
            f.obj.data('error-color', 'red');
        if (!f.obj.data('warning-color'))
            f.obj.data('warning-color', 'orange');
        if (!f.obj.data('ok-color'))
            f.obj.data('ok-color', 'green');
    };
    Input.prototype.adjustValue = function () {
        var f = this.$;
        var v = f.select.val();
        f.opw.find('li').removeAttr('selected');
        f.opw.find('li>a').removeAttr('hover-active');
        if (!v) {
            f.inp.val(f.selectDVal);
            return;
        }
        f.opw.find('li').each(function () {
            var l = $(this);
            if (l.attr('value') == v) {
                l.attr('selected', 'selected');
                l.find('a').attr('hover-active', 'hover-active');
                f.inp.val(l.text());
            }
        });
    };
    Input.prototype.events = function () {
        var f = this.$;
        f.r = function () {
            if (f.inp.val() && f.inp.val().length > 0 && f.inp.attr('type') != 'search' || f.inp.attr('type') == 'date')
                f.label.addClass('active');
            else
                f.label.removeClass('active');
        };
        f.line = f.obj.find('.line');
        if (f.line.length == 0) {
            f.line = $('<div>');
            f.line.addClass('line');
            f.obj.append(f.line);
        }
        if (f.select) {
            f.select.focus(function (ev) {
                f.inp.focus();
            });
            f.select.blur(function (ev) {
                f.inp.blur();
            });
            f.select.change(function () {
                f.refreshValue();
            });
            f.dropdown.on('select', function (ev) {
                f.select.val(ev.value);
                f.select.change();
            });
        }
        f.addactive = function () {
            if (f.inp.attr('type') != 'search') {
                f.label.addClass('active');
                f.label.removeClass('normal');
            }
            f.obj.addClass('active');
        };
        var oninput = function (self$0) {
            return function () {
                f.obj.removeClass('error warning ok');
                self$0.emit('focus', ev);
                if (ev.defaultPrevented)
                    return;
                f.addactive();
                var l;
                if (f.lineClass) {
                    l = 'text-' + f.lineClass;
                    f.line.removeClass(f.lineClass);
                    f.label.removeClass(l);
                }
                f.lineClass = f.obj.data('activecolor');
                f.line.addClass(f.lineClass);
                l = 'text-' + f.lineClass;
                f.label.addClass(l);
            };
        }(this);
        f.on('keyup input', oninput);
        f.inp.focus(function (ev) {
            if (f.obj.hasClass('error') || f.obj.hasClass('warning') || f.obj.hasClass('ok'))
                return;
            return oninput(ev);
        });
        f.inp.blur(function (self$0) {
            return function (ev) {
                if (f.obj.hasClass('error') || f.obj.hasClass('warning') || f.obj.hasClass('ok'))
                    return;
                self$0.emit('blur', ev);
                if (ev.defaultPrevented)
                    return;
                f.r();
                f.obj.removeClass('active');
                f.label.addClass('normal');
                if (f.lineClass) {
                    l = 'text-' + f.lineClass;
                    f.line.removeClass(f.lineClass);
                    f.label.removeClass(l);
                }
                f.lineClass = undefined;
            };
        }(this));
        this.on('change', function () {
            if (f.select) {
                f.refreshValue();
            }
            return f.r();
        });
    };
}
exports.default = Input;