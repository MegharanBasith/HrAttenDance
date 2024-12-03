import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsRoutingModule } from './deals-routing.module';
import { DealsComponent } from './deals.component';
import { DealsDetailsComponent } from './deals-details/deals-details.component';
import { DealsKanbanComponent } from './deals-kanban/deals-kanban.component';
import { DealsListComponent } from './deals-list/deals-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorModule } from 'primeng/editor';


@NgModule({
  declarations: [
    DealsComponent,
    DealsDetailsComponent,
    DealsKanbanComponent,
    DealsListComponent,
  ],
  imports: [
    CommonModule,
    DealsRoutingModule,
    SharedModule,
    EditorModule
  ]
})
export class DealsModule { }
