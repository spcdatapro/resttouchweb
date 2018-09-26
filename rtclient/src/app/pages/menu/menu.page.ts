import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  regConfig: FieldConfig[] = [
    {
      type: 'input',
      label: 'Descripción',
      inputType: 'text',
      name: 'descripcion',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'El campo descripción es requerido.'
        }
      ]
    },
    {
      type: 'button',
      btnType: 'submit',
      color: 'primary',
      iconOnly: true,
      ionIconName: 'save'
    }
  ];

  tituloPagina = 'Menú';

  constructor() { }

  ngOnInit() {
  }

  submit(value: any) {
    console.log('FORM = ', value);
  }

}
