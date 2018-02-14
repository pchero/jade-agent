// import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable, Subscriber} from 'rxjs/Rx';
import { JadesipService } from './jade-sip.service';


@Injectable()
export class JadeuserService {
  private user_info;

  constructor(private sips: JadesipService) {
    console.log('Fired JadeuserService constructor.');
  }

  set_userinfo(user: any) {
    this.user_info = user;

    this.register_sipphones()
  }

  register_sipphones() {
    for (let i = 0; i < this.user_info.contacts.length; i++) {
      const contact = this.user_info.contacts[i];
      this.sips.login_phone(contact.info.public_url, contact.info.password);
    }
  }

}
