import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectfrontRoutingModule } from './projectfront-routing.module';
import { ProjectfrontComponent } from './projectfront/projectfront.component';


@NgModule({
  declarations: [
    ProjectfrontComponent
  ],
  imports: [
    CommonModule,
    ProjectfrontRoutingModule
  ]
})
export class ProjectfrontModule { }
