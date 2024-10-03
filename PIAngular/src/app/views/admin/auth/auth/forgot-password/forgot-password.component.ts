import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string="";

  constructor() { }

  submitForgotPasswordForm() {
    // Send email address to backend for password reset
    console.log('Email Address:', this.email);

    // Clear form field after submission
    this.email = '';
  }
}
