import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll/payroll.component';
import { AddPayrollComponent } from './add-payroll/add-payroll.component';
import { FrontHeaderComponent } from '../front-header/front-header.component';
import { FrontFooterComponent } from '../front-footer/front-footer.component';
import { OrderPaymentModalComponent } from './order-payment-modal/order-payment-modal.component';


@NgModule({
  declarations: [
    PayrollComponent,
    AddPayrollComponent,
    FrontHeaderComponent,
    FrontFooterComponent,
    OrderPaymentModalComponent
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PayrollModule { }
