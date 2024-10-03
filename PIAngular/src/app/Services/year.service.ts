import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  constructor() { }

  getYearList(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    const range = 10;

    for (let i = currentYear - range; i <= currentYear + range; i++) {
      years.push(i);
    }

    return years;
  }
}
