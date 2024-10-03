import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioParDomainComponent } from './portfolio-par-domain/portfolio-par-domain.component';
import { PortfolioParDomainModule } from './portfolio-par-domain.module';

const routes: Routes = [
  { path: '', component: PortfolioParDomainComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ]
})
export class PortfolioParDomainRoutingModule { }
