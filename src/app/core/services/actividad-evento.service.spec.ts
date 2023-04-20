import { TestBed } from '@angular/core/testing';

import { ActividadEventoService } from './actividad-evento.service';

describe('ActividadEventoService', () => {
  let service: ActividadEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
