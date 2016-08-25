var colors = {
    'white': { 'default': '#ffffff' },
    'black': { 'default': '#000000' },
    'red': {
        'default': '#F44336',
        'lighten1': '#ef5350',
        'lighten2': '#e57373',
        'lighten3': '#ef9a9a',
        'lighten4': '#ffcdd2',
        'lighten5': '#ffebee',
        'darken1': '#e53935',
        'darken2': '#d32f2f',
        'darken3': '#c62828',
        'darken4': '#b71c1c',
        'accent1': '#ff8a80',
        'accent2': '#ff5252',
        'accent3': '#ff1744',
        'accent4': '#d50000'
    },
    'pink': {
        'default': '#E91E63',
        'lighten1': '#ec407a',
        'lighten2': '#f06292',
        'lighten3': '#f48fb1',
        'lighten4': '#f8bbd0',
        'lighten5': '#fce4ec',
        'darken1': '#d81b60',
        'darken2': '#c2185b',
        'darken3': '#ad1457',
        'darken4': '#880e4f',
        'accent1': '#ff80ab',
        'accent2': '#ff4081',
        'accent3': '#f50057',
        'accent4': '#c51162'
    },
    'purple': {
        'default': '#9c27b0',
        'lighten1': '#ab47bc',
        'lighten2': '#ba68c8',
        'lighten3': '#ce93d8',
        'lighten4': '#e1bee7',
        'lighten5': '#f3e5f5',
        'darken1': '#8e24aa',
        'darken2': '#7b1fa2',
        'darken3': '#6a1b9a',
        'darken4': '#4a148c',
        'accent1': '#ea80fc',
        'accent2': '#e040fb',
        'accent3': '#d500f9',
        'accent4': '#aa00ff'
    },
    'deeppurple': {
        'default': '#673ab7',
        'lighten1': '#7e57c2',
        'lighten2': '#9575cd',
        'lighten3': '#b39ddb',
        'lighten4': '#d1c4e9',
        'lighten5': '#ede7f6',
        'darken1': '#5e35b1',
        'darken2': '#512da8',
        'darken3': '#4527a0',
        'darken4': '#311b92',
        'accent1': '#b388ff',
        'accent2': '#7c4dff',
        'accent3': '#651fff',
        'accent4': '#6200ea'
    },
    'indigo': {
        'default': '#3F51b5',
        'lighten1': '#5c6bc0',
        'lighten2': '#7986cb',
        'lighten3': '#9fa8da',
        'lighten4': '#c5cae9',
        'lighten5': '#e8eaf6',
        'darken1': '#3949ab',
        'darken2': '#303f9f',
        'darken3': '#283593',
        'darken4': '#1a237e',
        'accent1': '#8c9eff',
        'accent2': '#536dfe',
        'accent3': '#3d5afe',
        'accent4': '#304ffe'
    },
    'blue': {
        'default': '#2196F3',
        'lighten1': '#42a5f5',
        'lighten2': '#64b5f6',
        'lighten3': '#90caf9',
        'lighten4': '#bbdefb',
        'lighten5': '#e3f2fd',
        'darken1': '#1e88e5',
        'darken2': '#1976d2',
        'darken3': '#1565c0',
        'darken4': '#0d47a1',
        'accent1': '#82b1ff',
        'accent2': '#448aff',
        'accent3': '#2979ff',
        'accent4': '#2962ff'
    },
    'lightblue': {
        'default': '#03A9F4',
        'lighten1': '#29b6f6',
        'lighten2': '#4fc3f7',
        'lighten3': '#81d4fa',
        'lighten4': '#b3e5fc',
        'lighten5': '#e1f5fe',
        'darken1': '#039be5',
        'darken2': '#0288d1',
        'darken3': '#0277bd',
        'darken4': '#01579b',
        'accent1': '#80d8ff',
        'accent2': '#40c4ff',
        'accent3': '#00b0ff',
        'accent4': '#0091ea'
    },
    'cyan': {
        'default': '#00BCD4',
        'lighten1': '#26c6da',
        'lighten2': '#4dd0e1',
        'lighten3': '#80deea',
        'lighten4': '#b2ebf2',
        'lighten5': '#e0f7fa',
        'darken1': '#00acc1',
        'darken2': '#0097a7',
        'darken3': '#00838f',
        'darken4': '#006064',
        'accent1': '#84ffff',
        'accent2': '#18ffff',
        'accent3': '#00e5ff',
        'accent4': '#00b8d4'
    },
    'teal': {
        'default': '#009688',
        'lighten1': '#26a69a',
        'lighten2': '#4db6ac',
        'lighten3': '#80cbc4',
        'lighten4': '#b2dfdb',
        'lighten5': '#e0f2f1',
        'darken1': '#00897b',
        'darken2': '#00796b',
        'darken3': '#00695c',
        'darken4': '#004d40',
        'accent1': '#a7ffeb',
        'accent2': '#64ffda',
        'accent3': '#1de9b6',
        'accent4': '#00bfa5'
    },
    'green': {
        'default': '#4caf50',
        'lighten1': '#66bb6a',
        'lighten2': '#81c784',
        'lighten3': '#a5d6a7',
        'lighten4': '#c8e6c9',
        'lighten5': '#e8f5e9',
        'darken1': '#43a047',
        'darken2': '#388e3c',
        'darken3': '#2e7d32',
        'darken4': '#1b5e20',
        'accent1': '#b9f6ca',
        'accent2': '#69f0ae',
        'accent3': '#00e676',
        'accent4': '#00c853'
    },
    'lightgreen': {
        'default': '#8bc34a',
        'lighten1': '#9ccc65',
        'lighten2': '#aed581',
        'lighten3': '#c5e1a5',
        'lighten4': '#dcedc8',
        'lighten5': '#f1f8e9',
        'darken1': '#7cb342',
        'darken2': '#689f38',
        'darken3': '#558b2f',
        'darken4': '#33691e',
        'accent1': '#ccff90',
        'accent2': '#b2ff59',
        'accent3': '#76ff03',
        'accent4': '#64dd17'
    },
    'lime': {
        'default': '#cddc39',
        'lighten1': '#d4e157',
        'lighten2': '#dce775',
        'lighten3': '#e6ee9c',
        'lighten4': '#f0f4c3',
        'lighten5': '#f9fbe7',
        'darken1': '#c0ca33',
        'darken2': '#afb42b',
        'darken3': '#9e9d24',
        'darken4': '#827717',
        'accent1': '#f4ff81',
        'accent2': '#eeff41',
        'accent3': '#c6ff00',
        'accent4': '#aeea00'
    },
    'yellow': {
        'default': '#ffeb3b',
        'lighten1': '#ffee58',
        'lighten2': '#fff176',
        'lighten3': '#fff59d',
        'lighten4': '#fff9c4',
        'lighten5': '#fffde7',
        'darken1': '#fdd835',
        'darken2': '#fbc02d',
        'darken3': '#f9a825',
        'darken4': '#f57f17',
        'accent1': '#ffff8d',
        'accent2': '#ffff00',
        'accent3': '#ffea00',
        'accent4': '#ffd600'
    },
    'amber': {
        'default': '#FFC107',
        'lighten1': '#ffca28',
        'lighten2': '#ffd54f',
        'lighten3': '#ffe082',
        'lighten4': '#ffecb3',
        'lighten5': '#fff8e1',
        'darken1': '#ffb300',
        'darken2': '#ffa000',
        'darken3': '#ff8f00',
        'darken4': '#ff6f00',
        'accent1': '#ffe57f',
        'accent2': '#ffd740',
        'accent3': '#ffc400',
        'accent4': '#ffab00'
    },
    'orange': {
        'default': '#FF9800',
        'lighten1': '#ffa726',
        'lighten2': '#ffb74d',
        'lighten3': '#ffcc80',
        'lighten4': '#ffe0b2',
        'lighten5': '#fff3e0',
        'darken1': '#fb8c00',
        'darken2': '#f57c00',
        'darken3': '#ef6c00',
        'darken4': '#e65100',
        'accent1': '#ffd180',
        'accent2': '#ffab40',
        'accent3': '#ff9100',
        'accent4': '#ff6d00'
    },
    'deeporange': {
        'default': '#ff5722',
        'lighten1': '#ff7043',
        'lighten2': '#ff8a65',
        'lighten3': '#ffab91',
        'lighten4': '#ffccbc',
        'lighten5': '#fbe9e7',
        'darken1': '#f4511e',
        'darken2': '#e64a19',
        'darken3': '#d84315',
        'darken4': '#bf360c',
        'accent1': '#ff9e80',
        'accent2': '#ff6e40',
        'accent3': '#ff3d00',
        'accent4': '#dd2c00'
    },
    'brown': {
        'default': '#795548',
        'lighten1': '#8d6e63',
        'lighten2': '#a1887f',
        'lighten3': '#bcaaa4',
        'lighten4': '#d7ccc8',
        'lighten5': '#efebe9',
        'darken1': '#6d4c41',
        'darken2': '#5d4037',
        'darken3': '#4e342e',
        'darken4': '#3e2723'
    },
    'gray': {
        'default': '#9e9e9e',
        'lighten1': '#bdbdbd',
        'lighten2': '#e0e0e0',
        'lighten3': '#eeeeee',
        'lighten4': '#f5f5f5',
        'lighten5': '#fafafa',
        'darken1': '#757575',
        'darken2': '#616161',
        'darken3': '#424242',
        'darken4': '#212121'
    },
    'bluegray': {
        'default': '#607d8b',
        'lighten1': '#78909c',
        'lighten2': '#90a4ae',
        'lighten3': '#b0bec5',
        'lighten4': '#cfd8dc',
        'lighten5': '#eceff1',
        'darken1': '#546e7a',
        'darken2': '#455a64',
        'darken3': '#37474f',
        'darken4': '#263238'
    }
};
Id = 0;
{
    var Theme = function Theme() {
        Theme.$constructor ? Theme.$constructor.apply(this, arguments) : Theme.$superClass && Theme.$superClass.apply(this, arguments);
    };
    Theme.$constructor = function () {
        Theme.current = this;
    };
    Theme.createClassFromColor = function (options) {
        var str = [];
        var className = options.className;
        var intention = options.intention || 'default';
        var color = colors[options.color];
        color = color[intention];
        var prefix = '';
        var sufix = ':not(.active)';
        str.push('' + prefix + '' + className + '-active.active' + sufix + ', ' + prefix + '.' + className + '' + sufix + ', ' + prefix + '.' + className + '-hover' + sufix + ':not([disabled]):hover, ' + prefix + '.' + className + '-hover[hover-active]' + sufix + ':not([disabled])');
        str.push('{');
        str.push((!options.text ? 'background-' : '') + 'color: ' + color + ';');
        str.push('}');
        if (!options.text) {
            className = 'text-' + className;
            str.push('' + prefix + '' + className + '-active.active' + sufix + ', ' + prefix + '.' + className + '' + sufix + ', ' + prefix + '.' + className + '-hover' + sufix + ':not([disabled]):hover, ' + prefix + '.' + className + '-hover[hover-active]' + sufix + ':not([disabled])');
            str.push('{');
            str.push('color: ' + color + ';');
            str.push('}');
        }
        var style = $('<style>');
        style.html(str.join('\n'));
        style.attr('id', 'vox-color-themed-' + ++Id);
        $('head').append(style);
    };
    Theme.definePalette = function (color) {
        var c = {}, names = [
                'default',
                'lighten5',
                'lighten4',
                'lighten3',
                'lighten2',
                'lighten1',
                'darken4',
                'darken3',
                'darken2',
                'darken1'
            ];
        if (!color.name)
            throw new core.System.Exception('Debe especificar el nombre del color');
        for (var i = 0; i < names.length; i++) {
            c[names[i]] = color[names[i]];
            if (!c[names[i]])
                throw new core.System.Exception('Debe especificar la intención para ' + names[i]);
        }
        colors[name] = c;
    };
    Theme.create = function () {
        return new Theme();
    };
    Theme.__defineGetter__('defaultOptions', function () {
        return {
            'primaryPalette': {
                'default': 'teal:default',
                'hue-1': 'teal:lighten2',
                'hue-2': 'teal:darken3',
                'hue-3': 'teal:accent1',
                'text': 'white:default',
                'text-2': 'teal:darken-4',
                'text-1': 'white:default',
                'text-3': 'white:default'
            },
            'accentPalette': {
                'default': 'pink:default',
                'hue-1': 'pink:lighten2',
                'hue-2': 'pink:darken3',
                'hue-3': 'pink:accent1',
                'text': 'white:default',
                'text-1': 'red:default',
                'text-2': 'white:default',
                'text-4': 'white:default'
            },
            'warnPalette': {
                'default': 'deeporange:default',
                'hue-1': 'deeporange:lighten2',
                'hue-2': 'deeporange:darken3',
                'hue-3': 'deeporange:accent1',
                'text': 'white:default',
                'text-2': 'deeporange:darken-4',
                'text-1': 'white:default',
                'text-3': 'white:default'
            },
            'backgroundPalette': {
                'default': 'gray:lighten2',
                'hue-1': 'white:default',
                'hue-2': 'gray:darken2',
                'hue-3': 'gray:darken3',
                'text': 'black:default',
                'text-1': 'gray:darken-3',
                'text-2': 'white:default',
                'text-3': 'white:default'
            }
        };
    });
    Theme['default'] = function () {
        var t = new Theme();
        t.primaryPalette().accentPalette().warnPalette().backgroundPalette();
        return t;
    };
    Theme.prototype.primaryPalette = function (options) {
        var defaultOptions = Theme.defaultOptions, op;
        options = options || {};
        options.color = options.color || defaultOptions.primaryPalette.color;
        for (var id in defaultOptions.primaryPalette) {
            if (id != 'color') {
                if (!options[id])
                    options[id] = defaultOptions.primaryPalette[id];
                op = options[id].split(':');
                Theme.createClassFromColor({
                    'className': 'color-' + id,
                    'intention': op[1],
                    'color': op[0],
                    'text': id.startsWith('text')
                });
            }
        }
        return this;
    };
    Theme.prototype.accentPalette = function (options) {
        var defaultOptions = Theme.defaultOptions, op;
        options = options || {};
        options.color = options.color || defaultOptions.accentPalette.color;
        for (var id in defaultOptions.accentPalette) {
            if (id != 'color') {
                if (!options[id])
                    options[id] = defaultOptions.accentPalette[id];
                op = options[id].split(':');
                Theme.createClassFromColor({
                    'className': 'color-accent-' + id,
                    'intention': op[1],
                    'color': op[0],
                    'text': id.startsWith('text')
                });
            }
        }
        return this;
    };
    Theme.prototype.warnPalette = function (options) {
        var defaultOptions = Theme.defaultOptions, op;
        options = options || {};
        options.color = options.color || defaultOptions.warnPalette.color;
        for (var id in defaultOptions.warnPalette) {
            if (id != 'color') {
                if (!options[id])
                    options[id] = defaultOptions.warnPalette[id];
                op = options[id].split(':');
                Theme.createClassFromColor({
                    'className': 'color-warning-' + id,
                    'intention': op[1],
                    'color': op[0],
                    'text': id.startsWith('text')
                });
            }
        }
        return this;
    };
    Theme.prototype.backgroundPalette = function (options) {
        var defaultOptions = Theme.defaultOptions, op;
        options = options || {};
        options.color = options.color || defaultOptions.backgroundPalette.color;
        for (var id in defaultOptions.backgroundPalette) {
            if (id != 'color') {
                if (!options[id])
                    options[id] = defaultOptions.backgroundPalette[id];
                op = options[id].split(':');
                Theme.createClassFromColor({
                    'className': 'color-back-' + id,
                    'intention': op[1],
                    'color': op[0],
                    'text': id.startsWith('text')
                });
            }
        }
        return this;
    };
}
exports.default = Theme;