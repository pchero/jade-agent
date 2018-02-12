import { Component } from '@angular/core';
import { JadeService } from '../../@core/data/jade.service';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private service: JadeService) {
  }
}
