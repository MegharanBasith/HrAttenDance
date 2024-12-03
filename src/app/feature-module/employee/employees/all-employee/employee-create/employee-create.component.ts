import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, map, startWith } from 'rxjs';
import { AuthService, routes, StaticService } from 'src/app/core/core.index';
import { ContractAllowance } from 'src/app/core/models/employee/contract-allowance';
import { Employee } from 'src/app/core/models/employee/employee';
import { CreateInitialWorkerDocumentModel } from 'src/app/core/models/workerDocument/createInitialWorkerDocument-model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { WorkerDocumentService } from 'src/app/core/services/worker-document/WorkerDocument.service';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss'
})
export class EmployeeCreateComponent {
  public routes = routes;
  public form!: FormGroup;
  nationalities: any[] = [];
  annualLeaveTypes: any[] = [];
  filteredNationalities = new BehaviorSubject(this.nationalities);
  nationalityFilterCtrl = new FormControl();
  isNotSaudi !: boolean;
  showExpiryDate !: boolean;
  originalContractAllowances: any[] = [];
  contractAllowances: any[] = [];
  professions: any[] = [];
  roles: any[] = [];
  currentStep: number = 1;
  steps: number[] = [1, 2];
  searchText = '';
  isAllowancesEnabled: boolean = false;
  showSpinner: boolean = false;
  projectId !: string;
  clientId !: string;
  saudiNationality: string = "SAU";
  dataSource = new MatTableDataSource<any>();
  columns = [
    'empNum',
    'pymMethod',
    'bankId',
    'accountTypeId',
    'applicableID',
    'accountNum',
    'iban',
    'accountExpiryDate',
    'atmExpiryDate',
    'empbankRecid',
    'status'
  ]
  displayedColumns = ['actions', ...this.columns];
  selectedRow !: any;
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  initialWorkerDoc: CreateInitialWorkerDocumentModel = {
    personnelNumber: '',
    payGroupId: ''
  };
  employeeRoleId = 1;
  maritalStatusOptions = [{ "id": 1, "name": "Married" },
  { "id": 2, "name": "Single" },
  { "id": 3, "name": "Widowed" },
  { "id": 4, "name": "Divorced" },
  ];
  defaultDate = new Date("1900-01-01T00:00:00");
  constructor(private formBuilder: FormBuilder, private staticService: StaticService, private employeeService: EmployeeService, private messageService: MessageService,
    private router: Router, private authService: AuthService, private workerDocumentService: WorkerDocumentService
  ) { }

  ngOnInit(): void {
    let unParsedProjectId = localStorage.getItem('projectId');
    if (unParsedProjectId)
      this.projectId = unParsedProjectId;

    let unParsedClientId = localStorage.getItem('clientId');
    if (unParsedClientId)
      this.clientId = unParsedClientId;

    // add employee form validation
    this.form = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.pattern(('^[\u0621-\u064A\a-zA-Z ]+$'))]],
      LastName: ['', [Validators.required, Validators.pattern(('^[\u0621-\u064A\a-zA-Z ]+$'))]],
      // DepartmentName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      //MobileNumber: ["", [Validators.required]],
      JoinDate: ['', Validators.required],
      BirthDate: ['', Validators.required],
      Gender: ['', Validators.required],
      MaritalStatus: ['', Validators.required],
      Nationality: ['', Validators.required],
      PassportNumber: [''],
      BorderNumber: [''],
      PassportExpiryDate: [''],
      SalaryAmount: ['', Validators.required],
      Profession: ['', Validators.required],
      EmployeeNumber: ['', Validators.required],
      AnnualLeave: ['', Validators.required],
      IqamaNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      activeInModadd: [false]
    });
    this.getContractAllowances();
    this.getNationalities();
    this.getProfessions();
    this.getAnnualLeaveTypes();

    this.nationalityFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterNationalities(value))
      )
      .subscribe(nationalities => {
        this.filteredNationalities.next(nationalities);
      });
    this.onChanges();
  }
  private _filterNationalities(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.nationalities.filter(nationality => nationality.name.toLowerCase().includes(filterValue));
  }

  calculateAllowanceAmount(percentage: number): number {
    return (this.form.get('SalaryAmount')?.value * percentage) / 100;
  }

  onNationalityChange(event: MatSelectChange) {
    debugger;
    if (event.value.toLowerCase() === 'sau')
      this.isNotSaudi = false;
    else
      this.isNotSaudi = true;
  }

  onChanges(): void {
    this.form.get('Nationality')?.valueChanges.subscribe(x => {
      if (x !== this.saudiNationality) {
        this.form.get('BorderNumber')?.setValidators([Validators.required, Validators.pattern('^[0-9]{10}$')]);
        this.form.get('PassportNumber')?.setValidators([Validators.required]);
        this.form.get('PassportExpiryDate')?.setValidators([Validators.required]);
      } else {
        this.form.get('BorderNumber')?.clearValidators();
        this.form.get('PassportNumber')?.clearValidators();
        this.form.get('PassportExpiryDate')?.clearValidators();
      }
      this.form.get('BorderNumber')?.updateValueAndValidity();
      this.form.get('PassportNumber')?.updateValueAndValidity();
      this.form.get('PassportExpiryDate')?.updateValueAndValidity();
    });
  }

  // passportOrBorderNumberRequiredValidator(): ValidatorFn {
  //   debugger;
  //   return (formGroup: AbstractControl): ValidationErrors | null => {
  //     const nationality = formGroup.get('Nationality');
  //     const passportNumber = formGroup.get('PassportNumber');
  //     const borderNumber = formGroup.get('BorderNumber');

  //     // Check if form controls exist
  //     if (!nationality || !passportNumber || !borderNumber) {
  //       return null;
  //     }

  //     // Only apply validation if nationality is not 'SAU' (case insensitive)
  //     if (nationality.value?.toLowerCase() !== 'sau') {
  //       const passportHasValue = !!passportNumber.value;
  //       const borderHasValue = !!borderNumber.value;

  //       // If neither passport number nor border number is filled
  //       if (!passportHasValue && !borderHasValue) {
  //         return { 'oneFieldRequired': true };  // At least one field required
  //       }

  //       // If both passport number and border number are filled
  //       // if (passportHasValue && borderHasValue) {
  //       //   return { 'onlyOneFieldAllowed': true };  // Both fields cannot be filled
  //       // }
  //     }
  //     // If nationality is 'SAU' or the conditions are met, return null (valid state)
  //     return null;
  //   };
  // }

  // passportExpiryDateRequiredValidator(): ValidatorFn {
  //   return (formGroup: AbstractControl): ValidationErrors | null => {
  //     const passportNumber = formGroup.get('PassportNumber');
  //     const passportExpiryDate = formGroup.get('PassportExpiryDate');

  //     if (!passportNumber || !passportExpiryDate) {
  //       return null;
  //     }

  //     if (passportNumber.value && !passportExpiryDate.value) {
  //       return { passportExpiryDateRequired: true };
  //     }

  //     return null;
  //   };
  // }

  // onPassportNumberChange(event: Event): void {
  //   const passportNumber = (event.target as HTMLInputElement).value;
  //   this.showExpiryDate = passportNumber.trim().length > 0;

  //   // Optionally, update form validation if needed
  //   if (this.showExpiryDate) {
  //     this.addEmployeeForm?.get('PassportExpiryDate')?.setValidators([Validators.required]);
  //   } else {
  //     this.addEmployeeForm?.get('PassportExpiryDate')?.clearValidators();
  //   }
  //   this.addEmployeeForm?.get('PassportExpiryDate')?.updateValueAndValidity();
  // }

  onToggle(allowance: ContractAllowance) {
    debugger;
    allowance.Selected = allowance.Selected == true ? false : true;
    if (!allowance.Selected) {
      allowance.Percentage = this.originalContractAllowances.find(x => x.erbCode === allowance.AllowanceCode).percentage;
      allowance.CalculateWithSalary = false;
      allowance.IncludeGOSI = false;
      allowance.AllowanceAmountValue = 0;
    }
    else {
      allowance.AllowanceAmountValue = this.calculateAllowanceAmount(allowance.Percentage)
    }
  }

  getContractAllowances() {
    this.showSpinner = true;
    this.staticService.getContractAlowances().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.originalContractAllowances = response.data;
          this.contractAllowances = response.data.map((allowance: any) => ({
            ContractAllowanceId: allowance.id,
            Name: allowance.name,
            AllowanceCode: allowance.erbCode,
            Percentage: allowance.percentage,
            Selected: false,
            AllowanceAmountValue: 0,
            CalculateWithSalary: false,
            IncludeGOSI: false
          } as ContractAllowance));
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retreiving contract allowances" });
      }
    )
  }

  getProfessions() {
    this.showSpinner = true;
    this.staticService.getProfessions().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.professions = response.data;
          console.log(this.professions);
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retreiving professions" });
      }
    )
  }

  getNationalities() {
    this.showSpinner = true;
    this.staticService.getNationalities().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.nationalities = response.data;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retrieving nationalities" });
      }
    )
  }

  getAnnualLeaveTypes() {
    this.showSpinner = true;
    this.staticService.getAnnualLeaveTypes().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.annualLeaveTypes = response.data;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retreiving leave types" });
      }
    )
  }


  isTableDisabled() {
    debugger;
    const salaryAmount = this.form.get('SalaryAmount')?.value;
    this.isAllowancesEnabled = salaryAmount && salaryAmount > 0;
    for (let i = 0; i < this.contractAllowances.length; i++) {
      if (this.contractAllowances[i].Selected && this.contractAllowances[i].Percentage > 0)
        this.contractAllowances[i].AllowanceAmountValue = this.calculateAllowanceAmount(this.contractAllowances[i].Percentage);
    }
  }

  nextStep(): void {
    if (this.currentStep === 1)
      this.currentStep += 1;
  }

  prevStep(): void {
    if (this.currentStep === 2)
      this.currentStep -= 1;
  }

  goToStep(step: number) {
    this.currentStep = step;
    // Handle step change logic here
    console.log(`Navigated to step ${step}`);
  }

  async addEmployeeWithContract() {
    debugger;
    if (this.form.invalid) {
      console.log("Form is invalid!");
      this.form.markAllAsTouched();
      return;
    }
    this.showSpinner = true;
    let employee = this.constructEmployeeModel();

    this.employeeService.createEmployeeWithContract(employee).subscribe(
      async (employeeResponse: any) => {
        this.showSpinner = false;
        if (employeeResponse && employeeResponse.isSuccess) {
          debugger;

          // Set properties for initialWorkerDoc
          this.initialWorkerDoc.personnelNumber = employeeResponse.data;
          this.initialWorkerDoc.payGroupId = this.projectId;

          // Call createInitWorkerDoc and wait for it to complete
          try {
            await this.workerDocumentService.createInitWorkerDoc(this.initialWorkerDoc).subscribe(
              (response: any) => {
                debugger;
                if (response && response.isSuccess) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "Employee created successfully" });
                  // Delay navigation to ensure the above code is executed first
                  setTimeout(() => {
                    localStorage.setItem('newCreatedEmployeeId', JSON.stringify(employeeResponse.data));
                    localStorage.setItem('isNewEmployee', JSON.stringify(true));
                    this.router.navigate([this.routes.employeeBankAccountCreate]);
                  }, 3000);
                }
              }
            );
          } catch (error) {
            console.error("Error creating initial worker document:", error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create initial worker document." });
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: employeeResponse?.message ?? "An error has occurred while creating a new employee" });
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error("Error occurred:", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occurred while creating a new employee" });
      }
    );
  }

  onPercentageChange(allowance: ContractAllowance) {
    allowance.AllowanceAmountValue = this.calculateAllowanceAmount(allowance.Percentage)
  }

  onAllowanceAmountValueChange(allowance: ContractAllowance) {
    allowance.Percentage = (allowance.AllowanceAmountValue / this.form.get('SalaryAmount')?.value) * 100;
  }

  checkEmailExists() {
    debugger;
    let email = this.form.get('Email')?.value;
    if (email && email !== '') {
      this.showSpinner = true;
      this.authService.doesEmailExist(this.form.get('Email')?.value).subscribe(
        (response: any) => {
          this.showSpinner = false;
          if (response && response.isSuccess) {
            if (response.data === true)
              this.form.controls['Email'].setErrors({ emailExists: true });
          }
        },
        (error) => {
          this.showSpinner = false;
        }
      )
    }
  }

  public sortData(sort: Sort) {
    const data = this.dataSource.data.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
    } else {
      this.dataSource.data = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  onEdit(row: any) {
    localStorage.setItem("selectedEmployeeBankAccount", JSON.stringify(row));
    this.router.navigate([routes.employeeBankAccountEdit]);
  }

  onActivate(row: any) {
    this.showSpinner = true;
    this.employeeService.activateEmployeeBankAccount(row.empbankRecid).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Bank account activated successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while activating bank account" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  onDeactivate(row: any) {
    this.showSpinner = true;
    this.employeeService.deactivateEmployeeBankAccount(row.empbankRecid).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Bank account deactivated successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while deactivating bank account" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  confirmDelete(row: any) {
    this.selectedRow = row;
    this.deleteDialog.show();
  }

  onDelete(row: any) {
    this.showSpinner = true;
    this.employeeService.deleteEmployeeBankAccount(row.empbankRecid).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Bank account deleted successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while deleteing bank account" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  private constructEmployeeModel(): Employee {
    debugger;
    let formValues = this.form.value;
    let selectedContractAllowances: ContractAllowance[] = this.contractAllowances.filter(x => x.Selected === true);
    return {
      Birthdate: formatDate(formValues?.BirthDate, 'yyyy-MM-dd', 'en-US'),
      ContractAllowances: selectedContractAllowances,
      Department: "4200",
      FirstName: formValues.FirstName,
      Email: formValues.Email,
      Gender: formValues.Gender,
      LastName: formValues.LastName,
      MaritalStatus: formValues.MaritalStatus,
      NationalityCode: formValues.Nationality,
      PayGroupId: this.projectId,
      ErbProfessionId: formValues.Profession,
      ProjId: this.projectId,
      RoleId: this.employeeRoleId,
      SalaryAmount: formValues?.SalaryAmount,
      StartDateTime: formatDate(formValues?.JoinDate, 'yyyy-MM-dd', 'en-US'),
      BorderNumber: formValues?.BorderNumber === '' ? null : formValues?.BorderNumber,
      PassportExpiryDate: formValues?.PassportExpiryDate === '' || formValues?.PassportExpiryDate === undefined ? 
      formatDate(this.defaultDate, 'yyyy-MM-dd', 'en-US') : formatDate(formValues?.PassportExpiryDate, 'yyyy-MM-dd', 'en-US'),
      PassportNumber: formValues?.PassportNumber,
      ClientId: this.clientId,
      EmployeeNumber: formValues?.EmployeeNumber,
      VacationCode: formValues?.AnnualLeave,
      IqamaNumber: formValues?.IqamaNumber.toString(),
      ActiveInModadd: formValues.activeInModadd
    };
  }

}
