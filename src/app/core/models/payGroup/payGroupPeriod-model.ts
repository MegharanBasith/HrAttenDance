export interface PayGroupPeriodModel {
  PeriodId: string;
  PayGroupId: string;
  SerialNum: number;
  PayGroupStartDate: Date;
  PayGroupEndDate: Date;
  Status: string;
  WorkflowStatus: string;
  PendingSalaryCalc: number;
}
