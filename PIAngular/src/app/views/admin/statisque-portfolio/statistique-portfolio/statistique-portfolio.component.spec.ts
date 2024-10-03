import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquePortfolioComponent } from './statistique-portfolio.component';

describe('StatistiquePortfolioComponent', () => {
  let component: StatistiquePortfolioComponent;
  let fixture: ComponentFixture<StatistiquePortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquePortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatistiquePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
