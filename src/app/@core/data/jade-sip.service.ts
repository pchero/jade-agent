import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { UA, WebSocketInterface, RTCSession } from 'jssip';
import 'rxjs/add/operator/map';
import {Observable, Subscriber} from 'rxjs/Rx';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { JadeNotificationComponent } from './jade-notification.component';

import { Call } from './jade-call';

@Injectable()
export class JadeSipService {
  private wsuri: string = 'wss://' + window.location.hostname + ':8089/ws';
  private wsock: WebSocketInterface;

  // private phones: Array<UA>;
  private ua: UA;
  private localStream = null;
  private calls = [];

  private notify: ToasterService;

  private cb_create_call;
  private cb_delete_call;

  constructor() {
    console.log("Fired JadesipService.");
    this.wsock = new WebSocketInterface(this.wsuri);
    this.wsock.via_transport = "wss";
  }

  set_notify(notify) {
    this.notify = notify;
  }

  show_notification(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };

    this.notify.popAsync(toast);
  }

  set_cb_create_call(func) {
    this.set_cb_create_call = func;
  }

  set_cb_delete_Call(fund) {
    this.set_cb_delete_Call = fund;
  }

  get_calls() {
    this.delete_finished_calls();

    return this.calls;
  }

  get_call(id) {

    console.log("Fired get_call. " + id);
    for (let i = 0; i < this.calls.length; i++) {
      const call = this.calls[i];
      if (call.id === id) {
        return call;
      }
    }

    return null;
  }

  delete_finished_calls() {
    this.calls = this.calls.filter(function(c) {
      return c.status !== 'finished';
    });
  }


  login_phone(uri: string, password: string) {
    console.log("Fired login_phone. uri: " + uri, ", password: " + password);

    const config = {
      sockets: [this.wsock],
      uri: uri,
      password: password,
      autoConnect: false,
      register: true,
      register_expires: 600,
      session_timers: true,
      connection_recovery_min_interval: 2,
      connection_recovery_max_interval: 30,
      registrar_server: '',
      no_answer_timeout: 60,
      use_preloaded_route: false,
      hack_via_tcp: false,
      hack_via_ws: false,
      hack_ip_in_contact: false,

      user_agent: 'jade_agent-0.0.1'
    }

    const ua = new UA(config);
    ua.on('connected', (e) => this.on_connected(e));
    ua.on('disconnected', (e) => this.on_disconnected(e));
    ua.on('newMessage', (e) => this.on_newmessage(e));
    ua.on('newRTCSession', (e) => this.on_newrtcsession(e));
    ua.on('registered', (e) => this.on_registered(e));
    ua.on('registrationFailed', (e) => this.on_registrationfailed(e));
    ua.on('registrationExpiring', (e) => this.on_registrationexpiring(e));
    ua.on('unregistered', (e) => this.on_unregistered(e));

    ua.start();
    this.ua = ua;
  }

  originate(destination: string) {
    console.log("Fired originate. destination:" + destination);
    this.ua.call(
      destination,
      {
        mediaConstraints: {'audio': true, 'video': false },
        rtcOfferConstraints: { offerToReceiveAudio: 1, offerToReceiveVideo: 0 }
      }
    );
  }

  private on_connected(e) {
    console.log("Fired on_connected");
    this.show_notification('info', 'Phone connected', 'Your phone has been connected to the server.');
  }

  private on_disconnected(e) {
    console.log("Fired on_disconnected");
  }

  private on_newmessage(e) {
    console.log("Fired on_newmessage.");
    this.show_notification('info', 'Message', "You've got a message.");
  }

  private on_newrtcsession(e) {
    console.log("Fired on_newrtcsession.");
    this.show_notification('info', "Call", 'Someone calling you.');

    const call = new Call(e.session);

    this.calls.push(call);
  }

  private on_registered(e) {
    console.log("Fired on_registered.");
    this.show_notification('info', "Phone registered", 'Your phone has been registered.');

  }

  private on_unregistered(e) {
    console.log("Fired on_unregistered.");
    this.show_notification('info', "Phone unregistered", 'Your phone has been unregistered.');

  }

  private on_registrationfailed(e) {
    console.log("Fired on_registrationfailed.");
  }

  private on_registrationexpiring(e) {
    console.log("Fired on_registrationexpiring.");
  }

}


