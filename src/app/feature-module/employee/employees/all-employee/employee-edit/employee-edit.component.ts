import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService, routes, StaticService } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { environment } from 'src/app/environments/environment';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss'
})
export class EmployeeEditComponent {
  public routes = routes;
  public form!: FormGroup;
  showExpiryDate !: boolean;
  showSpinner: boolean = false;
  projectId !: string;
  selectedEmployeeId !: string;
  employee !: any;
  professions: any[] = [];
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
    'status'
  ]
  displayedColumns = ['actions', ...this.columns];
  @ViewChild(MatSort) sort!: MatSort;
  selectedRow !: any;
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  isNotSaudi: boolean = false;
  saudiNationality = "SAU";
  defaultDate = "1900-01-01";
  maritalStatusOptions = [{ "id": 1, "name": "Married" },
  { "id": 2, "name": "Single" },
  { "id": 3, "name": "Widowed" },
  { "id": 4, "name": "Divorced" },
  ];
  documentDataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) documentSort!: MatSort;
  documentColumns = [
    'empId',
    'documentStatus',
    'documentTypeId',
    'requestType',
    'documentDate',
    'iqamaSIDNumber',
    'borderNum',
    'expiryDate',
    'period',
  ];
  totalDocumentsCount = 0;


  constructor(private formBuilder: FormBuilder, private staticService: StaticService, private employeeService: EmployeeService, private messageService: MessageService, private router: Router, private authService: AuthService) { }

  async ngOnInit() {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.form = this.formBuilder.group({
      //department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: new FormControl({ value: '', disabled: true }),
      maritalStatus: ['', Validators.required],
      nationalityArabic: new FormControl({ value: '', disabled: true }),
      passportNumber: [''],
      borderNumber: new FormControl({ value: '', disabled: true }),
      passportExpiryDate: [''],
      profession: ['', Validators.required],
      employeeNumber: new FormControl({ value: '', disabled: true }),
      iqamaNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      activeInModadd: [false]
    });
    debugger;
    let unparsedEmployee = localStorage.getItem('selectedEmployeeId');
    if (unparsedEmployee) {
      this.selectedEmployeeId = JSON.parse(unparsedEmployee);
      await this.getEmployeeById();
    }
    this.getEmployeeBankAccountList();
    this.getEmployeeDocumentList(environment.defaultPageStartIndex, environment.defaultPageSize);
    this.getProfessions();
    this.showNotSaudiFields(this.employee.nationality);
  }

  showNotSaudiFields(nationality: string) {
    if (nationality !== this.saudiNationality) {
      this.isNotSaudi = true;
    } else {
      this.isNotSaudi = false;
    }
  }

  async getEmployeeById() {
    this.showSpinner = true;
    try {
      const response: any = await this.employeeService.getEmployeeById(this.selectedEmployeeId).toPromise();

      this.showSpinner = false;

      if (response && response.isSuccess) {
        if (response.data) {
          this.employee = response.data;
          this.loadFormValues();
        } else {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: response?.message ?? "Not found" });
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response?.message ?? "An error has occurred while finding the employee"
        });
      }
    } catch (error: any) {
      this.showSpinner = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message
      });
    }
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

  getEmployeeBankAccountList() {
    this.showSpinner = true;
    this.employeeService.getEmployeeBankAccountList(this.selectedEmployeeId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        debugger;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data;
          this.dataSource.sort = this.sort;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retrieving employee bank accounts" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  getEmployeeDocumentList(pageStartPosition: number, pageSize: number) {
    this.showSpinner = true;
    this.employeeService.getEmployeeDocumentList(this.projectId, this.selectedEmployeeId, pageStartPosition, pageSize).subscribe(
      (response: any) => {
        this.showSpinner = false;
        debugger;
        if (response && response.isSuccess) {
          this.documentDataSource.data = response.data.employeeDocumentsList;
          this.documentDataSource.sort = this.documentSort;
          this.totalDocumentsCount = response.data.totalRecordsCount;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retrieving employee documents" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }

  private loadFormValues() {
    this.employee.birthDate = new Date(this.employee.birthDate);
    this.employee.passportExpiryDate = this.employee.passportExpiryDate === undefined || this.employee.passportExpiryDate === '' ? this.employee.passportExpiryDate
      : new Date(this.employee.passportExpiryDate);
    this.form.patchValue(this.employee);
  }

  updateEmployeeDetails() {
    debugger;
    if (this.form.invalid) {
      this.form.markAllAsTouched();  // Mark all fields as touched for validation feedback
      return;
    }
    this.showSpinner = true;
    let employee = this.constructUpdateEmployeeModel();
    this.employeeService.updateEmployeeDetails(employee).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Employee updated successfully" });
          setTimeout(() => {
            this.router.navigate([routes.employeeList])
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while updating a new employee" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while updating a new employee" });
      }
    )
  }

  private constructUpdateEmployeeModel() {
    debugger;
    let formValues = this.form.value;
    return {
      EmpId: this.selectedEmployeeId,
      Department: /*formValues.DepartmentName,*/"4200",
      EmailAddress: formValues.email,
      MaritalStatus: formValues.maritalStatus,
      ProfessionId: formValues.profession,
      ProjId: this.projectId,
      PassportExpiryDate: formatDate(!formValues.passportExpiryDate?.value || formValues.PassportExpiryDate?.value === '' ? this.defaultDate
        : this.form.get('fromEffectiveDate')?.value, 'yyyy-MM-dd', 'en-US'),
      PassportNumber: formValues?.passportNumber,
      EmployeeNumber: formValues?.employeeNumber,
      ActiveInModadd: formValues.activeInModadd,
      PhoneNumber: "",
      IqamaSIDNumber: formValues?.iqamaNumber.toString()
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
  public sortData(sort: Sort, dataSource: MatTableDataSource<any>) {
    const data = dataSource.data.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      dataSource.data = data;
    } else {
      dataSource.data = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  setPage(event: any) {
    this.getEmployeeDocumentList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }
}
