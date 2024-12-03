import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getProvidentFund, routes } from 'src/app/core/core.index';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-provident-fund',
  templateUrl: './provident-fund.component.html',
  styleUrls: ['./provident-fund.component.scss']
})
export class ProvidentFundComponent implements OnInit {
  public allProvidentfund: Array<getProvidentFund> = [];
  public addProvidentfund!: FormGroup ;
  public editProvidentForm!: FormGroup ;
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getProvidentFund>;
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

  constructor(private data: DataService, private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.getTableData();

      // Add Provident Form Validation And Getting Values

      this.addProvidentfund = this.formBuilder.group({
        employeeName: ["", [Validators.required]],
        providentType: ["", [Validators.required]],
        employeeShare: ["", [Validators.required]],
        organisationShare: ["", [Validators.required]],
      });
  
      // Edit Provident Form Validation And Getting Values
  
      this.editProvidentForm = this.formBuilder.group({
        employeeName: ["", [Validators.required]],
        providentType: ["", [Validators.required]],
        employeeShare: ["", [Validators.required]],
        organisationShare: ["", [Validators.required]],
      });
  }

  private getTableData(): void {
    this.allProvidentfund = [];
    this.serialNumberArray = [];

    this.data.getProvidentFund().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getProvidentFund, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.allProvidentfund.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getProvidentFund>(this.allProvidentfund);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }

  public sortData(sort: Sort) {
    const data = this.allProvidentfund.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.allProvidentfund = data;
    } else {
      this.allProvidentfund = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.allProvidentfund = this.dataSource.filteredData;
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