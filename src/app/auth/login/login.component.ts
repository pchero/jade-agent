import { Component, OnInit } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { JadeService } from '../../@core/data/jade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app-auth-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  private router: Router;

  username: string;
  password: string;

  constructor(private service: JadeService) {
    console.log('Fired LoginComponent.');
  }

  login_handler() {
    console.log('Fired login_handler. ' + this.username + ', ' + this.password);
    let ret;
    ret = this.service.login(this.username, this.password);
    console.log('Login return. ' + ret);
    if (ret === true) {
      this.router.navigate(['/pages/dashboard']);
    }
    return;
  }

}
