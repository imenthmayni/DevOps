import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgettRoutingModule } from './budgett-routing.module';
import { BudgettComponent } from './budgett/budgett.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BudgettComponent,
    AddBudgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BudgettRoutingModule
  ]
})
export class BudgettModule { }
