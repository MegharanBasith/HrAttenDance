import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  public routes = routes;
  showSpinner: boolean = false;
  form !: FormGroup;
  paymentMethods: any[] = [];
  banks: any[] = [];
  accountTypes = ['personal', 'Salary'];
  applicableIds = ['Iqama', 'Border'];
  employeeId !: string;
  isNewEmployee !: boolean;
  defaultDate = "1900-01-01T00:00:00";
  personalAccountType = "personal"


  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    debugger;
    let notParsedIsNewEmployee = localStorage.getItem("isNewEmployee");
    if (notParsedIsNewEmployee)
      this.isNewEmployee = JSON.parse(notParsedIsNewEmployee);
    {
      if (this.isNewEmployee) {
        let notParsedNewEmployeeId = localStorage.getItem("newCreatedEmployeeId");
        if (notParsedNewEmployeeId)
          this.employeeId = JSON.parse(notParsedNewEmployeeId);
      }
      else {
        let notParsedSelectedEmployeeId = localStorage.getItem("selectedEmployeeId");
        if (notParsedSelectedEmployeeId)
          this.employeeId = JSON.parse(notParsedSelectedEmployeeId);
      }
    }



    this.form = this.fb.group({
      employeeId: new FormControl({ value: this.employeeId, disabled: true }),
      paymentMethod: ['', Validators.required],
      bank: ['', Validators.required],
      accountType: ['', Validators.required],
      applicableId: ['', Validators.required],
      accountNumber: ['', Validators.required],
      iban: ['', Validators.required],
      accountExpiryDate: [''],
      atmExpiryDate: ['']
    });
    this.onChanges();
    this.getPaymentMethods();
    this.getbankList();
  }

  onChanges() {
    debugger;
    this.form.get('accountType')?.valueChanges.subscribe((accountType) => {
      const accountNumberControl = this.form.get('accountNumber');
      const ibanControl = this.form.get('iban');

      if (accountType === this.personalAccountType) {
        accountNumberControl?.setValidators([this.bankAccountNumberValidator()]);
        ibanControl?.setValidators([this.ibanValidator()]);
      } else {
        accountNumberControl?.clearValidators();
        ibanControl?.clearValidators();
      }

      // Update validation status after changing validators
      accountNumberControl?.updateValueAndValidity();
      ibanControl?.updateValueAndValidity();
    });
  }

  ibanValidator(): ValidatorFn {
    debugger;
    return (control: AbstractControl): ValidationErrors | null => {
      const iban = control.value?.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Clean input

      if (!iban) {
        return null; // Return null if no IBAN is provided (useful for optional fields)
      }

      // Check if IBAN length is valid by country (default is 22 characters for this example)
      if (iban.length < 15 || iban.length > 34) {
        return { invalidIban: 'IBAN length is invalid.' };
      }

      // Move first 4 chars to the end and replace letters with numbers
      const rearranged = iban.slice(4) + iban.slice(0, 4);
      const numericIban = rearranged.replace(/[A-Z]/g, (char: any) => (char.charCodeAt(0) - 55).toString());

      // Perform checksum validation
      const checksum = BigInt(numericIban) % 97n;
      if (checksum !== 1n) {
        return { invalidIban: 'IBAN is invalid.' };
      }

      return null; // IBAN is valid
    };
  }

  bankAccountNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const accountNumber = control.value;

      // Check if the account number is not empty and is a string of digits only
      if (!accountNumber || !/^\d{8,12}$/.test(accountNumber)) {
        return { invalidAccountNumber: 'Bank account number must be 8-12 digits long.' };
      }

      // Additional checks, if needed, can be added here

      return null; // Valid account number
    };
  }

  getPaymentMethods() {
    this.showSpinner = true;
    this.employeeService.getPaymentMethods().subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.paymentMethods = response.data;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.data ?? "An error has occured while retrieving payment methods" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    )
  }

  getbankList() {
    this.showSpinner = true;
    this.employeeService.getBankList().subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.banks = response.data;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.data ?? "An error has occured while retrieving bank list" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    )
  }

  createBankAccount() {
    this.showSpinner = true;
    let model = this.constructCreateBankAccountModel();
    this.employeeService.createBankAccount(model).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response?.data ?? "Bank account created successfully"
          });
          // Navigate to the EOS list after a brief delay
          setTimeout(() => {
            this.router.navigate([this.routes.employeeList]);
          }, 2000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.message ?? "An error has occurred while creating new bank account"
          });
        }
      },
      (error: any) => {
        this.showSpinner = false; // Ensure spinner is hidden on error
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.message ?? "An error has occurred while creating new bank account"
        });
      }
    )
  }

  private constructCreateBankAccountModel() {
    let formAccountExpiryDate = this.form.get('accountExpiryDate')?.value;
    let accountExpiryDate = formAccountExpiryDate && formAccountExpiryDate !== '' ? formatDate(formAccountExpiryDate, 'yyyy-MM-dd', 'en-US')
      : formatDate(this.defaultDate, 'yyyy-MM-dd', 'en-US');
    let formAtmExpiryDate = this.form.get('atmExpiryDate')?.value;
    let atmExpiryDate = formAccountExpiryDate && formAtmExpiryDate !== '' ? formatDate(formAtmExpiryDate, 'yyyy-MM-dd', 'en-US')
      : formatDate(this.defaultDate, 'yyyy-MM-dd', 'en-US');
    return {
      EmpNum: this.employeeId,
      PymMethod: this.form.get('paymentMethod')?.value,
      BankId: this.form.get('bank')?.value,
      AccountTypeId: this.form.get('accountType')?.value,
      ApplicableID: this.form.get('applicableId')?.value,
      AccountNum: (this.form.get('accountNumber')?.value ?? '').toString(),
      IBAN: (this.form.get('iban')?.value ?? '').toString(),
      AccountExpiryDate: accountExpiryDate,
      ATMExpiryDate: atmExpiryDate,
    }
  }
}
