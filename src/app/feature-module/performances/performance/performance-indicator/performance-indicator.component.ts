import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getPerformanceReport, routes } from 'src/app/core/core.index';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-performance-indicator',
  templateUrl: './performance-indicator.component.html',
  styleUrls: ['./performance-indicator.component.scss']
})
export class PerformanceIndicatorComponent implements OnInit {
  public lstindicator: Array<getPerformanceReport> = [];
  public searchDataValue = '';
  public addIndicatorForm!: FormGroup ;
  public editIndicatorForm!: FormGroup ;
  dataSource!: MatTableDataSource<getPerformanceReport>;
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

  constructor(  private formBuilder: FormBuilder,private data: DataService) {}

  ngOnInit(): void {
    this.getTableData();

    this.addIndicatorForm = this.formBuilder.group({
      designationName: ["", [Validators.required]],
      experienceName: ["", [Validators.required]],
      marketingName: ["", [Validators.required]],
      AdministrationName: ["", [Validators.required]],
      presentationName: ["", [Validators.required]],

      QualityName: ["", [Validators.required]],
      effientcyName: ["", [Validators.required]],
      integrityName: ["", [Validators.required]],

      professionalismName: ["", [Validators.required]],
      teamWork: ["", [Validators.required]],
      criticalName: ["", [Validators.required]],

      ManagementName: ["", [Validators.required]],
      AttendanceName: ["", [Validators.required]],
      deadLineName: ["", [Validators.required]],
      statusName: ["", [Validators.required]],
    });

    this.editIndicatorForm = this.formBuilder.group({
      designationName: ["", [Validators.required]],
      experienceName: ["", [Validators.required]],
      marketingName: ["", [Validators.required]],
      AdministrationName: ["", [Validators.required]],
      presentationName: ["", [Validators.required]],

      QualityName: ["", [Validators.required]],
      effientcyName: ["", [Validators.required]],
      integrityName: ["", [Validators.required]],

      professionalismName: ["", [Validators.required]],
      teamWork: ["", [Validators.required]],
      criticalName: ["", [Validators.required]],

      ManagementName: ["", [Validators.required]],
      AttendanceName: ["", [Validators.required]],
      deadLineName: ["", [Validators.required]],
      statusName: ["", [Validators.required]],
    });
  }

  private getTableData(): void {
    this.lstindicator = [];
    this.serialNumberArray = [];

    this.data.getPerformanceReport().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getPerformanceReport, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstindicator.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getPerformanceReport>(this.lstindicator);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }

  public sortData(sort: Sort) {
    const data = this.lstindicator.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstindicator = data;
    } else {
      this.lstindicator = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstindicator = this.dataSource.filteredData;
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
