import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReccalendarComponent } from './reccalendar.component';

describe('ReccalendarComponent', () => {
  let component: ReccalendarComponent;
  let fixture: ComponentFixture<ReccalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReccalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReccalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
