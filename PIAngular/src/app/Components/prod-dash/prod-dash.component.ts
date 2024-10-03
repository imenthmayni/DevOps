import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Production } from 'src/app/ModelsDHOUHA/Production';
import { ProductionService } from 'src/app/Services/production.service';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prod-dash',
  templateUrl: './prod-dash.component.html',
  styleUrls: ['./prod-dash.component.css']
})
export class ProdDashComponent implements OnInit, AfterViewInit {
  production: Production | undefined;
  quality: number = 0;
  availability: number = 0;
  performance: number = 0;
  oee: number = 0; // Ajoutez cette ligne pour déclarer la propriété oee
  totalProductionTimeDays: number = 0;
 
  chartInitialized: boolean = false;
  maxYAxis: number = 100; // Initial maximum value for y-axis
  productions: Production[] = []; // Ajoutez cette ligne pour déclarer la propriété productions
  yieldRate?: number;

  constructor(
    private route: ActivatedRoute,
    private productionService: ProductionService,

  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const prodId = Number(productId);
      this.getProductionDetails(prodId);
      this.getTotalProductionTimeDays(prodId);
      this.loadYieldRate(prodId); // Make sure this is called here with the correct ID
    }
}
  ngAfterViewInit(): void {
    if (this.production && this.chartInitialized) {
      this.renderChart();
    }
  }

  getProductionDetails(productionId: number): void {
    this.productionService.getProductionById(productionId).subscribe({
      next: (production: Production) => {
        this.production = production;
        this.fetchAdditionalMetrics(productionId);
        this.loadYieldRate(productionId); 
      },
      error: (error) => {
        console.error('Error loading production:', error);
      }
    });
  }

  fetchAdditionalMetrics(productionId: number): void {
    this.productionService.calculateQuality(productionId).subscribe(quality => {
      this.quality = quality * 100; 
      if (this.quality > this.maxYAxis) {
        this.maxYAxis = this.quality; // Update maximum value for y-axis
      }
      if (this.availability !== 0 && this.performance !== 0 && this.oee !== 0) {
        this.chartInitialized = true;
        this.renderChart();
      }
    });
    this.productionService.calculateAvailability(productionId).subscribe(availability => {
      this.availability = availability * 100; 
      if (this.availability > this.maxYAxis) {
        this.maxYAxis = this.availability; // Update maximum value for y-axis
      }
      if (this.quality !== 0 && this.performance !== 0 && this.oee !== 0) {
        this.chartInitialized = true;
        this.renderChart();
      }
    });
    this.productionService.calculatePerformance(productionId).subscribe(performance => {
      this.performance = performance * 100; 
      if (this.performance > this.maxYAxis) {
        this.maxYAxis = this.performance; // Update maximum value for y-axis
      }
      if (this.quality !== 0 && this.availability !== 0 && this.oee !== 0) {
        this.chartInitialized = true;
        this.renderChart();
      }
    });
    this.productionService.calculateOEE(productionId).subscribe(oee => {
      this.oee = oee;
      if (this.performance > this.maxYAxis) {
        this.maxYAxis = this.performance; // Update maximum value for y-axis
      }
      if (this.quality !== 0 && this.availability !== 0 && this.performance !== 0) {
        this.chartInitialized = true;
        this.renderChart();
      }    });
    
  }

  renderChart(): void {
    const container = document.getElementById('container');
    if (container) {
      Highcharts.chart(container, {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Production Metrics Comparison'
        },
        xAxis: {
          categories: ['Quality', 'Availability', 'Performance', 'OEE']
        },
        yAxis: {
          title: {
            text: 'Percentage (%)'
          },
          max: this.maxYAxis // Set maximum value for y-axis dynamically
        },
        colors: ['#80d0d0', '#28a745', '#dc3545', '#007bff'], // Specify custom colors
        series: [{
          name: 'Metrics',
          data: [this.quality, this.availability, this.performance, this.oee]
        }]
      } as Highcharts.Options);
    } else {
      console.error('Container element not found');
    }
  }
  getTotalProductionTimeDays(productionId: number): void {
    this.productionService.getTotalProductionTimeDays(productionId).subscribe(
      totalProductionTimeDays => {
        this.totalProductionTimeDays = totalProductionTimeDays;
      },
      error => {
        console.error('Erreur lors de la récupération du temps de production total en jours :', error);
      }
    );
  }
  loadYieldRate(productionId: number) {
    console.log('Loading Yield Rate for ID:', productionId); // Debugging line
    if (productionId) {
      this.productionService.getProductionYieldRate(productionId).subscribe({
        next: (rate) => {
          console.log('Yield Rate:', rate); // Debugging line
          this.yieldRate = rate;
        },
        error: (error) => {
          console.error('Error retrieving yield rate:', error);
        }
      });
    } else {
      console.error('Invalid production ID.');
    }
  

  }
}
