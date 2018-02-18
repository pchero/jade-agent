
import { Router } from '@angular/router';
import { NbAuthService } from '../../services/auth.service';
import { JadeService } from '../../../../../@core/data/jade.service';

export declare class NbLoginComponent {
    protected service: NbAuthService;
    protected config: {};
    protected router: Router;
    protected jade_service: JadeService;
    redirectDelay: number;
    showMessages: any;
    provider: string;
    errors: string[];
    messages: string[];
    user: any;
    submitted: boolean;
    constructor(service: NbAuthService, config: {}, router: Router, jade_service: JadeService);
    login(): void;
    getConfigValue(key: string): any;
}
