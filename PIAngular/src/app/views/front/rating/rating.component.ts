import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ratingcount = 0;
  totalrating = 0;
  contributorName: string = '';
  Finalrating: any;
  hoveredStar: number = 0;

  ratingcontrol = new FormControl(0);

  GetRating(starIndex: number) {
    const starValue = starIndex + 1; 
    this.contributorName = '';
    this.ratingcount++;
    this.totalrating += starValue;
    this.Finalrating = this.totalrating / this.ratingcount;


    this.saveRating();
}

 saveRating() {
    const ratingData = {
      rating: this.Finalrating,
      contributor: this.contributorName 
    };

    const url = 'http://localhost:8089/rate/ratings'; 

    this.http.post<any>(url, ratingData)
      .subscribe(
        (response) => {
          console.log('Rating saved successfully:', response);
        },
        (error) => {
          console.error('Error saving rating:', error);
        }
      );
}
}
