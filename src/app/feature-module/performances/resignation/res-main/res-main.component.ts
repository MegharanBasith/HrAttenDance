import { Component, OnInit  } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getResignation, routes } from 'src/app/core/core.index';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-res-main',
  templateUrl: './res-main.component.html',
  styleUrls: ['./res-main.component.scss']
})
export class ResMainComponent implements OnInit {
  public innerHeight!: string;
  public lstResignation: Array<getResignation> = [];
  public addResignForm!: FormGroup ;
  public editResignForm!: FormGroup ;
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getResignation>;
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


  constructor( private formBuilder: FormBuilder, private data: DataService) {
  
  }

  ngOnInit() {
    this.getTableData();

    this.addResignForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      ResignationDate: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });

    this.editResignForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      ResignationDate: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });
  }



  private getTableData(): void {
    this.lstResignation = [];
    this.serialNumberArray = [];

    this.data.getResignation().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getResignation, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstResignation.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getResignation>(this.lstResignation);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }

  public sortData(sort: Sort) {
    const data = this.lstResignation.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstResignation = data;
    } else {
      this.lstResignation = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstResignation = this.dataSource.filteredData;
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

}
export interface pageSelection {
  skip: number;
  limit: number;
}
