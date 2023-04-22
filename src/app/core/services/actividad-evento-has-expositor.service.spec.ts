import { TestBed } from '@angular/core/testing';

import { ActividadEventoHasExpositorService } from './actividad-evento-has-expositor.service';

describe('ActividadEventoHasExpositorService', () => {
  let service: ActividadEventoHasExpositorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadEventoHasExpositorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
