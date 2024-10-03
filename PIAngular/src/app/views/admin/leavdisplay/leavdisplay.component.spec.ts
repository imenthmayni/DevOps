import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavdisplayComponent } from './leavdisplay.component';

describe('LeavdisplayComponent', () => {
  let component: LeavdisplayComponent;
  let fixture: ComponentFixture<LeavdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavdisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
