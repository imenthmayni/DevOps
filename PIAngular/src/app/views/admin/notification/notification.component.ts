import { Component, OnInit } from '@angular/core';
import { LeavService } from 'src/app/core/Services/leav.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: any[] = [];

  constructor(private leavService: LeavService) {}

  ngOnInit(): void {
    this.fetchScheduledNotifications();
  }

  fetchScheduledNotifications(): void {
    this.leavService.getNotifications().subscribe(
      (notifications: any[]) => {
        this.notifications = notifications;
      },
      (error: any) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
}
