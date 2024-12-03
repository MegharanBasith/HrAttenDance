import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService, apiResultFormat, getEmployees, routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  selected = 'option1';
  public lstEmployee: Array<getEmployees> = [];
  public searchDataValue = '';
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public routes = routes;
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  showSpinner : boolean = false;
  totalEmployees : number = 0;
  displayedColumns: string[] = [
    // 'altPersonnelNumber',
    // 'altPersonnelNumber1',
    'empNum',
    'employeeNumber',
    'name',
    'status',
    'iqamaSIDNumber',
    'passportNumber',
    'borderNum',
    'startDate',
    'nationalityId',
    // 'basicSalary',
    // 'contractId',
    // 'contractNum',
    // 'contractType',
    // 'currentProjId',
    // 'endDate',
    // 'englishDescription',
    // 'professionId',
    // 'qualificationId',
    // 'workflowState'
  ];
  displayedColumnsWithActions: string[] = ['actions', ...this.displayedColumns];
  projectId !: string;
  //** / pagination variables

  constructor(private data: DataService, private employeeService : EmployeeService, private router: Router) {}

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getAllEmployees(environment.defaultPageStartIndex, environment.defaultPageSize);
    //this.getTableData();
  }

  private getTableData(): void {
    this.lstEmployee = [];
    this.serialNumberArray = [];

    this.data.getEmployees().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getEmployees, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstEmployee.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
         this.dataSource = new MatTableDataSource<getEmployees>(this.lstEmployee);
    this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.lstEmployee.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstEmployee = data;
    } else {
      this.lstEmployee = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstEmployee = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  getAllEmployees(startIndex : number, pageSize : number) {
    debugger;
    this.showSpinner = true;
    this.employeeService.getAllEmployees(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger
        this.showSpinner = false;
        debugger;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data.employeeList;
          //this.dataSource.paginator = this.paginator;
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
    debugger;
    console.log(event);
    this.getAllEmployees((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  onEdit(row: any) {
    localStorage.setItem('selectedEmployeeId', JSON.stringify(row.empNum));
    localStorage.setItem('isNewEmployee', JSON.stringify(false));
    this.router.navigate([this.routes.employeeEdit]);
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
