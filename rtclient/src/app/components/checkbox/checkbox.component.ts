import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';

@Component({
  selector: 'app-checkbox',
  template: `
    <ion-item [formGroup]="group">
      <ion-label>{{field.label}}</ion-label>
      <ion-checkbox [formControlName]="field.name" slot="end" [color]="field.color" [checked]="field.isChecked"></ion-checkbox>
    </ion-item>
  `,
  styles: []
})
export class CheckboxComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
