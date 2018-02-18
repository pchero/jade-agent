/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NbAbstractAuthProvider } from '../providers/abstract-auth.provider';
import { NbAuthSimpleToken, NbTokenService } from './token.service';
export declare class NbAuthResult {
    protected success: boolean;
    protected response: any;
    protected redirect: any;
    protected token: any;
    protected errors: string[];
    protected messages: string[];
    constructor(success: boolean, response?: any, redirect?: any, errors?: any, messages?: any, token?: NbAuthSimpleToken);
    getResponse(): any;
    getTokenValue(): any;
    replaceToken(token: NbAuthSimpleToken): any;
    getRedirect(): any;
    getErrors(): string[];
    getMessages(): string[];
    isSuccess(): boolean;
    isFailure(): boolean;
}
/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Providers.
 */
export declare class NbAuthService {
    protected tokenService: NbTokenService;
    protected injector: Injector;
    protected providers: {};
    constructor(tokenService: NbTokenService, injector: Injector, providers?: {});
    /**
     * Retrieves current authenticated token stored
     * @returns {Observable<any>}
     */
    getToken(): Observable<NbAuthSimpleToken>;
    /**
     * Returns true if auth token is presented in the token storage
     * // TODO: check exp date for JWT token
     * @returns {Observable<any>}
     */
    isAuthenticated(): Observable<any>;
    /**
     * Returns tokens stream
     * @returns {Observable<any>}
     */
    onTokenChange(): Observable<NbAuthSimpleToken>;
    /**
     * Returns authentication status stream
     *  // TODO: check exp date for JWT token
     * @returns {Observable<any>}
     */
    onAuthenticationChange(): Observable<boolean>;
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
    authenticate(provider: string, data?: any): Observable<NbAuthResult>;
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
    register(provider: string, data?: any): Observable<NbAuthResult>;
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
    logout(provider: string): Observable<NbAuthResult>;
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
    requestPassword(provider: string, data?: any): Observable<NbAuthResult>;
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
    resetPassword(provider: string, data?: any): Observable<NbAuthResult>;
    getProvider(provider: string): NbAbstractAuthProvider;
}
