import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { routes } from 'src/app/core/helpers/routes/routes';
export interface datasModel {
  name: string;
}
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent {
  public routes = routes;
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
  elem = document.documentElement;
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  comments: boolean[] = [false, false, false];
  openComment(index: number) {
    this.comments[index] = !this.comments[index];
  }
  public content: Array<any> = []
  public signContent: Array<any> = []
  public details: Array<any> = []

  addContent(){
    this.content.push(1)
  }
  addSignContent(){
    this.signContent.push(1)
  }
  removeSignContent(index: number){
    this.signContent.splice(index, 1)
  }

  addSignersDetails(){
    this.details.push(1)
  }
  removeSignersDetails(index: number){
    this.details.splice(index, 1)
  }
}
