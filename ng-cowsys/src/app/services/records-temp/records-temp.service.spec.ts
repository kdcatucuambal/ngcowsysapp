import { TestBed } from '@angular/core/testing';

import { RecordsTempService } from './records-temp.service';

describe('RecordsTempService', () => {
  let service: RecordsTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordsTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
