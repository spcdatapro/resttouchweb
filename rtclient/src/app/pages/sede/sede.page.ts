import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { Sede } from '../../interfaces/sede.interface';
import { SedeService } from '../../services/sede.service';
import { EmpresaService } from '../../services/empresa.service';
import { presentAlert } from '../../utilities';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.page.html',
  styleUrls: ['./sede.page.scss'],
  providers: [EmpresaService, SedeService]
})
export class SedePage implements OnInit {

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
      label: 'Empresa',
      name: 'idempresa',
      options: [],
      okText: 'Aceptar',
      cancelText: 'Cancelar',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'El campo Empresa es requerido.'
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

  tituloPagina = 'Sede';
  entidades: Sede[] = [];
  entidad: Sede = { _id: null };
  cardItems: any[] = [];
  formaHidden = true;
  fabBtnConfig = {
    cancelHidden: this.formaHidden
  };

  constructor(
    private sedeSrvc: SedeService,
    private empresaSrvc: EmpresaService
  ) { }

  ngOnInit() {
    this.loadEmpresas();
    this.loadEntidades();
  }

  loadEmpresas() {
    this.empresaSrvc.listaEntidades().subscribe((data) => {
      const options: any[] = [];
      data.forEach((emp) => {
        options.push({ _id: emp._id, descripcion: emp.nombre });
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
        contenido: `
        <b>Empresa:</b> ${item.empresa.nombre}<br/>
        <b>De baja:</b> ${item.debaja ? 'Sí' : 'No'}
        `
      });
    });
  }

  loadEntidades() {
    this.sedeSrvc.listaEntidades().subscribe((data) => {
      this.entidades = data;
      this.setCardItems();
    });
  }

  toggleFormVisibility(ev: any, visibilidad: boolean) {
    this.formaHidden = visibilidad;
    this.fabBtnConfig.cancelHidden = this.formaHidden;
    if (visibilidad) { this.resetEntidad(); }
    if (this.entidad._id) { this.resetEntidad(); }
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
    this.sedeSrvc.saveEntidad(value).subscribe((data) => {
      this.entidad = data;
      this.loadEntidades();
      this.setFormValues();
    });
  }

  itemClick(itemId: string) {
    if (itemId) {
      this.sedeSrvc.getEntidad(itemId).subscribe((data) => {
        this.entidad = data;
        this.setFormValues();
      });
    }
  }

  async trashClick(itemId: string) {
    const ent = this.entidades.find(obj => obj._id === itemId);
    await presentAlert({
      header: 'Dar de baja',
      subHeader: `${ent.nombre}`,
      message: '¿Está seguro de dar de baja a esta sede?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.sedeSrvc.trashEntidad(itemId).subscribe((data) => {
              this.resetEntidad();
              this.loadEntidades();
            });
          }
        },
        {
          text: 'No'
        }
      ]
    });
  }
}
