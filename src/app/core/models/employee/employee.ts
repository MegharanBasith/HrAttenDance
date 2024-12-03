import { ContractAllowance } from "./contract-allowance";

export interface Employee {
    FirstName: string;
    LastName: string;
    Email : string;
    StartDateTime: string;
    ErbProfessionId: string;
    Gender: string;
    MaritalStatus: string;
    PassportNumber?: string;
    PassportExpiryDate: string | null;
    Birthdate: string;
    Department: string;
    BorderNumber?: number;
    NationalityCode: string;
    ProjId: string;
    PayGroupId: string;
    SalaryAmount: number;
    ContractAllowances: ContractAllowance[];
    RoleId: number;
    ClientId : string;
    EmployeeNumber: string;
    VacationCode: number;
    IqamaNumber : string;
    ActiveInModadd: boolean
  }