import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiAlertsRoutingModule } from './ui-alerts-routing.module';
import { UiAlertsComponent } from './ui-alerts.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UiAlertsComponent
  ],
  imports: [
    CommonModule,
    UiAlertsRoutingModule,
    SharedModule
  ]
})
export class UiAlertsModule { }
