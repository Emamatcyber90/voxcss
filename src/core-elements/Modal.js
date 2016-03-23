var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
var modals = [];
{
    function Modal() {
        Modal.constructor ? Modal.constructor.apply(this, arguments) : Modal.$super && Modal.$super.constructor.apply(this, arguments);
    }
    Modal.prototype = Object.create(Element.prototype);
    Modal.prototype.constructor = Modal;
    Modal.$super = Element.prototype;
    Modal.checkOpened = function () {
        var open;
        for (var i = 0; i < modals.length; i++) {
            open = open || modals[i].isOpened();
            if (open)
                break;
        }
        if (!open) {
            $('body').removeClass('modal-opened');
            $('.modal-back').hide();
        } else {
            $('body').addClass('modal-opened');
            $('.modal-back').show();
        }
    };
    Modal.openBack = function () {
        $('body').addClass('modal-opened');
        var m = $('.modal-back');
        if (m.length == 0) {
            m = $('<div>');
            m.addClass('modal-back');
            m.addClass('default');
            $('body').append(m);
        }
        m.show();
    };
    Modal.register = function () {
        $.fn.voxmodal = function () {
            var dp = [];
            this.each(function () {
                var o = $(this);
                var t = undefined;
                if (!(t = o.data('vox-modal'))) {
                    t = new Modal(o);
                    o.data('vox-modal', t);
                }
                dp.push(t);
            });
            return dp;
        };
        $(function () {
            vox.mutation.watchAppend($('body'), function (ev) {
                ev.jTarget.voxmodal();
            }, '.modal');
            $('.modal').voxmodal();
            $('[data-toggle=modal]').click(function () {
                var e = $(this);
                var s = e.attr('vox-selector');
                var g = $(s).eq(0);
                var h = g.voxmodal()[0];
                if (h) {
                    h.open();
                }
            });
        });
    };
    Modal.constructor = function (obj) {
        Modal.$super.constructor.call(this);
        obj = $(obj);
        var f = this.$ = {};
        f.obj = obj;
        this.obtainProps();
        this.init();
    };
    Modal.prototype.init = function () {
        this.events();
    };
    Modal.prototype.obtainProps = function () {
        var f = this.$;
        f.container = f.obj.parent();
        modals.push(this);
    };
    Modal.prototype.isOpened = function () {
        return this.$.obj.hasClass('opened');
    };
    Modal.prototype.open = function (event) {
        var f = this.$;
        var ev = this.createEvent('beforeopen', event);
        ev.modal = this;
        this.emit(ev);
        if (ev.defaultPrevented)
            return;
        if (f.delay) {
            clearTimeout(f.delay);
            f.delay = undefined;
        }
        Modal.openBack();
        f.lEvent = event ? event.type : '';
        f.obj.addClass('opened');
        f.container.show();
        f.obj.voxanimate(f.obj.data('ineffect') || 'bounceInUp', undefined, function (self$0) {
            return function () {
                modal.checkOpened();
                var ev = self$0.createEvent('open', event);
                ev.modal = self$0;
                self$0.emit(ev);
            };
        }(this));
    };
    Modal.prototype.close = function (event) {
        var f = this.$;
        var ev = this.createEvent('beforeclose', event);
        ev.modal = this;
        this.emit(ev);
        if (ev.defaultPrevented)
            return;
        if (f.delay) {
            clearTimeout(f.delay);
            f.delay = undefined;
        }
        f.lEvent = event ? event.type : '';
        f.obj.removeClass('opened');
        f.container.hide();
        f.obj.voxanimate(f.obj.data('outeffect') || 'bounceOutDown', undefined, function (self$0) {
            return function () {
                modal.checkOpened();
                var ev = self$0.createEvent('close', event);
                ev.modal = self$0;
                self$0.emit(ev);
            };
        }(this));
    };
    Modal.prototype.toggle = function () {
        if (f.obj.hasClass('opened'))
            this.close();
        else
            this.open();
    };
    Modal.prototype.events = function () {
        var f = this.$;
        vox.platform.attachEvents('keyup keydown', {
            active: function (self$0) {
                return function () {
                    return self$0.isOpened();
                };
            }(this),
            processEvent: function (self$0) {
                return function (ev) {
                    ev.modal = self$0;
                    return ev;
                };
            }(this),
            self: this,
            callback: function (self$0) {
                return function (ev) {
                    if (ev.keyCode == 27 && ev.type == 'keyup') {
                        if (!f.obj.data('escape-disabled')) {
                            self$0.close();
                        }
                    }
                };
            }(this)
        });
        vox.platform.attachOuterClick(f.obj, {
            active: function (self$0) {
                return function () {
                    return self$0.isOpened();
                };
            }(this),
            processEvent: function (self$0) {
                return function (ev) {
                    var ev2 = self$0.createEvent('outerclick');
                    ev2.modal = self$0;
                    ev2.target = ev.target;
                    ev2.clickEvent = ev;
                    return ev2;
                };
            }(this),
            self: self,
            callback: function (self$0) {
                return function (ev) {
                    !f.obj.data('closeonouterclick-disabled') && self$0.close();
                };
            }(this)
        });
    };
}
exports.default = Modal;