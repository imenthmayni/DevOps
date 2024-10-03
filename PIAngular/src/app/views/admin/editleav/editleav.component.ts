import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeavService } from 'src/app/core/Services/leav.service';
import { Leav, LeaveStatus, LeaveType } from 'src/app/core/Models/leav';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-editleav',
  templateUrl: './editleav.component.html',
  styleUrls: ['./editleav.component.css']
})

export class EditleavComponent implements OnInit {
  
  updatedLeav: Leav = {
    leaveId: 0,
    leaveStartdate: null,
    leaveEnddate: null,
    leaveType: LeaveType.FMLA,
    reason: '',
    leaveStatus: LeaveStatus.PENDING,
    leaveApproved: false,
    requestDate: '',
    leaveApproverName: '',
    comments: '',
    leaveDaysLeft: 0,
    user: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      telephone: 0,
      roles: [],
      connected: false,
      deleted: false,
      recruitments: [],
      leaves: [],
      notifications: []
    }
};
  formSubmitted = false;
  successMessage: string = ''; 
  errorMessage: string = ''; 

  constructor(
    private leavService: LeavService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const leaveId = params['id'];
      this.leavService.getLeavById(leaveId).subscribe(
        (leav: Leav) => {
          this.updatedLeav = {
            ...leav,
            leaveStartdate: leav.leaveStartdate ? new Date(leav.leaveStartdate).toISOString() : null,
            leaveEnddate: leav.leaveEnddate ? new Date(leav.leaveEnddate).toISOString() : null,
          };
        },
        (error) => {
          console.error('Error retrieving leav details:', error);
        }
      );
    });
  }

  updateLeav(leavForm: NgForm) {
    this.formSubmitted = true;
    if (leavForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const leaveId = this.updatedLeav.leaveId; 
    this.leavService.updateLeav(this.updatedLeav).subscribe(
      (response) => {
        console.log('leav updated successfully:', response);
        this.successMessage = 'Tâche mise à jour avec succès.';
        this.errorMessage = '';
        this.resetForm(leavForm);
        setTimeout(() => {
          this.router.navigate(['/admin/ajout']);
        }, 10000); 
      },
      (error) => {
        console.error('Error updating leav:', error);
        this.errorMessage = 'Une erreur s\'est produite lors de la mise à jour de la tâche.';
        this.successMessage = ''; 
      }
    );
  }


  resetForm(form: NgForm) {
    form.resetForm();
    this.updatedLeav = {
      leaveId: 0,
      leaveStartdate: null,
      leaveEnddate: null,
      leaveType: LeaveType.FMLA,
      reason: '',
      leaveStatus: LeaveStatus.PENDING,
      leaveApproved: false,
      requestDate: '',
      leaveApproverName: '',
      comments: '',
      leaveDaysLeft: 0,
      user: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        telephone: 0,
        roles: [],
        connected: false,
        deleted: false,
        recruitments: [],
        leaves: [],
        notifications: []
      }
    };
    this.formSubmitted = false;
  }

  confirmUpdateLeav(leavForm: NgForm) {
    const confirmed = confirm('Are you sure you want to update this leave?');
    if (confirmed) {
      this.updateLeav(leavForm);
    }
  }
  
}
