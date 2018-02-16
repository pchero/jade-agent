// import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable, Subscriber} from 'rxjs/Rx';
import { JadertcService } from './jadertc.service';
import { JadeSipService } from './jade-sip.service';
import { JadeUserService } from './jade-user.service';

@Injectable()
export class JadeService {
  private baseUrl: string = 'http://' + window.location.hostname + ':8081';
  private websockUrl: string = 'ws://' + window.location.hostname + ':8083';
  private websock_ast: string = 'wss://' + window.location.hostname + ':8089/ws';

  private authtoken: string = '';
  private webrtcs: Array<any>;
  // private webrtcs: [];

  constructor(private http: Http, private route: Router, private user: JadeUserService) {
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
  }

  private is_loggedin() {
    if (this.authtoken !== '') {
      return true;
    }
    console.log("Not logged in. Move to login page.");

    this.route.navigate(['/auth/login']);
    return false;
  }

  private get_item(target, param = null): Observable<any> {
    if (target === null) {
      return null;
    }

    if (this.is_loggedin() === false) {
      return null;
    }

    const target_encode = encodeURI(target);
    const url = this.baseUrl + target_encode + '?authtoken=' + this.authtoken;

    return this.http.get(url, {params: param}).map(res => res.json());
  }

  private create_item(target, j_data): Observable<any> {
    if (target == null) {
      return null;
    }
    if (this.is_loggedin() === false) {
      return null;
    }

    const target_encode = encodeURI(target);
    const url = this.baseUrl + target_encode + '?authtoken=' + this.authtoken;

    // send request
    return this.http.post(url + target_encode, j_data).map(res => res.json());
  }

  private update_item(target, j_data): Observable<any> {
    if (target == null) {
      return null;
    }
    if (this.is_loggedin() === false) {
      return null;
    }

    const target_encode = encodeURI(target);
    const url = this.baseUrl + target_encode + '?authtoken=' + this.authtoken;

    // send data
    return this.http.put(url + target_encode, j_data).map(res => res.json());
  }

  private delete_item(target): Observable<any> {
    if (target === null) {
      return null;
    }
    if (this.is_loggedin() === false) {
      return null;
    }

    const target_encode = encodeURI(target);
    const url = this.baseUrl + target_encode + '?authtoken=' + this.authtoken;

    // delete data
    return this.http.delete(url + target_encode).map(res => res.json());
  }

  OnInit() {
    // console.log('OnInit!!');
    // console.log('BaseUrl: ' + this.baseUrl);
  }

  get_meinfo() {

    console.log('Fired get_meinfo.');
    const tmp = this.get_item('/me/info');
    if (!tmp) {
      return null;
    }

    tmp.subscribe(
      (data) => {
        console.log(data);

        this.user.set_userinfo(data.result);

        return data.result;
      },
      (err) => {
        console.log('Could not get data correctly. Move to the login.');
        this.route.navigate(['/auth/login']);

        return null;
      },
    );
  }









}
