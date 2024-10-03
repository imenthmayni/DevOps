import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrmDashboardComponent } from './crm-dashboard/crm-dashboard.component';

const routes: Routes = [
  { path: '', component: CrmDashboardComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmDashboardRoutingModule { }
