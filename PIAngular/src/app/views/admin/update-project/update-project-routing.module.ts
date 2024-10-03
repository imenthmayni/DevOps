import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProjectComponent } from './update-project/update-project.component';

const routes: Routes = [
  { path: 'updateProject/:id', component: UpdateProjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateProjectRoutingModule { }
