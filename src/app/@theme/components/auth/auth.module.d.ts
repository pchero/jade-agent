import { Injector, ModuleWithProviders } from '@angular/core';
import { NbAuthService } from './services/auth.service';
import { NbAuthOptions } from './auth.options';
import { NbTokenService } from './services/token.service';
export declare function nbAuthServiceFactory(config: any, tokenService: NbTokenService, injector: Injector): NbAuthService;
export declare function nbOptionsFactory(options: any): any;
export declare class NbAuthModule {
    static forRoot(nbAuthOptions?: NbAuthOptions): ModuleWithProviders;
}
