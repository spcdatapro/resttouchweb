import { Component, DoCheck } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MenuService } from './services/menu.service';
import { ArbolMenu } from './interfaces/menu.interface';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [MenuService, LocalStorageService]
})
export class AppComponent implements DoCheck {

  public logged: false;
  private arbolMenu: ArbolMenu;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuSrvc: MenuService,
    private localStorageSrvc: LocalStorageService
  ) {
    this.initializeApp();
    this.loadArbolMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngDoCheck() {
    const usrLogged = this.localStorageSrvc.get('rtusr');
    if (usrLogged !== null && usrLogged !== undefined) {
      this.logged = usrLogged.logeado;
    }
  }

  loadArbolMenu() {
    this.menuSrvc.loadArbolMenu().subscribe((arbol) => {
      this.arbolMenu = arbol;
    });
  }
}
