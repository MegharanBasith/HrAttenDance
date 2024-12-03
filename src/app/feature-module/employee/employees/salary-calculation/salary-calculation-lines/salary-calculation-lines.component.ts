import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SalaryCalculationService, UserRoleService, routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-salary-calculation-lines',
  templateUrl: './salary-calculation-lines.component.html',
  styleUrl: './salary-calculation-lines.component.scss'
})
export class SalaryCalculationLinesComponent implements OnInit {

  public routes = routes;
  public showSpinner: boolean = false;
  dataSource = new MatTableDataSource<any>([]);
  salaryCalculationLineList: any[] = [];
  columns: string[] = [
    'salaryCalculationId',
    'payGroupPeriodStartDate',
    'payGroupPeriodEndDate',
    'lineNum',
    'empId',
    'empName',
    'basicSalary',
    'monthDays',
    'actualWorkingDays',
    'absenceDays',
    'vacationDays',
    'netSalary',
    'loanAmount',
    'isPaid',
    'totalSalary',
    'paymentOrderId',
    'paymentOrderProcess',
    'hasError'
  ];
  allowanceColumns: string[] = [
    'allowanceCode',
    'allowanceType',
    'allowanceName',
    'amount'
  ];
  displayedColumnsWithActions: string[] = ['select', ...this.columns];
  selectedSalaryCalculation: any = '';
  public totalSalaryCalculations: number = 0;
  isAdmin: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);
  projectId !: string;
  visible : boolean = false;
  newRecalculatedSalryCalculationId !: string;
  processTypeOtions = [
    { id: 0, value: "All Employees" },
    { id: 1, value: "Selected Employees" },
  ];
  selectedProcessType !: any;
  displayedColumns: string[] = ['select', 'employeeId', 'name', 'iqamaNumber', 'passportNumber'];
  employeeDataSource = new MatTableDataSource<any>([]);
  totalEmployees !: any[];
  employeeIdFilter !: string;
  employeeList: any[] = [];
  employeeSelection = new SelectionModel<any>(true, []);
  notEditableStatus = 2;
  approvedWorkflowState = 4;
  selectedRow !: any;

  constructor(private salaryCalculationService: SalaryCalculationService, private messageService: MessageService, 
    private userRoleService: UserRoleService, private employeeService : EmployeeService, private router : Router) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.isAdmin = this.userRoleService.isAdmin();
    let notParsedSalaryCalculation= localStorage.getItem('selectedSalaryCalculation');
    if (notParsedSalaryCalculation)
      this.selectedSalaryCalculation = JSON.parse(notParsedSalaryCalculation);
    this.getSalaryCalculationLines(environment.defaultPageStartIndex, environment.defaultPageSize);
  }

  setPage(event: any) {
    this.getSalaryCalculationLines((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  getSalaryCalculationLines(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.salaryCalculationService.getSalaryCalculationLineList(this.selectedSalaryCalculation.salaryCalculationId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.salaryCalculationLineList = response.data.salaryCalcLines;
          this.dataSource.data = response.data.salaryCalcLines;
          this.dataSource.sort = this.sort;
          this.totalSalaryCalculations = response.data.totalRecordsCount;
          this.selectedRow = this.salaryCalculationLineList[0];
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    )
  }

  deleteSalaryCalculationLines() {
    debugger;
    this.showSpinner = true;
    let salaryCalculationLines = this.selection.selected.map(x => ({
      RecId: x.recId
    }));
    this.salaryCalculationService.deleteSalaryCalculationLines(this.selectedSalaryCalculation.salaryCalculationId, salaryCalculationLines).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          debugger;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Salary calculation lines deleted successfully" });
          const excludedRecIds = salaryCalculationLines.map(line => line.RecId);
          this.dataSource.data = this.dataSource.data.filter((item: any) =>
            !excludedRecIds.includes(item.recId)
          );
          this.selection = new SelectionModel<any>(true, []);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while deleting salary calculation lines" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  recalculateSalaryCalculationLines() {
    debugger;
    this.showSpinner = true;
    this.salaryCalculationService.recalculateSalaryCalculation(this.projectId, this.selectedSalaryCalculation.salaryCalculationId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.newRecalculatedSalryCalculationId = response.data;
          this.visible = true;
          this.getActiveEmployeeList(1, 10);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while recalculating the salary calculation" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while recalculating the salary calculation" });
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
          this.employeeDataSource.data = response.data.employeeList;
          this.totalEmployees = response.data.totalRecordsCount;
          this.visible = true;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retriving employee list" });
        }
      },
      (error : any) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
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

  sortEmployeeListData(sort: Sort) {
    const data = this.employeeList.slice();
    if (!sort.active || sort.direction === '') {
      this.employeeDataSource.data = data;
      return;
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

  createSalaryCalculation() {
    debugger;
    this.showSpinner = true;
    let selectedEmployeeList = this.employeeSelection.selected.map(x => ({ EmpId: x.employeeId, IqamaSIDNumber: x.iqamaNumber, EmpName: x.name, PassportNumber: x.passportNumber }))
    this.salaryCalculationService.CreateSalaryCalculation(this.newRecalculatedSalryCalculationId, this.projectId, this.selectedProcessType, selectedEmployeeList).subscribe(
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
    this.salaryCalculationService.processSalaryCalculation(this.newRecalculatedSalryCalculationId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.data ?? "Salary calculation processed successfully" });
          setTimeout(() => {
            this.router.navigate([routes.salaryCalculationList]);
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

  isAllSelected(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    const numSelected = selection.selected.length;
    const numRows = dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    debugger;
    this.isAllSelected(dataSource, selection)
      ? selection.clear()
      : dataSource.data.forEach(row => selection.select(row));
  }

  public sortData(sort: Sort) {
    const data = this.salaryCalculationLineList.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.salaryCalculationLineList = data;
    } else {
      this.salaryCalculationLineList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  setEmployeePage(event: any) {
    this.getActiveEmployeeList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  validToSubmit() {
    return this.selectedProcessType === 0 || (this.selectedProcessType === 1 && this.employeeSelection.selected?.length > 0);
  }

  approveSalaryCalculation() {
    debugger;
    this.showSpinner = true;
    this.salaryCalculationService.approveSalaryCalculation(this.selectedSalaryCalculation.salaryCalculationId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          debugger;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.return ?? "Salary calculation approved successfully" });
          setTimeout(() => {
            this.router.navigate([routes.salaryCalculationList])
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while approving salary calculation" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while approving salary calculation" });
        console.error(error);
      }
    )
  }
  onRowClicked(row : any){
     this.selectedRow = row;
  }
}
