import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContributionComponent } from './add-contribution/add-contribution.component';
import { ContributionComponent } from './contribution/contribution.component';
import { ContributionRoutingModule } from './contribution-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddContributionComponent,
    ContributionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContributionRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContributionModule { }
