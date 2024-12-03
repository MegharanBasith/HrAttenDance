import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from 'src/app/feature-module/common/spinner/spinner.component';


@Component({
  selector: 'app-employee-filter',
  standalone: true,
  imports: [MatSelectModule, FormsModule, ReactiveFormsModule, TranslateModule, CommonModule, ToastModule, SpinnerComponent],
  templateUrl: './employee-filter.component.html',
  styleUrl: './employee-filter.component.scss'
})
export class EmployeeFilterComponent {
  @Input() employeeControl!: FormControl; // FormControl passed from parent component
  @Output() selectionChange = new EventEmitter<any>(); // Output for selection change event
  @Output() employeesLoaded = new EventEmitter<any[]>();

  
  projectId !: string;
  searchValue: string = '';
  employees :any = [];
  filteredEmployees: any[] = [];
  showSpinner : boolean = false;

  constructor(private employeeService :  EmployeeService, private messageService : MessageService){}

  ngOnInit() {
    debugger;
    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getEmployeeList();
  }
  getEmployeeList() {
    debugger;
    this.employeeService.getActiveEmployees(this.projectId, 1, 10).subscribe(
      (response: any) => {
        debugger;
        if (response && response.isSuccess) {
          this.employees = response.data.employeeList;
          this.filteredEmployees = response.data.employeeList;
          this.employeesLoaded.emit(this.employees); // Emit the employee list
        }
        else {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retriving employee list" });
        }
      },
      (error) => {
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        console.error(error);
      }
    )
  }
  filterEmployees() {
    debugger;
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredEmployees = this.employees.filter( (employee : any) =>
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
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          if (response.data) {
            this.filteredEmployees = [response.data];
            this.employees.push(response.data);
            this.employeesLoaded.emit(this.employees); // Emit the employee list to the parent component
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
      }
    )
  }  
  // Emit selection change to parent component
  onSelectionChange(value: any) {
    this.selectionChange.emit(value);
  }
}
