import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getAssets, routes } from 'src/app/core/core.index';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-assets-main',
  templateUrl: './assets-main.component.html',
  styleUrls: ['./assets-main.component.scss']
})
export class AssetsMainComponent implements OnInit{
  selected1 = '1';
  public statusValue!: string;
  public addAssets!: FormGroup ;
  public editAssets!: FormGroup ;
  public allAssets: Array<getAssets> = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getAssets>;
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


  constructor(private formBuilder: FormBuilder,  private data: DataService) {

  }

  ngOnInit() {
    this.getTableData();  

    // Add Assets Form Validation And Getting Values

    this.addAssets = this.formBuilder.group({
      assetName: ["", [Validators.required]],
      assetId: ["", [Validators.required]],
      purchaseDate: ["", [Validators.required]],
      purchaseTo: ["", [Validators.required]],
      warranty: ["", [Validators.required]],
      value: ["", [Validators.required]],
      assetUser: ["", [Validators.required]],
      assetStatus: ["", [Validators.required]],
    });

    // Edit Assets Form Validation And Getting Values

    this.editAssets = this.formBuilder.group({
      editAssetsName: ["", [Validators.required]],
      editPurchaseDate: ["", [Validators.required]],
      editPurchaseTo: ["", [Validators.required]],
      editWarranty: ["", [Validators.required]],
      editvalue: ["", [Validators.required]],
      editAssetUser: ["", [Validators.required]],
      editAssetId: ["", [Validators.required]],
      editAssetStatus: ["", [Validators.required]],
    });
  }


  //getting the status value
  getStatus(data: string) {
    this.statusValue = data;
  }

  private getTableData(): void {
    this.allAssets = [];
    this.serialNumberArray = [];

    this.data.getAssets().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getAssets, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.allAssets.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getAssets>(this.allAssets);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }


  public sortData(sort: Sort) {
    const data = this.allAssets.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.allAssets = data;
    } else {
      this.allAssets = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.allAssets = this.dataSource.filteredData;
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

