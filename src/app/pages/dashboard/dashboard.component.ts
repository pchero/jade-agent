import { Component } from '@angular/core';
import { JadeService } from '../../@core/data/jade.service';
import { JadeUserService } from '../../@core/data/jade-user.service';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private user_info: any;

  constructor(private service: JadeService, private user: JadeUserService) {
    this.user_info = this.user.get_userinfo();
  }
}
