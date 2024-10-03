import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-desaffecter-user',
 // standalone: true,
 // imports: [],
  templateUrl: './desaffecter-user.component.html',
  styleUrls: ['./desaffecter-user.component.css']
})
export class DesaffecterUserComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number | null = null; // Utiliser un type union pour permettre null
  portfolioId: number = 0;
  showSuccessAlert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Récupérer l'ID du portfolio depuis les paramètres de la route
      this.portfolioId = Number(params.get('portfolioId'));
      
      // Afficher l'ID du portfolio dans la console pour le débogage
      console.log('ID du portfolio extrait des paramètres de la route :', this.portfolioId);
      
      // Charger les utilisateurs affectés à ce portfolio
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.portfolioService.getUsersByPortfolioId(this.portfolioId).subscribe(
      data => {
        this.users = data;
        console.log('users affected to  portfolio.');

      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
      }
    );
  }

  selectUser(userId: number): void {
    this.selectedUserId = userId;
  }

  desaffectUser(): void {
    if (this.selectedUserId && this.portfolioId) {
      this.portfolioService.desaffectUserToPortfolio(this.selectedUserId, this.portfolioId).subscribe(
        () => {
          this.loadUsers();
          this.selectedUserId = null ;
          console.log('portfolio affected to consultant successfully.');

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
