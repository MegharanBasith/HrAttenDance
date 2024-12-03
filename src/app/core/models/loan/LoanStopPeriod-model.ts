export interface LoanStopPeriodModel{
  loanId: string;
  deductedFromDate: string;
  deductedToDate: string;
  loanDate: string;
  disabled: number;
  status: number;
  stopReasonId: string;
}
