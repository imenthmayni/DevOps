import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddConsultantComponent } from './add-consultant/add-consultant.component';
//import { NgxMaskModule } from 'ngx-mask';


const routes: Routes = [
   {path:'',component:AddConsultantComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]
})
export class AddConsultantRoutingModule { }
