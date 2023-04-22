import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAmbientesComponent } from './lista-ambientes.component';

describe('ListaAmbientesComponent', () => {
  let component: ListaAmbientesComponent;
  let fixture: ComponentFixture<ListaAmbientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAmbientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAmbientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
