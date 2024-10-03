import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationMeetComponent } from './planification-meet.component';

describe('PlanificationMeetComponent', () => {
  let component: PlanificationMeetComponent;
  let fixture: ComponentFixture<PlanificationMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificationMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificationMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
