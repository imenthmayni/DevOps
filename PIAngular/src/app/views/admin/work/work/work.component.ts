import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeavService } from 'src/app/core/Services/leav.service';
import { Leav, LeaveStatus } from 'src/app/core/Models/leav';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  leaves: Leav [] = [];
  leavForm!: FormGroup;
  showSuccessAlert: boolean = false;
  newLeav!: Leav;
  qrCodeUrl: string | undefined; 



  constructor(private fb: FormBuilder, private leavService: LeavService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.leavForm = this.fb.group({
      leaveStartdate: ['', Validators.required],
      leaveEnddate: ['', Validators.required],
      leaveType: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  adddLeav() {
    if (this.leavForm.valid) {
      const newLeav: Leav = {
        ...this.leavForm.value,
        leaveStatus: LeaveStatus.PENDING 
      };

      const message = JSON.stringify(newLeav);

      this.generateQRCode(message);

      this.leavService.createLeav(newLeav).subscribe(
        (addedLeav: Leav) => {
          console.log('Congé ajouté avec succès :', addedLeav);
          this.showSuccessAlert = true;
        },
        (error: any) => {
          console.error('Erreur lors de l ajout du congé :', error);
          console.error('Complete error response:', error);
        }
      );
    }
  }
  
  
  generateQRCode(message: string) {
    this.http.get('http://localhost:8089/generateQR', {
      responseType: 'blob',
      params: { message }
    }).subscribe(
      (response: Blob) => {
        this.qrCodeUrl = URL.createObjectURL(response);
      },
      (error: any) => {
        console.error('Error generating QR code:', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['/admin/leavdisplay']);
  }
  dismissAlert() {
    this.showSuccessAlert = false;
  }
}
