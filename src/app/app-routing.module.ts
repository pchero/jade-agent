import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthModule,
  NbEmailPassAuthProvider,
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

// import { NbAuthComponent } from './auth/components/auth.component';
// import { NbLoginComponent } from './auth/components/login/login.component';


const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: 'auth', loadChildren: 'app/auth/auth-routing.module#AuthRoutingModule'},
  // {
  //   path: 'auth',
  //   component: NbAuthComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'login',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'register',
  //       component: NbRegisterComponent,
  //     },
  //     {
  //       path: 'logout',
  //       component: NbLogoutComponent,
  //     },
  //     {
  //       path: 'request-password',
  //       component: NbRequestPasswordComponent,
  //     },
  //     {
  //       path: 'reset-password',
  //       component: NbResetPasswordComponent,
  //     },
  //   ],
  // },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    // NbAuthComponent,
    // NbLoginComponent,
    RouterModule.forRoot(routes, config),
    // NbAuthModule.forRoot({
    //   providers: {
    //     email: {
    //       service: NbEmailPassAuthProvider,
    //       config: {
    //       },
    //     },
    //   },
    //   baseEndpoint: 'http://192.168.200.14:8081',
    //   login: {
    //     endpoint: '/user/login',
    //     method: 'post',
    //   },
    //   logout: {
    //     endpoint: '/user/login',
    //     method: 'delete',
    //   },
    // }),
  ],
  exports: [RouterModule],
  declarations: [
    // NbAuthComponent,
    // NbLoginComponent,
  ],
})
export class AppRoutingModule {
}
