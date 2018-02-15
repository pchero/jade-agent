
import { UA, WebSocketInterface, RTCSession } from 'jssip';

export class Call {
  session: RTCSession;

  private type: string;
  private id: string;
  private target: string;
  private username: string;
  private date: string;
  private status: string;
  private duration: string;

  private from: string;
  private to: string;

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

    if (this.type === 'IN') {
      this.from = this.session.remote_identity.uri.user;
      this.to = this.session.local_identity.uri.user;
      // this.to = 'me';
    }
    else if (this.type === 'OUT') {
      this.from = this.session.local_identity.uri.user;
      this.to = this.session.remote_identity.uri.user;
    }

    session.on('addstream', (e) => this.on_addstream(e));
    session.on('addtrack', (e) => this.on_addstream(e));
    session.on('accepted', (e) => this.on_accepted(e));
    session.on('connecting', (e) => this.on_connecting(e));
    session.on('ended', (e) => this.on_ended(e));
    session.on('failed', (e) => this.on_failed(e));
    session.on('hold', (e) => this.on_hold(e));
    session.on('newDTMF', (e) => this.on_newdtmf(e));
    session.on('progress', (e) => this.on_progress(e));
    session.on('unhold', (e) => this.on_unhold(e));
    session.on('update', (e) => this.on_update(e));
  }

  get_session() {
    return this.session;
  }

  private on_accepted(e) {
    console.log("Fired on_accepted.");

    this.status = 'active';

    if (this.session.connection.getLocalStreams().length > 0) {
      console.log("Setting stream..");
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
    console.log("Fired call_answer.");
    this.session.answer(
      {
        mediaConstraints: {
          audio: true,
          video: false,
        }
      }
    );

    this.session.connection.ontrack = function (e) {
      console.log("Fired ontrack. " + e);
      // let audio_phone = document.getElementById('remote_sound');

      this.audio_phone = new Audio(window.URL.createObjectURL(e.streams[0]));

      // this.audio_phone.src = URL.createObjectURL(e.streams[0]);
      this.audio_phone.play();
      // console.log("Value. " + this.audio_phone.src);

      // let audio_phone = document.getElementById('remote_sound_tmp');

      // audio_phone.src = window.URL.createObjectURL(e.track);
      // audio_phone.src = window.URL.createObjectURL(e.streams[0]);
      // audio_phone.srcObject = e.streams[0];
      // audio_phone.src = URL.createObjectURL(e.streams[0]);
      // // audio_phone.src = window.elem.srcObject(e.streams[0]);
      // console.log("Check value. " + audio_phone.src);
      // audio_phone.play();
    }
  }

  call_hold() {
    this.session.hold();
  }

  call_unhold() {
    this.session.unhold();
  }

  call_terminate() {
    this.session.terminate();
  }


  private on_addstream(e) {
    const audio_phone = document.getElementById('audio_phone');
    
    audio_phone.src = window.URL.createObjectURL(e.stream);
    console.log("Check value. " + audio_phone.src);
    // audio_phone.src = e.stream;
  }

  private on_connecting(e) {
    console.log("Fired on_connecting");

    if (this.session.connection.getLocalStreams().length > 0) {
      this.localStream = this.session.connection.getLocalStreams()[0];
    }
  }

  private on_ended(e) {
    console.log("Fired on_ended.");

    this.status = 'finished';
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
