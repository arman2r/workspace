import { TestBed } from '@angular/core/testing';

import { TopSkillsService } from './top-skills.service';

describe('TopSkillsService', () => {
  let service: TopSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
