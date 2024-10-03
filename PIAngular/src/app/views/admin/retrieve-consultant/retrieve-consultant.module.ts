import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetrieveConsultantRoutingModule } from './retrieve-consultant-routing.module';
import { RetrieveConsultantComponent } from './retrieve-consultant/retrieve-consultant.component';


@NgModule({
  declarations: [
    RetrieveConsultantComponent
  ],
  imports: [
    CommonModule,
    RetrieveConsultantRoutingModule
  ]
})
export class RetrieveConsultantModule { }
