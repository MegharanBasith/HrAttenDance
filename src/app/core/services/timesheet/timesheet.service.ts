import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';
import { GenerateTimesheetRequestModel } from '../../models/timesheet/generate-timesheet-request-model';
import { TimesheetLineContractModel } from '../../models/timesheet/timesheet-line-contract-model';


@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private apiCallerService: ApiCallerService) { }

  getTimesheetPeriods() {
    return this.apiCallerService.get(environment.baseUrl, environment.timesheet.getTimesheetPeriods);
  }

  getTimesheetList(projectId: string) {
    return this.apiCallerService.get(environment.baseUrl, environment.timesheet.getTimesheetList + projectId);
  }

  getTimesheetLines(timesheetTableRefRecId: string, startIndex: number, pageSize: number) {
    const params = { startIndex, pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.timesheet.getTimesheetLines + timesheetTableRefRecId, params);
  }
  generateTimesheet(model: GenerateTimesheetRequestModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.timesheet.generateTimesheet, model);
  }

  getProformaInvoice(timesheetId: string) {
    return this.apiCallerService.get(environment.baseUrl, environment.timesheet.getProformaInvoice + timesheetId);
  }

  exportTimesheet(timesheetRecId: string) {
    return this.apiCallerService.get(environment.baseUrl, environment.timesheet.exportTimesheet + timesheetRecId);
  }

  importTimesheet(base64String: string) {
    return this.apiCallerService.post(environment.baseUrl, environment.timesheet.importTimesheet, { 'Data': base64String });
  }

  saveTimesheetLines(model: TimesheetLineContractModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.timesheet.saveTimesheetLines, model);
  }

  getTimesheetDetails(timesheetId: string) {
    return this.apiCallerService.get(environment.baseUrl, environment.timesheet.getTimesheetDetails + timesheetId);
  }

  submitTimesheet(timesheetId: string) {
    return this.apiCallerService.post(environment.baseUrl, environment.timesheet.submitTimesheet, { 'TimesheetId': timesheetId });
  }

  deleteTimesheet(id: string) {
    return this.apiCallerService.delete(environment.baseUrl, environment.timesheet.deleteTimesheet + id);
  }

  deleteTimesheetLines(id: string, timesheetLines: any[]) {
    return this.apiCallerService.post(environment.baseUrl, environment.timesheet.deleteTimesheetLines.replace('{id}', id), { TimesheetLines: timesheetLines });
  }
}

