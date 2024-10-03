import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import { ConsultantService } from 'src/app/services/consultant.service';
import { CustomerTrackingService } from 'src/app/services/customer-tracking.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-crm-dashboard',
  //standalone: true,
  //imports: [],
  templateUrl: './crm-dashboard.component.html',
  styleUrls: ['./crm-dashboard.component.css']
})
export class CrmDashboardComponent implements OnInit {
  totalConsultants: number = 0;
  hiredConsultantsCount: number =0;
  meetingsCount: number=0 ;
  totalUsers: number = 0;
  genderData: any[] = [];
  skillData: any[] = [];
   selectedOption: string = 'gender';   chart: any;
   defaultValue: string = "default"; // Définir la valeur par défaut ici
   consultantChartData: any;
   consultantChart: any
   consultants: any[] = [];
   displayedConsultants: any[] = [];
   showAll: boolean = false;
 
  constructor(
    private consultantService: ConsultantService ,
    private portfolioService: PortfolioService,
    private customerTrackingService: CustomerTrackingService ,
    
    ) { 
      Chart.register(...registerables);

    }

  ngOnInit(): void {
    this.loadConsultantChartData();
    this.selectedOption = 'gender';
    this.getAllConsultants();

    this.consultantService.getTotalConsultants().subscribe(
      total => {
        this.totalConsultants = total;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du total des consultants :', error);
      }
    );
    this.consultantService.getHiredConsultantsCountThisMonth().subscribe(
      count => {
        this.hiredConsultantsCount = count;
      },
      error => {
        console.log('Une erreur s\'est produite lors de la récupération du nombre de consultants embauchés ce mois-ci :', error);
      }
    );
    this.portfolioService.getMeetingsCountThisMonth().subscribe(
      count => {
        this.meetingsCount = count;
      },
      error => {
        console.log('Une erreur s\'est produite lors de la récupération du nombre de réunions ce mois-ci :', error);
      }
    );

    this.customerTrackingService.getTotalUsers().subscribe(
      total => {
        this.totalUsers = total;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du total des consultants :', error);
      }
    );
    /******* repartition des consultants */
    this.loadConsultantChartData();
  }

  loadConsultantChartData(): void {
    if (this.selectedOption === 'gender') {
      this.consultantService.getConsultantsByGender().subscribe(data => {
        this.genderData = Object.entries(data).map(([label, count]) => ({ label, count }));
        this.renderConsultantChart();
      });
    } else if (this.selectedOption === 'skill') {
      this.consultantService.getConsultantsBySkill().subscribe(data => {
        this.skillData = Object.entries(data).map(([label, count]) => ({ label, count }));
        this.renderConsultantChart();
      });
    }
  }

  renderConsultantChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  
    const chartData = this.selectedOption === 'gender' ? this.genderData : this.skillData;
  
    this.chart = new Chart('consultantCanvas', {
      type: 'doughnut',
      data: {
        labels: chartData.map(item => item.label),
        datasets: [{
          data: chartData.map(item => item.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
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
            text: ' Répartition des consultants '
          }
        }
      }
    });
  }
  

  onOptionChange(option: string): void {
    if (option === 'gender' || option === 'skill') {
      this.loadConsultantChartData();
    } 
  }
  /*********** affichage des skilled consultant  */
  
  getAllConsultants(): void {
    this.consultantService.getAllConsultants().subscribe(
      (data: any) => {
        this.consultants = data;
        this.updateDisplayedConsultants();
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des consultants :', error);
      }
    );
  }

  updateDisplayedConsultants(): void {
    this.displayedConsultants = this.showAll ? this.consultants : this.consultants.slice(0, 4);
  }

  showMore(): void {
    this.showAll = true;
    this.updateDisplayedConsultants();
  }

  showLess(): void {
    this.showAll = false;
    this.updateDisplayedConsultants();
  }


  generateStars(skillLevel: number): string[] {
    const stars = [];
    for (let i = 0; i < skillLevel; i++) {
      stars.push('fa-star');
    }
    return stars;
  }
  
}