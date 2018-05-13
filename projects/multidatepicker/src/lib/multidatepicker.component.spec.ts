import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultidatepickerComponent } from './multidatepicker.component';

describe('MultidatepickerComponent', () => {
  let component: MultidatepickerComponent;
  let fixture: ComponentFixture<MultidatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultidatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultidatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
