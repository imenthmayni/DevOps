import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Project } from 'src/app/Model/project';
import { TaskService } from 'src/app/Services/task.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-projectdashboard',
  templateUrl: './projectdashboard.component.html',
  styleUrls: ['./projectdashboard.component.css']
})
export class ProjectdashboardComponent implements OnInit {
  projects: Project[] = [];  // Utilisation du modèle Project
  tasks: any[] = [];
  completedFutureProjects: Project[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    editable: false,
    dateClick: this.handleDateClick.bind(this)
  };

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.loadProjectsAndTasks();
  }

  loadProjectsAndTasks(): void {
    this.projectService.getAll().subscribe(
      projects => {
        this.projects = projects;
        this.initializeCalendarEvents();
      },
      error => {
        console.log('Error fetching projects:', error);
      }
    );

    this.taskService.getAll().subscribe(
      tasks => {
        this.tasks = tasks;
        this.initializeCalendarEvents();
      },
      error => {
        console.log('Error fetching tasks:', error);
      }
    );
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
  initializeCalendarEvents(): void {
    const projectEvents = this.projects.flatMap(project => {
      // Vérifie si l'ID du projet est dans completedFutureProjects
      const isCompletedFutureProject = this.completedFutureProjects.some(
        completedProject => completedProject.projectId === project.projectId
      );
  
      const startEvent = {
        title: project.project_name,
        start: project.project_startdate ? new Date(project.project_startdate) : undefined,
        color: 'blue', // Couleur bleue pour le jour de début du projet
        extendedProps: { type: 'project', id: project.projectId }
      };
  
      const endEvent = {
        title: project.project_name,
        start: project.projectEnddate ? new Date(project.projectEnddate) : undefined,
        color: 'blue', // Couleur bleue pour le jour de fin du projet
        extendedProps: { type: 'project', id: project.projectId }
      };
  
      return [startEvent, endEvent];
    });
  
    const taskEvents = this.tasks.map(task => ({
      title: task.task_name,
      start: task.task_startdate ? new Date(task.task_startdate) : undefined,
      end: task.task_enddate ? new Date(task.task_enddate) : undefined,
      color: 'green',
      extendedProps: { type: 'task', id: task.task_id }
    }));
  
    this.calendarOptions.events = [...projectEvents, ...taskEvents];
  }
  

  handleEventClick(event: any): void {
    const eventData = event.event.extendedProps;
    if (eventData.type === 'project') {
      // Handle project click
      console.log('Project clicked:', eventData.id);
    } else if (eventData.type === 'task') {
      // Handle task click
      console.log('Task clicked:', eventData.id);
    }
  }

  handleDateClick(arg: any) {
    console.log('Date clicked:', arg.dateStr);
  }
}
