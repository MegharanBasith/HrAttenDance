import { LoanStopPeriodStatus } from './../../../../../../core/models/loan/LoanStopPeriodStatus.enum';
import { LoanStopPeriodModel } from './../../../../../../core/models/loan/LoanStopPeriod-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoanService, routes, UserRoleService } from 'src/app/core/core.index';
import { editLoanModel } from 'src/app/core/models/loan/editLoan-model';
import { LoanOtherTypesModel } from 'src/app/core/models/loan/loanOtherTypes-model';
import { LoanStopDisabled } from 'src/app/core/models/loan/loanStopDisabled.enum';
import { LoanType } from 'src/app/core/models/loan/LoanType.enum';
import { LoanWorkflowStatus } from 'src/app/core/models/loan/loanWorkflowStatus.enum';
import { environment } from 'src/app/environments/environment';
import { ConfirmModalComponent } from 'src/app/feature-module/common/confirm-modal/confirm-modal.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {

  cols = [
    'loanId',
    'deductedFromDate',
    'deductedToDate',
    'disabled',
    'status',
    'stopReasonId'
  ];

  columnHeaders: Record<string, string> = {
    loanId: 'Loan ID',
    deductedFromDate: 'Deducted From Date',
    deductedToDate: 'Deducted To Date',
    disabled: 'Disabled',
    status: 'Status',
    stopReasonId: 'Stop Reason ID',
  };

  // Define the fields to be displayed in the table
  installmentColumns = [
  'loanId',
  'transId',
  'lineNum',
  'loanDate',
  'loanType',
  'payGroupPeriodStartDate',
  "payGroupPeriodEndDate",
  'paidInstallmentAmnt',
];

// Define the headers for each column
installmentColumnsHeaders: Record<string, string> = {
  loanId: 'Loan ID',
  transId: 'Transaction ID',
  lineNum: 'Line Number',
  loanDate: 'Loan Date',
  loanType: 'Loan Type',
  payGroupPeriodStartDate:'payGroup Period Start Date',
  payGroupPeriodEndDate:'payGroup Period End Date',
  paidInstallmentAmnt: 'Paid Installment Amount',
};

  loanStopPeriodForm: FormGroup;
  editForm: FormGroup;
  documentId: string | undefined;
  dataSource = new MatTableDataSource<any>();
  isEditSubmitted = false;
  canEdit:boolean=true;
  loanTypes = LoanType;
  loanStopDisabble=LoanStopDisabled;
  loanStopStatus=LoanStopPeriodStatus;
  loanOtherTypes: LoanOtherTypesModel[] = [];
  loanTypeKeys: number[];
  loanStopStatusKeys:number[];
  loanStopDisableKeys:number[];

  projectId!:string;
  loan:any;
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sortinstallment!: MatSort;
  public totalRecordsCount = 0;
  isAdmin:boolean=false;
  selectedRow!: any;
  actionType: string = '';
  @ViewChild('confirmDialog') confirmDialog!: ConfirmModalComponent;
  isCreateModalOpen:boolean=false;
  public routes = routes;
  showSpinner: boolean = false;


  installmentDisplayedColumns:string[]=[];
  installmentDataSource=new MatTableDataSource<any>();
  public totalInstallmentRecordsCount = 0;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private loaService: LoanService,
    private router: Router,
    private messageService: MessageService,
    private userRoleService : UserRoleService)
    {

      this.loanTypeKeys = Object.keys(this.loanTypes)
        .filter(key => !isNaN(Number(key)))
        .map(Number);

      this.loanStopStatusKeys = Object.keys(this.loanStopStatus)
      .filter(key => !isNaN(Number(key)))
      .map(Number);

      this.loanStopDisableKeys = Object.keys(this.loanStopDisabble)
      .filter(key => !isNaN(Number(key)))
      .map(Number);

      this.editForm = this.fb.group({
        loanId:['',Validators.required],
        payGroupId: [''],
        amount: [1, [Validators.required, Validators.min(1)]],
        empNum: ['', Validators.required],
        loanDate: ['', Validators.required],
        effectiveDate:['',Validators.required],
        remainingAmount:[0,Validators.required],
        deductedAmount:[0,Validators.required],
        loanNotes: ['', Validators.maxLength(200)],
        loanType: [LoanType [LoanType.Personal], Validators.required],
        numOfInstallments: [1, [Validators.required, Validators.min(1)]],
        installmentAmount: [1, [Validators.required, Validators.min(1)]],
        otherLoanTypeId: ['']
      }, {
        validators: this.validateInstallments() // Attach custom validator
      });

      this.getLoanOtherTypesList();

      this.loanStopPeriodForm = this.fb.group({
        loanId: [''],
        deductedFromDate: ['', Validators.required],
        deductedToDate: ['', Validators.required],
        loanDate: [''],
        disabled: [0],
        status: [0],
        stopReasonId: [''],
      });


     }

  ngOnInit() {
    this.isAdmin = this.userRoleService.isAdmin();

    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    const data = history.state.data; // Assume data is passed through router state
    this.loan=data;
    if (data) {
      // Map the data to the form controls
      this.editForm.patchValue({
        loanId: data.loanId, // Change to match data property
        payGroupId: data.payGroupId,
        empNum:data.empNum,
        amount: data.amount,
        remainingAmount:data.remainingAmount,
        deductedAmount:data.deductedAmount,
        loanDate: new Date(data.loanDate),
        effectiveDate:new Date(data.effectiveDate),
        loanNotes: data.loanNotes,
        loanType: LoanType[data.loanType],
        numOfInstallments: data.numOfInstallments,
        installmentAmount:data.installmentAmount,
        otherLoanTypeId: data.otherLoanTypeId || '',
      });

      if (data.otherLoanTypeId) {
        this.editForm.patchValue({ otherLoanTypeId: data.otherLoanTypeId });
      }
      if(data.workflowState==LoanWorkflowStatus[LoanWorkflowStatus.Approved] || data.workflowState==LoanWorkflowStatus.Approved){
        this.canEdit=false;
      }
      else
        this.canEdit=true
      const otherControl=document.getElementById('otherLoanTypeId');
      if (data.loanType === 'Other' || data.loanType === 100) {
        debugger;
        if(otherControl)
          otherControl.style.display='block';
        // Add the 'otherLoanTypeId' control if 'Other' is selected
        this.editForm.addControl('otherLoanTypeId', this.fb.control('', Validators.required));
      } else {
        if (otherControl) {
          otherControl.style.display = 'none';  // Hide the input for 'Other'
        }      // Remove the 'otherLoanTypeId' control if another type is selected
        this.editForm.removeControl('otherLoanTypeId');
      }
    }
    debugger;
    this.setupInstallmentAmountUpdate();
    this.getLoanStopPeriodList(data.loanId);
    this.displayedColumns = ['actions', ...this.cols.filter(column => column in this.columnHeaders)];
    debugger;
    this.getLoanInstallmentList(data.loanId, 1, 10); // Initial page index and size
    this.installmentDisplayedColumns = [...this.installmentColumns.filter(column => column in this.installmentColumnsHeaders)];

  }

  validateInstallments(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const amount = form.get('amount')?.value;
      const numOfInstallments = form.get('numOfInstallments')?.value;
      const installmentAmount = form.get('installmentAmount')?.value;

      // Check if values are present and valid
      if (amount && numOfInstallments && installmentAmount) {
        // Validation logic: numOfInstallments * installmentAmount must not exceed amount
        if (numOfInstallments * installmentAmount > amount ||numOfInstallments * installmentAmount < amount) {
          return { invalidInstallment: true }; // Return an error
        }
      }
      return null; // Return null if no error
    };
  }

  model: editLoanModel={
    loanId: '',
    amount: 0,
    empNum: '',
    loanDate: new Date().toISOString(),
    effectiveDate: new Date().toISOString(),
    loanNotes: '',
    loanType: LoanType.Personal,
    numOfInstallments: 0,
    installmentAmount:0,
    otherLoanTypeId: ''
  };

  createloanStopPeriod:LoanStopPeriodModel={
    loanId: '',
    deductedFromDate: '',
    deductedToDate: '',
    loanDate: '',
    disabled: 0,
    status: 0,
    stopReasonId: ''
  }


  openCreateModal(): void {
      //this.adjustData = { ...row };
      this.isCreateModalOpen = true;
      this.createloanStopPeriod.loanId=this.loan.loanId;
      const modal = document.getElementById('createLoanStopModal');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
        modal.setAttribute('aria-modal', 'true');
      }
  }

  closeLoanStopModal(): void {
    this.isCreateModalOpen = false;
    const modal = document.getElementById('createLoanStopModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.removeAttribute('aria-modal');
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
        this.deleteLoanStopPeriod(this.selectedRow.loanId,this.selectedRow.version);
        break;
      case 'submit':
        this.submitLoanStopPeriod(this.selectedRow.loanId,this.selectedRow.version);
        break;
      default:
        this.showSpinner = false;
        console.error('Unknown action type');
    }
  }

  setPage(event: any) {
    this.getLoanStopPeriodList(this.loan.loanId);
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

  onLoanTypeChange(event: any): void {
    debugger;
    const loanTypeValue = event.target.value;
    const otherControl=document.getElementById('otherLoanTypeId');
    if (loanTypeValue === 'Other' || loanTypeValue === 100) {
      debugger;
      if(otherControl)
        otherControl.style.display='block';
      // Add the 'otherLoanTypeId' control if 'Other' is selected
      this.editForm.addControl('otherLoanTypeId', this.fb.control('', Validators.required));
    } else {
      if (otherControl) {
        otherControl.style.display = 'none';  // Hide the input for 'Other'
      }      // Remove the 'otherLoanTypeId' control if another type is selected
      this.editForm.removeControl('otherLoanTypeId');
    }
  }

  getLoanOtherTypesList(): void {
    const payGroupId = this.editForm.get('payGroupId')?.value || this.projectId;
    this.loaService.getLoanOtherTypesList(payGroupId, 1, 100).subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.loanOtherTypes = response.data.loanOtherTypesList;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message || 'Error fetching loan other types.' });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching loan other types.' });
      }
    );
  }

  updateLoan(): void {
    debugger;
    this.isEditSubmitted = true;
    if (this.editForm.valid) {
      this.model.loanId=this.editForm.value.loanId;
      this.model.amount=this.editForm.value.amount;
      this.model.empNum=this.editForm.value.empNum;
      this.model.loanDate=formatDate(this.editForm.get('loanDate')?.value, 'yyyy-MM-dd', 'en-US');
      this.model.effectiveDate=formatDate(this.editForm.get('effectiveDate')?.value, 'yyyy-MM-dd', 'en-US');
      this.model.loanNotes=this.editForm.value.loanNotes;
      this.model.loanType=this.editForm.value.loanType;
      this.model.numOfInstallments=this.editForm.value.numOfInstallments;
      this.model.otherLoanTypeId=this.editForm.value.otherLoanTypeId;
      this.model.installmentAmount=this.editForm.value.installmentAmount;

      this.model.loanType=LoanType[this.model.loanType as unknown as keyof typeof LoanType];
      if(!this.model.otherLoanTypeId || this.model.loanType !== 100)
        this.model.otherLoanTypeId='';
      this.loaService.updateLoan(this.model.loanId,this.model).subscribe(
        (response: any) => {
          debugger;
          this.isEditSubmitted = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Loan updated successfully" });
          this.editForm.reset();
          setTimeout(() => {
            this.router.navigate(['employees/loan-list']);
          }, 1000);
        },
        (error) => {
          console.error('Error updating worker document:', error);
        }
      );
    }
  }


  setupInstallmentAmountUpdate(): void {
    // Listen for changes in 'amount' and 'numOfInstallments' to update 'installmentAmount'
    this.editForm.get('amount')?.valueChanges.subscribe(() => {
      this.updateInstallmentAmount();
    });

    this.editForm.get('numOfInstallments')?.valueChanges.subscribe(() => {
      this.updateInstallmentAmount();
    });

    // Listen for changes in 'installmentAmount' to update 'numOfInstallments'
    this.editForm.get('installmentAmount')?.valueChanges.subscribe((value) => {
      console.log('installmentAmount changed:', value); // Debug log
      this.updateNumOfInstallments();
    });
  }

  updateInstallmentAmount(): void {
    const amount = this.editForm.get('amount')?.value;
    const numOfInstallments = this.editForm.get('numOfInstallments')?.value;

    if (amount && numOfInstallments) {
      const installmentAmount = this.calculateInstallmentAmount(amount, numOfInstallments);
      this.editForm.get('installmentAmount')?.setValue(installmentAmount, { emitEvent: false }); // Prevent looping events
    }
  }

  updateNumOfInstallments(): void {
    const amount = this.editForm.get('amount')?.value;
    const installmentAmount = this.editForm.get('installmentAmount')?.value;

    if (amount && installmentAmount) {
      const numOfInstallments = this.calculateNumOfInstallments(amount, installmentAmount);
      this.editForm.get('numOfInstallments')?.setValue(numOfInstallments, { emitEvent: false }); // Prevent looping events
    } else {
      console.warn('Invalid input for installment calculation'); // Debug log
    }
  }

  private calculateNumOfInstallments(amount: number, installmentAmount: number): number {
    return installmentAmount > 0 ? amount / installmentAmount : 0; // Avoid division by zero
  }

  private calculateInstallmentAmount(amount: number, numOfInstallments: number): number {
    debugger;
    return amount / numOfInstallments;
  }

  //////////////////////////loan stop period ////////////////////////

  getLoanStopPeriodList(loanId:string): void {
    debugger;
    this.loaService.LoanStopPeriodList(loanId,environment.defaultPageStartIndex, environment.defaultPageSize).subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          debugger;
          this.dataSource.data = response.data.loanTransactionStopPeriodList;
          this.dataSource.sort = this.sort;
          this.totalRecordsCount = response.data.totalRecordsCount;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message || 'Error fetching loan stop period list.' });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching loan stop period list.' });
      }
    );
  }

  createLoanStopPeriodMethod(): void {
    debugger;
    this.createloanStopPeriod.loanId=this.loan.loanId;
    this.createloanStopPeriod.deductedFromDate=formatDate(this.loanStopPeriodForm.value.deductedFromDate, 'yyyy-MM-dd', 'en-US');
    this.createloanStopPeriod.deductedToDate=formatDate(this.loanStopPeriodForm.value.deductedToDate, 'yyyy-MM-dd', 'en-US');
    this.createloanStopPeriod.loanDate=new Date().toISOString();
    this.createloanStopPeriod.stopReasonId='Stop';
    this.createloanStopPeriod.status=LoanStopPeriodStatus.Draft

    this.loaService.createLoanStopPeriod(this.createloanStopPeriod).subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "Loan stop period created successfully" });
          this.getLoanStopPeriodList(this.loan.loanId);
          this.closeLoanStopModal();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message || 'Error creating loan stop period.' });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while creating loan stop period.' });
      }
    );
  }

  getLoanStopPeriodDetails(loanId:string,version:number): void {
    this.loaService.LoanStopPeriodDetails(this.loan.loanId,version).subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.loanOtherTypes = response.data.loanOtherTypesList;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message || 'Error fetching loan stop period details.' });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching loan stop period details.' });
      }
    );
  }

  deleteLoanStopPeriod(loanId:string,version:number): void {
    this.loaService.deleteLoanStopPeriod(this.loan.loanId,version).subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.showSpinner=false;
          this.getLoanStopPeriodList(this.loan.loanId);
        } else {
          this.showSpinner=false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message || 'Error deleting loan stop period details.' });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting loan stop period details.' });
      }
    );
  }

  submitLoanStopPeriod(loanId:string,version:number): void {
    this.showSpinner = false;
    this.loaService.submitLoanStopPeriod(this.loan.loanId,version).subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.showSpinner=false;
          this.getLoanStopPeriodList(this.loan.loanId);
        } else {
          this.showSpinner=false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message || 'Error submitting loan stop period details.' });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while submitting loan stop period details.' });
      }
    );
  }

  getLoanInstallmentList(loanId:string,startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.loaService.getLoanInstallmentList(loanId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          debugger;
          this.installmentDataSource.data = response.data.loanTransactionInstallmentsList;
          this.installmentDataSource.sort = this.sortinstallment;
          this.totalInstallmentRecordsCount = response.data.TotalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An Error has occurred while retrieving loan installment list" });
      }
    )
  }

  setInstallmentPage(event: PageEvent) {
    const pageIndex = event.pageIndex >= 0 ? event.pageIndex : 0; // Ensure non-negative pageIndex
    const pageSize = event.pageSize > 0 ? event.pageSize : 10; // Default to 10 if pageSize is invalid
    const startIndex = pageIndex * pageSize + 1; // Convert zero-based index to 1-based for the API

    this.getLoanInstallmentList(this.selectedRow.loanId, startIndex, pageSize);
  }


  sortInstallmentData(sort: Sort): void {
    const data = this.installmentDataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.installmentDataSource.data = data;
    } else {
      this.installmentDataSource.data = data.sort((a: any, b: any) => {
        const aValue = a[sort.active];
        const bValue = b[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  getColumnValue(column: string, value: any): string {
    if (column === 'status') {
        return LoanStopPeriodStatus[value] || 'Unknown';
    } else if (column === 'disabled') {
        return LoanStopDisabled[value] || 'Unknown';
    }
    return value; // Default case: return the value as is
}

}
