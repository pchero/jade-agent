import { Component } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { JadesipService } from '../@core/data/jade-sip.service';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-pages',
  styles: [`
    toaster-container /deep/ {
      #toast-container .toast-close-button {
        right: 0;
      }
    }
  `],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet>
        <toaster-container [toasterconfig]="toaster_config"></toaster-container>
      </router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  private toaster_config: ToasterConfig;

  constructor(
    private toasterService: ToasterService,
    private jadesipService: JadesipService
  ) {
    this.toasterService = toasterService;
    this.init_toaster();

    this.jadesipService.set_notify(this.toasterService);
  }

  init_toaster() {

    this.toaster_config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'fade',
      limit: 10,
    });
  }
}
