import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { PayrollConfig } from 'src/app/models/payroll-config';
import { PayrollConfigService } from 'src/app/Services/payroll-config.service';

@Component({
  selector: 'app-payroll-config',
  templateUrl: './payroll-config.component.html',
  styleUrls: ['./payroll-config.component.css']
})
export class PayrollConfigComponent {
  user: any;

  constructor(private _payrollConfigService: PayrollConfigService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private profileService: ProfileService) { };

    payrollConfig: PayrollConfig = new PayrollConfig();

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id = this._activatedRoute.snapshot.paramMap.get('id');
      if (id !== null) {
        this._payrollConfigService.getPayrollConfig(+id).subscribe(
          data => this.payrollConfig = data
        )
      }

    };
    this.profileService.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data)
    } ); 
  }

  updateConfig(Id: number) {
    if(Id!==null){
    this._payrollConfigService.updatePayrollConfig(this.payrollConfig,Id).subscribe(
      data => {
        this._router.navigateByUrl("/admin/prime");
      })
    }
  }

}
