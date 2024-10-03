import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddConsultantRoutingModule } from './add-consultant-routing.module';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';


@NgModule({
  declarations: [
    AddConsultantComponent
    
  ],
  imports: [
    CommonModule,
    AddConsultantRoutingModule ,
    ReactiveFormsModule ,
  ]
})
export class AddConsultantModule { }
