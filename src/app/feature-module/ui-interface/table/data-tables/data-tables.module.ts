import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesRoutingModule } from './data-tables-routing.module';


import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesComponent } from './data-tables.component';


@NgModule({
  declarations: [DataTablesComponent],
  imports: [CommonModule, DataTablesRoutingModule, SharedModule],
})
export class DataTableSModule {}
