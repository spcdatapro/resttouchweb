import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-minilogo',
  template: `
    <ion-item>
      <ion-img slot="start" src="../../../assets/img/minilogors.svg" style="width: 25px; height: 25px;"></ion-img>
      <ion-label>
        <strong>{{tituloPagina}}</strong>
      </ion-label>
    </ion-item>
  `,
  styles: []
})
export class MinilogoComponent {

  @Input() tituloPagina: string;

  constructor() { }

}
