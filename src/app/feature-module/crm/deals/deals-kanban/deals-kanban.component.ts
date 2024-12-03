import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Renderer2, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { routes } from 'src/app/core/core.index';
import { CommonService } from 'src/app/shared/common/common.service';
interface data {
  value: string;
}
export interface datasModel {
  name: string;
}

@Component({
  selector: 'app-deals-kanban',
  templateUrl: './deals-kanban.component.html',
  styleUrl: './deals-kanban.component.scss'
})
export class DealsKanbanComponent {
  elem=document.documentElement
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  public routes = routes
  public filter = false;
  isFilterDropdownOpen: boolean = false;
  isDropdownShown = false;
  public selectedValue1 = '';
  toggleDropdown() {
    this.isDropdownShown = !this.isDropdownShown;
  }
  selectedList1: data[] = [{ value: 'Select' }, { value: 'Sales' }, { value: 'Marketing' },{ value: 'Calls' }];
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
 
  openFilter() {
    this.filter = !this.filter;
  }
  pipelines: { selectedPipeline: string }[] = [{ selectedPipeline: 'select' }];

  addPipeline(index: number) {
    this.pipelines.splice(index + 1, 0, { selectedPipeline: 'select' });
    
  }
  trackByFn(index: number, item: datasModel) {
    return item.name;
  }
  showAddNewLink: boolean = true;
  addOnBlur = true;
  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data2: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data3: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data4: datasModel[] = [{ name: 'James' }];
  data5: datasModel[] = [{ name: 'James' }];
  data6: datasModel[] = [{ name: 'Divine dran' }];

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

   
  constructor(private common: CommonService,private renderer: Renderer2) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

   
  }
  public content: Array<any> = []
  addContent(){
    this.content.push(1)
  }
}
