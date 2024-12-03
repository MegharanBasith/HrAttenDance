import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './goals.component';
import { GoalTrackingComponent } from './goal-tracking/goal-tracking.component';
import { GoalTypeComponent } from './goal-type/goal-type.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GoalsComponent,
    GoalTrackingComponent,
    GoalTypeComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    SharedModule
  ]
})
export class GoalsModule { }
