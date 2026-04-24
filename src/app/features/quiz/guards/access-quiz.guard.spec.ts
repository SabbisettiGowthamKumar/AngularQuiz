import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessQuizGuard } from './access-quiz.guard';

describe('accessQuizGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
