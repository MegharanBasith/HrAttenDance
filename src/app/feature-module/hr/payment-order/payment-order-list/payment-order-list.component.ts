import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PaymentOrderService, routes, SalaryCalculationService, TimesheetService } from 'src/app/core/core.index';
import { CreatePaymentOrderModel } from 'src/app/core/models/payment-order/create-payment-order-model';
import { WPSPaymentOrderModel } from 'src/app/core/models/payment-order/wps-payment-order-model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { environment } from 'src/app/environments/environment';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-payment-order-list',
  templateUrl: './payment-order-list.component.html',
  styleUrl: './payment-order-list.component.scss'
})
export class PaymentOrderListComponent implements OnInit {

  paymentOrderForm !: FormGroup;
  public routes = routes;
  public showSpinner: boolean = false;
  dataSource = new MatTableDataSource<any>([]);
  paymentOrderList: any[] = [];
  columns: string[] = [
    'paymentOrderID',
    'paymentOrderDate',
    'voucherType',
    'paymentType',
    'activeInModadd',
    'accountNum',
    'timeSheetPeriod',
    'workflowState',
    'hasErrors',
    'settled',
    'amount',
  ];
  displayedColumnsWithActions: string[] = ['actions', ...this.columns];
  employeeDataSource = new MatTableDataSource<any>([]);
  employeeSelection = new SelectionModel<any>(true, []);
  salaryCalculationDataSource = new MatTableDataSource<any>([]);
  salaryCalculationSelection = new SelectionModel<any>(true, []);
  public totalSalaryCalculations: number = 0;
  public totalPaymentOrders: number = 0;
  public totalEmployees: number = 0;
  employeeList: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  newSalaryCalculationId !: string;
  visible: boolean = false;
  selectedEmployees: any;
  periods: string[] = [];
  newCreatedPaymentOrderId: any;
  showGenerateWPSDialog: boolean = false;
  salaryCalculationList: any[] = [];
  currentPage: number = 1;
  selectedGenerationType !: number;
  salaryCalculationIdFilter !: string;
  employeeIdFilter !: string;
  approvedWorkflowState = 4;

  voucherTypeOptions = [
    { id: 0, value: "Monthly Salary" },
    { id: 1, value: "Vacation" },
    { id: 2, value: "EOS" },
    { id: 4, value: "Earning Separate" },
    { id: 5, value: "Loan" },
  ];

  paymentTypeOptions = [
    //{ id: 0, value: "None" },
    { id: 1, value: "Cash" },
    { id: 2, value: "Transfer" },
    // { id: 3, value: "Check" },
    // { id: 4, value: "Vendor" },
    // { id: 5, value: "Ledger" },
    // { id: 6, value: "Customer" },
    // { id: 7, value: "CashV2" }
  ];

  molTypeOptions = [
    { id: 1, value: "HQ" },
    { id: 2, value: "Corporate" },
    { id: 3, value: "Individual" }
  ];

  generationTypeOptions = [
    { id: 0, value: "All Employees" },
    { id: 1, value: "Selected Employees" },
    { id: 2, value: "Selected Salary Calculation" }
  ];

  salaryCalculationDisplayedColumns: string[] = ['select', 'salaryCalculationId'];
  employeeDisplayedColumns: string[] = ['select', 'employeeId', 'name', 'iqamaNumber', 'passportNumber'];
  projectId !: string;
  corporateMoleTypeId: number = 2;
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  selectedRow !: any;
  bankAccounts !: any;
  transferPaymentType: number = 2;
  filteredGenerationTypes: Array<any> = [];
  selectSalaryCalculationId = 0;

  constructor(private paymentOrderService: PaymentOrderService, private router: Router, private messageService: MessageService,
    private fb: FormBuilder, private timesheetService: TimesheetService, private salaryCalculationService: SalaryCalculationService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.paymentOrderForm = this.fb.group({
      voucherType: ['', Validators.required],
      paymentType: ['', Validators.required],
      period: ['', Validators.required],
      //molType: ['', Validators.required],
      description: [''],
      bankAccount: [''],
    });
    this.onChanges();
    this.getPaymentOrderList(environment.defaultPageStartIndex, environment.defaultPageSize);
    this.getPeriods();
  }

  onChanges(): void {
    this.paymentOrderForm.get('paymentType')?.valueChanges.subscribe(x => {
      if (x === this.transferPaymentType) {
        this.paymentOrderForm.get('bankAccount')?.setValidators([Validators.required]);
      } else {
        this.paymentOrderForm.get('bankAccount')?.clearValidators();
      }
      this.paymentOrderForm.get('bankAccount')?.updateValueAndValidity();
    });
  }

  setPage(event: any) {
    this.getPaymentOrderList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  getPaymentOrderList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.paymentOrderService.getPaymentOrderList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.paymentOrderList = response.data.paymentOrderList;
          this.dataSource.data = response.data.paymentOrderList;
          this.dataSource.sort = this.sort;
          this.totalPaymentOrders = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    )
  }

  getPeriods() {
    this.timesheetService.getTimesheetPeriods().subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.periods = response.data.map((p: { timeSheetPeriod: string; }) => p.timeSheetPeriod);
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  public sortData(sort: Sort) {
    const data = this.paymentOrderList.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.paymentOrderList = data;
    } else {
      this.paymentOrderList = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  onRowClicked(row: any) {
    debugger;
    localStorage.setItem('selectedRecId', JSON.stringify(row.recId));
    localStorage.setItem('selectedPaymentOrder', JSON.stringify(row));
    this.router.navigate([this.routes.paymentOrderLines]);
  }
  onCreate() {
    this.visible = true;
  }

  onCreatePaymentOrderSubmit() {
    this.showSpinner = true;
    let paymentOrderModel: CreatePaymentOrderModel = {
      PayGroupId: this.projectId,
      MolType: this.corporateMoleTypeId,
      PaymentType: this.paymentOrderForm.get("paymentType")?.value,
      Period: this.paymentOrderForm.get("period")?.value,
      VoucherType: this.paymentOrderForm.get("voucherType")?.value,
      BankAccountId: this.paymentOrderForm.get("bankAccount")?.value
    };

    this.paymentOrderService.createPaymentOrder(paymentOrderModel).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.newCreatedPaymentOrderId = response.data;
          this.showGenerateWPSDialog = true;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response ? response.message ?? response.data : "An error has ocuured while creating payment order" });
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      }
    )
  }

  generatePaymentOrderWPS() {
    if (this.isValidToGenerateWPS() === false) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please make sure to select at least one row from the table' });
      return;
    }

    this.showSpinner = true;
    let wpsPaymentOrderModel: WPSPaymentOrderModel = {
      PayGroupId: this.projectId,
      PaymentOrderId: this.newCreatedPaymentOrderId,
      EmployeeList: this.employeeSelection.selected ? this.employeeSelection.selected.map(x => ({ EmpId: x.employeeId })) : undefined,
      SalaryCalculationList: this.salaryCalculationSelection.selected ? this.salaryCalculationSelection.selected.map(x => ({ SalaryCalculationId: x.salaryCalculationId })) : undefined,
      GenerationType: this.selectedGenerationType
    };

    this.paymentOrderService.genertePaymentOrderWPS(wpsPaymentOrderModel).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.data ?? "Payment order WPS generated successfully" });
          this.showGenerateWPSDialog = false;
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response ? response.message ?? response.data : "An error has ocuured while creating payment order" });
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      }
    )
  }

  getApprovedNotPaidSalaryCalculationList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.salaryCalculationService.getApprovedNotPaidSalaryCalculationList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.salaryCalculationList = response.data.salaryCalculationList;
          this.salaryCalculationDataSource.data = response.data.salaryCalculationList;
          this.salaryCalculationDataSource.sort = this.sort;
          this.totalSalaryCalculations = response.data.totalRecordsCount;
        }
      },
      (error: any) => {
        this.showSpinner = false;
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
          this.employeeDataSource.sort = this.sort;
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

  nextPage() {
    if (this.currentPage < 2) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  filterSalaryCalculations() {
    if (this.salaryCalculationIdFilter && this.salaryCalculationIdFilter != "") {
      const salaryCalculationExists = this.dataSource.data.some(emp => emp.employeeId === this.employeeIdFilter);

      if (salaryCalculationExists) {
        // Filter the data source on the client-side
        this.salaryCalculationDataSource.filter = this.salaryCalculationIdFilter.trim().toLowerCase();
      } else {
        // Fetch data from the server-side if the value does not exist
        this.getSalaryCalculationbyId(this.salaryCalculationIdFilter);
      }
    }
    else {
      this.salaryCalculationDataSource.data = this.salaryCalculationList;
      this.salaryCalculationDataSource.filter = '';
    }
  }

  getSalaryCalculationbyId(id: string) {
    this.showSpinner = true;
    this.salaryCalculationService.getSalaryCalculationById(id).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          if (response.data)
            this.salaryCalculationDataSource.data = [response.data];
          else
            this.messageService.add({ severity: 'info', summary: 'Info', detail: response?.message ?? "not found" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while finding searched id" });
        }
      },
      (error) => {
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

  getEmployeeById(id: string) {
    this.showSpinner = true;
    this.employeeService.getEmployeeById(id).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          if (response.data) {
            debugger
            this.employeeDataSource.data = [response.data];
          }
          else
            this.messageService.add({ severity: 'info', summary: 'Info', detail: response?.message ?? "not found" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while finding searched id" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  onGenerationTypeSelectionChange() {
    debugger;
    if (this.selectedGenerationType === 1)
      this.getActiveEmployeeList(1, 10);

    else if (this.selectedGenerationType === 2)
      this.getApprovedNotPaidSalaryCalculationList(1, 10);
  }

  isValidToGenerateWPS() {
    if (this.selectedGenerationType === 0 || (this.selectedGenerationType === 1 && this.employeeSelection.selected.length > 0) ||
      (this.selectedGenerationType === 2 && this.salaryCalculationSelection.selected.length > 0))
      return true;

    return false;
  }

  confirmDelete(row: any, event: MouseEvent) {
    event.stopPropagation();
    this.selectedRow = row;
    this.deleteDialog.show();
  }

  deletePaymentOrder(row: any) {
    this.showSpinner = true;
    this.paymentOrderService.deletePaymentOrder(row.paymentOrderID).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Payment order deleted successfully" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while deleting payment order" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  getBankAccountList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.paymentOrderService.getBankAccountList(startIndex, pageSize).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.bankAccounts = response.data.bankAccountList;
        }
        else
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while retrieving bank account" });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occurred while retrieving bank account" });
        this.showSpinner = false;
      }
    )
  }

  onPaymentTypeChange() {
    let paymentType = this.paymentOrderForm.get('paymentType')?.value;
    if (paymentType && paymentType === this.transferPaymentType)
      this.getBankAccountList(1, 100);
  }

  setEmployeePage(event: any) {
    this.getActiveEmployeeList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  setSalaryCalculationPage(event: any) {
    this.getApprovedNotPaidSalaryCalculationList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  onVoucherTypeChange() {
    if (this.paymentOrderForm.get('voucherType')?.value !== this.selectSalaryCalculationId)
      this.filteredGenerationTypes = [
        { id: 1, value: "Selected Employees" },
      ];
    else
      this.filteredGenerationTypes = this.generationTypeOptions;
  }
}
