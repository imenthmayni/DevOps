import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollComponent } from './payroll/payroll.component';
import { AddPayrollComponent } from './add-payroll/add-payroll.component';
import { PayrollViewerComponent } from './payroll-viewer/payroll-viewer.component';

const routes: Routes = [ 
  {path:'',component:PayrollComponent},
  {path:'add-payroll',component:AddPayrollComponent},
  {path:'edit-payroll/:payroll_id',component:AddPayrollComponent},
  {path:'view-pdf/:payroll_id',component:PayrollViewerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
