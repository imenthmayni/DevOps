import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { AddresourceComponent } from './addresource/addresource.component';
import { UpdateressourceComponent } from './updateressource/updateressource.component';

const routes: Routes = [
  { path: '', component: ResourceComponent },
  { path: 'addresource', component: AddresourceComponent },
  { path: 'updateresource/:id', component: UpdateressourceComponent }, 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
