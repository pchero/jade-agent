// import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable, Subscriber} from 'rxjs/Rx';
import { JadertcService } from './jadertc.service';
// import { RequestOptions } from '@angular/http/src/base_request_options';
// import * as TAFFY from 'taffy';

@Injectable()
export class JadeService {
  private baseUrl: string = 'http://' + window.location.hostname + ':8081';
  private websockUrl: string = 'ws://' + window.location.hostname + ':8083';
  private websock_ast: string = 'wss://' + window.location.hostname + ':8089/ws';

  private authtoken: string = null;
  private userinfo: any = null;
  private webrtcs: Array<any>;
  // private webrtcs: [];

  constructor(private http: Http, private route: Router) {
    console.log('Fired JadeService constructor.');

    // this.init_database();
    // this.init_websock();

    // this.get_item('/me/info');
    console.log("Logged in.");
  }

  login(username, password): Observable<boolean> {
    const headers: Headers = new Headers();
    let ret;

    headers.append("Authorization", "Basic " + btoa(username + ':' + password));
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const options = new RequestOptions({headers: headers});
    ret = this.http.post(this.baseUrl + '/user/login', null, options)
      .map(res => res.json())
      .subscribe(
        (data) => {

          this.init_service_info();

          console.log(data);
          this.authtoken = data.result.authtoken;
          console.log('Logged in.');

          this.route.navigate(['/pages/dashboard']);
          // return true;
        },
        (err) => {
          console.log('Could not get data. err: ' + err);
          // return false;
        },
      );

    return ret;
  }

  logout() {
    this.http.delete(this.baseUrl + '/user/login');

    this.init_service_info();

    this.route.navigate(['/auth/login']);
    return;
  }

  private init_service_info() {
    this.authtoken = '';

    delete this.webrtcs;
    this.webrtcs = new Array;

    delete this.userinfo;
    this.userinfo = null;
  }

  // private get_item(target, param = null) {
  //   if (this.authtoken === null) {
  //     console.log("Could not get authtoken info.");
  //     this.route.navigate(['/auth/login']);
  //     return null;
  //   }

  //   return this._get_item(target, param);
  // }

  // private _get_item(target, param = null) {
  //   if (target === null) {
  //     return null;
  //   }
  //   const target_encode = encodeURI(target);
  //   const url = this.baseUrl + target_encode + '?authtoken=' + this.authtoken;

  //   return this.http.get(url, {params: param}).map(res => res.json())
  //   .subscribe(
  //     (data) => {
  //       return data;
  //     },
  //     (err) => {
  //       console.log('Could not get data correctly. Move to the login.');
  //       this.route.navigate(['/auth/login']);
  //       return null;
  //     },
  //   )
  // }

  private get_item(target, param = null): Observable<any> {
    if (target === null) {
      return null;
    }
    const target_encode = encodeURI(target);
    const url = this.baseUrl + target_encode + '?authtoken=' + this.authtoken;

    return this.http.get(url, {params: param}).map(res => res.json());
  }



  private create_item(target, j_data) {
    if (target == null) {
      return false;
    }

    const target_encode = encodeURI(target);

    // create data
    this.http.post(this.baseUrl + target_encode, j_data).map(res => res.json())
    .subscribe(
      (data) => {
        return true;
      },
      (err) => {
        console.log('Error. ' + err);
        return false;
      },
    );
  }

  private update_item(target, j_data) {
    if (target == null) {
      return false;
    }

    const target_encode = encodeURI(target);

    // update data
    this.http.put(this.baseUrl + target_encode, j_data).map(res => res.json())
    .subscribe(
      (data) => {
        return true;
      },
      (err) => {
        console.log('Error. ' + err);
        return false;
      },
    );
  }

  private delete_item(target) {
    if (target === null) {
      return false;
    }

    const target_encode = encodeURI(target);

    // delete data
    this.http.delete(this.baseUrl + target_encode).map(res => res.json())
    .subscribe(
      (data) => {
        return true;
      },
      (err) => {
        console.log('Error. ' + err);
        return false;
      },
    );
  }

  OnInit() {
    // console.log('OnInit!!');
    // console.log('BaseUrl: ' + this.baseUrl);
  }

  init_userinfo() {

    console.log('Fired init_userinfo.');
    this.get_item('/me/info').subscribe(
      (data) => {
        console.log(data);

        // set userinfo
        this.userinfo = data.result;
        console.log(this.userinfo);

        // webrtc login
        for (let i = 0; i < data.result.contacts.length; i++) {
          const contact = data.result.contacts[i];

          const webrtc = new JadertcService()
          webrtc.sipRegister(
            // contact.info.realm,
            // contact.info.id,
            // contact.info.public_url,
            "asterisk.org",
            "rtcagent-01",
            "sip:rtcagent-01@192.168.200.14",
            "rtcagent-01",
            // contact.info.password,
            // contact.name
            this.websock_ast,
          );
          this.webrtcs.push(webrtc);
        }
      },
      (err) => {
        console.log('Could not get data correctly. Move to the login.');
        this.route.navigate(['/auth/login']);
      },
    );
  }









}
