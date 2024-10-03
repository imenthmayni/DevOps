import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisquePortfolioRoutingModule } from './statisque-portfolio-routing.module';
import { StatistiquePortfolioComponent } from './statistique-portfolio/statistique-portfolio.component';


@NgModule({
  declarations: [
    StatistiquePortfolioComponent
  ],
  imports: [
    CommonModule,
    StatisquePortfolioRoutingModule
  ]
})
export class StatisquePortfolioModule { }
