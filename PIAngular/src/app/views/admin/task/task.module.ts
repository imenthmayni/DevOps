import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importez FormsModule

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task/task.component';
import { DetailletaskComponent } from './detailletask/detailletask.component';



@NgModule({
  declarations: [
    TaskComponent,
    DetailletaskComponent,
  

  ],
  imports: [
    CommonModule,
    FormsModule, // Ajoutez FormsModule ici
    TaskRoutingModule
  ]
})
export class TaskModule { }
