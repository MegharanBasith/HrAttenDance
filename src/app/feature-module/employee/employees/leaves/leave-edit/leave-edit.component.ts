import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { routes } from 'src/app/core/core.index';
import { LeaveEditModel } from 'src/app/core/models/leave/leave-edit-model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { LeaveService } from 'src/app/core/services/leave/leave.service';

@Component({
  selector: 'app-leave-edit',
  templateUrl: './leave-edit.component.html',
  styleUrl: './leave-edit.component.scss'
})
export class LeaveEditComponent implements OnInit {

  public routes = routes;
  leaveForm !: FormGroup;
  payWithOptions = ['Salary', 'Separate'];
  vacationTypeOptions = ['Annual', 'Sick', 'Maternity', 'Unpaid', 'Exam An dStudy', 'Hajj', 'Family Death', 'Child Birth', 'Maternity', 'Widow'];
  ticketForOptions = ['Employee', 'Family', 'Both'];
  ticketCostOnOptions = ['Company', 'Employee', 'Cash'];
  visaForOptions = ['Employee', 'Family'];
  ticketDestinationOptions = ['Riyadh', 'Kabul', 'Riyadh-Kabul-Riyadh'];
  ticketDepartureOptions = ['Riyadh', 'Jeddah', 'Khobar'];
  paymentMethodOptions = ['Monthly Basis', 'Advanced Amount'];
  showSpinner: boolean = false;
  leave !: any;
  isLeaveTicket: boolean = false;
  visaBalance: number = 0;
  vacationBalance: number = 0;
  hasVisa: boolean = false;
  searchValue: string = '';
  employeeList: any[] = [];
  filteredEmployees: any[] = [];
  employeeDestinationCities: any[] = [];
  selectedEmpolyeeNationality !: string;
  saudiNationalityCode2 = 'sa';
  saudiNationalityCode3 = 'sau';
  isSaudi: boolean = false;
  messages: any[] = [];
  projectId !: string;
  approvedWorkflowState = 4;
  visible: boolean = false;
  returnVacationAction !: string;
  returnVacationActionOptions = ['None',
    'Absence',
    'Next Balance',
    'Vacation balance'
  ];
  absenceType !: string;
  absenceTypeOptions = ['Illegal Absence'
    , 'Legal Absence'
  ];
  actionDays !: number;
  differnceDays !: number;
  actualReturnDate !: any;
  defaultDate = new Date("1900-01-01T12:00:00");
  backToWorkDate !: any;

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private messageService: MessageService, private employeeService: EmployeeService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    debugger;

    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    let notparsedLeave = localStorage.getItem('selectedLeave')
    if (notparsedLeave)
      this.leave = JSON.parse(notparsedLeave);

    this.messages = [
      { severity: 'info', summary: 'Leave Status', detail: `: ${this.leave.workflowName}` }
    ];

    this.leaveForm = this.fb.group({
      empNum: new FormControl({ value: '', disabled: true }, Validators.required),
      payWithStr: new FormControl({ value: '', disabled: this.isDisabled() }, Validators.required),
      vacationTypeStr: new FormControl({ value: '', disabled: this.isDisabled() }, Validators.required),
      ticketEntitlement: new FormControl({ value: false, disabled: this.isDisabled() }, Validators.required),
      visaEntitlement: new FormControl({ value: false, disabled: this.isDisabled() }, Validators.required),
      ticketForStr: [''],
      destinationCity: [''],
      departureFromStr: [''],
      visaForStr: [''],
      visaDays: [''],
      visaUsed: [''],
      totalVacationSalary: new FormControl({ value: '', disabled: this.isDisabled() }),
      actualReturnDate: new FormControl({ value: '', disabled: this.isDisabled() }),
      startDate: new FormControl({ value: '', disabled: this.isDisabled() }, Validators.required),
      endDate: new FormControl({ value: '', disabled: this.isDisabled() }, Validators.required),
      vacationDays: new FormControl({ value: 0, disabled: true }, Validators.required),
      backToWorkDate: new FormControl({ value: '', disabled: this.isDisabled() }, Validators.required),
      paymentMethodStr: new FormControl({ value: '', disabled: this.isDisabled() }, Validators.required),
    },
      {
        validators: this.validateDateRange,
      });
    this.leaveForm.valueChanges.subscribe(() => {
      this.calculateVacationDays();
    });

    if (this.leave.workflowState === this.approvedWorkflowState)
      this.leaveForm.disable();

    this.onChanges();
    await this.getEmployeeList();
    await this.loadFormValues();
  }

  async loadFormValues(): Promise<void> {
    debugger;
    this.leave.startDate = new Date(this.leave.startDate);
    this.leave.endDate = new Date(this.leave.endDate);
    if (this.leave.actualReturnDate)
      this.leave.actualReturnDate = new Date(this.leave.actualReturnDate);
    if (this.leave.backToWorkDate)
      this.leave.backToWorkDate = new Date(this.leave.backToWorkDate);
    this.leave.ticketEntitlement = this.leave.ticketEntitlement == 1 ? true : false;
    this.isLeaveTicket = this.leave.ticketEntitlement;
    this.leave.visaEntitlement = this.leave.visaEntitlement == 1 ? true : false;
    this.hasVisa = this.leave.visaEntitlement;
    if (!this.employeeList.some(e => e.employeeId === this.leave.empNum)) {
      await this.getEmployeeById(this.leave.empNum);
    }
    this.onEmployeeSelectionChange(this.leave.empNum);
    this.backToWorkDate = this.leave.backToWorkDate;
    // Set the form values
    this.leaveForm.patchValue(this.leave);
  }

  onChanges(): void {
    // Watch for changes to the ticket entitlement
    this.leaveForm.get('ticketEntitlement')?.valueChanges.subscribe(checked => {
      if (checked) {
        // Add validators
        this.leaveForm.get('ticketForStr')?.setValidators([Validators.required]);
        this.leaveForm.get('destinationCity')?.setValidators([Validators.required]);
        this.leaveForm.get('departureFromStr')?.setValidators([Validators.required]);
      } else {
        // Clear validators
        this.leaveForm.get('ticketForStr')?.clearValidators();
        this.leaveForm.get('destinationCity')?.clearValidators();
        this.leaveForm.get('departureFromStr')?.clearValidators();
      }

      // Conditionally enable/disable based on isDisabled()
      this.leaveForm.get('ticketForStr')?.[this.isDisabled() ? 'disable' : 'enable']();
      this.leaveForm.get('destinationCity')?.[this.isDisabled() ? 'disable' : 'enable']();
      this.leaveForm.get('departureFromStr')?.[this.isDisabled() ? 'disable' : 'enable']();

      // Update validity after changing validators and enable/disable state
      this.leaveForm.get('ticketForStr')?.updateValueAndValidity();
      this.leaveForm.get('destinationCity')?.updateValueAndValidity();
      this.leaveForm.get('departureFromStr')?.updateValueAndValidity();
    });

    // Watch for changes to the visa entitlement
    this.leaveForm.get('visaEntitlement')?.valueChanges.subscribe(checked => {
      if (checked) {
        // Add validators
        this.leaveForm.get('visaDays')?.setValidators([Validators.required]);
        this.leaveForm.get('visaUsed')?.setValidators([Validators.required]);
        this.leaveForm.get('visaForStr')?.setValidators([Validators.required]);
      } else {
        // Clear validators
        this.leaveForm.get('visaDays')?.clearValidators();
        this.leaveForm.get('visaUsed')?.clearValidators();
        this.leaveForm.get('visaForStr')?.clearValidators();
      }

      // Conditionally enable/disable based on isDisabled()
      this.leaveForm.get('visaDays')?.[this.isDisabled() ? 'disable' : 'enable']();
      this.leaveForm.get('visaUsed')?.[this.isDisabled() ? 'disable' : 'enable']();
      this.leaveForm.get('visaForStr')?.[this.isDisabled() ? 'disable' : 'enable']();

      // Update validity after changing validators and enable/disable state
      this.leaveForm.get('visaDays')?.updateValueAndValidity();
      this.leaveForm.get('visaUsed')?.updateValueAndValidity();
      this.leaveForm.get('visaForStr')?.updateValueAndValidity();
    });
  }


  onSubmit() {
    if (this.leaveForm.valid) {
      this.editLeave();
    }
  }

  calculateVacationDays() {
    const startDate = new Date(this.leaveForm.get('startDate')?.value);
    const endDate = new Date(this.leaveForm.get('endDate')?.value);

    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      const days = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Adding 1 to include the end date
      this.leaveForm.get('vacationDays')?.setValue(days, { emitEvent: false });
    }
  }

  validateDateRange(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    return startDate && endDate && new Date(endDate) < new Date(startDate)
      ? { 'invalidDateRange': true }
      : null;
  }

  editLeave() {
    this.showSpinner = true;
    let leaveModel = this.constructLeaveModel();
    debugger;
    this.leaveService.editLeave(this.leave.requestId, leaveModel).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "Leave updated successfully" });
          setTimeout(() => {
            this.router.navigate([this.routes.leavelist]);
          }, 2000);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while updating the leave" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while updating the leave" });
      }
    )
  }
  onTicketEntitlementChange() {
    if (this.leaveForm.get('ticketEntitlement')?.value === true)
      this.isLeaveTicket = true;
    else
      this.isLeaveTicket = false;
  }
  onVisaEntitlementChange() {
    if (this.leaveForm.get('visaEntitlement')?.value === true)
      this.hasVisa = true;
    else
      this.hasVisa = false;
  }
  filterEmployees() {
    debugger;
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredEmployees = this.employeeList.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm) || employee.employeeId.includes(searchTerm)
    );
  }
  private constructLeaveModel(): LeaveEditModel {
    debugger;
    let visaDays = this.leaveForm.get('visaDays')?.value;
    let visaUsed = this.leaveForm.get('visaUsed')?.value;
    return {
      RequestId: this.leave.requestId,
      EmployeeId: this.leave.empNum,
      EndDate: formatDate(this.leaveForm.get('endDate')?.value, 'yyyy-MM-dd', 'en-US'),
      ExtendedLeave1: 'No',
      ExtendedLeave2: 'No',
      PaymentMethod: this.leaveForm.get('paymentMethodStr')?.value,
      PayWith: this.leaveForm.get('payWithStr')?.value,
      StartDate: formatDate(this.leaveForm.get('startDate')?.value, 'yyyy-MM-dd', 'en-US'),
      DestinationCity: this.leaveForm.get('destinationCity')?.value,
      TicketEntitlement: this.leaveForm.get('ticketEntitlement')?.value == true ? "Yes" : "No",
      Ticketfor: this.leaveForm.get('ticketForStr')?.value == '' ? null : this.leaveForm.get('ticketForStr')?.value,
      VacationDays: this.leaveForm.get('vacationDays')?.value,
      VacationType: this.leaveForm.get('vacationTypeStr')?.value,
      VacationTypeEx1: this.leaveForm.get('vacationTypeStr')?.value,
      VacationTypeEx2: this.leaveForm.get('vacationTypeStr')?.value,
      VisaFor: this.leaveForm.get('visaForStr')?.value == '' ? null : this.leaveForm.get('visaForStr')?.value,
      destinationType: this.leaveForm.get('ticketEntitlement')?.value == true ? "International" : null,
      visaEntitlement: this.leaveForm.get('visaEntitlement')?.value == true ? "Yes" : "No",
      VisaUsed: !visaUsed || visaUsed === '' ? 0 : visaUsed,
      visaDays: !visaDays || visaDays === '' ? 0 : visaDays
    }
  }

  async getEmployeeList(): Promise<void> {
    this.showSpinner = true;
    return lastValueFrom(this.employeeService.getActiveEmployees(this.projectId, 1, 10)).then(
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
      })
      .catch((error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
      );
  }

  async getEmployeeById(id: string): Promise<void> {
    debugger;
    this.showSpinner = true;
    return lastValueFrom(this.employeeService.getEmployeeById(id)).then(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          if (response.data) {
            debugger
            this.employeeList.push(response.data);
            if (!this.filteredEmployees.some(e => e.employeeId == response.data.employeeId))
              this.filteredEmployees.push(response.data);
          }
          else
            this.messageService.add({ severity: 'info', summary: 'Info', detail: response?.message ?? "not found" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while finding searched id" });
        }
      })
      .catch((error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
      );
  }

  onEmployeeSelectionChange(employeeId: string) {
    debugger;
    this.selectedEmpolyeeNationality = this.employeeList.find(x => x.employeeId === employeeId).nationality;
    if (this.selectedEmpolyeeNationality) {
      if (this.selectedEmpolyeeNationality.toLocaleLowerCase() === this.saudiNationalityCode2 ||
        this.selectedEmpolyeeNationality.toLocaleLowerCase() === this.saudiNationalityCode3) {
        this.isSaudi = true;
      }
      else {
        this.isSaudi = false;
        this.getEmployeeDestinationCities(this.selectedEmpolyeeNationality);
      }
    }
  }

  getEmployeeDestinationCities(nationalityId: string) {
    this.showSpinner = true;
    this.leaveService.getEmployeeDestinationCities(nationalityId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.employeeDestinationCities = response.data;
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retrieving employee destination cities" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retrieving employee destination cities" });
      }
    )
  }

  updateActualReturnDate() {
    debugger;
    this.showSpinner = true;
    let model = {
      VacationTransId: this.leave.vacationTransId,
      ReturnVacationAction: this.returnVacationAction,
      AbsenceType: this.absenceType,
      ActualReturnDate: formatDate(this.actualReturnDate, 'yyyy-MM-dd', 'en-US'),
      ActionDays: this.actionDays
    }
    this.leaveService.updateActualReturnDate(model.VacationTransId, model).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Actual return date updated successfully" });
          this.visible = false;
          setTimeout(() => {
            this.router.navigate([this.routes.leavelist]);
          }, 2000);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while updating actual return date" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while updating actual return date" });
      }
    )
  }

  calculateDifferenceDays(event: any): void {
    this.actualReturnDate = event;

    // Ensure both actualReturnDate and backToWorkDate are defined
    if (!this.actualReturnDate || !this.backToWorkDate) {
      this.differnceDays = 0; // Reset or set a default value if dates are not valid
      return;
    }

    // Convert the dates to Date objects
    const returnDate = new Date(this.actualReturnDate);
    const backToWorkDate = new Date(this.backToWorkDate);

    // Validate the created Date objects
    if (isNaN(returnDate.getTime()) || isNaN(backToWorkDate.getTime())) {
      this.differnceDays = 0; // Reset if dates are invalid
      return;
    }

    // Strip time from the dates
    const returnDateOnly = new Date(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDate());
    const backToWorkDateOnly = new Date(backToWorkDate.getFullYear(), backToWorkDate.getMonth(), backToWorkDate.getDate());

    // Calculate the difference in days
    const diffInMs = backToWorkDateOnly.getTime() - returnDateOnly.getTime();
    this.differnceDays = Math.ceil(Math.abs(diffInMs) / (1000 * 3600 * 24));
  }


  isDisabled() {
    return this.leave.status == 2 ? true : false;
  }

  isValidToUpdateActualReturnDate() {
    if (this.returnVacationAction && this.absenceType && this.actualReturnDate && this.actionDays >= 0)
      return true;

    return false;
  }

  showUpdateReturnDate(): boolean {
    // Ensure both actualReturnDate and defaultDate exist
    if (!this.leave?.actualReturnDate || !this.defaultDate) {
      return false;
    }

    // Convert actualReturnDate and defaultDate to Date objects if necessary
    const actualReturnDate = new Date(this.leave.actualReturnDate);
    const defaultDateOnly = new Date(this.defaultDate);

    // Verify that the conversion resulted in valid Date objects
    if (isNaN(actualReturnDate.getTime()) || isNaN(defaultDateOnly.getTime())) {
      return false;
    }

    // Compare dates without time
    return (
      actualReturnDate.getFullYear() === defaultDateOnly.getFullYear() &&
      actualReturnDate.getMonth() === defaultDateOnly.getMonth() &&
      actualReturnDate.getDate() === defaultDateOnly.getDate()
    );
  }

}

