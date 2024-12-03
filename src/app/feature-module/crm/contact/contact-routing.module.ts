import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

const routes: Routes = [{ path: '', component: ContactComponent ,children:[
  { path: 'contact-list', component: ContactListComponent },
  { path: 'contact-grid', component: ContactGridComponent },
  { path: 'contact-details', component: ContactDetailsComponent },

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
