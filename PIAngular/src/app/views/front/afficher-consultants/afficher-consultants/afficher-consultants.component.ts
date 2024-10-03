import { Component, OnInit } from '@angular/core';
import { Consultant } from 'src/app/models/consultant';
import { ConsultantService } from 'src/app/services/consultant.service';

@Component({
  selector: 'app-afficher-consultants',
 // standalone: true,
 // imports: [],
  templateUrl: './afficher-consultants.component.html',
  styleUrls: ['./afficher-consultants.component.css']
})
export class AfficherConsultantsComponent implements OnInit {
  consultants: Consultant[] = [];
  selectedSortParameter: string = 'consultant_id';
  showDetails: boolean = false; // Déclaration de la propriété showDetails

  constructor(private _consultantService: ConsultantService) {}

  ngOnInit(): void {
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
  hoverImage(event: MouseEvent) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.transform = 'scale(1.1)'; // Agrandissement de l'image à 110%
  }

  unhoverImage(event: MouseEvent) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.transform = 'scale(1)'; // Retour à la taille normale de l'image
 
  }
  parseSkillToNumber(skill: string): number {
    return parseInt(skill, 10);
  }
}
