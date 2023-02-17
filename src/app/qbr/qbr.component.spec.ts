import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QbrComponent } from './qbr.component';

describe('QbrComponent', () => {
  let component: QbrComponent;
  let fixture: ComponentFixture<QbrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QbrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QbrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
