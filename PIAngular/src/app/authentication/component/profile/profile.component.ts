import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../../service/profile.service';
import { RedirectorService } from '../../service/redirector.service';
import { UploadImgService } from '../../service/upload-img.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit {
  selectedImageFile: File | undefined;
  imageURL: string | undefined;

  selectedFile: File | null = null;
  selectedPDFFile: File | undefined;

  user: any;
  token: string = '';
  completedProjectsStats: any;

  constructor(private http: HttpClient, private service: ProfileService, private router: Router, private redirectorService: RedirectorService ,private srvc:UploadImgService,private userService: UserService) {}
  /* User ={
    image: ''
  }; */
  
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  onFileSelecteds(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
  }
  onPDFSelected(event: any) {
    this.selectedPDFFile = event.target.files[0];
  }

  ajouterImage(callback: () => void) {
    if (this.selectedImageFile) {
      this.srvc.uploadFile(this.selectedImageFile).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);
          if (response && response.imageURL) {
            this.user.image  = response.imageURL;
           
            callback();
          } else {
            console.error('Error: Image URL not found in response.');
            callback();
          }
        },
        error => {
          console.error('Error uploading image:', error);
          callback();
        }
      );
    } else {
      console.error('No image selected');
      callback();
    }
  }
 /*  uploadProfilePhoto() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      return;
    }

    // Add Authorization header with the correct token
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': Bearer ${token} // Use 'token' instead of 'this.token'
      })
    };

    // Make HTTP request to upload the file with the Authorization header
    this.http.post<any>('http://localhost:8089/upload-profile-photo', formData, httpOptions).subscribe(
      (response) => {
        console.log(response);
        // Handle success
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
} */
  uploadProfilePhoto() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Retrieve the JWT token from localStorage
    //const token = localStorage.getItem('token');
    // Add Authorization header
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.service.getUserProfile().subscribe (data => {
            this.user = data
           // console.log("thes is the response",data);
            this.token = data.token;
          } )}` // Use 'token' instead of 'this.token'
        })
      };

    // Make HTTP request to upload the file
    this.http.post<any>('http://localhost:8089/user/upload-profile-photo', formData, httpOptions).subscribe(
      (response) => {
        console.log(response);
        // Handle success
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data);
      this.token = data.token;
    } );  
    this.userService.getGeneraleEmployesData().subscribe(
      (data) => {
        this.completedProjectsStats = data;
        console.log('Completed Projects Statistics:', data);
      },
      (error) => {
        console.error('Error fetching completed projects statistics:', error);
      }
    );
  }
  uploadProfilePDF() {
    if (this.selectedPDFFile) {
      const formData: FormData = new FormData();
      formData.append('profilePDF', this.selectedPDFFile, this.selectedPDFFile.name);

      this.http.post<any>('http://localhost:3000/uploadProfilePDF', formData).subscribe(
        response => {
          console.log('File uploaded successfully:', response);
          // Handle success
        },
        error => {
          console.error('Error uploading file:', error);
          // Handle error
        }
      );
    } else {
      // Handle no file selected error
    }
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
  goBack() {
    this.router.navigate(["/admin"]);
  }
  
  updateProfile(){

    this.service.updateUser(this.user).subscribe(
      updatedUser => {
        this.ajouterImage(()=>{
          this.service.updateUser(this.user).subscribe(
            res => 
              {
              this.user={
              image:''
              }
          }
              
          )
        }
      )
        console.log('User updated successfully:', updatedUser);
        // You can perform additional actions if needed
      },
      error => {
        console.error('Error updating user:', error);
        // Handle the error as needed
      }
    );

  }
  navigateToUpdate() {
    
    this.router.navigate(['/update']);
  }
  downloadProfilePdf(): void {
    this.service.downloadProfilePdf().subscribe((data: Blob) => {
      console.log("thes is the response",data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url); // Opens the PDF in a new tab for download
    });
  }
}