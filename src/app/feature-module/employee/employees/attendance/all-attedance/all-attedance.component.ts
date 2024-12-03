import { Component, OnInit } from '@angular/core';
import { IAttendance } from '../my-attendance/attendance';
import { I_Employee } from './attendance';
import { DataService, routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
 
@Component({
  selector: 'app-all-attedance',
  templateUrl: './all-attedance.component.html',
  styleUrl: './all-attedance.component.scss'
})
export class AllAttedanceComponent implements OnInit {
 
  constructor(
    public emp: EmployeeService,
    private dataService:DataService,
    private settingservice:SettingsService
  ) { }
  ngOnInit(): void {
    this.GetDistinctEmployeeList();
    this.setCurrentDate();
    this.getAttendList();
  }
 
  public routes = routes;
 
  ProjectId:any;
  attendanceList: IAttendance[] = [];
 
  selectedCustomer: any = this.settingservice.customerId;
  selectedEmployee: string = '';
 
  selectedyear: number = 0;
  selectedmonth: number = 0;
 
  employeeDDL: I_Employee[] = [];
  customerDDL: any[] = [this.settingservice.customerId];
 
  years: number[] = [2019, 2020, 2021, 2022, 2023, 2024];
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
 
  getAttendList() {
    this.emp.getAttList(this.selectedyear, this.selectedmonth, this.selectedEmployee, this.selectedCustomer).subscribe(
      (response: any) => {
        this.attendanceList = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
 
  GetDistinctEmployeeList() {
    this.ProjectId = localStorage.getItem("projectId");
    this.emp.getActiveEmployeeList(this.ProjectId).subscribe(
      (res:any)=>{
      this.employeeDDL = res.data.employeeList;
    });
  }
  setCurrentDate() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
 
    this.selectedmonth = this.months[currentMonth].value;
    this.selectedyear = this.years.find(year => year === currentYear) || this.years[0];
  }
 
}