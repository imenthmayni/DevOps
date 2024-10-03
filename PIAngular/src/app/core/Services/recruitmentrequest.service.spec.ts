import { TestBed } from '@angular/core/testing';

import { RecruitmentrequestService } from './recruitmentrequest.service';

describe('RecruitmentrequestService', () => {
  let service: RecruitmentrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitmentrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
