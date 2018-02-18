import { HttpResponse } from '@angular/common/http';
import { deepExtend, getDeepFromObject } from '../helpers';
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
        return new HttpResponse({ body: {}, status: 401 });
    };
    NbAbstractAuthProvider.prototype.createSuccessResponse = function (data) {
        return new HttpResponse({ body: {}, status: 200 });
    };
    NbAbstractAuthProvider.prototype.getJsonSafe = function (res) {
        return res.body;
    };
    return NbAbstractAuthProvider;
}());
export { NbAbstractAuthProvider };
//# sourceMappingURL=abstract-auth.provider.js.map