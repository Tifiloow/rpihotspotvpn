import { TestBed, async, inject } from '@angular/core/testing';

import { SignedinGuard } from './signedin.guard';

describe('SignedinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignedinGuard]
    });
  });

  it('should ...', inject([SignedinGuard], (guard: SignedinGuard) => {
    expect(guard).toBeTruthy();
  }));
});
