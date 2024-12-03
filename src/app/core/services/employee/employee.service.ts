import { inject, Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';
import { Employee } from '../../models/employee/employee';
import { HttpClient } from '@angular/common/http';
import { I_Location } from 'src/app/feature-module/employee/employees/attendance/my-location/Interface.components';
import { I_locationforEmployee } from 'src/app/feature-module/employee/employees/attendance/all-location/locationforemployee';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 baseUrl:string = environment.baseUrl;
//  dmbaseUrl:string=environment.dmbaseUrl;
 http = inject(HttpClient);
  constructor(private apiCallerService : ApiCallerService) { }
 
  createEmployeeWithContract(employee : Employee) {
    return this.apiCallerService.post(this.baseUrl, environment.employee.createWorkerWithContract, employee);
  }
 
  getEmployeeById(id : string) {
    return this.apiCallerService.get(this.baseUrl, environment.employee.getEmployeeById + id);
  }
 
  getAllEmployees(projId : string, startIndex: number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(this.baseUrl, environment.employee.getAllEmployees + projId, params);
  }
 
  getActiveEmployees(projId : string, startIndex: number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(this.baseUrl, environment.employee.getActiveEmployees + projId, params);
  }

  updateEmployeeDetails(model : any){
    return this.apiCallerService.put(this.baseUrl, environment.employee.update, model); 
  }

  getEmployeeDocumentList(projId : string, empId : string, pageStartPosition: number, pageSize : number) {
    const params = {pageStartPosition, pageSize};
    return this.apiCallerService.get(this.baseUrl, "employees/" + projId + "/" + empId + "/documents", params);
  }

  
  punchIn(customerId:string,employeeId:string){
    let endpoint='punch-in'
    let obj = {
      customerId: customerId,
      employeeERBId: employeeId,
      location: "web",
      distance: 0
    }
    return this.apiCallerService.post(this.baseUrl,environment.employee.Attendance+endpoint,obj)
   }
   punchOut(customerId:string,employeeId:string){
    let endpoint='punch-out';
    let obj = {
      customerId: customerId,
      employeeERBId: employeeId,
      location: "web",
      distance: 0
    }
    return this.apiCallerService.post(this.baseUrl,environment.employee.Attendance+endpoint,obj)
   }
getAttList(year:number,month:number,employeeId?:string,customerId?:string){
  let endpoint=`Attendance?year=${year}&month=${month}`
  if(employeeId && employeeId != ''){
    endpoint = endpoint+`&employeeERBId=${employeeId}`
  }
  if(customerId && customerId != ''){
    endpoint = endpoint+`&customerId=${customerId}`
  }
  return this.apiCallerService.get(this.baseUrl,endpoint)
}
punchstatus(employeeId:string){
  let endpoint='Attendance/punch-status?employeeERBId='+employeeId
  return this.apiCallerService.get(this.baseUrl,endpoint,null)
}
getPunchActivity(employeeId:string){
  let endpoint='punch-activity?employeeERBId='+employeeId
  return this.apiCallerService.get(this.baseUrl,environment.employee.Attendance+endpoint,null)
}
GetWorkDayHourbyEmployee(customerId :string,employeeId:string){
  let endpoint='WorkDayHour/customer/'+customerId+'/employee/'+employeeId
  return this.apiCallerService.get(this.baseUrl,endpoint,null)
}
GetWorkDayHourbycustomer(customerId:string){
  let endpoint='WorkDayHour/customer/'+customerId;
  return this.apiCallerService.get(this.baseUrl,endpoint)
}
GetDistinctEmployeeList(customerId:string){
  let endpoint='WorkDayHour/distinct-employees/'+customerId;
  return this.apiCallerService.get(this.baseUrl,endpoint)
}
updateworkinghr(data:any){
  let endpoint='WorkDayHour'
  return this.apiCallerService.put(this.baseUrl,endpoint,data)
}
createcuswork(customerId:string){
  let endpoint='WorkDayHour/customer';
  let obj ={
    customerId : customerId
  };
  return this.apiCallerService.post(this.baseUrl,endpoint,obj)
}
CreateWorkDayHourForEmployee(customerId:string,employeeId:string){
  let endpoint='/WorkDayHour/employee';
  let obj = {
    customerId: customerId,
    employeeERBId: employeeId
  };
  return this.http.post(this.baseUrl+endpoint,obj)
}
DeleteWorkDayHourForEmployee(customerId:string,employeeId:string){
  let endpoint='WorkDayHour/customer/'+customerId+'/employee/'+employeeId;
  return this.apiCallerService.delete(this.baseUrl,endpoint);
}
  getAllLocation(customerId : string){
    const endpoint = 'Location/by-customer/'+customerId
    return this.apiCallerService.get(this.baseUrl,endpoint);
  }
 
  getMyLocation(customerId : string, employeeId : string) {
    const endpoint = 'Location/allowed-location/'+customerId+'/'+employeeId
    return this.apiCallerService.get(this.baseUrl, endpoint);
  }
  GetAllAllowedLocations(customerId: string, employeeId?: string) {
    let endpoint = 'Location/allowed-locations?customerId=' + customerId;
    if (employeeId!=null && employeeId!="" && employeeId !=undefined && employeeId!="undefined" && employeeId!="null")
      endpoint = endpoint + "&employeeERBId=" + employeeId;
    return this.apiCallerService.get(this.baseUrl, endpoint);
  }
  getEmployeeLocation(){
    let endpoint='Location'
    return this.apiCallerService.get(this.baseUrl,endpoint);
  }
  postAllLocation(data:I_Location){
    let endpoint='Location';
   return this.apiCallerService.post(this.baseUrl,endpoint,data);
  }
  // postAddLocation(data:I_Location){
  //   let endpoint='api/Location/AddLocation';
  //   return this.apiCallerService.post(this.dmbaseUrl,endpoint,data)
  // }
  AllowedLocationforEmployee(data: I_locationforEmployee){
    let endpoint='/Location/employee/allowed-locations';
    return this.http.post(this.baseUrl+endpoint,data)
  }
  putAllLocation(id:number,value: any){
    let endpoint=`Location/${id}`;
    return this.apiCallerService.put(this.baseUrl,endpoint,value);
  }

  UpsertLocation(data: I_Location){
    let endpoint=`Location/upsert`;
    return this.apiCallerService.post(this.baseUrl,endpoint,data);
  }
 
  deleteAllLocation(id:number){
    let endpoint = `Location/${id}`;
    return this.apiCallerService.delete(this.baseUrl,endpoint)
  }
  deleteAllowedLocationforEmployee(locationId:any,customerId:any,employeeId:any){
    let endpoint =`Location/employee/allowed-locations?locationId=${locationId}&&customerId=${customerId}&&employeeERBId=${employeeId}`;
    return this.apiCallerService.delete(this.baseUrl,endpoint);
  }
  getEmployeeBankAccountList(employeeId : string){
    return this.apiCallerService.get(this.baseUrl, environment.employee.getEmployeeBankAccountList + employeeId);
  }
 
  deleteEmployeeBankAccount(recId : string){
    return this.apiCallerService.delete(this.baseUrl, environment.employee.deleteEmployeeBankAccount + recId);
  }
 
  activateEmployeeBankAccount(recId : string){
    return this.apiCallerService.post(this.baseUrl, environment.employee.activateEmployeeBankAccount, {"EmpbankRecid": recId});
  }
 
  deactivateEmployeeBankAccount(recId : string){
    return this.apiCallerService.post(this.baseUrl, environment.employee.deactivateEmployeeBankAccount, {"EmpbankRecid": recId});
  }
 
  getPaymentMethods(){
    return this.apiCallerService.get(this.baseUrl, environment.employee.getPaymentMethods);
  }
 
  getBankList(){
    return this.apiCallerService.get(this.baseUrl, environment.employee.getBankList);
  }
 
  createBankAccount(model : any){
    return this.apiCallerService.post(this.baseUrl, environment.employee.create, model);
  }
 
  updateBankAccount(model : any){
    return this.apiCallerService.put(this.baseUrl, environment.employee.updateBankAccount, model); 
  }
 
  getActiveEmployeeList(ProjectId : string){
    const endpoint = `Employees/active-list/${ProjectId}?startIndex=1&pageSize=100`
    return this.apiCallerService.get(this.baseUrl,endpoint);
  }
 
  GetDistinctEmployees(customerId : string){
    const endpoint = `WorkDayHour/distinct-employees/${customerId}`
    return this.apiCallerService.get(this.baseUrl,endpoint);
  }

  GetMainLocation(clientId : string){
    const endpoint = `Location/main-location/${clientId}`
    return this.apiCallerService.get(this.baseUrl,endpoint);
  }
}