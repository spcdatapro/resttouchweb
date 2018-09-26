import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';

@Component({
  selector: 'app-date',
  template: `
    <ion-item [formGroup]="group">
      <ion-label>{{field.label}}</ion-label>
      <ion-datetime
        [formControlName]="field.name"
        [displayFormat]="field.dateDisplayFormat" [pickerFormat]="field.datePickerFormat"
        [cancelText]="field.cancelText" [doneText]="okText"
      ></ion-datetime>
      <app-validationerror [fieldName]="field.name" [validations]="field.validations" [group]="group"></app-validationerror>
    </ion-item>
  `,
  styles: []
})
export class DateComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
