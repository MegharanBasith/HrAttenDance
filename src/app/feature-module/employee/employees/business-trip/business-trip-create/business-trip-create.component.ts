import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { routes } from 'src/app/core/core.index';
import { BusinessTripService } from 'src/app/core/services/business-trip/business-trip.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-business-trip-create',
  templateUrl: './business-trip-create.component.html',
  styleUrl: './business-trip-create.component.scss'
})
export class BusinessTripCreateComponent implements OnInit {

  public routes = routes;
  businessTripForm !: FormGroup;
  payWithOptions = ['Salary', 'Seprate'];
  transportationByOptions = ['By Plane', 'By Train', 'By Car'];
  destinationTypeOptions = ['Internal', 'External'];
  yesNoOptions = ['Yes', 'No'];
  ticketClassOptions = ['Economy', 'First Class', 'Business']
  destinationOptions: any[] = [];
  businessTripRequest: any;
  showSpinner: boolean = false;
  employeeList: any[] = [];
  filteredEmployees: any[] = [];
  searchValue !: string;
  filteredDestinations: any[] = [];
  showTicketClass: boolean = false;
  isDialogOpen = false;
  dataSource: Array<any> = [];
  selectedDestination !: string;
  selectedDestinationType !: string;
  columns: string[] = ['destinationId'];
  displayedColumns: string[] = [...this.columns, 'actions'];
  isSubmitted: boolean = false;
  enableAddDestination = false;
  projectId !: string;
  employeeControl !: FormControl;

  constructor(private fb: FormBuilder, private businessTripService: BusinessTripService, private messageService: MessageService, private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.businessTripForm = this.fb.group({
      personnelNumber: ['', Validators.required],
      ticketClass: [''],
      payWith: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      transportationBy: ['', Validators.required],
      destinationType: ['', Validators.required],
      //destination: ['', Validators.required],
      needFood: ['', Validators.required],
      needTransport: ['', Validators.required],
      needHotel: ['', Validators.required],
      isExitReEntryVisa: ['', Validators.required]
    },
      {
        validators: this.validateDateRange,
      });
    this.getEmployeeList();
    this.getBusinessTripDestinationList();
    this.employeeControl = this.businessTripForm.get('personnelNumber') as FormControl || new FormControl();
  }

  getBusinessTripDestinationList() {
    this.showSpinner = true;
    this.businessTripService.getDestinationList().subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.destinationOptions = response.data;
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retreiving destinations" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retreiving destinations" });
      }
    )
  }

  onSubmit() {
    if (this.dataSource.length == 0) {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: "Please select one or more destination by pressing on add destiantions button" });
      return;
    }
    if (this.businessTripForm.valid) {
      this.createBusinessTrip();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill all the required fields" });
    }
  }

  createBusinessTrip() {
    this.showSpinner = true;
    let model = this.constructBusinessTripModel();
    debugger;
    this.businessTripService.createRequest(model).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "Business trip created successfully" });
          setTimeout(() => {
            this.router.navigate([this.routes.businessTripList]);
          }, 2000);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while craeating the business trip" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while creating the business trip" });
      }
    )
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

  onTransportationByChange(event: string) {
    setTimeout(() => {
      if (event === 'By Plane') {
        this.businessTripForm.get('ticketClass')?.setValidators([Validators.required]);
        this.businessTripForm.get('ticketClass')?.updateValueAndValidity();  // Ensure form control validity is updated
        this.showTicketClass = true;
      } else {
        this.showTicketClass = false;
        this.businessTripForm.get('ticketClass')?.clearValidators();  // Optionally remove validators when not needed
        this.businessTripForm.get('ticketClass')?.updateValueAndValidity();  // Ensure form control validity is updated
      }
    }, 0);
  }

  onDestinationTypeChange(event: string) {
    debugger;
    this.filteredDestinations = this.destinationOptions.filter(x => x.destinationType === event);
    this.enableAddDestination = true;
  }

  validateDateRange(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    return startDate && endDate && new Date(endDate) < new Date(startDate)
      ? { 'invalidDateRange': true }
      : null;
  }

  // Open the dialog
  openDialog(): void {
    this.isDialogOpen = true;
  }

  // Close the dialog
  closeDialog(): void {
    this.isDialogOpen = false;
  }

  // Add a new record
  addRecord(): void {
    debugger;
    this.isSubmitted = true;
    if (this.selectedDestination) {
      this.isSubmitted = false;
      const newRecord = {
        //destinationType: this.selectedDestinationType,
        destinationId: this.selectedDestination,
      };
      this.dataSource = [...this.dataSource, newRecord];
      this.selectedDestination = '';
      //this.selectedDestinationType = '';
    }
  }

  // Delete a record
  deleteRecord(element: any): void {
    debugger;
    const index = this.dataSource.indexOf(element);
    if (index >= 0) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

  private constructBusinessTripModel() {
    let ticketClassValue = this.businessTripForm.get('ticketClass')?.value;
    let model = {
      personnelNumber: this.businessTripForm.get('personnelNumber')?.value,
      endDate: this.businessTripForm.get('endDate')?.value,
      payWith: this.businessTripForm.get('payWith')?.value,
      startDate: this.businessTripForm.get('startDate')?.value,
      transportationBy: this.businessTripForm.get('transportationBy')?.value,
      destinationType: this.businessTripForm.get('destinationType')?.value,
      //DestinationId: this.businessTripForm.get('destination')?.value,
      TicketClass: !ticketClassValue || ticketClassValue.trim() === '' ? 'Economy' : ticketClassValue,
      requestFor: 'Employee himself',
      transactionDate: new Date().toISOString().slice(0, 10),
      needFood: this.businessTripForm.get('needFood')?.value,
      needTransport: this.businessTripForm.get('needTransport')?.value,
      needHotel: this.businessTripForm.get('needHotel')?.value,
      IsExitReEntryVisa: this.businessTripForm.get('isExitReEntryVisa')?.value,
      Destinations: this.dataSource
    }
    return model;
  }
}

