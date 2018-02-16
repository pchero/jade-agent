import { NgModule, Component, Injectable } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ngx-core-notifications',
  template: '<toaster-container></toaster-container>',
})
export class JadeNotificationComponent {
  private toasterService: ToasterService

  constructor() {
    this.toasterService = new ToasterService();
  }

  showToast(type: string, title: string, body: string) {
    this.toasterService.pop('success', 'Args Title', 'Args Body');
  }

  clearToasts() {
    this.toasterService.clear();
  }
}
