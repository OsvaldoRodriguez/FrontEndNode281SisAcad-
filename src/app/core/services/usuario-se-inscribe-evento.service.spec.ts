import { TestBed } from '@angular/core/testing';

import { UsuarioSeInscribeEventoService } from './usuario-se-inscribe-evento.service';

describe('UsuarioSeInscribeEventoService', () => {
  let service: UsuarioSeInscribeEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioSeInscribeEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
