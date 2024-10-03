import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponentComponent } from './delete-component/delete-component.component';

const routes: Routes = [
  { path: '', component: DeleteComponentComponent },
  { path: ':id', component: DeleteComponentComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteConsultantRoutingModule { }
