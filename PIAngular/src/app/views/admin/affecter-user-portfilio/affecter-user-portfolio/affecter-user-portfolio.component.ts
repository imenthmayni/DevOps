import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio';
import { User } from 'src/app/models/user';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-affecter-user-portfolio',
  templateUrl: './affecter-user-portfolio.component.html',
  styleUrls: ['./affecter-user-portfolio.component.css']
})
export class AffecterUserPortfolioComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number | null = null; // Utiliser un type union pour permettre null
  portfolioId: number = 0;
  showSuccessAlert: boolean = false;

  constructor( private portfolioService: PortfolioService, private route: ActivatedRoute) {}



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Récupérer l'ID du portfolio depuis les paramètres de la route
      this.portfolioId = Number(params.get('portfolioId'));
      
      // Afficher l'ID du portfolio dans la console pour le débogage
      console.log('ID du portfolio extrait des paramètres de la route :', this.portfolioId);
      
      // Charger les utilisateurs  non affectés à ce portfolio
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.portfolioService.getUsersnonAffectePortfolio().subscribe(
      data => {
        this.users = data;
        console.log('users  non affected to  portfolio.');

      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
      }
    );
  }

  selectUser(userId: number): void {
    this.selectedUserId = userId;
  }

  affectUserToPortfolio(): void {
    if ( this.portfolioId && this.selectedUserId) {
      this.portfolioService.affectUserToPortfolio(this.portfolioId, this.selectedUserId).subscribe(
        () => {
          this.loadUsers();
          this.selectedUserId = null ;
          console.log(' user affected to portfolio successfully.');

          this.showSuccessAlert=true;

        },
        error => {
          console.error('Une erreur s\'est produite lors de la désaffectation de l\'utilisateur :', error);
        }
      );
    } else {
      console.error('Form is invalid.');
      // Ajouter ici la logique pour gérer le cas où le formulaire est invalide
    }
    }
  }
