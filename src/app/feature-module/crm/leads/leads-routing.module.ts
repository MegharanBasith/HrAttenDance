import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './leads.component';
import { LeadsDetailsComponent } from './leads-details/leads-details.component';
import { LeadsKanbanComponent } from './leads-kanban/leads-kanban.component';
import { LeadsListComponent } from './leads-list/leads-list.component';

const routes: Routes = [{ path: '', component: LeadsComponent, children : [
  { path: 'leads-details', component: LeadsDetailsComponent },
  { path: 'leads-kanban', component: LeadsKanbanComponent },
  { path: 'leads-list', component: LeadsListComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
