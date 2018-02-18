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
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of as observableOf } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import { share } from 'rxjs/operators/share';
import { NB_AUTH_OPTIONS_TOKEN, NB_AUTH_TOKEN_WRAPPER_TOKEN } from '../auth.options';
import { deepExtend, getDeepFromObject, urlBase64Decode } from '../helpers';
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
        { type: Injectable },
    ];
    /** @nocollapse */
    NbAuthSimpleToken.ctorParameters = function () { return []; };
    return NbAuthSimpleToken;
}());
export { NbAuthSimpleToken };
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
        { type: Injectable },
    ];
    /** @nocollapse */
    NbAuthJWTToken.ctorParameters = function () { return []; };
    return NbAuthJWTToken;
}(NbAuthSimpleToken));
export { NbAuthJWTToken };
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
                    return observableOf(_this.tokenWrapper);
                },
                setter: function (token) {
                    var raw = token instanceof NbAuthSimpleToken ? token.getValue() : token;
                    localStorage.setItem(_this.getConfigValue('token.key'), raw);
                    return observableOf(null);
                },
                deleter: function () {
                    localStorage.removeItem(_this.getConfigValue('token.key'));
                    return observableOf(null);
                },
            },
        };
        this.config = {};
        this.token$ = new BehaviorSubject(null);
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
            .pipe(switchMap(function () { return _this.get(); }), tap(function (token) {
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
        return this.token$.pipe(share());
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
        { type: Injectable },
    ];
    /** @nocollapse */
    NbTokenService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NB_AUTH_OPTIONS_TOKEN,] },] },
        { type: NbAuthSimpleToken, decorators: [{ type: Inject, args: [NB_AUTH_TOKEN_WRAPPER_TOKEN,] },] },
    ]; };
    return NbTokenService;
}());
export { NbTokenService };
//# sourceMappingURL=token.service.js.map