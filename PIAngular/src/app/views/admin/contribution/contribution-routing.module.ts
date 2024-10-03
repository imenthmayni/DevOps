import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributionComponent } from './contribution/contribution.component';
import { AddContributionComponent } from './add-contribution/add-contribution.component';

const routes: Routes = [
  {path:'',component:ContributionComponent},
  {path:'add-contribution',component:AddContributionComponent},
  {path:'edit-contribution/:contribution_id',component:AddContributionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributionRoutingModule { }
