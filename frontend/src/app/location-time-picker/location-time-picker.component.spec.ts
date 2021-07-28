import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTimePickerComponent } from './location-time-picker.component';

describe('LocationTimePickerComponent', () => {
  let component: LocationTimePickerComponent;
  let fixture: ComponentFixture<LocationTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTimePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
