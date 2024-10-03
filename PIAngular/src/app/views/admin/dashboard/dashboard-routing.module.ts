import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PayrollChartComponent } from './payroll-chart/payroll-chart.component';

const routes: Routes = [
  {
    path:'',component: DashboardComponent
  },
  {
    path:'payroll-expences',component: PayrollChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
