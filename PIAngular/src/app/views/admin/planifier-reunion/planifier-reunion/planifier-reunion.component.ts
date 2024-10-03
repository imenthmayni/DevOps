// planifier-reunion/planifier-reunion.component.ts
import { Component,Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
//import TimeGridPlugin from '@fullcalendar/timegrid'; // Importez le plugin TimeGrid
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { MeetService } from 'src/app/Services/meet.service';
import { ActivatedRoute } from '@angular/router';
import { ConsultantService } from 'src/app/services/consultant.service';
import { Chart ,ChartType, ChartOptions } from 'chart.js';
import { Consultant } from 'src/app/models/consultant';
interface MonthData {
  totalMeetings: number;
  PassedTotal: number;
  canceledMeetings: number;
};

@Component({
  selector: 'app-planifier-reunion',
  templateUrl: './planifier-reunion.component.html',
  styleUrls: ['./planifier-reunion.component.css']
})
export class PlanifierReunionComponent implements OnInit {

  //@ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    eventContent: this.customizeEventContent.bind(this),
    editable: false,
    selectable: true,
    dateClick: this.handleDateClick.bind(this),

  }; 
  removedMonths: string[] = [];
  disableAddMonthButton: boolean = false; // Déclaration et initialisation de la propriété disableAddMonthButton
  disableRemoveMonthButton: boolean = false;
   calendarEvents: any[] = [];
  consultantId: number = 0;
  selectedMeetings: any[] = [];
  showMeetingTable: boolean = false;
  validationSuccess: boolean = false;
  annulationSuccess: boolean = false;
  affectationSuccess: boolean = false;
  stats: any;
  consultant: Consultant | undefined;//chart 
  consultantsData: any = {};
@ViewChild('chart') chartElement !: ElementRef;

@ViewChild('initialChart') private initialChartRef!: ElementRef;
@ViewChild('barChart') barChart !: ElementRef;
@ViewChild('chart2') chart2!: ElementRef;
@ViewChild('chart3') chart3!: ElementRef;
@ViewChild('chart4') chart4!: ElementRef;


chart: Chart | null = null;
initialChart: any;
passedMeetingsChart: any;
firstMeetingsChart: any;
public chartData: any[] = [];
removedMonthsData: { [month: string]: MonthData } = {};

public data: any;

  


  constructor(private meetingService: MeetService, private consultantService : ConsultantService, private renderer: Renderer2,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      // Récupérer l'ID du consultant depuis les paramètres de la route
      this.consultantId = Number(params.get('id')); // Utilisez le bon nom du paramètre
      
      // Afficher l'ID du portfolio dans la console pour le débogage
      console.log('ID du consultant extrait des paramètres de la route :', this.consultantId);
      
    });
    this.consultantService.getConsultantsStatistics().subscribe((data: any) => { // Définissez le type des données
      this.consultantsData = data;
      this.createBarChart();
    });
    this.consultantService.getConsultant(this.consultantId).subscribe(data => {
      this.displayChart(data);
    });
    this.meetingService.fetchMonthlyMeetingStats(this.consultantId).subscribe((response: Map<String, Map<String, number>>) => {
      this.data = this.prepareChartData(response);
      this.createChart();
    });
    this.meetingService.fetchMonthlyMeetingStats(this.consultantId).subscribe((response: Map<String, Map<String, number>>) => {
      this.data = this.prepareeChartData(response);
      this.createeChart();
    });
    this.meetingService.fetchMonthlyMeetingStats(this.consultantId).subscribe((response: Map<String, Map<String, number>>) => {
      this.data = this.prepareeeChartData(response);
      this.createeeChart();
    });
    

    this.loadMeetings();
  
  }
  
  
  /* createPassedMeetingsChart(data: any) {
    throw new Error('Method not implemented.');
  } */

  loadMeetings(): void {
    this.meetingService.retrieveMeetings(this.consultantId).subscribe(
      meetings => {
        this.calendarEvents = meetings.map(meeting => ({
          date: meeting.meettdate, // Assurez-vous d'avoir ces propriétés dans votre modèle de réunion
          color: this.getEventColor(meeting.meetStatus) ,// Déterminez la couleur en fonction du statut de la réunion
          meetId: meeting.meetId ,
          heure:meeting.heure , 
          statuss : meeting.meetStatus,
          first : meeting.first  , 
          duree : meeting.dureeReunion 
          }));
      },
      error => {
        console.error('Failed to load meetings:', error);
      }
    );
  }
 
  
  customizeEventContent(arg: any) {
    const eventColor = this.getEventColor(arg.event.extendedProps.status);
  
    // Créer un élément pour représenter l'événement sous forme de cercle coloré
    const eventCircle = document.createElement('div');
    eventCircle.classList.add('event-circle');
    eventCircle.style.backgroundColor = eventColor;
  
    // Retourner l'élément personnalisé
    return { domNodes: [eventCircle] };
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
      case 'SUCCEDED':
        return 'pink';
      case 'CANCELED':
        return 'red';
      default:
        return 'green';
    }
  }
  handleDateClick(arg: any) {
    const clickedDate: Date = arg.date;
    const datePart: string = clickedDate.toISOString().split('T')[0];
   
    // Filtrer les meetings pour trouver ceux qui correspondent à la date cliquée
    const meetingsOnClickedDate = this.calendarEvents.filter(event => {
       // Convertir le timestamp en Date
       const eventDate = new Date(event.date);
       const eventDatePart = eventDate.toISOString().split('T')[0];
       return eventDatePart === datePart;
    });
   
     console.log('Calendar Events:', this.calendarEvents);

    // Afficher les informations des meetings dans une barre ou un autre élément
    // Vous pouvez utiliser un service ou une variable pour gérer l'affichage
    console.log('Meetings on clicked date:', meetingsOnClickedDate);
    this.selectedMeetings = meetingsOnClickedDate;

   }
   toggleMeetingTable(): void {
    this.showMeetingTable = !this.showMeetingTable;
 }
 
 
closeMeetingTable(): void {
  this.showMeetingTable = false;
 }
 validerMeeting(meetId: number): void {
  this.meetingService.validerMeeting(meetId).subscribe(
     response => {
       console.log('Réunion validée avec succès');
       this.loadMeetings();
       this.validationSuccess = true;
       setTimeout(() => {
         this.validationSuccess = false;
       }, 3000);
     },
     error => {
       console.error('Erreur lors de la validation de la réunion:', error);
     }
  );
 }
 
 annulerMeet(meetId: number): void {
  this.meetingService.annulerMeet(meetId).subscribe(
     response => {
       console.log('Réunion annulée avec succès');
       this.loadMeetings();
       this.annulationSuccess = true; // Mettre à jour la variable pour l'annulation
       setTimeout(() => {
         this.annulationSuccess = false;
       }, 3000);
       this.loadMeetings();

     },
     error => {
       console.error('Erreur lors de l\'annulation de la réunion:', error);
     }
  );
 }
 affecter(meetId: number): void {
  this.meetingService.affecter(meetId).subscribe(
     response => {
       console.log('user affecté avec succès');
       this.loadMeetings();
       this.affectationSuccess = true; // Mettre à jour la variable pour l'annulation
       setTimeout(() => {
         this.affectationSuccess = false;
       }, 3000);
       this.loadMeetings();

     },
     error => {
       console.error('Erreur lors de l\'affectation de user:', error);
     }
  );
 }
 
 private prepareeeChartData(response: any): any {
  // Vérifiez si response est un objet
  console.log('Clés de l\'objet response:', Object.keys(response));

  if (typeof response === 'object' && response!== null) {
    const labels = Object.keys(response);
    const datasets = [
    
      {
        label: 'Succeeded Meetings ',
        data: labels.map(label => response[label]?.succeededMeetings?? 0),
        barPercentage: 0.5, // 50% de la largeur du canvas
        categoryPercentage: 0.5, // 50% de la largeur du canvas
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true
      },
      {
        label: ' Failed Meeting',
        data: labels.map(label => response[label]?.PASSEDMeetingFailed?? 0),
        barPercentage: 0.5, // 50% de la largeur du canvas
        categoryPercentage: 0.5, // 50% de la largeur du canvas
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 1)',
        fill: true
      }
    ];
    
    console.log('Data for mars:', response['mars']);

    return {
    
      labels: labels,
      datasets: datasets
      
    };
  } else {
    // Gérer le cas où response n'est pas un objet
    console.error('La réponse reçue n\'est pas un objet:', response);
    return {}; // Retourner un objet vide ou une structure de données alternative
  }
}

 private prepareeChartData(response: any): any {
  // Vérifiez si response est un objet
  console.log('Clés de l\'objet response:', Object.keys(response));

  if (typeof response === 'object' && response!== null) {
    const labels = Object.keys(response);
    const datasets = [
    
      {
        label: 'Passed Nouveau',
        data: labels.map(label => response[label]?.PASSEDNOUVEAU?? 0),
        barPercentage: 0.5, // 50% de la largeur du canvas
        categoryPercentage: 0.5, // 50% de la largeur du canvas
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true
      },
      {
        label: ' MeetingAncienClient',
        data: labels.map(label => response[label]?.MeetingAncienClient?? 0),
        barPercentage: 0.5, // 50% de la largeur du canvas
        categoryPercentage: 0.5, // 50% de la largeur du canvas
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 1)',
        fill: true
      }
    ];
    
    console.log('Data for mai:', response['mai']);

    return {
    
      labels: labels,
      datasets: datasets
      
    };
  } else {
    // Gérer le cas où response n'est pas un objet
    console.error('La réponse reçue n\'est pas un objet:', response);
    return {}; // Retourner un objet vide ou une structure de données alternative
  }
}

 
 private prepareChartData(response: any): any {
  // Vérifiez si response est un objet
  console.log('Clés de l\'objet response:', Object.keys(response));

  if (typeof response === 'object' && response!== null) {
    const labels = Object.keys(response);
    const datasets = [
      {
        label: 'Total Meetings',
        data: labels.map(label => response[label]?.totalMeetings?? 0),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      },
      {
        label: 'Passed Total',
        data: labels.map(label => response[label]?.PassedTotal?? 0),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true
      },
      {
        label: 'Canceled Meetings',
        data: labels.map(label => response[label]?.canceledMeetings?? 0),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 1)',
        fill: true
      }
    ];
    
    console.log('Data for February:', response['févr.']);

    return {
    
      labels: labels,
      datasets: datasets
      
    };
  } else {
    // Gérer le cas où response n'est pas un objet
    console.error('La réponse reçue n\'est pas un objet:', response);
    return {}; // Retourner un objet vide ou une structure de données alternative
  }
}

createeeChart(): void {
  if (this.chart4 && this.chart4.nativeElement) {
    const ctx = this.chart4.nativeElement.getContext('2d');
    if (ctx) {
      // Définir le délai d'animation
      const animationDelay = 1000; // 1000 millisecondes = 1 seconde

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Passed Meeting '
            },
            tooltip: {
              mode: 'index'
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: true
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              beginAtZero: true,
              stacked: true,
              title: {
                display: true,
                text: 'Value'
              },
              ticks: {
                stepSize: 1,
                callback: function(value, index, values) {
                  // Affiche les valeurs nulles comme "0"
                  return value === 0? '0' : value;
                }
              }
            }
          },
          animation: {
            duration: 1000, // Durée de l'animation en millisecondes
            delay: animationDelay, // Délai avant le début de l'animation
          }
        }
      });
    }
  }
}
createeChart(): void {
  if (this.chart3 && this.chart3.nativeElement) {
    const ctx = this.chart3.nativeElement.getContext('2d');
    if (ctx) {
      // Définir le délai d'animation
      const animationDelay = 1000; // 1000 millisecondes = 1 seconde

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Passed Meeting '
            },
            tooltip: {
              mode: 'index'
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: true
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              beginAtZero: true,
              stacked: true,
              title: {
                display: true,
                text: 'Value'
              },
              ticks: {
                stepSize: 1,
                callback: function(value, index, values) {
                  // Affiche les valeurs nulles comme "0"
                  return value === 0? '0' : value;
                }
              }
            }
          },
          animation: {
            duration: 1000, // Durée de l'animation en millisecondes
            delay: animationDelay, // Délai avant le début de l'animation
          }
        }
      });
    }
  }
}

 createChart(): void {
  if (this.chartElement && this.chartElement.nativeElement) {
    const ctx = this.chartElement.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Meeting Stats'
            },
            tooltip: {
              mode: 'index'
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: true
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              beginAtZero: true,
              stacked: false,
              title: {
                display: true,
                text: 'Value'
              },
              ticks: {
               // beginAtZero: true,
                stepSize: 1,
                callback: function(value, index, values) {
                  // Affiche les valeurs nulles comme "0"
                  return value === 0? '0' : value;
                }
              }
            }
          }
        }
      });
    }
  }
}


// Fonction pour ajouter un mois
/*addMonth(): void {
  // Vérifier si le nombre de mois affichés est inférieur à 5 et s'il y a au moins un mois précédemment éliminé
  if (this.data.labels.length < 5 && Object.keys(this.removedMonthsData).length > 0) {
    // Récupérer le premier mois éliminé
    const firstRemovedMonth = Object.keys(this.removedMonthsData)[0];

    // Vérifier si firstRemovedMonth est défini pour éviter les erreurs potentielles
    if (firstRemovedMonth !== undefined) {
      // Ajouter le premier mois éliminé au début de la liste des labels
      this.data.labels.unshift(firstRemovedMonth);

      // Charger les données correspondantes à partir de removedMonthsData et les insérer dans le dataset approprié
      const newData = this.removedMonthsData[firstRemovedMonth];
      this.data.datasets.forEach((dataset: any) => {
        // Utilisez les propriétés définies dans l'interface MonthData
        const labelKey = dataset.label.toLowerCase();
        if (labelKey in newData && newData[labelKey] !== undefined) {
          // Insérer les données au début du dataset
          dataset.data.unshift(newData[labelKey]);
        }
      });

      // Mettre à jour le graphique avec les nouvelles données
      if (this.chart) {
        this.chart.update();
      }

      // Supprimer le mois de removedMonthsData une fois qu'il est ajouté
      delete this.removedMonthsData[firstRemovedMonth];

      // Si le nombre de mois affichés atteint maintenant 5, désactiver le bouton d'ajout de mois
      if (this.data.labels.length === 5) {
        this.disableAddMonthButton = true;
      }

      // Activer le bouton de suppression de mois si ce n'était pas déjà le cas
      this.disableRemoveMonthButton = false;
    }
  }
}*/

removeMonth(): void {
  if (this.data.labels.length > 3) {
    const removedMonth = this.data.labels.shift(); // Retirez le premier mois des labels

    // Stockez les données du mois supprimé
    this.removedMonthsData[removedMonth] = {
      totalMeetings: this.data.datasets[0].data.shift(),
      PassedTotal: this.data.datasets[1].data.shift(),
      canceledMeetings: this.data.datasets[2].data.shift()
    };

    // Mettre à jour le graphique avec les nouvelles données
    if (this.chart) {
      this.chart.update();
    }

    // Si le nombre de mois affichés est maintenant de 3, désactiver le bouton de suppression de mois
    if (this.data.labels.length === 3) {
      this.disableRemoveMonthButton = true;
    }

    // Activer le bouton d'ajout de mois si ce n'était pas déjà le cas
    this.disableAddMonthButton = false;
  }
}

displayChart(data: any) {
  // Assurez-vous que les données nécessaires sont présentes
  if (!data.nbrCanceledMeet ||!data.nbrPassedMeet ||!data.nbrAffectation ||!data.nbrMeet ||!data.nbrFirstMeet) {
    console.error('Missing data for chart');
    this.chartElement.nativeElement.style.height = '300px'; // Hauteur du graphique
    this.chartElement.nativeElement.style.width = '400px'; // Largeur du graphique

    return;
  }

  // Utilisation de setTimeout pour attendre que le DOM soit complètement rendu
  setTimeout(() => {

    const ctx = this.chart2.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    new Chart(ctx, {
      type: 'polarArea',
      data: {
        datasets: [{
          data: [
            data.nbrCanceledMeet,
            data.nbrPassedMeet,
            data.nbrAffectation,
            data.nbrMeet,
            data.nbrFirstMeet
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }],
        labels: ['Canceled Meetings', 'Passed Meetings', 'Affectation', 'Meetings', 'First Meetings']
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          }
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        onClick: function(event, elements) {
          if (elements.length > 0) {
            const index = elements[0].index;
            const label = data.labels[index];
            if (label === 'Passed Meetings') {
              //this.displayDelayChart(); // Appeler la nouvelle fonction
            }
          }
        }
      }
    });
  }, 0);
}

createBarChart(): void {
  const consultantNames = Object.keys(this.consultantsData);
  const consultantStatistics = Object.values(this.consultantsData);

  const ctx = document.getElementById('consultantChart') as HTMLCanvasElement;
  const consultantChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: consultantNames,
      datasets: [{
        label: 'Nombre de réunions passées',
        data: consultantStatistics.map((stats: any) => stats.nbrPassedMeet),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }, {
        label: 'Nombre de premières réunions',
        data: consultantStatistics.map((stats: any) => stats.nbrFirstMeet),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: 'Nombre d\'affectations',
        data: consultantStatistics.map((stats: any) => stats.nbrAffectation),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true,
          beginAtZero: true
        }
      }
    }
  });
}
}