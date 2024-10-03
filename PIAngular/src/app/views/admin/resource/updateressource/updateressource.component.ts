import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceType, Resources } from 'src/app/Model/resources';
import { ResourceService } from 'src/app/Services/resource.service';

@Component({
  selector: 'app-updateressource',
  templateUrl: './updateressource.component.html',
  styleUrls: ['./updateressource.component.css']
})
export class UpdateressourceComponent {
  updateSuccess: boolean = false;

  updatedResource: Resources = {
    resourceId: 0,  // ou une valeur par défaut appropriée
    resourceName: '', // ou une valeur par défaut appropriée
    resourcesDescription: '', // ou une valeur par défaut appropriée
    resourceType: ResourceType.STATUS_1, // Assurez-vous que c'est une valeur valide
    resourcesCost: 0.0  // ou une valeur par défaut appropriée
  };

  formSubmitted = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const resourceId = params['id'];
      this.resourceService.getResource(resourceId).subscribe(
        (resource: Resources) => {
          this.updatedResource = resource;
        },
        (error) => {
          console.error('Error retrieving resource details:', error);
        }
      );
    });
  }

  updateResource(resourceForm: NgForm) {
    this.formSubmitted = true;
    if (resourceForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.resourceService.updateResource(this.updatedResource).subscribe(
      (response) => {
        console.log('Resource updated successfully:', response);
        this.successMessage = 'Ressource mise à jour avec succès.';
        this.errorMessage = '';
        this.resetForm(resourceForm);
        setTimeout(() => {
          this.router.navigate(['/admin/resources']);
        }, 3000);
      },
      (error) => {
        console.error('Error updating resource:', error);
        this.errorMessage = 'Une erreur s\'est produite lors de la mise à jour de la ressource.';
        this.successMessage = '';
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.updatedResource = {
      resourceId: 0,  // ou une valeur par défaut appropriée
      resourceName: '', // ou une valeur par défaut appropriée
      resourcesDescription: '', // ou une valeur par défaut appropriée
      resourceType: ResourceType.STATUS_1, // Assurez-vous que c'est une valeur valide
      resourcesCost: 0.0  // ou une valeur par défaut appropriée
    };
    this.formSubmitted = false;
  }
}
