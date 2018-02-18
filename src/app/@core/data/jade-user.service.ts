// import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable, Subscriber} from 'rxjs/Rx';
import { JadeSipService } from './jade-sip.service';

import { Call } from './jade-call';
import { JadeNotificationComponent } from './jade-notification.component';
import { JadeService } from './jade.service';

@Injectable()
export class JadeUserService {
  private user_info: any;

  private notificaiton: JadeNotificationComponent;

  private phone: JadeSipService;
  private calls: Array<Call>;

  constructor() {
    console.log('Fired JadeuserService constructor.');
  }

  set_userinfo(user: any) {
    this.user_info = user;

    this.register_sipphones()
  }

  get_userinfo() {
    return this.user_info;
  }

  set_notificaiton(notification) {
    this.notificaiton = notification;
  }

  get_calls() {
    return this.phone.get_calls();
  }

  get_call(id) {
    console.log("Fired user.get_call. " + id);
    return this.phone.get_call(id);
  }

  create_call(destination: string) {
    console.log("Fired create_call. destination:" + destination);
    this.phone.originate(destination);
  }

  register_sipphones() {
    // we support only 1 phone per user now.
    const contact = this.user_info.contacts[0];

    this.phone = new JadeSipService();
    this.phone.set_notify(this.notificaiton);
    this.phone.login_phone(contact.info.public_url, contact.info.password);


    // for (let i = 0; i < 1; i++) {
    //   const contact = this.user_info.contacts[i];
    //   this.sips.login_phone(contact.info.public_url, contact.info.password);
    // }
  }

}
