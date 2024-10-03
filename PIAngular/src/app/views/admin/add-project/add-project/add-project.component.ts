import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project, ProjectStatus } from 'src/app/Model/project';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
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
