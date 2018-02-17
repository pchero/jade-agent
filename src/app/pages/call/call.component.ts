import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { JadeUserService } from '../../@core/data/jade-user.service';

@Component({
  selector: 'ngx-app-call',
  templateUrl: './call.component.html',
})
export class CallComponent {
  detail: any;
  detail_call: any;
  list_source: LocalDataSource = new LocalDataSource();

  constructor(private user: JadeUserService) {

    const calls = user.get_calls();

    for (let i = 0; i < calls.length; i++) {
      const call = calls[i];
      call.print_info();
    }

    this.list_source.load(calls);
  }

  list_onRowSelect(event) {
    const detail = {
      id: event.data.id,
      local_identity: event.data.session.local_identity,
      remote_identity: event.data.session.remote_identity,
    };

    this.detail = JSON.stringify(detail, null, 2);
    this.detail_call = this.user.get_call(detail.id);
  }

  detail_bt_answer() {
    this.detail_call.call_answer();
  }

  detail_bt_hangup() {
    this.detail_call.call_terminate();
  }

  private list_settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: '',
    },
    columns: {
      type: {
        title: 'Type',
        type: 'string',
      },
      from: {
        title: 'From',
        type: 'string',
      },
      to: {
        title: 'To',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
    },
  }
}
