import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CandidateService } from 'src/app/core/Services/candidate.service';

@Component({
  selector: 'app-candrec',
  templateUrl: './candrec.component.html',
  styleUrls: ['./candrec.component.css']
})
export class CandrecComponent  {

//   offerIds: number[] = [];
//   candidateCounts: { offerId: number, count: number }[] = [];
//  chart: any
//   constructor(private candidateService: CandidateService) { }

//   ngOnInit(): void {
//     this.fetchCandidateCounts();
//   }

//   fetchCandidateCounts(): void {
//     this.candidateService.getCandidateCounts().subscribe(
//       (data: any[]) => {
//         this.candidateCounts = data;
//         this.createChart();
//       }
//     );
//   }

//   createChart(): void {
//     const ctx = document.getElementById('candidateChart') as HTMLCanvasElement;
//     const offerIds = this.candidateCounts.map((count) => count.offerId);
//     const candidateCounts = this.candidateCounts.map((count) => count.count);

//     this.chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: offerIds,
//         datasets: [{
//           label: 'Number of Candidates',
//           data: candidateCounts,
//           backgroundColor: 'rgba(54, 162, 235, 0.5)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: true
//             }
//           }]
//         }
//       }
//     });
//   }

}
