import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatistiquePortfolioComponent } from './statistique-portfolio/statistique-portfolio.component';

const routes: Routes = [
  {
    path:'',component: StatistiquePortfolioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisquePortfolioRoutingModule { }
