import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveConsultantComponent } from './retrieve-consultant.component';

describe('RetrieveConsultantComponent', () => {
  let component: RetrieveConsultantComponent;
  let fixture: ComponentFixture<RetrieveConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveConsultantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrieveConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
