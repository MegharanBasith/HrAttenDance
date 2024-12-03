import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetsCategoryComponent } from './assets-category/assets-category.component';
import { AssetsDetailsComponent } from './assets-details/assets-details.component';
import { AssetsNewComponent } from './assets-new/assets-new.component';
import { AssetsReportsComponent } from './assets-reports/assets-reports.component';
import { UserAssetsDetailsComponent } from './user-assets-details/user-assets-details.component';
import { AssetsMainComponent } from './assets-main/assets-main.component';


@NgModule({
  declarations: [
    AssetsComponent,
    AssetsCategoryComponent,
    AssetsDetailsComponent,
    AssetsNewComponent,
    AssetsReportsComponent,
    UserAssetsDetailsComponent,
    AssetsMainComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    SharedModule
  ]
})
export class AssetsModule { }
