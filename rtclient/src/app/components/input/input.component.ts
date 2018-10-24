import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
// import { ValidationerrorComponent } from '../validationerror/validationerror.component';

@Component({
  selector: 'app-input',
  template: `
    <ion-item [formGroup]="group" [hidden]="esVisible(field.esInvisible)">
      <ion-label>{{field.label}}</ion-label>
      <ion-input [formControlName]="field.name" [name]="field.name" [placeholder]="field.label" [type]="field.inputType">
      </ion-input>
    </ion-item>
    <app-validationerror [fieldName]="field.name" [validations]="field.validations" [group]="group"></app-validationerror>
  `,
  styles: []
})
export class InputComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  esVisible(visibilidad: boolean) {
    if (visibilidad !== null && visibilidad !== undefined) {
      return visibilidad;
    }
    return false;
  }
}
