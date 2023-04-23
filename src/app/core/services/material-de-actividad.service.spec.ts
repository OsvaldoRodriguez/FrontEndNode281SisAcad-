import { TestBed } from '@angular/core/testing';

import { MaterialDeActividadService } from './material-de-actividad.service';

describe('MaterialDeActividadService', () => {
  let service: MaterialDeActividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialDeActividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
