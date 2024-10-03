import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/core/Models/candidate';
import { Recruitment } from 'src/app/core/Models/recruitment';
import { CandidateService } from 'src/app/core/Services/candidate.service';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-assigcandidtorec',
  templateUrl: './assigcandidtorec.component.html',
  styleUrls: ['./assigcandidtorec.component.css']
})
export class AssigcandidtorecComponent implements OnInit {
  candidate!: Candidate;
  recruitment!: Recruitment;

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private recruitmentService: RecruitmentService
  ) { }

  ngOnInit(): void {
    this.loadCandidateAndRecruitmentDetails();
  }

  loadCandidateAndRecruitmentDetails() {
    const idCandidate = this.route.snapshot.params['idCandidate'];
    const offerId = this.route.snapshot.params['offerId'];

  }

  assignRecruitmentToCandidate(idCandidate: number): void {
    this.candidateService.getCandidateById(idCandidate).subscribe(candidate => {
        if (candidate && candidate.postTitleC) {
            this.recruitmentService.getRecruitmentByPostTitle(candidate.postTitleC).subscribe(recruitment => {
                if (recruitment && recruitment.offerId) {
                    this.candidateService.assignRecruitmentToCandidate(idCandidate, recruitment.offerId).subscribe(() => {
                        console.log('Recruitment assigned successfully!');
                    }, error => {
                        console.error('Error assigning recruitment:', error);
                    });
                } else {
                    console.error('Recruitment not found for postTitle:', candidate.postTitleC);
                }
            });
        } else {
            console.error('Candidate not found or does not have postTitle:', idCandidate);
        }
    });
}}
