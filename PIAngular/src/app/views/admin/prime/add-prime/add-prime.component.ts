import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prime } from 'src/app/models/prime';
import { User } from 'src/app/models/user';
import { PrimeService } from 'src/app/Services/prime.service';
import { UserService } from 'src/app/Services/userservice';
import { YearService } from 'src/app/Services/year.service';

@Component({
  selector: 'app-add-prime',
  templateUrl: './add-prime.component.html',
  styleUrls: ['./add-prime.component.css']
})
export class AddPrimeComponent implements OnInit {
  primeForm!: FormGroup;


  prime: Prime = new Prime();
  users: User[] = [];
  note: any;
  dropdownOptions: { id?: number, name: string }[] = [];
  selectedUserId: any;
  monthsList: string[] = [
    'January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'
  ];
  designationOptions: string[] = ['Performance prime ', 'Attendance prime', 'Transport prime'];
  years: number[];

  constructor(private _primeService: PrimeService,
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private yearService: YearService,
    private fb: FormBuilder
    ) { 
      this.years = this.yearService.getYearList(),
      this.primeForm = this.fb.group({
        designation: ['', Validators.required],
        prime_amount: ['', Validators.required],
        user_name: ['', Validators.required],
        year: ['', Validators.required],
        month: ['', Validators.required]   
      });
    };

  ChangeValue(e: any){
    this.selectedUserId=e.target.value;
  }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('prime_id');
    if (isIdPresent) {
      const id = this._activatedRoute.snapshot.paramMap.get('prime_id');
      if (id !== null) {
        this._primeService.getPrime(+id).subscribe(
          data => this.prime = data
        )
      }

    };
    this.loadUsers();
  }

  addPrime() {
    this._primeService.addPrime(this.prime).subscribe(
      data => {
        this._router.navigateByUrl("/admin/prime");
      })
  }

  loadUsers() {
    this._userService.getAll().subscribe((data) => {
      this.users = data;
      this.dropdownOptions = this.users.map((user) => ({ id: user.id, name: `${user.lastName} ${user.firstName}`}));
    });
  }

  /* loadUsersNote() {
    this._noteService.getAll().subscribe((data) => {
      this.notes = data;
    });
  } */

  affectUser(userId: number) {
    console.log('Selected User ID:', userId);
    console.log('Selected User ID:', this.selectedUserId);
    if(userId!==null){
    console.log('Selected User ID:', userId);
    this._primeService.affectPrime(this.prime,userId).subscribe(
      data => {
        this._router.navigateByUrl("/admin/prime");
      })
    }
  }


}
