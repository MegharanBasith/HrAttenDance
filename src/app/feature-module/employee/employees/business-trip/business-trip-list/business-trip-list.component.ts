import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/core/core.index';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BusinessTripService } from 'src/app/core/services/business-trip/business-trip.service';
import { MessageService } from 'primeng/api';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';


@Component({
  selector: 'app-business-trip-list',
  templateUrl: './business-trip-list.component.html',
  styleUrls: ['./business-trip-list.component.scss']
})
export class BusinessTripListComponent implements OnInit {
  cols = [
    'requestId',
    'personnelNumber',
    'workerName',
    'payGroupId',
    'destinationType',
    'payWith',
    'businessProfileId',
    'contractId',
    'transportationBy',
    'transactionDate',
    'payGroupStartDate',
    'payGroupEndDate',
    'effectiveDate',
    'startDate',
    'endDate',
    'requestFor',
    'requester',
    'status',
    'destination',
    'needHotel',
    'needFood',
    'needTransport',
    'isExitReEntryVisa'
  ];
  displayedColumnsWithActions: string[] = ['actions', ...this.cols.map(col => col)];
  dataSource = new MatTableDataSource<any>();
  businessTripRequests: Array<any> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public searchDataValue = '';
  public routes = routes;
  businessTripRequestsCount: number = 0;
  showSpinner: boolean = false;
  projectId !: string;
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  selectedRow !: any;

  constructor(private businessTripService: BusinessTripService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;
    this.getRequestList(1, 10);
  }

  getRequestList(startIndex: number, pageSize: number) {
    this.showSpinner = true;

    debugger;
    this.businessTripService.getRequestList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.businessTripRequests = response.data.businessTripList;
          this.dataSource.data = response.data.businessTripList;
          this.dataSource.sort = this.sort;
          this.businessTripRequestsCount = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    )
  }

  setPage(event: any) {
    debugger;
    console.log(event);
    this.getRequestList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  public sortData(sort: Sort) {
    const data = this.businessTripRequests.slice();

    if (!sort.active || sort.direction === '') {
      this.businessTripRequests = data;
    } else {
      this.businessTripRequests = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  onEdit(row: any) {
    localStorage.setItem('selectedBusinessTrip', JSON.stringify(row));
    this.router.navigate([this.routes.businessTripEdit]);
  }

  confirmDelete(row: any) {
    this.selectedRow = row;
    this.deleteDialog.show();
  }

  onDelete(row: any) {
    this.showSpinner = true;
    debugger;
    this.businessTripService.deleteBusinessTrip(row.requestId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Business trip deleted Successfully" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while deleting business trip" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while deleting business trip" });
      }
    )
  }
}
