import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDatepicker} from '@angular/material';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'jp-multi-datepicker',
  templateUrl: './multidatepicker.component.html',
  styleUrls: ['./multidatepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiDatepickerComponent),
      multi: true,
    },
  ],
})
export class MultiDatepickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  /** custom form-field class */
  @Input() jpCustomFormFieldClass = '';

  @Input() mode: 'YEAR' | 'MONTH' | 'MONTHYEAR' | 'WEEK' | 'SEMESTER' | '' | null;

  @Input() label = '';

  @Input() max: any;

  @Input() min: any;

  @Input() touchUi = false;

  private _disabled = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.setDisabledState(disabled);
  }

  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  _yearPickerCtrl: FormControl = new FormControl();
  _monthPickerCtrl: FormControl = new FormControl();
  _regularPickerCtrl: FormControl = new FormControl();

  private _onDestroy: Subject<void> = new Subject<void>();

  constructor(@Inject(DOCUMENT) private _document: any) {}

  ngAfterViewInit() {
    switch (this.mode) {
      case 'YEAR':
        this._subscribeToChanges(this._yearPickerCtrl);
        break;

      case 'MONTH':
      case 'SEMESTER':
      case 'MONTHYEAR':
        this._subscribeToChanges(this._monthPickerCtrl);
        break;

      default:
        this._subscribeToChanges(this._regularPickerCtrl);
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

  // Function to call when the date changes.
  onChange = (date: any) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  writeValue(date: any): void {
    if (date) {
      this._writeValue(date);
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
    this._disabled = isDisabled;
    switch (this.mode) {
      case 'YEAR':
        isDisabled ? this._yearPickerCtrl.disable() : this._yearPickerCtrl.enable();
        break;

      case 'MONTH':
      case 'SEMESTER':
      case 'MONTHYEAR':
        isDisabled ? this._monthPickerCtrl.disable() : this._monthPickerCtrl.enable();
        break;

      default:
        isDisabled ? this._regularPickerCtrl.disable() : this._regularPickerCtrl.enable();
    }
  }

  _takeFocusAway($datepicker: MatDatepicker<any>) {
    $datepicker.disabled = true;
    setTimeout(() => {
      $datepicker._datepickerInput['_elementRef'].nativeElement.blur();
      $datepicker.disabled = false;
    }, 600);
  }

  private _writeValue(date: any): any {
    if (!date) {
      return;
    }

    switch (this.mode) {
      case 'YEAR':
        if (date instanceof Date) {
          this._yearPickerCtrl.setValue(date, {emitEvent: false});
        }
        break;

      case 'MONTHYEAR':
      case 'MONTH':
      case 'SEMESTER':
        if (date instanceof Date) {
          this._monthPickerCtrl.setValue(date, {emitEvent: false});
        }
        break;

      default:
        if (date instanceof Date) {
          this._regularPickerCtrl.setValue(date, {emitEvent: false});
        }
    }
  }

  private _subscribeToChanges(control: FormControl) {
    if (!control) {
      return;
    }

    control.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe((value) => {
      const valor = new Date(value);
      this.dateChange.emit(valor);
      this.onChange(valor);
      this.onTouched();
    });
  }

  get _showMonthPicker(): boolean {
    return this.mode === 'MONTH' || this.mode === 'MONTHYEAR' || this.mode === 'SEMESTER';
  }

  get _showRegularDatepicker(): boolean {
    return !this.mode || this.mode === 'WEEK';
  }
}
