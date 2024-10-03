import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService, IndividualConfig } from 'ngx-toastr'; // Import ToastrService and IndividualConfig
import { throwError } from 'rxjs';
import { Candidate } from 'src/app/core/Models/candidate';
import { RecruitmentRequest } from 'src/app/core/Models/recruitmentrequest';
import { CandidateService } from 'src/app/core/Services/candidate.service';
import { FileUploadService } from 'src/app/core/Services/file-upload.service';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';
import { RecruitmentrequestService } from 'src/app/core/Services/recruitmentrequest.service';

@Component({
  selector: 'app-recruitmentform',
  templateUrl: './recruitmentform.component.html',
  styleUrls: ['./recruitmentform.component.css']
})
export class RecruitmentformComponent implements OnInit {
  candidate: Candidate = {} as Candidate; 
  postTitles: string[] = [];
  selectedPostTitleDetails: any = {};
  recruitmentrequestForm!: FormGroup;
  loading: boolean = true; 
  addedRecruitmentRequests: RecruitmentRequest[] = []; 
  fileToUpload: File | null = null;
  requestId: number | null = null; 
  selectedFile!: File;
  status: "initial" | "uploading" | "success" | "fail" = "initial";



  constructor(private fb: FormBuilder,
     private recruitmentService: RecruitmentService,
     private recruitmentrequestService: RecruitmentrequestService ,
     private candidateService: CandidateService,
     private toastr: ToastrService,
     private fileUploadService: FileUploadService,
     private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.recruitmentrequestForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailCand:['', Validators.required],
      education:['', Validators.required],
      experienceCand:['', Validators.required],
      postTitle: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      hiringManager: ['', Validators.required],
      recruiter: ['', Validators.required],
      jobLocation: ['', Validators.required],
      numberOfOpenings: ['', Validators.required],
      cv: [null] 
    });

    this.fetchPostTitles();
  }

  fetchPostTitles() {
    this.recruitmentService.getPostTitles().subscribe(
      (postTitles: string[]) => {
        this.postTitles = postTitles;
        this.loading = false; 
      },
      (error: any) => {
        console.error('Error fetching post titles:', error);
        this.loading = false; 
      }
    );
  }

  onPostTitleSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (!target) {
      return;
    }
    const value = target.value;
    if (!value) {
      return;
    }

    //details selected post title
    this.recruitmentService.getPostTitleDetails(value).subscribe(
      (details: any) => {
        this.selectedPostTitleDetails = details;
        this.recruitmentrequestForm.patchValue({
          description: details.description,
          requirements: details.requirements,
          hiringManager: details.hiringManager,
          recruiter: details.recruiter,
          jobLocation: details.jobLocation,
          salaryRangeMin: details.salaryRangeMin,
          salaryRangeMax: details.salaryRangeMax,
          numberOfOpenings: details.numberOfOpenings
        });
      },
      (error: any) => {
        console.error('Error fetching post title details:', error);
      }
    );
  }

 
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }


  showNotification(message: string, title: string, options?: Partial<IndividualConfig>) {
    this.toastr.info(message, title, options);
  }

  handleFileInput(event: any): void {
    const files: FileList | null = event?.target?.files;
    if (files && files.length > 0) {
      const file: File = files.item(0) as File; 
      this.fileToUpload = file;
      this.recruitmentrequestForm.get('cv')?.setValue(this.fileToUpload); 
    }
  }

  submitForm() {
    if (this.recruitmentrequestForm.valid) {
      const formData = this.recruitmentrequestForm.value;
  
      // Create a new Candidate object with first name and last name
      const newCandidate: Candidate = {
        idCandidate: 0, // Set a default value for idCandidat (e.g., 0)
        firstNameCand: formData.firstName,
        lastNameCand: formData.lastName,
        postTitleC: formData.postTitle,
        emailCand: formData.emailCand, // Set other fields to empty strings for now
        skillsCand: '',
        experienceCand: formData.experienceCand,
        education: formData.education
        
      };
  
      // Call the service to save the candidate information
      this.candidateService.createCandidate(newCandidate).subscribe(
        (candidate: Candidate) => {
          // Candidate information saved successfully, now save the recruitment request
  
          // Create a new RecruitmentRequest object with the remaining form data
          const newRecruitmentRequest: RecruitmentRequest = {
            requestId: 0, // Provide a default value or adjust accordingly
            firstName: formData.firstName,
            lastName: formData.lastName,
            postTitle: formData.postTitle,
            jobLocation: formData.jobLocation,
            numberOfOpenings: formData.numberOfOpenings,
            description: formData.description,
            requirements: formData.requirements,
            hiringManager: formData.hiringManager,
            recruiter: formData.recruiter,
            cv: formData.cv
          };
  
          // Call the service to save the recruitment request
          this.recruitmentrequestService.createRecruitmentRequest(newRecruitmentRequest).subscribe(
            (addedRecruitmentRequest: RecruitmentRequest) => {
              // Recruitment request saved successfully
              console.log('Recruitment request added successfully:', addedRecruitmentRequest);
              this.addedRecruitmentRequests.push(addedRecruitmentRequest); // Add the new recruitment request to the array
              this.recruitmentrequestForm.reset(); // Reset the form after submission
            },
            (error: any) => {
              console.error('Error adding recruitment request:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error adding candidate:', error);
        }
      );
    } else {
      console.log('Form validation failed.');
    }
  }

goBack() {
  this.router.navigate(['/oplocation']);
}
goBackAvg() {
  this.router.navigate(['/avgsalary']);
}
  }

 

  // downloadFile() {
  //   // Assuming requestId is obtained from the form data
  //   const requestId = this.requestId; // Use the requestId property directly

  //   // Ensure requestId is valid
  //   if (requestId) {
  //     this.fileUploadService.downloadFile(requestId).subscribe(
  //       (data: Blob) => {
  //         // Create object URL from blob data
  //         const blob = new Blob([data], { type: 'application/octet-stream' });
  //         const url = window.URL.createObjectURL(blob);
  //         // Create anchor element to trigger download
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.download = `${requestId}_cv.ext`;
  //         // Append anchor to the body and trigger the click event
  //         document.body.appendChild(link);
  //         link.click();
  //         // Cleanup
  //         window.URL.revokeObjectURL(url);
  //         document.body.removeChild(link);
  //       },
  //       (error) => {
  //         console.error('Error downloading file:', error);
  //         // Handle error
  //       }
  //     );
  //   } else {
  //     console.error('Request ID is missing.');
  //   }
  // }

