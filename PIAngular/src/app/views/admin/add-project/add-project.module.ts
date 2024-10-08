import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProjectRoutingModule } from './add-project-routing.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddProjectRoutingModule
  ]
})
export class AddProjectModule { }
