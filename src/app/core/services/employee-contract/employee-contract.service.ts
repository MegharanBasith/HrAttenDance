import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeContractService {

  controllerName = "employee-contracts/"
  constructor(private apiCallerService: ApiCallerService) { }


  getEmployeeContractList(projectId: string, pageStart: number, pageSize: number) {
    const params = { pageStart, pageSize };
    return this.apiCallerService.get(environment.baseUrl, this.controllerName + projectId, params);
  }

  getEmployeeContractAllowanceList(contractId: string) {
    return this.apiCallerService.get(environment.baseUrl, this.controllerName + contractId + "/allowances");
  }

  updateEmployeeContract(contractId: string) {
    return this.apiCallerService.post(environment.baseUrl, this.controllerName + "version", { "ContractId": contractId });
  }

  suspendEmployeeContract(contractId: string) {
    return this.apiCallerService.patch(environment.baseUrl, this.controllerName + contractId + "/suspend");

  }

  reactivateEmployeeContract(contractId: string) {
    return this.apiCallerService.patch(environment.baseUrl, this.controllerName + contractId + "/reactivate");
  }

  createEmployeeContractAllowance(model: any){
    return this.apiCallerService.post(environment.baseUrl, this.controllerName +  "allowance", model);

  }

  deleteEmployeeContractAllowance(contractId : string, allowanceCode: number){
    return this.apiCallerService.delete(environment.baseUrl, this.controllerName +  contractId + "/allowance/" + allowanceCode);
  }

  editEmployeeContractDetails(contractId: string, model: any){
    return this.apiCallerService.put(environment.baseUrl, this.controllerName +  contractId, model);
  }
}
