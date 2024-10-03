import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartOptions } from 'chart.js';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-avgsalary',
  templateUrl: './avgsalary.component.html',
  styleUrls: ['./avgsalary.component.css']
})
export class AvgsalaryComponent implements OnInit {

  constructor(private recruitmentService: RecruitmentService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.recruitmentService.getRecruitmentsPerManager().subscribe(data => {
      const managers = Object.keys(data);
      const recruitments = Object.values(data);
      this.recruitmentService.getAverageSalaryRange().subscribe(data => {
        const averageSalary = data;
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
            backgroundColor: 'rgba(147, 197, 114, 0.5)', 
            borderColor: 'rgba(147, 197, 114, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom' 
            },
            y: {
              beginAtZero: true 
            }
          }
        } as ChartOptions
      });
    });
  })}

  goBack() {
    this.router.navigate(['/reccalend']);
  }
}
