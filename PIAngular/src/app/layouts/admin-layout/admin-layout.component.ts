import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { UserService } from 'src/app/authentication/service/user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  user: any;
  
  isLoggedIn: boolean = false; // Initially, user is assumed to be not logged in

  constructor(private profileService: ProfileService ) {}
  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data)

    } );
    // Subscribe to getLoggedInUser to track user's login status
    this.profileService.getLoggedInUser().subscribe(
      user => {
        // If user is logged in, set isLoggedIn to true
        this.isLoggedIn = !!user;
      }
    );
    }

    subMenuStatus: { [key: string]: boolean } = {
      projects: false,
      CRM: false, // Ajoutez d'autres menus si nécessaire
      Payroll: false,
      Leave_Management: false,
      Product : false,
      Stock : false,
      Production :false,
  };

  toggleSubMenu(menu: string) {
      for (const key in this.subMenuStatus) {
          if (Object.prototype.hasOwnProperty.call(this.subMenuStatus, key)) {
              this.subMenuStatus[key] = key === menu ? !this.subMenuStatus[key] : false;
          }
      }
  }
}