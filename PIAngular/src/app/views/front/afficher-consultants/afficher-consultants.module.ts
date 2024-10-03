import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfficherConsultantsRoutingModule } from './afficher-consultants-routing.module';
import { AfficherConsultantsComponent } from './afficher-consultants/afficher-consultants.component';


@NgModule({
  declarations: [AfficherConsultantsComponent],
  exports: [AfficherConsultantsComponent],
  imports: [
    CommonModule,
    AfficherConsultantsRoutingModule ,

  ]
})
export class AfficherConsultantsModule { }
