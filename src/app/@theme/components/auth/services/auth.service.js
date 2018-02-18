/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { of as observableOf } from 'rxjs/observable/of';
import { NbTokenService } from './token.service';
import { NB_AUTH_PROVIDERS_TOKEN } from '../auth.options';
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
export { NbAuthResult };
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
        return this.getToken().pipe(map(function (token) { return !!(token && token.getValue()); }));
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
        return this.onTokenChange().pipe(map(function (token) { return !!(token && token.getValue()); }));
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
            .pipe(switchMap(function (result) {
            if (result.isSuccess() && result.getTokenValue()) {
                return _this.tokenService.set(result.getTokenValue())
                    .pipe(switchMap(function () { return _this.tokenService.get(); }), map(function (token) {
                    result.replaceToken(token);
                    return result;
                }));
            }
            return observableOf(result);
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
            .pipe(switchMap(function (result) {
            if (result.isSuccess() && result.getTokenValue()) {
                return _this.tokenService.set(result.getTokenValue())
                    .pipe(switchMap(function (_) { return _this.tokenService.get(); }), map(function (token) {
                    result.replaceToken(token);
                    return result;
                }));
            }
            return observableOf(result);
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
            .pipe(tap(function (result) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    NbAuthService.ctorParameters = function () { return [
        { type: NbTokenService, },
        { type: Injector, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NB_AUTH_PROVIDERS_TOKEN,] },] },
    ]; };
    return NbAuthService;
}());
export { NbAuthService };
//# sourceMappingURL=auth.service.js.map