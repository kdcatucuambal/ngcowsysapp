import { TestBed } from '@angular/core/testing';

import { TypeObsService } from './type-obs.service';

describe('TypeObsService', () => {
  let service: TypeObsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeObsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
