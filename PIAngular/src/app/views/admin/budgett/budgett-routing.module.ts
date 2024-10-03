import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgettComponent } from './budgett/budgett.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';

const routes: Routes = [
  { path: '', component: BudgettComponent },
  { path: 'add/:id', component: AddBudgetComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgettRoutingModule { }
