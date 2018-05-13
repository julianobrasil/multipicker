import { DOCUMENT } from '@angular/common';
import { Component, forwardRef, Inject, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import * as moment_ from 'moment';
const moment = moment_;
export type Moment = moment_.Moment;

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true,
    },
  ],
})
export class YearPickerComponent implements ControlValueAccessor {
  /** Component label */
  @Input() label = '';

  _max: Moment;
  @Input() get max(): number | Date {
    return this._max ? this._max.year() : undefined;
  }
  set max(max: number | Date) {
    if (max) {
      const momentDate = typeof max === 'number' ? moment([max, 0, 1]) : moment(max);
      this._max = momentDate.isValid() ? momentDate : undefined;
    }
  }

  _min: Moment;
  @Input() get min(): number | Date {
    return this._min ? this._min.year() : undefined;
  }
  set min(min: number | Date) {
    if (min) {
      const momentDate = typeof min === 'number' ? moment([min, 0, 1]) : moment(min);
      this._min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  @Input() touchUi = false;

  @ViewChild(MatDatepicker) _picker: MatDatepicker<Moment>;

  _inputCtrl: FormControl = new FormControl();

  // Function to call when the date changes.
  onChange = (year: Date) => { };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => { };

  constructor(@Inject(DOCUMENT) private _document: any) { }

  writeValue(date: Date): void {
    if (date && this._isYearEnabled(date.getFullYear())) {
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
    isDisabled ? this._picker.disabled = true : this._picker.disabled = false;

    isDisabled ? this._inputCtrl.disable() : this._inputCtrl.enable();
  }

  _yearSelectedHandler(chosenDate: Moment, datepicker: MatDatepicker<Moment>) {
    // as I'm using the focus event to open the calendar, this is necessary
    // so the calendar isn't opened again after a selection.
    datepicker.disabled = true;
    if (!this._isYearEnabled(chosenDate.year())) {
      datepicker.close();
      // wait for some time before enabling the calendar again
      setTimeout(() => datepicker.disabled = false, 600);
      return;
    }

    this._inputCtrl.setValue(chosenDate, { emitEvent: false });
    this.onChange(chosenDate.toDate());
    this.onTouched();
    datepicker.close();

    // wait for some time before enabling the calendar again
    // set focus away after closing the calendar
    setTimeout(() => {
      datepicker.disabled = false;
    }, 400);
  }

  _takeFocusAway() {
    const html = this._document.querySelector('.jp-custom-datepiker-element-to-focus');
    if (!!html && !!html['focus']) {
      html['focus']();
    }
  }

  _openDatepickerOnClick(datepicker: MatDatepicker<Moment>) {
    if (!datepicker.opened) {
      datepicker.open();
    }
  }

  _openDatepickerOnFocus(datepicker: MatDatepicker<Moment>) {
    setTimeout(() => {
      if (!datepicker.opened) {
        datepicker.open();
      }
    });
  }

  /** Whether the given year is enabled. */
  private _isYearEnabled(year: number) {
    // disable if the year is greater than maxDate lower than minDate
    if (year === undefined || year === null ||
      (this._max && year > this._max.year()) ||
      (this._min && year < this._min.year())) {
      return false;
    }

    return true;
  }
}
