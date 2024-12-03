import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';
import { WorkerDocumentModel } from '../../models/workerDocument/workerDocument-model';
import { EditWorkerDocumentModel } from '../../models/workerDocument/editWorkerDocument-model';
import { CreateInitialWorkerDocumentModel } from '../../models/workerDocument/createInitialWorkerDocument-model';
import { ProcessExpiredWorkerDocumentModel } from '../../models/workerDocument/processExpiredWorkerDocument-model';

@Injectable({
  providedIn: 'root'
})
export class WorkerDocumentService {

constructor(private apiCallerService: ApiCallerService) { }

getWorkerDocList(projectId:string,pageStartPosition: number, pageSize: number) {
  const params = { pageStartPosition, pageSize };
  return this.apiCallerService.get(environment.baseUrl, environment.WorkerDocument.getWorkerDocList+projectId, params);
}

deleteWorkerDoc(id: string) {
  return this.apiCallerService.delete(environment.baseUrl, environment.WorkerDocument.deleteWorkerDoc + id);
}

submitWorkerDoc(id: string) {
  return this.apiCallerService.get(environment.baseUrl, environment.WorkerDocument.submitWorkerDoc + id);
}


addWorkerDoc(model: WorkerDocumentModel) {
  return this.apiCallerService.post(environment.baseUrl, environment.WorkerDocument.addWorkerDoc, model);
}

editWorkerDoc(model: EditWorkerDocumentModel) {
  return this.apiCallerService.put(environment.baseUrl, environment.WorkerDocument.editWorkerDoc, model);
}

createInitWorkerDoc(model: CreateInitialWorkerDocumentModel) {
  return this.apiCallerService.post(environment.baseUrl, environment.WorkerDocument.createInitWorkerDoc, model);
}

processExpiredWorkerDoc(model: ProcessExpiredWorkerDocumentModel) {
  return this.apiCallerService.post(environment.baseUrl, environment.WorkerDocument.processExpiredWorkerDoc, model);
}

getExpiredWorkerDocList(projectId:string,pageStartPosition: number, pageSize: number) {
  const params = { pageStartPosition, pageSize };
  return this.apiCallerService.get(environment.baseUrl, environment.WorkerDocument.getExpiredWorkerDoc+projectId, params);
}

getWorkerDocTypeList() {
  return this.apiCallerService.get<DocumentType[]>(environment.baseUrl, environment.WorkerDocument.getWorkerDocType);
}

seteWorkerDocToFailed(id: string) {
  return this.apiCallerService.get(environment.baseUrl, environment.WorkerDocument.setWorkerDocToFailed + id);
}

seteWorkerDocToSuccess(id: string) {
  return this.apiCallerService.get(environment.baseUrl, environment.WorkerDocument.setWorkerDocToSuccess + id);
}

seteWorkerDocToUnderProcess(id: string) {
  return this.apiCallerService.get(environment.baseUrl, environment.WorkerDocument.setWorkerDocToUnderProcess + id);
}

setWorkerDocPaymentStatus(id:string,status:number) {
  return this.apiCallerService.get(environment.baseUrl, environment.WorkerDocument.setWorkerDocPaymentStatus + id+'/'+status);
}

}
