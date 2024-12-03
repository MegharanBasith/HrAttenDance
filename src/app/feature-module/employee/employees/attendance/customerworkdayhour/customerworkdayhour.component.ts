import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { I_workDayHourList} from './customerworkday';
import { IAttendance } from '../my-attendance/attendance';
import { I_Employee } from '../all-attedance/attendance';
import { DataService, routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { HttpErrorResponse } from '@angular/common/http';
import { cu } from '@fullcalendar/core/internal-common';
 
 
@Component({
  selector: 'app-customerworkdayhour',
  templateUrl: './customerworkdayhour.component.html',
  styleUrl: './customerworkdayhour.component.scss',
})
export class CustomerworkdayhourComponent implements OnInit {
  public routes = routes;
  constructor(
    public emp: EmployeeService,
    private fb: FormBuilder,
    private dataService: DataService,
    private settingservice: SettingsService
  ) {}
  customerId: any = this.settingservice.customerId;
  employeeId: any = this.settingservice.employeeId;

  Editemployee = false;
  onUpdate: boolean = false;
  ngOnInit(): void {
    debugger;
    this.getCustomeremployee();
    this.GetDistinctEmployeeList();
    this.GetDistinctEmployees();
    this.customerDDL = [this.settingservice.customerId];
    this.Employee = this.fb.group({
      customer: [''],
      employeeId: [''],
      id: [''],
      day: [''],
      hours: [''],
      from: [''],
      to: [''],
      createdBy: [''],
      isWorking: [false],
      tolerance: [''],
    });
  }
  All: string[] = [''];
  Employee: FormGroup = new FormGroup({});

  customerlist: I_workDayHourList[] = [];
  attendanceList: IAttendance[] = [];
  employeeDDL: I_Employee[] = [];
  customerDDL: string[] = [];

  getcuswork() {
    debugger;
    this.emp.GetWorkDayHourbycustomer(this.customerId).subscribe(
      (response: any) => {
        debugger;
        this.customerlist = response.data;
        this.GetDistinctEmployeeList();
        if (this.customerlist.length > 0) {
          this.showCreate = true;
          this.showDelete = false;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getempwork() {
    debugger;
    this.emp
      .GetWorkDayHourbyEmployee(this.customerId, this.employeeId)
      .subscribe(
        (response: any) => {
          this.customerlist = response.data;
          this.GetDistinctEmployeeList();
          if (this.customerlist.length > 0) {
            this.showCreate = true;
            this.showDelete = true;
          } else {
            this.showDelete = false;
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
  getCustomeremployee() {
    debugger;
    if (
      this.employeeId != '' &&
      this.employeeId != null &&
      this.employeeId != 'null' &&
      this.employeeId != undefined &&
      this.employeeId != 'undefined'
    ) {
      this.getempwork();
    } else {
      this.getcuswork();
    }
  }
  showCreate: boolean = false;
  showDelete: boolean = false;
  updateCustomerEmployee() {
    debugger;
    let fromValues: any = {
      createdBy: this.Employee.value.createdBy,
      clientId: this.Employee.value.customer,
      day: this.Employee.value.day,
      employeeId: this.Employee.value.employeeId,
      from: this.Employee.value.from,
      hours: this.Employee.value.hours,
      isWorking: this.Employee.value.isWorking,
      to: this.Employee.value.to,
      tolerance: this.Employee.value.tolerance,
      id: this.Employee.value.id,
    };
    this.emp.updateworkinghr(fromValues).subscribe(
      (response: any) => {
        this.getCustomeremployee();
        Swal.fire('Updated Successfully', '', 'success');
      },
      (error) => {
        console.error(error);
      }
    );
    this.onUpdate = false;
    this.Employee.reset();
  }

  deleteworkdayhour() {
    if (
      this.customerId != '' &&
      this.customerId != null &&
      this.customerId != 'null' &&
      this.customerId != undefined &&
      this.customerId != 'undefined' &&
      this.employeeId != '' &&
      this.employeeId != null &&
      this.employeeId != 'null' &&
      this.employeeId != undefined &&
      this.employeeId != 'undefined'
    ) {
      this.DeleteWorkDayHourForEmployee(this.customerId, this.employeeId);
    } else {
      Swal.fire('Selete Employee', 'Notfound', 'warning');
    }
  }

  ProjectId: any;
  GetDistinctEmployeeList() {
    debugger;
    this.ProjectId = localStorage.getItem('projectId');
    this.emp.getActiveEmployeeList(this.ProjectId).subscribe((res: any) => {
      this.employeeDDL = res.data.employeeList;
    });
  }

  CustomerId: any;
  LoggedCustomerEmployeeDDL: any;
  GetDistinctEmployees() {
    debugger;
    this.CustomerId = this.settingservice.customerId;
    this.emp
      .GetDistinctEmployees(this.CustomerId)
      .subscribe((res: any) => {
        this.LoggedCustomerEmployeeDDL = res.data;
      });
  }

  submitCustomerEmployee() {
    debugger;
    if (
      this.employeeId == '' ||
      this.employeeId == null ||
      this.employeeId == 'null' ||
      this.employeeId == undefined ||
      this.employeeId == 'undefined'
    ) {
      this.postforcustomer();
    } else {
      this.postforEmployee();
    }
  }
  postforEmployee() {
    debugger;
    this.emp
      .CreateWorkDayHourForEmployee(this.customerId, this.employeeId)
      .subscribe(
        (response: any) => {
          this.GetDistinctEmployees();
          this.getCustomeremployee();
          this.Employee.reset();
          Swal.fire('Created Successfully', ' ', 'success');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 201) {
            Swal.fire('Success', error.error.text);
          }
          if (error.status === 500) {
            Swal.fire('Error', error.error);
          }
          if (error.status === 200) {
            Swal.fire('Success', error.error.text);
          }
        }
      );
  }

  postforcustomer() {
    debugger;
    this.emp.createcuswork(this.customerId).subscribe((response: any) => {
      this.GetDistinctEmployees();
      this.getCustomeremployee();
      this.Employee.reset();
      Swal.fire('Created Successfully', ' ', 'success');
    });
  }

  selectID: any;
  editdata(data: any) {
    debugger;
    this.selectID = data.id;
    this.Employee.setValue({
      customer: data.clientId,
      employeeId: data.employeeId,
      id: data.id,
      day: data.day,
      hours: data.hours,
      from: data.from,
      to: data.to,
      createdBy: data.createdBy,
      isWorking: data.isWorking,
      tolerance: data.tolerance,
    });
    this.onUpdate = true;
  }

  closepopup() {
    this.Employee.reset();
    this.onUpdate = false;
  }
  DeleteWorkDayHourForEmployee(customerId: any, employeeId: any) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fe8c31',
      cancelButtonColor: '#fd7951',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.emp
          .DeleteWorkDayHourForEmployee(customerId, employeeId)
          .subscribe((response: any) => {
            this.GetDistinctEmployees();
            this.getcuswork();
          });
      }
    });
  }
}



