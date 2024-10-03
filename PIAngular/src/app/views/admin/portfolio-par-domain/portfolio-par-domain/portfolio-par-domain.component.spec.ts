import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioParDomainComponent } from './portfolio-par-domain.component';

describe('PortfolioParDomainComponent', () => {
  let component: PortfolioParDomainComponent;
  let fixture: ComponentFixture<PortfolioParDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioParDomainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioParDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
