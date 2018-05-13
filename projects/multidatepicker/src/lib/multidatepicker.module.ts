import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { MultiDatepickerComponent } from './multidatepicker.component';
import { InfoDialogComponent } from './month-picker/dialog/info-dialog/info-dialog.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { RegularDatepickerComponent } from './regular-datepicker/regular-datepicker.component';
import { YearPickerComponent } from './year-picker/year-picker.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /** Material components */
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,

    MatMomentDateModule,
  ],
  declarations: [
    MultiDatepickerComponent,
    InfoDialogComponent,
    MonthPickerComponent,
    RegularDatepickerComponent,
    YearPickerComponent,
  ],
  entryComponents: [InfoDialogComponent],
  exports: [MultiDatepickerComponent],
})
export class MultidatepickerModule {}
