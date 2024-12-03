import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorModule } from 'primeng/editor';



@NgModule({
  declarations: [
    ContactComponent,
    ContactListComponent,
    ContactGridComponent,
    ContactDetailsComponent

  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    EditorModule
    
    
  ]
})
export class ContactModule { }
