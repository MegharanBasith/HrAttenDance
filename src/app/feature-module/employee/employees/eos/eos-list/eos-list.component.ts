import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { apiResultFormat, DataService, getEOS, routes } from 'src/app/core/core.index';
import { EosService } from 'src/app/core/services/eos/eos.service';
import { DeleteModalComponent } from 'src/app/feature-module/common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-eos-list',
  templateUrl: './eos-list.component.html',
  styleUrl: './eos-list.component.scss'
})
export class EosListComponent {
  cols = [
    'transId',
    'empNum',
    'eosDate',
    'empStatusStr',
    'eosTypeId',
    'calculateStatus',
    'payGroupPeriodStartDate',
    'payGroupPeriodEndDate',
  ];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public lstEos: Array<getEOS> = [];
  public searchDataValue = '';
  //dataSource!: MatTableDataSource<getTimeSheet>;
  public routes = routes;
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  EOSRecordCount: number = 0;

  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public EOSList: Array<any> = [];
  showSpinner: boolean = false;
  selectedTimesheetPeriod !: string;
  from!: Date;
  to!: Date;
  selectedTransId!: string;
  selectedrow: any;
  vacationDays: number = 0;
  @ViewChild('deleteDialog') deleteDialog!: DeleteModalComponent;
  selectedRow !: any;
  projectId!: string;
  calculateStatus: number = 0;
  approvedWorkflowState = "Approved";
  //** / pagination variables

  constructor(private data: DataService, private messageService: MessageService, private eosService: EosService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    //this.getTableData();
    let unparsedProjectId = localStorage.getItem('projectId');
    if (unparsedProjectId)
      this.projectId = unparsedProjectId;

    this.getEOSList(1, 10);
    this.displayedColumns = [...this.cols, 'actions'];
  }



  getEOSList(startIndex: number, pageSize: number) {
    this.showSpinner = true;

    debugger;
    this.eosService.getEOSList(this.projectId, startIndex, pageSize).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          console.log(response.data.eosList);
          this.dataSource.data = response.data.eosList;
          this.dataSource.sort = this.sort;
          debugger;
          this.EOSRecordCount = response.data.totalRecordsCount;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
      }
    )
  }

  setPage(event: any) {
    this.getEOSList((event.pageIndex * event.pageSize) + 1, event.pageSize)
  }

  private getTableData(): void {
    this.EOSList = [];
    this.serialNumberArray = [];

    this.data.getEos().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getEOS, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstEos.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getEOS>(this.lstEos);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });


  }

    public sortData(sort: Sort) {
      const data = this.lstEos.slice();

      /* eslint-disable @typescript-eslint/no-explicit-any */
      if (!sort.active || sort.direction === '') {
        this.lstEos = data;
      } else {
        this.lstEos = data.sort((a: any, b: any) => {
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

  editEOS(row: any) {
    localStorage.setItem('selectedEOS', JSON.stringify(row));
    this.router.navigate([this.routes.eosedit]);
  }

  confirmDelete(row: any) {
    this.selectedRow = row;
    this.deleteDialog.show();
  }

  // confirmDelete(row: any) {
  //   debugger;
  //   this.confirmationService.confirm({
  //     message: 'Please confirm to proceed.',
  //     header: 'Confirm Delete',
  //     icon: 'pi pi-question',
  //     accept: () => {
  //       this.deleteEOS(row);
  //     },
  //     reject: () => {
  //       // Optional: Handle the reject action if needed
  //     }
  //   });
  // }

  deleteEOS(row: any) {
    this.showSpinner = true;
    this.eosService.deleteEos(row.transId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "EOS Deleted successfully" });
          this.dataSource.data = this.dataSource.data.filter((item: any) => item !== row);
          // this.isDeleteSuccessful = true;
          // setTimeout(() => this.isDeleteSuccessful = false, 0);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while Deleting the EOS" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while Deleting the EOS" });
      }
    )
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

  calculateEOS(row : any) {
    this.showSpinner = true;

    debugger;
    this.eosService.calculate(row.transId).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.data ?? "EOS calculated successfully" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while calculating the EOS request" });
      }
    )
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}