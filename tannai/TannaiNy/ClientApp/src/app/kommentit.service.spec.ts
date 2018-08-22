import { TestBed, inject } from '@angular/core/testing';

import { KommentitService } from './kommentit.service';

describe('KommentitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KommentitService]
    });
  });

  it('should be created', inject([KommentitService], (service: KommentitService) => {
    expect(service).toBeTruthy();
  }));
});
