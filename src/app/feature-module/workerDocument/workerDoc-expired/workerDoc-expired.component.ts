import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/core/helpers/routes/routes';
import { WorkerDocumentService } from 'src/app/core/services/worker-document/WorkerDocument.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WorkerDocumentModel } from 'src/app/core/models/workerDocument/workerDocument-model';
import { DocumentTypeModel } from 'src/app/core/models/workerDocument/DocumentType-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProcessExpiredWorkerDocumentModel } from 'src/app/core/models/workerDocument/processExpiredWorkerDocument-model';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-workerDoc-expired',
  templateUrl: './workerDoc-expired.component.html',
  styleUrls: ['./workerDoc-expired.component.scss']
})
export class WorkerDocExpiredComponent implements OnInit {

  cols = [
    'documentTypeId',
    'requestID',
    'empNum',
    'requestType',
    'sadadNo',
    'documentNumber',
    'projId',
    'documentDate',
    'paymentDate',
    'expiryDate',
    'period',
    'lineAmount',
    'documentStatus',
    'workflowStatus',
    'paymentStatus'
  ];

  // Column header mapping
  columnHeaders: Record<string, string> = {
    documentTypeId: 'Document Type Id',
    requestID: 'Request ID',
    empNum: 'Employee Num',
    requestType: 'Request Type',
    sadadNo: 'Sadad No',
    documentNumber: 'Document Number',
    projId: 'Project Id',
    documentDate: 'Document Date',
    paymentDate: 'Payment Date',
    expiryDate: 'Expiry Date',
    period: 'Period',
    lineAmount: 'Line Amount',
    documentStatus:'Document Status',
    workflowStatus:'Workflow Status',
    paymentStatus:'Payment Status'
  };
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public totalRecordsCount = 0;
  showSpinner: boolean = false;
  @ViewChild('confirmDialog') confirmDialog!: ConfirmModalComponent;

  selectedRow: any = {}; // Initialize selectedRow to an empty object
  actionType: string = '';
  projectId !: string;
  public routes = routes;
  documentTypeList!: DocumentTypeModel[];
  editForm!: FormGroup;
  processExpiredDoc: ProcessExpiredWorkerDocumentModel;

  constructor(private fb: FormBuilder,
    private workerDocService: WorkerDocumentService, private router: Router, private messageService: MessageService)
    {
      this.processExpiredDoc = {} as ProcessExpiredWorkerDocumentModel;
    }

  ngOnInit(): void {

    this.editForm = this.fb.group({
      documentTypeId: [''],
      requestID: [''],
      empNum: [''],
      requestType: [''],
      projId: [''],
      documentDate: [''],
      expiryDate: [''],
      period: ['', Validators.required] // Add validation as needed
    });

    this.loadDocumentTypes()
    const unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId) {
      this.projectId = unparsedProjectId;
    }
    this.getExpiredWorkerDocList(1, 10);
    this.displayedColumns = ['actions', ...this.cols];
  }

  getExpiredWorkerDocList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.workerDocService.getExpiredWorkerDocList(this.projectId,startIndex, pageSize).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data.workerDocList;
          this.dataSource.sort = this.sort;
          this.totalRecordsCount = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    );
  }

  loadDocumentTypes(): void {
    this.workerDocService.getWorkerDocTypeList().subscribe(
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

  setPage(event: any) {
    this.getExpiredWorkerDocList((event.pageIndex * event.pageSize) + 1, event.pageSize);
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
    } else {
      this.dataSource.data = data.sort((a: any, b: any) => {
        const aValue = a[sort.active];
        const bValue = b[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  confirmAction(row: any, action: string) {
    debugger;
    this.selectedRow = row;
    this.actionType = action;
    this.confirmDialog.show(action);
  }

  onConfirmAction() {
    this.showSpinner = true;

    switch (this.actionType) {
      case 'process':
        this.executeExpiredWorkerDoc(this.selectedRow);
        break;
      default:
        this.showSpinner = false;
        console.error('Unknown action type');
    }
  }

  onProcess(row: any): void {
    if (row) {
      this.selectedRow = { ...row }; // Clone the selected row to prevent binding issues
      this.selectedRow.expiryDate=new Date(this.selectedRow.expiryDate);
      const modal = document.getElementById('generate_expiredworker');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
        modal.setAttribute('aria-modal', 'true');
      }
    } else {
      console.warn('Row is undefined');
      this.selectedRow = {}; // Reset to avoid template access errors
    }
  }

  closeModal(): void {
    const modal = document.getElementById('generate_expiredworker');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.removeAttribute('aria-modal');
    }
  }

  executeExpiredWorkerDoc(model:any): void {
    debugger;
    this.processExpiredDoc.documentTypeId=model.documentTypeId;
    this.processExpiredDoc.requestID=model.requestID
    this.processExpiredDoc.empNum=model.empNum;
    this.processExpiredDoc.sadadNo=model.sadadNo;
    this.processExpiredDoc.documentNumber=model.documentNumber;
    this.processExpiredDoc.projId=model.projId;
    this.processExpiredDoc.expiryDate = new Date(model.expiryDate);
    this.processExpiredDoc.period=model.period;
    this.workerDocService.processExpiredWorkerDoc(this.processExpiredDoc).subscribe(
      (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "expired woker document processed Successfully" });
        this.closeModal();
        this.getExpiredWorkerDocList(1,10);
        this.showSpinner=false;
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured process the woker document." });
      }
    );
  }

  onExpiryDateChange(newDate: string): void {
    this.selectedRow.expiryDate = newDate;  // Updates the selected row with the new expiry date
  }
}
