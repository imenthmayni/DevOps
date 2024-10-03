import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffecterPortfolioAConsultantComponent } from './affecter-portfolio-aconsultant/affecter-portfolio-aconsultant.component';

const routes: Routes = [
  {path:'',component: AffecterPortfolioAConsultantComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffecterPortfolioAConsultantRoutingModule { }
