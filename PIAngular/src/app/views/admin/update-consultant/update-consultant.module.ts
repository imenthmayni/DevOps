import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 // Importez FormsModule ici

import { UpdateConsultantRoutingModule } from './update-consultant-routing.module';
import { UpdateConsultantComponent } from './update-consultant/update-consultant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UpdateConsultantComponent
  ],
  imports: [
    CommonModule,
    UpdateConsultantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
  
})
export class UpdateConsultantModule { }
