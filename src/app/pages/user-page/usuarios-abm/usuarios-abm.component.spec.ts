import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAbmComponent } from './usuarios-abm.component';

describe('UsuariosAbmComponent', () => {
  let component: UsuariosAbmComponent;
  let fixture: ComponentFixture<UsuariosAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosAbmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
