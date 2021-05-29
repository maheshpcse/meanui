import { TestBed } from '@angular/core/testing';

import { BeauticianService } from './beautician.service';

describe('BeauticianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeauticianService = TestBed.get(BeauticianService);
    expect(service).toBeTruthy();
  });
});
