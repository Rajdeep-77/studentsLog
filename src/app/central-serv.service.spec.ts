import { TestBed } from '@angular/core/testing';

import { CentralServService } from './central-serv.service';

describe('CentralServService', () => {
  let service: CentralServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
