import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { UA, WebSocketInterface, RTCSession } from 'jssip';
import 'rxjs/add/operator/map';
import {Observable, Subscriber} from 'rxjs/Rx';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { NotificationsService } from './notifications.service';

@Injectable()
export class JadesipService {
  private wsuri: string = 'wss://' + window.location.hostname + ':8089/ws';
  private wsock: WebSocketInterface;

  // private phones: Array<UA>;
  private ua: UA;
  private localStream = null;
  private calls = [];

  constructor(private notification: NotificationsService) {
    console.log("Fired JadesipService.");
    // this.phones = [];

    this.wsock = new WebSocketInterface(this.wsuri);
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
      hack_ip_in_contact: false
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

    // ua.on('accepted', (e) => this.on_accepted(e));
    // ua.on('connected', (e) => this.on_connected(e));
    // ua.on('connecting', (e) => this.on_connecting(e));
    // ua.on('disconnected', (e) => this.on_disconnected(e));
    // ua.on('ended', (e) => this.on_ended(e));
    // ua.on('failed', (e) => this.on_failed(e));
    // ua.on('hold', (e) => this.on_hold(e));
    // ua.on('newDTMF', (e) => this.on_newdtmf(e));
    // ua.on('newRTCSession', (e) => this.on_newrtcsession(e));
    // ua.on('progress', (e) => this.on_progress(e));
    // ua.on('registered', (e) => this.on_registered(e));
    // ua.on('unregistered', (e) => this.on_unregistered(e));
    // ua.on('unhold', (e) => this.on_unhold(e));
    // ua.on('update', (e) => this.on_update(e));


    ua.start();
    this.ua = ua;

    // this.phones.push(ua);
  }


  private on_connected(e) {
    console.log("Fired on_connected");
    this.notification.showToast('info', 'hi', 'hihi');
  }

  private on_disconnected(e) {
    console.log("Fired on_disconnected");
  }

  private on_newmessage(e) {
    console.log("Fired on_newmessage.");
  }

  private on_newrtcsession(e) {
    console.log("Fired on_newrtcsession.");
    const call = new Call(e.session);

    this.calls.push(call);
  }

  private on_registered(e) {
    console.log("Fired on_registered.");
  }

  private on_unregistered(e) {
    console.log("Fired on_unregistered.");
  }

  private on_registrationfailed(e) {
    console.log("Fired on_registrationfailed.");
  }

  private on_registrationexpiring(e) {
    console.log("Fired on_registrationexpiring.");
  }

}


class Call {
  private session: RTCSession;

  private type: string;
  private id: string;
  private target: string;
  private username: string;
  private date: string;
  private status: string;
  private duration: string;

  private localStream = null;

  constructor(session) {
    this.set_session(session);
  }

  print_info() {
    console.log("type: " + this.type);
    console.log("id: " + this.id);
    console.log("target: " + this.target);
    console.log("username: " + this.username);
    console.log("status: " + this.status);
  }

  set_session(session) {
    this.session = session;
    this.type =  this.session.direction === "incoming" ? 'IN' : 'OUT';
    this.id = this.session.id;
    this.target = this.session.remote_identity.uri.user;
    this.username = this.session.remote_identity.display_name || '';
    this.status = 'ringing';
    this.duration = '';

    session.on('accepted', (e) => this.on_accepted(e));
    session.on('connecting', (e) => this.on_connecting(e));
    session.on('ended', (e) => this.on_ended(e));
    session.on('failed', (e) => this.on_failed(e));
    session.on('hold', (e) => this.on_hold(e));
    session.on('newDTMF', (e) => this.on_newdtmf(e));
    session.on('progress', (e) => this.on_progress(e));
    session.on('unhold', (e) => this.on_unhold(e));
    session.on('update', (e) => this.on_update(e));

    if (this.type === 'IN') {
      // this.$state.go('calls');
    }

    this.print_info()
    this.call_answer();
  }

  private on_accepted(e) {
    console.log("Fired on_accepted.");

    this.status = 'active';

    if (this.session.connection.getLocalStreams().length > 0) {
      this.localStream = this.session.connection.getLocalStreams()[0];
    }

    if (e.originator === 'remote') {
      if (e.response.getHeader('X-Can-Renegotiate') === 'false') {
        this.session.data.remoteCanRenegotiateRTC = false;
      }
      else {
        this.session.data.remoteCanRenegotiateRTC = true;
      }
    }
  }

  call_answer() {
    this.session.answer();
  }

  call_hold() {
    this.session.hold();
  }

  call_unhold() {
    this.session.unhold();
  }


  private on_connecting(e) {
    console.log("Fired on_connecting");
  }

  private on_ended(e) {
    console.log("Fired on_ended.");
  }

  private on_failed(e) {
    console.log("Fired on_failed.");
  }

  private on_hold(e) {
    console.log("Fired on_hold.");
  }

  private on_newdtmf(e) {
    console.log("Fired on_newdtmf.");
  }

  private on_progress(e) {
    console.log("Fired on_progress.");
  }

  private on_unhold(e) {
    console.log("Fired on_unhold.");
  }

  private on_update(e) {
    console.log("Fired on_update.");
  }

}
