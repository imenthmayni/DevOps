import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptleavComponent } from './acceptleav.component';

describe('AcceptleavComponent', () => {
  let component: AcceptleavComponent;
  let fixture: ComponentFixture<AcceptleavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptleavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptleavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
