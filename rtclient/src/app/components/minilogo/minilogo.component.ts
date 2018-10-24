import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { presentAlert } from '../../utilities';

@Component({
  selector: 'app-minilogo',
  template: `
    <ion-item>
      <ion-img slot="start" src="../../../assets/img/minilogors.svg" style="width: 25px; height: 25px;"></ion-img>
      <ion-label>
        <strong>{{tituloPagina}}</strong>
      </ion-label>
      <ion-buttons slot="end">
        <ion-button (click)="logout()">
          <ion-icon slot="icon-only" name="power"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>
  `,
  styles: [],
  providers: [LocalStorageService]
})
export class MinilogoComponent {

  @Input() tituloPagina: string;

  constructor(
    private localStorageSrvc: LocalStorageService,
    private router: Router
    ) { }

  async logout() {
    await presentAlert({
      header: 'Cerrar sesión',
      subHeader: '',
      message: '¿Está seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Sí',
          handler: () => {
            this.localStorageSrvc.clearAll();
            this.router.navigate(['login']);
          }
        }
      ]
    });
  }

}
