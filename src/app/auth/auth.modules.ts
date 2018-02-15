import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

import { ThemeModule } from '../@theme/theme.module';

import {ToasterModule} from 'angular2-toaster';

const PAGES_COMPONENTS = [
  LoginComponent,
];

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    LoginComponent,
    ToasterModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class AuthModule {
}
