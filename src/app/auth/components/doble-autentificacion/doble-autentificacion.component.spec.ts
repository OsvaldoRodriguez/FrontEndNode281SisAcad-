import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobleAutentificacionComponent } from './doble-autentificacion.component';

describe('DobleAutentificacionComponent', () => {
  let component: DobleAutentificacionComponent;
  let fixture: ComponentFixture<DobleAutentificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DobleAutentificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DobleAutentificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
