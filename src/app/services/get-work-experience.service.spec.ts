import { TestBed } from '@angular/core/testing';

import { GetWorkExperienceService } from './get-work-experience.service';

describe('GetWorkExperienceService', () => {
  let service: GetWorkExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWorkExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
