/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { OnDestroy } from '@angular/core';
import { NbAuthService } from '../services/auth.service';
export declare class NbAuthComponent implements OnDestroy {
    protected auth: NbAuthService;
    subscription: any;
    authenticated: boolean;
    token: string;
    constructor(auth: NbAuthService);
    ngOnDestroy(): void;
}
