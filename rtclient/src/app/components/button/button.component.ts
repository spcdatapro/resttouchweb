import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';

@Component({
  selector: 'app-button',
  template: `
    <ion-button [type]="field.btnType" [color]="field.color" [formGroup]="group">
      <ion-icon
        slot="icon-only" [name]="field.ionIconName" *ngIf="field.ionIconName && field.ionIconName.length > 0 && field.iconOnly">
      </ion-icon>
      <ion-icon
        slot="start" [name]="field.ionIconName" *ngIf="field.ionIconName && field.ionIconName.length > 0 && !field.iconOnly">
      </ion-icon>
      <ion-label *ngIf="field.label && field.label.length > 0 && !field.iconOnly">{{field.label}}</ion-label>
    </ion-button>
  `,
  styles: []
})
export class ButtonComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
