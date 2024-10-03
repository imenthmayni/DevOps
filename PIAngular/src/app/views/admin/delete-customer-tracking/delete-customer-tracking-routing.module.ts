import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteCustomerTrackingComponent } from './delete-customer-tracking/delete-customer-tracking.component';

const routes: Routes = [
  { path: '', component: DeleteCustomerTrackingComponent },
  { path: ':id', component: DeleteCustomerTrackingComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteCustomerTrackingRoutingModule { }
