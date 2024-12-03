import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrmComponent } from './crm.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ActivitiesComponent } from './activities/activities.component';

const routes: Routes = [
  {
    path: '',
    component: CrmComponent,
    children: [
      { path: 'pipeline', component: PipelineComponent },
      {
        path: 'deals',
        loadChildren: () =>
          import('./deals/deals.module').then((m) => m.DealsModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },
      { path: 'analytics', component: AnalyticsComponent },
      {
        path: 'leads',
        loadChildren: () =>
          import('../crm/leads/leads.module').then((m) => m.LeadsModule),
      },
      {
        path: 'leads',
        loadChildren: () =>
          import('../crm/leads/leads.module').then((m) => m.LeadsModule),
      },
      {
        path: 'activities',
        component: ActivitiesComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
