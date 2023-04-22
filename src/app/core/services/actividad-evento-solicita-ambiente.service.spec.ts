import { TestBed } from '@angular/core/testing';

import { ActividadEventoSolicitaAmbienteService } from './actividad-evento-solicita-ambiente.service';

describe('ActividadEventoSolicitaAmbienteService', () => {
  let service: ActividadEventoSolicitaAmbienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadEventoSolicitaAmbienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
