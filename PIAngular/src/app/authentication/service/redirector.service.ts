import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ObservableInput, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectorService {
  constructor(private router: Router) { }

  redirectUser(user: any): void {
    console.log('User object:', user); // Debug log
    const allowedRoles = ['ROLE_ADMIN', 'ROLE_HR_ADMIN', 'ROLE_CRM_ADMIN', 'ROLE_PROJECT_ADMIN', 'ROLE_PRODUCT_ADMIN'];
    if (user && user.roles && user.roles.some((role: string) => allowedRoles.includes(role))) {
      this.router.navigate(["admin/dashboard"]);
    } else {
      this.router.navigate(["/"]);
    }
  }
}



