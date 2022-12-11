import { TestBed } from '@angular/core/testing';

import { MeubleGuard } from './meuble.guard';

describe('MeubleGuard', () => {
  let guard: MeubleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MeubleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
