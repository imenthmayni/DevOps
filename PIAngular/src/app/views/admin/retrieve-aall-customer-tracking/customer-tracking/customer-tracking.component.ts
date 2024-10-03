import { Component, OnInit } from '@angular/core';
import { CustomerTracking } from 'src/app/models/customer-tracking';
import { CustomerTrackingService } from 'src/app/services/customer-tracking.service';

@Component({
  selector: 'app-customer-tracking',
  templateUrl: './customer-tracking.component.html',
  styleUrls: ['./customer-tracking.component.css']
})
export class CustomerTrackingComponent implements OnInit {

  customerTrackings : CustomerTracking[] =[];
constructor(private _customerTrackingService: CustomerTrackingService){}
ngOnInit(): void {
this._customerTrackingService.getAll().subscribe(
data=> this.customerTrackings = data
 )
}
 loadCustomerTrackings(): void {
  this._customerTrackingService.getAll().subscribe(
    (data) => {
      this.customerTrackings = data; 
    },
    (error) => {
      console.error('Erreur lors du chargement des customerTrackings :', error);
      // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
    }
  );
}
supprimerCustomerTracking(history_id: number): void {
  this._customerTrackingService.removeCustomerTracking(history_id).subscribe(
    () => {
      console.log('customer tracking supprimé avec succès');
      this.loadCustomerTrackings(); // Rechargez la liste des consultants après la suppression
    },
    (error) => {
      console.error('Erreur lors de la suppression du customer tracking :', error);
      // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
    }
  );
} 



} 






