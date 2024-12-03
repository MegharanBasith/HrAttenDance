import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WorkerDocumentService } from '../../../core/services/worker-document/WorkerDocument.service';
import { routes, UserRoleService } from '../../../core/core.index';
import { WorkerDocumentModel } from '../../../core/models/workerDocument/workerDocument-model';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { ProcessExpiredWorkerDocumentModel } from 'src/app/core/models/workerDocument/processExpiredWorkerDocument-model';
import { WorkerDocPaymentStatus } from 'src/app/core/models/workerDocument/workerDocPaymentStatus.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workerDoc-list',
  templateUrl: './workerDoc-list.component.html',
  styleUrls: ['./workerDoc-list.component.scss']
})
export class WorkerDocListComponent implements OnInit {

  cols = [
    'documentTypeId',
    'requestID',
    'empNum',
    'requestType',
    'sadadNo',
    'documentNumber',
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
  selectedRow: any;
  actionType: string = '';
  projectId !: string;
  public routes = routes;
  isAdmin: boolean = false;
  processExpiredDoc: ProcessExpiredWorkerDocumentModel;
  modalVisible: boolean = false;
  setPaymentmodalVisible:boolean=false;
  paymentStatusForm: FormGroup;

  paymentStatus = WorkerDocPaymentStatus;
  paymentStatusKeys: number[];


  constructor(private workerDocService: WorkerDocumentService, private router: Router,
              private messageService: MessageService,private userRoleService : UserRoleService,private fb: FormBuilder)
    {
      this.processExpiredDoc = {} as ProcessExpiredWorkerDocumentModel;
      this.initializeSelectedRow();

      this.paymentStatusKeys = Object.keys(this.paymentStatus)
      .filter(key => !isNaN(Number(key)))
      .map(Number);

      this.paymentStatusForm = this.fb.group({
        requestID:['',Validators.required],
        paymentStatus:['',Validators.required],
      });

    }

  ngOnInit(): void {
    this.isAdmin = this.userRoleService.isAdmin();

    const unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId) {
      this.projectId = unparsedProjectId;
    }
    this.getWorkerDocList(1, 10);
    this.displayedColumns = ['actions', ...this.cols];
  }

  initializeSelectedRow() {
    if (!this.selectedRow) {
      this.selectedRow = {};  // Make sure selectedRow is initialized
    }
    this.cols.forEach(col => {
      this.selectedRow[col] = null;  // Or use any default value like '' or 'N/A'
    });
  }

  getWorkerDocList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.workerDocService.getWorkerDocList(this.projectId,startIndex, pageSize).subscribe(
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

  setPage(event: any) {
    this.getWorkerDocList((event.pageIndex * event.pageSize) + 1, event.pageSize);
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

  onEdit(row: any) {
    this.router.navigate([routes.workerDocumentEdit], { state: { data: row } });

  }

  confirmAction(row: any, action: string) {
    this.selectedRow = row;
    this.actionType = action;
    this.confirmDialog.show(action);
  }

  onConfirmAction() {
    this.showSpinner = true;

    switch (this.actionType) {
      case 'delete':
        this.onDelete(this.selectedRow);
        break;
      case 'fail':
        this.onToFail(this.selectedRow);
        break;
      case 'success':
        this.onToSucess(this.selectedRow);
        break;
      case 'process':
        this.executeExpiredWorkerDoc(this.selectedRow);
        break;
      case 'underProcess':
        this.onToToUnderProcess(this.selectedRow);
        break;
      default:
        this.showSpinner = false;
        console.error('Unknown action type');
    }
  }

  onDelete(row: any) {
    this.showSpinner = true;
    this.workerDocService.deleteWorkerDoc(row.requestID).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.getWorkerDocList(1, 10);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "woker document deleted Successfully" });
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while deleting the woker document" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while deleting the woker document" });
      }
    )
  }

  submitWorkerDoc(row: any) {
    debugger;
    this.showSpinner = true;
    this.workerDocService.submitWorkerDoc(row.requestID).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.getWorkerDocList(1, 20);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "woker document submitted Successfully" });
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while submitting the woker document" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while submitting the woker document" });
      }
    )
  }


  onToFail(row: any) {
    this.showSpinner = true;
    this.workerDocService.seteWorkerDocToFailed(row.requestID).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.getWorkerDocList(1, 10);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "woker document makerd as Faild Successfully" });
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while mark the woker document to Faild" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while mark the woker document to Faild" });
      }
    )
  }

  onToSucess(row: any) {
    this.showSpinner = true;
    this.workerDocService.seteWorkerDocToSuccess(row.requestID).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.getWorkerDocList(1, 10);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "woker document makerd as success Successfully" });
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while mark the woker document to success" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while mark the woker document to success" });
      }
    )
  }

  onToToUnderProcess(row: any) {
    this.showSpinner = true;
    this.workerDocService.seteWorkerDocToUnderProcess(row.requestID).subscribe(
      (response: any) => {

        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.getWorkerDocList(1, 10);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "woker document makerd as UnderProcess Successfully" });
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while mark the woker document to UnderProcess" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while mark the woker document to UnderProcess" });
      }
    )
  }

  onRowClick(document: WorkerDocumentModel): void {
    this.router.navigate([routes.workerDocumentEdit], { state: { data: document } });
  }


  onExpiryDateChange(newDate: string): void {
    this.selectedRow.expiryDate = newDate;  // Updates the selected row with the new expiry date
  }

  onProcess(row: any): void {
    debugger
    if (row) {
      this.selectedRow = { ...row };
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

  setPayment(row: any): void {
    debugger
    if (row) {
      this.selectedRow = { ...row };
      this.paymentStatusForm.patchValue({
        requestID:this.selectedRow.requestID,
        paymentStatus:this.selectedRow.paymentStatus
      });
      const modal = document.getElementById('setWorkerDocPayment');
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

  setPaymentStatus(){
    debugger;
    this.showSpinner = true;
    const paymentStatusEnumValue = WorkerDocPaymentStatus[this.paymentStatusForm.value.paymentStatus as keyof typeof WorkerDocPaymentStatus];
    this.workerDocService.setWorkerDocPaymentStatus(this.paymentStatusForm.value.requestID,paymentStatusEnumValue).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.getWorkerDocList(1, 10);
          this.closePaymentModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "woker document payment status changes Successfully" });
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while change the woker document payment status" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while change the woker document payment status" });
      }
    )
  }

  closePaymentModal(): void {
    const modal = document.getElementById('setWorkerDocPayment');
    if (modal) {
      this.selectedRow = {};
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.removeAttribute('aria-modal');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('generate_expiredworker');
    if (modal) {
      this.selectedRow = {};
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
        this.getWorkerDocList(1,10);
        this.showSpinner=false;
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured process the woker document." });
      }
    );
  }

  isProcessEnabled(row: any): boolean {
    return row.paymentStatus === 'Paid' &&
           this.isAdmin &&
           row.workflowStatus === 'Approved' &&
           (row.documentStatus === 'Success' || row.documentStatus === 'Failed');
}
}
