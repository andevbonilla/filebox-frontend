import { TestBed } from '@angular/core/testing';

import { ValidateJwtGuard } from './validate-jwt.guard';

describe('ValidateJwtGuard', () => {
  let guard: ValidateJwtGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateJwtGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
