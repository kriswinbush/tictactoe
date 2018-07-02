import { TestBed, inject } from '@angular/core/testing';

import { LocaldbService } from './localdb.service';

describe('LocaldbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocaldbService]
    });
  });

  it('should be created', inject([LocaldbService], (service: LocaldbService) => {
    expect(service).toBeTruthy();
  }));
});
