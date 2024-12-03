import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { DataService, routes } from 'src/app/core/core.index';
export interface datasModel {
  name: string;
}

@Component({
  selector: 'app-companies-grid',
  templateUrl: './companies-grid.component.html',
  styleUrl: './companies-grid.component.scss'
})
export class CompaniesGridComponent {
  public routes = routes;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data2: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

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
  activeTab = 'activities';
  activeStep = 0;
  public selectedFieldSet = [0];
  currentStep = 0;

  activateTab(tabName: string) {
    this.activeTab = tabName;
  }
  setActiveStep(step: number) {
    this.activeStep = step;
  }
  nextStep() {
    this.currentStep++;
  }
  public filter = false;
  public rating = false;
  
  openFilter() {
    this.filter = !this.filter;
  }
  openRating() {
    this.rating = !this.rating;
  }
  constructor(private data: DataService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  elem = document.documentElement;
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
