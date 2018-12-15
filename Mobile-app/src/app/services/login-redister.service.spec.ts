import { TestBed } from '@angular/core/testing';

import { LoginRedisterService } from './login-redister.service';

describe('LoginRedisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRedisterService = TestBed.get(LoginRedisterService);
    expect(service).toBeTruthy();
  });
});
