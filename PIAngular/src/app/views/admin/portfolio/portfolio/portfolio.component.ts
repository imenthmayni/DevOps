import { Component } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
portfolios : Portfolio[] =[] ;
constructor(private _portfolioService: PortfolioService){}
ngOnInit(): void {
  this._portfolioService.getAll().subscribe(
  data=> this.portfolios = data
   )
  }  
  
}
