import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { getAssetsNew, DataService, apiResultFormat, routes } from 'src/app/core/core.index';
import { pageSelection } from '../assets-category/assets-category.component';

@Component({
  selector: 'app-assets-reports',
  templateUrl: './assets-reports.component.html',
  styleUrls: ['./assets-reports.component.scss']
})
export class AssetsReportsComponent implements OnInit {
  public assetsReports: Array<getAssetsNew> = [];
  dataSource!: MatTableDataSource<getAssetsNew>;
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
   constructor(private data: DataService) {
   }

   //getting the status value
  private getTableData(): void {
    this.assetsReports = [];
    this.serialNumberArray = [];

    this.data.getAssetsNew().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getAssetsNew, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.assetsReports.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getAssetsNew>(this.assetsReports);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }


  public sortData(sort: Sort) {
    const data = this.assetsReports.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.assetsReports = data;
    } else {
      this.assetsReports = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
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
  ngOnInit() {
    this.getTableData();  
  }
}
