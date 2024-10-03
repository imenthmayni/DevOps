import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitdisplayComponent } from './recruitdisplay.component';

describe('RecruitdisplayComponent', () => {
  let component: RecruitdisplayComponent;
  let fixture: ComponentFixture<RecruitdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitdisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
