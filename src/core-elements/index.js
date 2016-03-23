exports = module.exports = core.VW.Web.Elements = core.VW.Web.Elements || {};
exports.get_Element = function () {
    return require('./Element').default;
};
exports.get_Card = function () {
    return require('./Card').default;
};
exports.get_Dropdown = function () {
    return require('./Dropdown').default;
};
var Input = require('./Input');
exports.get_Input = function () {
    return Input.default;
};
exports.get_mask = function () {
    return Input.mask;
};
exports.get_Modal = function () {
    return require('./Modal').default;
};
exports.get_ScrollFire = function () {
    return require('./ScrollFire').default;
};
exports.get_Parallax = function () {
    return require('./Parallax').default;
};
exports.get_Pinned = function () {
    return require('./Pinned').default;
};
exports.get_SideNav = function () {
    return require('./SideNav').default;
};
exports.get_Tab = function () {
    return require('./Tab').default;
};
exports.get_TabGroup = function () {
    return require('./Tabs').default;
};
exports.get_Toast = function () {
    return require('./Toast').default;
};
exports.get_Tooltip = function () {
    return require('./Tooltip').default;
};
exports.get_HasTooltip = function () {
    return require('./HasTooltip').default;
};
core.VW.Util.createProperties(exports);
exports.register = function () {
    exports.Card.register();
    exports.Dropdown.register();
    exports.Input.register();
    exports.Modal.register();
    exports.ScrollFire.register();
    exports.Parallax.register();
    exports.Pinned.register();
    exports.SideNav.register();
    exports.TabGroup.register();
    exports.Toast.register();
    exports.Tooltip.register();
    exports.HasTooltip.register();
};