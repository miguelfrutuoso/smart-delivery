import { TestBed } from '@angular/core/testing';

import { GestGuard } from './gest.guard';

describe('GestGuard', () => {
  let guard: GestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
