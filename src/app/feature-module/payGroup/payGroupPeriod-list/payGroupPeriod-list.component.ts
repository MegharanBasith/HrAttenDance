import { PayGroupPeriodService } from './../../../core/services/payGroupPeriod/pay-group-period.service';
import { PayGroupSubmitModel } from '../../../core/models/payGroup/PayGroupSubmit-model';
import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { routes } from '../../../core/core.index';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-payGroupPeriod-list',
  templateUrl: './payGroupPeriod-list.component.html',
  styleUrls: ['./payGroupPeriod-list.component.scss']
})
export class PayGroupPeriodListComponent implements OnInit {

  // Define the columns you want to display in the table
 cols = [
  'periodId',
  'payGroupId',
  'serialNum',
  'payGroupStartDate',
  'payGroupEndDate',
  'status',
  'workflowStatus',
  'pendingSalaryCalc'
  ];


// Define the column headers with readable names
 columnHeaders: Record<string, string> = {
    periodId: 'Period ID',
    payGroupId: 'Pay Group ID',
    serialNum: 'Serial Number',
    payGroupStartDate: 'Pay Group Start Date',
    payGroupEndDate: 'Pay Group End Date',
    status: 'Status',
    workflowStatus: 'Workflow Status',
    pendingSalaryCalc: 'Pending Salary Calculation'
  };

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public totalRecordsCount = 0;
  showSpinner: boolean = false;
  @ViewChild('confirmDialog') confirmDialog!: ConfirmModalComponent;
  selectedRow!: any;
  actionType: string = '';
  projectId !: string;
  public routes = routes;
  submitPayGroupPeriod: PayGroupSubmitModel = {
    PeriodId: '',
  };
  constructor(private payGroupService: PayGroupPeriodService, private router: Router, private messageService: MessageService) { }

  ngOnInit():void {
    const unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId) {
      this.projectId = unparsedProjectId;
    }
    this.getPayGroupPeriodList(this.projectId,1, 10);
    this.displayedColumns = ['actions', ...this.cols];
  }

  getPayGroupPeriodList(projectId:string,startIndex: number, pageSize: number) {
    debugger;
    this.showSpinner = true;
    this.payGroupService.getPayGroupPeriodList(projectId,startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data.payGroupPeriodList;
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
    this.getPayGroupPeriodList(this.projectId,(event.pageIndex * event.pageSize) + 1, event.pageSize);
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
    this.selectedRow = row;
    this.actionType = action;
    this.confirmDialog.show(action);
  }

  onConfirmAction() {
    this.showSpinner = true;

    switch (this.actionType) {
      case 'submit':
        this.onSubmit(this.selectedRow);
        break;
      default:
        this.showSpinner = false;
        console.error('Unknown action type');
    }
  }

  onSubmit(row: any) {
    debugger;
    this.showSpinner = true;
    this.submitPayGroupPeriod.PeriodId=row.periodId;
    this.payGroupService.submitPayGroupPeriod(this.submitPayGroupPeriod).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.getPayGroupPeriodList(this.projectId,1, 10);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Pay group period submitted Successfully" });
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while submit Pay group period" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error ?? "An error has occured while submit Pay group period" });
      }
    )
  }
}
