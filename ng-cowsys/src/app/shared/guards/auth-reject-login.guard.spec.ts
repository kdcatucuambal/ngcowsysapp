import { TestBed } from '@angular/core/testing';

import { AuthRejectLoginGuard } from './auth-reject-login.guard';

describe('AuthRejectLoginGuard', () => {
  let guard: AuthRejectLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRejectLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
