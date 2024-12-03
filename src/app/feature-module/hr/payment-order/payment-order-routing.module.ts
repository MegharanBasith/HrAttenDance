import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentOrderListComponent } from './payment-order-list/payment-order-list.component';
import { PaymentOrderLinesComponent } from './payment-order-lines/payment-order-lines.component';
import { PaymentOrderComponent } from './payment-order.component';

const routes: Routes = [
  { 
    path: '', 
    component: PaymentOrderComponent,
    children: [ 
      { path: "list", component: PaymentOrderListComponent },
      { path: "lines", component: PaymentOrderLinesComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentOrderRoutingModule { }
