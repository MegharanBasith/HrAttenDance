import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from '../user/user-routing.module'
import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
  providers: [
    MessageService
  ]
})
export class UserModule { }
