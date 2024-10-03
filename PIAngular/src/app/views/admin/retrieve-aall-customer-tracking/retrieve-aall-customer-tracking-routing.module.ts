import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTrackingComponent } from './customer-tracking/customer-tracking.component';

const routes: Routes = [ 
   {
      path:'',component: CustomerTrackingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetrieveAAllCustomerTrackingRoutingModule { }
