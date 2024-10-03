import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletePortfolioComponent } from './delete-portfolio/delete-portfolio.component';

const routes: Routes = [
  {path:'', component: DeletePortfolioComponent},
  { path: ':id', component: DeletePortfolioComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeletePortfolioRoutingModule { }
