import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerTrackingComponent } from './add-customer-tracking.component';

describe('AddCustomerTrackingComponent', () => {
  let component: AddCustomerTrackingComponent;
  let fixture: ComponentFixture<AddCustomerTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCustomerTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
