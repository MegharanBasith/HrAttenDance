import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import { MatSelectChange } from '@angular/material/select';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, map, startWith } from 'rxjs';
import { StaticService } from 'src/app/core/core.index';
import { ContractAllowance } from 'src/app/core/models/employee/contract-allowance';
import { Employee } from 'src/app/core/models/employee/employee';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  public addEmployeeForm!: FormGroup;
  public editEmployeeForm!: FormGroup;
  nationalities: any[] = [];
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
  constructor(private formBuilder: FormBuilder, private staticService: StaticService, private employeeService: EmployeeService, private messageService: MessageService) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;
    // add employee form validation
    this.addEmployeeForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      DepartmentName: ['', Validators.required],
      Email: ['', Validators.required, Validators.email],
      //MobileNumber: ["", [Validators.required]],
      JoinDate: ['', Validators.required],
      BirthDate: ['', Validators.required],
      Gender: ['', Validators.required],
      MaritalStatus: ['', Validators.required],
      Nationality: ['', Validators.required],
      PassportNumber: ['', Validators.required],
      BorderNumber: ['', Validators.required],
      Role: ['', Validators.required],
      PassportExpiryDate: ['', Validators.required],
      SalaryAmount: ['', Validators.required],
      Profession: ['', Validators.required],
      /*allowances: this.formBuilder.array(this.contractAllowances.map(allowance =>
        this.formBuilder.group({
          selected: [allowance.selected],
          calculateWithSalary: [{ value: allowance.calculateWithSalary, disabled: !allowance.selected }],
          includeGOSI: [{ value: allowance.includeGOSI, disabled: !allowance.selected }],
          percentage: [{ value: allowance.percentage, disabled: !allowance.selected }],
          amount: [{ value: this.calculateAllowanceAmount(allowance.percentage), disabled: !allowance.selected }]
        })
      ))*/
    },
      // {
      //   validator: [
      //     this.passportOrBorderNumberRequiredValidator(),
      //     this.passportExpiryDateRequiredValidator()
      //   ]
      // },
    );

    // edit form validation
    this.editEmployeeForm = this.formBuilder.group({
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      MobileNumber: ["", [Validators.required]],
      JoinDate: ["", [Validators.required]],
      BirthDate: ["", [Validators.required]],
      Gender: ["", [Validators.required]],
      MaritalStatus: ["", [Validators.required]],
      Nationality: ["", [Validators.required]],
      PassportNumber: ["", [Validators.required]],
      BorderNumber: ["", [Validators.required]],
      Role: ["", [Validators.required]],
      PassportExpiryDate: ["", [Validators.required]],
      Profession: ["", [Validators.required]],
      SalaryAmount: ["", [Validators.required]]
    });

    // this.roles = Object.keys(Role)
    //   .filter(k => !isNaN(Number(k)))
    //   .map(k => Role[k as keyof typeof Role]);

    //this.getContractAllowances();
    //this.getNationalities();
    //this.getProfessions();
    //this.getRoles();

    this.nationalityFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterNationalities(value))
      )
      .subscribe(nationalities => {
        this.filteredNationalities.next(nationalities);
      });
  }

  private _filterNationalities(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.nationalities.filter(nationality => nationality.name.toLowerCase().includes(filterValue));
  }

  calculateAllowanceAmount(percentage: number): number {
    return (this.addEmployeeForm.get('SalaryAmount')?.value * percentage) / 100;
  }

  onNationalityChange(event: MatSelectChange) {
    debugger;
    if (event.value.toLowerCase() === 'sau')
      this.isNotSaudi = false;
    else
      this.isNotSaudi = true;
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
    console.log(allowance);
    console.log(this.contractAllowances);
  }

  getContractAllowances() {
    this.staticService.getContractAlowances().subscribe(
      (response: any) => {
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
          console.log(this.contractAllowances);
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getProfessions() {
    this.staticService.getProfessions().subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.professions = response.data;
          console.log(this.professions);
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getNationalities() {
    this.staticService.getNationalities().subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.nationalities = response.data;
          console.log(this.nationalities);
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getRoles() {
    this.staticService.getRoles().subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.roles = response.data;
          console.log(this.roles);
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  isTableDisabled() {
    const salaryAmount = this.addEmployeeForm.get('SalaryAmount')?.value;
    this.isAllowancesEnabled = !salaryAmount || salaryAmount <= 0;
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

  addEmployeeWithContract() {
    if (this.addEmployeeForm.invalid) {
      console.log("Form is invalid!");
      this.addEmployeeForm.markAllAsTouched();  // Mark all fields as touched for validation feedback
      return;
    }
    this.showSpinner = true;
    /*let employee = this.constructEmployeeModel();
    this.employeeService.createEmployeeWithContract(employee).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Employee created successfully" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while creating a new employee" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while creating a new employee" });
      }
    )*/
  }

  private constructEmployeeModel() {
    debugger;
    let formValues = this.addEmployeeForm.value;
    let selectedContractAllowances: ContractAllowance[] = this.contractAllowances.filter(x => x.Selected === true);
    console.log(formValues.Nationality);
    return {
      Birthdate: formValues.BirthDate,
      ContractAllowances: selectedContractAllowances,
      Department: /*formValues.DepartmentName,*/"4200",
      FirstName: formValues.FirstName,
      Email: formValues.Email,
      Gender: formValues.Gender,
      LastName: formValues.LastName,
      MaritalStatus: formValues.MaritalStatus,
      NationalityCode: formValues.Nationality,
      PayGroupId: this.projectId,
      ErbProfessionId: formValues.Profession,
      ProjId: this.projectId,
      RoleId: formValues.Role,
      SalaryAmount: formValues.SalaryAmount,
      StartDateTime: formValues.JoinDate,
      BorderNumber: formValues?.BorderNumber?.toString(),
      PassportExpiryDate: formValues.PassportExpiryDate === "" ? null : formValues.PassportExpiryDate,
      PassportNumber: formValues?.PassportNumber?.toString(),
      ClientId: "BE5358EE-C92B-4340-D800-08DCB40915D3",
      EmployeeNumber: ""
    }
  }
}
