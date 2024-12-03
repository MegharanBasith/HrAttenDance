import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, allLeaveType, routes } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
// import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss'],
})
export class LeaveTypeComponent implements OnInit {
  public routes = routes;
  public addLeaveType!: FormGroup;
  public editLeaveType!: FormGroup;

  public allLeaveType: Array<allLeaveType> = [];
  public searchDataValue = '';
  // dataSource!: MatTableDataSource<allLeaveType>;

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

  constructor(
    public router: Router,
    private data: DataService,
    private formBuilder: FormBuilder
  ) {
    this.allLeaveType = this.data.allLeaveType;
  }
  ngOnInit(): void {
    this.getTableData();
    // Add Provident Form Validation And Getting Values

    this.addLeaveType = this.formBuilder.group({
      addLeaveType: ['', [Validators.required]],
      addLeaveDays: ['', [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editLeaveType = this.formBuilder.group({
      editLeave: ['', [Validators.required]],
      editLeaveDays: ['', [Validators.required]],
    });
  }
  private getTableData(): void {
    this.allLeaveType = [];
    this.serialNumberArray = [];

    this.data.allLeaveType.map((res: allLeaveType, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        res.id = serialNumber;
        this.allLeaveType.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.totalData = this.data.allLeaveType.length;
    this.calculateTotalPages(this.totalData, this.pageSize);
  }
  public sortData(sort: Sort) {
    const data = this.allLeaveType.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.allLeaveType = data;
    } else {
      this.allLeaveType = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  // public searchData(value: string): void {
  //   this.dataSource.filter = value.trim().toLowerCase();
  //   this.allLeaveType = this.dataSource.filteredData;
  // }

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
}
export interface pageSelection {
  skip: number;
  limit: number;
}
