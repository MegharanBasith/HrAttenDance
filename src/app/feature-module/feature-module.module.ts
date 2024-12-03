import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/sharedIndex';
import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FeatureModuleComponent } from './feature-module.component';
import { SideMenuOneComponent } from './common/side_menus/side-menu-one/side-menu-one.component';
import { SideMenuTwoComponent } from './common/side_menus/side-menu-two/side-menu-two.component';
import { HeaderOneComponent } from './common/headers/header-one/header-one.component';
import { SideMenuThreeComponent } from './common/side_menus/side-menu-three/side-menu-three.component';
import { SettingsMenuComponent } from './common/settings-menu/settings-menu.component';
import { HeaderTwoComponent } from './common/headers/header-two/header-two.component';
import { HeaderThreeComponent } from './common/headers/header-three/header-three.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './common/layout/layout.component';

@NgModule({
  declarations: [
    FeatureModuleComponent,
    SideMenuOneComponent,
    SideMenuTwoComponent,
    HeaderOneComponent,
    SideMenuThreeComponent,
    SettingsMenuComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    FeatureModuleRoutingModule,
    SharedModule,
    RouterModule,
  ],
  
})
export class FeatureModuleModule {}
