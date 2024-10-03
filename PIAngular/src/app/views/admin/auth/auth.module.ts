import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AddEmployeeComponent } from './auth/add-employee/add-employee/add-employee.component';
import { FormsModule } from '@angular/forms';
import { ChangePWDComponent } from './auth/change-pwd/change-pwd.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    AddEmployeeComponent,
    ChangePWDComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  ]
})
export class AuthModule { }
