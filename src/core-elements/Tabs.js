var Element = require('./Element').default;
var $ = core.VW.Web.JQuery;
var vox = core.VW.Web.Vox;
var doc = {};
if (typeof document !== 'undefined') {
    doc = document;
}
function init(document) {
    {
        function Tabs() {
            Tabs.constructor ? Tabs.constructor.apply(this, arguments) : Tabs.$super && Tabs.$super.constructor.apply(this, arguments);
        }
        Tabs.prototype = Object.create(Element.prototype);
        Tabs.prototype.constructor = Tabs;
        Tabs.$super = Element.prototype;
        Tabs.register = function () {
            $.fn.voxtabgroup = function () {
                var dp = [];
                this.each(function () {
                    var o = $(this);
                    var t = undefined;
                    if (!(t = o.data('vox-tabgroup'))) {
                        t = new Tabs(o);
                        o.data('vox-tabgroup', t);
                    }
                    dp.push(t);
                });
                return dp;
            };
            $(function () {
                vox.mutation.watchAppend($('body'), function (ev) {
                    ev.jTarget.voxtabgroup();
                }, '.tabs');
                $('.tabs').voxtabgroup();
            });
        };
        Tabs.constructor = function (obj) {
            Tabs.$super.constructor.call(this);
            obj = $(obj);
            var f = this.$ = {};
            f.obj = obj;
            this.obtainProps();
            this.init();
        };
        Tabs.prototype.obtainProps = function () {
            var f = this.$;
            f.indicator = f.obj.find('.indicator');
            if (f.indicator.length == 0) {
                f.indicator = $('<div>');
                f.indicator.addClass('indicator');
                f.indicator.addClass('transitioned');
            }
            f.indicator.hide();
        };
        Tabs.prototype.init = function () {
            this.tabs = [];
            this.events();
        };
        Tabs.prototype.removeIndicator = function () {
            this.$.indicator.hide();
        };
        Tabs.prototype.isOpened = function () {
            return true;
        };
        Tabs.prototype.tabs = function () {
            var f = this.$;
            var utab = f.obj.find('.tab');
            var i = 0;
            var self = this;
            utab.each(function () {
                var jtab = $(this);
                if (i == 0) {
                    jtab.append(f.indicator);
                }
                var otab = new tab(jtab);
                jtab.attr('vox-index', i);
                otab.$.index = i;
                otab.$.parent = self;
                i++;
                f.tabs.push(otab);
            });
        };
        Tabs.prototype.addIndicator = function () {
            var f = this.$;
            var o = f.lastTab;
            f.selectedTab = tab;
            f.lastTab = tab;
            var obj = tab.$.obj;
            var left = obj.position().left;
            f.indicator.show();
            if (f.tabs[0]) {
                var nl$3 = 0;
                if (o)
                    nl$3 = o.$.obj.position().left;
                nl$3 = nl$3.toString() + 'px';
                f.indicator.css('left', nl$3);
                f.tabs[0].$.obj.append(f.indicator);
            }
            f.indicator.css('width', obj.outerWidth());
            f.indicator.voxtransition({ left: left.toString() + 'px' }, undefined, 1000, function () {
                f.indicator.css('left', 0);
                f.indicator.css('width', '100%');
                obj.append(f.indicator);
            });
        };
        Tabs.prototype.unselect = function () {
            if (f.selectedTab) {
                if (f.selectedTab.unselect() !== false) {
                    f.selectedTab = undefined;
                }
            }
        };
        Tabs.prototype.events = function () {
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
                        ev2.tabs = self$0;
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
    return Tabs;
}
exports.default = init(doc);