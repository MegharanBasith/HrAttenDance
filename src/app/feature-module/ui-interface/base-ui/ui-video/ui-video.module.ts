import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiVideoRoutingModule } from './ui-video-routing.module';
import { UiVideoComponent } from './ui-video.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UiVideoComponent
  ],
  imports: [
    CommonModule,
    UiVideoRoutingModule,
    SharedModule
  ]
})
export class UiVideoModule { }
