import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-statistique-portfolio',
  //standalone: true,
  //imports: [],
  templateUrl: './statistique-portfolio.component.html',
  styleUrls: ['./statistique-portfolio.component.css']
})
export class StatistiquePortfolioComponent implements OnInit {
  tasksChart: any;
  meetingsChart: any;
  portfolioId: number = 0;

  constructor(private portfolioService: PortfolioService, 
     private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.portfolioId = +params['id']; // Récupérer l'ID du consultant depuis l'URL
    //  this.isDeleted =true ;
    })
    this.portfolioService.getPortfolioEvolution(this.portfolioId).subscribe(data => {
      const months = Object.keys(data.tasks);
      const tasksData = Object.values(data.tasks);
      const meetingsData = Object.values(data.meetings);
      const barColors = this.generateRandomColors(months.length);

      this.tasksChart = new Chart('tasksChart', {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'Nombre de tâches',
            data: tasksData,
            fill: false,
            borderColor: barColors,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                stepSize: 1, // Pour afficher uniquement des valeurs entières
                precision: 0 // Pour désactiver la précision des nombres flottants
              }
            }
          }
        }
      });

      this.meetingsChart = new Chart('meetingsChart', {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
            label: 'Nombre de réunions',
            data: meetingsData,
           // backgroundColor: 'rgb(255, 99, 132)',
           backgroundColor: barColors,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, // Pour afficher uniquement des valeurs entières
                precision: 0 // Pour désactiver la précision des nombres flottants
              }            }
          }
        }
      });
    });
  }
    // Générer des couleurs aléatoires
    generateRandomColors(count: number): string[] {
      const colors: string[] = [];
      for (let i = 0; i < count; i++) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
      }
      return colors;
    }
}
