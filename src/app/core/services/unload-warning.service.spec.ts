import { TestBed } from '@angular/core/testing';

import { UnloadWarningService } from './unload-warning.service';

describe('UnloadWarningService', () => {
  let service: UnloadWarningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnloadWarningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
