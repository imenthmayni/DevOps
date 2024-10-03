import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { DetailleprojectComponent } from './detailleproject/detailleproject.component';
import { FormsModule } from '@angular/forms';
import { AddprojetComponent } from './addprojet/addprojet.component';
import { AfficheprojectComponent } from './afficheproject/afficheproject.component';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProjressourceComponent } from './projressource/projressource.component';




@NgModule({
  declarations: [
    ProjectComponent,
    DetailleprojectComponent,
    AddprojetComponent,
    AfficheprojectComponent,
    ProjectdashboardComponent,
    ProjressourceComponent,
   

  ],
  imports: [
    CommonModule,
    FullCalendarModule,

    RouterModule, 
    FormsModule,
    ProjectRoutingModule,
  ]
})
export class ProjectModule { }
