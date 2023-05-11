import { TestBed } from '@angular/core/testing';

import { CampaignflowService } from './campaignflow.service';

describe('CampaignflowService', () => {
  let service: CampaignflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
