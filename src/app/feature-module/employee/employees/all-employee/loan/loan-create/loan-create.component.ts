import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoanService } from 'src/app/core/core.index';
import { createLoanModel } from 'src/app/core/models/loan/createLoan-model';
import { LoanOtherTypesModel } from 'src/app/core/models/loan/loanOtherTypes-model';
import { LoanType } from 'src/app/core/models/loan/LoanType.enum';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.scss']
})
export class LoanCreateComponent implements OnInit {
  loanForm!: FormGroup;
  loanTypes = LoanType;
  loanOtherTypes: LoanOtherTypesModel[] = [];
  loanTypeKeys: number[];
  employeeControl !: FormControl;
  showSpinner: boolean = false;
  projectId !: string;
  employeeList: any[] = [];
  filteredEmployees: any[] = [];
  searchValue: string = '';

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private router: Router)
    {
      this.loanTypeKeys = Object.keys(this.loanTypes)
        .filter(key => !isNaN(Number(key)))
        .map(Number);

        this.loanForm = this.fb.group({
          payGroupId: [''],
          amount: [1, [Validators.required, Validators.min(1)]],
          empNum: ['', Validators.required],
          loanDate: ['', Validators.required],
          effectiveDate: ['', Validators.required],
          loanNotes: ['', Validators.maxLength(200)],
          loanType: [LoanType.Personal, Validators.required],
          numOfInstallments: [1, [Validators.required, Validators.min(1)]],
          installmentAmount: [1, [Validators.required, Validators.min(1)]],
          otherLoanTypeId: ['']
        }, {
          validators: this.validateInstallments() // Attach custom validator
        });


    }

    validateInstallments(): ValidatorFn {
      return (form: AbstractControl): ValidationErrors | null => {
        const amount = form.get('amount')?.value;
        const numOfInstallments = form.get('numOfInstallments')?.value;
        const installmentAmount = form.get('installmentAmount')?.value;

        // Check if values are present and valid
        if (amount && numOfInstallments && installmentAmount) {
          // Validation logic: numOfInstallments * installmentAmount must not exceed amount
          if (numOfInstallments * installmentAmount > amount || numOfInstallments * installmentAmount < amount) {
            return { invalidInstallment: true }; // Return an error
          }
        }
        return null; // Return null if no error
      };
    }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getEmployeeList();
    this.employeeControl = this.loanForm.get('empNum') as FormControl || new FormControl();
    this.getLoanOtherTypesList();
    this.setupInstallmentAmountUpdate();
  }

  onLoanTypeChange(event: any): void {
    const loanTypeValue = event.target.value;
    const otherControl = document.getElementById('otherLoanTypeId');
    if (loanTypeValue === 'Other' || loanTypeValue === '100') {
      if (otherControl) otherControl.style.display = 'block';
      this.loanForm.addControl('otherLoanTypeId', this.fb.control('', Validators.required));
    } else {
      if (otherControl) otherControl.style.display = 'none';
      this.loanForm.removeControl('otherLoanTypeId');
    }
  }

  getLoanOtherTypesList(): void {
    const payGroupId = this.loanForm.get('payGroupId')?.value || this.projectId;
    this.loanService.getLoanOtherTypesList(payGroupId, 1, 100).subscribe(
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

  createLoan(): void {
    if (this.loanForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000 });
      return;
    }
    const loanData: createLoanModel = this.loanForm.value;
    loanData.payGroupId=this.projectId;
    loanData.loanType=LoanType[loanData.loanType as unknown as keyof typeof LoanType];
    loanData.loanDate =formatDate(loanData.loanDate, 'yyyy-MM-dd', 'en-US');
    loanData.effectiveDate=formatDate(loanData.effectiveDate, 'yyyy-MM-dd', 'en-US');


    if(!loanData.otherLoanTypeId)
      loanData.otherLoanTypeId='';
    debugger;
    this.loanService.createLoan(loanData).subscribe(
      (response:any) => {
        if(response && response.isSuccess){
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response?.data ?? "Loan created successfully"});
            this.loanForm.reset();
        }
        setTimeout(() => {
          this.router.navigate(['employees/loan-list']);
        }, 1000);

      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error ?? "Error creating Loan"
        });
      }
    );
  }

  getEmployeeList() {
    this.showSpinner = true;
    this.employeeService.getActiveEmployees(this.projectId, 1, 10).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.employeeList = response.data.employeeList;
          this.filteredEmployees = response.data.employeeList;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retriving employee list" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    )
  }

  filterEmployees() {

    const searchTerm = this.searchValue.toLowerCase();
    this.filteredEmployees = this.employeeList.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm) || employee.employeeId.includes(searchTerm)
    );
    if (this.filteredEmployees.length == 0) {
      this.getEmployeeById(searchTerm);
    }
  }

  getEmployeeById(id: string) {
    this.showSpinner = true;
    this.employeeService.getEmployeeById(id).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          if (response.data) {

            this.filteredEmployees = [response.data];
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
        console.error(error);
      }
    )
  }



  setupInstallmentAmountUpdate(): void {
    // Listen for changes in 'amount' and 'numOfInstallments' to update 'installmentAmount'
    this.loanForm.get('amount')?.valueChanges.subscribe(() => {
      this.updateInstallmentAmount();
    });

    this.loanForm.get('numOfInstallments')?.valueChanges.subscribe(() => {
      this.updateInstallmentAmount();
    });

    // Listen for changes in 'installmentAmount' to update 'numOfInstallments'
    this.loanForm.get('installmentAmount')?.valueChanges.subscribe((value) => {
      console.log('installmentAmount changed:', value); // Debug log
      this.updateNumOfInstallments();
    });
  }

  updateInstallmentAmount(): void {
    const amount = this.loanForm.get('amount')?.value;
    const numOfInstallments = this.loanForm.get('numOfInstallments')?.value;

    if (amount && numOfInstallments) {
      const installmentAmount = this.calculateInstallmentAmount(amount, numOfInstallments);
      this.loanForm.get('installmentAmount')?.setValue(installmentAmount, { emitEvent: false }); // Prevent looping events
    }
  }

  updateNumOfInstallments(): void {
    const amount = this.loanForm.get('amount')?.value;
    const installmentAmount = this.loanForm.get('installmentAmount')?.value;

    if (amount && installmentAmount) {
      const numOfInstallments = this.calculateNumOfInstallments(amount, installmentAmount);
      this.loanForm.get('numOfInstallments')?.setValue(numOfInstallments, { emitEvent: false }); // Prevent looping events
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


}
