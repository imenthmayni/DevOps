import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from 'src/app/authentication/service/user.service';
import * as XLSX from 'xlsx';



interface User {
  id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number | null;
    role:string[];
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {



  users: User[] = [{ id: null, firstName: "loading...", lastName: "loading...", email: "loading...", phoneNumber: null, role:[] }]
  //userList: any[] = [  ];


  request = {
    page: 0,
    size: 20, 
    criteria: "firstName",
    direction: "asc",
    searchTerm: "",
  }
  Keyword: string = ''; 


  constructor (private service: UserService, private router: Router) {}

  /* fetchUsers(): void {
    this.service.searchAllUsers({ ...this.request, size: 1000 }).subscribe({
      next: (payload: { content: User[], totalPage: number, totalElements: number, pageNumber: number }) => {
        this.users = payload.content;
      },
      error: error => {
        console.log(error);
      }
    });
  } */
  fetchUsers(): void {
    console.log('Fetching users...');
    this.service.searchAllUsers(this.request).subscribe({
      next: (payload: {
        content: User[], totalPage: number, totalElements: number, pageNumber: number }) => {
        console.log('Users fetched:', payload.content);
        this.users = payload.content;
      },
      error: error => {
        console.error('Error fetching users:', error);
      }
    });
  }

  exportToExcel(): void {
    // Fetch all user data before exporting
    this.fetchUsers();
    // Wait for a short delay to ensure data is fetched (optional)
    setTimeout(() => {
      const dataToExport = this.users.map(user => ({
        'ID': user.id,
        'First Name': user.firstName,
        'Last Name': user.lastName,
        'Email': user.email,
        'Phone Number': user.phoneNumber,
        'Role': user.role.join(', '), // Assuming role is an array
      }));

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, 'user_data.xlsx');
    }, 500); // Adjust delay as needed
  }


  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Assuming data format matches User interface
      const importedUsers: User[] = data.slice(1).map(row => ({
        id: row[0],
        firstName: row[1],
        lastName: row[2],
        email: row[3],
        phoneNumber: row[4],
        role: row[5].split(',').map((r: string) => r.trim())
      }));
      console.log(importedUsers); // Do something with imported users
    };
    reader.readAsBinaryString(target.files[0]);
  }
//   exportToExcel(): void {
//     // Fetch user data before exporting
//     this.searchAllUsers();

//     // Wait for a short delay to ensure data is fetched (optional)
//     setTimeout(() => {
//         const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
//         const wb: XLSX.WorkBook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//         /* generate XLSX file and send to client */
//         XLSX.writeFile(wb, 'user_data.xlsx');
//     }, 500); // Adjust delay as needed
// }
  ngOnInit(): void {
    this.service.getLoggedInUser().subscribe(user => {
      console.log("this is the user inside the ngOnInit")
      console.log(user)
      if (!user) {
        this.router.navigate(['/signin'])
        return
      }
      this.searchAllUsers()
    }) 
    
  }


  searchAllUsers() {
    this.service.searchAllUsers(this.request).subscribe({
      next: (payload: {
        content: User[], totalPage: number, totalElements: number, pageNumber: number }) => {
        console.log(payload)
        this.users = payload.content
      },
      error: error => {
        console.log(error)
      }
    });
  }



  handleClickSort(criteria: string, direction: string) {
    this.request.criteria = criteria
    this.request.direction = direction
    this.request.page = 0
    this.request.searchTerm= ""
    this.searchAllUsers()
  }
  navigateToAddUser() {
    
    this.router.navigate(['/admin/auth/add']);
  }
  
  searchByKeyword(keyword: string) {
    const request = { Keyword: keyword }; // Create the request object
    this.service.searchByKeyword(request).subscribe({
      next: (payload: { content: User[], totalPage: number, totalElements: number, pageNumber: number }) => {
        console.log(payload);
        this.users = payload.content;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
