import { TestBed, inject } from '@angular/core/testing';

import { MultidatepickerService } from './multidatepicker.service';

describe('MultidatepickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultidatepickerService]
    });
  });

  it('should be created', inject([MultidatepickerService], (service: MultidatepickerService) => {
    expect(service).toBeTruthy();
  }));
});
