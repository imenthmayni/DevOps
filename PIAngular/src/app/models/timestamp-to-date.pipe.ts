import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate',
  standalone: true
})
export class TimestampToDatePipe implements PipeTransform {


  constructor(private datePipe: DatePipe) {}

  transform(date: Date): string {
    return date ? this.datePipe.transform(date, 'shortDate') || 'N/A' : 'N/A';
  }
}
