import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Chart } from 'chart.js';
import { ResourceType, Resources } from 'src/app/Model/resources';
import { ResourceService } from 'src/app/Services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit, AfterViewInit {
  stats: any;
  resources: Resources[] = [];
  selectedResource: Resources | null = null;
  errorMessage: string | null = null;
  dataLoaded: boolean = false;
  resourcesLoaded: boolean = false;
  statsLoaded: boolean = false;

  resourceId: number = 0; // Initialisez resourceId
  taskId: number = 0; // Initialisez taskId
  @ViewChild('costByProjectChart') costByProjectChart!: ElementRef;
  @ViewChild('resourcesByTypeChart') resourcesByTypeChart!: ElementRef;
  sortedResources: Resources[] = [];
  sortBy: keyof Resources = 'resourceId'; // Propriété de tri par défaut
  searchQuery: string = '';
  currentPage: number = 1; // Page actuelle
  resourcesPerPage: number = 6; //
  constructor(private resourceService: ResourceService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.resourceService.getAllResources().subscribe(
      resources => {
        this.resources = resources;
        this.resourcesLoaded = true; // Utilisation des propriétés de classe
        this.checkDataAndRender();
        this.sortResources(); // Tri initial lors du chargement des ressources

      },
      error => {
        console.error('Error loading resources:', error);
        this.errorMessage = error.message;
      }
    );

    this.resourceService.getResourceStats().subscribe(
      stats => {
        this.stats = stats;
        this.statsLoaded = true; // Utilisation des propriétés de classe
        this.checkDataAndRender();
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques : ', error);
        this.errorMessage = error.message;
      }
    );
  }
  sortResources(): void {
    // Vérifier si sortBy est défini
    if (this.sortBy) {
      // Copiez les ressources pour les trier
      this.sortedResources = [...this.resources].sort((a, b) => {
        if (a[this.sortBy] < b[this.sortBy]) {
          return -1;
        } else if (a[this.sortBy] > b[this.sortBy]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  onSortChange(event: any): void {
    const selectedValue = event.target.value as keyof Resources;
  
    // Mettre à jour la propriété sortBy avec la clé sélectionnée
    this.sortBy = selectedValue;
  
    // Trier les ressources en fonction de la clé sélectionnée
    this.sortResources();
  }


  get visibleResources(): Resources[] {
    const startIndex = (this.currentPage - 1) * this.resourcesPerPage;
    return this.sortedResources.slice(startIndex, startIndex + this.resourcesPerPage);
  }
  checkDataAndRender(): void {
    if (this.resourcesLoaded && this.statsLoaded) {
      this.dataLoaded = true;
      this.renderCharts();
    }
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.dataLoaded) {
        this.renderCharts();
      }
    }, 100); // Attend 100 millisecondes
  }
  
  renderCharts(): void {
    const costByProjectChart = this.costByProjectChart.nativeElement;
    const resourcesByTypeChart = this.resourcesByTypeChart.nativeElement;

    const costByProjectData = {
      labels: Object.keys(this.stats?.costByProject || []),
      datasets: [{
        label: 'Cost by Project',
        data: Object.values(this.stats?.costByProject || []),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const resourcesByTypeData = {
      labels: Object.keys(this.stats?.resourcesByType || []),
      datasets: [{
        label: 'Resources by Type',
        data: Object.values(this.stats?.resourcesByType || []),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    new Chart(costByProjectChart, {
      type: 'bar',
      data: costByProjectData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              text: 'Cost'
            }
          },
          x: {
            title: {
              text: 'Projects'
            }
          }
        }
      }
    });

    new Chart(resourcesByTypeChart, {
      type: 'bar',
      data: resourcesByTypeData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              text: 'Number of Resources'
            }
          },
          x: {
            title: {
              text: 'Resource Types'
            }
          }
        }
      }
    });
  }

  deleteResource(resourceId: number) {
    this.resourceService.deleteResource(resourceId).subscribe(
      () => {
        console.log('Resource deleted successfully!');
        this.loadData();
      },
      error => {
        console.error('Error deleting resource:', error);
      }
    );
  }


  onSubmit() {
    this.resourceService.assignResourceToTask(this.resourceId, this.taskId).subscribe(
      data => {
        // Mettre à jour la liste des ressources si nécessaire
        // par exemple, this.resources.push(data);
        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Erreur lors de l\'affectation de la ressource: ' + error.message;
      }
    );
  }


}
