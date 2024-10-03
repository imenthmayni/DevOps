import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TimestampToDatePipe } from 'src/app/models/timestamp-to-date.pipe';


@NgModule({
  declarations: [
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    TimestampToDatePipe

  ]
})
export class PortfolioModule { }
