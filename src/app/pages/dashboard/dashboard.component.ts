import { Component } from '@angular/core';
import { JadeService } from '../../@core/data/jade.service';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private user_info: any;

  constructor(private service: JadeService) {
    this.user_info = this.service.init_userinfo();
  }
}
