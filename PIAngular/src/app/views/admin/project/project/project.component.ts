import { Component, OnInit } from '@angular/core';
import { createGoogleEvent } from '@assets/googleEvent';
import { Chart } from 'chart.js';
import { Project } from 'src/app/Model/project';
import { Task } from 'src/app/Model/task';
import { User } from 'src/app/Model/user';
import { ProjectService } from 'src/app/Services/project.service';

import * as googleEvent from '@assets/googleEvent';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { ProfileService } from 'src/app/authentication/service/profile.service';

import { ResourceService } from 'src/app/Services/resource.service';
import { Resources } from 'src/app/Model/resources';






declare var gapi: any;


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectTeam: User[] = [];
  user: any;
  projects: Project[] = [];
  resources: Resources[] = [];
  delayedProjects$!: Observable<Project[]>; // Ajoutez le signe d'exclamation pour indiquer à TypeScript que cette propriété sera initialisée dans le constructeur.
  projectId: number = 1;
  completedFutureProjects: Project[] = [];
  completedTasks: Task[] = [];
  completionPercentage: number = 0;
  filteredProjects: Project[] = []; // Liste filtrée des projets
  searchQuery: string = ''; // Terme de recherche
  projectsForCurrentUser: Project[] = [];
  

  noResources: boolean = false; // Initialisé à false par défaut

  constructor(private projectService: ProjectService, private resourceService: ResourceService,private profileService: ProfileService) { }


  ngOnInit(): void {
    this.loadProjects();
    this.loadResources();
    this.loadProjectsForCurrentUser();

    this.loadDelayedProjects();
    this.loadCompletedFutureProjects();
    this.calculateCompletionPercentage(this.projectId);
    this.profileService.getUserProfile().subscribe(data => {
      this.user = data;
      console.log("This is the response", data);
    });
    const eventDetails = {
      startTime: '2024-03-15T09:00:00',
      endTime: '2024-03-15T10:00:00',
      email: 'example@gmail.com'
    };
    createGoogleEvent(eventDetails);

    this.loadGoogleCalendarAPI();
    this.displayCalendar();

  }
  isProjectDelayed(endDate: string): boolean {
    const currentDate = new Date();
    const projectEndDate = new Date(endDate); // Convertir la date de fin en objet Date
    return projectEndDate < currentDate; // Comparaison de dates
  }


  formatDate(date: Date | undefined): string {
    if (date) {
      return date.toISOString();
    } else {
      return ''; // Ou une autre valeur par défaut si nécessaire
    }
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe(
      data => {
        this.projects = data;
        this.filterProjects();
      },
      error => console.error('Error loading projects:', error)
    );
  }
  loadResources() {
    const projectId = 12; // Remplacez 12 par l'ID de votre projet
    this.resourceService.getResourcesForProject(projectId)
      .subscribe(resources => {
        this.resources = resources;
        console.log('Resources:', resources); // Ajouter cette ligne pour afficher les ressources dans la console
      });
  }
  loadDelayedProjects(): void {
    this.projectService.getDelayedProjects().subscribe(
      delayedProjects => {
        this.delayedProjects$ = of(delayedProjects); // Utilisez delayedProjects$ au lieu de delayedProjects
      },
      error => {
        console.error('Erreur lors du chargement des projets en retard:', error);
      }
    );
  }

  loadGoogleCalendarAPI(): void {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyDZW5rWLTPfF3ZthYEaAVYSwyUElHtt1MA',
        clientId: '721999348064-thmhrlvorqlv6up7937k0u1kqcesab0m.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.readonly'
      }).then(() => {
        console.log('Google Calendar API initialized');
        // Appelez une méthode pour afficher le calendrier après l'initialisation de l'API
        this.displayCalendar();
      }, (error: any) => {
        console.error('Error initializing Google Calendar API:', error);
      });
    });
  }
  displayCalendar(): void {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        events: (fetchInfo, successCallback, failureCallback) => {
          // Récupérez les événements du calendrier Google et passez-les à successCallback
          gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: fetchInfo.startStr,
            timeMax: fetchInfo.endStr,
            showDeleted: false,
            singleEvents: true,
            orderBy: 'startTime'
          }).then((response: any) => {
            const events = response.result.items.map((event: any) => {
              return {
                title: event.summary,
                start: event.start.dateTime || event.start.date
              };
            });
            successCallback(events);
          }).catch((error: any) => {
            console.error('Error fetching events:', error);
            failureCallback(error);
          });
        }
      });
      calendar.render();
    } else {
      console.error('Element with ID "calendar" not found.');
    }
  }

  loadCompletedFutureProjects() {
    this.projectService.getCompletedFutureProjects().subscribe(
      (projects: Project[]) => {
        this.completedFutureProjects = projects;
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets futurs complétés :', error);
      }
    );
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe(
      () => {
        console.log('Project deleted successfully!');
        // Rechargez la liste des projets après la suppression
        this.loadProjects();
      },
      error => {
        console.error('Error deleting project:', error);
      }
    );
  }

  getProjectTeam(projectId: number) {
    this.projectService.getProjectTeam(projectId).subscribe(
      (data: any[]) => {
        this.projectTeam = data; // Affectez les données récupérées à la variable projectTeam
        console.log('Équipe du projet:', this.projectTeam); // Affichez les données récupérées dans la console (à des fins de débogage)
      },
      error => {
        console.log('Erreur lors de la récupération de l\'équipe du projet:', error); // Affichez les erreurs éventuelles dans la console
      }
    );
  }
  getCompletedTasks(projectId: number): void {
    this.projectService.getCompletedTasks(projectId).subscribe(
      data => {
        this.completedTasks = data; // Assigner les tâches terminées à completedTasks
        console.log('Completed tasks for project', projectId, ':', data);
      },
      error => {
        console.error('Error loading completed tasks for project', projectId, ':', error);
      }
    );
  }
  calculateCompletionPercentage(projectId: number): void {
    this.projectService.calculateCompletionPercentage(projectId).subscribe(
      percentage => {
        this.completionPercentage = percentage;
        console.log('Completion percentage for project', projectId, ':', percentage);
        this.renderChart(percentage); // Appel à la méthode pour afficher le graphique
      },
      error => {
        console.error('Error calculating completion percentage for project', projectId, ':', error);
      }
    );
  }

  renderChart(percentage: number): void {
    const ctx = document.getElementById('completionChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
          label: 'Completion Percentage',
          data: [percentage, 100 - percentage],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  searchProjects(): void {
    this.filterProjects();
  }
  filterProjects(): void {
    this.filteredProjects = this.projects.filter(project =>
      project.project_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  subMenuStatus: { [key: string]: boolean } = {
    projects: false,
    CRM: false,
    Payroll: false,
    Leave_Management: false,
  };

  toggleSubMenu(menu: string) {
    for (const key in this.subMenuStatus) {
      if (Object.prototype.hasOwnProperty.call(this.subMenuStatus, key)) {
        this.subMenuStatus[key] = key === menu ? !this.subMenuStatus[key] : false;
      }
    }
  }

  loadProjectsForCurrentUser(): void {
    this.projectService.getProjectsForCurrentUser().subscribe(
      projects => {
        this.projectsForCurrentUser = projects;
        console.log('Projets pour l\'utilisateur courant récupérés :', projects);
      },
      error => {
        console.error('Erreur lors de la récupération des projets pour l\'utilisateur courant :', error);
      }
    );}
}
