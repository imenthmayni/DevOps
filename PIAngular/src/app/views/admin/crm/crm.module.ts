import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { CRMComponent } from './crm/crm.component';


@NgModule({
  declarations: [
    CRMComponent
  ],
  imports: [
    CommonModule,
    CRMRoutingModule
  ]
})
export class CRMModule { }
