import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Recruitment } from 'src/app/core/Models/recruitment';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-addrecrequest',
  templateUrl: './addrecrequest.component.html',
  styleUrls: ['./addrecrequest.component.css']
})
export class AddrecrequestComponent implements OnInit{
  recruitmentForm!: FormGroup;
  showSuccessAlert: boolean = false;
  newRecruitment!: Recruitment;
  ratingcount = 0;
  totalrating = 0;
  contributorName: string = '';
  Finalrating: any;

  ratingcontrol = new FormControl(0);

  constructor(private fb: FormBuilder, private recruitmentService: RecruitmentService, private router: Router,    private _snackBar: MatSnackBar, private http: HttpClient // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.recruitmentForm = this.fb.group({
      postTitle: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      hiringManager: ['', Validators.required],
      requestDate: ['', Validators.required],
      recruiter: ['', Validators.required],
      jobLocation: ['', Validators.required],
      salaryRangeMin: ['', Validators.required],
      salaryRangeMax: ['', Validators.required],
      numberOfOpenings: ['', Validators.required],
      urgent: [false, Validators.required], 
      recruitmentDate: ['', Validators.required],
      recruitmentStatus: ['', Validators.required]
    });
  }

  adddRec() {
    if (this.recruitmentForm.valid) {
      this.newRecruitment = this.recruitmentForm.value;
      this.recruitmentService.createRecruitment(this.newRecruitment).subscribe(
        (addedRecruitment: Recruitment) => {
          console.log('Recrutement ajouté avec succès :', addedRecruitment);
          this.showSuccessAlert = true;
        },
        (error: any) => {
          console.error('Erreur lors de l ajout du congé :', error);
          console.error('Complete error response:', error);
        }
      );
    }}
  showSuccessSnackbar() {
    this._snackBar.open('Recruitment submitted successfully!', 'Close', {
      duration: 3000, 
    });
    this.recruitmentForm.reset(); 
  }

  dismissAlert() {
    this.showSuccessAlert = false;
  }
  

  GetRating(event: MouseEvent) {
    const starValue = (event.target as HTMLInputElement).value;
    this.contributorName = ''; 
    this.ratingcount++;
    this.totalrating += +starValue;
    this.Finalrating = +starValue;

    
    this.saveRating();
  }

 saveRating() {
    const ratingData = {
      rating: this.Finalrating,
      contributor: this.contributorName 
    };

    const url = 'http://localhost:8089/rate/ratings'; 

   
    this.http.post<any>(url, ratingData)
      .subscribe(
        (response) => {
          console.log('Rating saved successfully:', response);
         
        },
        (error) => {
          console.error('Error saving rating:', error);
      
        }
      );
}
}
