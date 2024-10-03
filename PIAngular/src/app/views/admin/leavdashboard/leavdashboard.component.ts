import { Component, OnInit } from '@angular/core';
import { LeavService } from 'src/app/core/Services/leav.service';

@Component({
  selector: 'app-leavdashboard',
  templateUrl: './leavdashboard.component.html',
  styleUrls: ['./leavdashboard.component.css']
})
export class LeavdashboardComponent implements OnInit {
  leaveStatistics: any;

  constructor(private leavService: LeavService) {}

  ngOnInit(): void {
    this.loadLeaveStatistics();
  }

  loadLeaveStatistics() {
    this.leavService.getLeaveStatistics().subscribe(
      statistics => {
        this.leaveStatistics = statistics;
        console.log('Leave statistics:', this.leaveStatistics);
      },
      error => {
        console.error('Error fetching leave statistics:', error);
      }
    );
  }

}
