import { Component } from '@angular/core';
import { DataService, routes } from 'src/app/core/core.index';
import { datasModel } from '../../deals/deals-details/deals-details.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
interface hoursData {
  data: string;
}
interface mailData {
  data: string;
}

@Component({
  selector: 'app-leads-kanban',
  templateUrl: './leads-kanban.component.html',
  styleUrl: './leads-kanban.component.scss'
})
export class LeadsKanbanComponent {
  public routes = routes;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  public filter = false;
  elem=document.documentElement
  isFilterDropdownOpen: boolean = false;
  openFilter() {
    this.filter = !this.filter;
  }
  toggleFilterDropdown() {
    this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
  }
  fullscreen() {
    if(!document.fullscreenElement) {
      this.elem.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
  }
  constructor(private data: DataService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data2: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data5: datasModel[] = [{ name: 'James' }];

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
  pipelines: { selectedPipeline: string }[] = [{ selectedPipeline: 'select' }];

  addPipeline(index: number) {
    this.pipelines.splice(index + 1, 0, { selectedPipeline: 'select' });
    
  }
  company: { selectedCompany: string }[] = [{ selectedCompany: 'select' }];
  public chargesArray: hoursData[] = [];
  public editchargesArray: hoursData[] = [];
  public emailArray: mailData[] = [];
  public editemailArray: mailData[] = [];
  addCompany(index: number) {
    this.company.splice(index + 1, 0, { selectedCompany: 'select' });
  }
  addCharges() {
    const newData: hoursData = {
      data: '',
    };

    this.chargesArray.push(newData);
  }
  removeCharges(index: number) {
    this.chargesArray.splice(index, 1);
  }
  addEmail() {
    const newData: mailData = {
      data: '',
    };

    this.emailArray.push(newData);
  }
  removeEmail(index: number) {
    this.emailArray.splice(index, 1);
  }
  editaddCharges() {
    const newData: hoursData = {
      data: '',
    };

    this.editchargesArray.push(newData);
  }
  removeeditCharges(index: number) {
    this.editchargesArray.splice(index, 1);
  }
  editEmail() {
    const newData: mailData = {
      data: '',
    };

    this.editemailArray.push(newData);
  }
  deleteEmail(index: number) {
    this.editemailArray.splice(index, 1);
  }

}
