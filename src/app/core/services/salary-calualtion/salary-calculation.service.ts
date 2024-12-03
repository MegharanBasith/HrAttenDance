import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ApiCallerService } from '../api-caller/api-caller.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryCalculationService {

  constructor(private apiCallerService: ApiCallerService) { }

  getSalaryCalculationList(payGroupId : string, startIndex : number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(environment.baseUrl, environment.salaryCalculation.list + '/' + payGroupId, params);
  }

  getSalaryCalculationLineList(id : string, startIndex : number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(environment.baseUrl, environment.salaryCalculation.lines + '/' + id, params);
  }

  getSalaryCalculationById(id : string) {
    const params = {id};
    return this.apiCallerService.get(environment.baseUrl, environment.salaryCalculation.details + id);
  }

  initiateNewSalaryCalculation(payGroupId : string) {
    return this.apiCallerService.post(environment.baseUrl, environment.salaryCalculation.initiate, {"PayGroupId": payGroupId});
  }

  CreateSalaryCalculation(id: string, payGroupId : string, processSalaryCalculationType : number, employeeList: any[]) {
    let model = {
      "SalaryCalculationId" : id,
      "PayGroupId": payGroupId,
      "ProcessSalaryCalculationType": processSalaryCalculationType,
      "EmployeeList" : employeeList
    };
    return this.apiCallerService.post(environment.baseUrl, environment.salaryCalculation.create, model);
  }

  processSalaryCalculation(id : string) {
    return this.apiCallerService.post(environment.baseUrl, environment.salaryCalculation.process, {"SalaryCalculationId" : id});
  }

  deleteSalaryCalculation(id : string) {
    return this.apiCallerService.delete(environment.baseUrl, environment.salaryCalculation.delete + id);
  }

  deleteSalaryCalculationLines(id: string, salaryCalculationLines: any[]){
    return this.apiCallerService.post(environment.baseUrl, environment.salaryCalculation.deleteLines.replace('{id}', id), {SalaryCalculationLines: salaryCalculationLines});
  }

  getApprovedNotPaidSalaryCalculationList(payGroupId : string, startIndex : number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(environment.baseUrl, environment.salaryCalculation.approvedNotPaidList + payGroupId, params);
  }

  recalculateSalaryCalculation(payGroupId : string, salaryCalculationId : string) {
    return this.apiCallerService.post(environment.baseUrl, environment.salaryCalculation.recalculate, {"PayGroupId": payGroupId, "SalaryCalculationId" : salaryCalculationId});
  }
   
  approveSalaryCalculation(salaryCalculationId : string){
    return this.apiCallerService.post(environment.baseUrl, environment.salaryCalculation.approve, {"SalaryCalculationId" : salaryCalculationId});
  }

}
