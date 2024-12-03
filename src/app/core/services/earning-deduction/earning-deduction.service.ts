import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EarningDeductionService {

  constructor(private apiCallerService: ApiCallerService) { }

  getEarningDeductionList(projId: string, startIndex: number, pageSize: number) {
    const params = { startIndex, pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.earningDeduction.list + projId, params);
  }

  getEarningList() {
    return this.apiCallerService.get(environment.baseUrl, environment.earningDeduction.earnings);
  }

  getDeductionList() {
    return this.apiCallerService.get(environment.baseUrl, environment.earningDeduction.deductions);
  }

  createEarningDeduction(model: any) {
    return this.apiCallerService.post(environment.baseUrl, environment.earningDeduction.create, model);
  }

  updateEarningDeduction(transId: string, model: any) {
    return this.apiCallerService.put(environment.baseUrl, environment.earningDeduction.update + transId, model);
  }

  deleteEarningDeduction(transId: string) {
    return this.apiCallerService.delete(environment.baseUrl, environment.earningDeduction.delete + transId);
  }

  submitEarningDeduction(requestId : string)
  {
    return this.apiCallerService.post(environment.baseUrl, environment.earningDeduction.submit, {"RequestId": requestId});
    }
}
