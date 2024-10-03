import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [
  { path: 'update/:id', component: UpdatetaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatetaskRoutingModule { }
