import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { JadeUserService } from '../../../@core/data/jade-user.service';

@Component({
  selector: 'ngx-app-call-list',
  templateUrl: './list.component.html',
})
export class ListComponent {

  queues_detail: any;
  queues_detail_member: string;
  queues_create: any;
  global: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private user: JadeUserService) {
    const calls = user.get_calls();

  }

  detail_update_handler() {
  }

  detail_create_handler() {
  }

  onRowSelect(event): void {
  }

  onDeleteConfirm(event): void {
  }
}
