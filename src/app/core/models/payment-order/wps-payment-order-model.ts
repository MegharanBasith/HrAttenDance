export interface WPSPaymentOrderModel{
    PayGroupId : string,
    PaymentOrderId : string,
    EmployeeList? : EmployeeList[],
    SalaryCalculationList? :SalaryCalculationList[];
    GenerationType: Number,
}

export interface EmployeeList{
    EmpId:string
}

export interface SalaryCalculationList{
    SalaryCalculationId:string
}