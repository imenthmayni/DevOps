import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffecterUserPortfilioRoutingModule } from './affecter-user-portfilio-routing.module';
import { AffecterUserPortfolioComponent } from './affecter-user-portfolio/affecter-user-portfolio.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AffecterUserPortfolioComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AffecterUserPortfilioRoutingModule,
    ReactiveFormsModule

  ]
})
export class AffecterUserPortfilioModule { }
