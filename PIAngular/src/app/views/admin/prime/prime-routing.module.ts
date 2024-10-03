import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeComponent } from './prime/prime.component';
import { AddPrimeComponent } from './add-prime/add-prime.component';
import { PayrollConfigComponent } from './payroll-config/payroll-config.component';

const routes: Routes = [
  {path:'',component:PrimeComponent},
  {path:'add-prime',component:AddPrimeComponent},
  {path:'edit-prime/:prime_id',component:AddPrimeComponent},
  {path:'edit-config/:id',component:PayrollConfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimeRoutingModule { }
