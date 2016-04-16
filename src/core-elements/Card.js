var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
{
    var Card = function Card() {
        Card.constructor ? Card.constructor.apply(this, arguments) : Card.$super && Card.$super.constructor.apply(this, arguments);
    };
    Card.prototype = Object.create(Element.prototype);
    Card.prototype.constructor = Card;
    Card.$super = Element.prototype;
    Card.register = function () {
        $.fn.voxcard = function () {
            var dp = [];
            this.each(function () {
                var o = $(this);
                var t = undefined;
                if (!(t = o.data('vox-card'))) {
                    t = new Card(o);
                    o.data('vox-card', t);
                }
                dp.push(t);
            });
            return dp;
        };
        $(function () {
            vox.mutation.watchAppend($('body'), function (ev) {
                ev.jTarget.voxcard();
            }, '.card');
            $('.card').voxcard();
        });
    };
    Card.constructor = function (obj) {
        Card.$super.constructor.call(this);
        obj = $(obj);
        var f = this.$ = {};
        f.obj = obj;
        this.obtainProps();
        this.init();
    };
    Card.prototype.init = function () {
        this.events();
    };
    Card.prototype.obtainProps = function () {
        var f = this.$;
        f.reveal = f.obj.find('.card-reveal');
        f.revealClose = f.obj.find('.card-reveal .card-title');
        f.activator = f.obj.find('.activator');
    };
    Card.prototype.reveal = function (event) {
        var f = this.$, ev = this.createEvent('beforereveal', event);
        ev.card = this;
        this.emit(ev);
        if (ev.defaultPrevented)
            return;
        f.reveal.show();
        f.reveal.css('top', 0);
        ev = this.createEvent('reveal');
        ev.card = this;
        this.emit(ev);
    };
    Card.prototype.closeReveal = function (event) {
        var f = this.$, ev = this.createEvent('beforeclosereveal', event);
        ev.card = this;
        this.emit(ev);
        if (ev.defaultPrevented)
            return;
        f.reveal.css('top', '100%');
        ev = this.createEvent('closereveal');
        ev.card = this;
        this.emit(ev);
    };
    Card.prototype.events = function () {
        var f = this.$;
        f.activator.click(function (self$0) {
            return function () {
                ev.preventDefault();
                self$0.reveal();
                return false;
            };
        }(this));
        f.revealClose.click(function (self$0) {
            return function () {
                ev.preventDefault();
                self$0.closeReveal();
                return false;
            };
        }(this));
    };
}
exports.default = Card;