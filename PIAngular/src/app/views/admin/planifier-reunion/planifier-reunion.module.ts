import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanifierReunionComponent } from './planifier-reunion/planifier-reunion.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FullCalendarModule ,
    NgxChartsModule,
  
  ],
  declarations: [PlanifierReunionComponent],
  exports: [PlanifierReunionComponent],
})
export class PlanifierReunionModule {}  

