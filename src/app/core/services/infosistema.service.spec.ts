import { TestBed } from '@angular/core/testing';

import { InfosistemaService } from './infosistema.service';

describe('InfosistemaService', () => {
  let service: InfosistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfosistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
