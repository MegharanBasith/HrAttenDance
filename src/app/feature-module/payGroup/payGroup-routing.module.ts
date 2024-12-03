import { Routes, RouterModule } from '@angular/router';
import { PayGroupComponent } from './payGroup.component';
import { NgModule } from '@angular/core';
import { PayGroupPeriodListComponent } from './payGroupPeriod-list/payGroupPeriod-list.component';

const routes: Routes = [
  {
  path: '',
  component: PayGroupComponent,
  children: [
    { path: "payGroupPeriod-list", component:PayGroupPeriodListComponent },

  ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class payGroupRoutingModule { }
