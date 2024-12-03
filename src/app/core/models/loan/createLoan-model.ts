import { LoanType } from "./LoanType.enum";

export interface createLoanModel{
  payGroupId: string;
  amount: number;
  empNum: string;
  loanDate: string;
  effectiveDate: string;
  loanNotes: string;
  loanType: LoanType;
  numOfInstallments: number;
  installmentAmount:number;
  otherLoanTypeId: string;
}
