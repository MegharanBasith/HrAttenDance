import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRangesliderRoutingModule } from './ui-rangeslider-routing.module';
import { UiRangesliderComponent } from './ui-rangeslider.component';

import {MatSliderModule} from '@angular/material/slider';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    UiRangesliderComponent
  ],
  imports: [
    CommonModule,
    UiRangesliderRoutingModule,
    SharedModule,
    MatSliderModule
  ]
})
export class UiRangesliderModule { }
