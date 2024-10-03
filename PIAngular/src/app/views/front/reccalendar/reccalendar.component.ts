import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Recruitment } from 'src/app/core/Models/recruitment';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { RecinfoComponent } from '../recinfo/recinfo.component';
import { RecruitmentformComponent } from '../recruitmentform/recruitmentform.component';

@Component({
  selector: 'app-reccalendar',
  templateUrl: './reccalendar.component.html',
  styleUrls: ['./reccalendar.component.css']
})
export class ReccalendarComponent implements OnInit {
  recs: Recruitment[] = [];
  selectedRecruitments: Recruitment[] = [];
  showRecruitmentTable: boolean = false;

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
    private recruitmentService: RecruitmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadRecs();
  }

  loadRecs(): void {
    this.recruitmentService.getRecruitments().subscribe(
      data => {
        this.recs = data;
        this.initializeCalendarEvents();
      },
      error => {
        console.log('Error fetching recs:', error);
      }
    );
  }

  initializeCalendarEvents(): void {
    this.calendarOptions.events = this.recs.map(recruitment => ({
      title: recruitment.postTitle,
      start: recruitment.recruitmentDate ? new Date(recruitment.recruitmentDate) : undefined,
      extendedProps: { offerId: recruitment.offerId }
    }));
  }


  
  openRecDetailsDialog(recDetails: Recruitment): void {
    const dialogRef = this.dialog.open(RecinfoComponent, {
      width: '500px',
      height: '500px',
      data: recDetails
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  handleDateClick(arg: any) {
    const clickedDate: Date = arg.date;
    const datePart: string = clickedDate.toISOString().split('T')[0];
   
    this.selectedRecruitments = this.recs.filter(recruitment => {
      const eventDatePart = new Date(recruitment.recruitmentDate).toISOString().split('T')[0];
      return eventDatePart === datePart;
    });

    this.toggleRecTable();
    if (this.selectedRecruitments.length > 0) {
        const myRecruitment = this.selectedRecruitments[0];
        this.openRecDetailsSnackBar(myRecruitment); 
    }
}
toggleRecTable(): void {}


  handleEventClick(eventInfo: any): void {
    const offerId = eventInfo.event.extendedProps.offerId;

    this.recruitmentService.getRecruitmentById(offerId).subscribe(
        (recDetails: Recruitment) => {
            this.openRecDetailsSnackBar(recDetails);
        },
        error => {
            console.error('Error fetching recruitment details:', error);
        }
    );
}

openRecDetailsSnackBar(recDetails: Recruitment): MatSnackBarRef<any> {
  let message: string;

  if (recDetails.recruitmentStatus === 'OPEN') {
      message = `Post Title: ${recDetails.postTitle}\n` +
                `Number of Openings: ${recDetails.numberOfOpenings}\n` +
                `Recruiter: ${recDetails.recruiter}\n` +
                `Status of the Recruitment: ${recDetails.recruitmentStatus}`;
  } else {
      message = `Status of the Recruitment: ${recDetails.recruitmentStatus}\n` + 
                `Post Title: ${recDetails.postTitle}`;
  }

  const snackBarRef = this.snackBar.open(
      message,
      'Apply Now!',
      {
          duration: 10000, 
          horizontalPosition: 'center',
          verticalPosition: 'top', 
          panelClass: ['custom-snackbar']
      },
      
  );
snackBarRef.onAction().subscribe(() => {
  snackBarRef.dismiss();
});

snackBarRef.onAction().subscribe(() => {
  if (recDetails.recruitmentStatus === 'OPEN') {
      this.dialog.open(RecruitmentformComponent, {
          width: '500px', 
          height: '500px',
          data: { offerId: recDetails.offerId } 
      });
  }
});

return snackBarRef;
}}