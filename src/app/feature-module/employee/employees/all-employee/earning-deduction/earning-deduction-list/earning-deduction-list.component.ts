import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EarningDeductionService, routes, UserRoleService } from 'src/app/core/core.index';
import { environment } from 'src/app/environments/environment';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-earning-deduction-list',
  templateUrl: './earning-deduction-list.component.html',
  styleUrl: './earning-deduction-list.component.scss'
})
export class EarningDeductionListComponent implements OnInit {
  public routes = routes;
  showSpinner = false;
  dataSource = new MatTableDataSource<any>();
  columns = [
    'personalNumber'
    , 'workername'
    , 'transDate'
    , 'transType'
    , 'totalAmount'
    , 'amount'
    , 'earningDeductionId'
    , 'transId'
    , 'workflowstatus'
    , 'days'
    , 'percentage'
    , 'paywith'
    , 'payGroupPeriodStartDate'
    , 'payGroupPeriodEndDate'
    , 'fromEffectiveDate'
    , 'toEffectiveDate'
    , 'isPaid'
  ]
  displayedColumns = ['actions', ...this.columns];
  projectId !: string;
  totalEarningDeductionRequests: number = 0;
  selectedRow !: any; 
  approvedWorkflowState : string = "Approved";
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  defaultDate = "1900-01-01";
  isAdmin = false;

  constructor(private earningDeductionService: EarningDeductionService, private messageService: MessageService, private router: Router, private userRoleService: UserRoleService) { }
  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getEarningDeductionList(environment.defaultPageStartIndex, environment.defaultPageSize);
    this.isAdmin = this.userRoleService.isAdmin();
  }

  getEarningDeductionList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    this.earningDeductionService.getEarningDeductionList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data.earningDeductionList.map((item: any) => {
            if (item.fromEffectiveDate === this.defaultDate) {
              item.fromEffectiveDate = ""; 
            }
            if (item.toEffectiveDate === this.defaultDate) {
              item.toEffectiveDate = ""; 
            }
            return item;
          });
          this.totalEarningDeductionRequests = response.data.totalRecordsCount
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while retrieving earning and deduction requests" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    )
  }

    confirmDelete(row: any) {
      this.selectedRow = row;
      this.deleteDialog.show();
    }
  

  DeleteEarningDeductionRequest(row : any) {
    this.showSpinner = true;
    this.earningDeductionService.deleteEarningDeduction(row.transId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "earning/deduction request deleted successfully" });
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while deleting earning/deduction request" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    )
  }

  submitEarningDeductionTrans(transId : string) {
    debugger;
    this.showSpinner = true;

    this.earningDeductionService.submitEarningDeduction(transId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Earning/Deduction request submitted Successfully"
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response?.data ?? "An error has occurred while submitting earning/deduction request"
          });
        }
      },
      (error: any) => {
        this.showSpinner = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message ?? "An error has occurred while submitting earning/deduction request"
        });
      });
  }
  
  onEdit(row : any){
    localStorage.setItem('selectEarnDeductRequest', JSON.stringify(row));
    this.router.navigate([routes.earningDeductionEdit]);
  }

  setPage(event: any) {
    this.getEarningDeductionList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  public sortData(sort: Sort) {
    const data = this.dataSource.data.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
    } else {
      this.dataSource.data = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

}
