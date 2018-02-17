import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { MonthPickerComponent } from './month-picker/month-picker.component';
import {
  RegularDatepickerComponent,
} from './regular-datepicker/regular-datepicker.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { MultiDatepickerComponent } from './mutli-datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
  ],
  declarations: [
    MultiDatepickerComponent,
    MonthPickerComponent,
    YearPickerComponent,
    RegularDatepickerComponent,
  ],
  exports: [
    MultiDatepickerComponent,
  ],
})
export class MultiDatepickerModule { }
