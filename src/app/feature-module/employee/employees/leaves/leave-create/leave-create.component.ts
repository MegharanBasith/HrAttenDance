import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { routes } from 'src/app/core/core.index';
import { LeaveModel } from 'src/app/core/models/leave/leave-model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { LeaveService } from 'src/app/core/services/leave/leave.service';

@Component({
  selector: 'app-leave-create',
  templateUrl: './leave-create.component.html',
  styleUrl: './leave-create.component.scss'
})
export class LeaveCreateComponent implements OnInit {
  
  public routes = routes;
  leaveForm !: FormGroup;
  payWithOptions = ['Salary', 'Separate'];
  vacationTypeOptions = ['Annual', 'Sick', 'Maternity', 'Unpaid', 'ExamAndStudy', 'Hajj', 'FamilyDeath', 'ChildBirth', 'Maternity', 'Widow'];
  ticketForOptions = ['Employee', 'Family', 'Both'];
  ticketCostOnOptions = ['Company', 'Employee', 'Cash'];
  ticketDepartureOptions = ['Riyadh', 'Jeddah', 'Khobar'];
  paymentMethodOptions = ['Monthly Basis', 'Advanced Amount'];
  employeeList: any[] = [];
  showSpinner: boolean = false;
  userId !: string;
  isLeaveTicket: boolean = false;
  visaBalance: number = 0;
  vacationBalance: number = 0;
  hasVisa: boolean = false;
  searchValue: string = '';
  filteredEmployees: any[] = [];
  employeeDestinationCities: any[] = [];
  selectedEmpolyeeNationality !: string;
  saudiNationalityCode2 = 'sa';
  saudiNationalityCode3 = 'sau';
  isSaudi: boolean = false;
  projectId !: string;
  employeeControl !: FormControl; // Declare employeeControl
  separatePayWith : string = "Separate";
  monthlyBasisPaymentMethod : string = "Monthly Basis";

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private messageService: MessageService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {

    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;

    let notparsedUserId = localStorage.getItem('userId')
    if (notparsedUserId)
      this.userId = notparsedUserId;

    this.leaveForm = this.fb.group({
      employee: ['', Validators.required],
      payWith: ['', Validators.required],
      leaveType: ['', Validators.required],
      ticketEntitlement: [false, Validators.required],
      visaEntitlement: [false, Validators.required],
      ticketFor: [''],
      destinationCity: [''],
      ticketDeparture: [''],
      visaFor: [''],
      visaDays: [''],
      numberOfVisas: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      leaveDays: new FormControl({ value: 0, disabled: true }, Validators.required),
      paymentMethod: ['', Validators.required]
    },
      {
        validators: this.validateDateRange,
      });
    this.leaveForm.valueChanges.subscribe(() => {
      this.calculateVacationDays();
    });
    this.onChanges();
    //this.getEmployeeList();
    this.employeeControl = this.leaveForm.get('employee') as FormControl || new FormControl();
  }

  onChanges(): void {
    this.leaveForm.get('ticketEntitlement')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.leaveForm.get('ticketFor')?.setValidators([Validators.required]);
        this.leaveForm.get('destinationCity')?.setValidators([Validators.required]);
        this.leaveForm.get('ticketDeparture')?.setValidators([Validators.required]);
      } else {
        this.leaveForm.get('ticketFor')?.clearValidators();
        this.leaveForm.get('destinationCity')?.clearValidators();
        this.leaveForm.get('ticketDeparture')?.clearValidators();
      }
      this.leaveForm.get('ticketFor')?.updateValueAndValidity();
      this.leaveForm.get('destinationCity')?.updateValueAndValidity();
      this.leaveForm.get('ticketDeparture')?.updateValueAndValidity();
    });
    this.leaveForm.get('visaEntitlement')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.leaveForm.get('visaDays')?.setValidators([Validators.required]);
        this.leaveForm.get('numberOfVisas')?.setValidators([Validators.required]);
        this.leaveForm.get('visaFor')?.setValidators([Validators.required]);
      } else {
        this.leaveForm.get('visaDays')?.clearValidators();
        this.leaveForm.get('numberOfVisas')?.clearValidators();
        this.leaveForm.get('visaFor')?.clearValidators();
      }
      this.leaveForm.get('visaDays')?.updateValueAndValidity();
      this.leaveForm.get('numberOfVisas')?.updateValueAndValidity();
      this.leaveForm.get('visaFor')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      this.addLeave();
    }
  }

  calculateVacationDays() {
    const startDate = new Date(this.leaveForm.get('startDate')?.value);
    const endDate = new Date(this.leaveForm.get('endDate')?.value);

    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      const days = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Adding 1 to include the end date
      this.leaveForm.get('leaveDays')?.setValue(days, { emitEvent: false });
    }

    //this.getLeaveBalance();
  }

  validateDateRange(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    return startDate && endDate && new Date(endDate) < new Date(startDate)
      ? { 'invalidDateRange': true }
      : null;
  }

  getLeaveBalance() {
    let leaveType = this.leaveForm.get('leaveType')?.value;
    let startDate = this.leaveForm.get('startDate')?.value;
    let leaveDays = this.leaveForm.get('leaveDays')?.value;
    if (this.userId && leaveType && startDate && leaveDays) {
      this.leaveService.getLeaveBalance(this.userId, leaveType, startDate, leaveDays).subscribe(
        (response: any) => {
          if (response && response.isSuccess) {
            this.vacationBalance = response.data.vacationBalance;
            this.visaBalance = response.data.visaBalance;
          }
        },
        (error) => {
          this.showSpinner = false;
          console.error(error);
        }
      )
    }
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
        console.error(error);
      }
    )
  }

  addLeave() {
    this.showSpinner = true;
    let leaveModel = this.constructLeaveModel();
    debugger;
    this.leaveService.addLeave(leaveModel).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Leave created successfully" });
          setTimeout(() => {
            this.router.navigate([this.routes.leavelist]);
          }, 2000);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while adding the leave" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while adding the leave" });
      }
    )
  }

  getEmployeeDestinationCities(nationalityId: string) {
    debugger;
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

  getEmployeeById(id: string) {
    this.showSpinner = true;
    this.employeeService.getEmployeeById(id).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          if (response.data) {
            this.filteredEmployees = [response.data];
            this.employeeList = [...this.employeeList, response.data];
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

  onEmployeesLoaded(employees: any[]) {
    this.employeeList = employees;
  }

  onEmployeeSelectionChange(event: any) {
    debugger;
    this.selectedEmpolyeeNationality = this.employeeList.find(x => x.employeeId === event).nationality;
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
    if (this.filteredEmployees.length == 0) {
      this.getEmployeeById(searchTerm);
    }
  }

  displayEmployee(employeeId: string): string {
  const employee = this.filteredEmployees.find(e => e.employeeId === employeeId);
  if (employee) {
    return `${employee.employeeId} - ${employee.name}`; // Adjust spacing as needed
  }
  return '';
}

onPayWithChange(){
  if(this.leaveForm.get('payWith')?.value === this.separatePayWith)
  {
    this.leaveForm.patchValue({ paymentMethod: this.monthlyBasisPaymentMethod });
    this.leaveForm.get('paymentMethod')?.disable();
  }
  else{
    this.leaveForm.get('paymentMethod')?.enable();
    this.leaveForm.get('paymentMethod')?.reset();
  }
}

  private constructLeaveModel(): LeaveModel {
    debugger;
    let visaDays = this.leaveForm.get('visaDays')?.value;
    let visaUsed = this.leaveForm.get('numberOfVisas')?.value;
    return {
      EmployeeId: this.leaveForm.get('employee')?.value,
      EndDate: formatDate(this.leaveForm.get('endDate')?.value, 'yyyy-MM-dd', 'en-US'),
      ExtendedLeave1: 'No',
      ExtendedLeave2: 'No',
      PaymentMethod: this.leaveForm.get('paymentMethod')?.value,
      PayWith: this.leaveForm.get('payWith')?.value,
      StartDate: formatDate( this.leaveForm.get('startDate')?.value, 'yyyy-MM-dd', 'en-US'),
      DestinationCity: this.leaveForm.get('destinationCity')?.value === '' ? null : this.leaveForm.get('destinationCity')?.value,
      TicketEntitlement: this.leaveForm.get('ticketEntitlement')?.value == true ? "Yes" : "No",
      Ticketfor: this.leaveForm.get('ticketFor')?.value === '' ? null : this.leaveForm.get('ticketFor')?.value,
      VacationDays: this.leaveForm.get('leaveDays')?.value,
      VacationType: this.leaveForm.get('leaveType')?.value,
      VacationTypeEx1: this.leaveForm.get('leaveType')?.value,
      VacationTypeEx2: this.leaveForm.get('leaveType')?.value,
      VisaFor: this.leaveForm.get('visaFor')?.value === '' ? null : this.leaveForm.get('visaFor')?.value,
      destinationType: this.leaveForm.get('ticketEntitlement')?.value == true ? "International" : null,
      visaEntitlement: this.leaveForm.get('visaEntitlement')?.value == true ? "Yes" : "No",
      VisaUsed: !visaUsed || visaUsed === '' ? 0 : visaUsed,
      visaDays: !visaDays || visaDays ==='' ? 0: visaDays 
    }
  }
}
