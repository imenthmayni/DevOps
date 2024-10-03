import { Component, OnInit } from '@angular/core';
import { ProductionService } from 'src/app/Services/production.service';
import { Production } from 'src/app/ModelsDHOUHA/Production';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
import * as Highcharts from 'highcharts';

Exporting(Highcharts);
ExportData(Highcharts);

@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.css']
})
export class DefectsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};  // Initialiser avec un objet vide

  constructor(private productionService: ProductionService) {}

  ngOnInit() {
    this.fetchProductionData();
  }

  fetchProductionData() {
    this.productionService.getAllProductions().subscribe((productions: Production[]) => {
      this.constructChartOptions(productions);
    });
  }

  constructChartOptions(productions: Production[]) {
    const categories = productions.map(prod => new Date(prod.startDate).toLocaleDateString());
    const downtimes = productions.map(prod => prod.productionStoppage);
    const defectives = productions.map(prod => prod.defectiveProducts);

    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Downtime and Defectives Correlation'
      },
      xAxis: {
        categories: categories
      },
      yAxis: [{
        title: {
          text: 'Downtime (Days)'
        },
        // L'axe de 'Downtime' reste à gauche, donc 'opposite' n'est pas nécessaire ici
      }, {
        title: {
          text: 'Defective Products (Count)',
        },
        opposite: true  // Cet axe sera placé sur le côté droit du graphique
      }],
      
      series: [{
        name: 'Downtime',
        data: downtimes,
        type: 'area',
        color: '#119411',
        fillOpacity: 0.5,
        yAxis: 0
      }, {
        name: 'Defective Products',
        data: defectives,
        type: 'area',
        color: '#3abad6',
        fillOpacity: 0.5,
        yAxis: 1
      }],
      exporting: {  // Configuration de l'exportation comme décrit ci-dessus
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: [
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG',
              'separator',
              'downloadCSV',
              'downloadXLS'
            ]
          }
        },
        filename: 'Downtime-and-Defective-Products-Report',
        chartOptions: {
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true
              }
            }
          }
        }
      }
    };
    
    Highcharts.chart('defectsChartContainer', this.chartOptions);
  }
}
