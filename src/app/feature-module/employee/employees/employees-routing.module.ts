import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './all-employee/employee-list/employee-list.component';
import { CreateComponent } from './all-employee/employee-bank-account/create/create.component';
import { EditComponent } from './all-employee/employee-bank-account/edit/edit.component';
import { EmployeePageContentComponent } from './all-employee/employee-page-content/employee-page-content.component';
import { EmployeeProfileComponent } from './all-employee/employee-profile/employee-profile.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationsComponent } from './designations/designations.component';
import { EmployeesComponent } from './employees.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeaveListComponent } from './leaves/leave-list/leave-list.component';
import { LeaveEmployeeComponent } from './leave-employee/leave-employee.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { ShiftScheduleComponent } from './shift-schedule/shift-schedule.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetLinesComponent } from './timesheet/timesheet-lines/timesheet-lines.component';
import { SalaryCalculationLinesComponent } from './salary-calculation/salary-calculation-lines/salary-calculation-lines.component';
import { SalaryCalculationListComponent } from './salary-calculation/salary-calculation-list/salary-calculation-list.component';
import { LeaveCreateComponent } from './leaves/leave-create/leave-create.component';
import { LeaveEditComponent } from './leaves/leave-edit/leave-edit.component';
import { BusinessTripListComponent } from './business-trip/business-trip-list/business-trip-list.component';
import { BusinessTripEditComponent } from './business-trip/business-trip-edit/business-trip-edit.component';
import { BusinessTripCreateComponent } from './business-trip/business-trip-create/business-trip-create.component';
import { EmployeeCreateComponent } from './all-employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from './all-employee/employee-edit/employee-edit.component';
import { EosListComponent } from './eos/eos-list/eos-list.component';
import { EosAddComponent } from './eos/eos-add/eos-add.component';
import { EosEditComponent } from './eos/eos-edit/eos-edit.component';
import { MyAttendanceComponent } from './attendance/my-attendance/my-attendance.component';
import { AllAttedanceComponent } from './attendance/all-attedance/all-attedance.component';
import { MyLocationComponent } from './attendance/my-location/my-location.component';
import { AllLocationComponent } from './attendance/all-location/all-location.component';
import { MySettingsComponent } from './attendance/my-settings/my-settings.component';
import { SettingsComponent } from './attendance/settings/settings.component';
import { EarningDeductionListComponent } from './all-employee/earning-deduction/earning-deduction-list/earning-deduction-list.component';
import { EarningDeductionCreateComponent } from './all-employee/earning-deduction/earning-deduction-create/earning-deduction-create.component';
import { EarningDeductionEditComponent } from './all-employee/earning-deduction/earning-deduction-edit/earning-deduction-edit.component';
import { LoanListComponent } from './all-employee/loan/loan-list/loan-list.component';
import { LoanCreateComponent } from './all-employee/loan/loan-create/loan-create.component';
import { LoanEditComponent } from './all-employee/loan/loan-edit/loan-edit.component';
import { EmployeeContractListComponent } from './all-employee/employee-contract/employee-contract-list/employee-contract-list.component';
import { EmployeeContractEditComponent } from './all-employee/employee-contract/employee-contract-edit/employee-contract-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      { path: "employee-list", component: EmployeeListComponent },
      { path: "employee-page", component: EmployeePageContentComponent },
      { path: "employee-bank-account/create", component: CreateComponent },
      { path: "employee-bank-account/edit", component: EditComponent },
      { path: "employee-profile", component: EmployeeProfileComponent },
      { path: "employee-create", component: EmployeeCreateComponent },
      { path: "employee-edit", component: EmployeeEditComponent },
      { path: "holidays", component: HolidaysComponent },
      { path: "leave-list", component: LeaveListComponent },
      { path: "leave-employee", component: LeaveEmployeeComponent },
      { path: "leave-create", component: LeaveCreateComponent },
      { path: "leave-edit", component: LeaveEditComponent },
      { path: "leave-settings", component: LeaveSettingsComponent },
      { path: "eos/eos-list", component: EosListComponent },
      { path: "eos/eos-add", component: EosAddComponent },
      { path: "eos/eos-edit", component: EosEditComponent },
      { path: "attendance-admin", component: AttendanceAdminComponent },
      { path: "attendance-employee", component: AttendanceEmployeeComponent },
      { path: "departments", component: DepartmentsComponent },
      { path: "designations", component: DesignationsComponent },
      { path: "timesheet", component: TimesheetComponent },
      { path: "overtime", component: OvertimeComponent },
      { path: "shift-schedule", component: ShiftScheduleComponent },
      { path: "shift-list", component: ShiftListComponent },
      { path: "timesheet-lines", component: TimesheetLinesComponent },
      { path: "salary-calculation-lines", component: SalaryCalculationLinesComponent },
      { path: "salary-calculation-list", component: SalaryCalculationListComponent },
      { path: "business-trip-list", component: BusinessTripListComponent },
      { path: "business-trip-create", component: BusinessTripCreateComponent },
      { path: "business-trip-edit", component: BusinessTripEditComponent },
      { path: "myattendance", component: MyAttendanceComponent },
      { path: "allattendance", component: AllAttedanceComponent },
      { path: "my-location", component: MyLocationComponent },
      { path: "all-location", component: AllLocationComponent },
      { path: "mysettings", component: MySettingsComponent },
      { path: "settings", component: SettingsComponent },
      { path: "earning-deduction/list", component: EarningDeductionListComponent },
      { path: "earning-deduction/create", component: EarningDeductionCreateComponent },
      { path: "earning-deduction/edit", component: EarningDeductionEditComponent },
      { path: "loan-list", component: LoanListComponent },
      { path: "loan-create", component: LoanCreateComponent },
      { path: "loan-edit", component: LoanEditComponent },
      { path: "employee-contract/list", component: EmployeeContractListComponent },
      { path: "employee-contract/edit", component: EmployeeContractEditComponent }
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
