import { InjectionToken } from '@angular/core';
export interface NbAuthOptions {
    forms?: any;
    providers?: any;
}
export interface NbAuthProviders {
    [key: string]: any;
}
export declare const defaultSettings: any;
export declare const NB_AUTH_OPTIONS_TOKEN: InjectionToken<NbAuthOptions>;
export declare const NB_AUTH_USER_OPTIONS_TOKEN: InjectionToken<NbAuthOptions>;
export declare const NB_AUTH_PROVIDERS_TOKEN: InjectionToken<NbAuthProviders>;
export declare const NB_AUTH_TOKEN_WRAPPER_TOKEN: InjectionToken<NbAuthProviders>;
export declare const NB_AUTH_INTERCEPTOR_HEADER: InjectionToken<NbAuthProviders>;
