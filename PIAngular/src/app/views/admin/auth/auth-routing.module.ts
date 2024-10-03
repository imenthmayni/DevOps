import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AddEmployeeComponent } from './auth/add-employee/add-employee/add-employee.component';
import { ChangePWDComponent } from './auth/change-pwd/change-pwd.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, 
  },
  {
    path: 'add', component: AddEmployeeComponent,
  },
  {
    path: 'changepwd', component: ChangePWDComponent,
  },
  {
    path: 'forgotpwd', component: ForgotPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
