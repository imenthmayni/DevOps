import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetrievAllConsultantRoutingModule } from './retriev-all-consultant-routing.module';
import { RetrieveAllConsultantComponent } from './retrieve-all-consultant/retrieve-all-consultant.component';
import { FormsModule } from '@angular/forms';
import { TimestampToDatePipe } from 'src/app/models/timestamp-to-date.pipe';


@NgModule({
  declarations: [
    RetrieveAllConsultantComponent
  ],
  imports: [
    CommonModule,
    RetrievAllConsultantRoutingModule ,  
    FormsModule,
    TimestampToDatePipe
  ]
})
export class RetrievAllConsultantModule { 
}
