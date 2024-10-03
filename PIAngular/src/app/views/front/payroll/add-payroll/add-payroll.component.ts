import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payroll } from 'src/app/models/payroll';
import { User } from 'src/app/models/user';
import { PayrollService } from 'src/app/Services/payroll.service';
import { UserService } from 'src/app/Services/userservice';
import { YearService } from 'src/app/Services/year.service';

@Component({
  selector: 'app-add-payroll',
  templateUrl: './add-payroll.component.html',
  styleUrls: ['./add-payroll.component.css']
})
export class AddPayrollComponent {
           

  payroll: Payroll = new Payroll();
  users: User[] = [];
  dropdownOptions: { id?: number, name: string }[] = [];
  selectedUserId: any;
  seniorityOptions: string[] = ['Junior', 'Associate', 'Mid-level', 'Senior','Lead','Manager'];
  categoryOptions: string[] = ['executive', 'non-executive'];
  monthsList: string[] = [
    'January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'
  ];
  paymentOptions: string[] = ['CASH', 'DEBIT_CARD', 'CREDIT_CARD', 'CHECKS','MOBILE_PAYMENT','BANK_TRANSFERS'];

  bankList: string[] = [
    'STB ', 'BNA ', 'BH ', 'BTE ','BTL ','Banque Zitouna','Al Baraka Bank','Al Wifak International Bank','Amen Bank',
    'Attijari Bank','ATB ','BIAT '
  ];
  years: number[];
  payrollForm!: FormGroup;

  constructor(private _payrollService: PayrollService,
      private _userService: UserService,
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private yearService: YearService,
      private fb: FormBuilder
    ){
      this.years = this.yearService.getYearList();
      this.payrollForm = this.fb.group({
        account_number: [
          '', [Validators.required, Validators.pattern('^[0-9]{10}$')
        ]],
        bank_name: ['', Validators.required],
        work_hours_number: ['', [Validators.required, Validators.min(0), Validators.max(31)]],
        brut_salary: ['', Validators.required],
        user_name: ['', Validators.required],
        year: ['', Validators.required],
        month: ['', Validators.required],
        seniority: ['', Validators.required],
        category: ['', Validators.required],
        payment_method: ['', Validators.required]     
      });
    };

  ChangeValue(e: any){
    this.selectedUserId=e.target.value;
  }

  ngOnInit(): void{
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('payroll_id');
    if(isIdPresent){
      const id = this._activatedRoute.snapshot.paramMap.get('payroll_id');
      if(id !== null){
        this._payrollService.getPayroll(+id).subscribe(
          data => this.payroll = data
        )
      }     
    }
    this.loadUsers();
  }

  addPayroll(){
    this._payrollService.addPayroll(this.payroll).subscribe(
      data => {
        this._router.navigateByUrl("/payroll");
      }
    )
  }

  loadUsers() {
    this._userService.getAll().subscribe((data) => {
      this.users = data;
      this.dropdownOptions = this.users.map((user) => ({ id: user.id, name: `${user.lastName} ${user.firstName}`}));
    });
  }

  affectUser(userId: number) {
    
    if(userId!==null){
    console.log('Selected User ID:', userId);
    this._payrollService.affectPayroll(this.payroll,userId).subscribe(
      data => {
        this._router.navigateByUrl("/payroll");
      })
    }
  }



  

}
