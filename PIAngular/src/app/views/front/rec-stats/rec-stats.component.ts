import { Component, OnInit } from '@angular/core';
import { RecruitmentService } from 'src/app/core/Services/recruitment.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

interface TrendData {
  [year: string]: {
    [postTitle: string]: number;
  };
}
@Component({
  selector: 'app-rec-stats',
  templateUrl: './rec-stats.component.html',
  styleUrls: ['./rec-stats.component.css']
})
export class RecStatsComponent implements OnInit {
  trendData: TrendData = {};
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  single: any[] = [];
xAxisLabel = 'Year';
yAxisLabel = 'Number of Recruitments';

colorScheme: Color = {
  name: 'custom', 
  selectable: true, 
  group: ScaleType.Ordinal,
  domain: ['#A10A2', '#A10A28', '#C7B42C', '#AAAAAA'] 
};
 
  constructor(private recruitmentService: RecruitmentService) { }

  ngOnInit(): void {
    const postTitle = 'dev';
    const startYear = 2020;
    const endYear = 2026;

    this.recruitmentService.analyzePostTitleTrend(postTitle, startYear, endYear).subscribe(
      (data: TrendData) => {
        this.trendData = data;
        console.log('Post Title Trend Data:', this.trendData);
        this.processDataForChart();
      },
      (error) => {
        console.error('Error fetching post title trend data:', error);
      }
    );
  }

  processDataForChart() {
    this.chartData = Object.keys(this.trendData).map(year => {
      return {
        name: year,
        series: Object.keys(this.trendData[year]).map(postTitle => {
          return {
            name: postTitle,
            value: this.trendData[year][postTitle]
          };
        })
      };
    });
  }
}
