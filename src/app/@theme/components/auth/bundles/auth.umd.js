(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router'), require('@angular/forms'), require('@angular/common/http'), require('@nebular/theme'), require('rxjs/operators/switchMap'), require('rxjs/operators/map'), require('rxjs/operators/tap'), require('rxjs/observable/of'), require('rxjs/BehaviorSubject'), require('rxjs/operators/share'), require('rxjs/operators/catchError')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/router', '@angular/forms', '@angular/common/http', '@nebular/theme', 'rxjs/operators/switchMap', 'rxjs/operators/map', 'rxjs/operators/tap', 'rxjs/observable/of', 'rxjs/BehaviorSubject', 'rxjs/operators/share', 'rxjs/operators/catchError'], factory) :
	(factory((global.nb = global.nb || {}, global.nb.auth = global.nb.auth || {}),global.ng.core,global.ng.common,global.ng.router,global.ng.forms,global.ng.common.http,global.nb.theme,global.Rx.operators,global.Rx.operators,global.Rx.operators,global.Rx.Observable,global.Rx,global.Rx.operators,global.Rx.operators));
}(this, (function (exports,_angular_core,_angular_common,_angular_router,_angular_forms,_angular_common_http,_nebular_theme,rxjs_operators_switchMap,rxjs_operators_map,rxjs_operators_tap,rxjs_observable_of,rxjs_BehaviorSubject,rxjs_operators_share,rxjs_operators_catchError) { 'use strict';

var defaultSettings = {
    forms: {
        login: {
            redirectDelay: 500,
            provider: 'email',
            rememberMe: true,
            showMessages: {
                success: true,
                error: true,
            },
        },
        register: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
            terms: true,
        },
        requestPassword: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
        },
        resetPassword: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
        },
        logout: {
            redirectDelay: 500,
            provider: 'email',
        },
        validation: {
            password: {
                required: true,
                minLength: 4,
                maxLength: 50,
            },
            email: {
                required: true,
            },
            fullName: {
                required: false,
                minLength: 4,
                maxLength: 50,
            },
        },
    },
};
var NB_AUTH_OPTIONS_TOKEN = new _angular_core.InjectionToken('Nebular Auth Options');
var NB_AUTH_USER_OPTIONS_TOKEN = new _angular_core.InjectionToken('Nebular User Auth Options');
var NB_AUTH_PROVIDERS_TOKEN = new _angular_core.InjectionToken('Nebular Auth Providers');
var NB_AUTH_TOKEN_WRAPPER_TOKEN = new _angular_core.InjectionToken('Nebular Auth Token');
var NB_AUTH_INTERCEPTOR_HEADER = new _angular_core.InjectionToken('Nebular Simple Interceptor Header');

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }
    if (arguments.length < 2) {
        return arguments[0];
    }
    var target = arguments[0];
    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);
    var val, src;
    args.forEach(function (obj) {
        // skip argument if it is array or isn't object
        if (typeof obj !== 'object' || Array.isArray(obj)) {
            return;
        }
        Object.keys(obj).forEach(function (key) {
            src = target[key]; // source value
            val = obj[key]; // new value
            // recursion prevention
            if (val === target) {
                return;
                /**
                         * if new value isn't object then just overwrite by new value
                         * instead of extending.
                         */
            }
            else if (typeof val !== 'object' || val === null) {
                target[key] = val;
                return;
                // just clone arrays (and recursive clone objects inside)
            }
            else if (Array.isArray(val)) {
                target[key] = deepCloneArray(val);
                return;
                // custom cloning and overwrite for specific objects
            }
            else if (isSpecificValue(val)) {
                target[key] = cloneSpecificValue(val);
                return;
                // overwrite by new value if source isn't object or array
            }
            else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                target[key] = deepExtend({}, val);
                return;
                // source value and new value is objects both, extending...
            }
            else {
                target[key] = deepExtend(src, val);
                return;
            }
        });
    });
    return target;
};
function isSpecificValue(val) {
    return (val instanceof Date
        || val instanceof RegExp) ? true : false;
}
function cloneSpecificValue(val) {
    if (val instanceof Date) {
        return new Date(val.getTime());
    }
    else if (val instanceof RegExp) {
        return new RegExp(val);
    }
    else {
        throw new Error('cloneSpecificValue: Unexpected situation');
    }
}
/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
    var clone = [];
    arr.forEach(function (item, index) {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                clone[index] = deepCloneArray(item);
            }
            else if (isSpecificValue(item)) {
                clone[index] = cloneSpecificValue(item);
            }
            else {
                clone[index] = deepExtend({}, item);
            }
        }
        else {
            clone[index] = item;
        }
    });
    return clone;
}
// getDeepFromObject({result: {data: 1}}, 'result.data', 2); // returns 1
function getDeepFromObject(object, name, defaultValue) {
    if (object === void 0) { object = {}; }
    var keys = name.split('.');
    // clone the object
    var level = deepExtend({}, object || {});
    keys.forEach(function (k) {
        if (level && typeof level[k] !== 'undefined') {
            level = level[k];
        }
        else {
            level = undefined;
        }
    });
    return typeof level === 'undefined' ? defaultValue : level;
}
function urlBase64Decode(str) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0: {
            break;
        }
        case 2: {
            output += '==';
            break;
        }
        case 3: {
            output += '=';
            break;
        }
        default: {
            throw new Error('Illegal base64url string!');
        }
    }
    return b64DecodeUnicode(output);
}
function b64decode(str) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var output = '';
    str = String(str).replace(/=+$/, '');
    if (str.length % 4 === 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
    // initialize result and counters
    var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
    // get next character
    buffer = str.charAt(idx++); 
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
    }
    return output;
}
// https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(b64decode(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wrapper for simple (text) token
 */
var NbAuthSimpleToken = /** @class */ (function () {
    function NbAuthSimpleToken() {
        this.token = '';
    }
    NbAuthSimpleToken.prototype.setValue = function (token) {
        this.token = token;
    };
    /**
     * Returns the token value
     * @returns string
     */
    /**
       * Returns the token value
       * @returns string
       */
    NbAuthSimpleToken.prototype.getValue = /**
       * Returns the token value
       * @returns string
       */
    function () {
        return this.token;
    };
    NbAuthSimpleToken.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbAuthSimpleToken.ctorParameters = function () { return []; };
    return NbAuthSimpleToken;
}());
/**
 * Wrapper for JWT token with additional methods.
 */
var NbAuthJWTToken = /** @class */ (function (_super) {
    __extends(NbAuthJWTToken, _super);
    function NbAuthJWTToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * TODO: check for this.token to be not null
     * Returns payload object
     * @returns any
     */
    /**
       * TODO: check for this.token to be not null
       * Returns payload object
       * @returns any
       */
    NbAuthJWTToken.prototype.getPayload = /**
       * TODO: check for this.token to be not null
       * Returns payload object
       * @returns any
       */
    function () {
        var parts = this.token.split('.');
        if (parts.length !== 3) {
            throw new Error("The token " + this.token + " is not valid JWT token and must consist of three parts.");
        }
        var decoded = urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("The token " + this.token + " is not valid JWT token and cannot be decoded.");
        }
        return JSON.parse(decoded);
    };
    /**
     * Returns expiration date
     * @returns Date
     */
    /**
       * Returns expiration date
       * @returns Date
       */
    NbAuthJWTToken.prototype.getTokenExpDate = /**
       * Returns expiration date
       * @returns Date
       */
    function () {
        var decoded = this.getPayload();
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    NbAuthJWTToken.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbAuthJWTToken.ctorParameters = function () { return []; };
    return NbAuthJWTToken;
}(NbAuthSimpleToken));
/**
 * Nebular token service. Provides access to the stored token.
 * By default returns NbAuthSimpleToken instance,
 * but you can inject NbAuthJWTToken if you need additional methods for JWT token.
 *
 * @example Injecting NbAuthJWTToken, so that NbTokenService will now return NbAuthJWTToken instead
 * of the default NbAuthSimpleToken
 *
 * ```
 * // import token and service into your AppModule
 * import { NB_AUTH_TOKEN_WRAPPER_TOKEN,  NbAuthJWTToken} from '@nebular/auth';
 *
 * // add to a list of providers
 * providers: [
 *  // ...
 *  { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },
 * ],
 * ```
 */
var NbTokenService = /** @class */ (function () {
    function NbTokenService(options, tokenWrapper) {
        var _this = this;
        this.options = options;
        this.tokenWrapper = tokenWrapper;
        this.defaultConfig = {
            token: {
                key: 'auth_app_token',
                getter: function () {
                    var tokenValue = localStorage.getItem(_this.getConfigValue('token.key'));
                    _this.tokenWrapper.setValue(tokenValue);
                    return rxjs_observable_of.of(_this.tokenWrapper);
                },
                setter: function (token) {
                    var raw = token instanceof NbAuthSimpleToken ? token.getValue() : token;
                    localStorage.setItem(_this.getConfigValue('token.key'), raw);
                    return rxjs_observable_of.of(null);
                },
                deleter: function () {
                    localStorage.removeItem(_this.getConfigValue('token.key'));
                    return rxjs_observable_of.of(null);
                },
            },
        };
        this.config = {};
        this.token$ = new rxjs_BehaviorSubject.BehaviorSubject(null);
        this.setConfig(options);
        this.get().subscribe(function (token) { return _this.publishToken(token); });
    }
    NbTokenService.prototype.setConfig = function (config) {
        this.config = deepExtend({}, this.defaultConfig, config);
    };
    NbTokenService.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    /**
     * Sets the token into the storage. This method is used by the NbAuthService automatically.
     * @param {string} rawToken
     * @returns {Observable<any>}
     */
    /**
       * Sets the token into the storage. This method is used by the NbAuthService automatically.
       * @param {string} rawToken
       * @returns {Observable<any>}
       */
    NbTokenService.prototype.set = /**
       * Sets the token into the storage. This method is used by the NbAuthService automatically.
       * @param {string} rawToken
       * @returns {Observable<any>}
       */
    function (rawToken) {
        var _this = this;
        return this.getConfigValue('token.setter')(rawToken)
            .pipe(rxjs_operators_switchMap.switchMap(function () { return _this.get(); }), rxjs_operators_tap.tap(function (token) {
            _this.publishToken(token);
        }));
    };
    /**
     * Returns observable of current token
     * @returns {Observable<NbAuthSimpleToken>}
     */
    /**
       * Returns observable of current token
       * @returns {Observable<NbAuthSimpleToken>}
       */
    NbTokenService.prototype.get = /**
       * Returns observable of current token
       * @returns {Observable<NbAuthSimpleToken>}
       */
    function () {
        return this.getConfigValue('token.getter')();
    };
    /**
     * Publishes token when it changes.
     * @returns {Observable<NbAuthSimpleToken>}
     */
    /**
       * Publishes token when it changes.
       * @returns {Observable<NbAuthSimpleToken>}
       */
    NbTokenService.prototype.tokenChange = /**
       * Publishes token when it changes.
       * @returns {Observable<NbAuthSimpleToken>}
       */
    function () {
        return this.token$.pipe(rxjs_operators_share.share());
    };
    /**
     * Removes the token
     * @returns {Observable<any>}
     */
    /**
       * Removes the token
       * @returns {Observable<any>}
       */
    NbTokenService.prototype.clear = /**
       * Removes the token
       * @returns {Observable<any>}
       */
    function () {
        this.publishToken(null);
        return this.getConfigValue('token.deleter')();
    };
    NbTokenService.prototype.publishToken = function (token) {
        this.token$.next(token);
    };
    NbTokenService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbTokenService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_AUTH_OPTIONS_TOKEN,] },] },
        { type: NbAuthSimpleToken, decorators: [{ type: _angular_core.Inject, args: [NB_AUTH_TOKEN_WRAPPER_TOKEN,] },] },
    ]; };
    return NbTokenService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbAuthResult = /** @class */ (function () {
    // TODO pass arguments in options object
    function NbAuthResult(success, response, redirect, errors, messages, token) {
        this.success = success;
        this.response = response;
        this.redirect = redirect;
        this.errors = [];
        this.messages = [];
        this.errors = this.errors.concat([errors]);
        if (errors instanceof Array) {
            this.errors = errors;
        }
        this.messages = this.messages.concat([messages]);
        if (messages instanceof Array) {
            this.messages = messages;
        }
        this.token = token;
    }
    NbAuthResult.prototype.getResponse = function () {
        return this.response;
    };
    NbAuthResult.prototype.getTokenValue = function () {
        return this.token;
    };
    NbAuthResult.prototype.replaceToken = function (token) {
        this.token = token;
    };
    NbAuthResult.prototype.getRedirect = function () {
        return this.redirect;
    };
    NbAuthResult.prototype.getErrors = function () {
        return this.errors.filter(function (val) { return !!val; });
    };
    NbAuthResult.prototype.getMessages = function () {
        return this.messages.filter(function (val) { return !!val; });
    };
    NbAuthResult.prototype.isSuccess = function () {
        return this.success;
    };
    NbAuthResult.prototype.isFailure = function () {
        return !this.success;
    };
    return NbAuthResult;
}());
/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Providers.
 */
var NbAuthService = /** @class */ (function () {
    function NbAuthService(tokenService, injector, providers) {
        if (providers === void 0) { providers = {}; }
        this.tokenService = tokenService;
        this.injector = injector;
        this.providers = providers;
    }
    /**
     * Retrieves current authenticated token stored
     * @returns {Observable<any>}
     */
    /**
       * Retrieves current authenticated token stored
       * @returns {Observable<any>}
       */
    NbAuthService.prototype.getToken = /**
       * Retrieves current authenticated token stored
       * @returns {Observable<any>}
       */
    function () {
        return this.tokenService.get();
    };
    /**
     * Returns true if auth token is presented in the token storage
     * // TODO: check exp date for JWT token
     * @returns {Observable<any>}
     */
    /**
       * Returns true if auth token is presented in the token storage
       * // TODO: check exp date for JWT token
       * @returns {Observable<any>}
       */
    NbAuthService.prototype.isAuthenticated = /**
       * Returns true if auth token is presented in the token storage
       * // TODO: check exp date for JWT token
       * @returns {Observable<any>}
       */
    function () {
        return this.getToken().pipe(rxjs_operators_map.map(function (token) { return !!(token && token.getValue()); }));
    };
    /**
     * Returns tokens stream
     * @returns {Observable<any>}
     */
    /**
       * Returns tokens stream
       * @returns {Observable<any>}
       */
    NbAuthService.prototype.onTokenChange = /**
       * Returns tokens stream
       * @returns {Observable<any>}
       */
    function () {
        return this.tokenService.tokenChange();
    };
    /**
     * Returns authentication status stream
     *  // TODO: check exp date for JWT token
     * @returns {Observable<any>}
     */
    /**
       * Returns authentication status stream
       *  // TODO: check exp date for JWT token
       * @returns {Observable<any>}
       */
    NbAuthService.prototype.onAuthenticationChange = /**
       * Returns authentication status stream
       *  // TODO: check exp date for JWT token
       * @returns {Observable<any>}
       */
    function () {
        return this.onTokenChange().pipe(rxjs_operators_map.map(function (token) { return !!(token && token.getValue()); }));
    };
    /**
     * Authenticates with the selected provider
     * Stores received token in the token storage
     *
     * Example:
     * authenticate('email', {email: 'email@example.com', password: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Authenticates with the selected provider
       * Stores received token in the token storage
       *
       * Example:
       * authenticate('email', {email: 'email@example.com', password: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.authenticate = /**
       * Authenticates with the selected provider
       * Stores received token in the token storage
       *
       * Example:
       * authenticate('email', {email: 'email@example.com', password: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        var _this = this;
        return this.getProvider(provider).authenticate(data)
            .pipe(rxjs_operators_switchMap.switchMap(function (result) {
            if (result.isSuccess() && result.getTokenValue()) {
                return _this.tokenService.set(result.getTokenValue())
                    .pipe(rxjs_operators_switchMap.switchMap(function () { return _this.tokenService.get(); }), rxjs_operators_map.map(function (token) {
                    result.replaceToken(token);
                    return result;
                }));
            }
            return rxjs_observable_of.of(result);
        }));
    };
    /**
     * Registers with the selected provider
     * Stores received token in the token storage
     *
     * Example:
     * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Registers with the selected provider
       * Stores received token in the token storage
       *
       * Example:
       * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.register = /**
       * Registers with the selected provider
       * Stores received token in the token storage
       *
       * Example:
       * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        var _this = this;
        return this.getProvider(provider).register(data)
            .pipe(rxjs_operators_switchMap.switchMap(function (result) {
            if (result.isSuccess() && result.getTokenValue()) {
                return _this.tokenService.set(result.getTokenValue())
                    .pipe(rxjs_operators_switchMap.switchMap(function (_) { return _this.tokenService.get(); }), rxjs_operators_map.map(function (token) {
                    result.replaceToken(token);
                    return result;
                }));
            }
            return rxjs_observable_of.of(result);
        }));
    };
    /**
     * Sign outs with the selected provider
     * Removes token from the token storage
     *
     * Example:
     * logout('email')
     *
     * @param provider
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Sign outs with the selected provider
       * Removes token from the token storage
       *
       * Example:
       * logout('email')
       *
       * @param provider
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.logout = /**
       * Sign outs with the selected provider
       * Removes token from the token storage
       *
       * Example:
       * logout('email')
       *
       * @param provider
       * @returns {Observable<NbAuthResult>}
       */
    function (provider) {
        var _this = this;
        return this.getProvider(provider).logout()
            .pipe(rxjs_operators_tap.tap(function (result) {
            if (result.isSuccess()) {
                _this.tokenService.clear().subscribe(function () {
                });
            }
        }));
    };
    /**
     * Sends forgot password request to the selected provider
     *
     * Example:
     * requestPassword('email', {email: 'email@example.com'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Sends forgot password request to the selected provider
       *
       * Example:
       * requestPassword('email', {email: 'email@example.com'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.requestPassword = /**
       * Sends forgot password request to the selected provider
       *
       * Example:
       * requestPassword('email', {email: 'email@example.com'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        return this.getProvider(provider).requestPassword(data);
    };
    /**
     * Tries to reset password with the selected provider
     *
     * Example:
     * resetPassword('email', {newPassword: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    /**
       * Tries to reset password with the selected provider
       *
       * Example:
       * resetPassword('email', {newPassword: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    NbAuthService.prototype.resetPassword = /**
       * Tries to reset password with the selected provider
       *
       * Example:
       * resetPassword('email', {newPassword: 'test'})
       *
       * @param provider
       * @param data
       * @returns {Observable<NbAuthResult>}
       */
    function (provider, data) {
        return this.getProvider(provider).resetPassword(data);
    };
    NbAuthService.prototype.getProvider = function (provider) {
        if (!this.providers[provider]) {
            throw new TypeError("Nb auth provider '" + provider + "' is not registered");
        }
        return this.injector.get(this.providers[provider].service);
    };
    NbAuthService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbAuthService.ctorParameters = function () { return [
        { type: NbTokenService, },
        { type: _angular_core.Injector, },
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [NB_AUTH_PROVIDERS_TOKEN,] },] },
    ]; };
    return NbAuthService;
}());

var NbAbstractAuthProvider = /** @class */ (function () {
    function NbAbstractAuthProvider() {
        this.defaultConfig = {};
        this.config = {};
    }
    NbAbstractAuthProvider.prototype.setConfig = function (config) {
        this.config = deepExtend({}, this.defaultConfig, config);
    };
    NbAbstractAuthProvider.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    NbAbstractAuthProvider.prototype.createFailResponse = function (data) {
        return new _angular_common_http.HttpResponse({ body: {}, status: 401 });
    };
    NbAbstractAuthProvider.prototype.createSuccessResponse = function (data) {
        return new _angular_common_http.HttpResponse({ body: {}, status: 200 });
    };
    NbAbstractAuthProvider.prototype.getJsonSafe = function (res) {
        return res.body;
    };
    return NbAbstractAuthProvider;
}());

var __extends$1 = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NbDummyAuthProvider = /** @class */ (function (_super) {
    __extends$1(NbDummyAuthProvider, _super);
    function NbDummyAuthProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultConfig = {
            delay: 1000,
        };
        return _this;
    }
    NbDummyAuthProvider.prototype.authenticate = function (data) {
        return rxjs_observable_of.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.register = function (data) {
        return rxjs_observable_of.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.requestPassword = function (data) {
        return rxjs_observable_of.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.resetPassword = function (data) {
        return rxjs_observable_of.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.logout = function (data) {
        return rxjs_observable_of.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.createDummyResult = function (data) {
        if (this.getConfigValue('alwaysFail')) {
            return new NbAuthResult(false, this.createFailResponse(data), null, ['Something went wrong.']);
        }
        return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.']);
    };
    NbDummyAuthProvider.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbDummyAuthProvider.ctorParameters = function () { return []; };
    return NbDummyAuthProvider;
}(NbAbstractAuthProvider));

var __extends$2 = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * The most common authentication provider for email/password strategy.
 *
 *
 * @example
 *
 * Default settings object:
 *
 * ```
 * {
 *  baseEndpoint: '',
 *  login: {
 *    alwaysFail: false,
 *    rememberMe: true,
 *    endpoint: '/api/auth/login',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Login/Email combination is not correct, please try again.'],
 *    defaultMessages: ['You have been successfully logged in.'],
 *  },
 *  register: {
 *    alwaysFail: false,
 *    rememberMe: true,
 *    endpoint: '/api/auth/register',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully registered.'],
 *  },
 *  logout: {
 *    alwaysFail: false,
 *    endpoint: '/api/auth/logout',
 *    method: 'delete',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully logged out.'],
 *  },
 *  requestPass: {
 *    endpoint: '/api/auth/request-pass',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Reset password instructions have been sent to your email.'],
 *  },
 *  resetPass: {
 *    endpoint: '/api/auth/reset-pass',
 *    method: 'put',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    resetPasswordTokenKey: 'reset_password_token',
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Your password has been successfully changed.'],
 *  },
 *  token: {
 *    key: 'data.token',
 *    getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
 *      this.getConfigValue('token.key')),
 *  },
 *  errors: {
 *    key: 'data.errors',
 *    getter: (module: string, res: HttpErrorResponse) => getDeepFromObject(res.error,
 *      this.getConfigValue('errors.key'),
 *      this.getConfigValue(`${module}.defaultErrors`)),
 *  },
 *  messages: {
 *    key: 'data.messages',
 *    getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
 *      this.getConfigValue('messages.key'),
 *      this.getConfigValue(`${module}.defaultMessages`)),
 *  },
 *}
 *
 * // Note, there is no need to copy over the whole object to change the settings you need.
 * // Also, this.getConfigValue call won't work outside ofthe default config declaration
 * // (which is inside of the `NbEmailPassAuthProvider` class), so you have to replace it with a custom helper function
 * // if you need it.
 * ```
 */
var NbEmailPassAuthProvider = /** @class */ (function (_super) {
    __extends$2(NbEmailPassAuthProvider, _super);
    function NbEmailPassAuthProvider(http, route) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.route = route;
        _this.defaultConfig = {
            baseEndpoint: '',
            login: {
                alwaysFail: false,
                rememberMe: true,
                endpoint: '/api/auth/login',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Login/Email combination is not correct, please try again.'],
                defaultMessages: ['You have been successfully logged in.'],
            },
            register: {
                alwaysFail: false,
                rememberMe: true,
                endpoint: '/api/auth/register',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['You have been successfully registered.'],
            },
            logout: {
                alwaysFail: false,
                endpoint: '/api/auth/logout',
                method: 'delete',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['You have been successfully logged out.'],
            },
            requestPass: {
                endpoint: '/api/auth/request-pass',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['Reset password instructions have been sent to your email.'],
            },
            resetPass: {
                endpoint: '/api/auth/reset-pass',
                method: 'put',
                redirect: {
                    success: '/',
                    failure: null,
                },
                resetPasswordTokenKey: 'reset_password_token',
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['Your password has been successfully changed.'],
            },
            token: {
                key: 'data.token',
                getter: function (module, res) {
                    return getDeepFromObject(res.body, _this.getConfigValue('token.key'));
                },
            },
            errors: {
                key: 'data.errors',
                getter: function (module, res) {
                    return getDeepFromObject(res.error, _this.getConfigValue('errors.key'), _this.getConfigValue(module + ".defaultErrors"));
                },
            },
            messages: {
                key: 'data.messages',
                getter: function (module, res) {
                    return getDeepFromObject(res.body, _this.getConfigValue('messages.key'), _this.getConfigValue(module + ".defaultMessages"));
                },
            },
        };
        return _this;
    }
    NbEmailPassAuthProvider.prototype.authenticate = function (data) {
        var _this = this;
        var method = this.getConfigValue('login.method');
        var url = this.getActionEndpoint('login');
        return this.http.request(method, url, { body: data, observe: 'response' })
            .pipe(rxjs_operators_map.map(function (res) {
            if (_this.getConfigValue('login.alwaysFail')) {
                throw _this.createFailResponse(data);
            }
            return res;
        }), rxjs_operators_map.map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('login.redirect.success'), [], _this.getConfigValue('messages.getter')('login', res), _this.getConfigValue('token.getter')('login', res));
        }), rxjs_operators_catchError.catchError(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('login', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_observable_of.of(new NbAuthResult(false, res, _this.getConfigValue('login.redirect.failure'), errors));
        }));
    };
    NbEmailPassAuthProvider.prototype.register = function (data) {
        var _this = this;
        var method = this.getConfigValue('register.method');
        var url = this.getActionEndpoint('register');
        return this.http.request(method, url, { body: data, observe: 'response' })
            .pipe(rxjs_operators_map.map(function (res) {
            if (_this.getConfigValue('register.alwaysFail')) {
                throw _this.createFailResponse(data);
            }
            return res;
        }), rxjs_operators_map.map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('register.redirect.success'), [], _this.getConfigValue('messages.getter')('register', res), _this.getConfigValue('token.getter')('register', res));
        }), rxjs_operators_catchError.catchError(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('register', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_observable_of.of(new NbAuthResult(false, res, _this.getConfigValue('register.redirect.failure'), errors));
        }));
    };
    NbEmailPassAuthProvider.prototype.requestPassword = function (data) {
        var _this = this;
        var method = this.getConfigValue('requestPass.method');
        var url = this.getActionEndpoint('requestPass');
        return this.http.request(method, url, { body: data, observe: 'response' })
            .pipe(rxjs_operators_map.map(function (res) {
            if (_this.getConfigValue('requestPass.alwaysFail')) {
                throw _this.createFailResponse();
            }
            return res;
        }), rxjs_operators_map.map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('requestPass.redirect.success'), [], _this.getConfigValue('messages.getter')('requestPass', res));
        }), rxjs_operators_catchError.catchError(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('requestPass', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_observable_of.of(new NbAuthResult(false, res, _this.getConfigValue('requestPass.redirect.failure'), errors));
        }));
    };
    NbEmailPassAuthProvider.prototype.resetPassword = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        var tokenKey = this.getConfigValue('resetPass.resetPasswordTokenKey');
        data[tokenKey] = this.route.snapshot.queryParams[tokenKey];
        var method = this.getConfigValue('resetPass.method');
        var url = this.getActionEndpoint('resetPass');
        return this.http.request(method, url, { body: data, observe: 'response' })
            .pipe(rxjs_operators_map.map(function (res) {
            if (_this.getConfigValue('resetPass.alwaysFail')) {
                throw _this.createFailResponse();
            }
            return res;
        }), rxjs_operators_map.map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('resetPass.redirect.success'), [], _this.getConfigValue('messages.getter')('resetPass', res));
        }), rxjs_operators_catchError.catchError(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('resetPass', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_observable_of.of(new NbAuthResult(false, res, _this.getConfigValue('resetPass.redirect.failure'), errors));
        }));
    };
    NbEmailPassAuthProvider.prototype.logout = function () {
        var _this = this;
        var method = this.getConfigValue('logout.method');
        var url = this.getActionEndpoint('logout');
        return rxjs_observable_of.of({})
            .pipe(rxjs_operators_switchMap.switchMap(function (res) {
            if (!url) {
                return rxjs_observable_of.of(res);
            }
            return _this.http.request(method, url, { observe: 'response' });
        }), rxjs_operators_map.map(function (res) {
            if (_this.getConfigValue('logout.alwaysFail')) {
                throw _this.createFailResponse();
            }
            return res;
        }), rxjs_operators_map.map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('logout.redirect.success'), [], _this.getConfigValue('messages.getter')('logout', res));
        }), rxjs_operators_catchError.catchError(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('logout', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_observable_of.of(new NbAuthResult(false, res, _this.getConfigValue('logout.redirect.failure'), errors));
        }));
    };
    NbEmailPassAuthProvider.prototype.getActionEndpoint = function (action) {
        var actionEndpoint = this.getConfigValue(action + ".endpoint");
        var baseEndpoint = this.getConfigValue('baseEndpoint');
        return baseEndpoint + actionEndpoint;
    };
    NbEmailPassAuthProvider.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbEmailPassAuthProvider.ctorParameters = function () { return [
        { type: _angular_common_http.HttpClient, },
        { type: _angular_router.ActivatedRoute, },
    ]; };
    return NbEmailPassAuthProvider;
}(NbAbstractAuthProvider));

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbAuthComponent = /** @class */ (function () {
    // showcase of how to use the onAuthenticationChange method
    function NbAuthComponent(auth) {
        var _this = this;
        this.auth = auth;
        this.authenticated = false;
        this.token = '';
        this.subscription = auth.onAuthenticationChange()
            .subscribe(function (authenticated) {
            _this.authenticated = authenticated;
        });
    }
    NbAuthComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    NbAuthComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-auth',
                    styles: [":host /deep/ nb-layout .layout .layout-container .content .columns nb-layout-column{padding:2.5rem}:host /deep/ nb-card{height:calc(100vh - 2 * 2.5rem)}:host /deep/ nb-card{margin:0}:host /deep/ .flex-centered{margin:auto}:host /deep/ nb-card-body{display:flex}@media (max-width: 550px){:host /deep/ /deep/ nb-layout .layout .layout-container .content .columns nb-layout-column{padding:0}:host /deep/ nb-card{border-radius:0;height:100vh}} "],
                    template: "\n    <nb-layout>\n      <nb-layout-column>\n        <nb-card>\n          <nb-card-body>\n            <div class=\"flex-centered col-xl-4 col-lg-6 col-md-8 col-sm-12\">\n              <router-outlet></router-outlet>\n            </div>\n          </nb-card-body>\n        </nb-card>\n      </nb-layout-column>\n    </nb-layout>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbAuthComponent.ctorParameters = function () { return [
        { type: NbAuthService, },
    ]; };
    return NbAuthComponent;
}());

var NbAuthBlockComponent = /** @class */ (function () {
    function NbAuthBlockComponent() {
    }
    NbAuthBlockComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-auth-block',
                    styles: ["@media (max-width: 550px){:host /deep/ .accept-group{font-size:12px;padding:0}}:host /deep/ form{width:100%}:host /deep/ .alert{text-align:center}:host /deep/ .title{margin-bottom:0.75rem;text-align:center}:host /deep/ .sub-title{margin-bottom:2rem;text-align:center}:host /deep/ .checkbox{display:flex;justify-content:space-between;margin-bottom:10px;font-weight:normal}:host /deep/ .form-group.accept-group{display:flex;justify-content:space-between;margin:2rem 0}:host /deep/ .form-group.accept-group .forgot-password{line-height:2}:host /deep/ .links{text-align:center;margin-top:1.75rem}:host /deep/ .links .socials{margin:1.5rem 0 2.5rem}:host /deep/ .links .socials a{font-size:2rem;margin:0 1rem;text-decoration:none} "],
                    template: "\n    <ng-content></ng-content>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbAuthBlockComponent.ctorParameters = function () { return []; };
    return NbAuthBlockComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbLoginComponent = /** @class */ (function () {
    function NbLoginComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.provider = '';
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.submitted = false;
        this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
        this.provider = this.getConfigValue('forms.login.provider');
    }
    NbLoginComponent.prototype.login = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.authenticate(this.provider, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbLoginComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    NbLoginComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-login',
                    template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Sign In</h2>\n      <small class=\"form-text sub-title\">Hello! Sign in with your username or email</small>\n\n      <form (ngSubmit)=\"login()\" #form=\"ngForm\" autocomplete=\"nope\">\n\n        <div *ngIf=\"showMessages.error && errors && errors.length > 0 && !submitted\"\n             class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n\n        <div *ngIf=\"showMessages.success && messages && messages.length > 0 && !submitted\"\n             class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-email\" class=\"sr-only\">Email address</label>\n          <input name=\"email\" [(ngModel)]=\"user.email\" id=\"input-email\" pattern=\".+@.+..+\"\n                 class=\"form-control\" placeholder=\"Email address\" #email=\"ngModel\"\n                 [class.form-control-danger]=\"email.invalid && email.touched\" autofocus\n                 [required]=\"getConfigValue('forms.validation.email.required')\">\n          <small class=\"form-text error\" *ngIf=\"email.invalid && email.touched && email.errors?.required\">\n            Email is required!\n          </small>\n          <small class=\"form-text error\"\n                 *ngIf=\"email.invalid && email.touched && email.errors?.pattern\">\n            Email should be the real one!\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-password\" class=\"sr-only\">Password</label>\n          <input name=\"password\" [(ngModel)]=\"user.password\" type=\"password\" id=\"input-password\"\n                 class=\"form-control\" placeholder=\"Password\" #password=\"ngModel\"\n                 [class.form-control-danger]=\"password.invalid && password.touched\"\n                 [required]=\"getConfigValue('forms.validation.password.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.password.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\">\n          <small class=\"form-text error\" *ngIf=\"password.invalid && password.touched && password.errors?.required\">\n            Password is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)\">\n            Password should contains\n            from {{ getConfigValue('forms.validation.password.minLength') }}\n            to {{ getConfigValue('forms.validation.password.maxLength') }}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group accept-group col-sm-12\">\n          <nb-checkbox name=\"rememberMe\" [(ngModel)]=\"user.rememberMe\">Remember me</nb-checkbox>\n          <a class=\"forgot-password\" routerLink=\"../request-password\">Forgot Password?</a>\n        </div>\n\n        <button [disabled]=\"submitted || !form.valid\" class=\"btn btn-block btn-hero-success\"\n                [class.btn-pulse]=\"submitted\">\n          Sign In\n        </button>\n      </form>\n\n      <div class=\"links\">\n        <small class=\"form-text\">Or connect with:</small>\n\n        <div class=\"socials\">\n          <a href=\"https://github.com/akveo\" target=\"_blank\" class=\"socicon-github\"></a>\n          <a href=\"https://www.facebook.com/akveo/\" target=\"_blank\" class=\"socicon-facebook\"></a>\n          <a href=\"https://twitter.com/akveo_inc\" target=\"_blank\" class=\"socicon-twitter\"></a>\n        </div>\n\n        <small class=\"form-text\">\n          Don't have an account? <a routerLink=\"../register\"><strong>Sign Up</strong></a>\n        </small>\n      </div>\n    </nb-auth-block>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLoginComponent.ctorParameters = function () { return [
        { type: NbAuthService, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_AUTH_OPTIONS_TOKEN,] },] },
        { type: _angular_router.Router, },
    ]; };
    return NbLoginComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbRegisterComponent = /** @class */ (function () {
    function NbRegisterComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.provider = '';
        this.submitted = false;
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
        this.showMessages = this.getConfigValue('forms.register.showMessages');
        this.provider = this.getConfigValue('forms.register.provider');
    }
    NbRegisterComponent.prototype.register = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.register(this.provider, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbRegisterComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    NbRegisterComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-register',
                    styles: [":host .title{margin-bottom:2rem} "],
                    template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Sign Up</h2>\n      <form (ngSubmit)=\"register()\" #form=\"ngForm\">\n\n        <div *ngIf=\"showMessages.error && errors && errors.length > 0 && !submitted\"\n             class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n        <div *ngIf=\"showMessages.success && messages && messages.length > 0 && !submitted\"\n             class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-name\" class=\"sr-only\">Full name</label>\n          <input name=\"fullName\" [(ngModel)]=\"user.fullName\" id=\"input-name\" #fullName=\"ngModel\"\n                 class=\"form-control\" placeholder=\"Full name\"\n                 [class.form-control-danger]=\"fullName.invalid && fullName.touched\"\n                 [required]=\"getConfigValue('forms.validation.fullName.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.fullName.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.fullName.maxLength')\"\n                 autofocus>\n          <small class=\"form-text error\" *ngIf=\"fullName.invalid && fullName.touched && fullName.errors?.required\">\n            Full name is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"fullName.invalid && fullName.touched && (fullName.errors?.minlength || fullName.errors?.maxlength)\">\n            Full name should contains\n            from {{getConfigValue('forms.validation.password.minLength')}}\n            to {{getConfigValue('forms.validation.password.maxLength')}}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-email\" class=\"sr-only\">Email address</label>\n          <input name=\"email\" [(ngModel)]=\"user.email\" id=\"input-email\" #email=\"ngModel\"\n                 class=\"form-control\" placeholder=\"Email address\" pattern=\".+@.+..+\"\n                 [class.form-control-danger]=\"email.invalid && email.touched\"\n                 [required]=\"getConfigValue('forms.validation.email.required')\">\n          <small class=\"form-text error\" *ngIf=\"email.invalid && email.touched && email.errors?.required\">\n            Email is required!\n          </small>\n          <small class=\"form-text error\"\n                 *ngIf=\"email.invalid && email.touched && email.errors?.pattern\">\n            Email should be the real one!\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-password\" class=\"sr-only\">Password</label>\n          <input name=\"password\" [(ngModel)]=\"user.password\" type=\"password\" id=\"input-password\"\n                 class=\"form-control\" placeholder=\"Password\" #password=\"ngModel\"\n                 [class.form-control-danger]=\"password.invalid && password.touched\"\n                 [required]=\"getConfigValue('forms.validation.password.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.password.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\">\n          <small class=\"form-text error\" *ngIf=\"password.invalid && password.touched && password.errors?.required\">\n            Password is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)\">\n            Password should contains\n            from {{ getConfigValue('forms.validation.password.minLength') }}\n            to {{ getConfigValue('forms.validation.password.maxLength') }}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-re-password\" class=\"sr-only\">Repeat password</label>\n          <input\n            name=\"rePass\" [(ngModel)]=\"user.confirmPassword\" type=\"password\" id=\"input-re-password\"\n            class=\"form-control\" placeholder=\"Confirm Password\" #rePass=\"ngModel\"\n            [class.form-control-danger]=\"(rePass.invalid || password.value != rePass.value) && rePass.touched\"\n            [required]=\"getConfigValue('forms.validation.password.required')\">\n          <small class=\"form-text error\"\n                 *ngIf=\"rePass.invalid && rePass.touched && rePass.errors?.required\">\n            Password confirmation is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"rePass.touched && password.value != rePass.value && !rePass.errors?.required\">\n            Password does not match the confirm password.\n          </small>\n        </div>\n\n        <div class=\"form-group accept-group col-sm-12\" *ngIf=\"getConfigValue('forms.register.terms')\">\n          <nb-checkbox name=\"terms\" [(ngModel)]=\"user.terms\" [required]=\"getConfigValue('forms.register.terms')\">\n            Agree to <a href=\"#\" target=\"_blank\"><strong>Terms & Conditions</strong></a>\n          </nb-checkbox>\n        </div>\n\n        <button [disabled]=\"submitted || !form.valid\" class=\"btn btn-block btn-hero-success\"\n                [class.btn-pulse]=\"submitted\">\n          Register\n        </button>\n      </form>\n\n      <div class=\"links\">\n        <small class=\"form-text\">\n          Already have an account? <a routerLink=\"../login\"><strong>Sign in</strong></a>\n        </small>\n      </div>\n    </nb-auth-block>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbRegisterComponent.ctorParameters = function () { return [
        { type: NbAuthService, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_AUTH_OPTIONS_TOKEN,] },] },
        { type: _angular_router.Router, },
    ]; };
    return NbRegisterComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbLogoutComponent = /** @class */ (function () {
    function NbLogoutComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.provider = '';
        this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
        this.provider = this.getConfigValue('forms.logout.provider');
    }
    NbLogoutComponent.prototype.ngOnInit = function () {
        this.logout(this.provider);
    };
    NbLogoutComponent.prototype.logout = function (provider) {
        var _this = this;
        this.service.logout(provider).subscribe(function (result) {
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbLogoutComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    NbLogoutComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-logout',
                    template: "\n    <div>Logging out, please wait...</div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLogoutComponent.ctorParameters = function () { return [
        { type: NbAuthService, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_AUTH_OPTIONS_TOKEN,] },] },
        { type: _angular_router.Router, },
    ]; };
    return NbLogoutComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbRequestPasswordComponent = /** @class */ (function () {
    function NbRequestPasswordComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.provider = '';
        this.submitted = false;
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
        this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
        this.provider = this.getConfigValue('forms.requestPassword.provider');
    }
    NbRequestPasswordComponent.prototype.requestPass = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.requestPassword(this.provider, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbRequestPasswordComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    NbRequestPasswordComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-request-password-page',
                    styles: [":host .links{display:flex;justify-content:space-between}:host .form-group:last-of-type{margin-bottom:3rem} "],
                    template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Forgot Password</h2>\n      <small class=\"form-text sub-title\">Enter your email adress and we\u2019ll send a link to reset your password</small>\n      <form (ngSubmit)=\"requestPass()\" #requestPassForm=\"ngForm\">\n\n        <div *ngIf=\"showMessages.error && errors && errors.length > 0 && !submitted\"\n             class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n        <div *ngIf=\"showMessages.success && messages && messages.length > 0 && !submitted\"\n             class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-email\" class=\"sr-only\">Enter your email address</label>\n          <input name=\"email\" [(ngModel)]=\"user.email\" id=\"input-email\" #email=\"ngModel\"\n                 class=\"form-control\" placeholder=\"Email address\" pattern=\".+@.+..+\"\n                 [class.form-control-danger]=\"email.invalid && email.touched\"\n                 [required]=\"getConfigValue('forms.validation.email.required')\"\n                 autofocus>\n          <small class=\"form-text error\" *ngIf=\"email.invalid && email.touched && email.errors?.required\">\n            Email is required!\n          </small>\n          <small class=\"form-text error\"\n                 *ngIf=\"email.invalid && email.touched && email.errors?.pattern\">\n            Email should be the real one!\n          </small>\n        </div>\n\n        <button [disabled]=\"submitted || !requestPassForm.form.valid\" class=\"btn btn-hero-success btn-block\"\n                [class.btn-pulse]=\"submitted\">\n          Request password\n        </button>\n      </form>\n\n      <div class=\"links col-sm-12\">\n        <small class=\"form-text\">\n          Already have an account? <a routerLink=\"../login\"><strong>Sign In</strong></a>\n        </small>\n        <small class=\"form-text\">\n          <a routerLink=\"../register\"><strong>Sign Up</strong></a>\n        </small>\n      </div>\n    </nb-auth-block>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbRequestPasswordComponent.ctorParameters = function () { return [
        { type: NbAuthService, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_AUTH_OPTIONS_TOKEN,] },] },
        { type: _angular_router.Router, },
    ]; };
    return NbRequestPasswordComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbResetPasswordComponent = /** @class */ (function () {
    function NbResetPasswordComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.provider = '';
        this.submitted = false;
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
        this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
        this.provider = this.getConfigValue('forms.resetPassword.provider');
    }
    NbResetPasswordComponent.prototype.resetPass = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.resetPassword(this.provider, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbResetPasswordComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    NbResetPasswordComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'nb-reset-password-page',
                    styles: [":host .links{display:flex;justify-content:space-between}:host .form-group:last-of-type{margin-bottom:3rem} "],
                    template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Change password</h2>\n      <small class=\"form-text sub-title\">Please enter a new password</small>\n      <form (ngSubmit)=\"resetPass()\" #resetPassForm=\"ngForm\">\n\n        <div *ngIf=\"errors && errors.length > 0 && !submitted\" class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n        <div *ngIf=\"messages && messages.length > 0 && !submitted\" class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-password\" class=\"sr-only\">New Password</label>\n          <input name=\"password\" [(ngModel)]=\"user.password\" type=\"password\" id=\"input-password\"\n                 class=\"form-control form-control-lg first\" placeholder=\"New Password\" #password=\"ngModel\"\n                 [class.form-control-danger]=\"password.invalid && password.touched\"\n                 [required]=\"getConfigValue('forms.validation.password.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.password.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\"\n                 autofocus>\n          <small class=\"form-text error\" *ngIf=\"password.invalid && password.touched && password.errors?.required\">\n            Password is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)\">\n            Password should contains\n            from {{getConfigValue('forms.validation.password.minLength')}}\n            to {{getConfigValue('forms.validation.password.maxLength')}}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-re-password\" class=\"sr-only\">Confirm Password</label>\n          <input\n            name=\"rePass\" [(ngModel)]=\"user.confirmPassword\" type=\"password\" id=\"input-re-password\"\n            class=\"form-control form-control-lg last\" placeholder=\"Confirm Password\" #rePass=\"ngModel\"\n            [class.form-control-danger]=\"(rePass.invalid || password.value != rePass.value) && rePass.touched\"\n            [required]=\"getConfigValue('forms.validation.password.required')\">\n          <small class=\"form-text error\"\n                 *ngIf=\"rePass.invalid && rePass.touched && rePass.errors?.required\">\n            Password confirmation is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"rePass.touched && password.value != rePass.value && !rePass.errors?.required\">\n            Password does not match the confirm password.\n          </small>\n        </div>\n\n        <button [disabled]=\"submitted || !resetPassForm.form.valid\" class=\"btn btn-hero-success btn-block\"\n                [class.btn-pulse]=\"submitted\">\n          Change password\n        </button>\n      </form>\n\n      <div class=\"links col-sm-12\">\n        <small class=\"form-text\">\n          Already have an account? <a routerLink=\"../login\"><strong>Sign In</strong></a>\n        </small>\n        <small class=\"form-text\">\n          <a routerLink=\"../register\"><strong>Sign Up</strong></a>\n        </small>\n      </div>\n    </nb-auth-block>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbResetPasswordComponent.ctorParameters = function () { return [
        { type: NbAuthService, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_AUTH_OPTIONS_TOKEN,] },] },
        { type: _angular_router.Router, },
    ]; };
    return NbResetPasswordComponent;
}());

var routes = [
    {
        path: 'auth',
        component: NbAuthComponent,
        children: [
            {
                path: '',
                component: NbLoginComponent,
            },
            {
                path: 'login',
                component: NbLoginComponent,
            },
            {
                path: 'register',
                component: NbRegisterComponent,
            },
            {
                path: 'logout',
                component: NbLogoutComponent,
            },
            {
                path: 'request-password',
                component: NbRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NbResetPasswordComponent,
            },
        ],
    },
];

function nbAuthServiceFactory(config, tokenService, injector) {
    var providers = config.providers || {};
    for (var key in providers) {
        if (providers.hasOwnProperty(key)) {
            var provider = providers[key];
            var object = injector.get(provider.service);
            object.setConfig(provider.config || {});
        }
    }
    return new NbAuthService(tokenService, injector, providers);
}
function nbOptionsFactory(options) {
    return deepExtend(defaultSettings, options);
}
var NbAuthModule = /** @class */ (function () {
    function NbAuthModule() {
    }
    NbAuthModule.forRoot = function (nbAuthOptions) {
        return {
            ngModule: NbAuthModule,
            providers: [
                { provide: NB_AUTH_USER_OPTIONS_TOKEN, useValue: nbAuthOptions },
                { provide: NB_AUTH_OPTIONS_TOKEN, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS_TOKEN] },
                { provide: NB_AUTH_PROVIDERS_TOKEN, useValue: {} },
                { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthSimpleToken },
                { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
                {
                    provide: NbAuthService,
                    useFactory: nbAuthServiceFactory,
                    deps: [NB_AUTH_OPTIONS_TOKEN, NbTokenService, _angular_core.Injector],
                },
                NbTokenService,
                NbDummyAuthProvider,
                NbEmailPassAuthProvider,
            ],
        };
    };
    NbAuthModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule,
                        _nebular_theme.NbLayoutModule,
                        _nebular_theme.NbCardModule,
                        _nebular_theme.NbCheckboxModule,
                        _angular_router.RouterModule.forChild(routes),
                        _angular_forms.FormsModule,
                        _angular_common_http.HttpClientModule,
                    ],
                    declarations: [
                        NbAuthComponent,
                        NbAuthBlockComponent,
                        NbLoginComponent,
                        NbRegisterComponent,
                        NbRequestPasswordComponent,
                        NbResetPasswordComponent,
                        NbLogoutComponent,
                    ],
                    exports: [
                        NbAuthComponent,
                        NbAuthBlockComponent,
                        NbLoginComponent,
                        NbRegisterComponent,
                        NbRequestPasswordComponent,
                        NbResetPasswordComponent,
                        NbLogoutComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    NbAuthModule.ctorParameters = function () { return []; };
    return NbAuthModule;
}());

var NbAuthJWTInterceptor = /** @class */ (function () {
    function NbAuthJWTInterceptor(injector) {
        this.injector = injector;
    }
    NbAuthJWTInterceptor.prototype.intercept = function (req, next) {
        return this.authService.getToken()
            .pipe(rxjs_operators_switchMap.switchMap(function (token) {
            if (token) {
                var JWT = "Bearer " + token.getValue();
                req = req.clone({
                    setHeaders: {
                        Authorization: JWT,
                    },
                });
            }
            return next.handle(req);
        }));
    };
    Object.defineProperty(NbAuthJWTInterceptor.prototype, "authService", {
        get: function () {
            return this.injector.get(NbAuthService);
        },
        enumerable: true,
        configurable: true
    });
    NbAuthJWTInterceptor.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbAuthJWTInterceptor.ctorParameters = function () { return [
        { type: _angular_core.Injector, },
    ]; };
    return NbAuthJWTInterceptor;
}());

var NbAuthSimpleInterceptor = /** @class */ (function () {
    function NbAuthSimpleInterceptor(injector, headerName) {
        if (headerName === void 0) { headerName = 'Authorization'; }
        this.injector = injector;
        this.headerName = headerName;
    }
    NbAuthSimpleInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return this.authService.getToken()
            .pipe(rxjs_operators_switchMap.switchMap(function (token) {
            if (token && token.getValue()) {
                req = req.clone({
                    setHeaders: (_a = {},
                        _a[_this.headerName] = token.getValue(),
                        _a),
                });
            }
            return next.handle(req);
            var _a;
        }));
    };
    Object.defineProperty(NbAuthSimpleInterceptor.prototype, "authService", {
        get: function () {
            return this.injector.get(NbAuthService);
        },
        enumerable: true,
        configurable: true
    });
    NbAuthSimpleInterceptor.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NbAuthSimpleInterceptor.ctorParameters = function () { return [
        { type: _angular_core.Injector, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [NB_AUTH_INTERCEPTOR_HEADER,] },] },
    ]; };
    return NbAuthSimpleInterceptor;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

exports.defaultSettings = defaultSettings;
exports.NB_AUTH_OPTIONS_TOKEN = NB_AUTH_OPTIONS_TOKEN;
exports.NB_AUTH_USER_OPTIONS_TOKEN = NB_AUTH_USER_OPTIONS_TOKEN;
exports.NB_AUTH_PROVIDERS_TOKEN = NB_AUTH_PROVIDERS_TOKEN;
exports.NB_AUTH_TOKEN_WRAPPER_TOKEN = NB_AUTH_TOKEN_WRAPPER_TOKEN;
exports.NB_AUTH_INTERCEPTOR_HEADER = NB_AUTH_INTERCEPTOR_HEADER;
exports.nbAuthServiceFactory = nbAuthServiceFactory;
exports.nbOptionsFactory = nbOptionsFactory;
exports.NbAuthModule = NbAuthModule;
exports.NbAuthComponent = NbAuthComponent;
exports.NbAuthBlockComponent = NbAuthBlockComponent;
exports.NbLoginComponent = NbLoginComponent;
exports.NbLogoutComponent = NbLogoutComponent;
exports.NbRegisterComponent = NbRegisterComponent;
exports.NbRequestPasswordComponent = NbRequestPasswordComponent;
exports.NbResetPasswordComponent = NbResetPasswordComponent;
exports.NbAuthResult = NbAuthResult;
exports.NbAuthService = NbAuthService;
exports.NbAuthSimpleToken = NbAuthSimpleToken;
exports.NbAuthJWTToken = NbAuthJWTToken;
exports.NbTokenService = NbTokenService;
exports.NbAuthJWTInterceptor = NbAuthJWTInterceptor;
exports.NbAuthSimpleInterceptor = NbAuthSimpleInterceptor;
exports.NbAbstractAuthProvider = NbAbstractAuthProvider;
exports.NbDummyAuthProvider = NbDummyAuthProvider;
exports.NbEmailPassAuthProvider = NbEmailPassAuthProvider;

Object.defineProperty(exports, '__esModule', { value: true });

})));
