import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recruitment } from 'src/app/core/Models/recruitment';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-recruitdisplay',
  templateUrl: './recruitdisplay.component.html',
  styleUrls: ['./recruitdisplay.component.css']
})
export class RecruitdisplayComponent implements OnInit {
  recs: Recruitment[] = [];
  


  constructor(private recService: RecruitmentService, private router: Router , private http: HttpClient){}
  ngOnInit() {
    this.getAllRecs();
    
    
  }
  
  getAllRecs() {
    this.recService.getRecruitments().subscribe(
      data => {
        this.recs = data;
        console.log(this.recs);
        
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteRec(offerId: number) {
  const confirmDelete = window.confirm('Are you sure you want to delete this recruitment?');

  if (confirmDelete) {
    this.recService.deleteRec(offerId).subscribe(
      () => {
        this.getAllRecs();
      },
      error => {
        console.error('Error deleting recruitment:', error);
      }
    );
  }
}

  navigateToAddRec() {
    this.router.navigate(['/ajoutRec']);
  
  }
  navigateToRStats() {
    this.router.navigate(['/statj']);
  
  }
  goBack() {
    this.router.navigate(['/admin/candisplay']);
  }
}



