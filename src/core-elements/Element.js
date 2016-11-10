var events = require('events').EventEmitter;
var vox = core.VW.Web.Vox;
{
    var Element = function Element() {
        Element.$constructor ? Element.$constructor.apply(this, arguments) : Element.$superClass && Element.$superClass.apply(this, arguments);
    };
    Element.prototype = Object.create(events.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(Element, events) : Element.__proto__ = events;
    Element.prototype.constructor = Element;
    Element.$super = events.prototype;
    Element.$superClass = events;
    Element.$constructor = function () {
        Element.$superClass.call(this);
    };
    Element.prototype.createEvent = function (eventName, originalEvent) {
        var ev = vox.platform.createEvent(eventName);
        if (originalEvent)
            ev.originalEvent = originalEvent;
        return ev;
    };
    Element.prototype.emit = function (ev) {
        var name;
        if (arguments.length < 2)
            name = ev.type;
        else {
            name = arguments[0];
            ev = arguments[1];
        }
        Element.$super.emit.call(this, name, ev);
    };
}
exports.default = Element;