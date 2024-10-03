import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherConsultantsComponent } from './afficher-consultants.component';

describe('AfficherConsultantsComponent', () => {
  let component: AfficherConsultantsComponent;
  let fixture: ComponentFixture<AfficherConsultantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherConsultantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficherConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
