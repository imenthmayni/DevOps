import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgettComponent } from './budgett.component';

describe('BudgettComponent', () => {
  let component: BudgettComponent;
  let fixture: ComponentFixture<BudgettComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgettComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
