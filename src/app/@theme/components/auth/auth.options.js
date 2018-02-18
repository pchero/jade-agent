import { InjectionToken } from '@angular/core';
export var defaultSettings = {
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
export var NB_AUTH_OPTIONS_TOKEN = new InjectionToken('Nebular Auth Options');
export var NB_AUTH_USER_OPTIONS_TOKEN = new InjectionToken('Nebular User Auth Options');
export var NB_AUTH_PROVIDERS_TOKEN = new InjectionToken('Nebular Auth Providers');
export var NB_AUTH_TOKEN_WRAPPER_TOKEN = new InjectionToken('Nebular Auth Token');
export var NB_AUTH_INTERCEPTOR_HEADER = new InjectionToken('Nebular Simple Interceptor Header');
//# sourceMappingURL=auth.options.js.map