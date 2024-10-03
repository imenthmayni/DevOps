import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesaffecterUserComponent } from './desaffecter-user/desaffecter-user.component';

const routes: Routes = [
  { path: '', component: DesaffecterUserComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesaffceterUserRoutingModule { }
