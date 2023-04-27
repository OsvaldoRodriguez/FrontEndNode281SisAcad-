import { TestBed } from '@angular/core/testing';

import { UsuarioReservaEventoService } from './usuario-reserva-evento.service';

describe('UsuarioReservaEventoService', () => {
  let service: UsuarioReservaEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioReservaEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
