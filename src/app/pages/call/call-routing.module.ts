
import { CallComponent } from './call.component';

import { ThemeModule } from './../../@theme/theme.module';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const routes: Routes = [{
  path: '',
  component: CallComponent,
}];

const routedComponents = [
  CallComponent,
]

@NgModule({
  imports: [
    ThemeModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
  ],
  exports: [RouterModule],
  providers: [
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class CallRoutingModule { }
