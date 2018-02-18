import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { NbAuthResult } from '../services/auth.service';
export declare abstract class NbAbstractAuthProvider {
    protected defaultConfig: any;
    protected config: any;
    setConfig(config: any): void;
    getConfigValue(key: string): any;
    abstract authenticate(data?: any): Observable<NbAuthResult>;
    abstract register(data?: any): Observable<NbAuthResult>;
    abstract requestPassword(data?: any): Observable<NbAuthResult>;
    abstract resetPassword(data?: any): Observable<NbAuthResult>;
    abstract logout(): Observable<NbAuthResult>;
    protected createFailResponse(data?: any): HttpResponse<Object>;
    protected createSuccessResponse(data?: any): HttpResponse<Object>;
    protected getJsonSafe(res: HttpResponse<Object>): any;
}
