import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    children: [
      {
        path: 'apex-charts',
        loadChildren: () =>
          import('./apexcharts/apexcharts.module').then(
            (m) => m.ApexchartsModule
          ),
      },
      {
        path: 'ng2-charts',
        loadChildren: () =>
          import('./ng2-charts/ng2-charts.module').then(
            (m) => m.Ng2ChartsModule
          ),
      },
      { 
        path: 'prime-ng', 
        loadChildren: () => 
        import('./prime-ng/prime-ng.module').
        then(
          (m) => m.PrimeNgModule) 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
