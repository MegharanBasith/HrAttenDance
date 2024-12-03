import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeeProfileComponent } from './all-employee/employee-profile/employee-profile.component';
import { EmployeeListComponent } from './all-employee/employee-list/employee-list.component';
import { CreateComponent } from './all-employee/employee-bank-account/create/create.component';
import { EditComponent } from './all-employee/employee-bank-account/edit/edit.component';
import { EmployeePageContentComponent } from './all-employee/employee-page-content/employee-page-content.component';
import { EmployeeModalComponent } from './all-employee/employee-modal/employee-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeaveListComponent } from './leaves/leave-list/leave-list.component';
import { LeaveEmployeeComponent } from './leave-employee/leave-employee.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationsComponent } from './designations/designations.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { ShiftScheduleComponent } from './shift-schedule/shift-schedule.component';
import { SharedModule } from '../../../shared/shared.module';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { TimesheetLinesComponent } from './timesheet/timesheet-lines/timesheet-lines.component';
import { SalaryCalculationLinesComponent } from './salary-calculation/salary-calculation-lines/salary-calculation-lines.component';
import { SalaryCalculationListComponent } from './salary-calculation/salary-calculation-list/salary-calculation-list.component';
import { MessageService } from 'primeng/api';
import { LeaveCreateComponent } from './leaves/leave-create/leave-create.component';
import { LeaveEditComponent } from './leaves/leave-edit/leave-edit.component';
import { EosListComponent } from './eos/eos-list/eos-list.component';
import { EosAddComponent } from './eos/eos-add/eos-add.component';
import { EosEditComponent } from './eos/eos-edit/eos-edit.component';
import { BusinessTripListComponent } from './business-trip/business-trip-list/business-trip-list.component';
import { BusinessTripCreateComponent } from './business-trip/business-trip-create/business-trip-create.component';
import { BusinessTripEditComponent } from './business-trip/business-trip-edit/business-trip-edit.component';
import { EmployeeCreateComponent } from './all-employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from './all-employee/employee-edit/employee-edit.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatSelectModule } from '@angular/material/select';
import { MyLocationComponent } from './attendance/my-location/my-location.component';
import { AllLocationComponent } from './attendance/all-location/all-location.component';
import { MySettingsComponent } from './attendance/my-settings/my-settings.component';
import { AllAttedanceComponent } from './attendance/all-attedance/all-attedance.component';
import { MyAttendanceComponent } from './attendance/my-attendance/my-attendance.component';
import { SettingsComponent } from './attendance/settings/settings.component';
import { WorkdayhourComponent } from './attendance/workdayhour/workdayhour.component';
import { CustomerworkdayhourComponent } from './attendance/customerworkdayhour/customerworkdayhour.component';
import { EmployeeLocationComponent } from './attendance/employee-location/employee-location.component';
import { EarningDeductionListComponent } from './all-employee/earning-deduction/earning-deduction-list/earning-deduction-list.component';
import { EarningDeductionCreateComponent } from './all-employee/earning-deduction/earning-deduction-create/earning-deduction-create.component';
import { EarningDeductionEditComponent } from './all-employee/earning-deduction/earning-deduction-edit/earning-deduction-edit.component';
import { LoanListComponent } from './all-employee/loan/loan-list/loan-list.component';
import { ConfirmModalComponent } from "../../common/confirm-modal/confirm-modal.component";
import { LoanCreateComponent } from './all-employee/loan/loan-create/loan-create.component';
import { LoanEditComponent } from './all-employee/loan/loan-edit/loan-edit.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeContractListComponent } from './all-employee/employee-contract/employee-contract-list/employee-contract-list.component';
import { EmployeeContractEditComponent } from './all-employee/employee-contract/employee-contract-edit/employee-contract-edit.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeProfileComponent,
    EmployeeListComponent,
    CreateComponent,
    EditComponent,
    EmployeePageContentComponent,
    EmployeeModalComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EosListComponent,
    EosAddComponent,
    EosEditComponent,
    HolidaysComponent,
    LeaveListComponent,
    LeaveEditComponent,
    LeaveCreateComponent,
    LeaveEmployeeComponent,
    LeaveSettingsComponent,
    AttendanceAdminComponent,
    AttendanceEmployeeComponent,
    DepartmentsComponent,
    DesignationsComponent,
    TimesheetComponent,
    OvertimeComponent,
    ShiftScheduleComponent,
    ShiftListComponent,
    TimesheetLinesComponent,
    SalaryCalculationLinesComponent,
    SalaryCalculationListComponent,
    BusinessTripListComponent,
    BusinessTripCreateComponent,
    BusinessTripEditComponent,
    MyLocationComponent,
    AllLocationComponent,
    MySettingsComponent,
    AllAttedanceComponent,
    MyAttendanceComponent,
    SettingsComponent,
    WorkdayhourComponent,
    CustomerworkdayhourComponent,
    EmployeeLocationComponent,
    EarningDeductionListComponent,
    EarningDeductionCreateComponent,
    EarningDeductionEditComponent,
    LoanListComponent,
    LoanCreateComponent,
    LoanEditComponent,
    EmployeeContractListComponent,
    EmployeeContractEditComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // MatTableModule,
    // MatSortModule,
    ReactiveFormsModule ,
    SharedModule,
    CommonModule,
    MatSelectModule,
    GoogleMapsModule,
    ConfirmModalComponent,
    MatSnackBarModule
],
  providers: [DatePipe, MessageService]
})
export class EmployeesModule { }
