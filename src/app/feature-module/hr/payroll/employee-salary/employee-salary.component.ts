import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getEmployeeSalary, routes } from 'src/app/core/core.index';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent implements OnInit {
  selected1 = 'option1';
  selected2 = 'option2';
  public addSalary!: FormGroup ;
  public editSalary!: FormGroup ;
  public allSalary: Array<getEmployeeSalary> = [];
  public searchDataValue = '';
  public statusValue!: string;
  dataSource!: MatTableDataSource<getEmployeeSalary>;
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

        // Add salary form Validation And Getting Values

        this.addSalary = this.formBuilder.group({
          selectStaff: [""],
          netSalary: [""],
          basic: ["", [Validators.required]],
          da: [""],
          hra: [""],
          conveyance: [""],
          allowance: [""],
          medicalAllowance: [""],
          othersAdd: [""],
          tds: [""],
          esi: [""],
          pf: [""],
          leave: [""],
          profTax: [""],
          labour: [""],
          othersDed: [""],
        });
    
        // Edit salary Form Validation And Getting Values
    
        this.editSalary = this.formBuilder.group({
          editSelectStaff: [""],
          editNetSalary: [""],
          editBasic: ["", [Validators.required]],
          editDa: [""],
          editHra: [""],
          editConveyance: [""],
          editAllowance: [""],
          editMedAllowance: [""],
          editAddOthers: [""],
          editTds: [""],
          editEsi: [""],
          editPf: [""],
          editleave: [""],
          editProfTax: [""],
          editLabour: [""],
          editDedOthers: [""],
        });
  }

  private getTableData(): void {
    this.allSalary = [];
    this.serialNumberArray = [];

    this.data.getEmployeeSalary().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getEmployeeSalary, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.allSalary.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getEmployeeSalary>(this.allSalary);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }

  public sortData(sort: Sort) {
    const data = this.allSalary.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.allSalary = data;
    } else {
      this.allSalary = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.allSalary = this.dataSource.filteredData;
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
 //getting the status value
 getStatus(data:any) {
  this.statusValue = data;
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



 

