import { Router } from '@angular/router';
import { NbAuthService } from '../../services/auth.service';
export declare class NbRequestPasswordComponent {
    protected service: NbAuthService;
    protected config: {};
    protected router: Router;
    redirectDelay: number;
    showMessages: any;
    provider: string;
    submitted: boolean;
    errors: string[];
    messages: string[];
    user: any;
    constructor(service: NbAuthService, config: {}, router: Router);
    requestPass(): void;
    getConfigValue(key: string): any;
}
