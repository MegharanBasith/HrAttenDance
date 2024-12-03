import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, UserRoleService, apiResultFormat, getLeave, getTimeSheet, routes } from 'src/app/core/core.index';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LeaveService } from 'src/app/core/services/leave/leave.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';


@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent implements OnInit {
  cols = [
    'requestId',
    'empNum',
    'startDate',
    'endDate',
    'status',
    'workflowState',
    'isExternal',
    'payGroupPeriodStartDate',
    'payGroupPeriodEndDate',
    'payWithStr',
    'ispaid'
    // { field: 'totalNetSalary', header: 'Total Net Salary' },
    // { field: 'totalMonthlyFees', header: 'Total Monthly Fees'},
    // { field: 'totalMawaridOtherDues', header: 'Total Mawarid Other Dues' },
    // { field: 'totalMawaridOtherDeductions', header: 'Total MAwarid OtherDeductions' },
    // { field: 'totalGOSI', header: 'Total GOSI' },
    // { field: 'totalGovFees', header: 'Total Gov Fees' },
    // { field: 'grandTotal', header: 'Grand Total' }
  ];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public lstLeave: Array<getLeave> = [];
  public searchDataValue = '';
  //dataSource!: MatTableDataSource<getTimeSheet>;
    public routes = routes;
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  leaveRecordCount: number = 0;

  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public LeaveList: Array<any> = [];
  showSpinner: boolean = false;
  selectedTimesheetPeriod !: string;
  public leaveTypes = [
    { key: "annual", value: "Annual" },
    { key: "sick", value: "Sick" },
    { key: "unpaid", value: "Unpaid" }
  ];
  from!: Date;
  to!: Date;
  vacationDays: number = 0;
  projectId !: string;
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  selectedRow !: any;
  submitState: number = 0;
  approvedWorkflowState : number = 4;
  isAdmin: boolean = false;
  //** / pagination variables

  constructor(private data: DataService, private leaveService: LeaveService, private router: Router, private messageService: MessageService, private userRoleService: UserRoleService) { }

  ngOnInit(): void {
    //this.getTableData();
    let unparsedProjectId = localStorage.getItem('projectId');
    if(unparsedProjectId)
      this.projectId = unparsedProjectId;
    
    this.isAdmin = this.userRoleService.isAdmin();

    this.getLeaveList(1, 10);
    this.displayedColumns = ['actions', ...this.cols];
  }

  getLeaveList(startIndex: number, pageSize: number) {
    this.showSpinner = true;
    debugger;
    this.leaveService.getLeaveList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = response.data.leaveList;
          this.dataSource.sort = this.sort;
          debugger;
          this.leaveRecordCount = response.data.totalRecordsCount;
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
    this.getLeaveList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  private getTableData(): void {
    this.LeaveList = [];
    this.serialNumberArray = [];

    this.data.getLeave().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getLeave, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstLeave.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getLeave>(this.lstLeave);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });


  }

  public sortData(sort: Sort) {
    const data = this.lstLeave.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstLeave = data;
    } else {
      this.lstLeave = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  /*   public getMoreData(event: string): void {
      if (event === 'next') {
        this.currentPage++;
        this.pageIndex = this.currentPage - 1;
        this.limit += this.pageSize;
        this.skip = this.pageSize * this.pageIndex;
        this.getTableData();
      } else if (event === 'previous') {
        this.currentPage--;
        this.pageIndex = this.currentPage - 1;
        this.limit -= this.pageSize;
        this.skip = this.pageSize * this.pageIndex;
        this.getTableData();
      }
    }
  
    public moveToPage(pageNumber: number): void {
      this.currentPage = pageNumber;
      this.skip = this.pageSelection[pageNumber - 1].skip;
      this.limit = this.pageSelection[pageNumber - 1].limit;
      if (pageNumber > this.currentPage) {
        this.pageIndex = pageNumber - 1;
      } else if (pageNumber < this.currentPage) {
        this.pageIndex = pageNumber + 1;
      }
      this.getTableData();
    }
  
    public changePageSize(): void {
      this.pageSelection = [];
      this.limit = this.pageSize;
      this.skip = 0;
      this.currentPage = 1;
      this.getTableData();
    } */

  public getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  // GenerateTimesheet() {
  //   debugger;
  //   let generateTimesheetRequestModel: GenerateTimesheetRequestModel = {
  //     ProjId: 'BR0000007',
  //     TimesheetPeriod: this.selectedTimesheetPeriod
  //   }
  //   this.timesheetService.generateTimesheet(generateTimesheetRequestModel).subscribe(
  //     (response: any) => {
  //       if (response && response.isSuccess) {
  //         console.log(response);
  //       }
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   )
  // }
  //   onRowClicked(row: any) {
  //     localStorage.setItem('selectedTimesheet', JSON.stringify(row));
  //     this.router.navigate([this.routes.timesheetLines]);
  //   }

  //   onPeriodChange(event: any) {
  //     this.selectedTimesheetPeriod = event.value;
  //   }
  calculateVacationDays(): void {
    if (this.from && this.to) {
      // const fromDate = new Date(this.from);
      // const toDate = new Date(this.to);

      // Calculate the difference in time
      const timeDiff = this.to.getTime() - this.from.getTime();

      // Calculate the difference in days
      this.vacationDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 1000 ms * 3600 s * 24 h = one day
    } else {
      this.vacationDays = 0;
    }
  }
  onEdit(row: any) {
    localStorage.setItem('selectedLeave', JSON.stringify(row));
    this.router.navigate([this.routes.leaveEdit]);
  }
  confirmDelete(row: any){
    this.selectedRow = row;
    this.deleteDialog.show();
  }
  onDelete(row: any) {
    this.showSpinner = true;

    debugger;
    this.leaveService.deleteLeave(row.requestId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Leave deleted Successfully" });
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while deleting the leave" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while deleting the leave" });
      }
    )
  }
  submitLeave(row: any) {
    this.showSpinner = true;
    debugger;
    this.leaveService.submitLeave(row.requestId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "Leave submitted successfully" });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message ?? "An error has occured while submitting the leave" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occured while submitting the leave" });
      }
    )
  }
}

export interface pageSelection {
  skip: number;
  limit: number;
}
