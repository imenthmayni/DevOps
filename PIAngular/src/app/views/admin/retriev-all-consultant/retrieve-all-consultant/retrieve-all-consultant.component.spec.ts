import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveAllConsultantComponent } from './retrieve-all-consultant.component';

describe('RetrieveAllConsultantComponent', () => {
  let component: RetrieveAllConsultantComponent;
  let fixture: ComponentFixture<RetrieveAllConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveAllConsultantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrieveAllConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
