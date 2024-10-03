import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteConsultantRoutingModule } from './delete-consultant-routing.module';
import { DeleteComponentComponent } from './delete-component/delete-component.component';


@NgModule({
  declarations: [
    DeleteComponentComponent
  ],
  imports: [
    CommonModule,
    DeleteConsultantRoutingModule 
  ]
})
export class DeleteConsultantModule { 

}
