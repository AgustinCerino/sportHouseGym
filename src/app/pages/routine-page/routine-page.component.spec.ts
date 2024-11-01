import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinePageComponent } from './routine-page.component';

describe('RoutinePageComponent', () => {
  let component: RoutinePageComponent;
  let fixture: ComponentFixture<RoutinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutinePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
