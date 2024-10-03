import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { MeetService } from 'src/app/Services/meet.service';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { Meeting } from 'src/app/models/meeting';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-planification-meet',
  templateUrl: './planification-meet.component.html',
  styleUrls: ['./planification-meet.component.css']
})
export class PlanificationMeetComponent implements OnInit {
  meeting: Meeting = new Meeting();
  isPanelVisible: boolean = false;
  consultantId: number = 0;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    editable: false,
    selectable: true,
    dateClick: this.handleDateClick.bind(this),
  };
  user: any;
  userId : number =0; 
  calendarEvents: any[] = [];
  dates: string[] = [];
  pendingOrApprovedMeeting: Meeting | null = null; // Variable pour stocker la réunion approuvée ou en attente
  existingMeeting: Meeting | null = null; // Ajoutez cette ligne
  showMeetingButtons: boolean = false; // Déclaration de la propriété
  idMeet : number =0; 
  constructor(private meetingService: MeetService,
     private profileService : ProfileService ,
        private route: ActivatedRoute, private snackBar: MatSnackBar ,private http: HttpClient
) {    
}


  ngOnInit(): void {
    console.log('getUserProfile called');

  this.profileService.getUserProfile().subscribe(data => {
    this.user = data;
    console.log("The is the responsettt", data);

    // Déplacez cette ligne ici pour s'assurer que userId est défini après la réponse
    this.userId = this.user.id; 
    console.log('iduser est ', this.userId ) ; 

    // Maintenant que nous avons userId, nous pouvons charger les réunions
    this.loadMeetings();
    this.checkPendingOrApprovedMeeting();
  });

  this.route.paramMap.subscribe(params => {
    this.consultantId = Number(params.get('id'));
  });
}
  loadMeetings(): void {
    this.meetingService.getuserMeetings(this.userId)
    .subscribe((meetings: Meeting[]) => {
        console.log('Meetings reçues:', meetings); // Vérifiez la réponse
        if (meetings.length === 0) {
          console.log('Aucune réunion trouvée');
        } else {
          console.log('Réunions trouvées:', meetings);
           const idMeet = meetings[0].meetId ;
          console.log('idMeet de la première réunion:', idMeet);

        }
        this.calendarEvents = meetings.map((meeting: Meeting) => ({
          date: meeting.meettdate,
          color: this.getEventColor(meeting.meetStatus),
          meetingCount: 0 ,

         //idMeet: meeting.meetId // Assurez-vous que meetId est correctement assigné ici
        }));

      },
      error => {
        console.error('Erreur lors de la récupération des réunions:', error);
      }
    );
  }
  
  checkPendingOrApprovedMeeting(): void {
    this.meetingService.getuserMeetings(this.userId)
    .subscribe((meetings: Meeting[]) => { // Assurez-vous que le type est Meeting[]
        console.log('Meetings from service:', meetings);
        if (meetings.length > 0) {
          this.pendingOrApprovedMeeting = meetings[0]; // Prenez le premier meeting du tableau
          this.showMeetingButtons = false; // Si un meeting existe, ne montrez pas le bouton Planifier
        } else {
          this.pendingOrApprovedMeeting = null;
          this.showMeetingButtons = true; // Si aucun meeting n'existe, montrez le bouton Planifier
        }
        console.log('showMeetingButtons:', this.showMeetingButtons);
      });
  }
  
  
  handleDateClick(arg: any) {
    const clickedDate: Date = arg.date;
    const datePart: string = clickedDate.toISOString().split('T')[0];
    
    const existingMeeting = this.calendarEvents.find(event => {
      if (event.date instanceof Date) {
        return event.date.toISOString().split('T')[0] === datePart;
      }
      return false;
    });
    
    if (existingMeeting) {
      this.isPanelVisible = true;
      this.existingMeeting = existingMeeting;
      // Récupérer l'ID de la réunion à partir de l'événement du calendrier
      this.idMeet = existingMeeting.meetId;
      console.log('idMeet:', this.idMeet);
    } else {
      this.isPanelVisible = true;
      this.meeting = new Meeting();
      this.meeting.meettdate = clickedDate;
     
    }

  }
  

 onSubmit() {
  this.meetingService.planifierMeeting(this.meeting, this.consultantId, this.userId)
 .subscribe((meeting: Meeting) => {
      console.log('Meeting planifié avec succès :', meeting);
      this.meeting = new Meeting();
      this.isPanelVisible = false;
      this.loadMeetings(); // Recharger les réunions après la planification réussie

      // Afficher le Snackbar
      this.snackBar.open('Réunion planifiée avec succès!', 'Fermer', {
        duration: 3000, // Durée de l'affichage en millisecondes
      });
   }, error => {
      console.error('Erreur lors de la planification du meeting :', error);
   });
}


  getEventColor(status: string | undefined): string {
    if (!status) {
      return 'gray'; // Couleur par défaut si le statut est undefined
    }
    switch (status) {
      case 'PENDING':
        return 'blue';
      case 'APPROVED':
        return 'green';
      case 'REFUSED':
        return 'red';
      case 'CANCELED':
        return 'gray';
      default:
        return 'gray';
    }
  }


  closePanel() {
    this.isPanelVisible = false;
  }

  /*annulerReunion(idMeet: number): void {
    this.meetingService.annulerMeet(idMeet).subscribe({
      next: () => {
        console.log('Réunion annulée avec succès');
        // Après l'annulation, vous pouvez vouloir recharger les données
        this.loadMeetings();
        
      },
      error: (error) => {
        console.error('Erreur lors de l\'annulation de la réunion:', error);
      }
    });
  }*/
  annulerMeet(idMeet: number): void {
    this.meetingService.annulerMeet(idMeet).subscribe(
      response => {
        // Gérer la réponse du backend si nécessaire
        console.log('Meeting annulé avec succès', response);
      },
      error => {
        // Gérer les erreurs
        console.error('Erreur lors de l\'annulation de la réunion', error);
      }
    );
  }

  
  mettreAJourReunion(idMeet: number, updatedMeeting: Meeting): void {
    this.meetingService.updateMeeting(idMeet, updatedMeeting).subscribe({
      next: (updatedMeeting: Meeting) => {
        console.log('Réunion mise à jour avec succès:', updatedMeeting);
        // Après la mise à jour, vous pouvez vouloir recharger les données
        this.loadMeetings();
        this.snackBar.open('Réunion annulé avec succès!', 'Fermer', {
          duration: 3000, // Durée de l'affichage en millisecondes
        });
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la réunion:', error);
      }
    });
  }

 
 
}