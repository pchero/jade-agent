import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { JadeService } from '../../@core/data/jade.service';

@Component({
  selector: 'ngx-app-call',
  templateUrl: './call.component.html',
})
export class CallComponent {

  queues_detail: any;
  queues_detail_member: string;
  queues_create: any;
  global: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: JadeService) {
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
