import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayGroupComponent } from './payGroup.component';
import { MessageService } from 'primeng/api';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../common/spinner/spinner.component'; // Import standalone SpinnerComponent
import { DeleteModalComponent } from '../common/delete-modal/delete-modal.component'; // Import standalone DeleteModalComponent
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ConfirmModalComponent } from "../common/confirm-modal/confirm-modal.component";
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeFilterComponent } from "../employee/employees/all-employee/employee-filter/employee-filter.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { payGroupRoutingModule } from './payGroup-routing.module';
import { PayGroupPeriodListComponent } from './payGroupPeriod-list/payGroupPeriod-list.component';
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ToastModule,
    RouterModule, // For navigation purposes
    payGroupRoutingModule,
    FormsModule,
    SpinnerComponent, // Include SpinnerComponent here
    DeleteModalComponent, // Include DeleteModalComponent here
    ReactiveFormsModule, // Add ReactiveFormsModule here
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ConfirmModalComponent,
    EmployeeFilterComponent,
    SharedModule
  ],
  declarations: [
    PayGroupComponent,
    PayGroupPeriodListComponent
  ],
  providers: [
    MessageService // Provide the MessageService here
  ],
})
export class PayGroupModule { }
