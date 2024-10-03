import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Leav } from 'src/app/core/Models/leav';
import { LeavService } from 'src/app/core/Services/leav.service';

@Component({
  selector: 'app-acceptleav',
  templateUrl: './acceptleav.component.html',
  styleUrls: ['./acceptleav.component.css']
})
export class AcceptleavComponent {
  date: string;
  leaveId: number;
  userId: number;

  constructor(
    private dialogRef: MatDialogRef<AcceptleavComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private leavService: LeavService,
    private snackBar: MatSnackBar 
  ) {
    this.date = dialogData.date;
    this.leaveId = dialogData.leaveId;

    this.userId = dialogData.userId;
  }
  acceptLeav(leaveId: number): void {
    this.leavService.acceptLeaveRequest(leaveId).subscribe(
      (response: Leav) => {
        console.log('Leave request accepted successfully:', response);
         this.showSuccessSnackBar('Leave request accepted successfully'); 

      },
      error => {
        console.error('Error accepting leave request:', error);
        this.showErrorSnackBar('Error accepting leave request');
      }
    );
  }
  refuseLeav(leaveId: number): void {
    this.leavService.refuseLeave(leaveId).subscribe(
      () => {
        console.log('Leave request refused successfully');
        
      },
      (error: HttpErrorResponse) => {
        console.error('Error refusing leave request:', error);
        this.showErrorSnackBar('Error refusing leave request');
      }
    );
  }
  
  close(): void {
    this.dialogRef.close('cancelled');
  }
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000, 
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'] 
    });
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
