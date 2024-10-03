import { ProductService } from 'src/app/Services/product.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/ModelsDHOUHA/Product';

@Component({
  selector: 'app-pyramid-chart',
  templateUrl: './pyramid-chart.component.html',
  styleUrls: ['./pyramid-chart.component.css']
})
export class PyramidChartComponent implements OnInit {
@ViewChild('pyramidChart') pyramidChartRef!: ElementRef<HTMLCanvasElement>;
  chartInstance!: Chart;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getTop3MostLikedProducts();
  }

  getTop3MostLikedProducts(): void {
    this.productService.getTop3MostLikedProducts().subscribe(
      (products) => {
        // Utilisez forkJoin pour exécuter toutes les requêtes numberOfLikes en parallèle
        const likesRequests = products.map(product =>
          this.productService.numberOfLikes(product.productId!)
        );
        
        // Une fois que toutes les requêtes sont terminées, mettez à jour le graphique
        forkJoin(likesRequests).subscribe((likesArray) => {
          // Ici, likesArray contiendra le nombre de likes pour chaque produit dans le même ordre
          this.createPyramidChart(products, likesArray);
        });
      },
      (error) => {
        console.error('Error fetching top 3 most liked products:', error);
      }
    );
  }
  createPyramidChart(products: Product[], likesArray: number[]): void {
    const labels = products.map(p => p.title);
    // Utilisez likesArray pour le nombre de likes
    const data = likesArray; // Ici, nous avons déjà les nombres de likes
    
    
  this.chartInstance = new Chart(this.pyramidChartRef.nativeElement, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Likes',
        data: data,
        backgroundColor: 'rgba(156, 136, 248, 1)',
        borderColor: 'rgba(156, 136, 248, 2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(156, 136, 248, 0.5)' // Plus claire lors du survol
      }]
    },
    options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
              position: 'right',
          },
          title: {
              display: true,
              text: 'Top 3 Most Liked Products'
          }
        },
        scales: {
          x: {
              stacked: true,
              display: false
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
