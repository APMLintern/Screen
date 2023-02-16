import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrouteForPickupComponent } from './enroute-for-pickup.component';

describe('EnrouteForPickupComponent', () => {
  let component: EnrouteForPickupComponent;
  let fixture: ComponentFixture<EnrouteForPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrouteForPickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrouteForPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
