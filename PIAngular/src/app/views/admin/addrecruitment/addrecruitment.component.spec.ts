import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecruitmentComponent } from './addrecruitment.component';

describe('AddrecruitmentComponent', () => {
  let component: AddrecruitmentComponent;
  let fixture: ComponentFixture<AddrecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrecruitmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
