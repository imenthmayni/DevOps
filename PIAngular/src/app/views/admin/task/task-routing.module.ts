import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { DetailletaskComponent } from './detailletask/detailletask.component';
import { UpdatetaskComponent } from '../updatetask/updatetask/updatetask.component';

const routes: Routes = [
  {
    path: '', component: TaskComponent
  },
  { path: 'detailletask/:id', component: DetailletaskComponent }
  ,
  { path: 'updatetask/:id', component: UpdatetaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
