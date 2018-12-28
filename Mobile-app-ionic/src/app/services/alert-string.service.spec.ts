import { TestBed } from '@angular/core/testing';

import { AlertStringService } from './alert-string.service';

describe('AlertStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertStringService = TestBed.get(AlertStringService);
    expect(service).toBeTruthy();
  });
});
