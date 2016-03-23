var events = require('events').EventEmitter;
var vox = core.VW.Web.Vox;
{
    function Element() {
        Element.constructor ? Element.constructor.apply(this, arguments) : Element.$super && Element.$super.constructor.apply(this, arguments);
    }
    Element.prototype = Object.create(events.prototype);
    Element.prototype.constructor = Element;
    Element.$super = events.prototype;
    Element.constructor = function () {
        Element.$super.constructor.call(this);
    };
    Element.prototype.createEvent = function (eventName, originalEvent) {
        var ev = vox.platform.createEvent(eventName);
        if (originalEvent)
            ev.originalEvent = originalEvent;
        return ev;
    };
    Element.prototype.emit = function (ev) {
        var name;
        if (arguments.length > 1)
            name = ev.type;
        else
            name = arguments[0];
        Element.$super.emit(name, arguments[1]);
    };
}
exports.default = Element;