import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsComponent } from './leads.component';
import { LeadsDetailsComponent } from './leads-details/leads-details.component';
import { LeadsKanbanComponent } from './leads-kanban/leads-kanban.component';
import { LeadsListComponent } from './leads-list/leads-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorModule } from 'primeng/editor';


@NgModule({
  declarations: [
    LeadsComponent,
    LeadsDetailsComponent,
    LeadsKanbanComponent,
    LeadsListComponent
  ],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    SharedModule,
    EditorModule
  ]
})
export class LeadsModule { }
