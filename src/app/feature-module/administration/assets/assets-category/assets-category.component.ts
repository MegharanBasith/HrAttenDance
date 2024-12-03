import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getAssetsCategory, routes } from 'src/app/core/core.index';

interface data {
  value: string;
}
@Component({
  selector: 'app-assets-category',
  templateUrl: './assets-category.component.html',
  styleUrls: ['./assets-category.component.scss']
})
export class AssetsCategoryComponent implements OnInit{
  public selectedValue1 = '' ;
  public selectedValue2 = '' ;
  public selectedValue3 = '' ;
  public selectedValue4 = '' ;
  public routes = routes;
  selectedList1: data[] = [
    {value: 'John Doe'},
    {value: 'Richard Miles'}
  ];
  selectedList2: data[] = [
    {value: 'Pending'},
    {value: 'Approved'},
    {value: 'Deployed'},
    {value: 'Damaged'}
  ];
  selectedList3: data[] = [
    {value: 'Department 1'},
    {value: 'Department 2'}
  ];
  selectedList4: data[] = [
    {value: 'Customer'},
    {value: 'Client'}
  ];

  public statusValue!: string;
  public assetsCategory: Array<getAssetsCategory> = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getAssetsCategory>;

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
  getStatus(data: string) {
    this.statusValue = data;
  }

  private getTableData(): void {
    this.assetsCategory = [];
    this.serialNumberArray = [];

    this.data.getAssetsCategory().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getAssetsCategory, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.assetsCategory.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getAssetsCategory>(this.assetsCategory);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }


  public sortData(sort: Sort) {
    const data = this.assetsCategory.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.assetsCategory = data;
    } else {
      this.assetsCategory = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.assetsCategory = this.dataSource.filteredData;
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
export interface pageSelection {
  skip: number;
  limit: number;
}
