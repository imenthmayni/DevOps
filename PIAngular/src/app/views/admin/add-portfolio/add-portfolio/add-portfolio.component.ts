import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.css']
})
export class AddPortfolioComponent implements OnInit {
  portfolioForm!: FormGroup;
  showSuccessAlert: boolean = false;
  newPortfolio!: Portfolio;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private portfolioService: PortfolioService, private router: Router) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des champs vides et des validations
    this.portfolioForm = this.fb.group({
      potfolio_name: ['', Validators.required],
      creation_date: ['', Validators.required],
      potfolio_description: ['', Validators.required],
      potfolio_manager: ['', Validators.required],
      nbr_client: ['', Validators.required],
      domain: ['', Validators.required],

   //   nbr_client: ['', Validators.required],
    });
  }

  addPortfolio() {
    // Si le formulaire est valide
    if (this.portfolioForm.valid) {
      this.isSubmitting = true; // Définir isSubmitting à true pendant la soumission

      // Création d'un nouvel objet Portfolio à partir des valeurs du formulaire
      this.newPortfolio = this.portfolioForm.value;

      // Appel du service pour ajouter le portfolio
      this.portfolioService.addPortfolio(this.newPortfolio).subscribe(
        (addedPortfolio) => {
          // Succès de l'ajout
          console.log('Portfolio ajouté avec succès :', addedPortfolio);
          this.showSuccessAlert = true;

          // Redirection après un certain délai
          setTimeout(() => {
            this.router.navigate(['admin/allblocs']);
          }, 2000);
        },
        (error) => {
          // Gestion des erreurs
          console.error('Erreur lors de l\'ajout du portfolio :', error);

          // Journalisation de la réponse complète en cas d'erreur HTTP
          if (error instanceof HttpErrorResponse) {
            console.error('Réponse d\'erreur complète :', error);
          }
        },
        () => {
          this.isSubmitting = false; // Réinitialiser isSubmitting après la soumission
        }
      );
    }
  }
}
