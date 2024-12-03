import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerDocumentService } from 'src/app/core/services/worker-document/WorkerDocument.service';
import { EditWorkerDocumentModel } from 'src/app/core/models/workerDocument/editWorkerDocument-model';
import { DocumentTypeModel } from 'src/app/core/models/workerDocument/DocumentType-model';
import { MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-workerDoc-edit',
  templateUrl: './workerDoc-edit.component.html',
  styleUrls: ['./workerDoc-edit.component.scss']
})
export class WorkerDocEditComponent implements OnInit {
  editForm: FormGroup;
  documentId: string | undefined;
  isEditSubmitted = false;
  documentTypeList!: DocumentTypeModel[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private workerDocumentService: WorkerDocumentService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.editForm = this.fb.group({
      DocumentTypeId: [''],
      EmpNum: [''],
      RequestType: [''],
      SadadNo: [''],
      DocumentNumber: [''],
      ProjId: [''],
      DocumentDate: [''],
      ExpiryDate:[''],
      PaymentDate:[''],
      LineAmount: [null, Validators.min(0)],
      Period: ['',Validators.min(0)],
      RequestID: ['']
    });
  }

  ngOnInit(): void {
    debugger;
    this.loadDocumentTypes()
    const data = history.state.data; // Assume data is passed through router state
    if (data) {
      // Map the data to the form controls
      this.editForm.patchValue({
        DocumentTypeId: data.documentTypeId, // Change to match data property
        EmpNum: data.empNum,
        RequestType: data.requestType,
        SadadNo: data.sadadNo,
        DocumentNumber: data.documentNumber,
        ProjId: data.projId,
        DocumentDate: new Date(data.documentDate),
        PaymentDate:new Date(data.paymentDate),
        ExpiryDate: new Date(data.expiryDate),
        LineAmount: data.lineAmount,
        Period: data.period,
        RequestID: data.requestID
      });
      this.documentId = data.documentNumber; // Store document number for reference
    }
    this.setupExpiryDateUpdate();

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

  model: EditWorkerDocumentModel={
    RequestID: '',
    DocumentTypeId: '',
    DocumentStatus: '',
    EmpNum: '',
    RequestType: '',
    SadadNo: '',
    DocumentNumber: '',
    ProjId: '',
    DocumentDate: '',
    ExpiryDate: '',
    PaymentDate: '',
    LineAmount: 0,
    Period: 0,
    PaymentStatus:'',
    WorkflowStatus:''
  };
  updateWorkerDoc(): void {
    this.isEditSubmitted = true;
    if (this.editForm.valid) {
      this.model.DocumentTypeId=this.editForm.value.DocumentTypeId;
      this.model.EmpNum=this.editForm.value.EmpNum;
      this.model.RequestType=this.editForm.value.RequestType;
      this.model.SadadNo=this.editForm.value.SadadNo;
      this.model.DocumentNumber=this.editForm.value.DocumentNumber;
      this.model.ProjId=this.editForm.value.ProjId;
      this.model.DocumentDate=formatDate(this.editForm.value.DocumentDate, 'yyyy-MM-dd', 'en-US');
      this.model.ExpiryDate=formatDate(this.editForm.value.ExpiryDate, 'yyyy-MM-dd', 'en-US');
      this.model.PaymentDate=formatDate(this.editForm.value.PaymentDate, 'yyyy-MM-dd', 'en-US');
      this.model.LineAmount=this.editForm.value.LineAmount;
      this.model.Period=this.editForm.value.Period;
      this.model.RequestID=this.editForm.value.RequestID;

      this.workerDocumentService.editWorkerDoc(this.model).subscribe(
        (response: any) => {
          debugger;
          if(response && response.isSuccess){
            this.isEditSubmitted = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Worker document updated successfully" });
            this.editForm.reset();
            this.router.navigate(['workerDocument/workerDoc-list']);
          }
          else{
            debugger;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message ?? "Error updating worker document" });
          }
        },
        (error) => {
          debugger;
          const errorMessage = error?.error?.message || error?.message || 'An unknown error occurred';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
        }
      );
    }
  }

  setupExpiryDateUpdate(): void {
    this.editForm.get('DocumentDate')?.valueChanges.subscribe(() => {
      this.updateExpiryDate();
    });

    this.editForm.get('Period')?.valueChanges.subscribe(() => {
      this.updateExpiryDate();
    });
  }

  updateExpiryDate(): void {
    const documentDate = this.editForm.get('DocumentDate')?.value;
    const period = this.editForm.get('Period')?.value;

    if (documentDate && period) {
      const expiryDate = this.calculateExpiryDate(documentDate, period);
      this.editForm.get('ExpiryDate')?.setValue(expiryDate, { emitEvent: false });
    }
  }

  private calculateExpiryDate(documentDate: string | Date, period: number): Date {
    const date = new Date(documentDate);
    const daysCount=period*30;
    date.setDate(date.getDate()+daysCount);
    return date;
  }

}
