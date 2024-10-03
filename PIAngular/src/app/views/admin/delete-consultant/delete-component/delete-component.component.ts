import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from 'src/app/models/consultant';
import { ConsultantService } from 'src/app/services/consultant.service';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.css']
})
export class DeleteComponentComponent implements OnInit  {
  consultantId: number = 0;
  consultant: Consultant = {};
 // consultantForm!:FormGroup;
  //showSuccessAlert: boolean = false;
  //newconsultant!:Consultant;


  constructor( 
    private route: ActivatedRoute,
    private consultantService: ConsultantService,
    private router: Router ,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.consultantId = +params['id']; // Récupérer l'ID du consultant depuis l'URL
      this.getConsultant(this.consultantId); // Charger les détails du consultant
    //  this.isDeleted =true ;
    });
  }
  getConsultant(consultantId: number): void {
    this.consultantService.getConsultant(consultantId).subscribe(
      (data: Consultant) => {
        this.consultant = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching consultant:', error);
      }
    );
  }
  

  isDeleted: Boolean = false ;

  deleteConsultant(): void {
    
    this.consultantService.removeConsultant(this.consultantId).subscribe(
      () => {
        console.log('Consultant deleted successfully.');
        this.isDeleted = true;
        this.router.navigate(['/retrieveConsultant']); // Rediriger vers la liste des consultants après la suppression
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting consultant:', error);
        // Ajoutez ici la logique pour gérer l'erreur, comme afficher un message à l'utilisateur.
      }
    );
  }
}