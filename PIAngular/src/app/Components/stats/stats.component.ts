import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Production } from 'src/app/ModelsDHOUHA/Production';
import { ProductionService } from 'src/app/Services/production.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements AfterViewInit {
  private chart: Highcharts.Chart | undefined;

  constructor(private productionService: ProductionService) {}

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    this.productionService.getAllProductions().subscribe(data => {
      this.initChart(data);
    });
  }
  initChart(productions: Production[]) {
    const categories = productions.map(p => p.productionId.toString());
    const laborCosts = productions.map(p => p.laborCost);
    const rawMaterialCosts = productions.map(p => p.rawMaterialCost);
    const maintenanceCosts = productions.map(p => p.machineMaintenanceCost);
  
    // Calculate the average cost for line series, you can adjust this calculation as needed
    const averageCosts = productions.map(p => (p.laborCost + p.rawMaterialCost + p.machineMaintenanceCost) / 3);
  
    this.chart = Highcharts.chart('container', {
      chart: {
        type: 'column'    // Primary type is still column
      },
      title: {
        text: 'Production Costs'
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        type: 'logarithmic',
        title: { text: 'Costs (TDN)' }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          animation: {
            duration: 5000 // Durée en millisecondes
          }
        }
      },
      tooltip: {
        formatter: function () {
          return 'Cost Type: <b>' + this.series.name + '</b><br/>' +
                 'Production ID: <b>' + this.x + '</b><br/>' +
                 'Cost: <b>' + this.y?.toLocaleString() + 'TDN</b>';
        }
      },
      
      exporting: {
        enabled: true
      },
      
      colors: ['#87db86', '#1bc71b', '#149414'],  // Custom colors for each column series
      series: [{
        name: 'Labor Cost',
        data: laborCosts,
        type: 'column'
      }, {
        name: 'Raw Material Cost',
        data: rawMaterialCosts,
        type: 'column'
      }, {
        name: 'Machine Maintenance Cost',
        data: maintenanceCosts,
        type: 'column'
      }, {
        name: 'Average Cost',
        data: averageCosts,
        type: 'line',  // This series is a line chart
        color: '#EB6BEB', // Custom color for the line series
        marker: {
          enabled: true  // Enable markers if needed
        },
        zIndex: 5 // Ensure line is above columns
      },
    ]
    });
  }
  


}
