import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resources } from 'src/app/Model/resources';
import { ResourceService } from 'src/app/Services/resource.service';

@Component({
  selector: 'app-projressource',
  templateUrl: './projressource.component.html',
  styleUrls: ['./projressource.component.css']
})
export class ProjressourceComponent implements OnInit {
  resources: Resources[] = [];
  projectId!: number;
  filteredResources: Resources[] = []; // Liste filtrée des ressources
  searchQuery: string = ''; // Terme de recherche pour le filtrage
  currentPage: number = 1; // Page actuelle
  resourcesPerPage: number = 6; // Nombre de ressources par page
  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = +params['id']; // Convertir l'ID du projet en nombre
      if (!isNaN(projectId)) {
        this.loadResources(projectId);
      } else {
        console.error('Invalid project ID:', params['id']);
      }
    });
  }
  
  loadResources(projectId: number) {
    this.resourceService.getResourcesForProject(projectId)
      .subscribe(resources => {
        this.resources = resources;
        this.filteredResources = [...resources]; // Initialisez les ressources filtrées avec toutes les ressources chargées
        const totalCost = this.calculateTotalCost(resources);
        console.log('Resources:', resources);
        console.log('Total Cost:', totalCost);
      });
  }


  calculateTotalCost(resources: Resources[]): number {
    let totalCost = 0;
    resources.forEach(resource => {
      totalCost += resource.resourcesCost;
    });
    return totalCost;
  }
  searchResources(): void {
    this.filteredResources = this.resources.filter(resource =>
      resource.resourceName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredResources.length / this.resourcesPerPage);
  }

  get visibleResources(): Resources[] {
    const startIndex = (this.currentPage - 1) * this.resourcesPerPage;
    return this.filteredResources.slice(startIndex, startIndex + this.resourcesPerPage);
  }
}
