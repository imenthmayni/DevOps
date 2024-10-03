import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerTracking } from 'src/app/models/customer-tracking';
import { CustomerTrackingService } from 'src/app/services/customer-tracking.service';

@Component({
  selector: 'app-add-customer-tracking',
  templateUrl: './add-customer-tracking.component.html',
  styleUrls: ['./add-customer-tracking.component.css']
})
export class AddCustomerTrackingComponent {
  isSubmitting: boolean = false;
  customerTrackingForm!:FormGroup;
  showSuccessAlert: boolean = false;
  newCustomerTracking!:CustomerTracking;
  
  constructor(private fb: FormBuilder, private customerTrackingService: CustomerTrackingService, private router: Router) {}
  ngOnInit(): void {
    this.customerTrackingForm = this.fb.group({
      client_firstname: ['', Validators.required],
      client_lastname: ['', Validators.required],
      history_description: ['', Validators.required],
      date_last_meet: ['', Validators.required],
      meet_duration: ['', Validators.required],
      meet_subject: ['', Validators.required],
      meet_participant: ['', Validators.required],
      meet_objective: ['', Validators.required],
      next_step: ['', Validators.required],

    });
  }
  addCustomerTracking() {
    if (this.customerTrackingForm.valid) {
      this.isSubmitting = true; // Définissez isSubmitting à true lors de la soumission du formulaire
      this.newCustomerTracking = this.customerTrackingForm.value ;
      // Logique d'ajout du customerTracking...

      this.customerTrackingService.addCustomerTracking(this.newCustomerTracking).subscribe(
        (addedCustomerTracking) => {
          console.log('CustomerTracking ajouté avec succès :', addedCustomerTracking);
          this.showSuccessAlert = true;

          setTimeout(() => {
            this.router.navigate(['admin/addCustomerTracking']);
          }, 2000);

          this.isSubmitting = false; // Réinitialisez isSubmitting après la soumission réussie
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du customerTracking :', error);

          // Log the complete error response
          if (error instanceof HttpErrorResponse) {
            console.error('Complete error response:', error);
          }

          this.isSubmitting = false; // Réinitialisez isSubmitting en cas d'erreur
        }
      );
    }
  }  
}