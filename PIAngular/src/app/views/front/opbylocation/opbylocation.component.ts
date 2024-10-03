import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartOptions } from 'chart.js';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-opbylocation',
  templateUrl: './opbylocation.component.html',
  styleUrls: ['./opbylocation.component.css']
})
export class OpbylocationComponent implements OnInit {

  constructor(private recruitmentService: RecruitmentService, private router: Router) { }

  ngOnInit(): void {
  this.recruitmentService.getOpenPositionsByLocation().subscribe(data => {
    const locations = Object.keys(data);
    const openPositions = Object.values(data);

    // Create a chart
    const ctx = document.getElementById('openPositionsByLocationChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: locations,
        datasets: [{
          label: 'Open Positions By Location',
          data: openPositions,
          backgroundColor: [
            'rgba(255, 204, 204, 0.5)',
              'rgba(204, 229, 255, 0.5)', 
              'rgba(255, 235, 204, 0.5)', 
              'rgba(204, 255, 229, 0.5)', 
              'rgba(229, 204, 255, 0.5)', 
              'rgba(230, 230, 230, 0.5)'  
           
          ],
          borderColor: [
            'rgba(255, 204, 204, 1)',
              'rgba(204, 229, 255, 1)',
              'rgba(255, 235, 204, 1)',
              'rgba(204, 255, 229, 1)',
              'rgba(229, 204, 255, 1)',
              'rgba(230, 230, 230, 1)'
          
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
}
goBack() {
  this.router.navigate(['/reccalend']);
}
}
