import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeletePortfolioRoutingModule } from './delete-portfolio-routing.module';
import { DeletePortfolioComponent } from './delete-portfolio/delete-portfolio.component';


@NgModule({
  declarations: [
    DeletePortfolioComponent
  
],
  imports: [
    CommonModule,
    DeletePortfolioRoutingModule
  ]
})
export class DeletePortfolioModule { }
