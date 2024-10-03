import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project, ProjectStatus } from 'src/app/Model/project';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-addprojet',
  templateUrl: './addprojet.component.html',
  styleUrls: ['./addprojet.component.css']
})
export class AddprojetComponent {
  newProject: Project = {
    projectId: 0,
    project_name: '',
    project_startdate: new Date(),
    projectEnddate: new Date(),
    project_description: '',
    project_manager: '',
    projectStatus: ProjectStatus.STATUS_1
  };
  formSubmitted = false;

  constructor(private projectService: ProjectService) { }

  addProject(projectForm: NgForm) {
    this.formSubmitted = true;

    if (projectForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    // Formater les dates au format 'yyyy-MM-dd' si elles sont de type string
    if (typeof this.newProject.project_startdate === 'string') {
      this.newProject.project_startdate = new Date(this.newProject.project_startdate);
    }
    if (typeof this.newProject.projectEnddate === 'string') {
      this.newProject.projectEnddate = new Date(this.newProject.projectEnddate);
    }

    this.projectService.addProject(this.newProject).subscribe(
      (response) => {
        console.log('Project added successfully:', response);
        this.resetForm(projectForm);
      },
      (error) => {
        console.error('Error adding project:', error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.newProject = {
      projectId: 0,
      project_name: '',
      project_startdate: new Date(),
      projectEnddate: new Date(),
      project_description: '',
      project_manager: '',
      projectStatus: ProjectStatus.STATUS_1
    };
    this.formSubmitted = false;
  }
}
