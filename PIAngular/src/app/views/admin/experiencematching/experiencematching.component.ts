import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/core/Models/candidate';
import { CandidateService } from 'src/app/core/Services/candidate.service';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-experiencematching',
  templateUrl: './experiencematching.component.html',
  styleUrls: ['./experiencematching.component.css']
})
export class ExperiencematchingComponent implements OnInit {

  selectedCandidate: Candidate | undefined;
  selectedPostTitle: string | undefined;
  candidates: Candidate[] = [];
  postTitles: string[] = [];
  experienceMatching: number | undefined;
  offerId: number | null = null;

  constructor(
    private recruitmentService: RecruitmentService,
    private candidateService: CandidateService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const offerIdString: string | null = params['offerId'];
      if (offerIdString) {
        this.offerId = parseInt(offerIdString, 10);
      }
    });

    this.candidateService.getCandidates().subscribe((data: Candidate[]) => {
      this.candidates = data;
    });

    this.recruitmentService.getPostTitles().subscribe((data: string[]) => {
      this.postTitles = data;
    });
  }
/* 
  selectCandidate(firstName: string) {
    this.selectedCandidate = this.candidates.find(candidate => candidate.firstNameCand === firstName);
    if (this.selectedCandidate && this.offerId !== null) {
      this.calculateCompatibility(this.selectedCandidate.idCandidate);
    } else {
      console.error('Candidate not found or offer ID not available.');
    }
  }

  calculateCompatibility(idCandidate: number) {
    if (this.offerId !== null) {
      this.recruitmentService.calculateExperienceMatching(this.offerId, idCandidate)
        .subscribe(
          percentage => {
            this.experienceMatching = percentage;
          },
          error => {
            console.error('Error calculating experience matching:', error);
          }
        );
    } else {
      console.error('Offer ID is not available.');
    }
  } */
}

