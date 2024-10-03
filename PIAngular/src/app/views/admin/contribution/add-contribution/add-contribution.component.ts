import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contribution } from 'src/app/models/contribution';
import { User } from 'src/app/models/user';
import { ContributionService } from 'src/app/Services/contribution.service';
import { UserService } from 'src/app/Services/userservice';
import { YearService } from 'src/app/Services/year.service';

@Component({
  selector: 'app-add-contribution',
  templateUrl: './add-contribution.component.html',
  styleUrls: ['./add-contribution.component.css']
})
export class AddContributionComponent {

  contribForm!: FormGroup;
  
  showSuccessAlert: boolean = false;

  contribution: Contribution = new Contribution();
  users: User[] = [];
  dropdownOptions: { id?: number, name: string }[] = [];
  selectedUserId: any;
  monthsList: string[] = [
    'January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'
  ];
  designationOptions: string[] = ['CNSS','Social Security','Income Tax','Life Insurance Premiums']
  years: number[];

  constructor(private _contributionService: ContributionService,
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private yearService: YearService,
    private fb: FormBuilder
    ) { 
      this.years = this.yearService.getYearList(),
      this.contribForm = fb.group({
        designation: ['', Validators.required],
        contribution_amount: ['', Validators.required],
        user_name: ['', Validators.required],
        year: ['', Validators.required],
        month: ['', Validators.required]   
      });
    };

  ChangeValue(e: any){
    this.selectedUserId=e.target.value;
  }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('contribution_id');
    if (isIdPresent) {
      const id = this._activatedRoute.snapshot.paramMap.get('contribution_id');
      if (id !== null) {
        this._contributionService.getContribution(+id).subscribe(
          data => this.contribution = data
        )
      }

    };
    this.loadUsers();
  }

  addPrime() {
    this._contributionService.addContribution(this.contribution).subscribe(
      data => {
        this.showSuccessAlert = true;
        this._router.navigateByUrl("/admin/contribution");
      })
          
  }

  loadUsers() {
    this._userService.getAll().subscribe((data) => {
      this.users = data;
      this.dropdownOptions = this.users.map((user) => ({ id: user.id, name: `${user.lastName} ${user.firstName}`}));
    });
  }

  affectUser(userId: number) {
    console.log('Selected User ID:', userId);
    console.log('Selected User ID:', this.selectedUserId);
    if(userId!==null){
    console.log('Selected User ID:', userId);
    this._contributionService.affectContribution(this.contribution,userId).subscribe(
      data => {
        this._router.navigateByUrl("/admin/contribution");
      })
    }
  }

}
