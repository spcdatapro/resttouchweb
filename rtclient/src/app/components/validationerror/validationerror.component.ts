import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validator } from '../../interfaces/field.interface';

@Component({
  selector: 'app-validationerror',
  template: `
    <ng-container *ngFor="let validation of validations">
      <ion-label color="danger" *ngIf="group.get(fieldName).hasError(validation.name)">
        {{validation.message}}
      </ion-label>
    </ng-container>
  `,
  styles: []
})
export class ValidationerrorComponent {

  @Input() fieldName: string;
  @Input() validations: Validator[];
  @Input() group: FormGroup;

  constructor() { }

}
