import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentOrderRoutingModule } from './payment-order-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentOrderListComponent } from './payment-order-list/payment-order-list.component';
import { PaymentOrderLinesComponent } from './payment-order-lines/payment-order-lines.component';
import { PaymentOrderComponent } from './payment-order.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    PaymentOrderComponent,
    PaymentOrderListComponent,
    PaymentOrderLinesComponent,
  ],
  imports: [
    CommonModule,
    PaymentOrderRoutingModule,
    SharedModule,
  ],
  providers: [
    MessageService
  ]
})
export class PaymentOrderModule { }
