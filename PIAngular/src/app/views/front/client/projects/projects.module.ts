import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectlistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
