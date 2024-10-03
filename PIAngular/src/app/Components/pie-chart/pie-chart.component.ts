import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ArcElement, Tooltip, Legend , registerables} from 'chart.js';
import { ProductService } from 'src/app/Services/product.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Command } from 'src/app/ModelsDHOUHA/Command';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  commands: Command[] = [];

  constructor(private productService: ProductService) {
    // Register the necessary Chart.js components and the DataLabels plugin
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {
    this.getCommands();

    this.productService.getProductTypesCount().subscribe(data => {
      const labels = data.map(item => item.type);
      const counts = data.map(item => item.count);
      const chart = new Chart('donutCanvas', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            // Here are the changes for a monochrome palette of purple
            backgroundColor: [
              'rgba(117, 91, 238, 1)',  // Darker shade of purple
              'rgba(156, 136, 248, 1)', // Medium shade of purple
              'rgba(196, 184, 251, 1)', // Lighter shade of purple
            ],
            borderColor: 'white',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            datalabels: {
              color: '#ffffff',
              formatter: (value, ctx) => {
                let sum = 0;
                const dataArr = ctx.chart.data.datasets[0].data;
                dataArr.forEach(data => {
                  if (typeof data === 'number') {
                    sum += data;
                  }
                });
                const percentage = ((value as number) * 100 / sum).toFixed(2) + "%";
                return percentage;
              },
              anchor: 'end',
              align: 'start',
              offset: 10,
            }
          }
        },
      });
    });    
  }
  getTotalOrders(commands: Command[]): number {
    return commands.length;
  }
  
  getCommands(): void {
    this.productService.getCommands().subscribe(
      (commands) => {
        console.log(commands); // Ceci devrait afficher deux commandes dans la console
        this.commands = commands;
        const totalOrders = this.getTotalOrders(commands);
        console.log('Total orders:', totalOrders);
      },
      (error) => {
        console.error('Error fetching commands:', error);
      }
    );
  }
  deleteCommand(commandId: number): void {
    this.productService.deleteCommand(commandId).subscribe(
      () => {
        console.log(`Commande avec l'ID ${commandId} supprimée avec succès.`);
      },
      (error) => {
        console.error(`Une erreur s'est produite lors de la suppression de la commande avec l'ID ${commandId}.`, error);
      }
    );
  }
}


