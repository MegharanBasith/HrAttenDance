import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getTickets, routes } from 'src/app/core/core.index';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
  selected1 = 'option1';
  selected2 = 'option2';
  public statusValue!: string;
  public allTickets: Array<getTickets> = [];
  public addTicketForm!: FormGroup ;
  public editTicketForm!: FormGroup ;
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getTickets>;
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
      // Add Ticket Form Validation And Getting Values
      this.addTicketForm = this.formBuilder.group({
        ticketSubject: ["", [Validators.required]],
        ticketId: ["", [Validators.required]],
        assignStaff: ["", [Validators.required]],
        clientName: ["", [Validators.required]],
        PriorityName: ["", [Validators.required]],
        ccName: ["", [Validators.required]],
        AssignName: ["", [Validators.required]],
        addFlowers: ["", [Validators.required]],
      });
  
      // Edit Ticket Form Validation And Getting Values
  
      this.editTicketForm = this.formBuilder.group({
        editTicketSubject: ["", [Validators.required]],
        editTicketId: ["", [Validators.required]],
        editAssignStaff: ["", [Validators.required]],
        editClientName: ["", [Validators.required]],
        editPriorityName: ["", [Validators.required]],
        editccName: ["", [Validators.required]],
        editAssignName: ["", [Validators.required]],
        editaddFlowers: ["", [Validators.required]],
      });
  
  }

  private getTableData(): void {
    this.allTickets = [];
    this.serialNumberArray = [];

    this.data.getTickets().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getTickets, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.allTickets.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getTickets>(this.allTickets);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }

  public sortData(sort: Sort) {
    const data = this.allTickets.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.allTickets = data;
    } else {
      this.allTickets = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.allTickets = this.dataSource.filteredData;
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
  getStatus(data: string) {
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





  
