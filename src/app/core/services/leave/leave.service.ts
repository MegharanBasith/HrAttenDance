import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';
import { LeaveModel } from '../../models/leave/leave-model';
import { LeaveEditModel } from '../../models/leave/leave-edit-model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private apiCallerService: ApiCallerService) { }

  getLeaveList(projectId: string, pageStartPosition: number, pageSize: number) {
    const params = { pageStartPosition, pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.leave.getLeaveList + projectId, params);
  }

  getLeaveBalance(employeeId: string, vacationType: string, startDate: Date, vacationDays: number) {
    const params = { employeeId, vacationType, startDate, vacationDays };
    return this.apiCallerService.get(environment.baseUrl, environment.leave.getLeaveList, params);
  }

  addLeave(model: LeaveModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.leave.addLeave, model);
  }

  editLeave(id: string, model: LeaveEditModel) {
    return this.apiCallerService.put(environment.baseUrl, environment.leave.editLeave + id, model);
  }

  deleteLeave(id: string) {
    return this.apiCallerService.delete(environment.baseUrl, environment.leave.deleteLeave + id);
  }


  getEmployeeDestinationCities(nationalityId: string) {
    return this.apiCallerService.get(environment.baseUrl, environment.leave.getEmployeeDestinationCities + nationalityId);
  }

  submitLeave(requestId : string) {
    const model = {"RequestId" : requestId}
    return this.apiCallerService.post(environment.baseUrl, environment.leave.submitLeave, model);
  }

  updateActualReturnDate(id : string, model : any) {
    return this.apiCallerService.put(environment.baseUrl, environment.leave.updateActualReturnDate + id, model);
  }
}
