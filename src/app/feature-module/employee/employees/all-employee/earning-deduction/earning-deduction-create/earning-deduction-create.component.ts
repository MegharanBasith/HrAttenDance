import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EarningDeductionService, routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-earning-deduction-create',
  templateUrl: './earning-deduction-create.component.html',
  styleUrl: './earning-deduction-create.component.scss'
})
export class EarningDeductionCreateComponent implements OnInit {

  public routes = routes;
  form !: FormGroup;
  deductForm !: FormGroup;
  payWithOptions = ['Salary', 'Separate'];
  transTypeOptions = ['Earning', 'Deduction'];
  employeeList: any[] = [];
  showSpinner: boolean = false;
  projectId !: string;
  employeeControl !: FormControl; // Declare employeeControl
  earningList !: any[];
  deductionList !: any[];
  earnDeductList !: any[];
  earningTransactionType: string = "Earning";
  DeductionTransactionType: string = "Deduction";
  showEarningDialog: boolean = false;
  showDeductionDialog: boolean = false;
  earningDataSource: Array<any> = [];
  deductionDataSource: Array<any> = [];
  columns = [
    'personalNumber', 'type', 'fromEffectiveDate', 'toEffectiveDate', 'amount', 'days', 'percentage', 'payWith', 'isPaid'
  ];
  salaryPayWithOPtion = "Salary";

  displayedColumns = ['actions', ...this.columns];
  defaultDate = new Date("1900-01-01T00:00:00");

  constructor(private fb: FormBuilder, private earningDeductionService: EarningDeductionService, private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {

    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    // let notparsedUserId = localStorage.getItem('userId')
    // if (notparsedUserId)
    //   this.userId = notparsedUserId;

    this.form = this.fb.group({
      employee: ['', Validators.required],
      payWith: ['', Validators.required],
      transType: ['', Validators.required],
      earnDeductType: ['', Validators.required],
      effectiveDateFrom: [''],
      effectiveDateTo: [''],
      amount: [0],
      days: [0],
      percentage: [0],
    }, { validators: [this.atLeastOneFieldRequiredValidator(['amount', 'days', 'percentage']), this.validateDateRange] });

    //this.getEmployeeList();
    this.employeeControl = this.form.get('employee') as FormControl || new FormControl();
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
    const startDate = control.get('effectiveDateFrom')?.value;
    const endDate = control.get('effectiveDateTo')?.value;

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
      this.form.get('effectiveDateFrom')?.setValidators([Validators.required]);
      this.form.get('effectiveDateTo')?.setValidators([Validators.required]);
    }

    else {
      this.form.get('effectiveDateFrom')?.clearValidators();
      this.form.get('effectiveDateTo')?.clearValidators();
    }

    this.form.get('effectiveDateFrom')?.updateValueAndValidity();
    this.form.get('effectiveDateTo')?.updateValueAndValidity();
  }

  getEarningList(): void {
    this.showSpinner = true;
    this.earningDeductionService.getEarningList().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.earningList = response.data;
          this.earnDeductList = response.data;
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

  getDeductionList(): void {
    this.showSpinner = true;
    this.earningDeductionService.getDeductionList().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.deductionList = response.data;
          this.earnDeductList = response.data;
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

  addEarningDeductionTrans() {
    debugger;
    if(this.form.invalid)
      this.form.markAllAsTouched();
    else
    {
    this.showSpinner = true;
    let model = this.constructEarningDeductionTransModel();

    this.earningDeductionService.createEarningDeduction(model).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Earning/Deduction added Successfully"
          });
          setTimeout(() => {
            this.router.navigate([routes.earningDeductionList]);
          }, 3000);
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.data ?? "An error has occurred while adding earning"
          });
        }
      },
      (error: any) => {
        this.showSpinner = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message ?? "An error has occurred while adding earning"
        });
      });
    }
  }


  private constructEarningDeductionTransModel() {
    debugger;
    return {
      PersonalNumber: this.form.get('employee')?.value,
      TransType: this.form.get('transType')?.value,
      EarningDeductionId: this.form.get('earnDeductType')?.value,
      Amount: this.form.get('amount')?.value ?? 0,
      Days: this.form.get('days')?.value ?? 0,
      Percentage: this.form.get('percentage')?.value ?? 0,
      FromEffictve: formatDate(!this.form.get('effectiveDateFrom')?.value || this.form.get('effectiveDateFrom')?.value === '' ? this.defaultDate 
      : this.form.get('effectiveDateFrom')?.value, 'yyyy-MM-dd', 'en-US'),
      ToEffictive: formatDate(!this.form.get('effectiveDateTo')?.value || this.form.get('effectiveDateTo')?.value === '' ? this.defaultDate 
      : this.form.get('effectiveDateTo')?.value, 'yyyy-MM-dd', 'en-US'),
      PayWith: this.form.get('payWith')?.value,
      TransDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    };
  }
}