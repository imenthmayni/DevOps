import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-delete-portfolio',
  templateUrl: './delete-portfolio.component.html',
  styleUrls: ['./delete-portfolio.component.css']
})
export class DeletePortfolioComponent implements OnInit {
  portfolioId: number = 0;
  portfolio: Portfolio = {};

  constructor( 
    private route: ActivatedRoute,
    private consultantService: PortfolioService,
    private router: Router ,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.portfolioId = +params['id']; // Récupérer l'ID du consultant depuis l'URL
      this.getPortfolio(this.portfolioId); // Charger les détails du consultant
     // this.isDeleted =true ;
    });
  }
  getPortfolio(portfolioId: number): void {
    this.consultantService.getPortfolio(portfolioId).subscribe(
      (data: Portfolio) => {
        this.portfolio = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching portfolio:', error);
      }
    );
  }
  isDeleted: Boolean = false ;

  deletePortfolio(): void {
    
    this.consultantService.removePortfolio(this.portfolioId).subscribe(
      () => {
        console.log('Consultant deleted successfully.');
        this.isDeleted = true;
        this.router.navigate(['/portfolio']); // Rediriger vers la liste des consultants après la suppression
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting portfolio:', error);
        // Ajoutez ici la logique pour gérer l'erreur, comme afficher un message à l'utilisateur.
      }
    );
  }

}
