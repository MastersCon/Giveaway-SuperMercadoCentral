import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifaEmpleadosComponent } from './rifa-empleados.component';

describe('RifaEmpleadosComponent', () => {
  let component: RifaEmpleadosComponent;
  let fixture: ComponentFixture<RifaEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifaEmpleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RifaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
