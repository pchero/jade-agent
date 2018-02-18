import { Inject, Injectable, Injector } from '@angular/core';
import { switchMap } from 'rxjs/operators/switchMap';
import { NbAuthService } from '../auth.service';
import { NB_AUTH_INTERCEPTOR_HEADER } from '../../auth.options';
var NbAuthSimpleInterceptor = /** @class */ (function () {
    function NbAuthSimpleInterceptor(injector, headerName) {
        if (headerName === void 0) { headerName = 'Authorization'; }
        this.injector = injector;
        this.headerName = headerName;
    }
    NbAuthSimpleInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return this.authService.getToken()
            .pipe(switchMap(function (token) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    NbAuthSimpleInterceptor.ctorParameters = function () { return [
        { type: Injector, },
        { type: undefined, decorators: [{ type: Inject, args: [NB_AUTH_INTERCEPTOR_HEADER,] },] },
    ]; };
    return NbAuthSimpleInterceptor;
}());
export { NbAuthSimpleInterceptor };
//# sourceMappingURL=simple-interceptor.js.map