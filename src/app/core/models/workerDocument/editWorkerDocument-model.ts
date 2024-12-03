import { WorkerDocumentModel } from "./workerDocument-model";

export interface EditWorkerDocumentModel extends WorkerDocumentModel{
  RequestID:string;
  ExpiryDate:string;
  PaymentDate:string;
}
