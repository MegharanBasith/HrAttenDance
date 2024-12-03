import { Component, Renderer2 } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { routes } from 'src/app/core/core.index';
import { CommonService } from 'src/app/shared/common/common.service';
import { datasModel } from '../../company/companies-grid/companies-grid.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-contact-grid',
  templateUrl: './contact-grid.component.html',
  styleUrl: './contact-grid.component.scss'
})
export class ContactGridComponent {
  selected1 = '1';
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  elem=document.documentElement
  public routes = routes
  public filter = false;
  isFilterDropdownOpen: boolean = false;
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
  toggleFilterDropdown() {
    this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
  }
  constructor(private common: CommonService,private renderer: Renderer2) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

   
  }
  public selectedFieldSet = [0];
  currentStep = 0;
  nextStep() {
    this.currentStep++;
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data2: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];

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
