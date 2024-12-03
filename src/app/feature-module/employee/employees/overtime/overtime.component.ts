import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getOverTime, routes } from 'src/app/core/core.index';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.scss']
})
export class OvertimeComponent implements OnInit {
  public addOvertimeForm!: FormGroup ;
  public editOvertimeForm!: FormGroup ;
  public statusValue!: string;
  public lstOvertime: Array<getOverTime> = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getOverTime>;
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
  //** / pagination variables

  constructor(private data: DataService,  private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.getTableData();

    this.addOvertimeForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      OtDate: ["", [Validators.required]],
      OtHrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });

    this.editOvertimeForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      OtDate: ["", [Validators.required]],
      OtHrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });
  }

  private getTableData(): void {
    this.lstOvertime = [];
    this.serialNumberArray = [];

    this.data.getOverTime().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getOverTime, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstOvertime.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getOverTime>(this.lstOvertime);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }

  public sortData(sort: Sort) {
    const data = this.lstOvertime.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstOvertime = data;
    } else {
      this.lstOvertime = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstOvertime = this.dataSource.filteredData;
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

    //getting the status value
    getStatus(data:any) {
      this.statusValue = data;
    }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
