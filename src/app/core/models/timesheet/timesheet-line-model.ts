export interface TimesheetLineModel{
    AbsenceDays: number;
    CustomerLoan: number;
    DeductionAmount: number;
    DeductionReason: string;
    EmployeeOtherDeductions: number;
    EmployeeOtherDues: number;
    GOSI: number;
    LineNum: number;
    MawaridOtherDeductions: number;
    MawaridOtherDues: number;
    Mwaridays: number;
    NetSalary: number;
    NetSalaryCustomer: number;
    OvertimeAmount: number;
    OvertimeHours: number;
    WorkingDaysCustomer: number;
    WorkingDaysPayroll: number;
}