var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
var mask = require('./jquery-mask');
exports.mask = mask;
var fnVal = $.fn.val;
{
    var Input = function Input() {
        Input.$constructor ? Input.$constructor.apply(this, arguments) : Input.$superClass && Input.$superClass.apply(this, arguments);
    };
    Input.prototype = Object.create(Element.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(Input, Element) : Input.__proto__ = Element;
    Input.prototype.constructor = Input;
    Input.$super = Element.prototype;
    Input.$superClass = Element;
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
        var value = fnVal;
        var replaceval = $.fn.val = function () {
            var er, result = value.apply(this, arguments);
            $.fn.val = value;
            try {
                this.each(function () {
                    var o = $(this);
                    var p = o.parents('.input-field').eq(0);
                    if (p.length > 0) {
                        var t = p.data('vox-input');
                        if (t) {
                            t.adjustValue();
                            t.$.r();
                            t.$.elasticr();
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
    Input.$constructor = function (obj) {
        Input.$superClass.call(this);
        obj = $(obj);
        var f = this.$ = {};
        f.obj = obj;
        this.obtainProps();
        this.init();
    };
    Input.prototype.init = function () {
        var scope, f = this.$;
        f.observable = f.obj.data('list');
        if (f.observable) {
            scope = f.obj.parents('[voxs-scope]').eq(0).attr('voxs-scope');
            scope = core.dynvox.Scope.get(scope);
            if (scope) {
                f.scope = scope;
            }
        }
        f.r = this.r.bind(this);
        f.adjustValue = this.adjustValue.bind(this);
        if (f.obj.is('.select')) {
            require('./Input-createSelect').default($, f);
            f.select.attr('vox-input', 'vox-input');
        }
        this.events();
        f.r();
    };
    Input.prototype.obtainProps = function () {
        var f = this.$;
        f.inp = f.obj.find('input,textarea');
        f.inp.each(function () {
            if ($(this).data('mask') !== undefined)
                $(this).mask($(this).data('mask').toString());
        });
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
        if (!f.select)
            return;
        var v = f.select.val();
        if (f.select.attr('data-value')) {
            v = f.select.attr('data-value');
        } else if (f.select.data('value')) {
            v = f.select.data('value');
        }
        f.opw.find('li').removeAttr('selected');
        f.opw.find('li>a').removeAttr('hover-active');
        f.opw.find('li').each(function () {
            var l = $(this);
            if (l.attr('value') == v || !l.attr('value') && !v) {
                l.attr('selected', 'selected');
                l.find('a').attr('hover-active', 'hover-active');
                f.inp.val(l.text());
            }
        });
    };
    Input.prototype.r = function () {
        var f = this.$;
        if (f.inp.val() && f.inp.val().length > 0 && f.inp.attr('type') != 'search' || f.inp.attr('type') == 'date')
            f.label.addClass('active');
        else
            f.label.removeClass('active');
    };
    Input.prototype.events = function () {
        var f = this.$;
        f.elasticr = function () {
            if (f.inp.hasClass('vox-textarea') || f.inp.hasClass('vox-elastic'))
                f.inp.voxelastic()[0] && f.inp.voxelastic()[0].refresh();
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
            f.select.change(function (self$0) {
                return function () {
                    self$0.adjustValue();
                };
            }(this));
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
            return function (ev) {
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
        f.inp.on('keyup input', oninput);
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
        this.on('change', function (self$0) {
            return function () {
                if (f.select) {
                    self$0.adjustValue();
                }
                return f.r();
            };
        }(this));
    };
}
exports.default = Input;