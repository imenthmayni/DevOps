import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leav, User } from 'src/app/core/Models/leav';
import { LeavService } from 'src/app/core/Services/leav.service';
import { UserService } from 'src/app/core/Services/user.service';

@Component({
  selector: 'app-leavdisplay',
  templateUrl: './leavdisplay.component.html',
  styleUrls: ['./leavdisplay.component.css']
})
export class LeavdisplayComponent implements OnInit {
 
  leavs: Leav[] = [];
  firstName: string = '';
  lastName: string = '';
  leaveId: number = 1;
  users: User[] = [];



  constructor(private leavService: LeavService,private userService: UserService, private router: Router , private http: HttpClient){}
  ngOnInit() {
    this.getAllLeavs();
    this.getAllUsers();
    
  }
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error(error);
      }
    );
  }
  getAllLeavs() {
    this.leavService.getLeavs().subscribe(
      data => {
        this.leavs = data;
        console.log(this.leavs);
        
      },
      error => {
        console.error(error);
      }
    );
  }
  getUserInfo(id: number) {
    this.userService.getUserById(id).subscribe(
      (user: User) => {
        console.log('Informations sur l\'utilisateur:', user);
        alert(`The User's First Name: ${user.firstName}, Last Name: ${user.lastName}, The User's Email: ${user.email}, The User's Phone Number: ${user.telephone}`);
      },
      error => {
        console.error(error);
      }
    );
  }

  // getUserByLeavId(leaveId: number): void {
  //   this.http.get<any>(`${leaveId}/userByLeave`).subscribe(
  //     (response) => {
  //       if (response && response.firstName && response.lastName) {
  //         this.firstName = response.firstName;
  //         this.lastName = response.lastName;
  //       } else {
  //         console.error('Invalid response data:', response);
  //       }
  //     },
  //     (error) => {
  //       // Error occurred during HTTP request
  //       console.error('Error retrieving user:', error);
  //     }
  //   );
  // }
   
  deleteLeav(leaveId: number) {
  const confirmDelete = window.confirm('Are you sure you want to delete this leave?');

  if (confirmDelete) {
    this.leavService.deleteLeav(leaveId).subscribe(
      () => {
        this.getAllLeavs();
      },
      error => {
        console.error('Error deleting leave:', error);
      }
    );
  } else {
  
  }
}

  updateLeav( updatedLeav: Leav) {
    const confirmUpdate = window.confirm('Are you sure you want to update this leave?');

  if (confirmUpdate) {
    this.leavService.updateLeav(updatedLeav).subscribe(
      () => {
        this.router.navigate(['/updateLeav', updatedLeav]);
      },
      error => {
        console.error('Error updating leave:', error);
      }
    );
  } else {
   
  }
  }
  

  navigateToAddLeav() {
    this.router.navigate(['/addLeav']);
  
  }
  navigateToEditLeav() {
    this.router.navigate(['../update']);
  
  }
  goBack() {
    this.router.navigate(['../recruitdisplay']);
  }
}
