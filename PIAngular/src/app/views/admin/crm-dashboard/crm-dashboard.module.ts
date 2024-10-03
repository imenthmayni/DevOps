import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmDashboardRoutingModule } from './crm-dashboard-routing.module';
import { CrmDashboardComponent } from './crm-dashboard/crm-dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PortfolioParDomainModule } from '../portfolio-par-domain/portfolio-par-domain.module';


@NgModule({
  declarations: [CrmDashboardComponent],
  imports: [
    CommonModule,
    CrmDashboardRoutingModule ,
    FormsModule ,
    PortfolioParDomainModule , 
    NgxPaginationModule , 

  ]

})
export class CrmDashboardModule { }
