import { Injectable, Injector } from '@angular/core';
import { switchMap } from 'rxjs/operators/switchMap';
import { NbAuthService } from '../auth.service';
var NbAuthJWTInterceptor = /** @class */ (function () {
    function NbAuthJWTInterceptor(injector) {
        this.injector = injector;
    }
    NbAuthJWTInterceptor.prototype.intercept = function (req, next) {
        return this.authService.getToken()
            .pipe(switchMap(function (token) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    NbAuthJWTInterceptor.ctorParameters = function () { return [
        { type: Injector, },
    ]; };
    return NbAuthJWTInterceptor;
}());
export { NbAuthJWTInterceptor };
//# sourceMappingURL=jwt-interceptor.js.map