import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffecterUserPortfolioComponent } from './affecter-user-portfolio/affecter-user-portfolio.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

const routes: Routes = [
  {path:'',component: AffecterUserPortfolioComponent
}

];

@NgModule({
  imports: [ReactiveFormsModule,FormsModule ,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffecterUserPortfilioRoutingModule { }
