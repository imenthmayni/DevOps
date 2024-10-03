import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/authentication/service/user.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePWDComponent {

  currentPassword: string="";
  newPassword: string="";
  confirmPassword: string="";

  constructor(private userService: UserService) { }

  changePassword(form: NgForm) {
    if (form.valid && this.newPassword.trim() === this.confirmPassword.trim()) {
      this.userService.updatePwd({
        currentPassword: this.currentPassword.trim(),
        newPassword: this.newPassword.trim()
      }).subscribe(
        (response) => {
          console.log('Password changed successfully:', response);
          // Clear form fields after submission
          form.resetForm();
        },
        (error) => {
          console.error('Error changing password:', error);
          // Display an error message to the user (e.g., "User not logged in" or "Error updating password")
          alert(error.message);
        }
      );
    }
  }

  /* changePassword(form: NgForm) {
    if (form.valid && this.newPassword.trim() === this.confirmPassword.trim()) {
      this.userService.updatePwd({ 
        currentPassword: this.currentPassword.trim(), 
        newPassword: this.newPassword.trim() 
      }).subscribe(
        (response) => {
          console.log('Password changed successfully:', response);
          // Clear form fields after submission
          form.resetForm();
        },
        (error) => {
          console.error('Error changing password:', error);
        }
      );
    }
  } */
}