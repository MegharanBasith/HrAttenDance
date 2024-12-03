import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipelineComponent } from './pipeline/pipeline.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ActivitiesComponent } from './activities/activities.component';


@NgModule({
  declarations: [
    CrmComponent,
    PipelineComponent,
    AnalyticsComponent,
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    SharedModule
  ]
})
export class CrmModule { }
