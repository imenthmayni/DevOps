import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/core/Models/candidate';
import { Recruitment } from 'src/app/core/Models/recruitment';
import { CandidateService } from 'src/app/core/Services/candidate.service';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';

@Component({
  selector: 'app-candidateinfo',
  templateUrl: './candidateinfo.component.html',
  styleUrls: ['./candidateinfo.component.css']
})
export class CandidateinfoComponent implements OnInit {

  candidate!: Candidate;
  recruitment!: Recruitment;
  loading: boolean = false;
  loadingDuration: number = 3000; 

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router,
    private recruitmentService: RecruitmentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const idCandidate = this.route.snapshot.paramMap.get('idCandidate');
    if (idCandidate) {
      this.getCandidateInfo(+idCandidate);
    }
  }

  getCandidateInfo(idCandidate: number): void {
    this.loading = true;
    setTimeout(() => { 
      this.candidateService.getCandidateById(idCandidate).subscribe(candidate => {
        this.candidate = candidate;
        if (this.candidate.postTitleC) {
          this.getRecruitmentInfo(this.candidate.postTitleC);
        }
      }, error => {
        this.showErrorNotification('Error fetching candidate info');
        this.loading = false;
      });
    }, this.loadingDuration);
  }

  getRecruitmentInfo(postTitle: string): void {
    setTimeout(() => { 
      this.recruitmentService.getRecruitmentByPostTitle(postTitle).subscribe(recruitment => {
        this.recruitment = recruitment;
        this.loading = false;
      }, error => {
        this.showErrorNotification('Error fetching recruitment info');
        this.loading = false;
      });
    }, this.loadingDuration);
  }

  assignRecruitmentToCandidate(idCandidate: number): void {
    this.loading = true;
    setTimeout(() => { 
      this.candidateService.getCandidateById(idCandidate).subscribe(candidate => {
        if (candidate && candidate.postTitleC) {
          this.recruitmentService.getRecruitmentByPostTitle(candidate.postTitleC).subscribe(recruitment => {
            if (recruitment && recruitment.offerId) {
              this.candidateService.assignRecruitmentToCandidate(idCandidate, recruitment.offerId).subscribe(() => {
                this.showSuccessNotification('Recruitment assigned successfully!');
                this.loading = false;
              }, error => {
                this.showErrorNotification('Error assigning recruitment');
                this.loading = false;
              });
            } else {
              this.showErrorNotification('Recruitment not found for postTitle');
              this.loading = false;
            }
          }, error => {
            this.showErrorNotification('Error fetching recruitment info');
            this.loading = false;
          });
        } else {
          this.showErrorNotification('Candidate not found or does not have postTitle');
          this.loading = false;
        }
      }, error => {
        this.showErrorNotification('Error fetching candidate info');
        this.loading = false;
      });
    }, this.loadingDuration);
  }

  showSuccessNotification(message: string) {
    this.snackBar.open(message, 'Close', { duration: 7000, panelClass: ['success-snackbar'] });
  }
  
  showErrorNotification(message: string) {
    this.snackBar.open(message, 'Close', { duration: 7000, panelClass: ['error-snackbar'] });
  }
  goBack() {
    this.router.navigate(['/admin/candisplay']);
  }
}
