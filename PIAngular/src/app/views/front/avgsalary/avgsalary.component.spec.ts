import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgsalaryComponent } from './avgsalary.component';

describe('AvgsalaryComponent', () => {
  let component: AvgsalaryComponent;
  let fixture: ComponentFixture<AvgsalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgsalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgsalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
