import { Component } from '@angular/core';
import { UserService } from 'src/app/authentication/service/user.service';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.css']
})
export class FrontLayoutComponent {

  isLoggedIn: boolean = false; // Initially, user is assumed to be not logged in

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Subscribe to getLoggedInUser to track user's login status
    this.userService.getLoggedInUser().subscribe(
      user => {
        // If user is logged in, set isLoggedIn to true
        this.isLoggedIn = !!user;
      }
    );
  }
}
