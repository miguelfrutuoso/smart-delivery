import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingRoutesComponent } from './assing-routes.component';

describe('AssingRoutesComponent', () => {
  let component: AssingRoutesComponent;
  let fixture: ComponentFixture<AssingRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
