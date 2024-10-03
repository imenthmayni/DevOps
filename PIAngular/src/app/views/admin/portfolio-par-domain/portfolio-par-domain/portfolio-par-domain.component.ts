import { Component } from '@angular/core';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-par-domain',
  templateUrl: './portfolio-par-domain.component.html',
  styleUrls: ['./portfolio-par-domain.component.css']
})
export class PortfolioParDomainComponent {
  portfoliosCountByDomain: any;
  chart: any;

  constructor(private portfolioService: PortfolioService) {     Chart.register(...registerables );
  }

  ngOnInit(): void {
    this.loadPortfoliosCountByDomain();
  }

  loadPortfoliosCountByDomain(): void {
    this.portfolioService.getPortfoliosCountByDomain().subscribe(
      data => {
        this.portfoliosCountByDomain = data;
        this.renderChart();
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      }
    );
  }

  renderChart(): void {
    const labels = Object.keys(this.portfoliosCountByDomain);
    const values = Object.values(this.portfoliosCountByDomain);
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(0, 255, 0, 0.5)',  
            'rgba(255, 0, 255, 0.5)'
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 255, 0, 1)',   
            'rgba(255, 0, 255, 1)'  
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Portfolios par domaine '
          }
        }
      }
    });
  }
}  