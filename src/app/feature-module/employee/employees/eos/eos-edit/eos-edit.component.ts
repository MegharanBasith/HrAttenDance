import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EarningDeductionService, routes, UserRoleService } from 'src/app/core/core.index';
import { EosCalculateStatus } from 'src/app/core/models/enums/eos-calculate-status';
import { eosEditModel } from 'src/app/core/models/eos/eosEdit-model';
import { EosService } from 'src/app/core/services/eos/eos.service';

@Component({
  selector: 'app-eos-edit',

  templateUrl: './eos-edit.component.html',
  styleUrl: './eos-edit.component.scss'
})
export class EosEditComponent {
  public routes = routes;
  eos: any;
  endDate: any;
  eosForm !: FormGroup;
  earnForm !: FormGroup;
  deductionForm !: FormGroup;
  showSpinner: boolean = false;
  paymentMethodOptions = ['None', 'Tickets', "Cash"];
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

  empStatus: any[] = ['Citizen', 'Iqama Transfer', 'Final Exit', 'Other', 'Escape', 'Exit without returne', 'Fixed price contract',];
  showEarningDialog: boolean = false;
  showDeductionDialog: boolean = false;
  earnList: any[] = [];
  deductList: any[] = [];
  updaidSalaryDataSource = new MatTableDataSource<any>();
  earningDataSource = new MatTableDataSource<any>();
  deductionDataSource = new MatTableDataSource<any>();
  columns: string[] = ['type', 'amount', 'notes'];
  displayedColumns: string[] = [...this.columns, 'actions'];
  earningLineNumber: number = 0;
  deductionLineNumber: number = 0;
  earnTransType: string = "Earning";
  deductionTransType: string = "Deduction";
  amountValueType: string = "Amount";
  newEosRequestId !: string;
  originalEarnDeductionList !: any;
  unpaidSalaryColumns = [
    'salaryCalculationId',
    'lineNumber',
    "payGroupStartDate",
    "payGroupEndDate",
    'netSalary'
  ];
  calculateStatus: number = 0;
  messages: any[] = [];
  pendingStatusKey: EosCalculateStatus = EosCalculateStatus.Pending;  // Get the enum value (1)
  pendingStatus: string = EosCalculateStatus[this.pendingStatusKey];
  approvedWorkflowState = "Approved";
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private eosService: EosService, private messageService: MessageService, private router: Router, 
    private earningDeductionService: EarningDeductionService, private userRoleService : UserRoleService) { }

  async ngOnInit() {
    let notparsedEOS = localStorage.getItem('selectedEOS')
    debugger;
    if (notparsedEOS)
      this.eos = JSON.parse(notparsedEOS);
   
    this.isAdmin = this.userRoleService.isAdmin();
    
    this.eosForm = this.fb.group({
      empNum: [{ value: '', disabled: true }],
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      actualEndDate: [{ value: '', disabled: true }],
      compensationValue: [{ value: '', disabled: true }],
      workingYears: [{ value: '', disabled: true }],
      deductedYears: [{ value: '', disabled: true }],
      netYears: [{ value: '', disabled: true }],
      workingMonths: [{ value: '', disabled: true }],
      deductedMonths: [{ value: '', disabled: true }],
      netMonths: [{ value: '', disabled: true }],
      workingDays: [{ value: '', disabled: true }],
      deductedDays: [{ value: '', disabled: true }],
      netDays: [{ value: '', disabled: true }],
      entitledCompensationValue: [{ value: '', disabled: true }],
      vacationDaysBalance: [{ value: '', disabled: true }],
      vacationBalanceAmount: [{ value: '', disabled: true }],
      unpaidSalariesAmount: [{ value: '', disabled: true }],
      eosDeductionAmount: [{ value: '', disabled: true }],
      unpaidLoans: [{ value: '', disabled: true }],
      housingAllowance: [{ value: '', disabled: true }],
      totalEarnings: [{ value: '', disabled: true }],
      totalDeductions: [{ value: '', disabled: true }],
      totalAmount: [{ value: '', disabled: true }],
      isPaid: [{ value: '', disabled: true }],
      totalNetDays: [{ value: '', disabled: true }],
      totalWorkingDays: [{ value: '', disabled: true }],
      eosDate: ['', Validators.required],
      eosTypeId: ['', Validators.required],
      empStatusStr: ['', Validators.required],
      calculateForThisMonth: [false]
      //paymentMethod: [],
    });
    this.loadFormValues();

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
    this.getEOSUnpaidSalaryList();
    await this.getEarningList();
    await this.getDeductionList();
    this.getEarnDeductionTransList();
    this.messages = [
      { severity: 'info', summary: 'EOS Status', detail: `: ${this.eos.workflowStateStr}` }
    ];
    if(this.eos.workflowStateStr === this.approvedWorkflowState)
      this.eosForm.disable();
  }

  loadFormValues(): void {
    debugger;

    this.eos.startDate = new Date(this.eos.startDate) ?? '';
    this.eos.endDate = new Date(this.eos.endDate) ?? '';
    this.eos.actualEndDate = new Date(this.eos.actualEndDate) ?? '';
    this.eos.eosDate = new Date(this.eos.eosDate) ?? '';
    this.eos.paymentMethod = new Date(this.eos.paymentMethod) ?? '';
    this.eos.calculateForThisMonth = this.eos.calculateForThisMonth === 1;

    // Set the form values
    this.eosForm.patchValue(this.eos);
  }

  getEOSUnpaidSalaryList() {
    this.showSpinner = true;

    debugger;
    this.eosService.getUnpaidSalaryList(this.eos.transId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.updaidSalaryDataSource.data = response.data;
          this.updaidSalaryDataSource.data.forEach(element => {
            element.workflowState = this.approvedWorkflowState
          });
        }
      },
      (error) => {
        this.showSpinner = false;
      }
    )
  }

  onSubmit() {
    if (this.eosForm.valid) {
      this.editEOS();
    }
  }

  private constructEditModel(): eosEditModel {
    debugger;
    return {
      PersonnelNumber: this.eos.empNum ?? '',
      EosDate: formatDate(this.eosForm.get('eosDate')?.value, 'yyyy-MM-dd', 'en-US'),
      EmpStatus: this.eosForm.get('empStatusStr')?.value,
      EOSTypeId: this.eosForm.get('eosTypeId')?.value,
      TicketPaymentMethod: "None",
      StartDate: formatDate(this.eosForm.get('startDate')?.value, 'yyyy-MM-dd', 'en-US'),
      EndDate: formatDate(this.eosForm.get('endDate')?.value, 'yyyy-MM-dd', 'en-US'),
      ActualEndDate: formatDate(this.eosForm.get('actualEndDate')?.value, 'yyyy-MM-dd', 'en-US'),
      RequestId: this.eos.transId,
      CalculateForThisMonth: this.eosForm.get('calculateForThisMonth')?.value === true ? "Yes" : "No"
    }
  }

  calculateEndDays() {

    debugger;
    let eosDate = new Date(this.eosForm.get('eosDate')?.value);
    //this.endDate = new Date(currentDate);
    this.endDate = new Date(eosDate);
    this.endDate.setDate(eosDate.getDate() - 1);
    this.eosForm.get('endDate')?.setValue(this.endDate);
    this.eosForm.get('actualEndDate')?.setValue(this.endDate);

  }

  editEOS() {
    this.showSpinner = true;
    let EOSModel = this.constructEditModel();
    // Await the observable as a promise
    this.eosService.editEos(EOSModel.RequestId, EOSModel).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response?.data ?? "EOS updated successfully"
          });

          // Navigate to the EOS list after a delay
          setTimeout(() => {
            this.router.navigate([this.routes.eoslist]);
          }, 2000);

        } else {
          // Handle unsuccessful response
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.message ?? "An error has occurred while updating the EOS"
          });
        }
      }, (error: any) => {
        // Error handling
        this.showSpinner = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.message ?? "An error has occurred while updating the EOS"
        });
      }
    );
  }
  onAddEarning() {
    this.showEarningDialog = true;
    this.getEarningList();
  }

  onAddingDeduction() {
    this.showDeductionDialog = true;
    this.getDeductionList();
  }

  getEarningList(): Promise<void> {
    this.showSpinner = true;
    return new Promise((resolve, reject) => {
      this.earningDeductionService.getEarningList().subscribe(
        (response: any) => {
          this.showSpinner = false;
          if (response && response.isSuccess) {
            this.earnList = response.data;
            resolve(); // Resolve the promise when successful
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.message ?? "An error has occurred while retrieving earn list"
            });
            reject(new Error(response?.message ?? "An error has occurred while retrieving earn list")); // Reject the promise
          }
        },
        (error) => {
          this.showSpinner = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message ?? "An error has occurred while retrieving earn list"
          });
          reject(new Error(error.message ?? "An error has occurred while retrieving earn list")); // Reject the promise
        }
      );
    });
  }

  getDeductionList(): Promise<void> {
    this.showSpinner = true;
    return new Promise((resolve, reject) => {
      this.earningDeductionService.getDeductionList().subscribe(
        (response: any) => {
          this.showSpinner = false;
          if (response && response.isSuccess) {
            this.deductList = response.data;
            resolve(); // Resolve the promise when successful
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.message ?? "An error has occurred while retrieving deduct list"
            });
            reject(new Error(response?.message ?? "An error has occurred while retrieving deduct list")); // Reject the promise
          }
        },
        (error) => {
          this.showSpinner = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message ?? "An error has occurred while retrieving deduct list"
          });
          reject(new Error(error.message ?? "An error has occurred while retrieving deduct list")); // Reject the promise
        }
      );
    });
  }

  getEarnDeductionTransList() {
    debugger;
    this.showSpinner = true;
    this.eosService.getEarnDeductTransList(this.eos.transId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.originalEarnDeductionList = response.data;
          this.earningDataSource.data = response.data.filter((x: any) => x.transType === this.earnTransType);
          this.earningDataSource.data.forEach(element => {
            const foundItem = this.earnList.find(x => x.id === element.earningDeductionId); // Find matching item
            if (foundItem) {
              element.type = foundItem.description; // Update the 'type' if a match is found
            }
          });

          this.deductionDataSource.data = response.data.filter((x: any) => x.transType === this.deductionTransType);
          const shouldRemovedDeductionTrans = this.originalEarnDeductionList.find((x: any) => x.transType === this.deductionTransType && x.lineNum === 0);
          if (shouldRemovedDeductionTrans)
            this.deleteRecord(this.deductionDataSource, shouldRemovedDeductionTrans);
          this.deductionDataSource.data.forEach(element => {
            const foundItem = this.deductList.find(x => x.id === element.earningDeductionId); // Find matching item
            if (foundItem) {
              element.type = foundItem.description; // Update the 'type' if a match is found
            }
          });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retriving earn and deduction transactions" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while retriving earn and deduction transactions" });
      }
    )
  }

  deleteEarnDeductionTrans(element: any) {
    debugger;
    this.eosService.deleteEarnDeductionTrans(this.eos.transId, element.lineNum).subscribe(
      (response: any) => {
        debugger;
        if (response && response.isSuccess) {
          // if (element.transType === this.earnTransType)
          //   this.deleteEarningRecord(element);
          // else
          //   this.deleteDeductionRecord(element);
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Earn/Deduction transaction deleted successfully" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retriving earn/deduction transactions" });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while retriving earn/deduction transactions" });
      }
    )
  }
  addRecord(form: FormGroup, earnDeductionDetailList: any[], transType: string): void {
    debugger;

    let id = form.get('type')?.value
    const combinedDataSource = [
      ...(this.earningDataSource.data.length > 0 ? this.earningDataSource.data : []),
      ...(this.deductionDataSource.data.length > 0 ? this.deductionDataSource.data : [])
    ];
    const newRecord = {
      transType: transType,
      earningDeductionId: id,
      notes: form.get('notes')?.value,
      amount: form.get('amount')?.value ?? 0,
      type: earnDeductionDetailList.find(x => x.id == id).description,
      totalAmount: form.get('amount')?.value ?? 0,
      lineNum: combinedDataSource.length + 1
    };
    if (transType === this.earnTransType) {
      this.earningDataSource.data = [...this.earningDataSource.data, newRecord];
      this.showEarningDialog = false;
    }
    else {
      this.showDeductionDialog = false;
      this.deductionDataSource.data = [...this.deductionDataSource.data, newRecord];
    }
    form.reset();
    this.addEarningDeductionTrans(newRecord);
  }

  deleteRecord(dataSource: any, element: any): void {
    debugger;

    const index = dataSource.data.indexOf(element);
    if (index >= 0) {
      dataSource.data.splice(index, 1);
      dataSource.data = [...dataSource.data];
    }
    this.deleteEarnDeductionTrans(element);
  }

  private constructEarningDeductionTransModel(record: any) {
    debugger;
    const earnDeductModel = {
      TransType: record.transType,
      EarningDeductionId: record.earningDeductionId,
      Notes: record.notes,
      Amount: record.amount,
      Days: 0,
      Percentage: 0,
      TotalAmount: record.totalAmount,
      LineNum: record.lineNum
    };

    let model = {
      RequestId: this.eos.transId,
      EOSTransEarningDeduction: [earnDeductModel]
    }
    return model;
  }

  addEarningDeductionTrans(record: any) {
    debugger;
    let model = this.constructEarningDeductionTransModel(record);

    this.eosService.createEarningDeductionTrans(model).subscribe(
      (response: any) => {
      },
      (error: any) => {
        console.log(error.message);
      });
  }

  onRowClicked(row: any) {
    localStorage.setItem('selectedSalaryCalculation', JSON.stringify(row));
    this.router.navigate([this.routes.salaryCalculationLineList]);
  }


  addEoscalculateRequest() {
    this.eosService.addEosCalculateRequest(this.eos.transId, this.eos.empNum).subscribe(
      (response: any) => {
        debugger;
        if (response && response.isSuccess) {
          if (response.data)
            this.calculateEOS();
          else
            this.messageService.add({ severity: 'warning', summary: 'Warning', detail: response?.message });
        }
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while calculating the EOS request" });
      }
    )
  }

  calculateEOS() {
    this.eosService.calculate(this.eos.transId).subscribe(
      (response: any) => {
        debugger;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: "The calculation request has been submitted, and a notification will be received once it is completed." });
          setTimeout(() => {
            this.router.navigate([this.routes.eoslist])
          }, 3000);
        }
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while calculating the EOS request" });
      }
    )
  }
  submitEos() {
    // Await the observable as a promise
    this.eosService.submitEos(this.eos.transId).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response?.data ?? "EOS submitted successfully"
          });

          // Navigate to the EOS list after a delay
          setTimeout(() => {
            this.router.navigate([this.routes.eoslist]);
          }, 2000);

        } else {
          // Handle unsuccessful response
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.message ?? "An error has occurred while submitting the EOS"
          });
        }
      }, (error: any) => {
        // Error handling
        this.showSpinner = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.message ?? "An error has occurred while submitting the EOS"
        });
      }
    );
  }
}

