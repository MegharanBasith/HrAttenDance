import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiAccordionRoutingModule } from './ui-accordion-routing.module';
import { UiAccordionComponent } from './ui-accordion.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UiAccordionComponent
  ],
  imports: [
    CommonModule,
    UiAccordionRoutingModule,
    SharedModule
  ]
})
export class UiAccordionModule { }
