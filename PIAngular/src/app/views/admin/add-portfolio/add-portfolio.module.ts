import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddPortfolioRoutingModule } from './add-portfolio-routing.module';
import { AddPortfolioComponent } from './add-portfolio/add-portfolio.component';


@NgModule({
  declarations: [
    AddPortfolioComponent
  ],
  imports: [
    CommonModule,
    AddPortfolioRoutingModule ,
    ReactiveFormsModule 

  ]
})
export class AddPortfolioModule { }
