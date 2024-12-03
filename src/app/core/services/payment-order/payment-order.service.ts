import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';
import { CreatePaymentOrderModel } from '../../models/payment-order/create-payment-order-model';
import { WPSPaymentOrderModel } from '../../models/payment-order/wps-payment-order-model';
import { PaymentOrderLine } from '../../models/payment-order/delete-paymet-order-line';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderService {

  constructor(private apiCallerService: ApiCallerService) { }

  getPaymentOrderList(payGroupId : string, startIndex : number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(environment.baseUrl, environment.paymentOrder.list + '/' + payGroupId, params);
  }

  getPaymentOrderLineList(id : number, startIndex : number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(environment.baseUrl, environment.paymentOrder.lines + '/' + id, params);
  }

  createPaymentOrder(model : CreatePaymentOrderModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.paymentOrder.create, model);
  }

  genertePaymentOrderWPS(model : WPSPaymentOrderModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.paymentOrder.generateWPS, model);
  }

  deletePaymentOrder(id: string){
    return this.apiCallerService.delete(environment.baseUrl, environment.paymentOrder.delete + id);
  }

  deletePaymentOrderLines(id: string, paymentOrderLines: PaymentOrderLine[]){
    return this.apiCallerService.post(environment.baseUrl, environment.paymentOrder.deleteLines.replace('{id}', id), {PaymentOrderLines: paymentOrderLines});
  }

  submitPaymentOrder(id: string){
    return this.apiCallerService.post(environment.baseUrl, environment.paymentOrder.submit, {"PaymentOrderID": id});
  }

  getBankAccountList(startIndex : number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(environment.baseUrl, environment.paymentOrder.bankAccountList, params);
  }

  setPaymentOrderLinePaid(model: any){
    return this.apiCallerService.post(environment.baseUrl, environment.paymentOrder.setPaid, model);
  }

  setPaymentOrderLineFailed(model: any){
    return this.apiCallerService.post(environment.baseUrl, environment.paymentOrder.setFailed, model);
  }

  settlePaymentOrderLines(paymentOrderId : string){
    return this.apiCallerService.post(environment.baseUrl, environment.paymentOrder.settle, {"PaymentOrderID": paymentOrderId});
  }
}
