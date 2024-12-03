import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BusinessTripService } from 'src/app/core/services/business-trip/business-trip.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { lastValueFrom } from 'rxjs';
import { routes } from 'src/app/core/core.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-trip-edit',
  templateUrl: './business-trip-edit.component.html',
  styleUrl: './business-trip-edit.component.scss'
})
export class BusinessTripEditComponent implements OnInit {
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
  showTicketClass: boolean = false;
  filteredDestinations: any[] = [];
  isDialogOpen = false;
  dataSource: Array<any> = [];
  selectedDestination !: string;
  selectedDestinationType !: string;
  columns: string[] = ['destinationId'];
  displayedColumns: string[] = [...this.columns, 'actions'];
  isSubmitted: boolean = false;
  isDuplicated: boolean = false;
  projectId !: string;

  constructor(private fb: FormBuilder, private businessTripService: BusinessTripService, private messageService: MessageService, private employeeService: EmployeeService,
    private router : Router
  ) { }

  async ngOnInit(): Promise<void> {
    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.businessTripForm = this.fb.group({
      personnelNumber: new FormControl({ value: '', disabled: true }, Validators.required),
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
        validators: this.validateDateRange
      });
    await this.loadFormValues();
    await this.getBusinessTripDestinationList();
    //this.getEmployeeList();
  }

  async loadFormValues(): Promise<void> {
    debugger;
    // Retrieve the form values from localStorage
    const storedData = localStorage.getItem('selectedBusinessTrip');
    if (storedData) {
      this.businessTripRequest = JSON.parse(storedData);

      // Wait for getBusinessTripDestinationList() to finish before proceeding
      await this.getBusinessTripRequestDestinationList();
      this.showTicketClass = this.businessTripRequest.transportationBy === 'By Plane' ? true : false;
      this.businessTripRequest.startDate = new Date(this.businessTripRequest.startDate);
      this.businessTripRequest.endDate = new Date(this.businessTripRequest.endDate);
      debugger;
      this.businessTripRequest.needFood = this.businessTripRequest.needFood === null || this.businessTripRequest.needFood === "" ? "No" : "Yes";
      this.businessTripRequest.needTransport = this.businessTripRequest.needTransport === null || this.businessTripRequest.needTransport === "" ? "No" : "Yes";
      this.businessTripRequest.needHotel = this.businessTripRequest.needHotel === null || this.businessTripRequest.needHotel === "" ? "No" : "Yes";
      this.businessTripRequest.isExitReEntryVisa = this.businessTripRequest.isExitReEntryVisa === null || this.businessTripRequest.isExitReEntryVisa === "" ? "No" : "Yes";

      // Set the form values
      this.businessTripForm.patchValue(this.businessTripRequest);
    }
  }

  async getBusinessTripDestinationList(): Promise<any> {
    this.showSpinner = true;
    return lastValueFrom(this.businessTripService.getDestinationList()).then(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.destinationOptions = response.data;
          this.onDestinationTypeChange(this.businessTripForm.get('destinationType')?.value);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retreiving destinations" });
      })
      .catch((error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while retreiving destinations" });
      }
      );
  }

  async getBusinessTripRequestDestinationList(): Promise<any> {
    this.showSpinner = true;

    // Return a promise from the last emitted value
    return lastValueFrom(this.businessTripService.getRequestDestinationList(this.businessTripRequest.requestId))
      .then((response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource = response.data.map((x: any) => ({ destinationId: x.destinationId }));
        } else if (response && !response.success) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.message ?? "An error has occurred while retrieving destinations"
          });
        }
      })
      .catch((error) => {
        this.showSpinner = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.message ?? "An error has occurred while retrieving destinations"
        });
      });
  }



  onSubmit() {
    if (this.dataSource.length == 0) {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: "Please select one or more destination by pressing on add destiantions button" });
      return;
    }
    if (this.businessTripForm.valid) {
      this.updateBusinessTrip();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill all the required fields" });
    }
  }



  updateBusinessTrip() {
    this.showSpinner = true;
    let model = this.constructEditBusinessTripModel();
    this.businessTripService.editRequest(this.businessTripRequest.requestId, model).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Business trip updated successfully" });
          setTimeout(() => {
            this.router.navigate([this.routes.businessTripList]);
          }, 2000);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while updating the business trip" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while updating the business trip" });
      }
    )
  }

  filterEmployees() {
    debugger;
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredEmployees = this.employeeList.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm) || employee.employeeId.includes(searchTerm)
    );
  }
  private constructEditBusinessTripModel() {
    let ticketClassValue = this.businessTripForm.get('ticketClass')?.value;
    let model = {
      requestId: this.businessTripRequest.requestId,
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
    if (this.dataSource.some(x => x.destinationId === this.selectedDestination)) {
      this.isDuplicated = true;
      return;
    }

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

  onDestinationTypeChange(event: string) {
    debugger;
    this.filteredDestinations = this.destinationOptions.filter(x => x.destinationType === event);
  }

}

