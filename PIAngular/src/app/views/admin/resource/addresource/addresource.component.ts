import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Resources, ResourceType } from 'src/app/Model/resources';
import { ResourceService } from 'src/app/Services/resource.service';

@Component({
  selector: 'app-addresource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.css']
})
export class AddresourceComponent {
  resources: Resources[] = [];
  errorMessage: string | null = null; 

  newResource: Resources = {
    resourceId: 0,
    resourceName: '',
    resourcesDescription: '',
    resourceType: ResourceType.STATUS_1,
    resourcesCost: 0
  };
  formSubmitted = false;

  constructor(private resourceService: ResourceService) { }
  loadResources(): void {
    this.resourceService.getAllResources().subscribe(
      data => {
        this.resources = data;
        console.log('Resources received:', this.resources); // Vérifiez les données reçues dans la console
      },
      error => {
        console.error('Error loading resources:', error);
        this.errorMessage = error.message;
      }
    );
  }
  addResource() {
    this.resourceService.addResource(this.newResource).subscribe(
      () => {
        console.log('Resource added successfully!');
        // Rechargez la liste des ressources après l'ajout
        this.loadResources();
  
        // Réinitialisez le formulaire automatiquement
        this.resetForm();
      },
      error => {
        console.error('Error adding resource:', error);
        if (error.error && error.error.message) {
          alert('Error: ' + error.error.message);
        } else if (error.error && error.error.error) {
          alert('Error: ' + error.error.error);
        } else {
          alert('An error occurred while adding the resource.');
        }
      }
    );
  }
  
  

  resetForm() {
    this.newResource = {
      resourceId: 0,
      resourceName: '',
      resourcesDescription: '',
      resourceType: ResourceType.STATUS_1,
      resourcesCost: 0
    };
    this.formSubmitted = false;
  }
}