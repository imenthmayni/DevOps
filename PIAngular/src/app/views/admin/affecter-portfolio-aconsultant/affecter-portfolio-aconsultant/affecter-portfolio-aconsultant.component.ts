import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Consultant } from 'src/app/models/consultant';
import { Portfolio } from 'src/app/models/portfolio';
import { ConsultantService } from 'src/app/services/consultant.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-affecter-portfolio-aconsultant',
  templateUrl: './affecter-portfolio-aconsultant.component.html',
  styleUrls: ['./affecter-portfolio-aconsultant.component.css']
})
export class AffecterPortfolioAConsultantComponent  implements OnInit{
  consultants: Consultant[] = [];
  portfolios : Portfolio[] =[] ;
  showSuccessAlert: boolean = false;
  //portfolioForm!: FormGroup;
  consultant_id: number = 0;
  selectedportfolioId : number = 0;
  constructor(   
     private route: ActivatedRoute,
    private fb: FormBuilder,private _portfolioService: PortfolioService,private _consultantService: ConsultantService) {}
  
    ngOnInit(): void {
   
      this.route.paramMap.subscribe(params => {
        // Récupérer l'ID du consultant depuis les paramètres de la route
        this.consultant_id = Number(params.get('id')); // Utilisez le bon nom du paramètre
        
        // Afficher l'ID du portfolio dans la console pour le débogage
        console.log('ID du consultant extrait des paramètres de la route :', this.consultant_id);
        
        // Charger les utilisateurs affectés à ce portfolio
        this.loadUsers();
      });
      
    } 
    
    loadUsers(): void {
      this._portfolioService.getportfilioWithoutConsultant().subscribe(
        data => {
          this.portfolios = data;
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
        }
      );
    }
  
    selectUser(userId: number): void {
      this.selectedportfolioId = userId;
    }
      
    affectconsultantToPortfolio(): void {
      if (this.selectedportfolioId && this.consultant_id) {
     

        this._consultantService.affectconsultantToPortfolio( this.consultant_id,this.selectedportfolioId).subscribe(
          () => {
            console.log('portfolio affected to consultant successfully.');
            // Ajouter ici la logique à exécuter après l'affectation réussie
            this.showSuccessAlert=true;

          },
          (error: HttpErrorResponse) => {
            console.error('Error affecting portfolio to consultant:', error);
            // Ajouter ici la logique de gestion des erreurs
          }
        );
      } else {
        console.error('Form is invalid.');
        // Ajouter ici la logique pour gérer le cas où le formulaire est invalide
      }
    }
  }