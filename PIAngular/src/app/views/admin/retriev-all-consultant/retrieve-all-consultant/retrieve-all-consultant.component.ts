import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { Consultant } from 'src/app/models/consultant';
import { ConsultantService } from 'src/app/services/consultant.service';

@Component({
  selector: 'app-retrieve-all-consultant',
  templateUrl: './retrieve-all-consultant.component.html',
  styleUrls: ['./retrieve-all-consultant.component.css']
})
export class RetrieveAllConsultantComponent implements OnInit {
  consultants: Consultant[] = [];
  selectedSortParameter: string = 'consultant_id';
  user: any;

  constructor(private _consultantService: ConsultantService ,private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data)
    } );
    this.loadSortedConsultants(); // Chargez les consultants triés lors de l'initialisation du composant
  }

  loadSortedConsultants(): void {
    this._consultantService.getSortedConsultants(this.selectedSortParameter).subscribe(
      (data) => {
        this.consultants = data; // Mettez à jour la liste des consultants avec les données triées récupérées du service
      },
      (error) => {
        console.error('Erreur lors du chargement des consultants triés :', error);
        // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
      }
    );
  }
  onSortParameterChange(): void {
    this.loadSortedConsultants(); // Rechargez les consultants triés lorsque le paramètre de tri change
  }
  

  supprimerConsultant(id: number): void {
    this._consultantService.removeConsultant(id).subscribe(
      () => {
        console.log('Consultant supprimé avec succès');
        this.loadSortedConsultants(); // Rechargez la liste des consultants après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression du consultant :', error);
        // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
      }
    );
  }
}
