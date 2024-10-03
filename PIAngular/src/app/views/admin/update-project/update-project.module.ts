import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProjectRoutingModule } from './update-project-routing.module';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UpdateProjectRoutingModule
  ]
})
export class UpdateProjectModule { }
