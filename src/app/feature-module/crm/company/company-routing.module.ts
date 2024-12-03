import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompaniesGridComponent } from './companies-grid/companies-grid.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompaniesComponent } from './companies/companies.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      { path: 'company-details', component: CompanyDetailsComponent },
      { path: 'companies-grid', component: CompaniesGridComponent },
      { path: 'companies', component: CompaniesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
