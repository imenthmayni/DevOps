import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecalendarComponent } from './lecalendar.component';

describe('LecalendarComponent', () => {
  let component: LecalendarComponent;
  let fixture: ComponentFixture<LecalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
