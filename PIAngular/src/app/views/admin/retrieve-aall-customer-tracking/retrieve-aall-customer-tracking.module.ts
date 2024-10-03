import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetrieveAAllCustomerTrackingRoutingModule } from './retrieve-aall-customer-tracking-routing.module';
import { CustomerTrackingComponent } from './customer-tracking/customer-tracking.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerTrackingComponent
  ],
  imports: [
    CommonModule,
    RetrieveAAllCustomerTrackingRoutingModule ,
    FormsModule , 
    NgModule
  ]
})
export class RetrieveAAllCustomerTrackingModule { }
