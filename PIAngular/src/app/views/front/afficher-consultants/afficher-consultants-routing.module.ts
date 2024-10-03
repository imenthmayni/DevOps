import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfficherConsultantsComponent } from './afficher-consultants/afficher-consultants.component';

const routes: Routes = [    
  {
    path:'', component:AfficherConsultantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfficherConsultantsRoutingModule { }
