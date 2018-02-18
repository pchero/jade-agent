/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { NbAuthService } from '../../services/auth.service';
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
        { type: Component, args: [{
                    selector: 'nb-logout',
                    template: "\n    <div>Logging out, please wait...</div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLogoutComponent.ctorParameters = function () { return [
        { type: NbAuthService, },
        { type: undefined, decorators: [{ type: Inject, args: [NB_AUTH_OPTIONS_TOKEN,] },] },
        { type: Router, },
    ]; };
    return NbLogoutComponent;
}());
export { NbLogoutComponent };
//# sourceMappingURL=logout.component.js.map