import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/core/Models/candidate';
import { CandidateService } from 'src/app/core/Services/candidate.service';

@Component({
  selector: 'app-candidatedisplay',
  templateUrl: './candidatedisplay.component.html',
  styleUrls: ['./candidatedisplay.component.css']
})
export class CandidatedisplayComponent implements OnInit {
  candidates: Candidate[] = [];
  
  
  constructor(private candService: CandidateService, private router: Router , private http: HttpClient){}
  ngOnInit() {
    this.getAllCandidates();
  }
  getAllCandidates() {
    this.candService.getCandidates().subscribe(
      data => {
        this.candidates = data;
        console.log(this.candidates);
        
      },
      error => {
        console.error(error);
      }
    );
  }
  navigateToCandidateInfo(idCandidat: number): void {
    if (!isNaN(idCandidat)) {
      this.router.navigate(['/admin/candidateinfo', idCandidat.toString()]);
    } else {
      console.error('Invalid candidate ID:', idCandidat);
    }
  }
  
  
}

