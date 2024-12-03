import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { createLoanModel } from '../../models/loan/createLoan-model';
import { adjustLoanModel } from '../../models/loan/adjustLoan-model';
import { LoanStopPeriodModel } from '../../models/loan/LoanStopPeriod-model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private apiCallerService: ApiCallerService) { }

  getLoanList(payGroupId: string , pageStartPosition : number, pageSize : number) {
    const params = { pageStartPosition , pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.loan.list + payGroupId, params);
  }

  getLoanOtherTypesList(payGroupId: string , pageStartPosition : number, pageSize : number) {
    const params = { pageStartPosition , pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.loan.otherTypeslist + payGroupId, params);
  }

  getLoanInstallmentList(loanId: string , pageStartPosition : number, pageSize : number) {
    const params = { pageStartPosition , pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.loan.installmentList + loanId, params);
  }

  getLoanDetails(loanId: string) {
    return this.apiCallerService.get(environment.baseUrl, environment.loan.details + loanId);
  }

  deleteLoan(loanId:string) {
    return this.apiCallerService.delete(environment.baseUrl, environment.loan.delete + loanId);
  }

  updateLoan(loanId: string, model: any) {
    return this.apiCallerService.put(environment.baseUrl, environment.loan.update + loanId, model);
  }

  createLoan(model: createLoanModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.loan.create, model);
  }


  holdLoan(loanId:string) {
    return this.apiCallerService.get(environment.baseUrl, environment.loan.hold + loanId);
  }

  adjustLoan(model:adjustLoanModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.loan.adjust ,model);
  }

  submitLoan(loanId:string) {
    return this.apiCallerService.get(environment.baseUrl, environment.loan.submit + loanId);
  }

  createLoanStopPeriod(model: LoanStopPeriodModel) {
    debugger;
    return this.apiCallerService.post(environment.baseUrl, environment.loan.CreateLoanStop, model);
  }

  deleteLoanStopPeriod(loanId:string,version:number) {
    return this.apiCallerService.delete(environment.baseUrl, environment.loan.DeleteLoanStop + loanId+'/'+version);
  }

  LoanStopPeriodDetails(loanId:string,version:number) {
    return this.apiCallerService.get(environment.baseUrl, environment.loan.GetLoanStopDetails + loanId+'/'+version);
  }

  LoanStopPeriodList(loanId:string,pageStartPosition : number, pageSize : number) {
    const params = { pageStartPosition , pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.loan.GetLoanStopList + loanId,params);
  }

  submitLoanStopPeriod(loanId:string,version:number) {
    return this.apiCallerService.get(environment.baseUrl, environment.loan.SubmitLoanStop + loanId+'/'+version);
  }

}
