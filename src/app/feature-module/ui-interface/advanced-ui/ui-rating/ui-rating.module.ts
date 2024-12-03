import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRatingRoutingModule } from './ui-rating-routing.module';
import { UiRatingComponent } from './ui-rating.component';



@NgModule({
  declarations: [
    UiRatingComponent
  ],
  imports: [
    CommonModule,
    UiRatingRoutingModule,
   
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiRatingModule { }
