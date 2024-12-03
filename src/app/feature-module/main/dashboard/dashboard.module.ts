import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DealsDashboardComponent } from './deals-dashboard/deals-dashboard.component';
import { LeadsDashboardComponent } from './leads-dashboard/leads-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    DealsDashboardComponent,
    LeadsDashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    SharedModule,
  ],
})
export class DashboardModule {}
