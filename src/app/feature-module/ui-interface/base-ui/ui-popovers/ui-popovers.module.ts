import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiPopoversRoutingModule } from './ui-popovers-routing.module';
import { UiPopoversComponent } from './ui-popovers.component';



@NgModule({
  declarations: [
    UiPopoversComponent
  ],
  imports: [
    CommonModule,
    UiPopoversRoutingModule,
    
  ]
})
export class UiPopoversModule { }
