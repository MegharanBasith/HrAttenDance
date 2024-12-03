export const environment = {
   // dmbaseUrl:'https://svc.mawarid.com.sa:5534',
   baseUrl: 'https://svc.mawarid.com.sa:5534/api',
   //baseUrl: 'https://localhost:44365/api',
    defaultPageStartIndex : 1,
    defaultPageSize : 10,
    authentication:{
        signup: 'auth/signup',
        login: 'auth/login',
        emailExist: 'auth/email-exists'
    },
    static: {
        getContractAlowances: "static/contract-allowances",
        getProfessions: "static/professions",
        getNationalities: "static/nationalities",
        getRoles: "static/roles",
        getAnnualLeaveTypes: "static/annual-leave-types"
    },
    timesheet: {
        getTimesheetPeriods: "timesheet/periods",
        getTimesheetList: "timesheet/list/",
        getTimesheetLines: "timesheet/lines/",
        generateTimesheet: "timesheet/generate",
        getProformaInvoice: "timesheet/proforma-invoice/",
        exportTimesheet: "timesheet/export/",
        importTimesheet: "timesheet/import",
        saveTimesheetLines: "timesheet/lines",
        getTimesheetDetails: "timesheet/details/",
        submitTimesheet: "timesheet/submit",
        deleteTimesheet: "timesheet/",
        deleteTimesheetLines: "timesheet/{id}/delete-lines"
    },
    leave: {
        getLeaveList: "Leaves/",
        addLeave: "Leaves",
        editLeave: "Leaves/",
        deleteLeave: "Leaves/",
        getLeaveBalance: "Leaves/balance",
        getEmployeeDestinationCities: "Leaves/employee/destination-cities/",
        submitLeave: "Leaves/submit",
        updateActualReturnDate: "Leaves/actual-return-date/"
    },
    WorkerDocument: {
        getWorkerDocList: "WorkerDocument/",
        deleteWorkerDoc: "WorkerDocument/",
        addWorkerDoc: "WorkerDocument/Create",
        editWorkerDoc: "WorkerDocument/Update",
        createInitWorkerDoc: "WorkerDocument/CreateInitial",
        processExpiredWorkerDoc: "WorkerDocument/ProcessExpired",
        getExpiredWorkerDoc: "WorkerDocument/Expired/",
        getWorkerDocType: "WorkerDocument/Type",
        setWorkerDocToFailed: "WorkerDocument/SetToFailed/",
        setWorkerDocToSuccess: "WorkerDocument/SetToSuccess/",
        setWorkerDocToUnderProcess: "WorkerDocument/SetToUnderProcess/",
        submitWorkerDoc: "WorkerDocument/Submit/",
        setWorkerDocPaymentStatus:"WorkerDocument/SetPaymentStatus/"


    },
    PayGroupPeriod: {
        payGroupPeriodList: "PayGroup/",
        payGroupPeriodSumit: "PayGroup/Submit"
    },
    eos: {
        getEOSList: "EOS/",
        addEOS: "EOS",
        editEOS: "EOS/",
        deleteEOS: "EOS/",
        createEarnDeductTrans: "EOS/earn-deduct-trans",
        getEarnDeductTransList: "EOS/earn-deduct-trans-list/",
        deleteEarnDeductTrans: "EOS/delete-earn-deduct-trans",
        unpaidSalaryList: "EOS/unpaid-salaries/",
        calculate: "EOS/calculate",
        addEosCalculateRequest: "EOS/add-calculate-request",
        submit: "EOS/submit"
    },
    salaryCalculation: {
        "initiate": "SalaryCalculations/initiate",
        "list": "SalaryCalculations/by-pay-group-id",
        "employeeList": 'SalaryCalculations/employees',
        "lines": "SalaryCalculations/lines",
        "details": "SalaryCalculations",
        "create": "SalaryCalculations",
        "process": "SalaryCalculations/process",
        "delete": "SalaryCalculations/",
        "deleteLines": "SalaryCalculations/{id}/delete-lines",
        "approvedNotPaidList": "SalaryCalculations/approved-notpaid-list/",
        "recalculate": "SalaryCalculations/recalculate",
        "approve": "SalaryCalculations/approve"
    },
    paymentOrder: {
        "list": "PaymentOrders",
        "lines": "PaymentOrders/lines",
        "create": "PaymentOrders",
        "generateWPS": "PaymentOrders/generate-wps",
        "delete": "PaymentOrders/",
        "deleteLines": "PaymentOrders/{id}/delete-lines",
        "submit": "PaymentOrders/submit",
        "bankAccountList": "PaymentOrders/bank-accounts",
        "setPaid": "PaymentOrders/set-paid",
        "setFailed": "PaymentOrders/set-failed",
        "settle": "PaymentOrders/settle"
    },
    businessTrip: {
        "requestList": "BusinessTrip/",
        "create": "BusinessTrip",
        "edit": "BusinessTrip/",
        "requestDestinations": "BusinessTrip/request/destinations/",
        "destinations": "BusinessTrip/destinations",
        "delete": "BusinessTrip/"
    },
    earningDeduction: {
        earnings: "EarningDeduction/earnings",
        deductions: "EarningDeduction/deductions",
        list: "EarningDeduction/list/",
        create: "EarningDeduction/create",
        update: "EarningDeduction/update/",
        delete: "EarningDeduction/delete/",
        submit: "EarningDeduction/submit"
    },
    loan: {
        "list": "Loan/List/",
        "otherTypeslist": "Loan/OtherType/",
        "installmentList": "Loan/installments/",
        "details": "Loan/",
        "update": "Loan/update/",
        "delete": "Loan/Delete/",
        "create":"Loan/Create",
        "adjust":"Loan/Adjust",
        "hold":"Loan/Hold/",
        "submit":"Loan/Submit/",
        "CreateLoanStop":"Loan/LoanStopPeriod/Create",
        "DeleteLoanStop":"Loan/LoanStopPeriod/delete/",
        "GetLoanStopDetails":"Loan/LoanStopPeriod/details/",
        "GetLoanStopList":"Loan/LoanStopPeriod/list/",
        "SubmitLoanStop":"Loan/LoanStopPeriod/Submit/"
    },
    user: {
        "create": "user",
        "list": "user/",
        "update": "user",
        "delete": "user/",
        "updateStatus": "user/status"
    },
    password: {
        "reset": "password/reset"
    },

    axBaseUrl: 'https://mawarid.sandbox.operations.dynamics.com/api/services/MWMawaridServiceGroup/MWMawaridService/api/services/MWRecIntegration/MWRecPortalIntegrationService',
    employee: {
        createWorkerWithContract: 'employees',
        getAllEmployees: 'employees/list/',
        getActiveEmployees: 'employees/active-list/',
        getEmployeeById: 'employees/',
        update: 'employees',
        Attendance: 'Attendance/',
        workDayHour: 'api/WorkDayHour/',
        location: 'hrservice-api/',
        getEmployeeBankAccountList: 'EmployeeBankAccount/details/',
        deleteEmployeeBankAccount: 'EmployeeBankAccount/delete/',
        activateEmployeeBankAccount: 'EmployeeBankAccount/activate',
        deactivateEmployeeBankAccount: 'EmployeeBankAccount/deactivate',
        getPaymentMethods: 'EmployeeBankAccount/payment-methods',
        getBankList: 'EmployeeBankAccount/banks',
        create: 'EmployeeBankAccount/create',
        updateBankAccount: 'EmployeeBankAccount/update',
    }
}
