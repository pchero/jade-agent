
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable, Subscriber} from 'rxjs/Rx';

@Injectable()
export class JadertcService {
  private sTransferNumber;
  private oRingTone;
  private oRingbackTone;
  private oSipStack;
  private oSipSessionRegister;
  private oSipSessionCall;
  private oSipSessionTransferCall;
  private videoRemote;
  private videoLocal;
  private audioRemote;
  private bFullScreen = false;
  private oNotifICall;
  private bDisableVideo = false;
  private viewVideoLocal;
  private viewVideoRemote;
  private viewLocalScreencast; // <video> (webrtc) or <div> (webrtc4all)
  private oConfigCall;
  private oReadyStateTimer;



  constructor() {
    console.log("Fired JadertcService.");

    SIPml.setDebugLevel("info");
  }

  OnInit() {
    console.log('Fired jadertc OnInit.');
  }

  PostInit() {
    // check for WebRTC support
    if (!SIPml.isWebRtcSupported()) {
      // is it chrome?
      if (SIPml.getNavigatorFriendlyName() === 'chrome') {
        if (confirm("You're using an old Chrome version or WebRTC is not enabled.\nDo you want to see how to enable WebRTC?")) {
          // window.location = 'http://www.webrtc.org/running-the-demos';
        }
        else {
          // window.location = "index.html";
        }
        return;
      } else {
        if (confirm("webrtc-everywhere extension is not installed. Do you want to install it?\nIMPORTANT: You must restart your browser after the installation.")) {
          // window.location = 'https://github.com/sarandogou/webrtc-everywhere';
        }
        else {
          // Must do nothing: give the user the chance to accept the extension
          // window.location = "index.html";
        }
      }
    }
    // checks for WebSocket support
    if (!SIPml.isWebSocketSupported()) {
      if (confirm('Your browser don\'t support WebSockets.\nDo you want to download a WebSocket-capable browser?')) {
        // window.location = 'https://www.google.com/intl/en/chrome/browser/';
      }
      else {
        // window.location = "index.html";
      }
        return;
    }

    // FIXME: displays must be per session
    this.viewVideoLocal = this.videoLocal;
    this.viewVideoRemote = this.videoRemote;
    if (!SIPml.isWebRtcSupported()) {
      if (confirm('Your browser don\'t support WebRTC.\naudio/video calls will be disabled.\nDo you want to download a WebRTC-capable browser?')) {
        // window.location = 'https://www.google.com/intl/en/chrome/browser/';
      }
    }
    // btnRegister.disabled = false;
    // document.body.style.cursor = 'default';
    this.oConfigCall = {
      audio_remote: this.audioRemote,
      video_local: this.viewVideoLocal,
      video_remote: this.viewVideoRemote,
      screencast_window_id: 0x00000000, // entire desktop
      bandwidth: { audio: undefined, video: undefined },
      video_size: { minWidth: undefined, minHeight: undefined, maxWidth: undefined, maxHeight: undefined },
      events_listener: { events: '*', listener: this.onSipEventSession },
      sip_caps: [
        { name: '+g.oma.sip-im' },
        { name: 'language', value: '\"en,fr\"' }
      ]
    };
  }


  // Callback function for SIP sessions (INVITE, REGISTER, MESSAGE...)
  onSipEventSession(e /* SIPml.Session.Event */) {
    console.log('==session event = ' + e.type);
    console.log('Check value. type: ' + e.type);
    switch (e.type) {
      case 'connecting': case 'connected': {
        // var bConnected = (e.type === 'connected');
        // // if (e.session == oSipSessionRegister) {
        // //     uiOnConnectionEvent(bConnected, !bConnected);
        // //     // txtRegStatus.innerHTML = "<i>" + e.description + "</i>";
        // // }
        // else if (e.session == oSipSessionCall) {
        //     btnHangUp.value = 'HangUp';
        //     btnCall.disabled = true;
        //     btnHangUp.disabled = false;
        //     btnTransfer.disabled = false;
        //     if (window.btnBFCP) window.btnBFCP.disabled = false;
        //     if (bConnected) {
        //         stopRingbackTone();
        //         stopRingTone();
        //         if (oNotifICall) {
        //             oNotifICall.cancel();
        //             oNotifICall = null;
        //         }
        //     }
        //     txtCallStatus.innerHTML = "<i>" + e.description + "</i>";
        //     divCallOptions.style.opacity = bConnected ? 1 : 0;
        //     if (SIPml.isWebRtc4AllSupported()) { // IE don't provide stream callback
        //         uiVideoDisplayEvent(false, true);
        //         uiVideoDisplayEvent(true, true);
        //     }
        // }
      } // 'connecting' | 'connected'
      break;

      case 'terminating': case 'terminated': {
        // if (e.session == oSipSessionRegister) {
        //     uiOnConnectionEvent(false, false);
        //     oSipSessionCall = null;
        //     oSipSessionRegister = null;
        //     // txtRegStatus.innerHTML = "<i>" + e.description + "</i>";
        // }
        // else if (e.session == oSipSessionCall) {
        //     uiCallTerminated(e.description);
        // }
      } // 'terminating' | 'terminated'
      break;

      case 'm_stream_video_local_added': {
        // if (e.session == oSipSessionCall) {
        //   uiVideoDisplayEvent(true, true);
        // }
      }
      break;

      case 'm_stream_video_local_removed': {
        // if (e.session == oSipSessionCall) {
        //   uiVideoDisplayEvent(true, false);
        // }
      }
      break;

      case 'm_stream_video_remote_added': {
        // if (e.session == oSipSessionCall) {
        //   uiVideoDisplayEvent(false, true);
        // }
      }
      break;

      case 'm_stream_video_remote_removed': {
        // if (e.session == oSipSessionCall) {
        //     uiVideoDisplayEvent(false, false);
        // }
      }
      break;

      case 'm_stream_audio_local_added':
      case 'm_stream_audio_local_removed':
      case 'm_stream_audio_remote_added':
      case 'm_stream_audio_remote_removed':
      {
        // do nothing
      }
      break;

      case 'i_ect_new_call':
      {
        // oSipSessionTransferCall = e.session;
      }
      break;

      case 'i_ao_request':
      {
        // if (e.session == oSipSessionCall) {
        //   var iSipResponseCode = e.getSipResponseCode();
        //   if (iSipResponseCode == 180 || iSipResponseCode == 183) {
        //     startRingbackTone();
        //     txtCallStatus.innerHTML = '<i>Remote ringing...</i>';
        //   }
        // }
      }
      break;

      case 'm_early_media':
      {
        // if (e.session == oSipSessionCall) {
        //   stopRingbackTone();
        //   stopRingTone();
        //   txtCallStatus.innerHTML = '<i>Early media started</i>';
        // }
      }
      break;

      case 'm_local_hold_ok':
      {
        // if (e.session == oSipSessionCall) {
        //   if (oSipSessionCall.bTransfering) {
        //     oSipSessionCall.bTransfering = false;
        //     // this.AVSession.TransferCall(this.transferUri);
        //   }
        //   btnHoldResume.value = 'Resume';
        //   btnHoldResume.disabled = false;
        //   txtCallStatus.innerHTML = '<i>Call placed on hold</i>';
        //   oSipSessionCall.bHeld = true;
        // }
      }
      break;

      case 'm_local_hold_nok':
      {
        // if (e.session == oSipSessionCall) {
        //   oSipSessionCall.bTransfering = false;
        //   btnHoldResume.value = 'Hold';
        //   btnHoldResume.disabled = false;
        //   txtCallStatus.innerHTML = '<i>Failed to place remote party on hold</i>';
        // }
      }
      break;

      case 'm_local_resume_ok':
      {
        // if (e.session == oSipSessionCall) {
        //   oSipSessionCall.bTransfering = false;
        //   btnHoldResume.value = 'Hold';
        //   btnHoldResume.disabled = false;
        //   txtCallStatus.innerHTML = '<i>Call taken off hold</i>';
        //   oSipSessionCall.bHeld = false;
        //   if (SIPml.isWebRtc4AllSupported()) { // IE don't provide stream callback yet
        //     uiVideoDisplayEvent(false, true);
        //     uiVideoDisplayEvent(true, true);
        //   }
        // }
      }
      break;

      case 'm_local_resume_nok':
      {
        // if (e.session == oSipSessionCall) {
        //   oSipSessionCall.bTransfering = false;
        //   btnHoldResume.disabled = false;
        //   txtCallStatus.innerHTML = '<i>Failed to unhold call</i>';
        // }
      }
      break;

      case 'm_remote_hold':
      {
        // if (e.session == oSipSessionCall) {
        //   txtCallStatus.innerHTML = '<i>Placed on hold by remote party</i>';
        // }
      }
      break;

      case 'm_remote_resume':
      {
        // if (e.session == oSipSessionCall) {
        //   txtCallStatus.innerHTML = '<i>Taken off hold by remote party</i>';
        // }
      }
      break;

      case 'm_bfcp_info':
      {
        // if (e.session == oSipSessionCall) {
        //   txtCallStatus.innerHTML = 'BFCP Info: <i>' + e.description + '</i>';
        // }
      }
      break;

      case 'o_ect_trying':
      {
        // if (e.session == oSipSessionCall) {
        //   txtCallStatus.innerHTML = '<i>Call transfer in progress...</i>';
        // }
      }
      break;

      case 'o_ect_accepted':
      {
        // if (e.session == oSipSessionCall) {
        //     txtCallStatus.innerHTML = '<i>Call transfer accepted</i>';
        // }
      }
      break;

      case 'o_ect_completed':
      case 'i_ect_completed':
      {
        // if (e.session == oSipSessionCall) {
        //   txtCallStatus.innerHTML = '<i>Call transfer completed</i>';
        //   btnTransfer.disabled = false;
        //   if (oSipSessionTransferCall) {
        //     oSipSessionCall = oSipSessionTransferCall;
        //   }
        //   oSipSessionTransferCall = null;
        // }
      }
      break;

      case 'o_ect_failed':
      case 'i_ect_failed':
      {
        // if (e.session == oSipSessionCall) {
        //   txtCallStatus.innerHTML = '<i>Call transfer failed</i>';
        //   btnTransfer.disabled = false;
        // }
      }
      break;

      case 'o_ect_notify':
      case 'i_ect_notify':
      {
        // if (e.session == oSipSessionCall) {
        //   txtCallStatus.innerHTML = "<i>Call Transfer: <b>" + e.getSipResponseCode() + " " + e.description + "</b></i>";
        //   if (e.getSipResponseCode() >= 300) {
        //     if (oSipSessionCall.bHeld) {
        //       oSipSessionCall.resume();
        //     }
        //     btnTransfer.disabled = false;
        //   }
        // }
      }
      break;

      case 'i_ect_requested':
      {
        // if (e.session == oSipSessionCall) {
        //   var s_message = "Do you accept call transfer to [" + e.getTransferDestinationFriendlyName() + "]?";//FIXME
        //   if (confirm(s_message)) {
        //     txtCallStatus.innerHTML = "<i>Call transfer in progress...</i>";
        //     oSipSessionCall.acceptTransfer();
        //     break;
        //   }
        //   oSipSessionCall.rejectTransfer();
        // }
      }
      break;
    }
  }

    // sends SIP REGISTER request to login
  sipRegister(
    realm,
    impi,
    impu,
    password,
    display_name,
    websocket_proxy_url,
    outbound_proxy_url,
    ice_servers,
    enable_rtcweb_breaker,
    events_listener,
    enable_early_ims,
    enable_media_stream_cache,
    bandwidth,
    video_size,
    // sip_headers,
  ) {
    // catch exception for IE (DOM not ready)
    try {
      console.log('Fired sipRegister.');

      // update debug level to be sure new values will be used if the user haven't updated the page
      SIPml.setDebugLevel((window.localStorage && window.localStorage.getItem('org.doubango.expert.disable_debug') == "true") ? "error" : "info");
      // create SIP stack
      this.oSipStack = new SIPml.Stack({
        realm: realm,
        impi: impi,
        impu: impu,
        password: password,
        display_name: display_name,
        websocket_proxy_url: websocket_proxy_url,
        outbound_proxy_url: outbound_proxy_url,
        ice_servers: ice_servers,
        enable_rtcweb_breaker: enable_rtcweb_breaker,
        events_listener: events_listener,
        enable_early_ims: enable_early_ims,
        enable_media_stream_cache: enable_media_stream_cache,
        bandwidth: bandwidth,
        video_size: video_size,
        sip_headers: [
          { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2016.03.04' },
          { name: 'Organization', value: 'Doubango Telecom' }
        ],
      });
      if (this.oSipStack.start() !== 0) {
        console.log('Could not start sipStack.');
      }
      else {
        return;
      }
    }
    catch (e) {
      console.log('Error. ' + e);
    }
  }

}


