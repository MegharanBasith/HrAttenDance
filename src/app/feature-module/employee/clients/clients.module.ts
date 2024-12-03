import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientsContentPageComponent } from './clients-content-page/clients-content-page.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsProfileComponent } from './clients-profile/clients-profile.component';
import { ClientsModalComponent } from './clients-modal/clients-modal.component';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientsContentPageComponent,
    ClientsListComponent,
    ClientsProfileComponent,
    ClientsModalComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClientsModule { }
