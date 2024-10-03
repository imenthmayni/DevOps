import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatetaskRoutingModule } from './updatetask-routing.module';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdatetaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UpdatetaskRoutingModule
  ]
})
export class UpdatetaskModule { }
