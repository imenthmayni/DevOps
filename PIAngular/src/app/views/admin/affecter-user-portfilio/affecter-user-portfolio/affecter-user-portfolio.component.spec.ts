import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterUserPortfolioComponent } from './affecter-user-portfolio.component';

describe('AffecterUserPortfolioComponent', () => {
  let component: AffecterUserPortfolioComponent;
  let fixture: ComponentFixture<AffecterUserPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffecterUserPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffecterUserPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
