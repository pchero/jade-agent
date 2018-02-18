import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
/**
 * Wrapper for simple (text) token
 */
export declare class NbAuthSimpleToken {
    protected token: string;
    setValue(token: string): void;
    /**
     * Returns the token value
     * @returns string
     */
    getValue(): string;
}
/**
 * Wrapper for JWT token with additional methods.
 */
export declare class NbAuthJWTToken extends NbAuthSimpleToken {
    /**
     * TODO: check for this.token to be not null
     * Returns payload object
     * @returns any
     */
    getPayload(): any;
    /**
     * Returns expiration date
     * @returns Date
     */
    getTokenExpDate(): Date;
}
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
export declare class NbTokenService {
    protected options: any;
    protected tokenWrapper: NbAuthSimpleToken;
    protected defaultConfig: any;
    protected config: any;
    protected token$: BehaviorSubject<any>;
    constructor(options: any, tokenWrapper: NbAuthSimpleToken);
    setConfig(config: any): void;
    getConfigValue(key: string): any;
    /**
     * Sets the token into the storage. This method is used by the NbAuthService automatically.
     * @param {string} rawToken
     * @returns {Observable<any>}
     */
    set(rawToken: string): Observable<null>;
    /**
     * Returns observable of current token
     * @returns {Observable<NbAuthSimpleToken>}
     */
    get(): Observable<NbAuthSimpleToken>;
    /**
     * Publishes token when it changes.
     * @returns {Observable<NbAuthSimpleToken>}
     */
    tokenChange(): Observable<NbAuthSimpleToken>;
    /**
     * Removes the token
     * @returns {Observable<any>}
     */
    clear(): Observable<any>;
    protected publishToken(token: NbAuthSimpleToken): void;
}
