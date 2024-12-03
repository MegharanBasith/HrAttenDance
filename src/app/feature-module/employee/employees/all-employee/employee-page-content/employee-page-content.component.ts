import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService, lstEmployee, routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-employee-page-content',
  templateUrl: './employee-page-content.component.html',
  styleUrls: ['./employee-page-content.component.scss'],
})
export class EmployeePageContentComponent implements OnInit {
  public routes = routes;
  selected = 'option1';
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showSpinner: boolean = false;
  totalEmployees : number = 0;
  displayedColumns: string[] = [
    'altPersonnelNumber',
    'altPersonnelNumber1',
    'basicSalary',
    'contractId',
    'contractNum',
    'contractType',
    'currentProjId',
    'empNum',
    'endDate',
    'englishDescription',
    'iqamaSIDNumber',
    'name',
    'nationalityId',
    'passportNumber',
    'professionId',
    'qualificationId',
    'startDate',
    'status',
    'workflowState'
  ];
  projectId !: string;
  //public lstEmployee: Array<lstEmployee>;
  constructor(public router: Router, private dataservice: DataService, private employeeService: EmployeeService) {
    //this.lstEmployee = this.dataservice.lstEmployee;
  }
  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;
    
    this.getAllEmployees(environment.defaultPageStartIndex, environment.defaultPageSize);
  }
  getAllEmployees(startIndex: number, pageSize: number) {
    debugger;
    this.showSpinner = true;
    this.employeeService.getAllEmployees(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger
        this.showSpinner = false;
        debugger;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data.employeeList;
          this.dataSource.sort = this.sort;
          this.totalEmployees = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    )
  }
  setPage(event: any) {
    this.getAllEmployees((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }
}
