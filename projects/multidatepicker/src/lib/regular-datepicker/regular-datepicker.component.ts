import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDatepicker,
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { MultiDatepickerComponent } from '../multidatepicker.component';

import * as moment_ from 'moment';
const moment = moment_;
export type Moment = moment_.Moment;

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-regular-datepicker',
  templateUrl: './regular-datepicker.component.html',
  styleUrls: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegularDatepickerComponent),
      multi: true,
    },
  ],
})
export class RegularDatepickerComponent
  implements ControlValueAccessor, AfterViewInit {
  /** custom form-field class */
  @Input() jpCustomFormFieldClass = '';

  /** Component label */
  @Input() label = '';

  _max: Moment;
  @Input()
  get max(): Date {
    return this._max ? this._max.toDate() : undefined;
  }
  set max(max: Date) {
    if (max) {
      const momentDate = moment(max);
      this._max = momentDate.isValid() ? momentDate : undefined;
    }
  }

  _min: Moment;
  @Input()
  get min(): Date {
    return this._min ? this._min.toDate() : undefined;
  }
  set min(min: Date) {
    if (min) {
      const momentDate = moment(min);
      this._min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  private _mode: 'WEEK' | 'SEMESTER' | '' | null = '';
  @Input()
  get mode(): 'WEEK' | 'SEMESTER' | '' | null {
    return this._mode;
  }
  set mode(mode: 'WEEK' | 'SEMESTER' | '' | null) {
    this._mode = mode;
    this._setupFilter();
  }

  @Input() touchUi = false;

  _customFilter: (d: Moment) => boolean;

  @ViewChild(MatDatepicker) _picker: MatDatepicker<Moment>;

  _inputCtrl: FormControl = new FormControl();

  // Function to call when the date changes.
  onChange = (date: Date) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  /** send the focus away from the input so it doesn't open again */
  _takeFocusAway = (datepicker: MatDatepicker<Moment>) => {};

  constructor(private parent: MultiDatepickerComponent) {}

  ngAfterViewInit() {
    this._takeFocusAway = this.parent._takeFocusAway;
  }

  writeValue(date: Date): void {
    if (date) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
        this._inputCtrl.setValue(moment(date), { emitEvent: false });
      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? (this._picker.disabled = true)
      : (this._picker.disabled = false);

    isDisabled ? this._inputCtrl.disable() : this._inputCtrl.enable();
  }

  _dateChangeHandler(chosenDate: Moment) {
    this.onChange(chosenDate.toDate());
    this.onTouched();
  }

  _openDatepickerOnClick(datepicker: MatDatepicker<Moment>) {
    if (!datepicker.opened) {
      datepicker.open();
      this.onTouched();
    }
  }

  private _setupFilter() {
    switch (this.mode) {
      case 'WEEK':
        this._customFilter = (d: Moment) => {
          return !d.day();
        };
        break;
    }
  }
}
