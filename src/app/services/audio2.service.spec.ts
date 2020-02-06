import { TestBed } from '@angular/core/testing';

import { Audio2Service } from './audio2.service';

describe('Audio2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Audio2Service = TestBed.get(Audio2Service);
    expect(service).toBeTruthy();
  });
});
