import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtUnloadingComponent } from './at-unloading.component';

describe('AtUnloadingComponent', () => {
  let component: AtUnloadingComponent;
  let fixture: ComponentFixture<AtUnloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtUnloadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtUnloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
