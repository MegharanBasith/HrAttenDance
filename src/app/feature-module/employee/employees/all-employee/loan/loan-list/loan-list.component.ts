import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoanService, routes, UserRoleService } from 'src/app/core/core.index';
import { adjustLoanModel } from 'src/app/core/models/loan/adjustLoan-model';
import { LoanStatus } from 'src/app/core/models/loan/loanStatus.enum';
import { LoanType } from 'src/app/core/models/loan/LoanType.enum';
import { LoanWorkflowStatus } from 'src/app/core/models/loan/loanWorkflowStatus.enum';
import { environment } from 'src/app/environments/environment';
import { ConfirmModalComponent } from 'src/app/feature-module/common/confirm-modal/confirm-modal.component';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit {
  cols = [
    'loanId',
    'contractId',
    'empNum',
    'loanProfileId',
    'loanProfileTypeRefRecId',
    'loanReasonId',
    'loanType',
    'otherLoanTypeId',
    'sourceType',
    'loanDate',
    // 'effectiveDate',
    'actualEndDate',
    'payGroupPeriodStartDate',
    'payGroupPeriodEndDate',
    'amount',
    'installmentAmount',
    'numOfInstallments',
    'isClosed',
    // 'remainingAmount',
    // 'deductedAmount',
    'prepaidAllowanceCode',
    'prepaidContractId',
    'purchAdvancePym',
    'referenceNo',
    'payVoucherNum',
    'payVoucherJournalId',
    'payVoucherLineNum',
    'loanNotes',
    'notes',
    'guarantor',
    'workflowState',
    'loanStatus',
    'isPaid',
    'onHold',
  ];

  columnHeaders: Record<string, string> = {
    loanId: 'Loan ID',
    empNum: 'Employee Number',
    loanType: 'Loan Type',
    otherLoanTypeId: 'Other Loan Type ID',
    loanDate: 'Loan Date',
    // effectiveDate: 'Effective Date',
    amount: 'Amount',
    installmentAmount: 'Installment Amount',
    numOfInstallments: 'Number of Installments',
    // deductedAmount:'Deducted Amount',
    // remainingAmount:'Remaining Amount',
    workflowState: 'Workflow State',
    loanStatus: 'Loan Status',
    isPaid: 'Is Paid',
    onHold: 'On Hold',
  };

  displayedInstallmentColumns = [
    'LoanId',
    'InstallmentPayMethod',
    'LoanDate',
    'PaidInstallmentAmnt',
    'PayGroupPeriodStartDate',
    'PayGroupPeriodEndDate'
  ];

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  installmentDisplayedColumns:string[]=[];
  installmentDataSource=new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sortinstallment!: MatSort;
  isAdmin: boolean = false;

  public totalRecordsCount = 0;
  public totalInstallmentRecordsCount = 0;
  selectedLoanId!:string;
  showInstallmentModal:boolean=false;
  isAdjustModalOpen = false;
  adjustData: adjustLoanModel = { loanId: '', monthlyPayment: 0, numOfInstallments: 0 };
  remainingAmount: number = 0; // Store remainingAmount separately
  showSpinner: boolean = false;
  @ViewChild('confirmDialog') confirmDialog!: ConfirmModalComponent;
  selectedRow!: any;
  installmentSelectedRow!:any;
  actionType: string = '';
  projectId !: string;
  public routes = routes;

  constructor(private loanService: LoanService, private messageService: MessageService, private router: Router,private userRoleService : UserRoleService){}

  ngOnInit(): void {
    this.isAdmin = this.userRoleService.isAdmin();

    const unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId) {
      this.projectId = unparsedProjectId;
    }
    this.getLoanList(environment.defaultPageStartIndex, environment.defaultPageSize);
    this.displayedColumns = ['actions', ...this.cols.filter(column => column in this.columnHeaders)];
  }

  getLoanList(startIndex: number, pageSize: number) {
    this.showSpinner = true;

    this.loanService.getLoanList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data.loanTransactionList;
          this.dataSource.sort = this.sort;
          this.totalRecordsCount = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An Error has occurred while retrieving loan list" });
      }
    )
  }

  getLoanWorkflowStatusString(status: number): string {

    return LoanWorkflowStatus[status] as string;
  }

  getLoanloanStatusString(status: number): string {

    return LoanStatus[status] as string;
  }

  canEdit(workflowState: number): boolean {
    const editableStatuses = [
      LoanWorkflowStatus.NotSubmitted,
      LoanWorkflowStatus.Submitted,
      LoanWorkflowStatus.PendingComplete
    ];
    return editableStatuses.includes(workflowState);
  }

  deleteLoan(row: any) {
    debugger;
    this.showSpinner = true;
    this.loanService.deleteLoan(row.loanId).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "Loan Deleted successfully" });
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while Deleting the loan" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while Deleting the loan" });
      }
    )
  }

  holdLoan(row: any) {
    this.showSpinner = true;
    this.loanService.holdLoan(row.loanId).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "Loan Holded successfully" });
          this.getLoanList(environment.defaultPageStartIndex, environment.defaultPageSize);
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while Holding the loan" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while Holding the loan" });
      }
    )
  }

  submitLoan(row: any) {
    this.showSpinner = true;
    this.loanService.submitLoan(row.loanId).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.getLoanList(environment.defaultPageStartIndex, environment.defaultPageSize);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "Loan Submitted successfully" });
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while Submitting the loan" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while Submitting the loan" });
      }
    )
  }

  adjustLoan(row: any) {
    debugger;
    this.showSpinner = true;
    this.loanService.adjustLoan(row).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "Loan Adjusted successfully" });
          this.getLoanList(environment.defaultPageStartIndex, environment.defaultPageSize);
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while Adjusting the loan" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while Adjusting the loan" });
      }
    )
  }

  setPage(event: any) {
    this.getLoanList((event.pageIndex * event.pageSize) + 1, event.pageSize);
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
    } else {
      this.dataSource.data = data.sort((a: any, b: any) => {
        const aValue = a[sort.active];
        const bValue = b[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  confirmAction(row: any, action: string) {
    this.selectedRow = row;
    this.actionType = action;
    this.confirmDialog.show(action);
  }


  onConfirmAction() {
    this.showSpinner = true;

    switch (this.actionType) {
      case 'delete':
        this.deleteLoan(this.selectedRow);
        break;
      case 'submit':
        this.submitLoan(this.selectedRow);
        break;
      case 'hold':
        this.holdLoan(this.selectedRow);
        break;
      default:
        this.showSpinner = false;
        console.error('Unknown action type');
    }
  }

  openAdjustModal(row: any): void {

    if (row) {
      //this.adjustData = { ...row };
      this.isAdjustModalOpen = true;
      this.adjustData.loanId=row.loanId;
      this.adjustData.monthlyPayment=row.monthlyPayment?row.monthlyPayment:0;
      this.adjustData.numOfInstallments=row.numOfInstallments;
      const modal = document.getElementById('adjustLoanModal');
      if (modal) {
        this.setupMonthlyPaymentUpdate(row);
        modal.classList.add('show');
        modal.style.display = 'block';
        modal.setAttribute('aria-modal', 'true');
      }
    } else {
      console.warn('Row is undefined');
      this.selectedRow = {}; // Reset to avoid template access errors
    }
  }

  closeAdjustModal(): void {
    this.isAdjustModalOpen = false;
    const modal = document.getElementById('adjustLoanModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.removeAttribute('aria-modal');
    }
  }
  // Submit Adjustment
  submitAdjustment() {
    this.adjustLoan(this.adjustData);
    this.closeAdjustModal();
  }


  getLoanDetails(loanId:string) {
    this.loanService.getLoanDetails(loanId).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.router.navigate([routes.loanedit], { state: { data: response.data } });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An Error has occurred while retrieving loan installment list" });
      }
    )
  }

  getLoanTypeString(type: LoanType): string {
    return LoanType[type];
  }


  // Initialize adjustData and remainingAmount when opening the modal
  setupMonthlyPaymentUpdate(row: any): void {
    if (row) {
      this.remainingAmount = row.remainingAmount || 0; // Store remainingAmount from the row

      this.adjustData = {
        loanId: row.loanId,
        monthlyPayment: row.monthlyPayment || 0,
        numOfInstallments: row.numOfInstallments || 0,
      };

      // Update monthlyPayment based on remainingAmount and numOfInstallments
      this.adjustData.monthlyPayment = this.calculateMonthlyPayment(
        this.remainingAmount,
        this.adjustData.numOfInstallments
      );
    }
  }

  // Handle changes to numOfInstallments
  onNumOfInstallmentsChange(): void {
    if (this.adjustData.numOfInstallments > 0) {
      this.adjustData.monthlyPayment = this.calculateMonthlyPayment(
        this.remainingAmount,
        this.adjustData.numOfInstallments
      );
    } else {
      this.adjustData.monthlyPayment = 0;
    }
  }

  // Handle changes to monthlyPayment
  onMonthlyPaymentChange(): void {
    if (this.adjustData.monthlyPayment > 0) {
      this.adjustData.numOfInstallments = this.calculateNumOfInstallments(
        this.remainingAmount,
        this.adjustData.monthlyPayment
      );
    } else {
      this.adjustData.numOfInstallments = 0;
    }
  }

  // Calculation Helpers
  private calculateNumOfInstallments(remainingAmount: number, monthlyPayment: number): number {
    return monthlyPayment > 0 ? Math.ceil(remainingAmount / monthlyPayment) : 0;
  }

  private calculateMonthlyPayment(remainingAmount: number, numOfInstallments: number): number {
    return numOfInstallments > 0 ? remainingAmount / numOfInstallments : 0;
  }

}


// openInstallmentModal(loanId: string): void {
  //   this.selectedLoanId = loanId;
  //   this.getLoanInstallmentList(loanId, 1, 10); // Initial page index and size
  //   this.showInstallmentModal = true;
  // }

  // closeModal() {
  //   this.showInstallmentModal = false; // Set the modal visibility to false to hide it
  // }

  // getLoanInstallmentList(loanId:string,startIndex: number, pageSize: number) {
  //   this.showSpinner = true;
  //   this.loanService.getLoanInstallmentList(loanId, startIndex, pageSize).subscribe(
  //     (response: any) => {
  //       this.showSpinner = false;
  //       if (response && response.isSuccess) {
  //         this.installmentDataSource.data = response.data.LoanTransactionInstallmentsList;
  //         this.installmentDataSource.sort = this.sortinstallment;
  //         this.totalInstallmentRecordsCount = response.data.TotalRecordsCount;
  //       }
  //     },
  //     (error) => {
  //       this.showSpinner = false;
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An Error has occurred while retrieving loan installment list" });
  //     }
  //   )
  // }

  // setInstallmentPage(event: PageEvent) {
  //   const pageIndex = event.pageIndex >= 0 ? event.pageIndex : 0; // Ensure non-negative pageIndex
  //   const pageSize = event.pageSize > 0 ? event.pageSize : 10; // Default to 10 if pageSize is invalid
  //   const startIndex = pageIndex * pageSize + 1; // Convert zero-based index to 1-based for the API

  //   this.getLoanInstallmentList(this.selectedRow.loanId, startIndex, pageSize);
  // }


  // sortInstallmentData(sort: Sort): void {
  //   const data = this.installmentDataSource.data.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.installmentDataSource.data = data;
  //   } else {
  //     this.installmentDataSource.data = data.sort((a: any, b: any) => {
  //       const aValue = a[sort.active];
  //       const bValue = b[sort.active];
  //       return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
  //     });
  //   }
  // }
