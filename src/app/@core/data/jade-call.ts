
import { UA, WebSocketInterface, RTCSession } from 'jssip';

export class Call {
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
