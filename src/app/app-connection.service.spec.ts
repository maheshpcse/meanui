import { TestBed } from '@angular/core/testing';

import { AppConnectionService } from './app-connection.service';

describe('AppConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppConnectionService = TestBed.get(AppConnectionService);
    expect(service).toBeTruthy();
  });
});
