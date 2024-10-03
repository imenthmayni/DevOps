import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentchartsComponent } from './recruitmentcharts.component';

describe('RecruitmentchartsComponent', () => {
  let component: RecruitmentchartsComponent;
  let fixture: ComponentFixture<RecruitmentchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentchartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
