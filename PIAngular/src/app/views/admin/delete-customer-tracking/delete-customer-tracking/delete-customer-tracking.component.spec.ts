import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerTrackingComponent } from './delete-customer-tracking.component';

describe('DeleteCustomerTrackingComponent', () => {
  let component: DeleteCustomerTrackingComponent;
  let fixture: ComponentFixture<DeleteCustomerTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCustomerTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCustomerTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
