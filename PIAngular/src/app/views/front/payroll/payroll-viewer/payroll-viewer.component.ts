import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollService } from 'src/app/Services/payroll.service';

@Component({
  selector: 'app-payroll-viewer',
  templateUrl: './payroll-viewer.component.html',
  styleUrls: ['./payroll-viewer.component.css']
})
export class PayrollViewerComponent implements OnInit{
  //pdfData = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfData: Blob | undefined;
  pdfDataUrl: SafeResourceUrl | undefined;
  selectedUserId: any;
  showMessage = false;
  
  constructor(private _sanitizer: DomSanitizer, 
    private _payrollService: PayrollService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute){}

  async ngOnInit(): Promise <void>{
    try {
      const isIdPresent = this._activatedRoute.snapshot.paramMap.has('payroll_id');
    if(isIdPresent){
      const id = this._activatedRoute.snapshot.paramMap.get('payroll_id');
      this.selectedUserId = id;
      if(id !== null){
      const pdfBlob = await this._payrollService.generatePdfPayroll(+id);
      if (pdfBlob) {
        this.pdfDataUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
        this.pdfData = pdfBlob as Blob;
      } else {
        // Handle the case where pdfBlob is undefined (e.g., show an error message)
        console.error('PDF data is undefined');
      }
    }
  }   
  } catch (error) {
      // Handle the error (e.g., show an error message)
      console.error('Error generating PDF payroll:', error);
    }

    setTimeout(() => {
      this.showMessage = false; // Hide the message after 10 seconds
    }, 7000); // 10 seconds in milliseconds

  
  }

  sendPayByEmail(id: number){
    this._payrollService.sendEmail(id).subscribe(
      data => {
        this.showMessage = true
        console.log('Email sent successfully:', data);
      }
    )
  }

}
