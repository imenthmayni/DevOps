import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterPortfolioAConsultantComponent } from './affecter-portfolio-aconsultant.component';

describe('AffecterPortfolioAConsultantComponent', () => {
  let component: AffecterPortfolioAConsultantComponent;
  let fixture: ComponentFixture<AffecterPortfolioAConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffecterPortfolioAConsultantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffecterPortfolioAConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
