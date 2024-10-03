import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-recruitmentcharts',
  templateUrl: './recruitmentcharts.component.html',
  styleUrls: ['./recruitmentcharts.component.css']
})
export class RecruitmentchartsComponent implements OnInit{

  
  constructor(private recruitmentService: RecruitmentService) { }

  ngOnInit(): void {

    //rec per manager chart
    this.recruitmentService.getRecruitmentsPerManager().subscribe(data => {
      const managers = Object.keys(data);
      const recruitments = Object.values(data);
      const ctx = document.getElementById('recruitmentsPerManagerChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: managers,
          datasets: [{
            label: 'Recruitments Per Manager',
            data: recruitments,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1 
              }
            }
          }
        } as ChartOptions
      });
    });
    this.recruitmentService.getOpenPositionsByLocation().subscribe(data => {
      const locations = Object.keys(data);
      const openPositions = Object.values(data);

      // open pos chart
      const ctx = document.getElementById('openPositionsByLocationChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: locations,
          datasets: [{
            label: 'Open Positions By Location',
            data: openPositions,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            r: {
              beginAtZero: true
            }
          }
        } as ChartOptions
      });
    });
    this.recruitmentService.getAverageSalaryRange().subscribe(data => {
      const averageSalary = data;
    
      const years = [ '2022', '2023', '2024', '2025', '2026', '2027']; // Adjust this array as needed
    
      // avg salary chart
      const ctx = document.getElementById('averageSalaryRangeChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bubble',
        data: {
          datasets: [{
            label: 'Average Salary Range',
            data: [{
              x: 0, 
              y: averageSalary, 
              r: 10 
            }],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)', 
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category', 
              position: 'bottom',
              labels: years 
            },
            y: {
              beginAtZero: true 
            }
          }
        } as ChartOptions
      });
    });
  }
  }
  

