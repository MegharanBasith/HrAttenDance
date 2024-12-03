import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SalaryCalculationService, routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { environment } from 'src/app/environments/environment';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-salary-calculation-list',
  templateUrl: './salary-calculation-list.component.html',
  styleUrl: './salary-calculation-list.component.scss'
})
export class SalaryCalculationListComponent implements OnInit {

  public routes = routes;
  public showSpinner: boolean = false;
  dataSource = new MatTableDataSource<any>([]);
  salaryCalculationList: any[] = [];
  columns: string[] = [
    'salaryCalculationId',
    'payGroupPeriodStartDate',
    'payGroupPeriodEndDate',
    'salaryTransValueFrom',
    'salaryTransValueTo',
    'hasErrors',
    'salaryCalcStatus',
    'workflowState',
    'validationStatus',
    'numberOfEmployees',
    'totalNetSalary',
    'eosTransId'
  ];
  displayedColumnsWithActions: string[] = ['actions', ...this.columns];

  displayedColumns: string[] = ['select', 'employeeId', 'name', 'iqamaNumber', 'passportNumber'];

  employeeDataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  public totalSalaryCalculations: number = 0;
  employeeList: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  newSalaryCalculationId !: string;
  visible: boolean = false;
  selectedEmployees: any;
  projectId !: string;
  totalEmployees !: any[];
  employeeIdFilter !: string;
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  selectedRow !: any;
  processTypeOtions = [
    { id: 0, value: "All Employees" },
    { id: 1, value: "Selected Employees" },
  ];
  selectedProcessType !: any;

  constructor(private salaryCalculationService: SalaryCalculationService, private router: Router, private messageService: MessageService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getSalaryCalculationList(environment.defaultPageStartIndex, environment.defaultPageSize);
  }

  setPage(event: any) {
    this.getSalaryCalculationList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  setEmployeePage(event: any) {
    this.getActiveEmployeeList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  getSalaryCalculationList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.salaryCalculationService.getSalaryCalculationList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.salaryCalculationList = response.data.salaryCalculationList;
          this.dataSource.data = response.data.salaryCalculationList;
          this.dataSource.sort = this.sort;
          this.totalSalaryCalculations = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    )
  }

  initiateNewSalaryCalculation() {
    this.showSpinner = true;
    this.salaryCalculationService.initiateNewSalaryCalculation(this.projectId).subscribe(
      (response: any) => {
        debugger;
        if (response && response.isSuccess) {
          //this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message ?? "Salary calculation created successfully" });
          this.newSalaryCalculationId = response.data;
          this.getActiveEmployeeList(1, 10);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while creating salary calculation" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }


  getActiveEmployeeList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.employeeService.getActiveEmployees(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.employeeList = response.data.employeeList;
          this.employeeDataSource.data = this.employeeList;
          this.totalEmployees = response.data.totalRecordsCount;
          this.visible = true;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retriving employee list" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  createSalaryCalculation() {
    debugger;
    this.showSpinner = true;
    let selectedEmployeeList = this.selection.selected.map(x => ({ EmpId: x.employeeId, IqamaSIDNumber: x.iqamaNumber, EmpName: x.name, PassportNumber: x.passportNumber }))
    this.salaryCalculationService.CreateSalaryCalculation(this.newSalaryCalculationId, this.projectId, this.selectedProcessType, selectedEmployeeList).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          debugger;
          this.visible = false;
          //this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message ?? "Salary calculation created successfully" });
          this.processSalaryCalculation();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while creating salary calculation" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }


  processSalaryCalculation() {
    this.showSpinner = true;
    this.salaryCalculationService.processSalaryCalculation(this.newSalaryCalculationId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.data ?? "Salary calculation processed successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        else {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: response?.message ?? "An error has occured while processing salary calculation" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.message });
      }
    )
  }

  public sortData(sort: Sort) {
    const data = this.salaryCalculationList.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.salaryCalculationList = data;
    } else {
      this.salaryCalculationList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  onRowClicked(row: any) {
    localStorage.setItem('selectedSalaryCalculation', JSON.stringify(row));
    this.router.navigate([this.routes.salaryCalculationLineList]);
  }
  filterEmployees() {
    if (this.employeeIdFilter && this.employeeIdFilter != "") {
      const employeeExists = this.employeeDataSource.data.some(emp => emp.employeeId === this.employeeIdFilter);

      if (employeeExists) {
        // Filter the data source on the client-side
        this.employeeDataSource.filter = this.employeeIdFilter.trim().toLowerCase();
      } else {
        // Fetch data from the server-side if the value does not exist
        this.getEmployeeById(this.employeeIdFilter);
      }
    }
    else {
      this.employeeDataSource.data = this.employeeList;
      this.employeeDataSource.filter = '';
    }
  }

  getEmployeeById(id: string) {
    this.showSpinner = true;
    this.employeeService.getEmployeeById(id).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          if (response.data) {
            debugger;
            this.employeeDataSource.data = [...this.employeeDataSource.data, ...[response.data]];
            this.employeeDataSource.filter = id;
          }
          else
            this.messageService.add({ severity: 'info', summary: 'Info', detail: response?.message ?? "not found" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while finding employee" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    )
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.employeeDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.employeeDataSource.data.forEach(row => this.selection.select(row));
  }
  sortEmployeeListData(sort: Sort) {
    const data = this.employeeList.slice();
    if (!sort.active || sort.direction === '') {
      this.employeeDataSource.data = data;
      return;
    }

    this.employeeDataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'empId':
          return compare(a.empId, b.empId, isAsc);
        case 'empName':
          return compare(a.empName, b.empName, isAsc);
        case 'iqamaSIDNumber':
          return compare(a.iqamaSIDNumber, b.iqamaSIDNumber, isAsc);
        case 'passportNumber':
          return compare(a.passportNumber, b.passportNumber, isAsc);
        default:
          return 0;
      }
    });
  }
  confirmDelete(row: any, event: MouseEvent) {
    event.stopPropagation();
    this.selectedRow = row;
    this.deleteDialog.show();
  }

  deleteSalaryCalculation(row: any) {
    debugger;
    this.showSpinner = true;
    this.salaryCalculationService.deleteSalaryCalculation(row.salaryCalculationId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Salary calculation deleted successfully" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while deleting salary calculation" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }
  validToSubmit() {
    return this.selectedProcessType === 0 || (this.selectedProcessType === 1 && this.selection.selected?.length > 0);
  }
}
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
