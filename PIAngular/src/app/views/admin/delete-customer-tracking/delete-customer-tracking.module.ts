import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteCustomerTrackingRoutingModule } from './delete-customer-tracking-routing.module';
import { DeleteCustomerTrackingComponent } from './delete-customer-tracking/delete-customer-tracking.component';


@NgModule({
  declarations: [
    DeleteCustomerTrackingComponent
  ],
  imports: [
    CommonModule,
    DeleteCustomerTrackingRoutingModule
  ]
})
export class DeleteCustomerTrackingModule { }
