import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCustomerTrackingRoutingModule } from './add-customer-tracking-routing.module';
import { AddCustomerTrackingComponent } from './add-customer-tracking/add-customer-tracking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCustomerTrackingComponent
  ],
  imports: [
    CommonModule,
    AddCustomerTrackingRoutingModule ,
    ReactiveFormsModule ,
    FormsModule

  ]
})
export class AddCustomerTrackingModule { }
