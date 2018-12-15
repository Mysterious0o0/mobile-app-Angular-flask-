import { TestBed } from '@angular/core/testing';

import { StatusAuthenticatedService } from './status-authenticated.service';

describe('StatusAuthenticatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusAuthenticatedService = TestBed.get(StatusAuthenticatedService);
    expect(service).toBeTruthy();
  });
});
