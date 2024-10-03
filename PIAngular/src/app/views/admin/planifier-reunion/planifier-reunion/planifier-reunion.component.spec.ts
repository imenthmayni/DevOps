import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierReunionComponent } from './planifier-reunion.component';

describe('PlanifierReunionComponent', () => {
  let component: PlanifierReunionComponent;
  let fixture: ComponentFixture<PlanifierReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanifierReunionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanifierReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
