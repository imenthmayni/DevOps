import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetrieveAllConsultantComponent } from './retrieve-all-consultant/retrieve-all-consultant.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'',component: RetrieveAllConsultantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),    FormsModule
  ],
  exports: [RouterModule]
})
export class RetrievAllConsultantRoutingModule { }
