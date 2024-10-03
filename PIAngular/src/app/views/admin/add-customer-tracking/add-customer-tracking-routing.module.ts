import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerTrackingComponent } from './add-customer-tracking/add-customer-tracking.component';

const routes: Routes = [
  {
    path: '',component:AddCustomerTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCustomerTrackingRoutingModule { }
