import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { EarningDeductionService, routes } from 'src/app/core/core.index';
import { eosAddModel } from 'src/app/core/models/eos/eosAdd-model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { EosService } from 'src/app/core/services/eos/eos.service';

@Component({
  selector: 'app-eos-add',
  templateUrl: './eos-add.component.html',
  styleUrl: './eos-add.component.scss'
})
export class EosAddComponent {
  public routes = routes;
  endDate: any;
  startDate: any;
  searchValue: string = '';
  employeeList: any[] = [];
  filteredEmployees: any[] = [];
  showSpinner: boolean = false;
  eosForm !: FormGroup;
  earnForm !: FormGroup;
  deductionForm !: FormGroup;
  userId !: string;
  projectId !: string;
  paymentMethodOptions = ['None', 'Tickets', "Cash"];
  yesNoOptions = ['Yes', 'No'];
  eosTypeId: any[] = [
    { Id: "EOC", EnglishName: 'End Of Contract' },
    { Id: "EOC-indv", EnglishName: 'EOC-Indv' },
    { Id: "LEGAL AGE", EnglishName: 'Legal Age' },
    { Id: "RES", EnglishName: 'Resignation' },
    { Id: "TER", EnglishName: 'Termination' },
    { Id: "TER 80", EnglishName: 'Termination 80' },
    { Id: "TER Indv", EnglishName: 'Termination Indv' },
    { Id: "VA0", EnglishName: 'vaction Amount Zero' }
  ];

  EmpStatus: any[] = ['Citizen', 'Iqama Transfer', 'Final Exit', 'Other', 'Escape', 'Exit without returne', 'Fixed price contract',];

  selectedEmpolyeeNationality !: string;
  saudiNationalityCode2 = 'sa';

  saudiNationalityCode3 = 'sau';
  isSaudi: boolean = false;
  employeeControl !: FormControl;
  showEarningDialog: boolean = false;
  showDeductionDialog: boolean = false;
  earnList: any[] = [];
  deductList: any[] = [];
  earnDeductAmountOptions: any[] = ['Amount', 'Percentage'];
  earningDataSource: Array<any> = [];
  deductionDataSource: Array<any> = [];
  columns: string[] = ['type', 'amount', 'notes'];
  displayedColumns: string[] = [...this.columns, 'actions'];
  earningLineNumber: number = 0;
  deductionLineNumber: number = 0;
  earnTransType: string = "Earning";
  deductionTransType: string = "Deduction";
  amountValueType: string = "Amount";
  newEosRequestId !: string;

  constructor(private fb: FormBuilder, private eosService: EosService, private messageService: MessageService, private employeeService: EmployeeService, private router: Router, private earningDeductionService: EarningDeductionService) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    let notparsedUserId = localStorage.getItem('userId')
    if (notparsedUserId)
      this.userId = notparsedUserId;
    this.getEmployeeList();


    this.eosForm = this.fb.group({
      employee: ['', Validators.required],
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      ActualEndDate: [{ value: '', disabled: true }],
      eosTypeId: ['', Validators.required],
      EmpStatus: ['', Validators.required],
      // paymentMethod: [],
      eosDate: ['', Validators.required],
      calculateForThisMonthOnly: [false, Validators.required]
    });

    this.earnForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', Validators.required],
      notes: ['']
    });
    this.deductionForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', Validators.required],
      notes: ['']
    });
    this.employeeControl = this.eosForm.get('employee') as FormControl || new FormControl();
  }

  filterEmployees() {
    debugger;
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
            debugger
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

  async onSubmit() {
    if (this.eosForm.valid) {
      await this.addEos();
    }
  }

  async addEos() {
    this.showSpinner = true;
    let AddModel = this.constructAddModel();

    try {
      const response: any = await lastValueFrom(this.eosService.addEos(AddModel));
      this.showSpinner = false;

      if (response && response.isSuccess) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response?.message ?? "EOS submitted successfully"
        });

        // Call addEarningDeductionTrans only if there's data to process
        if (this.earningDataSource.length > 0 || this.deductionDataSource.length > 0) {
          this.addEarningDeductionTrans(response.data);
        }

        // Navigate to the EOS list after a brief delay
        setTimeout(() => {
          this.router.navigate([this.routes.eoslist]);
        }, 2000);
      } else if (response && !response.isSuccess) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response?.message ?? "An error has occurred while adding the EOS"
        });
      }
    } catch (error: any) {
      this.showSpinner = false; // Ensure spinner is hidden on error
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.message ?? "An error has occurred while adding the EOS"
      });
    }
  }

  async addEarningDeductionTrans(requestId: string) {
    debugger;
    let model = this.constructEarningDeductionTransModel(requestId);

    try {
      const response: any = await lastValueFrom(this.eosService.createEarningDeductionTrans(model));


      if (response && response.isSuccess) {
        // Optional: Show success message
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "EOS submitted successfully" });


      } //else {
      //   // This is the else condition for when response is present but is not successful
      //   this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while adding earning deduction transactions" });
      // }
    } catch (error: any) {
      console.log(error.message);
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occurred while adding earning deduction transactions" });
    }
  }



  // Method to convert ISO date string to MM/DD/YYYY format
  formatIsoDateToString(isoDateString: string | null): string | null {
    if (!isoDateString) {
      return null; // Return null if the input is null
    }
    const date = new Date(isoDateString); // Create a Date object
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with zero
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero
    const year = date.getFullYear(); // Get year

    return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
  }


  private constructAddModel(): eosAddModel {
    let eosDate = formatDate(this.eosForm.get('eosDate')?.value, 'yyyy-MM-dd', 'en-US');
    let endDate = formatDate(this.endDate, 'yyyy-MM-dd', 'en-US')
    return {
      personnelNumber: this.eosForm.get('employee')?.value,
      eosDate: eosDate ?? '',
      EmpStatus: this.eosForm.get('EmpStatus')?.value,
      TicketPaymentMethod: "None",
      EOSTypeId: this.eosForm.get('eosTypeId')?.value,
      //startDate: eosDate ?? '',
      endDate: endDate ?? '',
      ActualEndDate: endDate ?? '',
      CalculateForThisMonth:  this.eosForm.get('calculateForThisMonthOnly')?.value === true ? "Yes" : "No",
    }
  }

  private constructEarningDeductionTransModel(requestId: string) {

    const combinedDataSource = [
      ...(this.earningDataSource.length > 0 ? this.earningDataSource : []),
      ...(this.deductionDataSource.length > 0 ? this.deductionDataSource : [])
    ];
    const combinedModel = combinedDataSource.map((item, index) => ({
      TransType: item.transType,
      EarningDeductionId: item.earningDeductionId,
      Notes: item.notes,
      Amount: item.amount,
      Days: 0,
      Percentage: 0,
      TotalAmount: item.totalAmount,
      LineNum: index + 1 // Adding 1 to the index to start line numbers from 1
    }));
    let model = {
      RequestId: requestId,
      EOSTransEarningDeduction: combinedModel
    }
    return model;
  }

  calculateStartDays(event: any) {
    debugger;
    const selectedEmployee = this.filteredEmployees.find(emp => emp.employeeId === event);
    this.eosForm.get('startDate')?.setValue(selectedEmployee.arrivalDate);


  }
  calculateEndDays() {

    debugger;
    let eosDate = new Date(this.eosForm.get('eosDate')?.value);
    //this.endDate = new Date(currentDate);
    this.endDate = new Date(eosDate);
    this.endDate.setDate(eosDate.getDate() - 1);
    this.eosForm.get('endDate')?.setValue(this.endDate);
    this.eosForm.get('ActualEndDate')?.setValue(this.endDate);

  }

  getEmployeeList() {
    this.showSpinner = true;
    this.employeeService.getActiveEmployees(this.projectId, 1, 10).subscribe(
      (response: any) => {
        debugger;
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
  onAddEarning() {
    this.showEarningDialog = true;
    this.getEarningList();
  }

  onAddingDeduction() {
    this.showDeductionDialog = true;
    this.getDeductionList();
  }

  getEarningList() {
    this.showSpinner = true;
    this.earningDeductionService.getEarningList().subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.earnList = response.data;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retriving earn list" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while retriving earn list" });
      }
    )
  }
  getDeductionList() {
    this.showSpinner = true;
    this.earningDeductionService.getDeductionList().subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.deductList = response.data;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retriving earn list" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while retriving earn list" });
      }
    )
  }
  addRecord(form: FormGroup, earnDeductionDetailList: any[], transType: string): void {
    debugger;
    let id = form.get('type')?.value
    const newRecord = {
      transType: transType,
      earningDeductionId: id,
      notes: form.get('notes')?.value,
      amount: form.get('amount')?.value ?? 0,
      type: earnDeductionDetailList.find(x => x.id == id).description,
      totalAmount: form.get('amount')?.value ?? 0
    };
    if (transType === this.earnTransType) {
      this.earningDataSource = [...this.earningDataSource, newRecord];
      this.showEarningDialog = false;
    }
    else {
      this.showDeductionDialog = false;
      this.deductionDataSource = [...this.deductionDataSource, newRecord];
    }
    form.reset();
  }

  deleteRecord(element: any): void {
    debugger;
    if (element.transType === this.earnTransType) {
      const index = this.earningDataSource.indexOf(element);
      if (index >= 0) {
        this.earningDataSource.splice(index, 1);
        this.earningDataSource = [...this.earningDataSource];
      }
    }
    else{
      const index = this.deductionDataSource.indexOf(element);
      if (index >= 0) {
        this.deductionDataSource.splice(index, 1);
        this.deductionDataSource = [...this.deductionDataSource];
      }
    }
  }
}
