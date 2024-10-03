import { Component, OnInit } from '@angular/core';
import { Leav } from 'src/app/core/Models/leav';
import { LeavService } from 'src/app/core/Services/leav.service';
import { CalendarOptions } from '@fullcalendar/core'; // Import CalendarOptions
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGridPlugin
import { EventInput } from '@fullcalendar/core'; // Import EventInput
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core'; // Import EventClickArg
@Component({
  selector: 'app-lecalendar',
  templateUrl: './lecalendar.component.html',
  styleUrls: ['./lecalendar.component.css']
})
export class LecalendarComponent implements OnInit {

  leaves: Leav[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [] ,
    editable: false
    
  };
  constructor(private leavService: LeavService) { }

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
        console.log('Error fetching leaves:', error);
      }
    );
  }

  initializeCalendar(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
      events: this.leaves.map(leave => ({
        title: leave.leaveType,
        start: leave.leaveStartdate ? new Date(leave.leaveStartdate) : null,
        end: leave.leaveEnddate ? new Date(leave.leaveEnddate) : null
      })) as EventInput[] 
    };
  }
  initializeCalendarEvents(): void {
    const events = this.leaves.map(leave => ({
      title: leave.leaveType,
      start: leave.leaveStartdate ? new Date(leave.leaveStartdate) : undefined,
      end: leave.leaveEnddate ? new Date(leave.leaveEnddate) : undefined,
      extendedProps: leave
    }));
    this.calendarOptions.events = events;
  }
 
  handleEventClick(event: any): void {
    const leaveDetails = event.event.extendedProps as Leav;
    console.log('Leave details:', leaveDetails);
  }
}
