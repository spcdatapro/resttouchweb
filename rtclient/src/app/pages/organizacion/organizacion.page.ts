import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { Organizacion } from '../../interfaces/organizacion.interface';
import { OrganizacionService } from '../../services/organizacion.service';
import { presentAlert } from '../../utilities';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.page.html',
  styleUrls: ['./organizacion.page.scss'],
  providers: [OrganizacionService]
})
export class OrganizacionPage implements OnInit {

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
      type: 'button',
      btnType: 'submit',
      color: 'primary',
      iconOnly: true,
      ionIconName: 'save'
    }
  ];

  tituloPagina = 'Organización';
  entidades: Organizacion[] = [];
  entidad: Organizacion = { _id: null, nombre: null };
  cardItems: any[] = [];
  formaVisible = true;
  fabBtnConfig = {
    cancelHidden: this.formaVisible
  };

  constructor(
    private organizacionSrvc: OrganizacionService
    ) {  }

  ngOnInit() {
    this.loadEntidades();
  }

  resetEntidad() {
    this.entidad = { _id: null, nombre: null };
    this.form.form.reset();
  }

  setCardItems() {
    this.cardItems = [];
    this.entidades.forEach((item) => {
      this.cardItems.push({
        _id: item._id,
        titulo: item.nombre,
        subtitulo: null,
        debaja: item.debaja,
        contenido: `<b>De baja:</b> ${item.debaja ? 'Sí' : 'No'}`
      });
    });
  }

  loadEntidades() {
    this.organizacionSrvc.listaEntidades().subscribe((data) => {
      this.entidades = data;
      this.setCardItems();
    });
  }

  toggleFormVisibility(ev: any, visibilidad: boolean) {
    this.formaVisible = visibilidad;
    this.fabBtnConfig.cancelHidden = this.formaVisible;
    if (visibilidad) { this.resetEntidad(); }
  }

  private setFormValues() {
    this.regConfig.forEach((campo) => {
      if (campo.type !== 'button') {
        this.form.form.controls[campo.name].setValue(this.entidad[campo.name]);
      }
    });
    this.formaVisible = false;
    this.fabBtnConfig.cancelHidden = this.formaVisible;
  }

  submit(value: any) {
    this.organizacionSrvc.saveEntidad(value).subscribe((data) => {
      this.entidad = data;
      this.loadEntidades();
      this.setFormValues();
    });
  }

  itemClick(itemId: string) {
    if (itemId) {
      this.organizacionSrvc.getEntidad(itemId).subscribe((data) => {
        this.entidad = data;
        this.setFormValues();
      });
    }
  }

  async trashClick(itemId: string) {
    const ent = this.entidades.find( org => org._id === itemId );
    await presentAlert({
      header: 'Dar de baja',
      subHeader: `${ent.nombre}`,
      message: '¿Está seguro de dar de baja a esta organización?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.organizacionSrvc.trashEntidad(itemId).subscribe((data) => {
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
