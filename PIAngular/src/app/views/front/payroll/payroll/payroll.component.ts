import { Component, OnInit, ViewChild } from '@angular/core';
import { PayrollService } from 'src/app/Services/payroll.service';
import { Payroll } from 'src/app/models/payroll';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { OrderPaymentModalComponent } from '../order-payment-modal/order-payment-modal.component';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit{

  
  payrolls: Payroll [] = [];
  pdfData: any;
  user: any;
  userName: any;
  filters = {
    keyword: ''
  }
  constructor(private _payrollService: PayrollService,
              private _router: Router,
              private profileService: ProfileService){}
  ngOnInit() {   
    this.profileService.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data);
      if(this.user.role =='ROLE_ADMIN' || this.user.role =='ROLE_HR_ADMIN'){

        this.loadPayroll();
        console.log("User  response",this.user)
      
      } else {
        this.getPayrollsByUser(this.user.id);
        console.log("user.role !='ROLE_ADMIN'",this.user)
        
      }
    } );

 
 
    
  }

  filterPayrolls(payrolls: Payroll[]){
    return payrolls.filter((e) => {
      return e.user_name?.toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }

  loadPayroll(){
    this._payrollService.getAll().subscribe(
      data=> this.payrolls = this.filterPayrolls(data)
    )
  }

  getPayrollsByUser(id: number){
    this._payrollService.getPayrollsByUser(id).subscribe(
      data=> {
        this.payrolls = data
        console.log("getPayrollsByUser",data);
  })
  }

  deletePayroll(id: number){
    this._payrollService.deletePayroll(id).subscribe(
      data => {
        this.loadPayroll();
      }
    )
  }

  sendPayByEmail(id: number){
    this._payrollService.sendEmail(id).subscribe(
      data => {
        console.log('Email sent successfully:', data);
      }
    )
  }
      
}
