import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/authentication/service/user.service';



export interface Card {
  title: string
  percentage: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {





  users: any[] = [];
  data: Card[]= []

  constructor( private service: UserService, private router: Router) { }
 
      
  ngOnInit(): void {
      this.service.getEmployeeRatio().subscribe({
        next: payload => {
          this.createCardList(payload)
          console.log(this.data)
        },
        error: err => {}
      })

      this.service.getGeneraleEmployesData().subscribe({
        next: payload => {
          console.log(payload)
        },
        error: err => {}
      })
      this.service.getSpeceficEmployesData().subscribe({
        next: payload => {
          console.log(payload)
        },
        error: err => {}
      })
  }



  private createCardList(data: object) {
    Object.keys(data).forEach((k, idx) => {
      this.data.push({title: k, percentage: Object.values(data)[idx]})
    })
    const firstElement = this.data[0].percentage
    this.data = this.data.map((item) => ({...item, percentage: item.percentage / firstElement * 100}))
  }

  logout() {
    // Add logout functionality here
    // For example, clearing local storage and redirecting to login page
    localStorage.removeItem("user");
    sessionStorage.clear();
    // localStorage.removeItem("isLoggedIn");
    // localStorage.removeItem("userName");
    this.router.navigate(["/"]);
  }
  ntfp() {
   
    this.router.navigate(["/"]);
  }
}
