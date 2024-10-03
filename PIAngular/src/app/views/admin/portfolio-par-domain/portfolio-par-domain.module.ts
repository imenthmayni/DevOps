import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioParDomainRoutingModule } from './portfolio-par-domain-routing.module';
import { PortfolioParDomainComponent } from './portfolio-par-domain/portfolio-par-domain.component';


@NgModule({
  declarations: [PortfolioParDomainComponent],
  exports:[PortfolioParDomainComponent] ,
  imports: [
    CommonModule,
    PortfolioParDomainRoutingModule
  ]
})
export class PortfolioParDomainModule { }
