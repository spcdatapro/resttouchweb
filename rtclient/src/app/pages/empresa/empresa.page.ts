import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { Empresa } from '../../interfaces/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';
import { OrganizacionService } from '../../services/organizacion.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
  providers: [EmpresaService, OrganizacionService]
})
export class EmpresaPage implements OnInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  regConfig: FieldConfig[] = [
    {
      type: 'input',
      label: 'ID',
      inputType: 'text',
      name: '_id',
      esInvisible: true
    },
    {
      type: 'input',
      label: 'Nombre',
      inputType: 'text',
      name: 'nombre',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'El campo nombre es requerido.'
        }
      ]
    },
    {
      type: 'select',
      label: 'Organización',
      name: 'idorganizacion',
      options: [],
      okText: 'Aceptar',
      cancelText: 'Cancelar',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'El campo Organización es requerido.'
        }
      ]
    },
    {
      type: 'input',
      label: 'Razón social',
      inputType: 'text',
      name: 'razonsocial'
    },
    {
      type: 'input',
      label: 'Abreviatura',
      inputType: 'text',
      name: 'abreviatura'
    },
    {
      type: 'input',
      label: 'N.I.T.',
      inputType: 'text',
      name: 'nit'
    },
    {
      type: 'input',
      label: 'Dirección',
      inputType: 'text',
      name: 'direccion'
    },
    {
      type: 'button',
      btnType: 'submit',
      color: 'primary',
      iconOnly: true,
      ionIconName: 'save'
    }
  ];

  tituloPagina = 'Empresa';
  entidades: Empresa[] = [];
  entidad: Empresa = { _id: null };
  cardItems: any[] = [];
  formaHidden = true;
  fabBtnConfig = {
    cancelHidden: this.formaHidden
  };

  constructor(
    private empresaSrvc: EmpresaService,
    private organizacionSrvc: OrganizacionService
  ) { }

  ngOnInit() {
    this.loadOrganizaciones();
    this.loadEntidades();
  }

  loadOrganizaciones() {
    this.organizacionSrvc.listaEntidades().subscribe((data) => {
      const options: any[] = [];
      data.forEach((org) => {
        options.push({ _id: org._id, descripcion: org.nombre });
      });
      this.regConfig[2].options = options;
    });
  }

  resetEntidad() {
    this.entidad = { _id: null };
    this.form.form.reset();
  }

  setCardItems() {
    this.cardItems = [];
    this.entidades.forEach((item) => {
      this.cardItems.push({
        _id: item._id,
        titulo: item.nombre,
        subtitulo: item.razonsocial,
        contenido: `
        <b>Organización:</b> ${item.organizacion.nombre}<br/>
        <b>N.I.T.:</b> ${item.nit || ''}<br/>
        <b>De baja:</b> ${item.debaja ? 'Sí' : 'No'}
        `
      });
    });
  }

  loadEntidades() {
    this.empresaSrvc.listaEntidades().subscribe((data) => {
      this.entidades = data;
      this.setCardItems();
    });
  }

  toggleFormVisibility(ev: any, visibilidad: boolean) {
    this.formaHidden = visibilidad;
    this.fabBtnConfig.cancelHidden = this.formaHidden;
    if (visibilidad) { this.resetEntidad(); }
  }

  private setFormValues() {
    this.regConfig.forEach((campo) => {
      if (campo.type !== 'button') {
        this.form.form.controls[campo.name].setValue(this.entidad[campo.name]);
      }
    });
    this.formaHidden = false;
    this.fabBtnConfig.cancelHidden = this.formaHidden;
  }

  submit(value: any) {
    this.empresaSrvc.saveEntidad(value).subscribe((data) => {
      this.entidad = data;
      this.loadEntidades();
      this.setFormValues();
    });
  }

  itemClick(itemId: string) {
    if (itemId) {
      this.empresaSrvc.getEntidad(itemId).subscribe((data) => {
        this.entidad = data;
        this.setFormValues();
      });
    }
  }

  trashClick(itemId: string) {
    console.log(itemId);
  }
}
