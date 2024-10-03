import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import { ProductionService } from 'src/app/Services/production.service';

More(Highcharts);

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private productionService: ProductionService) {}

  ngOnInit() {
    this.fetchAllProductionsMetrics();
  }

  fetchAllProductionsMetrics() {
    this.productionService.getAllProductions().subscribe(productions => {
      const chartData = productions.map(production => {
        const totalCost = production.laborCost + production.rawMaterialCost + production.machineMaintenanceCost;
        return this.productionService.getProductionYieldRate(production.productionId)
          .toPromise()
          .then(yieldRate => ({
            x: totalCost,
            y: yieldRate,
            z: production.totalProducts,
            name: `Production ${production.productionId}`
          }));
      });

      Promise.all(chartData).then(completeData => {
        this.updateChart(completeData);
      });
    });
  }

  updateChart(data: any[]) {
    const colors = ['#50B432', '#FF00FF', '#DDDF00', '#24CBE5', '#64E572', 
    '#FF9655', '#cfa0e9', '#6AF9C4', '#058DC7', '#FF00FF'];

    const completeData = data.map((point, index) => ({
      x: point.x,
      y: point.y,
      z: point.z,
      name: point.name,
      color: colors[index % colors.length],
    }));

    this.chartOptions = {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1
      },
      title: {
        text: 'Total Cost vs. Yield Rate per Production'
      },
      caption: {
        text: 'Chaque bulle représente une unité de production. La taille de la bulle est proportionnelle à la quantité produite.'
      },
      xAxis: {
        title: { text: 'Total Cost' }
      },
      yAxis: {
        title: { text: 'Yield Rate (%)' }
      },
      plotOptions: {
        bubble: {
          minSize: '5%',
          maxSize: '25%',
          zMin: 0,
          zMax: Math.max(...data.map(d => d.z))  // Set the maximum z value
        }
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
      '<tr><th>Cost:</th><td>{point.x}</td></tr>' +
      '<tr><th>Yield Rate:</th><td>{point.y:.2f}%</td></tr>' + 
      '<tr><th>Quantity Produced:</th><td>{point.z}</td></tr>',
        footerFormat: '</table>',
        followPointer: true
      },
      series: [{
        type: 'bubble',
        data: completeData
      }]
    };

    Highcharts.chart('bubbleChartContainer', this.chartOptions);
  }
}
