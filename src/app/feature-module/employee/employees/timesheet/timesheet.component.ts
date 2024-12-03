import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService, TimesheetService, apiResultFormat, getTimeSheet, routes } from 'src/app/core/core.index';
import { GenerateTimesheetRequestModel } from 'src/app/core/models/timesheet/generate-timesheet-request-model';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  cols = [
    { field: 'timesheetId', header: 'Id' },
    { field: 'timesheetPeriod', header: 'Period' },
    { field: 'timesheetStatus', header: 'Status' },
    { field: 'isManualApproval', header: 'Manual Approval' },
    { field: 'isSalaryProcessed', header: 'Salary Processed' },
    { field: 'note', header: 'Note' },
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
  public lstTimesheet: Array<getTimeSheet> = [];
  public searchDataValue = '';
  //dataSource!: MatTableDataSource<getTimeSheet>;
  public routes = routes;
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public timesheetPeriods: Array<any> = [];
  public timesheetList: Array<any> = [];
  showSpinner: boolean = false;
  selectedTimesheetPeriod !: string;
  displayedColumnsWithActions: any[] = [{ field: 'actions', header: 'actions' }, ...this.cols];
  projectId !: string;

  constructor(private data: DataService, private timesheetService: TimesheetService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;
    //this.getTableData();
    this.getTimesheetPeriods();
    this.getTimesheetList();
    this.displayedColumns = this.displayedColumnsWithActions.map(x => x.field);
  }

  getTimesheetPeriods() {
    this.timesheetService.getTimesheetPeriods().subscribe(
      (response: any) => {
        if (response && response.isSuccess) {
          this.timesheetPeriods = response.data;
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occurred while retrieving periods" });
      }
    )
  }

  getTimesheetList() {
    this.showSpinner = true;
    this.timesheetService.getTimesheetList(this.projectId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.timesheetList = response.data;
          this.dataSource.data = response.data;
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occurred while retrieving timesheet list" });
      }
    )
  }

  private getTableData(): void {
    this.lstTimesheet = [];
    this.serialNumberArray = [];

    this.data.getTimeSheet().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getTimeSheet, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstTimesheet.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getTimeSheet>(this.lstTimesheet);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });


  }

  public sortData(sort: Sort) {
    const data = this.lstTimesheet.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstTimesheet = data;
    } else {
      this.lstTimesheet = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstTimesheet = this.dataSource.filteredData;
  }

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
  GenerateTimesheet() {
    debugger;
    this.showSpinner = true;
    let generateTimesheetRequestModel: GenerateTimesheetRequestModel = {
      ProjId: this.projectId,
      TimesheetPeriod: this.selectedTimesheetPeriod
    }
    this.timesheetService.generateTimesheet(generateTimesheetRequestModel).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.return ?? "Timesheet generated successfully" });
          const modalElement = document.getElementById('generate_timesheet');
          if (modalElement) {
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
          }
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message });
      }
    )
  }
  onRowClicked(row: any) {
    localStorage.setItem('selectedTimesheet', JSON.stringify(row));
    this.router.navigate([this.routes.timesheetLines]);
  }

  onPeriodChange(event: any) {
    this.selectedTimesheetPeriod = event.value;
  }

  deleteTimesheet(row: any, event: MouseEvent) {
    debugger;
    event.stopPropagation();
    this.showSpinner = true;
    this.timesheetService.deleteTimesheet(row.timesheetId).subscribe(
      (response: any) => {
        this.showSpinner = false;
        if (response && response.isSuccess) {
          {
            this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.return ?? "Timesheet deleted successfully" });
          }
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occurred while deleting timesheet" });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "An error has occurred while deleting timesheet" });
      }
    )
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
