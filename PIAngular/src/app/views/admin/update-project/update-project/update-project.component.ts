import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectStatus } from 'src/app/Model/project';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {
  updateSuccess: boolean = false;

  updatedProject: Project = {
    projectId: 0,
    project_name: '',
    project_startdate: new Date(),
    projectEnddate: new Date(),
    project_description: '',
    project_manager: '',
    projectStatus: ProjectStatus.STATUS_1
  };
  formSubmitted = false;
  successMessage: string = ''; // Message de succès
  errorMessage: string = ''; // Message d'erreur


  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du projet à partir des paramètres de l'URL
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      // Utiliser l'ID du projet pour récupérer les détails du projet depuis le service ou une source de données
      // Ici, nous supposons que vous avez une méthode dans le service pour récupérer les détails du projet par ID
      // Vous devrez adapter cela en fonction de votre implémentation réelle
      this.projectService.getProject(projectId).subscribe(
        (project: Project) => {
          this.updatedProject = project;
        },
        (error) => {
          console.error('Error retrieving project details:', error);
        }
      );
    });
  }

  updateProject(projectForm: NgForm) {
    this.formSubmitted = true;
    if (projectForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.projectService.updateProject(this.updatedProject).subscribe(
      (response) => {
        console.log('Project updated successfully:', response);
        this.successMessage = 'Projet mis à jour avec succès.';
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.resetForm(projectForm);
        setTimeout(() => {
          this.router.navigate(['/admin/projects']);
        }, 10000);
      },
      (error) => {
        console.error('Error updating project:', error);
        this.errorMessage = 'Une erreur s\'est produite lors de la mise à jour du projet.';
        this.successMessage = ''; // Réinitialiser le message de succès
      }
    );
  }


  resetForm(form: NgForm) {
    form.resetForm();
    this.updatedProject = {
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
