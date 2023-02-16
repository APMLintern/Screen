import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtpickupComponent } from './atpickup.component';

describe('AtpickupComponent', () => {
  let component: AtpickupComponent;
  let fixture: ComponentFixture<AtpickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtpickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtpickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
