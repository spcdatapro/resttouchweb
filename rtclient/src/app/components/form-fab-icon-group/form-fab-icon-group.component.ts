import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Fab } from '@ionic/angular';

@Component({
  selector: 'app-form-fab-icon-group',
  templateUrl: './form-fab-icon-group.component.html',
  styleUrls: ['./form-fab-icon-group.component.scss']
})
export class FormFabIconGroupComponent implements OnInit {

  @ViewChild(Fab) fab: Fab;

  @Input() configuracion: any = {
    moreColor: 'danger',
    vertical: 'bottom',
    horizontal: 'end',
    slot: 'fixed',
    cancelColor: 'warning',
    addColor: 'light'
  };
  @Input() fabBtnConfig: any = {
    cancelHidden: false
  };
  @Output() crear: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelar: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  cancelClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cancelar.emit();
    this.fab.close();
  }

  addClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.crear.emit();
    this.fab.close();
  }
}
