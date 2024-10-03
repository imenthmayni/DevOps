import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { Chart, DoughnutController } from 'chart.js';
import { Task, TaskStatus } from 'src/app/Model/task';
import * as Highcharts from 'highcharts';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-detailleproject',
  templateUrl: './detailleproject.component.html',
  styleUrls: ['./detailleproject.component.css']
})
export class DetailleprojectComponent implements OnInit{
  projectId: number = 0; 
  projectTeam: any[] = [];
  tasks!:  Task[];
  completedTasks: any[] = [];
  completionPercentage: number = 0;
  projectBudget: number | undefined; 
  taskStatusDistributionArray: { status: TaskStatus, count: number }[] = [];
  chartOptions: any;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.projectId = params['id'];
    this.loadProjectData(this.projectId);
    this.getTaskStatusDistribution();
    this.getProjectTasks(this.projectId);
    this.calculateProjectBudget(this.projectId);
  });
}
 
loadProjectData(projectId: number): void {
  this.getProjectTeam(projectId);
  this.getCompletedTasks(projectId);
  this.calculateCompletionPercentage(projectId);
  this.calculateProjectBudget(projectId);
}
calculateCompletionPercentage(projectId: number): void {
  this.projectService.calculateCompletionPercentage(projectId).subscribe(
    percentage => {
      this.completionPercentage = percentage;
      console.log('Completion percentage for project', projectId, ':', percentage);
      this.renderChart(percentage);
    },
    error => {
      console.error('Error calculating completion percentage for project', projectId, ':', error);
    }
  );
}
  getProjectTeam(projectId: number): void {
    this.projectService.getProjectTeam(projectId).subscribe(
      (data: any[]) => {
        this.projectTeam = data;
        console.log('Équipe du projet:', this.projectTeam);
      },
      error => {
        console.log('Erreur lors de la récupération de l\'équipe du projet:', error);
      }
    );
  }

  getCompletedTasks(projectId: number): void {
    this.projectService.getCompletedTasks(projectId).subscribe(
      data => {
        this.completedTasks = data;
        console.log('Completed tasks for project', projectId, ':', data); // Ajout du log pour afficher les données
      },
      error => {
        console.error('Error loading completed tasks for project', projectId, ':', error);
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

  getTaskStatusDistribution(): void {
    this.projectService.getTaskStatusDistribution(this.projectId).subscribe(
      (data: any) => {
        this.taskStatusDistributionArray = Object.entries(data).map(([status, count]) => ({ status: status as TaskStatus, count: count as number }));
        console.log('Distribution des statuts de tâches :', this.taskStatusDistributionArray);
      },
      error => {
        console.error('Erreur lors de la récupération de la distribution des statuts de tâches :', error);
      }
    );
  }
  
  
  taskStatusKeys(): TaskStatus[] {
    return Object.keys(this.taskStatusDistributionArray) as TaskStatus[];
  }

  getProjectTasks(projectId: number): void {
    this.projectService.getTasksByProject(projectId)
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  calculateProjectBudget(projectId: number): void {
    this.projectService.calculateProjectBudget(projectId).subscribe(
      budget => {
        this.projectBudget = budget;
        console.log('Project budget:', this.projectBudget);
      },
      error => {
        console.error('Error calculating project budget:', error);
      }
    );
  }
  generatePDF(): void {
    const doc = new jsPDF();
    const completedTaskColor = '#ff0000'; // Rouge
    let yPosition = 10; 
  
    const textColor = '#000000'; // Noir
    const headerColor = '#007bff'; // Bleu
    const backgroundColor = '#f4f4f4'; // Gris clair
    const borderColor = '#cccccc'; // Gris
  
    doc.setTextColor(textColor);
    doc.setFontSize(12);
  
    doc.setFillColor(headerColor);
    doc.rect(10, yPosition, 180, 10, 'F'); 
    doc.text('Project Details', 15, yPosition + 7); 
    yPosition += 20; 
  
    doc.setFillColor(backgroundColor);
    doc.rect(10, yPosition, 180, 60, 'F'); 
    doc.setTextColor(textColor);
    doc.text('Completion Percentage: ' + this.completionPercentage + '%', 15, yPosition + 10);
    doc.text('Project Budget: ' + (this.projectBudget || 'N/A'), 15, yPosition + 20);
    yPosition += 70; 

    if (this.projectTeam.length > 0) {
      doc.setTextColor(textColor);
      doc.text('Project Team:', 15, yPosition);
      yPosition += 10;
      this.projectTeam.forEach((member, index) => {
        doc.setTextColor(textColor);
        doc.text((index + 1) + '. ' + member.firstName + ' ' + member.lastName, 20, yPosition);
        doc.setTextColor('#666666'); 
        doc.text('Email: ' + member.email, 40, yPosition + 5);
        yPosition += 15;
      });
    } else {
      doc.setTextColor(textColor);
      doc.text('Aucune équipe de projet disponible.', 15, yPosition);
      yPosition += 10;
    }
  
  doc.text('Les tâches du projet:', 10, 40);
 
  this.tasks.forEach((task, index) => {
    const textColor = task.taskStatus === 'COMPLETED' ? completedTaskColor : '#000000'; // Noir par défaut
    doc.setTextColor(textColor);
    doc.text(task.task_id + '. ' + task.task_name, 20, yPosition);
    doc.text('Date de début: ' + task.task_startdate, 40, yPosition + 5);
    doc.text('Date de fin: ' + task.task_enddate, 40, yPosition + 10);
    doc.text('Description: ' + task.task_description, 40, yPosition + 15);
    doc.text('Statut: ' + task.taskStatus, 40, yPosition + 20);
    yPosition += 30;
  });
  
    doc.setTextColor(textColor);
    doc.text('Task Status Distribution:', 15, yPosition);
    yPosition += 10;
    if (this.taskStatusDistributionArray.length > 0) {
      this.taskStatusDistributionArray.forEach((status, index) => {
        doc.setTextColor('#28a745'); // Couleur verte pour les statuts
        doc.text(status.status + ': ' + status.count, 20, yPosition);
        yPosition += 10;
      });
    } else {
      doc.setTextColor(textColor);
      doc.text('Aucune distribution de statut de tâche disponible.', 15, yPosition);
      yPosition += 10;
    }
  
    doc.save('project_details.pdf');
  }
  

  
}
