import { TestBed } from '@angular/core/testing';

import { GlobalHandlerService } from './global-handler.service';

describe('GlobalHandlerService', () => {
  let service: GlobalHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
