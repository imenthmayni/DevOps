import { Component, OnInit } from '@angular/core';
import { Leav } from 'src/app/core/Models/leav';
import { LeavService } from 'src/app/core/Services/leav.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications
import { MatDialog } from '@angular/material/dialog';
import { AcceptleavComponent } from '../acceptleav/acceptleav.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leavcalendar',
  templateUrl: './leavcalendar.component.html',
  styleUrls: ['./leavcalendar.component.css']
})
export class LeavcalendarComponent implements OnInit {

  leaves: Leav[] = [];
  selectedLeaves: Leav[] = [];
  showLeavTable: boolean = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [], 
    editable: false,
    selectable: true,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private leavService: LeavService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.leavService.getLeavs().subscribe(
      data => {
        this.leaves = data;
        this.initializeCalendarEvents();
      },
      error => {
        console.log('Error fetching leaves', error);
      }
    );
  }

  initializeCalendarEvents(): void {
    this.calendarOptions.events = this.leaves.map(leav => ({
      title: leav.leaveType,
      start: leav.leaveStartdate ? new Date(leav.leaveStartdate) : undefined,
      extendedProps: { leaveId: leav.leaveId}
    }));
  }


  
  openLeavDetailsDialog(leaveDetails: Leav): void {
    const dialogRef = this.dialog.open(AcceptleavComponent, {
      width: '500px',
      height: '500px',
      data: leaveDetails
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  handleDateClick(arg: any) {
    const clickedDate: Date | null = arg.date;
    if (clickedDate) {
      const datePart: string = clickedDate.toISOString().split('T')[0];
     
      this.selectedLeaves = this.leaves.filter(leave => {
        const eventDatePart = leave.leaveStartdate ? new Date(leave.leaveStartdate).toISOString().split('T')[0] : null;
        return eventDatePart === datePart;
      });
  
      this.toggleLeavTable();
      if (this.selectedLeaves.length > 0) {
        const sLeav = this.selectedLeaves[0];
        this.openLeavDetailsSnackBar(sLeav);
      }
    } else {
      console.error('Clicked date is null.');
    }
  }
toggleLeavTable(): void {
}


  handleEventClick(eventInfo: any): void {
    const leaveId = eventInfo.event.extendedProps.leaveId;

    this.leavService.getLeavById(leaveId).subscribe(
        (leaveDetails: Leav) => {
            this.openLeavDetailsSnackBar(leaveDetails);
        },
        error => {
            console.error('Error fetching leave details:', error);
        }
    );
}
openLeavDetailsSnackBar(leaveDetails: Leav): MatSnackBarRef<any> {
  let message: string;
  let snackBarRef: MatSnackBarRef<any> | undefined;

  if (leaveDetails.leaveStatus === 'PENDING') {
    const startDate = leaveDetails.leaveStartdate ? new Date(leaveDetails.leaveStartdate).toISOString() : '';
    const endDate = leaveDetails.leaveEnddate ? new Date(leaveDetails.leaveEnddate).toISOString() : '';

    if (startDate && endDate) {
      const formattedStartDate = startDate;
      const formattedEndDate = endDate;

      this.leavService.calculateLeaveDuration(startDate, endDate).subscribe(
        duration => {
          message = `Leave Start Date: ${formattedStartDate}\n` +
                    `Leave End Date: ${formattedEndDate}\n` +
                    `Reason: ${leaveDetails.reason}\n` +
                    `Leave Type: ${leaveDetails.leaveType}\n` +
                    `Leave Days Left: ${leaveDetails.leaveDaysLeft}\n` +
                    `Leave Duration: ${duration} days`;

          snackBarRef = this.snackBar.open(
            message,
            'Open the Leave Request',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            }
          );

          snackBarRef.onAction().subscribe(() => {
            snackBarRef?.dismiss();
            if (leaveDetails.leaveStatus === 'PENDING') {
              this.dialog.open(AcceptleavComponent, {
                width: '500px',
                height: '500px',
                data: { leaveId: leaveDetails.leaveId }
              });
            }
          });
        },
        error => {
          console.error('Error calculating leave duration:', error);
          message = `Leave Start Date: ${formattedStartDate}\n` +
                    `Leave End Date: ${formattedEndDate}\n` +
                    `Reason: ${leaveDetails.reason}\n` +
                    `Leave Type: ${leaveDetails.leaveType}\n` +
                    `Leave Days Left: ${leaveDetails.leaveDaysLeft}`;

          snackBarRef = this.snackBar.open(
            message,
            'Open the Leave Request',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            }
          );

          snackBarRef.onAction().subscribe(() => {
            snackBarRef?.dismiss();
            if (leaveDetails.leaveStatus === 'PENDING') {
              this.dialog.open(AcceptleavComponent, {
                width: '500px',
                height: '500px',
                data: { leaveId: leaveDetails.leaveId }
              });
            }
          });
        }
      );

      return snackBarRef!;
    } else {
      console.error('Invalid start date or end date');
      return this.snackBar.open('Invalid start date or end date', 'Dismiss');
    }
  } else {
    message = `Status of the Leave: ${leaveDetails.leaveStatus}\n` +
              `Reason: ${leaveDetails.reason}`;

    snackBarRef = this.snackBar.open(
      message,
      'Open the Leave Request',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      }
    );

    snackBarRef.onAction().subscribe(() => {
      snackBarRef?.dismiss();
    });

    return snackBarRef!;
  }
}

}
