import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { Prime } from 'src/app/models/prime';
import { PrimeService } from 'src/app/Services/prime.service';

@Component({
  selector: 'app-prime',
  templateUrl: './prime.component.html',
  styleUrls: ['./prime.component.css']
})
export class PrimeComponent {

  primes: Prime [] = [];
  user: any;
  filters = {
    keyword: ''
  }
  constructor(private _primeService: PrimeService,
              private _router: Router,
              private profileService: ProfileService){}
  ngOnInit() {
   
    this.profileService.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data)
    } ); 
    this.loadPrime();
    
  }

  filterPrimes(payrolls: Prime[]){
    return payrolls.filter((e) => {
      return e.prime_month?.toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }

  loadPrime(){
    this._primeService.getAll().subscribe(
      data=> this.primes = this.filterPrimes(data)
    )
  }

  deletePrime(id: number){
    this._primeService.deletePrime(id).subscribe(
      data => {
        this.loadPrime();
      }
    )
  }
}
