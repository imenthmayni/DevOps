import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsultantService } from 'src/app/services/consultant.service';
import { Consultant } from 'src/app/models/consultant';

@Component({
  selector: 'app-update-consultant',
  templateUrl: './update-consultant.component.html',
  styleUrls: ['./update-consultant.component.css']
})
export class UpdateConsultantComponent implements OnInit {
  consultantForm!: FormGroup;
  consultant_id: number = 0;
  showSuccessAlert: boolean = false;
  consultant: any;

  constructor(
    private formBuilder: FormBuilder,
    private consultantService: ConsultantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtenez l'ID du consultant à partir de la route active
    this.route.params.subscribe(params => {
      const consultant_id = params['consultant_id'];
      this.getConsultant(consultant_id);
    });

    // Initialisez le formulaire avec les contrôles requis ici
    this.consultantForm = this.formBuilder.group({
      consultant_firstname: ['', Validators.required],
      consultant_lastname: ['', Validators.required],
      consultant_address: ['', Validators.required],
      consultant_email: ['', Validators.required],
      date_last_meet: ['', Validators.required],
      consultant_phonenumber: ['', Validators.required],
    });
  }

  getConsultant(consultant_id: number) {
    this.consultantService.getConsultant(consultant_id).subscribe(
      (data: any) => {
        this.consultant = data;
        // Mettez à jour les valeurs du formulaire avec les données du consultant
        this.consultantForm.patchValue({
          consultant_firstname: this.consultant.consultant_firstname,
          consultant_lastname: this.consultant.consultant_lastname,
          consultant_address: this.consultant.consultant_address,
          consultant_email: this.consultant.consultant_email,
          date_last_meet: this.consultant.date_last_meet,
          consultant_phonenumber: this.consultant.consultant_phonenumber,
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching consultant:', error);
      }
    );
  }

  updateConsultant() {
    // Obtenez les valeurs mises à jour du formulaire
    const updatedConsultant: Consultant = this.consultantForm.value;

    this.consultantService.updateConsultant(updatedConsultant).subscribe(
      (data: any) => {
        console.log('Consultant updated successfully:', data);
        this.router.navigate(['/retrieveConsultant'])      },
      (error: HttpErrorResponse) => {
        console.error('Error updating consultant:', error);
      }
    );
  }
}
