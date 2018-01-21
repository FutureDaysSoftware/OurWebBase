(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
	Header: require('./models/Header'),
	User: require('./models/User')
};

},{"./models/Header":8,"./models/User":9}],2:[function(require,module,exports){
'use strict';

module.exports = {
	Footer: require('./views/templates/Footer'),
	Header: require('./views/templates/Header'),
	Home: require('./views/templates/Home'),
	Toast: require('./views/templates/Toast')
};

},{"./views/templates/Footer":18,"./views/templates/Header":19,"./views/templates/Home":20,"./views/templates/Toast":28}],3:[function(require,module,exports){
'use strict';

module.exports = {
	Footer: require('./views/Footer'),
	Header: require('./views/Header'),
	Home: require('./views/Home'),
	Toast: require('./views/Toast')
};

},{"./views/Footer":13,"./views/Header":14,"./views/Home":15,"./views/Toast":26}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {

    CapitalizeFirstLetter: function CapitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    Currency: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }),

    GetFormField: function GetFormField(datum, value, meta) {
        var isNested = datum.range === 'List' || _typeof(datum.range) === 'object';

        var image = datum.range === 'ImageUrl' ? '<div><button class="btn" data-js="previewBtn" type="button">Preview</button><img data-src="' + this.ImageSrc(value) + '" /></div>' : '';

        var options = datum.range === 'Boolean' ? [{ label: 'True', name: 'true' }, { label: 'False', name: 'false' }] : datum.metadata ? datum.metadata.options : false;

        var icon = datum.metadata && datum.metadata.icon ? this.GetIcon(datum.metadata.icon) : options ? this.GetIcon('caret-down') : '';

        var label = isNested || datum.fk || datum.label && !meta.noLabel ? '<label>' + (datum.fk || datum.label) + '</label>' : '';

        value = value === undefined ? '' : value;

        if (options) {
            if (typeof options === 'function') {
                options();return this.GetSelect(datum, value, [], icon, label);
            } else if (Array.isArray(options)) return this.GetSelect(datum, value, options, icon, label);
        }

        var prompt = datum.prompt ? '<div class="prompt">' + datum.prompt + '</div>' : '';

        var input = datum.fk ? '<div data-view="typeAhead" data-name="' + datum.fk + '"></div>' : datum.range === 'Text' ? '<textarea data-js="' + datum.name + '" placeholder="' + (datum.label || '') + '" rows="3">' + value + '</textarea>' : datum.range === 'List' || datum.range === 'View' || _typeof(datum.range) === 'object' ? '<div data-js="' + datum.name + '" data-name="' + datum.name + '"></div>' : '<input type="' + this.RangeToInputType[datum.range] + '" data-js="' + datum.name + '" placeholder="' + (datum.label || '') + '" value="' + value + '" />';

        return '' + ('<div class="form-group ' + (isNested ? 'nested' : '') + '">\n            ' + label + '\n            ' + prompt + '\n            ' + input + ' \n            ' + icon + '\n        </div>');
    },
    GetFormFields: function GetFormFields(data) {
        var _this = this;

        var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var meta = arguments[2];

        if (!data) return '';

        return data.filter(function (datum) {
            return meta[datum.name] && meta[datum.name].hide ? false : true;
        }).map(function (datum) {
            return _this.GetFormField(datum, model && model[datum.name], meta);
        }).join('');
    },
    GetIcon: function GetIcon(name) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { IconDataJs: this.IconDataJs };
        return Reflect.apply(this.Icons[name], this, [opts]);
    },
    GetListItems: function GetListItems() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return items.map(function (item) {
            var attr = opts.dataAttr ? 'data-' + opts.dataAttr + '="' + item[opts.dataAttr] + '"' : '';
            return '<li ' + attr + '>' + (item.label || item) + '</li>';
        }).join('');
    },
    GetSelect: function GetSelect(datum, selectedValue, optionsData, icon) {
        var label = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

        if (typeof selectedValue === 'boolean' || typeof selectedValue === 'number') selectedValue = selectedValue.toString();

        var options = optionsData.length ? this.GetSelectOptions(optionsData, selectedValue, { valueAttr: 'name' }) : '';

        return '' + ('<div class="form-group">\n            ' + label + '\n            <select data-js="' + datum.name + '">\n                <option disabled ' + (!selectedValue ? 'selected' : '') + ' value>' + datum.label + '</option>\n                ' + options + '\n            </select>\n            ' + icon + '\n        </div>');
    },
    GetSelectOptions: function GetSelectOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var selectedValue = arguments[1];
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { valueAttr: 'value' };

        return options.map(function (option) {
            return '<option ' + (selectedValue === option[opts.valueAttr] ? 'selected' : '') + ' value="' + option[opts.valueAttr] + '">' + option.label + '</option>';
        }).join('');
    },


    //Icons: require('./.IconMap'),

    IconDataJs: function IconDataJs(p) {
        return p.name ? 'data-js="' + p.name + '"' : '';
    },
    ImageSrc: function ImageSrc(name) {
        return 'https://storage.googleapis.com/mega-poetry-9665/' + name;
    },
    Range: function Range(int) {
        return Array.from(Array(int).keys());
    },


    RangeToInputType: {
        Email: 'email',
        Password: 'password',
        String: 'text'
    }

};

},{}],5:[function(require,module,exports){
"use strict";

module.exports = Object.create(Object.assign({}, require('../../lib/MyObject'), {

    Request: {
        constructor: function constructor(data) {
            var _this = this;

            var req = new XMLHttpRequest();

            if (data.onProgress) req.addEventListener("progress", function (e) {
                return data.onProgress(e.lengthComputable ? Math.floor(e.loaded / e.total * 100) : 0);
            });

            return new Promise(function (resolve, reject) {

                req.onload = function () {
                    [500, 404, 401].includes(this.status) ? reject(this.response ? JSON.parse(this.response) : this.status) : resolve(JSON.parse(this.response));
                };

                data.method = data.method || "get";

                var path = "/" + data.resource + (data.id ? "/" + data.id : '');
                if (data.method === "get" || data.method === "options") {
                    var qs = data.qs ? "?" + window.encodeURIComponent(data.qs) : '';
                    req.open(data.method, "" + path + qs);
                    _this.setHeaders(req, data.headers);
                    req.send(null);
                } else {
                    req.open(data.method.toUpperCase(), path, true);
                    _this.setHeaders(req, data.headers);
                    req.send(data.data || null);
                }

                if (data.onProgress) data.onProgress('sent');
            });
        },
        setHeaders: function setHeaders(req) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            req.setRequestHeader("Accept", headers.accept || 'application/json');
            req.setRequestHeader("Content-Type", headers.contentType || 'text/plain');
        }
    },

    _factory: function _factory(data) {
        return Object.create(this.Request, {}).constructor(data);
    },
    constructor: function constructor() {

        if (!XMLHttpRequest.prototype.sendAsBinary) {
            XMLHttpRequest.prototype.sendAsBinary = function (sData) {
                var nBytes = sData.length,
                    ui8Data = new Uint8Array(nBytes);
                for (var nIdx = 0; nIdx < nBytes; nIdx++) {
                    ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
                }
                this.send(ui8Data);
            };
        }

        return this._factory.bind(this);
    }
}), {}).constructor();

},{"../../lib/MyObject":23}],6:[function(require,module,exports){
'use strict';

module.exports = Object.create({
    constructor: function constructor() {
        this.range = document.createRange();
        this.range.selectNode(document.getElementsByTagName("div").item(0));
        return this;
    },
    create: function create(name, opts) {
        var lower = name;
        name = (name.charAt(0).toUpperCase() + name.slice(1)).replace('-', '');

        return Object.create(this.Views[name], Object.assign({
            Header: { value: this.Header },
            Toast: { value: this.Toast },
            name: { value: name },
            factory: { value: this },
            range: { value: this.range },
            template: { value: this.Templates[name], writable: true },
            model: { value: this.Models[name] ? Object.create(this.Models[name]) : {} },
            user: { value: this.User }
        })).constructor(opts);
    }
}, {
    Header: { value: require('../views/Header') },
    Models: { value: require('../.ModelMap') },
    Templates: { value: require('../.TemplateMap') },
    Toast: { value: require('../views/Toast') },
    User: { value: require('../models/User') },
    Views: { value: require('../.ViewMap') }
});

},{"../.ModelMap":1,"../.TemplateMap":2,"../.ViewMap":3,"../models/User":9,"../views/Header":14,"../views/Toast":26}],7:[function(require,module,exports){
'use strict';

require('./polyfill');

var User = require('./models/User'),
    router = require('./router'),
    onLoad = new Promise(function (resolve) {
    return window.onload = function () {
        return resolve();
    };
});

User.on('logout', function () {
    return router.onLogout();
});

Promise.all([User.get(), onLoad]).then(function () {
    return router.initialize();
}).catch(function (e) {
    return console.log('Error initializing client -> ' + (e.stack || e));
});

},{"./models/User":9,"./polyfill":11,"./router":12}],8:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__.js'), {

    data: ['home', 'projects', 'contact']

});

},{"./__proto__.js":10}],9:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('./__proto__.js'), {
    isLoggedIn: function isLoggedIn() {
        return Boolean(this.data && this.data.id);
    },
    logout: function logout() {
        document.cookie = 'hzy=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        this.data = {};
        this.emit('logout');
    }
}), { resource: { value: 'me' } });

},{"./__proto__.js":10}],10:[function(require,module,exports){
'use strict';

var _Object$assign;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = Object.assign({}, require('../../../lib/Model'), require('events').EventEmitter.prototype, (_Object$assign = {

    Xhr: require('../Xhr'),

    add: function add(datum) {
        this.data.push(datum);

        if (this.storeBy) this._storeOne(datum);

        return this;
    },
    delete: function _delete() {
        var _this = this;

        var keyValue = this.data[this.meta.key];
        return this.Xhr({ method: 'DELETE', resource: this.resource, id: keyValue }).then(function () {
            var key = _this.meta.key;

            if (Array.isArray(_this.data)) {
                var datum = _this.data.find(function (datum) {
                    return datum[key] == keyValue;
                });

                if (_this.store) {
                    Object.keys(_this.store).forEach(function (attr) {
                        _this.store[attr][datum[attr]] = _this.store[attr][datum[attr]].filter(function (datum) {
                            return datum[key] != keyValue;
                        });
                        if (_this.store[attr][datum[attr]].length === 0) {
                            _this.store[attr][datum[attr]] = undefined;
                        }
                    });
                }

                _this.data = _this.data.filter(function (datum) {
                    return datum[key] != keyValue;
                });
            }

            return Promise.resolve(_this.data);
        });
    },
    git: function git(attr) {
        return this.data[attr];
    },
    get: function get() {
        var _this2 = this;

        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { query: {} };

        if (opts.query || this.pagination) Object.assign(opts.query, this.pagination);

        return this.Xhr({ method: opts.method || 'get', resource: this.resource, headers: this.headers || {}, qs: opts.query ? JSON.stringify(opts.query) : undefined }).then(function (response) {

            if (Array.isArray(_this2.data)) {
                _this2.data = _this2.data.concat(opts.parse ? opts.parse(response, opts.storeBy) : response);
            } else {
                if (opts.storeBy) _this2._resetStore(opts.storeBy);
                _this2.data = _this2.parse ? _this2.parse(response, opts.storeBy) : response;
                if (opts.storeBy) _this2._store();
            }

            _this2.emit('got');

            return Promise.resolve(response);
        });
    },
    getCount: function getCount() {
        var _this3 = this;

        return this.Xhr({ method: 'get', resource: this.resource, headers: this.headers || {}, qs: JSON.stringify({ countOnly: true }) }).then(function (_ref) {
            var result = _ref.result;

            _this3.meta.count = result;
            return Promise.resolve(result);
        });
    }
}, _defineProperty(_Object$assign, 'git', function git(attr) {
    return this.data[attr];
}), _defineProperty(_Object$assign, 'patch', function patch(id, data) {
    var _this4 = this;

    return this.Xhr({ method: 'patch', id: id, resource: this.resource, headers: this.headers || {}, data: JSON.stringify(data || this.data) }).then(function (response) {

        if (Array.isArray(_this4.data)) {
            _this4.data = _this4.data ? _this4.data.concat(response) : [response];
            if (_this4.store) Object.keys(_this4.store).forEach(function (attr) {
                return _this4._store(response, attr);
            });
        } else {
            _this4.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, '_put', function _put(keyValue, data) {
    var _this5 = this;

    var item = this.data.find(function (datum) {
        return datum[_this5.meta.key] == keyValue;
    });
    if (item) item = data;
    return this;
}), _defineProperty(_Object$assign, 'put', function put(id, data) {
    var _this6 = this;

    return this.Xhr({ method: 'put', id: id, resource: this.resource, headers: this.headers || {}, data: JSON.stringify(data) }).then(function (response) {

        if (Array.isArray(_this6.data)) {} else {
            _this6.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, 'post', function post(model) {
    var _this7 = this;

    return this.Xhr({ method: 'post', resource: this.resource, headers: this.headers || {}, data: JSON.stringify(model || this.data) }).then(function (response) {

        if (Array.isArray(_this7.data)) {
            _this7.data = _this7.data ? _this7.data.concat(response) : [response];
            if (_this7.store) Object.keys(_this7.store).forEach(function (attr) {
                return _this7._store(response, attr);
            });
        } else {
            _this7.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, 'remove', function remove(item) {
    var index = this.data.findIndex(function (datum) {
        return JSON.stringify(datum) === JSON.stringify(item);
    });

    if (index === -1) return;

    this.data.splice(index, 1);
}), _defineProperty(_Object$assign, 'set', function set(attr, value) {
    this.data[attr] = value;
    this.emit(attr + 'Changed');
}), _defineProperty(_Object$assign, 'validate', function validate(data) {
    var _this8 = this;

    var valid = true;

    Object.keys(data).forEach(function (name) {
        var val = data[name],
            attribute = _this8.attributes.find(function (attr) {
            return attr.name === name;
        });

        if (attribute === undefined || !attribute.validate) {
            _this8.data[name] = val ? typeof val === 'string' ? val.trim() : val : undefined;
        } else if (valid && !_this8.validateDatum(attribute, val)) {
            _this8.emit('validationError', attribute);
            valid = false;
        } else if (_this8.validateDatum(attribute, val)) {
            _this8.data[name] = val.trim();
        }
    });

    return valid;
}), _defineProperty(_Object$assign, 'validateDatum', function validateDatum(attr, val) {
    return attr.validate.call(this, val.trim());
}), _Object$assign));

},{"../../../lib/Model":21,"../Xhr":5,"events":24}],11:[function(require,module,exports){
'use strict';

if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) {
        // .length of function is 2
        'use strict';

        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

//https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while (i < 0 && (el = el.parentElement));
        return el;
    };
}

//https://gist.github.com/paulirish/1579671
var requestAnimationFramePolyfill = function () {
    var clock = Date.now();

    return function (callback) {

        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                polyfill(callback);
            }, 0);
        }
    };
}();

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || requestAnimationFramePolyfill;

require('smoothscroll-polyfill').polyfill();

module.exports = true;

},{"smoothscroll-polyfill":25}],12:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('../../lib/MyObject'), {

    ViewFactory: require('./factory/View'),

    Views: require('./.ViewMap'),

    Singletons: ['Header'],

    initialize: function initialize() {
        var _this = this;

        this.contentContainer = document.querySelector('#content');

        this.ViewFactory.constructor();

        this.Singletons.forEach(function (name) {
            return _this.Views[name].constructor({ factory: _this.ViewFactory });
        });

        window.onpopstate = this.handle.bind(this);

        this.Views.Header.on('navigate', function (route) {
            return _this.navigate(route);
        });

        this.footer = this.ViewFactory.create('footer', { insertion: { el: document.body } });

        this.handle();
    },
    handle: function handle() {
        this.handler(window.location.pathname.split('/').slice(1));
    },
    handler: function handler(path) {
        var _this2 = this;

        var name = this.pathToView(path[0]),
            view = this.Views[name] ? name : 'home';

        if (view === this.currentView) return this.views[view].onNavigation(path.slice(1));

        this.scrollToTop();

        Promise.all(Object.keys(this.views).map(function (view) {
            return _this2.views[view].hide();
        })).then(function () {

            _this2.currentView = view;

            if (_this2.views[view]) return _this2.views[view].onNavigation(path);

            return Promise.resolve(_this2.views[view] = _this2.ViewFactory.create(view, { insertion: { el: _this2.contentContainer }, path: path }).on('navigate', function (route, options) {
                return _this2.navigate(route, options);
            }).on('deleted', function () {
                return delete _this2.views[view];
            }));
        }).catch(this.Error);

        this.footer.els.container.classList.toggle('hidden', view === 'Admin');
    },
    navigate: function navigate(location) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (options.replace || options.up) {
            var path = ('' + window.location.pathname).split('/');
            path.pop();
            if (options.replace) path.push(location);
            location = path.join('/');
        } else if (options.append) {
            location = window.location.pathname + '/' + location;
        }

        if (location !== window.location.pathname) history.pushState({}, '', location);
        if (!options.silent) this.handle();
    },
    onLogout: function onLogout() {
        var _this3 = this;

        Promise.all(Object.keys(this.views).map(function (view) {
            return _this3.views[view].delete();
        })).then(function () {
            _this3.currentView = undefined;return _this3.handle();
        }).catch(this.Error);
    },
    pathToView: function pathToView(path) {
        var _this4 = this;

        var hyphenSplit = path.split('-');
        return hyphenSplit.map(function (item) {
            return _this4.capitalizeFirstLetter(item);
        }).join('');
    },
    scrollToTop: function scrollToTop() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
}), { currentView: { value: '', writable: true }, views: { value: {} } });

},{"../../lib/MyObject":23,"./.ViewMap":3,"./factory/View":6}],13:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {
    postRender: function postRender() {
        return this;
    },


    template: require('./templates/Footer')

});

},{"./__proto__":16,"./templates/Footer":18}],14:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('./__proto__'), {

    User: require('../models/User'),

    events: {
        navList: 'click'
    },

    insertion: function insertion() {
        return { el: document.querySelector('#content'), method: 'insertBefore' };
    },


    model: require('../models/Header'),

    name: 'Header',

    onNavListClick: function onNavListClick(e) {
        var target = e.target;
        if (target.tagName !== 'SPAN') return;

        this.emit('navigate', '/' + target.textContent.toLowerCase());
    },
    onLogoutClick: function onLogoutClick() {
        this.User.logout();
    },
    onUserLogin: function onUserLogin() {
        this.els.profileBtn.classList.remove('hidden');
        this.els.name.textContent = this.User.data.name || this.User.data.email;
    },
    onUserLogout: function onUserLogout() {
        this.els.profileBtn.classList.add('hidden');
        this.els.name.textContent = '';
    },
    postRender: function postRender() {
        var _this = this;

        if (this.User.isLoggedIn()) this.onUserLogin();

        this.User.on('got', function () {
            if (_this.User.isLoggedIn()) _this.onUserLogin();
        });
        this.User.on('logout', function () {
            return _this.onUserLogout();
        });

        return this;
    },


    template: require('./templates/Header')

}), {});

},{"../models/Header":8,"../models/User":9,"./__proto__":16,"./templates/Header":19}],15:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {});

},{"./__proto__":16}],16:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = Object.assign({}, require('../../../lib/MyObject'), require('events').EventEmitter.prototype, {
    $: function $(el, selector) {
        return Array.from(el.querySelectorAll(selector));
    },


    TemplateContext: require('../TemplateContext'),

    Model: require('../models/__proto__'),

    OptimizedResize: require('./lib/OptimizedResize'),

    Xhr: require('../Xhr'),

    bindEvent: function bindEvent(key, event, el) {
        var _this = this;

        var els = el ? [el] : Array.isArray(this.els[key]) ? this.els[key] : [this.els[key]],
            name = this.getEventMethodName(key, event);

        if (!this['_' + name]) this['_' + name] = function (e) {
            return _this[name](e);
        };

        els.forEach(function (el) {
            return el.addEventListener(event || 'click', _this['_' + name]);
        });
    },
    constructor: function constructor() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


        if (opts.events) {
            Object.assign(this.events, opts.events);delete opts.events;
        }
        Object.assign(this, opts);

        this.subviewElements = [];

        if (this.requiresLogin && !this.user.isLoggedIn()) return this.handleLogin();
        if (this.user && !this.isAllowed(this.user)) return this.scootAway();

        return this.initialize().render();
    },
    delegateEvents: function delegateEvents(key, el) {
        var _this2 = this;

        var type = _typeof(this.events[key]);

        if (type === "string") {
            this.bindEvent(key, this.events[key], el);
        } else if (Array.isArray(this.events[key])) {
            this.events[key].forEach(function (eventObj) {
                return _this2.bindEvent(key, eventObj);
            });
        } else {
            this.bindEvent(key, this.events[key].event);
        }
    },
    delete: function _delete() {
        var _this3 = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { silent: false },
            silent = _ref.silent;

        return this.hide().then(function () {
            var container = _this3.els.container,
                parent = container.parentNode;
            if (container && parent) parent.removeChild(container);
            if (!silent) _this3.emit('deleted');
            return Promise.resolve();
        });
    },


    events: {},

    fadeInImage: function fadeInImage(el) {
        var _this4 = this;

        el.onload = function () {
            _this4.emit('imgLoaded', el);
            el.removeAttribute('data-src');
        };

        el.setAttribute('src', el.getAttribute('data-src'));
    },
    getEventMethodName: function getEventMethodName(key, event) {
        return 'on' + this.capitalizeFirstLetter(key) + this.capitalizeFirstLetter(event);
    },
    getContainer: function getContainer() {
        return this.els.container;
    },
    getTemplateOptions: function getTemplateOptions() {
        var rv = Object.assign(this.user ? { user: this.user.data } : {});

        if (this.model) {
            rv.model = this.model.data;

            if (this.model.meta) rv.meta = this.model.meta;
            if (this.model.attributes) rv.attributes = this.model.attributes;
        }

        if (this.templateOptions) rv.opts = typeof this.templateOptions === 'function' ? this.templateOptions() : this.templateOptions || {};

        return rv;
    },
    handleLogin: function handleLogin() {
        var _this5 = this;

        this.factory.create('login', { insertion: { el: document.querySelector('#content') } }).on("loggedIn", function () {
            return _this5.onLogin();
        });

        return this;
    },
    hide: function hide(isSlow) {
        var _this6 = this;

        //views not hiding consistently with this
        //if( !this.els || this.isHiding ) return Promise.resolve()

        this.isHiding = true;
        return this.hideEl(this.els.container, isSlow).then(function () {
            return Promise.resolve(_this6.hiding = false);
        });
    },
    hideSync: function hideSync() {
        this.els.container.classList.add('hidden');return this;
    },
    _hideEl: function _hideEl(el, resolve, hash, isSlow) {
        el.removeEventListener('animationend', this[hash]);
        el.classList.add('hidden');
        el.classList.remove('animate-out' + (isSlow ? '-slow' : ''));
        delete this[hash];
        this.isHiding = false;
        resolve();
    },
    hideEl: function hideEl(el, isSlow) {
        var _this7 = this;

        if (this.isHidden(el)) return Promise.resolve();

        var time = new Date().getTime(),
            hash = time + 'Hide';

        return new Promise(function (resolve) {
            _this7[hash] = function (e) {
                return _this7._hideEl(el, resolve, hash, isSlow);
            };
            el.addEventListener('animationend', _this7[hash]);
            el.classList.add('animate-out' + (isSlow ? '-slow' : ''));
        });
    },
    htmlToFragment: function htmlToFragment(str) {
        return this.factory.range.createContextualFragment(str);
    },
    initialize: function initialize() {
        return Object.assign(this, { els: {}, slurp: { attr: 'data-js', view: 'data-view', name: 'data-name', img: 'data-src' }, views: {} });
    },
    insertToDom: function insertToDom(fragment, options) {
        var insertion = typeof options.insertion === 'function' ? options.insertion() : options.insertion;

        insertion.method === 'insertBefore' ? insertion.el.parentNode.insertBefore(fragment, insertion.el) : insertion.el[insertion.method || 'appendChild'](fragment);
    },
    isAllowed: function isAllowed(user) {
        if (!this.requiresRole) return true;

        var userRoles = new Set(user.data.roles);

        if (typeof this.requiresRole === 'string') return userRoles.has(this.requiresRole);

        if (Array.isArray(this.requiresRole)) {
            var result = this.requiresRole.find(function (role) {
                return userRoles.has(role);
            });

            return result !== undefined;
        }

        return false;
    },
    isHidden: function isHidden(el) {
        return el ? el.classList.contains('hidden') : this.els.container.classList.contains('hidden');
    },
    onLogin: function onLogin() {

        if (!this.isAllowed(this.user)) return this.scootAway();

        this.initialize().render();
    },
    onNavigation: function onNavigation() {
        return this.show();
    },
    showNoAccess: function showNoAccess() {
        alert("No privileges, son");
        return this;
    },
    postRender: function postRender() {
        return this;
    },
    render: function render() {
        if (this.data) this.model = Object.create(this.Model, {}).constructor(this.data);

        this.slurpTemplate({
            insertion: this.insertion || { el: document.body },
            isView: true,
            storeFragment: this.storeFragment,
            template: Reflect.apply(this.template, this.TemplateContext, [this.getTemplateOptions()])
        });

        this.renderSubviews();

        if (this.size) {
            this.size();this.OptimizedResize.add(this.size.bind(this));
        }

        return this.postRender();
    },
    removeChildren: function removeChildren(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }return this;
    },
    renderSubviews: function renderSubviews() {
        var _this8 = this;

        this.subviewElements.forEach(function (obj) {
            var name = obj.name || obj.view;

            var opts = {};

            if (_this8.Views && _this8.Views[obj.view]) opts = _typeof(_this8.Views[obj.view]) === "object" ? _this8.Views[obj.view] : Reflect.apply(_this8.Views[obj.view], _this8, []);
            if (_this8.Views && _this8.Views[name]) opts = _typeof(_this8.Views[name]) === "object" ? _this8.Views[name] : Reflect.apply(_this8.Views[name], _this8, []);

            _this8.views[name] = _this8.factory.create(obj.view, Object.assign({ insertion: { el: obj.el, method: 'insertBefore' } }, opts));

            if (_this8.events.views) {
                if (_this8.events.views[name]) _this8.events.views[name].forEach(function (arr) {
                    return _this8.views[name].on(arr[0], function (eventData) {
                        return Reflect.apply(arr[1], _this8, [eventData]);
                    });
                });else if (_this8.events.views[obj.view]) _this8.events.views[obj.view].forEach(function (arr) {
                    return _this8.views[name].on(arr[0], function (eventData) {
                        return Reflect.apply(arr[1], _this8, [eventData]);
                    });
                });
            }

            if (obj.el.classList.contains('hidden')) _this8.views[name].hideSync();
            obj.el.remove();
        });

        this.subviewElements = [];

        return this;
    },
    scootAway: function scootAway() {
        var _this9 = this;

        this.Toast.showMessage('error', 'You are not allowed here.').catch(function (e) {
            _this9.Error(e);_this9.emit('navigate', '/');
        }).then(function () {
            return _this9.emit('navigate', '/');
        });

        return this;
    },
    show: function show(isSlow) {
        return this.showEl(this.els.container, isSlow);
    },
    showSync: function showSync() {
        this.els.container.classList.remove('hidden');return this;
    },
    _showEl: function _showEl(el, resolve, hash, isSlow) {
        el.removeEventListener('animationend', this[hash]);
        el.classList.remove('animate-in' + (isSlow ? '-slow' : ''));
        delete this[hash];
        resolve();
    },
    showEl: function showEl(el, isSlow) {
        var _this10 = this;

        var time = new Date().getTime(),
            hash = time + 'Show';

        return new Promise(function (resolve) {
            _this10[hash] = function (e) {
                return _this10._showEl(el, resolve, hash, isSlow);
            };
            el.addEventListener('animationend', _this10[hash]);
            el.classList.remove('hidden');
            el.classList.add('animate-in' + (isSlow ? '-slow' : ''));
        });
    },
    slurpEl: function slurpEl(el) {
        var key = el.getAttribute(this.slurp.attr) || 'container';

        if (key === 'container') {
            el.classList.add(this.name);
            if (this.klass) el.classList.add(this.klass);
        }

        this.els[key] = Array.isArray(this.els[key]) ? this.els[key].concat(el) : this.els[key] !== undefined ? [this.els[key], el] : el;

        el.removeAttribute(this.slurp.attr);

        if (this.events[key]) this.delegateEvents(key, el);
    },
    slurpTemplate: function slurpTemplate(options) {
        var _this11 = this;

        var fragment = this.htmlToFragment(options.template),
            selector = '[' + this.slurp.attr + ']',
            viewSelector = '[' + this.slurp.view + ']',
            imgSelector = '[' + this.slurp.img + ']',
            firstEl = fragment.querySelector('*');

        if (options.isView || firstEl.getAttribute(this.slurp.attr)) this.slurpEl(firstEl);
        Array.from(fragment.querySelectorAll(selector + ', ' + viewSelector + ', ' + imgSelector)).forEach(function (el) {
            if (el.hasAttribute(_this11.slurp.attr)) {
                _this11.slurpEl(el);
            } else if (el.hasAttribute(_this11.slurp.img)) _this11.fadeInImage(el);else if (el.hasAttribute(_this11.slurp.view)) {
                _this11.subviewElements.push({ el: el, view: el.getAttribute(_this11.slurp.view), name: el.getAttribute(_this11.slurp.name) });
            }
        });

        if (options.storeFragment) return Object.assign(this, { fragment: fragment });

        this.insertToDom(fragment, options);

        if (options.renderSubviews) this.renderSubviews();

        return this;
    },
    unbindEvent: function unbindEvent(key, event, el) {
        var _this12 = this;

        var els = el ? [el] : Array.isArray(this.els[key]) ? this.els[key] : [this.els[key]],
            name = this.getEventMethodName(key, event);

        els.forEach(function (el) {
            return el.removeEventListener(event || 'click', _this12['_' + name]);
        });
    }
});

},{"../../../lib/MyObject":23,"../TemplateContext":4,"../Xhr":5,"../models/__proto__":10,"./lib/OptimizedResize":17,"events":24}],17:[function(require,module,exports){
'use strict';

module.exports = Object.create({
    add: function add(callback) {
        if (!this.callbacks.length) window.addEventListener('resize', this.onResize.bind(this));
        this.callbacks.push(callback);
    },
    onResize: function onResize() {
        if (this.running) return;

        this.running = true;

        window.requestAnimationFrame ? window.requestAnimationFrame(this.runCallbacks.bind(this)) : setTimeout(this.runCallbacks, 66);
    },
    runCallbacks: function runCallbacks() {
        this.callbacks = this.callbacks.filter(function (callback) {
            return callback();
        });
        this.running = false;
    }
}, { callbacks: { writable: true, value: [] }, running: { writable: true, value: false } });

},{}],18:[function(require,module,exports){
"use strict";

/**
* Project: Future Days Farm Website
* Created By: Chris Baron
* Date Last Modified: 1/19/2018 by Alex Cadigan
* Description: This file builds the footer elements on the Farm Website homepage
*/

module.exports = function () {
    return "<footer id = \"footerBody\">\n\n    <!-- Future Days Farm Info -->\n    <div id = \"footerTitle\" class = \"footer\">\n\n        FUTURE DAYS FARM\n\n    </div>\n\n    <div class = \"footer\">\n\n        2123 Tiny Road\n        <br>\n        Town Name, Michigan 33344        \n\n    </div>\n\n    <br>\n\n    <div class = \"footer\">\n\n        <a id = \"footerLink\" href = \"mailto:Info@FutureDaysFarm.com\"> Info@FutureDaysFarm.com </a>\n        <br>\n        (333) 323-8899\n\n    </div>\n\n    <br>\n\n    <!-- Copyright -->\n    <div id = \"footerBottom\" class = \"footer\">\n\n        Copyright " + new Date().getFullYear() + " FutureDays Software\n\n    </div>\n\n    <style>\n\n        @import url('https://fonts.googleapis.com/css?family=Roboto');\n        @import url('https://fonts.googleapis.com/css?family=Arvo');\n\n        /**\n        * Body of footer\n        */\n        #footerBody\n        {\n            background-color: #C49542;\n        }\n\n        /**\n        * Future Days Farm Info\n        */\n        .footer\n        {\n            text-align: center;\n            font-family: Roboto;\n            color: #231F20;\n        }\n        #footerTitle\n        {\n            padding-top: 40px;\n            font-family: Arvo;\n            color: white;\n            font-weight: bold;\n        }\n        #footerLink\n        {\n            color: #231F20;\n            text-decoration: none;\n        }\n        #footerBottom\n        {\n            padding-bottom: 40px;\n        }\n\n    </style>\n\n    </footer>";
};

},{}],19:[function(require,module,exports){
"use strict";

/**
* Project: Future Days Farm Website
* Created By: Chris Baron
* Date Last Modified: 1/19/2018 by Alex Cadigan
* Description: This file builds the header elements on the Farm Website homepage
*/

module.exports = function (_ref) {
  var _this = this;

  var model = _ref.model;

  var navOptions = model.forEach(function (datum) {
    return "<span> " + _this.CapitalizeFirstLetter(datum) + " </span>";
  });
  return "<nav>\n\n\t<!-- Links to other pages -->\n\t<div class = \"header\">\n\n\t\t<a class = \"headerLink\" href = \"InsertURLToAboutUS\"> ABOUT US </a>\n\n\t</div>\n\n\t<div class = \"header\">\n\n\t\t<a class = \"headerLink\" href = \"InsertURLToWhereToFindUs\"> WHERE TO FIND US </a>\n\n\t</div>\n\n\t<div class = \"header\">\n\n\t\t<a id = \"headerHomepage\" href = \"InsertURLToFutureDaysFarm\"> FUTURE DAYS FARM </a>\n\n\t</div>\n\n\t<div class = \"header\">\n\n\t\t<a class = \"headerLink\" href = \"InserURLToTheBlog\"> THE BLOG </a>\n\n\t</div>\n\n\t<div class = \"header\">\n\n\t\t<a class = \"headerLink\" href = \"InsertURLToOurOfferings\"> OUR OFFERINGS </a>\n\n\t</div>\n\n\t<!-- The website logo -->\n\t<div id = \"headerPic\">\n\n\t\t<svg id = \"Layer_1\" data-name = \"Layer 1\" xmlns = \"http://www.w3.org/2000/svg\" viewBox = \"0 0 272.93 443.3\"><defs><style>.cls-1{fill:#282323;}.cls-2{fill:#ace1fa;}.cls-3{fill:#c49542;}.cls-4{fill:#815929;}.cls-5{fill:#c2484e;}</style></defs><title>Chicken</title><path class=\"cls-1\" d=\"M183.59,400.69c1,1,.71,1.84-.22,2.66-1.64.68-3.73.41-4.89,2a4,4,0,0,1-3.73,1.64c-1.89,0-3.78,0-5.66,0-.77,0-1.79.13-.93,1.26,1.47,1.91,3,3.74,4.63,5.55a2.49,2.49,0,0,0,2.46.84A104.24,104.24,0,0,1,191,412.95c1.44-.09,3.08-.25,3.64,1.48a2.73,2.73,0,0,1-1.94,3.41c-2.3.86-2.91,2.54-3,4.69h0a113,113,0,0,0-12.88,1.65c-.85.17-2.13-.06-2.29,1s1,1.48,1.91,1.82a7.08,7.08,0,0,1,2.62.63c2.48,1.68,5.39,2.16,8.18,3,3,.86,5.26,2.47,6.36,5.51a14.25,14.25,0,0,0,3.8,5.41v0l.88,3.25h0c-1.78.59-3.41,0-5-.67a12.93,12.93,0,0,0-5.71-1.12c-5.49.41-10.3-1.48-15-4-3.72-2-8.13-2.42-11.84-4.61-.62-.37-1.62-.13-2.44-.12-2.92.05-5.24,1.76-7.8,2.83-5.13,2.15-10.32,4.18-13.26,9.47-.5.89-1.33,2.24-2.92,1.44a10,10,0,0,0,3.05-3.23c.29-.39.88-.84.3-1.33a5.19,5.19,0,0,0-1.92-1.1c-.68-.18-.7.62-.9,1.06a9.23,9.23,0,0,0-.51,4.62c-1.44.29-1.39-.75-1.4-1.65a11,11,0,0,1,1.76-5.55,4.42,4.42,0,0,0,1-3,5.45,5.45,0,0,1,.88-3.42c2.44-5.13,4.12-10.45,2.67-16.18-1-3.88-3.41-7.2-4.81-10.92-1-2.64-2.41-2.14-4-1a10.32,10.32,0,0,1-7.64,2.13,2,2,0,0,0-1.79.73c-1.23,1.21-2.52,2.37-3.87,3.46-.78.63-1.63,1.73-2.75,1.08s-.56-1.92-.48-2.93c.16-2.1,1.43-3.59,2.91-4.94.44-.4,1.23-.85,1.21-1.26-.11-3.47,2.66-3.72,4.92-4.58s4.85-1.77,6.49-3.93c.77-1,1.26-2,.44-3.31s-1.53-2.58-2.3-3.88c-.27-.85-.53-1.7-.82-2.54-.85-2.46-1.14-2.54-3.37-1-1.64.05-2-1-2.15-2.37,1-2.78-.35-5-1.94-7-3.57-4.64-6.73-9.51-7.58-15.43s-4.58-8.26-9.89-9.12l-.54-.15a10.14,10.14,0,0,0-6-.25,8.85,8.85,0,0,1-6.86-1.32c-2.14-1.39-4.2-3.25-7-3.31a48.64,48.64,0,0,0-5.2-.09c-4,.34-6.71-1.57-9-4.55A48.86,48.86,0,0,1,60.37,330a7.16,7.16,0,0,0-5.72-4.88,8.38,8.38,0,0,1-4.52-2.43c-4.19-4.15-7-8.91-7.63-14.95-.34-3-.41-6.74-3.6-8.4-2.7-1.4-2.38-3.36-2-5.5a9.32,9.32,0,0,1,2.93-5c1.83-1.8,3.7-3.57,5.42-5.47,1-1.08,1.78-2.57.58-3.84-2.24-2.37-3.06-5.41-4.37-8.22l-.16-.48A3.42,3.42,0,0,0,39.44,267a2.28,2.28,0,0,1-1.12-1.61,2.79,2.79,0,0,0-1.69-2c-2.41-.75-2.76-2.53-2.59-4.64.13-1.59-.12-3.17-1.48-4.07-2.67-1.74-4.11-4.56-6.27-6.72-1.65-1.65-2.92-3.4-2.81-5.92.05-1.23-.84-2.22-1.41-3.28-1.44-2.66-3.5-4.88-5.1-7.46-3.89-6.3-1.22-12,.46-17.86.53-1.83,2.59-3.21.78-5.38-.21-.26-.06-.89,0-1.32a11.4,11.4,0,0,0-.86-8.33c-.7-1.26-1.06-2.78,0-4.08,2.28-2.91,1-5.37-2.92-7-1.32-2-1.18-5.63.43-7.2.92-.89.9-1.46,0-2.36a28,28,0,0,1-2.29-3.08c.14-2.16-1.14-3.77-2.39-5.21-1.41-1.61-.7-3.28-.66-4.92,0-1.31,1.51-.64,2.14-1.23.22-.2.56-.29.73-.52a10.71,10.71,0,0,1,7.82-3.94c1.25-.12,1.64-.7,1.5-1.94-.59-5.14-3.19-9.3-6.37-13.18-1.13-2.73-1-3,1.3-3.65.68,0,1.36.06,2,0,5.06-.44,7.71-3.14,8-8.14,0-.3,0-.61,0-.91.32-2.57.83-2.93,3.35-2.43s3.41-.19,3.42-2.7c0-1.73-.29-3.51,1.43-4.73a1.15,1.15,0,0,0,.25-1.27c-1-3.4.13-6.75.28-10.12a4.4,4.4,0,0,1,2.27-3.7,21.67,21.67,0,0,0,5.55-4.93c2.46-3,4.34-6.53,8.09-8.26.5-.23.81-.88,1.18-1.35,1.38-1.72,2.71-1.89,4.07-.17,5.62,7.11,10.42,14.61,11,24.06.07,1.2.11,3,1.56,3.18s1.62-1.48,2.06-2.58c.67-1.66,1.69-1.85,2.81-.42a20.63,20.63,0,0,1,2.59,4.48c1,2.38,1,5.18,2.84,7.23l0,0c-.3,1.08.4,1.87.8,2.74.66,1.43,1.67,2.74,1.91,4.32.13.84,1.62,2.5-1,2.33-.59,0-.44.7-.35,1.09.73,3.07,1.39,6.16,2.28,9.18a112.07,112.07,0,0,0,5.49,15.17c.45,1,.46,3.07,2.27.92.45-.53,1.11.28,1.7.17l0,0,.37.52.52.87.32.5a.36.36,0,0,1,.16.33.47.47,0,0,0,.37.58h0c.77,7,4.55,12.51,9.22,17.47,4,4.21,8.8,7.3,13.59,10.47,2.62,1.74,2.54,1.86,3.61-1.09a3,3,0,0,1,2.14.67c3.5,4.86,7.86,8.36,14.17,8.29,8.46-.09,16-2.68,21.87-9a10.38,10.38,0,0,1,7.26-3.66,3.48,3.48,0,0,0,2.61-1.18c2.52-3.13,5.63-5.6,8.64-8.22,1.83-1.59,3.32-3.81,1.8-6.4-1.29-2.19-.83-3.95.51-5.83.89-1.26,2.13-2.43,1.76-4.24,0-1.42-1.17-2.05-2.12-2.75a60.57,60.57,0,0,1-7.09-6.28,47.53,47.53,0,0,1-9.42-13.59c-3.16-6.72-5.65-13.41-6.56-20.76-1.37-11.11-.84-22,3.15-32.56,5.26-14,15.48-23.72,27.3-32.06,4.6-3.25,5.23-1.84.92-7.24,0-.05-.13-.07-.2-.1-2.14-3.2-4.29-6.38-6.4-9.59a2.91,2.91,0,0,0-3.26-1.42c-1.93.36-3.87.68-5.83.86-2.24.21-3.09-.83-2.64-3a5.66,5.66,0,0,1,3.1-4.22c.88-.44,2.18-1,1.55-2.32s-1.58-2.71-3.45-2.34c-1.25.25-2.46.75-3.7,1.07-1,.26-2,.36-2.57-.76a2.17,2.17,0,0,1,.5-2.68c.6-.68,1.3-1.27,1.92-1.93,1.61-1.72,1.63-2.6-.19-4.14-1.42-1.21-2.66-2.58-5.1-1.85a4.18,4.18,0,0,1-5.12-3.57,4.83,4.83,0,0,1,5.25-5c2.89.09,4.4,1.78,4,4.77-.35,2.4,1.57,3.42,2.63,5,1.25,1.85,2.78,2.62,5,1.58a8.79,8.79,0,0,1,2.87-.55,2.13,2.13,0,0,1,2.3,1.12,2.06,2.06,0,0,1-.67,2.45c-.57.6-1.29,1.06-1.87,1.65-.76.78-2.31,1.25-1.16,2.86,1,1.38,1.87,2.84,4,2.13.39-.13.79-.54,1.26-.09,0,.11.09.28,0,.39-.43.86-2.78.47-1.69,2.23,2.22,3.58,2.75,4.42,5.15,3.45a12.65,12.65,0,0,0,2.37-1.31c1-.68,2.14-1.47,1.93-2.81S186.16,28.33,185,28q0-.41,0-.82a3.77,3.77,0,0,1,2.46.81l.43.28c1.58,1.29,1.07,2.68.08,4a8.37,8.37,0,0,1-4.45,3c-1.43.4-1.56,1-.76,2.23,2.1,3.13,3.86,6.49,6.55,9.2A26,26,0,0,1,191.66,50c.69,1.42,1.3,1.2,2.4.46,6.84-4.61,14.56-6.05,22.62-5.8a42.23,42.23,0,0,1,17.64,4.5c1.59.79,2.87.8,3.74-1a16.26,16.26,0,0,1,1.23-1.88c2.08-3.86,5.48-6.59,8.4-9.72,1.14-1.23,1.12-2.1-.11-3.19a23.13,23.13,0,0,1-3.84-4.45c-.63-.94-1.36-1.91-.44-3.08a3.07,3.07,0,0,1,3.43-1.08,12.85,12.85,0,0,1,5.5,3c1,.9,1.66,1,2.55-.15,1.31-1.66,2.76-3.2,4.19-4.76.87-.95.83-1.6-.33-2.3A17.08,17.08,0,0,1,255,17.22c-.69-.76-1.27-1.61-.67-2.64a2.33,2.33,0,0,1,2.59-1,14.41,14.41,0,0,1,5.93,2.7c.62.43,1.13,1.51,2,.54.71-.75,1.37-1.49.95-2.79-1.24-3.81,2.62-8.06,6.56-7.31,2.83.53,4.14,3.8,2.69,6.7a5.79,5.79,0,0,1-6,3.19,2.47,2.47,0,0,0-2.79,1.4c-.6,1.1.67,1.3,1.18,1.78A12.58,12.58,0,0,1,271,24.74c.62,1.71,0,2.49-1.77,2.38a9.29,9.29,0,0,1-5.45-2.53c-1.41-1.22-2.19-1-3.22.34a43.1,43.1,0,0,1-3.4,3.64c-1.21,1.21-1.28,2.15.17,3.34a8.38,8.38,0,0,1,3.21,5.79c.17,1.76-.54,2.52-2.37,2.29a10.42,10.42,0,0,1-5.21-2.57,1.55,1.55,0,0,0-2.47.09A87.58,87.58,0,0,0,241.78,47c-.66.82-1.29,1.66-2,2.45-.83,1-.59,1.6.54,2,6.18,2.23,11.55,5.89,16.76,9.77,4.8,3.57,9.73,7.29,12.44,12.68,3.51,7,6.52,14.2,7.7,22.13,2,13.32,1.17,26.17-4.47,38.56-2.3,5-4.58,10.07-8.87,13.79-4.68,4.05-9.39,8.08-14.42,11.71-1.65,1.24-.07,2.7-.27,4,0,1.21-.09,2.41-.07,3.62a2.21,2.21,0,0,1-1,2.13c-2.21,1.11-2.43,2.26-1.17,4.54a80.68,80.68,0,0,1,4.15,10c.34.89,1.79,2.39-.89,2.17-.62-.05-.59.6-.4,1,1.44,3.31,2.52,6.86,4.46,9.85a12.36,12.36,0,0,1,1.69,10.05c-1.08,4.65-2.6,9.14-2.43,14.1a66.83,66.83,0,0,1,.16,8.52,12.25,12.25,0,0,1-.15,2.25c-2.35,8-.54,16.36-1.63,24.47-.24.54-.44,1.1-.72,1.61S250.78,260,250,260s-1.14-.78-1.36-1.5a11.06,11.06,0,0,1-.36-1.06c-.16-.69.13-1.69-.88-1.85-.84-.14-.87.93-1.4,1.3-2,1.45-2,3.84-2.51,5.89-1.41,5.41-4.89,9.41-8.51,13.4a33.25,33.25,0,0,0-7.23,11.36c-.28.61-.53,1.23-.86,1.81s-.5,1.62-1.49,1.37-1.12-1.12-1.13-2c0-.52.07-1,.1-1.56a8.45,8.45,0,0,0,.26-1.53c0-.7.36-1.61-.58-2s-1.42.28-1.92.86c-1.12,1.32-2.54,2.35-3.56,3.79-4.13,5.82-8.27,11.63-12.54,17.35-1.14,1.52-1.89,3.41-3.32,4.56a9.21,9.21,0,0,0-2.64,2.95c-1.63,3.14-3.3,6.25-5,9.38h-1.35c-2-2.73-2-2.73-3.75.32a8.66,8.66,0,0,0-.42,1,20.23,20.23,0,0,1-3.6,4,12.29,12.29,0,0,0-3.45,4.37c-.41.91-1,2.05-2.36,1.07-.12-.56.16-1.32-.57-1.58s-1.05.43-1.49.81c-1.27,1.11-2.09,2.86-4.17,2.78a18.58,18.58,0,0,0-11.36,3.8,39,39,0,0,0-12.32,13.68c-5,9.57-5.41,19.75-4,30.17a44.39,44.39,0,0,0,.7,5.16c.48,1.93.66,4.12,2.57,5.36a39.09,39.09,0,0,0,10.95,5.35c3.44.94,6.71-.16,10-1s6.3-1.34,9.24.9a7.56,7.56,0,0,0,3.49,1.56l.08-.09-.09.09C183.22,400.54,183.33,400.69,183.59,400.69Zm29.3-226.89c9.94-.13,19.54-2.42,29.12-4.76a5.5,5.5,0,0,0,2.92-1.62,1.88,1.88,0,0,0,.47-2.09c-.34-.76-1.08-.76-1.75-.72a6.75,6.75,0,0,0-2,.33,40.88,40.88,0,0,1-9,2.21c-8,1.22-15.84,2.86-23.89,3.42-5.53.38-11-.66-16.45-1a25.77,25.77,0,0,0-6.9-.65c-.88,0-2.39-.12-2.56,1.32s1.27,1.72,2.28,2a32.78,32.78,0,0,0,11.5,2c4.67-.21,9.35-.08,14-.12A3.27,3.27,0,0,0,212.89,173.8ZM142.41,385.28c-.28-2.61-1.1-3.18-3.51-2.59-1.95.48-3.46,1.82-5.29,2.54-2.43,1-2.53,1.27-1.27,3.6.85,5.47,3.5,10.38,5.35,15.49,1.75,4.84,2.77,9.82,4.37,14.66a11,11,0,0,1,.27,6.69c-1.4,4.5-3.5,8.77-4.18,13.49-.06.42-.49.87-.09,1.25s.87,0,1.2-.24a58.71,58.71,0,0,1,12.2-6.71,17.87,17.87,0,0,1,15.85.11,73.39,73.39,0,0,0,17.15,5.66c1.3.26,4.55-2.31,4.67-3.56.05-.59-.4-.79-.8-.93-3.13-1.06-6.13-2.57-9.5-2.81-4.85-.34-7.75-4.35-11.74-6.31a1.57,1.57,0,0,1-.48-2.05c.37-.81,1.1-.62,1.78-.46a6.14,6.14,0,0,0,3.11-.42c1.75-.48,3.43-1.22,5.19-1.58,2.94-.61,5.92-1,8.88-1.49,1.89-.32,2.08-.93,1-2.47-1-1.34-2.14-.81-3.26-.41-6.65,2.39-13.54,2.83-20.52,2.61a13.2,13.2,0,0,1-5.83-1.68,3.51,3.51,0,0,1-1.62-1.53A322.84,322.84,0,0,1,142.41,385.28Zm93.93-273.82c-.79.26-1.56.55-2.36.76a5,5,0,0,1-4.9-.9c-.58-.51-1.17-1.1-.65-1.94a1.62,1.62,0,0,1,1.94-.8,7,7,0,0,1,1.5.5c2.2,1.24,3.85.46,5.46-1.46-5-2.09-9.07-.2-13.14,2.38a4.94,4.94,0,0,1,3.15-4,14.07,14.07,0,0,1,11.43-.32c2.92,1.15,4.86-.36,4.51-3.38s-4.8-5.9-7.88-4.92c-1.36.43-2.59,1.31-4.06,1.36-1.2,0-2.35-.3-2.63-1.64s.61-2.05,1.82-2.45a9.76,9.76,0,0,1,3.13-.4c1.36,0,2.72,0,4.08,0a2.23,2.23,0,0,0,2.1-1.79c.33-1.17-.87-.7-1.32-1.06s-.65-.44-.58-.88A1.3,1.3,0,0,1,239,89.49a24.42,24.42,0,0,1,3.57-.57c2.16-.14,3.18-1.22,3-3.36s-.27-4.38-.65-6.53c-.22-1.22.22-2.95-1-3.56s-2.09.84-3.16,1.33a2.16,2.16,0,0,1-.41.18,2.77,2.77,0,0,1-2.2-.08c-.84-.57,0-1.22.09-1.82A23.48,23.48,0,0,0,237.7,66a8.69,8.69,0,0,0-.86,2.11,16.54,16.54,0,0,1-2,5c-.6.82-1.19,1.61-2.36,1.38s-1.6-1.32-1.72-2.38a28.75,28.75,0,0,1-.08-3.17,8,8,0,0,0-3.1-6.51c-.95-.76-2-1.85-3.2-1.16-1.35.8,0,2,.19,3,.48,3,1.76,5.78,2,8.81.06.82.12,1.74-.93,2.07a1.89,1.89,0,0,1-2.17-.86A24.59,24.59,0,0,1,221.94,72a9,9,0,0,0-4-3.25c-.46-.23-1-.58-1.44-.05s.07.85.27,1.25c.94,1.89,2,3.75,1.94,6,0,2.8-1.5,3.71-3.92,2.29-1.37-.8-2.62-1.81-4-2.57s-2.45-.16-2,1.36c.71,2.4.36,4.76.39,7.15,0,2.14,1.27,3.14,3.42,2.8a29.42,29.42,0,0,0,3.28-.86c3.21-.91,5.38-.39,7.06,2,2.05,2.9,3.81,5.94,1.7,9.6a6.73,6.73,0,0,1-.78.85c-.43-1.95-.75-3.63-1.19-5.27-.88-3.26-3.44-5.65-6-5.13s-5.7.17-7.06,3.38c-.25.58-.93.71-1.5.93-2.93,1.11-2.94,1.19-.9,3.25a4.74,4.74,0,0,1,.85,1.05c.4.75,1.47,1.4.85,2.38s-1.89.66-2.91.51-2.3-1.53-3-.24,1.18,1.6,1.77,2.46c.36.53,1.3.86,1,1.6s-1.19.41-1.82.42c-1.81,0-3.49.23-4.89,2.08a28.42,28.42,0,0,1,3.74.33c1.17.27,2.75.88,2.44,2.17-.39,1.65-1.85.42-2.87.31a.82.82,0,0,1-.22-.07c-1.38-.57-1.9-.05-2,1.39a35.82,35.82,0,0,0,.35,6.08c.12,1.3,1.64,1.63,2.34,2.59.22.29.62-.14.9-.41,2.44-2.27,4.46-1.64,5.26,1.62.25,1,.45,2.06.76,3.06a1,1,0,0,0,1,.76c.57,0,.61-.58.67-1a7.78,7.78,0,0,1,2-4c.4-.49.6-1.44,1.46-1.13a1.87,1.87,0,0,1,1.14,2c0,.6,0,1.22-.09,1.81-.83,5.5,1.63,10,4.39,14.39,1.54,2.44,2.9,2.23,4.48-.52,1.48-2.57,2.44-2.83,4.54-.61a14.57,14.57,0,0,0,1.08,1.16,1.5,1.5,0,0,0,1,.44c.58-.08.47-.68.52-1.1a1.82,1.82,0,0,0-.82-2c-1.73-1-1.41-2.12,0-2.9,3.11-1.75,3.93-4.82,4.86-7.84,1.09-3.55.07-7.23.59-10.82l.12-.36Zm-36.74-19c2.37-1.14,4.72-2.35,7.14-3.4,1-.44,1.08-.85.75-1.86A33.16,33.16,0,0,1,206,76.25q.05-4.58,4.57-3.47c1.49.37,2.94.91,4.8,1.5-1.22-2.2-2.27-4-3.24-5.85-.6-1.14-1.23-2.45-.18-3.56s2.42-.41,3.6,0c.77.29,1.44.82,2.18,1.19,1.32.65,2.77,1.92,4.12.6s.07-2.7-.4-4c-.41-1.13-1.09-2.16-1-3.43s.76-1.88,1.93-1.54C226.8,59,231,60.63,233,65.33c.26.62.61,1.21,1.15,2.28a47,47,0,0,1,1.93-7.74c.86-.7,1.75-1,2.67-.1,2.4,4.15,1.85,9,2.82,13.51.86-.82,1.56-1.51,2.28-2.16s1.32-1.69,2.45-1.23,1.05,1.57,1,2.55A39.31,39.31,0,0,0,248.22,83c1,4,.11,7-3.63,8.92a12.18,12.18,0,0,0-1.76,1.42c-2.31,1.85-2.31,1.85.17,3.35,2.68,1.63,4.21,4.38,3.76,6.93a5.58,5.58,0,0,1-5.14,4.91c-2,.32-2.64,1.52-2.14,3.62.69,2.91,1.38,5.87.58,8.92-.66,2.53-2.17,4.63-3.26,6.94-1.75,3.71-3,7.42-.25,11.29.68,1,.62,2.29.78,3.49.64,5,1.18,10,2.77,14.85,1.15,3.49,2.67,3.86,5.47,1.33a7.06,7.06,0,0,0,1.42-.67c4.9-3.79,10-7.37,14.61-11.48A36.36,36.36,0,0,0,273.4,125c.42-2.6.56-5.23,1.14-7.83,2.36-10.5.57-20.74-2.52-30.77-1.47-4.77-4.79-8.62-7.65-12.72a55.5,55.5,0,0,0-13-12.74c-3.31-2.45-7.29-3.65-10.79-5.72-5.34-3.15-10.86-5.44-17.18-5.71-8.6-.37-17.1-.48-24.9,4-2.09,1.2-4.26,2.29-6.33,3.53C183.27,62.32,175,68.38,169,76.92a60.1,60.1,0,0,0-6.82,12.67,52.38,52.38,0,0,0-3.72,16.51,49.75,49.75,0,0,0,1.49,14.59c1.25,4.94,3.33,9.69,4.86,14.54,2,6.28,5,11.6,10,15.81,1.37,1.16,2.1,3,4,3.6a3.29,3.29,0,0,0,2.61,2.53c1.28,0,.32-1.62.8-2.39a1.42,1.42,0,0,0,.09-.21c1.75-4.2,2.44-8.68,3.59-13,.11-.43.36-.92,0-1.27s-.85-.07-1.25.12-.8.43-1.19.65a2.36,2.36,0,0,1-2.58,0c-1-.6-.35-1.46-.31-2.25.29-6.42,3.2-12,5.58-17.75,1.56-3.79,3.38-7.4,6.39-10.29.36-.34,1-.72.61-1.31-1.31-2.07.46-2.78,1.61-3.76.84-.72,2.32-1.13,2.17-2.38s-1.74-.79-2.56-1.35c.19-1.48,1.69-1.9,2.38-3l4.72-2.42-3.79-.91C196.75,93.58,198.85,93.42,199.61,92.43ZM72.46,119.3a6.17,6.17,0,0,0-.79.69c-1,1.39-2.11,2.88-4,2.3s-1.89-2.49-1.91-4.19a31.21,31.21,0,0,0-1.69-9.53c-1.44-4.35-4.13-8-6.4-12-1.93-3.33-1.81-3.36-5-1.66-1.92,1-4,1.69-5.21,3.79A29.28,29.28,0,0,1,40,107.22a6.62,6.62,0,0,0-2.62,5.58,34.41,34.41,0,0,1-2,15.29,3.81,3.81,0,0,0,.12,1.56,16.58,16.58,0,0,1,.27,2.23c0,1.77-.88,2.27-2.51,1.51a11.9,11.9,0,0,1-1.35-.83c-1.45-.93-2.41-.69-2.72,1.12a11.89,11.89,0,0,0-.26,1.78c-.06,3.63-1.53,6.05-5.44,6.44a3.14,3.14,0,0,0-.66.17c-3.23,1.07-3.71,2.3-1.91,5.16,1.34,2.13,2.55,4.25,2.59,6.89a25.69,25.69,0,0,0,.49,4.49c.89,4.64.93,4.63-3.73,3.84-2.67-.45-6,.91-6.87,2.92-1.15,2.58.81,3.9,2.3,5.34a26,26,0,0,1,6,7.63c1,2.1.53,3.63-1.55,4.46-1.89.76-1.82,1.37-.62,2.82,1.81,2.19,2.67,9,1.14,10.3-1.7,1.44-1.18,2.73-.55,4.16,1.22,2.79,2.37,5.33,2,8.74-.27,2.36-.67,4.26-2.23,5.75a3.56,3.56,0,0,0-1.06,4c.53,1.93,1.24,3.93-.19,5.87a.83.83,0,0,0,.36,1.33c.83.28.68.77.54,1.42-.62,2.86.6,5,2.76,6.72a9.94,9.94,0,0,1,3.87,6.92,12.61,12.61,0,0,0,5.43,9c2.88,2.17,5.74,4.52,5.66,8.74,0,1.11,1,1.61,2,2s1.71.87,1.79,1.86c.19,2.43,1.78,3.54,3.79,4.3a2.47,2.47,0,0,1,1.67,3.57,5.29,5.29,0,0,0,.94,5.32,26.87,26.87,0,0,1,2,2.77c1.32,2.18,1.12,3.76-.81,5.39A41.67,41.67,0,0,1,44.26,287a11.24,11.24,0,0,0-4.08,5.31c-.79,1.86-.74,3.91,1.34,5.2a7.91,7.91,0,0,1,3.38,5.17c.52,2.12.89,4.28,1.4,6.4,1.5,6.25,3.8,11.82,11,13.59a6.32,6.32,0,0,1,4.56,3.44c1.16,2.69,3.67,4.84,3.22,8.24-.1.75.62,1.68,1.12,2.42,3.1,4.64,8,5.9,13,6.71,2.73.44,5.63.1,8.08,1.77a12.08,12.08,0,0,0,12,1.37c2.23-.9,4.41-.89,6.11,1.3.44.57,1.25.84,1.8,1.34,2.84,2.53,6.45,4.33,7.9,8.17.85,2.26,1.65,4.55,2.27,6.88A45,45,0,0,0,128.06,383c1.52,1.67,2.79,1.57,4.13,0a5.23,5.23,0,0,1,4.4-1.88c1,0,2.08-.35,3.13-.4,2.27-.1,2.64-1.5,2.2-3.28a18,18,0,0,1-.22-7c1.33-9,4.09-17.57,10-24.68,4.57-5.54,9.73-10.42,17-12.58a25.13,25.13,0,0,0,10.57-5.83c3.87-3.77,7.44-7.84,11.68-11.24,1-.83,1.9-1.13,2.58.13,1.11,2.08,1.77,1.1,2.54-.21,1.53-2.6,2.65-5.62,4.72-7.69,4.51-4.52,5.66-11.41,11.1-15.19.28-.19.35-.66.57-1a57.4,57.4,0,0,1,8.84-10.83c3.39-3,4-2.86,5.85,1,0,0,.13,0,.23.08.65-.2.69-.9,1-1.36,2.63-3.57,5-7.42,8-10.63a17.07,17.07,0,0,0,4.93-9.37,11,11,0,0,1,1.71-4.57c1.28-2,2.63-3.88,2.59-6.4a1.23,1.23,0,0,1,.75-1.29c.76-.19,1.05.51,1.28,1,.39.91.72,1.81,1.82,2.08a15.67,15.67,0,0,0,.51-7.43c-.65-3.21,0-6.3.14-9.45.1-3.44,1.05-6.78.89-10.24a55.77,55.77,0,0,1,0-7.93c.29-3,.21-6.07,1.91-8.9a6.86,6.86,0,0,0,.37-5.28c-.38-1.32-.87-2.29-2.34-2.61-.47-.1-.75-.7-.85-1.26a58.6,58.6,0,0,0-4.36-14.39c-.33-.71-.68-1.78.52-2,1.47-.32,1.13-1.11.78-2s-.79-2-1.21-2.93c-1.35-3.15-2.47-3.88-5.87-3.81-2.89.06-5.61,1.11-8.46,1.42-3.74.41-7.5.66-11.22,1.23a136.89,136.89,0,0,1-15.46,1.85c-6.72.26-13.42.1-19.93-2-2.1-.68-3.13.14-3.38,2.34-.14,1.2-.31,2.39-.44,3.59a1.78,1.78,0,0,1-2.32,1.77,5.75,5.75,0,0,0-4.39,1.21c-2.54,1.71-4.42,4.08-6.59,6.17-.46.44-.74,1.08-1.66.85-3.58-.89-5.73,1.82-7.53,3.9-1.51,1.74-2,3.71-5,4.35a29.17,29.17,0,0,0-9.67,4.29,3.86,3.86,0,0,1-1.95.46,20.62,20.62,0,0,1-16.8-5.73c-.61-.58-1.34-1.5-2.33-.74-1.28,1-2.2.23-3.29-.33-3.11-1.61-5.61-4.17-9.19-5.14a14.77,14.77,0,0,1-5.46-2.56c-.47-.38-1.34-1-.92-1.33,2.05-1.71-.24-2.22-.85-2.81-3.65-3.57-7.12-7.18-8.63-12.27a6,6,0,0,0-2.38-3.25,10.17,10.17,0,0,1-2.82-3.19c-4.71-7.26-7.05-15.45-9.45-23.63-1.5-5.14-1.52-10.81-5.29-15.19-.48-.56-.45-1.57-.66-2.37C73.31,124.24,73.38,121.78,72.46,119.3Zm124.6-9.94a14.14,14.14,0,0,1-2.38,3.22,19,19,0,0,0-5.82,8.51c-1.61,4.47-2.85,9.06-4.23,13.61-.25.8-1.31,1.65-.4,2.43s1.57-.31,2.14-.77c1.09-.87,1.6-.46,2.35.45,1.74,2.1.42,4-.21,6-1.18,3.65-3,7.11-3.74,10.9-.6,2.91.17,3.73,2.94,3.15,1.55-.32,2.21.32,2,1.76a27.81,27.81,0,0,1-.86,3.27c-.44,1.7-.16,2.85,1.88,3.3,3.68.82,7.3,1.82,11.13,1.81,5.89,0,11.79.29,17.65-.52a104.41,104.41,0,0,0,18.2-4.52c1.44-.47,1.72-1.17.86-2.49s-2.21-2.94-2.44-4.55c-.49-3.44-1.52-6.77-1.94-10.21-.28-2.28-.52-4.53-3.39-5.18-.59-.13-1.08-.8-1.59-1.25-1.94-1.69-2-1.67-2.86.81-.93,2.73-2.6,3.3-5.07,1.75a8,8,0,0,1-2.24-2.2,92.92,92.92,0,0,1-5.56-8.2,9.39,9.39,0,0,0-.24,2.89,1.89,1.89,0,0,1-1.24,2.16c-1.16.4-1.82-.28-2.37-1.21a8.79,8.79,0,0,1-1.22-2.9c-.35-1.85-.7-3.7-1.08-5.54a2,2,0,0,0-2.12-1.7c-1.27.18-.47,1.34-.42,2.05a20.09,20.09,0,0,0,.49,2.67c.25,1.23.45,2.75-.77,3.25s-2.18-.91-3-1.89a1,1,0,0,1-.11-.2,39.82,39.82,0,0,1-3.61-11.15C197.34,115.73,197.41,112.58,197.05,109.36ZM166.46,416.07c.75,0,1.51,0,2.26,0s1.46,0,1.82-.68-.29-1.23-.68-1.76a15.41,15.41,0,0,0-3.8-3.82,4.44,4.44,0,0,1-1.66-3.69c0-1.1,1.74-1.11,2.79-1.43a11.25,11.25,0,0,1,5.15-.18c1.52.25,1.84-.66,1.89-1.84s-.55-1.72-1.83-1.58a24.67,24.67,0,0,0-6.39,1.33,6.61,6.61,0,0,1-5.47-.26c-2.52-1.19-5.07-2.32-7.6-3.48-.55-.25-1.13-.62-1.68-.14a1.32,1.32,0,0,0-.1,1.68c2.05,4.17,3.1,8.83,6.17,12.51.73.88,1.34,1.93,2.55,2.09C162.1,415.12,164.12,416.49,166.46,416.07Zm-44.4-12.69c2.42,1.93,8.53,1.32,10.19-1.06.83-1.18.22-2.48-.39-3.63a.78.78,0,0,0-1.34-.16C128.15,400.86,124.65,401.16,122.07,403.38ZM172.95,36.64c.22,0,.45,0,.67-.06.89-.15,1.78-.27,2.66-.46,2.11-.45,2.35-1,1.21-2.9-1.79-3-1.8-3-4.44-.78a9.27,9.27,0,0,0-1.46,1.39c-.43.56-1.23,1.09-.8,1.93S172.1,36.67,172.95,36.64Zm77.32-3.14c.65-.95,1.32-1.83,1.88-2.78s-.4-1-.82-1.26c-1.44-.94-2.91-1.84-4.4-2.71-.52-.3-1.17-.58-1.64,0s0,1.06.31,1.43c1.3,1.64,2.67,3.23,4,4.83A3.8,3.8,0,0,0,250.27,33.5Zm4.85-.82c-1.16,0-2.28,1.61-1.62,2.57A8.1,8.1,0,0,0,258,38.44a1,1,0,0,0,1.43-1C259.56,36,256.57,32.71,255.12,32.67ZM188.54,440.75c.5.46,1.15.1,1.7.29s1.24.54,1.88.74c1.1.34,2.56,1.78,3.19.86.82-1.19-1.07-2-1.82-2.91C191.36,437.12,189.79,437.47,188.54,440.75ZM261.13,20.28c.42,0,.78-.56,1.21-1s.19-.68-.15-.94a20.79,20.79,0,0,0-4.91-3.17c-.67-.27-1.23,0-1.2.81S260.09,20.3,261.13,20.28Zm-87.38,3c1.51-.5,2.2-1.92,3.18-3,.25-.28.48-.76.16-1-.95-.75-1.84.2-2.78.23a5,5,0,0,0-1.31.31c-.68.22-1.68.24-1.41,1.33A2.94,2.94,0,0,0,173.75,23.24ZM269,24.61a11.74,11.74,0,0,0-3.47-3.8c-1.18-1-1.64.21-2.14.76-.77.85.21,1.14.74,1.44,1.23.72,2.51,1.37,3.77,2C268.42,25.32,268.92,25.48,269,24.61ZM167.16,25.79c.68-.21,1.54-.45,2.38-.75.63-.22,1.4-.48,1-1.38-.31-.73-.65-1.76-1.61-1.63a4.79,4.79,0,0,0-3,2.15,1,1,0,0,0-.19,1.24C166,25.85,166.52,25.82,167.16,25.79Zm10.23,375.52c.55.7-.67,2.32.88,2.26,1.11,0,3-1,2.88-1.94-.12-1.12-1.81-2.08-3.07-2.22S177.72,400.64,177.38,401.31Zm-62,10.17c1.79-.81,2.68-2.41,4.09-3.35a.86.86,0,0,0,.09-1.37,1,1,0,0,0-1.43,0A6.32,6.32,0,0,0,115.39,411.48Zm76,2.91c-.91.38-2.43,0-2.76,1.27-.21.8.77,1.65,1.75,1.7,1.36.07,2-1,2.32-2.08C192.91,414.44,192,414.51,191.35,414.39Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-2\" d=\"M187.46,48c.07,0,.16,0,.2.1,4.31,5.4,3.68,4-.92,7.24-11.82,8.34-22,18.06-27.3,32.06-4,10.6-4.52,21.45-3.15,32.56.91,7.36,3.4,14,6.56,20.76a47.53,47.53,0,0,0,9.42,13.59,60.57,60.57,0,0,0,7.09,6.28c1,.7,2.08,1.32,2.12,2.75l-1.73.47a97.44,97.44,0,0,1-11.35-9.25,64.72,64.72,0,0,1-18.16-34.74,65.1,65.1,0,0,1,6.3-42.59A64,64,0,0,1,186,48.49,14.61,14.61,0,0,1,187.46,48Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-2\" d=\"M249.48,160.14c5-3.63,9.74-7.66,14.42-11.71,4.29-3.72,6.58-8.75,8.87-13.79,5.64-12.39,6.46-25.24,4.47-38.56-1.18-7.93-4.2-15.15-7.7-22.13-2.71-5.39-7.64-9.11-12.44-12.68-5.21-3.88-10.58-7.54-16.76-9.77-1.14-.41-1.38-1-.54-2,.69-.8,1.32-1.63,2-2.45a80.57,80.57,0,0,1,15.62,9.82,68.4,68.4,0,0,1,15.4,18.48,67.11,67.11,0,0,1,8,24.08,63.7,63.7,0,0,1-1,22.2c-3,14.46-10.37,26.4-21.32,36.18a43.1,43.1,0,0,1-6.88,5.08C251.2,161.7,250,161.17,249.48,160.14Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M127.53,388.82c.76,1.3,1.48,2.62,2.3,3.88s.33,2.3-.44,3.31c-1.64,2.16-4.09,3-6.49,3.93s-5,1.11-4.92,4.58c0,.41-.77.86-1.21,1.26-1.48,1.35-2.74,2.84-2.91,4.94-.08,1-.59,2.29.48,2.93s2-.45,2.75-1.08c1.35-1.08,2.63-2.25,3.87-3.46a2,2,0,0,1,1.79-.73,10.32,10.32,0,0,0,7.64-2.13c1.61-1.17,3-1.67,4,1,1.4,3.72,3.83,7,4.81,10.92,1.45,5.73-.24,11.05-2.67,16.18a5.45,5.45,0,0,0-.88,3.42,4.42,4.42,0,0,1-1,3,11,11,0,0,0-1.76,5.55c0,.89,0,1.93,1.4,1.65l0,0c1.6.8,2.42-.55,2.92-1.44,2.95-5.28,8.13-7.32,13.26-9.47,2.55-1.07,4.88-2.78,7.8-2.83.82,0,1.82-.25,2.44.12,3.71,2.19,8.12,2.59,11.84,4.61,4.73,2.57,9.54,4.46,15,4a12.93,12.93,0,0,1,5.71,1.12c1.61.63,3.24,1.26,5,.67-.71,2.25-2.45,2.1-4,1.32-3.12-1.62-6.5-1.81-9.85-2.29a65.65,65.65,0,0,1-11.06-2.24c-4.8-1.57-9.7-2.84-14.35-4.85a3.33,3.33,0,0,0-3.05-.1c-4.24,2.39-9.18,3.32-13,6.64-2,1.7-4.32,2.85-5.66,5.29a2.74,2.74,0,0,1-3.75,1.17,2.79,2.79,0,0,1-1.52-3.43c.66-3.23,1.73-6.41,2-9.67.31-3.49,2-6.44,2.85-9.72a2.57,2.57,0,0,0,.15-1.32c-1.5-4.22-1.41-8.81-3.14-13-.28-.67-.3-1.54-1.28-1.67-5.37-.72-10.52-.18-15.27,2.68a19.38,19.38,0,0,1-2.15,1.25,2.73,2.73,0,0,1-3.46-.85,2.81,2.81,0,0,1-.1-3.56c2-3.1,3.84-6.27,5.85-9.35,1.58-2.42,4.46-2.93,6.74-4.32a1.07,1.07,0,0,1,.22-.06c4.31-1.43,4.75-2.39,3-6.49L127,388.9Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M79.51,127.38c-1.85-2-1.8-4.85-2.84-7.23a20.63,20.63,0,0,0-2.59-4.48c-1.11-1.43-2.13-1.23-2.81.42-.44,1.1-.63,2.78-2.06,2.58s-1.49-2-1.56-3.18c-.56-9.45-5.36-16.95-11-24.06-1.36-1.72-2.69-1.56-4.07.17-.38.47-.69,1.12-1.18,1.35-3.76,1.73-5.64,5.3-8.09,8.26a21.67,21.67,0,0,1-5.55,4.93,4.4,4.4,0,0,0-2.27,3.7c-.15,3.37-1.23,6.72-.28,10.12a1.15,1.15,0,0,1-.25,1.27c-1.72,1.23-1.42,3-1.43,4.73,0,2.5-.91,3.2-3.42,2.7s-3-.14-3.35,2.43c0,.3,0,.6,0,.91-.3,5-3,7.7-8,8.14-.67.06-1.36,0-2,0A6.81,6.81,0,0,1,21.73,137a2.5,2.5,0,0,0,2.34-2.71c.16-2.41.36-4.87,2.69-6.39a11.38,11.38,0,0,1,1.12-.72c1-.48,2.75,1,2.92-1.35.09-1.25.81-2.32,1.06-3.59a71.23,71.23,0,0,0,.86-12.6,4.77,4.77,0,0,1,1.45-3.48c4.45-4,7.4-9.37,11.84-13.29,2.5-2.2,5.36-4.33,9.19-4.5,2.94-.13,4.62,1.4,5.81,3.47,1.39,2.42,2.89,4.77,4.35,7.14a33.58,33.58,0,0,1,4.91,14c.13,1.15.59,1.29,1.56,1.32,4.07.12,5.6,1.51,6.11,5.56A46.11,46.11,0,0,0,79.51,127.38Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M41.44,271.31c1.31,2.82,2.13,5.85,4.37,8.22,1.2,1.27.4,2.77-.58,3.84-1.72,1.9-3.59,3.67-5.42,5.47a9.32,9.32,0,0,0-2.93,5c-.37,2.14-.68,4.09,2,5.5,3.19,1.66,3.26,5.37,3.6,8.4.67,6,3.44,10.8,7.63,14.95a8.38,8.38,0,0,0,4.52,2.43A7.16,7.16,0,0,1,60.37,330a48.86,48.86,0,0,0,6.77,11.7c2.32,3,5,4.9,9,4.55a48.64,48.64,0,0,1,5.2.09c2.82.06,4.88,1.92,7,3.31A8.85,8.85,0,0,0,95.25,351a10.14,10.14,0,0,1,6,.25,14.78,14.78,0,0,1-12.51.47,48.22,48.22,0,0,0-14.46-4c-5.48-.6-9.36-3.91-12.63-8A4.26,4.26,0,0,1,60.5,337c.4-3.14-2-5.07-2.91-7.63a3.15,3.15,0,0,0-2.43-1.83c-7.92-2.36-11.77-8.17-13.47-15.82-.44-2-.92-4-1.32-6a8.84,8.84,0,0,0-2.69-4.84,10.5,10.5,0,0,1-1.57-12.36,20.64,20.64,0,0,1,6.75-6.9c1.25-.8,1.72-1.36.57-2.69A8.82,8.82,0,0,1,41.44,271.31Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M251.88,256.89c1.1-8.12-.71-16.43,1.63-24.47a12.25,12.25,0,0,0,.15-2.25,66.83,66.83,0,0,0-.16-8.52c-.17-5,1.35-9.45,2.43-14.1a12.36,12.36,0,0,0-1.69-10.05c-1.94-3-3-6.54-4.46-9.85-.18-.42-.22-1.07.4-1,2.69.22,1.24-1.28.89-2.17a80.68,80.68,0,0,0-4.15-10c-1.26-2.27-1-3.43,1.17-4.54a2.21,2.21,0,0,0,1-2.13c0-1.21,0-2.41.07-3.62l2.17-.89c0,1.81.06,3.62.09,5.43a2.19,2.19,0,0,1-.84,2c-1.5,1-1.38,2.05-.49,3.53a14.72,14.72,0,0,1,2,10.63c-.26,1.34.36,2.4.73,3.45,1.17,3.3.88,7.21,4.08,9.71a4,4,0,0,1,1.11,2.65c.2,3,.93,6.26-.3,9-2.78,6.13-1.87,12.5-2.12,18.81a55.1,55.1,0,0,1-.69,7.18c-1,5.55.57,11.12-.3,16.69A6,6,0,0,1,251.88,256.89Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M179.76,163.76l1.73-.47c.37,1.81-.86,3-1.76,4.24-1.34,1.88-1.8,3.64-.51,5.83,1.53,2.59,0,4.81-1.8,6.4-3,2.62-6.12,5.09-8.64,8.22a3.48,3.48,0,0,1-2.61,1.18,10.38,10.38,0,0,0-7.26,3.66c-5.88,6.36-13.41,8.95-21.87,9-6.3.07-10.67-3.44-14.17-8.29,2.41-.76,4.23.34,5.87,1.92a18.33,18.33,0,0,0,5.49,3.52c3.12,1.35,6,2.12,9.35-.12,2.69-1.82,5.95-2.86,9-4,1-.38.68-1.24,1.2-1.7,3.08-2.67,5.59-6.27,10.3-6.23.9,0,1.32-.68,1.81-1.21a37.78,37.78,0,0,1,6.25-5.54,7,7,0,0,1,1.53-.93c.95-.34,2.42-.22,2.68-1.2a10.14,10.14,0,0,0,.57-4.36C176.36,170,176.17,166.32,179.76,163.76Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M14.42,187.33c3.89,1.66,5.21,4.12,2.92,7-1,1.3-.67,2.81,0,4.08a11.4,11.4,0,0,1,.86,8.33c-.09.43-.25,1.07,0,1.32,1.81,2.17-.25,3.55-.78,5.38-1.68,5.82-4.35,11.56-.46,17.86,1.59,2.58,3.65,4.81,5.1,7.46.58,1.06,1.47,2,1.41,3.28-.11,2.52,1.16,4.27,2.81,5.92,2.16,2.17,3.61,5,6.27,6.72,1.36.89,1.61,2.47,1.48,4.07-.17,2.12.19,3.89,2.59,4.64a2.79,2.79,0,0,1,1.69,2A2.28,2.28,0,0,0,39.44,267a3.42,3.42,0,0,1,1.84,3.79c-2.13-1.22-4-2.7-4.82-5.12,0-.07,0-.18-.07-.21-3.34-1.92-3.5-5.65-5-8.63-1.14-2.27-3.57-3.41-5.36-5.13a13.64,13.64,0,0,1-4.54-8.36,10.63,10.63,0,0,0-4-7.11,8.09,8.09,0,0,1-2.86-5.88c-.19-2-1.34-3.89-1-6a64.55,64.55,0,0,0,.32-9.89,3.6,3.6,0,0,1,1.41-2.7c2.21-2.12,2.64-3.94,1.23-6.67a17,17,0,0,1-1.89-9.4c.06-.67-.09-1.42.48-1.92,2.11-1.83,1.27-3.56-.1-5.32A9.56,9.56,0,0,1,14.42,187.33Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-2\" d=\"M239.29,46.27a16.26,16.26,0,0,0-1.23,1.88c-.87,1.82-2.16,1.82-3.74,1a42.23,42.23,0,0,0-17.64-4.5c-8.06-.25-15.78,1.19-22.62,5.8-1.09.74-1.71,1-2.4-.46a26,26,0,0,0-2.28-3.35c5.07-1.64,10.08-3.48,15.4-4.23C216.62,40.76,228.15,41.75,239.29,46.27Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M146.32,383c-1.45-10.42-1.08-20.6,4-30.17a39,39,0,0,1,12.32-13.68,18.58,18.58,0,0,1,11.36-3.8c2.09.08,2.9-1.67,4.17-2.78.44-.38.79-1.06,1.49-.81s.45,1,.57,1.58a33.17,33.17,0,0,1-10,4.93c-8.79,3-14.36,9.46-18.49,17.37A48.81,48.81,0,0,0,147,369.55a19.45,19.45,0,0,0-.26,6.51,16.63,16.63,0,0,1-.16,6.53Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M195.13,322.53c1.66-3.12,3.33-6.24,5-9.38a9.21,9.21,0,0,1,2.64-2.95c1.43-1.15,2.19-3,3.32-4.56,4.27-5.72,8.4-11.54,12.54-17.35,1-1.44,2.43-2.47,3.56-3.79.5-.58,1.06-1.21,1.92-.86s.57,1.29.58,2a8.45,8.45,0,0,1-.26,1.53c-.75-.72-1.31-.37-1.84.31-1.57,2-3.32,3.93-4.67,6.09a25.39,25.39,0,0,1-4.41,5.4c-1.27,1.16-2.56,2.19-2.56,4.25,0,1.15-1,2.15-1.85,3-3.6,4-6.26,8.65-9,13.27C199,321.35,197.73,323.1,195.13,322.53Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M227.75,287.52A33.25,33.25,0,0,1,235,276.16c3.62-4,7.1-8,8.51-13.4.53-2,.46-4.44,2.51-5.89.52-.37.56-1.44,1.4-1.3,1,.17.72,1.16.88,1.85a11.06,11.06,0,0,0,.36,1.06c-2.35,1.32-2.47,3.78-2.87,6a17.14,17.14,0,0,1-4.68,8.82c-3.28,3.44-5.82,7.42-8.57,11.25C231.33,286.17,230.3,288.07,227.75,287.52Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M120.74,192.9c-1.07,3-1,2.83-3.61,1.09-4.79-3.17-9.63-6.27-13.59-10.47-4.67-5-8.45-10.43-9.22-17.47a15.54,15.54,0,0,1,5.51,7,18.88,18.88,0,0,0,6.16,8.78c2.61,2.09,3.77,6,7.17,6.8C116.2,189.41,118.32,191.32,120.74,192.9Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M92.59,163.27c-.6.11-1.25-.71-1.7-.17-1.81,2.15-1.82.06-2.27-.92A112.07,112.07,0,0,1,83.13,147c-.89-3-1.55-6.11-2.28-9.18-.09-.39-.24-1.13.35-1.09,2.61.16,1.12-1.49,1-2.33-.24-1.58-1.25-2.89-1.91-4.32-.4-.87-1.1-1.66-.8-2.74,2.95,2.34,3,5.86,3.82,9.12C85.58,145.68,88.2,154.78,92.59,163.27Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M189.76,422.53c0-2.15.66-3.83,3-4.69a2.73,2.73,0,0,0,1.94-3.41c-.56-1.73-2.19-1.57-3.64-1.48a104.24,104.24,0,0,0-15.76,1.72,2.49,2.49,0,0,1-2.46-.84c-1.59-1.81-3.16-3.64-4.63-5.55-.86-1.12.16-1.24.93-1.26,1.89,0,3.78,0,5.66,0a4,4,0,0,0,3.73-1.64c1.16-1.64,3.25-1.37,4.89-2-.91,2.76-3.71,3.1-5.76,4.36a7.07,7.07,0,0,1-5.21,1c.57,2.14,2.4,3.07,2.88,4.9.17.67,1.28.24,1.86.06a38.16,38.16,0,0,1,11.33-1.8,52,52,0,0,1,5.84.22c2.91.29,3.87,3.4,1.85,5.58C194.32,419.69,191.89,420.92,189.76,422.53Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M15.38,143.76c3.18,3.88,5.78,8,6.37,13.18.14,1.24-.25,1.82-1.5,1.94a10.71,10.71,0,0,0-7.82,3.94c-.18.22-.52.31-.73.52-.63.59-2.1-.08-2.14,1.23,0,1.64-.75,3.31.66,4.92,1.26,1.43,2.53,3,2.39,5.21-4.2-2.56-4.52-6.59-4-10.86.3-2.62,4.71-5.92,7.93-6.07,2.68-.13,2.65-.12,2.16-2.81a9.85,9.85,0,0,0-1.72-4.13A8.72,8.72,0,0,1,15.38,143.76Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M146.32,383l.25-.42c2,1.85,2.62,4.33,3.24,6.84.56,2.26,1.39,4,4.15,4.66,3.08.77,5.75,2.75,9,3.44,2.55.54,4.7-.51,7.05-.63a58.67,58.67,0,0,1,8.11-.21c2.25.2,3.36,2.45,5.1,3.62a7.56,7.56,0,0,1-3.49-1.56c-2.93-2.24-6-1.76-9.24-.9s-6.55,2-10,1a39.09,39.09,0,0,1-10.95-5.35c-1.91-1.25-2.09-3.43-2.57-5.36A44.39,44.39,0,0,1,146.32,383Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M101.79,351.37c5.31.86,9,3.3,9.89,9.12s4,10.79,7.58,15.43c1.58,2.06,2.91,4.23,1.94,7-5.27-5.74-7.86-12.86-9.79-20.16-1.11-4.2-3.76-6.7-7-9A8.23,8.23,0,0,1,101.79,351.37Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M197.45,441.47a14.25,14.25,0,0,1-3.8-5.41c-1.1-3-3.41-4.65-6.36-5.51-2.79-.82-5.7-1.29-8.18-3a26.2,26.2,0,0,1,12,3.44C195,433.16,196.08,437.52,197.45,441.47Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M176.5,426.95c-.91-.34-2.08-.75-1.91-1.82s1.44-.79,2.29-1a113,113,0,0,1,12.88-1.65c-.33,1.4-1.52,1.12-2.5,1.32-3.14.63-6.35.81-9.44,1.71C177.08,425.76,176.31,425.88,176.5,426.95Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M127.53,388.82l-.48.09a11.49,11.49,0,0,1-3.7-3.61c2.22-1.57,2.51-1.48,3.37,1C127,387.12,127.25,388,127.53,388.82Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M251.38,163.28l-2.17.89c.2-1.34-1.39-2.79.27-4,.53,1,1.71,1.57,2.06,2.73A1.19,1.19,0,0,1,251.38,163.28Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M189.6,323.87a8.66,8.66,0,0,1,.42-1c1.72-3.06,1.72-3.06,3.75-.32C192.17,322.31,190.94,323.24,189.6,323.87Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M185.07,27.2q0,.41,0,.82h-3.45l0-.68A5,5,0,0,1,185.07,27.2Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M198.32,444.7l-.88-3.25C199.08,442.17,199.51,443.22,198.32,444.7Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-1\" d=\"M181.07,28.06c-.85.31-1.1,0-1.06-.23s.45-.54.83-.58.67,0,.69.34C181.56,28.21,181,28.11,181.07,28.06Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M94.32,166a.47.47,0,0,1-.37-.58Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M183.59,400.69c-.26,0-.36-.15-.35-.4Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M93.79,165.14l-.32-.5Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M188,28.3l-.43-.28Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M92.95,163.77l-.37-.52A.43.43,0,0,1,92.95,163.77Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M72.46,119.3c.92,2.49.86,4.94,1.48,7.25.21.8.18,1.8.66,2.37,3.77,4.38,3.79,10.05,5.29,15.19,2.39,8.19,4.74,16.38,9.45,23.63a10.17,10.17,0,0,0,2.82,3.19,6,6,0,0,1,2.38,3.25c1.51,5.09,5,8.7,8.63,12.27.61.59,2.9,1.1.85,2.81-.42.35.45,1,.92,1.33a14.77,14.77,0,0,0,5.46,2.56c3.58,1,6.08,3.53,9.19,5.14,1.09.57,2,1.31,3.29.33,1-.75,1.73.17,2.33.74a20.62,20.62,0,0,0,16.8,5.73,3.86,3.86,0,0,0,1.95-.46,29.17,29.17,0,0,1,9.67-4.29c3-.65,3.45-2.61,5-4.35,1.8-2.08,4-4.79,7.53-3.9.92.23,1.2-.4,1.66-.85,2.16-2.09,4-4.46,6.59-6.17a5.75,5.75,0,0,1,4.39-1.21,1.78,1.78,0,0,0,2.32-1.77c.13-1.2.3-2.39.44-3.59.26-2.2,1.28-3,3.38-2.34,6.51,2.11,13.21,2.26,19.93,2a136.89,136.89,0,0,0,15.46-1.85c3.71-.57,7.48-.82,11.22-1.23,2.84-.31,5.57-1.36,8.46-1.42,3.4-.07,4.52.66,5.87,3.81q.62,1.46,1.21,2.93c.35.89.69,1.69-.78,2-1.2.26-.86,1.33-.52,2a58.6,58.6,0,0,1,4.36,14.39c.1.56.38,1.16.85,1.26,1.47.32,2,1.29,2.34,2.61a6.86,6.86,0,0,1-.37,5.28c-1.69,2.83-1.62,5.89-1.91,8.9a55.77,55.77,0,0,0,0,7.93c.16,3.46-.79,6.81-.89,10.24-.1,3.15-.78,6.24-.14,9.45a15.67,15.67,0,0,1-.51,7.43c-1.11-.27-1.43-1.18-1.82-2.08-.22-.52-.52-1.22-1.28-1a1.23,1.23,0,0,0-.75,1.29c0,2.51-1.31,4.42-2.59,6.4a11,11,0,0,0-1.71,4.57,17.07,17.07,0,0,1-4.93,9.37c-3,3.21-5.37,7.06-8,10.63-.34.46-.38,1.16-1,1.36-.1,0-.21,0-.23-.08-1.84-3.86-2.46-4-5.85-1a57.4,57.4,0,0,0-8.84,10.83c-.21.31-.29.78-.57,1-5.44,3.77-6.59,10.66-11.1,15.19-2.07,2.07-3.19,5.09-4.72,7.69-.77,1.31-1.43,2.29-2.54.21-.67-1.26-1.54-1-2.58-.13-4.24,3.4-7.8,7.47-11.68,11.24a25.13,25.13,0,0,1-10.57,5.83c-7.28,2.16-12.44,7-17,12.58-5.86,7.11-8.63,15.67-10,24.68a18,18,0,0,0,.22,7c.44,1.78.07,3.17-2.2,3.28-1,0-2.09.43-3.13.4a5.23,5.23,0,0,0-4.4,1.88c-1.34,1.54-2.61,1.64-4.13,0a45,45,0,0,1-10.68-18.66c-.63-2.33-1.43-4.62-2.27-6.88-1.44-3.84-5.06-5.65-7.9-8.17-.56-.5-1.36-.77-1.8-1.34-1.7-2.2-3.88-2.21-6.11-1.3a12.08,12.08,0,0,1-12-1.37c-2.45-1.67-5.35-1.34-8.08-1.77-5.08-.82-9.94-2.08-13-6.71-.5-.74-1.22-1.67-1.12-2.42.46-3.4-2.05-5.54-3.22-8.24a6.32,6.32,0,0,0-4.56-3.44c-7.15-1.77-9.45-7.34-11-13.59-.51-2.12-.87-4.28-1.4-6.4a7.91,7.91,0,0,0-3.38-5.17c-2.08-1.29-2.13-3.34-1.34-5.2A11.24,11.24,0,0,1,44.26,287a41.67,41.67,0,0,0,4.36-3.23c1.93-1.63,2.13-3.21.81-5.39a26.87,26.87,0,0,0-2-2.77,5.29,5.29,0,0,1-.94-5.32,2.47,2.47,0,0,0-1.67-3.57c-2-.76-3.6-1.87-3.79-4.3-.08-1-.89-1.51-1.79-1.86s-2-.86-2-2c.09-4.23-2.78-6.57-5.66-8.74a12.61,12.61,0,0,1-5.43-9,9.94,9.94,0,0,0-3.87-6.92c-2.16-1.7-3.38-3.86-2.76-6.72.14-.64.29-1.14-.54-1.42a.83.83,0,0,1-.36-1.33c1.43-1.93.72-3.93.19-5.87a3.56,3.56,0,0,1,1.06-4c1.56-1.49,2-3.39,2.23-5.75.38-3.42-.77-6-2-8.74-.63-1.43-1.15-2.72.55-4.16,1.52-1.29.67-8.11-1.14-10.3-1.2-1.45-1.28-2.07.62-2.82,2.08-.83,2.51-2.36,1.55-4.46a26,26,0,0,0-6-7.63c-1.49-1.45-3.45-2.77-2.3-5.34.89-2,4.2-3.37,6.87-2.92,4.65.79,4.62.8,3.73-3.84a25.69,25.69,0,0,1-.49-4.49c0-2.64-1.25-4.76-2.59-6.89-1.81-2.86-1.32-4.1,1.91-5.16a3.14,3.14,0,0,1,.66-.17c3.9-.39,5.37-2.81,5.44-6.44a11.89,11.89,0,0,1,.26-1.78c.31-1.81,1.27-2.05,2.72-1.12a11.9,11.9,0,0,0,1.35.83c1.62.76,2.47.27,2.51-1.51a16.58,16.58,0,0,0-.27-2.23,3.81,3.81,0,0,1-.12-1.56,34.41,34.41,0,0,0,2-15.29A6.62,6.62,0,0,1,40,107.22a29.28,29.28,0,0,0,7.39-8.47C48.59,96.66,50.72,96,52.64,95c3.22-1.71,3.1-1.67,5,1.66,2.27,3.91,5,7.6,6.4,12a31.21,31.21,0,0,1,1.69,9.53c0,1.7,0,3.59,1.91,4.19s3-.91,4-2.3A6.17,6.17,0,0,1,72.46,119.3Zm-13.9,171c.18-2.83,2.22-4.58,4-6.36a58.46,58.46,0,0,0,8.81-11.7,93.55,93.55,0,0,1,13.3-18.16c6.34-6.56,13.1-12.73,19.84-18.9A55.3,55.3,0,0,1,121.85,224c6.69-2.57,13.63-4.34,20.52-6.23a42.64,42.64,0,0,0,8.94-3.15c.49-.26,1.18-.54,1.12-1.29s-.86-.93-1.5-1.12a13.1,13.1,0,0,0-5.4-.21c-13.92,1.64-25.89,7.83-36.78,16.26-5.48,4.24-10.53,9-15.9,13.41-3.92,3.2-8,6.2-11.05,10.3-2.34,3.14-4.52,6.4-6.86,9.54-5.15,6.89-10.36,13.73-15.54,20.59a16.85,16.85,0,0,0-2.46,4.31c-.79,2.17-.28,3.45,1.54,4.06a3.77,3.77,0,0,0,2.5.86,4.1,4.1,0,0,1,3.14,6.56c-.5.76-1.07,1.46-1.56,2.22a1.7,1.7,0,0,0-.18,1.92,1.62,1.62,0,0,0,2,.54,31,31,0,0,0,3.74-1.59c4.44-2.22,8.22-1.48,11.25,2.43a47.9,47.9,0,0,1,4,6c3.18,5.7,3.21,5.75,8.24,1.57,2.34-1.95,5-1.43,6.38,1.3a12.46,12.46,0,0,1,.89,2.79c.67,2.94,1.29,5.84,2.91,8.5a39.79,39.79,0,0,1,3.66,7.75c1.35,4,3.94,6.9,7,9.52,1.75,1.52,3.26,1,4.25-1.08a21.86,21.86,0,0,1,1.16-1.93c2.59-4.29,6.44-7.6,9.23-11.72a69.75,69.75,0,0,1,34.84-27c6.33-2.29,12.69-4.41,18.45-8,8.51-5.26,15.41-11.93,18.24-21.89,2.39-8.4,2.39-17,1.35-25.58a6.55,6.55,0,0,0-4.55-5.38c-.5.84,0,1.44.23,2,3.52,10.95,2.57,21.56-2.34,31.88-5,10.57-13.76,16.95-24.25,21.34-6.18,2.59-12.59,4.6-18.49,7.91a87.14,87.14,0,0,0-34.68,34.82c-1.67,3.06-2.85,3.13-4.83.26-3.28-4.76-4.93-10.31-7.4-15.47-1.32-2.76-1.66-6-2.93-8.77-2.54-5.56-5.36-7-9.5-3.29-3.18,2.83-4.92,2.19-6.76-1.67-.19-.41-.33-.85-.54-1.24-1.92-3.58-3.64-7.26-7.25-9.65-2.58-1.71-5.09-2.31-7.79-.67-1.24.75-1.45,0-1.64-.84a9.35,9.35,0,0,1-.1-1.81c-.05-2.61-.59-3.08-3.2-3.24C62.11,289.77,60.39,290.69,58.55,290.34Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-2\" d=\"M238.76,59.77c-.93-.89-1.81-.6-2.67.1-1-.25-2.27.25-3.09-.92-2.65-3.79-6.53-4.15-10.67-3.78-1.62.15-4.45,2.66-4.32,4.27.19,2.29-.7,2.78-2.81,2.68C211.74,62,210,63.77,210,67.27c0,1.69-.43,2.26-2.15,2.16-2-.12-5,2.45-5,4.31a48.43,48.43,0,0,0,.26,7.43c.47,3.15.93,6.51-2.46,8.7a2.38,2.38,0,0,0-1.1,2.55c-.76,1-2.86,1.15-2,3.17-1.42.8-1,2.12-.93,3.33-.69,1.07-2.2,1.5-2.38,3-1.92,2.43-3.81,4.9-5.78,7.3a36.48,36.48,0,0,0-5.59,8.9c-2.06,4.87-3,10.1-4.68,15.11-1,2.93-1.47,6.79,2.08,9.21,1.26.86.82,1.94.3,3a17.38,17.38,0,0,0-1.88,9.2c-1.89-.58-2.61-2.44-4-3.6-5-4.21-8-9.53-10-15.81-1.53-4.85-3.61-9.6-4.86-14.54a49.75,49.75,0,0,1-1.49-14.59,52.38,52.38,0,0,1,3.72-16.51A60.1,60.1,0,0,1,169,76.92c6-8.53,14.28-14.59,23.15-19.89,2.07-1.24,4.24-2.33,6.33-3.53,7.8-4.48,16.3-4.37,24.9-4,6.32.27,11.84,2.56,17.18,5.71,3.5,2.07,7.47,3.27,10.79,5.72a55.5,55.5,0,0,1,13,12.74c2.86,4.1,6.17,7.95,7.65,12.72,3.1,10,4.88,20.26,2.52,30.77-.58,2.59-.72,5.23-1.14,7.83a36.36,36.36,0,0,1-11.81,21.86c-4.62,4.11-9.71,7.68-14.61,11.48a7,7,0,0,1-1.42.67,9.06,9.06,0,0,0-1.23-2.66,21.21,21.21,0,0,1-2.9-7c-.72-4.4-.9-9-3.37-13a3.6,3.6,0,0,1,.77-4.38,11.9,11.9,0,0,0,2.58-5c1.13-3.3.9-6.71,1-10.1,0-1.6-.19-3.74,1.25-4.5,4.44-2.35,6.2-5.73,5.66-10.7-.24-2.19-.37-4.19-2.2-5.66-.77-.62-.67-1,.16-1.67,1.7-1.4,4-2.58,4.17-5.07a56.88,56.88,0,0,0-1.3-16.42c-.39-1.79-1.86-3.53-3.35-3.61-2.53-.13-2.24-1.41-2.32-3.05C244.26,62.54,241.79,59.85,238.76,59.77ZM166,105.39a1.62,1.62,0,0,0,1.16-1.26c1.66-4.88,4.54-9.18,6.55-13.89A10.26,10.26,0,0,1,176,86.86c4.44-4.3,8.93-8.55,13.39-12.82.75-.72,2.37-1,1.83-2.44s-1.94-1.53-3.28-1.4a9.62,9.62,0,0,0-2.44.43c-4.9,1.85-9.26,4.56-12,9.11a75.09,75.09,0,0,0-7.6,17.35C165,99.78,164.69,102.65,166,105.39Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M197.05,109.36c.36,3.22.29,6.37.78,9.48A39.82,39.82,0,0,0,201.45,130a1,1,0,0,0,.11.2c.8,1,1.61,2.44,3,1.89s1-2,.77-3.25a20.09,20.09,0,0,1-.49-2.67c0-.71-.86-1.87.42-2.05a2,2,0,0,1,2.12,1.7c.38,1.84.73,3.69,1.08,5.54a8.79,8.79,0,0,0,1.22,2.9c.56.92,1.21,1.61,2.37,1.21a1.89,1.89,0,0,0,1.24-2.16,9.39,9.39,0,0,1,.24-2.89,92.92,92.92,0,0,0,5.56,8.2,8,8,0,0,0,2.24,2.2c2.47,1.55,4.14,1,5.07-1.75.84-2.48.92-2.5,2.86-.81.51.45,1,1.11,1.59,1.25,2.87.64,3.1,2.9,3.39,5.18.43,3.44,1.46,6.77,1.94,10.21.23,1.6,1.5,3.1,2.44,4.55s.57,2-.86,2.49a104.41,104.41,0,0,1-18.2,4.52c-5.86.82-11.76.5-17.65.52-3.84,0-7.45-1-11.13-1.81-2-.45-2.32-1.61-1.88-3.3a27.81,27.81,0,0,0,.86-3.27c.19-1.44-.48-2.09-2-1.76-2.77.58-3.54-.24-2.94-3.15.78-3.79,2.56-7.24,3.74-10.9.63-1.94,1.95-3.86.21-6-.75-.9-1.26-1.32-2.35-.45-.57.46-1.35,1.45-2.14.77s.16-1.62.4-2.43c1.39-4.54,2.63-9.14,4.23-13.61a19,19,0,0,1,5.82-8.51A14.14,14.14,0,0,0,197.05,109.36Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M236.57,111.68c-.53,3.59.5,7.27-.59,10.82-.93,3-1.75,6.09-4.86,7.84-1.38.78-1.7,1.93,0,2.9a1.82,1.82,0,0,1,.82,2c0,.42.06,1-.52,1.1a1.5,1.5,0,0,1-1-.44,14.57,14.57,0,0,1-1.08-1.16c-2.11-2.22-3.07-2-4.54.61-1.58,2.75-2.94,3-4.48.52-2.76-4.39-5.22-8.89-4.39-14.39.09-.59,0-1.21.09-1.81a1.87,1.87,0,0,0-1.14-2c-.86-.32-1.06.64-1.46,1.13a7.78,7.78,0,0,0-2,4c-.06.45-.1,1-.67,1a1,1,0,0,1-1-.76c-.31-1-.51-2-.76-3.06-.8-3.26-2.82-3.89-5.26-1.62-.29.27-.69.7-.9.41-.7-1-2.22-1.29-2.34-2.59a35.82,35.82,0,0,1-.35-6.08c.11-1.44.63-2,2-1.39a.82.82,0,0,0,.22.07c1,.11,2.47,1.34,2.87-.31.31-1.29-1.27-1.9-2.44-2.17a28.42,28.42,0,0,0-3.74-.33c1.4-1.85,3.08-2.08,4.89-2.08.63,0,1.52.36,1.82-.42s-.66-1.07-1-1.6c-.59-.86-2.53-1.13-1.77-2.46s2,.09,3,.24,2.21.59,2.91-.51-.45-1.63-.85-2.38a4.74,4.74,0,0,0-.85-1.05c-2-2.07-2-2.15.9-3.25.57-.22,1.26-.34,1.5-.93,1.36-3.21,4.5-2.87,7.06-3.38s5.14,1.88,6,5.13c.44,1.64.76,3.32,1.19,5.27a6.73,6.73,0,0,0,.78-.85c2.11-3.67.36-6.7-1.7-9.6-1.68-2.37-3.85-2.89-7.06-2a29.42,29.42,0,0,1-3.28.86c-2.15.35-3.4-.65-3.42-2.8,0-2.39.32-4.75-.39-7.15-.45-1.52.58-2.14,2-1.36s2.63,1.77,4,2.57c2.43,1.42,3.91.52,3.92-2.29,0-2.21-1-4.08-1.94-6-.2-.4-.56-.87-.27-1.25s1-.18,1.44.05a9,9,0,0,1,4,3.25,24.59,24.59,0,0,0,1.48,2.28,1.89,1.89,0,0,0,2.17.86c1-.34,1-1.25.93-2.07-.22-3-1.5-5.84-2-8.81-.16-1-1.54-2.19-.19-3,1.16-.69,2.25.4,3.2,1.16a8,8,0,0,1,3.1,6.51,28.75,28.75,0,0,0,.08,3.17c.12,1.07.44,2.13,1.72,2.38s1.76-.56,2.36-1.38a16.54,16.54,0,0,0,2-5A8.69,8.69,0,0,1,237.7,66a23.48,23.48,0,0,1,.58,9.07c-.07.61-.92,1.26-.09,1.82a2.77,2.77,0,0,0,2.2.08,2.16,2.16,0,0,0,.41-.18c1.06-.49,2.08-1.9,3.16-1.33s.73,2.34,1,3.56c.38,2.15.48,4.35.65,6.53s-.86,3.22-3,3.36a24.42,24.42,0,0,0-3.57.57,1.3,1.3,0,0,0-1.05,1.07c-.07.44.28.64.58.88s1.65-.11,1.32,1.06a2.23,2.23,0,0,1-2.1,1.79c-1.36.05-2.72,0-4.08,0a9.76,9.76,0,0,0-3.13.4c-1.21.4-2.1,1.09-1.82,2.45s1.43,1.68,2.63,1.64c1.47,0,2.7-.92,4.06-1.36,3.08-1,7.52,1.78,7.88,4.92s-1.59,4.54-4.51,3.38a14.07,14.07,0,0,0-11.43.32,4.94,4.94,0,0,0-3.15,4c4.06-2.58,8.16-4.47,13.14-2.38-1.61,1.92-3.26,2.7-5.46,1.46a7,7,0,0,0-1.5-.5,1.62,1.62,0,0,0-1.94.8c-.52.84.07,1.42.65,1.94a5,5,0,0,0,4.9.9c.8-.21,1.58-.5,2.36-.76Zm-18.44-8.36c-2.89,1.61-4.87-.35-4.58-4.16.21-2.69,1.42-3.64,3.7-3a3.27,3.27,0,0,1,2.11,2.46c.16.45.41,1.38,1.19.6a2.51,2.51,0,0,0,.76-2.69c-.47-1.32-3.41-2.9-4.85-2.61-1.25.26-2.49.6-3.74.86A2.18,2.18,0,0,0,211,96.36c-.93,2.7-.13,5.29,1,7.62a4.5,4.5,0,0,0,6,2.09c1.27-.75,1.5-2.21,2.27-3.29s-1.42-.68-1.44-1.71a3.76,3.76,0,0,0-.22-1.1,3.59,3.59,0,0,0-1.9-2.14c-1.59-.77-2.44-.25-2.5,1.51C214.09,101.63,214.85,102.43,218.13,103.32Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M142.41,385.28a322.84,322.84,0,0,0,12.9,30.87,3.51,3.51,0,0,0,1.62,1.53,13.2,13.2,0,0,0,5.83,1.68c7,.23,13.87-.22,20.52-2.61,1.11-.4,2.27-.93,3.26.41,1.13,1.54.94,2.16-1,2.47-3,.49-5.94.88-8.88,1.49-1.76.36-3.45,1.11-5.19,1.58a6.14,6.14,0,0,1-3.11.42c-.68-.16-1.4-.36-1.78.46a1.57,1.57,0,0,0,.48,2.05c4,2,6.89,6,11.74,6.31,3.37.24,6.37,1.74,9.5,2.81.41.14.86.33.8.93-.11,1.25-3.37,3.82-4.67,3.56a73.39,73.39,0,0,1-17.15-5.66,17.87,17.87,0,0,0-15.85-.11,58.71,58.71,0,0,0-12.2,6.71c-.33.25-.79.62-1.2.24s0-.82.09-1.25c.68-4.72,2.78-9,4.18-13.49a11,11,0,0,0-.27-6.69c-1.61-4.84-2.63-9.82-4.37-14.66-1.85-5.11-4.5-10-5.35-15.49.5-.14,1.21-.13,1.46-.46C136,385.46,139.33,385.7,142.41,385.28Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M238.76,59.77c3,.08,5.5,2.77,5.67,6.37.08,1.64-.21,2.92,2.32,3.05,1.49.08,3,1.81,3.35,3.61a56.88,56.88,0,0,1,1.3,16.42c-.19,2.49-2.47,3.67-4.17,5.07-.84.69-.93,1-.16,1.67,1.83,1.48,2,3.47,2.2,5.66.54,5-1.22,8.35-5.66,10.7-1.43.76-1.22,2.9-1.25,4.5-.05,3.4.17,6.81-1,10.1a11.9,11.9,0,0,1-2.58,5,3.6,3.6,0,0,0-.77,4.38c2.47,4,2.65,8.62,3.37,13a21.21,21.21,0,0,0,2.9,7,9.06,9.06,0,0,1,1.23,2.66c-2.8,2.53-4.32,2.16-5.47-1.33-1.59-4.82-2.13-9.85-2.77-14.85-.16-1.2-.1-2.53-.78-3.49-2.72-3.87-1.5-7.59.25-11.29,1.09-2.31,2.6-4.41,3.26-6.94.8-3.06.11-6-.58-8.92-.5-2.1.12-3.3,2.14-3.62a5.58,5.58,0,0,0,5.14-4.91c.45-2.55-1.09-5.3-3.76-6.93-2.48-1.5-2.48-1.5-.17-3.35a12.18,12.18,0,0,1,1.76-1.42c3.74-2,4.66-4.94,3.63-8.92a39.31,39.31,0,0,1-.86-10.56c0-1,0-2.12-1-2.55s-1.75.59-2.45,1.23-1.41,1.34-2.28,2.16C240.62,68.74,241.16,63.92,238.76,59.77Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M199.61,92.43a2.38,2.38,0,0,1,1.1-2.55c3.39-2.19,2.92-5.55,2.46-8.7a48.43,48.43,0,0,1-.26-7.43c0-1.86,3-4.43,5-4.31,1.72.1,2.19-.47,2.15-2.16-.09-3.5,1.69-5.32,5.16-5.14,2.11.1,3-.39,2.81-2.68-.13-1.61,2.7-4.12,4.32-4.27,4.14-.37,8,0,10.67,3.78.82,1.17,2,.67,3.09.92a47.06,47.06,0,0,0-1.93,7.74c-.55-1.07-.89-1.66-1.15-2.28-2-4.7-6.21-6.33-10.63-7.63-1.17-.34-1.86.27-1.93,1.54s.61,2.31,1,3.43c.47,1.3,1.63,2.79.4,4s-2.8.06-4.12-.6c-.74-.37-1.41-.9-2.18-1.19-1.18-.45-2.53-1.16-3.6,0s-.42,2.42.18,3.56c1,1.85,2,3.65,3.24,5.85-1.86-.59-3.31-1.13-4.8-1.5q-4.52-1.12-4.57,3.47a33.16,33.16,0,0,0,1.48,10.92c.33,1,.28,1.42-.75,1.86C204.33,90.08,202,91.29,199.61,92.43Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M178.76,154.64a17.38,17.38,0,0,1,1.88-9.2c.51-1.06,1-2.14-.3-3-3.55-2.42-3.06-6.29-2.08-9.21,1.68-5,2.63-10.24,4.68-15.11a36.48,36.48,0,0,1,5.59-8.9c2-2.4,3.85-4.86,5.78-7.3.83.56,2.42.17,2.56,1.35s-1.34,1.66-2.17,2.38c-1.14,1-2.92,1.68-1.61,3.76.37.59-.26,1-.61,1.31-3,2.89-4.82,6.5-6.39,10.29-2.38,5.76-5.29,11.34-5.58,17.75,0,.79-.65,1.65.31,2.25a2.36,2.36,0,0,0,2.58,0c.39-.23.78-.46,1.19-.65s.86-.47,1.25-.12.13.84,0,1.27c-1.15,4.36-1.85,8.85-3.59,13a1.42,1.42,0,0,1-.09.21c-.48.77.48,2.43-.8,2.39A3.29,3.29,0,0,1,178.76,154.64Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M166.46,416.07c-2.35.41-4.36-1-6.58-1.25-1.2-.16-1.81-1.22-2.55-2.09-3.07-3.68-4.12-8.34-6.17-12.51a1.32,1.32,0,0,1,.1-1.68c.55-.47,1.13-.1,1.68.14,2.54,1.16,5.08,2.29,7.6,3.48a6.61,6.61,0,0,0,5.47.26,24.67,24.67,0,0,1,6.39-1.33c1.29-.14,1.88.32,1.83,1.58s-.37,2.09-1.89,1.84a11.25,11.25,0,0,0-5.15.18c-1.05.32-2.81.33-2.79,1.43a4.44,4.44,0,0,0,1.66,3.69,15.41,15.41,0,0,1,3.8,3.82c.39.53,1.09,1,.68,1.76s-1.14.66-1.82.68S167.22,416.07,166.46,416.07Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M192.36,169.59c5.48.33,10.91,1.38,16.45,1,8.05-.56,15.94-2.2,23.89-3.42a40.88,40.88,0,0,0,9-2.21,6.75,6.75,0,0,1,2-.33c.68,0,1.41,0,1.75.72a1.88,1.88,0,0,1-.47,2.09A5.5,5.5,0,0,1,242,169c-9.58,2.34-19.18,4.63-29.12,4.75-2.32-.18-4.66-.19-6.94-.58C201.31,172.43,196.65,171.68,192.36,169.59Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M192.36,169.59c4.29,2.09,9,2.84,13.59,3.63,2.28.39,4.62.4,6.94.58a3.26,3.26,0,0,1-2.19.34c-4.68,0-9.36-.09-14,.12a32.78,32.78,0,0,1-11.5-2c-1-.32-2.46-.52-2.28-2s1.69-1.3,2.56-1.32A25.77,25.77,0,0,1,192.36,169.59Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M122.07,403.38c2.58-2.22,6.09-2.52,8.47-4.85a.78.78,0,0,1,1.34.16c.6,1.15,1.22,2.45.39,3.63C130.59,404.7,124.49,405.31,122.07,403.38Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-4\" d=\"M142.41,385.28c-3.08.41-6.38.18-8.6,3.1-.25.33-1,.31-1.46.46-1.27-2.33-1.16-2.65,1.27-3.6,1.82-.72,3.34-2.06,5.29-2.54C141.31,382.1,142.13,382.68,142.41,385.28Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M188.54,440.75c1.25-3.28,2.82-3.63,4.95-1,.75.92,2.64,1.72,1.82,2.91-.63.92-2.09-.52-3.19-.86-.64-.2-1.25-.51-1.88-.74S189,441.2,188.54,440.75Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M134.33,447.88a9.23,9.23,0,0,1,.51-4.62c.19-.43.22-1.24.9-1.06a5.19,5.19,0,0,1,1.92,1.1c.58.49,0,.94-.3,1.33a10,10,0,0,1-3.05,3.23Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M177.38,401.31c.33-.67-.62-2,.7-1.9s2.95,1.1,3.07,2.22c.1.92-1.78,1.89-2.88,1.94C176.72,403.64,177.93,402,177.38,401.31Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M115.39,411.48a6.32,6.32,0,0,1,2.75-4.76,1,1,0,0,1,1.43,0,.86.86,0,0,1-.09,1.37C118.07,409.08,117.19,410.67,115.39,411.48Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-3\" d=\"M191.35,414.39c.66.12,1.56,0,1.31.89-.31,1.07-1,2.15-2.32,2.08-1-.05-2-.9-1.75-1.7C188.92,414.44,190.45,414.78,191.35,414.39Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M196.69,98.93c-.07-1.22-.49-2.53.93-3.33l3.79.91Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-5\" d=\"M236.35,111.46l.34-.14-.12.36Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-1\" d=\"M58.55,290.33c1.84.36,3.55-.57,5.39-.45,2.61.17,3.15.63,3.2,3.24a9.35,9.35,0,0,0,.1,1.81c.19.86.4,1.59,1.64.84,2.71-1.64,5.21-1,7.79.67,3.61,2.39,5.33,6.06,7.25,9.65.21.4.35.84.54,1.24,1.83,3.86,3.58,4.5,6.76,1.67,4.15-3.69,7-2.27,9.5,3.29,1.28,2.79,1.61,6,2.93,8.77,2.47,5.15,4.11,10.71,7.4,15.47,2,2.87,3.16,2.8,4.83-.26a87.14,87.14,0,0,1,34.68-34.82c5.9-3.31,12.31-5.32,18.49-7.91,10.48-4.39,19.21-10.77,24.25-21.34,4.91-10.32,5.86-20.93,2.34-31.88-.19-.6-.73-1.2-.23-2a6.55,6.55,0,0,1,4.55,5.38c1,8.59,1,17.18-1.35,25.58-2.83,10-9.73,16.63-18.24,21.89-5.76,3.56-12.13,5.67-18.45,8a69.75,69.75,0,0,0-34.84,27c-2.79,4.12-6.64,7.43-9.23,11.72a21.86,21.86,0,0,0-1.16,1.93c-1,2.11-2.49,2.6-4.25,1.08-3-2.63-5.62-5.57-7-9.52a39.79,39.79,0,0,0-3.66-7.75c-1.62-2.66-2.23-5.57-2.91-8.5a12.46,12.46,0,0,0-.89-2.79c-1.37-2.73-4-3.25-6.38-1.3-5,4.18-5.06,4.14-8.24-1.57a47.9,47.9,0,0,0-4-6c-3-3.91-6.81-4.65-11.25-2.43a31,31,0,0,1-3.74,1.59,1.62,1.62,0,0,1-2-.54,1.7,1.7,0,0,1,.18-1.92c.49-.76,1.06-1.47,1.56-2.22A4.1,4.1,0,0,0,61,291.28a3.77,3.77,0,0,1-2.5-.86Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-1\" d=\"M58.47,290.42c-1.82-.61-2.34-1.89-1.54-4.06a16.85,16.85,0,0,1,2.46-4.31c5.18-6.86,10.39-13.7,15.54-20.59,2.35-3.14,4.53-6.4,6.86-9.54,3.05-4.1,7.13-7.1,11.05-10.3,5.37-4.38,10.42-9.17,15.9-13.41,10.89-8.43,22.86-14.62,36.78-16.26a13.1,13.1,0,0,1,5.4.21c.64.2,1.42.25,1.5,1.12s-.62,1-1.12,1.29a42.64,42.64,0,0,1-8.94,3.15c-6.9,1.89-13.83,3.66-20.52,6.23a55.3,55.3,0,0,0-17.36,11.25c-6.74,6.16-13.5,12.33-19.84,18.9a93.55,93.55,0,0,0-13.3,18.16A58.46,58.46,0,0,1,62.54,284c-1.76,1.78-3.8,3.53-4,6.36Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-1\" d=\"M166,105.39c-1.35-2.74-1-5.61-.18-8.31a75.09,75.09,0,0,1,7.6-17.35c2.75-4.55,7.12-7.26,12-9.11a9.62,9.62,0,0,1,2.44-.43c1.34-.13,2.76,0,3.28,1.4s-1.07,1.72-1.83,2.44c-4.46,4.27-9,8.52-13.39,12.82a10.26,10.26,0,0,0-2.23,3.38c-2,4.71-4.89,9-6.55,13.89A1.62,1.62,0,0,1,166,105.39Zm0-3.32c1.16-.7,1.1-1.56,1.38-2.22C171,91.5,175,83.41,182.46,77.62c2-1.52,3.61-3.43,5.77-4.73.36-.22.86-.47.65-1s-.75-.4-1.16-.31a8.11,8.11,0,0,0-1.73.52,26.73,26.73,0,0,0-10.37,8.19c-4,5.3-6.32,11.46-8.78,17.53A23.84,23.84,0,0,0,166,102.07Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-1\" d=\"M218.13,103.32c-3.27-.89-4-1.69-4-4,.06-1.77.91-2.28,2.5-1.51a3.59,3.59,0,0,1,1.9,2.14,3.76,3.76,0,0,1,.22,1.1c0,1,2.29.52,1.44,1.71s-1,2.54-2.27,3.29a4.5,4.5,0,0,1-6-2.09c-1.11-2.33-1.91-4.92-1-7.62a2.18,2.18,0,0,1,1.73-1.59c1.25-.26,2.49-.6,3.74-.86,1.44-.3,4.38,1.28,4.85,2.61a2.51,2.51,0,0,1-.76,2.69c-.78.79-1-.14-1.19-.6a3.27,3.27,0,0,0-2.11-2.46c-2.28-.64-3.5.31-3.7,3C213.26,103,215.24,104.93,218.13,103.32Z\" transform=\"translate(-8.4 -6.65)\"/><path class=\"cls-2\" d=\"M166,102.07a23.84,23.84,0,0,1,.84-4.29c2.46-6.07,4.78-12.23,8.78-17.53A26.73,26.73,0,0,1,186,72.06a8.11,8.11,0,0,1,1.73-.52c.41-.09.94-.27,1.16.31s-.29.82-.65,1c-2.16,1.29-3.81,3.2-5.77,4.73C175,83.41,171,91.5,167.39,99.85,167.1,100.51,167.16,101.37,166,102.07Z\" transform=\"translate(-8.4 -6.65)\"/></svg>\n\n\t</div>\n\n    <style>\n\n    \t@import url('https://fonts.googleapis.com/css?family=Roboto');\n    \t@import url('https://fonts.googleapis.com/css?family=Arvo');\n\n    \t/**\n    \t* The links to other pages\n    \t*/\n    \t.header\n    \t{\n\t\t\tpadding-top: 25px;\n\t\t\ttext-align: center;\n\t\t\twidth: 19.7%;\n    \t\tdisplay: inline-block;\n    \t}\n    \t.headerLink\n    \t{\n    \t\tfont-family: Roboto;\n    \t\tcolor: #231F20;\n    \t}\n    \t#headerHomepage\n    \t{\n    \t\tfont-family: Arvo;\n    \t\tcolor: #C49542;\n    \t\tfont-weight: bold;\n    \t}\n\n    \t/**\n    \t* The website logo\n    \t*/\n    \t#headerPic\n    \t{\n    \t\tpadding-top: 30px;\n    \t\ttext-align: center;\n    \t}\n    \t#Layer_1\n    \t{\n    \t\theight: 175px;\n    \t}\n\n    </style>\n\n\t</nav>";
};

},{}],20:[function(require,module,exports){
"use strict";

/**
* Project: Future Days Farm Website
* Created By: Chris Baron
* Date Last Modified: 1/19/2018 by Alex Cadigan
* Description: This file builds the body of the page (the main content)
*/

module.exports = function (_ref) {
	var model = _ref.model;

	return "<div>\n\n\t<div id = \"homeTitle\">\n\n\t\tWelcome Headline\n\n\t</div>\n\n\t<div id = \"homeSubtitle\">\n\n\t\tALLEGAN COUNTY, MICHIGAN\n\n\t</div>\n\n\t<br>\n\n\t<div id = \"homeParagraph\">\n\n\t\tPraesent laoreet ornare ligula, ac accumsan turpis sagittis at.\n\t\tInteger auctor egestas eleifend. Etiam luctus mattis justo, vitae\n\t\tfermentum libero euismod lacinia. Proin at consequat risus.\n\t\tPraesent sollicitudin vestibulum felis, ut sodales enim.\n\n\t</div>\n\n\t<br>\n\n\t<div id = \"homePic1\">\n\n\t\t<img src = /static/img/" + "Jam.jpg" + " alt = \"Jam.jpg\" height = \"300\" width = \"300\">\n\n\t</div>\n\n\t<div id = \"homePic2\">\n\n\t\t<img src = /static/img/" + "Beets.jpg" + " alt = \"Beets.jpg\">\n\n\t</div>\n\n\t<div id = \"homePic3\">\n\n\t\t<img src = /static/img/" + "Squash.jpg" + " alt = \"Squash.jpg\">\n\n\t</div>\n\n\t<br>\n\n\t<div id = \"homePic4\">\n\n\n\n\t</div>\n\n\t<div id = \"homePic5\">\n\n\n\n\t</div>\n\n\t<div id = \"homePic6\">\n\n\n\n\t</div>\n\n\n\n\t<style>\n\n\t\t@import url('https://fonts.googleapis.com/css?family=Roboto');\n        @import url('https://fonts.googleapis.com/css?family=Arvo');\n\n\t\t#homeTitle\n\t\t{\n\t\t\ttext-align: center;\n\t\t\tfont-size: 32px;\n\t\t\tfont-family: Arvo;\n\t\t\tcolor: #231F20;\n\t\t\tpadding-top: 30px;\n\t\t}\n\n\t\t#homeSubtitle\n\t\t{\n\t\t\ttext-align: center;\n\t\t\tfont-family: Roboto;\n\t\t\tcolor: #231F20;\n\t\t}\n\n\t\t#homeParagraph\n\t\t{\n\t\t\ttext-align: center;\n\t\t\tfont-family: Roboto;\n\t\t\tcolor: #231F20;\n\t\t\tmargin-right: 30%;\n\t\t\tmargin-left: 30%;\n\t\t}\n\n\t\t#homePic1\n\t\t{\n\t\t\tdisplay: inline-block;\n\t\t\t\n\t\t}\n\t\t#homePic2\n\t\t{\n\t\t\tdisplay: inline-block;\n\t\t\t\n\t\t}\n\t\t#homePic3\n\t\t{\n\t\t\tdisplay: inline-block;\n\t\t\t\n\t\t}\n\n\t</style>\n\t\n\t</div>";
};

},{}],21:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = Object.assign({}, require('./MyObject'), {
    CreateDefault: function CreateDefault() {
        return this.reducer(this.attributes, function (attr) {
            return _defineProperty({}, attr.name, typeof attr.default === 'function' ? attr.default() : attr.default);
        });
    },


    attributes: [],

    data: {},

    constructor: function constructor() {
        var _this = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        Object.assign(this, { store: {}, data: data }, opts);

        if (this.storeBy) {
            this.storeBy.forEach(function (key) {
                return _this.store[key] = {};
            });
            this._store();
        }

        return this;
    },


    meta: {},

    sort: function sort(opts) {
        var attr = Object.keys(opts)[0],
            value = opts[attr];

        this.data.sort(function (a, b) {
            return value ? a[attr] < b[attr] ? -1 : 1 : b[attr] < a[attr] ? -1 : 1;
        });

        return this;
    },
    _resetStore: function _resetStore(storeBy) {
        var _this2 = this;

        this.store = {};
        storeBy.forEach(function (attr) {
            return _this2.store[attr] = {};
        });
        this.storeBy = storeBy;
    },
    _store: function _store(data) {
        var _this3 = this;

        data = data || this.data;
        data.forEach(function (datum) {
            return _this3.storeBy.forEach(function (attr) {
                return _this3._storeAttr(datum, attr);
            });
        });
    },
    _storeAttr: function _storeAttr(datum, attr) {
        this.store[attr][datum[attr]] = this.store[attr][datum[attr]] ? Array.isArray(this.store[attr][datum[attr]]) ? this.store[attr][datum[attr]].concat(datum) : [this.store[attr][datum[attr]], datum] : datum;
    },
    _storeOne: function _storeOne(datum) {
        var _this4 = this;

        this.storeBy.forEach(function (attr) {
            return _this4._storeAttr(datum, attr);
        });
    }
});

},{"./MyObject":23}],22:[function(require,module,exports){
"use strict";

module.exports = function (err) {
  console.log(err.stack || err);
};

},{}],23:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {

    capitalizeFirstLetter: function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getIntRange: function getIntRange(int) {
        return Array.from(Array(int).keys());
    },
    getRandomInclusiveInteger: function getRandomInclusiveInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    omit: function omit(obj, keys) {
        return Object.keys(obj).filter(function (key) {
            return !keys.includes(key);
        }).reduce(function (memo, key) {
            return Object.assign(memo, _defineProperty({}, key, obj[key]));
        }, {});
    },
    pick: function pick(obj, keys) {
        return keys.reduce(function (memo, key) {
            return Object.assign(memo, _defineProperty({}, key, obj[key]));
        }, {});
    },
    reducer: function reducer(arr, fn) {
        return arr.reduce(function (memo, item, i) {
            return Object.assign(memo, fn(item, i));
        }, {});
    },
    shuffleArray: function shuffleArray(arr) {
        var _this = this;

        var rv = Array.from(arr);

        rv.forEach(function (item, i) {
            if (i === rv.length - 1) return;
            var int = _this.getRandomInclusiveInteger(i, rv.length - 1),
                holder = rv[i];

            rv[i] = rv[int];
            rv[int] = holder;
        });

        return rv;
    },


    Error: require('./MyError'),

    P: function P(fun) {
        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var thisArg = arguments[2];
        return new Promise(function (resolve, reject) {
            return Reflect.apply(fun, thisArg || undefined, args.concat(function (e) {
                for (var _len = arguments.length, callback = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    callback[_key - 1] = arguments[_key];
                }

                return e ? reject(e) : resolve(callback);
            }));
        });
    },

    constructor: function constructor() {
        return this;
    }
};

},{"./MyError":22}],24:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],25:[function(require,module,exports){
/* smoothscroll v0.4.0 - 2017 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  /*
   * aliases
   * w: window global object
   * d: document
   */
  var w = window;
  var d = document;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

   // polyfill
  function polyfill() {
    // return if scroll behavior is supported and polyfill is not forced
    if ('scrollBehavior' in d.documentElement.style
      && w.__forceSmoothScrollPolyfill__ !== true) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now = w.performance && w.performance.now
      ? w.performance.now.bind(w.performance)
      : Date.now;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (firstArg === null
        || typeof firstArg !== 'object'
        || firstArg.behavior === undefined
        || firstArg.behavior === 'auto'
        || firstArg.behavior === 'instant') {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions '
        + firstArg.behavior
        + ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return (el.clientHeight + ROUNDING_TOLERANCE) < el.scrollHeight;
      }

      if (axis === 'X') {
        return (el.clientWidth + ROUNDING_TOLERANCE) < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;

      do {
        el = el.parentNode;

        isBody = el === d.body;
      } while (isBody === false && isScrollable(el) === false);

      isBody = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : (w.scrollX || w.pageXOffset),
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : (w.scrollY || w.pageYOffset)
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : (w.scrollX || w.pageXOffset),
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : (w.scrollY || w.pageYOffset)
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
             ? arguments[1]
             : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value couldn\'t be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object'
              ? ~~arguments[0]
              : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined
              ? ~~arguments[1]
              : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined
            ? true
            : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (typeof exports === 'object') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }

}());

},{}],26:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('../../../client/js/views/__proto__'), {

    ToastMessage: require('./ToastMessage'),

    name: 'Toast',

    postRender: function postRender() {
        this.messages = {};

        return this;
    },


    requiresLogin: false,

    createMessage: function createMessage(type, message) {
        if (!this.messages[message]) this.messages[message] = Object.create(this.ToastMessage, {
            insertion: { value: { el: this.els.container } }
        }).constructor();

        return this.messages[message].showMessage(type, message);
    },


    template: require('./templates/Toast')

}), {});

},{"../../../client/js/views/__proto__":16,"./ToastMessage":27,"./templates/Toast":28}],27:[function(require,module,exports){
module.exports = Object.assign( {}, require('../../../client/js/views/__proto__'), {

    name: 'ToastMessage',

    Icons: {
        error: require('./templates/lib/error')(),
        success: require('./templates/lib/checkmark')()
    },

    postRender() {

        this.on( 'shown', () => this.status = 'shown' )
        this.on( 'hidden', () => this.status = 'hidden' )

        return this
    },

    requiresLogin: false,

    showMessage( type, message ) {
        return new Promise( ( resolve, reject )  => {
            if( /show/.test( this.status ) ) this.teardown()

            this.resolution = resolve

            if( type !== 'error' ) this.els.container.classList.add('success')

            this.els.message.textContent = message
            this.els.title.textContent = type === 'error' ? 'Error' : 'Success'
            this.slurpTemplate( { insertion: { el: this.els.icon }, template: type === 'error' ? this.Icons.error : this.Icons.success } )
            
            this.status = 'showing'

            this.show( true )
            .then( () => this.hide( true ) )
            .then( () => this.teardown() )
            .catch( reject )
        } )
    },

    teardown() {
        if( this.els.container.classList.contains('success') ) this.els.container.classList.remove('success')
        this.els.message.textContent = ''
        this.els.message.title = ''
        if( this.els.icon.firstChild ) this.els.icon.removeChild( this.els.icon.firstChild )
        this.resolution()
    },

    template: require('./templates/ToastMessage')

} )

},{"../../../client/js/views/__proto__":16,"./templates/ToastMessage":29,"./templates/lib/checkmark":30,"./templates/lib/error":31}],28:[function(require,module,exports){
module.exports = () => `<div></div>`

},{}],29:[function(require,module,exports){
module.exports = () => 
`<div class="hidden">
    <div data-js="icon"></div>
    <div>
        <div data-js="title"></div>
        <div data-js="message"></div>
    </div>
</div>`
},{}],30:[function(require,module,exports){
module.exports = (p={}) => `<svg version="1.1" data-js="${p.name || 'checkmark'}" class="checkmark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="97.619px" height="97.618px" viewBox="0 0 97.619 97.618" style="enable-background:new 0 0 97.619 97.618;"
	 xml:space="preserve">
<g>
	<path d="M96.939,17.358L83.968,5.959c-0.398-0.352-0.927-0.531-1.449-0.494C81.99,5.5,81.496,5.743,81.146,6.142L34.1,59.688
		L17.372,37.547c-0.319-0.422-0.794-0.701-1.319-0.773c-0.524-0.078-1.059,0.064-1.481,0.385L0.794,47.567
		c-0.881,0.666-1.056,1.92-0.39,2.801l30.974,40.996c0.362,0.479,0.922,0.771,1.522,0.793c0.024,0,0.049,0,0.073,0
		c0.574,0,1.122-0.246,1.503-0.68l62.644-71.297C97.85,19.351,97.769,18.086,96.939,17.358z"/>
</g></svg>`

},{}],31:[function(require,module,exports){
module.exports = (p={}) => `<svg version="1.1" data-js="${p.name || 'error'}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18.978 18.978" style="enable-background:new 0 0 18.978 18.978;" xml:space="preserve">
<g>
    <path d="M16.088,1.675c-0.133-0.104-0.306-0.144-0.47-0.105c-0.013,0.002-1.261,0.29-2.594,0.29
        c-1.788,0-2.789-0.476-2.975-1.415C9.999,0.191,9.779,0.007,9.521,0c-0.257-0.007-0.487,0.167-0.55,0.418
        C8.727,1.386,7.71,1.877,5.95,1.877c-1.332,0-2.571-0.302-2.583-0.305c-0.166-0.04-0.34-0.004-0.474,0.102
        C2.76,1.777,2.681,1.938,2.681,2.108v4.869c0,0.04,0.004,0.078,0.013,0.115c0.057,1.647,0.65,8.714,6.528,11.822
        c0.08,0.043,0.169,0.064,0.258,0.064c0.092,0,0.183-0.021,0.266-0.066c5.74-3.137,6.445-10.115,6.532-11.791
        c0.012-0.046,0.019-0.094,0.019-0.144V2.108C16.297,1.939,16.219,1.78,16.088,1.675z M15.19,6.857
        c-0.007,0.031-0.012,0.064-0.013,0.097c-0.053,1.298-0.574,7.832-5.701,10.838c-5.215-2.965-5.646-9.526-5.68-10.83
        c0-0.029-0.004-0.058-0.009-0.085V2.784C4.322,2.877,5.112,2.982,5.95,2.982c1.911,0,2.965-0.54,3.537-1.208
        c0.553,0.661,1.599,1.191,3.536,1.191c0.839,0,1.631-0.101,2.166-0.188L15.19,6.857L15.19,6.857z"/>
    <polygon points="10.241,11.237 10.529,5.311 8.449,5.311 8.75,11.237 		"/>
    <path d="M9.496,11.891c-0.694,0-1.178,0.498-1.178,1.189c0,0.682,0.471,1.191,1.178,1.191
        c0.706,0,1.164-0.51,1.164-1.191C10.647,12.389,10.189,11.891,9.496,11.891z"/>
</g></svg>`

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvanMvLk1vZGVsTWFwLmpzIiwiY2xpZW50L2pzLy5UZW1wbGF0ZU1hcC5qcyIsImNsaWVudC9qcy8uVmlld01hcC5qcyIsImNsaWVudC9qcy9UZW1wbGF0ZUNvbnRleHQuanMiLCJjbGllbnQvanMvWGhyLmpzIiwiY2xpZW50L2pzL2ZhY3RvcnkvVmlldy5qcyIsImNsaWVudC9qcy9tYWluLmpzIiwiY2xpZW50L2pzL21vZGVscy9IZWFkZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL1VzZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL19fcHJvdG9fXy5qcyIsImNsaWVudC9qcy9wb2x5ZmlsbC5qcyIsImNsaWVudC9qcy9yb3V0ZXIuanMiLCJjbGllbnQvanMvdmlld3MvRm9vdGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL0hlYWRlci5qcyIsImNsaWVudC9qcy92aWV3cy9Ib21lLmpzIiwiY2xpZW50L2pzL3ZpZXdzL19fcHJvdG9fXy5qcyIsImNsaWVudC9qcy92aWV3cy9saWIvT3B0aW1pemVkUmVzaXplLmpzIiwiY2xpZW50L2pzL3ZpZXdzL3RlbXBsYXRlcy9Gb290ZXIuanMiLCJjbGllbnQvanMvdmlld3MvdGVtcGxhdGVzL0hlYWRlci5qcyIsImNsaWVudC9qcy92aWV3cy90ZW1wbGF0ZXMvSG9tZS5qcyIsImxpYi9Nb2RlbC5qcyIsImxpYi9NeUVycm9yLmpzIiwibGliL015T2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvc21vb3Roc2Nyb2xsLXBvbHlmaWxsL2Rpc3Qvc21vb3Roc2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL3RvYXN0L3ZpZXdzL1RvYXN0LmpzIiwibm9kZV9tb2R1bGVzL3RvYXN0L3ZpZXdzL1RvYXN0TWVzc2FnZS5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy90ZW1wbGF0ZXMvVG9hc3QuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL1RvYXN0TWVzc2FnZS5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy90ZW1wbGF0ZXMvbGliL2NoZWNrbWFyay5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy90ZW1wbGF0ZXMvbGliL2Vycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxPQUFPLE9BQVAsR0FBZTtBQUNiLFNBQVEsUUFBUSxpQkFBUixDQURLO0FBRWQsT0FBTSxRQUFRLGVBQVI7QUFGUSxDQUFmOzs7OztBQ0FBLE9BQU8sT0FBUCxHQUFlO0FBQ2IsU0FBUSxRQUFRLDBCQUFSLENBREs7QUFFZCxTQUFRLFFBQVEsMEJBQVIsQ0FGTTtBQUdkLE9BQU0sUUFBUSx3QkFBUixDQUhRO0FBSWQsUUFBTyxRQUFRLHlCQUFSO0FBSk8sQ0FBZjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBZTtBQUNiLFNBQVEsUUFBUSxnQkFBUixDQURLO0FBRWQsU0FBUSxRQUFRLGdCQUFSLENBRk07QUFHZCxPQUFNLFFBQVEsY0FBUixDQUhRO0FBSWQsUUFBTyxRQUFRLGVBQVI7QUFKTyxDQUFmOzs7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCOztBQUViLDJCQUF1QjtBQUFBLGVBQVUsT0FBTyxNQUFQLENBQWMsQ0FBZCxFQUFpQixXQUFqQixLQUFpQyxPQUFPLEtBQVAsQ0FBYSxDQUFiLENBQTNDO0FBQUEsS0FGVjs7QUFJYixjQUFVLElBQUksS0FBSyxZQUFULENBQXVCLE9BQXZCLEVBQWdDO0FBQ3hDLGVBQU8sVUFEaUM7QUFFeEMsa0JBQVUsS0FGOEI7QUFHeEMsK0JBQXVCO0FBSGlCLEtBQWhDLENBSkc7O0FBVWIsZ0JBVmEsd0JBVUMsS0FWRCxFQVVRLEtBVlIsRUFVZSxJQVZmLEVBVXNCO0FBQy9CLFlBQU0sV0FBVyxNQUFNLEtBQU4sS0FBZ0IsTUFBaEIsSUFBMEIsUUFBTyxNQUFNLEtBQWIsTUFBdUIsUUFBbEU7O0FBRUEsWUFBTSxRQUFR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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hjQSxPQUFPLE9BQVAsR0FBaUIsT0FBTyxNQUFQLENBQWUsT0FBTyxNQUFQLENBQWUsRUFBZixFQUFtQixRQUFRLG9DQUFSLENBQW5CLEVBQWtFOztBQUU5RixrQkFBYyxRQUFRLGdCQUFSLENBRmdGOztBQUk5RixVQUFNLE9BSndGOztBQU05RixjQU44Rix3QkFNakY7QUFDVCxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRUEsZUFBTyxJQUFQO0FBQ0gsS0FWNkY7OztBQVk5RixtQkFBZSxLQVorRTs7QUFjOUYsaUJBZDhGLHlCQWMvRSxJQWQrRSxFQWN6RSxPQWR5RSxFQWMvRDtBQUMzQixZQUFJLENBQUMsS0FBSyxRQUFMLENBQWUsT0FBZixDQUFMLEVBQWdDLEtBQUssUUFBTCxDQUFlLE9BQWYsSUFBMkIsT0FBTyxNQUFQLENBQWUsS0FBSyxZQUFwQixFQUFrQztBQUN6Rix1QkFBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEtBQUssR0FBTCxDQUFTLFNBQWYsRUFBVDtBQUQ4RSxTQUFsQyxFQUV2RCxXQUZ1RCxFQUEzQjs7QUFJaEMsZUFBTyxLQUFLLFFBQUwsQ0FBZSxPQUFmLEVBQXlCLFdBQXpCLENBQXNDLElBQXRDLEVBQTRDLE9BQTVDLENBQVA7QUFFSCxLQXJCNkY7OztBQXVCOUYsY0FBVSxRQUFRLG1CQUFSOztBQXZCb0YsQ0FBbEUsQ0FBZixFQXlCWixFQXpCWSxDQUFqQjs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG5cdCBIZWFkZXI6IHJlcXVpcmUoJy4vbW9kZWxzL0hlYWRlcicpLFxuXHRVc2VyOiByZXF1aXJlKCcuL21vZGVscy9Vc2VyJykgXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuXHQgRm9vdGVyOiByZXF1aXJlKCcuL3ZpZXdzL3RlbXBsYXRlcy9Gb290ZXInKSxcblx0SGVhZGVyOiByZXF1aXJlKCcuL3ZpZXdzL3RlbXBsYXRlcy9IZWFkZXInKSxcblx0SG9tZTogcmVxdWlyZSgnLi92aWV3cy90ZW1wbGF0ZXMvSG9tZScpLFxuXHRUb2FzdDogcmVxdWlyZSgnLi92aWV3cy90ZW1wbGF0ZXMvVG9hc3QnKSBcbn0iLCJtb2R1bGUuZXhwb3J0cz17XG5cdCBGb290ZXI6IHJlcXVpcmUoJy4vdmlld3MvRm9vdGVyJyksXG5cdEhlYWRlcjogcmVxdWlyZSgnLi92aWV3cy9IZWFkZXInKSxcblx0SG9tZTogcmVxdWlyZSgnLi92aWV3cy9Ib21lJyksXG5cdFRvYXN0OiByZXF1aXJlKCcuL3ZpZXdzL1RvYXN0JykgXG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBDYXBpdGFsaXplRmlyc3RMZXR0ZXI6IHN0cmluZyA9PiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSksXG5cbiAgICBDdXJyZW5jeTogbmV3IEludGwuTnVtYmVyRm9ybWF0KCAnZW4tVVMnLCB7XG4gICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgIGN1cnJlbmN5OiAnVVNEJyxcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMlxuICAgIH0gKSxcblxuICAgIEdldEZvcm1GaWVsZCggZGF0dW0sIHZhbHVlLCBtZXRhICkge1xuICAgICAgICBjb25zdCBpc05lc3RlZCA9IGRhdHVtLnJhbmdlID09PSAnTGlzdCcgfHwgdHlwZW9mIGRhdHVtLnJhbmdlID09PSAnb2JqZWN0J1xuXG4gICAgICAgIGNvbnN0IGltYWdlID0gZGF0dW0ucmFuZ2UgPT09ICdJbWFnZVVybCdcbiAgICAgICAgICAgID8gYDxkaXY+PGJ1dHRvbiBjbGFzcz1cImJ0blwiIGRhdGEtanM9XCJwcmV2aWV3QnRuXCIgdHlwZT1cImJ1dHRvblwiPlByZXZpZXc8L2J1dHRvbj48aW1nIGRhdGEtc3JjPVwiJHt0aGlzLkltYWdlU3JjKCB2YWx1ZSApfVwiIC8+PC9kaXY+YFxuICAgICAgICAgICAgOiBgYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBkYXR1bS5yYW5nZSA9PT0gJ0Jvb2xlYW4nXG4gICAgICAgICAgICA/IFsgeyBsYWJlbDogJ1RydWUnLCBuYW1lOiAndHJ1ZScgfSwgeyBsYWJlbDogJ0ZhbHNlJywgbmFtZTogJ2ZhbHNlJyB9IF1cbiAgICAgICAgICAgIDogZGF0dW0ubWV0YWRhdGFcbiAgICAgICAgICAgICAgICA/IGRhdHVtLm1ldGFkYXRhLm9wdGlvbnMgOiBmYWxzZVxuXG4gICAgICAgIGNvbnN0IGljb24gPSBkYXR1bS5tZXRhZGF0YSAmJiBkYXR1bS5tZXRhZGF0YS5pY29uXG4gICAgICAgICAgICA/IHRoaXMuR2V0SWNvbiggZGF0dW0ubWV0YWRhdGEuaWNvbiApXG4gICAgICAgICAgICA6IG9wdGlvbnNcbiAgICAgICAgICAgICAgICA/IHRoaXMuR2V0SWNvbignY2FyZXQtZG93bicpXG4gICAgICAgICAgICAgICAgOiBgYFxuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gaXNOZXN0ZWQgfHwgKCBkYXR1bS5mayB8fCBkYXR1bS5sYWJlbCAmJiAhbWV0YS5ub0xhYmVsIClcbiAgICAgICAgICAgID8gYDxsYWJlbD4ke2RhdHVtLmZrIHx8IGRhdHVtLmxhYmVsfTwvbGFiZWw+YFxuICAgICAgICAgICAgOiBgYFxuXG4gICAgICAgIHZhbHVlID0gKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICkgPyAnJyA6IHZhbHVlXG5cbiAgICAgICAgaWYoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICBpZiggdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgKSB7IG9wdGlvbnMoKTsgcmV0dXJuIHRoaXMuR2V0U2VsZWN0KCBkYXR1bSwgdmFsdWUsIFsgXSwgaWNvbiwgbGFiZWwgKSB9XG4gICAgICAgICAgICBlbHNlIGlmKCBBcnJheS5pc0FycmF5KCBvcHRpb25zICkgKSByZXR1cm4gdGhpcy5HZXRTZWxlY3QoIGRhdHVtLCB2YWx1ZSwgb3B0aW9ucywgaWNvbiwgbGFiZWwgKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvbXB0ID0gZGF0dW0ucHJvbXB0ID8gYDxkaXYgY2xhc3M9XCJwcm9tcHRcIj4ke2RhdHVtLnByb21wdH08L2Rpdj5gIDogYGBcblxuICAgICAgICBjb25zdCBpbnB1dCA9IGRhdHVtLmZrXG4gICAgICAgICAgICA/IGA8ZGl2IGRhdGEtdmlldz1cInR5cGVBaGVhZFwiIGRhdGEtbmFtZT1cIiR7ZGF0dW0uZmt9XCI+PC9kaXY+YFxuICAgICAgICAgICAgOiBkYXR1bS5yYW5nZSA9PT0gJ1RleHQnXG4gICAgICAgICAgICAgICAgPyBgPHRleHRhcmVhIGRhdGEtanM9XCIke2RhdHVtLm5hbWV9XCIgcGxhY2Vob2xkZXI9XCIke2RhdHVtLmxhYmVsIHx8ICcnfVwiIHJvd3M9XCIzXCI+JHt2YWx1ZX08L3RleHRhcmVhPmBcbiAgICAgICAgICAgICAgICA6IGRhdHVtLnJhbmdlID09PSAnTGlzdCcgfHwgZGF0dW0ucmFuZ2UgPT09ICdWaWV3JyB8fCB0eXBlb2YgZGF0dW0ucmFuZ2UgPT09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgID8gYDxkaXYgZGF0YS1qcz1cIiR7ZGF0dW0ubmFtZX1cIiBkYXRhLW5hbWU9XCIke2RhdHVtLm5hbWV9XCI+PC9kaXY+YFxuICAgICAgICAgICAgICAgICAgICA6IGA8aW5wdXQgdHlwZT1cIiR7dGhpcy5SYW5nZVRvSW5wdXRUeXBlWyBkYXR1bS5yYW5nZSBdfVwiIGRhdGEtanM9XCIke2RhdHVtLm5hbWV9XCIgcGxhY2Vob2xkZXI9XCIke2RhdHVtLmxhYmVsIHx8ICcnfVwiIHZhbHVlPVwiJHt2YWx1ZX1cIiAvPmBcblxuICAgICAgICByZXR1cm4gYGAgK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgJHtpc05lc3RlZCA/ICduZXN0ZWQnIDogJyd9XCI+XG4gICAgICAgICAgICAke2xhYmVsfVxuICAgICAgICAgICAgJHtwcm9tcHR9XG4gICAgICAgICAgICAke2lucHV0fSBcbiAgICAgICAgICAgICR7aWNvbn1cbiAgICAgICAgPC9kaXY+YFxuICAgIH0sXG5cbiAgICBHZXRGb3JtRmllbGRzKCBkYXRhLCBtb2RlbD17fSwgbWV0YSApIHtcbiAgICAgICAgaWYoICFkYXRhICkgcmV0dXJuIGBgXG5cbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgICAgIC5maWx0ZXIoIGRhdHVtID0+IG1ldGFbIGRhdHVtLm5hbWUgXSAmJiBtZXRhWyBkYXR1bS5uYW1lIF0uaGlkZSA/IGZhbHNlIDogdHJ1ZSApXG4gICAgICAgICAgICAubWFwKCBkYXR1bSA9PiB0aGlzLkdldEZvcm1GaWVsZCggZGF0dW0sIG1vZGVsICYmIG1vZGVsWyBkYXR1bS5uYW1lIF0sIG1ldGEgKSApLmpvaW4oJycpXG4gICAgfSxcblxuICAgIEdldEljb24oIG5hbWUsIG9wdHM9eyBJY29uRGF0YUpzOiB0aGlzLkljb25EYXRhSnMgfSApIHsgcmV0dXJuIFJlZmxlY3QuYXBwbHkoIHRoaXMuSWNvbnNbIG5hbWUgXSwgdGhpcywgWyBvcHRzIF0gKSB9LFxuXG4gICAgR2V0TGlzdEl0ZW1zKCBpdGVtcz1bXSwgb3B0cz17fSApIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCggaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhdHRyID0gb3B0cy5kYXRhQXR0ciA/IGBkYXRhLSR7b3B0cy5kYXRhQXR0cn09XCIke2l0ZW1bIG9wdHMuZGF0YUF0dHIgXX1cImAgOiBgYFxuICAgICAgICAgICAgcmV0dXJuIGA8bGkgJHthdHRyfT4ke2l0ZW0ubGFiZWwgfHwgaXRlbX08L2xpPmAgXG4gICAgICAgIH0gKS5qb2luKCcnKVxuICAgIH0sXG5cbiAgICBHZXRTZWxlY3QoIGRhdHVtLCBzZWxlY3RlZFZhbHVlLCBvcHRpb25zRGF0YSwgaWNvbiwgbGFiZWw9YGAgKSB7XG4gICAgICAgIGlmKCB0eXBlb2Ygc2VsZWN0ZWRWYWx1ZSA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBzZWxlY3RlZFZhbHVlID09PSAnbnVtYmVyJyApIHNlbGVjdGVkVmFsdWUgPSBzZWxlY3RlZFZhbHVlLnRvU3RyaW5nKClcblxuICAgICAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uc0RhdGEubGVuZ3RoID8gdGhpcy5HZXRTZWxlY3RPcHRpb25zKCBvcHRpb25zRGF0YSwgc2VsZWN0ZWRWYWx1ZSwgeyB2YWx1ZUF0dHI6ICduYW1lJyB9ICkgOiBgYFxuXG4gICAgICAgIHJldHVybiBgYCArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgJHtsYWJlbH1cbiAgICAgICAgICAgIDxzZWxlY3QgZGF0YS1qcz1cIiR7ZGF0dW0ubmFtZX1cIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIGRpc2FibGVkICR7IXNlbGVjdGVkVmFsdWUgPyBgc2VsZWN0ZWRgIDogYGB9IHZhbHVlPiR7ZGF0dW0ubGFiZWx9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgJHtvcHRpb25zfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAke2ljb259XG4gICAgICAgIDwvZGl2PmBcbiAgICB9LFxuXG4gICAgR2V0U2VsZWN0T3B0aW9ucyggb3B0aW9ucz1bXSwgc2VsZWN0ZWRWYWx1ZSwgb3B0cz17IHZhbHVlQXR0cjogJ3ZhbHVlJyB9ICkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tYXAoIG9wdGlvbiA9PiBgPG9wdGlvbiAke3NlbGVjdGVkVmFsdWUgPT09IG9wdGlvblsgb3B0cy52YWx1ZUF0dHIgXSA/IGBzZWxlY3RlZGAgOiBgYH0gdmFsdWU9XCIke29wdGlvblsgb3B0cy52YWx1ZUF0dHIgXX1cIj4ke29wdGlvbi5sYWJlbH08L29wdGlvbj5gICkuam9pbignJylcbiAgICB9LFxuXG4gICAgLy9JY29uczogcmVxdWlyZSgnLi8uSWNvbk1hcCcpLFxuICAgIFxuICAgIEljb25EYXRhSnMoIHAgKSB7IHJldHVybiBwLm5hbWUgPyBgZGF0YS1qcz1cIiR7cC5uYW1lfVwiYCA6IGBgIH0sXG5cbiAgICBJbWFnZVNyYyggbmFtZSApIHsgcmV0dXJuIGBodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vbWVnYS1wb2V0cnktOTY2NS8ke25hbWV9YCB9LFxuXG4gICAgUmFuZ2UoIGludCApIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oIEFycmF5KCBpbnQgKS5rZXlzKCkgKVxuICAgIH0sXG5cbiAgICBSYW5nZVRvSW5wdXRUeXBlOiB7XG4gICAgICAgIEVtYWlsOiAnZW1haWwnLFxuICAgICAgICBQYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgU3RyaW5nOiAndGV4dCdcbiAgICB9XG5cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4uLy4uL2xpYi9NeU9iamVjdCcpLCB7XG5cbiAgICBSZXF1ZXN0OiB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoIGRhdGEgKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgICAgICAgaWYoIGRhdGEub25Qcm9ncmVzcyApIHJlcS5hZGRFdmVudExpc3RlbmVyKCBcInByb2dyZXNzXCIsIGUgPT5cbiAgICAgICAgICAgICAgICBkYXRhLm9uUHJvZ3Jlc3MoIGUubGVuZ3RoQ29tcHV0YWJsZSA/IE1hdGguZmxvb3IoICggZS5sb2FkZWQgLyBlLnRvdGFsICkgKiAxMDAgKSA6IDAgKSBcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcblxuICAgICAgICAgICAgICAgIHJlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgWyA1MDAsIDQwNCwgNDAxIF0uaW5jbHVkZXMoIHRoaXMuc3RhdHVzIClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcmVqZWN0KCB0aGlzLnJlc3BvbnNlID8gSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZSApIDogdGhpcy5zdGF0dXMgKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiByZXNvbHZlKCBKU09OLnBhcnNlKCB0aGlzLnJlc3BvbnNlICkgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhdGEubWV0aG9kID0gZGF0YS5tZXRob2QgfHwgXCJnZXRcIlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGAvJHtkYXRhLnJlc291cmNlfWAgKyAoIGRhdGEuaWQgPyBgLyR7ZGF0YS5pZH1gIDogJycgKVxuICAgICAgICAgICAgICAgIGlmKCBkYXRhLm1ldGhvZCA9PT0gXCJnZXRcIiB8fCBkYXRhLm1ldGhvZCA9PT0gXCJvcHRpb25zXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBxcyA9IGRhdGEucXMgPyBgPyR7d2luZG93LmVuY29kZVVSSUNvbXBvbmVudCggZGF0YS5xcyApfWAgOiAnJyBcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9wZW4oIGRhdGEubWV0aG9kLCBgJHtwYXRofSR7cXN9YCApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVhZGVycyggcmVxLCBkYXRhLmhlYWRlcnMgKVxuICAgICAgICAgICAgICAgICAgICByZXEuc2VuZChudWxsKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5vcGVuKCBkYXRhLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBwYXRoLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEhlYWRlcnMoIHJlcSwgZGF0YS5oZWFkZXJzIClcbiAgICAgICAgICAgICAgICAgICAgcmVxLnNlbmQoIGRhdGEuZGF0YSB8fCBudWxsIClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiggZGF0YS5vblByb2dyZXNzICkgZGF0YS5vblByb2dyZXNzKCAnc2VudCcgKVxuICAgICAgICAgICAgfSApXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0SGVhZGVycyggcmVxLCBoZWFkZXJzPXt9ICkge1xuICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoIFwiQWNjZXB0XCIsIGhlYWRlcnMuYWNjZXB0IHx8ICdhcHBsaWNhdGlvbi9qc29uJyApXG4gICAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlciggXCJDb250ZW50LVR5cGVcIiwgaGVhZGVycy5jb250ZW50VHlwZSB8fCAndGV4dC9wbGFpbicgKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9mYWN0b3J5KCBkYXRhICkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZSggdGhpcy5SZXF1ZXN0LCB7IH0gKS5jb25zdHJ1Y3RvciggZGF0YSApXG4gICAgfSxcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIGlmKCAhWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmRBc0JpbmFyeSApIHtcbiAgICAgICAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZEFzQmluYXJ5ID0gZnVuY3Rpb24oc0RhdGEpIHtcbiAgICAgICAgICAgIHZhciBuQnl0ZXMgPSBzRGF0YS5sZW5ndGgsIHVpOERhdGEgPSBuZXcgVWludDhBcnJheShuQnl0ZXMpO1xuICAgICAgICAgICAgZm9yICh2YXIgbklkeCA9IDA7IG5JZHggPCBuQnl0ZXM7IG5JZHgrKykge1xuICAgICAgICAgICAgICB1aThEYXRhW25JZHhdID0gc0RhdGEuY2hhckNvZGVBdChuSWR4KSAmIDB4ZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbmQodWk4RGF0YSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9mYWN0b3J5LmJpbmQodGhpcylcbiAgICB9XG5cbn0gKSwgeyB9ICkuY29uc3RydWN0b3IoKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHRoaXMucmFuZ2Uuc2VsZWN0Tm9kZShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpdlwiKS5pdGVtKDApKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBjcmVhdGUoIG5hbWUsIG9wdHMgKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyID0gbmFtZVxuICAgICAgICBuYW1lID0gKCBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSApLnJlcGxhY2UoICctJywgJycgKVxuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKFxuICAgICAgICAgICAgdGhpcy5WaWV3c1sgbmFtZSBdLFxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbigge1xuICAgICAgICAgICAgICAgIEhlYWRlcjogeyB2YWx1ZTogdGhpcy5IZWFkZXIgfSxcbiAgICAgICAgICAgICAgICBUb2FzdDogeyB2YWx1ZTogdGhpcy5Ub2FzdCB9LFxuICAgICAgICAgICAgICAgIG5hbWU6IHsgdmFsdWU6IG5hbWUgfSxcbiAgICAgICAgICAgICAgICBmYWN0b3J5OiB7IHZhbHVlOiB0aGlzIH0sXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHsgdmFsdWU6IHRoaXMucmFuZ2UgfSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogeyB2YWx1ZTogdGhpcy5UZW1wbGF0ZXNbIG5hbWUgXSwgd3JpdGFibGU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDogeyB2YWx1ZTogdGhpcy5Nb2RlbHNbbmFtZV0gPyBPYmplY3QuY3JlYXRlKCB0aGlzLk1vZGVsc1sgbmFtZSBdICkgOiB7fSB9LFxuICAgICAgICAgICAgICAgIHVzZXI6IHsgdmFsdWU6IHRoaXMuVXNlciB9XG4gICAgICAgICAgICB9IClcbiAgICAgICAgKS5jb25zdHJ1Y3Rvciggb3B0cyApXG4gICAgfSxcblxufSwge1xuICAgIEhlYWRlcjogeyB2YWx1ZTogcmVxdWlyZSgnLi4vdmlld3MvSGVhZGVyJykgfSxcbiAgICBNb2RlbHM6IHsgdmFsdWU6IHJlcXVpcmUoJy4uLy5Nb2RlbE1hcCcpIH0sXG4gICAgVGVtcGxhdGVzOiB7IHZhbHVlOiByZXF1aXJlKCcuLi8uVGVtcGxhdGVNYXAnKSB9LFxuICAgIFRvYXN0OiB7IHZhbHVlOiByZXF1aXJlKCcuLi92aWV3cy9Ub2FzdCcpIH0sXG4gICAgVXNlcjogeyB2YWx1ZTogcmVxdWlyZSgnLi4vbW9kZWxzL1VzZXInKSB9LFxuICAgIFZpZXdzOiB7IHZhbHVlOiByZXF1aXJlKCcuLi8uVmlld01hcCcpIH1cbn0gKVxuIiwicmVxdWlyZSgnLi9wb2x5ZmlsbCcpXG5cbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL21vZGVscy9Vc2VyJyksXG4gICAgcm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKSxcbiAgICBvbkxvYWQgPSBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiB3aW5kb3cub25sb2FkID0gKCkgPT4gcmVzb2x2ZSgpIClcblxuVXNlci5vbiggJ2xvZ291dCcsICgpID0+IHJvdXRlci5vbkxvZ291dCgpIClcblxuUHJvbWlzZS5hbGwoIFsgVXNlci5nZXQoKSwgb25Mb2FkIF0gKVxuLnRoZW4oICgpID0+IHJvdXRlci5pbml0aWFsaXplKCkgKVxuLmNhdGNoKCBlID0+IGNvbnNvbGUubG9nKCBgRXJyb3IgaW5pdGlhbGl6aW5nIGNsaWVudCAtPiAke2Uuc3RhY2sgfHwgZX1gICkgKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18uanMnKSwge1xuXG4gICAgZGF0YTogW1xuICAgICAgICAnaG9tZScsXG4gICAgICAgICdwcm9qZWN0cycsXG4gICAgICAgICdjb250YWN0J1xuICAgIF1cblxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXy5qcycpLCB7XG5cbiAgICBpc0xvZ2dlZEluKCkge1xuICAgICAgICAgICByZXR1cm4gQm9vbGVhbiggdGhpcy5kYXRhICYmIHRoaXMuZGF0YS5pZCApICBcbiAgICB9LFxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgaHp5PTsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAxIEdNVDtgXG5cbiAgICAgICAgdGhpcy5kYXRhID0geyB9XG4gICAgICAgIHRoaXMuZW1pdCgnbG9nb3V0JylcbiAgICB9LFxuXG59ICksIHsgcmVzb3VyY2U6IHsgdmFsdWU6ICdtZScgfSB9IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiggeyB9LCByZXF1aXJlKCcuLi8uLi8uLi9saWIvTW9kZWwnKSwgcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuXG4gICAgWGhyOiByZXF1aXJlKCcuLi9YaHInKSxcblxuICAgIGFkZCggZGF0dW0gKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKCBkYXR1bSApXG5cbiAgICAgICAgaWYoIHRoaXMuc3RvcmVCeSApIHRoaXMuX3N0b3JlT25lKCBkYXR1bSApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgZGVsZXRlKCkge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IHRoaXMuZGF0YVsgdGhpcy5tZXRhLmtleSBdXG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6ICdERUxFVEUnLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaWQ6IGtleVZhbHVlIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5tZXRhLmtleVxuXG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0dW0gPSB0aGlzLmRhdGEuZmluZCggZGF0dW0gPT4gZGF0dW1bIGtleSBdID09IGtleVZhbHVlIClcblxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0b3JlICkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyggdGhpcy5zdG9yZSApLmZvckVhY2goIGF0dHIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0gPSB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXS5maWx0ZXIoIGRhdHVtID0+IGRhdHVtWyBrZXkgXSAhPSBrZXlWYWx1ZSApXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0ubGVuZ3RoID09PSAwICkgeyB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXSA9IHVuZGVmaW5lZCB9XG4gICAgICAgICAgICAgICAgICAgIH0gKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIGRhdHVtID0+IGRhdHVtWyBrZXkgXSAhPSBrZXlWYWx1ZSApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRoaXMuZGF0YSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBnaXQoIGF0dHIgKSB7IHJldHVybiB0aGlzLmRhdGFbIGF0dHIgXSB9LFxuXG4gICAgZ2V0KCBvcHRzPXsgcXVlcnk6e30gfSApIHtcbiAgICAgICAgaWYoIG9wdHMucXVlcnkgfHwgdGhpcy5wYWdpbmF0aW9uICkgT2JqZWN0LmFzc2lnbiggb3B0cy5xdWVyeSwgdGhpcy5wYWdpbmF0aW9uIClcblxuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiBvcHRzLm1ldGhvZCB8fCAnZ2V0JywgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgcXM6IG9wdHMucXVlcnkgPyBKU09OLnN0cmluZ2lmeSggb3B0cy5xdWVyeSApIDogdW5kZWZpbmVkIH0gKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuXG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmNvbmNhdCggb3B0cy5wYXJzZSA/IG9wdHMucGFyc2UoIHJlc3BvbnNlLCBvcHRzLnN0b3JlQnkgKSA6IHJlc3BvbnNlIClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoIG9wdHMuc3RvcmVCeSApIHRoaXMuX3Jlc2V0U3RvcmUoIG9wdHMuc3RvcmVCeSApXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5wYXJzZSA/IHRoaXMucGFyc2UoIHJlc3BvbnNlLCBvcHRzLnN0b3JlQnkgKSA6IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgaWYoIG9wdHMuc3RvcmVCeSApIHRoaXMuX3N0b3JlKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdnb3QnKVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXNwb25zZSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBnZXRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ2dldCcsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIHFzOiBKU09OLnN0cmluZ2lmeSggeyBjb3VudE9ubHk6IHRydWUgfSApIH0gKVxuICAgICAgICAudGhlbiggKCB7IHJlc3VsdCB9ICkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXRhLmNvdW50ID0gcmVzdWx0XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXN1bHQgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgZ2l0KCBhdHRyICkgeyByZXR1cm4gdGhpcy5kYXRhWyBhdHRyIF0gfSxcblxuICAgIHBhdGNoKCBpZCwgZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ3BhdGNoJywgaWQsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIGRhdGE6IEpTT04uc3RyaW5naWZ5KCBkYXRhIHx8IHRoaXMuZGF0YSApIH0gKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHsgXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhID8gdGhpcy5kYXRhLmNvbmNhdCggcmVzcG9uc2UgKSA6IFsgcmVzcG9uc2UgXVxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0b3JlICkgT2JqZWN0LmtleXMoIHRoaXMuc3RvcmUgKS5mb3JFYWNoKCBhdHRyID0+IHRoaXMuX3N0b3JlKCByZXNwb25zZSwgYXR0ciApIClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzcG9uc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzcG9uc2UgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgX3B1dCgga2V5VmFsdWUsIGRhdGEgKSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5kYXRhLmZpbmQoIGRhdHVtID0+IGRhdHVtWyB0aGlzLm1ldGEua2V5IF0gPT0ga2V5VmFsdWUgKTtcbiAgICAgICAgaWYoIGl0ZW0gKSBpdGVtID0gZGF0YTtcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgcHV0KCBpZCwgZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ3B1dCcsIGlkLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaGVhZGVyczogdGhpcy5oZWFkZXJzIHx8IHt9LCBkYXRhOiBKU09OLnN0cmluZ2lmeSggZGF0YSApIH0gKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHsgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3BvbnNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3BvbnNlIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIHBvc3QoIG1vZGVsICkge1xuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAncG9zdCcsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIGRhdGE6IEpTT04uc3RyaW5naWZ5KCBtb2RlbCB8fCB0aGlzLmRhdGEgKSB9IClcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZGF0YSApICkgeyBcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgPyB0aGlzLmRhdGEuY29uY2F0KCByZXNwb25zZSApIDogWyByZXNwb25zZSBdXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RvcmUgKSBPYmplY3Qua2V5cyggdGhpcy5zdG9yZSApLmZvckVhY2goIGF0dHIgPT4gdGhpcy5fc3RvcmUoIHJlc3BvbnNlLCBhdHRyICkgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNwb25zZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXNwb25zZSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICByZW1vdmUoIGl0ZW0gKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhLmZpbmRJbmRleCggZGF0dW0gPT4gSlNPTi5zdHJpbmdpZnkoIGRhdHVtICkgPT09IEpTT04uc3RyaW5naWZ5KCBpdGVtICkgKVxuXG4gICAgICAgIGlmKCBpbmRleCA9PT0gLTEgKSByZXR1cm5cblxuICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKCBpbmRleCwgMSApXG4gICAgfSxcblxuICAgIHNldCggYXR0ciwgdmFsdWUgKSB7XG4gICAgICAgIHRoaXMuZGF0YVsgYXR0ciBdID0gdmFsdWVcbiAgICAgICAgdGhpcy5lbWl0KCBgJHthdHRyfUNoYW5nZWRgIClcbiAgICB9LFxuXG4gICAgdmFsaWRhdGUoIGRhdGEgKSB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWVcbiAgICAgICBcbiAgICAgICAgT2JqZWN0LmtleXMoIGRhdGEgKS5mb3JFYWNoKCBuYW1lID0+IHsgXG4gICAgICAgICAgICBjb25zdCB2YWwgPSBkYXRhWyBuYW1lIF0sXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmZpbmQoIGF0dHIgPT4gYXR0ci5uYW1lID09PSBuYW1lICkgICBcbiAgICBcbiAgICAgICAgICAgIGlmKCBhdHRyaWJ1dGUgPT09IHVuZGVmaW5lZCB8fCAhYXR0cmlidXRlLnZhbGlkYXRlICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVsgbmFtZSBdID0gdmFsXG4gICAgICAgICAgICAgICAgICAgID8gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHZhbC50cmltKCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiB2YWxcbiAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0gZWxzZSBpZiggdmFsaWQgJiYgIXRoaXMudmFsaWRhdGVEYXR1bSggYXR0cmlidXRlLCB2YWwgKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoICd2YWxpZGF0aW9uRXJyb3InLCBhdHRyaWJ1dGUgKVxuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiggdGhpcy52YWxpZGF0ZURhdHVtKCBhdHRyaWJ1dGUsIHZhbCApICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVsgbmFtZSBdID0gdmFsLnRyaW0oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IClcblxuICAgICAgICByZXR1cm4gdmFsaWRcbiAgICB9LFxuXG4gICAgdmFsaWRhdGVEYXR1bSggYXR0ciwgdmFsICkge1xuICAgICAgICByZXR1cm4gYXR0ci52YWxpZGF0ZS5jYWxsKCB0aGlzLCB2YWwudHJpbSgpIClcbiAgICB9XG5cbn0gKVxuIiwiaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCwgdmFyQXJncykgeyAvLyAubGVuZ3RoIG9mIGZ1bmN0aW9uIGlzIDJcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHRhcmdldCA9PSBudWxsKSB7IC8vIFR5cGVFcnJvciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICBpZiAobmV4dFNvdXJjZSAhPSBudWxsKSB7IC8vIFNraXAgb3ZlciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcbiAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XG4gICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0bztcbiAgfTtcbn1cblxuLy9odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0XG5pZiAod2luZG93LkVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gXG4gICAgZnVuY3Rpb24ocykge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBlbCA9IHRoaXM7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IGVsKSB7fTtcbiAgICAgICAgfSB3aGlsZSAoKGkgPCAwKSAmJiAoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSk7IFxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcbn1cblxuLy9odHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MVxuY29uc3QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lUG9seWZpbGwgPSAoKCkgPT4ge1xuICAgIGxldCBjbG9jayA9IERhdGUubm93KCk7XG5cbiAgICByZXR1cm4gKGNhbGxiYWNrKSA9PiB7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGlmIChjdXJyZW50VGltZSAtIGNsb2NrID4gMTYpIHtcbiAgICAgICAgICAgIGNsb2NrID0gY3VycmVudFRpbWU7XG4gICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50VGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBwb2x5ZmlsbChjYWxsYmFjayk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lUG9seWZpbGxcblxucmVxdWlyZSgnc21vb3Roc2Nyb2xsLXBvbHlmaWxsJykucG9seWZpbGwoKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB0cnVlXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuLi8uLi9saWIvTXlPYmplY3QnKSwge1xuICAgIFxuICAgIFZpZXdGYWN0b3J5OiByZXF1aXJlKCcuL2ZhY3RvcnkvVmlldycpLFxuICAgIFxuICAgIFZpZXdzOiByZXF1aXJlKCcuLy5WaWV3TWFwJyksXG5cbiAgICBTaW5nbGV0b25zOiBbICdIZWFkZXInIF0sXG5cbiAgICBpbml0aWFsaXplKCkge1xuXG4gICAgICAgIHRoaXMuY29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50JylcblxuICAgICAgICB0aGlzLlZpZXdGYWN0b3J5LmNvbnN0cnVjdG9yKCk7XG5cbiAgICAgICAgdGhpcy5TaW5nbGV0b25zLmZvckVhY2goIG5hbWUgPT4gdGhpcy5WaWV3c1tuYW1lXS5jb25zdHJ1Y3RvciggeyBmYWN0b3J5OiB0aGlzLlZpZXdGYWN0b3J5IH0gKSApXG5cbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSB0aGlzLmhhbmRsZS5iaW5kKHRoaXMpXG5cbiAgICAgICAgdGhpcy5WaWV3cy5IZWFkZXIub24oICduYXZpZ2F0ZScsIHJvdXRlID0+IHRoaXMubmF2aWdhdGUoIHJvdXRlICkgKVxuXG4gICAgICAgIHRoaXMuZm9vdGVyID0gdGhpcy5WaWV3RmFjdG9yeS5jcmVhdGUoICdmb290ZXInLCB7IGluc2VydGlvbjogeyBlbDogZG9jdW1lbnQuYm9keSB9IH0gKVxuXG4gICAgICAgIHRoaXMuaGFuZGxlKClcbiAgICB9LFxuXG4gICAgaGFuZGxlKCkge1xuICAgICAgICB0aGlzLmhhbmRsZXIoIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnNsaWNlKDEpIClcbiAgICB9LFxuXG4gICAgaGFuZGxlciggcGF0aCApIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMucGF0aFRvVmlldyggcGF0aFswXSApLFxuICAgICAgICAgICAgdmlldyA9IHRoaXMuVmlld3NbIG5hbWUgXSA/IG5hbWUgOiAnaG9tZSdcblxuICAgICAgICBpZiggdmlldyA9PT0gdGhpcy5jdXJyZW50VmlldyApIHJldHVybiB0aGlzLnZpZXdzWyB2aWV3IF0ub25OYXZpZ2F0aW9uKCBwYXRoLnNsaWNlKDEpIClcblxuICAgICAgICB0aGlzLnNjcm9sbFRvVG9wKClcblxuICAgICAgICBQcm9taXNlLmFsbCggT2JqZWN0LmtleXMoIHRoaXMudmlld3MgKS5tYXAoIHZpZXcgPT4gdGhpcy52aWV3c1sgdmlldyBdLmhpZGUoKSApIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHZpZXdcblxuICAgICAgICAgICAgaWYoIHRoaXMudmlld3NbIHZpZXcgXSApIHJldHVybiB0aGlzLnZpZXdzWyB2aWV3IF0ub25OYXZpZ2F0aW9uKCBwYXRoIClcblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdzWyB2aWV3IF0gPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLlZpZXdGYWN0b3J5LmNyZWF0ZSggdmlldywgeyBpbnNlcnRpb246IHsgZWw6IHRoaXMuY29udGVudENvbnRhaW5lciB9LCBwYXRoIH0gKVxuICAgICAgICAgICAgICAgICAgICAub24oICduYXZpZ2F0ZScsICggcm91dGUsIG9wdGlvbnMgKSA9PiB0aGlzLm5hdmlnYXRlKCByb3V0ZSwgb3B0aW9ucyApIClcbiAgICAgICAgICAgICAgICAgICAgLm9uKCAnZGVsZXRlZCcsICgpID0+IGRlbGV0ZSB0aGlzLnZpZXdzWyB2aWV3IF0gKVxuICAgICAgICAgICAgKVxuICAgICAgICB9IClcbiAgICAgICAgLmNhdGNoKCB0aGlzLkVycm9yIClcbiAgICAgICBcbiAgICAgICAgdGhpcy5mb290ZXIuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCAnaGlkZGVuJywgdmlldyA9PT0gJ0FkbWluJyApXG4gICAgfSxcblxuICAgIG5hdmlnYXRlKCBsb2NhdGlvbiwgb3B0aW9ucz17fSApIHtcbiAgICAgICAgaWYoIG9wdGlvbnMucmVwbGFjZSB8fCBvcHRpb25zLnVwICkge1xuICAgICAgICAgICAgbGV0IHBhdGggPSBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9YC5zcGxpdCgnLycpXG4gICAgICAgICAgICBwYXRoLnBvcCgpXG4gICAgICAgICAgICBpZiggb3B0aW9ucy5yZXBsYWNlICkgcGF0aC5wdXNoKCBsb2NhdGlvbiApXG4gICAgICAgICAgICBsb2NhdGlvbiA9IHBhdGguam9pbignLycpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiggb3B0aW9ucy5hcHBlbmQgKSB7IGxvY2F0aW9uID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfS8ke2xvY2F0aW9ufWAgfVxuXG4gICAgICAgIGlmKCBsb2NhdGlvbiAhPT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICkgaGlzdG9yeS5wdXNoU3RhdGUoIHt9LCAnJywgbG9jYXRpb24gKVxuICAgICAgICBpZiggIW9wdGlvbnMuc2lsZW50ICkgdGhpcy5oYW5kbGUoKVxuICAgIH0sXG5cbiAgICBvbkxvZ291dCgpIHtcbiAgICAgICAgUHJvbWlzZS5hbGwoIE9iamVjdC5rZXlzKCB0aGlzLnZpZXdzICkubWFwKCB2aWV3ID0+IHRoaXMudmlld3NbIHZpZXcgXS5kZWxldGUoKSApIClcbiAgICAgICAgLnRoZW4oICgpID0+IHsgdGhpcy5jdXJyZW50VmlldyA9IHVuZGVmaW5lZDsgcmV0dXJuIHRoaXMuaGFuZGxlKCkgfSApXG4gICAgICAgIC5jYXRjaCggdGhpcy5FcnJvciApXG4gICAgfSxcblxuICAgIHBhdGhUb1ZpZXcoIHBhdGggKSB7XG4gICAgICAgIGNvbnN0IGh5cGhlblNwbGl0ID0gcGF0aC5zcGxpdCgnLScpXG4gICAgICAgIHJldHVybiBoeXBoZW5TcGxpdC5tYXAoIGl0ZW0gPT4gdGhpcy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoIGl0ZW0gKSApLmpvaW4oJycpXG4gICAgfSxcblxuICAgIHNjcm9sbFRvVG9wKCkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsKCB7IHRvcDogMCwgbGVmdDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0gKVxuICAgIH1cblxufSApLCB7IGN1cnJlbnRWaWV3OiB7IHZhbHVlOiAnJywgd3JpdGFibGU6IHRydWUgfSwgdmlld3M6IHsgdmFsdWU6IHsgfSB9IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18nKSwge1xuXG4gICAgcG9zdFJlbmRlcigpIHsgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9Gb290ZXInKVxuXG59IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4vX19wcm90b19fJyksIHtcblxuICAgIFVzZXI6IHJlcXVpcmUoJy4uL21vZGVscy9Vc2VyJyksXG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgbmF2TGlzdDogJ2NsaWNrJ1xuICAgIH0sXG5cbiAgICBpbnNlcnRpb24oKSB7IHJldHVybiB7IGVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpLCBtZXRob2Q6ICdpbnNlcnRCZWZvcmUnIH0gfSxcblxuICAgIG1vZGVsOiByZXF1aXJlKCcuLi9tb2RlbHMvSGVhZGVyJyksXG5cbiAgICBuYW1lOiAnSGVhZGVyJyxcblxuICAgIG9uTmF2TGlzdENsaWNrKGUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcbiAgICAgICAgaWYoIHRhcmdldC50YWdOYW1lICE9PSAnU1BBTicgKSByZXR1cm5cbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmVtaXQoICduYXZpZ2F0ZScsIGAvJHt0YXJnZXQudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKX1gIClcbiAgICB9LFxuXG4gICAgb25Mb2dvdXRDbGljaygpIHtcbiAgICAgICAgdGhpcy5Vc2VyLmxvZ291dCgpXG4gICAgfSxcblxuICAgIG9uVXNlckxvZ2luKCkge1xuICAgICAgICB0aGlzLmVscy5wcm9maWxlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpICAgICAgICBcbiAgICAgICAgdGhpcy5lbHMubmFtZS50ZXh0Q29udGVudCA9IHRoaXMuVXNlci5kYXRhLm5hbWUgfHwgdGhpcy5Vc2VyLmRhdGEuZW1haWxcbiAgICB9LFxuXG4gICAgb25Vc2VyTG9nb3V0KCkge1xuICAgICAgICB0aGlzLmVscy5wcm9maWxlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpICAgICAgICBcbiAgICAgICAgdGhpcy5lbHMubmFtZS50ZXh0Q29udGVudCA9ICcnXG4gICAgfSxcblxuICAgIHBvc3RSZW5kZXIoKSB7XG5cbiAgICAgICAgaWYoIHRoaXMuVXNlci5pc0xvZ2dlZEluKCkgKSB0aGlzLm9uVXNlckxvZ2luKClcblxuICAgICAgICB0aGlzLlVzZXIub24oICdnb3QnLCAoKSA9PiB7IGlmKCB0aGlzLlVzZXIuaXNMb2dnZWRJbigpICkgdGhpcy5vblVzZXJMb2dpbigpIH0gKVxuICAgICAgICB0aGlzLlVzZXIub24oICdsb2dvdXQnLCAoKSA9PiB0aGlzLm9uVXNlckxvZ291dCgpIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvSGVhZGVyJylcblxufSApLCB7IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18nKSwgeyB9IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiggeyB9LCByZXF1aXJlKCcuLi8uLi8uLi9saWIvTXlPYmplY3QnKSwgcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuXG4gICAgJCggZWwsIHNlbGVjdG9yICkgeyByZXR1cm4gQXJyYXkuZnJvbSggZWwucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKSApIH0sXG5cbiAgICBUZW1wbGF0ZUNvbnRleHQ6IHJlcXVpcmUoJy4uL1RlbXBsYXRlQ29udGV4dCcpLFxuXG4gICAgTW9kZWw6IHJlcXVpcmUoJy4uL21vZGVscy9fX3Byb3RvX18nKSxcblxuICAgIE9wdGltaXplZFJlc2l6ZTogcmVxdWlyZSgnLi9saWIvT3B0aW1pemVkUmVzaXplJyksXG4gICAgXG4gICAgWGhyOiByZXF1aXJlKCcuLi9YaHInKSxcblxuICAgIGJpbmRFdmVudCgga2V5LCBldmVudCwgZWwgKSB7XG4gICAgICAgIGNvbnN0IGVscyA9IGVsID8gWyBlbCBdIDogQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdICkgPyB0aGlzLmVsc1sga2V5IF0gOiBbIHRoaXMuZWxzWyBrZXkgXSBdLFxuICAgICAgICAgICBuYW1lID0gdGhpcy5nZXRFdmVudE1ldGhvZE5hbWUoIGtleSwgZXZlbnQgKVxuXG4gICAgICAgIGlmKCAhdGhpc1sgYF8ke25hbWV9YCBdICkgdGhpc1sgYF8ke25hbWV9YCBdID0gZSA9PiB0aGlzWyBuYW1lIF0oZSlcblxuICAgICAgICBlbHMuZm9yRWFjaCggZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lciggZXZlbnQgfHwgJ2NsaWNrJywgdGhpc1sgYF8ke25hbWV9YCBdICkgKVxuICAgIH0sXG5cbiAgICBjb25zdHJ1Y3Rvciggb3B0cz17fSApIHtcblxuICAgICAgICBpZiggb3B0cy5ldmVudHMgKSB7IE9iamVjdC5hc3NpZ24oIHRoaXMuZXZlbnRzLCBvcHRzLmV2ZW50cyApOyBkZWxldGUgb3B0cy5ldmVudHM7IH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbiggdGhpcywgb3B0cyApXG5cbiAgICAgICAgdGhpcy5zdWJ2aWV3RWxlbWVudHMgPSBbIF1cblxuICAgICAgICBpZiggdGhpcy5yZXF1aXJlc0xvZ2luICYmICggIXRoaXMudXNlci5pc0xvZ2dlZEluKCkgKSApIHJldHVybiB0aGlzLmhhbmRsZUxvZ2luKClcbiAgICAgICAgaWYoIHRoaXMudXNlciAmJiAhdGhpcy5pc0FsbG93ZWQoIHRoaXMudXNlciApICkgcmV0dXJuIHRoaXMuc2Nvb3RBd2F5KClcblxuICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplKCkucmVuZGVyKClcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVFdmVudHMoIGtleSwgZWwgKSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHRoaXMuZXZlbnRzW2tleV1cblxuICAgICAgICBpZiggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHsgdGhpcy5iaW5kRXZlbnQoIGtleSwgdGhpcy5ldmVudHNba2V5XSwgZWwgKSB9XG4gICAgICAgIGVsc2UgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZXZlbnRzW2tleV0gKSApIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzWyBrZXkgXS5mb3JFYWNoKCBldmVudE9iaiA9PiB0aGlzLmJpbmRFdmVudCgga2V5LCBldmVudE9iaiApIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50KCBrZXksIHRoaXMuZXZlbnRzW2tleV0uZXZlbnQgKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRlbGV0ZSggeyBzaWxlbnQgfSA9IHsgc2lsZW50OiBmYWxzZSB9ICkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlKClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxzLmNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBjb250YWluZXIucGFyZW50Tm9kZVxuICAgICAgICAgICAgaWYoIGNvbnRhaW5lciAmJiBwYXJlbnQgKSBwYXJlbnQucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApXG4gICAgICAgICAgICBpZiggIXNpbGVudCApIHRoaXMuZW1pdCgnZGVsZXRlZCcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGV2ZW50czoge30sXG5cbiAgICBmYWRlSW5JbWFnZSggZWwgKSB7XG4gICAgICAgIGVsLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCggJ2ltZ0xvYWRlZCcsIGVsIClcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCAnc3JjJywgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpIClcbiAgICB9LFxuXG4gICAgZ2V0RXZlbnRNZXRob2ROYW1lKCBrZXksIGV2ZW50ICkgeyByZXR1cm4gYG9uJHt0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlcihrZXkpfSR7dGhpcy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoZXZlbnQpfWAgfSxcblxuICAgIGdldENvbnRhaW5lcigpIHsgcmV0dXJuIHRoaXMuZWxzLmNvbnRhaW5lciB9LFxuXG4gICAgZ2V0VGVtcGxhdGVPcHRpb25zKCkge1xuICAgICAgICBjb25zdCBydiA9IE9iamVjdC5hc3NpZ24oIHRoaXMudXNlciA/IHsgdXNlcjogdGhpcy51c2VyLmRhdGEgfSA6IHt9IClcblxuICAgICAgICBpZiggdGhpcy5tb2RlbCApIHtcbiAgICAgICAgICAgIHJ2Lm1vZGVsID0gdGhpcy5tb2RlbC5kYXRhXG5cbiAgICAgICAgICAgIGlmKCB0aGlzLm1vZGVsLm1ldGEgKSBydi5tZXRhID0gdGhpcy5tb2RlbC5tZXRhXG4gICAgICAgICAgICBpZiggdGhpcy5tb2RlbC5hdHRyaWJ1dGVzICkgcnYuYXR0cmlidXRlcyA9IHRoaXMubW9kZWwuYXR0cmlidXRlc1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHRoaXMudGVtcGxhdGVPcHRpb25zICkgcnYub3B0cyA9IHR5cGVvZiB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMudGVtcGxhdGVPcHRpb25zKCkgOiB0aGlzLnRlbXBsYXRlT3B0aW9ucyB8fCB7fVxuXG4gICAgICAgIHJldHVybiBydlxuICAgIH0sXG5cbiAgICBoYW5kbGVMb2dpbigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3J5LmNyZWF0ZSggJ2xvZ2luJywgeyBpbnNlcnRpb246IHsgZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50JykgfSB9IClcbiAgICAgICAgLm9uKCBcImxvZ2dlZEluXCIsICgpID0+IHRoaXMub25Mb2dpbigpIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBoaWRlKCBpc1Nsb3cgKSB7XG4gICAgICAgIC8vdmlld3Mgbm90IGhpZGluZyBjb25zaXN0ZW50bHkgd2l0aCB0aGlzXG4gICAgICAgIC8vaWYoICF0aGlzLmVscyB8fCB0aGlzLmlzSGlkaW5nICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cbiAgICAgICAgdGhpcy5pc0hpZGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGVFbCggdGhpcy5lbHMuY29udGFpbmVyLCBpc1Nsb3cgKVxuICAgICAgICAudGhlbiggKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzLmhpZGluZyA9IGZhbHNlICkgKVxuICAgIH0sXG4gICAgXG4gICAgaGlkZVN5bmMoKSB7IHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsgcmV0dXJuIHRoaXMgfSxcblxuICAgIF9oaWRlRWwoIGVsLCByZXNvbHZlLCBoYXNoLCBpc1Nsb3cgKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGBhbmltYXRlLW91dCR7IGlzU2xvdyA/ICctc2xvdycgOiAnJ31gKVxuICAgICAgICBkZWxldGUgdGhpc1toYXNoXVxuICAgICAgICB0aGlzLmlzSGlkaW5nID0gZmFsc2VcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgfSxcblxuICAgIGhpZGVFbCggZWwsIGlzU2xvdyApIHtcbiAgICAgICAgaWYoIHRoaXMuaXNIaWRkZW4oIGVsICkgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBoYXNoID0gYCR7dGltZX1IaWRlYFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXNbIGhhc2ggXSA9IGUgPT4gdGhpcy5faGlkZUVsKCBlbCwgcmVzb2x2ZSwgaGFzaCwgaXNTbG93IClcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChgYW5pbWF0ZS1vdXQkeyBpc1Nsb3cgPyAnLXNsb3cnIDogJyd9YClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGh0bWxUb0ZyYWdtZW50KCBzdHIgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY3RvcnkucmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KCBzdHIgKVxuICAgIH0sXG5cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbiggdGhpcywgeyBlbHM6IHsgfSwgc2x1cnA6IHsgYXR0cjogJ2RhdGEtanMnLCB2aWV3OiAnZGF0YS12aWV3JywgbmFtZTogJ2RhdGEtbmFtZScsIGltZzogJ2RhdGEtc3JjJyB9LCB2aWV3czogeyB9IH0gKVxuICAgIH0sXG5cbiAgICBpbnNlcnRUb0RvbSggZnJhZ21lbnQsIG9wdGlvbnMgKSB7XG4gICAgICAgIGNvbnN0IGluc2VydGlvbiA9IHR5cGVvZiBvcHRpb25zLmluc2VydGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuaW5zZXJ0aW9uKCkgOiBvcHRpb25zLmluc2VydGlvbjtcblxuICAgICAgICBpbnNlcnRpb24ubWV0aG9kID09PSAnaW5zZXJ0QmVmb3JlJ1xuICAgICAgICAgICAgPyBpbnNlcnRpb24uZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGZyYWdtZW50LCBpbnNlcnRpb24uZWwgKVxuICAgICAgICAgICAgOiBpbnNlcnRpb24uZWxbIGluc2VydGlvbi5tZXRob2QgfHwgJ2FwcGVuZENoaWxkJyBdKCBmcmFnbWVudCApXG4gICAgfSxcblxuICAgIGlzQWxsb3dlZCggdXNlciApIHtcbiAgICAgICAgaWYoICF0aGlzLnJlcXVpcmVzUm9sZSApIHJldHVybiB0cnVlXG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgdXNlclJvbGVzID0gbmV3IFNldCggdXNlci5kYXRhLnJvbGVzIClcblxuICAgICAgICBpZiggdHlwZW9mIHRoaXMucmVxdWlyZXNSb2xlID09PSAnc3RyaW5nJyApIHJldHVybiB1c2VyUm9sZXMuaGFzKCB0aGlzLnJlcXVpcmVzUm9sZSApXG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMucmVxdWlyZXNSb2xlICkgKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnJlcXVpcmVzUm9sZS5maW5kKCByb2xlID0+IHVzZXJSb2xlcy5oYXMoIHJvbGUgKSApXG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgIT09IHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICBcbiAgICBpc0hpZGRlbiggZWwgKSB7IHJldHVybiBlbCA/IGVsLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykgOiB0aGlzLmVscy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSB9LFxuXG4gICAgb25Mb2dpbigpIHtcblxuICAgICAgICBpZiggIXRoaXMuaXNBbGxvd2VkKCB0aGlzLnVzZXIgKSApIHJldHVybiB0aGlzLnNjb290QXdheSgpXG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCkucmVuZGVyKClcbiAgICB9LFxuXG4gICAgb25OYXZpZ2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93KClcbiAgICB9LFxuXG4gICAgc2hvd05vQWNjZXNzKCkge1xuICAgICAgICBhbGVydChcIk5vIHByaXZpbGVnZXMsIHNvblwiKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBwb3N0UmVuZGVyKCkgeyByZXR1cm4gdGhpcyB9LFxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiggdGhpcy5kYXRhICkgdGhpcy5tb2RlbCA9IE9iamVjdC5jcmVhdGUoIHRoaXMuTW9kZWwsIHsgfSApLmNvbnN0cnVjdG9yKCB0aGlzLmRhdGEgKVxuXG4gICAgICAgIHRoaXMuc2x1cnBUZW1wbGF0ZSgge1xuICAgICAgICAgICAgaW5zZXJ0aW9uOiB0aGlzLmluc2VydGlvbiB8fCB7IGVsOiBkb2N1bWVudC5ib2R5IH0sXG4gICAgICAgICAgICBpc1ZpZXc6IHRydWUsXG4gICAgICAgICAgICBzdG9yZUZyYWdtZW50OiB0aGlzLnN0b3JlRnJhZ21lbnQsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogUmVmbGVjdC5hcHBseSggdGhpcy50ZW1wbGF0ZSwgdGhpcy5UZW1wbGF0ZUNvbnRleHQsIFsgdGhpcy5nZXRUZW1wbGF0ZU9wdGlvbnMoKSBdIClcbiAgICAgICAgfSApXG5cbiAgICAgICAgdGhpcy5yZW5kZXJTdWJ2aWV3cygpXG5cbiAgICAgICAgaWYoIHRoaXMuc2l6ZSApIHsgdGhpcy5zaXplKCk7IHRoaXMuT3B0aW1pemVkUmVzaXplLmFkZCggdGhpcy5zaXplLmJpbmQodGhpcykgKSB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdFJlbmRlcigpXG4gICAgfSxcblxuICAgIHJlbW92ZUNoaWxkcmVuKCBlbCApIHtcbiAgICAgICAgd2hpbGUoIGVsLmZpcnN0Q2hpbGQgKSBlbC5yZW1vdmVDaGlsZCggZWwuZmlyc3RDaGlsZCApXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHJlbmRlclN1YnZpZXdzKCkge1xuICAgICAgICB0aGlzLnN1YnZpZXdFbGVtZW50cy5mb3JFYWNoKCBvYmogPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IG9iai5uYW1lIHx8IG9iai52aWV3XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0geyB9XG5cbiAgICAgICAgICAgIGlmKCB0aGlzLlZpZXdzICYmIHRoaXMuVmlld3NbIG9iai52aWV3IF0gKSBvcHRzID0gdHlwZW9mIHRoaXMuVmlld3NbIG9iai52aWV3IF0gPT09IFwib2JqZWN0XCIgPyB0aGlzLlZpZXdzWyBvYmoudmlldyBdIDogUmVmbGVjdC5hcHBseSggdGhpcy5WaWV3c1sgb2JqLnZpZXcgXSwgdGhpcywgWyBdIClcbiAgICAgICAgICAgIGlmKCB0aGlzLlZpZXdzICYmIHRoaXMuVmlld3NbIG5hbWUgXSApIG9wdHMgPSB0eXBlb2YgdGhpcy5WaWV3c1sgbmFtZSBdID09PSBcIm9iamVjdFwiID8gdGhpcy5WaWV3c1sgbmFtZSBdIDogUmVmbGVjdC5hcHBseSggdGhpcy5WaWV3c1sgbmFtZSBdLCB0aGlzLCBbIF0gKVxuXG4gICAgICAgICAgICB0aGlzLnZpZXdzWyBuYW1lIF0gPSB0aGlzLmZhY3RvcnkuY3JlYXRlKCBvYmoudmlldywgT2JqZWN0LmFzc2lnbiggeyBpbnNlcnRpb246IHsgZWw6IG9iai5lbCwgbWV0aG9kOiAnaW5zZXJ0QmVmb3JlJyB9IH0sIG9wdHMgKSApXG5cbiAgICAgICAgICAgIGlmKCB0aGlzLmV2ZW50cy52aWV3cyApIHtcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5ldmVudHMudmlld3NbIG5hbWUgXSApIHRoaXMuZXZlbnRzLnZpZXdzWyBuYW1lIF0uZm9yRWFjaCggYXJyID0+IHRoaXMudmlld3NbIG5hbWUgXS5vbiggYXJyWzBdLCBldmVudERhdGEgPT4gUmVmbGVjdC5hcHBseSggYXJyWzFdLCB0aGlzLCBbIGV2ZW50RGF0YSBdICkgKSApXG4gICAgICAgICAgICAgICAgZWxzZSBpZiggdGhpcy5ldmVudHMudmlld3NbIG9iai52aWV3IF0gKSB0aGlzLmV2ZW50cy52aWV3c1sgb2JqLnZpZXcgXS5mb3JFYWNoKCBhcnIgPT4gdGhpcy52aWV3c1sgbmFtZSBdLm9uKCBhcnJbMF0sIGV2ZW50RGF0YSA9PiBSZWZsZWN0LmFwcGx5KCBhcnJbMV0sIHRoaXMsIFsgZXZlbnREYXRhIF0gKSApIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIG9iai5lbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpICkgdGhpcy52aWV3c1tuYW1lXS5oaWRlU3luYygpXG4gICAgICAgICAgICBvYmouZWwucmVtb3ZlKClcbiAgICAgICAgfSApXG5cbiAgICAgICAgdGhpcy5zdWJ2aWV3RWxlbWVudHMgPSBbIF1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBzY29vdEF3YXkoKSB7XG4gICAgICAgIHRoaXMuVG9hc3Quc2hvd01lc3NhZ2UoICdlcnJvcicsICdZb3UgYXJlIG5vdCBhbGxvd2VkIGhlcmUuJylcbiAgICAgICAgLmNhdGNoKCBlID0+IHsgdGhpcy5FcnJvciggZSApOyB0aGlzLmVtaXQoICduYXZpZ2F0ZScsIGAvYCApIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4gdGhpcy5lbWl0KCAnbmF2aWdhdGUnLCBgL2AgKSApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgc2hvdyggaXNTbG93ICkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93RWwoIHRoaXMuZWxzLmNvbnRhaW5lciwgaXNTbG93IClcbiAgICB9LFxuXG4gICAgc2hvd1N5bmMoKSB7IHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsgcmV0dXJuIHRoaXMgfSxcblxuICAgIF9zaG93RWwoIGVsLCByZXNvbHZlLCBoYXNoLCBpc1Nsb3cgKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzW2hhc2hdIClcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShgYW5pbWF0ZS1pbiR7IGlzU2xvdyA/ICctc2xvdycgOiAnJ31gKVxuICAgICAgICBkZWxldGUgdGhpc1sgaGFzaCBdXG4gICAgICAgIHJlc29sdmUoKVxuICAgIH0sXG5cbiAgICBzaG93RWwoIGVsLCBpc1Nsb3cgKSB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIGhhc2ggPSBgJHt0aW1lfVNob3dgXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXNbIGhhc2ggXSA9IGUgPT4gdGhpcy5fc2hvd0VsKCBlbCwgcmVzb2x2ZSwgaGFzaCwgaXNTbG93IClcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYGFuaW1hdGUtaW4keyBpc1Nsb3cgPyAnLXNsb3cnIDogJyd9YClcbiAgICAgICAgfSApICAgICAgICBcbiAgICB9LFxuXG4gICAgc2x1cnBFbCggZWwgKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGVsLmdldEF0dHJpYnV0ZSggdGhpcy5zbHVycC5hdHRyICkgfHwgJ2NvbnRhaW5lcidcblxuICAgICAgICBpZigga2V5ID09PSAnY29udGFpbmVyJyApIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoIHRoaXMubmFtZSApXG4gICAgICAgICAgICBpZiggdGhpcy5rbGFzcyApIGVsLmNsYXNzTGlzdC5hZGQoIHRoaXMua2xhc3MgKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbHNbIGtleSBdID0gQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdIClcbiAgICAgICAgICAgID8gdGhpcy5lbHNbIGtleSBdLmNvbmNhdCggZWwgKVxuICAgICAgICAgICAgOiAoIHRoaXMuZWxzWyBrZXkgXSAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICA/IFsgdGhpcy5lbHNbIGtleSBdLCBlbCBdXG4gICAgICAgICAgICAgICAgOiBlbFxuXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnNsdXJwLmF0dHIpXG5cbiAgICAgICAgaWYoIHRoaXMuZXZlbnRzWyBrZXkgXSApIHRoaXMuZGVsZWdhdGVFdmVudHMoIGtleSwgZWwgKVxuICAgIH0sXG5cbiAgICBzbHVycFRlbXBsYXRlKCBvcHRpb25zICkge1xuICAgICAgICB2YXIgZnJhZ21lbnQgPSB0aGlzLmh0bWxUb0ZyYWdtZW50KCBvcHRpb25zLnRlbXBsYXRlICksXG4gICAgICAgICAgICBzZWxlY3RvciA9IGBbJHt0aGlzLnNsdXJwLmF0dHJ9XWAsXG4gICAgICAgICAgICB2aWV3U2VsZWN0b3IgPSBgWyR7dGhpcy5zbHVycC52aWV3fV1gLFxuICAgICAgICAgICAgaW1nU2VsZWN0b3IgPSBgWyR7dGhpcy5zbHVycC5pbWd9XWAsXG4gICAgICAgICAgICBmaXJzdEVsID0gZnJhZ21lbnQucXVlcnlTZWxlY3RvcignKicpXG5cbiAgICAgICAgaWYoIG9wdGlvbnMuaXNWaWV3IHx8IGZpcnN0RWwuZ2V0QXR0cmlidXRlKCB0aGlzLnNsdXJwLmF0dHIgKSApIHRoaXMuc2x1cnBFbCggZmlyc3RFbCApXG4gICAgICAgIEFycmF5LmZyb20oIGZyYWdtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGAke3NlbGVjdG9yfSwgJHt2aWV3U2VsZWN0b3J9LCAke2ltZ1NlbGVjdG9yfWAgKSApLmZvckVhY2goIGVsID0+IHtcbiAgICAgICAgICAgIGlmKCBlbC5oYXNBdHRyaWJ1dGUoIHRoaXMuc2x1cnAuYXR0ciApICkgeyB0aGlzLnNsdXJwRWwoIGVsICkgfVxuICAgICAgICAgICAgZWxzZSBpZiggZWwuaGFzQXR0cmlidXRlKCB0aGlzLnNsdXJwLmltZyApICkgdGhpcy5mYWRlSW5JbWFnZSggZWwgKVxuICAgICAgICAgICAgZWxzZSBpZiggZWwuaGFzQXR0cmlidXRlKCB0aGlzLnNsdXJwLnZpZXcgKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnZpZXdFbGVtZW50cy5wdXNoKCB7IGVsLCB2aWV3OiBlbC5nZXRBdHRyaWJ1dGUodGhpcy5zbHVycC52aWV3KSwgbmFtZTogZWwuZ2V0QXR0cmlidXRlKHRoaXMuc2x1cnAubmFtZSkgfSApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKVxuICAgXG4gICAgICAgIGlmKCBvcHRpb25zLnN0b3JlRnJhZ21lbnQgKSByZXR1cm4gT2JqZWN0LmFzc2lnbiggdGhpcywgeyBmcmFnbWVudCB9IClcblxuICAgICAgICB0aGlzLmluc2VydFRvRG9tKCBmcmFnbWVudCwgb3B0aW9ucyApXG5cbiAgICAgICAgaWYoIG9wdGlvbnMucmVuZGVyU3Vidmlld3MgKSB0aGlzLnJlbmRlclN1YnZpZXdzKClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICB1bmJpbmRFdmVudCgga2V5LCBldmVudCwgZWwgKSB7XG4gICAgICAgIGNvbnN0IGVscyA9IGVsID8gWyBlbCBdIDogQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdICkgPyB0aGlzLmVsc1sga2V5IF0gOiBbIHRoaXMuZWxzWyBrZXkgXSBdLFxuICAgICAgICAgICBuYW1lID0gdGhpcy5nZXRFdmVudE1ldGhvZE5hbWUoIGtleSwgZXZlbnQgKVxuXG4gICAgICAgIGVscy5mb3JFYWNoKCBlbCA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCBldmVudCB8fCAnY2xpY2snLCB0aGlzWyBgXyR7bmFtZX1gIF0gKSApXG4gICAgfVxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIHtcblxuICAgIGFkZChjYWxsYmFjaykge1xuICAgICAgICBpZiggIXRoaXMuY2FsbGJhY2tzLmxlbmd0aCApIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykgKVxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuICAgIH0sXG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgICBpZiggdGhpcy5ydW5uaW5nICkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxuICAgICAgICBcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICAgICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLnJ1bkNhbGxiYWNrcy5iaW5kKHRoaXMpIClcbiAgICAgICAgICAgIDogc2V0VGltZW91dCggdGhpcy5ydW5DYWxsYmFja3MsIDY2IClcbiAgICB9LFxuXG4gICAgcnVuQ2FsbGJhY2tzKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzLmZpbHRlciggY2FsbGJhY2sgPT4gY2FsbGJhY2soKSApXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlIFxuICAgIH1cblxufSwgeyBjYWxsYmFja3M6IHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiBbXSB9LCBydW5uaW5nOiB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogZmFsc2UgfSB9IClcbiIsIi8qKlxuKiBQcm9qZWN0OiBGdXR1cmUgRGF5cyBGYXJtIFdlYnNpdGVcbiogQ3JlYXRlZCBCeTogQ2hyaXMgQmFyb25cbiogRGF0ZSBMYXN0IE1vZGlmaWVkOiAxLzE5LzIwMTggYnkgQWxleCBDYWRpZ2FuXG4qIERlc2NyaXB0aW9uOiBUaGlzIGZpbGUgYnVpbGRzIHRoZSBmb290ZXIgZWxlbWVudHMgb24gdGhlIEZhcm0gV2Vic2l0ZSBob21lcGFnZVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIFxueyBcbiAgICByZXR1cm4gYDxmb290ZXIgaWQgPSBcImZvb3RlckJvZHlcIj5cblxuICAgIDwhLS0gRnV0dXJlIERheXMgRmFybSBJbmZvIC0tPlxuICAgIDxkaXYgaWQgPSBcImZvb3RlclRpdGxlXCIgY2xhc3MgPSBcImZvb3RlclwiPlxuXG4gICAgICAgIEZVVFVSRSBEQVlTIEZBUk1cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcyA9IFwiZm9vdGVyXCI+XG5cbiAgICAgICAgMjEyMyBUaW55IFJvYWRcbiAgICAgICAgPGJyPlxuICAgICAgICBUb3duIE5hbWUsIE1pY2hpZ2FuIDMzMzQ0ICAgICAgICBcblxuICAgIDwvZGl2PlxuXG4gICAgPGJyPlxuXG4gICAgPGRpdiBjbGFzcyA9IFwiZm9vdGVyXCI+XG5cbiAgICAgICAgPGEgaWQgPSBcImZvb3RlckxpbmtcIiBocmVmID0gXCJtYWlsdG86SW5mb0BGdXR1cmVEYXlzRmFybS5jb21cIj4gSW5mb0BGdXR1cmVEYXlzRmFybS5jb20gPC9hPlxuICAgICAgICA8YnI+XG4gICAgICAgICgzMzMpIDMyMy04ODk5XG5cbiAgICA8L2Rpdj5cblxuICAgIDxicj5cblxuICAgIDwhLS0gQ29weXJpZ2h0IC0tPlxuICAgIDxkaXYgaWQgPSBcImZvb3RlckJvdHRvbVwiIGNsYXNzID0gXCJmb290ZXJcIj5cblxuICAgICAgICBDb3B5cmlnaHQgJHsgbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIH0gRnV0dXJlRGF5cyBTb2Z0d2FyZVxuXG4gICAgPC9kaXY+XG5cbiAgICA8c3R5bGU+XG5cbiAgICAgICAgQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG8nKTtcbiAgICAgICAgQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1BcnZvJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICogQm9keSBvZiBmb290ZXJcbiAgICAgICAgKi9cbiAgICAgICAgI2Zvb3RlckJvZHlcbiAgICAgICAge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0M0OTU0MjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIEZ1dHVyZSBEYXlzIEZhcm0gSW5mb1xuICAgICAgICAqL1xuICAgICAgICAuZm9vdGVyXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gICAgICAgICAgICBjb2xvcjogIzIzMUYyMDtcbiAgICAgICAgfVxuICAgICAgICAjZm9vdGVyVGl0bGVcbiAgICAgICAge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDQwcHg7XG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJ2bztcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICB9XG4gICAgICAgICNmb290ZXJMaW5rXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbG9yOiAjMjMxRjIwO1xuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG4gICAgICAgICNmb290ZXJCb3R0b21cbiAgICAgICAge1xuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDQwcHg7XG4gICAgICAgIH1cblxuICAgIDwvc3R5bGU+XG5cbiAgICA8L2Zvb3Rlcj5gXG59XG4iLCIvKipcbiogUHJvamVjdDogRnV0dXJlIERheXMgRmFybSBXZWJzaXRlXG4qIENyZWF0ZWQgQnk6IENocmlzIEJhcm9uXG4qIERhdGUgTGFzdCBNb2RpZmllZDogMS8xOS8yMDE4IGJ5IEFsZXggQ2FkaWdhblxuKiBEZXNjcmlwdGlvbjogVGhpcyBmaWxlIGJ1aWxkcyB0aGUgaGVhZGVyIGVsZW1lbnRzIG9uIHRoZSBGYXJtIFdlYnNpdGUgaG9tZXBhZ2VcbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oIHsgbW9kZWwgfSApIFxue1xuXHRjb25zdCBuYXZPcHRpb25zID0gbW9kZWwuZm9yRWFjaChkYXR1bSA9PiBgPHNwYW4+ICR7IHRoaXMuQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGRhdHVtKSB9IDwvc3Bhbj5gIClcblx0cmV0dXJuIGA8bmF2PlxuXG5cdDwhLS0gTGlua3MgdG8gb3RoZXIgcGFnZXMgLS0+XG5cdDxkaXYgY2xhc3MgPSBcImhlYWRlclwiPlxuXG5cdFx0PGEgY2xhc3MgPSBcImhlYWRlckxpbmtcIiBocmVmID0gXCJJbnNlcnRVUkxUb0Fib3V0VVNcIj4gQUJPVVQgVVMgPC9hPlxuXG5cdDwvZGl2PlxuXG5cdDxkaXYgY2xhc3MgPSBcImhlYWRlclwiPlxuXG5cdFx0PGEgY2xhc3MgPSBcImhlYWRlckxpbmtcIiBocmVmID0gXCJJbnNlcnRVUkxUb1doZXJlVG9GaW5kVXNcIj4gV0hFUkUgVE8gRklORCBVUyA8L2E+XG5cblx0PC9kaXY+XG5cblx0PGRpdiBjbGFzcyA9IFwiaGVhZGVyXCI+XG5cblx0XHQ8YSBpZCA9IFwiaGVhZGVySG9tZXBhZ2VcIiBocmVmID0gXCJJbnNlcnRVUkxUb0Z1dHVyZURheXNGYXJtXCI+IEZVVFVSRSBEQVlTIEZBUk0gPC9hPlxuXG5cdDwvZGl2PlxuXG5cdDxkaXYgY2xhc3MgPSBcImhlYWRlclwiPlxuXG5cdFx0PGEgY2xhc3MgPSBcImhlYWRlckxpbmtcIiBocmVmID0gXCJJbnNlclVSTFRvVGhlQmxvZ1wiPiBUSEUgQkxPRyA8L2E+XG5cblx0PC9kaXY+XG5cblx0PGRpdiBjbGFzcyA9IFwiaGVhZGVyXCI+XG5cblx0XHQ8YSBjbGFzcyA9IFwiaGVhZGVyTGlua1wiIGhyZWYgPSBcIkluc2VydFVSTFRvT3VyT2ZmZXJpbmdzXCI+IE9VUiBPRkZFUklOR1MgPC9hPlxuXG5cdDwvZGl2PlxuXG5cdDwhLS0gVGhlIHdlYnNpdGUgbG9nbyAtLT5cblx0PGRpdiBpZCA9IFwiaGVhZGVyUGljXCI+XG5cblx0XHQ8c3ZnIGlkID0gXCJMYXllcl8xXCIgZGF0YS1uYW1lID0gXCJMYXllciAxXCIgeG1sbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveCA9IFwiMCAwIDI3Mi45MyA0NDMuM1wiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMjgyMzIzO30uY2xzLTJ7ZmlsbDojYWNlMWZhO30uY2xzLTN7ZmlsbDojYzQ5NTQyO30uY2xzLTR7ZmlsbDojODE1OTI5O30uY2xzLTV7ZmlsbDojYzI0ODRlO308L3N0eWxlPjwvZGVmcz48dGl0bGU+Q2hpY2tlbjwvdGl0bGU+PHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNMTgzLjU5LDQwMC42OWMxLDEsLjcxLDEuODQtLjIyLDIuNjYtMS42NC42OC0zLjczLjQxLTQuODksMmE0LDQsMCwwLDEtMy43MywxLjY0Yy0xLjg5LDAtMy43OCwwLTUuNjYsMC0uNzcsMC0xLjc5LjEzLS45MywxLjI2LDEuNDcsMS45MSwzLDMuNzQsNC42Myw1LjU1YTIuNDksMi40OSwwLDAsMCwyLjQ2Ljg0QTEwNC4yNCwxMDQuMjQsMCwwLDEsMTkxLDQxMi45NWMxLjQ0LS4wOSwzLjA4LS4yNSwzLjY0LDEuNDhhMi43MywyLjczLDAsMCwxLTEuOTQsMy40MWMtMi4zLjg2LTIuOTEsMi41NC0zLDQuNjloMGExMTMsMTEzLDAsMCwwLTEyLjg4LDEuNjVjLS44NS4xNy0yLjEzLS4wNi0yLjI5LDFzMSwxLjQ4LDEuOTEsMS44MmE3LjA4LDcuMDgsMCwwLDEsMi42Mi42M2MyLjQ4LDEuNjgsNS4zOSwyLjE2LDguMTgsMywzLC44Niw1LjI2LDIuNDcsNi4zNiw1LjUxYTE0LjI1LDE0LjI1LDAsMCwwLDMuOCw1LjQxdjBsLjg4LDMuMjVoMGMtMS43OC41OS0zLjQxLDAtNS0uNjdhMTIuOTMsMTIuOTMsMCwwLDAtNS43MS0xLjEyYy01LjQ5LjQxLTEwLjMtMS40OC0xNS00LTMuNzItMi04LjEzLTIuNDItMTEuODQtNC42MS0uNjItLjM3LTEuNjItLjEzLTIuNDQtLjEyLTIuOTIuMDUtNS4yNCwxLjc2LTcuOCwyLjgzLTUuMTMsMi4xNS0xMC4zMiw0LjE4LTEzLjI2LDkuNDctLjUuODktMS4zMywyLjI0LTIuOTIsMS40NGExMCwxMCwwLDAsMCwzLjA1LTMuMjNjLjI5LS4zOS44OC0uODQuMy0xLjMzYTUuMTksNS4xOSwwLDAsMC0xLjkyLTEuMWMtLjY4LS4xOC0uNy42Mi0uOSwxLjA2YTkuMjMsOS4yMywwLDAsMC0uNTEsNC42MmMtMS40NC4yOS0xLjM5LS43NS0xLjQtMS42NWExMSwxMSwwLDAsMSwxLjc2LTUuNTUsNC40Miw0LjQyLDAsMCwwLDEtMyw1LjQ1LDUuNDUsMCwwLDEsLjg4LTMuNDJjMi40NC01LjEzLDQuMTItMTAuNDUsMi42Ny0xNi4xOC0xLTMuODgtMy40MS03LjItNC44MS0xMC45Mi0xLTIuNjQtMi40MS0yLjE0LTQtMWExMC4zMiwxMC4zMiwwLDAsMS03LjY0LDIuMTMsMiwyLDAsMCwwLTEuNzkuNzNjLTEuMjMsMS4yMS0yLjUyLDIuMzctMy44NywzLjQ2LS43OC42My0xLjYzLDEuNzMtMi43NSwxLjA4cy0uNTYtMS45Mi0uNDgtMi45M2MuMTYtMi4xLDEuNDMtMy41OSwyLjkxLTQuOTQuNDQtLjQsMS4yMy0uODUsMS4yMS0xLjI2LS4xMS0zLjQ3LDIuNjYtMy43Miw0LjkyLTQuNThzNC44NS0xLjc3LDYuNDktMy45M2MuNzctMSwxLjI2LTIsLjQ0LTMuMzFzLTEuNTMtMi41OC0yLjMtMy44OGMtLjI3LS44NS0uNTMtMS43LS44Mi0yLjU0LS44NS0yLjQ2LTEuMTQtMi41NC0zLjM3LTEtMS42NC4wNS0yLTEtMi4xNS0yLjM3LDEtMi43OC0uMzUtNS0xLjk0LTctMy41Ny00LjY0LTYuNzMtOS41MS03LjU4LTE1LjQzcy00LjU4LTguMjYtOS44OS05LjEybC0uNTQtLjE1YTEwLjE0LDEwLjE0LDAsMCwwLTYtLjI1LDguODUsOC44NSwwLDAsMS02Ljg2LTEuMzJjLTIuMTQtMS4zOS00LjItMy4yNS03LTMuMzFhNDguNjQsNDguNjQsMCwwLDAtNS4yLS4wOWMtNCwuMzQtNi43MS0xLjU3LTktNC41NUE0OC44Niw0OC44NiwwLDAsMSw2MC4zNywzMzBhNy4xNiw3LjE2LDAsMCwwLTUuNzItNC44OCw4LjM4LDguMzgsMCwwLDEtNC41Mi0yLjQzYy00LjE5LTQuMTUtNy04LjkxLTcuNjMtMTQuOTUtLjM0LTMtLjQxLTYuNzQtMy42LTguNC0yLjctMS40LTIuMzgtMy4zNi0yLTUuNWE5LjMyLDkuMzIsMCwwLDEsMi45My01YzEuODMtMS44LDMuNy0zLjU3LDUuNDItNS40NywxLTEuMDgsMS43OC0yLjU3LjU4LTMuODQtMi4yNC0yLjM3LTMuMDYtNS40MS00LjM3LTguMjJsLS4xNi0uNDhBMy40MiwzLjQyLDAsMCwwLDM5LjQ0LDI2N2EyLjI4LDIuMjgsMCwwLDEtMS4xMi0xLjYxLDIuNzksMi43OSwwLDAsMC0xLjY5LTJjLTIuNDEtLjc1LTIuNzYtMi41My0yLjU5LTQuNjQuMTMtMS41OS0uMTItMy4xNy0xLjQ4LTQuMDctMi42Ny0xLjc0LTQuMTEtNC41Ni02LjI3LTYuNzItMS42NS0xLjY1LTIuOTItMy40LTIuODEtNS45Mi4wNS0xLjIzLS44NC0yLjIyLTEuNDEtMy4yOC0xLjQ0LTIuNjYtMy41LTQuODgtNS4xLTcuNDYtMy44OS02LjMtMS4yMi0xMiwuNDYtMTcuODYuNTMtMS44MywyLjU5LTMuMjEuNzgtNS4zOC0uMjEtLjI2LS4wNi0uODksMC0xLjMyYTExLjQsMTEuNCwwLDAsMC0uODYtOC4zM2MtLjctMS4yNi0xLjA2LTIuNzgsMC00LjA4LDIuMjgtMi45MSwxLTUuMzctMi45Mi03LTEuMzItMi0xLjE4LTUuNjMuNDMtNy4yLjkyLS44OS45LTEuNDYsMC0yLjM2YTI4LDI4LDAsMCwxLTIuMjktMy4wOGMuMTQtMi4xNi0xLjE0LTMuNzctMi4zOS01LjIxLTEuNDEtMS42MS0uNy0zLjI4LS42Ni00LjkyLDAtMS4zMSwxLjUxLS42NCwyLjE0LTEuMjMuMjItLjIuNTYtLjI5LjczLS41MmExMC43MSwxMC43MSwwLDAsMSw3LjgyLTMuOTRjMS4yNS0uMTIsMS42NC0uNywxLjUtMS45NC0uNTktNS4xNC0zLjE5LTkuMy02LjM3LTEzLjE4LTEuMTMtMi43My0xLTMsMS4zLTMuNjUuNjgsMCwxLjM2LjA2LDIsMCw1LjA2LS40NCw3LjcxLTMuMTQsOC04LjE0LDAtLjMsMC0uNjEsMC0uOTEuMzItMi41Ny44My0yLjkzLDMuMzUtMi40M3MzLjQxLS4xOSwzLjQyLTIuN2MwLTEuNzMtLjI5LTMuNTEsMS40My00LjczYTEuMTUsMS4xNSwwLDAsMCwuMjUtMS4yN2MtMS0zLjQuMTMtNi43NS4yOC0xMC4xMmE0LjQsNC40LDAsMCwxLDIuMjctMy43LDIxLjY3LDIxLjY3LDAsMCwwLDUuNTUtNC45M2MyLjQ2LTMsNC4zNC02LjUzLDguMDktOC4yNi41LS4yMy44MS0uODgsMS4xOC0xLjM1LDEuMzgtMS43MiwyLjcxLTEuODksNC4wNy0uMTcsNS42Miw3LjExLDEwLjQyLDE0LjYxLDExLDI0LjA2LjA3LDEuMi4xMSwzLDEuNTYsMy4xOHMxLjYyLTEuNDgsMi4wNi0yLjU4Yy42Ny0xLjY2LDEuNjktMS44NSwyLjgxLS40MmEyMC42MywyMC42MywwLDAsMSwyLjU5LDQuNDhjMSwyLjM4LDEsNS4xOCwyLjg0LDcuMjNsMCwwYy0uMywxLjA4LjQsMS44Ny44LDIuNzQuNjYsMS40MywxLjY3LDIuNzQsMS45MSw0LjMyLjEzLjg0LDEuNjIsMi41LTEsMi4zMy0uNTksMC0uNDQuNy0uMzUsMS4wOS43MywzLjA3LDEuMzksNi4xNiwyLjI4LDkuMThhMTEyLjA3LDExMi4wNywwLDAsMCw1LjQ5LDE1LjE3Yy40NSwxLC40NiwzLjA3LDIuMjcuOTIuNDUtLjUzLDEuMTEuMjgsMS43LjE3bDAsMCwuMzcuNTIuNTIuODcuMzIuNWEuMzYuMzYsMCwwLDEsLjE2LjMzLjQ3LjQ3LDAsMCwwLC4zNy41OGgwYy43Nyw3LDQuNTUsMTIuNTEsOS4yMiwxNy40Nyw0LDQuMjEsOC44LDcuMywxMy41OSwxMC40NywyLjYyLDEuNzQsMi41NCwxLjg2LDMuNjEtMS4wOWEzLDMsMCwwLDEsMi4xNC42N2MzLjUsNC44Niw3Ljg2LDguMzYsMTQuMTcsOC4yOSw4LjQ2LS4wOSwxNi0yLjY4LDIxLjg3LTlhMTAuMzgsMTAuMzgsMCwwLDEsNy4yNi0zLjY2LDMuNDgsMy40OCwwLDAsMCwyLjYxLTEuMThjMi41Mi0zLjEzLDUuNjMtNS42LDguNjQtOC4yMiwxLjgzLTEuNTksMy4zMi0zLjgxLDEuOC02LjQtMS4yOS0yLjE5LS44My0zLjk1LjUxLTUuODMuODktMS4yNiwyLjEzLTIuNDMsMS43Ni00LjI0LDAtMS40Mi0xLjE3LTIuMDUtMi4xMi0yLjc1YTYwLjU3LDYwLjU3LDAsMCwxLTcuMDktNi4yOCw0Ny41Myw0Ny41MywwLDAsMS05LjQyLTEzLjU5Yy0zLjE2LTYuNzItNS42NS0xMy40MS02LjU2LTIwLjc2LTEuMzctMTEuMTEtLjg0LTIyLDMuMTUtMzIuNTYsNS4yNi0xNCwxNS40OC0yMy43MiwyNy4zLTMyLjA2LDQuNi0zLjI1LDUuMjMtMS44NC45Mi03LjI0LDAtLjA1LS4xMy0uMDctLjItLjEtMi4xNC0zLjItNC4yOS02LjM4LTYuNC05LjU5YTIuOTEsMi45MSwwLDAsMC0zLjI2LTEuNDJjLTEuOTMuMzYtMy44Ny42OC01LjgzLjg2LTIuMjQuMjEtMy4wOS0uODMtMi42NC0zYTUuNjYsNS42NiwwLDAsMSwzLjEtNC4yMmMuODgtLjQ0LDIuMTgtMSwxLjU1LTIuMzJzLTEuNTgtMi43MS0zLjQ1LTIuMzRjLTEuMjUuMjUtMi40Ni43NS0zLjcsMS4wNy0xLC4yNi0yLC4zNi0yLjU3LS43NmEyLjE3LDIuMTcsMCwwLDEsLjUtMi42OGMuNi0uNjgsMS4zLTEuMjcsMS45Mi0xLjkzLDEuNjEtMS43MiwxLjYzLTIuNi0uMTktNC4xNC0xLjQyLTEuMjEtMi42Ni0yLjU4LTUuMS0xLjg1YTQuMTgsNC4xOCwwLDAsMS01LjEyLTMuNTcsNC44Myw0LjgzLDAsMCwxLDUuMjUtNWMyLjg5LjA5LDQuNCwxLjc4LDQsNC43Ny0uMzUsMi40LDEuNTcsMy40MiwyLjYzLDUsMS4yNSwxLjg1LDIuNzgsMi42Miw1LDEuNThhOC43OSw4Ljc5LDAsMCwxLDIuODctLjU1LDIuMTMsMi4xMywwLDAsMSwyLjMsMS4xMiwyLjA2LDIuMDYsMCwwLDEtLjY3LDIuNDVjLS41Ny42LTEuMjksMS4wNi0xLjg3LDEuNjUtLjc2Ljc4LTIuMzEsMS4yNS0xLjE2LDIuODYsMSwxLjM4LDEuODcsMi44NCw0LDIuMTMuMzktLjEzLjc5LS41NCwxLjI2LS4wOSwwLC4xMS4wOS4yOCwwLC4zOS0uNDMuODYtMi43OC40Ny0xLjY5LDIuMjMsMi4yMiwzLjU4LDIuNzUsNC40Miw1LjE1LDMuNDVhMTIuNjUsMTIuNjUsMCwwLDAsMi4zNy0xLjMxYzEtLjY4LDIuMTQtMS40NywxLjkzLTIuODFTMTg2LjE2LDI4LjMzLDE4NSwyOHEwLS40MSwwLS44MmEzLjc3LDMuNzcsMCwwLDEsMi40Ni44MWwuNDMuMjhjMS41OCwxLjI5LDEuMDcsMi42OC4wOCw0YTguMzcsOC4zNywwLDAsMS00LjQ1LDNjLTEuNDMuNC0xLjU2LDEtLjc2LDIuMjMsMi4xLDMuMTMsMy44Niw2LjQ5LDYuNTUsOS4yQTI2LDI2LDAsMCwxLDE5MS42Niw1MGMuNjksMS40MiwxLjMsMS4yLDIuNC40Niw2Ljg0LTQuNjEsMTQuNTYtNi4wNSwyMi42Mi01LjhhNDIuMjMsNDIuMjMsMCwwLDEsMTcuNjQsNC41YzEuNTkuNzksMi44Ny44LDMuNzQtMWExNi4yNiwxNi4yNiwwLDAsMSwxLjIzLTEuODhjMi4wOC0zLjg2LDUuNDgtNi41OSw4LjQtOS43MiwxLjE0LTEuMjMsMS4xMi0yLjEtLjExLTMuMTlhMjMuMTMsMjMuMTMsMCwwLDEtMy44NC00LjQ1Yy0uNjMtLjk0LTEuMzYtMS45MS0uNDQtMy4wOGEzLjA3LDMuMDcsMCwwLDEsMy40My0xLjA4LDEyLjg1LDEyLjg1LDAsMCwxLDUuNSwzYzEsLjksMS42NiwxLDIuNTUtLjE1LDEuMzEtMS42NiwyLjc2LTMuMiw0LjE5LTQuNzYuODctLjk1LjgzLTEuNi0uMzMtMi4zQTE3LjA4LDE3LjA4LDAsMCwxLDI1NSwxNy4yMmMtLjY5LS43Ni0xLjI3LTEuNjEtLjY3LTIuNjRhMi4zMywyLjMzLDAsMCwxLDIuNTktMSwxNC40MSwxNC40MSwwLDAsMSw1LjkzLDIuN2MuNjIuNDMsMS4xMywxLjUxLDIsLjU0LjcxLS43NSwxLjM3LTEuNDkuOTUtMi43OS0xLjI0LTMuODEsMi42Mi04LjA2LDYuNTYtNy4zMSwyLjgzLjUzLDQuMTQsMy44LDIuNjksNi43YTUuNzksNS43OSwwLDAsMS02LDMuMTksMi40NywyLjQ3LDAsMCwwLTIuNzksMS40Yy0uNiwxLjEuNjcsMS4zLDEuMTgsMS43OEExMi41OCwxMi41OCwwLDAsMSwyNzEsMjQuNzRjLjYyLDEuNzEsMCwyLjQ5LTEuNzcsMi4zOGE5LjI5LDkuMjksMCwwLDEtNS40NS0yLjUzYy0xLjQxLTEuMjItMi4xOS0xLTMuMjIuMzRhNDMuMSw0My4xLDAsMCwxLTMuNCwzLjY0Yy0xLjIxLDEuMjEtMS4yOCwyLjE1LjE3LDMuMzRhOC4zOCw4LjM4LDAsMCwxLDMuMjEsNS43OWMuMTcsMS43Ni0uNTQsMi41Mi0yLjM3LDIuMjlhMTAuNDIsMTAuNDIsMCwwLDEtNS4yMS0yLjU3LDEuNTUsMS41NSwwLDAsMC0yLjQ3LjA5QTg3LjU4LDg3LjU4LDAsMCwwLDI0MS43OCw0N2MtLjY2LjgyLTEuMjksMS42Ni0yLDIuNDUtLjgzLDEtLjU5LDEuNi41NCwyLDYuMTgsMi4yMywxMS41NSw1Ljg5LDE2Ljc2LDkuNzcsNC44LDMuNTcsOS43Myw3LjI5LDEyLjQ0LDEyLjY4LDMuNTEsNyw2LjUyLDE0LjIsNy43LDIyLjEzLDIsMTMuMzIsMS4xNywyNi4xNy00LjQ3LDM4LjU2LTIuMyw1LTQuNTgsMTAuMDctOC44NywxMy43OS00LjY4LDQuMDUtOS4zOSw4LjA4LTE0LjQyLDExLjcxLTEuNjUsMS4yNC0uMDcsMi43LS4yNyw0LDAsMS4yMS0uMDksMi40MS0uMDcsMy42MmEyLjIxLDIuMjEsMCwwLDEtMSwyLjEzYy0yLjIxLDEuMTEtMi40MywyLjI2LTEuMTcsNC41NGE4MC42OCw4MC42OCwwLDAsMSw0LjE1LDEwYy4zNC44OSwxLjc5LDIuMzktLjg5LDIuMTctLjYyLS4wNS0uNTkuNi0uNCwxLDEuNDQsMy4zMSwyLjUyLDYuODYsNC40Niw5Ljg1YTEyLjM2LDEyLjM2LDAsMCwxLDEuNjksMTAuMDVjLTEuMDgsNC42NS0yLjYsOS4xNC0yLjQzLDE0LjFhNjYuODMsNjYuODMsMCwwLDEsLjE2LDguNTIsMTIuMjUsMTIuMjUsMCwwLDEtLjE1LDIuMjVjLTIuMzUsOC0uNTQsMTYuMzYtMS42MywyNC40Ny0uMjQuNTQtLjQ0LDEuMS0uNzIsMS42MVMyNTAuNzgsMjYwLDI1MCwyNjBzLTEuMTQtLjc4LTEuMzYtMS41YTExLjA2LDExLjA2LDAsMCwxLS4zNi0xLjA2Yy0uMTYtLjY5LjEzLTEuNjktLjg4LTEuODUtLjg0LS4xNC0uODcuOTMtMS40LDEuMy0yLDEuNDUtMiwzLjg0LTIuNTEsNS44OS0xLjQxLDUuNDEtNC44OSw5LjQxLTguNTEsMTMuNGEzMy4yNSwzMy4yNSwwLDAsMC03LjIzLDExLjM2Yy0uMjguNjEtLjUzLDEuMjMtLjg2LDEuODFzLS41LDEuNjItMS40OSwxLjM3LTEuMTItMS4xMi0xLjEzLTJjMC0uNTIuMDctMSwuMS0xLjU2YTguNDUsOC40NSwwLDAsMCwuMjYtMS41M2MwLS43LjM2LTEuNjEtLjU4LTJzLTEuNDIuMjgtMS45Mi44NmMtMS4xMiwxLjMyLTIuNTQsMi4zNS0zLjU2LDMuNzktNC4xMyw1LjgyLTguMjcsMTEuNjMtMTIuNTQsMTcuMzUtMS4xNCwxLjUyLTEuODksMy40MS0zLjMyLDQuNTZhOS4yMSw5LjIxLDAsMCwwLTIuNjQsMi45NWMtMS42MywzLjE0LTMuMyw2LjI1LTUsOS4zOGgtMS4zNWMtMi0yLjczLTItMi43My0zLjc1LjMyYTguNjYsOC42NiwwLDAsMC0uNDIsMSwyMC4yMywyMC4yMywwLDAsMS0zLjYsNCwxMi4yOSwxMi4yOSwwLDAsMC0zLjQ1LDQuMzdjLS40MS45MS0xLDIuMDUtMi4zNiwxLjA3LS4xMi0uNTYuMTYtMS4zMi0uNTctMS41OHMtMS4wNS40My0xLjQ5LjgxYy0xLjI3LDEuMTEtMi4wOSwyLjg2LTQuMTcsMi43OGExOC41OCwxOC41OCwwLDAsMC0xMS4zNiwzLjgsMzksMzksMCwwLDAtMTIuMzIsMTMuNjhjLTUsOS41Ny01LjQxLDE5Ljc1LTQsMzAuMTdhNDQuMzksNDQuMzksMCwwLDAsLjcsNS4xNmMuNDgsMS45My42Niw0LjEyLDIuNTcsNS4zNmEzOS4wOSwzOS4wOSwwLDAsMCwxMC45NSw1LjM1YzMuNDQuOTQsNi43MS0uMTYsMTAtMXM2LjMtMS4zNCw5LjI0LjlhNy41Niw3LjU2LDAsMCwwLDMuNDksMS41NmwuMDgtLjA5LS4wOS4wOUMxODMuMjIsNDAwLjU0LDE4My4zMyw0MDAuNjksMTgzLjU5LDQwMC42OVptMjkuMy0yMjYuODljOS45NC0uMTMsMTkuNTQtMi40MiwyOS4xMi00Ljc2YTUuNSw1LjUsMCwwLDAsMi45Mi0xLjYyLDEuODgsMS44OCwwLDAsMCwuNDctMi4wOWMtLjM0LS43Ni0xLjA4LS43Ni0xLjc1LS43MmE2Ljc1LDYuNzUsMCwwLDAtMiwuMzMsNDAuODgsNDAuODgsMCwwLDEtOSwyLjIxYy04LDEuMjItMTUuODQsMi44Ni0yMy44OSwzLjQyLTUuNTMuMzgtMTEtLjY2LTE2LjQ1LTFhMjUuNzcsMjUuNzcsMCwwLDAtNi45LS42NWMtLjg4LDAtMi4zOS0uMTItMi41NiwxLjMyczEuMjcsMS43MiwyLjI4LDJhMzIuNzgsMzIuNzgsMCwwLDAsMTEuNSwyYzQuNjctLjIxLDkuMzUtLjA4LDE0LS4xMkEzLjI3LDMuMjcsMCwwLDAsMjEyLjg5LDE3My44Wk0xNDIuNDEsMzg1LjI4Yy0uMjgtMi42MS0xLjEtMy4xOC0zLjUxLTIuNTktMS45NS40OC0zLjQ2LDEuODItNS4yOSwyLjU0LTIuNDMsMS0yLjUzLDEuMjctMS4yNywzLjYuODUsNS40NywzLjUsMTAuMzgsNS4zNSwxNS40OSwxLjc1LDQuODQsMi43Nyw5LjgyLDQuMzcsMTQuNjZhMTEsMTEsMCwwLDEsLjI3LDYuNjljLTEuNCw0LjUtMy41LDguNzctNC4xOCwxMy40OS0uMDYuNDItLjQ5Ljg3LS4wOSwxLjI1cy44NywwLDEuMi0uMjRhNTguNzEsNTguNzEsMCwwLDEsMTIuMi02LjcxLDE3Ljg3LDE3Ljg3LDAsMCwxLDE1Ljg1LjExLDczLjM5LDczLjM5LDAsMCwwLDE3LjE1LDUuNjZjMS4zLjI2LDQuNTUtMi4zMSw0LjY3LTMuNTYuMDUtLjU5LS40LS43OS0uOC0uOTMtMy4xMy0xLjA2LTYuMTMtMi41Ny05LjUtMi44MS00Ljg1LS4zNC03Ljc1LTQuMzUtMTEuNzQtNi4zMWExLjU3LDEuNTcsMCwwLDEtLjQ4LTIuMDVjLjM3LS44MSwxLjEtLjYyLDEuNzgtLjQ2YTYuMTQsNi4xNCwwLDAsMCwzLjExLS40MmMxLjc1LS40OCwzLjQzLTEuMjIsNS4xOS0xLjU4LDIuOTQtLjYxLDUuOTItMSw4Ljg4LTEuNDksMS44OS0uMzIsMi4wOC0uOTMsMS0yLjQ3LTEtMS4zNC0yLjE0LS44MS0zLjI2LS40MS02LjY1LDIuMzktMTMuNTQsMi44My0yMC41MiwyLjYxYTEzLjIsMTMuMiwwLDAsMS01LjgzLTEuNjgsMy41MSwzLjUxLDAsMCwxLTEuNjItMS41M0EzMjIuODQsMzIyLjg0LDAsMCwxLDE0Mi40MSwzODUuMjhabTkzLjkzLTI3My44MmMtLjc5LjI2LTEuNTYuNTUtMi4zNi43NmE1LDUsMCwwLDEtNC45LS45Yy0uNTgtLjUxLTEuMTctMS4xLS42NS0xLjk0YTEuNjIsMS42MiwwLDAsMSwxLjk0LS44LDcsNywwLDAsMSwxLjUuNWMyLjIsMS4yNCwzLjg1LjQ2LDUuNDYtMS40Ni01LTIuMDktOS4wNy0uMi0xMy4xNCwyLjM4YTQuOTQsNC45NCwwLDAsMSwzLjE1LTQsMTQuMDcsMTQuMDcsMCwwLDEsMTEuNDMtLjMyYzIuOTIsMS4xNSw0Ljg2LS4zNiw0LjUxLTMuMzhzLTQuOC01LjktNy44OC00LjkyYy0xLjM2LjQzLTIuNTksMS4zMS00LjA2LDEuMzYtMS4yLDAtMi4zNS0uMy0yLjYzLTEuNjRzLjYxLTIuMDUsMS44Mi0yLjQ1YTkuNzYsOS43NiwwLDAsMSwzLjEzLS40YzEuMzYsMCwyLjcyLDAsNC4wOCwwYTIuMjMsMi4yMywwLDAsMCwyLjEtMS43OWMuMzMtMS4xNy0uODctLjctMS4zMi0xLjA2cy0uNjUtLjQ0LS41OC0uODhBMS4zLDEuMywwLDAsMSwyMzksODkuNDlhMjQuNDIsMjQuNDIsMCwwLDEsMy41Ny0uNTdjMi4xNi0uMTQsMy4xOC0xLjIyLDMtMy4zNnMtLjI3LTQuMzgtLjY1LTYuNTNjLS4yMi0xLjIyLjIyLTIuOTUtMS0zLjU2cy0yLjA5Ljg0LTMuMTYsMS4zM2EyLjE2LDIuMTYsMCwwLDEtLjQxLjE4LDIuNzcsMi43NywwLDAsMS0yLjItLjA4Yy0uODQtLjU3LDAtMS4yMi4wOS0xLjgyQTIzLjQ4LDIzLjQ4LDAsMCwwLDIzNy43LDY2YTguNjksOC42OSwwLDAsMC0uODYsMi4xMSwxNi41NCwxNi41NCwwLDAsMS0yLDVjLS42LjgyLTEuMTksMS42MS0yLjM2LDEuMzhzLTEuNi0xLjMyLTEuNzItMi4zOGEyOC43NSwyOC43NSwwLDAsMS0uMDgtMy4xNyw4LDgsMCwwLDAtMy4xLTYuNTFjLS45NS0uNzYtMi0xLjg1LTMuMi0xLjE2LTEuMzUuOCwwLDIsLjE5LDMsLjQ4LDMsMS43Niw1Ljc4LDIsOC44MS4wNi44Mi4xMiwxLjc0LS45MywyLjA3YTEuODksMS44OSwwLDAsMS0yLjE3LS44NkEyNC41OSwyNC41OSwwLDAsMSwyMjEuOTQsNzJhOSw5LDAsMCwwLTQtMy4yNWMtLjQ2LS4yMy0xLS41OC0xLjQ0LS4wNXMuMDcuODUuMjcsMS4yNWMuOTQsMS44OSwyLDMuNzUsMS45NCw2LDAsMi44LTEuNSwzLjcxLTMuOTIsMi4yOS0xLjM3LS44LTIuNjItMS44MS00LTIuNTdzLTIuNDUtLjE2LTIsMS4zNmMuNzEsMi40LjM2LDQuNzYuMzksNy4xNSwwLDIuMTQsMS4yNywzLjE0LDMuNDIsMi44YTI5LjQyLDI5LjQyLDAsMCwwLDMuMjgtLjg2YzMuMjEtLjkxLDUuMzgtLjM5LDcuMDYsMiwyLjA1LDIuOSwzLjgxLDUuOTQsMS43LDkuNmE2LjczLDYuNzMsMCwwLDEtLjc4Ljg1Yy0uNDMtMS45NS0uNzUtMy42My0xLjE5LTUuMjctLjg4LTMuMjYtMy40NC01LjY1LTYtNS4xM3MtNS43LjE3LTcuMDYsMy4zOGMtLjI1LjU4LS45My43MS0xLjUuOTMtMi45MywxLjExLTIuOTQsMS4xOS0uOSwzLjI1YTQuNzQsNC43NCwwLDAsMSwuODUsMS4wNWMuNC43NSwxLjQ3LDEuNC44NSwyLjM4cy0xLjg5LjY2LTIuOTEuNTEtMi4zLTEuNTMtMy0uMjQsMS4xOCwxLjYsMS43NywyLjQ2Yy4zNi41MywxLjMuODYsMSwxLjZzLTEuMTkuNDEtMS44Mi40MmMtMS44MSwwLTMuNDkuMjMtNC44OSwyLjA4YTI4LjQyLDI4LjQyLDAsMCwxLDMuNzQuMzNjMS4xNy4yNywyLjc1Ljg4LDIuNDQsMi4xNy0uMzksMS42NS0xLjg1LjQyLTIuODcuMzFhLjgyLjgyLDAsMCwxLS4yMi0uMDdjLTEuMzgtLjU3LTEuOS0uMDUtMiwxLjM5YTM1LjgyLDM1LjgyLDAsMCwwLC4zNSw2LjA4Yy4xMiwxLjMsMS42NCwxLjYzLDIuMzQsMi41OS4yMi4yOS42Mi0uMTQuOS0uNDEsMi40NC0yLjI3LDQuNDYtMS42NCw1LjI2LDEuNjIuMjUsMSwuNDUsMi4wNi43NiwzLjA2YTEsMSwwLDAsMCwxLC43NmMuNTcsMCwuNjEtLjU4LjY3LTFhNy43OCw3Ljc4LDAsMCwxLDItNGMuNC0uNDkuNi0xLjQ0LDEuNDYtMS4xM2ExLjg3LDEuODcsMCwwLDEsMS4xNCwyYzAsLjYsMCwxLjIyLS4wOSwxLjgxLS44Myw1LjUsMS42MywxMCw0LjM5LDE0LjM5LDEuNTQsMi40NCwyLjksMi4yMyw0LjQ4LS41MiwxLjQ4LTIuNTcsMi40NC0yLjgzLDQuNTQtLjYxYTE0LjU3LDE0LjU3LDAsMCwwLDEuMDgsMS4xNiwxLjUsMS41LDAsMCwwLDEsLjQ0Yy41OC0uMDguNDctLjY4LjUyLTEuMWExLjgyLDEuODIsMCwwLDAtLjgyLTJjLTEuNzMtMS0xLjQxLTIuMTIsMC0yLjksMy4xMS0xLjc1LDMuOTMtNC44Miw0Ljg2LTcuODQsMS4wOS0zLjU1LjA3LTcuMjMuNTktMTAuODJsLjEyLS4zNlptLTM2Ljc0LTE5YzIuMzctMS4xNCw0LjcyLTIuMzUsNy4xNC0zLjQsMS0uNDQsMS4wOC0uODUuNzUtMS44NkEzMy4xNiwzMy4xNiwwLDAsMSwyMDYsNzYuMjVxLjA1LTQuNTgsNC41Ny0zLjQ3YzEuNDkuMzcsMi45NC45MSw0LjgsMS41LTEuMjItMi4yLTIuMjctNC0zLjI0LTUuODUtLjYtMS4xNC0xLjIzLTIuNDUtLjE4LTMuNTZzMi40Mi0uNDEsMy42LDBjLjc3LjI5LDEuNDQuODIsMi4xOCwxLjE5LDEuMzIuNjUsMi43NywxLjkyLDQuMTIuNnMuMDctMi43LS40LTRjLS40MS0xLjEzLTEuMDktMi4xNi0xLTMuNDNzLjc2LTEuODgsMS45My0xLjU0QzIyNi44LDU5LDIzMSw2MC42MywyMzMsNjUuMzNjLjI2LjYyLjYxLDEuMjEsMS4xNSwyLjI4YTQ3LDQ3LDAsMCwxLDEuOTMtNy43NGMuODYtLjcsMS43NS0xLDIuNjctLjEsMi40LDQuMTUsMS44NSw5LDIuODIsMTMuNTEuODYtLjgyLDEuNTYtMS41MSwyLjI4LTIuMTZzMS4zMi0xLjY5LDIuNDUtMS4yMywxLjA1LDEuNTcsMSwyLjU1QTM5LjMxLDM5LjMxLDAsMCwwLDI0OC4yMiw4M2MxLDQsLjExLDctMy42Myw4LjkyYTEyLjE4LDEyLjE4LDAsMCwwLTEuNzYsMS40MmMtMi4zMSwxLjg1LTIuMzEsMS44NS4xNywzLjM1LDIuNjgsMS42Myw0LjIxLDQuMzgsMy43Niw2LjkzYTUuNTgsNS41OCwwLDAsMS01LjE0LDQuOTFjLTIsLjMyLTIuNjQsMS41Mi0yLjE0LDMuNjIuNjksMi45MSwxLjM4LDUuODcuNTgsOC45Mi0uNjYsMi41My0yLjE3LDQuNjMtMy4yNiw2Ljk0LTEuNzUsMy43MS0zLDcuNDItLjI1LDExLjI5LjY4LDEsLjYyLDIuMjkuNzgsMy40OS42NCw1LDEuMTgsMTAsMi43NywxNC44NSwxLjE1LDMuNDksMi42NywzLjg2LDUuNDcsMS4zM2E3LjA2LDcuMDYsMCwwLDAsMS40Mi0uNjdjNC45LTMuNzksMTAtNy4zNywxNC42MS0xMS40OEEzNi4zNiwzNi4zNiwwLDAsMCwyNzMuNCwxMjVjLjQyLTIuNi41Ni01LjIzLDEuMTQtNy44MywyLjM2LTEwLjUuNTctMjAuNzQtMi41Mi0zMC43Ny0xLjQ3LTQuNzctNC43OS04LjYyLTcuNjUtMTIuNzJhNTUuNSw1NS41LDAsMCwwLTEzLTEyLjc0Yy0zLjMxLTIuNDUtNy4yOS0zLjY1LTEwLjc5LTUuNzItNS4zNC0zLjE1LTEwLjg2LTUuNDQtMTcuMTgtNS43MS04LjYtLjM3LTE3LjEtLjQ4LTI0LjksNC0yLjA5LDEuMi00LjI2LDIuMjktNi4zMywzLjUzQzE4My4yNyw2Mi4zMiwxNzUsNjguMzgsMTY5LDc2LjkyYTYwLjEsNjAuMSwwLDAsMC02LjgyLDEyLjY3LDUyLjM4LDUyLjM4LDAsMCwwLTMuNzIsMTYuNTEsNDkuNzUsNDkuNzUsMCwwLDAsMS40OSwxNC41OWMxLjI1LDQuOTQsMy4zMyw5LjY5LDQuODYsMTQuNTQsMiw2LjI4LDUsMTEuNiwxMCwxNS44MSwxLjM3LDEuMTYsMi4xLDMsNCwzLjZhMy4yOSwzLjI5LDAsMCwwLDIuNjEsMi41M2MxLjI4LDAsLjMyLTEuNjIuOC0yLjM5YTEuNDIsMS40MiwwLDAsMCwuMDktLjIxYzEuNzUtNC4yLDIuNDQtOC42OCwzLjU5LTEzLC4xMS0uNDMuMzYtLjkyLDAtMS4yN3MtLjg1LS4wNy0xLjI1LjEyLS44LjQzLTEuMTkuNjVhMi4zNiwyLjM2LDAsMCwxLTIuNTgsMGMtMS0uNi0uMzUtMS40Ni0uMzEtMi4yNS4yOS02LjQyLDMuMi0xMiw1LjU4LTE3Ljc1LDEuNTYtMy43OSwzLjM4LTcuNCw2LjM5LTEwLjI5LjM2LS4zNCwxLS43Mi42MS0xLjMxLTEuMzEtMi4wNy40Ni0yLjc4LDEuNjEtMy43Ni44NC0uNzIsMi4zMi0xLjEzLDIuMTctMi4zOHMtMS43NC0uNzktMi41Ni0xLjM1Yy4xOS0xLjQ4LDEuNjktMS45LDIuMzgtM2w0LjcyLTIuNDItMy43OS0uOTFDMTk2Ljc1LDkzLjU4LDE5OC44NSw5My40MiwxOTkuNjEsOTIuNDNaTTcyLjQ2LDExOS4zYTYuMTcsNi4xNywwLDAsMC0uNzkuNjljLTEsMS4zOS0yLjExLDIuODgtNCwyLjNzLTEuODktMi40OS0xLjkxLTQuMTlhMzEuMjEsMzEuMjEsMCwwLDAtMS42OS05LjUzYy0xLjQ0LTQuMzUtNC4xMy04LTYuNC0xMi0xLjkzLTMuMzMtMS44MS0zLjM2LTUtMS42Ni0xLjkyLDEtNCwxLjY5LTUuMjEsMy43OUEyOS4yOCwyOS4yOCwwLDAsMSw0MCwxMDcuMjJhNi42Miw2LjYyLDAsMCwwLTIuNjIsNS41OCwzNC40MSwzNC40MSwwLDAsMS0yLDE1LjI5LDMuODEsMy44MSwwLDAsMCwuMTIsMS41NiwxNi41OCwxNi41OCwwLDAsMSwuMjcsMi4yM2MwLDEuNzctLjg4LDIuMjctMi41MSwxLjUxYTExLjksMTEuOSwwLDAsMS0xLjM1LS44M2MtMS40NS0uOTMtMi40MS0uNjktMi43MiwxLjEyYTExLjg5LDExLjg5LDAsMCwwLS4yNiwxLjc4Yy0uMDYsMy42My0xLjUzLDYuMDUtNS40NCw2LjQ0YTMuMTQsMy4xNCwwLDAsMC0uNjYuMTdjLTMuMjMsMS4wNy0zLjcxLDIuMy0xLjkxLDUuMTYsMS4zNCwyLjEzLDIuNTUsNC4yNSwyLjU5LDYuODlhMjUuNjksMjUuNjksMCwwLDAsLjQ5LDQuNDljLjg5LDQuNjQuOTMsNC42My0zLjczLDMuODQtMi42Ny0uNDUtNiwuOTEtNi44NywyLjkyLTEuMTUsMi41OC44MSwzLjksMi4zLDUuMzRhMjYsMjYsMCwwLDEsNiw3LjYzYzEsMi4xLjUzLDMuNjMtMS41NSw0LjQ2LTEuODkuNzYtMS44MiwxLjM3LS42MiwyLjgyLDEuODEsMi4xOSwyLjY3LDksMS4xNCwxMC4zLTEuNywxLjQ0LTEuMTgsMi43My0uNTUsNC4xNiwxLjIyLDIuNzksMi4zNyw1LjMzLDIsOC43NC0uMjcsMi4zNi0uNjcsNC4yNi0yLjIzLDUuNzVhMy41NiwzLjU2LDAsMCwwLTEuMDYsNGMuNTMsMS45MywxLjI0LDMuOTMtLjE5LDUuODdhLjgzLjgzLDAsMCwwLC4zNiwxLjMzYy44My4yOC42OC43Ny41NCwxLjQyLS42MiwyLjg2LjYsNSwyLjc2LDYuNzJhOS45NCw5Ljk0LDAsMCwxLDMuODcsNi45MiwxMi42MSwxMi42MSwwLDAsMCw1LjQzLDljMi44OCwyLjE3LDUuNzQsNC41Miw1LjY2LDguNzQsMCwxLjExLDEsMS42MSwyLDJzMS43MS44NywxLjc5LDEuODZjLjE5LDIuNDMsMS43OCwzLjU0LDMuNzksNC4zYTIuNDcsMi40NywwLDAsMSwxLjY3LDMuNTcsNS4yOSw1LjI5LDAsMCwwLC45NCw1LjMyLDI2Ljg3LDI2Ljg3LDAsMCwxLDIsMi43N2MxLjMyLDIuMTgsMS4xMiwzLjc2LS44MSw1LjM5QTQxLjY3LDQxLjY3LDAsMCwxLDQ0LjI2LDI4N2ExMS4yNCwxMS4yNCwwLDAsMC00LjA4LDUuMzFjLS43OSwxLjg2LS43NCwzLjkxLDEuMzQsNS4yYTcuOTEsNy45MSwwLDAsMSwzLjM4LDUuMTdjLjUyLDIuMTIuODksNC4yOCwxLjQsNi40LDEuNSw2LjI1LDMuOCwxMS44MiwxMSwxMy41OWE2LjMyLDYuMzIsMCwwLDEsNC41NiwzLjQ0YzEuMTYsMi42OSwzLjY3LDQuODQsMy4yMiw4LjI0LS4xLjc1LjYyLDEuNjgsMS4xMiwyLjQyLDMuMSw0LjY0LDgsNS45LDEzLDYuNzEsMi43My40NCw1LjYzLjEsOC4wOCwxLjc3YTEyLjA4LDEyLjA4LDAsMCwwLDEyLDEuMzdjMi4yMy0uOSw0LjQxLS44OSw2LjExLDEuMy40NC41NywxLjI1Ljg0LDEuOCwxLjM0LDIuODQsMi41Myw2LjQ1LDQuMzMsNy45LDguMTcuODUsMi4yNiwxLjY1LDQuNTUsMi4yNyw2Ljg4QTQ1LDQ1LDAsMCwwLDEyOC4wNiwzODNjMS41MiwxLjY3LDIuNzksMS41Nyw0LjEzLDBhNS4yMyw1LjIzLDAsMCwxLDQuNC0xLjg4YzEsMCwyLjA4LS4zNSwzLjEzLS40LDIuMjctLjEsMi42NC0xLjUsMi4yLTMuMjhhMTgsMTgsMCwwLDEtLjIyLTdjMS4zMy05LDQuMDktMTcuNTcsMTAtMjQuNjgsNC41Ny01LjU0LDkuNzMtMTAuNDIsMTctMTIuNThhMjUuMTMsMjUuMTMsMCwwLDAsMTAuNTctNS44M2MzLjg3LTMuNzcsNy40NC03Ljg0LDExLjY4LTExLjI0LDEtLjgzLDEuOS0xLjEzLDIuNTguMTMsMS4xMSwyLjA4LDEuNzcsMS4xLDIuNTQtLjIxLDEuNTMtMi42LDIuNjUtNS42Miw0LjcyLTcuNjksNC41MS00LjUyLDUuNjYtMTEuNDEsMTEuMS0xNS4xOS4yOC0uMTkuMzUtLjY2LjU3LTFhNTcuNCw1Ny40LDAsMCwxLDguODQtMTAuODNjMy4zOS0zLDQtMi44Niw1Ljg1LDEsMCwwLC4xMywwLC4yMy4wOC42NS0uMi42OS0uOSwxLTEuMzYsMi42My0zLjU3LDUtNy40Miw4LTEwLjYzYTE3LjA3LDE3LjA3LDAsMCwwLDQuOTMtOS4zNywxMSwxMSwwLDAsMSwxLjcxLTQuNTdjMS4yOC0yLDIuNjMtMy44OCwyLjU5LTYuNGExLjIzLDEuMjMsMCwwLDEsLjc1LTEuMjljLjc2LS4xOSwxLjA1LjUxLDEuMjgsMSwuMzkuOTEuNzIsMS44MSwxLjgyLDIuMDhhMTUuNjcsMTUuNjcsMCwwLDAsLjUxLTcuNDNjLS42NS0zLjIxLDAtNi4zLjE0LTkuNDUuMS0zLjQ0LDEuMDUtNi43OC44OS0xMC4yNGE1NS43Nyw1NS43NywwLDAsMSwwLTcuOTNjLjI5LTMsLjIxLTYuMDcsMS45MS04LjlhNi44Niw2Ljg2LDAsMCwwLC4zNy01LjI4Yy0uMzgtMS4zMi0uODctMi4yOS0yLjM0LTIuNjEtLjQ3LS4xLS43NS0uNy0uODUtMS4yNmE1OC42LDU4LjYsMCwwLDAtNC4zNi0xNC4zOWMtLjMzLS43MS0uNjgtMS43OC41Mi0yLDEuNDctLjMyLDEuMTMtMS4xMS43OC0ycy0uNzktMi0xLjIxLTIuOTNjLTEuMzUtMy4xNS0yLjQ3LTMuODgtNS44Ny0zLjgxLTIuODkuMDYtNS42MSwxLjExLTguNDYsMS40Mi0zLjc0LjQxLTcuNS42Ni0xMS4yMiwxLjIzYTEzNi44OSwxMzYuODksMCwwLDEtMTUuNDYsMS44NWMtNi43Mi4yNi0xMy40Mi4xLTE5LjkzLTItMi4xLS42OC0zLjEzLjE0LTMuMzgsMi4zNC0uMTQsMS4yLS4zMSwyLjM5LS40NCwzLjU5YTEuNzgsMS43OCwwLDAsMS0yLjMyLDEuNzcsNS43NSw1Ljc1LDAsMCwwLTQuMzksMS4yMWMtMi41NCwxLjcxLTQuNDIsNC4wOC02LjU5LDYuMTctLjQ2LjQ0LS43NCwxLjA4LTEuNjYuODUtMy41OC0uODktNS43MywxLjgyLTcuNTMsMy45LTEuNTEsMS43NC0yLDMuNzEtNSw0LjM1YTI5LjE3LDI5LjE3LDAsMCwwLTkuNjcsNC4yOSwzLjg2LDMuODYsMCwwLDEtMS45NS40NiwyMC42MiwyMC42MiwwLDAsMS0xNi44LTUuNzNjLS42MS0uNTgtMS4zNC0xLjUtMi4zMy0uNzQtMS4yOCwxLTIuMi4yMy0zLjI5LS4zMy0zLjExLTEuNjEtNS42MS00LjE3LTkuMTktNS4xNGExNC43NywxNC43NywwLDAsMS01LjQ2LTIuNTZjLS40Ny0uMzgtMS4zNC0xLS45Mi0xLjMzLDIuMDUtMS43MS0uMjQtMi4yMi0uODUtMi44MS0zLjY1LTMuNTctNy4xMi03LjE4LTguNjMtMTIuMjdhNiw2LDAsMCwwLTIuMzgtMy4yNSwxMC4xNywxMC4xNywwLDAsMS0yLjgyLTMuMTljLTQuNzEtNy4yNi03LjA1LTE1LjQ1LTkuNDUtMjMuNjMtMS41LTUuMTQtMS41Mi0xMC44MS01LjI5LTE1LjE5LS40OC0uNTYtLjQ1LTEuNTctLjY2LTIuMzdDNzMuMzEsMTI0LjI0LDczLjM4LDEyMS43OCw3Mi40NiwxMTkuM1ptMTI0LjYtOS45NGExNC4xNCwxNC4xNCwwLDAsMS0yLjM4LDMuMjIsMTksMTksMCwwLDAtNS44Miw4LjUxYy0xLjYxLDQuNDctMi44NSw5LjA2LTQuMjMsMTMuNjEtLjI1LjgtMS4zMSwxLjY1LS40LDIuNDNzMS41Ny0uMzEsMi4xNC0uNzdjMS4wOS0uODcsMS42LS40NiwyLjM1LjQ1LDEuNzQsMi4xLjQyLDQtLjIxLDYtMS4xOCwzLjY1LTMsNy4xMS0zLjc0LDEwLjktLjYsMi45MS4xNywzLjczLDIuOTQsMy4xNSwxLjU1LS4zMiwyLjIxLjMyLDIsMS43NmEyNy44MSwyNy44MSwwLDAsMS0uODYsMy4yN2MtLjQ0LDEuNy0uMTYsMi44NSwxLjg4LDMuMywzLjY4LjgyLDcuMywxLjgyLDExLjEzLDEuODEsNS44OSwwLDExLjc5LjI5LDE3LjY1LS41MmExMDQuNDEsMTA0LjQxLDAsMCwwLDE4LjItNC41MmMxLjQ0LS40NywxLjcyLTEuMTcuODYtMi40OXMtMi4yMS0yLjk0LTIuNDQtNC41NWMtLjQ5LTMuNDQtMS41Mi02Ljc3LTEuOTQtMTAuMjEtLjI4LTIuMjgtLjUyLTQuNTMtMy4zOS01LjE4LS41OS0uMTMtMS4wOC0uOC0xLjU5LTEuMjUtMS45NC0xLjY5LTItMS42Ny0yLjg2LjgxLS45MywyLjczLTIuNiwzLjMtNS4wNywxLjc1YTgsOCwwLDAsMS0yLjI0LTIuMiw5Mi45Miw5Mi45MiwwLDAsMS01LjU2LTguMiw5LjM5LDkuMzksMCwwLDAtLjI0LDIuODksMS44OSwxLjg5LDAsMCwxLTEuMjQsMi4xNmMtMS4xNi40LTEuODItLjI4LTIuMzctMS4yMWE4Ljc5LDguNzksMCwwLDEtMS4yMi0yLjljLS4zNS0xLjg1LS43LTMuNy0xLjA4LTUuNTRhMiwyLDAsMCwwLTIuMTItMS43Yy0xLjI3LjE4LS40NywxLjM0LS40MiwyLjA1YTIwLjA5LDIwLjA5LDAsMCwwLC40OSwyLjY3Yy4yNSwxLjIzLjQ1LDIuNzUtLjc3LDMuMjVzLTIuMTgtLjkxLTMtMS44OWExLDEsMCwwLDEtLjExLS4yLDM5LjgyLDM5LjgyLDAsMCwxLTMuNjEtMTEuMTVDMTk3LjM0LDExNS43MywxOTcuNDEsMTEyLjU4LDE5Ny4wNSwxMDkuMzZaTTE2Ni40Niw0MTYuMDdjLjc1LDAsMS41MSwwLDIuMjYsMHMxLjQ2LDAsMS44Mi0uNjgtLjI5LTEuMjMtLjY4LTEuNzZhMTUuNDEsMTUuNDEsMCwwLDAtMy44LTMuODIsNC40NCw0LjQ0LDAsMCwxLTEuNjYtMy42OWMwLTEuMSwxLjc0LTEuMTEsMi43OS0xLjQzYTExLjI1LDExLjI1LDAsMCwxLDUuMTUtLjE4YzEuNTIuMjUsMS44NC0uNjYsMS44OS0xLjg0cy0uNTUtMS43Mi0xLjgzLTEuNThhMjQuNjcsMjQuNjcsMCwwLDAtNi4zOSwxLjMzLDYuNjEsNi42MSwwLDAsMS01LjQ3LS4yNmMtMi41Mi0xLjE5LTUuMDctMi4zMi03LjYtMy40OC0uNTUtLjI1LTEuMTMtLjYyLTEuNjgtLjE0YTEuMzIsMS4zMiwwLDAsMC0uMSwxLjY4YzIuMDUsNC4xNywzLjEsOC44Myw2LjE3LDEyLjUxLjczLjg4LDEuMzQsMS45MywyLjU1LDIuMDlDMTYyLjEsNDE1LjEyLDE2NC4xMiw0MTYuNDksMTY2LjQ2LDQxNi4wN1ptLTQ0LjQtMTIuNjljMi40MiwxLjkzLDguNTMsMS4zMiwxMC4xOS0xLjA2LjgzLTEuMTguMjItMi40OC0uMzktMy42M2EuNzguNzgsMCwwLDAtMS4zNC0uMTZDMTI4LjE1LDQwMC44NiwxMjQuNjUsNDAxLjE2LDEyMi4wNyw0MDMuMzhaTTE3Mi45NSwzNi42NGMuMjIsMCwuNDUsMCwuNjctLjA2Ljg5LS4xNSwxLjc4LS4yNywyLjY2LS40NiwyLjExLS40NSwyLjM1LTEsMS4yMS0yLjktMS43OS0zLTEuOC0zLTQuNDQtLjc4YTkuMjcsOS4yNywwLDAsMC0xLjQ2LDEuMzljLS40My41Ni0xLjIzLDEuMDktLjgsMS45M1MxNzIuMSwzNi42NywxNzIuOTUsMzYuNjRabTc3LjMyLTMuMTRjLjY1LS45NSwxLjMyLTEuODMsMS44OC0yLjc4cy0uNC0xLS44Mi0xLjI2Yy0xLjQ0LS45NC0yLjkxLTEuODQtNC40LTIuNzEtLjUyLS4zLTEuMTctLjU4LTEuNjQsMHMwLDEuMDYuMzEsMS40M2MxLjMsMS42NCwyLjY3LDMuMjMsNCw0LjgzQTMuOCwzLjgsMCwwLDAsMjUwLjI3LDMzLjVabTQuODUtLjgyYy0xLjE2LDAtMi4yOCwxLjYxLTEuNjIsMi41N0E4LjEsOC4xLDAsMCwwLDI1OCwzOC40NGExLDEsMCwwLDAsMS40My0xQzI1OS41NiwzNiwyNTYuNTcsMzIuNzEsMjU1LjEyLDMyLjY3Wk0xODguNTQsNDQwLjc1Yy41LjQ2LDEuMTUuMSwxLjcuMjlzMS4yNC41NCwxLjg4Ljc0YzEuMS4zNCwyLjU2LDEuNzgsMy4xOS44Ni44Mi0xLjE5LTEuMDctMi0xLjgyLTIuOTFDMTkxLjM2LDQzNy4xMiwxODkuNzksNDM3LjQ3LDE4OC41NCw0NDAuNzVaTTI2MS4xMywyMC4yOGMuNDIsMCwuNzgtLjU2LDEuMjEtMXMuMTktLjY4LS4xNS0uOTRhMjAuNzksMjAuNzksMCwwLDAtNC45MS0zLjE3Yy0uNjctLjI3LTEuMjMsMC0xLjIuODFTMjYwLjA5LDIwLjMsMjYxLjEzLDIwLjI4Wm0tODcuMzgsM2MxLjUxLS41LDIuMi0xLjkyLDMuMTgtMywuMjUtLjI4LjQ4LS43Ni4xNi0xLS45NS0uNzUtMS44NC4yLTIuNzguMjNhNSw1LDAsMCwwLTEuMzEuMzFjLS42OC4yMi0xLjY4LjI0LTEuNDEsMS4zM0EyLjk0LDIuOTQsMCwwLDAsMTczLjc1LDIzLjI0Wk0yNjksMjQuNjFhMTEuNzQsMTEuNzQsMCwwLDAtMy40Ny0zLjhjLTEuMTgtMS0xLjY0LjIxLTIuMTQuNzYtLjc3Ljg1LjIxLDEuMTQuNzQsMS40NCwxLjIzLjcyLDIuNTEsMS4zNywzLjc3LDJDMjY4LjQyLDI1LjMyLDI2OC45MiwyNS40OCwyNjksMjQuNjFaTTE2Ny4xNiwyNS43OWMuNjgtLjIxLDEuNTQtLjQ1LDIuMzgtLjc1LjYzLS4yMiwxLjQtLjQ4LDEtMS4zOC0uMzEtLjczLS42NS0xLjc2LTEuNjEtMS42M2E0Ljc5LDQuNzksMCwwLDAtMywyLjE1LDEsMSwwLDAsMC0uMTksMS4yNEMxNjYsMjUuODUsMTY2LjUyLDI1LjgyLDE2Ny4xNiwyNS43OVptMTAuMjMsMzc1LjUyYy41NS43LS42NywyLjMyLjg4LDIuMjYsMS4xMSwwLDMtMSwyLjg4LTEuOTQtLjEyLTEuMTItMS44MS0yLjA4LTMuMDctMi4yMlMxNzcuNzIsNDAwLjY0LDE3Ny4zOCw0MDEuMzFabS02MiwxMC4xN2MxLjc5LS44MSwyLjY4LTIuNDEsNC4wOS0zLjM1YS44Ni44NiwwLDAsMCwuMDktMS4zNywxLDEsMCwwLDAtMS40MywwQTYuMzIsNi4zMiwwLDAsMCwxMTUuMzksNDExLjQ4Wm03NiwyLjkxYy0uOTEuMzgtMi40MywwLTIuNzYsMS4yNy0uMjEuOC43NywxLjY1LDEuNzUsMS43LDEuMzYuMDcsMi0xLDIuMzItMi4wOEMxOTIuOTEsNDE0LjQ0LDE5Miw0MTQuNTEsMTkxLjM1LDQxNC4zOVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTg3LjQ2LDQ4Yy4wNywwLC4xNiwwLC4yLjEsNC4zMSw1LjQsMy42OCw0LS45Miw3LjI0LTExLjgyLDguMzQtMjIsMTguMDYtMjcuMywzMi4wNi00LDEwLjYtNC41MiwyMS40NS0zLjE1LDMyLjU2LjkxLDcuMzYsMy40LDE0LDYuNTYsMjAuNzZhNDcuNTMsNDcuNTMsMCwwLDAsOS40MiwxMy41OSw2MC41Nyw2MC41NywwLDAsMCw3LjA5LDYuMjhjMSwuNywyLjA4LDEuMzIsMi4xMiwyLjc1bC0xLjczLjQ3YTk3LjQ0LDk3LjQ0LDAsMCwxLTExLjM1LTkuMjUsNjQuNzIsNjQuNzIsMCwwLDEtMTguMTYtMzQuNzQsNjUuMSw2NS4xLDAsMCwxLDYuMy00Mi41OUE2NCw2NCwwLDAsMSwxODYsNDguNDksMTQuNjEsMTQuNjEsMCwwLDEsMTg3LjQ2LDQ4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy0yXCIgZD1cIk0yNDkuNDgsMTYwLjE0YzUtMy42Myw5Ljc0LTcuNjYsMTQuNDItMTEuNzEsNC4yOS0zLjcyLDYuNTgtOC43NSw4Ljg3LTEzLjc5LDUuNjQtMTIuMzksNi40Ni0yNS4yNCw0LjQ3LTM4LjU2LTEuMTgtNy45My00LjItMTUuMTUtNy43LTIyLjEzLTIuNzEtNS4zOS03LjY0LTkuMTEtMTIuNDQtMTIuNjgtNS4yMS0zLjg4LTEwLjU4LTcuNTQtMTYuNzYtOS43Ny0xLjE0LS40MS0xLjM4LTEtLjU0LTIsLjY5LS44LDEuMzItMS42MywyLTIuNDVhODAuNTcsODAuNTcsMCwwLDEsMTUuNjIsOS44Miw2OC40LDY4LjQsMCwwLDEsMTUuNCwxOC40OCw2Ny4xMSw2Ny4xMSwwLDAsMSw4LDI0LjA4LDYzLjcsNjMuNywwLDAsMS0xLDIyLjJjLTMsMTQuNDYtMTAuMzcsMjYuNC0yMS4zMiwzNi4xOGE0My4xLDQzLjEsMCwwLDEtNi44OCw1LjA4QzI1MS4yLDE2MS43LDI1MCwxNjEuMTcsMjQ5LjQ4LDE2MC4xNFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtM1wiIGQ9XCJNMTI3LjUzLDM4OC44MmMuNzYsMS4zLDEuNDgsMi42MiwyLjMsMy44OHMuMzMsMi4zLS40NCwzLjMxYy0xLjY0LDIuMTYtNC4wOSwzLTYuNDksMy45M3MtNSwxLjExLTQuOTIsNC41OGMwLC40MS0uNzcuODYtMS4yMSwxLjI2LTEuNDgsMS4zNS0yLjc0LDIuODQtMi45MSw0Ljk0LS4wOCwxLS41OSwyLjI5LjQ4LDIuOTNzMi0uNDUsMi43NS0xLjA4YzEuMzUtMS4wOCwyLjYzLTIuMjUsMy44Ny0zLjQ2YTIsMiwwLDAsMSwxLjc5LS43MywxMC4zMiwxMC4zMiwwLDAsMCw3LjY0LTIuMTNjMS42MS0xLjE3LDMtMS42Nyw0LDEsMS40LDMuNzIsMy44Myw3LDQuODEsMTAuOTIsMS40NSw1LjczLS4yNCwxMS4wNS0yLjY3LDE2LjE4YTUuNDUsNS40NSwwLDAsMC0uODgsMy40Miw0LjQyLDQuNDIsMCwwLDEtMSwzLDExLDExLDAsMCwwLTEuNzYsNS41NWMwLC44OSwwLDEuOTMsMS40LDEuNjVsMCwwYzEuNi44LDIuNDItLjU1LDIuOTItMS40NCwyLjk1LTUuMjgsOC4xMy03LjMyLDEzLjI2LTkuNDcsMi41NS0xLjA3LDQuODgtMi43OCw3LjgtMi44My44MiwwLDEuODItLjI1LDIuNDQuMTIsMy43MSwyLjE5LDguMTIsMi41OSwxMS44NCw0LjYxLDQuNzMsMi41Nyw5LjU0LDQuNDYsMTUsNGExMi45MywxMi45MywwLDAsMSw1LjcxLDEuMTJjMS42MS42MywzLjI0LDEuMjYsNSwuNjctLjcxLDIuMjUtMi40NSwyLjEtNCwxLjMyLTMuMTItMS42Mi02LjUtMS44MS05Ljg1LTIuMjlhNjUuNjUsNjUuNjUsMCwwLDEtMTEuMDYtMi4yNGMtNC44LTEuNTctOS43LTIuODQtMTQuMzUtNC44NWEzLjMzLDMuMzMsMCwwLDAtMy4wNS0uMWMtNC4yNCwyLjM5LTkuMTgsMy4zMi0xMyw2LjY0LTIsMS43LTQuMzIsMi44NS01LjY2LDUuMjlhMi43NCwyLjc0LDAsMCwxLTMuNzUsMS4xNywyLjc5LDIuNzksMCwwLDEtMS41Mi0zLjQzYy42Ni0zLjIzLDEuNzMtNi40MSwyLTkuNjcuMzEtMy40OSwyLTYuNDQsMi44NS05LjcyYTIuNTcsMi41NywwLDAsMCwuMTUtMS4zMmMtMS41LTQuMjItMS40MS04LjgxLTMuMTQtMTMtLjI4LS42Ny0uMy0xLjU0LTEuMjgtMS42Ny01LjM3LS43Mi0xMC41Mi0uMTgtMTUuMjcsMi42OGExOS4zOCwxOS4zOCwwLDAsMS0yLjE1LDEuMjUsMi43MywyLjczLDAsMCwxLTMuNDYtLjg1LDIuODEsMi44MSwwLDAsMS0uMS0zLjU2YzItMy4xLDMuODQtNi4yNyw1Ljg1LTkuMzUsMS41OC0yLjQyLDQuNDYtMi45Myw2Ljc0LTQuMzJhMS4wNywxLjA3LDAsMCwxLC4yMi0uMDZjNC4zMS0xLjQzLDQuNzUtMi4zOSwzLTYuNDlMMTI3LDM4OC45WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk03OS41MSwxMjcuMzhjLTEuODUtMi0xLjgtNC44NS0yLjg0LTcuMjNhMjAuNjMsMjAuNjMsMCwwLDAtMi41OS00LjQ4Yy0xLjExLTEuNDMtMi4xMy0xLjIzLTIuODEuNDItLjQ0LDEuMS0uNjMsMi43OC0yLjA2LDIuNThzLTEuNDktMi0xLjU2LTMuMThjLS41Ni05LjQ1LTUuMzYtMTYuOTUtMTEtMjQuMDYtMS4zNi0xLjcyLTIuNjktMS41Ni00LjA3LjE3LS4zOC40Ny0uNjksMS4xMi0xLjE4LDEuMzUtMy43NiwxLjczLTUuNjQsNS4zLTguMDksOC4yNmEyMS42NywyMS42NywwLDAsMS01LjU1LDQuOTMsNC40LDQuNCwwLDAsMC0yLjI3LDMuN2MtLjE1LDMuMzctMS4yMyw2LjcyLS4yOCwxMC4xMmExLjE1LDEuMTUsMCwwLDEtLjI1LDEuMjdjLTEuNzIsMS4yMy0xLjQyLDMtMS40Myw0LjczLDAsMi41LS45MSwzLjItMy40MiwyLjdzLTMtLjE0LTMuMzUsMi40M2MwLC4zLDAsLjYsMCwuOTEtLjMsNS0zLDcuNy04LDguMTQtLjY3LjA2LTEuMzYsMC0yLDBBNi44MSw2LjgxLDAsMCwxLDIxLjczLDEzN2EyLjUsMi41LDAsMCwwLDIuMzQtMi43MWMuMTYtMi40MS4zNi00Ljg3LDIuNjktNi4zOWExMS4zOCwxMS4zOCwwLDAsMSwxLjEyLS43MmMxLS40OCwyLjc1LDEsMi45Mi0xLjM1LjA5LTEuMjUuODEtMi4zMiwxLjA2LTMuNTlhNzEuMjMsNzEuMjMsMCwwLDAsLjg2LTEyLjYsNC43Nyw0Ljc3LDAsMCwxLDEuNDUtMy40OGM0LjQ1LTQsNy40LTkuMzcsMTEuODQtMTMuMjksMi41LTIuMiw1LjM2LTQuMzMsOS4xOS00LjUsMi45NC0uMTMsNC42MiwxLjQsNS44MSwzLjQ3LDEuMzksMi40MiwyLjg5LDQuNzcsNC4zNSw3LjE0YTMzLjU4LDMzLjU4LDAsMCwxLDQuOTEsMTRjLjEzLDEuMTUuNTksMS4yOSwxLjU2LDEuMzIsNC4wNy4xMiw1LjYsMS41MSw2LjExLDUuNTZBNDYuMTEsNDYuMTEsMCwwLDAsNzkuNTEsMTI3LjM4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk00MS40NCwyNzEuMzFjMS4zMSwyLjgyLDIuMTMsNS44NSw0LjM3LDguMjIsMS4yLDEuMjcuNCwyLjc3LS41OCwzLjg0LTEuNzIsMS45LTMuNTksMy42Ny01LjQyLDUuNDdhOS4zMiw5LjMyLDAsMCwwLTIuOTMsNWMtLjM3LDIuMTQtLjY4LDQuMDksMiw1LjUsMy4xOSwxLjY2LDMuMjYsNS4zNywzLjYsOC40LjY3LDYsMy40NCwxMC44LDcuNjMsMTQuOTVhOC4zOCw4LjM4LDAsMCwwLDQuNTIsMi40M0E3LjE2LDcuMTYsMCwwLDEsNjAuMzcsMzMwYTQ4Ljg2LDQ4Ljg2LDAsMCwwLDYuNzcsMTEuN2MyLjMyLDMsNSw0LjksOSw0LjU1YTQ4LjY0LDQ4LjY0LDAsMCwxLDUuMi4wOWMyLjgyLjA2LDQuODgsMS45Miw3LDMuMzFBOC44NSw4Ljg1LDAsMCwwLDk1LjI1LDM1MWExMC4xNCwxMC4xNCwwLDAsMSw2LC4yNSwxNC43OCwxNC43OCwwLDAsMS0xMi41MS40Nyw0OC4yMiw0OC4yMiwwLDAsMC0xNC40Ni00Yy01LjQ4LS42LTkuMzYtMy45MS0xMi42My04QTQuMjYsNC4yNiwwLDAsMSw2MC41LDMzN2MuNC0zLjE0LTItNS4wNy0yLjkxLTcuNjNhMy4xNSwzLjE1LDAsMCwwLTIuNDMtMS44M2MtNy45Mi0yLjM2LTExLjc3LTguMTctMTMuNDctMTUuODItLjQ0LTItLjkyLTQtMS4zMi02YTguODQsOC44NCwwLDAsMC0yLjY5LTQuODQsMTAuNSwxMC41LDAsMCwxLTEuNTctMTIuMzYsMjAuNjQsMjAuNjQsMCwwLDEsNi43NS02LjljMS4yNS0uOCwxLjcyLTEuMzYuNTctMi42OUE4LjgyLDguODIsMCwwLDEsNDEuNDQsMjcxLjMxWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk0yNTEuODgsMjU2Ljg5YzEuMS04LjEyLS43MS0xNi40MywxLjYzLTI0LjQ3YTEyLjI1LDEyLjI1LDAsMCwwLC4xNS0yLjI1LDY2LjgzLDY2LjgzLDAsMCwwLS4xNi04LjUyYy0uMTctNSwxLjM1LTkuNDUsMi40My0xNC4xYTEyLjM2LDEyLjM2LDAsMCwwLTEuNjktMTAuMDVjLTEuOTQtMy0zLTYuNTQtNC40Ni05Ljg1LS4xOC0uNDItLjIyLTEuMDcuNC0xLDIuNjkuMjIsMS4yNC0xLjI4Ljg5LTIuMTdhODAuNjgsODAuNjgsMCwwLDAtNC4xNS0xMGMtMS4yNi0yLjI3LTEtMy40MywxLjE3LTQuNTRhMi4yMSwyLjIxLDAsMCwwLDEtMi4xM2MwLTEuMjEsMC0yLjQxLjA3LTMuNjJsMi4xNy0uODljMCwxLjgxLjA2LDMuNjIuMDksNS40M2EyLjE5LDIuMTksMCwwLDEtLjg0LDJjLTEuNSwxLTEuMzgsMi4wNS0uNDksMy41M2ExNC43MiwxNC43MiwwLDAsMSwyLDEwLjYzYy0uMjYsMS4zNC4zNiwyLjQuNzMsMy40NSwxLjE3LDMuMy44OCw3LjIxLDQuMDgsOS43MWE0LDQsMCwwLDEsMS4xMSwyLjY1Yy4yLDMsLjkzLDYuMjYtLjMsOS0yLjc4LDYuMTMtMS44NywxMi41LTIuMTIsMTguODFhNTUuMSw1NS4xLDAsMCwxLS42OSw3LjE4Yy0xLDUuNTUuNTcsMTEuMTItLjMsMTYuNjlBNiw2LDAsMCwxLDI1MS44OCwyNTYuODlaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTRcIiBkPVwiTTE3OS43NiwxNjMuNzZsMS43My0uNDdjLjM3LDEuODEtLjg2LDMtMS43Niw0LjI0LTEuMzQsMS44OC0xLjgsMy42NC0uNTEsNS44MywxLjUzLDIuNTksMCw0LjgxLTEuOCw2LjQtMywyLjYyLTYuMTIsNS4wOS04LjY0LDguMjJhMy40OCwzLjQ4LDAsMCwxLTIuNjEsMS4xOCwxMC4zOCwxMC4zOCwwLDAsMC03LjI2LDMuNjZjLTUuODgsNi4zNi0xMy40MSw4Ljk1LTIxLjg3LDktNi4zLjA3LTEwLjY3LTMuNDQtMTQuMTctOC4yOSwyLjQxLS43Niw0LjIzLjM0LDUuODcsMS45MmExOC4zMywxOC4zMywwLDAsMCw1LjQ5LDMuNTJjMy4xMiwxLjM1LDYsMi4xMiw5LjM1LS4xMiwyLjY5LTEuODIsNS45NS0yLjg2LDktNCwxLS4zOC42OC0xLjI0LDEuMi0xLjcsMy4wOC0yLjY3LDUuNTktNi4yNywxMC4zLTYuMjMuOSwwLDEuMzItLjY4LDEuODEtMS4yMWEzNy43OCwzNy43OCwwLDAsMSw2LjI1LTUuNTQsNyw3LDAsMCwxLDEuNTMtLjkzYy45NS0uMzQsMi40Mi0uMjIsMi42OC0xLjJhMTAuMTQsMTAuMTQsMCwwLDAsLjU3LTQuMzZDMTc2LjM2LDE3MCwxNzYuMTcsMTY2LjMyLDE3OS43NiwxNjMuNzZaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTRcIiBkPVwiTTE0LjQyLDE4Ny4zM2MzLjg5LDEuNjYsNS4yMSw0LjEyLDIuOTIsNy0xLDEuMy0uNjcsMi44MSwwLDQuMDhhMTEuNCwxMS40LDAsMCwxLC44Niw4LjMzYy0uMDkuNDMtLjI1LDEuMDcsMCwxLjMyLDEuODEsMi4xNy0uMjUsMy41NS0uNzgsNS4zOC0xLjY4LDUuODItNC4zNSwxMS41Ni0uNDYsMTcuODYsMS41OSwyLjU4LDMuNjUsNC44MSw1LjEsNy40Ni41OCwxLjA2LDEuNDcsMiwxLjQxLDMuMjgtLjExLDIuNTIsMS4xNiw0LjI3LDIuODEsNS45MiwyLjE2LDIuMTcsMy42MSw1LDYuMjcsNi43MiwxLjM2Ljg5LDEuNjEsMi40NywxLjQ4LDQuMDctLjE3LDIuMTIuMTksMy44OSwyLjU5LDQuNjRhMi43OSwyLjc5LDAsMCwxLDEuNjksMkEyLjI4LDIuMjgsMCwwLDAsMzkuNDQsMjY3YTMuNDIsMy40MiwwLDAsMSwxLjg0LDMuNzljLTIuMTMtMS4yMi00LTIuNy00LjgyLTUuMTIsMC0uMDcsMC0uMTgtLjA3LS4yMS0zLjM0LTEuOTItMy41LTUuNjUtNS04LjYzLTEuMTQtMi4yNy0zLjU3LTMuNDEtNS4zNi01LjEzYTEzLjY0LDEzLjY0LDAsMCwxLTQuNTQtOC4zNiwxMC42MywxMC42MywwLDAsMC00LTcuMTEsOC4wOSw4LjA5LDAsMCwxLTIuODYtNS44OGMtLjE5LTItMS4zNC0zLjg5LTEtNmE2NC41NSw2NC41NSwwLDAsMCwuMzItOS44OSwzLjYsMy42LDAsMCwxLDEuNDEtMi43YzIuMjEtMi4xMiwyLjY0LTMuOTQsMS4yMy02LjY3YTE3LDE3LDAsMCwxLTEuODktOS40Yy4wNi0uNjctLjA5LTEuNDIuNDgtMS45MiwyLjExLTEuODMsMS4yNy0zLjU2LS4xLTUuMzJBOS41Niw5LjU2LDAsMCwxLDE0LjQyLDE4Ny4zM1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMjM5LjI5LDQ2LjI3YTE2LjI2LDE2LjI2LDAsMCwwLTEuMjMsMS44OGMtLjg3LDEuODItMi4xNiwxLjgyLTMuNzQsMWE0Mi4yMyw0Mi4yMywwLDAsMC0xNy42NC00LjVjLTguMDYtLjI1LTE1Ljc4LDEuMTktMjIuNjIsNS44LTEuMDkuNzQtMS43MSwxLTIuNC0uNDZhMjYsMjYsMCwwLDAtMi4yOC0zLjM1YzUuMDctMS42NCwxMC4wOC0zLjQ4LDE1LjQtNC4yM0MyMTYuNjIsNDAuNzYsMjI4LjE1LDQxLjc1LDIzOS4yOSw0Ni4yN1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtNFwiIGQ9XCJNMTQ2LjMyLDM4M2MtMS40NS0xMC40Mi0xLjA4LTIwLjYsNC0zMC4xN2EzOSwzOSwwLDAsMSwxMi4zMi0xMy42OCwxOC41OCwxOC41OCwwLDAsMSwxMS4zNi0zLjhjMi4wOS4wOCwyLjktMS42Nyw0LjE3LTIuNzguNDQtLjM4Ljc5LTEuMDYsMS40OS0uODFzLjQ1LDEsLjU3LDEuNThhMzMuMTcsMzMuMTcsMCwwLDEtMTAsNC45M2MtOC43OSwzLTE0LjM2LDkuNDYtMTguNDksMTcuMzdBNDguODEsNDguODEsMCwwLDAsMTQ3LDM2OS41NWExOS40NSwxOS40NSwwLDAsMC0uMjYsNi41MSwxNi42MywxNi42MywwLDAsMS0uMTYsNi41M1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtNFwiIGQ9XCJNMTk1LjEzLDMyMi41M2MxLjY2LTMuMTIsMy4zMy02LjI0LDUtOS4zOGE5LjIxLDkuMjEsMCwwLDEsMi42NC0yLjk1YzEuNDMtMS4xNSwyLjE5LTMsMy4zMi00LjU2LDQuMjctNS43Miw4LjQtMTEuNTQsMTIuNTQtMTcuMzUsMS0xLjQ0LDIuNDMtMi40NywzLjU2LTMuNzkuNS0uNTgsMS4wNi0xLjIxLDEuOTItLjg2cy41NywxLjI5LjU4LDJhOC40NSw4LjQ1LDAsMCwxLS4yNiwxLjUzYy0uNzUtLjcyLTEuMzEtLjM3LTEuODQuMzEtMS41NywyLTMuMzIsMy45My00LjY3LDYuMDlhMjUuMzksMjUuMzksMCwwLDEtNC40MSw1LjRjLTEuMjcsMS4xNi0yLjU2LDIuMTktMi41Niw0LjI1LDAsMS4xNS0xLDIuMTUtMS44NSwzLTMuNiw0LTYuMjYsOC42NS05LDEzLjI3QzE5OSwzMjEuMzUsMTk3LjczLDMyMy4xLDE5NS4xMywzMjIuNTNaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTRcIiBkPVwiTTIyNy43NSwyODcuNTJBMzMuMjUsMzMuMjUsMCwwLDEsMjM1LDI3Ni4xNmMzLjYyLTQsNy4xLTgsOC41MS0xMy40LjUzLTIsLjQ2LTQuNDQsMi41MS01Ljg5LjUyLS4zNy41Ni0xLjQ0LDEuNC0xLjMsMSwuMTcuNzIsMS4xNi44OCwxLjg1YTExLjA2LDExLjA2LDAsMCwwLC4zNiwxLjA2Yy0yLjM1LDEuMzItMi40NywzLjc4LTIuODcsNmExNy4xNCwxNy4xNCwwLDAsMS00LjY4LDguODJjLTMuMjgsMy40NC01LjgyLDcuNDItOC41NywxMS4yNUMyMzEuMzMsMjg2LjE3LDIzMC4zLDI4OC4wNywyMjcuNzUsMjg3LjUyWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk0xMjAuNzQsMTkyLjljLTEuMDcsMy0xLDIuODMtMy42MSwxLjA5LTQuNzktMy4xNy05LjYzLTYuMjctMTMuNTktMTAuNDctNC42Ny01LTguNDUtMTAuNDMtOS4yMi0xNy40N2ExNS41NCwxNS41NCwwLDAsMSw1LjUxLDcsMTguODgsMTguODgsMCwwLDAsNi4xNiw4Ljc4YzIuNjEsMi4wOSwzLjc3LDYsNy4xNyw2LjhDMTE2LjIsMTg5LjQxLDExOC4zMiwxOTEuMzIsMTIwLjc0LDE5Mi45WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk05Mi41OSwxNjMuMjdjLS42LjExLTEuMjUtLjcxLTEuNy0uMTctMS44MSwyLjE1LTEuODIuMDYtMi4yNy0uOTJBMTEyLjA3LDExMi4wNywwLDAsMSw4My4xMywxNDdjLS44OS0zLTEuNTUtNi4xMS0yLjI4LTkuMTgtLjA5LS4zOS0uMjQtMS4xMy4zNS0xLjA5LDIuNjEuMTYsMS4xMi0xLjQ5LDEtMi4zMy0uMjQtMS41OC0xLjI1LTIuODktMS45MS00LjMyLS40LS44Ny0xLjEtMS42Ni0uOC0yLjc0LDIuOTUsMi4zNCwzLDUuODYsMy44Miw5LjEyQzg1LjU4LDE0NS42OCw4OC4yLDE1NC43OCw5Mi41OSwxNjMuMjdaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTNcIiBkPVwiTTE4OS43Niw0MjIuNTNjMC0yLjE1LjY2LTMuODMsMy00LjY5YTIuNzMsMi43MywwLDAsMCwxLjk0LTMuNDFjLS41Ni0xLjczLTIuMTktMS41Ny0zLjY0LTEuNDhhMTA0LjI0LDEwNC4yNCwwLDAsMC0xNS43NiwxLjcyLDIuNDksMi40OSwwLDAsMS0yLjQ2LS44NGMtMS41OS0xLjgxLTMuMTYtMy42NC00LjYzLTUuNTUtLjg2LTEuMTIuMTYtMS4yNC45My0xLjI2LDEuODksMCwzLjc4LDAsNS42NiwwYTQsNCwwLDAsMCwzLjczLTEuNjRjMS4xNi0xLjY0LDMuMjUtMS4zNyw0Ljg5LTItLjkxLDIuNzYtMy43MSwzLjEtNS43Niw0LjM2YTcuMDcsNy4wNywwLDAsMS01LjIxLDFjLjU3LDIuMTQsMi40LDMuMDcsMi44OCw0LjkuMTcuNjcsMS4yOC4yNCwxLjg2LjA2YTM4LjE2LDM4LjE2LDAsMCwxLDExLjMzLTEuOCw1Miw1MiwwLDAsMSw1Ljg0LjIyYzIuOTEuMjksMy44NywzLjQsMS44NSw1LjU4QzE5NC4zMiw0MTkuNjksMTkxLjg5LDQyMC45MiwxODkuNzYsNDIyLjUzWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk0xNS4zOCwxNDMuNzZjMy4xOCwzLjg4LDUuNzgsOCw2LjM3LDEzLjE4LjE0LDEuMjQtLjI1LDEuODItMS41LDEuOTRhMTAuNzEsMTAuNzEsMCwwLDAtNy44MiwzLjk0Yy0uMTguMjItLjUyLjMxLS43My41Mi0uNjMuNTktMi4xLS4wOC0yLjE0LDEuMjMsMCwxLjY0LS43NSwzLjMxLjY2LDQuOTIsMS4yNiwxLjQzLDIuNTMsMywyLjM5LDUuMjEtNC4yLTIuNTYtNC41Mi02LjU5LTQtMTAuODYuMy0yLjYyLDQuNzEtNS45Miw3LjkzLTYuMDcsMi42OC0uMTMsMi42NS0uMTIsMi4xNi0yLjgxYTkuODUsOS44NSwwLDAsMC0xLjcyLTQuMTNBOC43Miw4LjcyLDAsMCwxLDE1LjM4LDE0My43NlpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtM1wiIGQ9XCJNMTQ2LjMyLDM4M2wuMjUtLjQyYzIsMS44NSwyLjYyLDQuMzMsMy4yNCw2Ljg0LjU2LDIuMjYsMS4zOSw0LDQuMTUsNC42NiwzLjA4Ljc3LDUuNzUsMi43NSw5LDMuNDQsMi41NS41NCw0LjctLjUxLDcuMDUtLjYzYTU4LjY3LDU4LjY3LDAsMCwxLDguMTEtLjIxYzIuMjUuMiwzLjM2LDIuNDUsNS4xLDMuNjJhNy41Niw3LjU2LDAsMCwxLTMuNDktMS41NmMtMi45My0yLjI0LTYtMS43Ni05LjI0LS45cy02LjU1LDItMTAsMWEzOS4wOSwzOS4wOSwwLDAsMS0xMC45NS01LjM1Yy0xLjkxLTEuMjUtMi4wOS0zLjQzLTIuNTctNS4zNkE0NC4zOSw0NC4zOSwwLDAsMSwxNDYuMzIsMzgzWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk0xMDEuNzksMzUxLjM3YzUuMzEuODYsOSwzLjMsOS44OSw5LjEyczQsMTAuNzksNy41OCwxNS40M2MxLjU4LDIuMDYsMi45MSw0LjIzLDEuOTQsNy01LjI3LTUuNzQtNy44Ni0xMi44Ni05Ljc5LTIwLjE2LTEuMTEtNC4yLTMuNzYtNi43LTctOUE4LjIzLDguMjMsMCwwLDEsMTAxLjc5LDM1MS4zN1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtM1wiIGQ9XCJNMTk3LjQ1LDQ0MS40N2ExNC4yNSwxNC4yNSwwLDAsMS0zLjgtNS40MWMtMS4xLTMtMy40MS00LjY1LTYuMzYtNS41MS0yLjc5LS44Mi01LjctMS4yOS04LjE4LTNhMjYuMiwyNi4yLDAsMCwxLDEyLDMuNDRDMTk1LDQzMy4xNiwxOTYuMDgsNDM3LjUyLDE5Ny40NSw0NDEuNDdaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTNcIiBkPVwiTTE3Ni41LDQyNi45NWMtLjkxLS4zNC0yLjA4LS43NS0xLjkxLTEuODJzMS40NC0uNzksMi4yOS0xYTExMywxMTMsMCwwLDEsMTIuODgtMS42NWMtLjMzLDEuNC0xLjUyLDEuMTItMi41LDEuMzItMy4xNC42My02LjM1LjgxLTkuNDQsMS43MUMxNzcuMDgsNDI1Ljc2LDE3Ni4zMSw0MjUuODgsMTc2LjUsNDI2Ljk1WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk0xMjcuNTMsMzg4LjgybC0uNDguMDlhMTEuNDksMTEuNDksMCwwLDEtMy43LTMuNjFjMi4yMi0xLjU3LDIuNTEtMS40OCwzLjM3LDFDMTI3LDM4Ny4xMiwxMjcuMjUsMzg4LDEyNy41MywzODguODJaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTVcIiBkPVwiTTI1MS4zOCwxNjMuMjhsLTIuMTcuODljLjItMS4zNC0xLjM5LTIuNzkuMjctNCwuNTMsMSwxLjcxLDEuNTcsMi4wNiwyLjczQTEuMTksMS4xOSwwLDAsMSwyNTEuMzgsMTYzLjI4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk0xODkuNiwzMjMuODdhOC42Niw4LjY2LDAsMCwxLC40Mi0xYzEuNzItMy4wNiwxLjcyLTMuMDYsMy43NS0uMzJDMTkyLjE3LDMyMi4zMSwxOTAuOTQsMzIzLjI0LDE4OS42LDMyMy44N1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtNFwiIGQ9XCJNMTg1LjA3LDI3LjJxMCwuNDEsMCwuODJoLTMuNDVsMC0uNjhBNSw1LDAsMCwxLDE4NS4wNywyNy4yWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy0zXCIgZD1cIk0xOTguMzIsNDQ0LjdsLS44OC0zLjI1QzE5OS4wOCw0NDIuMTcsMTk5LjUxLDQ0My4yMiwxOTguMzIsNDQ0LjdaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTFcIiBkPVwiTTE4MS4wNywyOC4wNmMtLjg1LjMxLTEuMSwwLTEuMDYtLjIzcy40NS0uNTQuODMtLjU4LjY3LDAsLjY5LjM0QzE4MS41NiwyOC4yMSwxODEsMjguMTEsMTgxLjA3LDI4LjA2WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk05NC4zMiwxNjZhLjQ3LjQ3LDAsMCwxLS4zNy0uNThaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTNcIiBkPVwiTTE4My41OSw0MDAuNjljLS4yNiwwLS4zNi0uMTUtLjM1LS40WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk05My43OSwxNjUuMTRsLS4zMi0uNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtNFwiIGQ9XCJNMTg4LDI4LjNsLS40My0uMjhaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTRcIiBkPVwiTTkyLjk1LDE2My43N2wtLjM3LS41MkEuNDMuNDMsMCwwLDEsOTIuOTUsMTYzLjc3WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy00XCIgZD1cIk03Mi40NiwxMTkuM2MuOTIsMi40OS44Niw0Ljk0LDEuNDgsNy4yNS4yMS44LjE4LDEuOC42NiwyLjM3LDMuNzcsNC4zOCwzLjc5LDEwLjA1LDUuMjksMTUuMTksMi4zOSw4LjE5LDQuNzQsMTYuMzgsOS40NSwyMy42M2ExMC4xNywxMC4xNywwLDAsMCwyLjgyLDMuMTksNiw2LDAsMCwxLDIuMzgsMy4yNWMxLjUxLDUuMDksNSw4LjcsOC42MywxMi4yNy42MS41OSwyLjksMS4xLjg1LDIuODEtLjQyLjM1LjQ1LDEsLjkyLDEuMzNhMTQuNzcsMTQuNzcsMCwwLDAsNS40NiwyLjU2YzMuNTgsMSw2LjA4LDMuNTMsOS4xOSw1LjE0LDEuMDkuNTcsMiwxLjMxLDMuMjkuMzMsMS0uNzUsMS43My4xNywyLjMzLjc0YTIwLjYyLDIwLjYyLDAsMCwwLDE2LjgsNS43MywzLjg2LDMuODYsMCwwLDAsMS45NS0uNDYsMjkuMTcsMjkuMTcsMCwwLDEsOS42Ny00LjI5YzMtLjY1LDMuNDUtMi42MSw1LTQuMzUsMS44LTIuMDgsNC00Ljc5LDcuNTMtMy45LjkyLjIzLDEuMi0uNCwxLjY2LS44NSwyLjE2LTIuMDksNC00LjQ2LDYuNTktNi4xN2E1Ljc1LDUuNzUsMCwwLDEsNC4zOS0xLjIxLDEuNzgsMS43OCwwLDAsMCwyLjMyLTEuNzdjLjEzLTEuMi4zLTIuMzkuNDQtMy41OS4yNi0yLjIsMS4yOC0zLDMuMzgtMi4zNCw2LjUxLDIuMTEsMTMuMjEsMi4yNiwxOS45MywyYTEzNi44OSwxMzYuODksMCwwLDAsMTUuNDYtMS44NWMzLjcxLS41Nyw3LjQ4LS44MiwxMS4yMi0xLjIzLDIuODQtLjMxLDUuNTctMS4zNiw4LjQ2LTEuNDIsMy40LS4wNyw0LjUyLjY2LDUuODcsMy44MXEuNjIsMS40NiwxLjIxLDIuOTNjLjM1Ljg5LjY5LDEuNjktLjc4LDItMS4yLjI2LS44NiwxLjMzLS41MiwyYTU4LjYsNTguNiwwLDAsMSw0LjM2LDE0LjM5Yy4xLjU2LjM4LDEuMTYuODUsMS4yNiwxLjQ3LjMyLDIsMS4yOSwyLjM0LDIuNjFhNi44Niw2Ljg2LDAsMCwxLS4zNyw1LjI4Yy0xLjY5LDIuODMtMS42Miw1Ljg5LTEuOTEsOC45YTU1Ljc3LDU1Ljc3LDAsMCwwLDAsNy45M2MuMTYsMy40Ni0uNzksNi44MS0uODksMTAuMjQtLjEsMy4xNS0uNzgsNi4yNC0uMTQsOS40NWExNS42NywxNS42NywwLDAsMS0uNTEsNy40M2MtMS4xMS0uMjctMS40My0xLjE4LTEuODItMi4wOC0uMjItLjUyLS41Mi0xLjIyLTEuMjgtMWExLjIzLDEuMjMsMCwwLDAtLjc1LDEuMjljMCwyLjUxLTEuMzEsNC40Mi0yLjU5LDYuNGExMSwxMSwwLDAsMC0xLjcxLDQuNTcsMTcuMDcsMTcuMDcsMCwwLDEtNC45Myw5LjM3Yy0zLDMuMjEtNS4zNyw3LjA2LTgsMTAuNjMtLjM0LjQ2LS4zOCwxLjE2LTEsMS4zNi0uMSwwLS4yMSwwLS4yMy0uMDgtMS44NC0zLjg2LTIuNDYtNC01Ljg1LTFhNTcuNCw1Ny40LDAsMCwwLTguODQsMTAuODNjLS4yMS4zMS0uMjkuNzgtLjU3LDEtNS40NCwzLjc3LTYuNTksMTAuNjYtMTEuMSwxNS4xOS0yLjA3LDIuMDctMy4xOSw1LjA5LTQuNzIsNy42OS0uNzcsMS4zMS0xLjQzLDIuMjktMi41NC4yMS0uNjctMS4yNi0xLjU0LTEtMi41OC0uMTMtNC4yNCwzLjQtNy44LDcuNDctMTEuNjgsMTEuMjRhMjUuMTMsMjUuMTMsMCwwLDEtMTAuNTcsNS44M2MtNy4yOCwyLjE2LTEyLjQ0LDctMTcsMTIuNTgtNS44Niw3LjExLTguNjMsMTUuNjctMTAsMjQuNjhhMTgsMTgsMCwwLDAsLjIyLDdjLjQ0LDEuNzguMDcsMy4xNy0yLjIsMy4yOC0xLDAtMi4wOS40My0zLjEzLjRhNS4yMyw1LjIzLDAsMCwwLTQuNCwxLjg4Yy0xLjM0LDEuNTQtMi42MSwxLjY0LTQuMTMsMGE0NSw0NSwwLDAsMS0xMC42OC0xOC42NmMtLjYzLTIuMzMtMS40My00LjYyLTIuMjctNi44OC0xLjQ0LTMuODQtNS4wNi01LjY1LTcuOS04LjE3LS41Ni0uNS0xLjM2LS43Ny0xLjgtMS4zNC0xLjctMi4yLTMuODgtMi4yMS02LjExLTEuM2ExMi4wOCwxMi4wOCwwLDAsMS0xMi0xLjM3Yy0yLjQ1LTEuNjctNS4zNS0xLjM0LTguMDgtMS43Ny01LjA4LS44Mi05Ljk0LTIuMDgtMTMtNi43MS0uNS0uNzQtMS4yMi0xLjY3LTEuMTItMi40Mi40Ni0zLjQtMi4wNS01LjU0LTMuMjItOC4yNGE2LjMyLDYuMzIsMCwwLDAtNC41Ni0zLjQ0Yy03LjE1LTEuNzctOS40NS03LjM0LTExLTEzLjU5LS41MS0yLjEyLS44Ny00LjI4LTEuNC02LjRhNy45MSw3LjkxLDAsMCwwLTMuMzgtNS4xN2MtMi4wOC0xLjI5LTIuMTMtMy4zNC0xLjM0LTUuMkExMS4yNCwxMS4yNCwwLDAsMSw0NC4yNiwyODdhNDEuNjcsNDEuNjcsMCwwLDAsNC4zNi0zLjIzYzEuOTMtMS42MywyLjEzLTMuMjEuODEtNS4zOWEyNi44NywyNi44NywwLDAsMC0yLTIuNzcsNS4yOSw1LjI5LDAsMCwxLS45NC01LjMyLDIuNDcsMi40NywwLDAsMC0xLjY3LTMuNTdjLTItLjc2LTMuNi0xLjg3LTMuNzktNC4zLS4wOC0xLS44OS0xLjUxLTEuNzktMS44NnMtMi0uODYtMi0yYy4wOS00LjIzLTIuNzgtNi41Ny01LjY2LTguNzRhMTIuNjEsMTIuNjEsMCwwLDEtNS40My05LDkuOTQsOS45NCwwLDAsMC0zLjg3LTYuOTJjLTIuMTYtMS43LTMuMzgtMy44Ni0yLjc2LTYuNzIuMTQtLjY0LjI5LTEuMTQtLjU0LTEuNDJhLjgzLjgzLDAsMCwxLS4zNi0xLjMzYzEuNDMtMS45My43Mi0zLjkzLjE5LTUuODdhMy41NiwzLjU2LDAsMCwxLDEuMDYtNGMxLjU2LTEuNDksMi0zLjM5LDIuMjMtNS43NS4zOC0zLjQyLS43Ny02LTItOC43NC0uNjMtMS40My0xLjE1LTIuNzIuNTUtNC4xNiwxLjUyLTEuMjkuNjctOC4xMS0xLjE0LTEwLjMtMS4yLTEuNDUtMS4yOC0yLjA3LjYyLTIuODIsMi4wOC0uODMsMi41MS0yLjM2LDEuNTUtNC40NmEyNiwyNiwwLDAsMC02LTcuNjNjLTEuNDktMS40NS0zLjQ1LTIuNzctMi4zLTUuMzQuODktMiw0LjItMy4zNyw2Ljg3LTIuOTIsNC42NS43OSw0LjYyLjgsMy43My0zLjg0YTI1LjY5LDI1LjY5LDAsMCwxLS40OS00LjQ5YzAtMi42NC0xLjI1LTQuNzYtMi41OS02Ljg5LTEuODEtMi44Ni0xLjMyLTQuMSwxLjkxLTUuMTZhMy4xNCwzLjE0LDAsMCwxLC42Ni0uMTdjMy45LS4zOSw1LjM3LTIuODEsNS40NC02LjQ0YTExLjg5LDExLjg5LDAsMCwxLC4yNi0xLjc4Yy4zMS0xLjgxLDEuMjctMi4wNSwyLjcyLTEuMTJhMTEuOSwxMS45LDAsMCwwLDEuMzUuODNjMS42Mi43NiwyLjQ3LjI3LDIuNTEtMS41MWExNi41OCwxNi41OCwwLDAsMC0uMjctMi4yMywzLjgxLDMuODEsMCwwLDEtLjEyLTEuNTYsMzQuNDEsMzQuNDEsMCwwLDAsMi0xNS4yOUE2LjYyLDYuNjIsMCwwLDEsNDAsMTA3LjIyYTI5LjI4LDI5LjI4LDAsMCwwLDcuMzktOC40N0M0OC41OSw5Ni42Niw1MC43Miw5Niw1Mi42NCw5NWMzLjIyLTEuNzEsMy4xLTEuNjcsNSwxLjY2LDIuMjcsMy45MSw1LDcuNiw2LjQsMTJhMzEuMjEsMzEuMjEsMCwwLDEsMS42OSw5LjUzYzAsMS43LDAsMy41OSwxLjkxLDQuMTlzMy0uOTEsNC0yLjNBNi4xNyw2LjE3LDAsMCwxLDcyLjQ2LDExOS4zWm0tMTMuOSwxNzFjLjE4LTIuODMsMi4yMi00LjU4LDQtNi4zNmE1OC40Niw1OC40NiwwLDAsMCw4LjgxLTExLjcsOTMuNTUsOTMuNTUsMCwwLDEsMTMuMy0xOC4xNmM2LjM0LTYuNTYsMTMuMS0xMi43MywxOS44NC0xOC45QTU1LjMsNTUuMywwLDAsMSwxMjEuODUsMjI0YzYuNjktMi41NywxMy42My00LjM0LDIwLjUyLTYuMjNhNDIuNjQsNDIuNjQsMCwwLDAsOC45NC0zLjE1Yy40OS0uMjYsMS4xOC0uNTQsMS4xMi0xLjI5cy0uODYtLjkzLTEuNS0xLjEyYTEzLjEsMTMuMSwwLDAsMC01LjQtLjIxYy0xMy45MiwxLjY0LTI1Ljg5LDcuODMtMzYuNzgsMTYuMjYtNS40OCw0LjI0LTEwLjUzLDktMTUuOSwxMy40MS0zLjkyLDMuMi04LDYuMi0xMS4wNSwxMC4zLTIuMzQsMy4xNC00LjUyLDYuNC02Ljg2LDkuNTQtNS4xNSw2Ljg5LTEwLjM2LDEzLjczLTE1LjU0LDIwLjU5YTE2Ljg1LDE2Ljg1LDAsMCwwLTIuNDYsNC4zMWMtLjc5LDIuMTctLjI4LDMuNDUsMS41NCw0LjA2YTMuNzcsMy43NywwLDAsMCwyLjUuODYsNC4xLDQuMSwwLDAsMSwzLjE0LDYuNTZjLS41Ljc2LTEuMDcsMS40Ni0xLjU2LDIuMjJhMS43LDEuNywwLDAsMC0uMTgsMS45MiwxLjYyLDEuNjIsMCwwLDAsMiwuNTQsMzEsMzEsMCwwLDAsMy43NC0xLjU5YzQuNDQtMi4yMiw4LjIyLTEuNDgsMTEuMjUsMi40M2E0Ny45LDQ3LjksMCwwLDEsNCw2YzMuMTgsNS43LDMuMjEsNS43NSw4LjI0LDEuNTcsMi4zNC0xLjk1LDUtMS40Myw2LjM4LDEuM2ExMi40NiwxMi40NiwwLDAsMSwuODksMi43OWMuNjcsMi45NCwxLjI5LDUuODQsMi45MSw4LjVhMzkuNzksMzkuNzksMCwwLDEsMy42Niw3Ljc1YzEuMzUsNCwzLjk0LDYuOSw3LDkuNTIsMS43NSwxLjUyLDMuMjYsMSw0LjI1LTEuMDhhMjEuODYsMjEuODYsMCwwLDEsMS4xNi0xLjkzYzIuNTktNC4yOSw2LjQ0LTcuNiw5LjIzLTExLjcyYTY5Ljc1LDY5Ljc1LDAsMCwxLDM0Ljg0LTI3YzYuMzMtMi4yOSwxMi42OS00LjQxLDE4LjQ1LTgsOC41MS01LjI2LDE1LjQxLTExLjkzLDE4LjI0LTIxLjg5LDIuMzktOC40LDIuMzktMTcsMS4zNS0yNS41OGE2LjU1LDYuNTUsMCwwLDAtNC41NS01LjM4Yy0uNS44NCwwLDEuNDQuMjMsMiwzLjUyLDEwLjk1LDIuNTcsMjEuNTYtMi4zNCwzMS44OC01LDEwLjU3LTEzLjc2LDE2Ljk1LTI0LjI1LDIxLjM0LTYuMTgsMi41OS0xMi41OSw0LjYtMTguNDksNy45MWE4Ny4xNCw4Ny4xNCwwLDAsMC0zNC42OCwzNC44MmMtMS42NywzLjA2LTIuODUsMy4xMy00LjgzLjI2LTMuMjgtNC43Ni00LjkzLTEwLjMxLTcuNC0xNS40Ny0xLjMyLTIuNzYtMS42Ni02LTIuOTMtOC43Ny0yLjU0LTUuNTYtNS4zNi03LTkuNS0zLjI5LTMuMTgsMi44My00LjkyLDIuMTktNi43Ni0xLjY3LS4xOS0uNDEtLjMzLS44NS0uNTQtMS4yNC0xLjkyLTMuNTgtMy42NC03LjI2LTcuMjUtOS42NS0yLjU4LTEuNzEtNS4wOS0yLjMxLTcuNzktLjY3LTEuMjQuNzUtMS40NSwwLTEuNjQtLjg0YTkuMzUsOS4zNSwwLDAsMS0uMS0xLjgxYy0uMDUtMi42MS0uNTktMy4wOC0zLjItMy4yNEM2Mi4xMSwyODkuNzcsNjAuMzksMjkwLjY5LDU4LjU1LDI5MC4zNFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMjM4Ljc2LDU5Ljc3Yy0uOTMtLjg5LTEuODEtLjYtMi42Ny4xLTEtLjI1LTIuMjcuMjUtMy4wOS0uOTItMi42NS0zLjc5LTYuNTMtNC4xNS0xMC42Ny0zLjc4LTEuNjIuMTUtNC40NSwyLjY2LTQuMzIsNC4yNy4xOSwyLjI5LS43LDIuNzgtMi44MSwyLjY4QzIxMS43NCw2MiwyMTAsNjMuNzcsMjEwLDY3LjI3YzAsMS42OS0uNDMsMi4yNi0yLjE1LDIuMTYtMi0uMTItNSwyLjQ1LTUsNC4zMWE0OC40Myw0OC40MywwLDAsMCwuMjYsNy40M2MuNDcsMy4xNS45Myw2LjUxLTIuNDYsOC43YTIuMzgsMi4zOCwwLDAsMC0xLjEsMi41NWMtLjc2LDEtMi44NiwxLjE1LTIsMy4xNy0xLjQyLjgtMSwyLjEyLS45MywzLjMzLS42OSwxLjA3LTIuMiwxLjUtMi4zOCwzLTEuOTIsMi40My0zLjgxLDQuOS01Ljc4LDcuM2EzNi40OCwzNi40OCwwLDAsMC01LjU5LDguOWMtMi4wNiw0Ljg3LTMsMTAuMS00LjY4LDE1LjExLTEsMi45My0xLjQ3LDYuNzksMi4wOCw5LjIxLDEuMjYuODYuODIsMS45NC4zLDNhMTcuMzgsMTcuMzgsMCwwLDAtMS44OCw5LjJjLTEuODktLjU4LTIuNjEtMi40NC00LTMuNi01LTQuMjEtOC05LjUzLTEwLTE1LjgxLTEuNTMtNC44NS0zLjYxLTkuNi00Ljg2LTE0LjU0YTQ5Ljc1LDQ5Ljc1LDAsMCwxLTEuNDktMTQuNTksNTIuMzgsNTIuMzgsMCwwLDEsMy43Mi0xNi41MUE2MC4xLDYwLjEsMCwwLDEsMTY5LDc2LjkyYzYtOC41MywxNC4yOC0xNC41OSwyMy4xNS0xOS44OSwyLjA3LTEuMjQsNC4yNC0yLjMzLDYuMzMtMy41Myw3LjgtNC40OCwxNi4zLTQuMzcsMjQuOS00LDYuMzIuMjcsMTEuODQsMi41NiwxNy4xOCw1LjcxLDMuNSwyLjA3LDcuNDcsMy4yNywxMC43OSw1LjcyYTU1LjUsNTUuNSwwLDAsMSwxMywxMi43NGMyLjg2LDQuMSw2LjE3LDcuOTUsNy42NSwxMi43MiwzLjEsMTAsNC44OCwyMC4yNiwyLjUyLDMwLjc3LS41OCwyLjU5LS43Miw1LjIzLTEuMTQsNy44M2EzNi4zNiwzNi4zNiwwLDAsMS0xMS44MSwyMS44NmMtNC42Miw0LjExLTkuNzEsNy42OC0xNC42MSwxMS40OGE3LDcsMCwwLDEtMS40Mi42Nyw5LjA2LDkuMDYsMCwwLDAtMS4yMy0yLjY2LDIxLjIxLDIxLjIxLDAsMCwxLTIuOS03Yy0uNzItNC40LS45LTktMy4zNy0xM2EzLjYsMy42LDAsMCwxLC43Ny00LjM4LDExLjksMTEuOSwwLDAsMCwyLjU4LTVjMS4xMy0zLjMuOS02LjcxLDEtMTAuMSwwLTEuNi0uMTktMy43NCwxLjI1LTQuNSw0LjQ0LTIuMzUsNi4yLTUuNzMsNS42Ni0xMC43LS4yNC0yLjE5LS4zNy00LjE5LTIuMi01LjY2LS43Ny0uNjItLjY3LTEsLjE2LTEuNjcsMS43LTEuNCw0LTIuNTgsNC4xNy01LjA3YTU2Ljg4LDU2Ljg4LDAsMCwwLTEuMy0xNi40MmMtLjM5LTEuNzktMS44Ni0zLjUzLTMuMzUtMy42MS0yLjUzLS4xMy0yLjI0LTEuNDEtMi4zMi0zLjA1QzI0NC4yNiw2Mi41NCwyNDEuNzksNTkuODUsMjM4Ljc2LDU5Ljc3Wk0xNjYsMTA1LjM5YTEuNjIsMS42MiwwLDAsMCwxLjE2LTEuMjZjMS42Ni00Ljg4LDQuNTQtOS4xOCw2LjU1LTEzLjg5QTEwLjI2LDEwLjI2LDAsMCwxLDE3Niw4Ni44NmM0LjQ0LTQuMyw4LjkzLTguNTUsMTMuMzktMTIuODIuNzUtLjcyLDIuMzctMSwxLjgzLTIuNDRzLTEuOTQtMS41My0zLjI4LTEuNGE5LjYyLDkuNjIsMCwwLDAtMi40NC40M2MtNC45LDEuODUtOS4yNiw0LjU2LTEyLDkuMTFhNzUuMDksNzUuMDksMCwwLDAtNy42LDE3LjM1QzE2NSw5OS43OCwxNjQuNjksMTAyLjY1LDE2NiwxMDUuMzlaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTVcIiBkPVwiTTE5Ny4wNSwxMDkuMzZjLjM2LDMuMjIuMjksNi4zNy43OCw5LjQ4QTM5LjgyLDM5LjgyLDAsMCwwLDIwMS40NSwxMzBhMSwxLDAsMCwwLC4xMS4yYy44LDEsMS42MSwyLjQ0LDMsMS44OXMxLTIsLjc3LTMuMjVhMjAuMDksMjAuMDksMCwwLDEtLjQ5LTIuNjdjMC0uNzEtLjg2LTEuODcuNDItMi4wNWEyLDIsMCwwLDEsMi4xMiwxLjdjLjM4LDEuODQuNzMsMy42OSwxLjA4LDUuNTRhOC43OSw4Ljc5LDAsMCwwLDEuMjIsMi45Yy41Ni45MiwxLjIxLDEuNjEsMi4zNywxLjIxYTEuODksMS44OSwwLDAsMCwxLjI0LTIuMTYsOS4zOSw5LjM5LDAsMCwxLC4yNC0yLjg5LDkyLjkyLDkyLjkyLDAsMCwwLDUuNTYsOC4yLDgsOCwwLDAsMCwyLjI0LDIuMmMyLjQ3LDEuNTUsNC4xNCwxLDUuMDctMS43NS44NC0yLjQ4LjkyLTIuNSwyLjg2LS44MS41MS40NSwxLDEuMTEsMS41OSwxLjI1LDIuODcuNjQsMy4xLDIuOSwzLjM5LDUuMTguNDMsMy40NCwxLjQ2LDYuNzcsMS45NCwxMC4yMS4yMywxLjYsMS41LDMuMSwyLjQ0LDQuNTVzLjU3LDItLjg2LDIuNDlhMTA0LjQxLDEwNC40MSwwLDAsMS0xOC4yLDQuNTJjLTUuODYuODItMTEuNzYuNS0xNy42NS41Mi0zLjg0LDAtNy40NS0xLTExLjEzLTEuODEtMi0uNDUtMi4zMi0xLjYxLTEuODgtMy4zYTI3LjgxLDI3LjgxLDAsMCwwLC44Ni0zLjI3Yy4xOS0xLjQ0LS40OC0yLjA5LTItMS43Ni0yLjc3LjU4LTMuNTQtLjI0LTIuOTQtMy4xNS43OC0zLjc5LDIuNTYtNy4yNCwzLjc0LTEwLjkuNjMtMS45NCwxLjk1LTMuODYuMjEtNi0uNzUtLjktMS4yNi0xLjMyLTIuMzUtLjQ1LS41Ny40Ni0xLjM1LDEuNDUtMi4xNC43N3MuMTYtMS42Mi40LTIuNDNjMS4zOS00LjU0LDIuNjMtOS4xNCw0LjIzLTEzLjYxYTE5LDE5LDAsMCwxLDUuODItOC41MUExNC4xNCwxNC4xNCwwLDAsMCwxOTcuMDUsMTA5LjM2WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy01XCIgZD1cIk0yMzYuNTcsMTExLjY4Yy0uNTMsMy41OS41LDcuMjctLjU5LDEwLjgyLS45MywzLTEuNzUsNi4wOS00Ljg2LDcuODQtMS4zOC43OC0xLjcsMS45MywwLDIuOWExLjgyLDEuODIsMCwwLDEsLjgyLDJjMCwuNDIuMDYsMS0uNTIsMS4xYTEuNSwxLjUsMCwwLDEtMS0uNDQsMTQuNTcsMTQuNTcsMCwwLDEtMS4wOC0xLjE2Yy0yLjExLTIuMjItMy4wNy0yLTQuNTQuNjEtMS41OCwyLjc1LTIuOTQsMy00LjQ4LjUyLTIuNzYtNC4zOS01LjIyLTguODktNC4zOS0xNC4zOS4wOS0uNTksMC0xLjIxLjA5LTEuODFhMS44NywxLjg3LDAsMCwwLTEuMTQtMmMtLjg2LS4zMi0xLjA2LjY0LTEuNDYsMS4xM2E3Ljc4LDcuNzgsMCwwLDAtMiw0Yy0uMDYuNDUtLjEsMS0uNjcsMWExLDEsMCwwLDEtMS0uNzZjLS4zMS0xLS41MS0yLS43Ni0zLjA2LS44LTMuMjYtMi44Mi0zLjg5LTUuMjYtMS42Mi0uMjkuMjctLjY5LjctLjkuNDEtLjctMS0yLjIyLTEuMjktMi4zNC0yLjU5YTM1LjgyLDM1LjgyLDAsMCwxLS4zNS02LjA4Yy4xMS0xLjQ0LjYzLTIsMi0xLjM5YS44Mi44MiwwLDAsMCwuMjIuMDdjMSwuMTEsMi40NywxLjM0LDIuODctLjMxLjMxLTEuMjktMS4yNy0xLjktMi40NC0yLjE3YTI4LjQyLDI4LjQyLDAsMCwwLTMuNzQtLjMzYzEuNC0xLjg1LDMuMDgtMi4wOCw0Ljg5LTIuMDguNjMsMCwxLjUyLjM2LDEuODItLjQycy0uNjYtMS4wNy0xLTEuNmMtLjU5LS44Ni0yLjUzLTEuMTMtMS43Ny0yLjQ2czIsLjA5LDMsLjI0LDIuMjEuNTksMi45MS0uNTEtLjQ1LTEuNjMtLjg1LTIuMzhhNC43NCw0Ljc0LDAsMCwwLS44NS0xLjA1Yy0yLTIuMDctMi0yLjE1LjktMy4yNS41Ny0uMjIsMS4yNi0uMzQsMS41LS45MywxLjM2LTMuMjEsNC41LTIuODcsNy4wNi0zLjM4czUuMTQsMS44OCw2LDUuMTNjLjQ0LDEuNjQuNzYsMy4zMiwxLjE5LDUuMjdhNi43Myw2LjczLDAsMCwwLC43OC0uODVjMi4xMS0zLjY3LjM2LTYuNy0xLjctOS42LTEuNjgtMi4zNy0zLjg1LTIuODktNy4wNi0yYTI5LjQyLDI5LjQyLDAsMCwxLTMuMjguODZjLTIuMTUuMzUtMy40LS42NS0zLjQyLTIuOCwwLTIuMzkuMzItNC43NS0uMzktNy4xNS0uNDUtMS41Mi41OC0yLjE0LDItMS4zNnMyLjYzLDEuNzcsNCwyLjU3YzIuNDMsMS40MiwzLjkxLjUyLDMuOTItMi4yOSwwLTIuMjEtMS00LjA4LTEuOTQtNi0uMi0uNC0uNTYtLjg3LS4yNy0xLjI1czEtLjE4LDEuNDQuMDVhOSw5LDAsMCwxLDQsMy4yNSwyNC41OSwyNC41OSwwLDAsMCwxLjQ4LDIuMjgsMS44OSwxLjg5LDAsMCwwLDIuMTcuODZjMS0uMzQsMS0xLjI1LjkzLTIuMDctLjIyLTMtMS41LTUuODQtMi04LjgxLS4xNi0xLTEuNTQtMi4xOS0uMTktMywxLjE2LS42OSwyLjI1LjQsMy4yLDEuMTZhOCw4LDAsMCwxLDMuMSw2LjUxLDI4Ljc1LDI4Ljc1LDAsMCwwLC4wOCwzLjE3Yy4xMiwxLjA3LjQ0LDIuMTMsMS43MiwyLjM4czEuNzYtLjU2LDIuMzYtMS4zOGExNi41NCwxNi41NCwwLDAsMCwyLTVBOC42OSw4LjY5LDAsMCwxLDIzNy43LDY2YTIzLjQ4LDIzLjQ4LDAsMCwxLC41OCw5LjA3Yy0uMDcuNjEtLjkyLDEuMjYtLjA5LDEuODJhMi43NywyLjc3LDAsMCwwLDIuMi4wOCwyLjE2LDIuMTYsMCwwLDAsLjQxLS4xOGMxLjA2LS40OSwyLjA4LTEuOSwzLjE2LTEuMzNzLjczLDIuMzQsMSwzLjU2Yy4zOCwyLjE1LjQ4LDQuMzUuNjUsNi41M3MtLjg2LDMuMjItMywzLjM2YTI0LjQyLDI0LjQyLDAsMCwwLTMuNTcuNTcsMS4zLDEuMywwLDAsMC0xLjA1LDEuMDdjLS4wNy40NC4yOC42NC41OC44OHMxLjY1LS4xMSwxLjMyLDEuMDZhMi4yMywyLjIzLDAsMCwxLTIuMSwxLjc5Yy0xLjM2LjA1LTIuNzIsMC00LjA4LDBhOS43Niw5Ljc2LDAsMCwwLTMuMTMuNGMtMS4yMS40LTIuMSwxLjA5LTEuODIsMi40NXMxLjQzLDEuNjgsMi42MywxLjY0YzEuNDcsMCwyLjctLjkyLDQuMDYtMS4zNiwzLjA4LTEsNy41MiwxLjc4LDcuODgsNC45MnMtMS41OSw0LjU0LTQuNTEsMy4zOGExNC4wNywxNC4wNywwLDAsMC0xMS40My4zMiw0Ljk0LDQuOTQsMCwwLDAtMy4xNSw0YzQuMDYtMi41OCw4LjE2LTQuNDcsMTMuMTQtMi4zOC0xLjYxLDEuOTItMy4yNiwyLjctNS40NiwxLjQ2YTcsNywwLDAsMC0xLjUtLjUsMS42MiwxLjYyLDAsMCwwLTEuOTQuOGMtLjUyLjg0LjA3LDEuNDIuNjUsMS45NGE1LDUsMCwwLDAsNC45LjljLjgtLjIxLDEuNTgtLjUsMi4zNi0uNzZabS0xOC40NC04LjM2Yy0yLjg5LDEuNjEtNC44Ny0uMzUtNC41OC00LjE2LjIxLTIuNjksMS40Mi0zLjY0LDMuNy0zYTMuMjcsMy4yNywwLDAsMSwyLjExLDIuNDZjLjE2LjQ1LjQxLDEuMzgsMS4xOS42YTIuNTEsMi41MSwwLDAsMCwuNzYtMi42OWMtLjQ3LTEuMzItMy40MS0yLjktNC44NS0yLjYxLTEuMjUuMjYtMi40OS42LTMuNzQuODZBMi4xOCwyLjE4LDAsMCwwLDIxMSw5Ni4zNmMtLjkzLDIuNy0uMTMsNS4yOSwxLDcuNjJhNC41LDQuNSwwLDAsMCw2LDIuMDljMS4yNy0uNzUsMS41LTIuMjEsMi4yNy0zLjI5cy0xLjQyLS42OC0xLjQ0LTEuNzFhMy43NiwzLjc2LDAsMCwwLS4yMi0xLjEsMy41OSwzLjU5LDAsMCwwLTEuOS0yLjE0Yy0xLjU5LS43Ny0yLjQ0LS4yNS0yLjUsMS41MUMyMTQuMDksMTAxLjYzLDIxNC44NSwxMDIuNDMsMjE4LjEzLDEwMy4zMlpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtM1wiIGQ9XCJNMTQyLjQxLDM4NS4yOGEzMjIuODQsMzIyLjg0LDAsMCwwLDEyLjksMzAuODcsMy41MSwzLjUxLDAsMCwwLDEuNjIsMS41MywxMy4yLDEzLjIsMCwwLDAsNS44MywxLjY4YzcsLjIzLDEzLjg3LS4yMiwyMC41Mi0yLjYxLDEuMTEtLjQsMi4yNy0uOTMsMy4yNi40MSwxLjEzLDEuNTQuOTQsMi4xNi0xLDIuNDctMywuNDktNS45NC44OC04Ljg4LDEuNDktMS43Ni4zNi0zLjQ1LDEuMTEtNS4xOSwxLjU4YTYuMTQsNi4xNCwwLDAsMS0zLjExLjQyYy0uNjgtLjE2LTEuNC0uMzYtMS43OC40NmExLjU3LDEuNTcsMCwwLDAsLjQ4LDIuMDVjNCwyLDYuODksNiwxMS43NCw2LjMxLDMuMzcuMjQsNi4zNywxLjc0LDkuNSwyLjgxLjQxLjE0Ljg2LjMzLjguOTMtLjExLDEuMjUtMy4zNywzLjgyLTQuNjcsMy41NmE3My4zOSw3My4zOSwwLDAsMS0xNy4xNS01LjY2LDE3Ljg3LDE3Ljg3LDAsMCwwLTE1Ljg1LS4xMSw1OC43MSw1OC43MSwwLDAsMC0xMi4yLDYuNzFjLS4zMy4yNS0uNzkuNjItMS4yLjI0czAtLjgyLjA5LTEuMjVjLjY4LTQuNzIsMi43OC05LDQuMTgtMTMuNDlhMTEsMTEsMCwwLDAtLjI3LTYuNjljLTEuNjEtNC44NC0yLjYzLTkuODItNC4zNy0xNC42Ni0xLjg1LTUuMTEtNC41LTEwLTUuMzUtMTUuNDkuNS0uMTQsMS4yMS0uMTMsMS40Ni0uNDZDMTM2LDM4NS40NiwxMzkuMzMsMzg1LjcsMTQyLjQxLDM4NS4yOFpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtNVwiIGQ9XCJNMjM4Ljc2LDU5Ljc3YzMsLjA4LDUuNSwyLjc3LDUuNjcsNi4zNy4wOCwxLjY0LS4yMSwyLjkyLDIuMzIsMy4wNSwxLjQ5LjA4LDMsMS44MSwzLjM1LDMuNjFhNTYuODgsNTYuODgsMCwwLDEsMS4zLDE2LjQyYy0uMTksMi40OS0yLjQ3LDMuNjctNC4xNyw1LjA3LS44NC42OS0uOTMsMS0uMTYsMS42NywxLjgzLDEuNDgsMiwzLjQ3LDIuMiw1LjY2LjU0LDUtMS4yMiw4LjM1LTUuNjYsMTAuNy0xLjQzLjc2LTEuMjIsMi45LTEuMjUsNC41LS4wNSwzLjQuMTcsNi44MS0xLDEwLjFhMTEuOSwxMS45LDAsMCwxLTIuNTgsNSwzLjYsMy42LDAsMCwwLS43Nyw0LjM4YzIuNDcsNCwyLjY1LDguNjIsMy4zNywxM2EyMS4yMSwyMS4yMSwwLDAsMCwyLjksNyw5LjA2LDkuMDYsMCwwLDEsMS4yMywyLjY2Yy0yLjgsMi41My00LjMyLDIuMTYtNS40Ny0xLjMzLTEuNTktNC44Mi0yLjEzLTkuODUtMi43Ny0xNC44NS0uMTYtMS4yLS4xLTIuNTMtLjc4LTMuNDktMi43Mi0zLjg3LTEuNS03LjU5LjI1LTExLjI5LDEuMDktMi4zMSwyLjYtNC40MSwzLjI2LTYuOTQuOC0zLjA2LjExLTYtLjU4LTguOTItLjUtMi4xLjEyLTMuMywyLjE0LTMuNjJhNS41OCw1LjU4LDAsMCwwLDUuMTQtNC45MWMuNDUtMi41NS0xLjA5LTUuMy0zLjc2LTYuOTMtMi40OC0xLjUtMi40OC0xLjUtLjE3LTMuMzVhMTIuMTgsMTIuMTgsMCwwLDEsMS43Ni0xLjQyYzMuNzQtMiw0LjY2LTQuOTQsMy42My04LjkyYTM5LjMxLDM5LjMxLDAsMCwxLS44Ni0xMC41NmMwLTEsMC0yLjEyLTEtMi41NXMtMS43NS41OS0yLjQ1LDEuMjMtMS40MSwxLjM0LTIuMjgsMi4xNkMyNDAuNjIsNjguNzQsMjQxLjE2LDYzLjkyLDIzOC43Niw1OS43N1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtNVwiIGQ9XCJNMTk5LjYxLDkyLjQzYTIuMzgsMi4zOCwwLDAsMSwxLjEtMi41NWMzLjM5LTIuMTksMi45Mi01LjU1LDIuNDYtOC43YTQ4LjQzLDQ4LjQzLDAsMCwxLS4yNi03LjQzYzAtMS44NiwzLTQuNDMsNS00LjMxLDEuNzIuMSwyLjE5LS40NywyLjE1LTIuMTYtLjA5LTMuNSwxLjY5LTUuMzIsNS4xNi01LjE0LDIuMTEuMSwzLS4zOSwyLjgxLTIuNjgtLjEzLTEuNjEsMi43LTQuMTIsNC4zMi00LjI3LDQuMTQtLjM3LDgsMCwxMC42NywzLjc4LjgyLDEuMTcsMiwuNjcsMy4wOS45MmE0Ny4wNiw0Ny4wNiwwLDAsMC0xLjkzLDcuNzRjLS41NS0xLjA3LS44OS0xLjY2LTEuMTUtMi4yOC0yLTQuNy02LjIxLTYuMzMtMTAuNjMtNy42My0xLjE3LS4zNC0xLjg2LjI3LTEuOTMsMS41NHMuNjEsMi4zMSwxLDMuNDNjLjQ3LDEuMywxLjYzLDIuNzkuNCw0cy0yLjguMDYtNC4xMi0uNmMtLjc0LS4zNy0xLjQxLS45LTIuMTgtMS4xOS0xLjE4LS40NS0yLjUzLTEuMTYtMy42LDBzLS40MiwyLjQyLjE4LDMuNTZjMSwxLjg1LDIsMy42NSwzLjI0LDUuODUtMS44Ni0uNTktMy4zMS0xLjEzLTQuOC0xLjVxLTQuNTItMS4xMi00LjU3LDMuNDdhMzMuMTYsMzMuMTYsMCwwLDAsMS40OCwxMC45MmMuMzMsMSwuMjgsMS40Mi0uNzUsMS44NkMyMDQuMzMsOTAuMDgsMjAyLDkxLjI5LDE5OS42MSw5Mi40M1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtNVwiIGQ9XCJNMTc4Ljc2LDE1NC42NGExNy4zOCwxNy4zOCwwLDAsMSwxLjg4LTkuMmMuNTEtMS4wNiwxLTIuMTQtLjMtMy0zLjU1LTIuNDItMy4wNi02LjI5LTIuMDgtOS4yMSwxLjY4LTUsMi42My0xMC4yNCw0LjY4LTE1LjExYTM2LjQ4LDM2LjQ4LDAsMCwxLDUuNTktOC45YzItMi40LDMuODUtNC44Niw1Ljc4LTcuMy44My41NiwyLjQyLjE3LDIuNTYsMS4zNXMtMS4zNCwxLjY2LTIuMTcsMi4zOGMtMS4xNCwxLTIuOTIsMS42OC0xLjYxLDMuNzYuMzcuNTktLjI2LDEtLjYxLDEuMzEtMywyLjg5LTQuODIsNi41LTYuMzksMTAuMjktMi4zOCw1Ljc2LTUuMjksMTEuMzQtNS41OCwxNy43NSwwLC43OS0uNjUsMS42NS4zMSwyLjI1YTIuMzYsMi4zNiwwLDAsMCwyLjU4LDBjLjM5LS4yMy43OC0uNDYsMS4xOS0uNjVzLjg2LS40NywxLjI1LS4xMi4xMy44NCwwLDEuMjdjLTEuMTUsNC4zNi0xLjg1LDguODUtMy41OSwxM2ExLjQyLDEuNDIsMCwwLDEtLjA5LjIxYy0uNDguNzcuNDgsMi40My0uOCwyLjM5QTMuMjksMy4yOSwwLDAsMSwxNzguNzYsMTU0LjY0WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy0zXCIgZD1cIk0xNjYuNDYsNDE2LjA3Yy0yLjM1LjQxLTQuMzYtMS02LjU4LTEuMjUtMS4yLS4xNi0xLjgxLTEuMjItMi41NS0yLjA5LTMuMDctMy42OC00LjEyLTguMzQtNi4xNy0xMi41MWExLjMyLDEuMzIsMCwwLDEsLjEtMS42OGMuNTUtLjQ3LDEuMTMtLjEsMS42OC4xNCwyLjU0LDEuMTYsNS4wOCwyLjI5LDcuNiwzLjQ4YTYuNjEsNi42MSwwLDAsMCw1LjQ3LjI2LDI0LjY3LDI0LjY3LDAsMCwxLDYuMzktMS4zM2MxLjI5LS4xNCwxLjg4LjMyLDEuODMsMS41OHMtLjM3LDIuMDktMS44OSwxLjg0YTExLjI1LDExLjI1LDAsMCwwLTUuMTUuMThjLTEuMDUuMzItMi44MS4zMy0yLjc5LDEuNDNhNC40NCw0LjQ0LDAsMCwwLDEuNjYsMy42OSwxNS40MSwxNS40MSwwLDAsMSwzLjgsMy44MmMuMzkuNTMsMS4wOSwxLC42OCwxLjc2cy0xLjE0LjY2LTEuODIuNjhTMTY3LjIyLDQxNi4wNywxNjYuNDYsNDE2LjA3WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy01XCIgZD1cIk0xOTIuMzYsMTY5LjU5YzUuNDguMzMsMTAuOTEsMS4zOCwxNi40NSwxLDguMDUtLjU2LDE1Ljk0LTIuMiwyMy44OS0zLjQyYTQwLjg4LDQwLjg4LDAsMCwwLDktMi4yMSw2Ljc1LDYuNzUsMCwwLDEsMi0uMzNjLjY4LDAsMS40MSwwLDEuNzUuNzJhMS44OCwxLjg4LDAsMCwxLS40NywyLjA5QTUuNSw1LjUsMCwwLDEsMjQyLDE2OWMtOS41OCwyLjM0LTE5LjE4LDQuNjMtMjkuMTIsNC43NS0yLjMyLS4xOC00LjY2LS4xOS02Ljk0LS41OEMyMDEuMzEsMTcyLjQzLDE5Ni42NSwxNzEuNjgsMTkyLjM2LDE2OS41OVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtNFwiIGQ9XCJNMTkyLjM2LDE2OS41OWM0LjI5LDIuMDksOSwyLjg0LDEzLjU5LDMuNjMsMi4yOC4zOSw0LjYyLjQsNi45NC41OGEzLjI2LDMuMjYsMCwwLDEtMi4xOS4zNGMtNC42OCwwLTkuMzYtLjA5LTE0LC4xMmEzMi43OCwzMi43OCwwLDAsMS0xMS41LTJjLTEtLjMyLTIuNDYtLjUyLTIuMjgtMnMxLjY5LTEuMywyLjU2LTEuMzJBMjUuNzcsMjUuNzcsMCwwLDEsMTkyLjM2LDE2OS41OVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtM1wiIGQ9XCJNMTIyLjA3LDQwMy4zOGMyLjU4LTIuMjIsNi4wOS0yLjUyLDguNDctNC44NWEuNzguNzgsMCwwLDEsMS4zNC4xNmMuNiwxLjE1LDEuMjIsMi40NS4zOSwzLjYzQzEzMC41OSw0MDQuNywxMjQuNDksNDA1LjMxLDEyMi4wNyw0MDMuMzhaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTRcIiBkPVwiTTE0Mi40MSwzODUuMjhjLTMuMDguNDEtNi4zOC4xOC04LjYsMy4xLS4yNS4zMy0xLC4zMS0xLjQ2LjQ2LTEuMjctMi4zMy0xLjE2LTIuNjUsMS4yNy0zLjYsMS44Mi0uNzIsMy4zNC0yLjA2LDUuMjktMi41NEMxNDEuMzEsMzgyLjEsMTQyLjEzLDM4Mi42OCwxNDIuNDEsMzg1LjI4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy0zXCIgZD1cIk0xODguNTQsNDQwLjc1YzEuMjUtMy4yOCwyLjgyLTMuNjMsNC45NS0xLC43NS45MiwyLjY0LDEuNzIsMS44MiwyLjkxLS42My45Mi0yLjA5LS41Mi0zLjE5LS44Ni0uNjQtLjItMS4yNS0uNTEtMS44OC0uNzRTMTg5LDQ0MS4yLDE4OC41NCw0NDAuNzVaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTNcIiBkPVwiTTEzNC4zMyw0NDcuODhhOS4yMyw5LjIzLDAsMCwxLC41MS00LjYyYy4xOS0uNDMuMjItMS4yNC45LTEuMDZhNS4xOSw1LjE5LDAsMCwxLDEuOTIsMS4xYy41OC40OSwwLC45NC0uMywxLjMzYTEwLDEwLDAsMCwxLTMuMDUsMy4yM1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtM1wiIGQ9XCJNMTc3LjM4LDQwMS4zMWMuMzMtLjY3LS42Mi0yLC43LTEuOXMyLjk1LDEuMSwzLjA3LDIuMjJjLjEuOTItMS43OCwxLjg5LTIuODgsMS45NEMxNzYuNzIsNDAzLjY0LDE3Ny45Myw0MDIsMTc3LjM4LDQwMS4zMVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtM1wiIGQ9XCJNMTE1LjM5LDQxMS40OGE2LjMyLDYuMzIsMCwwLDEsMi43NS00Ljc2LDEsMSwwLDAsMSwxLjQzLDAsLjg2Ljg2LDAsMCwxLS4wOSwxLjM3QzExOC4wNyw0MDkuMDgsMTE3LjE5LDQxMC42NywxMTUuMzksNDExLjQ4WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy0zXCIgZD1cIk0xOTEuMzUsNDE0LjM5Yy42Ni4xMiwxLjU2LDAsMS4zMS44OS0uMzEsMS4wNy0xLDIuMTUtMi4zMiwyLjA4LTEtLjA1LTItLjktMS43NS0xLjdDMTg4LjkyLDQxNC40NCwxOTAuNDUsNDE0Ljc4LDE5MS4zNSw0MTQuMzlaXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC04LjQgLTYuNjUpXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTVcIiBkPVwiTTE5Ni42OSw5OC45M2MtLjA3LTEuMjItLjQ5LTIuNTMuOTMtMy4zM2wzLjc5LjkxWlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy01XCIgZD1cIk0yMzYuMzUsMTExLjQ2bC4zNC0uMTQtLjEyLjM2WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy0xXCIgZD1cIk01OC41NSwyOTAuMzNjMS44NC4zNiwzLjU1LS41Nyw1LjM5LS40NSwyLjYxLjE3LDMuMTUuNjMsMy4yLDMuMjRhOS4zNSw5LjM1LDAsMCwwLC4xLDEuODFjLjE5Ljg2LjQsMS41OSwxLjY0Ljg0LDIuNzEtMS42NCw1LjIxLTEsNy43OS42NywzLjYxLDIuMzksNS4zMyw2LjA2LDcuMjUsOS42NS4yMS40LjM1Ljg0LjU0LDEuMjQsMS44MywzLjg2LDMuNTgsNC41LDYuNzYsMS42Nyw0LjE1LTMuNjksNy0yLjI3LDkuNSwzLjI5LDEuMjgsMi43OSwxLjYxLDYsMi45Myw4Ljc3LDIuNDcsNS4xNSw0LjExLDEwLjcxLDcuNCwxNS40NywyLDIuODcsMy4xNiwyLjgsNC44My0uMjZhODcuMTQsODcuMTQsMCwwLDEsMzQuNjgtMzQuODJjNS45LTMuMzEsMTIuMzEtNS4zMiwxOC40OS03LjkxLDEwLjQ4LTQuMzksMTkuMjEtMTAuNzcsMjQuMjUtMjEuMzQsNC45MS0xMC4zMiw1Ljg2LTIwLjkzLDIuMzQtMzEuODgtLjE5LS42LS43My0xLjItLjIzLTJhNi41NSw2LjU1LDAsMCwxLDQuNTUsNS4zOGMxLDguNTksMSwxNy4xOC0xLjM1LDI1LjU4LTIuODMsMTAtOS43MywxNi42My0xOC4yNCwyMS44OS01Ljc2LDMuNTYtMTIuMTMsNS42Ny0xOC40NSw4YTY5Ljc1LDY5Ljc1LDAsMCwwLTM0Ljg0LDI3Yy0yLjc5LDQuMTItNi42NCw3LjQzLTkuMjMsMTEuNzJhMjEuODYsMjEuODYsMCwwLDAtMS4xNiwxLjkzYy0xLDIuMTEtMi40OSwyLjYtNC4yNSwxLjA4LTMtMi42My01LjYyLTUuNTctNy05LjUyYTM5Ljc5LDM5Ljc5LDAsMCwwLTMuNjYtNy43NWMtMS42Mi0yLjY2LTIuMjMtNS41Ny0yLjkxLTguNWExMi40NiwxMi40NiwwLDAsMC0uODktMi43OWMtMS4zNy0yLjczLTQtMy4yNS02LjM4LTEuMy01LDQuMTgtNS4wNiw0LjE0LTguMjQtMS41N2E0Ny45LDQ3LjksMCwwLDAtNC02Yy0zLTMuOTEtNi44MS00LjY1LTExLjI1LTIuNDNhMzEsMzEsMCwwLDEtMy43NCwxLjU5LDEuNjIsMS42MiwwLDAsMS0yLS41NCwxLjcsMS43LDAsMCwxLC4xOC0xLjkyYy40OS0uNzYsMS4wNi0xLjQ3LDEuNTYtMi4yMkE0LjEsNC4xLDAsMCwwLDYxLDI5MS4yOGEzLjc3LDMuNzcsMCwwLDEtMi41LS44NlpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNNTguNDcsMjkwLjQyYy0xLjgyLS42MS0yLjM0LTEuODktMS41NC00LjA2YTE2Ljg1LDE2Ljg1LDAsMCwxLDIuNDYtNC4zMWM1LjE4LTYuODYsMTAuMzktMTMuNywxNS41NC0yMC41OSwyLjM1LTMuMTQsNC41My02LjQsNi44Ni05LjU0LDMuMDUtNC4xLDcuMTMtNy4xLDExLjA1LTEwLjMsNS4zNy00LjM4LDEwLjQyLTkuMTcsMTUuOS0xMy40MSwxMC44OS04LjQzLDIyLjg2LTE0LjYyLDM2Ljc4LTE2LjI2YTEzLjEsMTMuMSwwLDAsMSw1LjQuMjFjLjY0LjIsMS40Mi4yNSwxLjUsMS4xMnMtLjYyLDEtMS4xMiwxLjI5YTQyLjY0LDQyLjY0LDAsMCwxLTguOTQsMy4xNWMtNi45LDEuODktMTMuODMsMy42Ni0yMC41Miw2LjIzYTU1LjMsNTUuMywwLDAsMC0xNy4zNiwxMS4yNWMtNi43NCw2LjE2LTEzLjUsMTIuMzMtMTkuODQsMTguOWE5My41NSw5My41NSwwLDAsMC0xMy4zLDE4LjE2QTU4LjQ2LDU4LjQ2LDAsMCwxLDYyLjU0LDI4NGMtMS43NiwxLjc4LTMuOCwzLjUzLTQsNi4zNlpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNMTY2LDEwNS4zOWMtMS4zNS0yLjc0LTEtNS42MS0uMTgtOC4zMWE3NS4wOSw3NS4wOSwwLDAsMSw3LjYtMTcuMzVjMi43NS00LjU1LDcuMTItNy4yNiwxMi05LjExYTkuNjIsOS42MiwwLDAsMSwyLjQ0LS40M2MxLjM0LS4xMywyLjc2LDAsMy4yOCwxLjRzLTEuMDcsMS43Mi0xLjgzLDIuNDRjLTQuNDYsNC4yNy05LDguNTItMTMuMzksMTIuODJhMTAuMjYsMTAuMjYsMCwwLDAtMi4yMywzLjM4Yy0yLDQuNzEtNC44OSw5LTYuNTUsMTMuODlBMS42MiwxLjYyLDAsMCwxLDE2NiwxMDUuMzlabTAtMy4zMmMxLjE2LS43LDEuMS0xLjU2LDEuMzgtMi4yMkMxNzEsOTEuNSwxNzUsODMuNDEsMTgyLjQ2LDc3LjYyYzItMS41MiwzLjYxLTMuNDMsNS43Ny00LjczLjM2LS4yMi44Ni0uNDcuNjUtMXMtLjc1LS40LTEuMTYtLjMxYTguMTEsOC4xMSwwLDAsMC0xLjczLjUyLDI2LjczLDI2LjczLDAsMCwwLTEwLjM3LDguMTljLTQsNS4zLTYuMzIsMTEuNDYtOC43OCwxNy41M0EyMy44NCwyMy44NCwwLDAsMCwxNjYsMTAyLjA3WlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOC40IC02LjY1KVwiLz48cGF0aCBjbGFzcz1cImNscy0xXCIgZD1cIk0yMTguMTMsMTAzLjMyYy0zLjI3LS44OS00LTEuNjktNC00LC4wNi0xLjc3LjkxLTIuMjgsMi41LTEuNTFhMy41OSwzLjU5LDAsMCwxLDEuOSwyLjE0LDMuNzYsMy43NiwwLDAsMSwuMjIsMS4xYzAsMSwyLjI5LjUyLDEuNDQsMS43MXMtMSwyLjU0LTIuMjcsMy4yOWE0LjUsNC41LDAsMCwxLTYtMi4wOWMtMS4xMS0yLjMzLTEuOTEtNC45Mi0xLTcuNjJhMi4xOCwyLjE4LDAsMCwxLDEuNzMtMS41OWMxLjI1LS4yNiwyLjQ5LS42LDMuNzQtLjg2LDEuNDQtLjMsNC4zOCwxLjI4LDQuODUsMi42MWEyLjUxLDIuNTEsMCwwLDEtLjc2LDIuNjljLS43OC43OS0xLS4xNC0xLjE5LS42YTMuMjcsMy4yNywwLDAsMC0yLjExLTIuNDZjLTIuMjgtLjY0LTMuNS4zMS0zLjcsM0MyMTMuMjYsMTAzLDIxNS4yNCwxMDQuOTMsMjE4LjEzLDEwMy4zMlpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTY2LDEwMi4wN2EyMy44NCwyMy44NCwwLDAsMSwuODQtNC4yOWMyLjQ2LTYuMDcsNC43OC0xMi4yMyw4Ljc4LTE3LjUzQTI2LjczLDI2LjczLDAsMCwxLDE4Niw3Mi4wNmE4LjExLDguMTEsMCwwLDEsMS43My0uNTJjLjQxLS4wOS45NC0uMjcsMS4xNi4zMXMtLjI5LjgyLS42NSwxYy0yLjE2LDEuMjktMy44MSwzLjItNS43Nyw0LjczQzE3NSw4My40MSwxNzEsOTEuNSwxNjcuMzksOTkuODUsMTY3LjEsMTAwLjUxLDE2Ny4xNiwxMDEuMzcsMTY2LDEwMi4wN1pcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTguNCAtNi42NSlcIi8+PC9zdmc+XG5cblx0PC9kaXY+XG5cbiAgICA8c3R5bGU+XG5cbiAgICBcdEBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvJyk7XG4gICAgXHRAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PUFydm8nKTtcblxuICAgIFx0LyoqXG4gICAgXHQqIFRoZSBsaW5rcyB0byBvdGhlciBwYWdlc1xuICAgIFx0Ki9cbiAgICBcdC5oZWFkZXJcbiAgICBcdHtcblx0XHRcdHBhZGRpbmctdG9wOiAyNXB4O1xuXHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdFx0d2lkdGg6IDE5LjclO1xuICAgIFx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgXHR9XG4gICAgXHQuaGVhZGVyTGlua1xuICAgIFx0e1xuICAgIFx0XHRmb250LWZhbWlseTogUm9ib3RvO1xuICAgIFx0XHRjb2xvcjogIzIzMUYyMDtcbiAgICBcdH1cbiAgICBcdCNoZWFkZXJIb21lcGFnZVxuICAgIFx0e1xuICAgIFx0XHRmb250LWZhbWlseTogQXJ2bztcbiAgICBcdFx0Y29sb3I6ICNDNDk1NDI7XG4gICAgXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIFx0fVxuXG4gICAgXHQvKipcbiAgICBcdCogVGhlIHdlYnNpdGUgbG9nb1xuICAgIFx0Ki9cbiAgICBcdCNoZWFkZXJQaWNcbiAgICBcdHtcbiAgICBcdFx0cGFkZGluZy10b3A6IDMwcHg7XG4gICAgXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBcdH1cbiAgICBcdCNMYXllcl8xXG4gICAgXHR7XG4gICAgXHRcdGhlaWdodDogMTc1cHg7XG4gICAgXHR9XG5cbiAgICA8L3N0eWxlPlxuXG5cdDwvbmF2PmBcbn1cbiIsIi8qKlxuKiBQcm9qZWN0OiBGdXR1cmUgRGF5cyBGYXJtIFdlYnNpdGVcbiogQ3JlYXRlZCBCeTogQ2hyaXMgQmFyb25cbiogRGF0ZSBMYXN0IE1vZGlmaWVkOiAxLzE5LzIwMTggYnkgQWxleCBDYWRpZ2FuXG4qIERlc2NyaXB0aW9uOiBUaGlzIGZpbGUgYnVpbGRzIHRoZSBib2R5IG9mIHRoZSBwYWdlICh0aGUgbWFpbiBjb250ZW50KVxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiggeyBtb2RlbCB9ICkgXG57IFxuXHRyZXR1cm4gYDxkaXY+XG5cblx0PGRpdiBpZCA9IFwiaG9tZVRpdGxlXCI+XG5cblx0XHRXZWxjb21lIEhlYWRsaW5lXG5cblx0PC9kaXY+XG5cblx0PGRpdiBpZCA9IFwiaG9tZVN1YnRpdGxlXCI+XG5cblx0XHRBTExFR0FOIENPVU5UWSwgTUlDSElHQU5cblxuXHQ8L2Rpdj5cblxuXHQ8YnI+XG5cblx0PGRpdiBpZCA9IFwiaG9tZVBhcmFncmFwaFwiPlxuXG5cdFx0UHJhZXNlbnQgbGFvcmVldCBvcm5hcmUgbGlndWxhLCBhYyBhY2N1bXNhbiB0dXJwaXMgc2FnaXR0aXMgYXQuXG5cdFx0SW50ZWdlciBhdWN0b3IgZWdlc3RhcyBlbGVpZmVuZC4gRXRpYW0gbHVjdHVzIG1hdHRpcyBqdXN0bywgdml0YWVcblx0XHRmZXJtZW50dW0gbGliZXJvIGV1aXNtb2QgbGFjaW5pYS4gUHJvaW4gYXQgY29uc2VxdWF0IHJpc3VzLlxuXHRcdFByYWVzZW50IHNvbGxpY2l0dWRpbiB2ZXN0aWJ1bHVtIGZlbGlzLCB1dCBzb2RhbGVzIGVuaW0uXG5cblx0PC9kaXY+XG5cblx0PGJyPlxuXG5cdDxkaXYgaWQgPSBcImhvbWVQaWMxXCI+XG5cblx0XHQ8aW1nIHNyYyA9IC9zdGF0aWMvaW1nLyR7XCJKYW0uanBnXCJ9IGFsdCA9IFwiSmFtLmpwZ1wiIGhlaWdodCA9IFwiMzAwXCIgd2lkdGggPSBcIjMwMFwiPlxuXG5cdDwvZGl2PlxuXG5cdDxkaXYgaWQgPSBcImhvbWVQaWMyXCI+XG5cblx0XHQ8aW1nIHNyYyA9IC9zdGF0aWMvaW1nLyR7XCJCZWV0cy5qcGdcIn0gYWx0ID0gXCJCZWV0cy5qcGdcIj5cblxuXHQ8L2Rpdj5cblxuXHQ8ZGl2IGlkID0gXCJob21lUGljM1wiPlxuXG5cdFx0PGltZyBzcmMgPSAvc3RhdGljL2ltZy8ke1wiU3F1YXNoLmpwZ1wifSBhbHQgPSBcIlNxdWFzaC5qcGdcIj5cblxuXHQ8L2Rpdj5cblxuXHQ8YnI+XG5cblx0PGRpdiBpZCA9IFwiaG9tZVBpYzRcIj5cblxuXG5cblx0PC9kaXY+XG5cblx0PGRpdiBpZCA9IFwiaG9tZVBpYzVcIj5cblxuXG5cblx0PC9kaXY+XG5cblx0PGRpdiBpZCA9IFwiaG9tZVBpYzZcIj5cblxuXG5cblx0PC9kaXY+XG5cblxuXG5cdDxzdHlsZT5cblxuXHRcdEBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvJyk7XG4gICAgICAgIEBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9QXJ2bycpO1xuXG5cdFx0I2hvbWVUaXRsZVxuXHRcdHtcblx0XHRcdHRleHQtYWxpZ246IGNlbnRlcjtcblx0XHRcdGZvbnQtc2l6ZTogMzJweDtcblx0XHRcdGZvbnQtZmFtaWx5OiBBcnZvO1xuXHRcdFx0Y29sb3I6ICMyMzFGMjA7XG5cdFx0XHRwYWRkaW5nLXRvcDogMzBweDtcblx0XHR9XG5cblx0XHQjaG9tZVN1YnRpdGxlXG5cdFx0e1xuXHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdFx0Zm9udC1mYW1pbHk6IFJvYm90bztcblx0XHRcdGNvbG9yOiAjMjMxRjIwO1xuXHRcdH1cblxuXHRcdCNob21lUGFyYWdyYXBoXG5cdFx0e1xuXHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdFx0Zm9udC1mYW1pbHk6IFJvYm90bztcblx0XHRcdGNvbG9yOiAjMjMxRjIwO1xuXHRcdFx0bWFyZ2luLXJpZ2h0OiAzMCU7XG5cdFx0XHRtYXJnaW4tbGVmdDogMzAlO1xuXHRcdH1cblxuXHRcdCNob21lUGljMVxuXHRcdHtcblx0XHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdFxuXHRcdH1cblx0XHQjaG9tZVBpYzJcblx0XHR7XG5cdFx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdFx0XHRcblx0XHR9XG5cdFx0I2hvbWVQaWMzXG5cdFx0e1xuXHRcdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdFx0XG5cdFx0fVxuXG5cdDwvc3R5bGU+XG5cdFxuXHQ8L2Rpdj5gIFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7IH0sIHJlcXVpcmUoJy4vTXlPYmplY3QnKSwge1xuXG4gICAgQ3JlYXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkdWNlciggdGhpcy5hdHRyaWJ1dGVzLCBhdHRyID0+ICggeyBbYXR0ci5uYW1lXTogdHlwZW9mIGF0dHIuZGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJyA/IGF0dHIuZGVmYXVsdCgpIDogYXR0ci5kZWZhdWx0IH0gKSApXG4gICAgfSxcblxuICAgIGF0dHJpYnV0ZXM6IFsgXSxcblxuICAgIGRhdGE6IHsgfSxcblxuICAgIGNvbnN0cnVjdG9yKCBkYXRhPXt9LCBvcHRzPXt9ICkge1xuICAgICAgICBPYmplY3QuYXNzaWduKCB0aGlzLCB7IHN0b3JlOiB7IH0sIGRhdGEgfSwgb3B0cyApXG5cbiAgICAgICAgaWYoIHRoaXMuc3RvcmVCeSApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVCeS5mb3JFYWNoKCBrZXkgPT4gdGhpcy5zdG9yZVsga2V5IF0gPSB7IH0gKVxuICAgICAgICAgICAgdGhpcy5fc3RvcmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgbWV0YTogeyB9LFxuXG4gICAgc29ydCggb3B0cyApIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IE9iamVjdC5rZXlzKCBvcHRzIClbMF0sXG4gICAgICAgICAgICB2YWx1ZSA9IG9wdHNbYXR0cl07XG5cbiAgICAgICAgdGhpcy5kYXRhLnNvcnQoICggYSwgYiApID0+XG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgID8gYVthdHRyXSA8IGJbYXR0cl0gPyAtMSA6IDFcbiAgICAgICAgICAgICAgICA6IGJbYXR0cl0gPCBhW2F0dHJdID8gLTEgOiAxXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBfcmVzZXRTdG9yZSggc3RvcmVCeSApIHtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHsgfVxuICAgICAgICBzdG9yZUJ5LmZvckVhY2goIGF0dHIgPT4gdGhpcy5zdG9yZVsgYXR0ciBdID0geyB9IClcbiAgICAgICAgdGhpcy5zdG9yZUJ5ID0gc3RvcmVCeVxuICAgIH0sXG5cbiAgICBfc3RvcmUoIGRhdGEgKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXMuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goIGRhdHVtID0+IHRoaXMuc3RvcmVCeS5mb3JFYWNoKCBhdHRyID0+IHRoaXMuX3N0b3JlQXR0ciggZGF0dW0sIGF0dHIgKSApIClcbiAgICB9LFxuXG4gICAgX3N0b3JlQXR0ciggZGF0dW0sIGF0dHIgKSB7XG4gICAgICAgIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdID1cbiAgICAgICAgICAgIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdXG4gICAgICAgICAgICAgICAgPyBBcnJheS5pc0FycmF5KCB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXSApXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0uY29uY2F0KCBkYXR1bSApXG4gICAgICAgICAgICAgICAgICAgIDpbIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdLCBkYXR1bSBdXG4gICAgICAgICAgICAgICAgOiBkYXR1bVxuICAgIH0sXG5cbiAgICBfc3RvcmVPbmUoIGRhdHVtICkge1xuICAgICAgICB0aGlzLnN0b3JlQnkuZm9yRWFjaCggYXR0ciA9PiB0aGlzLl9zdG9yZUF0dHIoIGRhdHVtLCBhdHRyICkgKVxuICAgIH1cblxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGVyciA9PiB7IGNvbnNvbGUubG9nKCBlcnIuc3RhY2sgfHwgZXJyICkgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBjYXBpdGFsaXplRmlyc3RMZXR0ZXI6IHN0cmluZyA9PiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSksXG5cbiAgICBnZXRJbnRSYW5nZSggaW50ICkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSggQXJyYXkoIGludCApLmtleXMoKSApXG4gICAgfSxcblxuICAgIGdldFJhbmRvbUluY2x1c2l2ZUludGVnZXIoIG1pbiwgbWF4ICkge1xuICAgICAgICBtaW4gPSBNYXRoLmNlaWwobWluKVxuICAgICAgICBtYXggPSBNYXRoLmZsb29yKG1heClcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5cbiAgICB9LFxuXG4gICAgb21pdCggb2JqLCBrZXlzICkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoIG9iaiApLmZpbHRlcigga2V5ID0+ICFrZXlzLmluY2x1ZGVzKCBrZXkgKSApLnJlZHVjZSggKCBtZW1vLCBrZXkgKSA9PiBPYmplY3QuYXNzaWduKCBtZW1vLCB7IFtrZXldOiBvYmpba2V5XSB9ICksIHsgfSApXG4gICAgfSxcblxuICAgIHBpY2soIG9iaiwga2V5cyApIHtcbiAgICAgICAgcmV0dXJuIGtleXMucmVkdWNlKCAoIG1lbW8sIGtleSApID0+IE9iamVjdC5hc3NpZ24oIG1lbW8sIHsgW2tleV06IG9ialtrZXldIH0gKSwgeyB9IClcbiAgICB9LFxuXG4gICAgcmVkdWNlciggYXJyLCBmbiApIHsgcmV0dXJuIGFyci5yZWR1Y2UoICggbWVtbywgaXRlbSwgaSApID0+IE9iamVjdC5hc3NpZ24oIG1lbW8sIGZuKCBpdGVtLCBpICkgKSwgeyB9ICkgfSxcblxuICAgIHNodWZmbGVBcnJheSggYXJyICkge1xuICAgICAgICBjb25zdCBydiA9IEFycmF5LmZyb20oIGFyciApXG4gICAgICAgXG4gICAgICAgIHJ2LmZvckVhY2goICggaXRlbSwgaSApID0+IHtcbiAgICAgICAgICAgIGlmKCBpID09PSBydi5sZW5ndGggLSAxICkgcmV0dXJuIFxuICAgICAgICAgICAgY29uc3QgaW50ID0gdGhpcy5nZXRSYW5kb21JbmNsdXNpdmVJbnRlZ2VyKCBpLCBydi5sZW5ndGggLSAxICksXG4gICAgICAgICAgICAgICAgaG9sZGVyID0gcnZbIGkgXVxuXG4gICAgICAgICAgICBydltpXSA9IHJ2W2ludF1cbiAgICAgICAgICAgIHJ2W2ludF0gPSBob2xkZXJcbiAgICAgICAgfSApXG5cbiAgICAgICAgcmV0dXJuIHJ2XG4gICAgfSxcblxuICAgIEVycm9yOiByZXF1aXJlKCcuL015RXJyb3InKSxcblxuICAgIFA6ICggZnVuLCBhcmdzPVsgXSwgdGhpc0FyZyApID0+XG4gICAgICAgIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IFJlZmxlY3QuYXBwbHkoIGZ1biwgdGhpc0FyZyB8fCB0aGlzLCBhcmdzLmNvbmNhdCggKCBlLCAuLi5jYWxsYmFjayApID0+IGUgPyByZWplY3QoZSkgOiByZXNvbHZlKGNhbGxiYWNrKSApICkgKSxcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHsgcmV0dXJuIHRoaXMgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLyogc21vb3Roc2Nyb2xsIHYwLjQuMCAtIDIwMTcgLSBEdXN0YW4gS2FzdGVuLCBKZXJlbWlhcyBNZW5pY2hlbGxpIC0gTUlUIExpY2Vuc2UgKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKlxuICAgKiBhbGlhc2VzXG4gICAqIHc6IHdpbmRvdyBnbG9iYWwgb2JqZWN0XG4gICAqIGQ6IGRvY3VtZW50XG4gICAqL1xuICB2YXIgdyA9IHdpbmRvdztcbiAgdmFyIGQgPSBkb2N1bWVudDtcblxuICAvKipcbiAgICogaW5kaWNhdGVzIGlmIGEgdGhlIGN1cnJlbnQgYnJvd3NlciBpcyBtYWRlIGJ5IE1pY3Jvc29mdFxuICAgKiBAbWV0aG9kIGlzTWljcm9zb2Z0QnJvd3NlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckFnZW50XG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgZnVuY3Rpb24gaXNNaWNyb3NvZnRCcm93c2VyKHVzZXJBZ2VudCkge1xuICAgIHZhciB1c2VyQWdlbnRQYXR0ZXJucyA9IFsnTVNJRSAnLCAnVHJpZGVudC8nLCAnRWRnZS8nXTtcblxuICAgIHJldHVybiBuZXcgUmVnRXhwKHVzZXJBZ2VudFBhdHRlcm5zLmpvaW4oJ3wnKSkudGVzdCh1c2VyQWdlbnQpO1xuICB9XG5cbiAgIC8vIHBvbHlmaWxsXG4gIGZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIC8vIHJldHVybiBpZiBzY3JvbGwgYmVoYXZpb3IgaXMgc3VwcG9ydGVkIGFuZCBwb2x5ZmlsbCBpcyBub3QgZm9yY2VkXG4gICAgaWYgKCdzY3JvbGxCZWhhdmlvcicgaW4gZC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcbiAgICAgICYmIHcuX19mb3JjZVNtb290aFNjcm9sbFBvbHlmaWxsX18gIT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnbG9iYWxzXG4gICAgdmFyIEVsZW1lbnQgPSB3LkhUTUxFbGVtZW50IHx8IHcuRWxlbWVudDtcbiAgICB2YXIgU0NST0xMX1RJTUUgPSA0Njg7XG5cbiAgICAvKlxuICAgICAqIElFIGhhcyByb3VuZGluZyBidWcgcm91bmRpbmcgZG93biBjbGllbnRIZWlnaHQgYW5kIGNsaWVudFdpZHRoIGFuZFxuICAgICAqIHJvdW5kaW5nIHVwIHNjcm9sbEhlaWdodCBhbmQgc2Nyb2xsV2lkdGggY2F1c2luZyBmYWxzZSBwb3NpdGl2ZXNcbiAgICAgKiBvbiBoYXNTY3JvbGxhYmxlU3BhY2VcbiAgICAgKi9cbiAgICB2YXIgUk9VTkRJTkdfVE9MRVJBTkNFID0gaXNNaWNyb3NvZnRCcm93c2VyKHcubmF2aWdhdG9yLnVzZXJBZ2VudCkgPyAxIDogMDtcblxuICAgIC8vIG9iamVjdCBnYXRoZXJpbmcgb3JpZ2luYWwgc2Nyb2xsIG1ldGhvZHNcbiAgICB2YXIgb3JpZ2luYWwgPSB7XG4gICAgICBzY3JvbGw6IHcuc2Nyb2xsIHx8IHcuc2Nyb2xsVG8sXG4gICAgICBzY3JvbGxCeTogdy5zY3JvbGxCeSxcbiAgICAgIGVsZW1lbnRTY3JvbGw6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCB8fCBzY3JvbGxFbGVtZW50LFxuICAgICAgc2Nyb2xsSW50b1ZpZXc6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSB0aW1pbmcgbWV0aG9kXG4gICAgdmFyIG5vdyA9IHcucGVyZm9ybWFuY2UgJiYgdy5wZXJmb3JtYW5jZS5ub3dcbiAgICAgID8gdy5wZXJmb3JtYW5jZS5ub3cuYmluZCh3LnBlcmZvcm1hbmNlKVxuICAgICAgOiBEYXRlLm5vdztcblxuICAgIC8qKlxuICAgICAqIGNoYW5nZXMgc2Nyb2xsIHBvc2l0aW9uIGluc2lkZSBhbiBlbGVtZW50XG4gICAgICogQG1ldGhvZCBzY3JvbGxFbGVtZW50XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2Nyb2xsRWxlbWVudCh4LCB5KSB7XG4gICAgICB0aGlzLnNjcm9sbExlZnQgPSB4O1xuICAgICAgdGhpcy5zY3JvbGxUb3AgPSB5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgcmVzdWx0IG9mIGFwcGx5aW5nIGVhc2UgbWF0aCBmdW5jdGlvbiB0byBhIG51bWJlclxuICAgICAqIEBtZXRob2QgZWFzZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBrXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlYXNlKGspIHtcbiAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGEgc21vb3RoIGJlaGF2aW9yIHNob3VsZCBiZSBhcHBsaWVkXG4gICAgICogQG1ldGhvZCBzaG91bGRCYWlsT3V0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBmaXJzdEFyZ1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNob3VsZEJhaWxPdXQoZmlyc3RBcmcpIHtcbiAgICAgIGlmIChmaXJzdEFyZyA9PT0gbnVsbFxuICAgICAgICB8fCB0eXBlb2YgZmlyc3RBcmcgIT09ICdvYmplY3QnXG4gICAgICAgIHx8IGZpcnN0QXJnLmJlaGF2aW9yID09PSB1bmRlZmluZWRcbiAgICAgICAgfHwgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdhdXRvJ1xuICAgICAgICB8fCBmaXJzdEFyZy5iZWhhdmlvciA9PT0gJ2luc3RhbnQnKSB7XG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvbnVsbFxuICAgICAgICAvLyBvciBiZWhhdmlvciBpcyBhdXRvLCBpbnN0YW50IG9yIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBmaXJzdEFyZyA9PT0gJ29iamVjdCcgJiYgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdzbW9vdGgnKSB7XG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIGFuIG9iamVjdCBhbmQgYmVoYXZpb3IgaXMgc21vb3RoXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBiZWhhdmlvciBpcyBub3Qgc3VwcG9ydGVkXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnYmVoYXZpb3IgbWVtYmVyIG9mIFNjcm9sbE9wdGlvbnMgJ1xuICAgICAgICArIGZpcnN0QXJnLmJlaGF2aW9yXG4gICAgICAgICsgJyBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgZW51bWVyYXRpb24gU2Nyb2xsQmVoYXZpb3IuJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYW4gZWxlbWVudCBoYXMgc2Nyb2xsYWJsZSBzcGFjZSBpbiB0aGUgcHJvdmlkZWQgYXhpc1xuICAgICAqIEBtZXRob2QgaGFzU2Nyb2xsYWJsZVNwYWNlXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCBheGlzKSB7XG4gICAgICBpZiAoYXhpcyA9PT0gJ1knKSB7XG4gICAgICAgIHJldHVybiAoZWwuY2xpZW50SGVpZ2h0ICsgUk9VTkRJTkdfVE9MRVJBTkNFKSA8IGVsLnNjcm9sbEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgICAgICByZXR1cm4gKGVsLmNsaWVudFdpZHRoICsgUk9VTkRJTkdfVE9MRVJBTkNFKSA8IGVsLnNjcm9sbFdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGhhcyBhIHNjcm9sbGFibGUgb3ZlcmZsb3cgcHJvcGVydHkgaW4gdGhlIGF4aXNcbiAgICAgKiBAbWV0aG9kIGNhbk92ZXJmbG93XG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FuT3ZlcmZsb3coZWwsIGF4aXMpIHtcbiAgICAgIHZhciBvdmVyZmxvd1ZhbHVlID0gdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKVsnb3ZlcmZsb3cnICsgYXhpc107XG5cbiAgICAgIHJldHVybiBvdmVyZmxvd1ZhbHVlID09PSAnYXV0bycgfHwgb3ZlcmZsb3dWYWx1ZSA9PT0gJ3Njcm9sbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGFuIGVsZW1lbnQgY2FuIGJlIHNjcm9sbGVkIGluIGVpdGhlciBheGlzXG4gICAgICogQG1ldGhvZCBpc1Njcm9sbGFibGVcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF4aXNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Njcm9sbGFibGUoZWwpIHtcbiAgICAgIHZhciBpc1Njcm9sbGFibGVZID0gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCAnWScpICYmIGNhbk92ZXJmbG93KGVsLCAnWScpO1xuICAgICAgdmFyIGlzU2Nyb2xsYWJsZVggPSBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsICdYJykgJiYgY2FuT3ZlcmZsb3coZWwsICdYJyk7XG5cbiAgICAgIHJldHVybiBpc1Njcm9sbGFibGVZIHx8IGlzU2Nyb2xsYWJsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmluZHMgc2Nyb2xsYWJsZSBwYXJlbnQgb2YgYW4gZWxlbWVudFxuICAgICAqIEBtZXRob2QgZmluZFNjcm9sbGFibGVQYXJlbnRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHJldHVybnMge05vZGV9IGVsXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFNjcm9sbGFibGVQYXJlbnQoZWwpIHtcbiAgICAgIHZhciBpc0JvZHk7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuXG4gICAgICAgIGlzQm9keSA9IGVsID09PSBkLmJvZHk7XG4gICAgICB9IHdoaWxlIChpc0JvZHkgPT09IGZhbHNlICYmIGlzU2Nyb2xsYWJsZShlbCkgPT09IGZhbHNlKTtcblxuICAgICAgaXNCb2R5ID0gbnVsbDtcblxuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGYgaW52b2tlZCBmdW5jdGlvbiB0aGF0LCBnaXZlbiBhIGNvbnRleHQsIHN0ZXBzIHRocm91Z2ggc2Nyb2xsaW5nXG4gICAgICogQG1ldGhvZCBzdGVwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0ZXAoY29udGV4dCkge1xuICAgICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhciBjdXJyZW50WDtcbiAgICAgIHZhciBjdXJyZW50WTtcbiAgICAgIHZhciBlbGFwc2VkID0gKHRpbWUgLSBjb250ZXh0LnN0YXJ0VGltZSkgLyBTQ1JPTExfVElNRTtcblxuICAgICAgLy8gYXZvaWQgZWxhcHNlZCB0aW1lcyBoaWdoZXIgdGhhbiBvbmVcbiAgICAgIGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xuXG4gICAgICAvLyBhcHBseSBlYXNpbmcgdG8gZWxhcHNlZCB0aW1lXG4gICAgICB2YWx1ZSA9IGVhc2UoZWxhcHNlZCk7XG5cbiAgICAgIGN1cnJlbnRYID0gY29udGV4dC5zdGFydFggKyAoY29udGV4dC54IC0gY29udGV4dC5zdGFydFgpICogdmFsdWU7XG4gICAgICBjdXJyZW50WSA9IGNvbnRleHQuc3RhcnRZICsgKGNvbnRleHQueSAtIGNvbnRleHQuc3RhcnRZKSAqIHZhbHVlO1xuXG4gICAgICBjb250ZXh0Lm1ldGhvZC5jYWxsKGNvbnRleHQuc2Nyb2xsYWJsZSwgY3VycmVudFgsIGN1cnJlbnRZKTtcblxuICAgICAgLy8gc2Nyb2xsIG1vcmUgaWYgd2UgaGF2ZSBub3QgcmVhY2hlZCBvdXIgZGVzdGluYXRpb25cbiAgICAgIGlmIChjdXJyZW50WCAhPT0gY29udGV4dC54IHx8IGN1cnJlbnRZICE9PSBjb250ZXh0LnkpIHtcbiAgICAgICAgdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcC5iaW5kKHcsIGNvbnRleHQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzY3JvbGxzIHdpbmRvdyBvciBlbGVtZW50IHdpdGggYSBzbW9vdGggYmVoYXZpb3JcbiAgICAgKiBAbWV0aG9kIHNtb290aFNjcm9sbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE5vZGV9IGVsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKGVsLCB4LCB5KSB7XG4gICAgICB2YXIgc2Nyb2xsYWJsZTtcbiAgICAgIHZhciBzdGFydFg7XG4gICAgICB2YXIgc3RhcnRZO1xuICAgICAgdmFyIG1ldGhvZDtcbiAgICAgIHZhciBzdGFydFRpbWUgPSBub3coKTtcblxuICAgICAgLy8gZGVmaW5lIHNjcm9sbCBjb250ZXh0XG4gICAgICBpZiAoZWwgPT09IGQuYm9keSkge1xuICAgICAgICBzY3JvbGxhYmxlID0gdztcbiAgICAgICAgc3RhcnRYID0gdy5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQ7XG4gICAgICAgIHN0YXJ0WSA9IHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBtZXRob2QgPSBvcmlnaW5hbC5zY3JvbGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxhYmxlID0gZWw7XG4gICAgICAgIHN0YXJ0WCA9IGVsLnNjcm9sbExlZnQ7XG4gICAgICAgIHN0YXJ0WSA9IGVsLnNjcm9sbFRvcDtcbiAgICAgICAgbWV0aG9kID0gc2Nyb2xsRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgLy8gc2Nyb2xsIGxvb3Bpbmcgb3ZlciBhIGZyYW1lXG4gICAgICBzdGVwKHtcbiAgICAgICAgc2Nyb2xsYWJsZTogc2Nyb2xsYWJsZSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgICBzdGFydFg6IHN0YXJ0WCxcbiAgICAgICAgc3RhcnRZOiBzdGFydFksXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE9SSUdJTkFMIE1FVEhPRFMgT1ZFUlJJREVTXG4gICAgLy8gdy5zY3JvbGwgYW5kIHcuc2Nyb2xsVG9cbiAgICB3LnNjcm9sbCA9IHcuc2Nyb2xsVG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbC5jYWxsKFxuICAgICAgICAgIHcsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IGFyZ3VtZW50c1swXVxuICAgICAgICAgICAgICA6ICh3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldCksXG4gICAgICAgICAgLy8gdXNlIHRvcCBwcm9wLCBzZWNvbmQgYXJndW1lbnQgaWYgcHJlc2VudCBvciBmYWxsYmFjayB0byBzY3JvbGxZXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBhcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgOiAody5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdyxcbiAgICAgICAgZC5ib2R5LFxuICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgOiAody5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQpLFxuICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgIDogKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gdy5zY3JvbGxCeVxuICAgIHcuc2Nyb2xsQnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbEJ5LmNhbGwoXG4gICAgICAgICAgdyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzBdXG4gICAgICAgICAgICAgIDogMCxcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgID8gYXJndW1lbnRzWzFdXG4gICAgICAgICAgICAgOiAwXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdyxcbiAgICAgICAgZC5ib2R5LFxuICAgICAgICB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgKHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0KSxcbiAgICAgICAgfn5hcmd1bWVudHNbMF0udG9wICsgKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsIGFuZCBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxUb1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCA9IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBpZiBvbmUgbnVtYmVyIGlzIHBhc3NlZCwgdGhyb3cgZXJyb3IgdG8gbWF0Y2ggRmlyZWZveCBpbXBsZW1lbnRhdGlvblxuICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicgJiYgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1ZhbHVlIGNvdWxkblxcJ3QgYmUgY29udmVydGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvcmlnaW5hbC5lbGVtZW50U2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICAvLyB1c2UgbGVmdCBwcm9wLCBmaXJzdCBudW1iZXIgYXJndW1lbnQgb3IgZmFsbGJhY2sgdG8gc2Nyb2xsTGVmdFxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdXG4gICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIC8vIHVzZSB0b3AgcHJvcCwgc2Vjb25kIGFyZ3VtZW50IG9yIGZhbGxiYWNrIHRvIHNjcm9sbFRvcFxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsVG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVmdCA9IGFyZ3VtZW50c1swXS5sZWZ0O1xuICAgICAgdmFyIHRvcCA9IGFyZ3VtZW50c1swXS50b3A7XG5cbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLFxuICAgICAgICB0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzLnNjcm9sbExlZnQgOiB+fmxlZnQsXG4gICAgICAgIHR5cGVvZiB0b3AgPT09ICd1bmRlZmluZWQnID8gdGhpcy5zY3JvbGxUb3AgOiB+fnRvcFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsQnlcbiAgICBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxCeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgYWN0aW9uIHdoZW4gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWRcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcbiAgICAgICAgb3JpZ2luYWwuZWxlbWVudFNjcm9sbC5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgdGhpcy5zY3JvbGxMZWZ0XG4gICAgICAgICAgICA6IH5+YXJndW1lbnRzWzBdICsgdGhpcy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3AgKyB0aGlzLnNjcm9sbFRvcFxuICAgICAgICAgICAgOiB+fmFyZ3VtZW50c1sxXSArIHRoaXMuc2Nyb2xsVG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbCh7XG4gICAgICAgIGxlZnQ6IH5+YXJndW1lbnRzWzBdLmxlZnQgKyB0aGlzLnNjcm9sbExlZnQsXG4gICAgICAgIHRvcDogfn5hcmd1bWVudHNbMF0udG9wICsgdGhpcy5zY3JvbGxUb3AsXG4gICAgICAgIGJlaGF2aW9yOiBhcmd1bWVudHNbMF0uYmVoYXZpb3JcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxJbnRvVmlld1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbEludG9WaWV3LmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1swXVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgdmFyIHNjcm9sbGFibGVQYXJlbnQgPSBmaW5kU2Nyb2xsYWJsZVBhcmVudCh0aGlzKTtcbiAgICAgIHZhciBwYXJlbnRSZWN0cyA9IHNjcm9sbGFibGVQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgY2xpZW50UmVjdHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICBpZiAoc2Nyb2xsYWJsZVBhcmVudCAhPT0gZC5ib2R5KSB7XG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluc2lkZSBwYXJlbnRcbiAgICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBzY3JvbGxhYmxlUGFyZW50LFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsTGVmdCArIGNsaWVudFJlY3RzLmxlZnQgLSBwYXJlbnRSZWN0cy5sZWZ0LFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsVG9wICsgY2xpZW50UmVjdHMudG9wIC0gcGFyZW50UmVjdHMudG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gcmV2ZWFsIHBhcmVudCBpbiB2aWV3cG9ydCB1bmxlc3MgaXMgZml4ZWRcbiAgICAgICAgaWYgKHcuZ2V0Q29tcHV0ZWRTdHlsZShzY3JvbGxhYmxlUGFyZW50KS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICAgIHcuc2Nyb2xsQnkoe1xuICAgICAgICAgICAgbGVmdDogcGFyZW50UmVjdHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogcGFyZW50UmVjdHMudG9wLFxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluIHZpZXdwb3J0XG4gICAgICAgIHcuc2Nyb2xsQnkoe1xuICAgICAgICAgIGxlZnQ6IGNsaWVudFJlY3RzLmxlZnQsXG4gICAgICAgICAgdG9wOiBjbGllbnRSZWN0cy50b3AsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gY29tbW9uanNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHsgcG9seWZpbGw6IHBvbHlmaWxsIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gZ2xvYmFsXG4gICAgcG9seWZpbGwoKTtcbiAgfVxuXG59KCkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi4vLi4vLi4vY2xpZW50L2pzL3ZpZXdzL19fcHJvdG9fXycpLCB7XG5cbiAgICBUb2FzdE1lc3NhZ2U6IHJlcXVpcmUoJy4vVG9hc3RNZXNzYWdlJyksXG5cbiAgICBuYW1lOiAnVG9hc3QnLFxuXG4gICAgcG9zdFJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHJlcXVpcmVzTG9naW46IGZhbHNlLFxuXG4gICAgY3JlYXRlTWVzc2FnZSggdHlwZSwgbWVzc2FnZSApIHtcbiAgICAgICAgaWYoICF0aGlzLm1lc3NhZ2VzWyBtZXNzYWdlIF0gKSB0aGlzLm1lc3NhZ2VzWyBtZXNzYWdlIF0gPSBPYmplY3QuY3JlYXRlKCB0aGlzLlRvYXN0TWVzc2FnZSwge1xuICAgICAgICAgICAgaW5zZXJ0aW9uOiB7IHZhbHVlOiB7IGVsOiB0aGlzLmVscy5jb250YWluZXIgfSB9XG4gICAgICAgIH0gKS5jb25zdHJ1Y3RvcigpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZXNbIG1lc3NhZ2UgXS5zaG93TWVzc2FnZSggdHlwZSwgbWVzc2FnZSApXG5cbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL1RvYXN0JylcblxufSApLCB7IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi4vLi4vLi4vY2xpZW50L2pzL3ZpZXdzL19fcHJvdG9fXycpLCB7XG5cbiAgICBuYW1lOiAnVG9hc3RNZXNzYWdlJyxcblxuICAgIEljb25zOiB7XG4gICAgICAgIGVycm9yOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9saWIvZXJyb3InKSgpLFxuICAgICAgICBzdWNjZXNzOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9saWIvY2hlY2ttYXJrJykoKVxuICAgIH0sXG5cbiAgICBwb3N0UmVuZGVyKCkge1xuXG4gICAgICAgIHRoaXMub24oICdzaG93bicsICgpID0+IHRoaXMuc3RhdHVzID0gJ3Nob3duJyApXG4gICAgICAgIHRoaXMub24oICdoaWRkZW4nLCAoKSA9PiB0aGlzLnN0YXR1cyA9ICdoaWRkZW4nIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICByZXF1aXJlc0xvZ2luOiBmYWxzZSxcblxuICAgIHNob3dNZXNzYWdlKCB0eXBlLCBtZXNzYWdlICkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgID0+IHtcbiAgICAgICAgICAgIGlmKCAvc2hvdy8udGVzdCggdGhpcy5zdGF0dXMgKSApIHRoaXMudGVhcmRvd24oKVxuXG4gICAgICAgICAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHZlXG5cbiAgICAgICAgICAgIGlmKCB0eXBlICE9PSAnZXJyb3InICkgdGhpcy5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1Y2Nlc3MnKVxuXG4gICAgICAgICAgICB0aGlzLmVscy5tZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5lbHMudGl0bGUudGV4dENvbnRlbnQgPSB0eXBlID09PSAnZXJyb3InID8gJ0Vycm9yJyA6ICdTdWNjZXNzJ1xuICAgICAgICAgICAgdGhpcy5zbHVycFRlbXBsYXRlKCB7IGluc2VydGlvbjogeyBlbDogdGhpcy5lbHMuaWNvbiB9LCB0ZW1wbGF0ZTogdHlwZSA9PT0gJ2Vycm9yJyA/IHRoaXMuSWNvbnMuZXJyb3IgOiB0aGlzLkljb25zLnN1Y2Nlc3MgfSApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ3Nob3dpbmcnXG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyggdHJ1ZSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gdGhpcy5oaWRlKCB0cnVlICkgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHRoaXMudGVhcmRvd24oKSApXG4gICAgICAgICAgICAuY2F0Y2goIHJlamVjdCApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICB0ZWFyZG93bigpIHtcbiAgICAgICAgaWYoIHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Y2Nlc3MnKSApIHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzdWNjZXNzJylcbiAgICAgICAgdGhpcy5lbHMubWVzc2FnZS50ZXh0Q29udGVudCA9ICcnXG4gICAgICAgIHRoaXMuZWxzLm1lc3NhZ2UudGl0bGUgPSAnJ1xuICAgICAgICBpZiggdGhpcy5lbHMuaWNvbi5maXJzdENoaWxkICkgdGhpcy5lbHMuaWNvbi5yZW1vdmVDaGlsZCggdGhpcy5lbHMuaWNvbi5maXJzdENoaWxkIClcbiAgICAgICAgdGhpcy5yZXNvbHV0aW9uKClcbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL1RvYXN0TWVzc2FnZScpXG5cbn0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiBgPGRpdj48L2Rpdj5gXG4iLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IFxuYDxkaXYgY2xhc3M9XCJoaWRkZW5cIj5cbiAgICA8ZGl2IGRhdGEtanM9XCJpY29uXCI+PC9kaXY+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBkYXRhLWpzPVwidGl0bGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBkYXRhLWpzPVwibWVzc2FnZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+YCIsIm1vZHVsZS5leHBvcnRzID0gKHA9e30pID0+IGA8c3ZnIHZlcnNpb249XCIxLjFcIiBkYXRhLWpzPVwiJHtwLm5hbWUgfHwgJ2NoZWNrbWFyayd9XCIgY2xhc3M9XCJjaGVja21hcmtcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuXHQgd2lkdGg9XCI5Ny42MTlweFwiIGhlaWdodD1cIjk3LjYxOHB4XCIgdmlld0JveD1cIjAgMCA5Ny42MTkgOTcuNjE4XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDk3LjYxOSA5Ny42MTg7XCJcblx0IHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG48Zz5cblx0PHBhdGggZD1cIk05Ni45MzksMTcuMzU4TDgzLjk2OCw1Ljk1OWMtMC4zOTgtMC4zNTItMC45MjctMC41MzEtMS40NDktMC40OTRDODEuOTksNS41LDgxLjQ5Niw1Ljc0Myw4MS4xNDYsNi4xNDJMMzQuMSw1OS42ODhcblx0XHRMMTcuMzcyLDM3LjU0N2MtMC4zMTktMC40MjItMC43OTQtMC43MDEtMS4zMTktMC43NzNjLTAuNTI0LTAuMDc4LTEuMDU5LDAuMDY0LTEuNDgxLDAuMzg1TDAuNzk0LDQ3LjU2N1xuXHRcdGMtMC44ODEsMC42NjYtMS4wNTYsMS45Mi0wLjM5LDIuODAxbDMwLjk3NCw0MC45OTZjMC4zNjIsMC40NzksMC45MjIsMC43NzEsMS41MjIsMC43OTNjMC4wMjQsMCwwLjA0OSwwLDAuMDczLDBcblx0XHRjMC41NzQsMCwxLjEyMi0wLjI0NiwxLjUwMy0wLjY4bDYyLjY0NC03MS4yOTdDOTcuODUsMTkuMzUxLDk3Ljc2OSwxOC4wODYsOTYuOTM5LDE3LjM1OHpcIi8+XG48L2c+PC9zdmc+YFxuIiwibW9kdWxlLmV4cG9ydHMgPSAocD17fSkgPT4gYDxzdmcgdmVyc2lvbj1cIjEuMVwiIGRhdGEtanM9XCIke3AubmFtZSB8fCAnZXJyb3InfVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgMTguOTc4IDE4Ljk3OFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxOC45NzggMTguOTc4O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XHJcbjxnPlxyXG4gICAgPHBhdGggZD1cIk0xNi4wODgsMS42NzVjLTAuMTMzLTAuMTA0LTAuMzA2LTAuMTQ0LTAuNDctMC4xMDVjLTAuMDEzLDAuMDAyLTEuMjYxLDAuMjktMi41OTQsMC4yOVxyXG4gICAgICAgIGMtMS43ODgsMC0yLjc4OS0wLjQ3Ni0yLjk3NS0xLjQxNUM5Ljk5OSwwLjE5MSw5Ljc3OSwwLjAwNyw5LjUyMSwwYy0wLjI1Ny0wLjAwNy0wLjQ4NywwLjE2Ny0wLjU1LDAuNDE4XHJcbiAgICAgICAgQzguNzI3LDEuMzg2LDcuNzEsMS44NzcsNS45NSwxLjg3N2MtMS4zMzIsMC0yLjU3MS0wLjMwMi0yLjU4My0wLjMwNWMtMC4xNjYtMC4wNC0wLjM0LTAuMDA0LTAuNDc0LDAuMTAyXHJcbiAgICAgICAgQzIuNzYsMS43NzcsMi42ODEsMS45MzgsMi42ODEsMi4xMDh2NC44NjljMCwwLjA0LDAuMDA0LDAuMDc4LDAuMDEzLDAuMTE1YzAuMDU3LDEuNjQ3LDAuNjUsOC43MTQsNi41MjgsMTEuODIyXHJcbiAgICAgICAgYzAuMDgsMC4wNDMsMC4xNjksMC4wNjQsMC4yNTgsMC4wNjRjMC4wOTIsMCwwLjE4My0wLjAyMSwwLjI2Ni0wLjA2NmM1Ljc0LTMuMTM3LDYuNDQ1LTEwLjExNSw2LjUzMi0xMS43OTFcclxuICAgICAgICBjMC4wMTItMC4wNDYsMC4wMTktMC4wOTQsMC4wMTktMC4xNDRWMi4xMDhDMTYuMjk3LDEuOTM5LDE2LjIxOSwxLjc4LDE2LjA4OCwxLjY3NXogTTE1LjE5LDYuODU3XHJcbiAgICAgICAgYy0wLjAwNywwLjAzMS0wLjAxMiwwLjA2NC0wLjAxMywwLjA5N2MtMC4wNTMsMS4yOTgtMC41NzQsNy44MzItNS43MDEsMTAuODM4Yy01LjIxNS0yLjk2NS01LjY0Ni05LjUyNi01LjY4LTEwLjgzXHJcbiAgICAgICAgYzAtMC4wMjktMC4wMDQtMC4wNTgtMC4wMDktMC4wODVWMi43ODRDNC4zMjIsMi44NzcsNS4xMTIsMi45ODIsNS45NSwyLjk4MmMxLjkxMSwwLDIuOTY1LTAuNTQsMy41MzctMS4yMDhcclxuICAgICAgICBjMC41NTMsMC42NjEsMS41OTksMS4xOTEsMy41MzYsMS4xOTFjMC44MzksMCwxLjYzMS0wLjEwMSwyLjE2Ni0wLjE4OEwxNS4xOSw2Ljg1N0wxNS4xOSw2Ljg1N3pcIi8+XHJcbiAgICA8cG9seWdvbiBwb2ludHM9XCIxMC4yNDEsMTEuMjM3IDEwLjUyOSw1LjMxMSA4LjQ0OSw1LjMxMSA4Ljc1LDExLjIzNyBcdFx0XCIvPlxyXG4gICAgPHBhdGggZD1cIk05LjQ5NiwxMS44OTFjLTAuNjk0LDAtMS4xNzgsMC40OTgtMS4xNzgsMS4xODljMCwwLjY4MiwwLjQ3MSwxLjE5MSwxLjE3OCwxLjE5MVxyXG4gICAgICAgIGMwLjcwNiwwLDEuMTY0LTAuNTEsMS4xNjQtMS4xOTFDMTAuNjQ3LDEyLjM4OSwxMC4xODksMTEuODkxLDkuNDk2LDExLjg5MXpcIi8+XHJcbjwvZz48L3N2Zz5gXHJcbiJdfQ==
