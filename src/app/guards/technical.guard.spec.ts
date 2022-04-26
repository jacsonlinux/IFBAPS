import { TestBed } from '@angular/core/testing';

import { TechnicalGuard } from './technical.guard';

describe('TechnicalGuard', () => {
  let guard: TechnicalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TechnicalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
