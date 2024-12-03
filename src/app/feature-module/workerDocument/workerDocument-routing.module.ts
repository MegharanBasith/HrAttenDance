import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerDocumentComponent } from './workerDocument.component';
import { WorkerDocListComponent } from './workerDoc-list/workerDoc-list.component';
import { WorkerDocCreateComponent } from './workerDoc-create/workerDoc-create.component';
import { WorkerDocEditComponent } from './workerDoc-edit/workerDoc-edit.component';
import { WorkerDocExpiredComponent } from './workerDoc-expired/workerDoc-expired.component';

const routes: Routes = [
  {
  path: '',
  component: WorkerDocumentComponent,
  children: [
    { path: "workerDoc-list", component:WorkerDocListComponent },
    { path: "workerDoc-expired", component:WorkerDocExpiredComponent },
    { path: 'workerDoc-create', component: WorkerDocCreateComponent },
    { path: 'workerDoc-edit', component: WorkerDocEditComponent },

  ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerDocumentRoutingModule { }
