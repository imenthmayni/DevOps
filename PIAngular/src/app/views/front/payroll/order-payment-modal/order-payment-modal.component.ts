import { Component } from '@angular/core';import { PayrollReportService } from 'src/app/Services/payroll-report.service';
import { YearService } from 'src/app/Services/year.service';
;

@Component({
  selector: 'app-order-payment-modal',
  templateUrl: './order-payment-modal.component.html',
  styleUrls: ['./order-payment-modal.component.css']
})
export class OrderPaymentModalComponent {
  months: string[] = [
    'January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'
  ];

  years: number[];
  selectedYear: number = new Date().getFullYear();
  month: any;
  companyAccounts: number[] = [
    78945612378945612, 23651869576325413
  ]
  selectedCompanyAccount: any

  constructor(private yearService: YearService,
              private reportService: PayrollReportService     
    ){
      this.years = this.yearService.getYearList()
    };

    downloadOrderPayment(): void {
      const orderDate = `${this.selectedYear}-${this.month}`;
      this.reportService.orderPaymentPdf(this.selectedYear, this.month, this.selectedCompanyAccount, orderDate).subscribe((pdflBlob: Blob) => {
        const blob = new Blob([pdflBlob], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'order-payment.pdf';
        link.click();
      }, error => {
        console.error('Error downloading PDF:', error);
      });
    }

}
