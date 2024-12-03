export interface ContractAllowance {
    ContractAllowanceId: number; 
    Name: string;
    AllowanceCode: number;
    Percentage: number;
    Selected: boolean;
    AllowanceAmountValue: number;
    CalculateWithSalary : boolean;
    IncludeGOSI : boolean;
  }