import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';
import { eosAddModel } from '../../models/eos/eosAdd-model';
import { eosEditModel } from '../../models/eos/eosEdit-model';

@Injectable({
  providedIn: 'root'
})
export class EosService {

  constructor(private apiCallerService: ApiCallerService) { }

  getEOSList(projectId: string , pageStartPosition : number, pageSize : number  ) {
    const params = { pageStartPosition , pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.eos.getEOSList + projectId, params);
  }
  addEos(model : eosAddModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.eos.addEOS, model);
  }
  deleteEos(id:string) {
    return this.apiCallerService.delete(environment.baseUrl, environment.eos.deleteEOS + id);
  }

  editEos(id: string, model: eosEditModel) {
    return this.apiCallerService.put(environment.baseUrl, environment.eos.editEOS + id, model);
  }
  
  getEarnDeductTransList(id : string){
    return this.apiCallerService.get(environment.baseUrl, environment.eos.getEarnDeductTransList + id);
  }

  createEarningDeductionTrans(model : any){
    return this.apiCallerService.post(environment.baseUrl, environment.eos.createEarnDeductTrans, model);
  }

  deleteEarnDeductionTrans(eosRequestId:string, lineNumber : number) {
    return this.apiCallerService.post(environment.baseUrl, environment.eos.deleteEarnDeductTrans, {"requestId": eosRequestId, "LineNum": lineNumber});
  }

  getUnpaidSalaryList(eosRequestId : string) {
    return this.apiCallerService.get(environment.baseUrl, environment.eos.unpaidSalaryList + eosRequestId);
  }

  calculate(eosRequestId : string) {
    return this.apiCallerService.post(environment.baseUrl, environment.eos.calculate, {"RequestId" : eosRequestId});
  }

  addEosCalculateRequest(eosRequestId : string, employeeId : string) {
    return this.apiCallerService.post(environment.baseUrl, environment.eos.addEosCalculateRequest, {"RequestId" : eosRequestId, "EmployeeId" : employeeId});
  }

  submitEos(id: string){
    return this.apiCallerService.post(environment.baseUrl, environment.eos.submit, {"RequestId": id});
  }

}
