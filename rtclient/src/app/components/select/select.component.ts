import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';

@Component({
  selector: 'app-select',
  template: `
    <ion-item [formGroup]="group">
      <ion-label>{{field.label}}</ion-label>
      <ion-select [formControlName]="field.name" [name]="field.name" [okText]="field.okText" [cancelText]="field.cancelText">
        <ion-select-option *ngFor="let item of field.options" [value]="item._id">{{item.descripcion}}</ion-select-option>
      </ion-select>
    </ion-item>
  `,
  styles: []
})
export class SelectComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
