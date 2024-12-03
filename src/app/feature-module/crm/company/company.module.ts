import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompaniesGridComponent } from './companies-grid/companies-grid.component';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [
    CompanyComponent,
    CompaniesComponent,
    CompanyDetailsComponent,
    CompaniesGridComponent,
  ],
  imports: [CommonModule, CompanyRoutingModule, SharedModule, EditorModule],
})
export class CompanyModule {}
