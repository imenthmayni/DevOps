import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { BudgetService } from 'src/app/Services/budget.service';
import { NoteService } from 'src/app/Services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  constructor(private noteService: NoteService, private budgetService: BudgetService) { }
  histogramData: { [key: string]: number } = {}; reussi!: number;
  echec!: number;
  userNames: string[] = [];
  performanceData: any[] = [];
  ngOnInit(): void {
    this.fetchNoteOccurrences();
    this.fetchPerformanceData();
    this.fetchHistogramData();
  }




  fetchHistogramData(): void {
    this.budgetService.getBudgetVarianceHistogram().subscribe(
      data => {
        console.log(data);
        this.histogramData = {};

        data = new Map(Object.entries(data));

        data.forEach((value, key) => {
          this.histogramData[key] = value;
        });

        this.createChart1();
      },
      error => {
        console.error(error);
      }
    );
  }

  createChart1(): void {
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'bar'
      },
      xaxis: {
        categories: Object.keys(this.histogramData)
      },
      series: [{
        name: 'Occurrences',
        data: Object.values(this.histogramData)
      }]
    };

    const chart = new ApexCharts(document.querySelector("#budget-variance-chart"), options);
    chart.render();
  }

  fetchPerformanceData(): void {
    this.noteService.countUserOccurrencesForNote1().subscribe(data => {
      console.log('Result for Performance 1:', data);
      const processedData = this.processPerformanceData(data, 'Note 1');
      console.log('Processed data for Performance 1:', processedData);
  
    });

    this.noteService.countUserOccurrencesForNote3().subscribe(data => {
      console.log('Result for Performance 3:', data);
      const processedData = this.processPerformanceData(data, 'Note 3');
      console.log('Processed data for Performance 3:', processedData);
  
    });
  }












  fetchNoteOccurrences(): void {
    this.noteService.countNoteOccurrences().subscribe(
      data => {
        console.log(data);
  
        const seriesData = Object.keys(data).map(user => {
          // Extraire le nom d'utilisateur à partir de l'identifiant utilisateur
          const userName = this.extractUsername(user);
          return {
            name: userName,
            data: Object.values(data[user])
          };
        });
  
        this.createChart(seriesData);
      },
      error => {
        console.error(error);
      }
    );
  }
  
  extractUsername(identifier: string): string {
    // Vous pouvez implémenter votre logique pour extraire le nom d'utilisateur de l'identifiant ici
    // Par exemple, si l'identifiant est sous la forme "s.User@3bf653c1", vous pouvez extraire "User"
    // Cette logique dépend de la structure de vos identifiants utilisateur
    return identifier.substring(identifier.lastIndexOf('.') + 1);
  }
  
  
  createChart(seriesData: any[]): void {
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'bar'
      },
      xaxis: {
        categories: ['Note 1', 'Note 3']
      },
      series: seriesData
    };

    const chart = new ApexCharts(document.querySelector("#note-occurrences-chart"), options);
    chart.render();
  }
  processPerformanceData(data: any, performanceName: string): any[] {
    // Tableau pour stocker les données traitées
    const processedData: any[] = [];

    // Boucler à travers les données et convertir les identifiants utilisateur en noms d'utilisateur ou e-mails
    for (const userIdentifier in data) {
      if (data.hasOwnProperty(userIdentifier)) {
        // Extraire le nom d'utilisateur ou l'e-mail de l'identifiant utilisateur
        const userNameOrEmail = this.extractUsernameOrEmail(userIdentifier); // À adapter

        // Créer une entrée avec le nom d'utilisateur ou l'e-mail et le nombre correspondant
        const entry = {
          user: userNameOrEmail,
          count: data[userIdentifier],
          performance: performanceName
        };

        // Ajouter l'entrée au tableau des données traitées
        processedData.push(entry);
      }
    }

    return processedData;
  }

  extractUsernameOrEmail(identifier: string): string {
    // Implémentez la logique pour extraire le nom d'utilisateur ou l'e-mail de l'identifiant
    // Par exemple, si l'identifiant est sous la forme "tn.esprit.se.pispring.entities.User@a3c2ef2",
    // vous pouvez extraire le nom d'utilisateur ou l'e-mail de la partie après le dernier '.'
    const userNameOrEmail = identifier.substring(identifier.lastIndexOf('.') + 1); // À adapter
    return userNameOrEmail;
  }
}