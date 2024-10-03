import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recruitment, RecruitmentStatus } from 'src/app/core/Models/recruitment';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-addrecruitment',
  templateUrl: './addrecruitment.component.html',
  styleUrls: ['./addrecruitment.component.css']
})
export class AddrecruitmentComponent implements OnInit {

  recruitments: Recruitment [] = [];
  recForm!: FormGroup;
  showSuccessAlert: boolean = false;
  newRec!: Recruitment;



  constructor(private fb: FormBuilder, private recService: RecruitmentService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.recForm = this.fb.group({
      postTitle: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      
      recruitmentStatus: ['', Validators.required] 

    });
  }

  adddRec() {
    if (this.recForm.valid) {
      this.newRec = this.recForm.value;

      const message = JSON.stringify(this.newRec);

      this.recService.createRecruitment(this.newRec).subscribe(
        (addedRec: Recruitment) => {
          console.log('Recrutement ajouté avec succès :', addedRec);
          this.showSuccessAlert = true;
        },
        (error: any) => {
          console.error('Erreur lors de l ajout du recrutement :', error);
          console.error('Complete error response:', error);
        }
      );
    }

  }
  redirectToRecDisplay() {
    this.router.navigate(['/admin/recruitdisplay']); 
}
  
  dismissAlert() {
    this.showSuccessAlert = false;
  }
}
