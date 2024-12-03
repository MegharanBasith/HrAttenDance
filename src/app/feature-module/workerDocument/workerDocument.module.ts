import { ProcessExpiredWorkerDocumentModel } from './../../core/models/workerDocument/processExpiredWorkerDocument-model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerDocumentComponent } from './workerDocument.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { WorkerDocumentRoutingModule } from './workerDocument-routing.module';
import { WorkerDocListComponent } from './workerDoc-list/workerDoc-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api'; // Import MessageService
import { SpinnerComponent } from '../common/spinner/spinner.component'; // Import standalone SpinnerComponent
import { DeleteModalComponent } from '../common/delete-modal/delete-modal.component'; // Import standalone DeleteModalComponent
import { WorkerDocCreateComponent } from './workerDoc-create/workerDoc-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { WorkerDocEditComponent } from './workerDoc-edit/workerDoc-edit.component';
import { ConfirmModalComponent } from "../common/confirm-modal/confirm-modal.component";
import { WorkerDocExpiredComponent } from './workerDoc-expired/workerDoc-expired.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeFilterComponent } from "../employee/employees/all-employee/employee-filter/employee-filter.component";
import { SharedModule } from '../../shared/shared.module';

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
    WorkerDocumentRoutingModule,
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
    WorkerDocumentComponent,
    WorkerDocListComponent,
    WorkerDocCreateComponent,
    WorkerDocEditComponent,
    WorkerDocExpiredComponent
  ],
  providers: [
    MessageService // Provide the MessageService here
  ],
})
export class WorkerDocumentModule {}
