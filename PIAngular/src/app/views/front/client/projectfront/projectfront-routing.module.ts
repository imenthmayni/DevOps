import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectfrontComponent } from './projectfront/projectfront.component';

const routes: Routes = [
  {
    path:'', component:ProjectfrontComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectfrontRoutingModule { }
