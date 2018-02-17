import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b>pchero</b> 2018</span>
    <div class="socials">
      <a href="https://github.com/pchero" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/sungtae-kim-41305171/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
