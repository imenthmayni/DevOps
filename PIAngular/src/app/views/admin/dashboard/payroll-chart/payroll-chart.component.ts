import { Component } from '@angular/core';
import { PayrollReportService} from 'src/app/Services/payroll-report.service';
import { PayrollService } from 'src/app/Services/payroll.service';
import { YearService } from 'src/app/Services/year.service';

@Component({
  selector: 'app-payroll-chart',
  templateUrl: './payroll-chart.component.html',
  styleUrls: ['./payroll-chart.component.css']
})
export class PayrollChartComponent {

  public chartData: any[] = [];
  public chartDataUser: any[] = [];
  public chartDataYear: any[] = [];
  public selectedYear: number = new Date().getFullYear();
  public startYear: number = new Date().getFullYear();
  public secondYear: number = new Date().getFullYear();
  years: number[];

  constructor(
    private payrollService: PayrollService,
    private yearService: YearService,
    private excelService: PayrollReportService
    ) { 
      this.years = this.yearService.getYearList()
    }

  ngOnInit(): void {
    this.getPayrollData();
    this.getPayrollByYear();
  }

  getPayrollData(): void {
    const year = 2024; // Change this to the desired year
    this.payrollService.getTotalExpenses(this.selectedYear)
      .subscribe(data => {
        // Process data and render chart
        this.chartData = this.formatChartData(data);
        console.log("Chart Data", this.chartData);
        // Call method to render chart
      });


      this.payrollService.getTotalExpensesPerUser(this.selectedYear)
      .subscribe(data => {
        // Process data and render chart
        this.chartDataUser = this.formatChartData(data);
        console.log("Chart Data", this.chartDataUser);
        // Call method to render chart
      });
  }

  getPayrollByYear(): void {
    this.payrollService.getTotalExpensesPerYear(this.startYear, this.secondYear)
    .subscribe(data => {
      this.chartDataYear = this.formatChartData(data);
    })
  }
  

  formatChartData(data: any): any[] {
    const formattedData = [];
  
    for (const month in data) {
      if (data.hasOwnProperty(month)) {
        const value = data[month] !== null ? data[month] : 0;
        formattedData.push({ name: this.capitalizeFirstLetter(month), value: value });
      }
    }
  
    return formattedData;
  }
  
  
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onYearChange(selectedYear: any): void {
    this.getPayrollData();
  }
  onYearsChange(selectedYear: any): void {
    this.getPayrollByYear();
  }


  
  downloadExcel(): void {
    this.excelService.generateExcel(this.selectedYear).subscribe((excelBlob: Blob) => {
      const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'payroll-report.xlsx';
      link.click();
    }, error => {
      console.error('Error downloading Excel:', error);
    });
  }

}

