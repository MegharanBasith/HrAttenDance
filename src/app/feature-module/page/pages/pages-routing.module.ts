import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { FaqComponent } from './faq/faq.component';
import { PagesComponent } from './pages.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SearchComponent } from './search/search.component';
import { TermsComponent } from './terms/terms.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      { path: "search", component: SearchComponent },
      { path: "faq", component: FaqComponent },
      { path: "terms", component: TermsComponent },
      { path: "privacy-policy", component: PrivacyPolicyComponent },
      { path: "blank-page", component: BlankPageComponent },
      { path: "coming-soon", component: ComingSoonComponent },
      { path: "under-maintenance", component: UnderMaintenanceComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
