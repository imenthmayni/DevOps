import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PrimeRoutingModule } from './prime-routing.module';
import { PrimeComponent } from './prime/prime.component';
import { AddPrimeComponent } from './add-prime/add-prime.component';
import { PayrollConfigComponent } from './payroll-config/payroll-config.component';


@NgModule({
  declarations: [
    PrimeComponent,
    AddPrimeComponent,
    PayrollConfigComponent
  ],
  imports: [
    CommonModule,
    PrimeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrimeModule { }
