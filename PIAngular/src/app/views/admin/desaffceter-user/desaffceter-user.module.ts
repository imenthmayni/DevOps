import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesaffceterUserRoutingModule } from './desaffceter-user-routing.module';
import { DesaffecterUserComponent } from './desaffecter-user/desaffecter-user.component';


@NgModule({
  declarations: [DesaffecterUserComponent],
  imports: [
    CommonModule,
    DesaffceterUserRoutingModule
  ]
})
export class DesaffceterUserModule { }
