import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAmbienteComponent } from './crear-ambiente.component';

describe('CrearAmbienteComponent', () => {
  let component: CrearAmbienteComponent;
  let fixture: ComponentFixture<CrearAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAmbienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
