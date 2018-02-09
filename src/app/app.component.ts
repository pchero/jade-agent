/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { JadeService } from './@core/data/jade.service';
import { JadertcService } from './@core/data/jadertc.service';

import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    private jadertcService: JadertcService,
    private jadeService: JadeService,
  ) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
