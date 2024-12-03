export interface ProcessExpiredWorkerDocumentModel {
  documentTypeId: string;
  requestID: string;
  empNum: string;
  sadadNo: string;
  documentNumber: string;
  projId: string;
  expiryDate: Date;
  period: number;
}
