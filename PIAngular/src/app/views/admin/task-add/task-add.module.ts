import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskAddRoutingModule } from './task-add-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    TaskAddRoutingModule
  ]
})
export class TaskAddModule { }
