import { Component } from '@angular/core';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, registerables, ChartType } from 'chart.js';
import { ProductService } from 'src/app/Services/product.service';
interface ProductTypeAveragePrice {
  type: string;
  averagePrice: number;
}
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  private barChart: Chart | undefined;

  constructor(private productService: ProductService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initBarChart();
  }

  initBarChart(): void {
    this.productService.getProductTypeAveragePrice().subscribe({
      next: (data: any[]) => {
        const labels = data.map((item: any) => item[0]);
        const averagePrices = data.map((item: any) => parseFloat(parseFloat(item[1]).toFixed(2)));

        // Couleurs pour les barres
        const colors = [
          'RGB( 151, 116, 244 )',  // Darker shade of purple
          'rgba(156, 136, 248, 1)', // Medium shade of purple
          'rgba(196, 184, 251, 1)', // Lighter shade of purple
        ];

        // Vous pouvez assigner une couleur à chaque barre ou utiliser un seul motif pour toutes les barres.
        const backgroundColors = colors; // Un tableau de couleurs, une pour chaque barre.
        const back =[
       
          'rgba(117, 91, 238, 0.7)',  // Moins d'opacité pour une nuance de violet plus claire
          'rgba(156, 136, 248, 0.7)', // Moins d'opacité pour une nuance de violet moyen plus claire
          'rgba(196, 184, 251, 0.7)',
        ];

        this.barChart = new Chart('barChart', {
          type: 'bar' as ChartType,
          data: {
            labels: labels,
            datasets: [{
              label: 'Average Price',
              data: averagePrices,
              backgroundColor: backgroundColors, // Utilisez les couleurs pour le fond des barres
              hoverBackgroundColor: back, // Utilisez les mêmes couleurs lors du survol
           
            }]
          },
          
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false, // Cachez la légende si vous n'en avez pas besoin
              },
              tooltip: {
                enabled: true, // Active les infobulles
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Average Price (TND)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Product Type'
                }
              }
            },
            animation: {
              easing: 'easeInOutQuad',
              duration: 1500 // Durée de l'animation
            },
          }
        });
      },
      error: (err) => console.error('Error fetching data: ', err),
    });
  }
  // calculateAveragePrice(prices: number[]): number {
  //   // Calculez la somme de tous les prix
  //   const total = prices.reduce((acc, price) => acc + price, 0);
  //   // Divisez par le nombre d'éléments pour obtenir la moyenne
  //   return total / prices.length;
  // }
}
