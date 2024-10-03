import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavcalendarComponent } from './leavcalendar.component';

describe('LeavcalendarComponent', () => {
  let component: LeavcalendarComponent;
  let fixture: ComponentFixture<LeavcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavcalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
