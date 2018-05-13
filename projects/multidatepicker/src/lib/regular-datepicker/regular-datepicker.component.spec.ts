import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularDatepickerComponent } from './regular-datepicker.component';

describe('RegularDatepickerComponent', () => {
  let component: RegularDatepickerComponent;
  let fixture: ComponentFixture<RegularDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularDatepickerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
