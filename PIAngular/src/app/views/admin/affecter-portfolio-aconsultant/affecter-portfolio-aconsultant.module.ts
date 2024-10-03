import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffecterPortfolioAConsultantRoutingModule } from './affecter-portfolio-aconsultant-routing.module';
import { AffecterPortfolioAConsultantComponent } from './affecter-portfolio-aconsultant/affecter-portfolio-aconsultant.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AffecterPortfolioAConsultantComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    AffecterPortfolioAConsultantRoutingModule
  ]
})
export class AffecterPortfolioAConsultantModule { }
