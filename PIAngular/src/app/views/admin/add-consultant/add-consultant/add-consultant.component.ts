import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { Consultant } from 'src/app/models/consultant';
import { ConsultantService } from 'src/app/services/consultant.service';


@Component({
  selector: 'app-add-consultant',
  templateUrl: './add-consultant.component.html',
  styleUrls: ['./add-consultant.component.css']


})
export class AddConsultantComponent {
  consultantForm!:FormGroup;
  showSuccessAlert: boolean = false;
  newconsultant!:Consultant;
 
  user: any;

  constructor(private fb: FormBuilder, private consultantService: ConsultantService,private profileService: ProfileService, private router: Router) {}
  phoneNumberType: string = 'number';
  ngOnInit(): void {
    this.consultantForm = this.fb.group({
      consultant_firstname: ['', Validators.required],
      consultant_lastname: ['', Validators.required],
      consultant_address: ['', Validators.required],
      consultant_email: ['', Validators.required],
      consultant_phonenumber: ['', Validators.required],
      date_last_meet: ['', Validators.required],

    });
    this.profileService.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data)
    } );
  }
 

  addConsultant() {
    if (this.consultantForm.valid) {
      this.newconsultant = this.consultantForm.value;
      console.log(this.newconsultant);
  
      this.consultantService.addConsultant(this.newconsultant).subscribe(
        (addedConsultant) => {
          console.log('Consultant ajouté avec succès :', addedConsultant);
          this.showSuccessAlert = true;
  
          setTimeout(() => {
            this.router.navigate(['admin/allblocs']);
          }, 2000);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du consultant :', error);
  
          // Log the complete error response
          if (error instanceof HttpErrorResponse) {
            console.error('Complete error response:', error);
          }
        }
      );
    }
  }
  
}
