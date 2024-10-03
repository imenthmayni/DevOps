import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { StockService } from 'src/app/Services/stock.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-stock-dash',
  templateUrl: './stock-dash.component.html',
  styleUrls: ['./stock-dash.component.css']
})
export class StockDashComponent implements OnInit {
constructor() { }

  ngOnInit(): void {
  }

  // renderBarChart() {
  //   Highcharts.chart('container', {
  //     chart: {
  //       type: 'bar'
  //     },
  //     title: {
  //       text: 'Consommation moyenne par produit'
  //     },
  //     xAxis: {
  //       categories: ['Produit A', 'Produit B', 'Produit C', 'Produit D', 'Produit E']
  //     },
  //     yAxis: {
  //       title: {
  //         text: 'Consommation moyenne'
  //       }
  //     },
  //     series: [{
  //       name: 'Consommation moyenne',
  //       data: [10, 7, 5, 8, 12]
  //     }]
  //   });
  // }
}
