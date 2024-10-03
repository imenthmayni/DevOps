import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/core/Models/candidate';
import { CandidateService } from 'src/app/core/Services/candidate.service';

@Component({
  selector: 'app-addcandidate',
  templateUrl: './addcandidate.component.html',
  styleUrls: ['./addcandidate.component.css']
})
export class AddcandidateComponent implements OnInit {


candidates: Candidate [] = [];
candForm!: FormGroup;
showSuccessAlert: boolean = false;
newCand!: Candidate;
loading: boolean = false;


constructor(private fb: FormBuilder, private candService: CandidateService, private router: Router, private http: HttpClient) {}


ngOnInit(): void {
  this.candForm = this.fb.group({
    firstNameCand: ['', Validators.required],
    lastNameCand: ['', Validators.required],
    emailCand: ['', Validators.required],
    skillsCand: ['', Validators.required],
    experienceCand: ['', Validators.required],
    education: ['', Validators.required]

  });
}



createCandidate() {
  if (this.candForm.valid) {
    this.newCand = this.candForm.value;
    this.loading = true;

    this.candService.createCandidate(this.newCand).subscribe(
      (addedCand: Candidate) => {
        console.log('Candidat ajouté avec succès :', addedCand);
        this.showSuccessAlert = true;
        this.loading = false; 
      },
      (error: any) => {
        console.error('Erreur lors de l ajout du candidat :', error);
        console.error('Complete error response:', error);
        this.loading = false;
      }
    );
  }
}
goBack() {
  this.router.navigate(['/admin/candisplay']);
}
dismissAlert() {
  this.showSuccessAlert = false;
}
}







