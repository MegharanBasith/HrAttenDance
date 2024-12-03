import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkerDocumentService } from 'src/app/core/services/worker-document/WorkerDocument.service';
import { WorkerDocumentModel } from 'src/app/core/models/workerDocument/workerDocument-model';
import { DocumentTypeModel } from 'src/app/core/models/workerDocument/DocumentType-model';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { MessageService } from 'primeng/api';
import { el } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-workerDoc-create',
  templateUrl: './workerDoc-create.component.html',
  styleUrls: ['./workerDoc-create.component.scss']
})
export class WorkerDocCreateComponent implements OnInit {
  public workerDocForm!: FormGroup;
  isWorkerDocSubmitted = false;
  documentTypeList!: DocumentTypeModel[]; // Array of DocumentType
  employeeControl !: FormControl;
  showSpinner: boolean = false;
  projectId !: string;
  employeeList: any[] = [];
  filteredEmployees: any[] = [];
  searchValue: string = '';

  constructor(
    private fb: FormBuilder,
    private workerDocumentService: WorkerDocumentService,
    private router: Router,
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {

    this.workerDocForm = this.fb.group({
      DocumentTypeId: [''],
      EmpNum: [''],
      RequestType: [''],
      SadadNo: [''],
      DocumentNumber: [''],
      //ProjId: ['', Validators.required],
      DocumentDate: [''],
      LineAmount: [null, Validators.min(0)],
      Period: [''],
    });
  }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.loadDocumentTypes();
    this.getEmployeeList();
    this.employeeControl = this.workerDocForm.get('EmpNum') as FormControl || new FormControl();

  }

  loadDocumentTypes(): void {
    this.workerDocumentService.getWorkerDocTypeList().subscribe(
      (response: any) => {
        this.documentTypeList = response.data.map((type: any) => ({
          DocumentTypeId: type.documentTypeId,
          EnglishDescription: type.englishDescription,
          ArabicDescription: type.arabicDescription
        }));
      },
      (error) => {
        console.error('Error fetching document types:', error);
      }
    );
  }

  createWorkerDoc(): void {
    this.isWorkerDocSubmitted = true;
    if (this.workerDocForm.valid) {
      const model: WorkerDocumentModel = this.workerDocForm.value;
      model.DocumentDate = formatDate(this.workerDocForm.value?.DocumentDate, 'yyyy-MM-dd', 'en-US');

      const projId = localStorage.getItem('projectId');
      if (projId) model.ProjId = projId;

      this.workerDocumentService.addWorkerDoc(model).subscribe(
        (response: any) => {
          if (response.isSuccess) {
            this.workerDocForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response?.data ?? "Worker document created successfully"
            });
            this.router.navigate(['workerDocument/workerDoc-list']);
          } else {
            this.isWorkerDocSubmitted = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.data ?? "Error creating worker document"
            });
          }
        },
        (error) => {
          this.isWorkerDocSubmitted = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error ?? "Error creating worker document"
          });
        }
      );
    }
  }



  getEmployeeList() {
    this.showSpinner = true;
    this.employeeService.getActiveEmployees(this.projectId, 1, 10).subscribe(
      (response: any) => {

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

  filterEmployees() {

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

}
