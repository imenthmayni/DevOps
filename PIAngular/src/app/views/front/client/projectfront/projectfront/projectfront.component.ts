import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Chart, DoughnutController } from 'chart.js';
//import { Chart } from 'chart.js/auto';



@Component({
  selector: 'app-projectfront',
  templateUrl: './projectfront.component.html',
  styleUrls: ['./projectfront.component.css']
})
export class ProjectfrontComponent {
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement> | undefined;
  completedFutureProjectsPercentage!: number;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getCompletedFutureProjectsPercentage().subscribe(
      percentage => {
        this.completedFutureProjectsPercentage = percentage;
        this.renderDoughnutChart();
      },
      error => {
        console.log('Une erreur s\'est produite lors de la récupération du pourcentage de projets terminés dans le futur :', error);
      }
    );
  }

  renderDoughnutChart(): void {
    if (this.chartCanvas) {
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          //type: 'doughnut',

          type: 'bar', // Modifier ici pour changer le type de graphique
          data: {
            labels: ['Projets terminés avant le temps estimé', ' Autres Projets '],
            datasets: [{
              data: [this.completedFutureProjectsPercentage, 100 - this.completedFutureProjectsPercentage],
              backgroundColor: ['#36A2EB', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }
  }


}
