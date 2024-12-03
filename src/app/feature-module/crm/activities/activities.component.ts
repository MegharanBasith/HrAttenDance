import { Component} from '@angular/core';
import { DataService, activities, apiResultFormat, routes } from 'src/app/core/core.index';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from '../../employee/employees/departments/departments.component';
import { Sort } from '@angular/material/sort';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { datasModel } from '../analytics/analytics.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent {
  public routes = routes;
  public filter = false;
  openFilter() {
    this.filter = !this.filter;
  }
  elem = document.documentElement;
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  myTime: Date = new Date();
  pipelines: { selectedPipeline: string }[] = [{ selectedPipeline: 'select' }];
  contact: { selectedContact: string }[] = [{ selectedContact: 'select' }];
  grid: { selectedGrid: string }[] = [{ selectedGrid: 'select' }];
  deals: { selecteddeal: string }[] = [{ selecteddeal: 'select' }];
  company: { selectedcompany: string }[] = [{ selectedcompany: 'select' }];
  list: { selectedlist: string }[] = [{ selectedlist: 'select' }];
  addPipeline(index: number) {
    this.pipelines.splice(index + 1, 0, { selectedPipeline: 'select' });
    
  }
  addGrid(index: number) {
    this.grid.splice(index + 1, 0, { selectedGrid: 'select' });
    
  }
  adddeals(index: number) {
    this.deals.splice(index + 1, 0, { selecteddeal: 'select' });
    
  }
  addcompany(index: number) {
    this.company.splice(index + 1, 0, {  selectedcompany: 'select' });
    
  }
  addContact(index: number) {
    this.contact.splice(index + 1, 0, { selectedContact: 'select' });
    
  }
  addList(index: number) {
    this.list.splice(index + 1, 0, { selectedlist: 'select' });
    
  }
  showTimePicker: Array<string> = []
  toggleTimePcker(value: string): void {

    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value
    } else {
      this.showTimePicker = []
    }
  }
 
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date)
    return this.datePipe.transform(selectedDate, 'h:mm a')
  }
  // pagination variables
  public activities: Array<activities> = [];
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
  dataSource!: MatTableDataSource<activities>;
  public totalPages = 0;
  public searchDataValue = '';
  //** / pagination variables
  constructor(private data: DataService,private datePipe: DatePipe) {
    
  }
  ngOnInit(): void {
    this.getTableData();
  }
  private getTableData(): void {
    this.activities = [];
    this.serialNumberArray = [];

    this.data.getActivities().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: activities, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.activities.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<activities>(this.activities);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.activities.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.activities = data;
    } else {
      this.activities = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.activities = this.dataSource.filteredData;
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
  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data2: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data3: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data4: datasModel[] = [{ name: 'James' }];
  data5: datasModel[] = [{ name: 'James' }];
  data6: datasModel[] = [{ name: 'Divine dran' }];
  text: string | undefined;

  trackByFn(index: number, item: datasModel) {
    return item.name;
  }

  add(event: MatChipInputEvent, val: datasModel[]): void {
    const value = (event.value || '').trim();
    if (value) {
      val.push({ name: value });
    }
    event.chipInput?.clear();
  }

  remove(values: datasModel[], val: number): void {
    if (val >= 0) {
      values.splice(val, 1);
    }
  }

  edit(val: datasModel[], index: number, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(val, index);
      return;
    }
    if (index >= 0) {
      val[index].name = value;
    }
  }
 
 
}
