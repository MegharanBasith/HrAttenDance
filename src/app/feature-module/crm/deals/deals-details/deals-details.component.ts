import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
interface hoursData {
  data: string;
}
export interface datasModel {
  name: string;
}

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrl: './deals-details.component.scss'
})
export class DealsDetailsComponent {
  public signContent: Array<any> = []
  elem=document.documentElement
  public routes = routes;
  text: string | undefined;

  activeTab = 'activities'; 
  activeStep = 0;
  comment: any;
  activateTab(tabName: string) {
    this.activeTab = tabName;
  }
  setActiveStep(step: number) {
    this.activeStep = step;
  }
  fullscreen() {
    if(!document.fullscreenElement) {
      this.elem.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
  }
  public selectedFieldSet = [0];
  comments: boolean[] = [false, false, false];
  openComment(index: number) {
    this.comments[index] = !this.comments[index];
  }
  currentStep = 0;
  nextStep() {
    this.currentStep++;
  }
  
 
  public chargesArray: hoursData[] = [];
  addCharges() {
    const newData: hoursData = {
      data: '',
    };

    this.chargesArray.push(newData);
  }
  deleteCharges(index: number) {
    this.chargesArray.splice(index, 1);
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
  public details: Array<any> = []
  addSignContent(){
    this.signContent.push(1)
  }
}
