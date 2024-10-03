import { Component } from '@angular/core';
import { Project } from 'src/app/Model/project';
import { ProjectService } from 'src/app/Services/project.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent {
  projects: Project[] = [];
  sortedProjects: Project[] = [];
  sortBy: keyof Project = 'projectId'; // Déclaration de la propriété sortBy
  searchQuery: string = '';
  currentPage: number = 1; // Page actuelle
  projectsPerPage: number = 6; // Nombre de projets par page



  constructor(private projectService: ProjectService) { }
  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe(
      data => {
        this.projects = data;
        this.sortProjects(); // Tri initial lors du chargement des projets
      },
      error => console.error('Error loading projects:', error)
    );
  }
  sortProjects(): void {
    // Vérifier si sortBy est défini
    if (this.sortBy) {
      // Copiez les projets pour les trier
      this.sortedProjects = [...this.projects].sort((a, b) => {
        if (a[this.sortBy!] < b[this.sortBy!]) { // Utilisation de l'opérateur ! pour indiquer à TypeScript que sortBy ne sera jamais undefined
          return -1;
        } else if (a[this.sortBy!] > b[this.sortBy!]) { // Utilisation de l'opérateur ! pour indiquer à TypeScript que sortBy ne sera jamais undefined
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
  
  
  onSortChange(): void {
    this.sortProjects(); // Re-trier les projets en fonction du critère sélectionné
  }
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  get totalPages(): number {
    return Math.ceil(this.sortedProjects.length / this.projectsPerPage);
  }

  get visibleProjects(): Project[] {
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    return this.sortedProjects.slice(startIndex, startIndex + this.projectsPerPage);
  }
  downloadProjectsPDF(): void {
    const doc = new jsPDF();
    let yPosition: number = 10;
  
    this.projects.forEach((project, index) => {
      if (typeof project.project_name === 'string') {
        doc.text(`Project Name: ${project.project_name}`, 10, yPosition);
        yPosition += 10;
      }
    });
  
    doc.save('projects.pdf');
  }
  downloadProjectPDF(project: Project): void {
    const doc = new jsPDF();

    // Définir la taille de la police et la police par défaut
    doc.setFontSize(12);
    doc.setFont('helvetica');

    // Ajouter du texte avec différentes tailles de police pour simuler le style
    doc.setFontSize(14); // Taille de police plus grande pour le texte en gras
    doc.text('Project Details', 10, 10);

    doc.setFontSize(12); // Retour à la taille de police normale
    doc.text(`Project Name: ${project.project_name}`, 10, 20);
    doc.text(`Start Date: ${project.project_startdate}`, 10, 30);
    doc.text(`End Date: ${project.projectEnddate}`, 10, 40);

    doc.setFontSize(11); // Taille de police légèrement plus petite pour le texte en italique
    doc.text(`Description: ${project.project_description}`, 10, 50);
    doc.text(`Manager: ${project.project_manager}`, 10, 60);
    
    doc.setFontSize(12); // Retour à la taille de police normale
    doc.text(`Status: ${project.projectStatus}`, 10, 70);

    // Ajouter une bordure autour du texte
    doc.rect(5, 5, 200, 80, 'S');

    // Enregistrer le PDF
    doc.save('project_details.pdf');
}

}
