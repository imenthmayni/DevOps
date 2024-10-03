import { TestBed } from '@angular/core/testing';

import { CustomerTrackingService } from './customer-tracking.service';

describe('CustomerTrackingService', () => {
  let service: CustomerTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
