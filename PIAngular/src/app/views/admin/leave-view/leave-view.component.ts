import { Component, OnInit } from '@angular/core';
import { Leav } from 'src/app/core/Models/leav';
import { LeavService } from 'src/app/core/Services/leav.service';
import { ProfileService } from 'src/app/authentication/service/profile.service';

@Component({
  selector: 'app-leave-view',
  templateUrl: './leave-view.component.html',
  styleUrls: ['./leave-view.component.css']
})
export class LeaveViewComponent implements OnInit {

  leaves: Leav[] = [];
  loading = true;
  error = false;

  constructor(private leavService: LeavService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadLeavesForCurrentUser();
  }

  loadLeavesForCurrentUser() {
    this.profileService.getUserProfile().subscribe(
      user => {
        if (user && user.id) {
          this.leavService.getLeavsForUser(user.id).subscribe(
            leaves => {
              this.leaves = leaves;
              this.loading = false;
            },
            error => {
              console.error('Error fetching leaves:', error);
              this.error = true;
              this.loading = false;
            }
          );
        } else {
          console.error('User profile not found or missing user id');
          this.error = true;
          this.loading = false;
        }
      },
      error => {
        console.error('Error fetching user profile:', error);
        this.error = true;
        this.loading = false;
      }
    );
  }

  getUserFullName(): string {
    return ""; 
  }

  confirmDelete(leaveId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to withdraw your request?');

 
    if (confirmDelete) {
      this.leavService.deleteLeav(leaveId).subscribe(
        () => {
        },
        error => {
          console.error('Error deleting leave:', error);
        }
      );
    }
  }
}
