import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeContractService, routes, StaticService } from 'src/app/core/core.index';
import { ContractAllowance } from 'src/app/core/models/employee/contract-allowance';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-employee-contract-edit',
  templateUrl: './employee-contract-edit.component.html',
  styleUrl: './employee-contract-edit.component.scss'
})
export class EmployeeContractEditComponent implements OnInit {
  public routes = routes;
  showSpinner: boolean = false;
  allowanceColumns = [
    'allowanceCode',
    'allowanceName',
    'allowanceType',
    'allowanceAmountValue',
    'allowancePercentage',
    'allowanceEffectiveAmount',
    'calculateWithSalary',
    'includeGOSI',
    'paymentBase',
    'min',
    'max',
    'effectiveDate',
  ];
  allowanceDataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  displayedColumns = ['actions', ...this.allowanceColumns];
  showAddAllowanceModal: boolean = false;
  selectedContract!: any;
  addAllowanceForm !: FormGroup;
  form !: FormGroup;
  allowances: ContractAllowance[] = [];
  projectId !: string;
  selectedRow !: any;
  annualLeaveTypes: any[] = [];
  ticketClassOptions = ['Economy', 'First Class', 'Business'];
  professions: any[] = [];
  isFormChanged: boolean = false;

  constructor(private fb: FormBuilder, private employeeContractService: EmployeeContractService, private staticService: StaticService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    let notParsedContract = localStorage.getItem('selectedContract');
    if (notParsedContract)
      this.selectedContract = JSON.parse(notParsedContract);

    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getEmployeeContractAllowanceList(this.selectedContract.contractId);

    this.form = this.fb.group({
      contractId: [{ value: '', disabled: true }],
      contractNum: [{ value: '', disabled: true }],
      version: [{ value: '', disabled: true }],
      empNum: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      contractType: [{ value: '', disabled: true }],
      validity: [{ value: '', disabled: true }],
      startDate: [{ value: '', disabled: true }],
      numOfMonths: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      basicSalary: ['', Validators.required],
      // categoryId: [{ value: '', disabled: true }],
      workingHours: [{ value: '', disabled: true }],
      useOfficialWorkingHours: [{ value: '', disabled: true }],
      effectiveDate: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
      transType: [{ value: '', disabled: true }],
      transDate: [{ value: '', disabled: true }],
      transUser: [{ value: '', disabled: true }],
      workflowState: [{ value: '', disabled: true }],
      totalPackageAmount: [{ value: '', disabled: true }],
      vacationCodeAnnual: ['', Validators.required],
      adultsTickets: [0, Validators.required],
      childTickets: [0, Validators.required],
      infantTickets: [0, Validators.required],
      ticketClass: ['', Validators.required],
      destinationId: [{ value: '', disabled: true }, Validators.required],
      // totalTicketsPrice: [{ value: 0, disabled: true }],
      professionId: ['', Validators.required],
      visaCount: [2, Validators.required]
    });

    this.addAllowanceForm = this.fb.group({
      allowance: ['', Validators.required],
      allowanceAmount: ['', Validators.required],
      allowancePercentage: ['', Validators.required],
      calculateWithSalary: [false, Validators.required],
      includeGOSI: [false, Validators.required],
      effectiveDate: [new Date(), Validators.required]
    });
    this.getAnnualLeaveTypes();
    this.getProfessions();
    this.loadFormValues();
    this.form.valueChanges.subscribe(() => {
      this.isFormChanged = true;  // Mark the form as changed
    });
  }

  private loadFormValues() {
    this.selectedContract.startDate = new Date(this.selectedContract.startDate);
    this.selectedContract.endDate = new Date(this.selectedContract.endDate);
    this.selectedContract.effectiveDate = new Date(this.selectedContract.effectiveDate);
    this.selectedContract.transDate = new Date(this.selectedContract.transDate);
    this.form.patchValue(this.selectedContract);
  }

  getEmployeeContractAllowanceList(contractId: string) {
    this.showSpinner = true;

    debugger;
    this.employeeContractService.getEmployeeContractAllowanceList(contractId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.allowanceDataSource.data = response.data;
          this.allowanceDataSource.sort = this.sort;
        }
      },
      (error) => {
        this.showSpinner = false;
      }
    )
  }

  getContractAllowances() {
    this.showSpinner = true;
    this.staticService.getContractAlowances().subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.allowances = response.data.map((allowance: any) => ({
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
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retreiving professions" });
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

  onSubmit() {
    if (this.addAllowanceForm.invalid)
      this.addAllowanceForm.markAllAsTouched();
    else
      this.AddEmployeeContractAllowance();
  }

  AddEmployeeContractAllowance() {
    debugger;
    this.showSpinner = true;
    let model = this.constructAddEmployeeContractAllowanceModel();
    this.employeeContractService.createEmployeeContractAllowance(model).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Contract allowance added successfully" });
          this.showAddAllowanceModal = false;
          this.addAllowanceForm.reset();
          this.getEmployeeContractAllowanceList(this.selectedContract.contractId);
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while adding contract allowance" });
      }
    )
  }

  deleteEmployeeContractAllowance() {
    debugger;
    this.showSpinner = true;
    this.employeeContractService.deleteEmployeeContractAllowance(this.selectedContract.contractId, this.selectedRow.allowanceCode).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.allowanceDataSource.data = this.allowanceDataSource.data.filter((item: any) => item !== this.selectedRow);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Contract allowance deleted successfully" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while deleteing contract allowance" });
      }
    )
  }

  editEmployeeContractDetails() {
    debugger;
    if (this.form.invalid) {
      this.addAllowanceForm.markAllAsTouched();
      return;
    }
    this.showSpinner = true;
    let model = this.constructEditEmployeeContractModel();
    this.employeeContractService.editEmployeeContractDetails(this.selectedContract.contractId, model).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Contract updated successfully" });
          setTimeout(() => {
            this.router.navigate([routes.employeeContractList])
          }, 3000);
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while updating the contract" });
      }
    )
  }

  onAllowanceChange() {
    let allowance = this.allowances.find((x) => x.AllowanceCode === this.addAllowanceForm.get('allowance')?.value);
    if (allowance) {
      this.addAllowanceForm.controls['allowanceAmount']
        .setValue(allowance?.Percentage > 0 ? ((allowance?.Percentage * this.selectedContract.basicSalary) / 100) : allowance?.AllowanceAmountValue);
      this.addAllowanceForm.controls['allowancePercentage'].setValue(allowance?.Percentage);
    }
  }

  onAllowanceAmountChange(event: any) {
    debugger;
    let basicSalary = this.form.get('basicSalary')?.value;
    const inputValue = Number((event.target as HTMLInputElement).value);
    this.addAllowanceForm.controls['allowancePercentage'].setValue((inputValue / basicSalary) * 100);
  }

  onAllowancePercentageChange(event: any) {
    debugger;
    let basicSalary = this.form.get('basicSalary')?.value;
    const inputValue = Number((event.target as HTMLInputElement).value);
    this.addAllowanceForm.controls['allowanceAmount'].setValue((inputValue * basicSalary) / 100);
  }

  public sortData(sort: Sort, dataSource: MatTableDataSource<any>) {
    const data = dataSource.data.slice();

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

  openAddAllowanceModal(): void {
    this.showAddAllowanceModal = true;
    this.getContractAllowances();
  }

  closeModal() {
    this.showAddAllowanceModal = false; // Set the modal visibility to false to hide it
  }

  confirmDelete(row: any) {
    this.selectedRow = row;
    this.deleteDialog.show();
  }

  private constructAddEmployeeContractAllowanceModel() {
    return {
      ContractId: this.selectedContract.contractId,
      AllowanceCode: this.addAllowanceForm.get('allowance')?.value,
      AllowanceAmountValue: this.addAllowanceForm.get('allowanceAmount')?.value,
      AllowancePercentage: this.addAllowanceForm.get('allowancePercentage')?.value,
      PaidEvery: 1,
      CalculateWithSalary: this.addAllowanceForm.get('calculateWithSalary')?.value === true ? 1 : 0,
      IncludeGOSI: this.addAllowanceForm.get('includeGOSI')?.value === true ? 1 : 0,
      PaymentBase: "None",
      EffectiveDate: formatDate(this.addAllowanceForm.get('effectiveDate')?.value, 'yyyy-MM-dd', 'en-US'),
      PayGroupId: this.projectId
    }
  }

  private constructEditEmployeeContractModel() {
    return {
      ContractId: this.selectedContract.contractId,
      ProfessionId: this.form.get('professionId')?.value,
      BasicSalary: this.form.get('basicSalary')?.value,
      Category: "Labor",
      VacationCodeAnnual: this.form.get('vacationCodeAnnual')?.value,
      DestinationId: this.form.get('destinationId')?.value,
      MainTypeId: this.selectedContract.mainTypeId,
      TicketClass: this.form.get('ticketClass')?.value,
      AdultsTickets: this.form.get('adultsTickets')?.value,
      ChildTickets: this.form.get('childTickets')?.value,
      InfantTickets: this.form.get('infantTickets')?.value,
      VisaCount: this.form.get('visaCount')?.value,
    }
  }

  private addRecord(model: any) {
    let dataSourceNewRecord = {
      allowanceCode: model.AllowanceCode,
      allowanceName: this.allowances.find(x => x.AllowanceCode === model.allowanceCode)?.Name,
      allowanceAmountValue: model.AllowanceAmountValue,
      allowancePercentage: model.AllowancePercentage,
      paidEvery: model.PaidEvery,
      calculateWithSalary: model.CalculateWithSalary,
      includeGOSI: model.IncludeGOSI,
      paymentBase: model.PaymentBase,
      effectiveDate: model.EffectiveDate,
      payGroupId: this.projectId
    };
    const currentData = this.allowanceDataSource.data;
    currentData.push(dataSourceNewRecord);
    this.allowanceDataSource.data = [...currentData];
  }

}
