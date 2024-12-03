import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsComponent } from './goals.component';
import { GoalTrackingComponent } from './goal-tracking/goal-tracking.component';
import { GoalTypeComponent } from './goal-type/goal-type.component';

const routes: Routes = [
  {
    path: '',
    component: GoalsComponent,
    children: [
      {
        path: 'goal-tracking',
        component: GoalTrackingComponent,
      },
      {
        path: 'goal-type',
        component: GoalTypeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsRoutingModule {}
