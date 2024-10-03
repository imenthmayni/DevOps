import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { DetailleprojectComponent } from './detailleproject/detailleproject.component';
import { AddProjectComponent } from '../add-project/add-project/add-project.component';
import { UpdateProjectComponent } from '../update-project/update-project/update-project.component';
import { AfficheprojectComponent } from './afficheproject/afficheproject.component';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';
import { ProjressourceComponent } from './projressource/projressource.component';

const routes: Routes = [
  { path: 'Project', component: ProjectComponent },
  { path: 'detail/:id', component: DetailleprojectComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'afficheProject', component: AfficheprojectComponent },
  { path: 'updateProject/:id', component: UpdateProjectComponent },
  { path: 'dashboard', component: ProjectdashboardComponent } ,
  { path: 'projressource/:id', component: ProjressourceComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
