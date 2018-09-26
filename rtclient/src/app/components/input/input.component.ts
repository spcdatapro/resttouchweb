import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { ValidationerrorComponent } from '../validationerror/validationerror.component';

@Component({
  selector: 'app-input',
  template: `
    <ion-item [formGroup]="group">
      <ion-label>{{field.label}}</ion-label>
      <ion-input [formControlName]="field.name" [name]="field.name" [placeholder]="field.label" [type]="field.inputType"></ion-input>
      <app-validationerror [fieldName]="field.name" [validations]="field.validations" [group]="group"></app-validationerror>
    </ion-item>
  `,
  styles: []
})
export class InputComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
