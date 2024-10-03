import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CRMComponent } from './crm/crm.component';

const routes: Routes = [
  {path:'',component:CRMComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }
