import { Component, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { JadeService } from '../../@core/data/jade.service';

@Component({
  selector: 'ngx-app-phone',
  templateUrl: './phone.component.html',
//   styleUrls: ['./pon.component.scss'],
})
export class PhoneComponent implements AfterViewInit {

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

  ngAfterViewInit() {
  }

  onRowSelect(event): void {
  }

  onDeleteConfirm(event): void {
  }
}
