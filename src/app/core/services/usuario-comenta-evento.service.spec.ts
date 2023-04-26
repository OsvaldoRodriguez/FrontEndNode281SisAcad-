import { TestBed } from '@angular/core/testing';

import { UsuarioComentaEventoService } from './usuario-comenta-evento.service';

describe('UsuarioComentaEventoService', () => {
  let service: UsuarioComentaEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioComentaEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
