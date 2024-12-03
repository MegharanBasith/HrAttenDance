import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets.component';
import { AssetsCategoryComponent } from './assets-category/assets-category.component';
import { AssetsDetailsComponent } from './assets-details/assets-details.component';
import { AssetsMainComponent } from './assets-main/assets-main.component';
import { AssetsNewComponent } from './assets-new/assets-new.component';
import { AssetsReportsComponent } from './assets-reports/assets-reports.component';
import { UserAssetsDetailsComponent } from './user-assets-details/user-assets-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: AssetsComponent,
    children: [
      { path: "assets-category", component: AssetsCategoryComponent },
      { path: "assets-details", component: AssetsDetailsComponent },
      { path: "assets-main", component: AssetsMainComponent },
      { path: "assets-new", component: AssetsNewComponent },
      { path: "assets-reports", component: AssetsReportsComponent },
      { path: "user-assets-details", component: UserAssetsDetailsComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
