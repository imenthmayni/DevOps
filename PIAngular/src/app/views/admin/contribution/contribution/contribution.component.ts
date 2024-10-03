import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { Contribution } from 'src/app/models/contribution';
import { ContributionService } from 'src/app/Services/contribution.service';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent {

  contributions: Contribution [] = [];
  user: any;
  filters = {
    keyword: ''
  }
  constructor(private _contributionService: ContributionService,
              private _router: Router, 
              private profileService: ProfileService){}
  ngOnInit() {
    this.loadContribution();
    
      this.profileService.getUserProfile().subscribe (data => {
        this.user = data
        console.log("thes is the response",data)
      } ); 
    
  }

  filterContributions(payrolls: Contribution[]){
    return payrolls.filter((e) => {
      return e.contribution_month?.toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }

  loadContribution(){
    this._contributionService.getAll().subscribe(
      data=> this.contributions = this.filterContributions(data)
    )
  }

  deleteContribution(id: number){
    this._contributionService.deleteContribution(id).subscribe(
      data => {
        this.loadContribution();
      }
    )
  }

}
