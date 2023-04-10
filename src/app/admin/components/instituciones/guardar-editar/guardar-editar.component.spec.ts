import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEditarComponent } from './guardar-editar.component';

describe('GuardarEditarComponent', () => {
  let component: GuardarEditarComponent;
  let fixture: ComponentFixture<GuardarEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
