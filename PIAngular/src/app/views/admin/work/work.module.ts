import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkRoutingModule } from './work-routing.module';
import { WorkComponent } from './work/work.component';
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WorkComponent,
  
  ],
  imports: [
    CommonModule,
    WorkRoutingModule,ReactiveFormsModule
  ]
})
export class WorkModule { }
