import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { presentAlert } from '../utilities';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [LocalStorageService]
})
export class HomePage {

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
          handler: () => {}
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
