import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiAvatarRoutingModule } from './ui-avatar-routing.module';
import { UiAvatarComponent } from './ui-avatar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UiAvatarComponent
  ],
  imports: [
    CommonModule,
    UiAvatarRoutingModule,
    SharedModule
  ]
})
export class UiAvatarModule { }
