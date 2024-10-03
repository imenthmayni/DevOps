import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceRoutingModule } from './resource-routing.module';
import { ResourceComponent } from './resource/resource.component';
import { AddresourceComponent } from './addresource/addresource.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateressourceComponent } from './updateressource/updateressource.component';


@NgModule({
  declarations: [
    ResourceComponent,
    AddresourceComponent,
    UpdateressourceComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    

    ResourceRoutingModule
  ]
})
export class ResourceModule { }
