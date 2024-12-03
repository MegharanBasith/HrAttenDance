import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error403RoutingModule } from './error403-routing.module';
import { Error403Component } from './error403.component';


@NgModule({
  declarations: [
    Error403Component
  ],
  imports: [
    CommonModule,
    Error403RoutingModule
  ]
})
export class Error403Module { }
