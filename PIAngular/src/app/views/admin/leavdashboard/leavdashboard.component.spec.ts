import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavdashboardComponent } from './leavdashboard.component';

describe('LeavdashboardComponent', () => {
  let component: LeavdashboardComponent;
  let fixture: ComponentFixture<LeavdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
