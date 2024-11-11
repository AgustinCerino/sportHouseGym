import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinasAbmComponent } from './rutinas-abm.component';

describe('RutinasAbmComponent', () => {
  let component: RutinasAbmComponent;
  let fixture: ComponentFixture<RutinasAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinasAbmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinasAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
