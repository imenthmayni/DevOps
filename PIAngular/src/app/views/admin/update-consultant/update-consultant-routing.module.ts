import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateConsultantComponent } from './update-consultant/update-consultant.component';

const routes: Routes = [
  {path:'',component: UpdateConsultantComponent},
  {path: ':id', component: UpdateConsultantComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateConsultantRoutingModule { }
