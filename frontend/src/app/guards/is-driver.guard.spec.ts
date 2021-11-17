import { TestBed } from '@angular/core/testing';

import { IsDriverGuard } from './is-driver.guard';

describe('IsDriverGuard', () => {
  let guard: IsDriverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsDriverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
