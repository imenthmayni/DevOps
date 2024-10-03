import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerTracking } from 'src/app/models/customer-tracking';
import { CustomerTrackingService } from 'src/app/services/customer-tracking.service';

@Component({
  selector: 'app-delete-customer-tracking',
  templateUrl: './delete-customer-tracking.component.html',
  styleUrls: ['./delete-customer-tracking.component.css']
})
export class DeleteCustomerTrackingComponent {
  history_id: number = 0;
  customerTracking: CustomerTracking = {};
  constructor( 
    private route: ActivatedRoute,
    private customerTrackingService: CustomerTrackingService,
    private router: Router ,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.history_id = +params['id']; // Récupérer l'ID du consultant depuis l'URL
      this.getCustomerTracking(this.history_id); // Charger les détails du consultant
    //  this.isDeleted =true ;
    });
  }

  getCustomerTracking(history_id: number): void {
    this.customerTrackingService.getCustomerTracking(history_id).subscribe(
      (data: CustomerTracking) => {
        this.customerTracking = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching consultant:', error);
      }
    );
  }

  isDeleted: Boolean = false ;

  deletecustomerTracking(): void {
    
    this.customerTrackingService.removeCustomerTracking(this.history_id).subscribe(
      () => {
        console.log('customerTracking deleted successfully.');
        //this.isDeleted = true;
        this.router.navigate(['/retrieveAllCustomerTracking']); // Rediriger vers la liste des consultants après la suppression
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting customerTracking:', error);
        // Ajoutez ici la logique pour gérer l'erreur, comme afficher un message à l'utilisateur.
      }
    );
  }
}