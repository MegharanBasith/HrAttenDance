import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketPageComponent } from './ticket-page/ticket-page.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { TicketsComponent } from './tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: TicketsComponent,
    children: [
      { path: "ticket-page", component: TicketPageComponent },
      { path: "ticket-view", component: TicketViewComponent },
      { path: "ticket-details", component: TicketDetailsComponent },
    ] 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
