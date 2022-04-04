import { TestBed } from '@angular/core/testing';

import { GetAccessTokenService } from './get-access-token.service';

describe('GetAccessTokenService', () => {
  let service: GetAccessTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAccessTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
