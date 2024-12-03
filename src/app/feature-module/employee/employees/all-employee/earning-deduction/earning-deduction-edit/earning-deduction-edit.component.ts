import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EarningDeductionService, routes, UserRoleService } from 'src/app/core/core.index';

@Component({
  selector: 'app-earning-deduction-edit',
  templateUrl: './earning-deduction-edit.component.html',
  styleUrl: './earning-deduction-edit.component.scss'
})
export class EarningDeductionEditComponent implements OnInit {

  public routes = routes;
  form !: FormGroup;
  deductForm !: FormGroup;
  payWithOptions = ['Salary', 'Separate'];
  isPaidOptions = ['Yes', 'No'];
  transTypeOptions = ['Earning', 'Deduction'];
  employeeList: any[] = [];
  showSpinner: boolean = false;
  employeeControl !: FormControl; // Declare employeeControl
  earningList !: any[];
  deductionList !: any[];
  earnDeductList !: any[];
  earningTransactionType: string = "Earning";
  DeductionTransactionType: string = "Deduction";
  selectedEarnDeductTrans !: any;
  isAdmin: boolean = false;
  approvedWorkflowStatus = "Approved";
  salaryPayWithOPtion = "Salary";
  defaultDate = "1900-01-01";

  constructor(private fb: FormBuilder, private earningDeductionService: EarningDeductionService, private messageService: MessageService,
    private router: Router, private userRoleService: UserRoleService) { }

  ngOnInit(): void {
    debugger;
    let notParsedTransId = localStorage.getItem('selectEarnDeductRequest');
    if (notParsedTransId)
      this.selectedEarnDeductTrans = JSON.parse(notParsedTransId);

    this.isAdmin = this.userRoleService.isAdmin();

    this.form = this.fb.group({
      workername: new FormControl({ value: '', disabled: true }),
      paywith: ['', Validators.required],
      transType: ['', Validators.required],
      earningDeductionId: ['', Validators.required],
      fromEffectiveDate: [''],
      toEffectiveDate: [''],
      amount: [0],
      days: [0],
      percentage: [0],
      ispaid: new FormControl({ value: false, disabled: true })
    }, { validators: [this.atLeastOneFieldRequiredValidator(['amount', 'days', 'percentage']), this.validateDateRange] });

    this.employeeControl = this.form.get('employee') as FormControl || new FormControl();

    this.loadFormValues();

    if (this.selectedEarnDeductTrans.workflowstatus === this.approvedWorkflowStatus)
      this.form.disable();
  }

  loadFormValues(): void {
    debugger;
    this.selectedEarnDeductTrans.fromEffectiveDate = this.selectedEarnDeductTrans.fromEffectiveDate === this.defaultDate || this.selectedEarnDeductTrans.fromEffectiveDate === '' 
    ? '' : new Date(this.selectedEarnDeductTrans.fromEffectiveDate);
    this.selectedEarnDeductTrans.toEffectiveDate = this.selectedEarnDeductTrans.toEffectiveDate === this.defaultDate || this.selectedEarnDeductTrans.toEffectiveDate === '' 
    ? '' : new Date(this.selectedEarnDeductTrans.toEffectiveDate);

    // Load the appropriate list and then patch the form values
    if (this.selectedEarnDeductTrans.transType === this.earningTransactionType) {
      this.getEarningList(() => {
        this.form.patchValue(this.selectedEarnDeductTrans);
      });
    } else {
      this.getDeductionList(() => {
        this.form.patchValue(this.selectedEarnDeductTrans);
      });
    }
  }



  atLeastOneFieldRequiredValidator(fields: string[]): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const hasAtLeastOne = fields.some(fieldName => {
        const control = formGroup.get(fieldName);
        return control && control.value;
      });
      return hasAtLeastOne ? null : { atLeastOneRequired: true };
    };
  }

  validateDateRange(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('fromEffectiveDate')?.value;
    const endDate = control.get('toEffectiveDate')?.value;

    return startDate && endDate && new Date(endDate) < new Date(startDate)
      ? { 'invalidDateRange': true }
      : null;
  }

  onTransTypeChange(event: any) {
    if (event.value === this.earningTransactionType)
      this.getEarningList();
    else
      this.getDeductionList();
  }

  onPayWithChange(event: any) {
    if (event.value === this.salaryPayWithOPtion) {
      this.form.get('fromEffectiveDate')?.setValidators([Validators.required]);
      this.form.get('toEffectiveDate')?.setValidators([Validators.required]);
    }

    else {
      this.form.get('fromEffectiveDate')?.clearValidators();
      this.form.get('toEffectiveDate')?.clearValidators();
    }

    this.form.get('fromEffectiveDate')?.updateValueAndValidity();
    this.form.get('toEffectiveDate')?.updateValueAndValidity();
  }


  getEarningList(callback?: () => void): void {
    debugger;
    this.showSpinner = true;
    this.earningDeductionService.getEarningList().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.earningList = response.data;
          this.earnDeductList = response.data;
          if (callback) callback(); // Call the callback after loading is complete
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.message ?? "An error has occurred while retrieving earn list"
          });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message ?? "An error has occurred while retrieving earn list"
        });
      }
    );
  }

  getDeductionList(callback?: () => void): void {
    this.showSpinner = true;
    this.earningDeductionService.getDeductionList().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.deductionList = response.data;
          this.earnDeductList = response.data;
          if (callback) callback(); // Call the callback after loading is complete
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.message ?? "An error has occurred while retrieving deduct list"
          });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message ?? "An error has occurred while retrieving deduct list"
        });
      }
    );
  }


  updateEarningDeductionTrans() {
    debugger;
    if (this.form.invalid)
      this.form.markAllAsTouched();
    else {
      this.showSpinner = true;
      let model = this.constructEarningDeductionTransModel();

      this.earningDeductionService.updateEarningDeduction(this.selectedEarnDeductTrans.transId, model).subscribe(
        (response: any) => {
          this.showSpinner = false;
          if (response && response.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: "Earning/Deduction updated successfully"
            });
            setTimeout(() => {
              this.router.navigate([routes.earningDeductionList]);
            }, 3000);
          }
          else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.data ?? "An error has occurred while updating earning/deduction"
            });
          }
        },
        (error: any) => {
          this.showSpinner = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message ?? "An error has occurred while updating earning/deduction"
          });
        });
    }
  }

  submitEarningDeductionTrans() {
    debugger;
    this.showSpinner = true;

    this.earningDeductionService.submitEarningDeduction(this.selectedEarnDeductTrans.transId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Earning/Deduction request submitted Successfully"
          });
          setTimeout(() => {
            this.router.navigate([routes.earningDeductionList]);
          }, 3000);
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.data ?? "An error has occurred while submitting earning/deduction request"
          });
        }
      },
      (error: any) => {
        this.showSpinner = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message ?? "An error has occurred while submitting earning/deduction request"
        });
      });
  }


  private constructEarningDeductionTransModel() {
    debugger;
    return {
      TransId: this.selectedEarnDeductTrans.transId,
      PersonalNumber: this.selectedEarnDeductTrans.personalNumber,
      TransType: this.form.get('transType')?.value,
      EarningDeductionId: this.form.get('earningDeductionId')?.value,
      Amount: this.form.get('amount')?.value ?? 0,
      Days: this.form.get('days')?.value ?? 0,
      Percentage: this.form.get('percentage')?.value ?? 0,
      FromEffictve: formatDate(!this.form.get('fromEffectiveDate')?.value || this.form.get('fromEffectiveDate')?.value === '' ? this.defaultDate
        : this.form.get('fromEffectiveDate')?.value, 'yyyy-MM-dd', 'en-US'),
      ToEffictive: formatDate(!this.form.get('toEffectiveDate')?.value || this.form.get('toEffectiveDate')?.value === '' ? this.defaultDate
        : this.form.get('toEffectiveDate')?.value, 'yyyy-MM-dd', 'en-US'),
      PayWith: this.form.get('paywith')?.value,
      TransDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    };
  }
}