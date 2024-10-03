import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificationMeetRoutingModule } from './planification-meet-routing.module';
import { PlanificationMeetComponent } from './planification-meet/planification-meet.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    PlanificationMeetComponent,
  ],
  imports: [
    CommonModule,
    PlanificationMeetRoutingModule ,
    FormsModule,
    NgbModalModule,
    FullCalendarModule , 
    MatSnackBarModule, 

  ],
 exports: [PlanificationMeetComponent],

})
export class PlanificationMeetModule { }
